import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import prisma from '@/lib/prisma'
import { logger } from '@/lib/utils/logger'
import { nanoid } from 'nanoid'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { activities, sessionId, timestamp } = body

    // Get client IP and user agent
    const headersList = await headers()
    const clientIP =
      headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || '127.0.0.1'
    const userAgent = headersList.get('user-agent') || 'unknown'

    // Extract UTM parameters from referrer
    const referrer = headersList.get('referer') || ''
    const utmParams = extractUTMParams(referrer)

    // Get geolocation data
    const location = await getLocationFromIP(clientIP)

    // Store events in database
    const storedEvents = []

    for (const activity of activities) {
      try {
        // Create analytics event in database
        const event = await prisma.analytics_events.create({
          data: {
            id: nanoid(),
            userId: activity.userId !== 'anonymous' ? activity.userId : null,
            sessionId: activity.sessionId,
            eventType: activity.type,
            eventName: activity.type,
            properties: activity.metadata || {},
            pagePath: activity.metadata?.page || null,
            pageTitle: activity.metadata?.pageTitle || null,
            referrer: referrer || null,
            userAgent: userAgent,
            utmSource: utmParams.utmSource,
            utmMedium: utmParams.utmMedium,
            utmCampaign: utmParams.utmCampaign,
            ipAddress: clientIP,
            country: location.country,
            city: location.city,
          },
        })

        storedEvents.push(event.id)

        // Log for monitoring
        logger.info('Analytics event tracked', {
          eventId: event.id,
          type: activity.type,
          userId: activity.userId,
          sessionId: activity.sessionId,
        })
      } catch (dbError) {
        // Log error but continue processing other events
        logger.error('Failed to store analytics event', {
          error: dbError,
          activity: activity.type,
          userId: activity.userId,
        })
      }
    }

    return NextResponse.json({
      success: true,
      processed: storedEvents.length,
      total: activities.length,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    logger.error('Analytics tracking error', {
      error,
      details: error instanceof Error ? error.message : 'Unknown error',
    })
    return NextResponse.json(
      {
        error: 'Failed to process analytics data',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Return recent analytics data (for admin dashboard)
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '50')
    const userId = searchParams.get('userId')
    const sessionId = searchParams.get('sessionId')
    const type = searchParams.get('type')

    // Build where clause
    const where: any = {}
    if (userId) where.userId = userId
    if (sessionId) where.sessionId = sessionId
    if (type) where.eventType = type

    // Query database
    const [events, total] = await Promise.all([
      prisma.analytics_events.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: limit,
      }),
      prisma.analytics_events.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      activities: events,
      total,
      filtered: events.length,
    })
  } catch (error) {
    logger.error('Failed to fetch analytics data', {
      error,
      details: error instanceof Error ? error.message : 'Unknown error',
    })
    return NextResponse.json(
      {
        error: 'Failed to fetch analytics data',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

function extractUTMParams(url: string): {
  utmSource: string | null
  utmMedium: string | null
  utmCampaign: string | null
} {
  try {
    const urlObj = new URL(url)
    return {
      utmSource: urlObj.searchParams.get('utm_source'),
      utmMedium: urlObj.searchParams.get('utm_medium'),
      utmCampaign: urlObj.searchParams.get('utm_campaign'),
    }
  } catch {
    return {
      utmSource: null,
      utmMedium: null,
      utmCampaign: null,
    }
  }
}

async function getLocationFromIP(ip: string) {
  // In production, use a real geolocation service
  // For demo purposes, return mock data
  if (ip === 'unknown' || ip.startsWith('127.') || ip.startsWith('192.168.')) {
    return {
      country: 'India',
      city: 'Delhi',
      region: 'NCR',
    }
  }

  try {
    // Example with ipapi.co (free tier)
    // const response = await fetch(`https://ipapi.co/${ip}/json/`)
    // const data = await response.json()
    // return {
    //   country: data.country_name,
    //   city: data.city,
    //   region: data.region
    // }

    // Mock data for demo
    return {
      country: 'India',
      city: 'Mumbai',
      region: 'Maharashtra',
    }
  } catch (error) {
    return {
      country: 'Unknown',
      city: 'Unknown',
      region: 'Unknown',
    }
  }
}
