/**
 * Performance Monitor for AI Gateway
 * Tracks metrics, latency, costs, and provides observability
 */

import Redis from 'ioredis'

interface RequestMetric {
  requestId: string
  provider: string
  latency: number
  tokens: number
  cost: number
  success: boolean
  error?: string
  timestamp: number
  userId?: string
  cached?: boolean
}

interface ProviderMetrics {
  totalRequests: number
  successfulRequests: number
  failedRequests: number
  averageLatency: number
  totalTokens: number
  totalCost: number
  cacheHitRate: number
  errorRate: number
  uptime: number
}

interface SystemMetrics {
  totalRequests: number
  requestsPerSecond: number
  averageLatency: number
  p95Latency: number
  p99Latency: number
  successRate: number
  totalCost: number
  costPerRequest: number
  cacheHitRate: number
  providersHealth: Record<string, boolean>
  topErrors: Array<{ error: string; count: number; percentage: number }>
  hourlyStats: Array<{ hour: string; requests: number; cost: number }>
}

interface Alert {
  id: string
  type: 'latency' | 'error_rate' | 'cost' | 'availability'
  severity: 'low' | 'medium' | 'high' | 'critical'
  message: string
  provider?: string
  timestamp: number
  resolved: boolean
}

export class PerformanceMonitor {
  private redis: Redis
  private metrics: Map<string, RequestMetric[]> = new Map()
  private alerts: Alert[] = []
  private initialized = false

  // Thresholds for alerting
  private readonly THRESHOLDS = {
    latency: {
      warning: 2000, // 2 seconds
      critical: 5000, // 5 seconds
    },
    errorRate: {
      warning: 0.05, // 5%
      critical: 0.1, // 10%
    },
    cost: {
      dailyWarning: 100, // $100 per day
      dailyCritical: 500, // $500 per day
    },
  }

  constructor() {
    this.redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379')
  }

  async initialize(): Promise<void> {
    if (this.initialized) return

    // Start background monitoring tasks
    this.startMetricsAggregation()
    this.startAlertMonitoring()
    this.startCleanupTask()

    this.initialized = true
    console.log('📊 Performance Monitor initialized')
  }

  /**
   * Record a request metric
   */
  async recordRequest(metric: RequestMetric): Promise<void> {
    try {
      // Store in Redis for persistence
      const key = `metrics:${metric.provider}:${Date.now()}`
      await this.redis.setex(key, 86400, JSON.stringify(metric)) // 24 hour TTL

      // Store in memory for quick access
      const providerMetrics = this.metrics.get(metric.provider) || []
      providerMetrics.push(metric)

      // Keep only last 1000 metrics in memory per provider
      if (providerMetrics.length > 1000) {
        providerMetrics.shift()
      }

      this.metrics.set(metric.provider, providerMetrics)

      // Update real-time counters
      await this.updateRealtimeCounters(metric)
    } catch (error) {
      console.error('Failed to record metric:', error)
    }
  }

  /**
   * Get comprehensive system metrics
   */
  async getMetrics(): Promise<SystemMetrics> {
    const now = Date.now()
    const oneDayAgo = now - 86400000

    // Get all metrics from last 24 hours
    const allMetrics = await this.getMetricsInTimeRange(oneDayAgo, now)

    if (allMetrics.length === 0) {
      return this.getEmptyMetrics()
    }

    const successfulRequests = allMetrics.filter((m) => m.success)
    const latencies = successfulRequests.map((m) => m.latency).sort((a, b) => a - b)

    return {
      totalRequests: allMetrics.length,
      requestsPerSecond: this.calculateRequestsPerSecond(allMetrics),
      averageLatency: this.calculateAverage(latencies),
      p95Latency: this.calculatePercentile(latencies, 0.95),
      p99Latency: this.calculatePercentile(latencies, 0.99),
      successRate: successfulRequests.length / allMetrics.length,
      totalCost: allMetrics.reduce((sum, m) => sum + m.cost, 0),
      costPerRequest: allMetrics.reduce((sum, m) => sum + m.cost, 0) / allMetrics.length,
      cacheHitRate: allMetrics.filter((m) => m.cached).length / allMetrics.length,
      providersHealth: await this.getProvidersHealth(),
      topErrors: await this.getTopErrors(allMetrics),
      hourlyStats: await this.getHourlyStats(allMetrics),
    }
  }

