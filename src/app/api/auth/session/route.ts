import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import * as jwt from 'jsonwebtoken'

// SECURITY: No fallback in production - secrets are required
const getAuthSecret = () => {
  const secret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('CRITICAL: AUTH_SECRET or NEXTAUTH_SECRET is required in production')
    }
    return 'dev-only-secret-not-for-production-use'
  }
  return secret
}
const AUTH_SECRET = getAuthSecret()

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
    const decoded = jwt.verify(sessionToken, AUTH_SECRET) as FirebaseSessionPayload

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
