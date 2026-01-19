import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import jwt from 'jsonwebtoken'
import { randomUUID } from 'crypto'
import { AuthRateLimit, addSecurityHeaders } from '@/lib/auth/config'

// SECURITY: Lazy-load secrets to prevent build-time errors
// Secrets are only required at runtime when actually processing requests
let _authSecret: string | null = null

/**
 * Detect if we're in a build-time context (Next.js build, not actual runtime)
 */
const isBuildTime = (): boolean => {
  return process.env.NEXT_PHASE === 'phase-production-build'
}

const getAuthSecret = (): string => {
  if (_authSecret) return _authSecret

  const secret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET
  if (!secret) {
    // Allow builds to proceed without secrets
    if (isBuildTime()) {
      return 'build-time-placeholder-not-for-actual-use'
    }

    // SECURITY: In production runtime, fail hard - never use fallback secrets
    if (process.env.NODE_ENV === 'production') {
      throw new Error(
        '[SECURITY CRITICAL] AUTH_SECRET/NEXTAUTH_SECRET environment variable is not configured. ' +
          'This is required for production. Set it in your deployment environment.'
      )
    }

    console.warn('[DEV] AUTH_SECRET not set - using development fallback')
    _authSecret = 'dev-only-secret-not-for-production-use'
    return _authSecret
  }
  _authSecret = secret
  return _authSecret
}

interface FirebaseSessionRequest {
  uid: string
  phoneNumber: string
  firstName?: string
  lastName?: string
  role?: 'student' | 'parent'
  action: 'check' | 'signup' | 'login'
}

