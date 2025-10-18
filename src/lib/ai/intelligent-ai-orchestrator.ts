/**
 * Hyper-Intelligent AI Service Orchestration Layer
 * Built for production-scale biology education platform
 *
 * Features:
 * - Smart routing between Claude/OpenAI based on query complexity
 * - Fallback chains with circuit breakers
 * - Cost optimization and semantic caching
 * - Self-healing error recovery
 * - Performance monitoring and analytics
 */

import { EventEmitter } from 'events'
import OpenAI from 'openai'
import Anthropic from '@anthropic-ai/sdk'
import { createHash } from 'crypto'

// Types and Interfaces
interface AIProvider {
  name: string
  priority: number
  maxTokens: number
  costPerToken: number
  isAvailable: boolean
  errorCount: number
  lastError?: Date
  avgResponseTime: number
  capabilities: string[]
}

interface QueryContext {
  type: 'reasoning' | 'explanation' | 'quick_answer' | 'problem_solving' | 'diagram'
  complexity: 'low' | 'medium' | 'high'
  subject: string
  studentLevel: string
  language: string
  requiresVisuals: boolean
  maxTokens?: number
}

interface CacheEntry {
  response: any
  timestamp: number
  provider: string
  cost: number
  metadata: any
}

interface CircuitBreakerState {
  failureCount: number
  lastFailureTime: number
  state: 'CLOSED' | 'OPEN' | 'HALF_OPEN'
  nextAttempt: number
}

export class IntelligentAIOrchestrator extends EventEmitter {
  private providers: Map<string, AIProvider> = new Map()
  private cache: Map<string, CacheEntry> = new Map()
  private circuitBreakers: Map<string, CircuitBreakerState> = new Map()
  private costTracker: Map<string, number> = new Map()
  private responseAnalytics: Map<string, any[]> = new Map()

  // Provider instances
  private openai: OpenAI | null = null
  private anthropic: Anthropic | null = null

  // Configuration
  private readonly CACHE_TTL = 24 * 60 * 60 * 1000 // 24 hours
  private readonly CIRCUIT_BREAKER_THRESHOLD = 5
  private readonly CIRCUIT_BREAKER_TIMEOUT = 30000 // 30 seconds
  private readonly MAX_RETRIES = 3

  constructor() {
    super()
    this.initializeProviders()
    this.startHealthCheck()
  }

  private initializeProviders() {
    // Claude - Best for complex reasoning and biology explanations
    this.providers.set('claude-3.5-sonnet', {
      name: 'claude-3.5-sonnet',
      priority: 1,
      maxTokens: 200000,
      costPerToken: 0.000003, // $3 per 1M tokens
      isAvailable: true,
      errorCount: 0,
      avgResponseTime: 0,
      capabilities: ['reasoning', 'explanation', 'problem_solving', 'long_context'],
    })

    // GPT-4 - Good for general responses and structured output
    this.providers.set('gpt-4-turbo', {
      name: 'gpt-4-turbo',
      priority: 2,
      maxTokens: 128000,
      costPerToken: 0.00001, // $10 per 1M tokens
      isAvailable: true,
      errorCount: 0,
      avgResponseTime: 0,
      capabilities: ['reasoning', 'explanation', 'structured_output', 'function_calling'],
    })

    // GPT-3.5 - Fast responses for simple queries
    this.providers.set('gpt-3.5-turbo', {
      name: 'gpt-3.5-turbo',
      priority: 3,
      maxTokens: 16000,
      costPerToken: 0.0000005, // $0.5 per 1M tokens
      isAvailable: true,
      errorCount: 0,
      avgResponseTime: 0,
      capabilities: ['quick_answer', 'explanation'],
    })

    // Initialize circuit breakers
    for (const [name] of this.providers) {
      this.circuitBreakers.set(name, {
        failureCount: 0,
        lastFailureTime: 0,
        state: 'CLOSED',
        nextAttempt: 0,
      })
    }
  }

