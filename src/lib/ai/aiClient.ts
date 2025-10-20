// Unified AI Client for Cerebrum Biology Academy
// Handles OpenAI, Anthropic Claude, and Google AI integrations

import { aiConfig, AIProviderConfig } from './aiConfig'
import AIDebugger from './aiDebugger'
import { performanceMonitor } from './performanceMonitor'
import { smartProviderSelector, TaskAnalysis, SelectionCriteria } from './SmartProviderSelector'
import { advancedCacheManager } from './AdvancedCacheManager'
import { qualityAssurance, QualityReport } from './QualityAssurancePipeline'
import { costDashboard } from './CostOptimizationDashboard'
import { fallbackManager } from './EnhancedFallbackManager'

export interface AIRequest {
  prompt: string
  context?: {
    subject: string
    studentLevel: 'class-9' | 'class-10' | 'class-11' | 'class-12' | 'neet-dropper'
    language: 'english' | 'hindi'
    sessionId?: string
    userId?: string
    urgent?: boolean
    deadline?: string
    important?: boolean
    practice?: boolean
  }
  options?: {
    provider?: string
    model?: 'fast' | 'default' | 'premium' | 'reasoning' | 'vision' | 'ultrafast'
    maxTokens?: number
    temperature?: number
    useCache?: boolean
    maxCost?: number
    maxLatency?: number
    minQuality?: number
    intelligentRouting?: boolean // Enable smart provider selection
    qualityAssurance?: boolean // Enable quality checking
    autoRetryOnLowQuality?: boolean // Retry with different provider if quality is low
    qualityThreshold?: number // Minimum quality score (0-1)
    enhancedFallback?: boolean // Enable enhanced fallback with circuit breakers
    fallbackStrategy?: 'default' | 'biology' | 'fast' | 'critical'
    selectionCriteria?: {
      costWeight: number
      qualityWeight: number
      speedWeight: number
    }
  }
}

export interface AIResponse {
  success: boolean
  content?: string
  metadata: {
    provider: string
    model: string
    tokensUsed: {
      input: number
      output: number
    }
    cost: number
    responseTime: number
    cached: boolean
    requestId: string
    taskAnalysis?: TaskAnalysis
    providerScore?: number
    confidence?: number
    alternativeProviders?: Array<{
      provider: string
      score: number
      estimatedCost: number
    }>
    qualityReport?: QualityReport
    retryAttempt?: number
    qualityImproved?: boolean
    fallbackAttempts?: Array<{
      provider: string
      success: boolean
      error?: string
      responseTime: number
    }>
    finalProvider?: string
    enhancedFallbackUsed?: boolean
  }
  error?: string
  debug?: {
    originalError: string
    solution: string
    retryable: boolean
    severity: string
  }
  cacheMetadata?: {
    cacheId: string
    originalCost: number
    quality: number
    accessCount: number
    semanticMatch: boolean
  }
}

class UnifiedAIClient {
  private static instance: UnifiedAIClient

  static getInstance(): UnifiedAIClient {
    if (!UnifiedAIClient.instance) {
      UnifiedAIClient.instance = new UnifiedAIClient()
    }
    return UnifiedAIClient.instance
  }

  // Main method to generate AI responses
  async generateResponse(request: AIRequest): Promise<AIResponse> {
    const startTime = Date.now()
    const requestId = this.generateRequestId()

    // Use performance monitor to track the entire request
    return await performanceMonitor.trackRequest(
      async () => {
        return await this.executeRequest(request, requestId, startTime)
      },
      {
        provider: request.options?.provider,
        model: request.options?.model,
        requestType: 'chat',
        educationalContext: {
          subject: request.context?.subject,
          studentLevel: request.context?.studentLevel,
        },
      }
    )
  }

