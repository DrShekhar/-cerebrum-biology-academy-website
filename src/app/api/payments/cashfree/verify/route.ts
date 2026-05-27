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

    const { orderId } = await request.json()
    if (!orderId) {
      return NextResponse.json({ success: false, error: 'orderId is required' }, { status: 400 })
    }

    const payment = await prisma.payments.findFirst({
      where: { cashfreeOrderId: orderId, userId: session.user.id },
      include: { enrollments: true },
    })

    if (!payment) {
      return NextResponse.json({ success: false, error: 'Payment not found' }, { status: 404 })
    }

    if (payment.status === 'COMPLETED') {
      return NextResponse.json({
        success: true,
        status: 'COMPLETED',
        message: 'Payment already verified',
      })
    }

    const cfOrder = await CashfreeService.getOrderStatus(orderId)

    if (cfOrder.order_status === 'PAID') {
      const payments = await CashfreeService.getPaymentsForOrder(orderId)
      const successPayment = payments.find((p) => p.payment_status === 'SUCCESS')

      const paymentMethod = successPayment
        ? CashfreeService.mapPaymentMethod(successPayment)
        : 'CASHFREE_UPI'

      await prisma.$transaction(async (tx) => {
        await tx.payments.update({
          where: { id: payment.id },
          data: {
            status: 'COMPLETED',
            paymentMethod,
            cashfreePaymentId: successPayment
              ? String(successPayment.cf_payment_id)
              : null,
            completedAt: new Date(),
            updatedAt: new Date(),
          },
        })

        if (payment.enrollmentId) {
          await tx.enrollments.update({
            where: { id: payment.enrollmentId },
            data: {
              status: 'ACTIVE',
              paidAmount: { increment: payment.amount },
              pendingAmount: { decrement: payment.amount },
              startDate: new Date(),
              updatedAt: new Date(),
            },
          })
        }
      })

      return NextResponse.json({
        success: true,
        status: 'COMPLETED',
        message: 'Payment verified and enrollment activated',
      })
    }

    if (cfOrder.order_status === 'ACTIVE') {
      return NextResponse.json({
        success: true,
        status: 'PENDING',
        message: 'Payment is still being processed',
      })
    }

    await prisma.payments.update({
      where: { id: payment.id },
      data: {
        status: 'FAILED',
        failureReason: `Order status: ${cfOrder.order_status}`,
        updatedAt: new Date(),
      },
    })

    return NextResponse.json({
      success: false,
      status: 'FAILED',
      message: `Payment ${cfOrder.order_status.toLowerCase()}`,
    })
  } catch (error) {
    console.error('Cashfree verify error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to verify payment' },
      { status: 500 }
    )
  }
}