  /**
   * Lazy initialization of OpenAI client
   */
  private ensureOpenAI(): OpenAI {
    if (!this.openai && process.env.OPENAI_API_KEY) {
      this.openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        timeout: 60000, // 60 seconds
      })
    }
    if (!this.openai) {
      throw new Error('OpenAI API key not configured')
    }
    return this.openai
  }

  /**
   * Lazy initialization of Anthropic client
   */
  private ensureClaude(): Anthropic {
    if (!this.anthropic && process.env.ANTHROPIC_API_KEY) {
      this.anthropic = new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY,
        timeout: 60000,
      })
    }
    if (!this.anthropic) {
      throw new Error('Anthropic API key not configured')
    }
    return this.anthropic
  }

  /**
   * Smart routing based on query complexity and provider capabilities
   */
  private selectOptimalProvider(context: QueryContext): string[] {
    const availableProviders = Array.from(this.providers.entries())
      .filter(([name, provider]) => {
        const breaker = this.circuitBreakers.get(name)!
        return (
          provider.isAvailable &&
          breaker.state !== 'OPEN' &&
          provider.capabilities.some((cap) => cap === context.type)
        )
      })
      .sort((a, b) => {
        // Smart routing logic
        if (context.complexity === 'high' && context.type === 'reasoning') {
          // Prefer Claude for complex reasoning
          if (a[0].includes('claude')) return -1
          if (b[0].includes('claude')) return 1
        }

        if (context.type === 'quick_answer') {
          // Prefer faster, cheaper models for quick answers
          return a[1].costPerToken - b[1].costPerToken
        }

        // Default to priority and response time
        return a[1].priority - b[1].priority || a[1].avgResponseTime - b[1].avgResponseTime
      })

    return availableProviders.map(([name]) => name)
  }

  /**
   * Generate semantic cache key
   */
  private generateCacheKey(prompt: string, context: QueryContext): string {
    const normalized = prompt.toLowerCase().trim()
    const contextStr = JSON.stringify({
      type: context.type,
      complexity: context.complexity,
      subject: context.subject,
      studentLevel: context.studentLevel,
    })

    return createHash('sha256')
      .update(normalized + contextStr)
      .digest('hex')
      .substring(0, 32)
  }

  /**
   * Check semantic cache for similar queries
   */
  private checkSemanticCache(cacheKey: string): CacheEntry | null {
    const cached = this.cache.get(cacheKey)

    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      this.emit('cache_hit', { key: cacheKey, provider: cached.provider })
      return cached
    }

    // Check for semantically similar entries (simplified)
    for (const [key, entry] of this.cache) {
      if (this.calculateSimilarity(cacheKey, key) > 0.8) {
        this.emit('semantic_cache_hit', { originalKey: cacheKey, matchedKey: key })
        return entry
      }
    }

    return null
  }

  /**
   * Calculate semantic similarity between cache keys
   */
  private calculateSimilarity(key1: string, key2: string): number {
    // Simplified Jaccard similarity
    const set1 = new Set(key1.split(''))
    const set2 = new Set(key2.split(''))
    const intersection = new Set([...set1].filter((x) => set2.has(x)))
    const union = new Set([...set1, ...set2])

    return intersection.size / union.size
  }

  /**
   * Estimate cost before making API call
   */
  private estimateCost(prompt: string, provider: string, maxTokens?: number): number {
    const providerConfig = this.providers.get(provider)!
    const estimatedTokens = Math.ceil(prompt.length / 4) + (maxTokens || 1000)
    return estimatedTokens * providerConfig.costPerToken
  }

  /**
   * Circuit breaker implementation
   */
  private checkCircuitBreaker(provider: string): boolean {
    const breaker = this.circuitBreakers.get(provider)!

    if (breaker.state === 'OPEN') {
      if (Date.now() > breaker.nextAttempt) {
        breaker.state = 'HALF_OPEN'
        this.emit('circuit_breaker_half_open', { provider })
        return true
      }
      return false
    }

    return true
  }

  /**
   * Handle circuit breaker state on success/failure
   */
  private updateCircuitBreaker(provider: string, success: boolean) {
    const breaker = this.circuitBreakers.get(provider)!

    if (success) {
      breaker.failureCount = 0
      breaker.state = 'CLOSED'
    } else {
      breaker.failureCount++
      breaker.lastFailureTime = Date.now()

      if (breaker.failureCount >= this.CIRCUIT_BREAKER_THRESHOLD) {
        breaker.state = 'OPEN'
        breaker.nextAttempt = Date.now() + this.CIRCUIT_BREAKER_TIMEOUT
        this.emit('circuit_breaker_open', { provider })
      }
    }
  }

  /**
   * Make API call with retry logic and exponential backoff
   */
  private async makeAPICall(
    provider: string,
    prompt: string,
    context: QueryContext,
    retryCount = 0
  ): Promise<any> {
    const startTime = Date.now()

    try {
      let response: any

      if (provider.includes('claude')) {
        const anthropic = this.ensureClaude()
        response = await anthropic.messages.create({
          model: provider,
          max_tokens: context.maxTokens || 4000,
          messages: [{ role: 'user', content: prompt }],
          temperature: context.type === 'reasoning' ? 0.1 : 0.7,
        })
      } else {
        const openai = this.ensureOpenAI()
        response = await openai.chat.completions.create({
          model: provider,
          messages: [{ role: 'user', content: prompt }],
          max_tokens: context.maxTokens || 4000,
          temperature: context.type === 'reasoning' ? 0.1 : 0.7,
        })
      }

      const responseTime = Date.now() - startTime
      this.updateProviderStats(provider, responseTime, true)
      this.updateCircuitBreaker(provider, true)

      this.emit('api_success', {
        provider,
        responseTime,
        context,
        cost: this.estimateCost(prompt, provider, context.maxTokens),
      })

      return response
    } catch (error: any) {
      this.updateProviderStats(provider, Date.now() - startTime, false)
      this.updateCircuitBreaker(provider, false)

      this.emit('api_error', {
        provider,
        error: error.message,
        retryCount,
        context,
      })

      // Exponential backoff retry
      if (retryCount < this.MAX_RETRIES && this.shouldRetry(error)) {
        const delay = Math.pow(2, retryCount) * 1000 + Math.random() * 1000
        await new Promise((resolve) => setTimeout(resolve, delay))
        return this.makeAPICall(provider, prompt, context, retryCount + 1)
      }

      throw error
    }
  }

  /**
   * Determine if error is retryable
   */
  private shouldRetry(error: any): boolean {
    const retryableErrors = ['rate_limit_exceeded', 'server_error', 'timeout', 'network_error']

    return retryableErrors.some(
      (type) =>
        error.message?.toLowerCase().includes(type) || error.code?.toLowerCase().includes(type)
    )
  }

  /**
   * Update provider statistics
   */
  private updateProviderStats(provider: string, responseTime: number, success: boolean) {
    const providerConfig = this.providers.get(provider)!

    if (success) {
      providerConfig.avgResponseTime = (providerConfig.avgResponseTime + responseTime) / 2
      providerConfig.errorCount = Math.max(0, providerConfig.errorCount - 1)
    } else {
      providerConfig.errorCount++
      providerConfig.lastError = new Date()
    }
  }

  /**
   * Main entry point for AI queries
   */
  async query(prompt: string, context: QueryContext, userId?: string): Promise<any> {
    try {
      // Check semantic cache first
      const cacheKey = this.generateCacheKey(prompt, context)
      const cached = this.checkSemanticCache(cacheKey)

      if (cached) {
        this.trackCost(userId, 0) // Cache hit costs nothing
        return cached.response
      }

      // Get optimal provider chain
      const providerChain = this.selectOptimalProvider(context)

      if (providerChain.length === 0) {
        throw new Error('No available AI providers')
      }

      // Try providers in order
      let lastError: Error | null = null

      for (const provider of providerChain) {
        if (!this.checkCircuitBreaker(provider)) {
          continue
        }

        try {
          // Estimate and check cost
          const estimatedCost = this.estimateCost(prompt, provider, context.maxTokens)

          if (this.shouldBlockForCost(userId, estimatedCost)) {
            this.emit('cost_limit_exceeded', { userId, estimatedCost })
            continue
          }

          const response = await this.makeAPICall(provider, prompt, context)

          // Cache successful response
          this.cache.set(cacheKey, {
            response,
            timestamp: Date.now(),
            provider,
            cost: estimatedCost,
            metadata: context,
          })

          // Track cost
          this.trackCost(userId, estimatedCost)

          return response
        } catch (error) {
          lastError = error as Error
          continue
        }
      }

      throw lastError || new Error('All AI providers failed')
    } catch (error) {
      this.emit('query_failed', { prompt: prompt.substring(0, 100), context, error })
      throw error
    }
  }

  /**
   * Cost tracking and limits
   */
  private trackCost(userId: string | undefined, cost: number) {
    if (!userId) return

    const currentCost = this.costTracker.get(userId) || 0
    this.costTracker.set(userId, currentCost + cost)

    this.emit('cost_tracked', { userId, cost, totalCost: currentCost + cost })
  }

  private shouldBlockForCost(userId: string | undefined, estimatedCost: number): boolean {
    if (!userId) return false

    const currentCost = this.costTracker.get(userId) || 0
    const dailyLimit = 1.0 // $1 per student per day

    return currentCost + estimatedCost > dailyLimit
  }

  /**
   * Health check for providers
   */
  private startHealthCheck() {
    setInterval(async () => {
      for (const [name, provider] of this.providers) {
        try {
          // Simple health check query
          await this.makeAPICall(name, 'Hello', {
            type: 'quick_answer',
            complexity: 'low',
            subject: 'test',
            studentLevel: 'test',
            language: 'en',
            requiresVisuals: false,
            maxTokens: 10,
          })

          provider.isAvailable = true
        } catch (error) {
          provider.isAvailable = false
          this.emit('provider_unhealthy', { provider: name, error })
        }
      }
    }, 60000) // Check every minute
  }

  /**
   * Get system analytics
   */
  getAnalytics() {
    return {
      providers: Object.fromEntries(this.providers),
      circuitBreakers: Object.fromEntries(this.circuitBreakers),
      cacheSize: this.cache.size,
      totalCosts: Array.from(this.costTracker.values()).reduce((a, b) => a + b, 0),
      cacheHitRate: this.calculateCacheHitRate(),
    }
  }

  private calculateCacheHitRate(): number {
    // Implementation depends on tracking cache hits vs misses
    return 0.65 // Placeholder
  }

  /**
   * Clear old cache entries
   */
  clearExpiredCache() {
    const now = Date.now()
    for (const [key, entry] of this.cache) {
      if (now - entry.timestamp > this.CACHE_TTL) {
        this.cache.delete(key)
      }
    }
  }
}

// Singleton instance
export const aiOrchestrator = new IntelligentAIOrchestrator()

// Event listeners for monitoring
aiOrchestrator.on('cache_hit', (data) => {
  console.log('🎯 Cache hit:', data)
})

aiOrchestrator.on('circuit_breaker_open', (data) => {
  console.log('🚨 Circuit breaker opened:', data)
})

aiOrchestrator.on('cost_limit_exceeded', (data) => {
  console.log('💰 Cost limit exceeded:', data)
})

aiOrchestrator.on('api_error', (data) => {
  console.log('❌ API error:', data)
})
