/**
 * Centralized Redis Client Factory
 * Provides lazy initialization to prevent build-time connections
 * Ensures Redis is only initialized during runtime on the server
 */

import Redis from 'ioredis'

let redisClient: Redis | null = null
let isInitializing = false

/**
 * Get or create Redis client with lazy initialization
 * Returns null during build time or on client-side
 */
export function getRedisClient(): Redis | null {
  // Skip Redis on client-side
  if (typeof window !== 'undefined') {
    return null
  }

  // Skip Redis during build time
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return null
  }

  // Return existing client if already initialized
  if (redisClient) {
    return redisClient
  }

  // Prevent concurrent initialization
  if (isInitializing) {
    return null
  }

  try {
    isInitializing = true

    const redisUrl = process.env.REDIS_URL

    // Skip Redis if URL not configured (development mode)
    if (!redisUrl || redisUrl === 'redis://localhost:6379') {
      console.log('⚠️ Redis not configured, running without cache')
      isInitializing = false
      return null
    }

    // Initialize Redis client
    redisClient = new Redis(redisUrl, {
      maxRetriesPerRequest: 3,
      enableOfflineQueue: false,
      lazyConnect: true,
      retryStrategy(times) {
        if (times > 3) {
          console.error('❌ Redis connection failed after 3 retries')
          return null
        }
        return Math.min(times * 200, 2000)
      },
    })

    // Set up event handlers
    redisClient.on('connect', () => {
      console.log('✅ Redis connected successfully')
    })

    redisClient.on('error', (error) => {
      console.error('❌ Redis error:', error.message)
    })

    redisClient.on('close', () => {
      console.log('🔌 Redis connection closed')
      redisClient = null
    })

    // Connect asynchronously
    redisClient.connect().catch((error) => {
      console.error('❌ Redis connection error:', error.message)
      redisClient = null
    })

    isInitializing = false
    return redisClient
  } catch (error) {
    console.error('❌ Failed to initialize Redis:', error)
    isInitializing = false
    return null
  }
}

/**
 * Create a new Redis instance with custom configuration
 * Still respects build-time and client-side checks
 */
export function createRedisClient(config?: {
  host?: string
  port?: number
  password?: string
  db?: number
  maxRetriesPerRequest?: number
}): Redis | null {
  // Skip Redis on client-side or during build
  if (typeof window !== 'undefined' || process.env.NEXT_PHASE === 'phase-production-build') {
    return null
  }

  // Skip Redis if URL not configured (development mode without Redis)
  const redisUrl = process.env.REDIS_URL
  if (!redisUrl || redisUrl === 'redis://localhost:6379') {
    console.log('⚠️ Redis not configured for createRedisClient, skipping initialization')
    return null
  }

  try {
    const client = new Redis({
      host: config?.host || 'localhost',
      port: config?.port || 6379,
      password: config?.password,
      db: config?.db || 0,
      maxRetriesPerRequest: config?.maxRetriesPerRequest || 3,
      enableOfflineQueue: false,
      lazyConnect: true,
    })

    client.on('error', (error) => {
      console.error('❌ Redis error:', error.message)
    })

    return client
  } catch (error) {
    console.error('❌ Failed to create Redis client:', error)
    return null
  }
}

/**
 * Gracefully close Redis connection
 */
export async function closeRedisClient(): Promise<void> {
  if (redisClient) {
    try {
      await redisClient.quit()
      redisClient = null
      console.log('✅ Redis connection closed gracefully')
    } catch (error) {
      console.error('❌ Error closing Redis connection:', error)
    }
  }
}

/**
 * Check if Redis is available
 */
export function isRedisAvailable(): boolean {
  return redisClient !== null && redisClient.status === 'ready'
}
