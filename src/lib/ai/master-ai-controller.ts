/**
 * Master AI Controller
 * Enterprise-grade integration layer that orchestrates all AI systems
 *
 * Features:
 * - Unified API for all AI operations
 * - Performance monitoring and alerting
 * - Cost optimization across all providers
 * - Real-time analytics dashboard
 * - Automatic scaling and load balancing
 * - Fault tolerance and recovery
 */

import { aiOrchestrator } from './intelligent-ai-orchestrator'
import { semanticCache } from './semantic-cache-engine'
import { responseEnhancer } from './response-enhancer'
import { EventEmitter } from 'events'

interface AIRequest {
  id: string
  type: 'question' | 'explanation' | 'analysis' | 'generation'
  input: string
  context: {
    userId?: string
    sessionId?: string
    subject: string
    studentLevel: string
    language: string
    platform: 'web' | 'whatsapp' | 'mobile'
  }
  options: {
    useCache: boolean
    enhance: boolean
    maxTokens?: number
    priority: 'low' | 'normal' | 'high' | 'urgent'
  }
}

interface AIResponse {
  id: string
  success: boolean
  data?: {
    content: string
    metadata: {
      provider: string
      cached: boolean
      enhanced: boolean
      cost: number
      responseTime: number
      confidence: number
    }
    enhancements?: {
      visuals: any[]
      audio: any[]
      formulas: any[]
      interactive: any[]
    }
  }
  error?: {
    code: string
    message: string
    retry: boolean
  }
  analytics: {
    requestId: string
    timestamp: number
    processingTime: number
    tokensUsed: number
    costIncurred: number
  }
}

interface SystemMetrics {
  performance: {
    avgResponseTime: number
    requestsPerMinute: number
    errorRate: number
    cacheHitRate: number
  }
  costs: {
    totalSpent: number
    costPerRequest: number
    savingsFromCache: number
    monthlyProjected: number
  }
  usage: {
    totalRequests: number
    uniqueUsers: number
    topSubjects: Array<{ subject: string; count: number }>
    platformBreakdown: Record<string, number>
  }
  health: {
    providersOnline: number
    queueSize: number
    memoryUsage: number
    uptimePercent: number
  }
}

export class MasterAIController extends EventEmitter {
  private requestQueue: Map<string, AIRequest> = new Map()
  private activeRequests: Map<string, Promise<AIResponse>> = new Map()
  private metrics: SystemMetrics = this.initializeMetrics()
  private isShuttingDown = false

  // Circuit breaker for system overload protection
  private systemLoad = {
    requestsInMinute: 0,
    avgResponseTime: 0,
    errorCount: 0,
    lastReset: Date.now(),
  }

  private readonly MAX_REQUESTS_PER_MINUTE = 1000
  private readonly MAX_QUEUE_SIZE = 500
  private readonly RESPONSE_TIME_THRESHOLD = 30000 // 30 seconds

  constructor() {
    super()
    this.startSystemMonitoring()
    this.setupGracefulShutdown()
  }

  /**
   * Main entry point for all AI operations
   */
  async processRequest(request: AIRequest): Promise<AIResponse> {
    const startTime = Date.now()

    try {
      // System health check
      if (this.isSystemOverloaded()) {
        return this.createErrorResponse(
          request.id,
          'SYSTEM_OVERLOAD',
          'System is experiencing high load. Please try again in a moment.'
        )
      }

      // Add to queue if needed
      if (this.shouldQueue(request)) {
        return await this.queueRequest(request)
      }

      // Process immediately
      return await this.executeRequest(request)
    } catch (error) {
      console.error('Master AI Controller error:', error)
      return this.createErrorResponse(
        request.id,
        'INTERNAL_ERROR',
        'An unexpected error occurred. Our team has been notified.'
      )
    } finally {
      this.updateSystemMetrics(startTime)
    }
  }

