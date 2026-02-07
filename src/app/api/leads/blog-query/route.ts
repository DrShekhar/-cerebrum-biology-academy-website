import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { source, blogTitle, blogSlug, neetChapter, timestamp } = body

    // Get client IP and user agent for tracking
    const ip =
      request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'

    // Create or update lead in database
    const lead = await prisma.leads.create({
      data: {
        source: source || 'blog_whatsapp_query',
        status: 'NEW',
        metadata: {
          blogTitle,
          blogSlug,
          neetChapter,
          queryTimestamp: timestamp,
          ip,
          userAgent,
          channel: 'whatsapp',
          qualificationLevel: 'WARM', // Blog readers are warm leads
        },
        notes: `WhatsApp query from blog: ${blogTitle}`,
      },
    })

    // Log the interaction for analytics
    await prisma.analytics_events.create({
      data: {
        eventType: 'BLOG_WHATSAPP_QUERY',
        eventData: {
          leadId: lead.id,
          blogTitle,
          blogSlug,
          neetChapter,
          timestamp,
        },
        source: 'blog',
        sessionId: `blog_${Date.now()}`,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Lead captured successfully',
      leadId: lead.id,
    })
  } catch (error) {
    console.error('Error capturing blog lead:', error)

    // Still return success to not block user experience
    return NextResponse.json({
      success: true,
      message: 'Query tracked',
    })
  }
}