  /**
   * Get metrics for a specific provider
   */
  async getProviderMetrics(provider: string): Promise<ProviderMetrics> {
    const now = Date.now()
    const oneDayAgo = now - 86400000

    const metrics = await this.getProviderMetricsInTimeRange(provider, oneDayAgo, now)

    if (metrics.length === 0) {
      return this.getEmptyProviderMetrics()
    }

    const successfulRequests = metrics.filter((m) => m.success)
    const latencies = successfulRequests.map((m) => m.latency)

    return {
      totalRequests: metrics.length,
      successfulRequests: successfulRequests.length,
      failedRequests: metrics.length - successfulRequests.length,
      averageLatency: this.calculateAverage(latencies),
      totalTokens: metrics.reduce((sum, m) => sum + m.tokens, 0),
      totalCost: metrics.reduce((sum, m) => sum + m.cost, 0),
      cacheHitRate: metrics.filter((m) => m.cached).length / metrics.length,
      errorRate: (metrics.length - successfulRequests.length) / metrics.length,
      uptime: await this.calculateUptime(provider),
    }
  }

  /**
   * Get active alerts
   */
  getActiveAlerts(): Alert[] {
    return this.alerts.filter((alert) => !alert.resolved)
  }

  /**
   * Get all alerts in time range
   */
  getAlertsInTimeRange(startTime: number, endTime: number): Alert[] {
    return this.alerts.filter((alert) => alert.timestamp >= startTime && alert.timestamp <= endTime)
  }

  private async updateRealtimeCounters(metric: RequestMetric): Promise<void> {
    const today = new Date().toISOString().split('T')[0]
    const hour = new Date().toISOString().substring(0, 13)

    // Update daily counters
    await this.redis.hincrby(`daily:${today}`, 'requests', 1)
    await this.redis.hincrby(`daily:${today}`, 'cost', Math.round(metric.cost * 100)) // Store as cents

    // Update hourly counters
    await this.redis.hincrby(`hourly:${hour}`, 'requests', 1)
    await this.redis.hincrby(`hourly:${hour}`, 'cost', Math.round(metric.cost * 100))

    // Update provider counters
    await this.redis.hincrby(`provider:${metric.provider}`, 'requests', 1)
    if (metric.success) {
      await this.redis.hincrby(`provider:${metric.provider}`, 'successes', 1)
    } else {
      await this.redis.hincrby(`provider:${metric.provider}`, 'failures', 1)
    }

    // Set TTL for counters
    await this.redis.expire(`daily:${today}`, 604800) // 7 days
    await this.redis.expire(`hourly:${hour}`, 86400) // 24 hours
    await this.redis.expire(`provider:${metric.provider}`, 86400) // 24 hours
  }

  private async getMetricsInTimeRange(
    startTime: number,
    endTime: number
  ): Promise<RequestMetric[]> {
    const keys = await this.redis.keys('metrics:*')
    const metrics: RequestMetric[] = []

    for (const key of keys) {
      try {
        const data = await this.redis.get(key)
        if (data) {
          const metric = JSON.parse(data) as RequestMetric
          if (metric.timestamp >= startTime && metric.timestamp <= endTime) {
            metrics.push(metric)
          }
        }
      } catch (error) {
        console.warn('Failed to parse metric:', error)
      }
    }

    return metrics.sort((a, b) => a.timestamp - b.timestamp)
  }

  private async getProviderMetricsInTimeRange(
    provider: string,
    startTime: number,
    endTime: number
  ): Promise<RequestMetric[]> {
    const allMetrics = await this.getMetricsInTimeRange(startTime, endTime)
    return allMetrics.filter((m) => m.provider === provider)
  }

