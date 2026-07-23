import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { upsertLead } from '@/lib/leads/upsertLead'

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

    // A trial-extension request is a HOT lead — someone who used the product
    // and wants more. It must land on a counselor's board (lead + 30-min
    // follow-up task), not only in the analytics log where nobody looks.
    // upsertLead never throws; on failure Sentry alerts and the daily
    // leads-reconcile safety net cannot recover this one (no content_leads
    // row), so keep the analytics event below as the durable record.
    const crmLead = await upsertLead({
      phone,
      email,
      message,
      source: `trial-${requestType || 'extension'}-request`,
      courseInterest: 'Trial extension / course upgrade',
      priority: 'HOT',
    })

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
          crmLeadId: crmLead?.leadId || null,
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
