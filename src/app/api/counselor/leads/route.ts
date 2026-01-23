import { NextRequest, NextResponse } from 'next/server'
import { authenticateCounselor } from '@/lib/auth/counselor-auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import type { LeadStage, Priority } from '@/generated/prisma'
import { AgentType } from '@/generated/prisma'
import { AgentTaskManager } from '@/lib/crm-agents/base'
import { WebhookService } from '@/lib/webhooks/webhookService'

const createLeadSchema = z.object({
  studentName: z.string().min(1, 'Student name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  courseInterest: z.string().min(1, 'Course interest is required'),
  source: z.string().optional(),
  priority: z.enum(['HOT', 'WARM', 'COLD']).optional(),
  demoBookingId: z.string().optional(),
})

// Update schema moved to [id]/route.ts

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateCounselor()
    if ('error' in authResult) return authResult.error
    const { session } = authResult

    const { searchParams } = new URL(request.url)
    const stage = searchParams.get('stage') as LeadStage | null
    const priority = searchParams.get('priority') as Priority | null
    const search = searchParams.get('search')

    // Pagination parameters with validation
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'))
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '50')))
    const skip = (page - 1) * limit

    const where: Record<string, unknown> = {
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

    // Fetch leads with pagination and get total count
    const [leads, totalCount] = await Promise.all([
      prisma.leads.findMany({
        where,
        select: {
          id: true,
          studentName: true,
          email: true,
          phone: true,
          courseInterest: true,
          source: true,
          stage: true,
          priority: true,
          score: true,
          scoreUpdatedAt: true,
          scoreBreakdown: true,
          nextFollowUpAt: true,
          lostReason: true,
          createdAt: true,
          updatedAt: true,
          assignedToId: true,
          demoBookingId: true,
          crm_communications: {
            take: 5,
            orderBy: { sentAt: 'desc' },
          },
          offers: {
            orderBy: { createdAt: 'desc' },
            take: 1, // Only fetch most recent offer
          },
          fee_plans: {
            orderBy: { createdAt: 'desc' },
            take: 1, // Only fetch most recent fee plan
          },
          tasks: {
            orderBy: { dueDate: 'asc' },
            take: 3,
          },
          _count: {
            select: {
              crm_communications: true,
              notes: true,
              tasks: true,
              offers: true,
              fee_plans: true,
            },
          },
        },
        orderBy: [{ score: 'desc' }, { nextFollowUpAt: 'asc' }, { createdAt: 'desc' }],
        take: limit,
        skip: skip,
      }),

      // Get total count for pagination
      prisma.leads.count({ where }),
    ])

    const totalPages = Math.ceil(totalCount / limit)

    return NextResponse.json({
      success: true,
      data: leads,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
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

export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateCounselor()
    if ('error' in authResult) return authResult.error
    const { session } = authResult

    const body = await request.json()
    const validatedData = createLeadSchema.parse(body)

    const lead = await prisma.leads.create({
      data: {
        id: `lead_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        ...validatedData,
        assignedToId: session.userId,
        stage: 'NEW_LEAD',
        priority: validatedData.priority || 'WARM',
      },
      include: {
        users: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    await prisma.activities.create({
      data: {
        id: `act_${Date.now()}_${Math.random().toString(36).substring(7)}`,
        userId: session.userId,
        leadId: lead.id,
        action: 'LEAD_CREATED',
        description: `Created new lead: ${lead.studentName}`,
      },
    })

    // Queue AI Lead Qualifier Agent (automatic trigger)
    try {
      await AgentTaskManager.createTask({
        agentType: AgentType.LEAD_QUALIFIER,
        leadId: lead.id,
        input: {
          trigger: 'LEAD_CREATED',
          createdBy: session.userId,
        },
      })
    } catch (agentError) {
      // Don't fail the lead creation if agent queueing fails
      console.error('Failed to queue lead qualifier agent:', agentError)
    }

    // Queue AI Product Agent for course recommendations (automatic trigger)
    try {
      await AgentTaskManager.createTask({
        agentType: AgentType.PRODUCT_AGENT,
        leadId: lead.id,
        input: {
          action: 'recommend',
          trigger: 'LEAD_CREATED',
          profile: {
            courseInterest: validatedData.courseInterest,
            source: validatedData.source,
          },
        },
      })
    } catch (agentError) {
      console.error('Failed to queue product agent:', agentError)
    }

    // Dispatch webhook event for external CRM integrations
    try {
      await WebhookService.onLeadCreated({
        id: lead.id,
        studentName: lead.studentName,
        email: lead.email,
        phone: lead.phone,
        courseInterest: lead.courseInterest,
        source: lead.source,
        stage: lead.stage,
        priority: lead.priority,
        createdAt: lead.createdAt,
        assignedTo: lead.users,
      })
    } catch (webhookError) {
      console.error('Failed to dispatch lead.created webhook:', webhookError)
    }

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
          details: error.issues,
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
