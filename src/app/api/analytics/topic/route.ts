import { NextRequest, NextResponse } from 'next/server'
import { performanceAnalytics } from '@/lib/analytics/performanceService'
import { auth } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId')
    const topic = searchParams.get('topic')

    if (!userId || !topic) {
      return NextResponse.json({ error: 'User ID and topic are required' }, { status: 400 })
    }

    // SECURITY: was open to any userId (IDOR). Users may only read their own
    // analytics; staff can read any.
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const isStaff = ['ADMIN', 'TEACHER', 'COUNSELOR'].includes(session.user.role as string)
    if (!isStaff && userId !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const topicAnalytics = await performanceAnalytics.getTopicAnalytics(userId, topic)

    return NextResponse.json({
      success: true,
      data: topicAnalytics,
    })
  } catch (error) {
    console.error('Error fetching topic analytics:', error)
    return NextResponse.json({ error: 'Failed to fetch topic analytics' }, { status: 500 })
  }
}
