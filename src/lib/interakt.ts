/**
 * Interakt WhatsApp API Service
 * Handles all WhatsApp messaging through Interakt platform
 */

import { logger } from './utils/logger'

const INTERAKT_API_URL = 'https://api.interakt.ai/v1'
const INTERAKT_API_KEY = process.env.INTERAKT_API_KEY

if (!INTERAKT_API_KEY) {
  logger.warn('INTERAKT_API_KEY is not set. WhatsApp functionality will be limited.', {
    service: 'interakt',
    feature: 'whatsapp',
  })
}

interface SendMessageParams {
  phone: string
  message: string
  mediaUrl?: string
  templateName?: string
  templateParams?: Record<string, string>
}

interface SendOTPParams {
  phone: string
  otp: string
}

/**
 * Send a WhatsApp message via Interakt
 */
export async function sendWhatsAppMessage(params: SendMessageParams): Promise<{
  success: boolean
  messageId?: string
  error?: string
}> {
  try {
    if (!INTERAKT_API_KEY) {
      throw new Error('Interakt API key not configured')
    }

    const { phone, message, mediaUrl, templateName, templateParams } = params

    // Format phone number (ensure it has country code)
    const formattedPhone = phone.startsWith('+') ? phone : `+91${phone}`

    const requestBody: any = {
      countryCode: '+91',
      phoneNumber: formattedPhone.replace('+91', ''),
      type: 'Template',
      callbackData: Date.now().toString(),
    }

    if (templateName) {
      requestBody.template = {
        name: templateName,
        languageCode: 'en',
        bodyValues: templateParams ? Object.values(templateParams) : [],
      }
    } else {
      requestBody.type = 'Text'
      requestBody.data = {
        message,
      }
    }

    if (mediaUrl) {
      requestBody.data = {
        ...requestBody.data,
        mediaUrl,
        caption: message,
      }
    }

    const response = await fetch(`${INTERAKT_API_URL}/public/message/`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${INTERAKT_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    const data = await response.json()

    if (!response.ok) {
      logger.error('Interakt API error', {
        service: 'interakt',
        statusCode: response.status,
        error: data,
      })
      throw new Error(data.message || 'Failed to send WhatsApp message')
    }

    return {
      success: true,
      messageId: data.result?.messageId,
    }
  } catch (error) {
    logger.error('Error sending WhatsApp message', {
      service: 'interakt',
      error,
      phone: params.phone,
    })
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Send OTP via WhatsApp
 */
export async function sendWhatsAppOTP(params: SendOTPParams): Promise<{
  success: boolean
  error?: string
}> {
  const { phone, otp } = params

  const message = `Your Cerebrum Biology Academy verification code is: *${otp}*\n\nThis code will expire in 10 minutes.\n\nDo not share this code with anyone.`

  return sendWhatsAppMessage({
    phone,
    message,
  })
}

/**
 * Generate a 6-digit OTP
 */
export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

/**
 * Verify if OTP is still valid (not expired)
 */
export function isOTPValid(expiresAt: Date): boolean {
  return new Date() < expiresAt
}

/**
 * Send a welcome message when user first contacts via WhatsApp
 */
export async function sendWelcomeMessage(
  phone: string,
  name?: string
): Promise<{
  success: boolean
  error?: string
}> {
  const greeting = name ? `Hi ${name}` : 'Hello'
  const message = `${greeting}! 👋\n\nWelcome to Cerebrum Biology Academy!\n\nI'm here to help you with:\n✅ NEET Biology preparation\n✅ Live classes & recorded sessions\n✅ Doubt solving\n✅ Study materials\n\nHow can I assist you today?`

  return sendWhatsAppMessage({
    phone,
    message,
  })
}

/**
 * Send a message to notify counselor of new lead
 */
export async function notifyCounselorOfNewLead(params: {
  counselorPhone: string
  leadName: string
  leadPhone: string
  initialMessage: string
}): Promise<{
  success: boolean
  error?: string
}> {
  const { counselorPhone, leadName, leadPhone, initialMessage } = params

  const message = `🔔 *New Lead Alert*\n\nName: ${leadName}\nPhone: ${leadPhone}\n\nInitial Message:\n"${initialMessage}"\n\nPlease respond promptly!`

  return sendWhatsAppMessage({
    phone: counselorPhone,
    message,
  })
}
