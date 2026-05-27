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
    const { amount, currency, enrollmentId, studentName, email, phone, notes } = body

    if (!amount || amount <= 0) {
      return NextResponse.json({ success: false, error: 'Invalid amount' }, { status: 400 })
    }
    if (!email || !phone) {
      return NextResponse.json(
        { success: false, error: 'Email and phone are required' },
        { status: 400 }
      )
    }

    const orderId = `order_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`

    const cfOrder = await CashfreeService.createOrder({
      orderId,
      amount,
      currency: currency || 'INR',
      customerName: studentName || session.user.name || 'Student',
      customerEmail: email,
      customerPhone: phone,
      notes: {
        purpose: 'Course enrollment',
        platform: 'Cerebrum Biology Academy',
        userId: session.user.id,
        enrollmentId: enrollmentId || '',
        ...notes,
      },
    })

    const paymentId = `pay_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`

    await prisma.payments.create({
      data: {
        id: paymentId,
        userId: session.user.id,
        enrollmentId: enrollmentId || null,
        amount: Math.round(amount * 100),
        currency: currency || 'INR',
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
      amount,
      currency: currency || 'INR',
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
