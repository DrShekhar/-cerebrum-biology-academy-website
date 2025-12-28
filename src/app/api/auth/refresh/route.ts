import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { SessionManager, CookieManager, addSecurityHeaders, TokenUtils } from '@/lib/auth/config'

/**
 * POST /api/auth/refresh
 * Token refresh mechanism
 */
export async function POST(request: NextRequest) {
  try {
    // Get refresh token from cookies or body
    const refreshToken =
      request.cookies.get('refresh-token')?.value ||
      (await request.json().catch(() => ({})))?.refreshToken

    if (!refreshToken) {
      return addSecurityHeaders(
        NextResponse.json(
          {
            error: 'Refresh token required',
            message: 'No refresh token provided',
          },
          { status: 401 }
        )
      )
    }

    // Refresh the session
    const refreshResult = await SessionManager.refreshSession(refreshToken)

    if (!refreshResult) {
      // Clear invalid cookies
      const response = NextResponse.json(
        {
          error: 'Invalid refresh token',
          message: 'Session has expired. Please sign in again.',
        },
        { status: 401 }
      )

      CookieManager.clearAuthCookies(response)
      return addSecurityHeaders(response)
    }

    const { accessToken, refreshToken: newRefreshToken } = refreshResult

    // Get user info for response
    const payload = TokenUtils.verifyAccessToken(accessToken)
    if (!payload) {
      return addSecurityHeaders(
        NextResponse.json(
          {
            error: 'Token generation failed',
            message: 'Failed to generate valid access token',
          },
          { status: 500 }
        )
      )
    }

    // Get fresh user data
    const user = await prisma.users.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        emailVerified: true,
        profile: true,
        lastActiveAt: true,
      },
    })

    if (!user) {
      return addSecurityHeaders(
        NextResponse.json(
          {
            error: 'User not found',
            message: 'Associated user account no longer exists',
          },
          { status: 404 }
        )
      )
    }

    // Create response with new tokens
    const response = NextResponse.json({
      success: true,
      message: 'Tokens refreshed successfully',
      user,
      accessToken,
      expiresIn: 15 * 60, // 15 minutes in seconds
    })

    // Set new cookies
    CookieManager.setAuthCookies(response, accessToken, newRefreshToken)

    // Track token refresh event
    try {
      await prisma.analyticsEvent.create({
        data: {
          userId: user.id,
          eventType: 'auth',
          eventName: 'token_refreshed',
          properties: {
            method: 'refresh_token',
            sessionId: payload.sessionId,
          },
          ipAddress:
            request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
          userAgent: request.headers.get('user-agent'),
        },
      })
    } catch (analyticsError) {
      // Don't fail refresh if analytics fails
      console.error('Analytics tracking error:', analyticsError)
    }

    // Add security headers
    return addSecurityHeaders(response)
  } catch (error) {
    console.error('Token refresh error:', error)

    // Clear potentially corrupted cookies
    const response = NextResponse.json(
      {
        error: 'Token refresh failed',
        message: 'Failed to refresh authentication tokens. Please sign in again.',
      },
      { status: 500 }
    )

    CookieManager.clearAuthCookies(response)
    return addSecurityHeaders(response)
  }
}

/**
 * GET /api/auth/refresh
 * Check if refresh token is valid without refreshing
 */
export async function GET(request: NextRequest) {
  try {
    const refreshToken = request.cookies.get('refresh-token')?.value

    if (!refreshToken) {
      return addSecurityHeaders(
        NextResponse.json({
          valid: false,
          message: 'No refresh token found',
        })
      )
    }

    // Verify refresh token without creating new tokens
    const payload = TokenUtils.verifyRefreshToken(refreshToken)
    if (!payload) {
      return addSecurityHeaders(
        NextResponse.json({
          valid: false,
          message: 'Refresh token is invalid or expired',
        })
      )
    }

    // Check if session exists in database
    const session = await prisma.session.findFirst({
      where: {
        sessionToken: payload.sessionId,
        userId: payload.userId,
        expires: { gt: new Date() },
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
            emailVerified: true,
            lastActiveAt: true,
          },
        },
      },
    })

    if (!session || !session.user) {
      return addSecurityHeaders(
        NextResponse.json({
          valid: false,
          message: 'Session not found or expired',
        })
      )
    }

    return addSecurityHeaders(
      NextResponse.json({
        valid: true,
        message: 'Refresh token is valid',
        user: session.user,
        expiresAt: session.expires,
      })
    )
  } catch (error) {
    console.error('Refresh token validation error:', error)
    return addSecurityHeaders(
      NextResponse.json({
        valid: false,
        message: 'Failed to validate refresh token',
      })
    )
  }
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
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Credentials': 'true',
      },
    })
  )
}