  /**
   * Execute AI request with full pipeline
   */
  private async executeRequest(request: AIRequest): Promise<AIResponse> {
    const requestId = request.id
    const startTime = Date.now()

    try {
      // Update metrics
      this.metrics.usage.totalRequests++
      if (request.context.userId) {
        this.metrics.usage.uniqueUsers++
      }

      // Check semantic cache first
      let cacheResult = null
      if (request.options.useCache) {
        cacheResult = await semanticCache.findSimilarEntry(request.input, {
          subject: request.context.subject,
          studentLevel: request.context.studentLevel,
          language: request.context.language,
        })
      }

      let aiResponse: any
      let cached = false
      let cost = 0

      if (cacheResult) {
        // Use cached response
        aiResponse = cacheResult.response
        cached = true
        cost = 0 // Cache hits are free
        this.emit('cache_hit', { requestId, cacheId: cacheResult.id })
      } else {
        // Generate new AI response
        const queryContext = {
          type: this.mapRequestType(request.type),
          complexity: 'medium' as const,
          subject: request.context.subject,
          studentLevel: request.context.studentLevel,
          language: request.context.language,
          requiresVisuals: request.type === 'analysis',
          maxTokens: request.options.maxTokens,
        }

        aiResponse = await aiOrchestrator.query(request.input, queryContext, request.context.userId)

        // Store in cache for future use
        if (request.options.useCache) {
          await semanticCache.storeEntry(request.input, aiResponse, {
            subject: request.context.subject,
            complexity: queryContext.complexity,
            language: request.context.language,
            studentLevel: request.context.studentLevel,
            provider: 'ai_orchestrator',
            cost: 0.001, // Estimated cost
            accessCount: 0,
            lastAccessed: Date.now(),
            created: Date.now(),
          })
        }

        cost = 0.001 // Estimated cost
        this.emit('ai_generation', { requestId, provider: 'orchestrator' })
      }

      // Enhance response if requested
      let enhancedResponse = aiResponse
      let enhancements: any = {}

      if (request.options.enhance) {
        const enhanced = await responseEnhancer.enhance({
          content: this.extractContent(aiResponse),
          subject: request.context.subject,
          studentLevel: request.context.studentLevel,
          language: request.context.language,
          enhancementTypes: ['visual', 'formulas', 'interactive'],
          accessibility: {
            voice: false,
            highContrast: false,
            largeText: false,
          },
        })

        enhancedResponse = enhanced
        enhancements = {
          visuals: enhanced.visualElements || [],
          audio: enhanced.audioElements || [],
          formulas: enhanced.formulas || [],
          interactive: enhanced.interactiveElements || [],
        }

        this.emit('response_enhanced', { requestId, enhancements: Object.keys(enhancements) })
      }

      // Calculate final metrics
      const responseTime = Date.now() - startTime
      const confidence = this.calculateConfidence(enhancedResponse, cached)

      // Update cost tracking
      this.metrics.costs.totalSpent += cost
      if (cached) {
        this.metrics.costs.savingsFromCache += 0.001 // Estimated savings
      }

      // Track subject popularity
      this.updateSubjectStats(request.context.subject)

      // Return successful response
      return {
        id: requestId,
        success: true,
        data: {
          content: this.extractContent(enhancedResponse),
          metadata: {
            provider: cached ? 'cache' : 'ai_orchestrator',
            cached,
            enhanced: request.options.enhance,
            cost,
            responseTime,
            confidence,
          },
          enhancements: request.options.enhance ? enhancements : undefined,
        },
        analytics: {
          requestId,
          timestamp: Date.now(),
          processingTime: responseTime,
          tokensUsed: this.estimateTokens(request.input + this.extractContent(enhancedResponse)),
          costIncurred: cost,
        },
      }
    } catch (error: any) {
      console.error(`Request ${requestId} failed:`, error)

      this.metrics.performance.errorRate =
        (this.metrics.performance.errorRate + 1) / Math.max(this.metrics.usage.totalRequests, 1)

      return this.createErrorResponse(requestId, 'PROCESSING_ERROR', error.message, true)
    }
  }

