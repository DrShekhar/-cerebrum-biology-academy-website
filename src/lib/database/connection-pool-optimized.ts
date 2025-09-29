/**
 * Advanced Connection Pool Manager for 10,000+ Concurrent Users
 * Production-ready PostgreSQL connection pooling with monitoring and optimization
 */

import { Pool, PoolClient, PoolConfig } from 'pg'
import { performance } from 'perf_hooks'
import { EventEmitter } from 'events'

interface ConnectionPoolMetrics {
  totalConnections: number
  activeConnections: number
  idleConnections: number
  waitingRequests: number
  totalQueries: number
  avgQueryTime: number
  slowQueries: Array<{
    query: string
    executionTime: number
    timestamp: Date
    stackTrace?: string
  }>
  connectionErrors: number
  queryErrors: number
  poolStats: {
    acquired: number
    released: number
    created: number
    destroyed: number
    timeout: number
  }
}

interface QueryOptions {
  timeout?: number
  priority?: 'high' | 'normal' | 'low'
  tags?: string[]
  retryCount?: number
  enablePreparedStatements?: boolean
}

interface TransactionOptions {
  isolation?: 'READ UNCOMMITTED' | 'READ COMMITTED' | 'REPEATABLE READ' | 'SERIALIZABLE'
  timeout?: number
  readOnly?: boolean
  deferrable?: boolean
}

export class AdvancedConnectionPoolManager extends EventEmitter {
  private pools: Map<string, Pool> = new Map()
  private primaryPool: Pool
  private readOnlyPools: Pool[] = []
  private metrics: ConnectionPoolMetrics
  private healthCheckInterval: NodeJS.Timeout | null = null
  private metricsCollectionInterval: NodeJS.Timeout | null = null
  private currentReadIndex = 0

  constructor() {
    super()
    this.metrics = this.initializeMetrics()
    this.setupPools()
    this.startHealthChecks()
    this.startMetricsCollection()
    this.setupGracefulShutdown()
  }

  private initializeMetrics(): ConnectionPoolMetrics {
    return {
      totalConnections: 0,
      activeConnections: 0,
      idleConnections: 0,
      waitingRequests: 0,
      totalQueries: 0,
      avgQueryTime: 0,
      slowQueries: [],
      connectionErrors: 0,
      queryErrors: 0,
      poolStats: {
        acquired: 0,
        released: 0,
        created: 0,
        destroyed: 0,
        timeout: 0
      }
    }
  }

  private setupPools(): void {
    // Primary pool configuration for writes
    const primaryConfig: PoolConfig = {
      connectionString: process.env.DATABASE_URL,
      max: 30, // Maximum connections for primary
      min: 10, // Minimum connections to maintain
      acquireTimeoutMillis: 30000,
      createTimeoutMillis: 30000,
      destroyTimeoutMillis: 5000,
      idleTimeoutMillis: 30000,
      reapIntervalMillis: 1000,
      createRetryIntervalMillis: 200,

      // Advanced PostgreSQL-specific settings
      statement_timeout: 30000,
      query_timeout: 30000,
      connectionTimeoutMillis: 2000,
      idle_in_transaction_session_timeout: 10000,

      // SSL configuration for production
      ssl: process.env.NODE_ENV === 'production' ? {
        rejectUnauthorized: false,
        ca: process.env.DATABASE_CA_CERT,
        cert: process.env.DATABASE_CLIENT_CERT,
        key: process.env.DATABASE_CLIENT_KEY
      } : false,

      // Connection configuration
      application_name: `cerebrum_${process.env.NODE_ENV}_primary`,
      keepAlive: true,
      keepAliveInitialDelayMillis: 10000,
    }

    this.primaryPool = new Pool(primaryConfig)
    this.pools.set('primary', this.primaryPool)

    // Setup read replicas if configured
    this.setupReadReplicas()

    // Setup pool event listeners
    this.setupPoolEventListeners()

    console.log('✅ Advanced connection pools initialized')
  }

