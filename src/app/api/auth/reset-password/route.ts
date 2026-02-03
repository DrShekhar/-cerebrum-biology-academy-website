import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { addSecurityHeaders, PasswordUtils, SessionManager, AuthRateLimit } from '@/lib/auth/config'
import { z } from 'zod'
import crypto from 'crypto'

// Request validation schema
const ResetPasswordSchema = z
  .object({
    token: z.string().min(1, 'Reset token is required'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Password confirmation is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

// Token validation schema for GET request
const ValidateTokenSchema = z.object({
  token: z.string().min(1, 'Reset token is required'),
})

/**
 * POST /api/auth/reset-password
 * Reset password using token from email
 */
export async function POST(request: NextRequest) {
  const forwardedFor = request.headers.get('x-forwarded-for')
  const clientIP = forwardedFor
    ? forwardedFor.split(',')[0].trim()
    : request.headers.get('x-real-ip') || 'unknown'

  try {
    // Rate limit password reset attempts
    const rateLimitCheck = await AuthRateLimit.checkRateLimit(`reset-password:${clientIP}`)
    if (!rateLimitCheck.allowed) {
      return addSecurityHeaders(
        NextResponse.json(
          {
            error: 'Too many password reset attempts',
            message: 'Please try again later',
            lockoutEndsAt: rateLimitCheck.lockoutEndsAt,
          },
          { status: 429 }
        )
      )
    }

    // Parse request body
    const body = await request.json()
    const result = ResetPasswordSchema.safeParse(body)

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

    const { token, password } = result.data

    // Validate password strength
    const passwordValidation = PasswordUtils.validatePassword(password)
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

    // Find the reset token
    const resetToken = await prisma.password_reset_tokens.findUnique({
      where: { token },
      include: { user: true },
    })

    if (!resetToken) {
      console.log(`[SECURITY] Invalid password reset token attempted from IP: ${clientIP}`)
      return addSecurityHeaders(
        NextResponse.json(
          {
            error: 'Invalid or expired reset link',
            message:
              'This password reset link is invalid or has already been used. Please request a new one.',
          },
          { status: 400 }
        )
      )
    }

    // Check if token has been used
    if (resetToken.used) {
      console.log(
        `[SECURITY] Used password reset token attempted for user: ${resetToken.userId} from IP: ${clientIP}`
      )
      return addSecurityHeaders(
        NextResponse.json(
          {
            error: 'Reset link already used',
            message:
              'This password reset link has already been used. Please request a new one if needed.',
          },
          { status: 400 }
        )
      )
    }

    // Check if token has expired
    if (resetToken.expiresAt < new Date()) {
      console.log(
        `[SECURITY] Expired password reset token attempted for user: ${resetToken.userId} from IP: ${clientIP}`
      )
      // Mark token as used to prevent future attempts
      await prisma.password_reset_tokens.update({
        where: { id: resetToken.id },
        data: { used: true },
      })
      return addSecurityHeaders(
        NextResponse.json(
          {
            error: 'Reset link expired',
            message: 'This password reset link has expired. Please request a new one.',
            expired: true,
          },
          { status: 400 }
        )
      )
    }

    // Use constant-time comparison to prevent timing attacks
    const tokenBuffer = Buffer.from(token)
    const storedBuffer = Buffer.from(resetToken.token)
    if (
      tokenBuffer.length !== storedBuffer.length ||
      !crypto.timingSafeEqual(tokenBuffer, storedBuffer)
    ) {
      return addSecurityHeaders(
        NextResponse.json(
          {
            error: 'Invalid reset link',
            message: 'This password reset link is invalid.',
          },
          { status: 400 }
        )
      )
    }

    // Hash the new password
    const newPasswordHash = await PasswordUtils.hash(password)

    // Update password and mark token as used in a transaction
    await prisma.$transaction(async (tx) => {
      // Update user's password
      await tx.users.update({
        where: { id: resetToken.userId },
        data: {
          passwordHash: newPasswordHash,
        },
      })

      // Mark the reset token as used
      await tx.password_reset_tokens.update({
        where: { id: resetToken.id },
        data: { used: true },
      })

      // Terminate all existing sessions for security
      // This forces re-login on all devices after password reset
      await tx.sessions.deleteMany({
        where: { userId: resetToken.userId },
      })
    })

    // Reset rate limit on successful password reset
    AuthRateLimit.resetRateLimit(`reset-password:${clientIP}`)

    // Track password reset event
    try {
      await prisma.analyticsEvent.create({
        data: {
          userId: resetToken.userId,
          eventType: 'security',
          eventName: 'password_reset_completed',
          properties: {
            method: 'email_link',
            allSessionsTerminated: true,
          },
          ipAddress: clientIP,
          userAgent: request.headers.get('user-agent'),
        },
      })
    } catch (analyticsError) {
      console.error('Analytics tracking error:', analyticsError)
    }

    console.log(`✅ Password reset completed for user ${resetToken.userId}`)

    return addSecurityHeaders(
      NextResponse.json({
        success: true,
        message: 'Password reset successfully! You can now sign in with your new password.',
        redirectUrl: '/sign-in',
      })
    )
  } catch (error) {
    console.error('Reset password error:', error)
    return addSecurityHeaders(
      NextResponse.json(
        {
          error: 'Internal server error',
          message: 'An unexpected error occurred. Please try again.',
        },
        { status: 500 }
      )
    )
  }
}

/**
 * GET /api/auth/reset-password?token=xxx
 * Validate reset token before showing reset form
 */
export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token')

  if (!token) {
    return addSecurityHeaders(
      NextResponse.json(
        {
          valid: false,
          error: 'Reset token is required',
        },
        { status: 400 }
      )
    )
  }

  try {
    // Find the reset token
    const resetToken = await prisma.password_reset_tokens.findUnique({
      where: { token },
      select: {
        id: true,
        email: true,
        expiresAt: true,
        used: true,
      },
    })

    if (!resetToken) {
      return addSecurityHeaders(
        NextResponse.json({
          valid: false,
          error: 'Invalid reset link',
          message: 'This password reset link is invalid or has already been used.',
        })
      )
    }

    if (resetToken.used) {
      return addSecurityHeaders(
        NextResponse.json({
          valid: false,
          error: 'Reset link already used',
          message: 'This password reset link has already been used.',
        })
      )
    }

    if (resetToken.expiresAt < new Date()) {
      return addSecurityHeaders(
        NextResponse.json({
          valid: false,
          error: 'Reset link expired',
          message: 'This password reset link has expired. Please request a new one.',
          expired: true,
        })
      )
    }

    // Token is valid - return masked email for confirmation
    const maskedEmail = resetToken.email.replace(
      /(.{2})(.*)(@.*)/,
      (_, start, middle, end) => start + '*'.repeat(Math.min(middle.length, 5)) + end
    )

    return addSecurityHeaders(
      NextResponse.json({
        valid: true,
        email: maskedEmail,
        expiresAt: resetToken.expiresAt.toISOString(),
        passwordRequirements: {
          minLength: 8,
          requireUppercase: true,
          requireLowercase: true,
          requireNumbers: true,
          requireSpecialChars: true,
        },
      })
    )
  } catch (error) {
    console.error('Token validation error:', error)
    return addSecurityHeaders(
      NextResponse.json(
        {
          valid: false,
          error: 'Failed to validate token',
        },
        { status: 500 }
      )
    )
  }
}

// OPTIONS for CORS preflight
export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin') || ''
  const allowedOrigins = [
    'https://cerebrumbiologyacademy.com',
    'https://www.cerebrumbiologyacademy.com',
    ...(process.env.NODE_ENV === 'development' ? ['http://localhost:3000'] : []),
  ]
  const corsOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0]

  return addSecurityHeaders(
    new NextResponse(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': corsOrigin,
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Credentials': 'true',
      },
    })
  )
}
