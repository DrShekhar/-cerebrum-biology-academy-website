import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdminAuth } from '@/lib/auth'

/**
 * Admin marketing API — real Prisma (replaces the InstantDB mock).
 *
 * - Campaigns are stored in `marketing_campaigns` (aggregate metrics on the row).
 * - Abandoned carts are DERIVED live from PENDING enrollments (pendingAmount > 0)
 *   with a short grace window; a cart "recovers" when its enrollment goes ACTIVE.
 *   No separate table and no seeding required.
 * - Metrics are never fabricated: a fresh campaign reads 0 sent/opened/etc. until
 *   real sends/tracking update it.
 */

const GRACE_MS = 60 * 60 * 1000 // 1h before a pending enrollment counts as abandoned
const HIGH_VALUE = 10000 // ₹ threshold for a "high value" cart

type CampaignRow = {
  id: string
  name: string
  type: string
  status: string
  objective: string
  targetAudience: unknown
  contentWhatsapp: unknown
  contentSms: unknown
  contentEmail: unknown
  scheduledAt: Date | null
  frequency: string | null
  endDate: Date | null
  metricsSent: number
  metricsDelivered: number
  metricsOpened: number
  metricsClicked: number
  metricsConverted: number
  metricsUnsubscribed: number
  metricsCost: number
  createdById: string | null
  createdAt: Date
  updatedAt: Date
}

/** Shape a DB row into the object the UI expects (metrics as a nested object). */
function toCampaignDTO(c: CampaignRow) {
  return {
    id: c.id,
    name: c.name,
    type: c.type,
    status: c.status,
    objective: c.objective,
    targetAudience: c.targetAudience,
    content: {
      whatsapp: c.contentWhatsapp || undefined,
      sms: c.contentSms || undefined,
      email: c.contentEmail || undefined,
    },
    scheduledAt: c.scheduledAt ? c.scheduledAt.getTime() : undefined,
    frequency: c.frequency || undefined,
    endDate: c.endDate ? c.endDate.getTime() : undefined,
    metrics: {
      sent: c.metricsSent,
      delivered: c.metricsDelivered,
      opened: c.metricsOpened,
      clicked: c.metricsClicked,
      converted: c.metricsConverted,
      unsubscribed: c.metricsUnsubscribed,
      cost: c.metricsCost,
    },
    createdBy: c.createdById || 'system',
    createdAt: c.createdAt.getTime(),
    updatedAt: c.updatedAt.getTime(),
  }
}

/** Derive current abandoned carts from PENDING enrollments. */
async function loadAbandonedCarts(limit: number, offset: number) {
  const cutoff = new Date(Date.now() - GRACE_MS)
  const where = {
    status: 'PENDING' as const,
    pendingAmount: { gt: 0 },
    createdAt: { lte: cutoff },
  }
  const [rows, total] = await Promise.all([
    prisma.enrollments.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
      select: {
        id: true,
        userId: true,
        pendingAmount: true,
        createdAt: true,
        courses: { select: { name: true } },
        users: {
          select: { id: true, email: true, phone: true, profile: true },
        },
      },
    }),
    prisma.enrollments.count({ where }),
  ])

  const abandonedCarts = rows.map((e) => {
    const profile = (e.users?.profile as { currentClass?: string } | null) || null
    return {
      id: e.id,
      userId: e.userId,
      totalAmount: e.pendingAmount,
      abandonedAt: e.createdAt.getTime(),
      recovered: false,
      course: e.courses?.name || null,
      user: e.users
        ? {
            id: e.users.id,
            email: e.users.email,
            phone: e.users.phone || undefined,
            profile: { currentClass: profile?.currentClass || undefined },
          }
        : undefined,
    }
  })

  return { abandonedCarts, total }
}

