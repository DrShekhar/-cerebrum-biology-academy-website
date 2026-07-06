/**
 * Zoom Event Subscription webhook.
 *
 * Configure in the Zoom App (Server-to-Server OAuth app > Feature > Event
 * Subscriptions):
 *   URL:    https://cerebrumbiologyacademy.com/api/zoom/webhook
 *   Events: recording.completed
 *   Env:    ZOOM_WEBHOOK_SECRET_TOKEN (the app's "Secret Token")
 *
 * Implements:
 *   - endpoint.url_validation challenge (plainToken + HMAC-SHA256 encryptedToken)
 *   - x-zm-signature verification on real events:
 *       message   = `v0:${x-zm-request-timestamp}:${rawBody}`
 *       signature = `v0=` + hex(HMAC-SHA256(message, ZOOM_WEBHOOK_SECRET_TOKEN))
 *   - recording.completed -> recordingPipeline (runs via after() so Zoom gets
 *     its 200 immediately; Zoom retries on slow/non-2xx responses)
 */

import { NextRequest, NextResponse } from 'next/server'
import { after } from 'next/server'
import crypto from 'crypto'
import { processRecordingCompleted } from '@/lib/zoom/recordingPipeline'
import type { ZoomRecordingMeeting } from '@/lib/zoom/recordingPipeline'

export const runtime = 'nodejs'

const ZOOM_WEBHOOK_SECRET = process.env.ZOOM_WEBHOOK_SECRET_TOKEN

function verifyZoomSignature(
  rawBody: string,
  signature: string | null,
  timestamp: string | null
): boolean {
  if (!ZOOM_WEBHOOK_SECRET || !signature || !timestamp) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[zoom-webhook] Signature verification skipped in development')
      return true
    }
    return false
  }

  // Anti-replay: reject events older than 5 minutes (Zoom's own guidance).
  const tsSeconds = Number(timestamp)
  if (!Number.isFinite(tsSeconds) || Math.abs(Date.now() / 1000 - tsSeconds) > 300) {
    console.warn('[zoom-webhook] Request timestamp outside tolerance window')
    return false
  }

  const message = `v0:${timestamp}:${rawBody}`
  const expected = `v0=${crypto.createHmac('sha256', ZOOM_WEBHOOK_SECRET).update(message).digest('hex')}`

  const expectedBuf = Buffer.from(expected)
  const providedBuf = Buffer.from(signature)
  return (
    expectedBuf.length === providedBuf.length && crypto.timingSafeEqual(expectedBuf, providedBuf)
  )
}

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text()

    let event: {
      event?: string
      payload?: {
        plainToken?: string
        object?: ZoomRecordingMeeting
      }
      download_token?: string
    }
    try {
      event = JSON.parse(rawBody)
    } catch {
      return NextResponse.json({ success: false, error: 'Invalid JSON' }, { status: 400 })
    }

    // Zoom's URL validation challenge — must answer even before any real
    // event ever fires, otherwise the subscription cannot be saved.
    if (event.event === 'endpoint.url_validation') {
      const plainToken = event.payload?.plainToken
      if (!plainToken || !ZOOM_WEBHOOK_SECRET) {
        console.error(
          '[zoom-webhook] url_validation failed:',
          !plainToken ? 'missing plainToken' : 'ZOOM_WEBHOOK_SECRET_TOKEN not set'
        )
        return NextResponse.json({ success: false, error: 'Validation failed' }, { status: 400 })
      }
      const encryptedToken = crypto
        .createHmac('sha256', ZOOM_WEBHOOK_SECRET)
        .update(plainToken)
        .digest('hex')
      return NextResponse.json({ plainToken, encryptedToken })
    }

    // Real events must carry a valid signature.
    const signature = request.headers.get('x-zm-signature')
    const timestamp = request.headers.get('x-zm-request-timestamp')
    if (!verifyZoomSignature(rawBody, signature, timestamp)) {
      return NextResponse.json({ success: false, error: 'Invalid signature' }, { status: 401 })
    }

    if (event.event === 'recording.completed') {
      const meeting = event.payload?.object
      const downloadToken = event.download_token
      if (meeting) {
        // Respond 200 to Zoom immediately; do the Cloudflare copy + DB writes
        // after the response is sent (Next 15 after()). Zoom re-delivers on
        // failure and the pipeline is idempotent on the meeting UUID.
        after(async () => {
          const result = await processRecordingCompleted(meeting, downloadToken)
          console.log('[zoom-webhook] recording.completed result:', JSON.stringify(result))
        })
      } else {
        console.warn('[zoom-webhook] recording.completed without payload.object')
      }
      return NextResponse.json({ success: true, received: 'recording.completed' })
    }

    // Acknowledge any other subscribed events without acting on them.
    return NextResponse.json({ success: true, received: event.event || 'unknown' })
  } catch (error) {
    console.error('[zoom-webhook] Handler error:', error)
    // Non-2xx makes Zoom retry; the pipeline is idempotent so that is safe.
    return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    service: 'Zoom Event Webhook',
    configured: !!ZOOM_WEBHOOK_SECRET,
    events: ['endpoint.url_validation', 'recording.completed'],
  })
}
