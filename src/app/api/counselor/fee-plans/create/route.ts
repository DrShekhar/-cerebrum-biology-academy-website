/**
 * API Route: Create Fee Plan
 * POST /api/counselor/fee-plans/create
 */

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { withCounselor } from '@/lib/auth/middleware'
import { FeePlanService } from '@/lib/counselor/feePlanService'

const createFeePlanSchema = z.object({
  leadId: z.string(),
  courseName: z.string().min(1),
  originalAmount: z.number().positive(),
  discountPercent: z.number().min(0).max(100),
  discountAmount: z.number().min(0),
  finalAmount: z.number().positive(),
  numberOfInstallments: z.number().int().min(1).max(24),
  downPayment: z.number().min(0),
  installmentFrequency: z.enum(['WEEKLY', 'MONTHLY', 'QUARTERLY']),
  startDate: z.string().transform((str) => new Date(str)),
  notes: z.string().optional(),
})

async function handlePOST(req: NextRequest, session: any) {
  try {
    const body = await req.json()
    const counselorId = session.user.id

    const validatedData = createFeePlanSchema.parse(body)

    // Create fee plan with explicitly typed parameters
    const result = await FeePlanService.createFeePlan({
      leadId: validatedData.leadId,
      courseName: validatedData.courseName,
      originalAmount: validatedData.originalAmount,
      discountPercent: validatedData.discountPercent,
      discountAmount: validatedData.discountAmount,
      finalAmount: validatedData.finalAmount,
      numberOfInstallments: validatedData.numberOfInstallments,
      downPayment: validatedData.downPayment,
      installmentFrequency: validatedData.installmentFrequency,
      startDate: validatedData.startDate,
      notes: validatedData.notes,
      counselorId,
    })

    return NextResponse.json({
      success: true,
      data: result,
      message: 'Fee plan created successfully',
    })
  } catch (error) {
    console.error('Create fee plan error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid request data', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create fee plan',
      },
      { status: 500 }
    )
  }
}

export const POST = withCounselor(handlePOST)
