/**
 * Cache Configuration - Centralized Configuration for All Caching Systems
 * Production-ready configuration for millions of students
 */

import { DistributedCacheManager } from './DistributedCacheManager'
import { QueryCacheOptimizer } from './QueryCacheOptimizer'
import { SessionCacheManager } from './SessionCacheManager'

interface EnvironmentConfig {
  redis: {
    primary: string
    replicas: string[]
    cluster: boolean
    maxRetries: number
    retryDelayOnFailover: number
    enableOfflineQueue: boolean
    lazyConnect: boolean
  }
  performance: {
    compressionThreshold: number
    defaultTTL: number
    maxMemoryPolicy: 'allkeys-lru' | 'volatile-lru' | 'allkeys-lfu' | 'volatile-lfu'
    enablePipelining: boolean
  }
  monitoring: {
    enableMetrics: boolean
    metricsInterval: number
    slowQueryThreshold: number
    enableQueryAnalytics: boolean
  }
}

class CacheConfigurationManager {
  private static instance: CacheConfigurationManager
  private config: EnvironmentConfig
  private distributedCache: DistributedCacheManager
  private queryOptimizer: QueryCacheOptimizer
  private sessionManager: SessionCacheManager

  private constructor() {
    this.config = this.loadConfiguration()
    this.initializeCacheManagers()
  }

  static getInstance(): CacheConfigurationManager {
    if (!CacheConfigurationManager.instance) {
      CacheConfigurationManager.instance = new CacheConfigurationManager()
    }
    return CacheConfigurationManager.instance
  }

  private loadConfiguration(): EnvironmentConfig {
    const environment = process.env.NODE_ENV || 'development'

    const baseConfig: EnvironmentConfig = {
      redis: {
        primary: process.env.REDIS_PRIMARY_URL || 'redis://localhost:6379',
        replicas: this.parseRedisReplicas(),
        cluster: process.env.REDIS_CLUSTER_MODE === 'true',
        maxRetries: parseInt(process.env.REDIS_MAX_RETRIES || '3'),
        retryDelayOnFailover: parseInt(process.env.REDIS_RETRY_DELAY || '100'),
        enableOfflineQueue: true,
        lazyConnect: true,
      },
      performance: {
        compressionThreshold: parseInt(process.env.CACHE_COMPRESSION_THRESHOLD || '1024'),
        defaultTTL: parseInt(process.env.CACHE_DEFAULT_TTL || '3600'),
        maxMemoryPolicy: (process.env.REDIS_MAX_MEMORY_POLICY as any) || 'allkeys-lru',
        enablePipelining: process.env.REDIS_ENABLE_PIPELINING !== 'false',
      },
      monitoring: {
        enableMetrics: process.env.CACHE_ENABLE_METRICS !== 'false',
        metricsInterval: parseInt(process.env.CACHE_METRICS_INTERVAL || '60000'),
        slowQueryThreshold: parseInt(process.env.SLOW_QUERY_THRESHOLD || '1000'),
        enableQueryAnalytics: process.env.ENABLE_QUERY_ANALYTICS !== 'false',
      },
    }

    return this.getEnvironmentSpecificConfig(environment, baseConfig)
  }

  private parseRedisReplicas(): string[] {
    const replicasEnv = process.env.REDIS_REPLICAS
    if (!replicasEnv) return []

    return replicasEnv
      .split(',')
      .map((url) => url.trim())
      .filter(Boolean)
  }

  private getEnvironmentSpecificConfig(
    environment: string,
    baseConfig: EnvironmentConfig
  ): EnvironmentConfig {
    switch (environment) {
      case 'production':
        return {
          ...baseConfig,
          redis: {
            ...baseConfig.redis,
            cluster: true,
            maxRetries: 5,
            retryDelayOnFailover: 200,
          },
          performance: {
            ...baseConfig.performance,
            compressionThreshold: 512, // More aggressive compression in production
            defaultTTL: 7200, // 2 hours default TTL
            enablePipelining: true,
          },
          monitoring: {
            ...baseConfig.monitoring,
            enableMetrics: true,
            metricsInterval: 30000, // 30 seconds
            slowQueryThreshold: 500, // Stricter in production
          },
        }

      case 'staging':
        return {
          ...baseConfig,
          redis: {
            ...baseConfig.redis,
            cluster: false,
            maxRetries: 3,
          },
          performance: {
            ...baseConfig.performance,
            defaultTTL: 3600,
            compressionThreshold: 1024,
          },
          monitoring: {
            ...baseConfig.monitoring,
            metricsInterval: 60000,
            slowQueryThreshold: 1000,
          },
        }

      case 'development':
      default:
        return {
          ...baseConfig,
          redis: {
            ...baseConfig.redis,
            cluster: false,
            maxRetries: 1,
            retryDelayOnFailover: 50,
          },
          performance: {
            ...baseConfig.performance,
            defaultTTL: 1800, // 30 minutes for faster testing
            compressionThreshold: 2048, // Less aggressive compression
          },
          monitoring: {
            ...baseConfig.monitoring,
            metricsInterval: 120000, // 2 minutes
            slowQueryThreshold: 2000, // More lenient in development
          },
        }
    }
  }

