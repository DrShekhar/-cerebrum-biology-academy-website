/**
 * WhatsApp OTP Authentication Service
 *
 * Provides phone-based authentication using WhatsApp OTP via Interakt.
 * Supports:
 * - Send OTP for login/signup
 * - Verify OTP
 * - Resend OTP with rate limiting
 * - Session management
 */

import {
  sendWhatsAppOTP,
  sendLoginOTP,
  generateOTP,
  isOTPValid,
  trackUser,
  trackEvent,
} from '../interakt'

// In-memory OTP store (use Redis in production)
const otpStore = new Map<
  string,
  {
    otp: string
    expiresAt: Date
    attempts: number
    lastSentAt: Date
    verified: boolean
  }
>()

// Configuration
const OTP_EXPIRY_MINUTES = 5
const MAX_VERIFY_ATTEMPTS = 3
const RESEND_COOLDOWN_SECONDS = 60
const MAX_OTPS_PER_HOUR = 5

// Rate limiting store (use Redis in production)
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
 * Check rate limit for phone number
 */
function checkRateLimit(phone: string): { allowed: boolean; remaining: number } {
  const normalizedPhone = normalizePhone(phone)
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

/**
 * Send OTP to phone number via WhatsApp
 */
export async function sendOTP(phone: string, name?: string): Promise<SendOTPResult> {
  try {
    const normalizedPhone = normalizePhone(phone)

    // Check rate limit
    const { allowed, remaining } = checkRateLimit(phone)
    if (!allowed) {
      return {
        success: false,
        message: 'Too many OTP requests. Please try again later.',
        error: 'RATE_LIMIT_EXCEEDED',
      }
    }

    // Check resend cooldown
    const existingOTP = otpStore.get(normalizedPhone)
    if (existingOTP) {
      const cooldownEnd = new Date(
        existingOTP.lastSentAt.getTime() + RESEND_COOLDOWN_SECONDS * 1000
      )
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

    // Store OTP
    otpStore.set(normalizedPhone, {
      otp,
      expiresAt,
      attempts: 0,
      lastSentAt: new Date(),
      verified: false,
    })

    // Send via WhatsApp
    let result
    if (name) {
      result = await sendLoginOTP({ phone, name, otp })
    } else {
      result = await sendWhatsAppOTP({ phone, otp })
    }

    if (!result.success) {
      // Clean up failed OTP
      otpStore.delete(normalizedPhone)
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
        timestamp: new Date().toISOString(),
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
    const storedOTP = otpStore.get(normalizedPhone)

    // Check if OTP exists
    if (!storedOTP) {
      return {
        success: false,
        message: 'No OTP found. Please request a new one.',
        error: 'OTP_NOT_FOUND',
      }
    }

    // Check if expired
    if (!isOTPValid(storedOTP.expiresAt)) {
      otpStore.delete(normalizedPhone)
      return {
        success: false,
        message: 'OTP has expired. Please request a new one.',
        error: 'OTP_EXPIRED',
      }
    }

    // Check attempts
    if (storedOTP.attempts >= MAX_VERIFY_ATTEMPTS) {
      otpStore.delete(normalizedPhone)
      return {
        success: false,
        message: 'Too many failed attempts. Please request a new OTP.',
        error: 'MAX_ATTEMPTS_EXCEEDED',
      }
    }

    // Verify OTP
    if (storedOTP.otp !== otp) {
      storedOTP.attempts++
      const attemptsRemaining = MAX_VERIFY_ATTEMPTS - storedOTP.attempts

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
    storedOTP.verified = true

    // Generate session token (in production, use JWT)
    const token = `auth_${normalizedPhone}_${Date.now()}_${Math.random().toString(36).slice(2)}`

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

    // Clean up OTP (keep for a short time to prevent replay)
    setTimeout(() => otpStore.delete(normalizedPhone), 5000)

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
  const existingOTP = otpStore.get(normalizedPhone)
  if (existingOTP) {
    const cooldownEnd = new Date(existingOTP.lastSentAt.getTime() + RESEND_COOLDOWN_SECONDS * 1000)
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
  otpStore.delete(normalizedPhone)
  return sendOTP(phone, name)
}

/**
 * Check if phone has valid verified session
 */
export function checkVerifiedSession(phone: string): boolean {
  const normalizedPhone = normalizePhone(phone)
  const storedOTP = otpStore.get(normalizedPhone)
  return storedOTP?.verified ?? false
}

/**
 * Clean up expired OTPs (call periodically)
 */
export function cleanupExpiredOTPs(): number {
  let cleaned = 0
  const now = new Date()

  otpStore.forEach((data, phone) => {
    if (data.expiresAt < now && !data.verified) {
      otpStore.delete(phone)
      cleaned++
    }
  })

  return cleaned
}

/**
 * Get OTP status for a phone (admin/debug use)
 */
export function getOTPStatus(phone: string): {
  exists: boolean
  expired?: boolean
  verified?: boolean
  attemptsUsed?: number
} {
  const normalizedPhone = normalizePhone(phone)
  const storedOTP = otpStore.get(normalizedPhone)

  if (!storedOTP) {
    return { exists: false }
  }

  return {
    exists: true,
    expired: !isOTPValid(storedOTP.expiresAt),
    verified: storedOTP.verified,
    attemptsUsed: storedOTP.attempts,
  }
}
