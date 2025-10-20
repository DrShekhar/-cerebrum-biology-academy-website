/**
 * Enhanced Fallback Manager
 * Comprehensive fallback mechanisms and circuit breakers for AI provider failures
 */

interface ProviderHealth {
  status: 'healthy' | 'degraded' | 'unhealthy' | 'offline'
  lastChecked: number
  consecutiveFailures: number
  responseTime: number
  errorRate: number
  successRate: number
}

interface FallbackStrategy {
  primary: string
  secondary: string[]
  emergency: string
  maxRetries: number
  retryDelay: number
  circuitBreakerThreshold: number
  healthCheckInterval: number
}

interface CircuitBreakerState {
  state: 'closed' | 'open' | 'half-open'
  failureCount: number
  lastFailureTime: number
  nextAttemptTime: number
  successCount: number
}

interface FallbackRequest {
  prompt: string
  context?: any
  options?: any
  attemptCount: number
  startTime: number
  errors: Array<{
    provider: string
    error: string
    timestamp: number
  }>
}

export class EnhancedFallbackManager {
  private providerHealth = new Map<string, ProviderHealth>()
  private circuitBreakers = new Map<string, CircuitBreakerState>()
  private fallbackStrategies = new Map<string, FallbackStrategy>()
  private healthCheckTimers = new Map<string, NodeJS.Timeout>()

  constructor() {
    this.initializeFallbackStrategies()
    this.startHealthMonitoring()
  }

  /**
   * Execute request with comprehensive fallback handling
   */
  async executeWithFallback(
    request: FallbackRequest,
    executor: (provider: string) => Promise<any>
  ): Promise<{
    success: boolean
    response?: any
    finalProvider?: string
    attemptHistory: Array<{
      provider: string
      success: boolean
      error?: string
      responseTime: number
    }>
    totalTime: number
  }> {
    const attemptHistory: Array<{
      provider: string
      success: boolean
      error?: string
      responseTime: number
    }> = []

    const strategy = this.getStrategy(request.context?.subject || 'default')
    const providers = this.getOrderedProviders(strategy)

    let lastError: Error | null = null

    for (const provider of providers) {
      // Skip if circuit breaker is open
      if (this.isCircuitBreakerOpen(provider)) {
        console.log(`Skipping ${provider} - circuit breaker open`)
        continue
      }

      const attemptStartTime = Date.now()

      try {
        console.log(`Attempting ${provider} (attempt ${request.attemptCount + 1})...`)

        const response = await this.executeWithTimeout(
          () => executor(provider),
          this.getTimeoutForProvider(provider)
        )

        const responseTime = Date.now() - attemptStartTime

        // Record successful attempt
        attemptHistory.push({
          provider,
          success: true,
          responseTime,
        })

        // Update provider health positively
        this.recordSuccess(provider, responseTime)

        // Reset circuit breaker on success
        this.handleCircuitBreakerSuccess(provider)

        return {
          success: true,
          response,
          finalProvider: provider,
          attemptHistory,
          totalTime: Date.now() - request.startTime,
        }
      } catch (error) {
        const responseTime = Date.now() - attemptStartTime
        const errorMessage = error instanceof Error ? error.message : 'Unknown error'

        console.error(`${provider} failed:`, errorMessage)

        // Record failed attempt
        attemptHistory.push({
          provider,
          success: false,
          error: errorMessage,
          responseTime,
        })

        // Update provider health negatively
        this.recordFailure(provider, errorMessage)

        // Handle circuit breaker
        this.handleCircuitBreakerFailure(provider)

        lastError = error instanceof Error ? error : new Error(errorMessage)

        // Add delay before next attempt
        if (providers.indexOf(provider) < providers.length - 1) {
          await this.delay(strategy.retryDelay)
        }
      }
    }

    // All providers failed
    return {
      success: false,
      attemptHistory,
      totalTime: Date.now() - request.startTime,
    }
  }

