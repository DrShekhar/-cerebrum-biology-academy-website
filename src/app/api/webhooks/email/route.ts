import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * Email provider bounce/complaint webhook → suppression list.
 *
 * Handles both shapes:
 *  - Resend:   { type: 'email.bounced' | 'email.complained', data: { to: [...] } }
 *  - SendGrid: [{ email, event: 'bounce' | 'dropped' | 'spamreport' }, ...]
 *
 * Configure the provider webhook URL with ?secret=<EMAIL_WEBHOOK_SECRET> when
 * that env var is set (providers post their own signatures too, but this keeps
 * the endpoint from being trivially spammable).
 */

function reasonFor(event: string): 'bounce' | 'complaint' | null {
  const e = event.toLowerCase()
  if (e.includes('bounce') || e === 'dropped') return 'bounce'
  if (e.includes('complain') || e.includes('spam')) return 'complaint'
  return null
}

async function suppress(email: string, reason: 'bounce' | 'complaint', detail?: string) {
  const normalized = email.toLowerCase().trim()
  if (!normalized || !normalized.includes('@')) return
  await prisma.email_suppressions
    .upsert({
      where: { email: normalized },
      update: { reason, detail: detail?.slice(0, 300) },
      create: {
        id: `esup_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
        email: normalized,
        reason,
        detail: detail?.slice(0, 300),
      },
    })
    .catch(() => {})
}

export async function POST(request: NextRequest) {
  try {
    const secret = process.env.EMAIL_WEBHOOK_SECRET
    if (secret) {
      const provided =
        new URL(request.url).searchParams.get('secret') || request.headers.get('x-webhook-secret')
      if (provided !== secret) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
    }

    const body = await request.json().catch(() => null)
    if (!body) return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })

    let suppressed = 0

    // SendGrid: array of events.
    if (Array.isArray(body)) {
      for (const ev of body) {
        const reason = reasonFor(String(ev?.event || ''))
        if (reason && ev?.email) {
          await suppress(ev.email, reason, ev.reason || ev.type)
          suppressed++
        }
      }
    } else if (typeof body?.type === 'string' && body.type.startsWith('email.')) {
      // Resend: single event.
      const reason = reasonFor(body.type)
      if (reason) {
        const to = body.data?.to
        const recipients: string[] = Array.isArray(to) ? to : to ? [to] : []
        for (const r of recipients) {
          await suppress(r, reason, body.data?.bounce?.type || body.type)
          suppressed++
        }
      }
    }

    return NextResponse.json({ success: true, suppressed })
  } catch (error) {
    console.error('Email webhook error:', error)
    // 200 so the provider doesn't hammer retries on our processing bug.
    return NextResponse.json({ success: false }, { status: 200 })
  }
}
