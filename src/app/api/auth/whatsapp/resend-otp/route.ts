import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateOTP, sendWhatsAppOTP } from '@/lib/interakt'
import { z } from 'zod'

const resendOTPSchema = z.object({
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { phoneNumber } = resendOTPSchema.parse(body)

    if (!phoneNumber) {
      return NextResponse.json({ error: 'Phone number is required' }, { status: 400 })
    }

    // Format phone number - remove spaces, dashes, and ensure it starts with +91
    let formattedPhone = phoneNumber.replace(/[\s\-\(\)]/g, '')
    if (!formattedPhone.startsWith('+')) {
      formattedPhone = formattedPhone.startsWith('91')
        ? `+${formattedPhone}`
        : `+91${formattedPhone}`
    }

    // Check if there's a recent unverified OTP (within last 60 seconds)
    const oneMinuteAgo = new Date(Date.now() - 60 * 1000)
    const recentOTP = await prisma.whatsapp_otp.findFirst({
      where: {
        phone: formattedPhone,
        verified: false,
        createdAt: {
          gte: oneMinuteAgo,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    if (recentOTP) {
      return NextResponse.json(
        {
          error: 'Please wait 60 seconds before requesting a new OTP.',
          canRetryAt: new Date(recentOTP.createdAt.getTime() + 60 * 1000).toISOString(),
        },
        { status: 429 }
      )
    }

    // Check rate limiting: max 3 OTPs per phone per 15 minutes
    const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000)
    const recentOTPs = await prisma.whatsapp_otp.count({
      where: {
        phone: formattedPhone,
        createdAt: {
          gte: fifteenMinutesAgo,
        },
      },
    })

    if (recentOTPs >= 3) {
      return NextResponse.json(
        {
          error: 'Too many OTP requests. Please try again after 15 minutes.',
          canRetryAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
        },
        { status: 429 }
      )
    }

    // Invalidate any previous unverified OTPs for this phone
    await prisma.whatsapp_otp.updateMany({
      where: {
        phone: formattedPhone,
        verified: false,
      },
      data: {
        expiresAt: new Date(), // Mark as expired
      },
    })

    // Generate new OTP
    const otp = generateOTP()
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes

    // Save OTP to database
    await prisma.whatsapp_otp.create({
      data: {
        phone: formattedPhone,
        otp,
        expiresAt,
      },
    })

    // Send OTP via WhatsApp
    const result = await sendWhatsAppOTP({
      phone: formattedPhone,
      otp,
    })

    if (!result.success) {
      return NextResponse.json({ error: result.error || 'Failed to send OTP' }, { status: 500 })
    }

    console.log('✅ OTP resent successfully to:', formattedPhone)

    return NextResponse.json({
      success: true,
      message: 'OTP resent successfully via WhatsApp',
      expiresIn: 600, // 10 minutes in seconds
    })
  } catch (error: any) {
    console.error('❌ Error resending WhatsApp OTP:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 })
    }

    return NextResponse.json(
      {
        error: 'Failed to resend OTP',
        details: error.message || 'Unknown error occurred',
      },
      { status: 500 }
    )
  }
}
