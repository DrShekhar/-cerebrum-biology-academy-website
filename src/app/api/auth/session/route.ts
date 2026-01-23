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
      cookieNames: allCookies.map(c => c.name),
      hasSecureCookie: allCookies.some(c => c.name === '__Secure-authjs.session-token'),
      hasNonSecureCookie: allCookies.some(c => c.name === 'authjs.session-token'),
    })

    // Check for our Firebase auth session token
    // SECURITY: Check __Secure- prefixed cookie first (production)
    const secureToken = cookieStore.get('__Secure-authjs.session-token')?.value
    const nonSecureToken = cookieStore.get('authjs.session-token')?.value
    const sessionToken = secureToken || nonSecureToken

    console.log(`[Session API][${requestId}] Token status:`, {
      hasSecureToken: !!secureToken,
      hasNonSecureToken: !!nonSecureToken,
      usingToken: secureToken ? 'secure' : nonSecureToken ? 'non-secure' : 'none',
      tokenLength: sessionToken?.length || 0,
    })

    if (!sessionToken) {
      console.log(`[Session API][${requestId}] No session token found - returning unauthenticated`)
      return NextResponse.json({
        authenticated: false,
        user: null,
        debug: {
          reason: 'no_token',
          cookiesReceived: allCookies.map(c => c.name),
        }
      })
    }

    // Verify and decode the JWT
    console.log(`[Session API][${requestId}] Verifying JWT token...`)
    const decoded = jwt.verify(sessionToken, getAuthSecret()) as FirebaseSessionPayload

    if (!decoded || !decoded.id) {
      console.warn(`[Session API][${requestId}] Token decoded but missing user ID`)
      return NextResponse.json({
        authenticated: false,
        user: null,
        debug: { reason: 'invalid_payload' }
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
      }
    })
  } catch (error) {
    const elapsed = Date.now() - startTime
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'

    // Always log session errors for debugging
    console.error(`[Session API][${requestId}] Session verification failed:`, {
      error: errorMessage,
      elapsed: `${elapsed}ms`,
      isExpired: errorMessage.includes('expired'),
      isInvalid: errorMessage.includes('invalid') || errorMessage.includes('malformed'),
    })

    return NextResponse.json({
      authenticated: false,
      user: null,
      debug: {
        reason: errorMessage.includes('expired') ? 'token_expired' : 'verification_failed',
        error: process.env.NODE_ENV !== 'production' ? errorMessage : undefined,
      }
    })
  }
}
