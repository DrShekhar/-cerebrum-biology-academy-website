import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateOTP, sendWhatsAppOTP } from '@/lib/interakt'
import { z } from 'zod'
import { logger } from '@/lib/utils/logger'

const sendOTPSchema = z.object({
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { phoneNumber } = sendOTPSchema.parse(body)

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
        { error: 'Too many OTP requests. Please try again after 15 minutes.' },
        { status: 429 }
      )
    }

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

    logger.info('OTP sent successfully via WhatsApp', {
      phone: formattedPhone,
      expiresIn: 600,
    })

    return NextResponse.json({
      success: true,
      message: 'OTP sent successfully via WhatsApp',
      expiresIn: 600, // 10 minutes in seconds
    })
  } catch (error: any) {
    logger.error('Error sending WhatsApp OTP', { error })

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 })
    }

    return NextResponse.json(
      {
        error: 'Failed to send OTP',
        details: error.message || 'Unknown error occurred',
      },
      { status: 500 }
    )
  }
}
