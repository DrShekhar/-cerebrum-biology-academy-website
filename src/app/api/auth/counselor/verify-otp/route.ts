import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import crypto from 'crypto'

const verifyOTPSchema = z.object({
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
  code: z.string().length(6, 'OTP must be 6 digits'),
})

const MAX_OTP_ATTEMPTS = 5

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { phoneNumber, code } = verifyOTPSchema.parse(body)

    if (!phoneNumber || !code) {
      return NextResponse.json(
        { error: 'Phone number and verification code are required' },
        { status: 400 }
      )
    }

    let formattedPhone = phoneNumber.replace(/[\s\-\(\)]/g, '')
    if (!formattedPhone.startsWith('+')) {
      formattedPhone = formattedPhone.startsWith('91')
        ? `+${formattedPhone}`
        : `+91${formattedPhone}`
    }

    const otpRecord = await prisma.whatsapp_otp.findFirst({
      where: {
        phone: formattedPhone,
        verified: false,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    if (!otpRecord) {
      return NextResponse.json(
        { error: 'No OTP found. Please request a new one.' },
        { status: 404 }
      )
    }

    if (new Date() > otpRecord.expiresAt) {
      return NextResponse.json(
        { error: 'OTP has expired. Please request a new one.' },
        { status: 400 }
      )
    }

    if (otpRecord.attempts >= MAX_OTP_ATTEMPTS) {
      return NextResponse.json(
        { error: 'Maximum verification attempts exceeded. Please request a new OTP.' },
        { status: 429 }
      )
    }

    await prisma.whatsapp_otp.update({
      where: { id: otpRecord.id },
      data: { attempts: otpRecord.attempts + 1 },
    })

    if (otpRecord.otp !== code) {
      const remainingAttempts = MAX_OTP_ATTEMPTS - (otpRecord.attempts + 1)
      return NextResponse.json(
        {
          error: 'Invalid OTP. Please try again.',
          remainingAttempts: Math.max(0, remainingAttempts),
        },
        { status: 400 }
      )
    }

    await prisma.whatsapp_otp.update({
      where: { id: otpRecord.id },
      data: { verified: true },
    })

    const counselor = await prisma.users.findFirst({
      where: {
        phone: formattedPhone,
        role: 'COUNSELOR',
      },
    })

    if (!counselor) {
      return NextResponse.json(
        { error: 'Counselor account not found. Please contact admin.' },
        { status: 404 }
      )
    }

    // SECURITY: Use cryptographically secure random token instead of predictable Math.random()
    const verificationToken = crypto.randomBytes(32).toString('hex')
    const verificationTokenExpiry = new Date(Date.now() + 5 * 60 * 1000)

    await prisma.users.update({
      where: { id: counselor.id },
      data: {
        phoneVerified: new Date(),
        updatedAt: new Date(),
        verificationToken,
        verificationTokenExpiry,
      },
    })

    await prisma.whatsapp_otp.delete({
      where: { id: otpRecord.id },
    })

    console.log('Counselor WhatsApp authentication successful:', formattedPhone)

    return NextResponse.json({
      success: true,
      verificationToken,
      phone: formattedPhone,
      user: {
        id: counselor.id,
        name: counselor.name,
        email: counselor.email,
        phone: counselor.phone,
        role: counselor.role,
        phoneVerified: counselor.phoneVerified,
      },
      message: 'OTP verified! Creating session...',
    })
  } catch (error: any) {
    console.error('Error verifying counselor WhatsApp OTP:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 })
    }

    return NextResponse.json(
      {
        error: 'Failed to verify OTP',
        details: error.message || 'Unknown error occurred',
      },
      { status: 500 }
    )
  }
}
