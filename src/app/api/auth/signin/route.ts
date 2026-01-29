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
import { logLogin, logFailedLogin } from '@/lib/security/auditLogger'

// Request validation schema
const SignInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional().default(false),
})

// CSRF validation helper
function validateCSRF(request: NextRequest): boolean {
  // Skip CSRF for same-origin requests (checked via referer/origin)
  const origin = request.headers.get('origin')
  const referer = request.headers.get('referer')

  const allowedOrigins = [
    'https://cerebrumbiologyacademy.com',
    'https://www.cerebrumbiologyacademy.com',
    process.env.NEXT_PUBLIC_APP_URL,
    process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '',
  ].filter(Boolean)

  // Origin header is more reliable than referer
  if (origin) {
    return allowedOrigins.some((allowed) => origin.startsWith(allowed || ''))
  }

  // Fall back to referer if origin not present
  if (referer) {
    return allowedOrigins.some((allowed) => referer.startsWith(allowed || ''))
  }

  // Reject if no origin/referer (could be direct API call from attacker)
  return false
}

/**
 * POST /api/auth/signin
 * User login with credentials
 */
export async function POST(request: NextRequest) {
  // Parse first IP from x-forwarded-for to prevent IP spoofing attacks
  const forwardedFor = request.headers.get('x-forwarded-for')
  const clientIP = forwardedFor
    ? forwardedFor.split(',')[0].trim()
    : request.headers.get('x-real-ip') || 'unknown'
  const userAgent = request.headers.get('user-agent') || 'unknown'

  try {
    // CSRF validation - reject cross-origin requests
    if (!validateCSRF(request)) {
      return addSecurityHeaders(
        NextResponse.json(
          {
            error: 'Invalid request origin',
            message: 'Cross-origin requests are not allowed',
          },
          { status: 403 }
        )
      )
    }

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

    // Check rate limiting
    const rateLimitCheck = await AuthRateLimit.checkRateLimit(`signin:${clientIP}:${email}`)
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
    const user = await prisma.users.findUnique({
      where: { email: email.toLowerCase() },
    })

    if (!user || !user.passwordHash) {
      // Log failed login attempt - don't reveal whether user exists
      logFailedLogin(email, clientIP, userAgent, 'user_not_found')
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
      // Log failed login attempt
      logFailedLogin(email, clientIP, userAgent, 'invalid_password')
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

    // SECURITY (2026-01-28): Email verification is REQUIRED by default
    // Set SKIP_EMAIL_VERIFICATION=true only in development to bypass this check
    const skipEmailVerification = process.env.SKIP_EMAIL_VERIFICATION === 'true'
    if (!user.emailVerified && !skipEmailVerification) {
      // Log attempt to sign in with unverified email
      console.warn(
        `[SECURITY] Sign-in attempt with unverified email: ${email.slice(0, 3)}***@${email.split('@')[1]} from IP: ${clientIP}`
      )
      return addSecurityHeaders(
        NextResponse.json(
          {
            error: 'Email not verified',
            message: 'Please verify your email address before signing in. Check your inbox for a verification link.',
            requiresVerification: true,
            email: email, // Return email so frontend can offer to resend verification
          },
          { status: 403 }
        )
      )
    }

    // Create new session
    const { accessToken, refreshToken, sessionId } = await SessionManager.createSession(user)

    // Reset rate limit on successful login
    AuthRateLimit.resetRateLimit(`signin:${clientIP}:${email}`)

    // Log successful login to audit trail
    logLogin(user.email, user.role, clientIP, userAgent)

    // Create response WITHOUT accessToken in body (security: only use httpOnly cookies)
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
  const origin = request.headers.get('origin') || ''
  const allowedOrigins = [
    'https://cerebrumbiologyacademy.com',
    'https://www.cerebrumbiologyacademy.com',
    process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '',
  ].filter(Boolean)

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
