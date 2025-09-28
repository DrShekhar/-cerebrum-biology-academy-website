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
  }
  rateLimits: {
    requestsPerMinute: number
    tokensPerMinute: number
  }
  pricing: {
    inputTokenCost: number // per 1K tokens
    outputTokenCost: number // per 1K tokens
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

    // OpenAI Configuration
    this.providers.set('openai', {
      name: 'OpenAI',
      apiKey: process.env.OPENAI_API_KEY || '',
      baseUrl: process.env.OPENAI_API_URL || 'https://api.openai.com/v1',
      models: {
        default: 'gpt-4',
        fast: 'gpt-3.5-turbo',
        premium: 'gpt-4-turbo',
      },
      rateLimits: {
        requestsPerMinute: 3000,
        tokensPerMinute: 250000,
      },
      pricing: {
        inputTokenCost: 0.01, // $0.01 per 1K tokens
        outputTokenCost: 0.03, // $0.03 per 1K tokens
      },
    })

    // Anthropic Claude Configuration
    this.providers.set('anthropic', {
      name: 'Anthropic',
      apiKey: process.env.ANTHROPIC_API_KEY || '',
      baseUrl: process.env.ANTHROPIC_API_URL || 'https://api.anthropic.com/v1',
      models: {
        default: 'claude-3-5-sonnet-20241022',
        fast: 'claude-3-haiku-20240307',
        premium: 'claude-3-5-sonnet-20241022',
      },
      rateLimits: {
        requestsPerMinute: 4000,
        tokensPerMinute: 400000,
      },
      pricing: {
        inputTokenCost: 0.015, // $0.015 per 1K tokens
        outputTokenCost: 0.075, // $0.075 per 1K tokens
      },
    })

    // Google AI Configuration
    this.providers.set('google', {
      name: 'Google AI',
      apiKey: process.env.GOOGLE_AI_API_KEY || '',
      baseUrl: process.env.GOOGLE_AI_API_URL || 'https://generativelanguage.googleapis.com/v1',
      models: {
        default: 'gemini-2.0-flash',
        fast: 'gemini-2.0-flash',
        premium: 'gemini-2.5-flash',
      },
      rateLimits: {
        requestsPerMinute: 60,
        tokensPerMinute: 32000,
      },
      pricing: {
        inputTokenCost: 0.000125, // $0.000125 per 1K tokens
        outputTokenCost: 0.000375, // $0.000375 per 1K tokens
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

  // Calculate cost estimate
  estimateCost(provider: string, inputTokens: number, outputTokens: number): number {
    const config = this.getProvider(provider)
    if (!config) return 0

    const inputCost = (inputTokens / 1000) * config.pricing.inputTokenCost
    const outputCost = (outputTokens / 1000) * config.pricing.outputTokenCost

    return inputCost + outputCost
  }

  // Get model for specific use case
  getModelForUseCase(provider: string, useCase: 'fast' | 'default' | 'premium'): string {
    const config = this.getProvider(provider)
    return config?.models[useCase] || config?.models.default || 'gpt-3.5-turbo'
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
