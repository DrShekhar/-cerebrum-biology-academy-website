import { NextRequest, NextResponse } from 'next/server'
import { authenticateCounselor } from '@/lib/auth/counselor-auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateCounselor()
    if ('error' in authResult) return authResult.error
    const { session } = authResult

    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || 'month'
    const ruleId = searchParams.get('ruleId')
    const actionType = searchParams.get('actionType')

    const periodDays =
      {
        week: 7,
        month: 30,
        quarter: 90,
        year: 365,
      }[period] || 30

    const startDate = new Date()
    startDate.setDate(startDate.getDate() - periodDays)

    const where: any = {
      lead: {
        assignedToId: session.userId,
      },
      createdAt: {
        gte: startDate,
      },
    }

    if (ruleId) {
      where.ruleId = ruleId
    }

    if (actionType) {
      where.channel = actionType
    }

    const [totalHistory, sentCount, failedCount, avgDeliveryTime] = await Promise.all([
      prisma.followup_history.count({ where }),
      prisma.followup_history.count({
        where: { ...where, status: 'SENT' },
      }),
      prisma.followup_history.count({
        where: { ...where, status: 'FAILED' },
      }),
      prisma.followup_history.aggregate({
        where: {
          ...where,
          status: 'SENT',
          metadata: {
            path: ['deliveryTime'],
            not: prisma.AnyNull,
          },
        },
        _avg: {
          id: true,
        },
      }),
    ])

    const rulePerformance = await prisma.followup_history.groupBy({
      by: ['ruleId'],
      where: {
        lead: {
          assignedToId: session.userId,
        },
        createdAt: {
          gte: startDate,
        },
      },
      _count: true,
    })

    const ruleStats = await Promise.all(
      rulePerformance.map(async (rp) => {
        const rule = await prisma.followup_rules.findUnique({
          where: { id: rp.ruleId },
          select: { id: true, name: true, actionType: true },
        })

        const sent = await prisma.followup_history.count({
          where: {
            ruleId: rp.ruleId,
            status: 'SENT',
            lead: { assignedToId: session.userId },
            createdAt: { gte: startDate },
          },
        })

        const failed = await prisma.followup_history.count({
          where: {
            ruleId: rp.ruleId,
            status: 'FAILED',
            lead: { assignedToId: session.userId },
            createdAt: { gte: startDate },
          },
        })

        return {
          ruleId: rp.ruleId,
          ruleName: rule?.name || 'Unknown Rule',
          actionType: rule?.actionType || 'UNKNOWN',
          total: rp._count,
          sent,
          failed,
          successRate: rp._count > 0 ? (sent / rp._count) * 100 : 0,
        }
      })
    )

    const channelPerformance = await prisma.followup_history.groupBy({
      by: ['channel'],
      where: {
        lead: {
          assignedToId: session.userId,
        },
        createdAt: {
          gte: startDate,
        },
      },
      _count: true,
    })

    const channelStats = await Promise.all(
      channelPerformance.map(async (cp) => {
        const sent = await prisma.followup_history.count({
          where: {
            channel: cp.channel,
            status: 'SENT',
            lead: { assignedToId: session.userId },
            createdAt: { gte: startDate },
          },
        })

        const failed = await prisma.followup_history.count({
          where: {
            channel: cp.channel,
            status: 'FAILED',
            lead: { assignedToId: session.userId },
            createdAt: { gte: startDate },
          },
        })

        return {
          channel: cp.channel,
          total: cp._count,
          sent,
          failed,
          successRate: cp._count > 0 ? (sent / cp._count) * 100 : 0,
        }
      })
    )

    const dailyTrends = await prisma.$queryRaw<
      Array<{ date: Date; total: number; sent: number; failed: number }>
    >`
      SELECT
        DATE(created_at) as date,
        COUNT(*) as total,
        SUM(CASE WHEN status = 'SENT' THEN 1 ELSE 0 END) as sent,
        SUM(CASE WHEN status = 'FAILED' THEN 1 ELSE 0 END) as failed
      FROM followup_history
      WHERE created_at >= ${startDate}
        AND lead_id IN (
          SELECT id FROM leads WHERE assigned_to_id = ${session.userId}
        )
      GROUP BY DATE(created_at)
      ORDER BY date DESC
      LIMIT 30
    `

    const queueStats = await prisma.followup_queue.groupBy({
      by: ['status'],
      where: {
        lead: {
          assignedToId: session.userId,
        },
      },
      _count: true,
    })

    const leadEngagement = await prisma.followup_history.groupBy({
      by: ['leadId'],
      where: {
        lead: {
          assignedToId: session.userId,
        },
        createdAt: {
          gte: startDate,
        },
      },
      _count: true,
      orderBy: {
        _count: {
          leadId: 'desc',
        },
      },
      take: 10,
    })

    const topEngagedLeads = await Promise.all(
      leadEngagement.map(async (le) => {
        const lead = await prisma.leads.findUnique({
          where: { id: le.leadId },
          select: {
            id: true,
            studentName: true,
            email: true,
            stage: true,
          },
        })

        return {
          leadId: le.leadId,
          studentName: lead?.studentName || 'Unknown',
          email: lead?.email,
          stage: lead?.stage,
          followupCount: le._count,
        }
      })
    )

    const successRate = totalHistory > 0 ? (sentCount / totalHistory) * 100 : 0
    const failureRate = totalHistory > 0 ? (failedCount / totalHistory) * 100 : 0

    return NextResponse.json({
      success: true,
      period,
      periodDays,
      overview: {
        total: totalHistory,
        sent: sentCount,
        failed: failedCount,
        successRate: Math.round(successRate * 100) / 100,
        failureRate: Math.round(failureRate * 100) / 100,
        avgDeliveryTime: avgDeliveryTime._avg.id || 0,
      },
      rulePerformance: ruleStats.sort((a, b) => b.total - a.total),
      channelPerformance: channelStats.sort((a, b) => b.total - a.total),
      dailyTrends: dailyTrends.reverse(),
      queueStats: {
        pending: queueStats.find((s) => s.status === 'PENDING')?._count || 0,
        processing: queueStats.find((s) => s.status === 'PROCESSING')?._count || 0,
        completed: queueStats.find((s) => s.status === 'COMPLETED')?._count || 0,
        failed: queueStats.find((s) => s.status === 'FAILED')?._count || 0,
        skipped: queueStats.find((s) => s.status === 'SKIPPED')?._count || 0,
        cancelled: queueStats.find((s) => s.status === 'CANCELLED')?._count || 0,
      },
      topEngagedLeads,
    })
  } catch (error) {
    console.error('Error fetching follow-up analytics:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch follow-up analytics',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
