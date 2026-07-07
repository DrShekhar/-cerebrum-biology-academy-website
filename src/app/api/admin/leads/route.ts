import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireAdminAuth } from '@/lib/auth'
import { upsertLeadCore } from '@/lib/leads/upsertLead'
import { buildLeadListWhere, updateLeadFields } from '@/lib/leads/leadService'
import { v4 as uuidv4 } from 'uuid'
import type { LeadSource, Priority, LeadStage } from '@/generated/prisma'

/**
 * GET /api/admin/leads
 * Fetch leads with pagination, filtering, and search
 */
export async function GET(request: NextRequest) {
  try {
    const adminSession = await requireAdminAuth()

    const { searchParams } = new URL(request.url)

    // Pagination (limit capped to avoid unbounded result sets)
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10))
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20', 10)))

    // Filters
    const stage = searchParams.get('stage') as LeadStage | null
    const priority = searchParams.get('priority') as Priority | null
    const source = searchParams.get('source') as LeadSource | null
    const assignedToId = searchParams.get('assignedToId')
    const search = searchParams.get('search')
    const dateFrom = searchParams.get('dateFrom')
    const dateTo = searchParams.get('dateTo')

    // Shared where-builder (leadService) — same filter semantics as the
    // counselor namespace, plus courseInterest in search and assignee filter.
    const where = buildLeadListWhere(
      { userId: adminSession?.user?.id || '', role: 'ADMIN' },
      {
        stage,
        priority,
        source,
        assignedToId,
        search,
        dateFrom,
        dateTo,
        searchCourseInterest: true,
      }
    )

    // Parallel queries for data + count
    const [leads, total] = await Promise.all([
      prisma.leads.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          users: {
            select: { id: true, name: true, email: true },
          },
          _count: {
            select: {
              activities: true,
              notes: true,
              crm_communications: true,
            },
          },
        },
      }),
      prisma.leads.count({ where }),
    ])

    // Get stage counts for stats
    const stageCounts = await prisma.leads.groupBy({
      by: ['stage'],
      _count: { id: true },
    })

    const stats = {
      total,
      byStage: stageCounts.reduce(
        (acc, item) => {
          acc[item.stage] = item._count.id
          return acc
        },
        {} as Record<string, number>
      ),
    }

    return NextResponse.json({
      success: true,
      data: leads,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      stats,
    })
  } catch (error) {
    console.error('Get leads error:', error)

    if (error instanceof Error && error.message === 'Admin authentication required') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    return NextResponse.json({ success: false, error: 'Failed to fetch leads' }, { status: 500 })
  }
}

