import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sign } from 'jsonwebtoken'
import { z } from 'zod'

const jwtSecret = process.env.NEXTAUTH_SECRET || 'your-secret-key'

const verifyOTPSchema = z.object({
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
  code: z.string().length(6, 'OTP must be 6 digits'),
})

// Maximum number of OTP verification attempts
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

    // Format phone number - ensure consistent format
    let formattedPhone = phoneNumber.replace(/[\s\-\(\)]/g, '')
    if (!formattedPhone.startsWith('+')) {
      formattedPhone = formattedPhone.startsWith('91')
        ? `+${formattedPhone}`
        : `+91${formattedPhone}`
    }

    // Find the most recent valid OTP for this phone number
    const otpRecord = await prisma.whatsapp_otp.findFirst({
      where: {
        phone: formattedPhone,
        verified: false,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    // Check if OTP exists
    if (!otpRecord) {
      return NextResponse.json(
        { error: 'No OTP found. Please request a new one.' },
        { status: 404 }
      )
    }

    // Check if OTP has expired
    if (new Date() > otpRecord.expiresAt) {
      return NextResponse.json(
        { error: 'OTP has expired. Please request a new one.' },
        { status: 400 }
      )
    }

    // Check if maximum attempts exceeded
    if (otpRecord.attempts >= MAX_OTP_ATTEMPTS) {
      return NextResponse.json(
        { error: 'Maximum verification attempts exceeded. Please request a new OTP.' },
        { status: 429 }
      )
    }

    // Increment attempt counter
    await prisma.whatsapp_otp.update({
      where: { id: otpRecord.id },
      data: { attempts: otpRecord.attempts + 1 },
    })

    // Verify the OTP
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

    // OTP is valid! Mark it as verified
    await prisma.whatsapp_otp.update({
      where: { id: otpRecord.id },
      data: { verified: true },
    })

    // Find existing user
    let user = await prisma.users.findFirst({
      where: { phone: formattedPhone },
    })

    const isNewUser = !user

    if (!user) {
      // Create minimal user record - they'll complete signup after
      user = await prisma.users.create({
        data: {
          phone: formattedPhone,
          name: `User ${formattedPhone.slice(-4)}`, // Temporary name - to be updated
          email: `${formattedPhone.replace(/\+/g, '')}@temp.cerebrumbiologyacademy.com`, // Temporary
          role: 'STUDENT',
          phoneVerified: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      })

      console.log('✅ New user created via WhatsApp:', user.id, '- needs to complete signup')
    } else {
      // Update existing user's phone verification status
      user = await prisma.users.update({
        where: { id: user.id },
        data: {
          phoneVerified: new Date(),
          updatedAt: new Date(),
        },
      })

      console.log('✅ Existing user verified via WhatsApp:', user.id)
    }

    // Delete the used OTP (cleanup)
    await prisma.whatsapp_otp.delete({
      where: { id: otpRecord.id },
    })

    // Generate JWT token
    const token = sign(
      {
        userId: user.id,
        phone: user.phone,
        role: user.role,
        authMethod: 'whatsapp',
      },
      jwtSecret,
      { expiresIn: '7d' }
    )

    console.log(
      '✅ WhatsApp authentication successful for:',
      formattedPhone,
      isNewUser ? '(new user)' : '(existing user)'
    )

    return NextResponse.json({
      success: true,
      isNewUser, // Flag to show signup form
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        phoneVerified: user.phoneVerified,
      },
      token,
      message: isNewUser
        ? 'Phone verified! Please complete your registration.'
        : 'Login successful! Welcome back to Cerebrum Biology Academy.',
    })
  } catch (error: any) {
    console.error('❌ Error verifying WhatsApp OTP:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
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
