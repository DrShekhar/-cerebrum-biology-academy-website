import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { getLeadDetail, updateLeadFields, type LeadViewer } from '@/lib/leads/leadService'
import type { LeadStage, Priority } from '@/generated/prisma'

export const dynamic = 'force-dynamic'

// Thin wrapper over leadService — the same implementation serves the admin
// namespace. Response shape unchanged.

async function viewerFromSession(): Promise<LeadViewer | NextResponse> {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  if (session.user.role !== 'COUNSELOR' && session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  return { userId: session.user.id, role: session.user.role }
}

// GET /api/counselor/leads/[id] - Get full lead detail
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const viewer = await viewerFromSession()
    if (viewer instanceof NextResponse) return viewer

    const lead = await getLeadDetail(viewer, params.id)
    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
    }

    // Format response (shape identical to the pre-service route)
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
      metadata: lead.metadata,
      assignedTo: lead.users ? { name: lead.users.name, email: lead.users.email } : null,
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
        channel: c.type,
        content: c.message,
        status: c.status,
        sentAt: c.sentAt,
      })),
      activities: lead.activities.map((a) => ({
        id: a.id,
        action: a.action,
        description: a.description,
        createdAt: a.createdAt,
        by: a.users?.name || 'System',
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
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const viewer = await viewerFromSession()
    if (viewer instanceof NextResponse) return viewer

    const body = await request.json()

    const updated = await updateLeadFields(viewer, params.id, {
      ...(body.stage !== undefined ? { stage: body.stage as LeadStage } : {}),
      ...(body.priority !== undefined ? { priority: body.priority as Priority } : {}),
      ...(body.courseInterest !== undefined ? { courseInterest: body.courseInterest } : {}),
      ...(body.nextFollowUpAt !== undefined ? { nextFollowUpAt: body.nextFollowUpAt } : {}),
      ...(body.lastContactedAt !== undefined ? { lastContactedAt: body.lastContactedAt } : {}),
      ...(body.lostReason !== undefined ? { lostReason: body.lostReason } : {}),
    })

    if (!updated) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
    }

    return NextResponse.json({ data: updated })
  } catch (error) {
    console.error('Error updating lead:', error)
    return NextResponse.json({ error: 'Failed to update lead' }, { status: 500 })
  }
}
