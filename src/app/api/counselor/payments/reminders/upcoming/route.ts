import { NextRequest, NextResponse } from 'next/server'
import { paymentReminderService } from '@/lib/payments/paymentReminderService'
import { withCounselor } from '@/lib/auth/middleware'
import type { UserSession } from '@/lib/auth/config'

/**
 * GET /api/counselor/payments/reminders/upcoming?leadId=xxx
 * Get upcoming payment reminders for a specific lead
 */
async function handleGET(request: NextRequest, session: UserSession) {
  try {
    const searchParams = request.nextUrl.searchParams
    const leadId = searchParams.get('leadId')

    if (!leadId) {
      return NextResponse.json(
        {
          success: false,
          error: 'leadId is required',
        },
        { status: 400 }
      )
    }

    const upcomingReminders = await paymentReminderService.getUpcomingRemindersForLead(leadId)

    return NextResponse.json({
      success: true,
      data: upcomingReminders,
    })
  } catch (error) {
    console.error('Error fetching upcoming reminders:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch reminders',
      },
      { status: 500 }
    )
  }
}

export const GET = withCounselor(handleGET)
