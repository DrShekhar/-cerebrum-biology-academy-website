import Redis from 'ioredis'

/**
 * Redis Configuration for Cerebrum Biology Academy
 *
 * Environment-aware Redis client creation that:
 * - Skips Redis during build time (avoids connection errors in CI/CD)
 * - Respects REDIS_ENABLED environment variable
 * - Uses lazy connection for better error handling
 * - Provides null fallback for graceful degradation
 */

const REDIS_ENABLED = process.env.REDIS_ENABLED === 'true'
const IS_BUILD_TIME = process.env.NEXT_PHASE === 'phase-production-build'
const IS_SERVER = typeof window === 'undefined'

export interface RedisConfig {
  host?: string
  port?: number
  url?: string
  password?: string
}

/**
 * Create Redis client with environment-aware logic
 * Returns null if Redis is disabled or unavailable
 */
export const createRedisClient = (config?: RedisConfig): Redis | null => {
  // Skip Redis during build or when explicitly disabled
  if (IS_BUILD_TIME || !REDIS_ENABLED || !IS_SERVER) {
    if (IS_BUILD_TIME) {
      console.log('⏭️  Skipping Redis during build time')
    }
    return null
  }

  try {
    const redisConfig: any = {
      // Lazy connect - don't actually connect until first command
      lazyConnect: true,

      // Don't retry connections (fail fast)
      maxRetriesPerRequest: 1,
      retryStrategy: () => null,

      // Timeout settings
      connectTimeout: 5000,
      commandTimeout: 3000,

      // Reconnect settings
      enableOfflineQueue: false,
      enableReadyCheck: true,

      // Error handling
      showFriendlyErrorStack: process.env.NODE_ENV !== 'production',
    }

    // Use Redis URL if provided, otherwise use host/port
    if (config?.url || process.env.REDIS_URL) {
      redisConfig.url = config?.url || process.env.REDIS_URL
    } else {
      redisConfig.host = config?.host || process.env.REDIS_HOST || 'localhost'
      redisConfig.port = config?.port || parseInt(process.env.REDIS_PORT || '6379')
    }

    // Add password if provided
    if (config?.password || process.env.REDIS_PASSWORD) {
      redisConfig.password = config?.password || process.env.REDIS_PASSWORD
    }

    const redis = new Redis(redisConfig)

    // Handle connection events
    redis.on('error', (error) => {
      console.warn('⚠️  Redis connection error (continuing without cache):', error.message)
    })

    redis.on('connect', () => {
      console.log('✅ Redis connected successfully')
    })

    redis.on('ready', () => {
      console.log('✅ Redis ready')
    })

    redis.on('close', () => {
      console.log('🔌 Redis connection closed')
    })

    return redis
  } catch (error) {
    console.warn('⚠️  Failed to create Redis client (continuing without cache):', error)
    return null
  }
}

/**
 * Singleton Redis client instance
 * Created lazily on first use
 */
let redisClient: Redis | null | undefined = undefined

export const getRedisClient = (): Redis | null => {
  if (redisClient === undefined) {
    redisClient = createRedisClient()
  }
  return redisClient
}

/**
 * Close Redis connection gracefully
 */
export const closeRedis = async (): Promise<void> => {
  if (redisClient) {
    await redisClient.quit()
    redisClient = null
  }
}

/**
 * Cache wrapper with fallback
 * Automatically handles Redis unavailability
 */
export class ResilientCache {
  private redis: Redis | null
  private memoryCache: Map<string, { value: any; expiresAt: number }>

  constructor() {
    this.redis = getRedisClient()
    this.memoryCache = new Map()
  }

  async get<T = any>(key: string): Promise<T | null> {
    // Try Redis first
    if (this.redis) {
      try {
        const value = await this.redis.get(key)
        if (value) return JSON.parse(value)
      } catch (error) {
        console.warn(`Redis GET failed for key "${key}":`, error)
      }
    }

    // Fallback to memory cache
    const cached = this.memoryCache.get(key)
    if (cached && cached.expiresAt > Date.now()) {
      return cached.value
    }

    return null
  }

  async set(key: string, value: any, ttlSeconds: number = 3600): Promise<boolean> {
    const serialized = JSON.stringify(value)

    // Try Redis first
    if (this.redis) {
      try {
        await this.redis.setex(key, ttlSeconds, serialized)
        return true
      } catch (error) {
        console.warn(`Redis SET failed for key "${key}":`, error)
      }
    }

    // Fallback to memory cache
    this.memoryCache.set(key, {
      value,
      expiresAt: Date.now() + ttlSeconds * 1000,
    })
    return true
  }

  async del(key: string): Promise<boolean> {
    // Try Redis first
    if (this.redis) {
      try {
        await this.redis.del(key)
      } catch (error) {
        console.warn(`Redis DEL failed for key "${key}":`, error)
      }
    }

    // Also delete from memory cache
    this.memoryCache.delete(key)
    return true
  }

  async exists(key: string): Promise<boolean> {
    // Try Redis first
    if (this.redis) {
      try {
        const result = await this.redis.exists(key)
        return result === 1
      } catch (error) {
        console.warn(`Redis EXISTS failed for key "${key}":`, error)
      }
    }

    // Fallback to memory cache
    const cached = this.memoryCache.get(key)
    return cached !== undefined && cached.expiresAt > Date.now()
  }

  /**
   * Clean up expired entries from memory cache
   */
  cleanupMemoryCache(): void {
    const now = Date.now()
    for (const [key, entry] of this.memoryCache.entries()) {
      if (entry.expiresAt <= now) {
        this.memoryCache.delete(key)
      }
    }
  }
}

// Export singleton cache instance
export const cache = new ResilientCache()

// Cleanup memory cache every 5 minutes
if (IS_SERVER && !IS_BUILD_TIME) {
  setInterval(
    () => {
      cache.cleanupMemoryCache()
    },
    5 * 60 * 1000
  )
}
