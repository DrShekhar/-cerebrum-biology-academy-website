/**
 * Performance Monitoring System
 *
 * Tracks API response times, database queries, AI operations, and user interactions.
 * Generates performance reports and identifies bottlenecks.
 */

import { logger } from './logger'
import { sentry } from './sentry'

export interface PerformanceMetric {
  name: string
  value: number
  unit: 'ms' | 'seconds' | 'bytes' | 'count'
  timestamp: Date
  tags?: Record<string, string>
}

export interface PerformanceReport {
  period: string
  metrics: {
    avgResponseTime: number
    p95ResponseTime: number
    p99ResponseTime: number
    errorRate: number
    requestCount: number
  }
  slowestEndpoints: Array<{
    endpoint: string
    avgTime: number
    count: number
  }>
  aiMetrics: {
    totalRequests: number
    avgTokens: number
    totalCost: number
  }
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = []
  private maxMetrics = 10000

  /**
   * Start tracking an operation
   */
  startTracking(operationName: string, tags?: Record<string, string>): () => void {
    const startTime = Date.now()
    const transaction = sentry.startTransaction(operationName, 'operation')

    if (tags) {
      Object.entries(tags).forEach(([key, value]) => {
        transaction.setTag(key, value)
      })
    }

    return () => {
      const duration = Date.now() - startTime
      transaction.finish()

      this.recordMetric({
        name: operationName,
        value: duration,
        unit: 'ms',
        timestamp: new Date(),
        tags,
      })

      // Log slow operations
      if (duration > 1000) {
        logger.warn(`Slow operation: ${operationName}`, {
          duration,
          tags,
        })
      }
    }
  }

  /**
   * Track API endpoint performance
   */
  trackAPI(endpoint: string, statusCode: number, duration: number): void {
    this.recordMetric({
      name: 'api_request',
      value: duration,
      unit: 'ms',
      timestamp: new Date(),
      tags: {
        endpoint,
        statusCode: statusCode.toString(),
        success: statusCode < 400 ? 'true' : 'false',
      },
    })

    logger.logPerformance({
      name: 'api_request',
      value: duration,
      unit: 'ms',
      tags: { endpoint, statusCode: statusCode.toString() },
    })
  }

  /**
   * Track database query performance
   */
  trackDBQuery(operation: string, table: string, duration: number, rowCount?: number): void {
    this.recordMetric({
      name: 'db_query',
      value: duration,
      unit: 'ms',
      timestamp: new Date(),
      tags: {
        operation,
        table,
        rowCount: rowCount?.toString() || 'unknown',
      },
    })

    logger.logDBOperation({
      type: operation as 'query' | 'mutation',
      table,
      duration,
      success: true,
    })

    // Warn on slow queries
    if (duration > 500) {
      logger.warn(`Slow database query: ${operation} on ${table}`, {
        duration,
        rowCount,
      })
    }
  }

  /**
   * Track AI operation performance
   */
  trackAIOperation(params: {
    type: 'tutor' | 'test_generator' | 'whatsapp'
    model: string
    duration: number
    tokensUsed: number
    cost: number
  }): void {
    this.recordMetric({
      name: 'ai_operation',
      value: params.duration,
      unit: 'ms',
      timestamp: new Date(),
      tags: {
        type: params.type,
        model: params.model,
      },
    })

    this.recordMetric({
      name: 'ai_tokens',
      value: params.tokensUsed,
      unit: 'count',
      timestamp: new Date(),
      tags: {
        type: params.type,
        model: params.model,
      },
    })

    this.recordMetric({
      name: 'ai_cost',
      value: params.cost * 100, // Store as cents
      unit: 'count',
      timestamp: new Date(),
      tags: {
        type: params.type,
        model: params.model,
      },
    })

    logger.logAIOperation({
      type: params.type,
      model: params.model,
      tokensUsed: params.tokensUsed,
      cost: params.cost,
      duration: params.duration,
    })
  }

  /**
   * Track user interaction
   */
  trackUserInteraction(action: string, component: string, duration?: number): void {
    this.recordMetric({
      name: 'user_interaction',
      value: duration || 0,
      unit: 'ms',
      timestamp: new Date(),
      tags: {
        action,
        component,
      },
    })
  }

  /**
   * Track memory usage
   */
  trackMemoryUsage(): void {
    if (typeof process !== 'undefined' && process.memoryUsage) {
      const usage = process.memoryUsage()

      this.recordMetric({
        name: 'memory_heap_used',
        value: usage.heapUsed,
        unit: 'bytes',
        timestamp: new Date(),
      })

      this.recordMetric({
        name: 'memory_heap_total',
        value: usage.heapTotal,
        unit: 'bytes',
        timestamp: new Date(),
      })

      // Warn on high memory usage (>80% of heap)
      const usagePercent = (usage.heapUsed / usage.heapTotal) * 100
      if (usagePercent > 80) {
        logger.warn('High memory usage detected', {
          usagePercent: usagePercent.toFixed(2),
          heapUsed: this.formatBytes(usage.heapUsed),
          heapTotal: this.formatBytes(usage.heapTotal),
        })
      }
    }
  }

