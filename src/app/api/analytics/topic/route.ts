import { NextRequest, NextResponse } from 'next/server'
import { performanceAnalytics } from '@/lib/analytics/performanceService'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId')
    const topic = searchParams.get('topic')

    if (!userId || !topic) {
      return NextResponse.json({ error: 'User ID and topic are required' }, { status: 400 })
    }

    const topicAnalytics = await performanceAnalytics.getTopicAnalytics(userId, topic)

    return NextResponse.json({
      success: true,
      data: topicAnalytics
    })

  } catch (error) {
    console.error('Error fetching topic analytics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch topic analytics' },
      { status: 500 }
    )
  }
}