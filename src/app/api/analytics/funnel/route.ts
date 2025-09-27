import { NextRequest, NextResponse } from 'next/server'
import { FunnelEvent, FunnelAnalyzer } from '../../../../lib/analytics/conversionFunnelAnalysis'

// In-memory storage for demo purposes
// In production, you would use a proper database like PostgreSQL, MongoDB, or Redis
let funnelEvents: FunnelEvent[] = []

export async function POST(request: NextRequest) {
  try {
    const event: FunnelEvent = await request.json()

    // Validate event data
    if (!event.stepId || !event.userId || !event.sessionId || !event.eventType) {
      return NextResponse.json({ error: 'Missing required event fields' }, { status: 400 })
    }

    // Add timestamp if not provided
    if (!event.timestamp) {
      event.timestamp = Date.now()
    }

    // Store the event
    funnelEvents.push(event)

    // Keep only last 10,000 events to prevent memory issues
    if (funnelEvents.length > 10000) {
      funnelEvents = funnelEvents.slice(-10000)
    }

    return NextResponse.json({ success: true, eventId: `${event.userId}_${event.timestamp}` })
  } catch (error) {
    console.error('Error storing funnel event:', error)
    return NextResponse.json({ error: 'Failed to store funnel event' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const sessionId = searchParams.get('sessionId')
    const stepId = searchParams.get('stepId')
    const timeframe = searchParams.get('timeframe') || '24h' // 24h, 7d, 30d
    const analyze = searchParams.get('analyze') === 'true'

    // Calculate time range
    const now = Date.now()
    const timeRanges = {
      '1h': 60 * 60 * 1000,
      '24h': 24 * 60 * 60 * 1000,
      '7d': 7 * 24 * 60 * 60 * 1000,
      '30d': 30 * 24 * 60 * 60 * 1000,
    }
    const timeRange = timeRanges[timeframe as keyof typeof timeRanges] || timeRanges['24h']
    const fromTime = now - timeRange

    // Filter events
    let filteredEvents = funnelEvents.filter((event) => event.timestamp >= fromTime)

    if (userId) {
      filteredEvents = filteredEvents.filter((event) => event.userId === userId)
    }

    if (sessionId) {
      filteredEvents = filteredEvents.filter((event) => event.sessionId === sessionId)
    }

    if (stepId) {
      filteredEvents = filteredEvents.filter((event) => event.stepId === stepId)
    }

    // Return analysis if requested
    if (analyze) {
      const analysis = FunnelAnalyzer.calculateMetrics(filteredEvents)
      return NextResponse.json({
        analysis,
        totalEvents: filteredEvents.length,
        timeframe,
        generatedAt: new Date().toISOString(),
      })
    }

    // Return raw events
    return NextResponse.json({
      events: filteredEvents,
      totalCount: filteredEvents.length,
      timeframe,
      filters: { userId, sessionId, stepId },
    })
  } catch (error) {
    console.error('Error retrieving funnel events:', error)
    return NextResponse.json({ error: 'Failed to retrieve funnel events' }, { status: 500 })
  }
}
