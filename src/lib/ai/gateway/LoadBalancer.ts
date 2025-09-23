/**
 * Load Balancer for AI Gateway
 * Distributes requests intelligently across providers for optimal performance
 */

interface AIProvider {
  id: 'claude' | 'openai'
  name: string
  costPerToken: number
  maxTokens: number
  capabilities: string[]
  priority: number
}

interface LoadMetrics {
  activeConnections: number
  avgResponseTime: number
  errorRate: number
  throughput: number
  lastHealthCheck: number
  isHealthy: boolean
}

interface LoadBalancingStrategy {
  type:
    | 'round_robin'
    | 'weighted_round_robin'
    | 'least_connections'
    | 'weighted_response_time'
    | 'adaptive'
  weights?: Record<string, number>
}

export class LoadBalancer {
  private providerMetrics: Map<string, LoadMetrics> = new Map()
  private requestCounts: Map<string, number> = new Map()
  private currentProviderIndex = 0
  private strategy: LoadBalancingStrategy = { type: 'adaptive' }

  constructor(strategy: LoadBalancingStrategy = { type: 'adaptive' }) {
    this.strategy = strategy
  }

  /**
   * Select optimal provider based on current load and strategy
   */
  selectProvider(providers: AIProvider[], excludeProviders: string[] = []): AIProvider | null {
    // Filter out unhealthy and excluded providers
    const healthyProviders = providers.filter(
      (provider) => !excludeProviders.includes(provider.id) && this.isProviderHealthy(provider.id)
    )

    if (healthyProviders.length === 0) {
      return null
    }

    if (healthyProviders.length === 1) {
      return healthyProviders[0]
    }

    // Apply load balancing strategy
    switch (this.strategy.type) {
      case 'round_robin':
        return this.roundRobinSelection(healthyProviders)

      case 'weighted_round_robin':
        return this.weightedRoundRobinSelection(healthyProviders)

      case 'least_connections':
        return this.leastConnectionsSelection(healthyProviders)

      case 'weighted_response_time':
        return this.weightedResponseTimeSelection(healthyProviders)

      case 'adaptive':
      default:
        return this.adaptiveSelection(healthyProviders)
    }
  }

  /**
   * Record metrics for a provider after request completion
   */
  recordMetrics(providerId: string, responseTime: number, success: boolean): void {
    const metrics = this.providerMetrics.get(providerId) || this.getDefaultMetrics()

    // Update connection count
    metrics.activeConnections = Math.max(0, metrics.activeConnections - 1)

    // Update average response time (exponential moving average)
    const alpha = 0.3 // Smoothing factor
    metrics.avgResponseTime =
      metrics.avgResponseTime === 0
        ? responseTime
        : alpha * responseTime + (1 - alpha) * metrics.avgResponseTime

    // Update error rate (exponential moving average)
    const errorValue = success ? 0 : 1
    metrics.errorRate =
      metrics.errorRate === 0 ? errorValue : alpha * errorValue + (1 - alpha) * metrics.errorRate

    // Update throughput (requests per second)
    this.updateThroughput(providerId)

    // Update health status
    metrics.isHealthy = this.calculateHealthStatus(metrics)
    metrics.lastHealthCheck = Date.now()

    this.providerMetrics.set(providerId, metrics)
  }

  /**
   * Record the start of a request (increment active connections)
   */
  recordRequestStart(providerId: string): void {
    const metrics = this.providerMetrics.get(providerId) || this.getDefaultMetrics()
    metrics.activeConnections++
    this.providerMetrics.set(providerId, metrics)

    // Update request count for round-robin
    const currentCount = this.requestCounts.get(providerId) || 0
    this.requestCounts.set(providerId, currentCount + 1)
  }

  /**
   * Get current load metrics for a provider
   */
  getProviderMetrics(providerId: string): LoadMetrics {
    return this.providerMetrics.get(providerId) || this.getDefaultMetrics()
  }

  /**
   * Get comprehensive load balancing statistics
   */
  getLoadBalancingStats(): {
    strategy: LoadBalancingStrategy
    totalRequests: number
    providerDistribution: Record<string, number>
    averageResponseTimes: Record<string, number>
    errorRates: Record<string, number>
    healthStatus: Record<string, boolean>
  } {
    const totalRequests = Array.from(this.requestCounts.values()).reduce(
      (sum, count) => sum + count,
      0
    )

    const providerDistribution: Record<string, number> = {}
    const averageResponseTimes: Record<string, number> = {}
    const errorRates: Record<string, number> = {}
    const healthStatus: Record<string, boolean> = {}

    for (const [providerId, count] of this.requestCounts.entries()) {
      providerDistribution[providerId] = totalRequests > 0 ? (count / totalRequests) * 100 : 0

      const metrics = this.providerMetrics.get(providerId)
      if (metrics) {
        averageResponseTimes[providerId] = metrics.avgResponseTime
        errorRates[providerId] = metrics.errorRate * 100
        healthStatus[providerId] = metrics.isHealthy
      }
    }

    return {
      strategy: this.strategy,
      totalRequests,
      providerDistribution,
      averageResponseTimes,
      errorRates,
      healthStatus,
    }
  }

  /**
   * Update load balancing strategy
   */
  setStrategy(strategy: LoadBalancingStrategy): void {
    this.strategy = strategy
  }

  /**
   * Force provider health status (for testing/maintenance)
   */
  setProviderHealth(providerId: string, isHealthy: boolean): void {
    const metrics = this.providerMetrics.get(providerId) || this.getDefaultMetrics()
    metrics.isHealthy = isHealthy
    metrics.lastHealthCheck = Date.now()
    this.providerMetrics.set(providerId, metrics)
  }

  // Load Balancing Algorithms

