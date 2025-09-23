/**
 * Circuit Breaker Pattern Implementation
 * Prevents cascading failures and provides graceful degradation
 */

type CircuitBreakerState = 'CLOSED' | 'OPEN' | 'HALF_OPEN'

interface CircuitBreakerConfig {
  threshold: number // Number of failures before opening
  timeout: number // Time to wait before attempting reset
  resetTimeout: number // Time to wait in half-open state
  monitoringPeriod: number // Time window for failure counting
  onOpen?: () => void
  onHalfOpen?: () => void
  onClose?: () => void
}

interface CircuitBreakerMetrics {
  failures: number
  successes: number
  requests: number
  lastFailureTime: number
  lastSuccessTime: number
  state: CircuitBreakerState
}

export class CircuitBreaker {
  private state: CircuitBreakerState = 'CLOSED'
  private failures = 0
  private successes = 0
  private requests = 0
  private lastFailureTime = 0
  private lastSuccessTime = 0
  private lastAttemptTime = 0
  private config: CircuitBreakerConfig

  constructor(config: CircuitBreakerConfig) {
    this.config = config
  }

  /**
   * Execute a function with circuit breaker protection
   */
  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === 'OPEN') {
      if (this.shouldAttemptReset()) {
        this.state = 'HALF_OPEN'
        this.config.onHalfOpen?.()
      } else {
        throw new Error('Circuit breaker is OPEN')
      }
    }

    this.requests++
    this.lastAttemptTime = Date.now()

    try {
      const result = await fn()
      this.onSuccess()
      return result
    } catch (error) {
      this.onFailure()
      throw error
    }
  }

  private onSuccess(): void {
    this.successes++
    this.lastSuccessTime = Date.now()

    if (this.state === 'HALF_OPEN') {
      this.state = 'CLOSED'
      this.failures = 0
      this.config.onClose?.()
    }
  }

  private onFailure(): void {
    this.failures++
    this.lastFailureTime = Date.now()

    if (this.shouldOpen()) {
      this.state = 'OPEN'
      this.config.onOpen?.()
    }
  }

  private shouldOpen(): boolean {
    if (this.state === 'OPEN') return false

    // Check if we've exceeded the failure threshold
    return this.failures >= this.config.threshold
  }

  private shouldAttemptReset(): boolean {
    return Date.now() - this.lastFailureTime > this.config.timeout
  }

  /**
   * Get current circuit breaker metrics
   */
  getMetrics(): CircuitBreakerMetrics {
    return {
      failures: this.failures,
      successes: this.successes,
      requests: this.requests,
      lastFailureTime: this.lastFailureTime,
      lastSuccessTime: this.lastSuccessTime,
      state: this.state,
    }
  }

  /**
   * Get current state
   */
  get currentState(): CircuitBreakerState {
    return this.state
  }

  /**
   * Get failure rate over the monitoring period
   */
  getFailureRate(): number {
    const totalRequests = this.failures + this.successes
    return totalRequests > 0 ? this.failures / totalRequests : 0
  }

  /**
   * Reset the circuit breaker to closed state
   */
  reset(): void {
    this.state = 'CLOSED'
    this.failures = 0
    this.successes = 0
    this.requests = 0
    this.lastFailureTime = 0
    this.lastSuccessTime = 0
    this.lastAttemptTime = 0
  }

  /**
   * Force the circuit breaker to open state
   */
  forceOpen(): void {
    this.state = 'OPEN'
    this.config.onOpen?.()
  }

  /**
   * Force the circuit breaker to closed state
   */
  forceClose(): void {
    this.state = 'CLOSED'
    this.failures = 0
    this.config.onClose?.()
  }
}
