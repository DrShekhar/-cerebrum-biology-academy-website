/**
 * Rate Limiter with Redis
 *
 * Implements distributed rate limiting using Redis with sliding window algorithm.
 * Protects APIs from abuse and ensures fair usage across all users.
 */

import { logger } from '../monitoring/logger'
import Redis from 'ioredis'

export interface RateLimitResult {
  allowed: boolean
  remaining: number
  resetAt: Date
  limit: number
}

export interface RateLimitConfig {
  identifier: string
  limit: number
  window: number // in seconds
  blockDuration?: number // in seconds (optional penalty)
}

class RateLimiter {
  private redis: Redis | null = null
  private redisEnabled: boolean
  private localCache: Map<string, { count: number; resetAt: number }> = new Map()

  constructor() {
    this.redisEnabled = process.env.REDIS_ENABLED === 'true'

    if (this.redisEnabled && process.env.REDIS_URL) {
      try {
        this.redis = new Redis(process.env.REDIS_URL, {
          maxRetriesPerRequest: 3,
          retryStrategy: (times: number) => {
            if (times > 3) {
              logger.error('Redis connection failed after 3 retries')
              return null
            }
            return Math.min(times * 200, 1000)
          },
        })

        this.redis.on('error', (error) => {
          logger.error('Redis connection error', error)
        })

        this.redis.on('connect', () => {
          logger.info('Redis connected successfully')
        })
      } catch (error) {
        logger.error('Failed to initialize Redis', error as Error)
        this.redis = null
      }
    }
  }

  /**
   * Check rate limit for an identifier
   */
  async checkLimit(config: RateLimitConfig): Promise<RateLimitResult> {
    if (this.redis) {
      return this.checkRedisLimit(config)
    } else {
      return this.checkLocalLimit(config)
    }
  }

  /**
   * Check rate limit using Redis (distributed)
   */
  private async checkRedisLimit(config: RateLimitConfig): Promise<RateLimitResult> {
    const key = `ratelimit:${config.identifier}`
    const now = Date.now()
    const windowStart = now - config.window * 1000

    try {
      // Use Redis pipeline for atomic operations
      const pipeline = this.redis!.pipeline()

      // Remove old entries outside the window
      pipeline.zremrangebyscore(key, 0, windowStart)

      // Count current requests in window
      pipeline.zcard(key)

      // Add current request
      pipeline.zadd(key, now, `${now}`)

      // Set expiry
      pipeline.expire(key, config.window)

      const results = await pipeline.exec()

      if (!results) {
        throw new Error('Redis pipeline failed')
      }

      // Extract count (before adding current request)
      const count = (results[1][1] as number) || 0

      const allowed = count < config.limit
      const remaining = Math.max(0, config.limit - count - 1)
      const resetAt = new Date(now + config.window * 1000)

      // Log rate limit violations
      if (!allowed) {
        logger.logSecurity({
          type: 'rate_limit',
          details: `Rate limit exceeded for ${config.identifier}`,
          userId: config.identifier,
        })
      }

      return {
        allowed,
        remaining,
        resetAt,
        limit: config.limit,
      }
    } catch (error) {
      logger.error('Redis rate limit check failed', error as Error)

      // Fallback to local rate limiting
      return this.checkLocalLimit(config)
    }
  }

  /**
   * Check rate limit using local memory (fallback)
   */
  private checkLocalLimit(config: RateLimitConfig): RateLimitResult {
    const key = config.identifier
    const now = Date.now()
    const windowMs = config.window * 1000

    // Get or create entry
    let entry = this.localCache.get(key)

    // Reset if window expired
    if (!entry || entry.resetAt < now) {
      entry = {
        count: 0,
        resetAt: now + windowMs,
      }
      this.localCache.set(key, entry)
    }

    // Increment count
    entry.count++

    const allowed = entry.count <= config.limit
    const remaining = Math.max(0, config.limit - entry.count)
    const resetAt = new Date(entry.resetAt)

    // Clean up old entries periodically
    this.cleanupLocalCache()

    return {
      allowed,
      remaining,
      resetAt,
      limit: config.limit,
    }
  }

