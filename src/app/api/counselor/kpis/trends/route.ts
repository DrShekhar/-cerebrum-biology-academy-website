/**
 * Counselor KPI Trends API
 * GET: Analyze KPI trends and patterns
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { startOfDay, subDays, format } from 'date-fns'

export async function GET(req: NextRequest) {
  try {
    const session = await auth()

    if (!session || !session.user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    if (session.user.role !== 'COUNSELOR' && session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Counselor access only' },
        { status: 403 }
      )
    }

    const { searchParams } = new URL(req.url)
    const days = parseInt(searchParams.get('days') || '30')
    const counselorId = searchParams.get('counselorId') || session.user.id

    if (session.user.role === 'COUNSELOR' && counselorId !== session.user.id) {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Can only view own trends' },
        { status: 403 }
      )
    }

    const startDate = startOfDay(subDays(new Date(), days))

    const kpis = await prisma.counselor_kpis.findMany({
      where: {
        counselorId,
        date: {
          gte: startDate,
        },
      },
      orderBy: {
        date: 'asc',
      },
    })

    const trendData = kpis.map((kpi) => ({
      date: format(new Date(kpi.date), 'yyyy-MM-dd'),
      leadsCreated: kpi.leadsCreated,
      leadsConverted: kpi.leadsConverted,
      conversionRate:
        kpi.leadsContacted > 0
          ? parseFloat(((kpi.leadsConverted / kpi.leadsContacted) * 100).toFixed(2))
          : 0,
      revenue: parseFloat(kpi.revenueGenerated.toString()),
      callsMade: kpi.callsMade,
      demosScheduled: kpi.demosScheduled,
      demosCompleted: kpi.demosCompleted,
    }))

    const totals = kpis.reduce(
      (acc, kpi) => ({
        leadsCreated: acc.leadsCreated + kpi.leadsCreated,
        leadsContacted: acc.leadsContacted + kpi.leadsContacted,
        leadsConverted: acc.leadsConverted + kpi.leadsConverted,
        revenue: acc.revenue + Number(kpi.revenueGenerated),
        callsMade: acc.callsMade + kpi.callsMade,
        demosScheduled: acc.demosScheduled + kpi.demosScheduled,
        demosCompleted: acc.demosCompleted + kpi.demosCompleted,
      }),
      {
        leadsCreated: 0,
        leadsContacted: 0,
        leadsConverted: 0,
        revenue: 0,
        callsMade: 0,
        demosScheduled: 0,
        demosCompleted: 0,
      }
    )

    const avgConversionRate =
      totals.leadsContacted > 0
        ? parseFloat(((totals.leadsConverted / totals.leadsContacted) * 100).toFixed(2))
        : 0

    const daysWithData = kpis.length
    const avgDailyLeads = daysWithData > 0 ? Math.round(totals.leadsCreated / daysWithData) : 0
    const avgDailyConversions =
      daysWithData > 0 ? Math.round(totals.leadsConverted / daysWithData) : 0

    const firstHalfDays = Math.floor(daysWithData / 2)
    const firstHalf = kpis.slice(0, firstHalfDays)
    const secondHalf = kpis.slice(firstHalfDays)

    const firstHalfStats = {
      leadsCreated: firstHalf.reduce((sum, kpi) => sum + kpi.leadsCreated, 0),
      conversions: firstHalf.reduce((sum, kpi) => sum + kpi.leadsConverted, 0),
      revenue: firstHalf.reduce((sum, kpi) => sum + Number(kpi.revenueGenerated), 0),
    }

    const secondHalfStats = {
      leadsCreated: secondHalf.reduce((sum, kpi) => sum + kpi.leadsCreated, 0),
      conversions: secondHalf.reduce((sum, kpi) => sum + kpi.leadsConverted, 0),
      revenue: secondHalf.reduce((sum, kpi) => sum + Number(kpi.revenueGenerated), 0),
    }

    const trends = {
      leads:
        firstHalfStats.leadsCreated > 0
          ? parseFloat(
              (
                ((secondHalfStats.leadsCreated - firstHalfStats.leadsCreated) /
                  firstHalfStats.leadsCreated) *
                100
              ).toFixed(2)
            )
          : 0,
      conversions:
        firstHalfStats.conversions > 0
          ? parseFloat(
              (
                ((secondHalfStats.conversions - firstHalfStats.conversions) /
                  firstHalfStats.conversions) *
                100
              ).toFixed(2)
            )
          : 0,
      revenue:
        firstHalfStats.revenue > 0
          ? parseFloat(
              (
                ((secondHalfStats.revenue - firstHalfStats.revenue) / firstHalfStats.revenue) *
                100
              ).toFixed(2)
            )
          : 0,
    }

    return NextResponse.json({
      success: true,
      data: {
        period: {
          start: format(startDate, 'yyyy-MM-dd'),
          end: format(new Date(), 'yyyy-MM-dd'),
          days,
        },
        trendData,
        summary: {
          avgConversionRate,
          avgDailyLeads,
          avgDailyConversions,
          totalRevenue: totals.revenue,
          totalLeadsCreated: totals.leadsCreated,
          totalLeadsConverted: totals.leadsConverted,
        },
        trends: {
          leads: {
            change: trends.leads,
            direction: trends.leads > 0 ? 'up' : trends.leads < 0 ? 'down' : 'stable',
          },
          conversions: {
            change: trends.conversions,
            direction: trends.conversions > 0 ? 'up' : trends.conversions < 0 ? 'down' : 'stable',
          },
          revenue: {
            change: trends.revenue,
            direction: trends.revenue > 0 ? 'up' : trends.revenue < 0 ? 'down' : 'stable',
          },
        },
      },
    })
  } catch (error) {
    console.error('Error analyzing KPI trends:', error)
    return NextResponse.json({ success: false, error: 'Failed to analyze trends' }, { status: 500 })
  }
}