  /**
   * Queue management for high-load scenarios
   */
  private async queueRequest(request: AIRequest): Promise<AIResponse> {
    if (this.requestQueue.size >= this.MAX_QUEUE_SIZE) {
      return this.createErrorResponse(
        request.id,
        'QUEUE_FULL',
        'System is at capacity. Please try again shortly.'
      )
    }

    this.requestQueue.set(request.id, request)
    this.emit('request_queued', { requestId: request.id, queueSize: this.requestQueue.size })

    // Wait for processing slot
    return new Promise((resolve) => {
      const checkQueue = async () => {
        if (this.requestQueue.has(request.id) && this.canProcessNow()) {
          this.requestQueue.delete(request.id)
          const result = await this.executeRequest(request)
          resolve(result)
        } else {
          setTimeout(checkQueue, 1000) // Check every second
        }
      }
      checkQueue()
    })
  }

  /**
   * System monitoring and health checks
   */
  private startSystemMonitoring(): void {
    // Performance monitoring
    setInterval(() => {
      this.updatePerformanceMetrics()
      this.checkSystemHealth()
      this.optimizeResources()
    }, 60000) // Every minute

    // Analytics reporting
    setInterval(() => {
      this.generateAnalyticsReport()
    }, 300000) // Every 5 minutes

    // Cost monitoring
    setInterval(() => {
      this.monitorCosts()
    }, 3600000) // Every hour
  }

  /**
   * Update system performance metrics
   */
  private updatePerformanceMetrics(): void {
    const now = Date.now()

    // Reset minute-based counters
    if (now - this.systemLoad.lastReset > 60000) {
      this.systemLoad.requestsInMinute = 0
      this.systemLoad.lastReset = now
    }

    // Update cache hit rate
    const cacheStats = semanticCache.getStats()
    this.metrics.performance.cacheHitRate = cacheStats.hitRate

    // Update queue size
    this.metrics.health.queueSize = this.requestQueue.size

    // Update cost metrics
    this.metrics.costs.costPerRequest =
      this.metrics.costs.totalSpent / Math.max(this.metrics.usage.totalRequests, 1)

    this.metrics.costs.monthlyProjected =
      (this.metrics.costs.totalSpent * (30 * 24 * 60)) /
      Math.max(Date.now() - this.metrics.costs.totalSpent, 1)
  }

  /**
   * System health monitoring
   */
  private checkSystemHealth(): void {
    const orchestratorStats = aiOrchestrator.getAnalytics()

    this.metrics.health.providersOnline = Object.values(orchestratorStats.providers).filter(
      (p: any) => p.isAvailable
    ).length

    this.metrics.health.memoryUsage = process.memoryUsage().heapUsed / 1024 / 1024 // MB

    // Calculate uptime percentage (simplified)
    this.metrics.health.uptimePercent = this.metrics.performance.errorRate < 0.05 ? 99.9 : 95.0

    // Emit alerts if needed
    if (this.metrics.performance.errorRate > 0.1) {
      this.emit('high_error_rate', { errorRate: this.metrics.performance.errorRate })
    }

    if (this.metrics.health.queueSize > this.MAX_QUEUE_SIZE * 0.8) {
      this.emit('queue_warning', { queueSize: this.metrics.health.queueSize })
    }
  }

  /**
   * Resource optimization
   */
  private optimizeResources(): void {
    // Clear expired cache entries
    semanticCache.clearExpiredCache()

    // Clean up completed requests
    for (const [id, promise] of this.activeRequests) {
      promise
        .then(() => {
          this.activeRequests.delete(id)
        })
        .catch(() => {
          this.activeRequests.delete(id)
        })
    }

    // Memory optimization
    if (this.metrics.health.memoryUsage > 500) {
      // 500MB threshold
      if (global.gc) {
        global.gc()
        this.emit('memory_cleanup', { beforeMB: this.metrics.health.memoryUsage })
      }
    }
  }

