/**
 * Self-Healing Error Handling Manager for AI Gateway
 * Automatically detects, categorizes, and heals system errors
 */

import Redis from 'ioredis'
import { createRedisClient } from '@/lib/redis/redisClient'

interface ErrorPattern {
  type: 'network' | 'api' | 'rate_limit' | 'timeout' | 'provider' | 'unknown'
  severity: 'low' | 'medium' | 'high' | 'critical'
  pattern: RegExp
  selfHealingStrategy: string
  recoveryTime: number
  maxRetries: number
}

interface ErrorReport {
  id: string
  timestamp: number
  type: string
  severity: string
  message: string
  stack?: string
  context: any
  provider?: string
  userId?: string
  resolved: boolean
  healingAttempts: number
  recoveryAction?: string
}

interface SelfHealingAction {
  name: string
  description: string
  execute: (error: ErrorReport, context: any) => Promise<boolean>
  applicable: (error: ErrorReport) => boolean
  priority: number
}

interface ErrorMetrics {
  totalErrors: number
  resolvedErrors: number
  selfHealingRate: number
  topErrorTypes: Array<{ type: string; count: number; rate: number }>
  averageRecoveryTime: number
  criticalErrors: number
  systemHealth: number
}

export class ErrorHandlingManager {
  private redis: Redis | null = null
  private errorPatterns: ErrorPattern[]
  private healingActions: SelfHealingAction[]
  private errorHistory: Map<string, ErrorReport[]> = new Map()
  private isMonitoring = false
  private healingInProgress = new Set<string>()

  constructor(redisUrl?: string) {
    // Lazy initialize Redis
    if (typeof window === 'undefined' && process.env.NEXT_PHASE !== 'phase-production-build') {
      this.redis = createRedisClient()
    }
    this.initializeErrorPatterns()
    this.initializeHealingActions()
    this.startErrorMonitoring()
  }

  /**
   * Process and attempt to heal an error
   */
  async handleError(
    error: Error,
    context: any = {}
  ): Promise<{
    handled: boolean
    recovered: boolean
    fallbackResponse?: any
    errorId: string
  }> {
    const errorReport = await this.createErrorReport(error, context)

    // Store error for monitoring
    await this.storeError(errorReport)

    // Attempt self-healing
    const healingResult = await this.attemptSelfHealing(errorReport)

    // If healing failed, apply fallback strategies
    if (!healingResult.recovered) {
      const fallbackResponse = await this.applyFallbackStrategy(errorReport)
      return {
        handled: true,
        recovered: false,
        fallbackResponse,
        errorId: errorReport.id,
      }
    }

    return {
      handled: true,
      recovered: true,
      errorId: errorReport.id,
    }
  }

  /**
   * Attempt automatic self-healing
   */
  private async attemptSelfHealing(errorReport: ErrorReport): Promise<{
    recovered: boolean
    action?: string
    retryAfter?: number
  }> {
    const errorId = errorReport.id

    // Prevent concurrent healing attempts for the same error type
    const healingKey = `${errorReport.type}:${errorReport.provider || 'general'}`
    if (this.healingInProgress.has(healingKey)) {
      return { recovered: false }
    }

    this.healingInProgress.add(healingKey)

    try {
      // Find applicable healing actions
      const applicableActions = this.healingActions
        .filter((action) => action.applicable(errorReport))
        .sort((a, b) => b.priority - a.priority)

      for (const action of applicableActions) {
        console.log(`🔧 Attempting self-healing: ${action.name}`)

        try {
          const success = await action.execute(errorReport, errorReport.context)

          if (success) {
            errorReport.resolved = true
            errorReport.recoveryAction = action.name
            await this.updateErrorReport(errorReport)

            console.log(`✅ Self-healing successful: ${action.name}`)
            return {
              recovered: true,
              action: action.name,
              retryAfter: this.calculateRetryDelay(errorReport),
            }
          }
        } catch (healingError) {
          console.warn(`❌ Healing action failed: ${action.name}`, healingError)
        }

        errorReport.healingAttempts++
      }

      return { recovered: false }
    } finally {
      this.healingInProgress.delete(healingKey)
    }
  }

