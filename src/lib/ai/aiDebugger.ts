// AI Error Analysis and Debugging Utilities
// Enhanced version of the AIDebugger class with additional error patterns

export interface ErrorAnalysis {
  timestamp: string
  errorType: string
  message: string
  status: string | number
  diagnosis: string
  solution: string
  provider?: string
  model?: string
  requestId?: string
  retryable: boolean
  severity: 'low' | 'medium' | 'high' | 'critical'
}

export class AIDebugger {
  static analyzeError(
    error: any,
    context?: {
      provider?: string
      model?: string
      requestId?: string
    }
  ): ErrorAnalysis {
    const errorAnalysis: ErrorAnalysis = {
      timestamp: new Date().toISOString(),
      errorType: error.constructor?.name || 'UnknownError',
      message: error.message || 'No error message provided',
      status: error.status || error.statusCode || 'No status code',
      diagnosis: '',
      solution: '',
      provider: context?.provider,
      model: context?.model,
      requestId: context?.requestId,
      retryable: false,
      severity: 'medium',
    }

    // Classify errors by HTTP status codes
    if (error.status === 401 || error.status === 403) {
      errorAnalysis.diagnosis = 'Authentication failed - Invalid or expired API key'
      errorAnalysis.solution = 'Check API key validity, format, and permissions'
      errorAnalysis.severity = 'critical'
      errorAnalysis.retryable = false
    } else if (error.status === 429) {
      errorAnalysis.diagnosis = 'Rate limit exceeded - Too many requests'
      errorAnalysis.solution = 'Implement retry logic with exponential backoff, check rate limits'
      errorAnalysis.severity = 'medium'
      errorAnalysis.retryable = true
    } else if (error.status === 400) {
      errorAnalysis.diagnosis = 'Bad request - Invalid parameters or malformed request'
      errorAnalysis.solution = 'Check request format, parameters, and model compatibility'
      errorAnalysis.severity = 'high'
      errorAnalysis.retryable = false
    } else if (error.status === 404) {
      errorAnalysis.diagnosis = 'Resource not found - Invalid endpoint or model'
      errorAnalysis.solution = 'Verify API endpoint URL and model name availability'
      errorAnalysis.severity = 'high'
      errorAnalysis.retryable = false
    } else if (error.status === 500 || error.status === 502 || error.status === 503) {
      errorAnalysis.diagnosis = 'Server error - Provider infrastructure issue'
      errorAnalysis.solution =
        'Retry request, switch to fallback provider, or check API status page'
      errorAnalysis.severity = 'medium'
      errorAnalysis.retryable = true
    } else if (error.status === 504) {
      errorAnalysis.diagnosis = 'Gateway timeout - Request took too long'
      errorAnalysis.solution = 'Reduce request complexity or increase timeout duration'
      errorAnalysis.severity = 'medium'
      errorAnalysis.retryable = true
    }

    // Classify errors by message content
    else if (error.message?.includes('ECONNREFUSED')) {
      errorAnalysis.diagnosis = 'Connection refused - Network connectivity issue'
      errorAnalysis.solution = 'Check network connectivity, firewall settings, and DNS resolution'
      errorAnalysis.severity = 'high'
      errorAnalysis.retryable = true
    } else if (error.message?.includes('ENOTFOUND')) {
      errorAnalysis.diagnosis = 'DNS resolution failed - Cannot resolve hostname'
      errorAnalysis.solution = 'Check internet connection and DNS settings'
      errorAnalysis.severity = 'high'
      errorAnalysis.retryable = true
    } else if (error.message?.includes('ETIMEDOUT')) {
      errorAnalysis.diagnosis = 'Request timeout - Connection or response timeout'
      errorAnalysis.solution = 'Increase timeout duration or check network stability'
      errorAnalysis.severity = 'medium'
      errorAnalysis.retryable = true
    } else if (error.message?.includes('certificate')) {
      errorAnalysis.diagnosis = 'SSL/TLS certificate issue'
      errorAnalysis.solution = 'Check system certificates or bypass SSL verification (dev only)'
      errorAnalysis.severity = 'high'
      errorAnalysis.retryable = false
    }

    // Provider-specific error patterns
    else if (context?.provider === 'anthropic') {
      if (error.message?.includes('model not found')) {
        errorAnalysis.diagnosis = 'Anthropic model not available'
        errorAnalysis.solution = 'Use claude-3-haiku-20240307 or claude-3-5-sonnet-20241022'
        errorAnalysis.severity = 'high'
        errorAnalysis.retryable = false
      } else if (error.message?.includes('anthropic-version')) {
        errorAnalysis.diagnosis = 'Invalid Anthropic API version header'
        errorAnalysis.solution = 'Use anthropic-version: 2023-06-01'
        errorAnalysis.severity = 'medium'
        errorAnalysis.retryable = false
      }
    } else if (context?.provider === 'openai') {
      if (error.message?.includes('model_not_found')) {
        errorAnalysis.diagnosis = 'OpenAI model not available'
        errorAnalysis.solution = 'Use gpt-3.5-turbo, gpt-4, or gpt-4-turbo'
        errorAnalysis.severity = 'high'
        errorAnalysis.retryable = false
      } else if (error.message?.includes('insufficient_quota')) {
        errorAnalysis.diagnosis = 'OpenAI quota exceeded'
        errorAnalysis.solution = 'Check billing and usage limits'
        errorAnalysis.severity = 'critical'
        errorAnalysis.retryable = false
      }
    } else if (context?.provider === 'google') {
      if (error.message?.includes('models/') && error.message?.includes('not found')) {
        errorAnalysis.diagnosis = 'Google AI model not available'
        errorAnalysis.solution = 'Use gemini-2.0-flash or gemini-2.5-flash'
        errorAnalysis.severity = 'high'
        errorAnalysis.retryable = false
      }
    }

    // Edge Runtime specific errors
    else if (
      error.message?.includes('process.nextTick') ||
      error.message?.includes('Edge Runtime')
    ) {
      errorAnalysis.diagnosis = 'Edge Runtime compatibility issue'
      errorAnalysis.solution = 'Add "export const runtime = \'nodejs\'" to API route'
      errorAnalysis.severity = 'high'
      errorAnalysis.retryable = false
    }

    // Fallback for unclassified errors
    if (!errorAnalysis.diagnosis) {
      errorAnalysis.diagnosis = 'Unknown error - Requires manual investigation'
      errorAnalysis.solution = 'Check logs, network connectivity, and API documentation'
      errorAnalysis.severity = 'medium'
      errorAnalysis.retryable = true
    }

    // Enhanced console output
    console.group('🔍 AI Error Analysis')
    console.table([
      {
        Timestamp: errorAnalysis.timestamp,
        Provider: errorAnalysis.provider || 'Unknown',
        Model: errorAnalysis.model || 'Unknown',
        Status: errorAnalysis.status,
        Severity: errorAnalysis.severity.toUpperCase(),
        Retryable: errorAnalysis.retryable ? '✅' : '❌',
        Diagnosis: errorAnalysis.diagnosis,
        Solution: errorAnalysis.solution,
      },
    ])
    console.error('Full Error Object:', error)
    console.groupEnd()

    return errorAnalysis
  }

