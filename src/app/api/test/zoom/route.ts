/**
 * Test API for Zoom Integration
 * GET /api/test/zoom - Check Zoom configuration and OAuth status
 * POST /api/test/zoom - Create a test meeting
 */

import { NextRequest, NextResponse } from 'next/server'
import { zoomService } from '@/lib/zoom/zoomService'

export async function GET() {
  try {
    const isConfigured = zoomService.isConfigured()

    return NextResponse.json({
      service: 'Zoom Meeting API',
      configured: isConfigured,
      requiredEnvVars: {
        ZOOM_ACCOUNT_ID: !!process.env.ZOOM_ACCOUNT_ID,
        ZOOM_CLIENT_ID: !!process.env.ZOOM_CLIENT_ID,
        ZOOM_CLIENT_SECRET: !!process.env.ZOOM_CLIENT_SECRET,
      },
      mode: isConfigured ? 'live' : 'simulation',
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      {
        service: 'Zoom Meeting API',
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check if this is production and block if not admin
    if (process.env.NODE_ENV === 'production') {
      const adminKey = request.headers.get('x-admin-key')
      if (adminKey !== process.env.AUTH_SECRET) {
        return NextResponse.json(
          { success: false, error: 'Unauthorized in production' },
          { status: 401 }
        )
      }
    }

    const body = await request.json()

    // Create a test demo meeting
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(10, 0, 0, 0)

    const meetingData = {
      studentName: body.studentName || 'Test Student',
      email: body.email || 'test@example.com',
      phone: body.phone || '+918826444334',
      preferredDate: tomorrow,
      preferredTime: body.time || '10:00',
      courseInterest: 'NEET Biology Pinnacle',
      studentClass: '12th',
      previousKnowledge: 'Intermediate',
    }

    const meeting = await zoomService.createDemoMeeting(meetingData)

    if (meeting) {
      return NextResponse.json({
        success: true,
        mode: zoomService.isConfigured() ? 'live' : 'simulation',
        meeting: {
          id: meeting.id,
          topic: meeting.topic,
          joinUrl: meeting.join_url,
          startUrl: meeting.start_url,
          password: meeting.password,
          startTime: meeting.start_time,
          duration: meeting.duration,
        },
        createdAt: new Date().toISOString(),
      })
    } else {
      return NextResponse.json(
        { success: false, error: 'Failed to create meeting' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Zoom test error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
