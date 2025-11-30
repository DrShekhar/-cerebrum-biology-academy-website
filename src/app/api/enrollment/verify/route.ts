import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { prisma } from '@/lib/prisma'

function verifyPaymentSignature(orderId: string, paymentId: string, signature: string): boolean {
  const secret = process.env.RAZORPAY_KEY_SECRET || ''
  const generatedSignature = crypto
    .createHmac('sha256', secret)
    .update(`${orderId}|${paymentId}`)
    .digest('hex')

  return generatedSignature === signature
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
    }

    console.log('Enrollment payment verified:', {
      paymentId: payment.id,
      enrollmentId: payment.enrollmentId,
      userId: payment.userId,
      orderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      amount: payment.amount,
      timestamp: new Date().toISOString(),
    })

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
