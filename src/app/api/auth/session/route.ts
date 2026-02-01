import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import * as jwt from 'jsonwebtoken'

// SECURITY: Lazy-load secrets to prevent build-time errors in CI
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

interface FirebaseSessionPayload {
  id: string
  email: string
  name?: string
  role: string
  phone?: string
  grade?: string
  sub: string
  iat?: number
  exp?: number
}

export async function GET(request: NextRequest) {
  const requestId = `sess_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`
  const startTime = Date.now()

  try {
    const cookieStore = await cookies()
    const allCookies = cookieStore.getAll()

    // Always log session checks for debugging auth issues
    console.log(`[Session API][${requestId}] Checking session:`, {
      cookieCount: allCookies.length,
      cookieNames: allCookies.map((c) => c.name),
      hasSecureCookie: allCookies.some((c) => c.name === '__Secure-authjs.session-token'),
      hasNonSecureCookie: allCookies.some((c) => c.name === 'authjs.session-token'),
      hasSecureNextAuthCookie: allCookies.some(
        (c) => c.name === '__Secure-next-auth.session-token'
      ),
      hasNextAuthCookie: allCookies.some((c) => c.name === 'next-auth.session-token'),
      hasCustomJwtCookie: allCookies.some((c) => c.name === 'auth-token'),
    })

    // Check for session token - check all cookie variants for consistency
    // Priority: Secure prefixed (production) > standard (development) > legacy NextAuth > custom JWT
    const secureToken = cookieStore.get('__Secure-authjs.session-token')?.value
    const nonSecureToken = cookieStore.get('authjs.session-token')?.value
    const secureNextAuthToken = cookieStore.get('__Secure-next-auth.session-token')?.value
    const nextAuthToken = cookieStore.get('next-auth.session-token')?.value
    const customJwtToken = cookieStore.get('auth-token')?.value

    const sessionToken =
      secureToken || nonSecureToken || secureNextAuthToken || nextAuthToken || customJwtToken

    const tokenType = secureToken
      ? 'secure'
      : nonSecureToken
        ? 'non-secure'
        : secureNextAuthToken
          ? 'secure-nextauth'
          : nextAuthToken
            ? 'nextauth'
            : customJwtToken
              ? 'custom-jwt'
              : 'none'

    console.log(`[Session API][${requestId}] Token status:`, {
      hasSecureToken: !!secureToken,
      hasNonSecureToken: !!nonSecureToken,
      hasSecureNextAuthToken: !!secureNextAuthToken,
      hasNextAuthToken: !!nextAuthToken,
      hasCustomJwtToken: !!customJwtToken,
      usingToken: tokenType,
      tokenLength: sessionToken?.length || 0,
      tokenPreview: sessionToken ? `${sessionToken.substring(0, 20)}...` : 'none',
    })

    if (!sessionToken) {
      console.log(`[Session API][${requestId}] No session token found - returning unauthenticated`)
      return NextResponse.json({
        authenticated: false,
        user: null,
        debug: {
          reason: 'no_token',
          cookiesReceived: allCookies.map((c) => c.name),
        },
      })
    }

    // Verify and decode the JWT
    const authSecret = getAuthSecret()
    console.log(`[Session API][${requestId}] Verifying JWT token...`, {
      secretLength: authSecret.length,
      secretPrefix: authSecret.substring(0, 4) + '...',
    })
    const decoded = jwt.verify(sessionToken, authSecret) as FirebaseSessionPayload

    if (!decoded || !decoded.id) {
      console.warn(`[Session API][${requestId}] Token decoded but missing user ID`)
      return NextResponse.json({
        authenticated: false,
        user: null,
        debug: { reason: 'invalid_payload' },
      })
    }

    const elapsed = Date.now() - startTime
    console.log(`[Session API][${requestId}] Session verified successfully:`, {
      userId: decoded.id,
      role: decoded.role,
      elapsed: `${elapsed}ms`,
      tokenExp: decoded.exp ? new Date(decoded.exp * 1000).toISOString() : 'unknown',
    })

    return NextResponse.json({
      authenticated: true,
      user: {
        id: decoded.id,
        email: decoded.email,
        name: decoded.name,
        role: decoded.role,
        phone: decoded.phone,
        grade: decoded.grade,
      },
    })
  } catch (error) {
    const elapsed = Date.now() - startTime
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'

    // Determine specific error type
    let reason = 'verification_failed'
    if (errorMessage.includes('expired')) {
      reason = 'token_expired'
    } else if (errorMessage.includes('invalid signature')) {
      reason = 'invalid_signature'
    } else if (errorMessage.includes('malformed')) {
      reason = 'token_malformed'
    } else if (errorMessage.includes('jwt must be provided')) {
      reason = 'no_token'
    }

    // Always log session errors for debugging
    console.error(`[Session API][${requestId}] Session verification failed:`, {
      error: errorMessage,
      reason,
      elapsed: `${elapsed}ms`,
    })

    return NextResponse.json({
      authenticated: false,
      user: null,
      debug: {
        reason,
        error: process.env.NODE_ENV !== 'production' ? errorMessage : undefined,
      },
    })
  }
}
