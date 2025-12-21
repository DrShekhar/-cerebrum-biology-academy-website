/**
 * Secure OTP Send Endpoint
 * Supports SMS, WhatsApp, and Email channels via Twilio Verify
 */

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { sendOTP, checkOTPRateLimit, OTPChannel } from '@/lib/auth/twilio-verify'

// Input validation schema
const sendOTPSchema = z.object({
  to: z.string().min(1, 'Recipient required'),
  channel: z.enum(['sms', 'whatsapp', 'email']),
  purpose: z.enum(['login', 'register', 'reset_password', 'verify']).default('login'),
})

// Validate phone number format
function isValidIndianPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '')
  return /^[6-9]\d{9}$/.test(digits) || /^91[6-9]\d{9}$/.test(digits)
}

// Validate email format
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validation = sendOTPSchema.safeParse(body)
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

    const { to, channel, purpose } = validation.data

    // Validate recipient format based on channel
    if (channel === 'email') {
      if (!isValidEmail(to)) {
        return NextResponse.json(
          { success: false, error: 'Invalid email address' },
          { status: 400 }
        )
      }
    } else {
      if (!isValidIndianPhone(to)) {
        return NextResponse.json(
          { success: false, error: 'Invalid phone number. Use 10-digit Indian mobile number.' },
          { status: 400 }
        )
      }
    }

    // Rate limiting - FAIL CLOSED on errors
    const rateLimitKey = `otp:${channel}:${to}`
    let rateLimit
    try {
      rateLimit = checkOTPRateLimit(rateLimitKey, 5, 60 * 60 * 1000)
    } catch (error) {
      console.error('Rate limit check failed:', error)
      // FAIL CLOSED - deny on error
      return NextResponse.json(
        { success: false, error: 'Service temporarily unavailable. Please try again.' },
        { status: 503 }
      )
    }

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: 'Too many OTP requests. Please try again later.',
          retryAfter: rateLimit.resetAt,
        },
        { status: 429 }
      )
    }

    // Check user existence for login
    if (purpose === 'login') {
      const userField = channel === 'email' ? 'email' : 'phone'
      const user = await prisma.users.findFirst({
        where: { [userField]: to },
      })

      if (!user) {
        return NextResponse.json(
          { success: false, error: 'Account not found. Please register first.' },
          { status: 404 }
        )
      }
    }

    // Check if account exists for registration
    if (purpose === 'register') {
      const userField = channel === 'email' ? 'email' : 'phone'
      const existingUser = await prisma.users.findFirst({
        where: { [userField]: to },
      })

      if (existingUser) {
        return NextResponse.json(
          { success: false, error: 'Account already exists. Please login instead.' },
          { status: 409 }
        )
      }
    }

    // Send OTP via Twilio Verify
    const result = await sendOTP(to, channel as OTPChannel)

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 })
    }

    // Log OTP request (without the actual OTP)
    console.log(`OTP sent: ${channel} to ${to.slice(0, 3)}***${to.slice(-2)} for ${purpose}`)

    return NextResponse.json({
      success: true,
      message: `Verification code sent via ${channel}`,
      channel,
      expiresIn: 600, // 10 minutes (Twilio default)
      remainingAttempts: rateLimit.remainingAttempts,
    })
  } catch (error) {
    console.error('Send OTP error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to send verification code' },
      { status: 500 }
    )
  }
}
