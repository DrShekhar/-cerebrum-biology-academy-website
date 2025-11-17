import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import {
  PasswordUtils,
  SessionManager,
  CookieManager,
  addSecurityHeaders,
  AuthRateLimit,
} from '@/lib/auth/config'
import { z } from 'zod'

// Request validation schema
const SignInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional().default(false),
})

/**
 * POST /api/auth/signin
 * User login with credentials
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json()
    const result = SignInSchema.safeParse(body)

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

    const { email, password, rememberMe } = result.data
    const clientIP =
      request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'

    // Check rate limiting
    const rateLimitCheck = AuthRateLimit.checkRateLimit(`signin:${clientIP}:${email}`)
    if (!rateLimitCheck.allowed) {
      return addSecurityHeaders(
        NextResponse.json(
          {
            error: 'Too many login attempts',
            message: 'Please try again later',
            lockoutEndsAt: rateLimitCheck.lockoutEndsAt,
          },
          { status: 429 }
        )
      )
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    })

    if (!user || !user.passwordHash) {
      // Don't reveal whether user exists
      return addSecurityHeaders(
        NextResponse.json(
          {
            error: 'Invalid credentials',
            message: 'Email or password is incorrect',
          },
          { status: 401 }
        )
      )
    }

    // Verify password
    const isPasswordValid = await PasswordUtils.verify(password, user.passwordHash)
    if (!isPasswordValid) {
      return addSecurityHeaders(
        NextResponse.json(
          {
            error: 'Invalid credentials',
            message: 'Email or password is incorrect',
          },
          { status: 401 }
        )
      )
    }

    // Check if email is verified (optional based on your flow)
    if (!user.emailVerified && process.env.REQUIRE_EMAIL_VERIFICATION === 'true') {
      return addSecurityHeaders(
        NextResponse.json(
          {
            error: 'Email not verified',
            message: 'Please verify your email address before signing in',
            requiresVerification: true,
          },
          { status: 403 }
        )
      )
    }

    // Create new session
    const { accessToken, refreshToken, sessionId } = await SessionManager.createSession(user)

    // Reset rate limit on successful login
    AuthRateLimit.resetRateLimit(`signin:${clientIP}:${email}`)

    // Create response with tokens
    const response = NextResponse.json({
      success: true,
      message: 'Signed in successfully',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        emailVerified: user.emailVerified,
        profile: user.profile,
      },
      accessToken, // For client-side usage if needed
      expiresIn: 15 * 60, // 15 minutes in seconds
    })

    // Set HTTP-only cookies
    CookieManager.setAuthCookies(response, accessToken, refreshToken)

    // Add security headers
    return addSecurityHeaders(response)
  } catch (error) {
    console.error('Signin error:', error)
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
 * GET /api/auth/signin
 * Get signin page metadata (for better SEO)
 */
export async function GET() {
  return addSecurityHeaders(
    NextResponse.json({
      title: 'Sign In - Cerebrum Biology Academy',
      description: 'Sign in to access your personalized biology learning dashboard',
      features: [
        'Access personalized test analytics',
        'Track your learning progress',
        'Get AI-powered study recommendations',
        'Join our student community',
      ],
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
