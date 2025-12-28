import { NextRequest } from 'next/server'
import { RateLimitService } from '@/lib/cache/redis'

interface RateLimitStore {
  count: number
  resetTime: number
}

// In-memory fallback when Redis is unavailable
const rateLimitStore = new Map<string, RateLimitStore>()

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
    // Fallback to in-memory rate limiting if Redis fails
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
