import { NextRequest, NextResponse } from 'next/server'
import { verifyCronAuth } from '@/lib/auth/cron-auth'
import { paymentReminderService } from '@/lib/payments/paymentReminderService'

export const dynamic = 'force-dynamic'
export const maxDuration = 120

/**
 * Payment-reminder automation (daily). The paymentReminderService was fully
 * built but wired to no schedule — so reminders never fired. This runs it:
 *  - 7 / 3 / 1 days before an installment's due date → reminder (in-app +
 *    WhatsApp/email/SMS where keys are set), tracked in installments.remindersSent
 *    so nothing double-sends.
 *  - due-tomorrow + overdue → auto-creates a PAYMENT_REMINDER task for the
 *    lead's counselor AND logs a timeline activity (admin sees the follow-up
 *    progress; the counselor updates the details from the task/lead).
 */
export async function GET(request: NextRequest) {
  const auth = verifyCronAuth(request)
  if (!auth.authorized) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const result = await paymentReminderService.runAutomation()
    return NextResponse.json({ success: true, ...result })
  } catch (error) {
    console.error('[cron/payment-reminders] failed:', error)
    return NextResponse.json({ success: false, error: 'Payment reminders failed' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  return GET(request)
}
