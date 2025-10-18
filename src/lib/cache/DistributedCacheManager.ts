/**
 * Distributed Cache Manager - High-Performance Caching System
 * Designed for millions of concurrent students with sub-millisecond response times
 */

import { getRedisClient } from '@/lib/cache/redis'

// Conditional import for Edge Runtime compatibility
let Redis: any = null

// Check if we're in Edge Runtime before attempting any imports
const isEdgeRuntime =
  typeof EdgeRuntime !== 'undefined' ||
  typeof process === 'undefined' ||
  !process.nextTick ||
  typeof window !== 'undefined'

if (!isEdgeRuntime) {
  try {
    // Only import Redis in Node.js runtime
    Redis = require('ioredis')
  } catch (error) {
    console.log('📦 Redis not available, using mock cache')
  }
} else {
  console.log('📦 Edge Runtime detected, using in-memory cache')
}

import { createHash } from 'crypto'

interface CacheConfig {
  redis: {
    primary: string
    replicas: string[]
    cluster: boolean
    maxRetries: number
    retryDelayOnFailover: number
  }
  defaultTTL: number
  compressionThreshold: number
  prefixes: {
    student: string
    question: string
    session: string
    analytics: string
  }
}

interface CacheEntry<T = any> {
  data: T
  timestamp: number
  ttl: number
  version: string
  compressed: boolean
  metadata?: Record<string, any>
}

interface CacheStats {
  hits: number
  misses: number
  sets: number
  deletes: number
  evictions: number
  hitRate: number
  avgResponseTime: number
}

export class DistributedCacheManager {
  private primaryRedis: any
  private replicaRedis: any[]
  private config: CacheConfig
  private stats: CacheStats
  private compressionEnabled: boolean
  private isEdgeRuntime: boolean
  private memoryCache: Map<string, any> = new Map()

  constructor(config?: CacheConfig) {
    this.isEdgeRuntime = !Redis || typeof process === 'undefined' || !process.nextTick

    this.config = config || {
      redis: {
        primary: 'redis://localhost:6379',
        replicas: [],
        cluster: false,
        maxRetries: 3,
        retryDelayOnFailover: 100,
      },
      defaultTTL: 3600,
      compressionThreshold: 1024,
      prefixes: {
        student: 'student:',
        session: 'session:',
        query: 'query:',
        assessment: 'assessment:',
        content: 'content:',
      },
    }

    this.stats = {
      hits: 0,
      misses: 0,
      sets: 0,
      deletes: 0,
      evictions: 0,
      hitRate: 0,
      avgResponseTime: 0,
    }
    this.compressionEnabled = true

    if (!this.isEdgeRuntime) {
      this.initializeRedisConnections()
    } else {
      console.log('🔄 Using in-memory cache for Edge Runtime')
      this.primaryRedis = null
      this.replicaRedis = []
    }
  }

  private initializeRedisConnections(): void {
    // Primary Redis instance for writes
    if (this.config.redis.cluster) {
      this.primaryRedis = new Redis.Cluster([this.config.redis.primary], {
        redisOptions: {
          maxRetriesPerRequest: this.config.redis.maxRetries,
          retryDelayOnFailover: this.config.redis.retryDelayOnFailover,
        },
      })
    } else {
      this.primaryRedis = getRedisClient(this.config.redis.primary) as any
    }

    // Read replicas for load distribution (use mock clients when Redis disabled)
    this.replicaRedis = this.config.redis.replicas.map((replica) => getRedisClient(replica) as any)

    this.setupRedisEventHandlers()
  }

  private setupRedisEventHandlers(): void {
    this.primaryRedis.on('connect', () => {
      console.log('✅ Primary Redis connected')
    })

    this.primaryRedis.on('error', (error) => {
      console.error('❌ Primary Redis error:', error)
    })

    this.replicaRedis.forEach((replica, index) => {
      replica.on('connect', () => {
        console.log(`✅ Redis replica ${index + 1} connected`)
      })

      replica.on('error', (error) => {
        console.error(`❌ Redis replica ${index + 1} error:`, error)
      })
    })
  }

