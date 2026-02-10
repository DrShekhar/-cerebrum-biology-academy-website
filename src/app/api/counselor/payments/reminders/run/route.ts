import { NextRequest, NextResponse } from 'next/server'
import { paymentReminderService } from '@/lib/payments/paymentReminderService'
import { withCounselor } from '@/lib/auth/middleware'
import type { UserSession } from '@/lib/auth/config'

/**
 * POST /api/counselor/payments/reminders/run
 * Run payment reminder automation
 * Scans all pending installments and sends reminders
 */
async function handlePOST(request: NextRequest, session: UserSession) {
  try {
    const body = await request.json().catch(() => ({}))

    const config = {
      reminderDaysBefore: body.reminderDaysBefore || [7, 3, 1],
      overdueCheckEnabled: body.overdueCheckEnabled !== false,
      createTasksForOverdue: body.createTasksForOverdue !== false,
      channels: body.channels || ['email', 'whatsapp', 'sms'],
    }


    const result = await paymentReminderService.runAutomation(config)

    return NextResponse.json({
      success: true,
      message: `Payment reminder automation completed. Sent ${result.remindersSent} reminders and created ${result.tasksCreated} tasks.`,
      data: result,
    })
  } catch (error) {
    console.error('Error running payment reminder automation:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to run automation',
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/counselor/payments/reminders/run
 * Get summary of overdue payments
 */
async function handleGET(request: NextRequest, session: UserSession) {
  try {
    const summary = await paymentReminderService.getOverdueSummary()

    return NextResponse.json({
      success: true,
      data: summary,
    })
  } catch (error) {
    console.error('Error fetching overdue summary:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch summary',
      },
      { status: 500 }
    )
  }
}

export const POST = withCounselor(handlePOST)
export const GET = withCounselor(handleGET)
