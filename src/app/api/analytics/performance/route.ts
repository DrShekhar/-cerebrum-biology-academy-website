import { NextRequest, NextResponse } from 'next/server'
import { performanceAnalytics } from '@/lib/analytics/performanceService'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId')
    const period = (searchParams.get('period') as 'week' | 'month' | 'quarter') || 'month'

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    const performanceData = await performanceAnalytics.getPerformanceMetrics(userId, period)

    return NextResponse.json({
      success: true,
      data: performanceData,
    })
  } catch (error) {
    console.error('Error fetching performance analytics:', error)
    return NextResponse.json({ error: 'Failed to fetch performance analytics' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, timeRange } = body

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    const performanceData = await performanceAnalytics.getUserPerformanceData(
      userId,
      timeRange
        ? {
            from: new Date(timeRange.from),
            to: new Date(timeRange.to),
          }
        : undefined
    )

    return NextResponse.json({
      success: true,
      data: performanceData,
    })
  } catch (error) {
    console.error('Error fetching user performance data:', error)
    return NextResponse.json({ error: 'Failed to fetch user performance data' }, { status: 500 })
  }
}
