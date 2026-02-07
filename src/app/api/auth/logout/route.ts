import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import {
  validateUserSession,
  SessionManager,
  CookieManager,
  addSecurityHeaders,
  TokenUtils,
  getCorsOrigin,
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

    // Terminate session - try multiple methods to ensure cleanup
    if (session.valid && session.userId) {
      // Update lastActiveAt before terminating session (for audit trail)
      await prisma.users.update({
        where: { id: session.userId },
        data: { lastActiveAt: new Date() },
      })

      // Method 1: Try to get sessionId from access token
      const payload = TokenUtils.verifyAccessToken(accessToken || '')
      if (payload?.sessionId) {
        await SessionManager.terminateSession(payload.sessionId)
      }
      // Method 2: Also terminate all sessions for this user to be thorough
      // This ensures cleanup even if token is expired/invalid
      await SessionManager.terminateAllUserSessions(session.userId)

      // Track logout event
      try {
        await prisma.analytics_events.create({
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

    // Create response with cache-busting headers
    // SECURITY (2026-01-28): Prevent client-side caching of auth state
    const response = NextResponse.json({
      success: true,
      message: 'Logged out successfully',
      // Include timestamp to ensure client knows session is terminated
      loggedOutAt: new Date().toISOString(),
    })

    // Prevent any caching of logout response
    response.headers.set(
      'Cache-Control',
      'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0'
    )
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    // Clear Vary header to prevent conditional caching
    response.headers.set('Vary', '*')

    // Clear all auth cookies
    CookieManager.clearAuthCookies(response)

    // Add security headers
    return addSecurityHeaders(response)
  } catch (error) {
    console.error('Logout error:', error)

    // Even if there's an error, we should clear cookies to ensure client-side logout
    // But we indicate the error so client can handle appropriately
    const response = NextResponse.json({
      success: false,
      partialLogout: true, // Indicates cookies cleared but server cleanup may have failed
      message: 'Logged out with errors - please sign in again if issues persist',
      error: error instanceof Error ? error.message : 'Unknown error during logout',
      loggedOutAt: new Date().toISOString(),
    })

    // Prevent caching even on error
    response.headers.set(
      'Cache-Control',
      'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0'
    )
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')

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

    // Update lastActiveAt before terminating sessions (for audit trail)
    await prisma.users.update({
      where: { id: session.userId },
      data: { lastActiveAt: new Date() },
    })

    // Terminate all user sessions
    await SessionManager.terminateAllUserSessions(session.userId)

    // Track logout all event
    try {
      await prisma.analytics_events.create({
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
          href: '/sign-in',
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
  return addSecurityHeaders(
    new NextResponse(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': getCorsOrigin(request),
        'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Credentials': 'true',
      },
    })
  )
}