  /**
   * Record a metric
   */
  private recordMetric(metric: PerformanceMetric): void {
    this.metrics.push(metric)

    // Prevent memory leaks by limiting stored metrics
    if (this.metrics.length > this.maxMetrics) {
      this.metrics = this.metrics.slice(-this.maxMetrics / 2)
    }
  }

  /**
   * Get performance report for a time period
   */
  getReport(periodMinutes: number = 60): PerformanceReport {
    const cutoffTime = new Date(Date.now() - periodMinutes * 60 * 1000)
    const recentMetrics = this.metrics.filter((m) => m.timestamp >= cutoffTime)

    const apiMetrics = recentMetrics.filter((m) => m.name === 'api_request')
    const aiMetrics = recentMetrics.filter((m) => m.name === 'ai_operation')
    const tokenMetrics = recentMetrics.filter((m) => m.name === 'ai_tokens')
    const costMetrics = recentMetrics.filter((m) => m.name === 'ai_cost')

    return {
      period: `Last ${periodMinutes} minutes`,
      metrics: {
        avgResponseTime: this.calculateAverage(apiMetrics.map((m) => m.value)),
        p95ResponseTime: this.calculatePercentile(
          apiMetrics.map((m) => m.value),
          95
        ),
        p99ResponseTime: this.calculatePercentile(
          apiMetrics.map((m) => m.value),
          99
        ),
        errorRate: this.calculateErrorRate(apiMetrics),
        requestCount: apiMetrics.length,
      },
      slowestEndpoints: this.getSlowestEndpoints(apiMetrics),
      aiMetrics: {
        totalRequests: aiMetrics.length,
        avgTokens: this.calculateAverage(tokenMetrics.map((m) => m.value)),
        totalCost: this.calculateSum(costMetrics.map((m) => m.value)) / 100, // Convert back to dollars
      },
    }
  }

  /**
   * Calculate average
   */
  private calculateAverage(values: number[]): number {
    if (values.length === 0) return 0
    return values.reduce((a, b) => a + b, 0) / values.length
  }

  /**
   * Calculate sum
   */
  private calculateSum(values: number[]): number {
    return values.reduce((a, b) => a + b, 0)
  }

  /**
   * Calculate percentile
   */
  private calculatePercentile(values: number[], percentile: number): number {
    if (values.length === 0) return 0

    const sorted = values.sort((a, b) => a - b)
    const index = Math.ceil((percentile / 100) * sorted.length) - 1

    return sorted[index]
  }

  /**
   * Calculate error rate
   */
  private calculateErrorRate(metrics: PerformanceMetric[]): number {
    if (metrics.length === 0) return 0

    const errors = metrics.filter((m) => {
      const statusCode = parseInt(m.tags?.statusCode || '200')
      return statusCode >= 400
    })

    return (errors.length / metrics.length) * 100
  }

  /**
   * Get slowest endpoints
   */
  private getSlowestEndpoints(metrics: PerformanceMetric[]): Array<{
    endpoint: string
    avgTime: number
    count: number
  }> {
    const endpointStats: Record<string, { total: number; count: number }> = {}

    metrics.forEach((m) => {
      const endpoint = m.tags?.endpoint || 'unknown'
      if (!endpointStats[endpoint]) {
        endpointStats[endpoint] = { total: 0, count: 0 }
      }
      endpointStats[endpoint].total += m.value
      endpointStats[endpoint].count++
    })

    return Object.entries(endpointStats)
      .map(([endpoint, stats]) => ({
        endpoint,
        avgTime: stats.total / stats.count,
        count: stats.count,
      }))
      .sort((a, b) => b.avgTime - a.avgTime)
      .slice(0, 10)
  }

  /**
   * Format bytes to human-readable
   */
  private formatBytes(bytes: number): string {
    const units = ['B', 'KB', 'MB', 'GB']
    let size = bytes
    let unitIndex = 0

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024
      unitIndex++
    }

    return `${size.toFixed(2)} ${units[unitIndex]}`
  }

  /**
   * Clear old metrics
   */
  clearMetrics(): void {
    this.metrics = []
  }
}

// Export singleton instance
export const performanceMonitor = new PerformanceMonitor()

// Convenience wrapper for tracking operations
export function trackOperation<T>(
  operationName: string,
  operation: () => T | Promise<T>,
  tags?: Record<string, string>
): Promise<T> {
  const finish = performanceMonitor.startTracking(operationName, tags)

  const result = operation()

  if (result instanceof Promise) {
    return result.finally(() => finish())
  }

  finish()
  return Promise.resolve(result)
}