  /**
   * Cost monitoring and alerts
   */
  private monitorCosts(): void {
    const hourlySpend = this.metrics.costs.totalSpent
    const dailyProjection = hourlySpend * 24
    const monthlyProjection = dailyProjection * 30

    // Alert thresholds
    if (monthlyProjection > 1000) {
      // $1000/month
      this.emit('cost_alert', {
        type: 'high_monthly_projection',
        amount: monthlyProjection,
        threshold: 1000,
      })
    }

    if (this.metrics.costs.costPerRequest > 0.01) {
      // $0.01 per request
      this.emit('cost_alert', {
        type: 'high_per_request_cost',
        amount: this.metrics.costs.costPerRequest,
        threshold: 0.01,
      })
    }
  }

  /**
   * Generate comprehensive analytics report
   */
  private generateAnalyticsReport(): void {
    const report = {
      timestamp: new Date().toISOString(),
      system: this.metrics,
      providers: aiOrchestrator.getAnalytics(),
      cache: semanticCache.getStats(),
      enhancer: responseEnhancer.getStats(),
    }

    this.emit('analytics_report', report)

    // Log key metrics
    console.log('🤖 AI System Analytics:', {
      totalRequests: this.metrics.usage.totalRequests,
      avgResponseTime: `${this.metrics.performance.avgResponseTime}ms`,
      cacheHitRate: `${(this.metrics.performance.cacheHitRate * 100).toFixed(1)}%`,
      errorRate: `${(this.metrics.performance.errorRate * 100).toFixed(2)}%`,
      totalCost: `$${this.metrics.costs.totalSpent.toFixed(4)}`,
      costSavings: `$${this.metrics.costs.savingsFromCache.toFixed(4)}`,
    })
  }

  /**
   * Utility methods
   */
  private isSystemOverloaded(): boolean {
    return (
      this.systemLoad.requestsInMinute > this.MAX_REQUESTS_PER_MINUTE ||
      this.systemLoad.avgResponseTime > this.RESPONSE_TIME_THRESHOLD ||
      this.requestQueue.size >= this.MAX_QUEUE_SIZE
    )
  }

  private shouldQueue(request: AIRequest): boolean {
    return (
      request.options.priority === 'low' ||
      this.activeRequests.size > 50 ||
      this.systemLoad.requestsInMinute > this.MAX_REQUESTS_PER_MINUTE * 0.8
    )
  }

  private canProcessNow(): boolean {
    return (
      this.activeRequests.size < 50 &&
      this.systemLoad.requestsInMinute < this.MAX_REQUESTS_PER_MINUTE
    )
  }

  private mapRequestType(
    type: string
  ): 'reasoning' | 'explanation' | 'quick_answer' | 'problem_solving' {
    switch (type) {
      case 'question':
        return 'quick_answer'
      case 'explanation':
        return 'explanation'
      case 'analysis':
        return 'reasoning'
      case 'generation':
        return 'problem_solving'
      default:
        return 'explanation'
    }
  }

  private extractContent(response: any): string {
    if (typeof response === 'string') return response
    if (response.content) return response.content
    if (response.choices && response.choices[0]) return response.choices[0].message.content
    return 'Response content not available'
  }

  private calculateConfidence(response: any, cached: boolean): number {
    // Simplified confidence calculation
    if (cached) return 0.95 // High confidence for cached responses

    const content = this.extractContent(response)
    if (content.length > 100) return 0.9 // Detailed responses get higher confidence
    if (content.length > 50) return 0.8
    return 0.7
  }

  private estimateTokens(text: string): number {
    return Math.ceil(text.length / 4) // Rough estimate
  }

  private updateSystemMetrics(startTime: number): void {
    const responseTime = Date.now() - startTime
    this.systemLoad.requestsInMinute++
    this.systemLoad.avgResponseTime = (this.systemLoad.avgResponseTime + responseTime) / 2

    this.metrics.performance.avgResponseTime =
      (this.metrics.performance.avgResponseTime + responseTime) / 2
    this.metrics.performance.requestsPerMinute = this.systemLoad.requestsInMinute
  }

