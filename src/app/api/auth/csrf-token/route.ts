import { NextRequest } from 'next/server'
import { generateCSRFToken, rateLimitCSRFTokens } from '@/lib/auth/csrf'
import { addSecurityHeaders } from '@/lib/auth/config'
import { NextResponse } from 'next/server'

/**
 * GET /api/auth/csrf-token
 * Generate a new CSRF token for client-side use
 */
export async function GET(request: NextRequest) {
  try {
    // Rate limiting for CSRF token generation
    if (!rateLimitCSRFTokens(request)) {
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
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Credentials': 'true',
      },
    })
  )
}
