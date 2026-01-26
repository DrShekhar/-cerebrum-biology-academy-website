import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth/config'

export const dynamic = 'force-dynamic'

/**
 * GET /api/consultant/commissions
 * Fetch all commissions for the authenticated consultant
 *
 * Query params:
 * - status: Filter by status (all, pending, paid, cancelled)
 * - dateFrom: Filter by date range start (ISO date)
 * - dateTo: Filter by date range end (ISO date)
 * - sortBy: Sort field (createdAt, amount, paidAt)
 * - sortOrder: asc or desc
 * - limit: Number of results (default 20)
 * - offset: Pagination offset (default 0)
 */
export async function GET(request: NextRequest) {
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
    })

    if (!consultant) {
      return NextResponse.json(
        { success: false, error: 'Consultant profile not found' },
        { status: 403 }
      )
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || 'all'
    const dateFrom = searchParams.get('dateFrom')
    const dateTo = searchParams.get('dateTo')
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const sortOrder = searchParams.get('sortOrder') || 'desc'
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100)
    const offset = parseInt(searchParams.get('offset') || '0')

    // Build where clause
    const where: Record<string, unknown> = { consultantId: consultant.id }

    // Status filter
    if (status !== 'all') {
      where.status = status.toUpperCase()
    }

    // Date range filter
    if (dateFrom || dateTo) {
      where.createdAt = {}
      if (dateFrom) {
        ;(where.createdAt as Record<string, Date>).gte = new Date(dateFrom)
      }
      if (dateTo) {
        const endDate = new Date(dateTo)
        endDate.setHours(23, 59, 59, 999)
        ;(where.createdAt as Record<string, Date>).lte = endDate
      }
    }

    // Get total count
    const total = await prisma.commissions.count({ where })

    // Get commissions with sorting
    const commissions = await prisma.commissions.findMany({
      where,
      orderBy: { [sortBy]: sortOrder },
      skip: offset,
      take: limit,
      include: {
        referral: {
          select: {
            id: true,
            studentName: true,
            phone: true,
            courseInterest: true,
            status: true,
            enrolledAt: true,
          },
        },
      },
    })

    // Calculate summary statistics
    const summaryStats = await prisma.commissions.groupBy({
      by: ['status'],
      where: { consultantId: consultant.id },
      _sum: { amount: true },
      _count: { id: true },
    })

    const summary = {
      totalEarned: 0,
      totalPending: 0,
      totalPaid: 0,
      totalCancelled: 0,
      countPending: 0,
      countPaid: 0,
      countCancelled: 0,
    }

    summaryStats.forEach((stat) => {
      const amount = stat._sum.amount ? Number(stat._sum.amount) : 0
      summary.totalEarned += amount

      switch (stat.status) {
        case 'PENDING':
          summary.totalPending = amount
          summary.countPending = stat._count.id
          break
        case 'PAID':
          summary.totalPaid = amount
          summary.countPaid = stat._count.id
          break
        case 'CANCELLED':
          summary.totalCancelled = amount
          summary.countCancelled = stat._count.id
          break
      }
    })

    // Adjust totalEarned to exclude cancelled
    summary.totalEarned = summary.totalPending + summary.totalPaid

    // Get monthly breakdown for the last 6 months
    const monthlyBreakdown = await calculateMonthlyBreakdown(consultant.id)

    // Transform data
    const commissionList = commissions.map((c) => ({
      id: c.id,
      amount: Number(c.amount),
      percentage: Number(c.percentage),
      baseAmount: Number(c.baseAmount),
      status: c.status,
      statusLabel: getStatusLabel(c.status),
      paidAt: c.paidAt?.toISOString(),
      paymentRef: c.paymentRef,
      referral: c.referral
        ? {
            id: c.referral.id,
            studentName: c.referral.studentName,
            phone: c.referral.phone,
            courseInterest: c.referral.courseInterest,
            status: c.referral.status,
            enrolledAt: c.referral.enrolledAt?.toISOString(),
          }
        : null,
      createdAt: c.createdAt.toISOString(),
      updatedAt: c.updatedAt.toISOString(),
    }))

    // Get status counts for filters
    const statusCounts = await prisma.commissions.groupBy({
      by: ['status'],
      where: { consultantId: consultant.id },
      _count: { id: true },
    })

    const counts: Record<string, number> = { all: total }
    statusCounts.forEach((stat) => {
      counts[stat.status.toLowerCase()] = stat._count.id
    })

    return NextResponse.json({
      success: true,
      data: {
        commissions: commissionList,
        summary,
        monthlyBreakdown,
        statusCounts: counts,
        pagination: {
          total,
          limit,
          offset,
          hasMore: offset + commissionList.length < total,
        },
      },
    })
  } catch (error) {
    console.error('Error fetching commissions:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch commissions' },
      { status: 500 }
    )
  }
}

function getStatusLabel(status: string): string {
  switch (status) {
    case 'PENDING':
      return 'Pending'
    case 'PAID':
      return 'Paid'
    case 'CANCELLED':
      return 'Cancelled'
    default:
      return status
  }
}

interface MonthlyData {
  month: string
  year: number
  earned: number
  paid: number
  pending: number
  count: number
}

async function calculateMonthlyBreakdown(consultantId: string): Promise<MonthlyData[]> {
  const breakdown: MonthlyData[] = []
  const now = new Date()

  for (let i = 5; i >= 0; i--) {
    const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0, 23, 59, 59, 999)

    // Commissions created this month
    const monthCommissions = await prisma.commissions.aggregate({
      where: {
        consultantId,
        createdAt: { gte: monthStart, lte: monthEnd },
        status: { in: ['PENDING', 'PAID'] },
      },
      _sum: { amount: true },
      _count: { id: true },
    })

    // Commissions paid this month
    const paidThisMonth = await prisma.commissions.aggregate({
      where: {
        consultantId,
        status: 'PAID',
        paidAt: { gte: monthStart, lte: monthEnd },
      },
      _sum: { amount: true },
    })

    // Pending commissions as of this month
    const pendingThisMonth = await prisma.commissions.aggregate({
      where: {
        consultantId,
        status: 'PENDING',
        createdAt: { lte: monthEnd },
      },
      _sum: { amount: true },
    })

    const monthName = monthStart.toLocaleString('en-US', { month: 'short' })

    breakdown.push({
      month: monthName,
      year: monthStart.getFullYear(),
      earned: monthCommissions._sum.amount ? Number(monthCommissions._sum.amount) : 0,
      paid: paidThisMonth._sum.amount ? Number(paidThisMonth._sum.amount) : 0,
      pending: pendingThisMonth._sum.amount ? Number(pendingThisMonth._sum.amount) : 0,
      count: monthCommissions._count.id,
    })
  }

  return breakdown
}
