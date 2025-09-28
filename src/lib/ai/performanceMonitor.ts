// AI Performance Monitor for Cerebrum Biology Academy
// Enhanced version with education-specific metrics and multi-provider tracking

export interface TokenAnalysis {
  inputTokens: number
  outputTokens: number
  totalTokens: number
  estimatedCost: number
  efficiency: {
    tokensPerSecond: number
    costPerToken: number
    inputOutputRatio: number
  }
}

export interface PerformanceMetric {
  id: string
  timestamp: string
  duration: number
  memoryDelta: number
  success: boolean
  provider?: string
  model?: string
  tokensUsed?: {
    input: number
    output: number
  }
  cost?: number
  cached?: boolean
  error?: string
  requestType?: 'chat' | 'question-generation' | 'image-analysis' | 'voice'
  educationalContext?: {
    subject?: string
    studentLevel?: string
    questionType?: string
  }
  tokenAnalysis?: TokenAnalysis
}

export interface PerformanceStats {
  totalRequests: number
  successRate: string
  avgResponseTime: string
  failures: number
  avgCost: string
  totalCost: string
  cacheHitRate: string
  providerBreakdown: Record<string, number>
  memoryEfficiency: string
  peakMemoryUsage: number
  educationalMetrics?: {
    avgConfidenceScore: number
    avgEducationalValue: number
    topSubjects: string[]
    topStudentLevels: string[]
  }
}

export class PerformanceMonitor {
  private metrics: PerformanceMetric[] = []
  private maxMetrics: number = 1000 // Keep last 1000 metrics

  constructor(maxMetrics: number = 1000) {
    this.maxMetrics = maxMetrics
  }

  async trackRequest<T>(
    requestFunction: () => Promise<T>,
    context?: {
      provider?: string
      model?: string
      requestType?: 'chat' | 'question-generation' | 'image-analysis' | 'voice'
      educationalContext?: {
        subject?: string
        studentLevel?: string
        questionType?: string
      }
    }
  ): Promise<T> {
    const metricId = this.generateMetricId()

    const start = {
      time: Date.now(),
      memory: this.getMemoryUsage(),
    }

    try {
      const result = await requestFunction()

      const end = {
        time: Date.now(),
        memory: this.getMemoryUsage(),
      }

      // Extract AI response metadata if available
      const aiResponse = result as any
      const tokensUsed = aiResponse?.metadata?.tokensUsed
      const cost = aiResponse?.metadata?.cost
      const cached = aiResponse?.metadata?.cached

      // Perform enhanced token analysis if token data is available
      let tokenAnalysis: TokenAnalysis | undefined
      if (tokensUsed && tokensUsed.input && tokensUsed.output) {
        tokenAnalysis = this.analyzeTokenUsage(
          tokensUsed,
          end.time - start.time,
          context?.provider || aiResponse?.metadata?.provider
        )
      }

      const metric: PerformanceMetric = {
        id: metricId,
        timestamp: new Date().toISOString(),
        duration: end.time - start.time,
        memoryDelta: end.memory - start.memory,
        success: true,
        provider: context?.provider || aiResponse?.metadata?.provider,
        model: context?.model || aiResponse?.metadata?.model,
        tokensUsed,
        cost,
        cached,
        requestType: context?.requestType,
        educationalContext: context?.educationalContext,
        tokenAnalysis,
      }

      this.addMetric(metric)

      // Enhanced logging with educational context
      console.log('📊 AI Performance Metric:', {
        id: metric.id,
        duration: `${metric.duration}ms`,
        provider: metric.provider,
        model: metric.model,
        cost: metric.cost ? `$${metric.cost.toFixed(4)}` : 'N/A',
        cached: metric.cached ? '🎯 Cached' : '🔄 Fresh',
        memoryDelta: `${metric.memoryDelta.toFixed(2)}MB`,
        subject: metric.educationalContext?.subject,
        level: metric.educationalContext?.studentLevel,
      })

      return result
    } catch (error) {
      const failedMetric: PerformanceMetric = {
        id: metricId,
        timestamp: new Date().toISOString(),
        duration: Date.now() - start.time,
        memoryDelta: this.getMemoryUsage() - start.memory,
        success: false,
        error: error instanceof Error ? error.message : String(error),
        provider: context?.provider,
        model: context?.model,
        requestType: context?.requestType,
        educationalContext: context?.educationalContext,
      }

      this.addMetric(failedMetric)

      console.error('❌ AI Performance Error:', {
        id: failedMetric.id,
        duration: `${failedMetric.duration}ms`,
        error: failedMetric.error,
        provider: failedMetric.provider,
      })

      throw error
    }
  }