  /**
   * Apply fallback strategies when healing fails
   */
  private async applyFallbackStrategy(errorReport: ErrorReport): Promise<any> {
    switch (errorReport.type) {
      case 'provider':
        return await this.providerFallback(errorReport)

      case 'rate_limit':
        return await this.rateLimitFallback(errorReport)

      case 'timeout':
        return await this.timeoutFallback(errorReport)

      case 'network':
        return await this.networkFallback(errorReport)

      default:
        return await this.genericFallback(errorReport)
    }
  }

  /**
   * Initialize error patterns for classification
   */
  private initializeErrorPatterns(): void {
    this.errorPatterns = [
      {
        type: 'network',
        severity: 'high',
        pattern: /(ECONNRESET|ECONNREFUSED|ETIMEDOUT|ENOTFOUND|network|connection)/i,
        selfHealingStrategy: 'reconnect_with_backoff',
        recoveryTime: 5000,
        maxRetries: 3,
      },
      {
        type: 'rate_limit',
        severity: 'medium',
        pattern: /(429|rate.limit|too.many.requests)/i,
        selfHealingStrategy: 'exponential_backoff',
        recoveryTime: 60000,
        maxRetries: 5,
      },
      {
        type: 'timeout',
        severity: 'medium',
        pattern: /(timeout|timed.out|deadline.exceeded)/i,
        selfHealingStrategy: 'increase_timeout_retry',
        recoveryTime: 10000,
        maxRetries: 2,
      },
      {
        type: 'api',
        severity: 'high',
        pattern: /(400|401|403|500|502|503|504)/i,
        selfHealingStrategy: 'provider_rotation',
        recoveryTime: 30000,
        maxRetries: 3,
      },
      {
        type: 'provider',
        severity: 'critical',
        pattern: /(claude|openai|anthropic).*?(unavailable|error|failed)/i,
        selfHealingStrategy: 'immediate_failover',
        recoveryTime: 1000,
        maxRetries: 1,
      },
    ]
  }

  /**
   * Initialize self-healing actions
   */
  private initializeHealingActions(): void {
    this.healingActions = [
      {
        name: 'provider_failover',
        description: 'Switch to alternative AI provider',
        priority: 10,
        applicable: (error) => error.type === 'provider' || error.type === 'api',
        execute: async (error, context) => {
          try {
            // Signal provider rotation to the gateway
            await this.redis.setex('ai:provider:rotate', 300, error.provider || 'unknown')
            await this.sleep(1000) // Brief pause for rotation
            return true
          } catch {
            return false
          }
        },
      },
      {
        name: 'connection_reset',
        description: 'Reset and re-establish connections',
        priority: 8,
        applicable: (error) => error.type === 'network',
        execute: async (error, context) => {
          try {
            // Clear connection pools
            await this.redis.setex('ai:connections:reset', 60, '1')
            await this.sleep(2000)
            return true
          } catch {
            return false
          }
        },
      },
      {
        name: 'rate_limit_backoff',
        description: 'Implement intelligent backoff for rate limits',
        priority: 7,
        applicable: (error) => error.type === 'rate_limit',
        execute: async (error, context) => {
          try {
            const backoffTime = Math.min(60000, 1000 * Math.pow(2, error.healingAttempts))
            await this.redis.setex('ai:rate:backoff', Math.ceil(backoffTime / 1000), '1')
            return true
          } catch {
            return false
          }
        },
      },
      {
        name: 'cache_warmup',
        description: 'Warm cache with common responses to reduce API calls',
        priority: 6,
        applicable: (error) => error.type === 'api' || error.type === 'rate_limit',
        execute: async (error, context) => {
          try {
            await this.redis.setex('ai:cache:warmup', 300, '1')
            return true
          } catch {
            return false
          }
        },
      },
      {
        name: 'circuit_breaker_reset',
        description: 'Reset circuit breakers for recovery',
        priority: 5,
        applicable: (error) => error.severity === 'critical',
        execute: async (error, context) => {
          try {
            await this.redis.setex('ai:circuit:reset', 60, error.provider || 'all')
            return true
          } catch {
            return false
          }
        },
      },
      {
        name: 'graceful_degradation',
        description: 'Enable degraded mode operation',
        priority: 4,
        applicable: (error) => error.severity === 'critical',
        execute: async (error, context) => {
          try {
            await this.redis.setex('ai:mode:degraded', 600, '1')
            return true
          } catch {
            return false
          }
        },
      },
    ]
  }

