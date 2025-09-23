/**
 * Query Cache Optimizer - Intelligent Database Query Caching
 * Optimizes PostgreSQL queries with smart caching and invalidation strategies
 */

import { DistributedCacheManager } from './DistributedCacheManager'
import { createHash } from 'crypto'

interface QueryCacheConfig {
  defaultTTL: number
  adaptiveTTL: {
    enabled: boolean
    minTTL: number
    maxTTL: number
    performanceThreshold: number
  }
  invalidation: {
    enabled: boolean
    patterns: QueryInvalidationPattern[]
  }
  compression: {
    enabled: boolean
    threshold: number
  }
  monitoring: {
    slowQueryThreshold: number
    enableQueryAnalytics: boolean
  }
}

interface QueryInvalidationPattern {
  tables: string[]
  operations: ('INSERT' | 'UPDATE' | 'DELETE')[]
  cachePatterns: string[]
}

interface QueryResult<T = any> {
  data: T
  metadata: {
    queryHash: string
    executionTime: number
    cached: boolean
    cacheHit: boolean
    timestamp: Date
    ttl: number
    affectedTables: string[]
  }
}

interface QueryMetrics {
  totalQueries: number
  cachedQueries: number
  cacheHitRate: number
  avgExecutionTime: number
  avgCacheRetrievalTime: number
  slowQueries: number
  topQueries: Array<{
    hash: string
    sql: string
    count: number
    avgTime: number
  }>
}

export class QueryCacheOptimizer {
  private cacheManager: DistributedCacheManager
  private config: QueryCacheConfig
  private queryMetrics: QueryMetrics
  private queryStats: Map<
    string,
    {
      count: number
      totalTime: number
      lastExecution: Date
      sql: string
    }
  >

  constructor(cacheManager: DistributedCacheManager, config: QueryCacheConfig) {
    this.cacheManager = cacheManager
    this.config = config
    this.queryStats = new Map()
    this.queryMetrics = {
      totalQueries: 0,
      cachedQueries: 0,
      cacheHitRate: 0,
      avgExecutionTime: 0,
      avgCacheRetrievalTime: 0,
      slowQueries: 0,
      topQueries: [],
    }
  }

  /**
   * Execute query with intelligent caching
   */
  async executeQuery<T>(
    sql: string,
    params: any[] = [],
    options: {
      ttl?: number
      forceFresh?: boolean
      tags?: string[]
      affectedTables?: string[]
    } = {}
  ): Promise<QueryResult<T>> {
    const startTime = Date.now()
    const queryHash = this.generateQueryHash(sql, params)
    const cacheKey = this.generateCacheKey(queryHash)

    // Update query statistics
    this.updateQueryStats(queryHash, sql, startTime)

    // Try to get from cache first (unless forcing fresh data)
    if (!options.forceFresh) {
      const cachedResult = await this.getCachedResult<T>(cacheKey)
      if (cachedResult) {
        const retrievalTime = Date.now() - startTime
        this.updateCacheMetrics(true, retrievalTime)

        return {
          data: cachedResult.data,
          metadata: {
            queryHash,
            executionTime: retrievalTime,
            cached: true,
            cacheHit: true,
            timestamp: new Date(),
            ttl: cachedResult.ttl,
            affectedTables: options.affectedTables || [],
          },
        }
      }
    }

    // Execute query against database
    const dbResult = await this.executeDatabaseQuery<T>(sql, params)
    const executionTime = Date.now() - startTime

    // Determine TTL using adaptive algorithm
    const ttl = this.calculateAdaptiveTTL(queryHash, executionTime, options.ttl)

    // Cache the result
    await this.cacheQueryResult(cacheKey, dbResult, ttl, {
      queryHash,
      sql,
      params,
      tags: options.tags,
      affectedTables: options.affectedTables,
    })

    // Update metrics
    this.updateCacheMetrics(false, executionTime)
    this.updateQueryStats(queryHash, sql, startTime, executionTime)

    return {
      data: dbResult,
      metadata: {
        queryHash,
        executionTime,
        cached: false,
        cacheHit: false,
        timestamp: new Date(),
        ttl,
        affectedTables: options.affectedTables || [],
      },
    }
  }

