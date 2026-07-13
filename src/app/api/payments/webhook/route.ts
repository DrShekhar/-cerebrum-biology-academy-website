import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { prisma } from '@/lib/prisma'
import { Redis } from '@upstash/redis'
import { mapCourseToTier } from '@/lib/payments/tierMapping'
import { fetchOrderTier } from '@/lib/payments/razorpayOrder'
import { logger } from '@/lib/logger'
import { inngest } from '@/inngest/client'

// SECURITY: Redis-backed webhook event deduplication for multi-instance deployments
const EVENT_EXPIRY_SECONDS = 24 * 60 * 60 // 24 hours

// Create Upstash Redis client for distributed deduplication
const upstashRedis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: (process.env.UPSTASH_REDIS_REST_URL || '').trim(),
        token: (process.env.UPSTASH_REDIS_REST_TOKEN || '').trim(),
      })
    : null

// Fallback in-memory store (only for development without Redis)
const processedEventsFallback = new Map<string, number>()

// Check if event was already processed (idempotency check)
async function isEventProcessed(eventId: string): Promise<boolean> {
  if (upstashRedis) {
    try {
      const exists = await upstashRedis.exists(`webhook:payment:${eventId}`)
      return exists === 1
    } catch (error) {
      logger.error('Redis event check error:', error)
      // Fall through to in-memory
    }
  }
  return processedEventsFallback.has(eventId)
}

// Mark event as processed
async function markEventProcessed(eventId: string): Promise<void> {
  if (upstashRedis) {
    try {
      await upstashRedis.set(`webhook:payment:${eventId}`, Date.now(), {
        ex: EVENT_EXPIRY_SECONDS,
      })
      return
    } catch (error) {
      logger.error('Redis event mark error:', error)
      // Fall through to in-memory
    }
  }
  processedEventsFallback.set(eventId, Date.now())

  // Clean up old entries in fallback
  if (processedEventsFallback.size > 1000) {
    const now = Date.now()
    for (const [id, timestamp] of processedEventsFallback.entries()) {
      if (now - timestamp > EVENT_EXPIRY_SECONDS * 1000) {
        processedEventsFallback.delete(id)
      }
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
      logger.error('Webhook: Missing signature')
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
    }

    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET

    if (!webhookSecret) {
      logger.error('Webhook: RAZORPAY_WEBHOOK_SECRET not configured')
      return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 })
    }

    // SECURITY: Use timing-safe signature verification to prevent timing attacks
    if (!verifySignature(body, signature, webhookSecret)) {
      logger.error('Webhook: Invalid signature')
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let event: any
    try {
      event = JSON.parse(body)
    } catch {
      logger.error('Webhook: Malformed JSON body')
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }
    const eventType = event.event
    const eventId =
      event.payload?.payment?.entity?.id ||
      event.payload?.order?.entity?.id ||
      `${eventType}_${Date.now()}`

    // SECURITY: Replay attack prevention - check if event was already processed (Redis-backed)
    if (await isEventProcessed(eventId)) {
      logger.info('Webhook: Duplicate event ignored:', eventId)
      return NextResponse.json({ success: true, message: 'Event already processed' })
    }

    logger.info(`Webhook received: ${eventType} ${eventId}`)

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

      case 'payment_link.paid':
      case 'payment_link.partially_paid':
        await handlePaymentLinkPaid(event)
        break

      case 'payment_link.cancelled':
      case 'payment_link.expired':
        await handlePaymentLinkClosed(event, eventType)
        break

      default:
        logger.info('Webhook: Unhandled event type:', eventType)
    }

    // Mark processed only AFTER successful handling — if a handler throws, the
    // event stays unmarked so Razorpay's retry can reprocess it. Handlers are
    // idempotent (they no-op on already-completed payments), so reprocessing a
    // retried event is safe.
    await markEventProcessed(eventId)

    return NextResponse.json({ success: true })
  } catch (error) {
    logger.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}

