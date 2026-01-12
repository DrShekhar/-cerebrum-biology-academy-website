import { NextRequest, NextResponse } from 'next/server'
import { addSecurityHeaders } from './config'
import crypto from 'crypto'
import { upstashCache, preferUpstash } from '@/lib/cache/upstash'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// Initialize Redis for rate limiting if available
const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null

// CSRF token rate limiter using Redis
const csrfRateLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, '1 m'),
      analytics: true,
      prefix: 'ratelimit:csrf:token',
    })
  : null

// Fallback in-memory rate limiting (only for dev without Redis)
const inMemoryLimits = new Map<string, { count: number; resetTime: number }>()

/**
 * CSRF Token Management with Redis backend
 * Falls back to in-memory storage in development if Redis is not configured
 */
export class CSRFProtection {
  private static readonly TOKEN_LENGTH = 32
  private static readonly TOKEN_EXPIRY_SECONDS = 24 * 60 * 60 // 24 hours
  private static readonly REDIS_PREFIX = 'csrf:token:'

  // Fallback in-memory storage (only for dev without Redis)
  private static inMemoryTokens = new Map<
    string,
    { token: string; expires: number; used: boolean }
  >()

  /**
   * Generate a new CSRF token
   */
  static async generateToken(): Promise<string> {
    const token = crypto.randomBytes(this.TOKEN_LENGTH).toString('hex')

    if (preferUpstash() && upstashCache.isEnabled()) {
      // Store in Redis with expiration
      await upstashCache.set(
        `${this.REDIS_PREFIX}${token}`,
        JSON.stringify({ used: false, createdAt: Date.now() }),
        this.TOKEN_EXPIRY_SECONDS
      )
    } else {
      // Fallback to in-memory (dev only)
      const expires = Date.now() + this.TOKEN_EXPIRY_SECONDS * 1000
      this.inMemoryTokens.set(token, { token, expires, used: false })
      this.cleanupExpiredTokens()
    }

    return token
  }

  /**
   * Validate CSRF token
   */
  static async validateToken(token: string, oneTimeUse: boolean = false): Promise<boolean> {
    if (!token) return false

    if (preferUpstash() && upstashCache.isEnabled()) {
      // Check Redis
      const key = `${this.REDIS_PREFIX}${token}`
      const stored = await upstashCache.get(key)

      if (!stored) return false

      try {
        const tokenData = JSON.parse(stored)

        // Check if token was already used (for one-time use)
        if (oneTimeUse && tokenData.used) {
          return false
        }

        // Mark token as used if one-time use
        if (oneTimeUse) {
          tokenData.used = true
          const ttl = await upstashCache.ttl(key)
          if (ttl > 0) {
            await upstashCache.set(key, JSON.stringify(tokenData), ttl)
          }
        }

        return true
      } catch {
        return false
      }
    } else {
      // Fallback to in-memory
      const tokenData = this.inMemoryTokens.get(token)
      if (!tokenData) return false

      if (Date.now() > tokenData.expires) {
        this.inMemoryTokens.delete(token)
        return false
      }

      if (oneTimeUse && tokenData.used) {
        return false
      }

      if (oneTimeUse) {
        tokenData.used = true
      }

      return true
    }
  }

  /**
   * Invalidate a specific token
   */
  static async invalidateToken(token: string): Promise<void> {
    if (preferUpstash() && upstashCache.isEnabled()) {
      await upstashCache.del(`${this.REDIS_PREFIX}${token}`)
    } else {
      this.inMemoryTokens.delete(token)
    }
  }

  /**
   * Clean up expired tokens (in-memory only)
   */
  private static cleanupExpiredTokens(): void {
    const now = Date.now()
    for (const [token, tokenData] of this.inMemoryTokens.entries()) {
      if (now > tokenData.expires) {
        this.inMemoryTokens.delete(token)
      }
    }
  }

