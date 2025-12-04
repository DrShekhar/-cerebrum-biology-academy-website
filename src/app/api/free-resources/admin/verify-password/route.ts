import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export const runtime = 'nodejs'

const ADMIN_PASSWORD = process.env.FREE_RESOURCES_ADMIN_PASSWORD || 'cerebrum2024'
const TOKEN_COOKIE_NAME = 'free_resources_admin_token'
const TOKEN_EXPIRY_HOURS = 2

function generateToken(): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 15)
  return Buffer.from(`${timestamp}:${random}`).toString('base64')
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { password } = body

    if (!password) {
      return NextResponse.json({ error: 'Password is required' }, { status: 400 })
    }

    if (password !== ADMIN_PASSWORD) {
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
    return NextResponse.json(
      {
        error: 'Authentication failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get(TOKEN_COOKIE_NAME)

    if (!token || !token.value) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    try {
      const decoded = Buffer.from(token.value, 'base64').toString('utf-8')
      const [timestamp] = decoded.split(':')
      const tokenTime = parseInt(timestamp, 10)
      const now = Date.now()
      const expiryMs = TOKEN_EXPIRY_HOURS * 60 * 60 * 1000

      if (now - tokenTime > expiryMs) {
        cookieStore.delete(TOKEN_COOKIE_NAME)
        return NextResponse.json({ authenticated: false, reason: 'Token expired' }, { status: 401 })
      }

      return NextResponse.json({ authenticated: true })
    } catch {
      return NextResponse.json({ authenticated: false, reason: 'Invalid token' }, { status: 401 })
    }
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
