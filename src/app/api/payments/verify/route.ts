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
        await prisma.$transaction(async (tx) => {
          const payment = await tx.payment.findFirst({
            where: { razorpayOrderId: orderId },
            include: { enrollment: true },
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

          if (payment.enrollmentId) {
            await tx.enrollment.update({
              where: { id: payment.enrollmentId },
              data: {
                status: 'ACTIVE',
                paidAmount: { increment: payment.amount },
                pendingAmount: { decrement: payment.amount },
              },
            })
            console.log(`Enrollment activated: ${payment.enrollmentId}`)
          }

          console.log(`Payment verified and updated: ${orderId}`)
        })
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
