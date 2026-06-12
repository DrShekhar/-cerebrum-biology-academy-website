/**
 * Student Upcoming Payments API Route
 * GET /api/student/payments/upcoming - Fetch upcoming and overdue installments
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { UpcomingPaymentsResponse, PaymentInstallment } from '@/types/payment'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Please log in.' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const daysAhead = parseInt(searchParams.get('daysAhead') || '30', 10)

    const now = new Date()
    const futureDate = new Date()
    futureDate.setDate(now.getDate() + daysAhead)

    // Fetch upcoming installments
    const upcomingInstallments = await prisma.installments.findMany({
      where: {
        fee_plans: {
          leads: {
            email: session.user.email,
          },
        },
        status: 'PENDING',
        dueDate: {
          gte: now,
          lte: futureDate,
        },
      },
      include: {
        fee_plans: {
          select: {
            id: true,
            courseName: true,
            totalFee: true,
            amountPaid: true,
            amountDue: true,
          },
        },
      },
      orderBy: {
        dueDate: 'asc',
      },
    })

    // Fetch overdue installments
    const overdueInstallments = await prisma.installments.findMany({
      where: {
        fee_plans: {
          leads: {
            email: session.user.email,
          },
        },
        OR: [
          { status: 'OVERDUE' },
          {
            status: 'PENDING',
            dueDate: {
              lt: now,
            },
          },
        ],
      },
      include: {
        fee_plans: {
          select: {
            id: true,
            courseName: true,
            totalFee: true,
            amountPaid: true,
            amountDue: true,
          },
        },
      },
      orderBy: {
        dueDate: 'asc',
      },
    })

    // Normalize raw Prisma rows into PaymentInstallment shape
    // (relation key remapped, Decimal amounts wrapped in Number()).
    const normalizeInstallment = (i: (typeof upcomingInstallments)[number]): PaymentInstallment => {
      const { fee_plans, ...rest } = i
      return {
        ...rest,
        amount: Number(i.amount),
        paidAmount: i.paidAmount !== null ? Number(i.paidAmount) : null,
        feePlan: fee_plans
          ? {
              id: fee_plans.id,
              courseName: fee_plans.courseName,
              totalFee: Number(fee_plans.totalFee),
            }
          : undefined,
      }
    }

    const normalizedUpcoming = upcomingInstallments.map(normalizeInstallment)
    const normalizedOverdue = overdueInstallments.map(normalizeInstallment)

    // Get the next payment (earliest upcoming or overdue)
    const allPendingInstallments = [...normalizedOverdue, ...normalizedUpcoming]
    const nextPayment = allPendingInstallments.length > 0 ? allPendingInstallments[0] : null

    const response: UpcomingPaymentsResponse = {
      success: true,
      data: {
        upcoming: normalizedUpcoming,
        overdue: normalizedOverdue,
        nextPayment,
      },
    }

    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    console.error('Error fetching upcoming payments:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch upcoming payments. Please try again.',
      },
      { status: 500 }
    )
  }
}
