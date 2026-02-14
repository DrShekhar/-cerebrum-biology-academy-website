import { NextRequest, NextResponse } from 'next/server'
import { withCounselor } from '@/lib/auth/middleware'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { Decimal } from '@prisma/client/runtime/library'

const createOfferSchema = z.object({
  leadId: z.string().min(1, 'Lead ID is required'),
  offerCode: z.string().min(1, 'Offer code is required'),
  discountValue: z.number().positive('Discount value must be positive'),
  discountType: z.enum(['PERCENTAGE', 'FLAT']),
  validUntil: z.string().min(1, 'Validity date is required'),
  courseId: z.string().optional(),
  terms: z.string().optional(),
})

async function handleGET(request: NextRequest, session: any) {
  try {
    const { searchParams } = new URL(request.url)
    const leadId = searchParams.get('leadId')
    const status = searchParams.get('status')

    const where: any = {
      lead: {
        assignedToId: session.userId,
      },
    }

    if (leadId) {
      where.leadId = leadId
    }

    if (status) {
      where.status = status
    }

    const offers = await prisma.offers.findMany({
      where,
      include: {
        lead: {
          select: {
            id: true,
            studentName: true,
            email: true,
            phone: true,
            stage: true,
          },
        },
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({
      success: true,
      data: offers,
      count: offers.length,
    })
  } catch (error) {
    console.error('Error fetching offers:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch offers',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

async function handlePOST(request: NextRequest, session: any) {
  try {
    const body = await request.json()
    const validatedData = createOfferSchema.parse(body)

    const lead = await prisma.leads.findUnique({
      where: { id: validatedData.leadId },
      select: { assignedToId: true, studentName: true },
    })

    if (!lead) {
      return NextResponse.json(
        {
          success: false,
          error: 'Lead not found',
        },
        { status: 404 }
      )
    }

    if (lead.assignedToId !== session.userId && session.role !== 'ADMIN') {
      return NextResponse.json(
        {
          success: false,
          error: 'Access denied',
        },
        { status: 403 }
      )
    }

    const existingOffer = await prisma.offers.findUnique({
      where: { offerCode: validatedData.offerCode },
    })

    if (existingOffer) {
      return NextResponse.json(
        {
          success: false,
          error: 'Offer code already exists',
        },
        { status: 400 }
      )
    }

    const offer = await prisma.offers.create({
      data: {
        leadId: validatedData.leadId,
        offerCode: validatedData.offerCode,
        discountValue: new Decimal(validatedData.discountValue),
        discountType: validatedData.discountType,
        validUntil: new Date(validatedData.validUntil),
        courseId: validatedData.courseId,
        terms: validatedData.terms,
        status: 'PENDING',
        createdById: session.userId,
      },
      include: {
        lead: {
          select: {
            id: true,
            studentName: true,
          },
        },
      },
    })

    await prisma.leads.update({
      where: { id: validatedData.leadId },
      data: {
        stage: 'OFFER_SENT',
      },
    })

    await prisma.activities.create({
      data: {
        userId: session.userId,
        leadId: validatedData.leadId,
        action: 'OFFER_CREATED',
        description: `Created offer ${offer.offerCode} with ${offer.discountValue}${offer.discountType === 'PERCENTAGE' ? '%' : ' INR'} discount`,
      },
    })

    return NextResponse.json(
      {
        success: true,
        data: offer,
        message: 'Offer created successfully',
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: error.issues,
        },
        { status: 400 }
      )
    }

    console.error('Error creating offer:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create offer',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export const GET = withCounselor(handleGET)
export const POST = withCounselor(handlePOST)
