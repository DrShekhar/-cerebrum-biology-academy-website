import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'

interface ABTestEvent {
  testName: string
  variantId: string
  variantName: string
  event: string
  userId?: string
  timestamp: number
  metadata?: Record<string, any>
}

// In-memory storage for demo (replace with database in production)
const abTestEvents: ABTestEvent[] = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const headersList = headers()

    // Validate required fields
    if (!body.testName || !body.variantId || !body.event) {
      return NextResponse.json(
        { error: 'Missing required fields: testName, variantId, event' },
        { status: 400 }
      )
    }

    // Create event record
    const event: ABTestEvent = {
      testName: body.testName,
      variantId: body.variantId,
      variantName: body.variantName || body.variantId,
      event: body.event,
      userId: body.userId,
      timestamp: body.timestamp || Date.now(),
      metadata: {
        ...body.metadata,
        userAgent: headersList.get('user-agent'),
        referer: headersList.get('referer'),
        ip: request.ip || headersList.get('x-forwarded-for') || 'unknown',
      },
    }

    // Store event (in production, save to database)
    abTestEvents.push(event)

    // Log for monitoring (remove in production or use proper logging)
    console.log(`[AB-TEST] ${event.testName} - ${event.variantId} - ${event.event}`)

    return NextResponse.json({
      success: true,
      eventId: `${event.timestamp}_${Math.random().toString(36).substr(2, 9)}`,
    })
  } catch (error) {
    console.error('AB test tracking error:', error)
    return NextResponse.json({ error: 'Failed to track AB test event' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const testName = searchParams.get('testName')
    const variantId = searchParams.get('variantId')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    // Filter events based on query parameters
    let filteredEvents = abTestEvents

    if (testName) {
      filteredEvents = filteredEvents.filter((event) => event.testName === testName)
    }

    if (variantId) {
      filteredEvents = filteredEvents.filter((event) => event.variantId === variantId)
    }

    if (startDate) {
      const start = new Date(startDate).getTime()
      filteredEvents = filteredEvents.filter((event) => event.timestamp >= start)
    }

    if (endDate) {
      const end = new Date(endDate).getTime()
      filteredEvents = filteredEvents.filter((event) => event.timestamp <= end)
    }

    // Generate basic analytics
    const analytics = generateABTestAnalytics(filteredEvents)

    return NextResponse.json({
      events: filteredEvents,
      analytics,
      totalEvents: filteredEvents.length,
    })
  } catch (error) {
    console.error('AB test analytics error:', error)
    return NextResponse.json({ error: 'Failed to retrieve AB test analytics' }, { status: 500 })
  }
}

function generateABTestAnalytics(events: ABTestEvent[]) {
  const variantStats: Record<
    string,
    {
      views: number
      conversions: number
      conversionRate: number
      events: Record<string, number>
    }
  > = {}

  // Process events
  events.forEach((event) => {
    if (!variantStats[event.variantId]) {
      variantStats[event.variantId] = {
        views: 0,
        conversions: 0,
        conversionRate: 0,
        events: {},
      }
    }

    const variant = variantStats[event.variantId]

    // Count events
    variant.events[event.event] = (variant.events[event.event] || 0) + 1

    // Count views and conversions
    if (event.event === 'variant_view') {
      variant.views++
    } else if (event.event === 'demo_booking_click' || event.event === 'phone_call_click') {
      variant.conversions++
    }
  })

  // Calculate conversion rates
  Object.values(variantStats).forEach((variant) => {
    if (variant.views > 0) {
      variant.conversionRate = (variant.conversions / variant.views) * 100
    }
  })

  return {
    variantStats,
    totalEvents: events.length,
    lastUpdated: new Date().toISOString(),
  }
}
