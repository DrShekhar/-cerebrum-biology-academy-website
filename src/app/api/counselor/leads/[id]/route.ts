import { NextRequest, NextResponse } from 'next/server'
import { withCounselor, ValidatedSession } from '@/lib/auth/middleware'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { TaskService } from '@/lib/counselor/taskService'
import { processLeadRules } from '@/lib/followupEngine'
import { WebhookService } from '@/lib/webhooks/webhookService'
import type { LeadStage, Prisma } from '@/generated/prisma'

// Type for lead update data
type LeadUpdateInput = Prisma.leadsUpdateInput & {
  lastContactedAt?: Date
  convertedAt?: Date
  lostAt?: Date
}

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
  _request: NextRequest,
  session: ValidatedSession,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params

    const lead = await prisma.leads.findUnique({
      where: { id },
      include: {
        // Assigned counselor (correct field name: users)
        users: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        // Demo booking relation (correct field name: demo_bookings)
        demo_bookings: true,
        // Communications (correct field name: crm_communications)
        crm_communications: {
          orderBy: { sentAt: 'desc' },
          include: {
            users: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        // Offers
        offers: {
          orderBy: { createdAt: 'desc' },
        },
        // Fee plans (correct field name: fee_plans)
        fee_plans: {
          orderBy: { createdAt: 'desc' },
          include: {
            fee_installments: {
              orderBy: { dueDate: 'asc' },
            },
            fee_payments: {
              orderBy: { createdAt: 'desc' },
            },
          },
        },
        // Tasks
        tasks: {
          orderBy: { dueDate: 'asc' },
        },
        // Notes
        notes: {
          orderBy: { createdAt: 'desc' },
          include: {
            users: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        // Activities (correct field name: activities with users relation)
        activities: {
          orderBy: { createdAt: 'desc' },
          take: 50,
          include: {
            users: {
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
  session: ValidatedSession,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const body = await request.json()
    const validatedData = updateLeadSchema.parse(body)

    const existingLead = await prisma.leads.findUnique({
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

    const updateData: LeadUpdateInput = { ...validatedData }
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

    const lead = await prisma.leads.update({
      where: { id },
      data: updateData,
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
        action: 'LEAD_UPDATED',
        description: `Updated lead information`,
      },
    })

    if (validatedData.stage && validatedData.stage !== existingLead.stage) {
      try {
        await TaskService.createAutomatedTask({
          leadId: lead.id,
          newStage: validatedData.stage as LeadStage,
          counselorId: session.userId,
        })
      } catch (error) {
        console.error('Error creating automated task:', error)
      }
    }

    try {
      await processLeadRules(lead.id)
    } catch (error) {
      console.error('Error processing follow-up rules:', error)
    }

    // Dispatch webhook events for external CRM integrations
    try {
      const leadData = {
        id: lead.id,
        studentName: lead.studentName,
        email: lead.email,
        phone: lead.phone,
        courseInterest: lead.courseInterest,
        stage: lead.stage,
        priority: lead.priority,
        updatedAt: lead.updatedAt,
        assignedTo: lead.users,
      }

      // Always dispatch lead.updated
      await WebhookService.onLeadUpdated(leadData, Object.keys(validatedData))

      // Check for stage change
      if (validatedData.stage && validatedData.stage !== existingLead.stage) {
        await WebhookService.onLeadStageChanged(leadData, existingLead.stage, validatedData.stage)

        // Handle special stage events
        if (validatedData.stage === 'ENROLLED') {
          await WebhookService.onLeadConverted(leadData)
        } else if (validatedData.stage === 'LOST') {
          await WebhookService.onLeadLost(leadData, validatedData.lostReason)
        } else if (validatedData.stage === 'DEMO_SCHEDULED') {
          // Dispatch demo.booked webhook when stage changes to DEMO_SCHEDULED
          await WebhookService.onDemoBooked(leadData, {
            scheduledAt: new Date().toISOString(),
            previousStage: existingLead.stage,
          })
        } else if (validatedData.stage === 'DEMO_COMPLETED') {
          // Dispatch demo.completed webhook when stage changes to DEMO_COMPLETED
          await WebhookService.onDemoCompleted(leadData, {
            completedAt: new Date().toISOString(),
            previousStage: existingLead.stage,
          })
        }
      }
    } catch (webhookError) {
      console.error('Failed to dispatch webhook:', webhookError)
    }

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
          details: error.issues,
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
  _request: NextRequest,
  session: ValidatedSession,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params

    const existingLead = await prisma.leads.findUnique({
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

    // Note: Activity must be created BEFORE delete due to cascade rules
    await prisma.activities.create({
      data: {
        id: `act_${Date.now()}_${Math.random().toString(36).substring(7)}`,
        userId: session.userId,
        leadId: id,
        action: 'LEAD_DELETED',
        description: `Deleted lead: ${existingLead.studentName}`,
      },
    })

    await prisma.leads.delete({
      where: { id },
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

export const GET = withCounselor((req: NextRequest, session: ValidatedSession) =>
  handleGET(req, session, { params: Promise.resolve({ id: req.url.split('/').pop() || '' }) })
)
export const PATCH = withCounselor((req: NextRequest, session: ValidatedSession) =>
  handlePATCH(req, session, { params: Promise.resolve({ id: req.url.split('/').pop() || '' }) })
)
export const DELETE = withCounselor((req: NextRequest, session: ValidatedSession) =>
  handleDELETE(req, session, { params: Promise.resolve({ id: req.url.split('/').pop() || '' }) })
)
