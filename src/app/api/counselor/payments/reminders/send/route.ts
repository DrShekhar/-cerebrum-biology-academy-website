import { NextRequest, NextResponse } from 'next/server'
import { paymentReminderService } from '@/lib/payments/paymentReminderService'
import { z } from 'zod'

const sendReminderSchema = z.object({
  installmentId: z.string(),
  channels: z.array(z.enum(['email', 'whatsapp', 'sms'])).optional(),
})

/**
 * POST /api/counselor/payments/reminders/send
 * Send manual payment reminder for specific installment
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { installmentId, channels } = sendReminderSchema.parse(body)

    console.log(`📤 Sending manual reminder for installment ${installmentId}`)

    const sent = await paymentReminderService.sendManualReminder(
      installmentId,
      channels || ['whatsapp', 'email']
    )

    if (sent) {
      return NextResponse.json({
        success: true,
        message: 'Payment reminder sent successfully',
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to send reminder',
        },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('Error sending manual reminder:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation error',
          details: error.errors,
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to send reminder',
      },
      { status: 500 }
    )
  }
}
