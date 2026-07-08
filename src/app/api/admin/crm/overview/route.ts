import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdminAuth } from '@/lib/auth'

export const dynamic = 'force-dynamic'

/**
 * Admin CRM overview — the owner's single-screen view of the whole pipeline:
 * total leads, stage funnel, enrollments + conversion, and a per-counselor
 * breakdown (each counselor's pipeline, enrollments, and conversion) so the
 * admin can oversee every counselor and drill into any one of them.
 */
const STAGE_ORDER = [
  'NEW_LEAD',
  'DEMO_SCHEDULED',
  'DEMO_COMPLETED',
  'OFFER_SENT',
  'NEGOTIATING',
  'PAYMENT_PLAN_CREATED',
  'ENROLLED',
  'ACTIVE_STUDENT',
  'LOST',
]
const WON = new Set(['ENROLLED', 'ACTIVE_STUDENT'])

export async function GET() {
  try {
    await requireAdminAuth()

    const [byStage, byCounselorStage, counselors, enrollTotal, enrollActive] = await Promise.all([
      prisma.leads.groupBy({ by: ['stage'], _count: { id: true } }),
      prisma.leads.groupBy({ by: ['assignedToId', 'stage'], _count: { id: true } }),
      prisma.users.findMany({
        where: { role: { in: ['COUNSELOR', 'ADMIN'] } },
        select: { id: true, name: true, email: true, role: true },
      }),
      prisma.enrollments.count(),
      prisma.enrollments.count({ where: { status: 'ACTIVE' } }),
    ])

    const stageCount = (rows: { stage: string; _count: { id: number } }[]) => {
      const m: Record<string, number> = {}
      for (const r of rows) m[r.stage] = r._count.id
      return m
    }

    const funnel = STAGE_ORDER.map((s) => ({
      stage: s,
      count: byStage.find((r) => r.stage === s)?._count.id || 0,
    }))
    const totalLeads = byStage.reduce((a, r) => a + r._count.id, 0)
    const totalWon = byStage.filter((r) => WON.has(r.stage)).reduce((a, r) => a + r._count.id, 0)
    const totalLost = byStage.find((r) => r.stage === 'LOST')?._count.id || 0

    // Per-counselor rollup
    const perCounselor = counselors
      .map((c) => {
        const rows = byCounselorStage
          .filter((r) => r.assignedToId === c.id)
          .map((r) => ({ stage: r.stage, _count: r._count }))
        const stages = stageCount(rows)
        const total = rows.reduce((a, r) => a + r._count.id, 0)
        const won = rows.filter((r) => WON.has(r.stage)).reduce((a, r) => a + r._count.id, 0)
        const active = total - (stages.LOST || 0) - won
        return {
          id: c.id,
          name: c.name,
          email: c.email,
          role: c.role,
          totalLeads: total,
          activeLeads: active,
          enrolled: won,
          lost: stages.LOST || 0,
          conversionRate: total ? Math.round((won / total) * 1000) / 10 : 0,
          byStage: stages,
        }
      })
      .filter((c) => c.totalLeads > 0 || c.role === 'COUNSELOR')
      .sort((a, b) => b.enrolled - a.enrolled || b.totalLeads - a.totalLeads)

    return NextResponse.json({
      success: true,
      data: {
        totals: {
          totalLeads,
          enrolled: totalWon,
          lost: totalLost,
          open: totalLeads - totalWon - totalLost,
          conversionRate: totalLeads ? Math.round((totalWon / totalLeads) * 1000) / 10 : 0,
          enrollmentsTotal: enrollTotal,
          enrollmentsActive: enrollActive,
        },
        funnel,
        counselors: perCounselor,
      },
    })
  } catch (error) {
    if (error instanceof Error && error.message === 'Admin authentication required') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    console.error('[admin/crm/overview] failed:', error)
    return NextResponse.json({ success: false, error: 'Failed to load overview' }, { status: 500 })
  }
}