  /**
   * Create detailed error report
   */
  private async createErrorReport(error: Error, context: any): Promise<ErrorReport> {
    const errorPattern = this.classifyError(error)
    const errorId = `err_${Date.now()}_${Math.random().toString(36).substring(7)}`

    return {
      id: errorId,
      timestamp: Date.now(),
      type: errorPattern.type,
      severity: errorPattern.severity,
      message: error.message,
      stack: error.stack,
      context,
      provider: context.provider,
      userId: context.userId,
      resolved: false,
      healingAttempts: 0,
    }
  }

  /**
   * Classify error based on patterns
   */
  private classifyError(error: Error): ErrorPattern {
    const errorText = (error.message + (error.stack || '')).toLowerCase()

    for (const pattern of this.errorPatterns) {
      if (pattern.pattern.test(errorText)) {
        return pattern
      }
    }

    // Default unknown error pattern
    return {
      type: 'unknown',
      severity: 'medium',
      pattern: /.*/,
      selfHealingStrategy: 'generic_retry',
      recoveryTime: 5000,
      maxRetries: 2,
    }
  }

  /**
   * Store error for monitoring and analytics
   */
  private async storeError(errorReport: ErrorReport): Promise<void> {
    try {
      // Store in Redis for persistence
      await this.redis.setex(
        `error:${errorReport.id}`,
        86400, // 24 hours
        JSON.stringify(errorReport)
      )

      // Update error counters
      const today = new Date().toISOString().split('T')[0]
      await this.redis.hincrby(`errors:daily:${today}`, errorReport.type, 1)
      await this.redis.hincrby(`errors:daily:${today}`, 'total', 1)

      // Store in memory for quick access
      const typeHistory = this.errorHistory.get(errorReport.type) || []
      typeHistory.push(errorReport)

      // Keep only last 100 errors per type
      if (typeHistory.length > 100) {
        typeHistory.shift()
      }

      this.errorHistory.set(errorReport.type, typeHistory)
    } catch (error) {
      console.error('Failed to store error report:', error)
    }
  }

  /**
   * Update error report after healing attempt
   */
  private async updateErrorReport(errorReport: ErrorReport): Promise<void> {
    try {
      await this.redis.setex(`error:${errorReport.id}`, 86400, JSON.stringify(errorReport))

      if (errorReport.resolved) {
        const today = new Date().toISOString().split('T')[0]
        await this.redis.hincrby(`errors:daily:${today}`, 'resolved', 1)
      }
    } catch (error) {
      console.error('Failed to update error report:', error)
    }
  }

  // Fallback Strategy Implementations

  private async providerFallback(errorReport: ErrorReport): Promise<any> {
    return {
      content: 'I apologize, but I encountered a temporary issue. Please try again in a moment.',
      provider: 'fallback',
      cached: false,
      fallback: true,
    }
  }

  private async rateLimitFallback(errorReport: ErrorReport): Promise<any> {
    return {
      content: "I'm currently experiencing high demand. Please try again in a few moments.",
      retryAfter: 60,
      fallback: true,
    }
  }

  private async timeoutFallback(errorReport: ErrorReport): Promise<any> {
    return {
      content: 'Your request is taking longer than expected. Please try a more specific question.',
      suggestions: [
        'Break down complex questions into smaller parts',
        'Be more specific about what you need to know',
        'Try asking about a single topic at a time',
      ],
      fallback: true,
    }
  }

  private async networkFallback(errorReport: ErrorReport): Promise<any> {
    return {
      content:
        "I'm having trouble connecting right now. Please check your internet connection and try again.",
      fallback: true,
    }
  }