export async function POST(request: NextRequest) {
  try {
    const body: FirebaseSessionRequest = await request.json()
    const { uid, phoneNumber, firstName, lastName, role, action } = body

    if (!uid || !phoneNumber) {
      return addSecurityHeaders(
        NextResponse.json({ error: 'Firebase UID and phone number are required' }, { status: 400 })
      )
    }

    // Rate limiting - prevent brute force attacks
    // NOTE: In serverless environments, in-memory rate limiting is per-instance
    // Consider using Redis (Upstash) for production distributed rate limiting
    const forwardedFor = request.headers.get('x-forwarded-for')
    const clientIP = forwardedFor
      ? forwardedFor.split(',')[0].trim()
      : request.headers.get('x-real-ip') || 'unknown'

    const rateLimitKey = `firebase-session:${clientIP}:${phoneNumber}`
    const rateLimitCheck = await AuthRateLimit.checkRateLimit(rateLimitKey)
    if (!rateLimitCheck.allowed) {
      console.warn(`[Firebase Session] Rate limit exceeded for ${rateLimitKey}`)
      return addSecurityHeaders(
        NextResponse.json(
          {
            error: 'Too many authentication attempts',
            message: 'Please wait a few minutes before trying again',
            lockoutEndsAt: rateLimitCheck.lockoutEndsAt,
          },
          { status: 429 }
        )
      )
    }

    // Normalize phone number to E.164 format
    const normalizedPhone = phoneNumber.startsWith('+')
      ? phoneNumber
      : `+91${phoneNumber.replace(/\D/g, '').slice(-10)}`

    // Action: Check if user exists
    if (action === 'check') {
      const existingUser = await prisma.users.findFirst({
        where: {
          OR: [{ phone: normalizedPhone }, { firebaseUid: uid }],
        },
      })

      // Reset rate limit on successful check
      AuthRateLimit.resetRateLimit(rateLimitKey)

      return addSecurityHeaders(
        NextResponse.json({
          userExists: !!existingUser,
          userId: existingUser?.id,
        })
      )
    }

    // Action: Create new user (signup)
    if (action === 'signup') {
      if (!firstName) {
        return addSecurityHeaders(
          NextResponse.json({ error: 'First name is required for signup' }, { status: 400 })
        )
      }

      // Check if user already exists
      const existingUser = await prisma.users.findFirst({
        where: {
          OR: [{ phone: normalizedPhone }, { firebaseUid: uid }],
        },
      })

      if (existingUser) {
        // User already exists, update Firebase UID if needed
        if (!existingUser.firebaseUid) {
          await prisma.users.update({
            where: { id: existingUser.id },
            data: { firebaseUid: uid },
          })
        }

        return addSecurityHeaders(
          NextResponse.json({
            success: true,
            userId: existingUser.id,
            message: 'User already exists',
          })
        )
      }

      // Create new user
      // Generate unique ID and placeholder email for phone-only users
      const userId = randomUUID()
      const placeholderEmail = `${normalizedPhone.replace('+', '')}@phone.cerebrum.local`

      // Set up 7-day master trial for new users
      const trialStartDate = new Date()
      const trialEndDate = new Date(trialStartDate)
      trialEndDate.setDate(trialEndDate.getDate() + 7)

      const newUser = await prisma.users.create({
        data: {
          id: userId,
          email: placeholderEmail,
          name: [firstName, lastName].filter(Boolean).join(' '),
          phone: normalizedPhone,
          firebaseUid: uid,
          role: role === 'parent' ? 'PARENT' : 'STUDENT',
          coachingTier: 'FREE',
          trialStartDate: trialStartDate,
          trialEndDate: trialEndDate,
          updatedAt: new Date(),
          profile: {
            firstName,
            lastName,
            signupMethod: 'firebase_phone',
          },
        },
      })

      // Reset rate limit on successful signup
      AuthRateLimit.resetRateLimit(rateLimitKey)

      if (process.env.NODE_ENV !== 'production') {
        console.log(`[Firebase Session] New user created: ${newUser.id}`)
      }

      return addSecurityHeaders(
        NextResponse.json({
          success: true,
          userId: newUser.id,
          coachingTier: newUser.coachingTier,
          trialStartDate: newUser.trialStartDate,
          trialEndDate: newUser.trialEndDate,
          message: 'User created successfully',
        })
      )
    }

    // Action: Create session (login)
    if (action === 'login') {
      // Find user by phone or Firebase UID
      let user = await prisma.users.findFirst({
        where: {
          OR: [{ phone: normalizedPhone }, { firebaseUid: uid }],
        },
      })

      if (!user) {
        return addSecurityHeaders(
          NextResponse.json({ error: 'User not found. Please sign up first.' }, { status: 404 })
        )
      }

      // Update Firebase UID if not set
      if (!user.firebaseUid) {
        user = await prisma.users.update({
          where: { id: user.id },
          data: { firebaseUid: uid },
        })
      }

      // Update last active timestamp
      await prisma.users.update({
        where: { id: user.id },
        data: { lastActiveAt: new Date() },
      })

      // Check if trial is still active
      const now = new Date()
      const isTrialActive = user.trialEndDate ? now < user.trialEndDate : false
      const trialDaysRemaining = user.trialEndDate
        ? Math.max(
            0,
            Math.ceil((user.trialEndDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
          )
        : 0

      // Create JWT token for NextAuth session
      const sessionToken = jwt.sign(
        {
          id: user.id,
          email: user.email || `${normalizedPhone.replace('+', '')}@phone.local`,
          name: user.name,
          role: user.role.toLowerCase(),
          phone: normalizedPhone,
          coachingTier: user.coachingTier,
          isTrialActive: isTrialActive,
          trialEndDate: user.trialEndDate?.toISOString(),
          sub: user.id,
        },
        getAuthSecret(),
        { expiresIn: '7d' }
      )

      // Set session cookie directly on the response object for maximum reliability
      // This ensures the Set-Cookie header is definitely included in the response
      const isProduction = process.env.NODE_ENV === 'production'
      const maxAge = 7 * 24 * 60 * 60 // 7 days in seconds

      // SECURITY: Use __Secure- prefix in production for enhanced cookie security
      // The __Secure- prefix tells browsers to only accept the cookie over HTTPS
      const cookieName = isProduction ? '__Secure-authjs.session-token' : 'authjs.session-token'

      // Create response first, then set cookie directly on it
      const response = NextResponse.json({
        success: true,
        userId: user.id,
        user: {
          id: user.id,
          name: user.name,
          role: user.role.toLowerCase(),
          phone: normalizedPhone,
          coachingTier: user.coachingTier,
          isTrialActive: isTrialActive,
          trialDaysRemaining: trialDaysRemaining,
          trialEndDate: user.trialEndDate,
        },
      })

      // Set cookie directly on the response object - most reliable method
      response.cookies.set(cookieName, sessionToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: 'lax',
        path: '/',
        maxAge: maxAge,
      })

      // Reset rate limit on successful login
      AuthRateLimit.resetRateLimit(rateLimitKey)

      if (process.env.NODE_ENV !== 'production') {
        console.log(`[Firebase Session] User logged in: ${user.id}`)
        console.log(`[Firebase Session] Cookie '${cookieName}' set on response`)
      }

      return addSecurityHeaders(response)
    }

    return addSecurityHeaders(NextResponse.json({ error: 'Invalid action' }, { status: 400 }))
  } catch (error) {
    // Detailed error logging for debugging
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    const errorStack = error instanceof Error ? error.stack : undefined

    console.error('[Firebase Session] Error processing request:', {
      message: errorMessage,
      stack: errorStack,
      timestamp: new Date().toISOString(),
    })

    // Provide user-friendly error messages (never expose technical details to users)
    let userMessage = 'Something went wrong. Please try again in a moment.'
    let statusCode = 500

    if (errorMessage.includes('Unique constraint')) {
      userMessage = 'This phone number is already registered. Please try logging in instead.'
      statusCode = 409
    } else if (
      errorMessage.includes('Connection') ||
      errorMessage.includes('timeout') ||
      errorMessage.includes('ETIMEDOUT')
    ) {
      userMessage = 'We are experiencing connection issues. Please try again in a moment.'
      statusCode = 503
    } else if (
      errorMessage.includes('does not exist') ||
      errorMessage.includes('column') ||
      errorMessage.includes('prisma')
    ) {
      // Database schema mismatch - don't expose to users
      userMessage = 'We are updating our systems. Please try again in a few minutes.'
      statusCode = 503
    } else if (errorMessage.includes('rate limit') || errorMessage.includes('too many')) {
      userMessage = 'Too many attempts. Please wait a few minutes before trying again.'
      statusCode = 429
    }

    return addSecurityHeaders(
      NextResponse.json(
        {
          error: userMessage,
        },
        { status: statusCode }
      )
    )
  }
}
