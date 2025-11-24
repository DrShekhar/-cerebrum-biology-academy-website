/**
 * Student Payments API Route
 * GET /api/student/payments - Fetch all payments for logged-in student
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { PaymentHistoryResponse, PaymentSummary, PaymentStats } from '@/types/payment'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Please log in.' },
        { status: 401 }
      )
    }

    const userId = session.user.id
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || 'ALL'
    const dateFrom = searchParams.get('dateFrom')
    const dateTo = searchParams.get('dateTo')
    const searchQuery = searchParams.get('search') || ''
    const paymentMethod = searchParams.get('paymentMethod') || 'ALL'

    // Fetch enrollment-based payments
    const enrollmentPayments = await prisma.payments.findMany({
      where: {
        userId,
        ...(status !== 'ALL' && { status: status as any }),
        ...(paymentMethod !== 'ALL' && { paymentMethod: paymentMethod as any }),
        ...(dateFrom && {
          createdAt: {
            gte: new Date(dateFrom),
          },
        }),
        ...(dateTo && {
          createdAt: {
            lte: new Date(dateTo),
          },
        }),
      },
      include: {
        enrollments: {
          include: {
            courses: {
              select: {
                name: true,
                type: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    // Fetch fee plan based payments through leads
    const feePayments = await prisma.fee_payments.findMany({
      where: {
        fee_plans: {
          leads: {
            email: session.user.email,
          },
        },
        ...(status !== 'ALL' &&
          status !== 'PROCESSING' && {
            status:
              status === 'COMPLETED' ? 'COMPLETED' : status === 'PENDING' ? 'PENDING' : status,
          }),
      },
      include: {
        fee_plans: {
          select: {
            id: true,
            courseName: true,
            totalFee: true,
            amountPaid: true,
            amountDue: true,
            planType: true,
            status: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    // Fetch all installments for the user
    const installments = await prisma.installments.findMany({
      where: {
        fee_plans: {
          leads: {
            email: session.user.email,
          },
        },
      },
      include: {
        fee_plans: {
          select: {
            id: true,
            courseName: true,
            totalFee: true,
          },
        },
      },
      orderBy: {
        dueDate: 'asc',
      },
    })

    // Apply search filter if provided
    let filteredEnrollmentPayments = enrollmentPayments
    let filteredFeePayments = feePayments

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filteredEnrollmentPayments = enrollmentPayments.filter(
        (p) =>
          p.transactionId?.toLowerCase().includes(query) ||
          p.razorpayPaymentId?.toLowerCase().includes(query) ||
          p.enrollments?.courses?.name.toLowerCase().includes(query)
      )
      filteredFeePayments = feePayments.filter(
        (p) =>
          p.razorpayPaymentId?.toLowerCase().includes(query) ||
          p.fee_plans?.courseName.toLowerCase().includes(query)
      )
    }

    // Calculate summary
    const allPayments = [...filteredEnrollmentPayments, ...filteredFeePayments]
    const completedPayments = allPayments.filter(
      (p) => p.status === 'COMPLETED' || p.status === 'PAID'
    )
    const pendingPayments = allPayments.filter((p) => p.status === 'PENDING')
    const overdueInstallments = installments.filter(
      (i) => i.status === 'OVERDUE' || (i.status === 'PENDING' && new Date(i.dueDate) < new Date())
    )

    const totalPaid = completedPayments.reduce((sum, p) => {
      return sum + Number(p.amount)
    }, 0)

    const totalPending = pendingPayments.reduce((sum, p) => {
      return sum + Number(p.amount)
    }, 0)

    const totalOverdue = overdueInstallments.reduce((sum, i) => {
      return sum + Number(i.amount)
    }, 0)

    const nextPaymentDue = installments.find(
      (i) => i.status === 'PENDING' && new Date(i.dueDate) >= new Date()
    )

    const summary: PaymentSummary = {
      totalPaid,
      totalPending,
      totalOverdue,
      completedPayments: completedPayments.length,
      pendingPayments: pendingPayments.length,
      overduePayments: overdueInstallments.length,
      nextPaymentDue: nextPaymentDue || null,
      recentPayments: allPayments.slice(0, 5),
    }

    // Calculate stats
    const stats: PaymentStats = {
      totalAmount: totalPaid + totalPending,
      totalPaid,
      totalPending,
      averagePayment: completedPayments.length > 0 ? totalPaid / completedPayments.length : 0,
      paymentCount: completedPayments.length,
      lastPaymentDate:
        completedPayments.length > 0
          ? completedPayments[0].createdAt || completedPayments[0].paidAt
          : null,
    }

    const response: PaymentHistoryResponse = {
      success: true,
      data: {
        payments: allPayments,
        installments,
        summary,
        stats,
      },
    }

    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    console.error('Error fetching student payments:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch payment history. Please try again.',
      },
      { status: 500 }
    )
  }
}
