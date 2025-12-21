/**
 * Secure OTP Verify Endpoint
 * Verifies OTP and creates/authenticates user session
 */

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { v4 as uuidv4 } from 'uuid'
import {
  verifyOTP,
  clearOTPRateLimit,
  generateSecureToken,
  OTPChannel,
} from '@/lib/auth/twilio-verify'
import { SessionManager, CookieManager } from '@/lib/auth/config'

// Input validation schema
const verifyOTPSchema = z.object({
  to: z.string().min(1, 'Recipient required'),
  code: z.string().length(6, 'OTP must be 6 digits').regex(/^\d+$/, 'OTP must be numeric'),
  channel: z.enum(['sms', 'whatsapp', 'email']),
  purpose: z.enum(['login', 'register', 'reset_password', 'verify']).default('login'),
  // For registration
  name: z.string().min(2).max(100).optional(),
  // For selecting specific account when multiple exist
  userId: z.string().uuid().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validation = verifyOTPSchema.safeParse(body)
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

    const { to, code, channel, purpose, name, userId } = validation.data

    // Verify OTP via Twilio Verify
    const result = await verifyOTP(to, code, channel as OTPChannel)

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
    clearOTPRateLimit(`otp:${channel}:${to}`)

    // Handle based on purpose
    const userField = channel === 'email' ? 'email' : 'phone'

    if (purpose === 'register') {
      // Check if user already exists
      const existingUser = await prisma.users.findFirst({
        where: { [userField]: to },
      })

      if (existingUser) {
        return NextResponse.json(
          { success: false, error: 'Account already exists' },
          { status: 409 }
        )
      }

      // Create new user
      const userId = uuidv4()
      const user = await prisma.users.create({
        data: {
          id: userId,
          [userField]: to,
          name: name || `User ${to.slice(-4)}`,
          role: 'STUDENT',
          emailVerified: channel === 'email' ? new Date() : null,
          phoneVerified: channel !== 'email' ? new Date() : null,
          profile: {
            registrationMethod: channel,
            registeredAt: new Date().toISOString(),
          },
          updatedAt: new Date(),
        },
      })

      // Create session
      const { accessToken, refreshToken, sessionId } = await SessionManager.createSession({
        id: user.id,
        email: user.email || '',
        role: user.role as any,
        name: user.name || '',
      })

      // Set cookies
      const response = NextResponse.json({
        success: true,
        message: 'Registration successful',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
        },
        isNewUser: true,
      })

      CookieManager.setAuthCookies(response, accessToken, refreshToken)
      return response
    }

    if (purpose === 'login') {
      // Find all users with this phone/email
      const users = await prisma.users.findMany({
        where: { [userField]: to },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true,
        },
      })

      if (users.length === 0) {
        return NextResponse.json({ success: false, error: 'Account not found' }, { status: 404 })
      }

      // If multiple accounts exist and no userId specified, return account list
      if (users.length > 1 && !userId) {
        return NextResponse.json({
          success: true,
          requiresAccountSelection: true,
          message: 'Multiple accounts found. Please select one.',
          accounts: users.map((u) => ({
            id: u.id,
            name: u.name,
            email: u.email,
            role: u.role,
          })),
          otpVerified: true, // OTP is valid, just need account selection
        })
      }

      // Select the user (either single user or specified userId)
      const user = userId ? users.find((u) => u.id === userId) : users[0]

      if (!user) {
        return NextResponse.json(
          { success: false, error: 'Selected account not found' },
          { status: 404 }
        )
      }

      // Update verification status
      await prisma.users.update({
        where: { id: user.id },
        data: {
          ...(channel === 'email' ? { emailVerified: new Date() } : { phoneVerified: new Date() }),
          lastActiveAt: new Date(),
          updatedAt: new Date(),
        },
      })

      // Create session
      const { accessToken, refreshToken, sessionId } = await SessionManager.createSession({
        id: user.id,
        email: user.email || '',
        role: user.role as any,
        name: user.name || '',
      })

      // Set cookies
      const response = NextResponse.json({
        success: true,
        message: 'Login successful',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
        },
        isNewUser: false,
      })

      CookieManager.setAuthCookies(response, accessToken, refreshToken)
      return response
    }

    if (purpose === 'verify') {
      // Just verify the contact method
      return NextResponse.json({
        success: true,
        message: 'Verification successful',
        verified: true,
        channel,
        to,
      })
    }

    if (purpose === 'reset_password') {
      // Generate password reset token
      const resetToken = generateSecureToken(32)
      const expiresAt = new Date(Date.now() + 30 * 60 * 1000) // 30 minutes

      // Find user
      const user = await prisma.users.findFirst({
        where: { [userField]: to },
      })

      if (!user) {
        return NextResponse.json({ success: false, error: 'Account not found' }, { status: 404 })
      }

      // Store reset token (you may want a separate table for this)
      await prisma.users.update({
        where: { id: user.id },
        data: {
          profile: {
            ...(user.profile as any),
            passwordResetToken: resetToken,
            passwordResetExpires: expiresAt.toISOString(),
          },
          updatedAt: new Date(),
        },
      })

      return NextResponse.json({
        success: true,
        message: 'OTP verified. You can now reset your password.',
        resetToken,
        expiresAt,
      })
    }

    return NextResponse.json({ success: false, error: 'Invalid purpose' }, { status: 400 })
  } catch (error) {
    console.error('Verify OTP error:', error)
    return NextResponse.json({ success: false, error: 'Verification failed' }, { status: 500 })
  }
}
