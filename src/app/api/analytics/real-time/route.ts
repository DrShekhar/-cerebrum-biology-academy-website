import { NextRequest, NextResponse } from 'next/server'
import { realTimeAnalytics } from '@/lib/analytics/realTimeService'

export async function GET(request: NextRequest) {
  try {
    const liveAnalytics = await realTimeAnalytics.getLiveAnalytics()

    return NextResponse.json({
      success: true,
      data: liveAnalytics,
    })
  } catch (error) {
    console.error('Error fetching real-time analytics:', error)
    return NextResponse.json({ error: 'Failed to fetch real-time analytics' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, sessionData } = body

    switch (action) {
      case 'start_session':
        await realTimeAnalytics.startSession(sessionData)
        break
      case 'update_session':
        await realTimeAnalytics.updateSession(sessionData)
        break
      case 'end_session':
        await realTimeAnalytics.endSession(sessionData.sessionId)
        break
      case 'update_progress':
        await realTimeAnalytics.updateTestProgress(sessionData.sessionId, sessionData.progress)
        break
      case 'complete_test':
        await realTimeAnalytics.completeTest(sessionData.sessionId, sessionData.results)
        break
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating real-time analytics:', error)
    return NextResponse.json({ error: 'Failed to update real-time analytics' }, { status: 500 })
  }
}