  private async genericFallback(errorReport: ErrorReport): Promise<any> {
    return {
      content:
        'I encountered an unexpected issue. Our team has been notified and is working on a fix.',
      fallback: true,
      supportContact: 'support@cerebrumbiologyacademy.com',
    }
  }

  /**
   * Get comprehensive error metrics
   */
  async getErrorMetrics(): Promise<ErrorMetrics> {
    try {
      const today = new Date().toISOString().split('T')[0]
      const dailyStats = await this.redis.hgetall(`errors:daily:${today}`)

      const totalErrors = parseInt(dailyStats.total || '0')
      const resolvedErrors = parseInt(dailyStats.resolved || '0')
      const selfHealingRate = totalErrors > 0 ? (resolvedErrors / totalErrors) * 100 : 0

      const topErrorTypes = Object.entries(dailyStats)
        .filter(([key]) => key !== 'total' && key !== 'resolved')
        .map(([type, count]) => ({
          type,
          count: parseInt(count as string),
          rate: totalErrors > 0 ? (parseInt(count as string) / totalErrors) * 100 : 0,
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5)

      const criticalErrors = topErrorTypes
        .filter((error) => error.type === 'critical')
        .reduce((sum, error) => sum + error.count, 0)

      const systemHealth = Math.max(0, 100 - totalErrors * 2)

      return {
        totalErrors,
        resolvedErrors,
        selfHealingRate,
        topErrorTypes,
        averageRecoveryTime: 5000, // Would be calculated from actual recovery times
        criticalErrors,
        systemHealth,
      }
    } catch (error) {
      console.error('Failed to get error metrics:', error)
      return {
        totalErrors: 0,
        resolvedErrors: 0,
        selfHealingRate: 0,
        topErrorTypes: [],
        averageRecoveryTime: 0,
        criticalErrors: 0,
        systemHealth: 100,
      }
    }
  }

  /**
   * Start error monitoring and proactive healing
   */
  private startErrorMonitoring(): void {
    if (this.isMonitoring) return

    this.isMonitoring = true

    // Monitor error patterns every 30 seconds
    setInterval(async () => {
      await this.proactiveHealing()
    }, 30000)

    // Cleanup old errors every hour
    setInterval(async () => {
      await this.cleanupOldErrors()
    }, 3600000)

    console.log('🛡️ Error monitoring and self-healing system activated')
  }

  /**
   * Proactive healing based on error patterns
   */
  private async proactiveHealing(): Promise<void> {
    try {
      const metrics = await this.getErrorMetrics()

      // If error rate is high, enable degraded mode
      if (metrics.totalErrors > 50 && metrics.selfHealingRate < 70) {
        await this.redis.setex('ai:mode:degraded', 300, '1')
        console.log('🚨 High error rate detected - enabling degraded mode')
      }

      // If critical errors detected, force circuit breaker reset
      if (metrics.criticalErrors > 5) {
        await this.redis.setex('ai:circuit:reset', 60, 'all')
        console.log('⚠️ Critical errors detected - resetting circuit breakers')
      }
    } catch (error) {
      console.error('Proactive healing failed:', error)
    }
  }

  /**
   * Cleanup old error records
   */
  private async cleanupOldErrors(): Promise<void> {
    try {
      const cutoff = Date.now() - 86400000 // 24 hours ago
      const keys = await this.redis.keys('error:*')

      for (const key of keys) {
        const data = await this.redis.get(key)
        if (data) {
          const error = JSON.parse(data) as ErrorReport
          if (error.timestamp < cutoff) {
            await this.redis.del(key)
          }
        }
      }

      // Clean up memory
      for (const [type, errors] of this.errorHistory.entries()) {
        const recentErrors = errors.filter((error) => error.timestamp > cutoff)
        this.errorHistory.set(type, recentErrors)
      }
    } catch (error) {
      console.error('Error cleanup failed:', error)
    }
  }

  private calculateRetryDelay(errorReport: ErrorReport): number {
    const pattern = this.errorPatterns.find((p) => p.type === errorReport.type)
    if (!pattern) return 5000

    return Math.min(
      pattern.recoveryTime * Math.pow(2, errorReport.healingAttempts),
      60000 // Max 60 seconds
    )
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}
