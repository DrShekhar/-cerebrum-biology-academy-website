import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { addSecurityHeaders, AuthRateLimit } from '@/lib/auth/config'
import { z } from 'zod'
import crypto from 'crypto'
import { emailService } from '@/lib/email/emailService'

// Request validation schema
const ForgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
})

/**
 * POST /api/auth/forgot-password
 * Request password reset - sends email with reset link
 */
export async function POST(request: NextRequest) {
  const forwardedFor = request.headers.get('x-forwarded-for')
  const clientIP = forwardedFor
    ? forwardedFor.split(',')[0].trim()
    : request.headers.get('x-real-ip') || 'unknown'

  try {
    // Rate limit password reset requests
    const rateLimitCheck = await AuthRateLimit.checkRateLimit(`forgot-password:${clientIP}`)
    if (!rateLimitCheck.allowed) {
      return addSecurityHeaders(
        NextResponse.json(
          {
            error: 'Too many password reset requests',
            message: 'Please try again later',
            lockoutEndsAt: rateLimitCheck.lockoutEndsAt,
          },
          { status: 429 }
        )
      )
    }

    // Parse request body
    const body = await request.json()
    const result = ForgotPasswordSchema.safeParse(body)

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

    const { email } = result.data
    const normalizedEmail = email.toLowerCase()

    // Find user by email
    const user = await prisma.users.findUnique({
      where: { email: normalizedEmail },
    })

    // SECURITY: Always return success message to prevent email enumeration
    // Even if user doesn't exist, we don't reveal that information
    const successResponse = {
      success: true,
      message:
        'If an account with that email exists, we have sent a password reset link. Please check your inbox and spam folder.',
    }

    if (!user) {
      // Log for security monitoring but don't reveal to user
      console.log(
        `[SECURITY] Password reset requested for non-existent email: ${normalizedEmail.slice(0, 3)}***@${normalizedEmail.split('@')[1]} from IP: ${clientIP}`
      )
      // Return same success message to prevent enumeration
      return addSecurityHeaders(NextResponse.json(successResponse))
    }

    // Check for existing non-expired, unused reset tokens
    const existingToken = await prisma.password_reset_tokens.findFirst({
      where: {
        userId: user.id,
        used: false,
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: 'desc' },
    })

    // If token exists and was created less than 2 minutes ago, don't create new one
    if (existingToken && Date.now() - existingToken.createdAt.getTime() < 2 * 60 * 1000) {
      console.log(
        `[SECURITY] Password reset requested too soon for user: ${user.id} from IP: ${clientIP}`
      )
      return addSecurityHeaders(NextResponse.json(successResponse))
    }

    // Invalidate any existing unused tokens for this user
    await prisma.password_reset_tokens.updateMany({
      where: {
        userId: user.id,
        used: false,
      },
      data: {
        used: true,
      },
    })

    // Generate secure reset token
    const resetToken = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000) // 1 hour expiry

    // Store reset token
    await prisma.password_reset_tokens.create({
      data: {
        userId: user.id,
        email: normalizedEmail,
        token: resetToken,
        expiresAt,
      },
    })

    // Build reset URL
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://cerebrumbiologyacademy.com'
    const resetUrl = `${appUrl}/auth/reset-password?token=${resetToken}`

    // Send password reset email
    const emailResult = await emailService.send({
      to: normalizedEmail,
      subject: 'Reset Your Password - Cerebrum Biology Academy',
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    <tr>
      <td style="padding: 40px 30px; text-align: center; background: linear-gradient(135deg, #16a34a 0%, #166534 100%);">
        <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Cerebrum Biology Academy</h1>
        <p style="color: #d1fae5; margin: 10px 0 0 0;">Password Reset Request</p>
      </td>
    </tr>
    <tr>
      <td style="padding: 40px 30px;">
        <h2 style="color: #1e293b; margin: 0 0 20px 0;">Hi ${user.name || 'there'},</h2>
        <p style="color: #475569; line-height: 1.6; margin: 0 0 20px 0;">
          We received a request to reset your password for your Cerebrum Biology Academy account. Click the button below to create a new password.
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="display: inline-block; background-color: #16a34a; color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: bold; font-size: 16px;">
            Reset Password
          </a>
        </div>
        <p style="color: #64748b; font-size: 14px; line-height: 1.6; margin: 30px 0 0 0;">
          If the button doesn't work, copy and paste this link into your browser:
        </p>
        <p style="color: #16a34a; font-size: 14px; word-break: break-all; margin: 10px 0;">
          ${resetUrl}
        </p>
        <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 30px 0;">
          <p style="color: #92400e; font-size: 14px; margin: 0;">
            <strong>Security Notice:</strong> This link will expire in 1 hour. If you didn't request this password reset, please ignore this email or contact support if you have concerns.
          </p>
        </div>
        <p style="color: #94a3b8; font-size: 12px; margin: 30px 0 0 0;">
          For security reasons, this password reset link can only be used once.
        </p>
      </td>
    </tr>
    <tr>
      <td style="padding: 30px; text-align: center; background-color: #f8fafc; border-top: 1px solid #e2e8f0;">
        <p style="color: #64748b; font-size: 14px; margin: 0;">
          Cerebrum Biology Academy - NEET Biology Excellence Since 2020
        </p>
        <p style="color: #94a3b8; font-size: 12px; margin: 10px 0 0 0;">
          If you have any questions, contact us at support@cerebrumbiologyacademy.com
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
      text: `Hi ${user.name || 'there'},

We received a request to reset your password for your Cerebrum Biology Academy account.

Click this link to reset your password:
${resetUrl}

This link will expire in 1 hour.

If you didn't request this password reset, please ignore this email.

- Cerebrum Biology Academy Team`,
    })

    if (!emailResult.success) {
      console.error('Failed to send password reset email:', emailResult.error)
      // Still return success to prevent enumeration, but log the error
    } else {
      console.log(`✅ Password reset email sent to user ${user.id}`)
    }

    // Track password reset request (without revealing user existence)
    try {
      await prisma.analyticsEvent.create({
        data: {
          userId: user.id,
          eventType: 'security',
          eventName: 'password_reset_requested',
          properties: {
            emailSent: emailResult.success,
          },
          ipAddress: clientIP,
          userAgent: request.headers.get('user-agent'),
        },
      })
    } catch (analyticsError) {
      console.error('Analytics tracking error:', analyticsError)
    }

    return addSecurityHeaders(NextResponse.json(successResponse))
  } catch (error) {
    console.error('Forgot password error:', error)
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
 * GET /api/auth/forgot-password
 * Get forgot password page metadata
 */
export async function GET() {
  return addSecurityHeaders(
    NextResponse.json({
      title: 'Forgot Password - Cerebrum Biology Academy',
      description: 'Reset your password to regain access to your account',
      instructions: [
        'Enter the email address associated with your account',
        'We will send you a password reset link',
        'The link will expire in 1 hour',
        'Check your spam folder if you do not receive the email',
      ],
    })
  )
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
