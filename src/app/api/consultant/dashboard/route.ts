import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth/config'

export const dynamic = 'force-dynamic'

/**
 * GET /api/consultant/dashboard
 * Fetch consultant dashboard data including stats, referrals, and commissions
 */
export async function GET() {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Get consultant profile
    const consultant = await prisma.consultants.findUnique({
      where: { userId: session.user.id },
      include: {
        user: {
          select: { id: true, name: true, email: true, role: true },
        },
      },
    })

    if (!consultant) {
      return NextResponse.json(
        { success: false, error: 'Consultant profile not found. Please contact admin.' },
        { status: 403 }
      )
    }

    // Get referral counts by status
    const referralStats = await prisma.referrals.groupBy({
      by: ['status'],
      where: { consultantId: consultant.id },
      _count: { id: true },
    })

    // Build status counts map
    const statusCounts: Record<string, number> = {}
    referralStats.forEach((stat) => {
      statusCounts[stat.status] = stat._count.id
    })

    // Get recent referrals
    const recentReferrals = await prisma.referrals.findMany({
      where: { consultantId: consultant.id },
      orderBy: { createdAt: 'desc' },
      take: 10,
      include: {
        referral_link: {
          select: { code: true, name: true },
        },
      },
    })

    // Get pending commissions
    const pendingCommissions = await prisma.commissions.findMany({
      where: {
        consultantId: consultant.id,
        status: 'PENDING',
      },
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: {
        referral: {
          select: { studentName: true, phone: true, status: true },
        },
      },
    })

    // Get recent paid commissions
    const recentPaidCommissions = await prisma.commissions.findMany({
      where: {
        consultantId: consultant.id,
        status: 'PAID',
      },
      orderBy: { paidAt: 'desc' },
      take: 5,
      include: {
        referral: {
          select: { studentName: true, status: true },
        },
      },
    })

    // Get active referral links
    const activeLinks = await prisma.referral_links.findMany({
      where: {
        consultantId: consultant.id,
        isActive: true,
      },
      orderBy: { clickCount: 'desc' },
      take: 5,
    })

    // Calculate monthly trend (last 6 months)
    const monthlyTrend = await calculateMonthlyTrend(consultant.id)

    // Calculate conversion metrics
    const totalLeads = Object.values(statusCounts).reduce((sum, count) => sum + count, 0)
    const enrolledCount = statusCounts['ENROLLED'] || 0
    const lostCount = statusCounts['LOST'] || 0
    const conversionRate = totalLeads > 0 ? Math.round((enrolledCount / totalLeads) * 100) : 0

    // Calculate pipeline value (estimated commission from pending referrals)
    const pipelineReferrals = await prisma.referrals.findMany({
      where: {
        consultantId: consultant.id,
        status: { notIn: ['ENROLLED', 'LOST'] },
      },
      select: { totalFeeAmount: true },
    })

    const pipelineValue = pipelineReferrals.reduce((sum, r) => {
      const fee = r.totalFeeAmount ? Number(r.totalFeeAmount) : 0
      return sum + (fee * Number(consultant.commissionRate)) / 100
    }, 0)

    // Summary stats
    const summary = {
      totalReferrals: consultant.totalReferrals,
      successfulReferrals: consultant.successfulReferrals,
      conversionRate,
      totalCommission: Number(consultant.totalCommission),
      paidCommission: Number(consultant.paidCommission),
      pendingCommission: Number(consultant.pendingCommission),
      pipelineValue: Math.round(pipelineValue),
      activeLinks: activeLinks.length,
      statusCounts: {
        newLead: statusCounts['NEW_LEAD'] || 0,
        demoScheduled: statusCounts['DEMO_SCHEDULED'] || 0,
        demoCompleted: statusCounts['DEMO_COMPLETED'] || 0,
        offerSent: statusCounts['OFFER_SENT'] || 0,
        paymentPending: statusCounts['PAYMENT_PENDING'] || 0,
        enrolled: enrolledCount,
        lost: lostCount,
      },
    }

    return NextResponse.json({
      success: true,
      data: {
        consultant: {
          id: consultant.id,
          userId: consultant.userId,
          consultantCode: consultant.consultantCode,
          displayName: consultant.displayName,
          phone: consultant.phone,
          email: consultant.email,
          commissionRate: Number(consultant.commissionRate),
          isActive: consultant.isActive,
          createdAt: consultant.createdAt.toISOString(),
        },
        summary,
        recentReferrals: recentReferrals.map((r) => ({
          id: r.id,
          studentName: r.studentName,
          phone: r.phone,
          email: r.email,
          courseInterest: r.courseInterest,
          status: r.status,
          statusLabel: getStatusLabel(r.status),
          source: r.source,
          referralLink: r.referral_link,
          demoScheduledAt: r.demoScheduledAt?.toISOString(),
          enrolledAt: r.enrolledAt?.toISOString(),
          totalFeeAmount: r.totalFeeAmount ? Number(r.totalFeeAmount) : null,
          commissionEarned: r.commissionEarned ? Number(r.commissionEarned) : null,
          createdAt: r.createdAt.toISOString(),
          updatedAt: r.updatedAt.toISOString(),
        })),
        pendingCommissions: pendingCommissions.map((c) => ({
          id: c.id,
          amount: Number(c.amount),
          percentage: Number(c.percentage),
          baseAmount: Number(c.baseAmount),
          status: c.status,
          referral: c.referral,
          createdAt: c.createdAt.toISOString(),
        })),
        recentPaidCommissions: recentPaidCommissions.map((c) => ({
          id: c.id,
          amount: Number(c.amount),
          paidAt: c.paidAt?.toISOString(),
          paymentRef: c.paymentRef,
          referral: c.referral,
        })),
        activeLinks: activeLinks.map((l) => ({
          id: l.id,
          code: l.code,
          name: l.name,
          clickCount: l.clickCount,
          conversionCount: l.conversionCount,
          conversionRate:
            l.clickCount > 0 ? Math.round((l.conversionCount / l.clickCount) * 100) : 0,
          createdAt: l.createdAt.toISOString(),
        })),
        monthlyTrend,
      },
    })
  } catch (error) {
    console.error('Error fetching consultant dashboard:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch dashboard data' },
      { status: 500 }
    )
  }
}