async function handlePaymentSuccess(event: any) {
  const payment = event.payload.payment.entity
  const orderId = payment.order_id
  const paymentId = payment.id

  // Read the student's selected tier from the ORDER notes (authoritative;
  // payment.notes is unreliable). Done outside the tx (network call). Falls back
  // to payment.notes then the fee heuristic inside mapCourseToTier.
  const orderTier = await fetchOrderTier(orderId)

  try {
    await prisma.$transaction(async (tx) => {
      const paymentRecord = await tx.payments.findFirst({
        where: { razorpayOrderId: orderId },
        include: {
          enrollments: {
            include: {
              courses: true,
            },
          },
        },
      })

      if (!paymentRecord) {
        logger.error('Webhook: Payment record not found for order:', orderId)
        return
      }

      if (paymentRecord.status === 'COMPLETED') {
        logger.info('Webhook: Payment already completed:', orderId)
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

      if (paymentRecord.enrollmentId && paymentRecord.enrollments) {
        await tx.enrollments.update({
          where: { id: paymentRecord.enrollmentId },
          data: {
            status: 'ACTIVE',
            paidAmount: { increment: paymentRecord.amount },
            pendingAmount: { decrement: paymentRecord.amount },
            startDate: new Date(),
          },
        })

        const courseMaterials = await tx.study_materials.findMany({
          where: {
            courseId: paymentRecord.enrollments.courseId,
            isPublished: true,
          },
          select: { id: true },
        })

        if (courseMaterials.length > 0) {
          const materialAccessRecords = courseMaterials.map((material, index) => ({
            id: `matacc_${Date.now()}_${index}_${Math.random().toString(36).slice(2, 9)}`,
            materialId: material.id,
            userId: paymentRecord.userId,
            grantedBy: 'system',
            grantedAt: new Date(),
            reason: 'Webhook: Payment completed',
          }))

          await tx.material_access.createMany({
            data: materialAccessRecords,
            skipDuplicates: true,
          })
        }

        // Set coachingTier — prefer the tier the student actually selected
        // (from the order notes, then any payment notes); fall back to
        // course/fee heuristics for payments created outside checkout.
        const tierFromCourse = mapCourseToTier(
          paymentRecord.enrollments.courseId,
          paymentRecord.enrollments.totalFees,
          orderTier || payment.notes?.tier
        )
        await tx.users.update({
          where: { id: paymentRecord.userId },
          data: { coachingTier: tierFromCourse },
        })

        logger.info(
          `Webhook: Enrollment activated: ${paymentRecord.enrollmentId}, tier set to: ${tierFromCourse}`
        )
      }
    })

    logger.info('Webhook: Payment success handled:', paymentId)
  } catch (error) {
    logger.error('Webhook: Error handling payment success:', error)
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

    logger.info(`Webhook: Payment failure recorded: ${orderId} ${reason}`)
  } catch (error) {
    logger.error('Webhook: Error handling payment failure:', error)
    throw error
  }
}

async function handleOrderPaid(event: any) {
  const order = event.payload.order.entity
  const orderId = order.id

  logger.info('Webhook: Order paid:', orderId)
}

async function handleRefundCreated(event: any) {
  const refund = event.payload.refund.entity
  const paymentId = refund.payment_id
  const refundAmount = refund.amount

  try {
    const payment = await prisma.payments.findFirst({
      where: { razorpayPaymentId: paymentId },
      include: { enrollments: true },
    })

    if (!payment) {
      logger.error('Webhook: Payment not found for refund:', paymentId)
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
        await tx.enrollments.update({
          where: { id: payment.enrollmentId },
          data: {
            status: 'CANCELLED',
            paidAmount: { decrement: refundAmount },
          },
        })
      }
    })

    logger.info(`Webhook: Refund processed: ${refund.id} ${refundAmount}`)
  } catch (error) {
    logger.error('Webhook: Error handling refund:', error)
    throw error
  }
}

// Payment link lifecycle handlers (counselor-issued links via
// /api/counselor/payment-links/create). Razorpay sets reference_id =
// our payment_links.id so we can match without storing the provider id.
async function handlePaymentLinkPaid(event: any) {
  const link = event.payload?.payment_link?.entity
  if (!link?.reference_id) {
    logger.error('Webhook: payment_link event missing reference_id', { eventId: event.id })
    return
  }

  const amountPaidMajor = link.amount_paid ? link.amount_paid / 100 : undefined
  const fullyPaid =
    typeof link.amount === 'number' && typeof link.amount_paid === 'number'
      ? link.amount_paid >= link.amount
      : event.event === 'payment_link.paid'

  const updatedLink = await prisma.payment_links.update({
    where: { id: link.reference_id },
    data: {
      status: fullyPaid ? 'PAID' : 'PARTIALLY_PAID',
      paidAt: new Date(),
      paidAmount: amountPaidMajor,
    },
    include: {
      leads: { select: { id: true, courseInterest: true, assignedToId: true, stage: true } },
    },
  })
  logger.info(
    `Webhook: payment_link ${fullyPaid ? 'PAID' : 'PARTIALLY_PAID'}: ${link.reference_id}`
  )

  // On full payment, flip the lead to ENROLLED (if not already) and
  // emit lead/enrolled to fire the onboarding orchestration.
  if (fullyPaid && updatedLink.leads.stage !== 'ENROLLED') {
    await prisma.leads.update({
      where: { id: updatedLink.leads.id },
      data: { stage: 'ENROLLED', convertedAt: new Date() },
    })
    await inngest.send({
      name: 'lead/enrolled',
      data: {
        leadId: updatedLink.leads.id,
        counselorId: updatedLink.leads.assignedToId,
        courseInterest: updatedLink.leads.courseInterest,
        amountPaid: Number(updatedLink.paidAmount ?? updatedLink.amount),
        currency: updatedLink.currency,
      },
    })
    // Payment is the strongest scoring signal — rescore in the background.
    const { updateLeadScore } = await import('@/lib/leadScoring')
    void updateLeadScore(updatedLink.leads.id).catch(() => {})
    // Ad-platform feedback: THE conversion. eventId dedupes with any later
    // manual stage edit firing the same leadId:ENROLLED.
    const { sendCapiEvent } = await import('@/lib/marketing/metaCapi')
    const leadContact = await prisma.leads.findUnique({
      where: { id: updatedLink.leads.id },
      select: { phone: true, email: true },
    })
    if (leadContact) {
      void sendCapiEvent({
        eventName: 'Purchase',
        phone: leadContact.phone,
        email: leadContact.email,
        value: Number(updatedLink.paidAmount ?? updatedLink.amount),
        eventId: `${updatedLink.leads.id}:ENROLLED`,
      })
    }
  }
}

async function handlePaymentLinkClosed(event: any, eventType: string) {
  const link = event.payload?.payment_link?.entity
  if (!link?.reference_id) return
  await prisma.payment_links.update({
    where: { id: link.reference_id },
    data: { status: eventType === 'payment_link.expired' ? 'EXPIRED' : 'CANCELLED' },
  })
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
