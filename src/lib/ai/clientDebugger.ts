// Client-Side AI Debugging System for Cerebrum Biology Academy
// Enhanced debugging and monitoring for AI requests in the browser

export interface ClientDebugConfig {
  enabled: boolean
  logLevel: 'minimal' | 'detailed' | 'verbose'
  interceptFetch: boolean
  showPerformanceMetrics: boolean
  showTokenAnalysis: boolean
  storageKey: string
  maxLogs: number
}

export interface DebugLog {
  id: string
  timestamp: string
  type: 'request' | 'response' | 'error' | 'performance'
  url?: string
  method?: string
  duration?: number
  status?: number
  data?: any
  tokens?: {
    input: number
    output: number
    cost: number
  }
  context?: {
    subject?: string
    studentLevel?: string
    provider?: string
  }
}

class ClientAIDebugger {
  private config: ClientDebugConfig
  private logs: DebugLog[] = []
  private originalFetch: typeof fetch
  private activeRequests: Map<string, { startTime: number; url: string }> = new Map()

  constructor(config?: Partial<ClientDebugConfig>) {
    this.config = {
      enabled: false,
      logLevel: 'detailed',
      interceptFetch: true,
      showPerformanceMetrics: true,
      showTokenAnalysis: true,
      storageKey: 'DEBUG_AI',
      maxLogs: 100,
      ...config,
    }

    // Only initialize in browser environment
    if (typeof window !== 'undefined') {
      // Check localStorage for debug state
      this.initializeFromStorage()

      // Store original fetch for restoration
      this.originalFetch = window.fetch

      // Initialize fetch interceptor if enabled
      if (this.config.enabled && this.config.interceptFetch) {
        this.setupFetchInterceptor()
      }

      // Setup console shortcuts
      this.setupConsoleShortcuts()
    }
  }

  // Initialize debug state from localStorage
  private initializeFromStorage() {
    try {
      const storedState = localStorage.getItem(this.config.storageKey)
      if (storedState === 'true') {
        this.config.enabled = true
        console.log('🤖 Client-side AI debugging enabled from localStorage')
      }

      // Load advanced config if available
      const advancedConfig = localStorage.getItem(`${this.config.storageKey}_CONFIG`)
      if (advancedConfig) {
        const parsedConfig = JSON.parse(advancedConfig)
        this.config = { ...this.config, ...parsedConfig }
      }
    } catch (error) {
      console.warn('Failed to load debug configuration from localStorage:', error)
    }
  }

  // Enable debugging
  enable(logLevel: ClientDebugConfig['logLevel'] = 'detailed') {
    this.config.enabled = true
    this.config.logLevel = logLevel
    localStorage.setItem(this.config.storageKey, 'true')

    if (this.config.interceptFetch) {
      this.setupFetchInterceptor()
    }

    console.group('🤖 AI Client Debugger Enabled')
    console.log('📊 Log Level:', logLevel)
    console.log('🔍 Fetch Interception:', this.config.interceptFetch)
    console.log('⚡ Performance Metrics:', this.config.showPerformanceMetrics)
    console.log('🪙 Token Analysis:', this.config.showTokenAnalysis)
    console.groupEnd()
  }

  // Disable debugging
  disable() {
    this.config.enabled = false
    localStorage.removeItem(this.config.storageKey)
    this.restoreFetch()
    console.log('🤖 AI Client Debugger Disabled')
  }

  // Setup fetch interceptor
  private setupFetchInterceptor() {
    if (typeof window === 'undefined') return // SSR safety

    window.fetch = (...args: Parameters<typeof fetch>) => {
      const [url, options] = args
      const requestId = this.generateRequestId()
      const isAIRequest = this.isAIRequest(url.toString())

      if (this.config.enabled && isAIRequest) {
        this.logAIRequest(requestId, url.toString(), options)
      }

      // Start timing
      const startTime = Date.now()
      this.activeRequests.set(requestId, { startTime, url: url.toString() })

      return this.originalFetch(...args)
        .then((response) => {
          const duration = Date.now() - startTime

          if (this.config.enabled && isAIRequest) {
            this.logAIResponse(requestId, response, duration)
          }

          this.activeRequests.delete(requestId)
          return response
        })
        .catch((error) => {
          const duration = Date.now() - startTime

          if (this.config.enabled && isAIRequest) {
            this.logAIError(requestId, error, duration)
          }

          this.activeRequests.delete(requestId)
          throw error
        })
    }
  }