  private setupReadReplicas(): void {
    const readReplicaUrls = this.parseReadReplicaUrls()

    readReplicaUrls.forEach((url, index) => {
      const replicaConfig: PoolConfig = {
        connectionString: url,
        max: 20, // Fewer connections per replica
        min: 5,
        acquireTimeoutMillis: 15000, // Shorter timeout for reads
        createTimeoutMillis: 15000,
        destroyTimeoutMillis: 3000,
        idleTimeoutMillis: 60000, // Longer idle time for read replicas
        reapIntervalMillis: 1000,
        createRetryIntervalMillis: 200,

        statement_timeout: 20000, // Shorter timeout for reads
        query_timeout: 20000,
        connectionTimeoutMillis: 1500,

        ssl: process.env.NODE_ENV === 'production' ? {
          rejectUnauthorized: false
        } : false,

        application_name: `cerebrum_${process.env.NODE_ENV}_replica_${index + 1}`,
        keepAlive: true,
        keepAliveInitialDelayMillis: 10000,
      }

      const replicaPool = new Pool(replicaConfig)
      this.readOnlyPools.push(replicaPool)
      this.pools.set(`replica_${index + 1}`, replicaPool)
    })

    console.log(`✅ Configured ${this.readOnlyPools.length} read replica pools`)
  }

  private parseReadReplicaUrls(): string[] {
    const replicasEnv = process.env.DATABASE_READ_REPLICAS
    if (!replicasEnv) return []

    return replicasEnv
      .split(',')
      .map(url => url.trim())
      .filter(Boolean)
  }

  private setupPoolEventListeners(): void {
    // Primary pool events
    this.primaryPool.on('connect', (client) => {
      this.metrics.poolStats.acquired++
      this.emit('connection:acquired', { pool: 'primary', client })
    })

    this.primaryPool.on('remove', (client) => {
      this.metrics.poolStats.released++
      this.emit('connection:released', { pool: 'primary', client })
    })

    this.primaryPool.on('error', (error, client) => {
      this.metrics.connectionErrors++
      console.error('Primary pool error:', error)
      this.emit('connection:error', { pool: 'primary', error, client })
    })

    // Read replica events
    this.readOnlyPools.forEach((pool, index) => {
      pool.on('error', (error, client) => {
        this.metrics.connectionErrors++
        console.error(`Read replica ${index + 1} pool error:`, error)
        this.emit('connection:error', { pool: `replica_${index + 1}`, error, client })
      })
    })
  }

  /**
   * Execute a query with intelligent read/write routing
   */
  async executeQuery<T>(
    query: string,
    params: any[] = [],
    options: QueryOptions = {}
  ): Promise<T> {
    const startTime = performance.now()
    const isReadQuery = this.isReadOnlyQuery(query)
    const pool = this.selectOptimalPool(isReadQuery, options.priority)

    let client: PoolClient | null = null
    let retryCount = 0
    const maxRetries = options.retryCount || 3

    while (retryCount <= maxRetries) {
      try {
        client = await this.acquireConnection(pool, options.timeout)

        // Set query timeout if specified
        if (options.timeout) {
          await client.query(`SET statement_timeout = ${options.timeout}`)
        }

        // Enable prepared statements if requested
        if (options.enablePreparedStatements) {
          await client.query('SET plan_cache_mode = force_generic_plan')
        }

        const result = await client.query(query, params)
        const executionTime = performance.now() - startTime

        // Update metrics
        this.updateMetrics(query, executionTime, true)

        // Track slow queries
        if (executionTime > 1000) {
          this.trackSlowQuery(query, executionTime, options.tags)
        }

        return result.rows as T
      } catch (error) {
        this.metrics.queryErrors++
        const executionTime = performance.now() - startTime

        console.error(`Query failed (attempt ${retryCount + 1}/${maxRetries + 1}):`, {
          query: query.substring(0, 100),
          error: error instanceof Error ? error.message : error,
          executionTime: `${executionTime.toFixed(2)}ms`
        })

        // Retry logic for specific errors
        if (this.shouldRetryQuery(error) && retryCount < maxRetries) {
          retryCount++
          await this.delay(Math.pow(2, retryCount) * 100) // Exponential backoff
          continue
        }

        this.updateMetrics(query, executionTime, false)
        throw error
      } finally {
        if (client) {
          client.release()
        }
      }
    }

    throw new Error('Query failed after maximum retries')
  }

