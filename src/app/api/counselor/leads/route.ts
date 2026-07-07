import { NextRequest, NextResponse } from 'next/server'
import { authenticateCounselor } from '@/lib/auth/counselor-auth'
import { upsertLeadCore } from '@/lib/leads/upsertLead'
import { buildLeadListWhere } from '@/lib/leads/leadService'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import type { LeadStage, Priority, LeadSource } from '@/generated/prisma'
import { AgentType } from '@/generated/prisma'
import { AgentTaskManager } from '@/lib/crm-agents/base'
import { WebhookService } from '@/lib/webhooks/webhookService'

const createLeadSchema = z.object({
  studentName: z.string().min(1, 'Student name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  courseInterest: z.string().min(1, 'Course interest is required'),
  source: z
    .enum([
      'MANUAL_ENTRY',
      'WALK_IN',
      'PHONE_CALL',
      'REFERRAL',
      'WHATSAPP',
      'EMAIL',
      'SOCIAL_MEDIA',
      'WEBSITE',
      'ADVERTISEMENT',
      'EVENT',
      'OTHER',
    ])
    .optional(),
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

    // Shared where-builder (leadService): counselors see only their own
    // leads; ADMINs see all for oversight / support reassignment.
    const where = buildLeadListWhere(
      { userId: session.userId, role: session.role.toUpperCase() },
      { stage, priority, search }
    )

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
          metadata: true,
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

    // Canonical CRM write: dedup by phone, creating counselor keeps the lead
    // (assignedToId wins over round-robin); duplicates surface as isExisting.
    const result = await upsertLeadCore(prisma, {
      name: validatedData.studentName,
      phone: validatedData.phone,
      email: validatedData.email,
      courseInterest: validatedData.courseInterest,
      source: 'counselor-panel',
      sourceEnum: validatedData.source ? (validatedData.source as LeadSource) : 'MANUAL_ENTRY',
      priority: validatedData.priority || 'WARM',
      assignedToId: session.userId,
      demoBookingId: validatedData.demoBookingId || null,
      skipTask: true,
    })

    const lead = await prisma.leads.findUniqueOrThrow({
      where: { id: result.leadId },
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

    if (!result.created) {
      return NextResponse.json(
        {
          success: true,
          data: lead,
          isExisting: true,
          message: 'A lead with this phone already exists — showing the existing lead',
        },
        { status: 200 }
      )
    }

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
