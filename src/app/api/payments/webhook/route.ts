import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('x-razorpay-signature')

    if (!signature) {
      console.error('Webhook: Missing signature')
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
    }

    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET

    if (!webhookSecret) {
      console.error('Webhook: RAZORPAY_WEBHOOK_SECRET not configured')
      return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 })
    }

    const expectedSignature = crypto.createHmac('sha256', webhookSecret).update(body).digest('hex')

    if (expectedSignature !== signature) {
      console.error('Webhook: Invalid signature')
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const event = JSON.parse(body)
    const eventType = event.event

    console.log('Webhook received:', eventType, event.payload?.payment?.entity?.id)

    switch (eventType) {
      case 'payment.authorized':
      case 'payment.captured':
        await handlePaymentSuccess(event)
        break

      case 'payment.failed':
        await handlePaymentFailed(event)
        break

      case 'order.paid':
        await handleOrderPaid(event)
        break

      case 'refund.created':
        await handleRefundCreated(event)
        break

      default:
        console.log('Webhook: Unhandled event type:', eventType)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}

async function handlePaymentSuccess(event: any) {
  const payment = event.payload.payment.entity
  const orderId = payment.order_id
  const paymentId = payment.id

  try {
    await prisma.$transaction(async (tx) => {
      const paymentRecord = await tx.payment.findFirst({
        where: { razorpayOrderId: orderId },
        include: {
          enrollment: {
            include: {
              course: true,
            },
          },
        },
      })

      if (!paymentRecord) {
        console.error('Webhook: Payment record not found for order:', orderId)
        return
      }

      if (paymentRecord.status === 'COMPLETED') {
        console.log('Webhook: Payment already completed:', orderId)
        return
      }

      await tx.payment.updateMany({
        where: { razorpayOrderId: orderId },
        data: {
          razorpayPaymentId: paymentId,
          status: 'COMPLETED',
          completedAt: new Date(),
        },
      })

      if (paymentRecord.enrollmentId && paymentRecord.enrollment) {
        await tx.enrollment.update({
          where: { id: paymentRecord.enrollmentId },
          data: {
            status: 'ACTIVE',
            paidAmount: { increment: paymentRecord.amount },
            pendingAmount: { decrement: paymentRecord.amount },
            startDate: new Date(),
          },
        })

        const courseMaterials = await tx.studyMaterial.findMany({
          where: {
            courseId: paymentRecord.enrollment.courseId,
            isPublished: true,
          },
          select: { id: true },
        })

        if (courseMaterials.length > 0) {
          const materialAccessRecords = courseMaterials.map((material) => ({
            materialId: material.id,
            userId: paymentRecord.userId,
            grantedBy: 'system',
            grantedAt: new Date(),
            reason: 'Webhook: Payment completed',
          }))

          await tx.materialAccess.createMany({
            data: materialAccessRecords,
            skipDuplicates: true,
          })
        }

        console.log('Webhook: Enrollment activated:', paymentRecord.enrollmentId)
      }
    })

    console.log('Webhook: Payment success handled:', paymentId)
  } catch (error) {
    console.error('Webhook: Error handling payment success:', error)
    throw error
  }
}

async function handlePaymentFailed(event: any) {
  const payment = event.payload.payment.entity
  const orderId = payment.order_id
  const reason = payment.error_description || 'Payment failed'

  try {
    await prisma.payment.updateMany({
      where: { razorpayOrderId: orderId },
      data: {
        status: 'FAILED',
        failureReason: reason,
      },
    })

    console.log('Webhook: Payment failure recorded:', orderId, reason)
  } catch (error) {
    console.error('Webhook: Error handling payment failure:', error)
    throw error
  }
}

async function handleOrderPaid(event: any) {
  const order = event.payload.order.entity
  const orderId = order.id

  console.log('Webhook: Order paid:', orderId)
}

async function handleRefundCreated(event: any) {
  const refund = event.payload.refund.entity
  const paymentId = refund.payment_id
  const refundAmount = refund.amount

  try {
    const payment = await prisma.payment.findFirst({
      where: { razorpayPaymentId: paymentId },
      include: { enrollment: true },
    })

    if (!payment) {
      console.error('Webhook: Payment not found for refund:', paymentId)
      return
    }

    await prisma.$transaction(async (tx) => {
      await tx.payment.update({
        where: { id: payment.id },
        data: {
          status: 'REFUNDED',
          refundAmount: refundAmount,
          refundedAt: new Date(),
        },
      })

      if (payment.enrollmentId) {
        await tx.enrollment.update({
          where: { id: payment.enrollmentId },
          data: {
            status: 'CANCELLED',
            paidAmount: { decrement: refundAmount },
          },
        })
      }
    })

    console.log('Webhook: Refund processed:', refund.id, refundAmount)
  } catch (error) {
    console.error('Webhook: Error handling refund:', error)
    throw error
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Razorpay Webhook Endpoint',
    status: 'active',
  })
}
