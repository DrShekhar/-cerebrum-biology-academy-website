import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { UserActivity } from '@/lib/types/analytics'

// This would normally connect to a real database
// For now, we'll use in-memory storage as demonstration
const analyticsData: UserActivity[] = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { activities, sessionId, timestamp } = body

    // Get client IP and user agent
    const headersList = headers()
    const clientIP =
      headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || request.ip || 'unknown'
    const userAgent = headersList.get('user-agent') || 'unknown'

    // Process each activity
    for (const activity of activities) {
      // Enrich activity data with server-side info
      activity.metadata.ip = clientIP
      activity.metadata.userAgent = userAgent

      // Add geolocation data (in production, use a service like MaxMind or ipapi)
      activity.metadata.location = await getLocationFromIP(clientIP)

      // Store activity (in production, save to database)
      analyticsData.push(activity)

      // Log for development
      console.log('Analytics Event:', {
        type: activity.type,
        userId: activity.userId,
        sessionId: activity.sessionId,
        metadata: activity.metadata,
      })
    }

    // In production, you might want to:
    // 1. Save to database (PostgreSQL, MongoDB, etc.)
    // 2. Send to analytics service (Google Analytics, Mixpanel, etc.)
    // 3. Queue for batch processing
    // 4. Send to data warehouse

    return NextResponse.json({
      success: true,
      processed: activities.length,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Analytics tracking error:', error)
    return NextResponse.json({ error: 'Failed to process analytics data' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  // Return recent analytics data (for admin dashboard)
  const { searchParams } = new URL(request.url)
  const limit = parseInt(searchParams.get('limit') || '50')
  const userId = searchParams.get('userId')
  const sessionId = searchParams.get('sessionId')
  const type = searchParams.get('type')

  let filteredData = analyticsData

  if (userId) {
    filteredData = filteredData.filter((activity) => activity.userId === userId)
  }

  if (sessionId) {
    filteredData = filteredData.filter((activity) => activity.sessionId === sessionId)
  }

  if (type) {
    filteredData = filteredData.filter((activity) => activity.type === type)
  }

  // Sort by timestamp (newest first) and limit
  const recentData = filteredData
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit)

  return NextResponse.json({
    activities: recentData,
    total: filteredData.length,
    filtered: recentData.length,
  })
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
