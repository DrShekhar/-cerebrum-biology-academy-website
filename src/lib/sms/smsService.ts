/**
 * SMS Service - Unified SMS sending with Twilio and MSG91 fallback
 * Handles all SMS communications for the CRM
 */

import { z } from 'zod'

// SMS validation schema
const smsSchema = z.object({
  to: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format'),
  message: z.string().min(1).max(1600),
  from: z.string().optional(),
})

export type SMSOptions = z.infer<typeof smsSchema>

export interface SMSProvider {
  send(options: SMSOptions): Promise<{ success: boolean; messageId?: string; error?: string }>
  name: string
}

/**
 * Twilio SMS Provider (Primary)
 */
class TwilioProvider implements SMSProvider {
  name = 'Twilio'
  private accountSid: string
  private authToken: string
  private fromNumber: string

  constructor() {
    this.accountSid = process.env.TWILIO_ACCOUNT_SID || ''
    this.authToken = process.env.TWILIO_AUTH_TOKEN || ''
    this.fromNumber = process.env.TWILIO_PHONE_NUMBER || ''
  }

  async send(
    options: SMSOptions
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    if (!this.accountSid || !this.authToken || !this.fromNumber) {
      return { success: false, error: 'Twilio credentials not configured' }
    }

    try {
      const auth = Buffer.from(`${this.accountSid}:${this.authToken}`).toString('base64')

      const response = await fetch(
        `https://api.twilio.com/2010-04-01/Accounts/${this.accountSid}/Messages.json`,
        {
          method: 'POST',
          headers: {
            Authorization: `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            To: options.to,
            From: options.from || this.fromNumber,
            Body: options.message,
          }),
        }
      )

      const data = await response.json()

      if (response.ok && data.sid) {
        console.log(`✅ Twilio SMS sent successfully: ${data.sid}`)
        return { success: true, messageId: data.sid }
      } else {
        console.error(`❌ Twilio error:`, data)
        return { success: false, error: data.message || 'Unknown error' }
      }
    } catch (error) {
      console.error(`❌ Twilio exception:`, error)
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }
}

/**
 * MSG91 SMS Provider (Fallback - Optimized for India)
 */
class MSG91Provider implements SMSProvider {
  name = 'MSG91'
  private authKey: string
  private senderId: string
  private route: string

  constructor() {
    this.authKey = process.env.MSG91_AUTH_KEY || ''
    this.senderId = process.env.MSG91_SENDER_ID || 'CEREBR'
    this.route = process.env.MSG91_ROUTE || '4' // 4 = Transactional
  }

  async send(
    options: SMSOptions
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    if (!this.authKey) {
      return { success: false, error: 'MSG91 API key not configured' }
    }

    try {
      // MSG91 expects phone without + prefix and without country code for Indian numbers
      let phoneNumber = options.to.replace(/\+/g, '')

      // If it's an Indian number starting with 91, remove the country code
      if (phoneNumber.startsWith('91') && phoneNumber.length === 12) {
        phoneNumber = phoneNumber.substring(2)
      }

      const response = await fetch('https://api.msg91.com/api/v5/flow/', {
        method: 'POST',
        headers: {
          authkey: this.authKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender: this.senderId,
          route: this.route,
          country: '91',
          sms: [
            {
              message: options.message,
              to: [phoneNumber],
            },
          ],
        }),
      })

      const data = await response.json()

      if (response.ok && data.type === 'success') {
        console.log(`✅ MSG91 SMS sent successfully: ${data.request_id}`)
        return { success: true, messageId: data.request_id }
      } else {
        console.error(`❌ MSG91 error:`, data)
        return { success: false, error: data.message || 'Unknown error' }
      }
    } catch (error) {
      console.error(`❌ MSG91 exception:`, error)
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }
}

/**
 * Main SMS Service with automatic fallback
 */
class SMSService {
  private providers: SMSProvider[]

  constructor() {
    this.providers = [new TwilioProvider(), new MSG91Provider()]
  }

  /**
   * Send SMS with automatic fallback
   * Tries Twilio first, falls back to MSG91 if Twilio fails
   */
  async send(
    options: SMSOptions
  ): Promise<{ success: boolean; messageId?: string; provider?: string; error?: string }> {
    // Validate SMS options
    try {
      smsSchema.parse(options)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          success: false,
          error: `Validation error: ${error.issues.map((e) => e.message).join(', ')}`,
        }
      }
      return { success: false, error: 'Invalid SMS options' }
    }

    // Try each provider in sequence
    for (const provider of this.providers) {
      console.log(`📱 Attempting to send SMS via ${provider.name}...`)
      const result = await provider.send(options)

      if (result.success) {
        return { ...result, provider: provider.name }
      }

      console.warn(`⚠️ ${provider.name} failed, trying next provider...`)
    }

    // All providers failed
    return { success: false, error: 'All SMS providers failed' }
  }

  /**
   * Send SMS using specific provider
   */
  async sendWithProvider(
    providerName: 'Twilio' | 'MSG91',
    options: SMSOptions
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    const provider = this.providers.find((p) => p.name === providerName)
    if (!provider) {
      return { success: false, error: `Provider ${providerName} not found` }
    }

    return provider.send(options)
  }

  /**
   * Format phone number to E.164 format
   * Assumes Indian numbers if no country code provided
   */
  formatPhoneNumber(phone: string): string {
    // Remove all non-numeric characters
    let cleaned = phone.replace(/\D/g, '')

    // If it starts with 0, remove it (Indian mobile numbers)
    if (cleaned.startsWith('0')) {
      cleaned = cleaned.substring(1)
    }

    // If it's 10 digits, assume Indian number and add +91
    if (cleaned.length === 10) {
      return `+91${cleaned}`
    }

    // If it already has country code but no +, add it
    if (!phone.startsWith('+') && cleaned.length > 10) {
      return `+${cleaned}`
    }

    return phone
  }
}

// Singleton instance
export const smsService = new SMSService()