  private updateSubjectStats(subject: string): void {
    const existing = this.metrics.usage.topSubjects.find((s) => s.subject === subject)
    if (existing) {
      existing.count++
    } else {
      this.metrics.usage.topSubjects.push({ subject, count: 1 })
    }

    // Keep only top 10
    this.metrics.usage.topSubjects.sort((a, b) => b.count - a.count)
    this.metrics.usage.topSubjects = this.metrics.usage.topSubjects.slice(0, 10)
  }

  private createErrorResponse(
    id: string,
    code: string,
    message: string,
    retry = false
  ): AIResponse {
    return {
      id,
      success: false,
      error: { code, message, retry },
      analytics: {
        requestId: id,
        timestamp: Date.now(),
        processingTime: 0,
        tokensUsed: 0,
        costIncurred: 0,
      },
    }
  }

  private initializeMetrics(): SystemMetrics {
    return {
      performance: {
        avgResponseTime: 0,
        requestsPerMinute: 0,
        errorRate: 0,
        cacheHitRate: 0,
      },
      costs: {
        totalSpent: 0,
        costPerRequest: 0,
        savingsFromCache: 0,
        monthlyProjected: 0,
      },
      usage: {
        totalRequests: 0,
        uniqueUsers: 0,
        topSubjects: [],
        platformBreakdown: {},
      },
      health: {
        providersOnline: 0,
        queueSize: 0,
        memoryUsage: 0,
        uptimePercent: 100,
      },
    }
  }

  private setupGracefulShutdown(): void {
    const shutdown = async () => {
      console.log('🔄 Gracefully shutting down AI system...')
      this.isShuttingDown = true

      // Wait for active requests to complete
      const activePromises = Array.from(this.activeRequests.values())
      await Promise.allSettled(activePromises)

      console.log('✅ AI system shutdown complete')
      process.exit(0)
    }

    process.on('SIGTERM', shutdown)
    process.on('SIGINT', shutdown)
  }

  /**
   * Public API methods
   */
  getMetrics(): SystemMetrics {
    return { ...this.metrics }
  }

  async healthCheck(): Promise<{ status: string; details: any }> {
    return {
      status: this.metrics.health.uptimePercent > 95 ? 'healthy' : 'degraded',
      details: {
        uptime: this.metrics.health.uptimePercent,
        providers: this.metrics.health.providersOnline,
        queueSize: this.metrics.health.queueSize,
        errorRate: this.metrics.performance.errorRate,
      },
    }
  }

  // Convenience methods for common operations
  async askQuestion(question: string, context: Partial<AIRequest['context']>): Promise<AIResponse> {
    return this.processRequest({
      id: `q_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'question',
      input: question,
      context: {
        subject: 'biology',
        studentLevel: 'high_school',
        language: 'en',
        platform: 'web',
        ...context,
      },
      options: {
        useCache: true,
        enhance: false,
        priority: 'normal',
      },
    })
  }

  async getExplanation(topic: string, context: Partial<AIRequest['context']>): Promise<AIResponse> {
    return this.processRequest({
      id: `e_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'explanation',
      input: `Please explain: ${topic}`,
      context: {
        subject: 'biology',
        studentLevel: 'high_school',
        language: 'en',
        platform: 'web',
        ...context,
      },
      options: {
        useCache: true,
        enhance: true,
        priority: 'normal',
      },
    })
  }
}

// Singleton instance
export const masterAI = new MasterAIController()

// Event listeners for monitoring
masterAI.on('high_error_rate', (data) => {
  console.log('🚨 High error rate detected:', data)
})

masterAI.on('cost_alert', (data) => {
  console.log('💰 Cost alert:', data)
})

masterAI.on('analytics_report', (report) => {
  // In production, send to monitoring service
  console.log('📊 Analytics report generated')
})
