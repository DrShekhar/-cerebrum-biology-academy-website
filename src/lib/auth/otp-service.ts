/**
 * Unified OTP Service
 *
 * Supports Interakt for WhatsApp OTP (India)
 * Firebase Phone Auth is preferred for user-facing sign-in
 */

import { sendWhatsAppOTP as interaktSendOTP, generateOTP } from '@/lib/interakt'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/utils/logger'

// Provider types
export type OTPProvider = 'interakt' | 'firebase'
export type OTPChannel = 'sms' | 'whatsapp' | 'email'

// Configuration
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
 * Send OTP via Interakt WhatsApp
 * Note: For user sign-in, use Firebase Phone Auth instead
 */
export async function sendOTP(
  phone: string,
  channel: OTPChannel = 'whatsapp'
): Promise<SendOTPResult> {
  const formattedPhone = formatPhone(phone)

  // Only WhatsApp channel is supported via Interakt
  if (channel !== 'whatsapp') {
    return {
      success: false,
      provider: 'interakt',
      channel,
      to: formattedPhone,
      error: 'Only WhatsApp OTP is supported. For SMS OTP, use Firebase Phone Auth.',
    }
  }

  if (!INTERAKT_CONFIGURED) {
    return {
      success: false,
      provider: 'interakt',
      channel,
      to: formattedPhone,
      error: 'Interakt not configured. Set INTERAKT_API_KEY in environment.',
    }
  }

  logger.info('Sending OTP via Interakt', {
    phone: formattedPhone.slice(-4),
    channel,
  })

  try {
    // Generate OTP and store in database
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
  } catch (error) {
    logger.error('OTP send failed', { error, phone: formattedPhone.slice(-4) })
    return {
      success: false,
      provider: 'interakt',
      channel,
      to: formattedPhone,
      error: error instanceof Error ? error.message : 'Failed to send OTP',
    }
  }
}

/**
 * Verify OTP from database (Interakt)
 */
export async function verifyOTP(
  phone: string,
  code: string,
  _channel: OTPChannel = 'whatsapp'
): Promise<VerifyOTPResult> {
  const formattedPhone = formatPhone(phone)

  logger.info('Verifying OTP', {
    phone: formattedPhone.slice(-4),
    provider: 'interakt',
  })

  try {
    // Verify from database
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
  } catch (error) {
    logger.error('OTP verify failed', { error, phone: formattedPhone.slice(-4) })
    return {
      success: false,
      valid: false,
      provider: 'interakt',
      error: error instanceof Error ? error.message : 'Verification failed',
    }
  }
}

/**
 * Check which providers are available
 */
export function getAvailableProviders(): {
  interakt: boolean
  firebase: boolean
  recommended: string
} {
  return {
    interakt: INTERAKT_CONFIGURED,
    firebase: true, // Firebase Phone Auth is always available (configured client-side)
    recommended: 'Use Firebase Phone Auth for user sign-in, Interakt for admin/backend OTP',
  }
}
