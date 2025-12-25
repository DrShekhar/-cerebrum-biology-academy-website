/**
 * Twilio Verify OTP Service
 * Secure OTP authentication via SMS, WhatsApp, and Email
 *
 * NOTE: Uses dynamic import to prevent 2.13MB twilio package from
 * being bundled into client-side code.
 */

import crypto from 'crypto'
import type { Twilio } from 'twilio'

// Environment validation - fail if not configured in production
function getRequiredEnv(key: string): string {
  const value = process.env[key]
  if (!value) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error(`Missing required environment variable: ${key}`)
    }
    console.warn(`[DEV] Missing ${key} - OTP verification will be mocked`)
    return ''
  }
  return value
}

const TWILIO_ACCOUNT_SID = getRequiredEnv('TWILIO_ACCOUNT_SID')
const TWILIO_AUTH_TOKEN = getRequiredEnv('TWILIO_AUTH_TOKEN')
const TWILIO_VERIFY_SERVICE_SID = getRequiredEnv('TWILIO_VERIFY_SERVICE_SID')

// Lazy-load Twilio client to reduce bundle size
let twilioClientPromise: Promise<Twilio | null> | null = null

async function getTwilioClient(): Promise<Twilio | null> {
  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN) {
    return null
  }

  if (!twilioClientPromise) {
    twilioClientPromise = import('twilio').then((twilioModule) => {
      const twilio = twilioModule.default
      return twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
    })
  }

  return twilioClientPromise
}

export type OTPChannel = 'sms' | 'whatsapp' | 'email'

export interface SendOTPResult {
  success: boolean
  sid?: string
  error?: string
  channel: OTPChannel
  to: string
  status?: string
}

export interface VerifyOTPResult {
  success: boolean
  valid: boolean
  error?: string
  status?: string
}

/**
 * Hash OTP for secure storage (when needed for backup/audit)
 */
export function hashOTP(otp: string): string {
  return crypto.createHash('sha256').update(otp).digest('hex')
}

/**
 * Generate cryptographically secure token
 */
export function generateSecureToken(length: number = 32): string {
  return crypto.randomBytes(length).toString('hex')
}

/**
 * Generate cryptographically secure OTP (for fallback)
 */
export function generateSecureOTP(digits: number = 6): string {
  const max = Math.pow(10, digits)
  const min = Math.pow(10, digits - 1)
  const randomBytes = crypto.randomBytes(4)
  const randomNumber = randomBytes.readUInt32BE(0)
  const otp = min + (randomNumber % (max - min))
  return otp.toString()
}

/**
 * Format phone number for Twilio
 */
function formatPhoneNumber(phone: string, countryCode: string = '+91'): string {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '')

  // If starts with country code, use as-is
  if (digits.startsWith('91') && digits.length === 12) {
    return `+${digits}`
  }

  // Otherwise, add country code
  if (digits.length === 10) {
    return `${countryCode}${digits}`
  }

  return `+${digits}`
}

/**
 * Send OTP via Twilio Verify
 */
export async function sendOTP(to: string, channel: OTPChannel): Promise<SendOTPResult> {
  try {
    // Get Twilio client (lazy loaded)
    const twilioClient = await getTwilioClient()

    // Development mock mode
    if (!twilioClient) {
      const mockOTP = generateSecureOTP()
      console.log(`[DEV MOCK] OTP for ${to} via ${channel}: ${mockOTP}`)
      return {
        success: true,
        sid: `mock_${Date.now()}`,
        channel,
        to,
        status: 'pending',
      }
    }

    const formattedTo = channel === 'email' ? to : formatPhoneNumber(to)

    const verification = await twilioClient.verify.v2
      .services(TWILIO_VERIFY_SERVICE_SID)
      .verifications.create({
        to: formattedTo,
        channel: channel,
      })

    return {
      success: true,
      sid: verification.sid,
      channel,
      to: formattedTo,
      status: verification.status,
    }
  } catch (error: any) {
    console.error(`Failed to send OTP via ${channel}:`, error.message)

    // Handle specific Twilio errors
    if (error.code === 60200) {
      return {
        success: false,
        error: 'Invalid phone number format',
        channel,
        to,
      }
    }

    if (error.code === 60203) {
      return {
        success: false,
        error: 'Too many attempts. Please try again later.',
        channel,
        to,
      }
    }

    return {
      success: false,
      error: 'Failed to send verification code. Please try again.',
      channel,
      to,
    }
  }
}

/**
 * Verify OTP via Twilio Verify
 */
export async function verifyOTP(
  to: string,
  code: string,
  channel: OTPChannel
): Promise<VerifyOTPResult> {
  try {
    // Get Twilio client (lazy loaded)
    const twilioClient = await getTwilioClient()

    // Development mock mode - accept any 6-digit code
    if (!twilioClient) {
      const isValid = /^\d{6}$/.test(code)
      console.log(`[DEV MOCK] Verifying OTP for ${to}: ${isValid ? 'VALID' : 'INVALID'}`)
      return {
        success: true,
        valid: isValid,
        status: isValid ? 'approved' : 'pending',
      }
    }

    const formattedTo = channel === 'email' ? to : formatPhoneNumber(to)

    const verificationCheck = await twilioClient.verify.v2
      .services(TWILIO_VERIFY_SERVICE_SID)
      .verificationChecks.create({
        to: formattedTo,
        code: code,
      })

    return {
      success: true,
      valid: verificationCheck.status === 'approved',
      status: verificationCheck.status,
    }
  } catch (error: any) {
    console.error(`Failed to verify OTP:`, error.message)

    // Handle specific errors
    if (error.code === 60202) {
      return {
        success: false,
        valid: false,
        error: 'Too many invalid attempts. Please request a new code.',
      }
    }

    if (error.code === 20404) {
      return {
        success: false,
        valid: false,
        error: 'Verification expired. Please request a new code.',
      }
    }

    return {
      success: false,
      valid: false,
      error: 'Verification failed. Please try again.',
    }
  }
}

/**
 * Send OTP to multiple channels (SMS + WhatsApp)
 */
export async function sendOTPMultiChannel(
  phone: string,
  channels: OTPChannel[] = ['sms', 'whatsapp']
): Promise<SendOTPResult[]> {
  const results = await Promise.all(channels.map((channel) => sendOTP(phone, channel)))
  return results
}

/**
 * Rate limit check using Redis or in-memory (for Twilio's built-in isn't enough)
 */
const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

export function checkOTPRateLimit(
  identifier: string,
  maxAttempts: number = 5,
  windowMs: number = 60 * 60 * 1000 // 1 hour
): { allowed: boolean; remainingAttempts: number; resetAt?: Date } {
  const now = Date.now()
  const record = rateLimitStore.get(identifier)

  // No record or expired - allow
  if (!record || now > record.resetAt) {
    rateLimitStore.set(identifier, { count: 1, resetAt: now + windowMs })
    return { allowed: true, remainingAttempts: maxAttempts - 1 }
  }

  // Check limit
  if (record.count >= maxAttempts) {
    return {
      allowed: false,
      remainingAttempts: 0,
      resetAt: new Date(record.resetAt),
    }
  }

  // Increment and allow
  record.count++
  return { allowed: true, remainingAttempts: maxAttempts - record.count }
}

/**
 * Clear rate limit (after successful verification)
 */
export function clearOTPRateLimit(identifier: string): void {
  rateLimitStore.delete(identifier)
}