  getStats(): PerformanceStats {
    if (this.metrics.length === 0) {
      return this.getEmptyStats()
    }

    const successful = this.metrics.filter((m) => m.success)
    const failed = this.metrics.filter((m) => !m.success)

    // Basic performance metrics
    const avgDuration =
      successful.length > 0 ? successful.reduce((a, b) => a + b.duration, 0) / successful.length : 0

    const totalCost = successful.reduce((sum, m) => sum + (m.cost || 0), 0)
    const avgCost = successful.length > 0 ? totalCost / successful.length : 0

    const cachedRequests = successful.filter((m) => m.cached).length
    const cacheHitRate =
      successful.length > 0 ? ((cachedRequests / successful.length) * 100).toFixed(2) : '0.00'

    // Provider breakdown
    const providerBreakdown: Record<string, number> = {}
    this.metrics.forEach((m) => {
      if (m.provider) {
        providerBreakdown[m.provider] = (providerBreakdown[m.provider] || 0) + 1
      }
    })

    // Memory efficiency
    const memoryDeltas = this.metrics.map((m) => m.memoryDelta)
    const avgMemoryDelta = memoryDeltas.reduce((a, b) => a + b, 0) / memoryDeltas.length
    const peakMemoryUsage = Math.max(...memoryDeltas)

    // Educational metrics (if available)
    const educationalMetrics = this.calculateEducationalMetrics()

    const stats: PerformanceStats = {
      totalRequests: this.metrics.length,
      successRate: `${((successful.length / this.metrics.length) * 100).toFixed(2)}%`,
      avgResponseTime: `${avgDuration.toFixed(2)}ms`,
      failures: failed.length,
      avgCost: `$${avgCost.toFixed(4)}`,
      totalCost: `$${totalCost.toFixed(4)}`,
      cacheHitRate: `${cacheHitRate}%`,
      providerBreakdown,
      memoryEfficiency: `${avgMemoryDelta.toFixed(2)}MB avg`,
      peakMemoryUsage,
      educationalMetrics,
    }

    // Display comprehensive stats table
    console.group('📊 AI Performance Statistics')
    console.table([
      {
        'Total Requests': stats.totalRequests,
        'Success Rate': stats.successRate,
        'Avg Response Time': stats.avgResponseTime,
        Failures: stats.failures,
        'Avg Cost': stats.avgCost,
        'Total Cost': stats.totalCost,
        'Cache Hit Rate': stats.cacheHitRate,
        'Memory Efficiency': stats.memoryEfficiency,
      },
    ])

    if (Object.keys(providerBreakdown).length > 0) {
      console.log('🤖 Provider Usage:')
      console.table(providerBreakdown)
    }

    if (educationalMetrics) {
      console.log('🎓 Educational Metrics:')
      console.table([
        {
          'Avg Confidence': `${educationalMetrics.avgConfidenceScore.toFixed(2)}`,
          'Avg Educational Value': `${educationalMetrics.avgEducationalValue.toFixed(2)}`,
          'Top Subject': educationalMetrics.topSubjects[0] || 'N/A',
          'Top Level': educationalMetrics.topStudentLevels[0] || 'N/A',
        },
      ])
    }
    console.groupEnd()

    return stats
  }

  // Get real-time performance metrics
  getRealTimeMetrics() {
    const recent = this.metrics.slice(-10) // Last 10 requests
    const recentSuccessful = recent.filter((m) => m.success)

    if (recentSuccessful.length === 0) {
      return { avgResponseTime: 0, successRate: 0, providers: [] }
    }

    const avgResponseTime =
      recentSuccessful.reduce((a, b) => a + b.duration, 0) / recentSuccessful.length
    const successRate = (recentSuccessful.length / recent.length) * 100
    const providers = [...new Set(recent.map((m) => m.provider).filter(Boolean))]

    return {
      avgResponseTime: Math.round(avgResponseTime),
      successRate: Math.round(successRate),
      providers,
      lastUpdate: new Date().toISOString(),
    }
  }