  private calculateRequestsPerSecond(metrics: RequestMetric[]): number {
    if (metrics.length === 0) return 0

    const timeSpan = (metrics[metrics.length - 1].timestamp - metrics[0].timestamp) / 1000
    return timeSpan > 0 ? metrics.length / timeSpan : 0
  }

  private calculateAverage(numbers: number[]): number {
    if (numbers.length === 0) return 0
    return numbers.reduce((sum, n) => sum + n, 0) / numbers.length
  }

  private calculatePercentile(sortedNumbers: number[], percentile: number): number {
    if (sortedNumbers.length === 0) return 0

    const index = Math.ceil(sortedNumbers.length * percentile) - 1
    return sortedNumbers[Math.max(0, index)]
  }

  private async getProvidersHealth(): Promise<Record<string, boolean>> {
    const providers = ['claude', 'openai']
    const health: Record<string, boolean> = {}

    for (const provider of providers) {
      const healthStatus = await this.redis.get(`health:${provider}`)
      health[provider] = healthStatus === '1'
    }

    return health
  }

  private async getTopErrors(
    metrics: RequestMetric[]
  ): Promise<Array<{ error: string; count: number; percentage: number }>> {
    const errorCounts: Record<string, number> = {}
    const failedRequests = metrics.filter((m) => !m.success)

    failedRequests.forEach((m) => {
      if (m.error) {
        errorCounts[m.error] = (errorCounts[m.error] || 0) + 1
      }
    })

    const total = failedRequests.length
    return Object.entries(errorCounts)
      .map(([error, count]) => ({
        error,
        count,
        percentage: total > 0 ? (count / total) * 100 : 0,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)
  }

  private async getHourlyStats(
    metrics: RequestMetric[]
  ): Promise<Array<{ hour: string; requests: number; cost: number }>> {
    const hourlyStats: Record<string, { requests: number; cost: number }> = {}

    metrics.forEach((m) => {
      const hour = new Date(m.timestamp).toISOString().substring(0, 13)
      if (!hourlyStats[hour]) {
        hourlyStats[hour] = { requests: 0, cost: 0 }
      }
      hourlyStats[hour].requests++
      hourlyStats[hour].cost += m.cost
    })

    return Object.entries(hourlyStats)
      .map(([hour, stats]) => ({ hour, ...stats }))
      .sort((a, b) => a.hour.localeCompare(b.hour))
  }

  private async calculateUptime(provider: string): Promise<number> {
    // Calculate uptime based on successful health checks
    const healthChecks = await this.redis.lrange(`health_history:${provider}`, 0, 100)
    if (healthChecks.length === 0) return 1

    const successfulChecks = healthChecks.filter((check) => check === '1').length
    return successfulChecks / healthChecks.length
  }

  private startMetricsAggregation(): void {
    setInterval(() => {
      this.aggregateMetrics()
    }, 60000) // Run every minute
  }

  private startAlertMonitoring(): void {
    setInterval(() => {
      this.checkAlerts()
    }, 30000) // Check every 30 seconds
  }

  private startCleanupTask(): void {
    setInterval(() => {
      this.cleanupOldMetrics()
    }, 3600000) // Run every hour
  }

  private async aggregateMetrics(): Promise<void> {
    // Aggregate metrics for better query performance
    try {
      const now = Date.now()
      const oneHourAgo = now - 3600000

      const recentMetrics = await this.getMetricsInTimeRange(oneHourAgo, now)

      // Store aggregated metrics
      const aggregated = {
        timestamp: now,
        totalRequests: recentMetrics.length,
        averageLatency: this.calculateAverage(recentMetrics.map((m) => m.latency)),
        successRate: recentMetrics.filter((m) => m.success).length / recentMetrics.length,
        totalCost: recentMetrics.reduce((sum, m) => sum + m.cost, 0),
      }

      await this.redis.setex(
        `aggregated:${Math.floor(now / 3600000)}`,
        86400,
        JSON.stringify(aggregated)
      )
    } catch (error) {
      console.error('Metrics aggregation failed:', error)
    }
  }

  private async checkAlerts(): Promise<void> {
    try {
      const metrics = await this.getMetrics()

      // Check latency alerts
      if (metrics.p95Latency > this.THRESHOLDS.latency.critical) {
        await this.createAlert(
          'latency',
          'critical',
          `P95 latency is ${metrics.p95Latency}ms (threshold: ${this.THRESHOLDS.latency.critical}ms)`
        )
      } else if (metrics.p95Latency > this.THRESHOLDS.latency.warning) {
        await this.createAlert(
          'latency',
          'medium',
          `P95 latency is ${metrics.p95Latency}ms (threshold: ${this.THRESHOLDS.latency.warning}ms)`
        )
      }

      // Check error rate alerts
      const errorRate = 1 - metrics.successRate
      if (errorRate > this.THRESHOLDS.errorRate.critical) {
        await this.createAlert(
          'error_rate',
          'critical',
          `Error rate is ${(errorRate * 100).toFixed(2)}% (threshold: ${this.THRESHOLDS.errorRate.critical * 100}%)`
        )
      } else if (errorRate > this.THRESHOLDS.errorRate.warning) {
        await this.createAlert(
          'error_rate',
          'medium',
          `Error rate is ${(errorRate * 100).toFixed(2)}% (threshold: ${this.THRESHOLDS.errorRate.warning * 100}%)`
        )
      }

      // Check cost alerts
      const today = new Date().toISOString().split('T')[0]
      const dailyCost = await this.redis.hget(`daily:${today}`, 'cost')
      const costInDollars = dailyCost ? parseInt(dailyCost) / 100 : 0

      if (costInDollars > this.THRESHOLDS.cost.dailyCritical) {
        await this.createAlert(
          'cost',
          'critical',
          `Daily cost is $${costInDollars.toFixed(2)} (threshold: $${this.THRESHOLDS.cost.dailyCritical})`
        )
      } else if (costInDollars > this.THRESHOLDS.cost.dailyWarning) {
        await this.createAlert(
          'cost',
          'medium',
          `Daily cost is $${costInDollars.toFixed(2)} (threshold: $${this.THRESHOLDS.cost.dailyWarning})`
        )
      }
    } catch (error) {
      console.error('Alert checking failed:', error)
    }
  }

  private async createAlert(
    type: Alert['type'],
    severity: Alert['severity'],
    message: string,
    provider?: string
  ): Promise<void> {
    const alert: Alert = {
      id: `alert_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      type,
      severity,
      message,
      provider,
      timestamp: Date.now(),
      resolved: false,
    }

    this.alerts.push(alert)

    // Store alert in Redis
    await this.redis.setex(`alert:${alert.id}`, 604800, JSON.stringify(alert)) // 7 days TTL

    console.warn(`🚨 Alert [${severity.toUpperCase()}]: ${message}`)
  }

  private async cleanupOldMetrics(): Promise<void> {
    try {
      const cutoff = Date.now() - 604800000 // 7 days ago
      const keys = await this.redis.keys('metrics:*')

      for (const key of keys) {
        const data = await this.redis.get(key)
        if (data) {
          const metric = JSON.parse(data) as RequestMetric
          if (metric.timestamp < cutoff) {
            await this.redis.del(key)
          }
        }
      }

      console.log(`🧹 Cleaned up ${keys.length} old metrics`)
    } catch (error) {
      console.error('Metrics cleanup failed:', error)
    }
  }

  private getEmptyMetrics(): SystemMetrics {
    return {
      totalRequests: 0,
      requestsPerSecond: 0,
      averageLatency: 0,
      p95Latency: 0,
      p99Latency: 0,
      successRate: 1,
      totalCost: 0,
      costPerRequest: 0,
      cacheHitRate: 0,
      providersHealth: {},
      topErrors: [],
      hourlyStats: [],
    }
  }

  private getEmptyProviderMetrics(): ProviderMetrics {
    return {
      totalRequests: 0,
      successfulRequests: 0,
      failedRequests: 0,
      averageLatency: 0,
      totalTokens: 0,
      totalCost: 0,
      cacheHitRate: 0,
      errorRate: 0,
      uptime: 1,
    }
  }
}
