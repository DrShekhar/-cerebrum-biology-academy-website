import { NextRequest, NextResponse } from 'next/server'
import { withCounselor } from '@/lib/auth/middleware'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const updateLeadSchema = z.object({
  studentName: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  courseInterest: z.string().optional(),
  stage: z
    .enum([
      'NEW_LEAD',
      'DEMO_SCHEDULED',
      'DEMO_COMPLETED',
      'OFFER_SENT',
      'NEGOTIATING',
      'PAYMENT_PLAN_CREATED',
      'ENROLLED',
      'ACTIVE_STUDENT',
      'LOST',
    ])
    .optional(),
  priority: z.enum(['HOT', 'WARM', 'COLD']).optional(),
  nextFollowUpAt: z.string().optional(),
  lostReason: z.string().optional(),
})

async function handleGET(
  request: NextRequest,
  session: any,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params

    const lead = await prisma.lead.findUnique({
      where: { id },
      include: {
        assignedTo: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        demoBooking: true,
        communications: {
          orderBy: { sentAt: 'desc' },
          include: {
            sentBy: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        offers: {
          orderBy: { createdAt: 'desc' },
        },
        feePlans: {
          orderBy: { createdAt: 'desc' },
          include: {
            installments: {
              orderBy: { dueDate: 'asc' },
            },
            payments: {
              orderBy: { createdAt: 'desc' },
            },
          },
        },
        tasks: {
          orderBy: { dueDate: 'asc' },
        },
        notes: {
          orderBy: { createdAt: 'desc' },
          include: {
            createdBy: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        activities: {
          orderBy: { createdAt: 'desc' },
          take: 50,
          include: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
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
          message: 'You do not have permission to view this lead',
        },
        { status: 403 }
      )
    }

    return NextResponse.json({
      success: true,
      data: lead,
    })
  } catch (error) {
    console.error('Error fetching lead:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch lead',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

async function handlePATCH(
  request: NextRequest,
  session: any,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const body = await request.json()
    const validatedData = updateLeadSchema.parse(body)

    const existingLead = await prisma.lead.findUnique({
      where: { id },
    })

    if (!existingLead) {
      return NextResponse.json(
        {
          success: false,
          error: 'Lead not found',
        },
        { status: 404 }
      )
    }

    if (existingLead.assignedToId !== session.userId && session.role !== 'ADMIN') {
      return NextResponse.json(
        {
          success: false,
          error: 'Access denied',
          message: 'You do not have permission to edit this lead',
        },
        { status: 403 }
      )
    }

    const updateData: any = { ...validatedData }
    if (validatedData.nextFollowUpAt) {
      updateData.nextFollowUpAt = new Date(validatedData.nextFollowUpAt)
    }

    if (validatedData.stage && validatedData.stage !== existingLead.stage) {
      updateData.lastContactedAt = new Date()

      if (validatedData.stage === 'ENROLLED') {
        updateData.convertedAt = new Date()
      } else if (validatedData.stage === 'LOST') {
        updateData.lostAt = new Date()
      }
    }

    const lead = await prisma.lead.update({
      where: { id },
      data: updateData,
      include: {
        assignedTo: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    await prisma.activity.create({
      data: {
        userId: session.userId,
        leadId: lead.id,
        action: 'LEAD_UPDATED',
        description: `Updated lead information`,
      },
    })

    return NextResponse.json({
      success: true,
      data: lead,
      message: 'Lead updated successfully',
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: error.errors,
        },
        { status: 400 }
      )
    }

    console.error('Error updating lead:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update lead',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

async function handleDELETE(
  request: NextRequest,
  session: any,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params

    const existingLead = await prisma.lead.findUnique({
      where: { id },
    })

    if (!existingLead) {
      return NextResponse.json(
        {
          success: false,
          error: 'Lead not found',
        },
        { status: 404 }
      )
    }

    if (session.role !== 'ADMIN') {
      return NextResponse.json(
        {
          success: false,
          error: 'Access denied',
          message: 'Only admins can delete leads',
        },
        { status: 403 }
      )
    }

    await prisma.lead.delete({
      where: { id },
    })

    await prisma.activity.create({
      data: {
        userId: session.userId,
        leadId: id,
        action: 'LEAD_DELETED',
        description: `Deleted lead: ${existingLead.studentName}`,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Lead deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting lead:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete lead',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export const GET = withCounselor((req: NextRequest, session: any) =>
  handleGET(req, session, { params: Promise.resolve({ id: req.url.split('/').pop() || '' }) })
)
export const PATCH = withCounselor((req: NextRequest, session: any) =>
  handlePATCH(req, session, { params: Promise.resolve({ id: req.url.split('/').pop() || '' }) })
)
export const DELETE = withCounselor((req: NextRequest, session: any) =>
  handleDELETE(req, session, { params: Promise.resolve({ id: req.url.split('/').pop() || '' }) })
)