  // Restore original fetch
  private restoreFetch() {
    if (typeof window !== 'undefined') {
      window.fetch = this.originalFetch
    }
  }

  // Check if URL is an AI request
  private isAIRequest(url: string): boolean {
    const aiEndpoints = [
      '/api/ai/',
      '/api/chat',
      '/unified-chat',
      '/performance',
      'anthropic.com',
      'openai.com',
      'googleapis.com',
    ]

    return aiEndpoints.some((endpoint) => url.includes(endpoint))
  }

  // Log AI request
  private logAIRequest(requestId: string, url: string, options?: RequestInit) {
    const log: DebugLog = {
      id: requestId,
      timestamp: new Date().toISOString(),
      type: 'request',
      url,
      method: options?.method || 'GET',
    }

    // Extract context from request body if available
    if (options?.body) {
      try {
        const body = JSON.parse(options.body as string)
        log.context = {
          subject: body.context?.subject,
          studentLevel: body.context?.studentLevel,
          provider: body.options?.provider,
        }
        log.data = {
          message: body.message?.substring(0, 100) + '...',
          options: body.options,
        }
      } catch (error) {
        // Body is not JSON, ignore
      }
    }

    this.addLog(log)
    this.displayRequestLog(log)
  }

  // Log AI response
  private logAIResponse(requestId: string, response: Response, duration: number) {
    const log: DebugLog = {
      id: requestId,
      timestamp: new Date().toISOString(),
      type: 'response',
      url: response.url,
      status: response.status,
      duration,
    }

    // Clone response to read body without consuming it
    const responseClone = response.clone()
    responseClone
      .json()
      .then((data) => {
        log.data = data

        // Extract token information if available
        if (data.metadata?.tokensUsed) {
          log.tokens = {
            input: data.metadata.tokensUsed.input,
            output: data.metadata.tokensUsed.output,
            cost: data.metadata.cost,
          }
        }

        this.addLog(log)
        this.displayResponseLog(log)
      })
      .catch(() => {
        // Response is not JSON, just log basic info
        this.addLog(log)
        this.displayResponseLog(log)
      })
  }

  // Log AI error
  private logAIError(requestId: string, error: Error, duration: number) {
    const log: DebugLog = {
      id: requestId,
      timestamp: new Date().toISOString(),
      type: 'error',
      duration,
      data: { message: error.message, stack: error.stack },
    }

    this.addLog(log)
    this.displayErrorLog(log)
  }

  // Display request log
  private displayRequestLog(log: DebugLog) {
    if (!this.config.enabled) return

    console.group('🤖 AI Request Debug')
    console.log('🆔 Request ID:', log.id.slice(-6))
    console.log('🔗 URL:', log.url)
    console.log('📊 Method:', log.method)
    console.log('⏰ Timestamp:', new Date(log.timestamp).toLocaleTimeString())

    if (log.context && this.config.logLevel !== 'minimal') {
      console.log('🎓 Educational Context:', log.context)
    }

    if (log.data && this.config.logLevel === 'verbose') {
      console.log('📝 Request Data:', log.data)
    }

    console.time(`⏱️ AI Request ${log.id.slice(-6)}`)
    console.groupEnd()
  }

  // Display response log
  private displayResponseLog(log: DebugLog) {
    if (!this.config.enabled) return

    console.group('📥 AI Response Debug')
    console.log('🆔 Request ID:', log.id.slice(-6))
    console.log('✅ Status:', log.status)
    console.log('⏱️ Duration:', `${log.duration}ms`)
    console.timeEnd(`⏱️ AI Request ${log.id.slice(-6)}`)

    // Performance metrics
    if (this.config.showPerformanceMetrics && log.duration) {
      const performance = this.analyzePerformance(log.duration, log.status!)
      console.log('📊 Performance:', performance)
    }

    // Token analysis
    if (this.config.showTokenAnalysis && log.tokens) {
      console.table([
        {
          'Input Tokens': log.tokens.input,
          'Output Tokens': log.tokens.output,
          'Total Tokens': log.tokens.input + log.tokens.output,
          'Estimated Cost': `$${log.tokens.cost?.toFixed(4) || 'N/A'}`,
          'Tokens/Second': log.duration
            ? Math.round((log.tokens.input + log.tokens.output) / (log.duration / 1000))
            : 'N/A',
        },
      ])
    }

    // Response data (limited based on log level)
    if (log.data && this.config.logLevel !== 'minimal') {
      if (this.config.logLevel === 'verbose') {
        console.log('📋 Full Response:', log.data)
      } else {
        console.log('📝 Response Summary:', {
          success: log.data.success,
          messageLength: log.data.message?.length || 0,
          provider: log.data.metadata?.provider,
          model: log.data.metadata?.model,
          cached: log.data.metadata?.cached,
        })
      }
    }

    console.groupEnd()
  }

