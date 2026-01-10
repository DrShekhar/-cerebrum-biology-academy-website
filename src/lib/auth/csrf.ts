import { NextRequest, NextResponse } from 'next/server'
import { addSecurityHeaders } from './config'
import crypto from 'crypto'

/**
 * CSRF Token Management
 */
export class CSRFProtection {
  private static readonly TOKEN_LENGTH = 32
  private static readonly TOKEN_EXPIRY = 24 * 60 * 60 * 1000 // 24 hours
  private static tokens = new Map<string, { token: string; expires: number; used: boolean }>()

  /**
   * Generate a new CSRF token
   */
  static generateToken(): string {
    const token = crypto.randomBytes(this.TOKEN_LENGTH).toString('hex')
    const expires = Date.now() + this.TOKEN_EXPIRY

    this.tokens.set(token, { token, expires, used: false })

    // Clean up expired tokens
    this.cleanupExpiredTokens()

    return token
  }

  /**
   * Validate CSRF token
   */
  static validateToken(token: string, oneTimeUse: boolean = false): boolean {
    if (!token) return false

    const tokenData = this.tokens.get(token)
    if (!tokenData) return false

    // Check if token is expired
    if (Date.now() > tokenData.expires) {
      this.tokens.delete(token)
      return false
    }

    // Check if token was already used (for one-time use)
    if (oneTimeUse && tokenData.used) {
      return false
    }

    // Mark token as used if one-time use
    if (oneTimeUse) {
      tokenData.used = true
    }

    return true
  }

  /**
   * Invalidate a specific token
   */
  static invalidateToken(token: string): void {
    this.tokens.delete(token)
  }

  /**
   * Clean up expired tokens
   */
  private static cleanupExpiredTokens(): void {
    const now = Date.now()
    for (const [token, tokenData] of this.tokens.entries()) {
      if (now > tokenData.expires) {
        this.tokens.delete(token)
      }
    }
  }

  /**
   * Get token statistics
   */
  static getStats(): { total: number; expired: number; used: number } {
    const now = Date.now()
    let expired = 0
    let used = 0

    for (const tokenData of this.tokens.values()) {
      if (now > tokenData.expires) expired++
      if (tokenData.used) used++
    }

    return {
      total: this.tokens.size,
      expired,
      used
    }
  }
}

/**
 * CSRF middleware for API routes
 */
export function withCSRF(
  handler: (request: NextRequest) => Promise<Response>,
  options: {
    methods?: string[]
    skipOriginCheck?: boolean
    oneTimeUse?: boolean
  } = {}
) {
  const {
    methods = ['POST', 'PUT', 'DELETE', 'PATCH'],
    skipOriginCheck = false,
    oneTimeUse = false
  } = options

  return async (request: NextRequest): Promise<Response> => {
    try {
      // Skip CSRF protection for GET and OPTIONS requests
      if (!methods.includes(request.method)) {
        return handler(request)
      }

      // Get CSRF token from headers
      const csrfToken = request.headers.get('x-csrf-token') ||
                       request.headers.get('csrf-token')

      if (!csrfToken) {
        return addSecurityHeaders(NextResponse.json({
          error: 'CSRF token required',
          message: 'Missing CSRF protection token',
          code: 'CSRF_TOKEN_MISSING'
        }, { status: 403 }))
      }

      // Validate CSRF token
      if (!CSRFProtection.validateToken(csrfToken, oneTimeUse)) {
        return addSecurityHeaders(NextResponse.json({
          error: 'Invalid CSRF token',
          message: 'CSRF token is invalid or expired',
          code: 'CSRF_TOKEN_INVALID'
        }, { status: 403 }))
      }

      // Origin validation (unless skipped)
      if (!skipOriginCheck) {
        const origin = request.headers.get('origin')
        const referer = request.headers.get('referer')

        const allowedOrigins = [
          process.env.NEXT_PUBLIC_APP_URL,
          'https://cerebrumbiologyacademy.com',
          'https://www.cerebrumbiologyacademy.com',
          ...(process.env.NODE_ENV === 'development' ? ['http://localhost:3000'] : [])
        ].filter(Boolean)

        const isValidOrigin = origin && allowedOrigins.includes(origin)
        const isValidReferer = referer && allowedOrigins.some(allowed => referer.startsWith(allowed))

        if (!isValidOrigin && !isValidReferer) {
          return addSecurityHeaders(NextResponse.json({
            error: 'Invalid origin',
            message: 'Request origin not allowed',
            code: 'INVALID_ORIGIN'
          }, { status: 403 }))
        }
      }

      // Call the handler
      return handler(request)

    } catch (error) {
      console.error('CSRF middleware error:', error)
      return addSecurityHeaders(NextResponse.json({
        error: 'CSRF validation failed',
        message: 'Failed to validate CSRF protection'
      }, { status: 500 }))
    }
  }
}

/**
 * Generate CSRF token endpoint
 */
