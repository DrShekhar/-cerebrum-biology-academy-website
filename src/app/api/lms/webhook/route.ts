/**
 * Cloudflare Stream Webhook Handler
 *
 * Receives video processing status updates from Cloudflare Stream.
 * Configure webhook URL in Cloudflare Dashboard:
 * https://cerebrumbiologyacademy.com/api/lms/webhook
 */

import { NextRequest, NextResponse } from 'next/server'
import { cloudflareStreamService } from '@/lib/lms/cloudflareStream'
import crypto from 'crypto'

const WEBHOOK_SECRET = process.env.CLOUDFLARE_STREAM_WEBHOOK_SECRET

/**
 * Verify webhook signature from Cloudflare Stream.
 *
 * Cloudflare sends `Webhook-Signature: time=<unix>,sig1=<hex>` and the signed
 * message is `${time}.${body}` (HMAC-SHA256, hex). The previous implementation
 * HMAC'd the raw body and compared the whole header, so it never matched in
 * production — uploaded videos stayed PROCESSING forever and never became
 * playable. See https://developers.cloudflare.com/stream/manage-video-library/using-webhooks/
 */
function verifyWebhookSignature(body: string, signature: string | null): boolean {
  if (!WEBHOOK_SECRET || !signature) {
    // In development, allow unverified webhooks
    if (process.env.NODE_ENV === 'development') {
      console.warn('Webhook signature verification skipped in development')
      return true
    }
    return false
  }

  // Parse "time=...,sig1=..." into a lookup.
  const parts: Record<string, string> = {}
  for (const segment of signature.split(',')) {
    const idx = segment.indexOf('=')
    if (idx === -1) continue
    parts[segment.slice(0, idx).trim()] = segment.slice(idx + 1).trim()
  }

  const timestamp = parts.time
  const providedSig = parts.sig1
  if (!timestamp || !providedSig) return false

  // Optional anti-replay: reject signatures older than 10 minutes (generous to
  // absorb processing/clock skew). Skip if timestamp isn't a sane number.
  const tsSeconds = Number(timestamp)
  if (Number.isFinite(tsSeconds)) {
    const ageSeconds = Math.abs(Date.now() / 1000 - tsSeconds)
    if (ageSeconds > 600) {
      console.warn('Webhook signature timestamp outside tolerance window')
      return false
    }
  }

  const signedPayload = `${timestamp}.${body}`
  const expectedSig = crypto.createHmac('sha256', WEBHOOK_SECRET).update(signedPayload).digest('hex')

  const providedBuf = Buffer.from(providedSig)
  const expectedBuf = Buffer.from(expectedSig)
  // timingSafeEqual throws on length mismatch — guard first so a bad signature
  // is a clean 401, not a 500.
  if (providedBuf.length !== expectedBuf.length) return false
  return crypto.timingSafeEqual(providedBuf, expectedBuf)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('Webhook-Signature')

    // Verify webhook signature
    if (!verifyWebhookSignature(body, signature)) {
      console.error('Invalid webhook signature')
      return NextResponse.json({ success: false, error: 'Invalid signature' }, { status: 401 })
    }

    const payload = JSON.parse(body)

    // Process the webhook
    await cloudflareStreamService.processWebhook(payload)

    return NextResponse.json({
      success: true,
      message: 'Webhook processed',
    })
  } catch (error) {
    console.error('Webhook processing error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process webhook' },
      { status: 500 }
    )
  }
}

// Handle HEAD requests for webhook verification
export async function HEAD() {
  return new NextResponse(null, { status: 200 })
}

// Handle GET for manual status check
export async function GET() {
  return NextResponse.json({
    service: 'Cloudflare Stream Webhook',
    status: 'active',
    configured: !!WEBHOOK_SECRET,
    usage: 'Configure this URL in Cloudflare Stream webhook settings',
  })
}
