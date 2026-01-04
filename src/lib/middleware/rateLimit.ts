import { NextRequest } from 'next/server'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { logger } from '@/lib/utils/logger'

// Create Upstash Redis client for distributed rate limiting
// Falls back to in-memory if not configured
const upstashRedis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null

// Log Redis status once at startup (only in development)
if (process.env.NODE_ENV === 'development') {
  if (upstashRedis) {
    console.info('Rate Limiting: Using Upstash Redis (distributed)')
  } else {
    console.info('Rate Limiting: Using in-memory storage (local only)')
  }
}

interface RateLimitConfig {
  identifier: string
  limit: number
  window: number // in milliseconds
  skipSuccessfulRequests?: boolean
  skipFailedRequests?: boolean
  keyPrefix?: string
}

interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  resetTime: number
  error?: string
}

// In-memory storage for rate limiting (in production, use Redis)
const rateLimitStorage = new Map<string, { count: number; resetTime: number }>()

// Clean up expired entries periodically
setInterval(() => {
  const now = Date.now()
  for (const [key, value] of rateLimitStorage.entries()) {
    if (now > value.resetTime) {
      rateLimitStorage.delete(key)
    }
  }
}, 60000) // Clean every minute

// Get client identifier for rate limiting
function getClientIdentifier(request: NextRequest, userIdentifier?: string): string {
  if (userIdentifier) {
    return `user:${userIdentifier}`
  }

  // Use IP address as fallback
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const clientIP = forwarded?.split(',')[0].trim() || realIP || 'unknown'

  return `ip:${clientIP}`
}

// Core rate limiting function
export async function withRateLimit(
  request: NextRequest,
  config: RateLimitConfig
): Promise<RateLimitResult> {
  try {
    const { identifier, limit, window, keyPrefix = 'rl' } = config
    const key = `${keyPrefix}:${identifier}`

    // Try Upstash Redis rate limiting first (distributed, persistent)
    if (upstashRedis) {
      try {
        const ratelimit = new Ratelimit({
          redis: upstashRedis,
          limiter: Ratelimit.slidingWindow(limit, `${window}ms`),
          prefix: keyPrefix,
          analytics: true,
        })

        const result = await ratelimit.limit(key)

        if (!result.success) {
          logger.warn('Rate limit exceeded (Upstash):', {
            identifier,
            limit,
            remaining: result.remaining,
            resetTime: result.reset,
          })
        }

        return {
          success: result.success,
          limit,
          remaining: result.remaining,
          resetTime: result.reset,
          error: result.success ? undefined : 'Rate limit exceeded',
        }
      } catch (upstashError) {
        logger.error('Upstash rate limiting error, falling back to in-memory:', upstashError)
        // Fall through to in-memory rate limiting
      }
    }

    // Fallback: In-memory rate limiting (for local dev or if Upstash unavailable)
    const now = Date.now()

    // Get current rate limit state
    const current = rateLimitStorage.get(key)

    if (!current || now > current.resetTime) {
      // Create new window
      rateLimitStorage.set(key, {
        count: 1,
        resetTime: now + window,
      })

      return {
        success: true,
        limit,
        remaining: limit - 1,
        resetTime: now + window,
      }
    }

    // Check if limit exceeded
    if (current.count >= limit) {
      logger.warn('Rate limit exceeded (in-memory):', {
        identifier,
        limit,
        count: current.count,
        resetTime: current.resetTime,
      })

      return {
        success: false,
        limit,
        remaining: 0,
        resetTime: current.resetTime,
        error: 'Rate limit exceeded',
      }
    }

    // Increment counter
    current.count++

    return {
      success: true,
      limit,
      remaining: limit - current.count,
      resetTime: current.resetTime,
    }
  } catch (error) {
    logger.error('Rate limiting error:', error)

    // Fail open - allow request if rate limiting fails
    return {
      success: true,
      limit: config.limit,
      remaining: config.limit,
      resetTime: Date.now() + config.window,
    }
  }
}

// Specialized rate limiters for different use cases

// API endpoint rate limiter
export async function apiRateLimit(
  request: NextRequest,
  userIdentifier?: string,
  options: {
    limit?: number
    window?: number
    endpoint?: string
  } = {}
): Promise<RateLimitResult> {
  const {
    limit = 100,
    window = 60 * 60 * 1000, // 1 hour
    endpoint = 'api'
  } = options

  const identifier = getClientIdentifier(request, userIdentifier)
  const keyPrefix = `api:${endpoint}`

  return withRateLimit(request, {
    identifier,
    limit,
    window,
    keyPrefix
  })
}

