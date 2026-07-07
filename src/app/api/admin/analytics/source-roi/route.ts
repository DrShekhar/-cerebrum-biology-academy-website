import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdminAuth } from '@/lib/auth'

export const dynamic = 'force-dynamic'

/**
 * Source-ROI report (smart-CRM wave 3) — the owner's attribution view:
 * per source/campaign → leads → demos → enrollments → collected revenue.
 * ?days=30|90|365 (default 90). Groups by utmSource∥sourceDetail∥source.
 */
export async function GET(request: NextRequest) {
  try {
    await requireAdminAuth()
    const days = Math.min(730, Math.max(7, parseInt(request.nextUrl.searchParams.get('days') || '90', 10)))
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000)

    const leads = await prisma.leads.findMany({
      where: { createdAt: { gte: since } },
      select: {
        id: true,
        stage: true,
        source: true,
        sourceDetail: true,
        utmSource: true,
        utmCampaign: true,
        convertedAt: true,
        fee_plans: { select: { amountPaid: true } },
      },
    })

    interface Row {
      key: string
      utmSource: string | null
      campaigns: Set<string>
      leads: number
      demos: number
      enrolled: number
      lost: number
      revenue: number
    }
    const rows = new Map<string, Row>()
    const DEMO_PLUS = new Set([
      'DEMO_SCHEDULED',
      'DEMO_COMPLETED',
      'OFFER_SENT',
      'NEGOTIATING',
      'PAYMENT_PLAN_CREATED',
      'ENROLLED',
      'ACTIVE_STUDENT',
    ])

    for (const lead of leads) {
      const key = lead.utmSource || lead.sourceDetail || lead.source || 'unknown'
      let row = rows.get(key)
      if (!row) {
        row = {
          key,
          utmSource: lead.utmSource,
          campaigns: new Set(),
          leads: 0,
          demos: 0,
          enrolled: 0,
          lost: 0,
          revenue: 0,
        }
        rows.set(key, row)
      }
      row.leads++
      if (lead.utmCampaign) row.campaigns.add(lead.utmCampaign)
      if (DEMO_PLUS.has(lead.stage)) row.demos++
      if (lead.stage === 'ENROLLED' || lead.stage === 'ACTIVE_STUDENT') row.enrolled++
      if (lead.stage === 'LOST') row.lost++
      row.revenue += lead.fee_plans.reduce((a, fp) => a + Number(fp.amountPaid || 0), 0)
    }

    const data = Array.from(rows.values())
      .map((r) => ({
        source: r.key,
        campaigns: Array.from(r.campaigns).slice(0, 10),
        leads: r.leads,
        demos: r.demos,
        enrolled: r.enrolled,
        lost: r.lost,
        revenue: Math.round(r.revenue),
        demoRate: r.leads ? Math.round((r.demos / r.leads) * 100) : 0,
        enrollRate: r.leads ? Math.round((r.enrolled / r.leads) * 1000) / 10 : 0,
      }))
      .sort((a, b) => b.revenue - a.revenue || b.enrolled - a.enrolled || b.leads - a.leads)

    return NextResponse.json({
      success: true,
      data: { days, totalLeads: leads.length, sources: data },
    })
  } catch (error) {
    if (error instanceof Error && error.message === 'Admin authentication required') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    console.error('[admin/analytics/source-roi] failed:', error)
    return NextResponse.json({ success: false, error: 'Failed to build report' }, { status: 500 })
  }
}