  /**
   * Batch query execution with optimized caching
   */
  async executeBatchQueries<T>(
    queries: Array<{
      sql: string
      params?: any[]
      options?: {
        ttl?: number
        tags?: string[]
        affectedTables?: string[]
      }
    }>
  ): Promise<QueryResult<T>[]> {
    const startTime = Date.now()
    const results: QueryResult<T>[] = []

    // Generate cache keys for all queries
    const queryInfo = queries.map((query) => ({
      ...query,
      hash: this.generateQueryHash(query.sql, query.params || []),
      cacheKey: this.generateCacheKey(this.generateQueryHash(query.sql, query.params || [])),
    }))

    // Batch check cache for all queries
    const cacheKeys = queryInfo.map((info) => info.cacheKey)
    const cachedResults = await this.cacheManager.mget<any>(cacheKeys)

    // Separate cached and uncached queries
    const uncachedQueries: Array<{
      index: number
      sql: string
      params: any[]
      hash: string
      cacheKey: string
      options: any
    }> = []

    for (let i = 0; i < queryInfo.length; i++) {
      const query = queryInfo[i]
      const cachedResult = cachedResults.get(query.cacheKey)

      if (cachedResult) {
        // Use cached result
        results[i] = {
          data: cachedResult.data,
          metadata: {
            queryHash: query.hash,
            executionTime: 0,
            cached: true,
            cacheHit: true,
            timestamp: new Date(),
            ttl: cachedResult.ttl,
            affectedTables: query.options?.affectedTables || [],
          },
        }
      } else {
        // Mark for database execution
        uncachedQueries.push({
          index: i,
          sql: query.sql,
          params: query.params || [],
          hash: query.hash,
          cacheKey: query.cacheKey,
          options: query.options || {},
        })
      }
    }

    // Execute uncached queries in parallel
    if (uncachedQueries.length > 0) {
      const dbPromises = uncachedQueries.map(async (query) => {
        const dbResult = await this.executeDatabaseQuery<T>(query.sql, query.params)
        const executionTime = Date.now() - startTime

        // Calculate TTL and cache result
        const ttl = this.calculateAdaptiveTTL(query.hash, executionTime, query.options.ttl)
        await this.cacheQueryResult(query.cacheKey, dbResult, ttl, {
          queryHash: query.hash,
          sql: query.sql,
          params: query.params,
          tags: query.options.tags,
          affectedTables: query.options.affectedTables,
        })

        return {
          index: query.index,
          result: {
            data: dbResult,
            metadata: {
              queryHash: query.hash,
              executionTime,
              cached: false,
              cacheHit: false,
              timestamp: new Date(),
              ttl,
              affectedTables: query.options.affectedTables || [],
            },
          },
        }
      })

      const dbResults = await Promise.all(dbPromises)

      // Place results in correct positions
      dbResults.forEach(({ index, result }) => {
        results[index] = result
      })
    }

    console.log(
      `📊 Batch execution: ${cachedResults.size - uncachedQueries.length}/${queries.length} cache hits`
    )

    return results
  }

  /**
   * Invalidate cache based on table changes
   */
  async invalidateByTables(
    tables: string[],
    operation: 'INSERT' | 'UPDATE' | 'DELETE'
  ): Promise<number> {
    let totalInvalidated = 0

    for (const pattern of this.config.invalidation.patterns) {
      // Check if this pattern applies to the changed tables
      const hasMatchingTable = pattern.tables.some((table) => tables.includes(table))
      const hasMatchingOperation = pattern.operations.includes(operation)

      if (hasMatchingTable && hasMatchingOperation) {
        // Invalidate all cache keys matching the patterns
        for (const cachePattern of pattern.cachePatterns) {
          const invalidated = await this.cacheManager.clearByPattern(cachePattern)
          totalInvalidated += invalidated
        }
      }
    }

    console.log(
      `🗑️  Invalidated ${totalInvalidated} cache entries for tables: ${tables.join(', ')}`
    )
    return totalInvalidated
  }

  /**
   * Invalidate cache by tags
   */
  async invalidateByTags(tags: string[]): Promise<number> {
    let totalInvalidated = 0

    for (const tag of tags) {
      const pattern = `query:tag:${tag}:*`
      const invalidated = await this.cacheManager.clearByPattern(pattern)
      totalInvalidated += invalidated
    }

    console.log(`🗑️  Invalidated ${totalInvalidated} cache entries for tags: ${tags.join(', ')}`)
    return totalInvalidated
  }

