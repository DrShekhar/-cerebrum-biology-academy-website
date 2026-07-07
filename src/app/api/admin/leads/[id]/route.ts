import { NextRequest, NextResponse } from 'next/server'
import { requireAdminAuth } from '@/lib/auth'
import { auth } from '@/lib/auth'
import { getLeadDetail } from '@/lib/leads/leadService'

/**
 * GET /api/admin/leads/[id]
 * Thin wrapper over leadService.getLeadDetail — the same implementation
 * serves the counselor namespace. Response shape unchanged.
 */
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdminAuth()
    const session = await auth()
    const { id } = await params

    const lead = await getLeadDetail({ userId: session?.user?.id || '', role: 'ADMIN' }, id)

    if (!lead) {
      return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: {
        id: lead.id,
        studentName: lead.studentName,
        email: lead.email,
        phone: lead.phone,
        courseInterest: lead.courseInterest,
        stage: lead.stage,
        priority: lead.priority,
        source: lead.source,
        sourceDetail: lead.sourceDetail,
        score: lead.score,
        scoreBreakdown: lead.scoreBreakdown,
        assignedTo: lead.users ? { name: lead.users.name, email: lead.users.email } : null,
        createdAt: lead.createdAt,
        updatedAt: lead.updatedAt,
        lastContactedAt: lead.lastContactedAt,
        nextFollowUpAt: lead.nextFollowUpAt,
        convertedAt: lead.convertedAt,
        lostReason: lead.lostReason,
        metadata: lead.metadata,
        demoBooking: lead.demo_bookings
          ? {
              id: lead.demo_bookings.id,
              status: lead.demo_bookings.status,
              preferredDate: lead.demo_bookings.preferredDate,
              preferredTime: lead.demo_bookings.preferredTime,
              demoCompleted: lead.demo_bookings.demoCompleted,
              demoRating: lead.demo_bookings.demoRating,
            }
          : null,
        activities: lead.activities.map((a) => ({
          id: a.id,
          action: a.action,
          description: a.description,
          createdAt: a.createdAt,
          by: a.users?.name || 'System',
        })),
        notes: lead.notes.map((n) => ({
          id: n.id,
          content: n.content,
          createdAt: n.createdAt,
          by: n.users?.name || 'Unknown',
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
          content: c.message,
          status: c.status,
          sentAt: c.sentAt,
        })),
        offers: lead.offers.map((o) => ({
          id: o.id,
          status: o.status,
          createdAt: o.createdAt,
        })),
        feePlans: lead.fee_plans.map((fp) => ({
          id: fp.id,
          totalFee: Number(fp.totalFee),
          amountPaid: Number(fp.amountPaid),
          installments: fp.installments.length,
        })),
      },
    })
  } catch (error) {
    if (error instanceof Error && error.message === 'Admin authentication required') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Admin lead detail error:', error)
    return NextResponse.json({ success: false, error: 'Failed to load lead' }, { status: 500 })
  }
}
