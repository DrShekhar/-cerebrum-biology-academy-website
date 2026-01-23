/**
 * WhatsApp OTP Authentication Service
 *
 * Provides phone-based authentication using WhatsApp OTP via Interakt.
 * Supports:
 * - Send OTP for login/signup
 * - Verify OTP
 * - Resend OTP with rate limiting
 * - Session management
 *
 * OTP Storage: Uses Redis for persistence across server restarts and multi-instance deployments.
 * Falls back to in-memory store when Redis is unavailable.
 */

import {
  sendWhatsAppOTP,
  sendLoginOTP,
  generateOTP,
  isOTPValid,
  trackUser,
  trackEvent,
} from '../interakt'
import { RateLimitService, getRedisClient } from '@/lib/cache/redis'
import { randomBytes, timingSafeEqual } from 'crypto'

// Get Redis client for OTP storage
const redis = getRedisClient()

// Redis key prefix for OTPs
const OTP_KEY_PREFIX = 'otp:'

// OTP data interface
interface OTPData {
  otp: string
  expiresAt: string // ISO string for JSON serialization
  attempts: number
  lastSentAt: string // ISO string
  verified: boolean
}

// In-memory OTP store (fallback when Redis unavailable)
const otpStoreMemory = new Map<string, OTPData>()

// Configuration
const OTP_EXPIRY_MINUTES = 5
const MAX_VERIFY_ATTEMPTS = 3
const RESEND_COOLDOWN_SECONDS = 60
const MAX_OTPS_PER_HOUR = 5

// Rate limiting store (fallback when Redis unavailable)
const rateLimitStore = new Map<
  string,
  {
    count: number
    windowStart: Date
  }
>()

export interface SendOTPResult {
  success: boolean
  message: string
  expiresIn?: number
  cooldownRemaining?: number
  error?: string
}

export interface VerifyOTPResult {
  success: boolean
  message: string
  attemptsRemaining?: number
  token?: string
  user?: {
    phone: string
    isNewUser: boolean
  }
  error?: string
}

/**
 * Get OTP from storage (Redis with fallback to memory)
 */
async function getOTPFromStore(phone: string): Promise<OTPData | null> {
  try {
    const redisData = await redis.get(`${OTP_KEY_PREFIX}${phone}`)
    if (redisData && typeof redisData === 'string') {
      return JSON.parse(redisData) as OTPData
    }
  } catch (error) {
    console.warn('[OTP] Redis get failed, using memory fallback:', error)
  }

  // Fallback to memory
  return otpStoreMemory.get(phone) || null
}

/**
 * Set OTP in storage (Redis with fallback to memory)
 */
async function setOTPInStore(phone: string, data: OTPData, ttlSeconds: number): Promise<void> {
  // Always set in memory as backup
  otpStoreMemory.set(phone, data)

  // Set auto-cleanup timeout for memory store
  setTimeout(() => {
    const stored = otpStoreMemory.get(phone)
    if (stored && stored.otp === data.otp) {
      otpStoreMemory.delete(phone)
    }
  }, ttlSeconds * 1000)

  // Try Redis
  try {
    await redis.setex(`${OTP_KEY_PREFIX}${phone}`, ttlSeconds, JSON.stringify(data))
  } catch (error) {
    console.warn('[OTP] Redis set failed, using memory only:', error)
  }
}

/**
 * Delete OTP from storage
 */
async function deleteOTPFromStore(phone: string): Promise<void> {
  otpStoreMemory.delete(phone)

  try {
    await redis.del(`${OTP_KEY_PREFIX}${phone}`)
  } catch (error) {
    console.warn('[OTP] Redis delete failed:', error)
  }
}

/**
 * Update OTP in storage (for incrementing attempts, etc.)
 */
async function updateOTPInStore(phone: string, updates: Partial<OTPData>): Promise<void> {
  const existing = await getOTPFromStore(phone)
  if (!existing) return

  const updated: OTPData = { ...existing, ...updates }

  // Calculate remaining TTL
  const expiresAt = new Date(updated.expiresAt)
  const ttlSeconds = Math.max(Math.floor((expiresAt.getTime() - Date.now()) / 1000), 60)

  await setOTPInStore(phone, updated, ttlSeconds)
}

/**
 * Format phone number for consistent storage
 */
function normalizePhone(phone: string): string {
  const cleaned = phone.replace(/[^\d]/g, '')
  if (cleaned.startsWith('91') && cleaned.length === 12) {
    return cleaned.slice(2)
  }
  return cleaned.slice(-10)
}

/**
 * Check rate limit for phone number using Redis with fallback
 */
