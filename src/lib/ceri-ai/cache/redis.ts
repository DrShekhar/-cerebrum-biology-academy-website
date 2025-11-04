import { Redis } from 'ioredis'

// Redis client singleton
let redisClient: Redis | null = null

export function getRedisClient(): Redis {
  if (!redisClient) {
    const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379'

    redisClient = new Redis(redisUrl, {
      maxRetriesPerRequest: 3,
      retryStrategy(times) {
        const delay = Math.min(times * 50, 2000)
        return delay
      },
      reconnectOnError(err) {
        const targetError = 'READONLY'
        if (err.message.includes(targetError)) {
          // Only reconnect when the error contains "READONLY"
          return true
        }
        return false
      },
    })

    redisClient.on('error', (err) => {
      console.error('Redis Client Error:', err)
    })

    redisClient.on('connect', () => {
      console.log('✅ Redis connected successfully')
    })
  }

  return redisClient
}

// Cache key generators
export const CacheKeys = {
  chatResponse: (prompt: string) => `ceri:chat:${hashString(prompt)}`,
  userConversation: (userId: string, conversationId: string) =>
    `ceri:conversation:${userId}:${conversationId}`,
  studyPlan: (userId: string) => `ceri:plan:${userId}`,
  diagram: (diagramId: string) => `ceri:diagram:${diagramId}`,
}

// Simple hash function for cache keys
function hashString(str: string): string {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36)
}

// Cache utilities
export async function getCached<T>(key: string): Promise<T | null> {
  try {
    const redis = getRedisClient()
    const cached = await redis.get(key)
    return cached ? JSON.parse(cached) : null
  } catch (error) {
    console.error('Cache get error:', error)
    return null
  }
}

export async function setCache<T>(key: string, value: T, ttlSeconds: number = 3600): Promise<void> {
  try {
    const redis = getRedisClient()
    await redis.setex(key, ttlSeconds, JSON.stringify(value))
  } catch (error) {
    console.error('Cache set error:', error)
  }
}

export async function deleteCache(key: string): Promise<void> {
  try {
    const redis = getRedisClient()
    await redis.del(key)
  } catch (error) {
    console.error('Cache delete error:', error)
  }
}

// Disconnect on app shutdown
export async function disconnectRedis(): Promise<void> {
  if (redisClient) {
    await redisClient.quit()
    redisClient = null
    console.log('Redis disconnected')
  }
}
