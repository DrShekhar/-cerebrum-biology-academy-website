/**
 * Intelligent Retry Manager
 * Implements exponential backoff with jitter and smart retry decisions
 */

interface RetryConfig {
  maxRetries: number
  baseDelay: number // Base delay in milliseconds
  maxDelay: number // Maximum delay in milliseconds
  jitterFactor: number // Random jitter factor (0-1)
  exponentialBase: number // Exponential backoff base
}

interface RetryableRequest {
  id: string
  retryCount?: number
  priority: 'low' | 'medium' | 'high' | 'critical'
}

const RETRY_CONFIGS: Record<string, RetryConfig> = {
  low: {
    maxRetries: 1,
    baseDelay: 1000,
    maxDelay: 5000,
    jitterFactor: 0.1,
    exponentialBase: 2,
  },
  medium: {
    maxRetries: 2,
    baseDelay: 500,
    maxDelay: 10000,
    jitterFactor: 0.2,
    exponentialBase: 2,
  },
  high: {
    maxRetries: 3,
    baseDelay: 250,
    maxDelay: 15000,
    jitterFactor: 0.3,
    exponentialBase: 1.5,
  },
  critical: {
    maxRetries: 5,
    baseDelay: 100,
    maxDelay: 30000,
    jitterFactor: 0.4,
    exponentialBase: 1.5,
  },
}

// Error types that should trigger retries
const RETRYABLE_ERRORS = [
  'ECONNRESET',
  'ECONNREFUSED',
  'ETIMEDOUT',
  'ENOTFOUND',
  '429', // Rate limited
  '500', // Internal server error
  '502', // Bad gateway
  '503', // Service unavailable
  '504', // Gateway timeout
]

// Error types that should NOT trigger retries
const NON_RETRYABLE_ERRORS = [
  '400', // Bad request
  '401', // Unauthorized
  '403', // Forbidden
  '404', // Not found
  '413', // Payload too large
  '422', // Unprocessable entity
]

export class RetryManager {
  private retryHistory: Map<string, number[]> = new Map()

  /**
   * Determine if a request should be retried based on error and context
   */
  shouldRetry(request: RetryableRequest, error: Error): boolean {
    const config = RETRY_CONFIGS[request.priority]
    const currentRetryCount = request.retryCount || 0

    // Check if we've exceeded max retries
    if (currentRetryCount >= config.maxRetries) {
      return false
    }

    // Check if error is retryable
    if (!this.isRetryableError(error)) {
      return false
    }

    // Check rate limiting for this specific request
    if (this.isRateLimited(request.id)) {
      return false
    }

    return true
  }

  /**
   * Calculate retry delay using exponential backoff with jitter
   */
  getRetryDelay(
    retryCount: number,
    priority: 'low' | 'medium' | 'high' | 'critical' = 'medium'
  ): number {
    const config = RETRY_CONFIGS[priority]

    // Calculate exponential delay
    const exponentialDelay = config.baseDelay * Math.pow(config.exponentialBase, retryCount)

    // Apply jitter to prevent thundering herd
    const jitter = 1 + (Math.random() - 0.5) * config.jitterFactor
    const delayWithJitter = exponentialDelay * jitter

    // Cap at maximum delay
    return Math.min(delayWithJitter, config.maxDelay)
  }

  /**
   * Record a retry attempt for rate limiting
   */
  recordRetryAttempt(requestId: string): void {
    const now = Date.now()
    const attempts = this.retryHistory.get(requestId) || []

    // Add current attempt
    attempts.push(now)

    // Clean up old attempts (older than 1 hour)
    const oneHourAgo = now - 3600000
    const recentAttempts = attempts.filter((timestamp) => timestamp > oneHourAgo)

    this.retryHistory.set(requestId, recentAttempts)
  }

  /**
   * Check if a request is being rate limited
   */
  private isRateLimited(requestId: string): boolean {
    const attempts = this.retryHistory.get(requestId) || []
    const now = Date.now()
    const oneMinuteAgo = now - 60000

    // Count attempts in the last minute
    const recentAttempts = attempts.filter((timestamp) => timestamp > oneMinuteAgo)

    // Rate limit: no more than 10 retries per minute per request
    return recentAttempts.length >= 10
  }

  /**
   * Determine if an error is retryable
   */
  private isRetryableError(error: Error): boolean {
    const errorMessage = error.message.toLowerCase()
    const errorStack = error.stack?.toLowerCase() || ''

    // Check for non-retryable errors first
    for (const nonRetryableError of NON_RETRYABLE_ERRORS) {
      if (errorMessage.includes(nonRetryableError) || errorStack.includes(nonRetryableError)) {
        return false
      }
    }

    // Check for retryable errors
    for (const retryableError of RETRYABLE_ERRORS) {
      if (errorMessage.includes(retryableError) || errorStack.includes(retryableError)) {
        return true
      }
    }

    // Check for specific error patterns
    if (this.isNetworkError(error)) return true
    if (this.isTimeoutError(error)) return true
    if (this.isServerError(error)) return true

    // Default to not retrying unknown errors
    return false
  }

  private isNetworkError(error: Error): boolean {
    const networkErrorPatterns = [
      'network',
      'connection',
      'socket',
      'dns',
      'timeout',
      'reset',
      'refused',
    ]

    const errorText = (error.message + (error.stack || '')).toLowerCase()
    return networkErrorPatterns.some((pattern) => errorText.includes(pattern))
  }

  private isTimeoutError(error: Error): boolean {
    const timeoutPatterns = ['timeout', 'timed out', 'deadline exceeded', 'request timeout']

    const errorText = error.message.toLowerCase()
    return timeoutPatterns.some((pattern) => errorText.includes(pattern))
  }

  private isServerError(error: Error): boolean {
    const serverErrorPatterns = [
      'internal server error',
      'bad gateway',
      'service unavailable',
      'gateway timeout',
      '5xx',
    ]

    const errorText = error.message.toLowerCase()
    return serverErrorPatterns.some((pattern) => errorText.includes(pattern))
  }

  /**
   * Get retry statistics for monitoring
   */
  getRetryStats(): {
    totalRequests: number
    totalRetries: number
    averageRetriesPerRequest: number
    topFailureReasons: Array<{ reason: string; count: number }>
  } {
    const totalRequests = this.retryHistory.size
    const totalRetries = Array.from(this.retryHistory.values()).reduce(
      (sum, attempts) => sum + attempts.length,
      0
    )

    return {
      totalRequests,
      totalRetries,
      averageRetriesPerRequest: totalRequests > 0 ? totalRetries / totalRequests : 0,
      topFailureReasons: [], // TODO: Implement failure reason tracking
    }
  }

  /**
   * Clear old retry history to prevent memory leaks
   */
  cleanup(): void {
    const now = Date.now()
    const oneHourAgo = now - 3600000

    for (const [requestId, attempts] of this.retryHistory.entries()) {
      const recentAttempts = attempts.filter((timestamp) => timestamp > oneHourAgo)

      if (recentAttempts.length === 0) {
        this.retryHistory.delete(requestId)
      } else {
        this.retryHistory.set(requestId, recentAttempts)
      }
    }
  }

  /**
   * Get configuration for a specific priority level
   */
  getConfigForPriority(priority: 'low' | 'medium' | 'high' | 'critical'): RetryConfig {
    return RETRY_CONFIGS[priority]
  }
}