  private initializeCacheManagers(): void {
    // Initialize Distributed Cache Manager
    this.distributedCache = new DistributedCacheManager({
      redis: this.config.redis,
      defaultTTL: this.config.performance.defaultTTL,
      compressionThreshold: this.config.performance.compressionThreshold,
      prefixes: {
        student: 'student',
        question: 'query',
        session: 'session',
        analytics: 'analytics',
      },
    })

    // Initialize Query Cache Optimizer
    this.queryOptimizer = new QueryCacheOptimizer(this.distributedCache, {
      defaultTTL: this.config.performance.defaultTTL,
      adaptiveTTL: {
        enabled: true,
        minTTL: 300, // 5 minutes
        maxTTL: 86400, // 24 hours
        performanceThreshold: this.config.monitoring.slowQueryThreshold,
      },
      invalidation: {
        enabled: true,
        patterns: this.getQueryInvalidationPatterns(),
      },
      compression: {
        enabled: true,
        threshold: this.config.performance.compressionThreshold,
      },
      monitoring: {
        slowQueryThreshold: this.config.monitoring.slowQueryThreshold,
        enableQueryAnalytics: this.config.monitoring.enableQueryAnalytics,
      },
    })

    // Initialize Session Cache Manager
    this.sessionManager = new SessionCacheManager(this.distributedCache)

    // Set up monitoring if enabled
    if (this.config.monitoring.enableMetrics) {
      this.setupMonitoring()
    }

    console.log('✅ Cache configuration initialized for', process.env.NODE_ENV || 'development')
  }

  private getQueryInvalidationPatterns() {
    return [
      {
        tables: ['students', 'student_profiles'],
        operations: ['UPDATE', 'DELETE'] as const,
        cachePatterns: ['student:*', 'session:*'],
      },
      {
        tables: ['questions', 'question_attempts'],
        operations: ['INSERT', 'UPDATE', 'DELETE'] as const,
        cachePatterns: ['query:*', 'analytics:*'],
      },
      {
        tables: ['courses', 'lessons'],
        operations: ['UPDATE', 'DELETE'] as const,
        cachePatterns: ['student:*', 'query:*'],
      },
      {
        tables: ['enrollments'],
        operations: ['INSERT', 'UPDATE', 'DELETE'] as const,
        cachePatterns: ['student:*', 'session:*'],
      },
      {
        tables: ['study_groups', 'group_members'],
        operations: ['INSERT', 'UPDATE', 'DELETE'] as const,
        cachePatterns: ['session:group:*', 'student:*:groups'],
      },
      {
        tables: ['notifications'],
        operations: ['INSERT', 'UPDATE'] as const,
        cachePatterns: ['student:*:notifications'],
      },
      {
        tables: ['performance_analytics'],
        operations: ['INSERT', 'UPDATE'] as const,
        cachePatterns: ['analytics:*', 'student:*:stats'],
      },
    ]
  }

  private setupMonitoring(): void {
    // Set up periodic metrics collection
    setInterval(async () => {
      await this.collectMetrics()
    }, this.config.monitoring.metricsInterval)

    // Set up health checks
    setInterval(
      async () => {
        await this.performHealthChecks()
      },
      5 * 60 * 1000
    ) // Every 5 minutes

    console.log('📊 Cache monitoring enabled')
  }

  private async collectMetrics(): Promise<void> {
    try {
      // Collect distributed cache metrics
      const cacheStats = this.distributedCache.getStats()

      // Collect query optimizer metrics
      const queryMetrics = this.queryOptimizer.getMetrics()

      // Log metrics (in production, send to monitoring service)
      if (process.env.NODE_ENV === 'development') {
        console.log('📊 Cache Metrics:', {
          cache: {
            hitRate: `${cacheStats.hitRate}%`,
            totalRequests: cacheStats.totalRequests,
            avgResponseTime: `${cacheStats.avgResponseTime.toFixed(2)}ms`,
          },
          queries: {
            hitRate: `${queryMetrics.cacheHitRate.toFixed(2)}%`,
            totalQueries: queryMetrics.totalQueries,
            slowQueries: queryMetrics.slowQueries,
            avgExecutionTime: `${queryMetrics.avgExecutionTime.toFixed(2)}ms`,
          },
        })
      }

      // In production, send to monitoring service (DataDog, New Relic, etc.)
      await this.sendMetricsToMonitoringService({
        timestamp: new Date(),
        cache: cacheStats,
        queries: queryMetrics,
      })
    } catch (error) {
      console.error('❌ Error collecting cache metrics:', error)
    }
  }

