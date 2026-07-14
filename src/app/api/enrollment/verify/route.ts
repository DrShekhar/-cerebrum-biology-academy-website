import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { notifyAdminFormSubmission } from '@/lib/notifications/adminLeadNotification'
import { formatPaiseToINR } from '@/lib/utils'
import { mapCourseToTier } from '@/lib/payments/tierMapping'
import { fetchOrderTier } from '@/lib/payments/razorpayOrder'

function verifyPaymentSignature(orderId: string, paymentId: string, signature: string): boolean {
  const secret = process.env.RAZORPAY_KEY_SECRET
  // SECURITY: fail CLOSED when the secret is unset. Previously this fell back to
  // '' — an HMAC keyed on '' is deterministic and computable by anyone, so a
  // forged signature would verify and activate any enrollment for free.
  if (!secret) {
    console.error('RAZORPAY_KEY_SECRET not configured — rejecting enrollment verification')
    return false
  }
  const generatedSignature = crypto
    .createHmac('sha256', secret)
    .update(`${orderId}|${paymentId}`)
    .digest('hex')

  // Timing-safe compare (equal-length hex buffers).
  const a = Buffer.from(generatedSignature, 'hex')
  const b = Buffer.from(signature, 'hex')
  return a.length === b.length && crypto.timingSafeEqual(a, b)
}

export async function POST(request: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, enrollmentId } =
      await request.json()

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: 'Missing payment verification parameters' },
        { status: 400 }
      )
    }

    const isValid = verifyPaymentSignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    )

    if (!isValid) {
      console.error('Payment signature verification failed:', {
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
      })

      return NextResponse.json(
        { error: 'Payment verification failed', verified: false },
        { status: 400 }
      )
    }

    // Find the payment record
    const payment = await prisma.payments.findFirst({
      where: { razorpayOrderId: razorpay_order_id },
      include: {
        enrollments: {
          include: {
            users: true,
            courses: true,
          },
        },
        users: true,
      },
    })

    if (!payment) {
      return NextResponse.json({ error: 'Payment record not found' }, { status: 404 })
    }

    // Idempotency: if this payment was already verified, don't re-increment the
    // enrollment's paid/pending amounts on a replayed request.
    if (payment.status === 'COMPLETED') {
      return NextResponse.json({
        success: true,
        verified: true,
        alreadyProcessed: true,
        enrollmentId: payment.enrollmentId,
      })
    }

    // Update payment status
    const updatedPayment = await prisma.payments.update({
      where: { id: payment.id },
      data: {
        status: 'COMPLETED',
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        completedAt: new Date(),
        updatedAt: new Date(),
      },
    })

    // Update enrollment status to ACTIVE and update paid amounts
    let updatedEnrollment = null
    if (payment.enrollments) {
      const newPaidAmount = payment.enrollments.paidAmount + payment.amount
      const newPendingAmount = payment.enrollments.totalFees - newPaidAmount

      updatedEnrollment = await prisma.enrollments.update({
        where: { id: payment.enrollments.id },
        data: {
          status: 'ACTIVE',
          paidAmount: newPaidAmount,
          pendingAmount: newPendingAmount,
          startDate: new Date(),
          updatedAt: new Date(),
        },
        include: {
          users: true,
          courses: true,
        },
      })

      // Set the coaching tier on activation. This is the route the checkout
      // success handler calls, so without it a student's tier depended entirely
      // on the async webhook firing. Prefer the student-selected tier from the
      // order notes; fall back to the (paise-correct) fee heuristic.
      const orderTier = await fetchOrderTier(razorpay_order_id)
      const tier = mapCourseToTier(
        payment.enrollments.courseId,
        payment.enrollments.totalFees,
        orderTier
      )
      await prisma.users.update({
        where: { id: payment.userId },
        data: { coachingTier: tier },
      })
    }

    notifyAdminFormSubmission('💰 Enrollment Payment Verified', {
      Student: updatedEnrollment?.users?.name || payment.users?.name || '-',
      Course: updatedEnrollment?.courses?.name || '-',
      'Amount Paid': formatPaiseToINR(payment.amount),
      'Payment ID': razorpay_payment_id,
      Status: 'ACTIVE',
      'Total Paid': updatedEnrollment ? formatPaiseToINR(updatedEnrollment.paidAmount) : '-',
      Pending: updatedEnrollment ? formatPaiseToINR(updatedEnrollment.pendingAmount) : '-',
    }).catch(() => {})

    return NextResponse.json({
      success: true,
      verified: true,
      message: 'Payment verified and enrollment activated successfully',
      payment: {
        id: updatedPayment.id,
        amount: updatedPayment.amount,
        status: updatedPayment.status,
      },
      enrollment: updatedEnrollment
        ? {
            id: updatedEnrollment.id,
            status: updatedEnrollment.status,
            paidAmount: updatedEnrollment.paidAmount,
            pendingAmount: updatedEnrollment.pendingAmount,
            studentName: updatedEnrollment.users?.name,
            courseName: updatedEnrollment.courses?.name,
          }
        : null,
    })
  } catch (error) {
    console.error('Enrollment payment verification error:', error)
    return NextResponse.json(
      {
        error: 'Payment verification failed',
        verified: false,
        details: error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // SECURITY: this returns student PII (name/email/phone) + payment history.
    // Require a session and restrict to the enrollment's owner (or an admin) —
    // previously any caller could read any enrollment by id.
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const enrollmentId = searchParams.get('enrollmentId')

    if (!enrollmentId) {
      return NextResponse.json({ error: 'Enrollment ID required' }, { status: 400 })
    }

    const enrollment = await prisma.enrollments.findUnique({
      where: { id: enrollmentId },
      include: {
        users: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
        courses: {
          select: {
            id: true,
            name: true,
            type: true,
            class: true,
          },
        },
        payments: {
          select: {
            id: true,
            amount: true,
            status: true,
            completedAt: true,
            installmentNumber: true,
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    })

    if (!enrollment) {
      return NextResponse.json({ error: 'Enrollment not found' }, { status: 404 })
    }

    // Owner or admin only.
    if (enrollment.userId !== session.user.id && session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    return NextResponse.json({
      success: true,
      enrollment: {
        id: enrollment.id,
        status: enrollment.status,
        totalFees: enrollment.totalFees,
        paidAmount: enrollment.paidAmount,
        pendingAmount: enrollment.pendingAmount,
        paymentPlan: enrollment.paymentPlan,
        startDate: enrollment.startDate,
        student: enrollment.users,
        course: enrollment.courses,
        payments: enrollment.payments,
      },
    })
  } catch (error) {
    console.error('Enrollment fetch error:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch enrollment',
        details: error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    )
  }
}