const createLeadSchema = z.object({
  studentName: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  phone: z
    .string()
    .min(10, 'Phone must be at least 10 digits')
    .regex(/^[+]?[\d\s()-]+$/, 'Invalid phone number format'),
  courseInterest: z.string().min(1, 'Course interest is required'),
  source: z.enum([
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
  ]),
  priority: z.enum(['HOT', 'WARM', 'COLD']).default('WARM'),
  assignedToId: z.string().min(1, 'Assigned counselor is required'),
  nextFollowUpAt: z.string().optional(),
  notes: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    await requireAdminAuth()

    const body = await request.json()
    const validatedData = createLeadSchema.parse(body)

    // Canonical CRM write: dedup by phone. The operator-chosen assignee wins
    // over round-robin; a duplicate surfaces as a conflict flag instead of a
    // silent second lead.
    const result = await upsertLeadCore(prisma, {
      name: validatedData.studentName,
      phone: validatedData.phone,
      email: validatedData.email || null,
      courseInterest: validatedData.courseInterest,
      source: 'admin-panel',
      sourceEnum: validatedData.source as LeadSource,
      priority: validatedData.priority as Priority,
      assignedToId: validatedData.assignedToId,
      skipTask: true,
    })

    if (result.created && validatedData.nextFollowUpAt) {
      await prisma.leads.update({
        where: { id: result.leadId },
        data: { nextFollowUpAt: new Date(validatedData.nextFollowUpAt) },
      })
    }

    // Note only lands on a lead this create actually made — on a dedup hit it
    // would otherwise attach to a pre-existing lead owned by someone else,
    // attributed to an assignee who never wrote it.
    if (result.created && validatedData.notes) {
      await prisma.notes.create({
        data: {
          id: uuidv4(),
          leadId: result.leadId,
          content: validatedData.notes,
          createdById: validatedData.assignedToId,
          updatedAt: new Date(),
        },
      })
    }

    if (result.created) {
      await prisma.activities.create({
        data: {
          id: uuidv4(),
          userId: validatedData.assignedToId,
          leadId: result.leadId,
          action: 'lead_created',
          description: `New lead "${validatedData.studentName}" added to CRM`,
          metadata: {
            source: validatedData.source,
            priority: validatedData.priority,
            courseInterest: validatedData.courseInterest,
          },
        },
      })
    }

    const lead = await prisma.leads.findUnique({ where: { id: result.leadId } })

    return NextResponse.json(
      {
        success: true,
        message: result.created
          ? 'Lead added successfully'
          : 'A lead with this phone already exists — showing the existing lead',
        data: lead,
        isExisting: !result.created,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Create lead error:', error)

    if (error instanceof Error && error.message === 'Admin authentication required') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

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

    return NextResponse.json({ success: false, error: 'Failed to create lead' }, { status: 500 })
  }
}

const updateLeadSchema = z.object({
  id: z.string().min(1, 'Lead ID is required'),
  studentName: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  phone: z
    .string()
    .min(10, 'Phone must be at least 10 digits')
    .regex(/^[+]?[\d\s()-]+$/, 'Invalid phone number format'),
  courseInterest: z.string().min(1, 'Course interest is required'),
  source: z.enum([
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
  ]),
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
  priority: z.enum(['HOT', 'WARM', 'COLD']),
  assignedToId: z.string().min(1, 'Assigned counselor is required'),
  nextFollowUpAt: z.string().optional(),
  notes: z.string().optional(),
  lostReason: z.string().optional(),
})

export async function PUT(request: NextRequest) {
  try {
    const adminSession = await requireAdminAuth()

    const body = await request.json()
    const validatedData = updateLeadSchema.parse(body)

    const existingLead = await prisma.leads.findUnique({
      where: { id: validatedData.id },
    })

    if (!existingLead) {
      return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 })
    }

    // Shared update path (leadService): admin edits now get the same
    // stage-transition side effects as the counselor board (lostAt /
    // convertedAt stamps, stage_changed timeline entry, lead/enrolled
    // onboarding event) — previously missing from this route.
    const updatedLead = await updateLeadFields(
      { userId: adminSession?.user?.id || validatedData.assignedToId, role: 'ADMIN' },
      validatedData.id,
      {
        studentName: validatedData.studentName,
        email: validatedData.email || null,
        phone: validatedData.phone,
        courseInterest: validatedData.courseInterest,
        source: validatedData.source as LeadSource,
        stage: validatedData.stage as LeadStage,
        priority: validatedData.priority as Priority,
        assignedToId: validatedData.assignedToId,
        nextFollowUpAt: validatedData.nextFollowUpAt || null,
        lostReason: validatedData.lostReason || null,
      }
    )

    if (!updatedLead) {
      return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 })
    }

    if (validatedData.notes) {
      await prisma.notes.create({
        data: {
          id: uuidv4(),
          leadId: updatedLead.id,
          content: validatedData.notes,
          createdById: validatedData.assignedToId,
          updatedAt: new Date(),
        },
      })
    }

    await prisma.activities.create({
      data: {
        id: uuidv4(),
        userId: validatedData.assignedToId,
        leadId: updatedLead.id,
        action: 'lead_updated',
        description: `Lead "${validatedData.studentName}" updated`,
        metadata: {
          stage: validatedData.stage,
          priority: validatedData.priority,
          changes: {
            from: {
              stage: existingLead.stage,
              priority: existingLead.priority,
            },
            to: {
              stage: validatedData.stage,
              priority: validatedData.priority,
            },
          },
        },
      },
    })

    return NextResponse.json(
      { success: true, message: 'Lead updated successfully', data: updatedLead },
      { status: 200 }
    )
  } catch (error) {
    console.error('Update lead error:', error)

    if (error instanceof Error && error.message === 'Admin authentication required') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

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

    return NextResponse.json({ success: false, error: 'Failed to update lead' }, { status: 500 })
  }
}