  /**
   * Execute a transaction with advanced options
   */
  async executeTransaction<T>(
    queries: Array<{ query: string; params: any[] }>,
    options: TransactionOptions = {}
  ): Promise<T[]> {
    const client = await this.acquireConnection(this.primaryPool, options.timeout)

    try {
      await client.query('BEGIN')

      // Set transaction isolation level
      if (options.isolation) {
        await client.query(`SET TRANSACTION ISOLATION LEVEL ${options.isolation}`)
      }

      // Set read-only mode
      if (options.readOnly) {
        await client.query('SET TRANSACTION READ ONLY')
      }

      // Set deferrable mode (only for SERIALIZABLE transactions)
      if (options.deferrable && options.isolation === 'SERIALIZABLE') {
        await client.query('SET TRANSACTION DEFERRABLE')
      }

      // Set transaction timeout
      if (options.timeout) {
        await client.query(`SET statement_timeout = ${options.timeout}`)
      }

      const results: T[] = []
      for (const { query, params } of queries) {
        const result = await client.query(query, params)
        results.push(result.rows as T)
      }

      await client.query('COMMIT')
      return results
    } catch (error) {
      await client.query('ROLLBACK')
      throw error
    } finally {
      client.release()
    }
  }

  /**
   * Execute batch queries with optimal connection reuse
   */
  async executeBatch<T>(
    queries: Array<{ query: string; params: any[]; options?: QueryOptions }>,
    batchOptions: {
      concurrency?: number
      failFast?: boolean
      transactional?: boolean
    } = {}
  ): Promise<Array<{ success: boolean; data?: T; error?: Error }>> {
    const concurrency = batchOptions.concurrency || 10
    const results: Array<{ success: boolean; data?: T; error?: Error }> = []

    if (batchOptions.transactional) {
      // Execute all queries in a single transaction
      try {
        const transactionResults = await this.executeTransaction(
          queries.map(q => ({ query: q.query, params: q.params }))
        )
        return transactionResults.map(data => ({ success: true, data: data as T }))
      } catch (error) {
        return queries.map(() => ({ success: false, error: error as Error }))
      }
    }

    // Execute queries in batches with concurrency control
    for (let i = 0; i < queries.length; i += concurrency) {
      const batch = queries.slice(i, i + concurrency)
      const batchPromises = batch.map(async (queryItem) => {
        try {
          const data = await this.executeQuery<T>(
            queryItem.query,
            queryItem.params,
            queryItem.options
          )
          return { success: true, data }
        } catch (error) {
          if (batchOptions.failFast) {
            throw error
          }
          return { success: false, error: error as Error }
        }
      })

      const batchResults = await Promise.all(batchPromises)
      results.push(...batchResults)
    }

    return results
  }

  /**
   * Stream large result sets efficiently
   */
  async executeStream(
    query: string,
    params: any[] = [],
    options: {
      batchSize?: number
      timeout?: number
    } = {}
  ): Promise<AsyncIterableIterator<any[]>> {
    const batchSize = options.batchSize || 1000
    const pool = this.selectOptimalPool(true, 'normal') // Use read replica for streaming

    return this.createQueryStream(pool, query, params, batchSize, options.timeout)
  }

  private async *createQueryStream(
    pool: Pool,
    query: string,
    params: any[],
    batchSize: number,
    timeout?: number
  ): AsyncIterableIterator<any[]> {
    let offset = 0
    let hasMore = true

    while (hasMore) {
      const paginatedQuery = `${query} LIMIT ${batchSize} OFFSET ${offset}`
      const batch = await this.executeQuery(paginatedQuery, params, { timeout })

      if (batch.length === 0) {
        hasMore = false
      } else {
        yield batch
        offset += batchSize
        hasMore = batch.length === batchSize
      }
    }
  }

  private isReadOnlyQuery(query: string): boolean {
    const normalizedQuery = query.trim().toUpperCase()
    return normalizedQuery.startsWith('SELECT') ||
           normalizedQuery.startsWith('WITH') && normalizedQuery.includes('SELECT')
  }

