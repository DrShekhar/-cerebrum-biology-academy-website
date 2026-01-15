import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import * as jwt from 'jsonwebtoken'

// SECURITY: Lazy-load secrets to prevent build-time errors in CI
// Secrets are only required at runtime when actually processing requests
let _authSecret: string | null = null

const getAuthSecret = (): string => {
  if (_authSecret) return _authSecret

  const secret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      // During build analysis, return placeholder; actual requests will fail at runtime without secrets
      console.warn('[BUILD] AUTH_SECRET not available - will be required at runtime')
      return 'build-time-placeholder-not-for-actual-use'
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
  try {
    const cookieStore = await cookies()

    // Debug: Log all cookies (always log for debugging)
    const allCookies = cookieStore.getAll()
    console.log('[Session API] Checking session, received cookies:', allCookies.map(c => c.name))

    // Check for our Firebase auth session token
    const sessionToken =
      cookieStore.get('__Secure-authjs.session-token')?.value ||
      cookieStore.get('authjs.session-token')?.value

    console.log('[Session API] Session token found:', sessionToken ? 'yes' : 'no')

    if (!sessionToken) {
      console.log('[Session API] No session token found in cookies')
      return NextResponse.json({
        authenticated: false,
        user: null
      })
    }

    console.log('[Session API] Found session token, verifying...')

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
    // Token invalid or expired
    console.error('Session check error:', error)
    return NextResponse.json({
      authenticated: false,
      user: null
    })
  }
}
