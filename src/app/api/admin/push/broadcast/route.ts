import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withAdmin, ValidatedSession } from '@/lib/auth/middleware'
import { sendPushToAll, isPushConfigured } from '@/lib/push/webPush'

/**
 * Admin web-push broadcast.
 *
 * GET  → subscriber count + whether push is configured (for the admin UI).
 * POST → send a notification to every subscription (announcements, demo
 *        openings, offers). Body: { title, body, url? }.
 *
 * This is how the anonymous push leads captured by PublicPushPrompt get
 * re-contacted — no email or phone number involved.
 */

async function handleGET(_request: NextRequest, _session: ValidatedSession) {
  const count = await prisma.push_subscriptions.count()
  return NextResponse.json({
    success: true,
    configured: isPushConfigured(),
    subscribers: count,
  })
}

async function handlePOST(request: NextRequest, _session: ValidatedSession) {
  if (!isPushConfigured()) {
    return NextResponse.json(
      { success: false, error: 'Push is not configured (VAPID keys missing).' },
      { status: 503 }
    )
  }

  const body = (await request.json().catch(() => ({}))) as {
    title?: string
    body?: string
    url?: string
  }

  const title = (body.title || '').trim()
  const message = (body.body || '').trim()
  if (!title || !message) {
    return NextResponse.json(
      { success: false, error: 'title and body are required' },
      { status: 400 }
    )
  }

  const result = await sendPushToAll({
    title: title.slice(0, 120),
    body: message.slice(0, 300),
    url: typeof body.url === 'string' && body.url ? body.url.slice(0, 500) : '/',
    tag: 'cerebrum-broadcast',
  })

  return NextResponse.json({ success: true, ...result })
}

export const GET = withAdmin(handleGET)
export const POST = withAdmin(handlePOST)
