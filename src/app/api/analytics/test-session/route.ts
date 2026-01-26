import { NextRequest, NextResponse } from 'next/server'
import { performanceAnalytics } from '@/lib/analytics/performanceService'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const testAttemptId = searchParams.get('testAttemptId')

    if (!testAttemptId) {
      return NextResponse.json({ error: 'Test attempt ID is required' }, { status: 400 })
    }

    const sessionAnalytics = await performanceAnalytics.getTestSessionAnalytics(testAttemptId)

    return NextResponse.json({
      success: true,
      data: sessionAnalytics,
    })
  } catch (error) {
    console.error('Error fetching test session analytics:', error)
    return NextResponse.json({ error: 'Failed to fetch test session analytics' }, { status: 500 })
  }
}
