import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateOTP, sendWhatsAppOTP } from '@/lib/interakt'
import { z } from 'zod'

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

    let formattedPhone = phoneNumber.replace(/[\s\-\(\)]/g, '')
    if (!formattedPhone.startsWith('+')) {
      formattedPhone = formattedPhone.startsWith('91')
        ? `+${formattedPhone}`
        : `+91${formattedPhone}`
    }

    const counselor = await prisma.users.findFirst({
      where: {
        phone: formattedPhone,
        role: 'COUNSELOR',
      },
    })

    if (!counselor) {
      return NextResponse.json(
        { error: 'No counselor account found with this phone number. Please contact admin.' },
        { status: 404 }
      )
    }

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

    const otp = generateOTP()
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000)

    await prisma.whatsapp_otp.create({
      data: {
        phone: formattedPhone,
        otp,
        expiresAt,
      },
    })

    const result = await sendWhatsAppOTP({
      phone: formattedPhone,
      otp,
    })

    if (!result.success) {
      return NextResponse.json({ error: result.error || 'Failed to send OTP' }, { status: 500 })
    }


    return NextResponse.json({
      success: true,
      message: 'OTP sent successfully via WhatsApp',
      expiresIn: 600,
    })
  } catch (error: any) {
    console.error('Error sending counselor WhatsApp OTP:', error)

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
