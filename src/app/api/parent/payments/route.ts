import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth/config'

export const dynamic = 'force-dynamic'

interface ChildPayment {
  id: string
  childId: string
  childName: string
  courseName: string
  amount: number
  dueDate: string | null
  paidAt: string | null
  status: 'paid' | 'pending' | 'overdue' | 'partial'
  paymentMethod: string | null
  transactionId: string | null
  installmentNumber: number | null
  totalInstallments: number | null
}

interface PaymentSummary {
  totalPaid: number
  totalPending: number
  totalOverdue: number
  nextDueDate: string | null
  nextDueAmount: number | null
  byChild: {
    childId: string
    childName: string
    totalPaid: number
    totalPending: number
    totalOverdue: number
  }[]
}

/**
 * GET /api/parent/payments
 * Fetch payment history and upcoming dues for all children
 *
 * Query params:
 * - childId: Filter by specific child (optional)
 * - status: Filter by status (all, paid, pending, overdue)
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

    const { searchParams } = new URL(request.url)
    const childIdFilter = searchParams.get('childId')
    const statusFilter = searchParams.get('status') || 'all'

    // Verify user is a parent
    const parent = await prisma.users.findUnique({
      where: { id: session.user.id },
      select: { id: true, role: true },
    })

    if (!parent || parent.role !== 'PARENT') {
      return NextResponse.json({ success: false, error: 'Parent access required' }, { status: 403 })
    }

    // Get all children for this parent
    const childRelationships = await prisma.parent_child_relationships.findMany({
      where: {
        parentId: parent.id,
        ...(childIdFilter && { childId: childIdFilter }),
      },
      include: {
        child: {
          select: { id: true, name: true, email: true },
        },
      },
    })

    if (childRelationships.length === 0) {
      return NextResponse.json({
        success: true,
        data: {
          payments: [],
          upcomingDues: [],
          summary: {
            totalPaid: 0,
            totalPending: 0,
            totalOverdue: 0,
            nextDueDate: null,
            nextDueAmount: null,
            byChild: [],
          },
          children: [],
        },
      })
    }

    const childIds = childRelationships.map((r) => r.childId)
    const now = new Date()
    const payments: ChildPayment[] = []

    // Fetch enrollment-based payments
    const enrollments = await prisma.enrollments.findMany({
      where: { studentId: { in: childIds } },
      include: {
        student: { select: { id: true, name: true } },
        courses: { select: { name: true } },
        payments: {
          orderBy: { createdAt: 'desc' },
        },
      },
    })

    enrollments.forEach((enrollment) => {
      enrollment.payments.forEach((payment) => {
        const dueDate = payment.dueDate ? new Date(payment.dueDate) : null
        let status: 'paid' | 'pending' | 'overdue' | 'partial' = 'pending'

        if (payment.status === 'COMPLETED' || payment.status === 'PAID') {
          status = 'paid'
        } else if (payment.status === 'PARTIAL') {
          status = 'partial'
        } else if (dueDate && dueDate < now) {
          status = 'overdue'
        }

        // Apply status filter
        if (statusFilter !== 'all') {
          if (statusFilter === 'paid' && status !== 'paid') return
          if (statusFilter === 'pending' && status !== 'pending') return
          if (statusFilter === 'overdue' && status !== 'overdue') return
        }

        payments.push({
          id: payment.id,
          childId: enrollment.studentId,
          childName: enrollment.student.name,
          courseName: enrollment.courses.name,
          amount: payment.amount,
          dueDate: payment.dueDate?.toISOString() || null,
          paidAt: payment.paidAt?.toISOString() || null,
          status,
          paymentMethod: payment.paymentMethod,
          transactionId: payment.transactionId || payment.razorpayPaymentId,
          installmentNumber: payment.installmentNumber,
          totalInstallments: payment.totalInstallments,
        })
      })
    })

    // Also fetch fee_payments via leads linked to children's emails
    const childEmails = childRelationships.map((r) => r.child.email).filter(Boolean) as string[]

    if (childEmails.length > 0) {
      const feePayments = await prisma.fee_payments.findMany({
        where: {
          fee_plans: {
            leads: {
              email: { in: childEmails },
            },
          },
        },
        include: {
          fee_plans: {
            include: {
              leads: { select: { email: true, name: true } },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      })

      feePayments.forEach((fp) => {
        const childRel = childRelationships.find((r) => r.child.email === fp.fee_plans.leads?.email)
        if (!childRel) return

        const dueDate = fp.dueDate ? new Date(fp.dueDate) : null
        let status: 'paid' | 'pending' | 'overdue' | 'partial' = 'pending'

        if (fp.status === 'COMPLETED' || fp.status === 'PAID') {
          status = 'paid'
        } else if (fp.status === 'PARTIAL') {
          status = 'partial'
        } else if (dueDate && dueDate < now) {
          status = 'overdue'
        }

        // Apply status filter
        if (statusFilter !== 'all') {
          if (statusFilter === 'paid' && status !== 'paid') return
          if (statusFilter === 'pending' && status !== 'pending') return
          if (statusFilter === 'overdue' && status !== 'overdue') return
        }

        payments.push({
          id: fp.id,
          childId: childRel.childId,
          childName: childRel.child.name,
          courseName: fp.fee_plans.courseName,
          amount: fp.amount,
          dueDate: fp.dueDate?.toISOString() || null,
          paidAt: fp.paidAt?.toISOString() || null,
          status,
          paymentMethod: fp.paymentMethod,
          transactionId: fp.razorpayPaymentId,
          installmentNumber: fp.installmentNumber,
          totalInstallments: null,
        })
      })
    }

    // Sort payments: overdue first, then pending, then paid (by date)
    payments.sort((a, b) => {
      const statusOrder = { overdue: 0, pending: 1, partial: 2, paid: 3 }
      const statusDiff = statusOrder[a.status] - statusOrder[b.status]
      if (statusDiff !== 0) return statusDiff

      // For same status, sort by due date (ascending for pending/overdue, descending for paid)
      if (a.status === 'paid') {
        return new Date(b.paidAt || 0).getTime() - new Date(a.paidAt || 0).getTime()
      }
      return new Date(a.dueDate || 0).getTime() - new Date(b.dueDate || 0).getTime()
    })

    // Get upcoming dues (installments not yet paid)
    const upcomingDues: ChildPayment[] = []

    if (childEmails.length > 0) {
      const installments = await prisma.installments.findMany({
        where: {
          status: { in: ['PENDING', 'OVERDUE'] },
          fee_plans: {
            leads: {
              email: { in: childEmails },
            },
          },
        },
        include: {
          fee_plans: {
            include: {
              leads: { select: { email: true, name: true } },
            },
          },
        },
        orderBy: { dueDate: 'asc' },
      })

      installments.forEach((inst) => {
        const childRel = childRelationships.find(
          (r) => r.child.email === inst.fee_plans.leads?.email
        )
        if (!childRel) return

        const dueDate = inst.dueDate ? new Date(inst.dueDate) : null
        const status = dueDate && dueDate < now ? 'overdue' : 'pending'

        upcomingDues.push({
          id: inst.id,
          childId: childRel.childId,
          childName: childRel.child.name,
          courseName: inst.fee_plans.courseName,
          amount: inst.amount,
          dueDate: inst.dueDate?.toISOString() || null,
          paidAt: null,
          status,
          paymentMethod: null,
          transactionId: null,
          installmentNumber: inst.installmentNumber,
          totalInstallments: null,
        })
      })
    }

    // Calculate summary
    const totalPaid = payments
      .filter((p) => p.status === 'paid')
      .reduce((sum, p) => sum + p.amount, 0)
    const totalPending = payments
      .filter((p) => p.status === 'pending')
      .reduce((sum, p) => sum + p.amount, 0)
    const totalOverdue = payments
      .filter((p) => p.status === 'overdue')
      .reduce((sum, p) => sum + p.amount, 0)

    const nextDue = upcomingDues.find((d) => d.status === 'pending')

    const byChild = childRelationships.map((rel) => {
      const childPayments = payments.filter((p) => p.childId === rel.childId)
      return {
        childId: rel.childId,
        childName: rel.child.name,
        totalPaid: childPayments
          .filter((p) => p.status === 'paid')
          .reduce((sum, p) => sum + p.amount, 0),
        totalPending: childPayments
          .filter((p) => p.status === 'pending')
          .reduce((sum, p) => sum + p.amount, 0),
        totalOverdue: childPayments
          .filter((p) => p.status === 'overdue')
          .reduce((sum, p) => sum + p.amount, 0),
      }
    })

    const summary: PaymentSummary = {
      totalPaid,
      totalPending,
      totalOverdue,
      nextDueDate: nextDue?.dueDate || null,
      nextDueAmount: nextDue?.amount || null,
      byChild,
    }

    return NextResponse.json({
      success: true,
      data: {
        payments,
        upcomingDues,
        summary,
        children: childRelationships.map((r) => ({
          id: r.child.id,
          name: r.child.name,
        })),
      },
    })
  } catch (error) {
    console.error('Error fetching parent payments:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch payment data' },
      { status: 500 }
    )
  }
}
