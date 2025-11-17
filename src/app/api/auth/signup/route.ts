import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import {
  PasswordUtils,
  SessionManager,
  CookieManager,
  addSecurityHeaders,
  AuthRateLimit,
} from '@/lib/auth/config'
import type { UserRole } from '@/generated/prisma'
import { z } from 'zod'

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

    const clientIP =
      request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'

    // Check rate limiting for signup attempts
    const rateLimitCheck = AuthRateLimit.checkRateLimit(`signup:${clientIP}`)
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
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: email.toLowerCase() }, ...(phone ? [{ phone }] : [])],
      },
    })

    if (existingUser) {
      if (existingUser.email === email.toLowerCase()) {
        return addSecurityHeaders(
          NextResponse.json(
            {
              error: 'Email already registered',
              message: 'An account with this email already exists. Please sign in instead.',
            },
            { status: 409 }
          )
        )
      }
      if (phone && existingUser.phone === phone) {
        return addSecurityHeaders(
          NextResponse.json(
            {
              error: 'Phone number already registered',
              message: 'An account with this phone number already exists.',
            },
            { status: 409 }
          )
        )
      }
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
    const user = await prisma.user.create({
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
      await prisma.analyticsEvent.create({
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

    // Prepare response
    const response = NextResponse.json({
      success: true,
      message: 'Account created successfully! Welcome to Cerebrum Biology Academy.',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        emailVerified: user.emailVerified,
        profile: user.profile,
      },
      accessToken,
      expiresIn: 15 * 60, // 15 minutes in seconds
      nextSteps: [
        'Complete your profile setup',
        'Verify your email address',
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
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  )
}