  /**
   * Get providers in fallback order
   */
  private getOrderedProviders(strategy: FallbackStrategy): string[] {
    const providers = []

    // Add primary if healthy
    if (this.isProviderHealthy(strategy.primary)) {
      providers.push(strategy.primary)
    }

    // Add healthy secondary providers
    for (const provider of strategy.secondary) {
      if (this.isProviderHealthy(provider) && !providers.includes(provider)) {
        providers.push(provider)
      }
    }

    // Add primary back if not already included (for degraded but available cases)
    if (!providers.includes(strategy.primary)) {
      providers.push(strategy.primary)
    }

    // Add emergency provider as last resort
    if (!providers.includes(strategy.emergency)) {
      providers.push(strategy.emergency)
    }

    return providers
  }

  /**
   * Check if provider is healthy enough for requests
   */
  private isProviderHealthy(provider: string): boolean {
    const health = this.providerHealth.get(provider)
    if (!health) return true // Unknown providers are assumed healthy initially

    return health.status !== 'offline' && health.successRate > 0.5
  }

  /**
   * Circuit breaker management
   */
  private isCircuitBreakerOpen(provider: string): boolean {
    const breaker = this.circuitBreakers.get(provider)
    if (!breaker) return false

    const now = Date.now()

    switch (breaker.state) {
      case 'open':
        if (now >= breaker.nextAttemptTime) {
          // Transition to half-open
          breaker.state = 'half-open'
          breaker.successCount = 0
          console.log(`Circuit breaker ${provider}: open -> half-open`)
          return false
        }
        return true

      case 'half-open':
        return false

      case 'closed':
      default:
        return false
    }
  }

  private handleCircuitBreakerFailure(provider: string): void {
    let breaker = this.circuitBreakers.get(provider)
    if (!breaker) {
      breaker = {
        state: 'closed',
        failureCount: 0,
        lastFailureTime: 0,
        nextAttemptTime: 0,
        successCount: 0,
      }
      this.circuitBreakers.set(provider, breaker)
    }

    const now = Date.now()
    breaker.failureCount++
    breaker.lastFailureTime = now

    const strategy = this.getStrategy('default')

    switch (breaker.state) {
      case 'closed':
        if (breaker.failureCount >= strategy.circuitBreakerThreshold) {
          breaker.state = 'open'
          breaker.nextAttemptTime = now + 60000 // 1 minute timeout
          console.log(`Circuit breaker ${provider}: closed -> open`)
        }
        break

      case 'half-open':
        breaker.state = 'open'
        breaker.nextAttemptTime = now + 60000
        console.log(`Circuit breaker ${provider}: half-open -> open`)
        break
    }
  }

  private handleCircuitBreakerSuccess(provider: string): void {
    let breaker = this.circuitBreakers.get(provider)
    if (!breaker) return

    switch (breaker.state) {
      case 'half-open':
        breaker.successCount++
        if (breaker.successCount >= 3) {
          breaker.state = 'closed'
          breaker.failureCount = 0
          console.log(`Circuit breaker ${provider}: half-open -> closed`)
        }
        break

      case 'closed':
        breaker.failureCount = Math.max(0, breaker.failureCount - 1)
        break
    }
  }

  /**
   * Provider health tracking
   */
  private recordSuccess(provider: string, responseTime: number): void {
    let health = this.providerHealth.get(provider)
    if (!health) {
      health = {
        status: 'healthy',
        lastChecked: Date.now(),
        consecutiveFailures: 0,
        responseTime: responseTime,
        errorRate: 0,
        successRate: 1,
      }
    } else {
      health.consecutiveFailures = 0
      health.responseTime = health.responseTime * 0.7 + responseTime * 0.3 // Moving average
      health.successRate = Math.min(1, health.successRate + 0.1)
      health.errorRate = Math.max(0, health.errorRate - 0.1)
    }

    // Update status based on metrics
    if (health.responseTime < 5000 && health.successRate > 0.9) {
      health.status = 'healthy'
    } else if (health.responseTime < 10000 && health.successRate > 0.7) {
      health.status = 'degraded'
    } else {
      health.status = 'unhealthy'
    }

    health.lastChecked = Date.now()
    this.providerHealth.set(provider, health)
  }

