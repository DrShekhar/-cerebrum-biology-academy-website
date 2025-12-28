import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import {
  validateUserSession,
  SessionManager,
  CookieManager,
  addSecurityHeaders,
  TokenUtils,
} from '@/lib/auth/config'

/**
 * POST /api/auth/logout
 * Secure session termination
 */
export async function POST(request: NextRequest) {
  try {
    // Validate current session
    const session = await validateUserSession(request)

    // Get tokens for cleanup
    const refreshToken = request.cookies.get('refresh-token')?.value
    const accessToken =
      request.headers.get('authorization')?.replace('Bearer ', '') ||
      request.cookies.get('auth-token')?.value

    // If we have a valid session, terminate it
    if (session.valid) {
      // Get session ID from access token
      const payload = TokenUtils.verifyAccessToken(accessToken || '')
      if (payload?.sessionId) {
        await SessionManager.terminateSession(payload.sessionId)
      }

      // Track logout event
      try {
        await prisma.analyticsEvent.create({
          data: {
            userId: session.userId,
            eventType: 'auth',
            eventName: 'user_logout',
            properties: {
              method: 'manual_logout',
              sessionDuration: 'calculated_on_client', // Could be enhanced
            },
            ipAddress:
              request.headers.get('x-forwarded-for') ||
              request.headers.get('x-real-ip') ||
              'unknown',
            userAgent: request.headers.get('user-agent'),
          },
        })
      } catch (analyticsError) {
        // Don't fail logout if analytics fails
        console.error('Analytics tracking error:', analyticsError)
      }
    }

    // Create response
    const response = NextResponse.json({
      success: true,
      message: 'Logged out successfully',
    })

    // Clear all auth cookies
    CookieManager.clearAuthCookies(response)

    // Add security headers
    return addSecurityHeaders(response)
  } catch (error) {
    console.error('Logout error:', error)

    // Even if there's an error, we should clear cookies
    const response = NextResponse.json({
      success: true,
      message: 'Logged out successfully',
    })

    CookieManager.clearAuthCookies(response)
    return addSecurityHeaders(response)
  }
}

/**
 * POST /api/auth/logout-all
 * Terminate all user sessions (logout from all devices)
 */
export async function DELETE(request: NextRequest) {
  try {
    // Validate current session
    const session = await validateUserSession(request)

    if (!session.valid || !session.userId) {
      return addSecurityHeaders(
        NextResponse.json(
          {
            error: 'Authentication required',
            message: 'Please sign in to access this feature',
          },
          { status: 401 }
        )
      )
    }

    // Terminate all user sessions
    await SessionManager.terminateAllUserSessions(session.userId)

    // Track logout all event
    try {
      await prisma.analyticsEvent.create({
        data: {
          userId: session.userId,
          eventType: 'auth',
          eventName: 'user_logout_all_devices',
          properties: {
            method: 'manual_logout_all',
          },
          ipAddress:
            request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
          userAgent: request.headers.get('user-agent'),
        },
      })
    } catch (analyticsError) {
      console.error('Analytics tracking error:', analyticsError)
    }

    // Create response
    const response = NextResponse.json({
      success: true,
      message: 'Logged out from all devices successfully',
    })

    // Clear cookies on current device
    CookieManager.clearAuthCookies(response)

    // Add security headers
    return addSecurityHeaders(response)
  } catch (error) {
    console.error('Logout all error:', error)
    return addSecurityHeaders(
      NextResponse.json(
        {
          error: 'Internal server error',
          message: 'Failed to logout from all devices',
        },
        { status: 500 }
      )
    )
  }
}

/**
 * GET /api/auth/logout
 * Get logout page metadata
 */
export async function GET() {
  return addSecurityHeaders(
    NextResponse.json({
      title: 'Logout - Cerebrum Biology Academy',
      description: 'You have been securely logged out',
      message:
        'Thank you for using Cerebrum Biology Academy. Your session has been terminated securely.',
      actions: [
        {
          label: 'Sign In Again',
          href: '/auth/signin',
        },
        {
          label: 'Browse Free Resources',
          href: '/resources',
        },
        {
          label: 'Home',
          href: '/',
        },
      ],
    })
  )
}

// OPTIONS for CORS preflight
export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin') || ''
  const allowedOrigins = [
    'https://cerebrumbiologyacademy.com',
    'https://cerebrumbiologyacademy.com',
    ...(process.env.NODE_ENV === 'development' ? ['http://localhost:3000'] : []),
  ]
  const corsOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0]

  return addSecurityHeaders(
    new NextResponse(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': corsOrigin,
        'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Credentials': 'true',
      },
    })
  )
}
