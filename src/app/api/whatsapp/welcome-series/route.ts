import { NextRequest, NextResponse } from 'next/server'
import {
  startWelcomeSeries,
  sendWelcomeSeriesMessage,
  processWelcomeSeriesQueue,
} from '@/lib/whatsapp/welcomeSeries'

/**
 * POST /api/whatsapp/welcome-series
 * Start welcome series for a lead or send specific message
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, leadId, day } = body

    switch (action) {
      case 'start':
        if (!leadId) {
          return NextResponse.json({ error: 'leadId is required' }, { status: 400 })
        }
        const startResult = await startWelcomeSeries(leadId)
        return NextResponse.json(startResult)

      case 'send_message':
        if (!leadId || day === undefined) {
          return NextResponse.json({ error: 'leadId and day are required' }, { status: 400 })
        }
        const sendResult = await sendWelcomeSeriesMessage(leadId, day)
        return NextResponse.json(sendResult)

      case 'process_queue':
        const queueResult = await processWelcomeSeriesQueue()
        return NextResponse.json({
          success: true,
          ...queueResult,
        })

      default:
        return NextResponse.json(
          { error: 'Invalid action. Use: start, send_message, or process_queue' },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('Welcome series API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

/**
 * GET /api/whatsapp/welcome-series
 * Get welcome series status for a lead
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const leadId = searchParams.get('leadId')

    if (!leadId) {
      return NextResponse.json({ error: 'leadId query param required' }, { status: 400 })
    }

    const { prisma } = await import('@/lib/prisma')

    const lead = await prisma.lead.findUnique({
      where: { id: leadId },
      select: {
        id: true,
        name: true,
        phone: true,
        email: true,
        metadata: true,
        createdAt: true,
      },
    })

    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
    }

    const metadata = (lead.metadata as Record<string, unknown>) || {}

    return NextResponse.json({
      leadId: lead.id,
      name: lead.name,
      welcomeSeriesStarted: metadata.welcomeSeriesStarted || null,
      welcomeSeriesSent: metadata.welcomeSeriesSent || [],
      firstMessageSent: metadata.firstMessageSent || false,
      scheduledMessages: metadata.welcomeSeriesMessages || [],
    })
  } catch (error) {
    console.error('Welcome series status error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