// ─────────────────────────────────────────────────────────────────────────────
// GET
// ─────────────────────────────────────────────────────────────────────────────
export async function GET(request: NextRequest) {
  try {
    await requireAdminAuth()

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const status = searchParams.get('status')
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10))
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20', 10)))
    const offset = (page - 1) * limit

    switch (type) {
      case 'campaigns': {
        const where = status ? { status } : {}
        const [rows, total] = await Promise.all([
          prisma.marketing_campaigns.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            take: limit,
            skip: offset,
          }),
          prisma.marketing_campaigns.count({ where }),
        ])
        return NextResponse.json({
          success: true,
          data: {
            campaigns: rows.map((r) => toCampaignDTO(r as CampaignRow)),
            pagination: { page, limit, total, pages: Math.ceil(total / limit) },
          },
        })
      }

      case 'abandoned-carts': {
        const { abandonedCarts, total } = await loadAbandonedCarts(limit, offset)
        const recoveryOpportunities = {
          highValue: abandonedCarts.filter((c) => c.totalAmount > HIGH_VALUE).length,
          recentAbandonment: abandonedCarts.filter(
            (c) => Date.now() - c.abandonedAt < 24 * 60 * 60 * 1000
          ).length,
          totalPotentialRevenue: abandonedCarts.reduce((s, c) => s + c.totalAmount, 0),
        }
        return NextResponse.json({
          success: true,
          data: {
            abandonedCarts,
            recoveryOpportunities,
            pagination: { page, limit, total, pages: Math.ceil(total / limit) },
          },
        })
      }

      case 'automation': {
        const automationMetrics = await getAutomationMetrics()
        return NextResponse.json({ success: true, data: { automationMetrics } })
      }

      default:
        return NextResponse.json({ success: true, data: await getMarketingOverview() })
    }
  } catch (error) {
    if (error instanceof Error && error.message === 'Admin authentication required') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Marketing API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch marketing data' },
      { status: 500 }
    )
  }
}

async function getMarketingOverview() {
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)

  const [totalCampaigns, activeCampaigns, allAgg, weekAgg, cartData] = await Promise.all([
    prisma.marketing_campaigns.count(),
    prisma.marketing_campaigns.count({ where: { status: 'active' } }),
    prisma.marketing_campaigns.aggregate({
      _sum: { metricsSent: true, metricsConverted: true },
    }),
    prisma.marketing_campaigns.aggregate({
      where: { createdAt: { gte: weekAgo } },
      _sum: {
        metricsSent: true,
        metricsOpened: true,
        metricsClicked: true,
        metricsConverted: true,
      },
    }),
    loadAbandonedCarts(10, 0),
  ])

  const totalReach = allAgg._sum.metricsSent || 0
  const totalConverted = allAgg._sum.metricsConverted || 0
  const conversionRate = totalReach > 0 ? totalConverted / totalReach : 0

  const recentCampaigns = await prisma.marketing_campaigns.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
  })

  return {
    totalCampaigns,
    activeCampaigns,
    totalReach,
    conversionRate,
    weeklyMetrics: {
      sent: weekAgg._sum.metricsSent || 0,
      opened: weekAgg._sum.metricsOpened || 0,
      clicked: weekAgg._sum.metricsClicked || 0,
      converted: weekAgg._sum.metricsConverted || 0,
    },
    recentCampaigns: recentCampaigns.map((r) => toCampaignDTO(r as CampaignRow)),
    urgentAbandonedCarts: cartData.abandonedCarts,
    recommendations: buildRecommendations({
      activeCampaigns,
      conversionRate,
      abandonedCartCount: cartData.total,
    }),
  }
}

async function getAutomationMetrics() {
  const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  const cutoff = new Date(Date.now() - GRACE_MS)

  const [
    campaignAgg,
    activeCampaigns,
    totalCampaigns,
    pendingCarts,
    recoveredCount,
    whatsappCount,
  ] = await Promise.all([
    prisma.marketing_campaigns.aggregate({
      where: { createdAt: { gte: monthAgo } },
      _sum: { metricsSent: true, metricsConverted: true },
    }),
    prisma.marketing_campaigns.count({ where: { status: 'active' } }),
    prisma.marketing_campaigns.count({ where: { createdAt: { gte: monthAgo } } }),
    prisma.enrollments.aggregate({
      where: { status: 'PENDING', pendingAmount: { gt: 0 }, createdAt: { lte: cutoff } },
      _count: { _all: true },
      _sum: { pendingAmount: true },
    }),
    prisma.enrollments.aggregate({
      where: { status: 'ACTIVE', enrollmentDate: { gte: monthAgo } },
      _count: { _all: true },
      _sum: { paidAmount: true },
    }),
    prisma.crm_communications.count({
      where: { type: 'WHATSAPP', sentAt: { gte: monthAgo } },
    }),
  ])

  const abandonedTotal = pendingCarts._count._all
  const recoveredTotal = recoveredCount._count._all
  const enrolledLeads = await prisma.leads.count({
    where: { stage: { in: ['ENROLLED', 'ACTIVE_STUDENT'] } },
  })
  const totalLeads = await prisma.leads.count()

  return {
    campaigns: {
      total: totalCampaigns,
      active: activeCampaigns,
      totalSent: campaignAgg._sum.metricsSent || 0,
      totalConverted: campaignAgg._sum.metricsConverted || 0,
    },
    abandonedCarts: {
      total: abandonedTotal,
      recovered: recoveredTotal,
      totalValue: pendingCarts._sum.pendingAmount || 0,
      recoveredValue: recoveredCount._sum.paidAmount || 0,
    },
    whatsappEngagement: {
      messagesSent: whatsappCount,
    },
    overallPerformance: {
      conversionRate: totalLeads > 0 ? enrolledLeads / totalLeads : 0,
      enrolledLeads,
      totalLeads,
    },
  }
}