  // Export metrics for analysis
  exportMetrics(filterBy?: {
    provider?: string
    timeRange?: { start: Date; end: Date }
    success?: boolean
  }) {
    let filtered = this.metrics

    if (filterBy?.provider) {
      filtered = filtered.filter((m) => m.provider === filterBy.provider)
    }

    if (filterBy?.timeRange) {
      filtered = filtered.filter((m) => {
        const timestamp = new Date(m.timestamp)
        return timestamp >= filterBy.timeRange!.start && timestamp <= filterBy.timeRange!.end
      })
    }

    if (filterBy?.success !== undefined) {
      filtered = filtered.filter((m) => m.success === filterBy.success)
    }

    return filtered
  }

  // Clear old metrics to prevent memory leaks
  cleanup() {
    if (this.metrics.length > this.maxMetrics) {
      this.metrics = this.metrics.slice(-this.maxMetrics)
      console.log(`🧹 Cleaned up old metrics. Keeping last ${this.maxMetrics} entries.`)
    }
  }

  // Reset all metrics
  reset() {
    this.metrics = []
    console.log('🔄 Performance metrics reset')
  }

  private addMetric(metric: PerformanceMetric) {
    this.metrics.push(metric)

    // Auto-cleanup if needed
    if (this.metrics.length > this.maxMetrics * 1.1) {
      this.cleanup()
    }
  }

  private getMemoryUsage(): number {
    try {
      return process.memoryUsage().heapUsed / 1024 / 1024 // MB
    } catch {
      return 0 // Fallback for environments without process
    }
  }

  private generateMetricId(): string {
    return `metric_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`
  }

  private getEmptyStats(): PerformanceStats {
    return {
      totalRequests: 0,
      successRate: '0.00%',
      avgResponseTime: '0.00ms',
      failures: 0,
      avgCost: '$0.0000',
      totalCost: '$0.0000',
      cacheHitRate: '0.00%',
      providerBreakdown: {},
      memoryEfficiency: '0.00MB avg',
      peakMemoryUsage: 0,
    }
  }

  private calculateEducationalMetrics() {
    // This would integrate with our educational assessment system
    // For now, return basic structure
    const educationalRequests = this.metrics.filter(
      (m) => m.educationalContext?.subject || m.educationalContext?.studentLevel
    )

    if (educationalRequests.length === 0) return undefined

    const subjects = educationalRequests
      .map((m) => m.educationalContext?.subject)
      .filter(Boolean) as string[]

    const levels = educationalRequests
      .map((m) => m.educationalContext?.studentLevel)
      .filter(Boolean) as string[]

    const topSubjects = [...new Set(subjects)].sort(
      (a, b) => subjects.filter((s) => s === b).length - subjects.filter((s) => s === a).length
    )

    const topStudentLevels = [...new Set(levels)].sort(
      (a, b) => levels.filter((l) => l === b).length - levels.filter((l) => l === a).length
    )

    return {
      avgConfidenceScore: 0.85, // Would calculate from actual responses
      avgEducationalValue: 75, // Would calculate from actual responses
      topSubjects,
      topStudentLevels,
    }
  }

