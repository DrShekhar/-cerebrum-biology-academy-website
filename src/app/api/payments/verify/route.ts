import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const {
      order_id,
      payment_id,
      signature,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = await request.json()

    // Support both naming conventions
    const orderId = order_id || razorpay_order_id
    const paymentId = payment_id || razorpay_payment_id
    const paymentSignature = signature || razorpay_signature

    if (!orderId || !paymentId || !paymentSignature) {
      return NextResponse.json(
        {
          verified: false,
          error: 'Missing required payment verification parameters',
        },
        { status: 400 }
      )
    }

    const secret = process.env.RAZORPAY_KEY_SECRET

    if (!secret) {
      console.error('RAZORPAY_KEY_SECRET not configured')
      return NextResponse.json(
        {
          verified: false,
          error: 'Payment gateway configuration error',
        },
        { status: 500 }
      )
    }

    const body = orderId + '|' + paymentId

    const expectedSignature = crypto.createHmac('sha256', secret).update(body).digest('hex')

    const verified = expectedSignature === paymentSignature

    if (verified) {
      try {
        let enrollmentId: string | null = null
        let userId: string | null = null
        let courseId: string | null = null

        await prisma.$transaction(async (tx) => {
          const payment = await tx.payment.findFirst({
            where: { razorpayOrderId: orderId },
            include: {
              enrollment: {
                include: {
                  course: true,
                },
              },
            },
          })

          if (!payment) {
            throw new Error('Payment record not found')
          }

          if (payment.status === 'COMPLETED') {
            console.log(`Payment already completed: ${orderId}`)
            return
          }

          await tx.payment.updateMany({
            where: { razorpayOrderId: orderId },
            data: {
              razorpayPaymentId: paymentId,
              razorpaySignature: paymentSignature,
              status: 'COMPLETED',
              completedAt: new Date(),
            },
          })

          if (payment.enrollmentId && payment.enrollment) {
            // Update enrollment status
            await tx.enrollment.update({
              where: { id: payment.enrollmentId },
              data: {
                status: 'ACTIVE',
                paidAmount: { increment: payment.amount },
                pendingAmount: { decrement: payment.amount },
                startDate: new Date(),
              },
            })

            // Store IDs for post-transaction operations
            enrollmentId = payment.enrollmentId
            userId = payment.userId
            courseId = payment.enrollment.courseId

            // Grant access to all course materials
            const courseMaterials = await tx.studyMaterial.findMany({
              where: {
                courseId: payment.enrollment.courseId,
                isPublished: true,
              },
              select: { id: true },
            })

            if (courseMaterials.length > 0) {
              // Create material access records for all published course materials
              const materialAccessRecords = courseMaterials.map((material) => ({
                materialId: material.id,
                userId: payment.userId,
                grantedBy: 'system',
                grantedAt: new Date(),
                reason: 'Enrollment payment completed',
              }))

              await tx.materialAccess.createMany({
                data: materialAccessRecords,
                skipDuplicates: true,
              })

              console.log(
                `Granted access to ${courseMaterials.length} materials for user ${payment.userId}`
              )
            }

            console.log(`Enrollment activated: ${payment.enrollmentId}`)
          }

          console.log(`Payment verified and updated: ${orderId}`)
        })

        // Trigger notifications after successful transaction (fire-and-forget)
        if (enrollmentId && userId && courseId) {
          // Trigger WhatsApp notification
          fetch(`${request.nextUrl.origin}/api/notifications/whatsapp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              orderId,
              enrollmentId,
              userId,
              courseId,
              type: 'enrollment_confirmation',
            }),
          }).catch((err) => console.error('WhatsApp notification failed:', err))

          // Trigger email notification
          fetch(`${request.nextUrl.origin}/api/notifications/email`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              orderId,
              enrollmentId,
              userId,
              courseId,
              type: 'enrollment_confirmation',
            }),
          }).catch((err) => console.error('Email notification failed:', err))

          console.log('Triggered WhatsApp and Email notifications')
        }
      } catch (dbError) {
        console.error('Transaction error after payment verification:', dbError)
        return NextResponse.json(
          {
            verified: true,
            orderId,
            paymentId,
            warning: 'Payment verified but database update failed',
            error: dbError instanceof Error ? dbError.message : 'Unknown error',
          },
          { status: 200 }
        )
      }
    } else {
      console.warn('Payment verification failed', {
        orderId,
        paymentId,
        expected: expectedSignature,
        received: paymentSignature,
      })
    }

    return NextResponse.json({
      verified,
      orderId,
      paymentId,
    })
  } catch (error) {
    console.error('Payment verification error:', error)
    return NextResponse.json(
      {
        verified: false,
        error: 'Payment verification failed',
      },
      { status: 500 }
    )
  }
}

// GET endpoint for checking payment status
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const orderId = searchParams.get('order_id') || searchParams.get('razorpay_order_id')

    if (!orderId) {
      return NextResponse.json({ error: 'Missing order_id parameter' }, { status: 400 })
    }

    const payment = await prisma.payment.findFirst({
      where: { razorpayOrderId: orderId },
      include: {
        enrollment: {
          include: {
            course: true,
          },
        },
      },
    })

    if (!payment) {
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 })
    }

    return NextResponse.json({
      payment: {
        id: payment.id,
        status: payment.status,
        amount: payment.amount,
        razorpayOrderId: payment.razorpayOrderId,
        razorpayPaymentId: payment.razorpayPaymentId,
        createdAt: payment.createdAt,
        completedAt: payment.completedAt,
        enrollment: payment.enrollment,
      },
    })
  } catch (error) {
    console.error('Get payment status error:', error)
    return NextResponse.json({ error: 'Failed to fetch payment status' }, { status: 500 })
  }
}
