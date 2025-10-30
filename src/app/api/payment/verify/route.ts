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
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json()

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

    const booking = await prisma.demoBooking.findFirst({
      where: { razorpayOrderId: razorpay_order_id },
    })

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found for this order' }, { status: 404 })
    }

    const updatedBooking = await prisma.demoBooking.update({
      where: { id: booking.id },
      data: {
        paymentStatus: 'COMPLETED',
        razorpayPaymentId: razorpay_payment_id,
        paymentCompletedAt: new Date(),
        status: 'CONFIRMED',
      },
    })

    console.log('Payment verified and booking updated:', {
      bookingId: booking.id,
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      amount: booking.paymentAmount,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      verified: true,
      bookingId: booking.id,
      message: 'Payment verified successfully',
      booking: {
        id: updatedBooking.id,
        studentName: updatedBooking.studentName,
        preferredDate: updatedBooking.preferredDate,
        preferredTime: updatedBooking.preferredTime,
        demoType: updatedBooking.demoType,
      },
    })
  } catch (error) {
    console.error('Payment verification error:', error)
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
    const bookingId = searchParams.get('bookingId')

    if (!bookingId) {
      return NextResponse.json({ error: 'Booking ID required' }, { status: 400 })
    }

    const booking = await prisma.demoBooking.findUnique({
      where: { id: bookingId },
      select: {
        id: true,
        paymentStatus: true,
        paymentAmount: true,
        razorpayOrderId: true,
        razorpayPaymentId: true,
        paymentCompletedAt: true,
        demoType: true,
      },
    })

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      paymentStatus: booking.paymentStatus,
      paymentAmount: booking.paymentAmount,
      paymentCompleted: booking.paymentStatus === 'COMPLETED',
      paymentCompletedAt: booking.paymentCompletedAt,
    })
  } catch (error) {
    console.error('Payment status fetch error:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch payment status',
        details: error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    )
  }
}
