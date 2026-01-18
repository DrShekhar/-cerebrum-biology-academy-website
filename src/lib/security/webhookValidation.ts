/**
 * Centralized Webhook Signature Validation
 *
 * This module provides secure, consistent webhook signature verification
 * across all webhook endpoints. Uses timing-safe comparison to prevent
 * timing attacks.
 *
 * SECURITY RULES:
 * 1. Never allow unsigned webhooks in production
 * 2. Development bypass requires explicit ALLOW_UNSIGNED_WEBHOOKS=true
 * 3. All signatures use HMAC-SHA256 with timing-safe comparison
 */

import crypto from 'crypto'
import { logger } from '@/lib/logger'

export type WebhookProvider =
  | 'razorpay'
  | 'stripe'
  | 'whatsapp'
  | 'meta'
  | 'google_ads'
  | 'cloudflare'
  | 'sulekha'
  | 'justdial'
  | 'interakt'
  | 'generic'

interface WebhookValidationOptions {
  /** The raw request body as string */
  body: string
  /** The signature from the request header */
  signature: string | null
  /** The webhook provider for provider-specific handling */
  provider: WebhookProvider
  /** Optional timestamp for replay attack protection */
  timestamp?: string
  /** Maximum age in seconds for timestamp validation (default: 300 = 5 minutes) */
  maxAgeSeconds?: number
}

interface ValidationResult {
  isValid: boolean
  error?: string
  provider: WebhookProvider
}

/**
 * Get the webhook secret for a specific provider
 */
function getWebhookSecret(provider: WebhookProvider): string | undefined {
  const secretMap: Record<WebhookProvider, string | undefined> = {
    razorpay: process.env.RAZORPAY_WEBHOOK_SECRET,
    stripe: process.env.STRIPE_WEBHOOK_SECRET,
    whatsapp: process.env.WHATSAPP_WEBHOOK_SECRET,
    meta: process.env.WEBHOOK_SECRET_META_ADS,
    google_ads: process.env.WEBHOOK_SECRET_GOOGLE_ADS,
    cloudflare: process.env.CLOUDFLARE_STREAM_WEBHOOK_SECRET,
    sulekha: process.env.WEBHOOK_SECRET_SULEKHA,
    justdial: process.env.WEBHOOK_SECRET_JUSTDIAL,
    interakt: process.env.INTERAKT_WEBHOOK_SECRET,
    generic: process.env.GENERIC_WEBHOOK_SECRET,
  }

  return secretMap[provider]
}

/**
 * Check if unsigned webhooks are explicitly allowed (for local development only)
 * This is NEVER allowed in production, even if the env var is set
 */
function isUnsignedWebhookAllowed(): boolean {
  // CRITICAL: Never allow in production
  if (process.env.NODE_ENV === 'production') {
    return false
  }

  // Even in development, require explicit opt-in
  return process.env.ALLOW_UNSIGNED_WEBHOOKS === 'true'
}

/**
 * Timing-safe HMAC-SHA256 signature verification
 */
function verifyHmacSha256(body: string, signature: string, secret: string): boolean {
  try {
    const expectedSignature = crypto.createHmac('sha256', secret).update(body, 'utf8').digest('hex')

    // Ensure both signatures are the same length to prevent length-based timing attacks
    if (signature.length !== expectedSignature.length) {
      return false
    }

    return crypto.timingSafeEqual(
      Buffer.from(signature, 'hex'),
      Buffer.from(expectedSignature, 'hex')
    )
  } catch (error) {
    logger.error('HMAC verification error', error)
    return false
  }
}

/**
 * Verify webhook signature with provider-specific handling
 */
