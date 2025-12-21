import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import crypto from 'crypto'

export const runtime = 'nodejs'

// SECURITY: No fallback passwords - require env variable
const getAdminPassword = (): string | null => {
  const password = process.env.FREE_RESOURCES_ADMIN_PASSWORD
  if (!password) {
    if (process.env.NODE_ENV === 'production') {
      console.error('CRITICAL: FREE_RESOURCES_ADMIN_PASSWORD is required in production')
      return null
    }
    console.warn('[DEV] FREE_RESOURCES_ADMIN_PASSWORD not set - admin access disabled')
    return null
  }
  return password
}

const TOKEN_COOKIE_NAME = 'free_resources_admin_token'
const TOKEN_EXPIRY_HOURS = 2

// SECURITY: Use cryptographically secure token generation
function generateToken(): string {
  const timestamp = Date.now()
  const random = crypto.randomBytes(32).toString('hex')
  const tokenData = `${timestamp}:${random}`
  // Sign with HMAC for integrity
  const key = process.env.FREE_RESOURCES_ADMIN_PASSWORD || crypto.randomBytes(32).toString('hex')
  const signature = crypto.createHmac('sha256', key).update(tokenData).digest('hex')
  return Buffer.from(`${tokenData}:${signature}`).toString('base64')
}

// Verify token integrity
function verifyToken(token: string): { valid: boolean; timestamp?: number } {
  try {
    const key = process.env.FREE_RESOURCES_ADMIN_PASSWORD
    if (!key) return { valid: false }

    const decoded = Buffer.from(token, 'base64').toString('utf-8')
    const parts = decoded.split(':')
    if (parts.length !== 3) return { valid: false }

    const [timestamp, random, signature] = parts
    const tokenData = `${timestamp}:${random}`
    const expectedSignature = crypto.createHmac('sha256', key).update(tokenData).digest('hex')

    // Timing-safe comparison to prevent timing attacks
    const isValid = crypto.timingSafeEqual(
      Buffer.from(signature, 'hex'),
      Buffer.from(expectedSignature, 'hex')
    )

    return { valid: isValid, timestamp: parseInt(timestamp, 10) }
  } catch {
    return { valid: false }
  }
}

export async function POST(request: NextRequest) {
  try {
    const adminPassword = getAdminPassword()

    // If no password configured, deny access
    if (!adminPassword) {
      return NextResponse.json({ error: 'Admin access is not configured' }, { status: 503 })
    }

    const body = await request.json()
    const { password } = body

    if (!password) {
      return NextResponse.json({ error: 'Password is required' }, { status: 400 })
    }

    // Timing-safe password comparison
    let isValid = false
    try {
      if (password.length === adminPassword.length) {
        isValid = crypto.timingSafeEqual(Buffer.from(password), Buffer.from(adminPassword))
      }
    } catch {
      isValid = false
    }

    if (!isValid) {
      // Log failed attempt (redact password)
      console.warn(
        `Failed admin login attempt from ${request.headers.get('x-forwarded-for') || 'unknown'}`
      )
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }

    const token = generateToken()
    const cookieStore = await cookies()

    cookieStore.set(TOKEN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: TOKEN_EXPIRY_HOURS * 60 * 60,
      path: '/',
    })

    return NextResponse.json({
      success: true,
      message: 'Authentication successful',
      expiresIn: `${TOKEN_EXPIRY_HOURS} hours`,
    })
  } catch (error) {
    console.error('Error verifying password:', error)
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get(TOKEN_COOKIE_NAME)

    if (!token || !token.value) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    // Verify token signature and expiry
    const verification = verifyToken(token.value)

    if (!verification.valid) {
      cookieStore.delete(TOKEN_COOKIE_NAME)
      return NextResponse.json({ authenticated: false, reason: 'Invalid token' }, { status: 401 })
    }

    const now = Date.now()
    const expiryMs = TOKEN_EXPIRY_HOURS * 60 * 60 * 1000

    if (verification.timestamp && now - verification.timestamp > expiryMs) {
      cookieStore.delete(TOKEN_COOKIE_NAME)
      return NextResponse.json({ authenticated: false, reason: 'Token expired' }, { status: 401 })
    }

    return NextResponse.json({ authenticated: true })
  } catch (error) {
    console.error('Error checking authentication:', error)
    return NextResponse.json({ authenticated: false }, { status: 500 })
  }
}

export async function DELETE() {
  try {
    const cookieStore = await cookies()
    cookieStore.delete(TOKEN_COOKIE_NAME)
    return NextResponse.json({ success: true, message: 'Logged out successfully' })
  } catch (error) {
    console.error('Error logging out:', error)
    return NextResponse.json({ error: 'Logout failed' }, { status: 500 })
  }
}