  private async performHealthChecks(): Promise<void> {
    try {
      const health = await this.distributedCache.healthCheck()

      const healthStatus = {
        primary: health.primary,
        replicas: health.replicas.filter(Boolean).length,
        totalReplicas: health.replicas.length,
        healthy: health.primary && health.replicas.some(Boolean),
      }

      if (!healthStatus.healthy) {
        console.error('❌ Cache health check failed:', healthStatus)
        // In production, trigger alerts
        await this.triggerHealthAlert(healthStatus)
      } else {
        console.log('✅ Cache health check passed')
      }
    } catch (error) {
      console.error('❌ Error performing health check:', error)
    }
  }

  private async sendMetricsToMonitoringService(metrics: any): Promise<void> {
    // Implementation would depend on your monitoring service
    // Examples: DataDog, New Relic, CloudWatch, Prometheus

    if (process.env.MONITORING_WEBHOOK_URL) {
      try {
        // Send to webhook endpoint
        // await fetch(process.env.MONITORING_WEBHOOK_URL, {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(metrics)
        // })
      } catch (error) {
        console.error('Failed to send metrics to monitoring service:', error)
      }
    }
  }

  private async triggerHealthAlert(healthStatus: any): Promise<void> {
    // Implementation would depend on your alerting system
    // Examples: PagerDuty, Slack, Discord, Email

    if (process.env.ALERT_WEBHOOK_URL) {
      try {
        // Send alert
        // await fetch(process.env.ALERT_WEBHOOK_URL, {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({
        //     alert: 'Cache Health Check Failed',
        //     severity: 'high',
        //     details: healthStatus,
        //     timestamp: new Date().toISOString()
        //   })
        // })
      } catch (error) {
        console.error('Failed to send health alert:', error)
      }
    }
  }

  /**
   * Get configured cache managers
   */
  getCacheManagers() {
    return {
      distributedCache: this.distributedCache,
      queryOptimizer: this.queryOptimizer,
      sessionManager: this.sessionManager,
    }
  }

  /**
   * Get current configuration
   */
  getConfiguration(): EnvironmentConfig {
    return { ...this.config }
  }

  /**
   * Warm up all caches with initial data
   */
  async warmUpCaches(): Promise<void> {
    console.log('🔥 Starting cache warm-up...')

    try {
      // Warm up frequently accessed student data
      await this.warmUpStudentCache()

      // Warm up common queries
      await this.warmUpQueryCache()

      // Warm up session data
      await this.warmUpSessionCache()

      console.log('✅ Cache warm-up completed successfully')
    } catch (error) {
      console.error('❌ Cache warm-up failed:', error)
    }
  }

  private async warmUpStudentCache(): Promise<void> {
    // Implementation would load frequently accessed student data
    console.log('🔥 Warming up student cache...')

    const warmupData = [
      { key: 'student:top_performers', data: [], ttl: 3600 },
      { key: 'student:leaderboard', data: [], ttl: 1800 },
      { key: 'student:recent_enrollments', data: [], ttl: 900 },
    ]

    await this.distributedCache.warmCache(warmupData)
  }

  private async warmUpQueryCache(): Promise<void> {
    // Implementation would pre-cache common database queries
    console.log('🔥 Warming up query cache...')

    const commonQueries = [
      {
        sql: 'SELECT * FROM courses WHERE status = ? ORDER BY popularity DESC',
        params: ['active'],
        expectedResult: [],
        ttl: 3600,
      },
      {
        sql: 'SELECT * FROM questions WHERE difficulty = ? AND subject = ?',
        params: ['intermediate', 'biology'],
        expectedResult: [],
        ttl: 7200,
      },
    ]

    await this.queryOptimizer.warmCache(commonQueries)
  }

  private async warmUpSessionCache(): Promise<void> {
    // Implementation would initialize session-related cache structures
    console.log('🔥 Warming up session cache...')
    // Session cache doesn't typically need pre-warming as it's real-time data
  }

  /**
   * Graceful shutdown of all cache systems
   */
  async shutdown(): Promise<void> {
    console.log('🔄 Shutting down cache systems...')

    try {
      await this.distributedCache.shutdown()
      console.log('✅ All cache systems shutdown completed')
    } catch (error) {
      console.error('❌ Error during cache shutdown:', error)
    }
  }
}

// Export singleton instance
export const cacheConfig = CacheConfigurationManager.getInstance()

// Export individual managers for direct access
export const getCacheManagers = () => cacheConfig.getCacheManagers()

// Export configuration
export const getCacheConfiguration = () => cacheConfig.getConfiguration()

// Export warm-up function
export const warmUpAllCaches = () => cacheConfig.warmUpCaches()

// Export shutdown function
export const shutdownCaches = () => cacheConfig.shutdown()
