/**
 * Unified OTP Service
 *
 * Supports multiple providers:
 * - Twilio Verify (SMS, WhatsApp, Email)
 * - Interakt (WhatsApp only)
 *
 * Provider selection via OTP_PROVIDER env var or auto-detection
 */

import { sendOTP as twilioSendOTP, verifyOTP as twilioVerifyOTP } from './twilio-verify'
import { sendWhatsAppOTP as interaktSendOTP, generateOTP } from '@/lib/interakt'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/utils/logger'

// Provider types
export type OTPProvider = 'twilio' | 'interakt' | 'auto'
export type OTPChannel = 'sms' | 'whatsapp' | 'email'

// Configuration
const OTP_PROVIDER = (process.env.OTP_PROVIDER as OTPProvider) || 'auto'
const TWILIO_CONFIGURED =
  !!process.env.TWILIO_ACCOUNT_SID &&
  !!process.env.TWILIO_AUTH_TOKEN &&
  !!process.env.TWILIO_VERIFY_SERVICE_SID
const INTERAKT_CONFIGURED = !!process.env.INTERAKT_API_KEY

// Result types
export interface SendOTPResult {
  success: boolean
  provider: OTPProvider
  channel: OTPChannel
  to: string
  error?: string
  expiresIn?: number // seconds
}

export interface VerifyOTPResult {
  success: boolean
  valid: boolean
  provider: OTPProvider
  error?: string
}

/**
 * Determine which provider to use
 */
function getProvider(preferredChannel: OTPChannel): 'twilio' | 'interakt' {
  if (OTP_PROVIDER === 'twilio' && TWILIO_CONFIGURED) {
    return 'twilio'
  }

  if (OTP_PROVIDER === 'interakt' && INTERAKT_CONFIGURED) {
    return 'interakt'
  }

  // Auto-select based on channel and availability
  if (preferredChannel === 'whatsapp') {
    // Prefer Interakt for WhatsApp (better templates for India)
    if (INTERAKT_CONFIGURED) return 'interakt'
    if (TWILIO_CONFIGURED) return 'twilio'
  }

  // For SMS/Email, use Twilio
  if (TWILIO_CONFIGURED) return 'twilio'

  // Fallback to Interakt for WhatsApp-only
  if (INTERAKT_CONFIGURED) return 'interakt'

  throw new Error('No OTP provider configured. Set TWILIO or INTERAKT credentials.')
}

/**
 * Format phone number consistently
 */
function formatPhone(phone: string): string {
  let formatted = phone.replace(/[\s\-\(\)]/g, '')
  if (!formatted.startsWith('+')) {
    formatted = formatted.startsWith('91') ? `+${formatted}` : `+91${formatted}`
  }
  return formatted
}

/**
 * Send OTP via the best available provider
 */
export async function sendOTP(
  phone: string,
  channel: OTPChannel = 'whatsapp'
): Promise<SendOTPResult> {
  const formattedPhone = formatPhone(phone)
  const provider = getProvider(channel)

  logger.info('Sending OTP', {
    phone: formattedPhone.slice(-4),
    channel,
    provider,
  })

  try {
    if (provider === 'twilio') {
      const result = await twilioSendOTP(formattedPhone, channel)

      if (!result.success) {
        return {
          success: false,
          provider: 'twilio',
          channel,
          to: formattedPhone,
          error: result.error,
        }
      }

      return {
        success: true,
        provider: 'twilio',
        channel,
        to: formattedPhone,
        expiresIn: 600, // Twilio default: 10 minutes
      }
    } else {
      // Interakt - requires database storage for verification
      const otp = generateOTP()
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes

      // Store OTP in database
      await prisma.whatsapp_otp.create({
        data: {
          phone: formattedPhone,
          otp,
          expiresAt,
        },
      })

      // Send via Interakt
      const result = await interaktSendOTP({
        phone: formattedPhone,
        otp,
      })

      if (!result.success) {
        return {
          success: false,
          provider: 'interakt',
          channel: 'whatsapp',
          to: formattedPhone,
          error: result.error,
        }
      }

      return {
        success: true,
        provider: 'interakt',
        channel: 'whatsapp',
        to: formattedPhone,
        expiresIn: 600,
      }
    }
  } catch (error) {
    logger.error('OTP send failed', { error, phone: formattedPhone.slice(-4), provider })
    return {
      success: false,
      provider,
      channel,
      to: formattedPhone,
      error: error instanceof Error ? error.message : 'Failed to send OTP',
    }
  }
}

/**
 * Verify OTP
 */
export async function verifyOTP(
  phone: string,
  code: string,
  channel: OTPChannel = 'whatsapp'
): Promise<VerifyOTPResult> {
  const formattedPhone = formatPhone(phone)
  const provider = getProvider(channel)

  logger.info('Verifying OTP', {
    phone: formattedPhone.slice(-4),
    provider,
  })

  try {
    if (provider === 'twilio') {
      const result = await twilioVerifyOTP(formattedPhone, code, channel)

      return {
        success: result.success,
        valid: result.valid,
        provider: 'twilio',
        error: result.error,
      }
    } else {
      // Interakt - verify from database
      const otpRecord = await prisma.whatsapp_otp.findFirst({
        where: {
          phone: formattedPhone,
          verified: false,
        },
        orderBy: {
          createdAt: 'desc',
        },
      })

      if (!otpRecord) {
        return {
          success: false,
          valid: false,
          provider: 'interakt',
          error: 'No OTP found. Please request a new one.',
        }
      }

      if (new Date() > otpRecord.expiresAt) {
        return {
          success: false,
          valid: false,
          provider: 'interakt',
          error: 'OTP expired. Please request a new one.',
        }
      }

      if (otpRecord.attempts >= 5) {
        return {
          success: false,
          valid: false,
          provider: 'interakt',
          error: 'Too many attempts. Please request a new OTP.',
        }
      }

      // Increment attempts
      await prisma.whatsapp_otp.update({
        where: { id: otpRecord.id },
        data: { attempts: otpRecord.attempts + 1 },
      })

      const isValid = otpRecord.otp === code

      if (isValid) {
        // Mark as verified
        await prisma.whatsapp_otp.update({
          where: { id: otpRecord.id },
          data: { verified: true },
        })
      }

      return {
        success: true,
        valid: isValid,
        provider: 'interakt',
        error: isValid ? undefined : 'Invalid OTP',
      }
    }
  } catch (error) {
    logger.error('OTP verify failed', { error, phone: formattedPhone.slice(-4), provider })
    return {
      success: false,
      valid: false,
      provider,
      error: error instanceof Error ? error.message : 'Verification failed',
    }
  }
}

/**
 * Check which providers are available
 */
export function getAvailableProviders(): {
  twilio: boolean
  interakt: boolean
  current: OTPProvider
} {
  return {
    twilio: TWILIO_CONFIGURED,
    interakt: INTERAKT_CONFIGURED,
    current: OTP_PROVIDER,
  }
}
