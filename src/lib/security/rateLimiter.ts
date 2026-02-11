/**
 * Global Rate Limiting Middleware
 * Protects API routes from abuse using Upstash Redis
 */

import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { NextRequest, NextResponse } from 'next/server'

// Initialize Redis client (trim env vars to prevent whitespace/newline URL parse errors)
let redis: Redis | null = null
try {
  const redisUrl = (process.env.UPSTASH_REDIS_REST_URL || '').trim()
  const redisToken = (process.env.UPSTASH_REDIS_REST_TOKEN || '').trim()
  if (redisUrl && redisToken) {
    redis = new Redis({ url: redisUrl, token: redisToken })
  }
} catch {
  redis = null
}

// Rate limit configurations for different endpoint types (only created when Redis is available)
export const rateLimiters = redis
  ? {
      auth: new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(5, '15 m'),
        analytics: true,
        prefix: 'ratelimit:auth',
      }),
      api: new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(30, '1 m'),
        analytics: true,
        prefix: 'ratelimit:api',
      }),
      public: new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(60, '1 m'),
        analytics: true,
        prefix: 'ratelimit:public',
      }),
      payment: new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(3, '1 h'),
        analytics: true,
        prefix: 'ratelimit:payment',
      }),
      ai: new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(10, '1 m'),
        analytics: true,
        prefix: 'ratelimit:ai',
      }),
    }
  : null

/**
 * Get rate limiter based on route path
 */
export function getRateLimiterForPath(pathname: string): Ratelimit | null {
  if (!rateLimiters) return null
  if (pathname.includes('/api/auth')) return rateLimiters.auth
  if (pathname.includes('/api/payment')) return rateLimiters.payment
  if (pathname.includes('/api/ai') || pathname.includes('/api/agents')) return rateLimiters.ai
  if (pathname.startsWith('/api/')) return rateLimiters.api
  return rateLimiters.public
}

/**
 * Get identifier for rate limiting (IP or user ID)
 */
export function getIdentifier(request: NextRequest): string {
  // Try to get user ID from session (if authenticated)
  const userId = request.headers.get('x-user-id')
  if (userId) return `user:${userId}`

  // Fallback to IP address
  const forwarded = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  const ip = forwarded ? forwarded.split(',')[0].trim() : realIp || 'unknown'

  return `ip:${ip}`
}

/**
 * Apply rate limiting to a request
 */
export async function applyRateLimit(
  request: NextRequest,
  limiter?: Ratelimit
): Promise<{ success: boolean; limit: number; remaining: number; reset: number } | null> {
  // Skip rate limiting in development (optional)
  if (process.env.NODE_ENV === 'development' && process.env.DISABLE_RATE_LIMIT === 'true') {
    return null
  }

  // Skip if Redis is not configured
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    console.warn('⚠️  Redis not configured - rate limiting disabled')
    return null
  }

  const ratelimiter = limiter || getRateLimiterForPath(request.nextUrl.pathname)
  const identifier = getIdentifier(request)

  try {
    const { success, limit, remaining, reset } = await ratelimiter.limit(identifier)

    return { success, limit, remaining, reset }
  } catch (error) {
    console.error('Rate limit error:', error)
    // Fail open - allow request if rate limiting fails
    return null
  }
}

/**
 * Middleware helper to check rate limit and return 429 if exceeded
 */
export async function checkRateLimit(
  request: NextRequest,
  limiter?: Ratelimit
): Promise<NextResponse | null> {
  const result = await applyRateLimit(request, limiter)

  if (!result) return null // Rate limiting not active

  // Add rate limit headers
  const headers = new Headers({
    'X-RateLimit-Limit': result.limit.toString(),
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': new Date(result.reset).toISOString(),
  })

  if (!result.success) {
    return new NextResponse(
      JSON.stringify({
        error: 'Too Many Requests',
        message: 'Rate limit exceeded. Please try again later.',
        retryAfter: Math.ceil((result.reset - Date.now()) / 1000),
      }),
      {
        status: 429,
        headers: {
          ...Object.fromEntries(headers),
          'Content-Type': 'application/json',
          'Retry-After': Math.ceil((result.reset - Date.now()) / 1000).toString(),
        },
      }
    )
  }

  return null // Request allowed
}

/**
 * Decorator for API route handlers
 */
export function withRateLimit(
  handler: (req: NextRequest) => Promise<NextResponse>,
  limiter?: Ratelimit
) {
  return async (req: NextRequest) => {
    const rateLimitResponse = await checkRateLimit(req, limiter)
    if (rateLimitResponse) return rateLimitResponse

    return handler(req)
  }
}
