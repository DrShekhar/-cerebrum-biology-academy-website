/**
 * Email Service — unified email sending with provider fallback.
 *
 * Phase 1.6 (2026-06): Resend promoted to primary transactional
 * provider (better deliverability + analytics + cheaper per email
 * than SendGrid for our volume). SendGrid retained as fallback so
 * a Resend outage doesn't block password resets / signup / payment
 * confirmations.
 *
 * Configure: RESEND_API_KEY + RESEND_FROM_EMAIL (or fall back to
 * SENDGRID_API_KEY + SENDGRID_FROM_EMAIL).
 *
 * All callers should use `emailService.send()`. Gmail SMTP is no
 * longer in the path — env vars SMTP_HOST / SMTP_USER / SMTP_PASS
 * are dead.
 */

import { z } from 'zod'
import { redactObject } from '@/lib/security/logger'
import { prisma } from '@/lib/prisma'

/** Is this address on the suppression list (hard bounce / complaint)? */
async function isSuppressed(email: string): Promise<boolean> {
  try {
    const hit = await prisma.email_suppressions.findUnique({
      where: { email: email.toLowerCase().trim() },
      select: { id: true },
    })
    return !!hit
  } catch {
    return false // never block sending on a suppression-lookup failure
  }
}

/**
 * Heuristic: is an email provider error worth retrying? Timeouts, rate limits
 * (429) and 5xx are transient; validation / auth / 4xx are permanent.
 */
function isTransientEmailError(error?: string): boolean {
  if (!error) return false
  const e = error.toLowerCase()
  if (/\b(4\d\d)\b/.test(e) && !/\b429\b/.test(e)) return false // 4xx except 429 = permanent
  return /timeout|timed out|econn|network|fetch failed|rate.?limit|429|\b5\d\d\b|temporar|unavailable/.test(
    e
  )
}

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
        console.error(`❌ Resend error:`, redactObject(data))
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
    // Resend first, SendGrid fallback. Provider order is the
    // migration control: deleting RESEND_API_KEY reverts to SendGrid
    // without a code change.
    this.providers = [new ResendProvider(), new SendGridProvider()]
  }

  /**
   * Send email with automatic fallback.
   * Tries Resend first, falls back to SendGrid on failure.
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

    // Skip addresses that hard-bounced or complained — re-sending to them hurts
    // sender reputation and can get the whole domain throttled/blocked.
    if (await isSuppressed(options.to)) {
      console.warn(`✋ Email to ${options.to} skipped — address is suppressed`)
      return { success: false, error: 'Recipient suppressed (bounce/complaint)' }
    }

    // Try each provider in sequence, with a short backoff retry for TRANSIENT
    // failures (timeouts / 429 / 5xx) before falling through to the next
    // provider. Permanent failures (invalid address, 4xx) fall through at once.
    let lastError = 'All email providers failed'
    for (const provider of this.providers) {
      for (let attempt = 0; attempt < 2; attempt++) {
        if (attempt > 0) {
          console.log(`📧 Retrying ${provider.name} (attempt ${attempt + 1})...`)
          await new Promise((r) => setTimeout(r, 500 * attempt))
        } else {
          console.log(`📧 Attempting to send email via ${provider.name}...`)
        }
        const result = await provider.send(options)
        if (result.success) {
          return { ...result, provider: provider.name }
        }
        lastError = result.error || lastError
        if (!isTransientEmailError(result.error)) break // permanent → next provider
      }
      console.warn(`⚠️ ${provider.name} failed, trying next provider...`)
    }

    // All providers failed
    return { success: false, error: lastError }
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