  /**
   * Warm cache with frequently used queries
   */
  async warmCache(
    queries: Array<{
      sql: string
      params?: any[]
      expectedResult: any
      ttl?: number
    }>
  ): Promise<void> {
    console.log(`🔥 Warming query cache with ${queries.length} queries...`)

    const warmupPromises = queries.map(async (query) => {
      const queryHash = this.generateQueryHash(query.sql, query.params || [])
      const cacheKey = this.generateCacheKey(queryHash)
      const ttl = query.ttl || this.config.defaultTTL

      await this.cacheQueryResult(cacheKey, query.expectedResult, ttl, {
        queryHash,
        sql: query.sql,
        params: query.params || [],
      })
    })

    await Promise.all(warmupPromises)
    console.log(`✅ Query cache warmed with ${queries.length} queries`)
  }

  /**
   * Get cache performance metrics
   */
  getMetrics(): QueryMetrics & {
    topQueriesByFrequency: Array<{
      hash: string
      sql: string
      count: number
      avgTime: number
    }>
    slowestQueries: Array<{
      hash: string
      sql: string
      maxTime: number
      avgTime: number
    }>
  } {
    // Calculate top queries by frequency
    const topQueriesByFrequency = Array.from(this.queryStats.entries())
      .map(([hash, stats]) => ({
        hash,
        sql: stats.sql.substring(0, 100) + '...',
        count: stats.count,
        avgTime: stats.totalTime / stats.count,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)

    // Calculate slowest queries
    const slowestQueries = Array.from(this.queryStats.entries())
      .map(([hash, stats]) => ({
        hash,
        sql: stats.sql.substring(0, 100) + '...',
        maxTime: stats.totalTime, // Simplified - in real implementation track max time
        avgTime: stats.totalTime / stats.count,
      }))
      .sort((a, b) => b.avgTime - a.avgTime)
      .slice(0, 10)

    return {
      ...this.queryMetrics,
      topQueriesByFrequency,
      slowestQueries,
    }
  }

  /**
   * Analyze query performance and suggest optimizations
   */
  async analyzePerformance(): Promise<{
    recommendations: string[]
    inefficientQueries: Array<{
      sql: string
      avgTime: number
      frequency: number
      suggestion: string
    }>
    cacheEfficiency: {
      hitRate: number
      missRate: number
      timesSaved: number
    }
  }> {
    const recommendations: string[] = []
    const inefficientQueries: any[] = []

    // Analyze query patterns
    for (const [hash, stats] of this.queryStats.entries()) {
      const avgTime = stats.totalTime / stats.count

      if (avgTime > this.config.monitoring.slowQueryThreshold) {
        inefficientQueries.push({
          sql: stats.sql.substring(0, 100) + '...',
          avgTime,
          frequency: stats.count,
          suggestion: this.generateOptimizationSuggestion(stats.sql, avgTime),
        })
      }
    }

    // Generate recommendations
    if (this.queryMetrics.cacheHitRate < 50) {
      recommendations.push('Consider increasing TTL for frequently accessed data')
    }

    if (this.queryMetrics.slowQueries > this.queryMetrics.totalQueries * 0.1) {
      recommendations.push('High number of slow queries detected - review query optimization')
    }

    if (inefficientQueries.length > 0) {
      recommendations.push('Multiple inefficient queries found - consider database indexing')
    }

    const cacheEfficiency = {
      hitRate: this.queryMetrics.cacheHitRate,
      missRate: 100 - this.queryMetrics.cacheHitRate,
      timesSaved: this.calculateTimeSaved(),
    }

    return {
      recommendations,
      inefficientQueries,
      cacheEfficiency,
    }
  }

  // Private helper methods

  private generateQueryHash(sql: string, params: any[]): string {
    const normalized = this.normalizeQuery(sql)
    const paramsStr = JSON.stringify(params)
    return createHash('sha256')
      .update(normalized + paramsStr)
      .digest('hex')
  }

  private normalizeQuery(sql: string): string {
    return sql.toLowerCase().replace(/\s+/g, ' ').trim().replace(/\$\d+/g, '?') // Normalize parameter placeholders
  }

  private generateCacheKey(queryHash: string): string {
    return this.cacheManager.generateKey('question', queryHash)
  }

  private async getCachedResult<T>(cacheKey: string): Promise<{ data: T; ttl: number } | null> {
    return await this.cacheManager.get<{ data: T; ttl: number }>(cacheKey)
  }

  private async executeDatabaseQuery<T>(sql: string, params: any[]): Promise<T> {
    // This would integrate with your actual database connection
    // For now, simulating database execution
    console.log(`🔍 Executing query: ${sql.substring(0, 50)}...`)

    // Simulate database delay
    await new Promise((resolve) => setTimeout(resolve, 10 + Math.random() * 50))

    // Return mock result
    return {} as T
  }

  private calculateAdaptiveTTL(
    queryHash: string,
    executionTime: number,
    customTTL?: number
  ): number {
    if (customTTL) return customTTL

    if (!this.config.adaptiveTTL.enabled) {
      return this.config.defaultTTL
    }

    const stats = this.queryStats.get(queryHash)
    if (!stats) return this.config.defaultTTL

    // Adaptive TTL based on query frequency and performance
    const frequency = stats.count
    const avgTime = stats.totalTime / stats.count

    let adaptiveTTL = this.config.defaultTTL

    // Increase TTL for slow queries
    if (avgTime > this.config.adaptiveTTL.performanceThreshold) {
      adaptiveTTL *= 2
    }

    // Increase TTL for frequently accessed queries
    if (frequency > 10) {
      adaptiveTTL *= 1.5
    }

    // Ensure TTL is within bounds
    adaptiveTTL = Math.max(this.config.adaptiveTTL.minTTL, adaptiveTTL)
    adaptiveTTL = Math.min(this.config.adaptiveTTL.maxTTL, adaptiveTTL)

    return Math.floor(adaptiveTTL)
  }

  private async cacheQueryResult(
    cacheKey: string,
    data: any,
    ttl: number,
    metadata: any
  ): Promise<void> {
    await this.cacheManager.set(cacheKey, { data, ttl }, ttl, metadata)

    // Also cache by tags if provided
    if (metadata.tags) {
      for (const tag of metadata.tags) {
        const tagKey = `query:tag:${tag}:${metadata.queryHash}`
        await this.cacheManager.set(tagKey, cacheKey, ttl)
      }
    }
  }

  private updateQueryStats(
    queryHash: string,
    sql: string,
    startTime: number,
    executionTime?: number
  ): void {
    const stats = this.queryStats.get(queryHash) || {
      count: 0,
      totalTime: 0,
      lastExecution: new Date(),
      sql,
    }

    stats.count++
    stats.lastExecution = new Date()
    if (executionTime !== undefined) {
      stats.totalTime += executionTime
    }

    this.queryStats.set(queryHash, stats)
    this.queryMetrics.totalQueries++

    if (executionTime !== undefined && executionTime > this.config.monitoring.slowQueryThreshold) {
      this.queryMetrics.slowQueries++
    }
  }

  private updateCacheMetrics(cacheHit: boolean, time: number): void {
    if (cacheHit) {
      this.queryMetrics.cachedQueries++
      this.queryMetrics.avgCacheRetrievalTime = (this.queryMetrics.avgCacheRetrievalTime + time) / 2
    }

    this.queryMetrics.cacheHitRate =
      (this.queryMetrics.cachedQueries / this.queryMetrics.totalQueries) * 100

    this.queryMetrics.avgExecutionTime = (this.queryMetrics.avgExecutionTime + time) / 2
  }

  private generateOptimizationSuggestion(sql: string, avgTime: number): string {
    const sqlLower = sql.toLowerCase()

    if (sqlLower.includes('select *')) {
      return 'Avoid SELECT * - specify only needed columns'
    }

    if (sqlLower.includes("like '%") && sqlLower.includes("%'")) {
      return 'Leading wildcard LIKE queries are slow - consider full-text search'
    }

    if (sqlLower.includes('order by') && !sqlLower.includes('limit')) {
      return 'ORDER BY without LIMIT can be expensive - add pagination'
    }

    if (avgTime > 1000) {
      return 'Query is very slow - review indexes and query structure'
    }

    return 'Consider adding appropriate database indexes'
  }

  private calculateTimeSaved(): number {
    const avgDbTime = this.queryMetrics.avgExecutionTime
    const avgCacheTime = this.queryMetrics.avgCacheRetrievalTime
    const cacheHits = this.queryMetrics.cachedQueries

    return cacheHits * (avgDbTime - avgCacheTime)
  }
}
