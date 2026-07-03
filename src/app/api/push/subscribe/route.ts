import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { isPushConfigured } from '@/lib/push/webPush'

/**
 * Web-push subscription management.
 * GET    → the VAPID public key (client needs it to subscribe).
 * POST   → save/refresh a browser subscription (works for guests too;
 *          attaches userId when signed in).
 * DELETE → remove a subscription by endpoint.
 */

export async function GET() {
  if (!isPushConfigured()) {
    return NextResponse.json({ success: false, error: 'Push not configured' }, { status: 503 })
  }
  return NextResponse.json({ success: true, publicKey: process.env.VAPID_PUBLIC_KEY })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}))
    const endpoint: string | undefined = body?.subscription?.endpoint
    const p256dh: string | undefined = body?.subscription?.keys?.p256dh
    const authKey: string | undefined = body?.subscription?.keys?.auth
    if (!endpoint || !p256dh || !authKey) {
      return NextResponse.json({ success: false, error: 'Invalid subscription' }, { status: 400 })
    }

    const session = await auth()
    const userId = (session?.user as { id?: string } | undefined)?.id || null

    await prisma.push_subscriptions.upsert({
      where: { endpoint },
      update: { p256dh, auth: authKey, ...(userId ? { userId } : {}) },
      create: {
        id: `push_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
        userId,
        endpoint,
        p256dh,
        auth: authKey,
        userAgent: request.headers.get('user-agent')?.slice(0, 250) || null,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Push subscribe error:', error)
    return NextResponse.json({ success: false, error: 'Failed to subscribe' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}))
    const endpoint: string | undefined = body?.endpoint
    if (!endpoint) {
      return NextResponse.json({ success: false, error: 'endpoint required' }, { status: 400 })
    }
    await prisma.push_subscriptions.deleteMany({ where: { endpoint } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Push unsubscribe error:', error)
    return NextResponse.json({ success: false, error: 'Failed to unsubscribe' }, { status: 500 })
  }
}
