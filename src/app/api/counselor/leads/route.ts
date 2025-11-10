import { NextRequest, NextResponse } from 'next/server'
import { withCounselor } from '@/lib/auth/middleware'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import type { LeadStage, Priority } from '@prisma/client'

const createLeadSchema = z.object({
  studentName: z.string().min(1, 'Student name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  courseInterest: z.string().min(1, 'Course interest is required'),
  source: z.string().optional(),
  priority: z.enum(['HOT', 'WARM', 'COLD']).optional(),
  demoBookingId: z.string().optional(),
})

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

async function handleGET(request: NextRequest, session: any) {
  try {
    const { searchParams } = new URL(request.url)
    const stage = searchParams.get('stage') as LeadStage | null
    const priority = searchParams.get('priority') as Priority | null
    const search = searchParams.get('search')

    const where: any = {
      assignedToId: session.userId,
    }

    if (stage) {
      where.stage = stage
    }

    if (priority) {
      where.priority = priority
    }

    if (search) {
      where.OR = [
        { studentName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search, mode: 'insensitive' } },
      ]
    }

    const leads = await prisma.lead.findMany({
      where,
      include: {
        communications: {
          take: 5,
          orderBy: { sentAt: 'desc' },
        },
        offers: {
          where: {
            status: {
              in: ['PENDING', 'SENT'],
            },
          },
          orderBy: { createdAt: 'desc' },
        },
        feePlans: {
          where: {
            status: {
              in: ['PENDING', 'PARTIAL'],
            },
          },
          orderBy: { createdAt: 'desc' },
        },
        tasks: {
          where: {
            status: {
              notIn: ['COMPLETED', 'CANCELLED'],
            },
          },
          orderBy: { dueDate: 'asc' },
          take: 3,
        },
        _count: {
          select: {
            communications: true,
            notes: true,
            tasks: true,
          },
        },
      },
      orderBy: [{ nextFollowUpAt: 'asc' }, { createdAt: 'desc' }],
    })

    return NextResponse.json({
      success: true,
      data: leads,
      count: leads.length,
    })
  } catch (error) {
    console.error('Error fetching leads:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch leads',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

async function handlePOST(request: NextRequest, session: any) {
  try {
    const body = await request.json()
    const validatedData = createLeadSchema.parse(body)

    const lead = await prisma.lead.create({
      data: {
        ...validatedData,
        assignedToId: session.userId,
        stage: 'NEW_LEAD',
        priority: validatedData.priority || 'WARM',
      },
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
        action: 'LEAD_CREATED',
        description: `Created new lead: ${lead.studentName}`,
      },
    })

    return NextResponse.json(
      {
        success: true,
        data: lead,
        message: 'Lead created successfully',
      },
      { status: 201 }
    )
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

    console.error('Error creating lead:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create lead',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export const GET = withCounselor(handleGET)
export const POST = withCounselor(handlePOST)
