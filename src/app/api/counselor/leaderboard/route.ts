/**
 * Counselor Leaderboard API
 * GET: Fetch counselor leaderboard rankings
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { startOfWeek, startOfMonth, endOfMonth, endOfWeek, format } from 'date-fns'

export async function GET(req: NextRequest) {
  try {
    const session = await auth()

    if (!session || !session.user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    if (session.user.role !== 'counselor' && session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Counselor access only' },
        { status: 403 }
      )
    }

    const { searchParams } = new URL(req.url)
    const period = (searchParams.get('period') || 'MONTHLY') as 'WEEKLY' | 'MONTHLY'

    let periodStart: Date
    let periodEnd: Date

    if (period === 'WEEKLY') {
      periodStart = startOfWeek(new Date(), { weekStartsOn: 1 })
      periodEnd = endOfWeek(new Date(), { weekStartsOn: 1 })
    } else {
      periodStart = startOfMonth(new Date())
      periodEnd = endOfMonth(new Date())
    }

    const counselors = await prisma.users.findMany({
      where: {
        role: 'counselor',
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    })

    const leaderboardData = await Promise.all(
      counselors.map(async (counselor) => {
        const kpis = await prisma.counselor_kpis.findMany({
          where: {
            counselorId: counselor.id,
            date: {
              gte: periodStart,
              lte: periodEnd,
            },
          },
        })

        const totals = kpis.reduce(
          (acc, kpi) => ({
            leadsCreated: acc.leadsCreated + kpi.leadsCreated,
            leadsContacted: acc.leadsContacted + kpi.leadsContacted,
            leadsConverted: acc.leadsConverted + kpi.leadsConverted,
            revenue: acc.revenue + Number(kpi.revenueGenerated),
            callsMade: acc.callsMade + kpi.callsMade,
            demosScheduled: acc.demosScheduled + kpi.demosScheduled,
            demosCompleted: acc.demosCompleted + kpi.demosCompleted,
            avgResponseTime: kpi.avgResponseTime
              ? acc.avgResponseTime + kpi.avgResponseTime
              : acc.avgResponseTime,
            responseCount: kpi.avgResponseTime ? acc.responseCount + 1 : acc.responseCount,
          }),
          {
            leadsCreated: 0,
            leadsContacted: 0,
            leadsConverted: 0,
            revenue: 0,
            callsMade: 0,
            demosScheduled: 0,
            demosCompleted: 0,
            avgResponseTime: 0,
            responseCount: 0,
          }
        )

        const conversionRate =
          totals.leadsContacted > 0 ? (totals.leadsConverted / totals.leadsContacted) * 100 : 0

        const avgResponseTime =
          totals.responseCount > 0 ? totals.avgResponseTime / totals.responseCount : 0

        const score =
          totals.leadsConverted * 10 +
          totals.revenue * 0.01 +
          conversionRate * 5 +
          totals.demosCompleted * 3 -
          avgResponseTime * 0.1

        return {
          counselorId: counselor.id,
          counselorName: counselor.name,
          counselorEmail: counselor.email,
          totalLeads: totals.leadsCreated,
          conversions: totals.leadsConverted,
          revenue: totals.revenue,
          conversionRate: parseFloat(conversionRate.toFixed(2)),
          avgResponseTime: Math.round(avgResponseTime),
          score: parseFloat(score.toFixed(2)),
          demosCompleted: totals.demosCompleted,
          callsMade: totals.callsMade,
        }
      })
    )

    const rankedData = leaderboardData
      .sort((a, b) => b.score - a.score)
      .map((data, index) => ({
        ...data,
        rank: index + 1,
      }))

    await prisma.$transaction(
      rankedData.map((data) =>
        prisma.counselor_leaderboard.upsert({
          where: {
            counselorId_period_periodStart: {
              counselorId: data.counselorId,
              period,
              periodStart,
            },
          },
          create: {
            counselorId: data.counselorId,
            period,
            periodStart,
            periodEnd,
            rank: data.rank,
            totalLeads: data.totalLeads,
            conversions: data.conversions,
            revenue: data.revenue,
            conversionRate: data.conversionRate,
            avgResponseTime: data.avgResponseTime,
            score: data.score,
          },
          update: {
            rank: data.rank,
            totalLeads: data.totalLeads,
            conversions: data.conversions,
            revenue: data.revenue,
            conversionRate: data.conversionRate,
            avgResponseTime: data.avgResponseTime,
            score: data.score,
            updatedAt: new Date(),
          },
        })
      )
    )

    const currentUserRank = rankedData.find((r) => r.counselorId === session.user.id)

    return NextResponse.json({
      success: true,
      data: {
        period,
        periodStart: format(periodStart, 'yyyy-MM-dd'),
        periodEnd: format(periodEnd, 'yyyy-MM-dd'),
        leaderboard: rankedData,
        currentUser: currentUserRank,
        statistics: {
          totalCounselors: rankedData.length,
          topPerformer: rankedData[0],
          avgConversionRate: parseFloat(
            (rankedData.reduce((sum, r) => sum + r.conversionRate, 0) / rankedData.length).toFixed(
              2
            )
          ),
          totalRevenue: rankedData.reduce((sum, r) => sum + r.revenue, 0),
        },
      },
    })
  } catch (error) {
    console.error('Error fetching leaderboard:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch leaderboard' },
      { status: 500 }
    )
  }
}