  /**
   * Get data from cache with intelligent read distribution
   */
  async get<T>(key: string, useReplica: boolean = true): Promise<T | null> {
    const startTime = Date.now()

    try {
      // Handle Edge Runtime with in-memory cache
      if (this.isEdgeRuntime) {
        const cached = this.memoryCache.get(key)
        if (!cached) {
          this.stats.misses++
          this.updateStats(startTime)
          return null
        }

        if (this.isExpired(cached)) {
          this.memoryCache.delete(key)
          this.stats.misses++
          this.updateStats(startTime)
          return null
        }

        this.stats.hits++
        this.updateStats(startTime)
        return cached.compressed ? await this.decompress(cached.data) : cached.data
      }

      const redis =
        useReplica && this.replicaRedis.length > 0 ? this.getRandomReplica() : this.primaryRedis

      const cachedData = await redis.get(key)

      if (cachedData === null) {
        this.stats.misses++
        this.updateStats(startTime)
        return null
      }

      const entry: CacheEntry<T> = JSON.parse(cachedData)

      // Check if entry has expired
      if (this.isExpired(entry)) {
        await this.delete(key)
        this.stats.misses++
        this.updateStats(startTime)
        return null
      }

      // Decompress if needed
      const data = entry.compressed ? await this.decompress(entry.data) : entry.data

      this.stats.hits++
      this.updateStats(startTime)
      return data
    } catch (error) {
      console.error('Cache get error:', error)
      this.stats.misses++
      this.updateStats(startTime)
      return null
    }
  }

  /**
   * Set data in cache with compression and TTL optimization
   */
  async set<T>(
    key: string,
    data: T,
    ttl?: number,
    metadata?: Record<string, any>
  ): Promise<boolean> {
    try {
      const serializedData = JSON.stringify(data)
      const shouldCompress = serializedData.length > this.config.compressionThreshold

      const entry: CacheEntry<T> = {
        data: shouldCompress ? await this.compress(data) : data,
        timestamp: Date.now(),
        ttl: ttl || this.config.defaultTTL,
        version: this.generateVersion(),
        compressed: shouldCompress,
        metadata,
      }

      // Handle Edge Runtime with in-memory cache
      if (this.isEdgeRuntime) {
        this.memoryCache.set(key, entry)
        // Set up expiration for memory cache
        const expiryTime = ttl || this.config.defaultTTL
        setTimeout(() => {
          this.memoryCache.delete(key)
        }, expiryTime * 1000)
        this.stats.sets++
        return true
      }

      const entryData = JSON.stringify(entry)
      const expiryTime = ttl || this.config.defaultTTL

      await this.primaryRedis.setex(key, expiryTime, entryData)
      this.stats.sets++

      return true
    } catch (error) {
      console.error('Cache set error:', error)
      return false
    }
  }

