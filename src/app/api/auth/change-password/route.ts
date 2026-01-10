import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import {
  validateUserSession,
  addSecurityHeaders,
  PasswordUtils,
  SessionManager,
  AuthRateLimit,
} from '@/lib/auth/config'
import { withAuth } from '@/lib/auth/middleware'
import { z } from 'zod'

// Password change validation schema
const ChangePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(8, 'New password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Password confirmation is required'),
    logoutOtherDevices: z.boolean().optional().default(false),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

/**
 * POST /api/auth/change-password
 * Change user password
 */
export const POST = withAuth(async (request: NextRequest, session) => {
  try {
    const body = await request.json()
    const result = ChangePasswordSchema.safeParse(body)

    if (!result.success) {
      return addSecurityHeaders(
        NextResponse.json(
          {
            error: 'Invalid input',
            details: result.error.issues,
          },
          { status: 400 }
        )
      )
    }

    const { currentPassword, newPassword, logoutOtherDevices } = result.data
    // Parse first IP from x-forwarded-for to prevent IP spoofing attacks
    const forwardedFor = request.headers.get('x-forwarded-for')
    const clientIP = forwardedFor
      ? forwardedFor.split(',')[0].trim()
      : request.headers.get('x-real-ip') || 'unknown'

    // Rate limiting for password change attempts
    const rateLimitCheck = AuthRateLimit.checkRateLimit(
      `change-password:${session.userId}:${clientIP}`
    )
    if (!rateLimitCheck.allowed) {
      return addSecurityHeaders(
        NextResponse.json(
          {
            error: 'Too many password change attempts',
            message: 'Please try again later',
            lockoutEndsAt: rateLimitCheck.lockoutEndsAt,
          },
          { status: 429 }
        )
      )
    }

    // Validate new password strength
    const passwordValidation = PasswordUtils.validatePassword(newPassword)
    if (!passwordValidation.valid) {
      return addSecurityHeaders(
        NextResponse.json(
          {
            error: 'Password does not meet requirements',
            details: passwordValidation.errors,
          },
          { status: 400 }
        )
      )
    }

    // Get current user with password hash
    const user = await prisma.users.findUnique({
      where: { id: session.userId },
      select: {
        id: true,
        email: true,
        passwordHash: true,
      },
    })

    if (!user || !user.passwordHash) {
      return addSecurityHeaders(
        NextResponse.json(
          {
            error: 'User not found',
            message: 'Unable to verify current user',
          },
          { status: 404 }
        )
      )
    }

    // Verify current password
    const isCurrentPasswordValid = await PasswordUtils.verify(currentPassword, user.passwordHash)
    if (!isCurrentPasswordValid) {
      return addSecurityHeaders(
        NextResponse.json(
          {
            error: 'Invalid current password',
            message: 'The current password you entered is incorrect',
          },
          { status: 401 }
        )
      )
    }

    // Check if new password is different from current
    const isSamePassword = await PasswordUtils.verify(newPassword, user.passwordHash)
    if (isSamePassword) {
      return addSecurityHeaders(
        NextResponse.json(
          {
            error: 'Password unchanged',
            message: 'New password must be different from your current password',
          },
          { status: 400 }
        )
      )
    }

    // Hash new password
    const newPasswordHash = await PasswordUtils.hash(newPassword)

    // Update password in database
    await prisma.users.update({
      where: { id: session.userId },
      data: {
        passwordHash: newPasswordHash,
        // Reset email verification if email was changed recently
        // This could be enhanced based on your security requirements
      },
    })

    // Logout from other devices if requested
    if (logoutOtherDevices) {
      await SessionManager.terminateAllUserSessions(session.userId)
    }

    // Reset rate limit on successful password change
    AuthRateLimit.resetRateLimit(`change-password:${session.userId}:${clientIP}`)

    // Track password change event
    try {
      await prisma.analyticsEvent.create({
        data: {
          userId: session.userId,
          eventType: 'security',
          eventName: 'password_changed',
          properties: {
            logoutOtherDevices,
            method: 'user_initiated',
          },
          ipAddress: clientIP,
          userAgent: request.headers.get('user-agent'),
        },
      })
    } catch (analyticsError) {
      console.error('Analytics tracking error:', analyticsError)
    }

    return addSecurityHeaders(
      NextResponse.json({
        success: true,
        message: 'Password changed successfully',
        loggedOutOtherDevices: logoutOtherDevices,
      })
    )
  } catch (error) {
    console.error('Change password error:', error)
    return addSecurityHeaders(
      NextResponse.json(
        {
          error: 'Internal server error',
          message: 'Failed to change password',
        },
        { status: 500 }
      )
    )
  }
})

// OPTIONS for CORS preflight
export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin') || ''
  const allowedOrigins = [
    'https://cerebrumbiologyacademy.com',
    'https://cerebrumbiologyacademy.com',
    ...(process.env.NODE_ENV === 'development' ? ['http://localhost:3000'] : []),
  ]
  const corsOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0]

  return addSecurityHeaders(
    new NextResponse(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': corsOrigin,
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Credentials': 'true',
      },
    })
  )
}