  // Internal method for actual request execution
  private async executeRequest(
    request: AIRequest,
    requestId: string,
    startTime: number
  ): Promise<AIResponse> {
    try {
      // Smart provider selection
      let provider: string
      let selectedModel: string
      let taskAnalysis: TaskAnalysis | undefined
      let providerScore: number | undefined
      let confidence: number | undefined
      let alternatives: Array<{ provider: string; score: number; estimatedCost: number }> = []
      let enhancedFallbackUsed = false
      let fallbackAttempts: Array<{
        provider: string
        success: boolean
        error?: string
        responseTime: number
      }> = []

      // Enhanced fallback execution
      if (request.options?.enhancedFallback !== false) {
        const fallbackResult = await fallbackManager.executeWithFallback(
          {
            prompt: request.prompt,
            context: request.context,
            options: request.options,
            attemptCount: 0,
            startTime,
            errors: [],
          },
          async (fallbackProvider: string) => {
            // Use smart provider selection if enabled
            if (request.options?.intelligentRouting !== false) {
              taskAnalysis = smartProviderSelector.analyzeTask(request.prompt, request.context)

              const criteria: SelectionCriteria = {
                maxCost: request.options?.maxCost,
                maxLatency: request.options?.maxLatency,
                minQuality: request.options?.minQuality,
                preferProvider: fallbackProvider,
                costWeight: request.options?.selectionCriteria?.costWeight || 0.3,
                qualityWeight: request.options?.selectionCriteria?.qualityWeight || 0.5,
                speedWeight: request.options?.selectionCriteria?.speedWeight || 0.2,
              }

              const providerScores = smartProviderSelector.selectProvider(taskAnalysis, criteria)
              if (providerScores.length > 0) {
                const bestProvider = providerScores[0]
                providerScore = bestProvider.score
                confidence = bestProvider.confidence
                alternatives = providerScores.slice(1, 4).map((p) => ({
                  provider: p.provider,
                  score: p.score,
                  estimatedCost: p.estimatedCost,
                }))
              }

              selectedModel = aiConfig.getOptimalModel(fallbackProvider, {
                complexity: taskAnalysis.complexity,
                requiresReasoning: taskAnalysis.requiresReasoning,
                requiresVision: taskAnalysis.requiresVision,
                priority: taskAnalysis.priority,
                maxLatency: taskAnalysis.maxLatency,
              })
            } else {
              selectedModel = request.options?.model || 'default'
            }

            const providerConfig = aiConfig.getProvider(fallbackProvider)
            if (!providerConfig) {
              throw new Error(`Provider ${fallbackProvider} not found or not configured`)
            }

            // Execute the actual request
            switch (fallbackProvider) {
              case 'openai':
                return await this.callOpenAI(
                  request,
                  providerConfig,
                  requestId,
                  startTime,
                  selectedModel
                )
              case 'anthropic':
                return await this.callAnthropic(
                  request,
                  providerConfig,
                  requestId,
                  startTime,
                  selectedModel
                )
              case 'google':
                return await this.callGoogleAI(
                  request,
                  providerConfig,
                  requestId,
                  startTime,
                  selectedModel
                )
              default:
                throw new Error(`Unsupported provider: ${fallbackProvider}`)
            }
          }
        )

        if (fallbackResult.success && fallbackResult.response) {
          enhancedFallbackUsed = true
          fallbackAttempts = fallbackResult.attemptHistory
          const response = fallbackResult.response

          // Enhance response with fallback metadata
          response.metadata.fallbackAttempts = fallbackAttempts
          response.metadata.finalProvider = fallbackResult.finalProvider
          response.metadata.enhancedFallbackUsed = enhancedFallbackUsed

          if (taskAnalysis) {
            response.metadata.taskAnalysis = taskAnalysis
            response.metadata.providerScore = providerScore
            response.metadata.confidence = confidence
            response.metadata.alternativeProviders = alternatives
          }

          provider = fallbackResult.finalProvider || 'unknown'

          // Continue with quality assurance and other processing...
          return await this.processSuccessfulResponse(
            request,
            response,
            taskAnalysis,
            confidence,
            alternatives,
            requestId,
            startTime
          )
        } else {
          // Enhanced fallback failed, throw error with attempt history
          throw new Error(
            `All providers failed. Attempts: ${JSON.stringify(fallbackResult.attemptHistory)}`
          )
        }
      } else {
        // Traditional single-provider execution
        if (request.options?.intelligentRouting !== false) {
          taskAnalysis = smartProviderSelector.analyzeTask(request.prompt, request.context)

          const criteria: SelectionCriteria = {
            maxCost: request.options?.maxCost,
            maxLatency: request.options?.maxLatency,
            minQuality: request.options?.minQuality,
            preferProvider: request.options?.provider,
            costWeight: request.options?.selectionCriteria?.costWeight || 0.3,
            qualityWeight: request.options?.selectionCriteria?.qualityWeight || 0.5,
            speedWeight: request.options?.selectionCriteria?.speedWeight || 0.2,
          }

          const providerScores = smartProviderSelector.selectProvider(taskAnalysis, criteria)

          if (providerScores.length > 0) {
            const bestProvider = providerScores[0]
            provider = bestProvider.provider
            providerScore = bestProvider.score
            confidence = bestProvider.confidence

            alternatives = providerScores.slice(1, 4).map((p) => ({
              provider: p.provider,
              score: p.score,
              estimatedCost: p.estimatedCost,
            }))

            selectedModel = aiConfig.getOptimalModel(provider, {
              complexity: taskAnalysis.complexity,
              requiresReasoning: taskAnalysis.requiresReasoning,
              requiresVision: taskAnalysis.requiresVision,
              priority: taskAnalysis.priority,
              maxLatency: taskAnalysis.maxLatency,
            })
          } else {
            provider = request.options?.provider || aiConfig.getBestProvider()
            selectedModel = request.options?.model || 'default'
          }
        } else {
          provider = request.options?.provider || aiConfig.getBestProvider()
          selectedModel = request.options?.model || 'default'
        }

        const providerConfig = aiConfig.getProvider(provider)

        if (!providerConfig) {
          throw new Error(`Provider ${provider} not found or not configured`)
        }

        // Check advanced cache first (if enabled)
        if (request.options?.useCache !== false && aiConfig.getServiceConfig().cacheEnabled) {
          const cachedEntry = await advancedCacheManager.get(request.prompt, request.context)
          if (cachedEntry) {
            return {
              success: true,
              content: cachedEntry.response.content,
              metadata: {
                provider: cachedEntry.metadata.provider,
                model: cachedEntry.metadata.model,
                tokensUsed: { input: 0, output: 0 },
                cost: 0,
                responseTime: Date.now() - startTime,
                cached: true,
                requestId,
                taskAnalysis: taskAnalysis,
                providerScore: 1.0, // Cached responses are perfect matches
                confidence: cachedEntry.confidence,
                alternativeProviders: [],
              },
              cacheMetadata: {
                cacheId: cachedEntry.id,
                originalCost: cachedEntry.metadata.cost,
                quality: cachedEntry.metadata.quality,
                accessCount: cachedEntry.metadata.accessCount,
                semanticMatch:
                  cachedEntry.key !==
                  advancedCacheManager['generateExactKey'](request.prompt, request.context),
              },
            }
          }
        }

        if (!providerConfig) {
          throw new Error(`Provider ${provider} not found or not configured`)
        }

        // Generate response based on provider
        let response: AIResponse

        switch (provider) {
          case 'openai':
            response = await this.callOpenAI(
              request,
              providerConfig,
              requestId,
              startTime,
              selectedModel
            )
            break
          case 'anthropic':
            response = await this.callAnthropic(
              request,
              providerConfig,
              requestId,
              startTime,
              selectedModel
            )
            break
          case 'google':
            response = await this.callGoogleAI(
              request,
              providerConfig,
              requestId,
              startTime,
              selectedModel
            )
            break
          default:
            throw new Error(`Unsupported provider: ${provider}`)
        }

        // Enhance response with intelligent routing metadata
        if (taskAnalysis) {
          response.metadata.taskAnalysis = taskAnalysis
          response.metadata.providerScore = providerScore
          response.metadata.confidence = confidence
          response.metadata.alternativeProviders = alternatives
        }

        return await this.processSuccessfulResponse(
          request,
          response,
          taskAnalysis,
          confidence,
          alternatives,
          requestId,
          startTime
        )
      }

      // Run quality assurance if enabled
      if (request.options?.qualityAssurance !== false && response.success && response.content) {
        const qualityReport = await qualityAssurance.assessQuality({
          prompt: request.prompt,
          response: response.content,
          taskAnalysis: taskAnalysis!,
          provider: response.metadata.provider,
          model: response.metadata.model,
          studentLevel: request.context?.studentLevel || 'class-12',
          subject: request.context?.subject || 'biology',
        })

        response.metadata.qualityReport = qualityReport

        // Check if quality is below threshold and auto-retry is enabled
        const qualityThreshold = request.options?.qualityThreshold || 0.7
        if (
          request.options?.autoRetryOnLowQuality &&
          !qualityReport.passesThreshold &&
          qualityReport.overallScore < qualityThreshold &&
          !response.metadata.retryAttempt
        ) {
          console.log(
            `Quality too low (${qualityReport.overallScore.toFixed(2)}), retrying with different provider...`
          )

          // Try with next best provider
          const retryRequest = {
            ...request,
            options: {
              ...request.options,
              provider: alternatives[0]?.provider || provider, // Use alternative if available
              autoRetryOnLowQuality: false, // Prevent infinite retries
            },
          }

          const retryResponse = await this.executeRequest(retryRequest, requestId, startTime)
        }
      }

      return response
    } catch (error) {
      // Enhanced error analysis and logging
      const errorAnalysis = AIDebugger.logAIError(error, {
        provider: provider || 'unknown',
        model: request.options?.model || 'unknown',
        requestId,
        prompt: request.prompt,
        attempt: 1,
      })

      return {
        success: false,
        metadata: {
          provider: provider || 'unknown',
          model: request.options?.model || 'unknown',
          tokensUsed: { input: 0, output: 0 },
          cost: 0,
          responseTime: Date.now() - startTime,
          cached: false,
          requestId,
        },
        error: errorAnalysis.diagnosis,
        debug: {
          originalError: error instanceof Error ? error.message : 'Unknown error occurred',
          solution: errorAnalysis.solution,
          retryable: errorAnalysis.retryable,
          severity: errorAnalysis.severity,
        },
      }
    }
  }

