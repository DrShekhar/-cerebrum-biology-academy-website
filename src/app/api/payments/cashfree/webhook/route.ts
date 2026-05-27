import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { CashfreeService } from '@/lib/payments/cashfreeService'

export async function POST(request: NextRequest) {
  try {
    const signature = request.headers.get('x-webhook-signature') || ''
    const timestamp = request.headers.get('x-webhook-timestamp') || ''
    const rawBody = await request.text()

    const isValid = CashfreeService.verifyWebhookSignature(signature, rawBody, timestamp)
    if (!isValid) {
      console.error('Cashfree webhook: invalid signature')
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    const event = JSON.parse(rawBody)
    const eventType: string = event.type || ''
    const orderData = event.data?.order
    const paymentData = event.data?.payment

    if (!orderData?.order_id) {
      return NextResponse.json({ status: 'ok', message: 'No order_id, skipping' })
    }

    const orderId = orderData.order_id as string

    const payment = await prisma.payments.findFirst({
      where: { cashfreeOrderId: orderId },
      include: { enrollments: true },
    })

    if (!payment) {
      console.warn(`Cashfree webhook: no payment found for order ${orderId}`)
      return NextResponse.json({ status: 'ok', message: 'Payment record not found' })
    }

    if (payment.status === 'COMPLETED' && eventType === 'PAYMENT_SUCCESS_WEBHOOK') {
      return NextResponse.json({ status: 'ok', message: 'Already processed' })
    }

    if (eventType === 'PAYMENT_SUCCESS_WEBHOOK') {
      const cfPaymentId = paymentData?.cf_payment_id
        ? String(paymentData.cf_payment_id)
        : null

      let paymentMethod: string = 'CASHFREE_UPI'
      if (paymentData?.payment_method) {
        const pm = paymentData.payment_method
        if (pm.upi) paymentMethod = 'CASHFREE_UPI'
        else if (pm.card) paymentMethod = 'CASHFREE_CARD'
        else if (pm.netbanking) paymentMethod = 'CASHFREE_NETBANKING'
        else if (pm.emi) paymentMethod = 'CASHFREE_EMI'
        else if (pm.paylater) paymentMethod = 'CASHFREE_PAYLATER'
        else paymentMethod = 'CASHFREE_WALLET'
      }

      await prisma.$transaction(async (tx) => {
        await tx.payments.update({
          where: { id: payment.id },
          data: {
            status: 'COMPLETED',
            paymentMethod: paymentMethod as never,
            cashfreePaymentId: cfPaymentId,
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

      console.log(`Cashfree webhook: payment SUCCESS for order ${orderId}`)
    }

    if (eventType === 'PAYMENT_FAILED_WEBHOOK') {
      const reason =
        paymentData?.error_details?.error_description ||
        paymentData?.payment_message ||
        'Payment failed'

      await prisma.payments.update({
        where: { id: payment.id },
        data: {
          status: 'FAILED',
          failureReason: reason,
          updatedAt: new Date(),
        },
      })

      console.log(`Cashfree webhook: payment FAILED for order ${orderId}: ${reason}`)
    }

    if (eventType === 'REFUND_STATUS_WEBHOOK') {
      const refundData = event.data?.refund
      if (refundData?.refund_status === 'SUCCESS') {
        const refundAmount = Math.round((refundData.refund_amount || 0) * 100)

        await prisma.$transaction(async (tx) => {
          await tx.payments.update({
            where: { id: payment.id },
            data: {
              status: 'REFUNDED',
              refundAmount,
              refundReason: refundData.refund_note || 'Refund processed',
              refundedAt: new Date(),
              updatedAt: new Date(),
            },
          })

          if (payment.enrollmentId) {
            await tx.enrollments.update({
              where: { id: payment.enrollmentId },
              data: {
                paidAmount: { decrement: refundAmount },
                pendingAmount: { increment: refundAmount },
                status: 'CANCELLED',
                updatedAt: new Date(),
              },
            })
          }
        })

        console.log(`Cashfree webhook: REFUND for order ${orderId}, amount ${refundAmount}`)
      }
    }

    return NextResponse.json({ status: 'ok' })
  } catch (error) {
    console.error('Cashfree webhook error:', error)
    return NextResponse.json({ status: 'ok' })
  }
}
