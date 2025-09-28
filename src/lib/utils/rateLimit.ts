// Simple rate limiting utility for API endpoints
// In production, this should be replaced with Redis-based rate limiting

interface RateLimitConfig {
  interval: number // Time window in milliseconds
  uniqueTokenPerInterval: number // Max unique tokens per interval
}

interface RateLimitResult {
  success: boolean
  pending: boolean
  limit: number
  remaining: number
  reset: number
}

class InMemoryRateLimiter {
  private cache = new Map<string, { count: number; resetTime: number }>()

  constructor(private config: RateLimitConfig) {}

  async check(identifier: string, limit: number): Promise<RateLimitResult> {
    const now = Date.now()
    const windowStart = now - this.config.interval

    // Clean up expired entries
    this.cleanup(windowStart)

    const key = identifier
    const current = this.cache.get(key)

    if (!current || current.resetTime <= now) {
      // First request or reset window
      this.cache.set(key, {
        count: 1,
        resetTime: now + this.config.interval,
      })

      return {
        success: true,
        pending: false,
        limit,
        remaining: limit - 1,
        reset: now + this.config.interval,
      }
    }

    if (current.count >= limit) {
      // Rate limit exceeded
      return {
        success: false,
        pending: false,
        limit,
        remaining: 0,
        reset: current.resetTime,
      }
    }

    // Increment count
    current.count++
    this.cache.set(key, current)

    return {
      success: true,
      pending: false,
      limit,
      remaining: limit - current.count,
      reset: current.resetTime,
    }
  }

  private cleanup(windowStart: number) {
    for (const [key, value] of this.cache.entries()) {
      if (value.resetTime <= windowStart) {
        this.cache.delete(key)
      }
    }
  }
}

export function rateLimit(config: RateLimitConfig) {
  const limiter = new InMemoryRateLimiter(config)
  return limiter
}