export function verifyWebhookSignature(options: WebhookValidationOptions): ValidationResult {
  const { body, signature, provider, timestamp, maxAgeSeconds = 300 } = options

  // Check for missing signature
  if (!signature) {
    if (isUnsignedWebhookAllowed()) {
      logger.warn('Unsigned webhook allowed in development', { provider })
      return { isValid: true, provider }
    }
    return {
      isValid: false,
      error: 'Missing webhook signature',
      provider,
    }
  }

  // Get the secret for this provider
  const secret = getWebhookSecret(provider)
  if (!secret) {
    logger.error(`Webhook secret not configured for provider: ${provider}`)
    return {
      isValid: false,
      error: `Webhook secret not configured for ${provider}`,
      provider,
    }
  }

  // Optional timestamp validation for replay attack protection
  if (timestamp) {
    const timestampSeconds = parseInt(timestamp, 10)
    const currentSeconds = Math.floor(Date.now() / 1000)
    const age = currentSeconds - timestampSeconds

    if (age > maxAgeSeconds || age < -60) {
      // Allow 60s clock skew
      logger.warn('Webhook timestamp validation failed', {
        provider,
        age,
        maxAgeSeconds,
      })
      return {
        isValid: false,
        error: 'Webhook timestamp expired or invalid',
        provider,
      }
    }
  }

  // Provider-specific signature verification
  let isValid = false

  switch (provider) {
    case 'razorpay':
      // Razorpay sends signature in x-razorpay-signature header
      isValid = verifyHmacSha256(body, signature, secret)
      break

    case 'stripe':
      // Stripe uses t=timestamp,v1=signature format
      try {
        const parts = signature.split(',')
        const timestampPart = parts.find((p) => p.startsWith('t='))
        const signaturePart = parts.find((p) => p.startsWith('v1='))

        if (!timestampPart || !signaturePart) {
          return { isValid: false, error: 'Invalid Stripe signature format', provider }
        }

        const stripeTimestamp = timestampPart.replace('t=', '')
        const stripeSignature = signaturePart.replace('v1=', '')
        const payload = `${stripeTimestamp}.${body}`

        const expectedSig = crypto
          .createHmac('sha256', secret)
          .update(payload, 'utf8')
          .digest('hex')

        isValid = crypto.timingSafeEqual(Buffer.from(stripeSignature), Buffer.from(expectedSig))
      } catch (error) {
        logger.error('Stripe signature verification error', error)
        isValid = false
      }
      break

    case 'whatsapp':
    case 'meta':
      // Meta/WhatsApp sends sha256=<signature>
      const metaSignature = signature.replace('sha256=', '')
      isValid = verifyHmacSha256(body, metaSignature, secret)
      break

    case 'cloudflare':
    case 'google_ads':
    case 'sulekha':
    case 'justdial':
    case 'interakt':
    case 'generic':
      // Standard HMAC-SHA256 verification
      isValid = verifyHmacSha256(body, signature, secret)
      break

    default:
      isValid = verifyHmacSha256(body, signature, secret)
  }

  if (!isValid) {
    logger.warn('Webhook signature verification failed', { provider })
    return {
      isValid: false,
      error: 'Invalid webhook signature',
      provider,
    }
  }

  logger.info('Webhook signature verified', { provider })
  return { isValid: true, provider }
}

/**
 * Higher-order function to create a webhook handler with automatic signature verification
 */
export function createSecureWebhookHandler<T>(
  provider: WebhookProvider,
  handler: (payload: T) => Promise<void>
) {
  return async (
    body: string,
    signature: string | null
  ): Promise<{ success: boolean; error?: string }> => {
    const validation = verifyWebhookSignature({ body, signature, provider })

    if (!validation.isValid) {
      return { success: false, error: validation.error }
    }

    try {
      const payload = JSON.parse(body) as T
      await handler(payload)
      return { success: true }
    } catch (error) {
      logger.error('Webhook handler error', error)
      return { success: false, error: 'Handler execution failed' }
    }
  }
}

/**
 * Generate a webhook signature for testing purposes
 * ONLY USE IN TESTS - never expose this in production code
 */
export function generateTestSignature(body: string, provider: WebhookProvider): string | null {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('generateTestSignature cannot be used in production')
  }

  const secret = getWebhookSecret(provider)
  if (!secret) return null

  return crypto.createHmac('sha256', secret).update(body, 'utf8').digest('hex')
}
