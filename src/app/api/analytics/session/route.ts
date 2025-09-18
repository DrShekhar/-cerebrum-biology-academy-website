import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Simple session tracking endpoint
    // In production, you would store this in a database
    const sessionData = {
      sessionId:
        body.sessionId || `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId: body.userId || 'anonymous',
      startTime: body.startTime || Date.now(),
      ...body,
    }

    return NextResponse.json({
      success: true,
      session: sessionData,
    })
  } catch (error) {
    console.error('Session API error:', error)
    return NextResponse.json({ error: 'Failed to process session' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Session endpoint is working',
    timestamp: new Date().toISOString(),
  })
}
