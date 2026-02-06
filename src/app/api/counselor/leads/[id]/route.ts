import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from '@/lib/auth'

export const dynamic = 'force-dynamic'

// GET /api/counselor/leads/[id] - Get full lead detail
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const lead = await prisma.leads.findUnique({
      where: { id: params.id },
      include: {
        users: {
          select: { name: true, email: true },
        },
        notes: {
          orderBy: { createdAt: 'desc' },
          take: 50,
          include: {
            users: {
              select: { name: true },
            },
          },
        },
        tasks: {
          orderBy: { createdAt: 'desc' },
          take: 20,
        },
        crm_communications: {
          orderBy: { createdAt: 'desc' },
          take: 30,
        },
        fee_plans: {
          include: {
            installments: {
              orderBy: { dueDate: 'asc' },
            },
          },
        },
        offers: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        _count: {
          select: {
            crm_communications: true,
            tasks: true,
            notes: true,
          },
        },
      },
    })

    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
    }

    // Format response
    const response = {
      id: lead.id,
      studentName: lead.studentName,
      email: lead.email,
      phone: lead.phone,
      courseInterest: lead.courseInterest,
      stage: lead.stage,
      priority: lead.priority,
      source: lead.source,
      score: lead.score,
      scoreBreakdown: lead.scoreBreakdown,
      lastContactedAt: lead.lastContactedAt,
      nextFollowUpAt: lead.nextFollowUpAt,
      createdAt: lead.createdAt,
      updatedAt: lead.updatedAt,
      lostReason: lead.lostReason,
      demoBookingId: lead.demoBookingId,
      assignedTo: lead.users
        ? { name: lead.users.name, email: lead.users.email }
        : null,
      notes: lead.notes.map((n) => ({
        id: n.id,
        content: n.content,
        createdAt: n.createdAt,
        createdBy: { name: n.users.name },
      })),
      tasks: lead.tasks.map((t) => ({
        id: t.id,
        title: t.title,
        type: t.type,
        priority: t.priority,
        status: t.status,
        dueDate: t.dueDate,
      })),
      communications: lead.crm_communications.map((c) => ({
        id: c.id,
        type: c.type,
        channel: c.channel,
        content: c.content,
        status: c.status,
        sentAt: c.createdAt,
      })),
      feePlans: lead.fee_plans.map((fp) => ({
        id: fp.id,
        courseName: fp.courseName,
        totalFee: Number(fp.totalFee),
        amountPaid: Number(fp.amountPaid),
        amountDue: Number(fp.amountDue),
        status: fp.status,
        installments: fp.installments.map((inst) => ({
          id: inst.id,
          amount: Number(inst.amount),
          dueDate: inst.dueDate,
          status: inst.status,
        })),
      })),
      offers: lead.offers.map((o) => ({
        id: o.id,
        offerName: o.offerName,
        courseName: o.courseName,
        originalPrice: Number(o.originalPrice),
        finalPrice: Number(o.finalPrice),
        validUntil: o.validUntil,
        isActive: o.isActive,
      })),
      _count: {
        communications: lead._count.crm_communications,
        tasks: lead._count.tasks,
        notes: lead._count.notes,
      },
    }

    return NextResponse.json({ data: response })
  } catch (error) {
    console.error('Error fetching lead detail:', error)
    return NextResponse.json({ error: 'Failed to fetch lead' }, { status: 500 })
  }
}

// PATCH /api/counselor/leads/[id] - Update lead fields
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const allowedFields = [
      'stage',
      'priority',
      'courseInterest',
      'nextFollowUpAt',
      'lastContactedAt',
      'lostReason',
    ]

    const updateData: Record<string, any> = { updatedAt: new Date() }
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field]
      }
    }

    // If stage changed to LOST, record the timestamp
    if (body.stage === 'LOST') {
      updateData.lostAt = new Date()
    }
    // If stage changed to ENROLLED, record conversion
    if (body.stage === 'ENROLLED') {
      updateData.convertedAt = new Date()
    }

    const updated = await prisma.leads.update({
      where: { id: params.id },
      data: updateData,
    })

    return NextResponse.json({ data: updated })
  } catch (error) {
    console.error('Error updating lead:', error)
    return NextResponse.json({ error: 'Failed to update lead' }, { status: 500 })
  }
}