  /**
   * Round Robin: Simple rotation through providers
   */
  private roundRobinSelection(providers: AIProvider[]): AIProvider {
    const provider = providers[this.currentProviderIndex % providers.length]
    this.currentProviderIndex = (this.currentProviderIndex + 1) % providers.length
    return provider
  }

  /**
   * Weighted Round Robin: Based on provider priorities
   */
  private weightedRoundRobinSelection(providers: AIProvider[]): AIProvider {
    const weights = this.strategy.weights || this.calculateDefaultWeights(providers)

    // Create weighted list
    const weightedProviders: AIProvider[] = []
    providers.forEach((provider) => {
      const weight = weights[provider.id] || 1
      for (let i = 0; i < weight; i++) {
        weightedProviders.push(provider)
      }
    })

    const provider = weightedProviders[this.currentProviderIndex % weightedProviders.length]
    this.currentProviderIndex = (this.currentProviderIndex + 1) % weightedProviders.length
    return provider
  }

  /**
   * Least Connections: Route to provider with fewest active connections
   */
  private leastConnectionsSelection(providers: AIProvider[]): AIProvider {
    return providers.reduce((minProvider, provider) => {
      const currentMetrics = this.getProviderMetrics(provider.id)
      const minMetrics = this.getProviderMetrics(minProvider.id)

      return currentMetrics.activeConnections < minMetrics.activeConnections
        ? provider
        : minProvider
    })
  }

  /**
   * Weighted Response Time: Favor providers with better response times
   */
  private weightedResponseTimeSelection(providers: AIProvider[]): AIProvider {
    // Calculate inverse response time weights (lower response time = higher weight)
    const responseTimeWeights = providers.map((provider) => {
      const metrics = this.getProviderMetrics(provider.id)
      const responseTime = metrics.avgResponseTime || 1000 // Default 1s if no data
      return {
        provider,
        weight: 1 / Math.max(responseTime, 100), // Minimum 100ms to avoid division issues
      }
    })

    // Normalize weights
    const totalWeight = responseTimeWeights.reduce((sum, item) => sum + item.weight, 0)
    const normalizedWeights = responseTimeWeights.map((item) => ({
      ...item,
      weight: item.weight / totalWeight,
    }))

    // Select based on weighted random
    const random = Math.random()
    let cumulative = 0

    for (const item of normalizedWeights) {
      cumulative += item.weight
      if (random <= cumulative) {
        return item.provider
      }
    }

    return providers[0] // Fallback
  }

  /**
   * Adaptive: Intelligent selection based on multiple factors
   */
  private adaptiveSelection(providers: AIProvider[]): AIProvider {
    const scores = providers.map((provider) => {
      const metrics = this.getProviderMetrics(provider.id)

      // Calculate composite score (lower is better)
      let score = 0

      // Response time factor (0-40 points)
      const avgResponseTime = metrics.avgResponseTime || 1000
      score += Math.min(avgResponseTime / 100, 40)

      // Error rate factor (0-30 points)
      score += metrics.errorRate * 30

      // Active connections factor (0-20 points)
      score += Math.min(metrics.activeConnections * 2, 20)

      // Priority factor (0-10 points, lower priority = higher score)
      score += provider.priority * 2

      return { provider, score }
    })

    // Select provider with lowest score
    const bestProvider = scores.reduce((best, current) =>
      current.score < best.score ? current : best
    )

    return bestProvider.provider
  }

  /**
   * Calculate default weights based on provider priorities
   */
  private calculateDefaultWeights(providers: AIProvider[]): Record<string, number> {
    const weights: Record<string, number> = {}
    const maxPriority = Math.max(...providers.map((p) => p.priority))

    providers.forEach((provider) => {
      // Higher priority = lower number = higher weight
      weights[provider.id] = maxPriority - provider.priority + 1
    })

    return weights
  }

  /**
   * Check if provider is considered healthy
   */
  private isProviderHealthy(providerId: string): boolean {
    const metrics = this.getProviderMetrics(providerId)

    // Consider unhealthy if no recent health check
    const now = Date.now()
    const staleThreshold = 5 * 60 * 1000 // 5 minutes
    if (now - metrics.lastHealthCheck > staleThreshold) {
      return false
    }

    return metrics.isHealthy
  }

  /**
   * Calculate health status based on metrics
   */
  private calculateHealthStatus(metrics: LoadMetrics): boolean {
    // Consider unhealthy if error rate > 10%
    if (metrics.errorRate > 0.1) return false

    // Consider unhealthy if average response time > 10 seconds
    if (metrics.avgResponseTime > 10000) return false

    // Consider unhealthy if too many active connections (overloaded)
    if (metrics.activeConnections > 100) return false

    return true
  }

  /**
   * Update throughput calculation
   */
  private updateThroughput(providerId: string): void {
    const metrics = this.getProviderMetrics(providerId)
    const now = Date.now()

    // Simple throughput calculation (requests per second)
    if (metrics.lastHealthCheck > 0) {
      const timeDiff = (now - metrics.lastHealthCheck) / 1000
      if (timeDiff > 0) {
        metrics.throughput = 1 / timeDiff // Requests per second for this request
      }
    }
  }

  /**
   * Get default metrics for new providers
   */
  private getDefaultMetrics(): LoadMetrics {
    return {
      activeConnections: 0,
      avgResponseTime: 0,
      errorRate: 0,
      throughput: 0,
      lastHealthCheck: Date.now(),
      isHealthy: true,
    }
  }

  /**
   * Reset all metrics (useful for testing)
   */
  reset(): void {
    this.providerMetrics.clear()
    this.requestCounts.clear()
    this.currentProviderIndex = 0
  }

  /**
   * Get current provider index (for round-robin debugging)
   */
  getCurrentProviderIndex(): number {
    return this.currentProviderIndex
  }
}