  private selectOptimalPool(isReadQuery: boolean, priority?: string): Pool {
    if (!isReadQuery || this.readOnlyPools.length === 0) {
      return this.primaryPool
    }

    // For high priority read queries, prefer primary pool for consistency
    if (priority === 'high') {
      return this.primaryPool
    }

    // Round-robin selection for read replicas
    const selectedPool = this.readOnlyPools[this.currentReadIndex]
    this.currentReadIndex = (this.currentReadIndex + 1) % this.readOnlyPools.length

    return selectedPool
  }

  private async acquireConnection(pool: Pool, timeout?: number): Promise<PoolClient> {
    const originalTimeout = timeout || 30000

    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error(`Connection acquisition timeout after ${originalTimeout}ms`))
      }, originalTimeout)

      pool.connect((error, client, release) => {
        clearTimeout(timeoutId)

        if (error) {
          reject(error)
          return
        }

        if (!client) {
          reject(new Error('No client received from pool'))
          return
        }

        // Wrap the release function to track metrics
        const originalRelease = client.release
        client.release = (err?: Error | boolean) => {
          this.metrics.poolStats.released++
          return originalRelease.call(client, err)
        }

        resolve(client)
      })
    })
  }

  private shouldRetryQuery(error: any): boolean {
    if (!error) return false

    const retryableErrors = [
      'ECONNRESET',
      'ENOTFOUND',
      'ECONNREFUSED',
      'ETIMEDOUT',
      'connection terminated unexpectedly',
      'server closed the connection unexpectedly',
      'Connection timeout'
    ]

    const errorMessage = error.message || error.toString()
    return retryableErrors.some(retryableError =>
      errorMessage.toLowerCase().includes(retryableError.toLowerCase())
    )
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  private updateMetrics(query: string, executionTime: number, success: boolean): void {
    this.metrics.totalQueries++

    if (success) {
      this.metrics.avgQueryTime = (this.metrics.avgQueryTime * (this.metrics.totalQueries - 1) + executionTime) / this.metrics.totalQueries
    }

    // Update pool statistics
    this.updatePoolStatistics()
  }

  private updatePoolStatistics(): void {
    let totalConnections = 0
    let activeConnections = 0
    let idleConnections = 0
    let waitingRequests = 0

    this.pools.forEach(pool => {
      totalConnections += pool.totalCount
      activeConnections += (pool.totalCount - pool.idleCount)
      idleConnections += pool.idleCount
      waitingRequests += pool.waitingCount
    })

    this.metrics.totalConnections = totalConnections
    this.metrics.activeConnections = activeConnections
    this.metrics.idleConnections = idleConnections
    this.metrics.waitingRequests = waitingRequests
  }

  private trackSlowQuery(query: string, executionTime: number, tags?: string[]): void {
    this.metrics.slowQueries.push({
      query: query.substring(0, 200),
      executionTime,
      timestamp: new Date(),
      stackTrace: process.env.NODE_ENV === 'development' ? new Error().stack : undefined
    })

    // Keep only last 100 slow queries
    if (this.metrics.slowQueries.length > 100) {
      this.metrics.slowQueries = this.metrics.slowQueries.slice(-100)
    }

    // Emit slow query event
    this.emit('query:slow', {
      query: query.substring(0, 200),
      executionTime,
      tags
    })

    console.warn(`🐌 Slow query detected (${executionTime.toFixed(2)}ms):`, {
      query: query.substring(0, 100),
      tags
    })
  }

  private startHealthChecks(): void {
    this.healthCheckInterval = setInterval(async () => {
      await this.performHealthCheck()
    }, 30000) // Every 30 seconds
  }

  private async performHealthCheck(): Promise<void> {
    const healthPromises = Array.from(this.pools.entries()).map(async ([name, pool]) => {
      try {
        const startTime = performance.now()
        await pool.query('SELECT 1')
        const responseTime = performance.now() - startTime

        return {
          name,
          healthy: true,
          responseTime,
          activeConnections: pool.totalCount - pool.idleCount,
          totalConnections: pool.totalCount,
          waitingRequests: pool.waitingCount
        }
      } catch (error) {
        return {
          name,
          healthy: false,
          error: error instanceof Error ? error.message : 'Unknown error',
          activeConnections: pool.totalCount - pool.idleCount,
          totalConnections: pool.totalCount,
          waitingRequests: pool.waitingCount
        }
      }
    })

    const healthResults = await Promise.all(healthPromises)
    const unhealthyPools = healthResults.filter(result => !result.healthy)

    if (unhealthyPools.length > 0) {
      console.error('❌ Unhealthy database pools detected:', unhealthyPools)
      this.emit('health:degraded', { unhealthyPools, allResults: healthResults })
    }

    // Emit health check results
    this.emit('health:check', healthResults)
  }

  private startMetricsCollection(): void {
    this.metricsCollectionInterval = setInterval(() => {
      this.updatePoolStatistics()
      this.emit('metrics:update', this.getMetrics())
    }, 10000) // Every 10 seconds
  }

  private setupGracefulShutdown(): void {
    const shutdown = async () => {
      console.log('🔄 Gracefully shutting down connection pools...')
      await this.shutdown()
      process.exit(0)
    }

    process.on('SIGINT', shutdown)
    process.on('SIGTERM', shutdown)
    process.on('SIGQUIT', shutdown)
  }

  /**
   * Get comprehensive pool metrics
   */
  getMetrics(): ConnectionPoolMetrics & {
    pools: Array<{
      name: string
      totalConnections: number
      activeConnections: number
      idleConnections: number
      waitingRequests: number
    }>
  } {
    const poolMetrics = Array.from(this.pools.entries()).map(([name, pool]) => ({
      name,
      totalConnections: pool.totalCount,
      activeConnections: pool.totalCount - pool.idleCount,
      idleConnections: pool.idleCount,
      waitingRequests: pool.waitingCount
    }))

    return {
      ...this.metrics,
      pools: poolMetrics
    }
  }

  /**
   * Get detailed health status
   */
  async getHealthStatus(): Promise<{
    overall: 'healthy' | 'degraded' | 'unhealthy'
    pools: Array<{
      name: string
      status: 'healthy' | 'unhealthy'
      responseTime?: number
      error?: string
      connections: {
        total: number
        active: number
        idle: number
        waiting: number
      }
    }>
    metrics: ConnectionPoolMetrics
  }> {
    const poolPromises = Array.from(this.pools.entries()).map(async ([name, pool]) => {
      try {
        const startTime = performance.now()
        await pool.query('SELECT 1')
        const responseTime = performance.now() - startTime

        return {
          name,
          status: 'healthy' as const,
          responseTime,
          connections: {
            total: pool.totalCount,
            active: pool.totalCount - pool.idleCount,
            idle: pool.idleCount,
            waiting: pool.waitingCount
          }
        }
      } catch (error) {
        return {
          name,
          status: 'unhealthy' as const,
          error: error instanceof Error ? error.message : 'Unknown error',
          connections: {
            total: pool.totalCount,
            active: pool.totalCount - pool.idleCount,
            idle: pool.idleCount,
            waiting: pool.waitingCount
          }
        }
      }
    })

    const pools = await Promise.all(poolPromises)
    const healthyPools = pools.filter(p => p.status === 'healthy')

    let overall: 'healthy' | 'degraded' | 'unhealthy'
    if (healthyPools.length === pools.length) {
      overall = 'healthy'
    } else if (healthyPools.length > 0) {
      overall = 'degraded'
    } else {
      overall = 'unhealthy'
    }

    return {
      overall,
      pools,
      metrics: this.metrics
    }
  }

  /**
   * Graceful shutdown of all pools
   */
  async shutdown(): Promise<void> {
    console.log('🔄 Shutting down connection pools...')

    // Clear intervals
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval)
    }
    if (this.metricsCollectionInterval) {
      clearInterval(this.metricsCollectionInterval)
    }

    // Close all pools
    const shutdownPromises = Array.from(this.pools.values()).map(pool => pool.end())
    await Promise.all(shutdownPromises)

    console.log('✅ All connection pools closed')
  }
}

// Singleton instance
export const connectionPool = new AdvancedConnectionPoolManager()

// Export for direct use
export default connectionPool