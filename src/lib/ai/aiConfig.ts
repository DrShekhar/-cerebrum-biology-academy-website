// AI Configuration Service for Cerebrum Biology Academy
// Centralizes all AI provider configurations and settings

export interface AIProviderConfig {
  name: string
  apiKey: string
  baseUrl: string
  models: {
    default: string
    fast: string
    premium: string
    reasoning?: string
    vision?: string
    ultrafast?: string
    long?: string
    embedding?: string
  }
  rateLimits: {
    requestsPerMinute: number
    tokensPerMinute: number
  }
  pricing: {
    inputTokenCost: number // per 1K tokens
    outputTokenCost: number // per 1K tokens
    premiumInputCost?: number // per 1K tokens for premium models
    premiumOutputCost?: number // per 1K tokens for premium models
  }
  capabilities?: {
    reasoning?: string[]
    vision?: string[]
    multimodal?: string[]
    coding?: string[]
    analysis?: string[]
    longContext?: string[]
    fastResponse?: string[]
    ultrafast?: string[]
  }
}

export interface AIServiceConfig {
  defaultProvider: string
  fallbackProvider: string
  cacheEnabled: boolean
  costTrackingEnabled: boolean
  maxTokens: number
  temperature: number
  timeout: number
  retryAttempts: number
  circuitBreakerThreshold: number
}

class AIConfigManager {
  private static instance: AIConfigManager
  private providers: Map<string, AIProviderConfig> = new Map()
  private serviceConfig: AIServiceConfig

  constructor() {
    this.serviceConfig = {
      defaultProvider:
        this.getProviderFromPreference(process.env.AI_MODEL_PREFERENCE) || 'anthropic',
      fallbackProvider: 'openai',
      cacheEnabled: process.env.AI_CACHE_ENABLED === 'true',
      costTrackingEnabled: process.env.AI_COST_TRACKING === 'true',
      maxTokens: parseInt(process.env.AI_MAX_TOKENS || '4096'),
      temperature: parseFloat(process.env.AI_TEMPERATURE || '0.7'),
      timeout: 30000, // 30 seconds
      retryAttempts: 3,
      circuitBreakerThreshold: 5,
    }

    this.initializeProviders()
  }

  private getProviderFromPreference(preference?: string): string | null {
    if (!preference) return null

    // Map model preferences to provider names
    if (preference.includes('claude')) return 'anthropic'
    if (preference.includes('gpt')) return 'openai'
    if (preference.includes('gemini')) return 'google'

    // Direct provider names
    if (['anthropic', 'openai', 'google'].includes(preference)) {
      return preference
    }

    return null
  }

  static getInstance(): AIConfigManager {
    if (!AIConfigManager.instance) {
      AIConfigManager.instance = new AIConfigManager()
    }
    return AIConfigManager.instance
  }

