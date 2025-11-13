/**
 * API Route: Get Counselor Analytics
 * GET /api/counselor/analytics
 */

import { NextRequest, NextResponse } from 'next/server'
import { withCounselor } from '@/lib/auth/middleware'
import { prisma } from '@/lib/prisma'

async function handleGET(req: NextRequest, session: any) {
  try {
    const { searchParams } = new URL(req.url)
    const range = searchParams.get('range') || '30d'

    const days = range === '7d' ? 7 : range === '30d' ? 30 : 90
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    const counselorId = session.userId

    const [
      totalLeads,
      activeLeads,
      convertedLeads,
      lostLeads,
      leads,
      feePlans,
      payments,
      leadsThisWeek,
    ] = await Promise.all([
      prisma.leads.count({
        where: {
          assignedToId: counselorId,
          createdAt: { gte: startDate },
        },
      }),

      prisma.leads.count({
        where: {
          assignedToId: counselorId,
          stage: {
            notIn: ['ENROLLED', 'ACTIVE_STUDENT', 'LOST'],
          },
          createdAt: { gte: startDate },
        },
      }),

      prisma.leads.count({
        where: {
          assignedToId: counselorId,
          stage: { in: ['ENROLLED', 'ACTIVE_STUDENT'] },
          createdAt: { gte: startDate },
        },
      }),

      prisma.leads.count({
        where: {
          assignedToId: counselorId,
          stage: 'LOST',
          createdAt: { gte: startDate },
        },
      }),

      prisma.leads.findMany({
        where: {
          assignedToId: counselorId,
          createdAt: { gte: startDate },
        },
        select: {
          stage: true,
          createdAt: true,
          lastContactedAt: true,
        },
      }),

      prisma.fee_plans.findMany({
        where: {
          leads: {
            assignedToId: counselorId,
          },
          createdAt: { gte: startDate },
        },
        select: {
          finalAmount: true,
          status: true,
        },
      }),

      prisma.fee_payments.findMany({
        where: {
          installments: {
            fee_plans: {
              leads: {
                assignedToId: counselorId,
              },
            },
          },
          createdAt: { gte: startDate },
        },
        select: {
          amount: true,
          status: true,
        },
      }),

      prisma.leads.findMany({
        where: {
          assignedToId: counselorId,
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          },
        },
        select: {
          stage: true,
          createdAt: true,
        },
      }),
    ])

    const conversionRate = totalLeads > 0 ? Math.round((convertedLeads / totalLeads) * 100) : 0

    const responseTimes = leads
      .filter((l) => l.lastContactedAt && l.createdAt)
      .map((l) => {
        const diff = new Date(l.lastContactedAt!).getTime() - new Date(l.createdAt).getTime()
        return Math.max(0, Math.floor(diff / 1000))
      })
    const averageResponseTime =
      responseTimes.length > 0 ? responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length : 0

    const stageCount = leads.reduce(
      (acc, lead) => {
        acc[lead.stage] = (acc[lead.stage] || 0) + 1
        return acc
      },
      {} as Record<string, number>
    )

    const stageDistribution = Object.entries(stageCount).map(
      ([stage, count]: [string, number]) => ({
        stage: stage.replace(/_/g, ' '),
        count,
        percentage: Math.round((count / totalLeads) * 100) || 0,
      })
    )

    const totalRevenue = feePlans.reduce((sum, fp) => sum + fp.finalAmount, 0)
    const paidRevenue = payments
      .filter((p) => p.status === 'SUCCESS')
      .reduce((sum, p) => sum + p.amount, 0)
    const pendingRevenue = totalRevenue - paidRevenue
    const averageDealSize = feePlans.length > 0 ? Math.round(totalRevenue / feePlans.length) : 0

    const weekNew = leadsThisWeek.length
    const weekContacted = leadsThisWeek.filter((l) =>
      ['CONTACTED', 'DEMO_SCHEDULED', 'DEMO_COMPLETED'].includes(l.stage)
    ).length
    const weekConverted = leadsThisWeek.filter((l) =>
      ['ENROLLED', 'ACTIVE_STUDENT'].includes(l.stage)
    ).length
    const weekLost = leadsThisWeek.filter((l) => l.stage === 'LOST').length

    return NextResponse.json({
      success: true,
      data: {
        overview: {
          totalLeads,
          activeLeads,
          convertedLeads,
          lostLeads,
          conversionRate,
          averageResponseTime,
        },
        leadsThisWeek: {
          new: weekNew,
          contacted: weekContacted,
          converted: weekConverted,
          lost: weekLost,
        },
        stageDistribution,
        revenueMetrics: {
          totalRevenue,
          paidRevenue,
          pendingRevenue,
          averageDealSize,
        },
      },
    })
  } catch (error) {
    console.error('Analytics error:', error)

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch analytics',
      },
      { status: 500 }
    )
  }
}

export const GET = withCounselor(handleGET)
