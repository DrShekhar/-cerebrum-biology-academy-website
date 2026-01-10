import { Redis } from '@upstash/redis'
import { logger } from '@/lib/utils/logger'

const isUpstashEnabled = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN

let upstashClient: Redis | null = null

export function getUpstashRedis(): Redis | null {
  if (!isUpstashEnabled) {
    return null
  }

  if (!upstashClient) {
    try {
      upstashClient = new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL!,
        token: process.env.UPSTASH_REDIS_REST_TOKEN!,
      })

      logger.info('Upstash Redis client initialized')
    } catch (error) {
      logger.error('Failed to initialize Upstash Redis', error)
      return null
    }
  }

  return upstashClient
}

export class UpstashCacheAdapter {
  private redis: Redis | null

  constructor() {
    this.redis = getUpstashRedis()
  }

  async get(key: string): Promise<string | null> {
    if (!this.redis) return null

    try {
      const value = await this.redis.get(key)
      return value as string | null
    } catch (error) {
      logger.error('Upstash get error', { key, error })
      return null
    }
  }

  async set(key: string, value: string, expirationSeconds?: number): Promise<void> {
    if (!this.redis) return

    try {
      if (expirationSeconds) {
        await this.redis.setex(key, expirationSeconds, value)
      } else {
        await this.redis.set(key, value)
      }
    } catch (error) {
      logger.error('Upstash set error', { key, error })
    }
  }

  async del(key: string): Promise<void> {
    if (!this.redis) return

    try {
      await this.redis.del(key)
    } catch (error) {
      logger.error('Upstash del error', { key, error })
    }
  }

  async incr(key: string): Promise<number> {
    if (!this.redis) {
      throw new Error('Redis not initialized')
    }

    try {
      return await this.redis.incr(key)
    } catch (error) {
      logger.error('Upstash incr error', { key, error })
      throw error // Re-throw so callers can handle with fallback
    }
  }

  /**
   * Atomically increment a key and set expiration in a single operation.
   * This prevents race conditions where incr succeeds but expire fails,
   * which could lead to keys never expiring and permanently blocking users.
   */
  async incrWithExpire(key: string, expirationSeconds: number): Promise<number> {
    if (!this.redis) {
      throw new Error('Redis not initialized')
    }

    try {
      // Use pipeline to execute both commands atomically in a single round-trip
      const pipeline = this.redis.pipeline()
      pipeline.incr(key)
      pipeline.expire(key, expirationSeconds)

      const results = await pipeline.exec()
      // First result is the incr value
      const incrResult = results[0] as number
      return incrResult
    } catch (error) {
      logger.error('Upstash incrWithExpire error', { key, error })
      throw error
    }
  }

  async expire(key: string, seconds: number): Promise<void> {
    if (!this.redis) return

    try {
      await this.redis.expire(key, seconds)
    } catch (error) {
      logger.error('Upstash expire error', { key, error })
    }
  }

  async ttl(key: string): Promise<number> {
    if (!this.redis) return -1

    try {
      return await this.redis.ttl(key)
    } catch (error) {
      logger.error('Upstash ttl error', { key, error })
      return -1
    }
  }

  async keys(pattern: string): Promise<string[]> {
    if (!this.redis) return []

    try {
      return await this.redis.keys(pattern)
    } catch (error) {
      logger.error('Upstash keys error', { pattern, error })
      return []
    }
  }

  async sadd(key: string, member: string): Promise<void> {
    if (!this.redis) return

    try {
      await this.redis.sadd(key, member)
    } catch (error) {
      logger.error('Upstash sadd error', { key, error })
    }
  }

  async srem(key: string, member: string): Promise<void> {
    if (!this.redis) return

    try {
      await this.redis.srem(key, member)
    } catch (error) {
      logger.error('Upstash srem error', { key, error })
    }
  }

  async scard(key: string): Promise<number> {
    if (!this.redis) return 0

    try {
      return await this.redis.scard(key)
    } catch (error) {
      logger.error('Upstash scard error', { key, error })
      return 0
    }
  }

  async zadd(key: string, score: number, member: string): Promise<void> {
    if (!this.redis) return

    try {
      await this.redis.zadd(key, { score, member })
    } catch (error) {
      logger.error('Upstash zadd error', { key, error })
    }
  }

  async zrange(key: string, start: number, stop: number): Promise<string[]> {
    if (!this.redis) return []

    try {
      return await this.redis.zrange(key, start, stop)
    } catch (error) {
      logger.error('Upstash zrange error', { key, error })
      return []
    }
  }

  async ping(): Promise<string> {
    if (!this.redis) return 'PONG (mock)'

    try {
      await this.redis.ping()
      return 'PONG'
    } catch (error) {
      logger.error('Upstash ping error', error)
      return 'ERROR'
    }
  }

  isEnabled(): boolean {
    return this.redis !== null
  }
}

export const upstashCache = new UpstashCacheAdapter()

export function preferUpstash(): boolean {
  return (
    !!isUpstashEnabled &&
    (process.env.PREFER_UPSTASH === 'true' || process.env.VERCEL_ENV === 'production')
  )
}