// Authentication rate limiter (stricter for login attempts)
export async function authRateLimit(
  request: NextRequest,
  identifier: string
): Promise<RateLimitResult> {
  return withRateLimit(request, {
    identifier,
    limit: 5, // 5 attempts per hour
    window: 60 * 60 * 1000,
    keyPrefix: 'auth'
  })
}

// Test submission rate limiter
export async function testSubmissionRateLimit(
  request: NextRequest,
  userIdentifier: string
): Promise<RateLimitResult> {
  return withRateLimit(request, {
    identifier: userIdentifier,
    limit: 10, // 10 test submissions per hour
    window: 60 * 60 * 1000,
    keyPrefix: 'test:submit'
  })
}

// Question creation rate limiter (for teachers/admins)
export async function questionCreationRateLimit(
  request: NextRequest,
  userIdentifier: string
): Promise<RateLimitResult> {
  return withRateLimit(request, {
    identifier: userIdentifier,
    limit: 50, // 50 questions per hour
    window: 60 * 60 * 1000,
    keyPrefix: 'question:create'
  })
}

// Bulk operation rate limiter
export async function bulkOperationRateLimit(
  request: NextRequest,
  userIdentifier: string,
  operationType: string
): Promise<RateLimitResult> {
  return withRateLimit(request, {
    identifier: userIdentifier,
    limit: 5, // 5 bulk operations per hour
    window: 60 * 60 * 1000,
    keyPrefix: `bulk:${operationType}`
  })
}

// Progressive rate limiting based on user role
export function getRoleLimits(role: string): { limit: number; window: number } {
  switch (role) {
    case 'ADMIN':
      return { limit: 1000, window: 60 * 60 * 1000 } // 1000/hour
    case 'TEACHER':
      return { limit: 500, window: 60 * 60 * 1000 } // 500/hour
    case 'PARENT':
      return { limit: 200, window: 60 * 60 * 1000 } // 200/hour
    case 'STUDENT':
    default:
      return { limit: 100, window: 60 * 60 * 1000 } // 100/hour
  }
}

// Adaptive rate limiting based on user behavior
export async function adaptiveRateLimit(
  request: NextRequest,
  userIdentifier: string,
  userRole: string,
  options: {
    baseEndpoint?: string
    successRate?: number // Recent success rate (0-1)
    suspiciousActivity?: number // Suspicious activity score (0-1)
  } = {}
): Promise<RateLimitResult> {
  const {
    baseEndpoint = 'adaptive',
    successRate = 1,
    suspiciousActivity = 0
  } = options

  const roleLimits = getRoleLimits(userRole)
  let adjustedLimit = roleLimits.limit

  // Reduce limit if low success rate (potential abuse)
  if (successRate < 0.5) {
    adjustedLimit = Math.floor(adjustedLimit * 0.5)
  } else if (successRate < 0.8) {
    adjustedLimit = Math.floor(adjustedLimit * 0.8)
  }

  // Reduce limit for suspicious activity
  if (suspiciousActivity > 0.7) {
    adjustedLimit = Math.floor(adjustedLimit * 0.3)
  } else if (suspiciousActivity > 0.5) {
    adjustedLimit = Math.floor(adjustedLimit * 0.6)
  }

  return withRateLimit(request, {
    identifier: userIdentifier,
    limit: Math.max(10, adjustedLimit), // Minimum 10 requests
    window: roleLimits.window,
    keyPrefix: `adaptive:${baseEndpoint}`
  })
}

// Rate limit information for headers
export function getRateLimitHeaders(result: RateLimitResult): Record<string, string> {
  return {
    'X-RateLimit-Limit': result.limit.toString(),
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': new Date(result.resetTime).toISOString(),
    'X-RateLimit-Reset-Time': result.resetTime.toString()
  }
}