function buildRecommendations(input: {
  activeCampaigns: number
  conversionRate: number
  abandonedCartCount: number
}): string[] {
  const recs: string[] = []
  if (input.abandonedCartCount > 0) {
    recs.push(
      `${input.abandonedCartCount} pending enrolments haven't been paid — launch a recovery campaign.`
    )
  }
  if (input.activeCampaigns === 0) {
    recs.push('No active campaigns. Create one to re-engage leads and past demo attendees.')
  }
  if (input.conversionRate > 0 && input.conversionRate < 0.05) {
    recs.push('Campaign conversion is under 5% — tighten targeting or refresh the message.')
  }
  return recs
}

// ─────────────────────────────────────────────────────────────────────────────
// POST — create a campaign (draft/scheduled). Does NOT auto-send.
// ─────────────────────────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const session = await requireAdminAuth()
    const body = await request.json()
    const { name, type, objective, targetAudience, content, scheduledAt, frequency, endDate } = body

    if (!name || !type || !objective || !targetAudience) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required campaign fields (name, type, objective, targetAudience)',
        },
        { status: 400 }
      )
    }

    const created = await prisma.marketing_campaigns.create({
      data: {
        id: crypto.randomUUID(),
        name,
        type,
        status: scheduledAt ? 'scheduled' : 'draft',
        objective,
        targetAudience,
        contentWhatsapp: content?.whatsapp ?? undefined,
        contentSms: content?.sms ?? undefined,
        contentEmail: content?.email ?? undefined,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
        frequency: frequency || null,
        endDate: endDate ? new Date(endDate) : null,
        createdById: session.user?.id || null,
        updatedAt: new Date(),
      },
    })

    return NextResponse.json(
      { success: true, data: toCampaignDTO(created as CampaignRow) },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof Error && error.message === 'Admin authentication required') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Create campaign error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create campaign' },
      { status: 500 }
    )
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// PATCH — update campaign status (pause/resume/activate) or metrics.
// ─────────────────────────────────────────────────────────────────────────────
export async function PATCH(request: NextRequest) {
  try {
    await requireAdminAuth()
    const body = await request.json()
    const { id, status } = body
    if (!id) {
      return NextResponse.json({ success: false, error: 'Campaign id required' }, { status: 400 })
    }
    const allowed = ['draft', 'scheduled', 'active', 'paused', 'completed', 'failed']
    if (status && !allowed.includes(status)) {
      return NextResponse.json({ success: false, error: 'Invalid status' }, { status: 400 })
    }

    const updated = await prisma.marketing_campaigns.update({
      where: { id },
      data: { ...(status ? { status } : {}), updatedAt: new Date() },
    })
    return NextResponse.json({ success: true, data: toCampaignDTO(updated as CampaignRow) })
  } catch (error) {
    if (error instanceof Error && error.message === 'Admin authentication required') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Update campaign error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update campaign' },
      { status: 500 }
    )
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// DELETE — remove a draft campaign.
// ─────────────────────────────────────────────────────────────────────────────
export async function DELETE(request: NextRequest) {
  try {
    await requireAdminAuth()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) {
      return NextResponse.json({ success: false, error: 'Campaign id required' }, { status: 400 })
    }
    const campaign = await prisma.marketing_campaigns.findUnique({ where: { id } })
    if (!campaign) {
      return NextResponse.json({ success: false, error: 'Campaign not found' }, { status: 404 })
    }
    if (campaign.status !== 'draft') {
      return NextResponse.json(
        { success: false, error: 'Only draft campaigns can be deleted' },
        { status: 400 }
      )
    }
    await prisma.marketing_campaigns.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof Error && error.message === 'Admin authentication required') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Delete campaign error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete campaign' },
      { status: 500 }
    )
  }
}
