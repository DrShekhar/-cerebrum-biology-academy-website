// Unified AI Client for Cerebrum Biology Academy
// Handles OpenAI, Anthropic Claude, and Google AI integrations

import { aiConfig, AIProviderConfig } from './aiConfig'
import AIDebugger from './aiDebugger'
import { performanceMonitor } from './performanceMonitor'

export interface AIRequest {
  prompt: string
  context?: {
    subject: string
    studentLevel: 'class-9' | 'class-10' | 'class-11' | 'class-12' | 'neet-dropper'
    language: 'english' | 'hindi'
    sessionId?: string
    userId?: string
  }
  options?: {
    provider?: string
    model?: 'fast' | 'default' | 'premium'
    maxTokens?: number
    temperature?: number
    useCache?: boolean
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
    [key: string]: any
  }
  error?: string
  debug?: {
    originalError: string
    solution: string
    retryable: boolean
    severity: string
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
    let provider: string = 'unknown'
    try {
      // Determine which provider to use
      provider = request.options?.provider || aiConfig.getBestProvider()
      const providerConfig = aiConfig.getProvider(provider)

      if (!providerConfig) {
        throw new Error(`Provider ${provider} not found or not configured`)
      }

      // Check cache first (if enabled)
      if (request.options?.useCache !== false && aiConfig.getServiceConfig().cacheEnabled) {
        const cachedResponse = await this.getCachedResponse(request.prompt)
        if (cachedResponse) {
          return {
            success: true,
            content: cachedResponse,
            metadata: {
              provider,
              model: 'cached',
              tokensUsed: { input: 0, output: 0 },
              cost: 0,
              responseTime: Date.now() - startTime,
              cached: true,
              requestId,
            },
          }
        }
      }

      // Generate response based on provider
      let response: AIResponse

      switch (provider) {
        case 'openai':
          response = await this.callOpenAI(request, providerConfig, requestId, startTime)
          break
        case 'anthropic':
          response = await this.callAnthropic(request, providerConfig, requestId, startTime)
          break
        case 'google':
          response = await this.callGoogleAI(request, providerConfig, requestId, startTime)
          break
        default:
          throw new Error(`Unsupported provider: ${provider}`)
      }

      // Cache successful responses
      if (response.success && response.content && aiConfig.getServiceConfig().cacheEnabled) {
        await this.cacheResponse(request.prompt, response.content)
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
    startTime: number
  ): Promise<AIResponse> {
    const model = aiConfig.getModelForUseCase('openai', request.options?.model || 'default')
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
        cost: aiConfig.estimateCost('openai', tokensUsed.input, tokensUsed.output),
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
    startTime: number
  ): Promise<AIResponse> {
    const model = aiConfig.getModelForUseCase('anthropic', request.options?.model || 'default')
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
        cost: aiConfig.estimateCost('anthropic', tokensUsed.input, tokensUsed.output),
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
    startTime: number
  ): Promise<AIResponse> {
    const model = aiConfig.getModelForUseCase('google', request.options?.model || 'default')
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
                  text: `${this.generateSystemPrompt(request.context)}\n\nUser: ${request.prompt}`,
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
        cost: aiConfig.estimateCost('google', tokensUsed.input, tokensUsed.output),
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
      contextualPrompt += `\n\nStudent Level: ${context.studentLevel.replace('-', ' ').toUpperCase()}`
    }

    if (context.subject) {
      contextualPrompt += `\nSubject Focus: ${context.subject}`
    }

    if (context.language === 'hindi') {
      contextualPrompt += `\nLanguage: Respond in Hindi (Devanagari script) when appropriate, but use English for scientific terms.`
    }

    return contextualPrompt
  }

  // Simple cache implementation (in production, use Redis)
  private cache = new Map<string, string>()

  private async getCachedResponse(prompt: string): Promise<string | null> {
    const key = this.generateCacheKey(prompt)
    return this.cache.get(key) || null
  }

  private async cacheResponse(prompt: string, response: string): Promise<void> {
    const key = this.generateCacheKey(prompt)
    this.cache.set(key, response)

    // Simple cache cleanup - keep only last 100 responses
    if (this.cache.size > 100) {
      const firstKey = this.cache.keys().next().value
      this.cache.delete(firstKey)
    }
  }

  private generateCacheKey(prompt: string): string {
    // Simple hash function for caching
    let hash = 0
    for (let i = 0; i < prompt.length; i++) {
      const char = prompt.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash = hash & hash // Convert to 32-bit integer
    }
    return `ai_cache_${Math.abs(hash)}`
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

  // Get client status
  getStatus() {
    const config = aiConfig.getConfigurationSummary()
    return {
      ...config,
      cacheSize: this.cache.size,
    }
  }
}

// Export singleton instance
export const aiClient = UnifiedAIClient.getInstance()

// Export default
export default aiClient