  private initializeProviders() {
    // Debug environment variables
    console.log('🔍 Debugging AI Environment Variables:')
    console.log('ANTHROPIC_API_KEY exists:', !!process.env.ANTHROPIC_API_KEY)
    console.log('ANTHROPIC_API_KEY prefix:', process.env.ANTHROPIC_API_KEY?.substring(0, 10))
    console.log('OPENAI_API_KEY exists:', !!process.env.OPENAI_API_KEY)
    console.log('GOOGLE_AI_API_KEY exists:', !!process.env.GOOGLE_AI_API_KEY)
    console.log('GOOGLE_AI_API_KEY prefix:', process.env.GOOGLE_AI_API_KEY?.substring(0, 10))
    console.log(
      'All API env vars:',
      Object.keys(process.env).filter((key) => key.includes('API'))
    )
    console.log(
      'All ANTHROPIC env vars:',
      Object.keys(process.env).filter((key) => key.includes('ANTHROPIC'))
    )
    console.log(
      'All OPENAI env vars:',
      Object.keys(process.env).filter((key) => key.includes('OPENAI'))
    )
    console.log(
      'All GOOGLE env vars:',
      Object.keys(process.env).filter((key) => key.includes('GOOGLE'))
    )

    // OpenAI Configuration - Enhanced for GPT-5 and latest models
    this.providers.set('openai', {
      name: 'OpenAI',
      apiKey: process.env.OPENAI_API_KEY || '',
      baseUrl: process.env.OPENAI_API_URL || 'https://api.openai.com/v1',
      models: {
        default: 'gpt-4o',
        fast: 'gpt-4o-mini',
        premium: 'gpt-5', // GPT-5 for premium tier
        reasoning: 'o1-preview', // O1 for complex reasoning
        vision: 'gpt-4o', // Vision capabilities
        embedding: 'text-embedding-3-large', // Latest embedding model
      },
      rateLimits: {
        requestsPerMinute: 10000, // Increased limits for GPT-5
        tokensPerMinute: 500000,
      },
      pricing: {
        inputTokenCost: 0.005, // Updated GPT-4o pricing
        outputTokenCost: 0.015,
        premiumInputCost: 0.01, // GPT-5 pricing (estimated)
        premiumOutputCost: 0.03,
      },
      capabilities: {
        reasoning: ['o1-preview', 'o1-mini'],
        vision: ['gpt-4o'],
        multimodal: ['gpt-4o'],
        longContext: ['gpt-4o'], // 128K context
        fastResponse: ['gpt-4o-mini'],
      },
    })

    // Anthropic Claude Configuration - Enhanced for Claude 4 and Sonnet 3.5
    this.providers.set('anthropic', {
      name: 'Anthropic',
      apiKey: process.env.ANTHROPIC_API_KEY || '',
      baseUrl: process.env.ANTHROPIC_API_URL || 'https://api.anthropic.com/v1',
      models: {
        default: 'claude-3-5-sonnet-20250107',
        fast: 'claude-3-5-haiku-20241022',
        premium: 'claude-4', // Claude 4 for premium tier
        reasoning: 'claude-3-5-sonnet-20250107', // Best for reasoning
        vision: 'claude-3-5-sonnet-20250107', // Vision capabilities
        long: 'claude-3-5-sonnet-20250107', // 200K context window
      },
      rateLimits: {
        requestsPerMinute: 5000, // Increased limits
        tokensPerMinute: 600000, // Enhanced capacity
      },
      pricing: {
        inputTokenCost: 0.003, // Latest Sonnet 3.5 pricing
        outputTokenCost: 0.015,
        premiumInputCost: 0.006, // Claude 4 pricing (estimated)
        premiumOutputCost: 0.030,
      },
      capabilities: {
        reasoning: ['claude-3-5-sonnet-20250107', 'claude-4'],
        vision: ['claude-3-5-sonnet-20250107'],
        coding: ['claude-3-5-sonnet-20250107'],
        analysis: ['claude-3-5-sonnet-20250107', 'claude-4'],
        longContext: ['claude-3-5-sonnet-20250107'], // 200K tokens
        fastResponse: ['claude-3-5-haiku-20241022'],
      },
    })

    // Google AI Configuration - Enhanced for Gemini 2.5 Pro and Flash models
    this.providers.set('google', {
      name: 'Google AI',
      apiKey: process.env.GOOGLE_AI_API_KEY || '',
      baseUrl: process.env.GOOGLE_AI_API_URL || 'https://generativelanguage.googleapis.com/v1',
      models: {
        default: 'gemini-2.0-flash-exp',
        fast: 'gemini-2.0-flash-exp',
        premium: 'gemini-2.5-pro', // Gemini 2.5 Pro for premium
        reasoning: 'gemini-2.0-flash-thinking-exp', // Advanced reasoning
        vision: 'gemini-2.0-flash-exp', // Multimodal capabilities
        ultrafast: 'gemini-1.5-flash-8b', // Ultra-fast responses
      },
      rateLimits: {
        requestsPerMinute: 1000, // Increased limits
        tokensPerMinute: 1000000, // 1M tokens per minute
      },
      pricing: {
        inputTokenCost: 0.000075, // Gemini 2.0 Flash pricing
        outputTokenCost: 0.0003,
        premiumInputCost: 0.00125, // Gemini 2.5 Pro pricing
        premiumOutputCost: 0.005,
      },
      capabilities: {
        reasoning: ['gemini-2.0-flash-thinking-exp', 'gemini-2.5-pro'],
        vision: ['gemini-2.0-flash-exp', 'gemini-2.5-pro'],
        multimodal: ['gemini-2.0-flash-exp', 'gemini-2.5-pro'],
        longContext: ['gemini-2.5-pro'], // 2M token context
        fastResponse: ['gemini-1.5-flash-8b'],
        ultrafast: ['gemini-1.5-flash-8b'],
      },
    })

    console.log('🤖 AI Providers initialized:', Array.from(this.providers.keys()))
  }

  // Get provider configuration
  getProvider(providerName: string): AIProviderConfig | null {
    return this.providers.get(providerName) || null
  }

  // Get all available providers
  getAvailableProviders(): string[] {
    return Array.from(this.providers.keys()).filter((provider) => {
      const config = this.providers.get(provider)
      return config && config.apiKey && config.apiKey !== ''
    })
  }

