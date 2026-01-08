import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { RazorpayService } from '@/lib/payments/razorpayService'
import { SEMINAR_CONFIG } from '@/lib/seminar/config'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const {
      parentName,
      email,
      whatsappNumber,
      city,
      studentClass,
      referralCode,
      seminarDate,
      pricingTier = 'STANDARD',
    } = body

    // Validation
    if (!parentName || !email || !whatsappNumber || !city) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Determine price based on tier
    let amount: number
    switch (pricingTier) {
      case 'EARLY_BIRD':
        amount = SEMINAR_CONFIG.pricing.earlyBird
        break
      case 'PREMIUM':
        amount = SEMINAR_CONFIG.pricing.premium
        break
      default:
        amount = SEMINAR_CONFIG.pricing.standard
    }

    // Create Razorpay order
    const order = await RazorpayService.createOrder({
      amount: amount,
      receipt: `seminar_${Date.now()}`,
      notes: {
        parent_name: parentName,
        email: email,
        whatsapp: whatsappNumber,
        city: city,
        student_class: studentClass || 'Not specified',
        referral_code: referralCode || '',
        payment_type: 'seminar_registration',
        pricing_tier: pricingTier,
      },
    })

    // Generate seminar slot based on date
    const slotDate = seminarDate ? new Date(seminarDate) : new Date()
    const seminarSlot = `friday-8pm-${slotDate.toISOString().split('T')[0]}`

    // Create registration record with PENDING status
    const registration = await prisma.seminar_registrations.create({
      data: {
        parentName,
        email,
        whatsappNumber: whatsappNumber.replace(/\D/g, ''), // Store only digits
        city,
        studentClass: studentClass || null,
        referralCode: referralCode || null,
        razorpayOrderId: order.id,
        paymentStatus: 'PENDING',
        amount: amount * 100, // Store in paise
        pricingTier: pricingTier as 'EARLY_BIRD' | 'STANDARD' | 'PREMIUM',
        seminarDate: slotDate,
        seminarSlot,
        whatsappOptIn: true,
        emailOptIn: true,
        dripStage: 0,
        // UTM tracking from cookies/headers would be added here
        utmSource: req.headers.get('x-utm-source') || null,
        utmMedium: req.headers.get('x-utm-medium') || null,
        utmCampaign: req.headers.get('x-utm-campaign') || null,
        ipAddress: req.headers.get('x-forwarded-for')?.split(',')[0] || null,
        userAgent: req.headers.get('user-agent') || null,
      },
    })

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
      },
      registrationId: registration.id,
    })
  } catch (error) {
    console.error('Seminar order creation error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create order',
      },
      { status: 500 }
    )
  }
}