function getStatusLabel(status: string): string {
  switch (status) {
    case 'NEW_LEAD':
      return 'New Lead'
    case 'DEMO_SCHEDULED':
      return 'Demo Scheduled'
    case 'DEMO_COMPLETED':
      return 'Demo Completed'
    case 'OFFER_SENT':
      return 'Offer Sent'
    case 'PAYMENT_PENDING':
      return 'Payment Pending'
    case 'ENROLLED':
      return 'Enrolled'
    case 'LOST':
      return 'Lost'
    default:
      return status
  }
}

interface MonthlyData {
  month: string
  year: number
  newLeads: number
  enrolled: number
  lost: number
  commission: number
}

async function calculateMonthlyTrend(consultantId: string): Promise<MonthlyData[]> {
  const trend: MonthlyData[] = []
  const now = new Date()

  for (let i = 5; i >= 0; i--) {
    const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0, 23, 59, 59, 999)

    // New leads in this month
    const newLeads = await prisma.referrals.count({
      where: {
        consultantId,
        createdAt: { gte: monthStart, lte: monthEnd },
      },
    })

    // Enrolled in this month
    const enrolled = await prisma.referrals.count({
      where: {
        consultantId,
        status: 'ENROLLED',
        enrolledAt: { gte: monthStart, lte: monthEnd },
      },
    })

    // Lost in this month
    const lost = await prisma.referrals.count({
      where: {
        consultantId,
        status: 'LOST',
        lostAt: { gte: monthStart, lte: monthEnd },
      },
    })

    // Commission earned this month
    const commissions = await prisma.commissions.aggregate({
      where: {
        consultantId,
        status: 'PAID',
        paidAt: { gte: monthStart, lte: monthEnd },
      },
      _sum: { amount: true },
    })

    const monthName = monthStart.toLocaleString('en-US', { month: 'short' })

    trend.push({
      month: monthName,
      year: monthStart.getFullYear(),
      newLeads,
      enrolled,
      lost,
      commission: commissions._sum.amount ? Number(commissions._sum.amount) : 0,
    })
  }

  return trend
}
