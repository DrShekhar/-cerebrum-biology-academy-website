/**
 * API Route: Create Offer
 * POST /api/counselor/offers/create
 */

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { withCounselor } from '@/lib/auth/middleware'
import { FeePlanService } from '@/lib/counselor/feePlanService'

const createOfferSchema = z.object({
  leadId: z.string(),
  offerName: z.string().min(1),
  description: z.string().min(1),
  discountType: z.enum(['PERCENTAGE', 'FLAT', 'BUNDLE']),
  discountValue: z.number().positive(),
  validUntil: z.string().transform((str) => new Date(str)),
  minAmount: z.number().optional(),
  maxDiscount: z.number().optional(),
  coursesIncluded: z.array(z.string()),
  termsAndConditions: z.string(),
})

async function handlePOST(req: NextRequest, session: any) {
  try {
    const body = await req.json()
    const counselorId = session.user.id

    const validatedData = createOfferSchema.parse(body)

    // Create offer with explicitly typed parameters
    const offer = await FeePlanService.createOffer({
      leadId: validatedData.leadId,
      offerName: validatedData.offerName,
      description: validatedData.description,
      discountType: validatedData.discountType,
      discountValue: validatedData.discountValue,
      validUntil: validatedData.validUntil,
      minAmount: validatedData.minAmount,
      maxDiscount: validatedData.maxDiscount,
      coursesIncluded: validatedData.coursesIncluded,
      termsAndConditions: validatedData.termsAndConditions,
      counselorId,
    })

    return NextResponse.json({
      success: true,
      data: offer,
      message: 'Offer created successfully',
    })
  } catch (error) {
    console.error('Create offer error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid request data', details: error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create offer',
      },
      { status: 500 }
    )
  }
}

export const POST = withCounselor(handlePOST)
