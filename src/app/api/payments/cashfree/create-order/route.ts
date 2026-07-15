import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { CashfreeService } from '@/lib/payments/cashfreeService'

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { enrollmentId, studentName, email, phone, notes } = body

    if (!email || !phone) {
      return NextResponse.json(
        { success: false, error: 'Email and phone are required' },
        { status: 400 }
      )
    }

    // SECURITY: never trust a client-sent amount (that let anyone pay ₹1 for any
    // course). Derive the charge from the enrollment the student actually owns —
    // its outstanding balance in paise. The primary checkout flow uses
    // /api/enrollment/create-order; this route is the standalone fallback and
    // must be just as strict.
    if (!enrollmentId) {
      return NextResponse.json(
        { success: false, error: 'enrollmentId is required' },
        { status: 400 }
      )
    }

    const enrollment = await prisma.enrollments.findUnique({
      where: { id: enrollmentId },
      select: { id: true, userId: true, pendingAmount: true, totalFees: true },
    })

    if (!enrollment || enrollment.userId !== session.user.id) {
      return NextResponse.json({ success: false, error: 'Enrollment not found' }, { status: 404 })
    }

    const amountPaise =
      enrollment.pendingAmount > 0 ? enrollment.pendingAmount : enrollment.totalFees
    if (!amountPaise || amountPaise <= 0) {
      return NextResponse.json(
        { success: false, error: 'Nothing due on this enrollment' },
        { status: 400 }
      )
    }
    const amountRupees = amountPaise / 100

    const orderId = `order_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`

    const cfOrder = await CashfreeService.createOrder({
      orderId,
      amount: amountRupees,
      currency: 'INR',
      customerName: studentName || session.user.name || 'Student',
      customerEmail: email,
      customerPhone: phone,
      notes: {
        purpose: 'Course enrollment',
        platform: 'Cerebrum Biology Academy',
        userId: session.user.id,
        enrollmentId,
        ...notes,
      },
    })

    const paymentId = `pay_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`

    await prisma.payments.create({
      data: {
        id: paymentId,
        userId: session.user.id,
        enrollmentId,
        amount: amountPaise,
        currency: 'INR',
        status: 'PENDING',
        paymentMethod: 'CASHFREE_UPI',
        paymentProvider: 'cashfree',
        cashfreeOrderId: cfOrder.order_id,
        updatedAt: new Date(),
      },
    })

    return NextResponse.json({
      success: true,
      orderId: cfOrder.order_id,
      paymentSessionId: cfOrder.payment_session_id,
      cfOrderId: cfOrder.cf_order_id,
      amount: amountPaise,
      currency: 'INR',
      environment: process.env.NODE_ENV === 'production' ? 'production' : 'sandbox',
    })
  } catch (error) {
    console.error('Cashfree create-order error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create payment order' },
      { status: 500 }
    )
  }
}
