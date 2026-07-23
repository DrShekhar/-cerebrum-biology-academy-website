import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { source, blogTitle, blogSlug, neetChapter, timestamp } = body

    // This endpoint fires when a reader taps "ask on WhatsApp" from a blog post.
    // It carries NO contact details (no phone/name/email) — it is a click-
    // tracking event, not a CRM lead, and previously wrote `leads` columns that
    // don't exist (status/metadata/notes) so it always threw. Record it as an
    // analytics event only; the actual lead is captured when the user sends the
    // WhatsApp message (handled by the WhatsApp inbound flow).
    await prisma.analytics_events.create({
      data: {
        id: `evt_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
        eventType: 'BLOG_WHATSAPP_QUERY',
        eventName: 'blog_whatsapp_query',
        properties: {
          blogTitle,
          blogSlug,
          neetChapter,
          timestamp,
          source: source || 'blog_whatsapp_query',
        },
        sessionId: `blog_${Date.now()}`,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Query tracked',
    })
  } catch (error) {
    console.error('Error capturing blog lead:', error)

    // The caller fires-and-forgets (WhatsApp opens regardless), so an honest
    // error status costs nothing — and a silent fake success would hide a
    // broken analytics write forever.
    return NextResponse.json({ success: false, error: 'Failed to track query' }, { status: 500 })
  }
}
