import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { validateUserSession, addSecurityHeaders, AuthRateLimit } from '@/lib/auth/config'
import { emailService } from '@/lib/email/emailService'
import crypto from 'crypto'

/**
 * POST /api/auth/send-verification-email
 * Send email verification link to user
 */
export async function POST(request: NextRequest) {
  const forwardedFor = request.headers.get('x-forwarded-for')
  const clientIP = forwardedFor
    ? forwardedFor.split(',')[0].trim()
    : request.headers.get('x-real-ip') || 'unknown'

  try {
    // Rate limit verification email requests
    const rateLimitCheck = await AuthRateLimit.checkRateLimit(`verify-email:${clientIP}`)
    if (!rateLimitCheck.allowed) {
      return addSecurityHeaders(
        NextResponse.json(
          {
            error: 'Too many verification requests',
            message: 'Please try again later',
            lockoutEndsAt: rateLimitCheck.lockoutEndsAt,
          },
          { status: 429 }
        )
      )
    }

    // Get email from request body (for resend) or from session
    const body = await request.json().catch(() => ({}))
    const { email: requestEmail } = body

    // Try to get user from session or by email
    let userId: string | null = null
    let email: string | null = null

    const session = await validateUserSession(request)
    if (session.valid && session.userId) {
      userId = session.userId
      // Get user's email from database
      const user = await prisma.users.findUnique({
        where: { id: userId },
        select: { email: true, emailVerified: true },
      })
      if (user) {
        email = user.email
        if (user.emailVerified) {
          return addSecurityHeaders(
            NextResponse.json({ error: 'Email already verified' }, { status: 400 })
          )
        }
      }
    } else if (requestEmail) {
      // Find user by email (for resend when not logged in)
      const user = await prisma.users.findUnique({
        where: { email: requestEmail.toLowerCase() },
        select: { id: true, email: true, emailVerified: true },
      })
      if (user) {
        userId = user.id
        email = user.email
        if (user.emailVerified) {
          return addSecurityHeaders(
            NextResponse.json({ error: 'Email already verified' }, { status: 400 })
          )
        }
      }
    }

    if (!userId || !email) {
      return addSecurityHeaders(
        NextResponse.json({ error: 'User not found or email not provided' }, { status: 400 })
      )
    }

    // Generate secure verification token
    const token = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

    // Delete any existing verification tokens for this user
    await prisma.email_verification_tokens.deleteMany({
      where: { userId },
    })

    // Create new verification token
    await prisma.email_verification_tokens.create({
      data: {
        userId,
        email,
        token,
        expiresAt,
      },
    })

    // Build verification URL
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://cerebrumbiologyacademy.com'
    const verificationUrl = `${appUrl}/auth/verify-email?token=${token}`

    // Send verification email
    const emailResult = await emailService.send({
      to: email,
      subject: 'Verify your email - Cerebrum Biology Academy',
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    <tr>
      <td style="padding: 40px 30px; text-align: center; background: linear-gradient(135deg, #16a34a 0%, #166534 100%);">
        <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Cerebrum Biology Academy</h1>
        <p style="color: #d1fae5; margin: 10px 0 0 0;">Verify Your Email Address</p>
      </td>
    </tr>
    <tr>
      <td style="padding: 40px 30px;">
        <h2 style="color: #1e293b; margin: 0 0 20px 0;">Welcome to Cerebrum Biology Academy!</h2>
        <p style="color: #475569; line-height: 1.6; margin: 0 0 20px 0;">
          Thank you for signing up! Please verify your email address to complete your registration and access all features.
        </p>
        <p style="color: #475569; line-height: 1.6; margin: 0 0 30px 0;">
          Click the button below to verify your email:
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" style="display: inline-block; background-color: #16a34a; color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: bold; font-size: 16px;">
            Verify Email Address
          </a>
        </div>
        <p style="color: #64748b; font-size: 14px; line-height: 1.6; margin: 30px 0 0 0;">
          If the button doesn't work, copy and paste this link into your browser:
        </p>
        <p style="color: #16a34a; font-size: 14px; word-break: break-all; margin: 10px 0;">
          ${verificationUrl}
        </p>
        <p style="color: #94a3b8; font-size: 12px; margin: 30px 0 0 0;">
          This link will expire in 24 hours. If you didn't create an account, you can safely ignore this email.
        </p>
      </td>
    </tr>
    <tr>
      <td style="padding: 30px; text-align: center; background-color: #f8fafc; border-top: 1px solid #e2e8f0;">
        <p style="color: #64748b; font-size: 14px; margin: 0;">
          Cerebrum Biology Academy<br>
          NEET Biology Excellence Since 2020
        </p>
        <p style="color: #94a3b8; font-size: 12px; margin: 15px 0 0 0;">
          support@cerebrumbiologyacademy.com | +91-8826444334
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
      text: `Welcome to Cerebrum Biology Academy!\n\nPlease verify your email address by clicking the link below:\n\n${verificationUrl}\n\nThis link will expire in 24 hours.\n\nIf you didn't create an account, you can safely ignore this email.`,
    })

    if (!emailResult.success) {
      console.error('Failed to send verification email:', emailResult.error)
      return addSecurityHeaders(
        NextResponse.json(
          { error: 'Failed to send verification email. Please try again.' },
          { status: 500 }
        )
      )
    }

    console.log(`✅ Verification email sent to ${email.slice(0, 3)}***@${email.split('@')[1]}`)

    return addSecurityHeaders(
      NextResponse.json({
        success: true,
        message: 'Verification email sent. Please check your inbox.',
      })
    )
  } catch (error) {
    console.error('Send verification email error:', error)
    return addSecurityHeaders(
      NextResponse.json({ error: 'Failed to send verification email' }, { status: 500 })
    )
  }
}