  // Get service configuration
  getServiceConfig(): AIServiceConfig {
    return this.serviceConfig
  }

  // Check if provider is configured
  isProviderConfigured(providerName: string): boolean {
    const provider = this.providers.get(providerName)
    return !!(provider && provider.apiKey && provider.apiKey !== '')
  }

  // Get best available provider
  getBestProvider(): string {
    const available = this.getAvailableProviders()

    if (available.length === 0) {
      throw new Error('No AI providers configured. Please add API keys to environment variables.')
    }

    // Priority order: Claude > GPT-4 > Google AI
    if (available.includes('anthropic')) return 'anthropic'
    if (available.includes('openai')) return 'openai'
    if (available.includes('google')) return 'google'

    return available[0]
  }

  // Calculate cost estimate with model-specific pricing
  estimateCost(provider: string, inputTokens: number, outputTokens: number, model?: string): number {
    const config = this.getProvider(provider)
    if (!config) return 0

    // Use premium pricing for premium models
    const isPremiumModel = model && (
      model.includes('gpt-5') ||
      model.includes('claude-4') ||
      model.includes('gemini-2.5-pro') ||
      model.includes('o1-preview')
    )

    const inputCost = (inputTokens / 1000) * (
      isPremiumModel && config.pricing.premiumInputCost
        ? config.pricing.premiumInputCost
        : config.pricing.inputTokenCost
    )

    const outputCost = (outputTokens / 1000) * (
      isPremiumModel && config.pricing.premiumOutputCost
        ? config.pricing.premiumOutputCost
        : config.pricing.outputTokenCost
    )

    return inputCost + outputCost
  }

  // Get model for specific use case with enhanced capabilities
  getModelForUseCase(provider: string, useCase: 'fast' | 'default' | 'premium' | 'reasoning' | 'vision' | 'ultrafast'): string {
    const config = this.getProvider(provider)
    return config?.models[useCase] || config?.models.default || 'gpt-4o-mini'
  }

  // Get optimal model based on task characteristics
  getOptimalModel(provider: string, taskType: {
    complexity: 'low' | 'medium' | 'high'
    requiresReasoning: boolean
    requiresVision: boolean
    priority: 'low' | 'medium' | 'high' | 'critical'
    maxLatency: number // milliseconds
  }): string {
    const config = this.getProvider(provider)
    if (!config?.capabilities) return config?.models.default || 'gpt-4o-mini'

    // Ultra-fast responses for low latency requirements
    if (taskType.maxLatency < 1000 && config.capabilities.ultrafast) {
      return config.capabilities.ultrafast[0]
    }

    // Reasoning models for complex tasks
    if (taskType.requiresReasoning && config.capabilities.reasoning) {
      return config.capabilities.reasoning[0]
    }

    // Vision models for multimodal tasks
    if (taskType.requiresVision && config.capabilities.vision) {
      return config.capabilities.vision[0]
    }

    // Fast models for simple tasks
    if (taskType.complexity === 'low' && config.capabilities.fastResponse) {
      return config.capabilities.fastResponse[0]
    }

    // Premium models for critical tasks
    if (taskType.priority === 'critical' && config.models.premium) {
      return config.models.premium
    }

    return config.models.default
  }

  // Validate configuration
  validateConfiguration(): { isValid: boolean; errors: string[] } {
    const errors: string[] = []
    const availableProviders = this.getAvailableProviders()

    if (availableProviders.length === 0) {
      errors.push('No AI providers are configured with valid API keys')
    }

    if (this.serviceConfig.maxTokens < 100) {
      errors.push('Max tokens setting is too low (minimum 100)')
    }

    if (this.serviceConfig.temperature < 0 || this.serviceConfig.temperature > 2) {
      errors.push('Temperature must be between 0 and 2')
    }

    return {
      isValid: errors.length === 0,
      errors,
    }
  }

  // Get configuration summary
  getConfigurationSummary() {
    const available = this.getAvailableProviders()
    const validation = this.validateConfiguration()

    return {
      availableProviders: available,
      defaultProvider: this.serviceConfig.defaultProvider,
      fallbackProvider: this.serviceConfig.fallbackProvider,
      cacheEnabled: this.serviceConfig.cacheEnabled,
      costTrackingEnabled: this.serviceConfig.costTrackingEnabled,
      isValid: validation.isValid,
      errors: validation.errors,
      totalProviders: this.providers.size,
      configuredProviders: available.length,
    }
  }
}

// Export singleton instance
export const aiConfig = AIConfigManager.getInstance()

// Export types
export type { AIProviderConfig, AIServiceConfig }

// Export default
export default aiConfig