export async function generateCSRFToken(request: NextRequest): Promise<Response> {
  try {
    const token = CSRFProtection.generateToken()

    const response = NextResponse.json({
      success: true,
      csrfToken: token,
      expiresIn: 24 * 60 * 60 // 24 hours in seconds
    })

    // Set CSRF token in cookie as well (double submit pattern)
    response.cookies.set('csrf-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60, // 24 hours
      path: '/'
    })

    return addSecurityHeaders(response)

  } catch (error) {
    console.error('CSRF token generation error:', error)
    return addSecurityHeaders(NextResponse.json({
      error: 'Failed to generate CSRF token',
      message: 'Could not create CSRF protection token'
    }, { status: 500 }))
  }
}

/**
 * Double submit cookie CSRF validation
 * Validates that the token in header matches the token in cookie
 */
export function validateDoubleSubmitCSRF(request: NextRequest): boolean {
  const headerToken = request.headers.get('x-csrf-token') ||
                     request.headers.get('csrf-token')
  const cookieToken = request.cookies.get('csrf-token')?.value

  if (!headerToken || !cookieToken) {
    return false
  }

  // Use timing-safe comparison
  return crypto.timingSafeEqual(
    Buffer.from(headerToken, 'hex'),
    Buffer.from(cookieToken, 'hex')
  )
}

/**
 * Enhanced CSRF middleware with double submit pattern
 */
export function withDoubleSubmitCSRF(
  handler: (request: NextRequest) => Promise<Response>,
  options: {
    methods?: string[]
    skipOriginCheck?: boolean
  } = {}
) {
  const {
    methods = ['POST', 'PUT', 'DELETE', 'PATCH'],
    skipOriginCheck = false
  } = options

  return async (request: NextRequest): Promise<Response> => {
    try {
      // Skip CSRF protection for GET and OPTIONS requests
      if (!methods.includes(request.method)) {
        return handler(request)
      }

      // Validate double submit CSRF
      if (!validateDoubleSubmitCSRF(request)) {
        return addSecurityHeaders(NextResponse.json({
          error: 'CSRF validation failed',
          message: 'Invalid or missing CSRF tokens',
          code: 'CSRF_VALIDATION_FAILED'
        }, { status: 403 }))
      }

      // Origin validation (unless skipped)
      if (!skipOriginCheck) {
        const origin = request.headers.get('origin')
        const allowedOrigins = [
          process.env.NEXT_PUBLIC_APP_URL,
          'https://cerebrumbiologyacademy.com',
          'https://www.cerebrumbiologyacademy.com',
          ...(process.env.NODE_ENV === 'development' ? ['http://localhost:3000'] : [])
        ].filter(Boolean)

        if (origin && !allowedOrigins.includes(origin)) {
          return addSecurityHeaders(NextResponse.json({
            error: 'Invalid origin',
            message: 'Request origin not allowed',
            code: 'INVALID_ORIGIN'
          }, { status: 403 }))
        }
      }

      return handler(request)

    } catch (error) {
      console.error('Double submit CSRF middleware error:', error)
      return addSecurityHeaders(NextResponse.json({
        error: 'CSRF validation failed',
        message: 'Failed to validate CSRF protection'
      }, { status: 500 }))
    }
  }
}

/**
 * Content Security Policy headers
 */
export function addCSPHeaders(response: NextResponse): NextResponse {
  const isDevelopment = process.env.NODE_ENV === 'development'

  const cspDirectives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live https://www.googletagmanager.com https://www.google-analytics.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https: blob:",
    "media-src 'self' https:",
    "connect-src 'self' https://api.cerebrumbiologyacademy.com https://www.google-analytics.com",
    "frame-src 'self' https://www.youtube.com https://player.vimeo.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    ...(isDevelopment ? [] : ["upgrade-insecure-requests"])
  ]

  response.headers.set('Content-Security-Policy', cspDirectives.join('; '))
  return response
}

/**
 * Rate limiting for CSRF token generation
 */
const csrfTokenLimits = new Map<string, { count: number; resetTime: number }>()

export function rateLimitCSRFTokens(request: NextRequest): boolean {
  // Parse first IP from x-forwarded-for to prevent IP spoofing attacks
  const forwardedFor = request.headers.get('x-forwarded-for')
  const identifier = forwardedFor
    ? forwardedFor.split(',')[0].trim()
    : request.headers.get('x-real-ip') || 'unknown'

  const now = Date.now()
  const windowMs = 60 * 1000 // 1 minute
  const maxRequests = 10 // 10 tokens per minute

  const record = csrfTokenLimits.get(identifier)

  if (!record || now > record.resetTime) {
    csrfTokenLimits.set(identifier, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (record.count >= maxRequests) {
    return false
  }

  record.count++
  return true
}

export default {
  CSRFProtection,
  withCSRF,
  withDoubleSubmitCSRF,
  generateCSRFToken,
  validateDoubleSubmitCSRF,
  addCSPHeaders,
  rateLimitCSRFTokens
}