  // Enhanced error logging for our unified AI system
  static logAIError(
    error: any,
    context: {
      provider: string
      model: string
      requestId: string
      prompt?: string
      attempt?: number
    }
  ): ErrorAnalysis {
    const analysis = this.analyzeError(error, context)

    // Log to our unified system
    console.log('═══ UNIFIED AI ERROR DEBUG ═══')
    console.log('Provider:', context.provider)
    console.log('Model:', context.model)
    console.log('Request ID:', context.requestId)
    console.log('Attempt:', context.attempt || 1)
    console.log('Prompt length:', context.prompt?.length || 0)
    console.log('Error Analysis:', analysis)
    console.log('================================')

    return analysis
  }

  // Retry decision helper
  static shouldRetry(error: any, attempt: number = 1, maxAttempts: number = 3): boolean {
    const analysis = this.analyzeError(error)

    if (attempt >= maxAttempts) return false
    if (!analysis.retryable) return false

    // Special retry logic for specific errors
    if (error.status === 429) {
      // Rate limit: exponential backoff
      const delay = Math.pow(2, attempt) * 1000
      console.log(`Rate limited. Retrying in ${delay}ms...`)
      return true
    }

    if (error.status >= 500) {
      // Server errors: immediate retry
      console.log(`Server error (${error.status}). Retrying immediately...`)
      return true
    }

    return analysis.retryable
  }

  // Generate retry delay
  static getRetryDelay(error: any, attempt: number): number {
    if (error.status === 429) {
      // Exponential backoff for rate limits
      return Math.min(Math.pow(2, attempt) * 1000, 30000) // Max 30 seconds
    }

    if (error.status >= 500) {
      // Linear backoff for server errors
      return attempt * 2000 // 2, 4, 6 seconds
    }

    // Default retry delay
    return 1000 * attempt
  }

  // Test connectivity to all AI providers
  static async testProviderConnectivity(): Promise<Record<string, boolean>> {
    const results: Record<string, boolean> = {}

    try {
      // Test Anthropic
      const anthResponse = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'HEAD',
      })
      results.anthropic = anthResponse.ok
    } catch {
      results.anthropic = false
    }

    try {
      // Test OpenAI
      const openaiResponse = await fetch('https://api.openai.com/v1/models', {
        method: 'HEAD',
      })
      results.openai = openaiResponse.ok
    } catch {
      results.openai = false
    }

    try {
      // Test Google AI
      const googleResponse = await fetch('https://generativelanguage.googleapis.com/v1/models', {
        method: 'HEAD',
      })
      results.google = googleResponse.ok
    } catch {
      results.google = false
    }

    console.table(results)
    return results
  }
}

// Export for use in our unified AI system
export default AIDebugger
