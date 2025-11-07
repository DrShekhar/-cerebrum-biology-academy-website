import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'
import { prisma } from '@/lib/prisma'

// Lazy initialization - only create Razorpay instance when actually used
function getRazorpayInstance() {
  if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    throw new Error('Razorpay credentials not configured')
  }
  return new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  })
}

export async function POST(request: NextRequest) {
  try {
    const { amount, bookingId, currency = 'INR' } = await request.json()

    if (!amount || !bookingId) {
      return NextResponse.json({ error: 'Amount and booking ID are required' }, { status: 400 })
    }

    if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      console.error('Razorpay credentials not configured')
      return NextResponse.json({ error: 'Payment service not configured' }, { status: 503 })
    }

    const razorpay = getRazorpayInstance()

    const booking = await prisma.demoBooking.findUnique({
      where: { id: bookingId },
    })

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    const options = {
      amount: amount * 100,
      currency,
      receipt: `demo_${bookingId}_${Date.now()}`,
      notes: {
        bookingId,
        studentName: booking.studentName,
        email: booking.email || '',
        phone: booking.phone,
        demoType: booking.demoType,
        preferredDate: booking.preferredDate,
        preferredTime: booking.preferredTime,
      },
    }

    const order = await razorpay.orders.create(options)

    await prisma.demoBooking.update({
      where: { id: bookingId },
      data: {
        razorpayOrderId: order.id,
        paymentAmount: amount * 100,
        paymentStatus: 'PENDING',
      },
    })

    console.log('Razorpay order created:', {
      orderId: order.id,
      bookingId,
      amount,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    })
  } catch (error) {
    console.error('Razorpay order creation error:', error)
    return NextResponse.json(
      {
        error: 'Failed to create payment order',
        details: error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    )
  }
}