  /**
   * Clean up expired entries from local cache
   */
  private cleanupLocalCache(): void {
    const now = Date.now()

    // Only cleanup occasionally to avoid performance impact
    if (Math.random() > 0.01) return

    for (const [key, entry] of this.localCache.entries()) {
      if (entry.resetAt < now) {
        this.localCache.delete(key)
      }
    }
  }

  /**
   * Reset rate limit for an identifier
   */
  async resetLimit(identifier: string): Promise<void> {
    const key = `ratelimit:${identifier}`

    if (this.redis) {
      try {
        await this.redis.del(key)
      } catch (error) {
        logger.error('Failed to reset Redis rate limit', error as Error)
      }
    }

    this.localCache.delete(identifier)
  }

  /**
   * Get current usage for an identifier
   */
  async getUsage(identifier: string, windowSeconds: number): Promise<number> {
    const key = `ratelimit:${identifier}`

    if (this.redis) {
      try {
        const now = Date.now()
        const windowStart = now - windowSeconds * 1000
        const count = await this.redis.zcount(key, windowStart, now)
        return count
      } catch (error) {
        logger.error('Failed to get Redis usage', error as Error)
      }
    }

    // Fallback to local cache
    const entry = this.localCache.get(identifier)
    return entry?.count || 0
  }

  /**
   * Block an identifier temporarily
   */
  async blockIdentifier(identifier: string, durationSeconds: number): Promise<void> {
    const key = `ratelimit:blocked:${identifier}`

    if (this.redis) {
      try {
        await this.redis.setex(key, durationSeconds, '1')
      } catch (error) {
        logger.error('Failed to block identifier in Redis', error as Error)
      }
    }

    // Also block locally
    this.localCache.set(identifier, {
      count: Number.MAX_SAFE_INTEGER,
      resetAt: Date.now() + durationSeconds * 1000,
    })

    logger.logSecurity({
      type: 'rate_limit',
      details: `Identifier blocked for ${durationSeconds} seconds`,
      userId: identifier,
    })
  }

  /**
   * Check if identifier is blocked
   */
  async isBlocked(identifier: string): Promise<boolean> {
    const key = `ratelimit:blocked:${identifier}`

    if (this.redis) {
      try {
        const blocked = await this.redis.get(key)
        return blocked === '1'
      } catch (error) {
        logger.error('Failed to check if blocked in Redis', error as Error)
      }
    }

    return false
  }

  /**
   * Close Redis connection
   */
  async disconnect(): Promise<void> {
    if (this.redis) {
      await this.redis.quit()
    }
  }
}

// Export singleton instance
export const rateLimiter = new RateLimiter()

// Pre-configured rate limiters for different endpoints
export const RateLimiters = {
  // AI Tutor: 100 questions per day per student
  aiTutor: (userId: string) => ({
    identifier: `ai_tutor:${userId}`,
    limit: 100,
    window: 24 * 60 * 60, // 24 hours
  }),

  // Test Generator: 10 tests per day per student
  testGenerator: (userId: string) => ({
    identifier: `test_gen:${userId}`,
    limit: 10,
    window: 24 * 60 * 60, // 24 hours
  }),

  // WhatsApp Bot: 10 messages per minute per user
  whatsapp: (phoneNumber: string) => ({
    identifier: `whatsapp:${phoneNumber}`,
    limit: 10,
    window: 60, // 1 minute
  }),

  // Global API: 1000 requests per hour per IP
  globalApi: (ip: string) => ({
    identifier: `api:${ip}`,
    limit: 1000,
    window: 60 * 60, // 1 hour
  }),

  // Authentication: 5 attempts per 15 minutes
  auth: (ip: string) => ({
    identifier: `auth:${ip}`,
    limit: 5,
    window: 15 * 60, // 15 minutes
    blockDuration: 60 * 60, // 1 hour penalty
  }),
}

// Middleware helper for Next.js API routes
export async function withRateLimit<T>(
  config: RateLimitConfig,
  handler: () => Promise<T>
): Promise<T> {
  const result = await rateLimiter.checkLimit(config)

  if (!result.allowed) {
    const error: any = new Error('Rate limit exceeded')
    error.status = 429
    error.retryAfter = Math.ceil((result.resetAt.getTime() - Date.now()) / 1000)
    error.limit = result.limit
    error.remaining = result.remaining
    throw error
  }

  return handler()
}