  /**
   * Multi-get operation for batch retrieval
   */
  async mget<T>(keys: string[]): Promise<Map<string, T | null>> {
    const result = new Map<string, T | null>()

    try {
      const redis = this.replicaRedis.length > 0 ? this.getRandomReplica() : this.primaryRedis

      const cachedData = await redis.mget(...keys)

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        const data = cachedData[i]

        if (data === null) {
          result.set(key, null)
          this.stats.misses++
          continue
        }

        try {
          const entry: CacheEntry<T> = JSON.parse(data)

          if (this.isExpired(entry)) {
            result.set(key, null)
            this.stats.misses++
            // Schedule cleanup
            this.delete(key).catch(console.error)
            continue
          }

          const decompressedData = entry.compressed ? await this.decompress(entry.data) : entry.data

          result.set(key, decompressedData)
          this.stats.hits++
        } catch (parseError) {
          console.error('Parse error for key', key, parseError)
          result.set(key, null)
          this.stats.misses++
        }
      }

      return result
    } catch (error) {
      console.error('Cache mget error:', error)
      // Return empty results
      keys.forEach((key) => result.set(key, null))
      this.stats.misses += keys.length
      return result
    }
  }

  /**
   * Multi-set operation for batch storage
   */
  async mset<T>(entries: Map<string, { data: T; ttl?: number }>): Promise<boolean> {
    try {
      const pipeline = this.primaryRedis.pipeline()

      for (const [key, { data, ttl }] of entries) {
        const serializedData = JSON.stringify(data)
        const shouldCompress = serializedData.length > this.config.compressionThreshold

        const entry: CacheEntry<T> = {
          data: shouldCompress ? await this.compress(data) : data,
          timestamp: Date.now(),
          ttl: ttl || this.config.defaultTTL,
          version: this.generateVersion(),
          compressed: shouldCompress,
        }

        const entryData = JSON.stringify(entry)
        const expiryTime = ttl || this.config.defaultTTL

        pipeline.setex(key, expiryTime, entryData)
      }

      await pipeline.exec()
      this.stats.sets += entries.size

      return true
    } catch (error) {
      console.error('Cache mset error:', error)
      return false
    }
  }

  /**
   * Delete key from cache
   */
  async delete(key: string): Promise<boolean> {
    try {
      // Handle Edge Runtime with in-memory cache
      if (this.isEdgeRuntime) {
        const existed = this.memoryCache.has(key)
        this.memoryCache.delete(key)
        this.stats.deletes++
        return existed
      }

      const result = await this.primaryRedis.del(key)
      this.stats.deletes++
      return result > 0
    } catch (error) {
      console.error('Cache delete error:', error)
      return false
    }
  }

  /**
   * Delete multiple keys
   */
  async mdelete(keys: string[]): Promise<number> {
    try {
      const result = await this.primaryRedis.del(...keys)
      this.stats.deletes += result
      return result
    } catch (error) {
      console.error('Cache mdelete error:', error)
      return 0
    }
  }

  /**
   * Clear cache by pattern
   */
  async clearByPattern(pattern: string): Promise<number> {
    try {
      const keys = await this.primaryRedis.keys(pattern)
      if (keys.length === 0) return 0

      const result = await this.primaryRedis.del(...keys)
      this.stats.deletes += result
      return result
    } catch (error) {
      console.error('Cache clear by pattern error:', error)
      return 0
    }
  }

  /**
   * Increment counter with TTL
   */
  async increment(key: string, ttl?: number): Promise<number> {
    try {
      const pipeline = this.primaryRedis.pipeline()
      pipeline.incr(key)
      if (ttl) {
        pipeline.expire(key, ttl)
      }

      const results = await pipeline.exec()
      return (results?.[0]?.[1] as number) || 0
    } catch (error) {
      console.error('Cache increment error:', error)
      return 0
    }
  }

  /**
   * Add item to sorted set for leaderboards
   */
  async addToSortedSet(key: string, score: number, member: string, ttl?: number): Promise<boolean> {
    try {
      const pipeline = this.primaryRedis.pipeline()
      pipeline.zadd(key, score, member)
      if (ttl) {
        pipeline.expire(key, ttl)
      }

      await pipeline.exec()
      return true
    } catch (error) {
      console.error('Cache sorted set add error:', error)
      return false
    }
  }

  /**
   * Get sorted set range for leaderboards
   */
  async getSortedSetRange(
    key: string,
    start: number = 0,
    end: number = -1,
    withScores: boolean = true
  ): Promise<string[] | Array<{ member: string; score: number }>> {
    try {
      const redis = this.getRandomReplica()

      if (withScores) {
        const results = await redis.zrevrange(key, start, end, 'WITHSCORES')
        const formatted = []

        for (let i = 0; i < results.length; i += 2) {
          formatted.push({
            member: results[i],
            score: parseFloat(results[i + 1]),
          })
        }

        return formatted
      } else {
        return await redis.zrevrange(key, start, end)
      }
    } catch (error) {
      console.error('Cache sorted set range error:', error)
      return []
    }
  }

  /**
   * Cache warming for frequently accessed data
   */
  async warmCache(warmupData: Array<{ key: string; data: any; ttl?: number }>): Promise<void> {
    console.log(`🔥 Warming cache with ${warmupData.length} entries...`)

    const batchSize = 100
    for (let i = 0; i < warmupData.length; i += batchSize) {
      const batch = warmupData.slice(i, i + batchSize)
      const entries = new Map()

      batch.forEach((item) => {
        entries.set(item.key, { data: item.data, ttl: item.ttl })
      })

      await this.mset(entries)
    }

    console.log(`✅ Cache warmed with ${warmupData.length} entries`)
  }

  /**
   * Get cache statistics
   */
  getStats(): CacheStats & { totalRequests: number } {
    const totalRequests = this.stats.hits + this.stats.misses
    const hitRate = totalRequests > 0 ? (this.stats.hits / totalRequests) * 100 : 0

    return {
      ...this.stats,
      totalRequests,
      hitRate: Math.round(hitRate * 100) / 100,
    }
  }

  /**
   * Health check for all Redis instances
   */
  async healthCheck(): Promise<{ primary: boolean; replicas: boolean[] }> {
    const primary = await this.checkRedisHealth(this.primaryRedis)
    const replicas = await Promise.all(
      this.replicaRedis.map((replica) => this.checkRedisHealth(replica))
    )

    return { primary, replicas }
  }

  // Private helper methods

  private getRandomReplica(): Redis {
    if (this.replicaRedis.length === 0) {
      return this.primaryRedis
    }

    const randomIndex = Math.floor(Math.random() * this.replicaRedis.length)
    return this.replicaRedis[randomIndex]
  }

  private isExpired(entry: CacheEntry): boolean {
    const now = Date.now()
    const expiryTime = entry.timestamp + entry.ttl * 1000
    return now > expiryTime
  }

  private generateVersion(): string {
    return createHash('md5').update(Date.now().toString()).digest('hex').slice(0, 8)
  }

  private async compress(data: any): Promise<string> {
    // Implement compression logic (gzip, lz4, etc.)
    // For now, returning JSON string
    return JSON.stringify(data)
  }

  private async decompress(data: string): Promise<any> {
    // Implement decompression logic
    // For now, parsing JSON
    return JSON.parse(data)
  }

  private updateStats(startTime: number): void {
    const responseTime = Date.now() - startTime
    const totalRequests = this.stats.hits + this.stats.misses

    if (totalRequests === 1) {
      this.stats.avgResponseTime = responseTime
    } else {
      this.stats.avgResponseTime =
        (this.stats.avgResponseTime * (totalRequests - 1) + responseTime) / totalRequests
    }

    this.stats.hitRate = (this.stats.hits / totalRequests) * 100
  }

  private async checkRedisHealth(redis: Redis): Promise<boolean> {
    try {
      const result = await redis.ping()
      return result === 'PONG'
    } catch (error) {
      return false
    }
  }

  /**
   * Generate cache key with prefix
   */
  generateKey(type: keyof CacheConfig['prefixes'], identifier: string, suffix?: string): string {
    const prefix = this.config.prefixes[type]
    const key = `${prefix}:${identifier}`
    return suffix ? `${key}:${suffix}` : key
  }

  /**
   * Graceful shutdown
   */
  async shutdown(): Promise<void> {
    console.log('🔄 Shutting down cache manager...')

    await this.primaryRedis.quit()
    await Promise.all(this.replicaRedis.map((replica) => replica.quit()))

    console.log('✅ Cache manager shutdown complete')
  }
}