  // Enhanced token analysis function - inspired by user's token counter
  analyzeTokenUsage(
    tokensUsed: { input: number; output: number },
    duration: number,
    provider?: string
  ): TokenAnalysis {
    const inputTokens = tokensUsed.input
    const outputTokens = tokensUsed.output
    const totalTokens = inputTokens + outputTokens

    // Provider-specific pricing (per 1K tokens)
    const pricing = {
      anthropic: { input: 0.003, output: 0.015 }, // Claude pricing
      openai: { input: 0.005, output: 0.015 }, // GPT-4 pricing
      google: { input: 0.0001, output: 0.0002 }, // Gemini pricing
    }

    const rates = pricing[provider as keyof typeof pricing] || pricing.anthropic
    const estimatedCost = (inputTokens / 1000) * rates.input + (outputTokens / 1000) * rates.output

    // Calculate efficiency metrics
    const tokensPerSecond = duration > 0 ? totalTokens / (duration / 1000) : 0
    const costPerToken = totalTokens > 0 ? estimatedCost / totalTokens : 0
    const inputOutputRatio = outputTokens > 0 ? inputTokens / outputTokens : 0

    const analysis: TokenAnalysis = {
      inputTokens,
      outputTokens,
      totalTokens,
      estimatedCost,
      efficiency: {
        tokensPerSecond,
        costPerToken,
        inputOutputRatio,
      },
    }

    // Enhanced logging with beautiful table display
    console.log('🪙 Enhanced Token Analysis:')
    console.table([
      {
        Provider: provider || 'Unknown',
        'Input Tokens': inputTokens,
        'Output Tokens': outputTokens,
        'Total Tokens': totalTokens,
        'Estimated Cost': `$${estimatedCost.toFixed(4)}`,
        'Tokens/Second': tokensPerSecond.toFixed(1),
        'Cost/Token': `$${costPerToken.toFixed(6)}`,
        'Input/Output Ratio': inputOutputRatio.toFixed(2),
      },
    ])

    // Cost efficiency insights
    if (estimatedCost > 0.05) {
      console.log('💰 Cost Alert: High cost request detected')
    }
    if (tokensPerSecond < 10) {
      console.log('🐌 Performance Alert: Low token throughput')
    }
    if (inputOutputRatio > 5) {
      console.log('📝 Efficiency Alert: High input/output ratio - consider prompt optimization')
    }

    return analysis
  }

  // Get token usage statistics across all metrics
  getTokenStats() {
    const tokenMetrics = this.metrics.filter((m) => m.tokensUsed && m.success)

    if (tokenMetrics.length === 0) {
      console.log('No token data available')
      return null
    }

    const totalInputTokens = tokenMetrics.reduce((sum, m) => sum + (m.tokensUsed?.input || 0), 0)
    const totalOutputTokens = tokenMetrics.reduce((sum, m) => sum + (m.tokensUsed?.output || 0), 0)
    const totalCost = tokenMetrics.reduce((sum, m) => sum + (m.cost || 0), 0)

    const avgInputTokens = totalInputTokens / tokenMetrics.length
    const avgOutputTokens = totalOutputTokens / tokenMetrics.length
    const avgCostPerRequest = totalCost / tokenMetrics.length

    // Provider breakdown
    const providerTokens: Record<
      string,
      { input: number; output: number; cost: number; count: number }
    > = {}
    tokenMetrics.forEach((m) => {
      const provider = m.provider || 'unknown'
      if (!providerTokens[provider]) {
        providerTokens[provider] = { input: 0, output: 0, cost: 0, count: 0 }
      }
      providerTokens[provider].input += m.tokensUsed?.input || 0
      providerTokens[provider].output += m.tokensUsed?.output || 0
      providerTokens[provider].cost += m.cost || 0
      providerTokens[provider].count += 1
    })

    console.log('\n🪙 Comprehensive Token Statistics:')
    console.table([
      {
        'Total Requests': tokenMetrics.length,
        'Total Input Tokens': totalInputTokens,
        'Total Output Tokens': totalOutputTokens,
        'Total Tokens': totalInputTokens + totalOutputTokens,
        'Total Cost': `$${totalCost.toFixed(4)}`,
        'Avg Input/Request': avgInputTokens.toFixed(0),
        'Avg Output/Request': avgOutputTokens.toFixed(0),
        'Avg Cost/Request': `$${avgCostPerRequest.toFixed(4)}`,
      },
    ])

    console.log('\n📊 Provider Token Breakdown:')
    const providerTable = Object.entries(providerTokens).map(([provider, data]) => ({
      Provider: provider,
      Requests: data.count,
      'Input Tokens': data.input,
      'Output Tokens': data.output,
      'Total Cost': `$${data.cost.toFixed(4)}`,
      'Avg Cost/Request': `$${(data.cost / data.count).toFixed(4)}`,
    }))
    console.table(providerTable)

    return {
      totalInputTokens,
      totalOutputTokens,
      totalCost,
      avgInputTokens,
      avgOutputTokens,
      avgCostPerRequest,
      providerBreakdown: providerTokens,
    }
  }
}

// Singleton instance for global use
export const performanceMonitor = new PerformanceMonitor()

// Export for use in our unified AI system
export default PerformanceMonitor
