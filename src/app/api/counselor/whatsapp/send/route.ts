/**
 * API Route: Send WhatsApp Message
 * POST /api/counselor/whatsapp/send
 */

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { withCounselor } from '@/lib/auth/middleware'
import { CounselorWhatsAppService } from '@/lib/counselor/whatsapp'

const sendMessageSchema = z.object({
  leadId: z.string(),
  phone: z.string(),
  message: z.string().min(1).max(4096),
  type: z.enum(['MANUAL', 'TEMPLATE', 'AUTOMATED']).optional(),
})

const sendQuickMessageSchema = z.object({
  leadId: z.string(),
  phone: z.string(),
  studentName: z.string(),
  courseInterest: z.string(),
  templateKey: z.enum([
    'initial_contact',
    'demo_followup',
    'negotiation_followup',
    'enrollment_confirmation',
    'payment_reminder',
    'check_in',
  ]),
})

const sendStageFollowupSchema = z.object({
  leadId: z.string(),
  phone: z.string(),
  studentName: z.string(),
  courseInterest: z.string(),
  stage: z.enum([
    'NEW_LEAD',
    'DEMO_SCHEDULED',
    'DEMO_COMPLETED',
    'OFFER_SENT',
    'NEGOTIATING',
    'PAYMENT_PLAN_CREATED',
    'ENROLLED',
    'ACTIVE_STUDENT',
    'LOST',
  ]),
})

async function handlePOST(req: NextRequest, session: any) {
  try {
    const body = await req.json()
    const counselorId = session.user.id

    // Determine which type of message to send
    if (body.templateKey) {
      // Quick template message
      const data = sendQuickMessageSchema.parse(body)
      const result = await CounselorWhatsAppService.sendQuickMessage(
        data.leadId,
        data.phone,
        data.studentName,
        data.courseInterest,
        data.templateKey,
        counselorId
      )

      // Update last contacted
      await CounselorWhatsAppService.markLeadContacted(data.leadId)

      return NextResponse.json({
        success: true,
        data: result,
        message: 'Quick message sent successfully',
      })
    } else if (body.stage && !body.message) {
      // Stage-based automated follow-up
      const data = sendStageFollowupSchema.parse(body)
      const result = await CounselorWhatsAppService.sendStageBasedFollowup(
        data.leadId,
        data.phone,
        data.studentName,
        data.courseInterest,
        data.stage,
        counselorId
      )

      // Update last contacted
      await CounselorWhatsAppService.markLeadContacted(data.leadId)

      return NextResponse.json({
        success: true,
        data: result,
        message: 'Follow-up message sent successfully',
      })
    } else {
      // Manual text message
      const data = sendMessageSchema.parse(body)
      const result = await CounselorWhatsAppService.sendManualMessage({
        leadId: data.leadId,
        phone: data.phone,
        message: data.message,
        counselorId,
        type: data.type,
      })

      // Update last contacted
      await CounselorWhatsAppService.markLeadContacted(data.leadId)

      return NextResponse.json({
        success: true,
        data: result,
        message: 'Message sent successfully',
      })
    }
  } catch (error) {
    console.error('Send WhatsApp error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid request data', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to send WhatsApp message',
      },
      { status: 500 }
    )
  }
}

export const POST = withCounselor(handlePOST)