  /**
   * Get token statistics
   */
  static async getStats(): Promise<{ total: number; source: string }> {
    if (preferUpstash() && upstashCache.isEnabled()) {
      const keys = await upstashCache.keys(`${this.REDIS_PREFIX}*`)
      return {
        total: keys.length,
        source: 'redis',
      }
    } else {
      this.cleanupExpiredTokens()
      return {
        total: this.inMemoryTokens.size,
        source: 'in-memory',
      }
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
    oneTimeUse = false,
  } = options

  return async (request: NextRequest): Promise<Response> => {
    try {
      // Skip CSRF protection for GET and OPTIONS requests
      if (!methods.includes(request.method)) {
        return handler(request)
      }

      // Get CSRF token from headers
      const csrfToken = request.headers.get('x-csrf-token') || request.headers.get('csrf-token')

      if (!csrfToken) {
        return addSecurityHeaders(
          NextResponse.json(
            {
              error: 'CSRF token required',
              message: 'Missing CSRF protection token',
              code: 'CSRF_TOKEN_MISSING',
            },
            { status: 403 }
          )
        )
      }

      // Validate CSRF token
      const isValid = await CSRFProtection.validateToken(csrfToken, oneTimeUse)
      if (!isValid) {
        return addSecurityHeaders(
          NextResponse.json(
            {
              error: 'Invalid CSRF token',
              message: 'CSRF token is invalid or expired',
              code: 'CSRF_TOKEN_INVALID',
            },
            { status: 403 }
          )
        )
      }

      // Origin validation (unless skipped)
      if (!skipOriginCheck) {
        const origin = request.headers.get('origin')
        const referer = request.headers.get('referer')

        const allowedOrigins = [
          process.env.NEXT_PUBLIC_APP_URL,
          'https://cerebrumbiologyacademy.com',
          'https://www.cerebrumbiologyacademy.com',
          ...(process.env.NODE_ENV === 'development' ? ['http://localhost:3000'] : []),
        ].filter(Boolean)

        const isValidOrigin = origin && allowedOrigins.includes(origin)
        const isValidReferer =
          referer && allowedOrigins.some((allowed) => referer.startsWith(allowed as string))

        if (!isValidOrigin && !isValidReferer) {
          return addSecurityHeaders(
            NextResponse.json(
              {
                error: 'Invalid origin',
                message: 'Request origin not allowed',
                code: 'INVALID_ORIGIN',
              },
              { status: 403 }
            )
          )
        }
      }

      // Call the handler
      return handler(request)
    } catch (error) {
      console.error('CSRF middleware error:', error)
      return addSecurityHeaders(
        NextResponse.json(
          {
            error: 'CSRF validation failed',
            message: 'Failed to validate CSRF protection',
          },
          { status: 500 }
        )
      )
    }
  }
}

/**
 * Generate CSRF token endpoint
 */
export async function generateCSRFToken(request: NextRequest): Promise<Response> {
  try {
    const token = await CSRFProtection.generateToken()

    const response = NextResponse.json({
      success: true,
      csrfToken: token,
      expiresIn: 24 * 60 * 60, // 24 hours in seconds
    })

    // Set CSRF token in cookie as well (double submit pattern)
    response.cookies.set('csrf-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60, // 24 hours
      path: '/',
    })

    return addSecurityHeaders(response)
  } catch (error) {
    console.error('CSRF token generation error:', error)
    return addSecurityHeaders(
      NextResponse.json(
        {
          error: 'Failed to generate CSRF token',
          message: 'Could not create CSRF protection token',
        },
        { status: 500 }
      )
    )
  }
}

/**
 * Double submit cookie CSRF validation
 * Validates that the token in header matches the token in cookie
 */
export function validateDoubleSubmitCSRF(request: NextRequest): boolean {
  const headerToken = request.headers.get('x-csrf-token') || request.headers.get('csrf-token')
  const cookieToken = request.cookies.get('csrf-token')?.value

  if (!headerToken || !cookieToken) {
    return false
  }

  // Use timing-safe comparison
  try {
    return crypto.timingSafeEqual(Buffer.from(headerToken, 'hex'), Buffer.from(cookieToken, 'hex'))
  } catch {
    return false
  }
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
  const { methods = ['POST', 'PUT', 'DELETE', 'PATCH'], skipOriginCheck = false } = options

  return async (request: NextRequest): Promise<Response> => {
    try {
      // Skip CSRF protection for GET and OPTIONS requests
      if (!methods.includes(request.method)) {
        return handler(request)
      }

      // Validate double submit CSRF
      if (!validateDoubleSubmitCSRF(request)) {
        return addSecurityHeaders(
          NextResponse.json(
            {
              error: 'CSRF validation failed',
              message: 'Invalid or missing CSRF tokens',
              code: 'CSRF_VALIDATION_FAILED',
            },
            { status: 403 }
          )
        )
      }

      // Origin validation (unless skipped)
      if (!skipOriginCheck) {
        const origin = request.headers.get('origin')
        const allowedOrigins = [
          process.env.NEXT_PUBLIC_APP_URL,
          'https://cerebrumbiologyacademy.com',
          'https://www.cerebrumbiologyacademy.com',
          ...(process.env.NODE_ENV === 'development' ? ['http://localhost:3000'] : []),
        ].filter(Boolean)

        if (origin && !allowedOrigins.includes(origin)) {
          return addSecurityHeaders(
            NextResponse.json(
              {
                error: 'Invalid origin',
                message: 'Request origin not allowed',
                code: 'INVALID_ORIGIN',
              },
              { status: 403 }
            )
          )
        }
      }

      return handler(request)
    } catch (error) {
      console.error('Double submit CSRF middleware error:', error)
      return addSecurityHeaders(
        NextResponse.json(
          {
            error: 'CSRF validation failed',
            message: 'Failed to validate CSRF protection',
          },
          { status: 500 }
        )
      )
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
    ...(isDevelopment ? [] : ['upgrade-insecure-requests']),
  ]

  response.headers.set('Content-Security-Policy', cspDirectives.join('; '))
  return response
}

/**
 * Rate limiting for CSRF token generation using Redis
 * Falls back to in-memory in development if Redis is not configured
 */
export async function rateLimitCSRFTokens(request: NextRequest): Promise<boolean> {
  // Parse first IP from x-forwarded-for to prevent IP spoofing attacks
  const forwardedFor = request.headers.get('x-forwarded-for')
  const identifier = forwardedFor
    ? forwardedFor.split(',')[0].trim()
    : request.headers.get('x-real-ip') || 'unknown'

  // Use Redis rate limiter if available
  if (csrfRateLimiter) {
    const result = await csrfRateLimiter.limit(identifier)
    return result.success
  }

  // Fallback to in-memory rate limiting (dev only)
  const now = Date.now()
  const windowMs = 60 * 1000 // 1 minute
  const maxRequests = 10 // 10 tokens per minute

  const record = inMemoryLimits.get(identifier)

  if (!record || now > record.resetTime) {
    inMemoryLimits.set(identifier, { count: 1, resetTime: now + windowMs })
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
  rateLimitCSRFTokens,
}
