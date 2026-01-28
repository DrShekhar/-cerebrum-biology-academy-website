import { NextRequest } from 'next/server'
import { RateLimitService } from '@/lib/cache/redis'

const IS_PRODUCTION = process.env.NODE_ENV === 'production'

// Check if Redis is configured
const REDIS_CONFIGURED = !!(
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
)

interface RateLimitStore {
  count: number
  resetTime: number
}

// In-memory fallback when Redis is unavailable (development only)
const rateLimitStore = new Map<string, RateLimitStore>()

// Track if we've already warned about missing Redis in production
let hasWarnedAboutRedis = false

export interface RateLimitConfig {
  maxRequests: number
  windowMs: number
}

export interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  reset: number
}

export async function rateLimit(
  req: NextRequest,
  config: RateLimitConfig = { maxRequests: 10, windowMs: 60 * 60 * 1000 }
): Promise<RateLimitResult> {
  const identifier = getClientIdentifier(req)
  const windowSeconds = Math.ceil(config.windowMs / 1000)

  // In production, enforce Redis requirement
  if (IS_PRODUCTION && !REDIS_CONFIGURED) {
    if (!hasWarnedAboutRedis) {
      console.error(
        '[SECURITY CRITICAL] Redis not configured in production! ' +
          'Rate limiting is disabled. Configure UPSTASH_REDIS_REST_URL and ' +
          'UPSTASH_REDIS_REST_TOKEN environment variables immediately.'
      )
      hasWarnedAboutRedis = true
    }
    // In production without Redis, allow requests but log the security risk
    // This prevents service outage while alerting about the misconfiguration
    return {
      success: true,
      limit: config.maxRequests,
      remaining: config.maxRequests,
      reset: Date.now() + config.windowMs,
    }
  }

  try {
    // Use Redis-based rate limiting (primary)
    const result = await RateLimitService.checkIPRateLimit(
      identifier,
      config.maxRequests,
      windowSeconds
    )

    return {
      success: result.allowed,
      limit: config.maxRequests,
      remaining: result.remaining,
      reset: result.resetTime,
    }
  } catch (error) {
    // In production, Redis failures are critical
    if (IS_PRODUCTION) {
      console.error('[SECURITY] Redis rate limiting failed in production:', error)
      // Allow request but log the failure - don't block users due to Redis issues
      // but ensure the error is tracked for immediate investigation
      return {
        success: true,
        limit: config.maxRequests,
        remaining: config.maxRequests,
        reset: Date.now() + config.windowMs,
      }
    }

    // In development, fallback to in-memory rate limiting
    console.warn('Redis rate limiting failed, using in-memory fallback:', error)
    return inMemoryRateLimit(identifier, config)
  }
}

function inMemoryRateLimit(identifier: string, config: RateLimitConfig): RateLimitResult {
  const now = Date.now()
  const existingLimit = rateLimitStore.get(identifier)

  if (!existingLimit || now > existingLimit.resetTime) {
    const newLimit: RateLimitStore = {
      count: 1,
      resetTime: now + config.windowMs,
    }
    rateLimitStore.set(identifier, newLimit)

    return {
      success: true,
      limit: config.maxRequests,
      remaining: config.maxRequests - 1,
      reset: newLimit.resetTime,
    }
  }

  if (existingLimit.count >= config.maxRequests) {
    return {
      success: false,
      limit: config.maxRequests,
      remaining: 0,
      reset: existingLimit.resetTime,
    }
  }

  existingLimit.count++

  return {
    success: true,
    limit: config.maxRequests,
    remaining: config.maxRequests - existingLimit.count,
    reset: existingLimit.resetTime,
  }
}

function getClientIdentifier(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for')
  const realIp = req.headers.get('x-real-ip')
  const ip = forwarded ? forwarded.split(',')[0].trim() : realIp || 'unknown'

  return ip
}

export function cleanupExpiredEntries(): void {
  const now = Date.now()
  for (const [key, value] of rateLimitStore.entries()) {
    if (now > value.resetTime) {
      rateLimitStore.delete(key)
    }
  }
}

// Cleanup in-memory entries periodically (fallback only)
if (typeof setInterval !== 'undefined') {
  setInterval(cleanupExpiredEntries, 60 * 60 * 1000)
}
