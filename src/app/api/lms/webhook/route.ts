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
 * Verify webhook signature from Cloudflare
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

  const expectedSignature = crypto.createHmac('sha256', WEBHOOK_SECRET).update(body).digest('hex')

  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))
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

    console.log('Cloudflare Stream webhook received:', {
      videoId: payload.uid,
      status: payload.status?.state,
    })

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
