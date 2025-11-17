/**
 * Email Service - Unified email sending with SendGrid and Resend fallback
 * Handles all email communications for the CRM
 */

import { z } from 'zod'

// Email validation schema
const emailSchema = z.object({
  to: z.string().email(),
  from: z.string().email().optional(),
  subject: z.string().min(1),
  html: z.string().min(1),
  text: z.string().optional(),
  cc: z.array(z.string().email()).optional(),
  bcc: z.array(z.string().email()).optional(),
  replyTo: z.string().email().optional(),
  attachments: z
    .array(
      z.object({
        filename: z.string(),
        content: z.string(), // Base64 encoded
        contentType: z.string(),
      })
    )
    .optional(),
})

export type EmailOptions = z.infer<typeof emailSchema>

export interface EmailProvider {
  send(options: EmailOptions): Promise<{ success: boolean; messageId?: string; error?: string }>
  name: string
}

/**
 * SendGrid Email Provider
 */
class SendGridProvider implements EmailProvider {
  name = 'SendGrid'
  private apiKey: string
  private fromEmail: string

  constructor() {
    this.apiKey = process.env.SENDGRID_API_KEY || ''
    this.fromEmail = process.env.SENDGRID_FROM_EMAIL || 'noreply@cerebrumbiologyacademy.com'
  }

  async send(
    options: EmailOptions
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    if (!this.apiKey) {
      return { success: false, error: 'SendGrid API key not configured' }
    }

    try {
      const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [
            {
              to: [{ email: options.to }],
              cc: options.cc?.map((email) => ({ email })),
              bcc: options.bcc?.map((email) => ({ email })),
            },
          ],
          from: { email: options.from || this.fromEmail },
          reply_to: options.replyTo ? { email: options.replyTo } : undefined,
          subject: options.subject,
          content: [
            { type: 'text/html', value: options.html },
            options.text ? { type: 'text/plain', value: options.text } : undefined,
          ].filter(Boolean),
          attachments: options.attachments?.map((att) => ({
            filename: att.filename,
            content: att.content,
            type: att.contentType,
            disposition: 'attachment',
          })),
        }),
      })

      if (response.ok) {
        const messageId = response.headers.get('x-message-id') || 'unknown'
        console.log(`✅ SendGrid email sent successfully: ${messageId}`)
        return { success: true, messageId }
      } else {
        const error = await response.text()
        console.error(`❌ SendGrid error:`, error)
        return { success: false, error }
      }
    } catch (error) {
      console.error(`❌ SendGrid exception:`, error)
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }
}

/**
 * Resend Email Provider (Fallback)
 */
class ResendProvider implements EmailProvider {
  name = 'Resend'
  private apiKey: string
  private fromEmail: string

  constructor() {
    this.apiKey = process.env.RESEND_API_KEY || ''
    this.fromEmail = process.env.RESEND_FROM_EMAIL || 'noreply@cerebrumbiologyacademy.com'
  }

  async send(
    options: EmailOptions
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    if (!this.apiKey) {
      return { success: false, error: 'Resend API key not configured' }
    }

    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: options.from || this.fromEmail,
          to: [options.to],
          cc: options.cc,
          bcc: options.bcc,
          reply_to: options.replyTo,
          subject: options.subject,
          html: options.html,
          text: options.text,
          attachments: options.attachments,
        }),
      })

      const data = await response.json()

      if (response.ok && data.id) {
        console.log(`✅ Resend email sent successfully: ${data.id}`)
        return { success: true, messageId: data.id }
      } else {
        console.error(`❌ Resend error:`, data)
        return { success: false, error: data.message || 'Unknown error' }
      }
    } catch (error) {
      console.error(`❌ Resend exception:`, error)
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }
}

/**
 * Main Email Service with automatic fallback
 */
class EmailService {
  private providers: EmailProvider[]

  constructor() {
    this.providers = [new SendGridProvider(), new ResendProvider()]
  }

  /**
   * Send email with automatic fallback
   * Tries SendGrid first, falls back to Resend if SendGrid fails
   */
  async send(
    options: EmailOptions
  ): Promise<{ success: boolean; messageId?: string; provider?: string; error?: string }> {
    // Validate email options
    try {
      emailSchema.parse(options)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          success: false,
          error: `Validation error: ${error.issues.map((e) => e.message).join(', ')}`,
        }
      }
      return { success: false, error: 'Invalid email options' }
    }

    // Try each provider in sequence
    for (const provider of this.providers) {
      console.log(`📧 Attempting to send email via ${provider.name}...`)
      const result = await provider.send(options)

      if (result.success) {
        return { ...result, provider: provider.name }
      }

      console.warn(`⚠️ ${provider.name} failed, trying next provider...`)
    }

    // All providers failed
    return { success: false, error: 'All email providers failed' }
  }

  /**
   * Send email using specific provider
   */
  async sendWithProvider(
    providerName: 'SendGrid' | 'Resend',
    options: EmailOptions
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    const provider = this.providers.find((p) => p.name === providerName)
    if (!provider) {
      return { success: false, error: `Provider ${providerName} not found` }
    }

    return provider.send(options)
  }
}

// Singleton instance
export const emailService = new EmailService()
