import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import {
  PasswordUtils,
  SessionManager,
  CookieManager,
  addSecurityHeaders,
  getCorsOrigin,
  AuthRateLimit,
} from '@/lib/auth/config'
import type { UserRole } from '@/generated/prisma'
import { z } from 'zod'
import crypto from 'crypto'
import { emailService } from '@/lib/email/emailService'

// Request validation schema
const SignUpSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  phone: z.string().optional(),
  role: z.enum(['STUDENT', 'PARENT']).default('STUDENT'),
  grade: z.string().optional(),
  curriculum: z.enum(['NEET', 'CBSE', 'ICSE', 'IB', 'IGCSE', 'STATE_BOARD']).optional(),
  school: z.string().optional(),
  city: z.string().optional(),
  agreeToTerms: z
    .boolean()
    .refine((val) => val === true, 'You must agree to the terms and conditions'),
  subscribeNewsletter: z.boolean().optional().default(false),
})

/**
 * POST /api/auth/signup
 * Student registration
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json()
    const result = SignUpSchema.safeParse(body)

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

    const {
      name,
      email,
      password,
      phone,
      role,
      grade,
      curriculum,
      school,
      city,
      agreeToTerms,
      subscribeNewsletter,
    } = result.data

    // Parse first IP from x-forwarded-for to prevent IP spoofing attacks
    const forwardedFor = request.headers.get('x-forwarded-for')
    const clientIP = forwardedFor
      ? forwardedFor.split(',')[0].trim()
      : request.headers.get('x-real-ip') || 'unknown'

    // Check rate limiting for signup attempts
    const rateLimitCheck = await AuthRateLimit.checkRateLimit(`signup:${clientIP}`)
    if (!rateLimitCheck.allowed) {
      return addSecurityHeaders(
        NextResponse.json(
          {
            error: 'Too many signup attempts',
            message: 'Please try again later',
            lockoutEndsAt: rateLimitCheck.lockoutEndsAt,
          },
          { status: 429 }
        )
      )
    }

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

    // Check if user already exists
    // SECURITY: Use generic error message to prevent email/phone enumeration attacks
    const existingUser = await prisma.users.findFirst({
      where: {
        OR: [{ email: email.toLowerCase() }, ...(phone ? [{ phone }] : [])],
      },
    })

    if (existingUser) {
      // Return generic message - don't reveal which field already exists
      return addSecurityHeaders(
        NextResponse.json(
          {
            error: 'Registration failed',
            message:
              'Unable to create account. If you already have an account, please sign in instead.',
          },
          { status: 409 }
        )
      )
    }

    // Hash password
    const passwordHash = await PasswordUtils.hash(password)

    // Create user profile data
    const profile = {
      grade,
      curriculum,
      school,
      city,
      subscribeNewsletter,
      registrationSource: 'website',
      onboardingCompleted: false,
      preferences: {
        notifications: {
          email: subscribeNewsletter,
          sms: false,
          push: false,
        },
        privacy: {
          profileVisible: false,
          progressVisible: true,
        },
      },
    }

    // Create new user
    const user = await prisma.users.create({
      data: {
        name,
        email: email.toLowerCase(),
        phone,
        role: role as UserRole,
        passwordHash,
        profile,
        emailVerified: null, // Will be set after email verification
        phoneVerified: null,
      },
    })

    // Create initial session
    const { accessToken, refreshToken, sessionId } = await SessionManager.createSession(user)

    // Reset rate limit on successful signup
    AuthRateLimit.resetRateLimit(`signup:${clientIP}`)

    // Track analytics event (you can implement this later)
    try {
      await prisma.analytics_events.create({
        data: {
          userId: user.id,
          eventType: 'auth',
          eventName: 'user_registered',
          properties: {
            role: user.role,
            grade,
            curriculum,
            registrationSource: 'website',
          },
          ipAddress: clientIP,
          userAgent: request.headers.get('user-agent'),
        },
      })
    } catch (analyticsError) {
      // Don't fail registration if analytics fails
      console.error('Analytics tracking error:', analyticsError)
    }

    // Send verification email
    let verificationEmailSent = false
    try {
      // Generate secure verification token
      const verificationToken = crypto.randomBytes(32).toString('hex')
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

      // Store verification token
      await prisma.email_verification_tokens.create({
        data: {
          userId: user.id,
          email: user.email,
          token: verificationToken,
          expiresAt,
        },
      })

      // Build verification URL
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://cerebrumbiologyacademy.com'
      const verificationUrl = `${appUrl}/auth/verify-email?token=${verificationToken}`

      // Send verification email
      const emailResult = await emailService.send({
        to: user.email,
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
        <h2 style="color: #1e293b; margin: 0 0 20px 0;">Welcome, ${user.name}!</h2>
        <p style="color: #475569; line-height: 1.6; margin: 0 0 20px 0;">
          Thank you for joining Cerebrum Biology Academy! Please verify your email address to complete your registration and start your NEET preparation journey.
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
          This link will expire in 24 hours.
        </p>
      </td>
    </tr>
    <tr>
      <td style="padding: 30px; text-align: center; background-color: #f8fafc; border-top: 1px solid #e2e8f0;">
        <p style="color: #64748b; font-size: 14px; margin: 0;">
          Cerebrum Biology Academy - NEET Biology Excellence Since 2020
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
        `,
        text: `Welcome to Cerebrum Biology Academy, ${user.name}!\n\nPlease verify your email address by clicking the link below:\n\n${verificationUrl}\n\nThis link will expire in 24 hours.`,
      })

      verificationEmailSent = emailResult.success
      if (!emailResult.success) {
        console.error('Failed to send verification email:', emailResult.error)
      }
    } catch (verificationError) {
      // Don't fail registration if verification email fails
      console.error('Verification email error:', verificationError)
    }

    // Prepare response WITHOUT accessToken in body (security: only use httpOnly cookies)
    const response = NextResponse.json({
      success: true,
      message: verificationEmailSent
        ? 'Account created successfully! Please check your email to verify your account.'
        : 'Account created successfully! Welcome to Cerebrum Biology Academy.',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        emailVerified: user.emailVerified,
        profile: user.profile,
      },
      verificationEmailSent,
      requiresEmailVerification: true,
      expiresIn: 15 * 60, // 15 minutes in seconds
      nextSteps: [
        'Verify your email address (check your inbox)',
        'Complete your profile setup',
        'Take your first diagnostic test',
        'Explore our study materials',
      ],
    })

    // Set HTTP-only cookies
    CookieManager.setAuthCookies(response, accessToken, refreshToken)

    // Add security headers
    return addSecurityHeaders(response)
  } catch (error) {
    console.error('Signup error:', error)

    // Handle specific Prisma errors
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return addSecurityHeaders(
        NextResponse.json(
          {
            error: 'Account already exists',
            message: 'An account with this information already exists.',
          },
          { status: 409 }
        )
      )
    }

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
 * GET /api/auth/signup
 * Get signup page metadata and configuration
 */
export async function GET() {
  return addSecurityHeaders(
    NextResponse.json({
      title: 'Join Cerebrum Biology Academy',
      description: 'Create your account to start your biology learning journey',
      features: [
        'Personalized AI-powered study plans',
        'Access to 10,000+ NEET questions',
        'Real-time progress tracking',
        'Expert teacher support',
        'Interactive study community',
      ],
      supportedGrades: ['CLASS_9', 'CLASS_10', 'CLASS_11', 'CLASS_12', 'DROPPER'],
      supportedCurricula: ['NEET', 'CBSE', 'ICSE', 'IB', 'IGCSE', 'STATE_BOARD'],
      passwordRequirements: {
        minLength: 8,
        requireUppercase: true,
        requireLowercase: true,
        requireNumbers: true,
        requireSpecialChars: true,
      },
    })
  )
}

// OPTIONS for CORS preflight
export async function OPTIONS(request: NextRequest) {
  return addSecurityHeaders(
    new NextResponse(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': getCorsOrigin(request),
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Credentials': 'true',
      },
    })
  )
}