  // OpenAI API integration
  private async callOpenAI(
    request: AIRequest,
    config: AIProviderConfig,
    requestId: string,
    startTime: number,
    selectedModel?: string
  ): Promise<AIResponse> {
    const model =
      selectedModel || aiConfig.getModelForUseCase('openai', request.options?.model || 'default')
    const maxTokens = request.options?.maxTokens || aiConfig.getServiceConfig().maxTokens
    const temperature = request.options?.temperature || aiConfig.getServiceConfig().temperature

    const response = await fetch(`${config.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: 'system',
            content: this.generateSystemPrompt(request.context),
          },
          {
            role: 'user',
            content: request.prompt,
          },
        ],
        max_tokens: maxTokens,
        temperature,
        stream: false,
      }),
    })

    if (!response.ok) {
      throw new Error(`OpenAI API Error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    const content = data.choices[0]?.message?.content || ''
    const tokensUsed = {
      input: data.usage?.prompt_tokens || 0,
      output: data.usage?.completion_tokens || 0,
    }

    return {
      success: true,
      content,
      metadata: {
        provider: 'openai',
        model,
        tokensUsed,
        cost: aiConfig.estimateCost('openai', tokensUsed.input, tokensUsed.output, model),
        responseTime: Date.now() - startTime,
        cached: false,
        requestId,
      },
    }
  }

  // Anthropic Claude API integration
  private async callAnthropic(
    request: AIRequest,
    config: AIProviderConfig,
    requestId: string,
    startTime: number,
    selectedModel?: string
  ): Promise<AIResponse> {
    const model =
      selectedModel || aiConfig.getModelForUseCase('anthropic', request.options?.model || 'default')
    const maxTokens = request.options?.maxTokens || aiConfig.getServiceConfig().maxTokens
    const temperature = request.options?.temperature || aiConfig.getServiceConfig().temperature

    const response = await fetch(`${config.baseUrl}/messages`, {
      method: 'POST',
      headers: {
        'x-api-key': config.apiKey,
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model,
        max_tokens: maxTokens,
        temperature,
        system: this.generateSystemPrompt(request.context),
        messages: [
          {
            role: 'user',
            content: request.prompt,
          },
        ],
      }),
    })

    if (!response.ok) {
      throw new Error(`Anthropic API Error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    const content = data.content[0]?.text || ''
    const tokensUsed = {
      input: data.usage?.input_tokens || 0,
      output: data.usage?.output_tokens || 0,
    }

    return {
      success: true,
      content,
      metadata: {
        provider: 'anthropic',
        model,
        tokensUsed,
        cost: aiConfig.estimateCost('anthropic', tokensUsed.input, tokensUsed.output, model),
        responseTime: Date.now() - startTime,
        cached: false,
        requestId,
      },
    }
  }

  // Google AI integration
  private async callGoogleAI(
    request: AIRequest,
    config: AIProviderConfig,
    requestId: string,
    startTime: number,
    selectedModel?: string
  ): Promise<AIResponse> {
    const model =
      selectedModel || aiConfig.getModelForUseCase('google', request.options?.model || 'default')
    const maxTokens = request.options?.maxTokens || aiConfig.getServiceConfig().maxTokens
    const temperature = request.options?.temperature || aiConfig.getServiceConfig().temperature

    const response = await fetch(
      `${config.baseUrl}/models/${model}:generateContent?key=${config.apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `${this.generateSystemPrompt(request.context)}

User: ${request.prompt}`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature,
            maxOutputTokens: maxTokens,
          },
        }),
      }
    )

    if (!response.ok) {
      throw new Error(`Google AI API Error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    const content = data.candidates[0]?.content?.parts[0]?.text || ''
    const tokensUsed = {
      input: data.usageMetadata?.promptTokenCount || 0,
      output: data.usageMetadata?.candidatesTokenCount || 0,
    }

    return {
      success: true,
      content,
      metadata: {
        provider: 'google',
        model,
        tokensUsed,
        cost: aiConfig.estimateCost('google', tokensUsed.input, tokensUsed.output, model),
        responseTime: Date.now() - startTime,
        cached: false,
        requestId,
      },
    }
  }

  // Generate system prompt based on context
  private generateSystemPrompt(context?: AIRequest['context']): string {
    const basePrompt = `You are an expert Biology teacher at Cerebrum Biology Academy, specializing in NEET preparation. You provide clear, accurate, and engaging explanations of biological concepts.

Your expertise includes:
- All topics in NCERT Biology classes 11 and 12
- NEET exam patterns and question types
- Conceptual clarity and practical applications
- Diagrams and visual explanations
- Memory techniques and mnemonics

Guidelines:
- Always provide accurate, curriculum-aligned information
- Use simple language that students can understand
- Include relevant examples and analogies
- Suggest memory techniques when appropriate
- Encourage critical thinking
- Be supportive and motivating`

    if (!context) return basePrompt

    let contextualPrompt = basePrompt

    if (context.studentLevel) {
      contextualPrompt += `

Student Level: ${context.studentLevel.replace('-', ' ').toUpperCase()}`
    }

    if (context.subject) {
      contextualPrompt += `
Subject Focus: ${context.subject}`
    }

    if (context.language === 'hindi') {
      contextualPrompt += `
Language: Respond in Hindi (Devanagari script) when appropriate, but use English for scientific terms.`
    }

    return contextualPrompt
  }

  // Legacy cache methods (kept for backward compatibility)
  private cache = new Map<string, string>()

  private async getCachedResponse(prompt: string): Promise<string | null> {
    // Fallback to simple cache if advanced cache fails
    const key = this.generateCacheKey(prompt)
    return this.cache.get(key) || null
  }

  private async cacheResponse(prompt: string, response: string): Promise<void> {
    // Simple fallback caching
    const key = this.generateCacheKey(prompt)
    this.cache.set(key, response)

    if (this.cache.size > 100) {
      const firstKey = this.cache.keys().next().value
      this.cache.delete(firstKey)
    }
  }

  private generateCacheKey(prompt: string): string {
    let hash = 0
    for (let i = 0; i < prompt.length; i++) {
      const char = prompt.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash = hash & hash
    }
    return `ai_cache_${Math.abs(hash)}`
  }

  // Advanced cache analytics
  getCacheAnalytics() {
    return {
      advanced: advancedCacheManager.getStats(),
      legacy: {
        size: this.cache.size,
        enabled: aiConfig.getServiceConfig().cacheEnabled,
      },
    }
  }

  // Record user feedback on responses
  recordResponseFeedback(
    requestId: string,
    feedback: {
      helpful: boolean
      rating: number
      comments?: string
    }
  ) {
    // This would typically be linked to the cache entry
    // For now, we'll log it for future implementation
    console.log(`Feedback for request ${requestId}:`, feedback)
  }

  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  // Test all configured providers
  async testProviders(): Promise<Record<string, boolean>> {
    const providers = aiConfig.getAvailableProviders()
    const results: Record<string, boolean> = {}

    for (const provider of providers) {
      try {
        const response = await this.generateResponse({
          prompt: 'Test message: What is photosynthesis?',
          context: {
            subject: 'Biology',
            studentLevel: 'class-11',
            language: 'english',
          },
          options: {
            provider,
            model: 'fast',
            maxTokens: 50,
          },
        })
        results[provider] = response.success
      } catch (error) {
        results[provider] = false
      }
    }

    return results
  }

  // Get comprehensive client status
  getStatus() {
    const config = aiConfig.getConfigurationSummary()
    const cacheStats = advancedCacheManager.getStats()
    const providerAnalytics = smartProviderSelector.getAnalytics()
    const qualityStats = qualityAssurance.getQualityStats()
    const costMetrics = costDashboard.getCurrentMetrics()
    const budgetStatus = costDashboard.getBudgetStatus()
    const optimization = costDashboard.getOptimizationRecommendations()

    return {
      ...config,
      cache: {
        legacy: {
          size: this.cache.size,
        },
        advanced: cacheStats,
      },
      providerSelection: providerAnalytics,
      qualityAssurance: {
        enabled: true,
        threshold: qualityStats.threshold,
        averageProcessingTime: qualityStats.averageProcessingTime,
        totalAssessments: qualityStats.totalAssessments,
      },
      costOptimization: {
        metrics: costMetrics,
        budget: budgetStatus,
        optimization,
        alerts: budgetStatus.alerts.length,
      },
      performance: {
        totalRequests: cacheStats.totalQueries,
        cacheHitRate: cacheStats.hitRate,
        costSavings: cacheStats.costSavings,
        averageCostPerRequest: costMetrics.averageCostPerRequest,
        costTrend: costMetrics.costTrend,
        semanticMatching: {
          threshold: 0.85,
          avgSimilarity: cacheStats.avgSimilarityScore,
          semanticHits: cacheStats.semanticHits,
          exactHits: cacheStats.exactHits,
        },
      },
    }
  }

  // Set quality threshold for all future requests
  setQualityThreshold(threshold: number): void {
    qualityAssurance.setQualityThreshold(threshold)
  }

  // Get detailed quality analytics
  getQualityAnalytics(): any {
    return {
      pipeline: qualityAssurance.getQualityStats(),
      cache: advancedCacheManager.getStats().qualityDistribution,
    }
  }

  // Get cost optimization dashboard
  getCostDashboard(): {
    metrics: any
    budget: any
    optimization: any
    forecast: any
    analytics: any
  } {
    return {
      metrics: costDashboard.getCurrentMetrics(),
      budget: costDashboard.getBudgetStatus(),
      optimization: costDashboard.getOptimizationRecommendations(),
      forecast: costDashboard.getCostForecast(),
      analytics: costDashboard.getDetailedAnalytics(),
    }
  }

  // Update budget settings
  updateBudget(settings: {
    monthly?: number
    daily?: number
    alertThresholds?: {
      warning: number
      critical: number
    }
    autoStop?: boolean
  }): void {
    costDashboard.updateBudgetSettings(settings)
  }

  // Acknowledge cost alert
  acknowledgeCostAlert(alertId: string): void {
    costDashboard.acknowledgeAlert(alertId)
  }

  // Export cost data
  exportCostData(format: 'json' | 'csv' = 'json'): string {
    return costDashboard.exportData(format)
  }

  // Process successful response (extracted for reuse)
  private async processSuccessfulResponse(
    request: AIRequest,
    response: AIResponse,
    taskAnalysis?: TaskAnalysis,
    confidence?: number,
    alternatives?: Array<{ provider: string; score: number; estimatedCost: number }>,
    requestId?: string,
    startTime?: number
  ): Promise<AIResponse> {
    const provider = response.metadata.provider

    // Run quality assurance if enabled
    if (request.options?.qualityAssurance !== false && response.success && response.content) {
      const qualityReport = await qualityAssurance.assessQuality({
        prompt: request.prompt,
        response: response.content,
        taskAnalysis: taskAnalysis!,
        provider: response.metadata.provider,
        model: response.metadata.model,
        studentLevel: request.context?.studentLevel || 'class-12',
        subject: request.context?.subject || 'biology',
      })

      response.metadata.qualityReport = qualityReport

      // Check if quality is below threshold and auto-retry is enabled
      const qualityThreshold = request.options?.qualityThreshold || 0.7
      if (
        request.options?.autoRetryOnLowQuality &&
        !qualityReport.passesThreshold &&
        qualityReport.overallScore < qualityThreshold &&
        !response.metadata.retryAttempt
      ) {
        console.log(
          `Quality too low (${qualityReport.overallScore.toFixed(2)}), retrying with different provider...`
        )

        // Try with next best provider
        const retryRequest = {
          ...request,
          options: {
            ...request.options,
            provider: alternatives?.[0]?.provider || provider,
            autoRetryOnLowQuality: false,
          },
        }

        const retryResponse = await this.executeRequest(retryRequest, requestId!, startTime!)
        if (retryResponse.success && retryResponse.metadata.qualityReport) {
          if (retryResponse.metadata.qualityReport.overallScore > qualityReport.overallScore) {
            retryResponse.metadata.retryAttempt = 1
            retryResponse.metadata.qualityImproved = true

            // Record the retry cost as well
            costDashboard.recordRequest({
              requestId: requestId! + '_retry',
              timestamp: Date.now(),
              prompt: request.prompt,
              provider: retryResponse.metadata.provider,
              model: retryResponse.metadata.model,
              cost: retryResponse.metadata.cost,
              tokensUsed:
                retryResponse.metadata.tokensUsed.input + retryResponse.metadata.tokensUsed.output,
              cached: retryResponse.metadata.cached,
              quality: retryResponse.metadata.qualityReport.overallScore,
              taskAnalysis,
              studentLevel: request.context?.studentLevel,
              subject: request.context?.subject,
            })

            return retryResponse
          }
        }
      }
    }

    // Record cost data for optimization dashboard
    if (requestId && startTime) {
      costDashboard.recordRequest({
        requestId,
        timestamp: startTime,
        prompt: request.prompt,
        provider: response.metadata.provider,
        model: response.metadata.model,
        cost: response.metadata.cost,
        tokensUsed: response.metadata.tokensUsed.input + response.metadata.tokensUsed.output,
        cached: response.metadata.cached,
        quality: response.metadata.qualityReport?.overallScore,
        taskAnalysis,
        studentLevel: request.context?.studentLevel,
        subject: request.context?.subject,
      })
    }

    // Update provider performance metrics
    if (request.options?.intelligentRouting !== false) {
      const finalQuality = response.metadata.qualityReport?.overallScore || confidence || 0.8
      smartProviderSelector.updatePerformance(provider, {
        latency: response.metadata.responseTime,
        cost: response.metadata.cost,
        success: response.success,
        quality: finalQuality,
      })
    }

    // Cache successful responses with advanced caching (only high-quality responses)
    if (response.success && response.content && aiConfig.getServiceConfig().cacheEnabled) {
      const finalQuality = response.metadata.qualityReport?.overallScore || confidence || 0.8

      if (finalQuality >= (request.options?.qualityThreshold || 0.7)) {
        await advancedCacheManager.set(
          request.prompt,
          { content: response.content },
          {
            provider: response.metadata.provider,
            model: response.metadata.model,
            cost: response.metadata.cost,
            quality: finalQuality,
            taskAnalysis,
          },
          request.context
        )
      } else {
        console.log(`Skipping cache due to low quality: ${finalQuality.toFixed(2)}`)
      }
    }

    return response
  }

  // Get fallback system status
  getFallbackStatus(): any {
    return fallbackManager.getSystemStatus()
  }

  // Force circuit breaker state for testing
  forceCircuitBreakerState(provider: string, state: 'open' | 'closed'): void {
    fallbackManager.forceCircuitBreakerState(provider, state)
  }
}

// Export singleton instance
export const aiClient = UnifiedAIClient.getInstance()

// Export types
export type { AIRequest, AIResponse }

// Export default
export default aiClient
