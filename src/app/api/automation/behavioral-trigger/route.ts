/**
 * Behavioral Trigger API
 *
 * Handles automated WhatsApp follow-ups for behavioral events:
 * - Form submissions
 * - Demo bookings
 * - Payment initiation
 * - Page views
 *
 * POST /api/automation/behavioral-trigger
 */

import { NextRequest, NextResponse } from 'next/server'
import { whatsappDripService } from '@/lib/automation/whatsappDripService'

interface BehavioralTriggerRequest {
  leadId: string
  triggerType: 'form_submit' | 'demo_booked' | 'payment_initiated' | 'page_viewed'
  triggerData?: Record<string, any>
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as BehavioralTriggerRequest

    const { leadId, triggerType, triggerData } = body

    if (!leadId || !triggerType) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: leadId and triggerType',
        },
        { status: 400 }
      )
    }

    const validTriggerTypes = ['form_submit', 'demo_booked', 'payment_initiated', 'page_viewed']
    if (!validTriggerTypes.includes(triggerType)) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid triggerType. Must be one of: ${validTriggerTypes.join(', ')}`,
        },
        { status: 400 }
      )
    }

    const success = await whatsappDripService.handleBehavioralTrigger(
      leadId,
      triggerType,
      triggerData
    )

    return NextResponse.json({
      success,
      message: success ? 'Behavioral trigger processed successfully' : 'Failed to process trigger',
      triggerType,
      leadId,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error in behavioral trigger API:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