  // Display error log
  private displayErrorLog(log: DebugLog) {
    if (!this.config.enabled) return

    console.group('❌ AI Request Error')
    console.log('🆔 Request ID:', log.id.slice(-6))
    console.log('⏱️ Duration:', `${log.duration}ms`)
    console.error('💥 Error:', log.data?.message)

    if (this.config.logLevel === 'verbose' && log.data?.stack) {
      console.log('📚 Stack Trace:', log.data.stack)
    }

    console.timeEnd(`⏱️ AI Request ${log.id.slice(-6)}`)
    console.groupEnd()
  }

  // Analyze performance
  private analyzePerformance(duration: number, status: number) {
    const performance = {
      rating: 'good' as 'excellent' | 'good' | 'slow' | 'error',
      message: '',
    }

    if (status >= 400) {
      performance.rating = 'error'
      performance.message = `HTTP ${status} error`
    } else if (duration < 1000) {
      performance.rating = 'excellent'
      performance.message = 'Very fast response'
    } else if (duration < 3000) {
      performance.rating = 'good'
      performance.message = 'Good response time'
    } else {
      performance.rating = 'slow'
      performance.message = 'Slow response - consider optimization'
    }

    return performance
  }

  // Add log to storage
  private addLog(log: DebugLog) {
    this.logs.unshift(log)

    // Limit log storage
    if (this.logs.length > this.config.maxLogs) {
      this.logs = this.logs.slice(0, this.config.maxLogs)
    }
  }

  // Setup console shortcuts
  private setupConsoleShortcuts() {
    if (typeof window === 'undefined') return

    // Global debugging functions
    ;(window as any).aiDebug = {
      enable: (level?: ClientDebugConfig['logLevel']) => this.enable(level),
      disable: () => this.disable(),
      logs: () => this.logs,
      stats: () => this.getStats(),
      clear: () => this.clearLogs(),
      config: (newConfig: Partial<ClientDebugConfig>) => this.updateConfig(newConfig),
    }

    console.log('🤖 AI Debug shortcuts available:')
    console.log('  aiDebug.enable() - Enable debugging')
    console.log('  aiDebug.disable() - Disable debugging')
    console.log('  aiDebug.logs() - View all logs')
    console.log('  aiDebug.stats() - Performance statistics')
    console.log('  aiDebug.clear() - Clear logs')
  }

  // Get performance statistics
  private getStats() {
    const requests = this.logs.filter((log) => log.type === 'response')
    const errors = this.logs.filter((log) => log.type === 'error')

    if (requests.length === 0) {
      return { message: 'No requests logged yet' }
    }

    const avgDuration =
      requests.reduce((sum, log) => sum + (log.duration || 0), 0) / requests.length
    const totalTokens = requests.reduce((sum, log) => {
      return sum + ((log.tokens?.input || 0) + (log.tokens?.output || 0))
    }, 0)
    const totalCost = requests.reduce((sum, log) => sum + (log.tokens?.cost || 0), 0)

    return {
      totalRequests: requests.length,
      totalErrors: errors.length,
      successRate: `${((requests.length / (requests.length + errors.length)) * 100).toFixed(1)}%`,
      avgDuration: `${avgDuration.toFixed(0)}ms`,
      totalTokens,
      totalCost: `$${totalCost.toFixed(4)}`,
    }
  }

  // Clear logs
  private clearLogs() {
    this.logs = []
    console.log('🧹 AI debug logs cleared')
  }

  // Update configuration
  private updateConfig(newConfig: Partial<ClientDebugConfig>) {
    this.config = { ...this.config, ...newConfig }
    localStorage.setItem(`${this.config.storageKey}_CONFIG`, JSON.stringify(this.config))
    console.log('⚙️ AI debug configuration updated:', newConfig)
  }

  // Generate unique request ID
  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`
  }
}

// Create singleton instance only in browser
export const clientAIDebugger = typeof window !== 'undefined' ? new ClientAIDebugger() : null

// Auto-enable debugging if localStorage flag is set
if (typeof window !== 'undefined' && clientAIDebugger && localStorage.getItem('DEBUG_AI') === 'true') {
  clientAIDebugger.enable()
}

export default clientAIDebugger
