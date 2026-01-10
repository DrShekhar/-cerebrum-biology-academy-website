/**
 * WhatsApp OTP Verify Endpoint
 * Verifies OTP from Interakt and integrates with Clerk for session management
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { logger } from '@/lib/utils/logger'
import { clerkClient } from '@clerk/nextjs/server'
import { hashOTP, clearOTPRateLimit } from '@/lib/auth/twilio-verify'

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

    // Verify the OTP by comparing hashes (timing-safe comparison)
    const inputHash = hashOTP(code)
    if (otpRecord.otp !== inputHash) {
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

    // Delete the used OTP (cleanup)
    await prisma.whatsapp_otp.delete({
      where: { id: otpRecord.id },
    })

    // Clear rate limit on successful verification
    await clearOTPRateLimit(`whatsapp:${formattedPhone}`)

    // Check if user exists in Clerk by phone number
    const client = await clerkClient()
    const existingUsers = await client.users.getUserList({
      phoneNumber: [formattedPhone],
    })

    if (existingUsers.data.length > 0) {
      // User exists in Clerk - create sign-in token
      const clerkUser = existingUsers.data[0]

      try {
        const signInToken = await client.signInTokens.createSignInToken({
          userId: clerkUser.id,
          expiresInSeconds: 300, // 5 minutes
        })

        logger.authentication(clerkUser.id, 'whatsapp_login', true, {
          phone: formattedPhone,
          method: 'whatsapp_otp_clerk',
        })

        return NextResponse.json({
          success: true,
          verified: true,
          userExists: true,
          signInToken: signInToken.token,
          user: {
            id: clerkUser.id,
            firstName: clerkUser.firstName,
            lastName: clerkUser.lastName,
            imageUrl: clerkUser.imageUrl,
            role: clerkUser.publicMetadata?.role || 'student',
          },
          message: 'Login successful! Welcome back.',
        })
      } catch (tokenError) {
        console.error('Failed to create sign-in token:', tokenError)
        // User exists but token creation failed
        return NextResponse.json({
          success: true,
          verified: true,
          userExists: true,
          signInToken: null,
          message: 'Phone verified. Please complete sign-in.',
        })
      }
    }

    // User doesn't exist in Clerk - they need to sign up
    logger.info('New user verified via WhatsApp, needs registration', {
      phone: formattedPhone,
    })

    return NextResponse.json({
      success: true,
      verified: true,
      userExists: false,
      phone: formattedPhone,
      message: 'Phone verified. Please complete registration.',
    })
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