  private recordFailure(provider: string, error: string): void {
    let health = this.providerHealth.get(provider)
    if (!health) {
      health = {
        status: 'unhealthy',
        lastChecked: Date.now(),
        consecutiveFailures: 1,
        responseTime: 30000, // Assume slow on failure
        errorRate: 1,
        successRate: 0,
      }
    } else {
      health.consecutiveFailures++
      health.errorRate = Math.min(1, health.errorRate + 0.2)
      health.successRate = Math.max(0, health.successRate - 0.2)
    }

    // Update status based on failures
    if (health.consecutiveFailures >= 5) {
      health.status = 'offline'
    } else if (health.consecutiveFailures >= 3) {
      health.status = 'unhealthy'
    } else {
      health.status = 'degraded'
    }

    health.lastChecked = Date.now()
    this.providerHealth.set(provider, health)
  }

  /**
   * Execute with timeout
   */
  private async executeWithTimeout<T>(fn: () => Promise<T>, timeoutMs: number): Promise<T> {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error(`Request timeout after ${timeoutMs}ms`))
      }, timeoutMs)

      fn()
        .then((result) => {
          clearTimeout(timer)
          resolve(result)
        })
        .catch((error) => {
          clearTimeout(timer)
          reject(error)
        })
    })
  }

  /**
   * Get timeout for specific provider
   */
  private getTimeoutForProvider(provider: string): number {
    const health = this.providerHealth.get(provider)
    const baseTimeout = 30000 // 30 seconds

    if (!health) return baseTimeout

    // Adjust timeout based on provider health
    switch (health.status) {
      case 'healthy':
        return baseTimeout
      case 'degraded':
        return baseTimeout * 1.5
      case 'unhealthy':
        return baseTimeout * 2
      case 'offline':
        return baseTimeout * 0.5 // Fail fast for offline providers
      default:
        return baseTimeout
    }
  }

  /**
   * Initialize fallback strategies
   */
  private initializeFallbackStrategies(): void {
    // Default strategy for general requests
    this.fallbackStrategies.set('default', {
      primary: 'anthropic',
      secondary: ['openai', 'google'],
      emergency: 'google',
      maxRetries: 3,
      retryDelay: 1000,
      circuitBreakerThreshold: 5,
      healthCheckInterval: 30000,
    })

    // Biology-specific strategy
    this.fallbackStrategies.set('biology', {
      primary: 'anthropic',
      secondary: ['openai', 'google'],
      emergency: 'openai',
      maxRetries: 3,
      retryDelay: 1500,
      circuitBreakerThreshold: 3,
      healthCheckInterval: 30000,
    })

    // Fast response strategy
    this.fallbackStrategies.set('fast', {
      primary: 'google',
      secondary: ['openai', 'anthropic'],
      emergency: 'openai',
      maxRetries: 2,
      retryDelay: 500,
      circuitBreakerThreshold: 5,
      healthCheckInterval: 15000,
    })

    // Critical request strategy
    this.fallbackStrategies.set('critical', {
      primary: 'anthropic',
      secondary: ['openai', 'google'],
      emergency: 'openai',
      maxRetries: 5,
      retryDelay: 2000,
      circuitBreakerThreshold: 3,
      healthCheckInterval: 10000,
    })
  }

  /**
   * Get strategy for request type
   */
  private getStrategy(type: string): FallbackStrategy {
    return this.fallbackStrategies.get(type) || this.fallbackStrategies.get('default')!
  }

  /**
   * Health monitoring
   */
  private startHealthMonitoring(): void {
    // Start health checks for each strategy
    for (const [strategyName, strategy] of this.fallbackStrategies) {
      const timer = setInterval(() => {
        this.performHealthCheck(strategy)
      }, strategy.healthCheckInterval)

      this.healthCheckTimers.set(strategyName, timer)
    }

    console.log('Health monitoring started for all fallback strategies')
  }

  private async performHealthCheck(strategy: FallbackStrategy): Promise<void> {
    const providers = [strategy.primary, ...strategy.secondary, strategy.emergency]

    for (const provider of providers) {
      try {
        const startTime = Date.now()

        // Simple health check - this would be replaced with actual API ping
        await this.pingProvider(provider)

        const responseTime = Date.now() - startTime
        this.recordHealthCheckSuccess(provider, responseTime)
      } catch (error) {
        this.recordHealthCheckFailure(
          provider,
          error instanceof Error ? error.message : 'Health check failed'
        )
      }
    }
  }

  private async pingProvider(provider: string): Promise<void> {
    // Simplified health check - in reality this would make a minimal API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate occasional failures for testing
        if (Math.random() < 0.95) {
          resolve()
        } else {
          reject(new Error('Health check failed'))
        }
      }, Math.random() * 1000)
    })
  }

  private recordHealthCheckSuccess(provider: string, responseTime: number): void {
    // Similar to recordSuccess but lighter weight for health checks
    const health = this.providerHealth.get(provider)
    if (health) {
      health.lastChecked = Date.now()
      health.responseTime = health.responseTime * 0.9 + responseTime * 0.1

      if (health.status === 'offline' && health.consecutiveFailures > 0) {
        health.consecutiveFailures = Math.max(0, health.consecutiveFailures - 1)
        if (health.consecutiveFailures === 0) {
          health.status = 'degraded'
        }
      }
    }
  }

  private recordHealthCheckFailure(provider: string, error: string): void {
    const health = this.providerHealth.get(provider)
    if (health) {
      health.lastChecked = Date.now()
      health.consecutiveFailures++

      if (health.consecutiveFailures >= 10) {
        health.status = 'offline'
      }
    }
  }

  /**
   * Utility methods
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  /**
   * Get current system status
   */
  getSystemStatus(): {
    providers: Record<
      string,
      {
        health: ProviderHealth
        circuitBreaker: CircuitBreakerState
      }
    >
    strategies: Record<string, FallbackStrategy>
    overallHealth: 'healthy' | 'degraded' | 'critical'
  } {
    const providers: Record<
      string,
      { health: ProviderHealth; circuitBreaker: CircuitBreakerState }
    > = {}

    // Collect all unique providers
    const allProviders = new Set<string>()
    for (const strategy of this.fallbackStrategies.values()) {
      allProviders.add(strategy.primary)
      strategy.secondary.forEach((p) => allProviders.add(p))
      allProviders.add(strategy.emergency)
    }

    for (const provider of allProviders) {
      const health = this.providerHealth.get(provider) || {
        status: 'healthy' as const,
        lastChecked: Date.now(),
        consecutiveFailures: 0,
        responseTime: 0,
        errorRate: 0,
        successRate: 1,
      }

      const circuitBreaker = this.circuitBreakers.get(provider) || {
        state: 'closed' as const,
        failureCount: 0,
        lastFailureTime: 0,
        nextAttemptTime: 0,
        successCount: 0,
      }

      providers[provider] = { health, circuitBreaker }
    }

    // Calculate overall health
    const healthyProviders = Object.values(providers).filter(
      (p) => p.health.status === 'healthy'
    ).length
    const totalProviders = Object.keys(providers).length

    let overallHealth: 'healthy' | 'degraded' | 'critical'
    if (healthyProviders === totalProviders) {
      overallHealth = 'healthy'
    } else if (healthyProviders >= totalProviders / 2) {
      overallHealth = 'degraded'
    } else {
      overallHealth = 'critical'
    }

    return {
      providers,
      strategies: Object.fromEntries(this.fallbackStrategies),
      overallHealth,
    }
  }

  /**
   * Update fallback strategy
   */
  updateStrategy(name: string, strategy: Partial<FallbackStrategy>): void {
    const existing = this.fallbackStrategies.get(name)
    if (existing) {
      this.fallbackStrategies.set(name, { ...existing, ...strategy })
      console.log(`Updated fallback strategy: ${name}`)
    }
  }

  /**
   * Force circuit breaker state
   */
  forceCircuitBreakerState(provider: string, state: 'open' | 'closed'): void {
    let breaker = this.circuitBreakers.get(provider)
    if (!breaker) {
      breaker = {
        state: 'closed',
        failureCount: 0,
        lastFailureTime: 0,
        nextAttemptTime: 0,
        successCount: 0,
      }
    }

    breaker.state = state
    if (state === 'closed') {
      breaker.failureCount = 0
      breaker.successCount = 0
    }

    this.circuitBreakers.set(provider, breaker)
    console.log(`Forced circuit breaker ${provider} to ${state}`)
  }

  /**
   * Cleanup
   */
  destroy(): void {
    for (const timer of this.healthCheckTimers.values()) {
      clearInterval(timer)
    }
    this.healthCheckTimers.clear()
    console.log('Fallback manager destroyed')
  }
}

// Export singleton instance
export const fallbackManager = new EnhancedFallbackManager()
