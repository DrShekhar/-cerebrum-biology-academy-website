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
  const isDev = process.env.NODE_ENV !== 'production'

  try {
    const cookieStore = await cookies()

    // Debug logging only in development
    if (isDev) {
      const allCookies = cookieStore.getAll()
      console.log('[Session API] Checking session, received cookies:', allCookies.map(c => c.name))
    }

    // Check for our Firebase auth session token
    // SECURITY: Check __Secure- prefixed cookie first (production)
    const sessionToken =
      cookieStore.get('__Secure-authjs.session-token')?.value ||
      cookieStore.get('authjs.session-token')?.value

    if (isDev) {
      console.log('[Session API] Session token found:', sessionToken ? 'yes' : 'no')
    }

    if (!sessionToken) {
      if (isDev) {
        console.log('[Session API] No session token found in cookies')
      }
      return NextResponse.json({
        authenticated: false,
        user: null
      })
    }

    if (isDev) {
      console.log('[Session API] Found session token, verifying...')
    }

    // Verify and decode the JWT
    const decoded = jwt.verify(sessionToken, getAuthSecret()) as FirebaseSessionPayload

    if (!decoded || !decoded.id) {
      return NextResponse.json({
        authenticated: false,
        user: null
      })
    }

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
    // Token invalid or expired - only log details in development
    if (isDev) {
      console.error('Session check error:', error)
    }
    return NextResponse.json({
      authenticated: false,
      user: null
    })
  }
}
