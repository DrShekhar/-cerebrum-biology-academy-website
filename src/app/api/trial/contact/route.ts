import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { freeUserId, email, phone, message, requestType } = body

    if (!freeUserId || !email || !phone) {
      return NextResponse.json(
        { error: 'freeUserId, email, and phone are required' },
        { status: 400 }
      )
    }

    await prisma.analytics_events.create({
      data: {
        id: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        eventType: 'trial',
        eventName: 'trial_extension_request',
        properties: {
          freeUserId,
          email,
          phone,
          message,
          requestType,
          timestamp: new Date().toISOString(),
        },
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Your request has been submitted successfully',
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      {
        error: 'Failed to submit request',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
