import { NextRequest } from 'next/server'
import { generateCSRFToken, rateLimitCSRFTokens } from '@/lib/auth/csrf'
import { addSecurityHeaders, getCorsOrigin } from '@/lib/auth/config'
import { NextResponse } from 'next/server'

/**
 * GET /api/auth/csrf-token
 * Generate a new CSRF token for client-side use
 */
export async function GET(request: NextRequest) {
  try {
    // Rate limiting for CSRF token generation
    if (!(await rateLimitCSRFTokens(request))) {
      return addSecurityHeaders(
        NextResponse.json(
          {
            error: 'Rate limit exceeded',
            message: 'Too many CSRF token requests. Please try again later.',
            retryAfter: 60,
          },
          { status: 429 }
        )
      )
    }

    return generateCSRFToken(request)
  } catch (error) {
    console.error('CSRF token generation error:', error)
    return addSecurityHeaders(
      NextResponse.json(
        {
          error: 'Internal server error',
          message: 'Failed to generate CSRF token',
        },
        { status: 500 }
      )
    )
  }
}

// OPTIONS for CORS preflight
export async function OPTIONS(request: NextRequest) {
  return addSecurityHeaders(
    new NextResponse(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': getCorsOrigin(request),
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Credentials': 'true',
      },
    })
  )
}
