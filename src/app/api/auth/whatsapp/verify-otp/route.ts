import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { logger } from '@/lib/utils/logger'
import { SessionManager, CookieManager, addSecurityHeaders } from '@/lib/auth/config'
import type { UserRole } from '@/generated/prisma'

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

      logger.info('New user created via WhatsApp authentication', {
        userId: user.id,
        phone: formattedPhone,
        needsSignupCompletion: true,
      })
    } else {
      // Update existing user's phone verification status
      user = await prisma.users.update({
        where: { id: user.id },
        data: {
          phoneVerified: new Date(),
          updatedAt: new Date(),
        },
      })

      logger.info('Existing user verified via WhatsApp', {
        userId: user.id,
        phone: formattedPhone,
      })
    }

    // Delete the used OTP (cleanup)
    await prisma.whatsapp_otp.delete({
      where: { id: otpRecord.id },
    })

    // Create session and get tokens
    const { accessToken, refreshToken } = await SessionManager.createSession({
      id: user.id,
      email: user.email,
      role: user.role as UserRole,
      name: user.name,
    })

    logger.authentication(user.id, 'whatsapp_login', true, {
      phone: formattedPhone,
      isNewUser,
      method: 'whatsapp_otp',
    })

    // Create response with user data
    const response = NextResponse.json({
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
      message: isNewUser
        ? 'Phone verified! Please complete your registration.'
        : 'Login successful! Welcome back to Cerebrum Biology Academy.',
    })

    // Set HTTP-only auth cookies
    CookieManager.setAuthCookies(response, accessToken, refreshToken)

    return addSecurityHeaders(response)
  } catch (error: any) {
    logger.error('Error verifying WhatsApp OTP', { error })

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
