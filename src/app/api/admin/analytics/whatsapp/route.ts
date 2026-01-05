import { NextRequest, NextResponse } from 'next/server'
import { requireAdminAuth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

interface SourceStats {
  source: string
  clicks: number
  percentage: number
}

interface PageStats {
  page: string
  clicks: number
  percentage: number
}

interface HourlyStats {
  hour: string
  clicks: number
}

interface WhatsAppClickData {
  id: string
  source: string
  page: string
  device: string
  campaign: string | null
  timestamp: string
  utmSource: string | null
  utmMedium: string | null
}

// GET /api/admin/analytics/whatsapp - Get WhatsApp click analytics
export async function GET(request: NextRequest) {
  try {
    // Check admin authentication
    await requireAdminAuth()

    const { searchParams } = new URL(request.url)
    const dateRange = searchParams.get('dateRange') || '7d'

    // Calculate date ranges
    const now = new Date()
    const startDate = getStartDate(dateRange)
    const previousStartDate = getPreviousStartDate(dateRange, startDate)

    // Get start of today, this week, and this month
    const todayStart = new Date(now)
    todayStart.setHours(0, 0, 0, 0)

    const weekStart = new Date(now)
    weekStart.setDate(now.getDate() - 7)

    const monthStart = new Date(now)
    monthStart.setMonth(now.getMonth() - 1)

    // Fetch all WhatsApp click data in parallel
    const [
      totalClicks,
      clicksToday,
      clicksThisWeek,
      clicksThisMonth,
      previousPeriodClicks,
      allClicksInRange,
      recentClicksData,
    ] = await Promise.all([
      // Total clicks all time
      prisma.analytics_events.count({
        where: {
          eventType: 'whatsapp',
          eventName: 'whatsapp_click',
        },
      }),

      // Clicks today
      prisma.analytics_events.count({
        where: {
          eventType: 'whatsapp',
          eventName: 'whatsapp_click',
          createdAt: { gte: todayStart },
        },
      }),

      // Clicks this week
      prisma.analytics_events.count({
        where: {
          eventType: 'whatsapp',
          eventName: 'whatsapp_click',
          createdAt: { gte: weekStart },
        },
      }),

      // Clicks this month
      prisma.analytics_events.count({
        where: {
          eventType: 'whatsapp',
          eventName: 'whatsapp_click',
          createdAt: { gte: monthStart },
        },
      }),

      // Previous period clicks for comparison
      prisma.analytics_events.count({
        where: {
          eventType: 'whatsapp',
          eventName: 'whatsapp_click',
          createdAt: {
            gte: previousStartDate,
            lt: startDate,
          },
        },
      }),

      // All clicks in selected date range for analysis
      prisma.analytics_events.findMany({
        where: {
          eventType: 'whatsapp',
          eventName: 'whatsapp_click',
          createdAt: { gte: startDate },
        },
        select: {
          id: true,
          properties: true,
          pagePath: true,
          userAgent: true,
          utmSource: true,
          utmMedium: true,
          utmCampaign: true,
          createdAt: true,
        },
        orderBy: { createdAt: 'desc' },
      }),

      // Recent clicks with details
      prisma.analytics_events.findMany({
        where: {
          eventType: 'whatsapp',
          eventName: 'whatsapp_click',
        },
        select: {
          id: true,
          properties: true,
          pagePath: true,
          userAgent: true,
          utmSource: true,
          utmMedium: true,
          utmCampaign: true,
          createdAt: true,
        },
        orderBy: { createdAt: 'desc' },
        take: 20,
      }),
    ])

    // Calculate change from last period
    const currentPeriodClicks = allClicksInRange.length
    const changeFromLastPeriod =
      previousPeriodClicks > 0
        ? ((currentPeriodClicks - previousPeriodClicks) / previousPeriodClicks) * 100
        : currentPeriodClicks > 0
          ? 100
          : 0

    // Process device breakdown
    const deviceCounts = { mobile: 0, desktop: 0, tablet: 0 }
    allClicksInRange.forEach((click) => {
      const props = click.properties as { deviceType?: string } | null
      const device = props?.deviceType || getDeviceFromUserAgent(click.userAgent || '')
      if (device === 'mobile') deviceCounts.mobile++
      else if (device === 'tablet') deviceCounts.tablet++
      else deviceCounts.desktop++
    })

    // Process top sources
    const sourceCounts: Record<string, number> = {}
    allClicksInRange.forEach((click) => {
      const props = click.properties as { source?: string } | null
      const source = props?.source || 'unknown'
      sourceCounts[source] = (sourceCounts[source] || 0) + 1
    })

    const topSources: SourceStats[] = Object.entries(sourceCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([source, clicks]) => ({
        source,
        clicks,
        percentage: currentPeriodClicks > 0 ? (clicks / currentPeriodClicks) * 100 : 0,
      }))

    // Process top pages
    const pageCounts: Record<string, number> = {}
    allClicksInRange.forEach((click) => {
      const page = click.pagePath || 'unknown'
      pageCounts[page] = (pageCounts[page] || 0) + 1
    })

    const topPages: PageStats[] = Object.entries(pageCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([page, clicks]) => ({
        page,
        clicks,
        percentage: currentPeriodClicks > 0 ? (clicks / currentPeriodClicks) * 100 : 0,
      }))

    // Process hourly distribution
    const hourlyCounts: Record<number, number> = {}
    for (let i = 0; i < 24; i++) {
      hourlyCounts[i] = 0
    }
    allClicksInRange.forEach((click) => {
      const hour = new Date(click.createdAt).getHours()
      hourlyCounts[hour]++
    })

    const hourlyDistribution: HourlyStats[] = Object.entries(hourlyCounts)
      .sort(([a], [b]) => parseInt(a) - parseInt(b))
      .map(([hour, clicks]) => ({
        hour: `${hour.padStart(2, '0')}:00`,
        clicks,
      }))

    // Format recent clicks
    const recentClicks: WhatsAppClickData[] = recentClicksData.map((click) => {
      const props = click.properties as { source?: string; deviceType?: string } | null
      return {
        id: click.id,
        source: props?.source || 'unknown',
        page: click.pagePath || 'unknown',
        device: props?.deviceType || getDeviceFromUserAgent(click.userAgent || ''),
        campaign: click.utmCampaign,
        timestamp: click.createdAt.toISOString(),
        utmSource: click.utmSource,
        utmMedium: click.utmMedium,
      }
    })

    return NextResponse.json({
      success: true,
      data: {
        totalClicks,
        clicksToday,
        clicksThisWeek,
        clicksThisMonth,
        clicksInRange: currentPeriodClicks,
        changeFromLastPeriod: Math.round(changeFromLastPeriod * 10) / 10,
        deviceBreakdown: deviceCounts,
        topSources,
        topPages,
        hourlyDistribution,
        recentClicks,
        dateRange,
        startDate: startDate.toISOString(),
        endDate: now.toISOString(),
      },
    })
  } catch (error) {
    console.error('WhatsApp Analytics API error:', error)

    if (error instanceof Error && error.message === 'Admin authentication required') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    return NextResponse.json(
      { success: false, error: 'Failed to fetch WhatsApp analytics data' },
      { status: 500 }
    )
  }
}

// Helper function to get start date based on dateRange
function getStartDate(dateRange: string): Date {
  const now = new Date()
  switch (dateRange) {
    case '1d':
      return new Date(now.getTime() - 24 * 60 * 60 * 1000)
    case '7d':
      return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    case '30d':
      return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    case '90d':
      return new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)
    default:
      return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  }
}

// Helper function to get previous period start date for comparison
function getPreviousStartDate(dateRange: string, currentStartDate: Date): Date {
  const now = new Date()
  const duration = now.getTime() - currentStartDate.getTime()
  return new Date(currentStartDate.getTime() - duration)
}

// Helper function to detect device from user agent
function getDeviceFromUserAgent(userAgent: string): string {
  if (/mobile/i.test(userAgent)) return 'mobile'
  if (/tablet|ipad/i.test(userAgent)) return 'tablet'
  return 'desktop'
}
