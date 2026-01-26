import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { RazorpayService } from '@/lib/payments/razorpayService'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, registrationId } = body

    // Validation
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !registrationId) {
      return NextResponse.json(
        { success: false, error: 'Missing payment details' },
        { status: 400 }
      )
    }

    // Verify signature
    const isValid = RazorpayService.verifyPaymentSignature({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    })

    if (!isValid) {
      // Update registration as failed
      await prisma.seminar_registrations.update({
        where: { id: registrationId },
        data: {
          paymentStatus: 'FAILED',
        },
      })

      return NextResponse.json(
        { success: false, error: 'Invalid payment signature' },
        { status: 400 }
      )
    }

    // Update registration as completed
    const registration = await prisma.seminar_registrations.update({
      where: { id: registrationId },
      data: {
        razorpayPaymentId: razorpay_payment_id,
        paymentStatus: 'COMPLETED',
      },
    })

    // TODO: Trigger WhatsApp welcome message via Interakt
    // await sendWhatsAppWelcome(registration)

    // TODO: Send email confirmation
    // await sendEmailConfirmation(registration)

    return NextResponse.json({
      success: true,
      registration: {
        id: registration.id,
        parentName: registration.parentName,
        email: registration.email,
        seminarDate: registration.seminarDate,
        seminarSlot: registration.seminarSlot,
      },
    })
  } catch (error) {
    console.error('Payment verification error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Payment verification failed',
      },
      { status: 500 }
    )
  }
}
