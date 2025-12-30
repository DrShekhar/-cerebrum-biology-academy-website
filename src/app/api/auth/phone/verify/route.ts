/**
 * Phone OTP Verify Endpoint
 * Verifies OTP and creates Clerk sign-in token
 * Does NOT create legacy sessions - Clerk handles all session management
 */

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { clerkClient } from '@clerk/nextjs/server'
import { verifyOTP, clearOTPRateLimit, OTPChannel } from '@/lib/auth/twilio-verify'

const verifySchema = z.object({
  phone: z
    .string()
    .min(10)
    .max(15)
    .transform((val) => val.replace(/\D/g, '')),
  code: z.string().length(6).regex(/^\d+$/, 'OTP must be 6 digits'),
  channel: z.enum(['whatsapp', 'sms']).default('whatsapp'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validation = verifySchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid request',
          details: validation.error.issues,
        },
        { status: 400 }
      )
    }

    const { phone, code, channel } = validation.data

    // Format phone for India
    const formattedPhone = phone.startsWith('91') ? `+${phone}` : `+91${phone}`

    // Verify OTP via Twilio
    const result = await verifyOTP(formattedPhone, code, channel as OTPChannel)

    if (!result.success || !result.valid) {
      return NextResponse.json(
        {
          success: false,
          error: result.error || 'Invalid verification code',
          valid: false,
        },
        { status: 401 }
      )
    }

    // Clear rate limit on successful verification
    clearOTPRateLimit(`phone:${formattedPhone}`)

    // Check if user exists in Clerk by phone number
    const client = await clerkClient()
    const existingUsers = await client.users.getUserList({
      phoneNumber: [formattedPhone],
    })

    if (existingUsers.data.length > 0) {
      // User exists - create sign-in token
      const user = existingUsers.data[0]

      try {
        const signInToken = await client.signInTokens.createSignInToken({
          userId: user.id,
          expiresInSeconds: 300, // 5 minutes
        })

        return NextResponse.json({
          success: true,
          verified: true,
          userExists: true,
          signInToken: signInToken.token,
          user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            imageUrl: user.imageUrl,
            role: user.publicMetadata?.role || 'student',
          },
        })
      } catch (tokenError) {
        console.error('Failed to create sign-in token:', tokenError)
        // Fall back to redirect-based sign-in
        return NextResponse.json({
          success: true,
          verified: true,
          userExists: true,
          signInToken: null,
          message: 'Phone verified. Please complete sign-in.',
          user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
          },
        })
      }
    }

    // User doesn't exist - they need to sign up
    return NextResponse.json({
      success: true,
      verified: true,
      userExists: false,
      phone: formattedPhone,
      message: 'Phone verified. Please complete registration.',
    })
  } catch (error) {
    console.error('Verify OTP error:', error)
    return NextResponse.json({ success: false, error: 'Verification failed' }, { status: 500 })
  }
}