async function checkRateLimit(phone: string): Promise<{ allowed: boolean; remaining: number }> {
  const normalizedPhone = normalizePhone(phone)

  try {
    const result = await RateLimitService.checkIPRateLimit(
      `whatsapp-otp:${normalizedPhone}`,
      MAX_OTPS_PER_HOUR,
      3600 // 1 hour in seconds
    )
    return { allowed: result.allowed, remaining: result.remaining }
  } catch (error) {
    // Fallback to in-memory
    const now = new Date()
    const hourAgo = new Date(now.getTime() - 60 * 60 * 1000)

    const rateLimit = rateLimitStore.get(normalizedPhone)

    if (!rateLimit || rateLimit.windowStart < hourAgo) {
      rateLimitStore.set(normalizedPhone, { count: 1, windowStart: now })
      return { allowed: true, remaining: MAX_OTPS_PER_HOUR - 1 }
    }

    if (rateLimit.count >= MAX_OTPS_PER_HOUR) {
      return { allowed: false, remaining: 0 }
    }

    rateLimit.count++
    return { allowed: true, remaining: MAX_OTPS_PER_HOUR - rateLimit.count }
  }
}

/**
 * Send OTP to phone number via WhatsApp
 */
export async function sendOTP(phone: string, name?: string): Promise<SendOTPResult> {
  try {
    const normalizedPhone = normalizePhone(phone)

    // Check rate limit
    const { allowed, remaining } = await checkRateLimit(phone)
    if (!allowed) {
      return {
        success: false,
        message: 'Too many OTP requests. Please try again later.',
        error: 'RATE_LIMIT_EXCEEDED',
      }
    }

    // Check resend cooldown
    const existingOTP = await getOTPFromStore(normalizedPhone)
    if (existingOTP) {
      const lastSentAt = new Date(existingOTP.lastSentAt)
      const cooldownEnd = new Date(lastSentAt.getTime() + RESEND_COOLDOWN_SECONDS * 1000)
      if (new Date() < cooldownEnd) {
        const cooldownRemaining = Math.ceil((cooldownEnd.getTime() - Date.now()) / 1000)
        return {
          success: false,
          message: `Please wait ${cooldownRemaining} seconds before requesting a new OTP`,
          cooldownRemaining,
          error: 'COOLDOWN_ACTIVE',
        }
      }
    }

    // Generate OTP
    const otp = generateOTP()
    const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000)
    const now = new Date()

    // Store OTP in Redis (with memory fallback)
    const otpData: OTPData = {
      otp,
      expiresAt: expiresAt.toISOString(),
      attempts: 0,
      lastSentAt: now.toISOString(),
      verified: false,
    }
    await setOTPInStore(normalizedPhone, otpData, OTP_EXPIRY_MINUTES * 60 + 60) // Extra 60s buffer

    // Send via WhatsApp
    let result
    if (name) {
      result = await sendLoginOTP({ phone, name, otp })
    } else {
      result = await sendWhatsAppOTP({ phone, otp })
    }

    if (!result.success) {
      // Clean up failed OTP
      await deleteOTPFromStore(normalizedPhone)
      return {
        success: false,
        message: 'Failed to send OTP. Please try again.',
        error: result.error,
      }
    }

    // Track event
    await trackEvent({
      phone,
      eventName: 'otp_sent',
      eventData: {
        purpose: 'login',
        method: 'whatsapp',
        timestamp: now.toISOString(),
      },
    })

    return {
      success: true,
      message: `OTP sent to your WhatsApp number ending in ${normalizedPhone.slice(-4)}`,
      expiresIn: OTP_EXPIRY_MINUTES * 60,
    }
  } catch (error) {
    console.error('Send OTP error:', error)
    return {
      success: false,
      message: 'Failed to send OTP. Please try again.',
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Verify OTP
 */
export async function verifyOTP(phone: string, otp: string): Promise<VerifyOTPResult> {
  try {
    const normalizedPhone = normalizePhone(phone)
    const storedOTP = await getOTPFromStore(normalizedPhone)

    // Check if OTP exists
    if (!storedOTP) {
      return {
        success: false,
        message: 'No OTP found. Please request a new one.',
        error: 'OTP_NOT_FOUND',
      }
    }

    const expiresAt = new Date(storedOTP.expiresAt)

    // Check if expired
    if (!isOTPValid(expiresAt)) {
      await deleteOTPFromStore(normalizedPhone)
      return {
        success: false,
        message: 'OTP has expired. Please request a new one.',
        error: 'OTP_EXPIRED',
      }
    }

    // Check attempts
    if (storedOTP.attempts >= MAX_VERIFY_ATTEMPTS) {
      await deleteOTPFromStore(normalizedPhone)
      return {
        success: false,
        message: 'Too many failed attempts. Please request a new OTP.',
        error: 'MAX_ATTEMPTS_EXCEEDED',
      }
    }

    // Verify OTP using timing-safe comparison to prevent timing attacks
    const storedOTPBuffer = Buffer.from(storedOTP.otp, 'utf8')
    const providedOTPBuffer = Buffer.from(otp, 'utf8')
    // Ensure same length comparison (timing-safe even if lengths differ)
    const isValidOTP =
      storedOTPBuffer.length === providedOTPBuffer.length &&
      timingSafeEqual(storedOTPBuffer, providedOTPBuffer)

    if (!isValidOTP) {
      // Increment attempts
      await updateOTPInStore(normalizedPhone, { attempts: storedOTP.attempts + 1 })
      const attemptsRemaining = MAX_VERIFY_ATTEMPTS - storedOTP.attempts - 1

      // Track failed attempt
      await trackEvent({
        phone,
        eventName: 'otp_verification_failed',
        eventData: {
          attemptsRemaining,
          timestamp: new Date().toISOString(),
        },
      })

      return {
        success: false,
        message: `Invalid OTP. ${attemptsRemaining} attempt(s) remaining.`,
        attemptsRemaining,
        error: 'INVALID_OTP',
      }
    }

    // Mark as verified
    await updateOTPInStore(normalizedPhone, { verified: true })

    // Generate cryptographically secure session token
    const randomPart = randomBytes(32).toString('hex')
    const token = `auth_${normalizedPhone}_${Date.now()}_${randomPart}`

    // Track successful verification
    await trackEvent({
      phone,
      eventName: 'otp_verified',
      eventData: {
        method: 'whatsapp',
        timestamp: new Date().toISOString(),
      },
    })

    // Update user traits
    await trackUser({
      phone,
      userId: `user_${normalizedPhone}`,
      traits: {
        lastLoginAt: new Date().toISOString(),
        phoneVerified: true,
      },
    })

    // Clean up OTP after short delay (prevent replay attacks)
    setTimeout(() => deleteOTPFromStore(normalizedPhone), 5000)

    return {
      success: true,
      message: 'Phone number verified successfully',
      token,
      user: {
        phone: normalizedPhone,
        isNewUser: false, // In production, check database
      },
    }
  } catch (error) {
    console.error('Verify OTP error:', error)
    return {
      success: false,
      message: 'Failed to verify OTP. Please try again.',
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Resend OTP
 */
export async function resendOTP(phone: string, name?: string): Promise<SendOTPResult> {
  const normalizedPhone = normalizePhone(phone)

  // Clear existing OTP attempts but keep cooldown
  const existingOTP = await getOTPFromStore(normalizedPhone)
  if (existingOTP) {
    const lastSentAt = new Date(existingOTP.lastSentAt)
    const cooldownEnd = new Date(lastSentAt.getTime() + RESEND_COOLDOWN_SECONDS * 1000)
    if (new Date() < cooldownEnd) {
      const cooldownRemaining = Math.ceil((cooldownEnd.getTime() - Date.now()) / 1000)
      return {
        success: false,
        message: `Please wait ${cooldownRemaining} seconds before requesting a new OTP`,
        cooldownRemaining,
        error: 'COOLDOWN_ACTIVE',
      }
    }
  }

  // Delete old OTP and send new one
  await deleteOTPFromStore(normalizedPhone)
  return sendOTP(phone, name)
}

/**
 * Check if phone has valid verified session
 */
export async function checkVerifiedSession(phone: string): Promise<boolean> {
  const normalizedPhone = normalizePhone(phone)
  const storedOTP = await getOTPFromStore(normalizedPhone)
  return storedOTP?.verified ?? false
}

/**
 * Clean up expired OTPs (call periodically)
 * Note: With Redis, TTL handles cleanup automatically.
 * This is primarily for the in-memory fallback.
 */
export function cleanupExpiredOTPs(): number {
  let cleaned = 0
  const now = new Date()

  otpStoreMemory.forEach((data, phone) => {
    const expiresAt = new Date(data.expiresAt)
    if (expiresAt < now && !data.verified) {
      otpStoreMemory.delete(phone)
      cleaned++
    }
  })

  return cleaned
}

/**
 * Get OTP status for a phone (admin/debug use)
 */
export async function getOTPStatus(phone: string): Promise<{
  exists: boolean
  expired?: boolean
  verified?: boolean
  attemptsUsed?: number
  storageType?: 'redis' | 'memory'
}> {
  const normalizedPhone = normalizePhone(phone)

  // Try Redis first
  try {
    const redisData = await redis.get(`${OTP_KEY_PREFIX}${normalizedPhone}`)
    if (redisData && typeof redisData === 'string') {
      const data = JSON.parse(redisData) as OTPData
      return {
        exists: true,
        expired: !isOTPValid(new Date(data.expiresAt)),
        verified: data.verified,
        attemptsUsed: data.attempts,
        storageType: 'redis',
      }
    }
  } catch (error) {
    // Fall through to memory check
  }

  // Check memory
  const memoryData = otpStoreMemory.get(normalizedPhone)
  if (memoryData) {
    return {
      exists: true,
      expired: !isOTPValid(new Date(memoryData.expiresAt)),
      verified: memoryData.verified,
      attemptsUsed: memoryData.attempts,
      storageType: 'memory',
    }
  }

  return { exists: false }
}
