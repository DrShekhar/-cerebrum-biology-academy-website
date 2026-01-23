import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { prisma } from '@/lib/prisma'

// SECURITY: In-memory store for webhook event deduplication (use Redis in production)
const processedEvents = new Map<string, number>()
const EVENT_EXPIRY_MS = 24 * 60 * 60 * 1000 // 24 hours

// Clean up old events periodically
function cleanupProcessedEvents() {
  const now = Date.now()
  for (const [eventId, timestamp] of processedEvents.entries()) {
    if (now - timestamp > EVENT_EXPIRY_MS) {
      processedEvents.delete(eventId)
    }
  }
}

// SECURITY: Timing-safe signature verification
function verifySignature(body: string, signature: string, secret: string): boolean {
  try {
    const expectedSignature = crypto.createHmac('sha256', secret).update(body).digest('hex')

    // Convert to buffers for timing-safe comparison
    const expectedBuffer = Buffer.from(expectedSignature, 'utf8')
    const signatureBuffer = Buffer.from(signature, 'utf8')

    // Check length first (timing-safe comparison requires same length)
    if (expectedBuffer.length !== signatureBuffer.length) {
      return false
    }

    return crypto.timingSafeEqual(expectedBuffer, signatureBuffer)
  } catch {
    return false
  }
}

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

    // SECURITY: Use timing-safe signature verification to prevent timing attacks
    if (!verifySignature(body, signature, webhookSecret)) {
      console.error('Webhook: Invalid signature')
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const event = JSON.parse(body)
    const eventType = event.event
    const eventId = event.payload?.payment?.entity?.id || event.payload?.order?.entity?.id || `${eventType}_${Date.now()}`

    // SECURITY: Replay attack prevention - check if event was already processed
    if (processedEvents.has(eventId)) {
      console.log('Webhook: Duplicate event ignored:', eventId)
      return NextResponse.json({ success: true, message: 'Event already processed' })
    }

    // Mark event as processed
    processedEvents.set(eventId, Date.now())

    // Periodically clean up old events
    if (processedEvents.size > 1000) {
      cleanupProcessedEvents()
    }

    console.log('Webhook received:', eventType, eventId)

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
      const paymentRecord = await tx.payments.findFirst({
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

      await tx.payments.updateMany({
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
    await prisma.payments.updateMany({
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
    const payment = await prisma.payments.findFirst({
      where: { razorpayPaymentId: paymentId },
      include: { enrollment: true },
    })

    if (!payment) {
      console.error('Webhook: Payment not found for refund:', paymentId)
      return
    }

    await prisma.$transaction(async (tx) => {
      await tx.payments.update({
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
