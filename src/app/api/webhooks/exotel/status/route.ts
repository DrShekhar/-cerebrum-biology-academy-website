import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

/**
 * POST /api/webhooks/exotel/status — Exotel StatusCallback (terminal event).
 * Exotel doesn't sign webhooks, so we require our own shared-secret ?token=
 * (set the same value in EXOTEL_WEBHOOK_TOKEN and in the StatusCallback URL).
 * Completes the call_logs row (status/duration/RecordingUrl) and posts an
 * activity on the lead so the call shows up in the existing timeline.
 */
export async function POST(request: NextRequest) {
  try {
    const expected = process.env.EXOTEL_WEBHOOK_TOKEN
    if (expected) {
      const token = new URL(request.url).searchParams.get('token') || ''
      const a = Buffer.from(token)
      const b = Buffer.from(expected)
      if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
        return NextResponse.json({ success: false }, { status: 401 })
      }
    } else if (process.env.NODE_ENV === 'production') {
      console.error('[exotel-webhook] EXOTEL_WEBHOOK_TOKEN not set — rejecting in production')
      return NextResponse.json({ success: false }, { status: 401 })
    }

    // Exotel posts form-encoded; accept JSON defensively too.
    let payload: Record<string, string> = {}
    const contentType = request.headers.get('content-type') || ''
    if (contentType.includes('application/json')) {
      payload = (await request.json().catch(() => ({}))) as Record<string, string>
    } else {
      const form = await request.formData().catch(() => null)
      if (form) for (const [k, v] of form.entries()) payload[k] = String(v)
    }

    const callSid = payload.CallSid || payload.Sid
    if (!callSid) {
      return NextResponse.json({ success: false, error: 'Missing CallSid' }, { status: 400 })
    }

    const log = await prisma.call_logs.findUnique({
      where: { providerCallSid: callSid },
      select: { id: true, leadId: true, counselorId: true },
    })
    if (!log) {
      // Unknown call (e.g. placed outside the CRM) — acknowledge, don't retry.
      return NextResponse.json({ success: true, ignored: true })
    }

    const status = (payload.Status || payload.CallStatus || 'completed').toLowerCase()
    const durationRaw = payload.ConversationDuration ?? payload.Duration
    const durationSec = durationRaw !== undefined ? parseInt(String(durationRaw), 10) : NaN
    const recordingUrl = payload.RecordingUrl || null

    await prisma.call_logs.update({
      where: { id: log.id },
      data: {
        status,
        ...(Number.isFinite(durationSec) ? { durationSec } : {}),
        ...(recordingUrl ? { recordingUrl } : {}),
        endedAt: new Date(),
      },
    })

    // Timeline entry — best-effort.
    try {
      const mins = Number.isFinite(durationSec) ? Math.round(durationSec / 60) : null
      const description =
        status === 'completed'
          ? `Phone call completed${mins !== null ? ` — ${mins || '<1'} min` : ''}${recordingUrl ? ' (recording available)' : ''}`
          : `Phone call ${status.replace(/-/g, ' ')}`
      await prisma.activities.create({
        data: {
          id: crypto.randomUUID(),
          userId: log.counselorId,
          leadId: log.leadId,
          action: 'CALL_LOGGED',
          description,
          metadata: { callLogId: log.id, status, durationSec: durationSec || 0 },
        },
      })
    } catch (activityError) {
      console.error('[exotel-webhook] activity failed:', activityError)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[exotel-webhook] failed:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