// IP-based rate limiting for public endpoints
export async function ipRateLimit(
  request: NextRequest,
  options: {
    limit?: number
    window?: number
    endpoint?: string
  } = {}
): Promise<RateLimitResult> {
  const {
    limit = 50,
    window = 15 * 60 * 1000, // 15 minutes
    endpoint = 'public'
  } = options

  const identifier = getClientIdentifier(request)

  return withRateLimit(request, {
    identifier,
    limit,
    window,
    keyPrefix: `ip:${endpoint}`
  })
}

// Geographic rate limiting (basic implementation)
export async function geoRateLimit(
  request: NextRequest,
  userIdentifier: string,
  countryCode?: string
): Promise<RateLimitResult> {
  // Higher limits for certain regions, lower for others
  const countryLimits: Record<string, number> = {
    'IN': 200, // India - higher limit
    'US': 150, // USA
    'GB': 150, // UK
    'CA': 150, // Canada
    'AU': 150, // Australia
    'SG': 150, // Singapore
    'default': 100
  }

  const limit = countryLimits[countryCode || 'default'] || countryLimits.default

  return withRateLimit(request, {
    identifier: userIdentifier,
    limit,
    window: 60 * 60 * 1000,
    keyPrefix: `geo:${countryCode || 'unknown'}`
  })
}

// Time-based rate limiting (different limits for different times)
export async function timeBasedRateLimit(
  request: NextRequest,
  userIdentifier: string,
  baseLimit: number = 100
): Promise<RateLimitResult> {
  const now = new Date()
  const hour = now.getHours()

  // Peak hours (9 AM - 9 PM IST) get higher limits for students
  const isPeakHours = hour >= 9 && hour <= 21
  const adjustedLimit = isPeakHours ? Math.floor(baseLimit * 1.5) : baseLimit

  return withRateLimit(request, {
    identifier: userIdentifier,
    limit: adjustedLimit,
    window: 60 * 60 * 1000,
    keyPrefix: `time:${isPeakHours ? 'peak' : 'off-peak'}`
  })
}

// Burst rate limiting (allows short bursts but controls sustained usage)
export async function burstRateLimit(
  request: NextRequest,
  userIdentifier: string,
  options: {
    burstLimit?: number
    burstWindow?: number
    sustainedLimit?: number
    sustainedWindow?: number
  } = {}
): Promise<RateLimitResult> {
  const {
    burstLimit = 20,
    burstWindow = 60 * 1000, // 1 minute
    sustainedLimit = 100,
    sustainedWindow = 60 * 60 * 1000 // 1 hour
  } = options

  // Check burst limit first
  const burstResult = await withRateLimit(request, {
    identifier: userIdentifier,
    limit: burstLimit,
    window: burstWindow,
    keyPrefix: 'burst'
  })

  if (!burstResult.success) {
    return burstResult
  }

  // Check sustained limit
  const sustainedResult = await withRateLimit(request, {
    identifier: userIdentifier,
    limit: sustainedLimit,
    window: sustainedWindow,
    keyPrefix: 'sustained'
  })

  // Return the more restrictive result
  return sustainedResult.remaining < burstResult.remaining ? sustainedResult : burstResult
}

// Export rate limiting statistics (for monitoring)
export function getRateLimitStats(): {
  totalKeys: number
  keysByPrefix: Record<string, number>
  memoryUsage: number
} {
  const keysByPrefix: Record<string, number> = {}

  for (const key of rateLimitStorage.keys()) {
    const prefix = key.split(':')[0]
    keysByPrefix[prefix] = (keysByPrefix[prefix] || 0) + 1
  }

  return {
    totalKeys: rateLimitStorage.size,
    keysByPrefix,
    memoryUsage: JSON.stringify([...rateLimitStorage.entries()]).length // Rough estimate
  }
}

// Clear rate limits for a specific identifier (admin function)
export function clearRateLimit(identifier: string, prefix?: string): number {
  let cleared = 0

  for (const key of rateLimitStorage.keys()) {
    if (key.includes(identifier) && (!prefix || key.startsWith(prefix))) {
      rateLimitStorage.delete(key)
      cleared++
    }
  }

  return cleared
}

export default {
  withRateLimit,
  apiRateLimit,
  authRateLimit,
  testSubmissionRateLimit,
  questionCreationRateLimit,
  bulkOperationRateLimit,
  adaptiveRateLimit,
  ipRateLimit,
  geoRateLimit,
  timeBasedRateLimit,
  burstRateLimit,
  getRateLimitHeaders,
  getRateLimitStats,
  clearRateLimit
}