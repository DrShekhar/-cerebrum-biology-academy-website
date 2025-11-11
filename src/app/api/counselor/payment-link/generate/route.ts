/**
 * API Route: Generate Payment Link for Installment
 * POST /api/counselor/payment-link/generate
 */

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { withCounselor } from '@/lib/auth/middleware'
import { FeePlanService } from '@/lib/counselor/feePlanService'

const generatePaymentLinkSchema = z.object({
  installmentId: z.string(),
  studentName: z.string().min(1),
  studentEmail: z.string().email(),
  studentPhone: z.string().min(10),
})

async function handlePOST(req: NextRequest, session: any) {
  try {
    const body = await req.json()

    const validatedData = generatePaymentLinkSchema.parse(body)

    // Generate payment link with explicitly typed parameters
    const result = await FeePlanService.generateInstallmentPaymentLink({
      installmentId: validatedData.installmentId,
      studentName: validatedData.studentName,
      studentEmail: validatedData.studentEmail,
      studentPhone: validatedData.studentPhone,
    })

    return NextResponse.json({
      success: true,
      data: result,
      message: 'Payment link generated successfully',
    })
  } catch (error) {
    console.error('Generate payment link error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid request data', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate payment link',
      },
      { status: 500 }
    )
  }
}

export const POST = withCounselor(handlePOST)
