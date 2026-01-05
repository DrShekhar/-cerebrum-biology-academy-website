import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const days = parseInt(searchParams.get('days') || '30', 10)

    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    // Get total WhatsApp clicks
    const totalClicks = await prisma.analytics_events.count({
      where: {
        eventType: 'whatsapp',
        createdAt: { gte: startDate },
      },
    })

    // Get clicks by source
    const clicksBySource = await prisma.analytics_events.groupBy({
      by: ['properties'],
      where: {
        eventType: 'whatsapp',
        createdAt: { gte: startDate },
      },
      _count: true,
    })

    // Process clicks by source
    const sourceMap = new Map<string, number>()
    clicksBySource.forEach((item) => {
      const props = item.properties as { source?: string } | null
      const source = props?.source || 'unknown'
      sourceMap.set(source, (sourceMap.get(source) || 0) + item._count)
    })

    // Get clicks by page
    const clicksByPage = await prisma.analytics_events.groupBy({
      by: ['pagePath'],
      where: {
        eventType: 'whatsapp',
        createdAt: { gte: startDate },
      },
      _count: true,
      orderBy: { _count: { pagePath: 'desc' } },
      take: 10,
    })

    // Get clicks by day
    const recentClicks = await prisma.analytics_events.findMany({
      where: {
        eventType: 'whatsapp',
        createdAt: { gte: startDate },
      },
      select: {
        id: true,
        pagePath: true,
        properties: true,
        utmCampaign: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 50,
    })

    // Get daily breakdown
    const dailyClicks = await prisma.$queryRaw<{ date: string; count: bigint }[]>`
      SELECT DATE("createdAt") as date, COUNT(*) as count
      FROM analytics_events
      WHERE "eventType" = 'whatsapp' AND "createdAt" >= ${startDate}
      GROUP BY DATE("createdAt")
      ORDER BY date DESC
      LIMIT 30
    `

    // Get device type breakdown
    const deviceBreakdown = new Map<string, number>()
    recentClicks.forEach((click) => {
      const props = click.properties as { deviceType?: string } | null
      const device = props?.deviceType || 'unknown'
      deviceBreakdown.set(device, (deviceBreakdown.get(device) || 0) + 1)
    })

    return NextResponse.json({
      success: true,
      data: {
        summary: {
          totalClicks,
          period: `Last ${days} days`,
          startDate: startDate.toISOString(),
        },
        bySource: Object.fromEntries(sourceMap),
        byPage: clicksByPage.map((item) => ({
          page: item.pagePath || 'unknown',
          clicks: item._count,
        })),
        byDevice: Object.fromEntries(deviceBreakdown),
        dailyTrend: dailyClicks.map((item) => ({
          date: item.date,
          clicks: Number(item.count),
        })),
        recentClicks: recentClicks.map((click) => ({
          id: click.id,
          page: click.pagePath,
          source: (click.properties as { source?: string })?.source || 'unknown',
          campaign: click.utmCampaign,
          timestamp: click.createdAt,
        })),
      },
    })
  } catch (error) {
    console.error('WhatsApp stats error:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch stats' }, { status: 500 })
  }
}
