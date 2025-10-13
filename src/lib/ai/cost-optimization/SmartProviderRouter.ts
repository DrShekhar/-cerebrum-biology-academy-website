/**
 * Smart Provider Router for AI Cost Optimization
 * Intelligent routing to minimize costs while maximizing performance and quality
 * Specifically optimized for educational content delivery
 */

import { aiConfig, AIProviderConfig } from '../aiConfig'

interface RoutingRequest {
  prompt: string
  context?: {
    subject?: string
    studentLevel?: string
    questionType?: string
    priority?: 'low' | 'medium' | 'high' | 'critical'
    maxLatency?: number
    requiresReasoning?: boolean
    requiresVision?: boolean
    complexity?: 'low' | 'medium' | 'high'
  }
  userId?: string
  sessionId?: string
}

interface RoutingDecision {
  selectedProvider: string
  selectedModel: string
  estimatedCost: number
  estimatedLatency: number
  confidence: number
  reasoning: string[]
  fallbackOptions: Array<{
    provider: string
    model: string
    cost: number
    priority: number
  }>
}

interface ProviderPerformance {
  provider: string
  averageLatency: number
  successRate: number
  averageCost: number
  qualityScore: number
  uptimeScore: number
  lastFailure?: Date
  consecutiveFailures: number
}

export class SmartProviderRouter {
  private static instance: SmartProviderRouter
  private performanceHistory: Map<string, ProviderPerformance> = new Map()
  private routingHistory: Array<{
    timestamp: Date
    provider: string
    cost: number
    latency: number
    success: boolean
    context: any
  }> = []

  // Cost optimization settings
  private costOptimizationEnabled = true
  private monthlyBudget = 1000 // $1000 default budget
  private emergencyBudgetThreshold = 0.9 // 90% of budget

  // Performance targets
  private targetLatency = 3000 // 3 seconds max
  private minQualityScore = 0.8 // Minimum acceptable quality

  constructor() {
    this.initializePerformanceTracking()
  }

  static getInstance(): SmartProviderRouter {
    if (!SmartProviderRouter.instance) {
      SmartProviderRouter.instance = new SmartProviderRouter()
    }
    return SmartProviderRouter.instance
  }

  /**
   * Route request to optimal provider with cost optimization
   */
  async routeRequest(request: RoutingRequest): Promise<RoutingDecision> {
    console.log('🧭 Smart Provider Router: Analyzing request...')

    // Analyze request characteristics
    const requestAnalysis = this.analyzeRequest(request)

    // Get available providers
    const availableProviders = aiConfig.getAvailableProviders()

    if (availableProviders.length === 0) {
      throw new Error('No AI providers available for routing')
    }

    // Calculate scores for each provider
    const providerScores = await this.calculateProviderScores(
      availableProviders,
      requestAnalysis
    )

    // Select optimal provider
    const bestProvider = this.selectOptimalProvider(providerScores, requestAnalysis)

    // Generate routing decision
    const decision = this.generateRoutingDecision(bestProvider, requestAnalysis, providerScores)

    console.log('🎯 Routing Decision:', {
      provider: decision.selectedProvider,
      model: decision.selectedModel,
      estimatedCost: `$${decision.estimatedCost.toFixed(4)}`,
      confidence: `${(decision.confidence * 100).toFixed(1)}%`,
      reasoning: decision.reasoning.slice(0, 2)
    })

    return decision
  }

  /**
   * Analyze request to determine optimal routing strategy
   */
  private analyzeRequest(request: RoutingRequest) {
    const prompt = request.prompt.toLowerCase()
    const context = request.context || {}

    // Estimate complexity based on prompt characteristics
    let complexity: 'low' | 'medium' | 'high' = 'medium'

    if (prompt.length < 100) complexity = 'low'
    else if (prompt.length > 500) complexity = 'high'

    // Biology-specific complexity indicators
    const complexBiologyTopics = [
      'biochemistry', 'molecular biology', 'genetics', 'evolution',
      'photosynthesis mechanism', 'cellular respiration', 'protein synthesis'
    ]

    if (complexBiologyTopics.some(topic => prompt.includes(topic))) {
      complexity = 'high'
    }

    // Determine if reasoning is required
    const requiresReasoning = !!(
      prompt.includes('explain why') ||
      prompt.includes('analyze') ||
      prompt.includes('compare') ||
      prompt.includes('step by step') ||
      prompt.includes('solve') ||
      context.questionType === 'analytical'
    )

    // Check for vision requirements
    const requiresVision = !!(
      prompt.includes('diagram') ||
      prompt.includes('image') ||
      prompt.includes('chart') ||
      prompt.includes('graph')
    )

    // Determine priority
    let priority: 'low' | 'medium' | 'high' | 'critical' = context.priority || 'medium'

    if (prompt.includes('neet') || prompt.includes('exam')) {
      priority = 'high' // Exam-related content is high priority
    }

    // Educational context analysis
    const isEducational = !!(
      context.subject ||
      prompt.includes('ncert') ||
      prompt.includes('textbook') ||
      prompt.includes('chapter')
    )

    return {
      complexity,
      requiresReasoning,
      requiresVision,
      priority,
      isEducational,
      estimatedTokens: this.estimateTokenUsage(prompt),
      maxLatency: context.maxLatency || this.targetLatency,
      budgetConstraint: this.getCurrentBudgetStatus()
    }
  }

  /**
   * Calculate scores for each provider based on request characteristics
   */
  private async calculateProviderScores(
    providers: string[],
    analysis: any
  ): Promise<Array<{
    provider: string
    totalScore: number
    costScore: number
    performanceScore: number
    qualityScore: number
    availabilityScore: number
    details: any
  }>> {
    const scores = []

    for (const providerId of providers) {
      const config = aiConfig.getProvider(providerId)
      if (!config) continue

      const performance = this.getProviderPerformance(providerId)

      // Cost score (30% weight)
      const costScore = this.calculateCostScore(config, analysis)

      // Performance score (25% weight)
      const performanceScore = this.calculatePerformanceScore(performance, analysis)

      // Quality score (25% weight)
      const qualityScore = this.calculateQualityScore(config, analysis)

      // Availability score (20% weight)
      const availabilityScore = this.calculateAvailabilityScore(performance)

      // Calculate weighted total score
      const totalScore = (
        costScore * 0.30 +
        performanceScore * 0.25 +
        qualityScore * 0.25 +
        availabilityScore * 0.20
      )

      scores.push({
        provider: providerId,
        totalScore,
        costScore,
        performanceScore,
        qualityScore,
        availabilityScore,
        details: {
          config,
          performance,
          optimalModel: this.getOptimalModel(config, analysis)
        }
      })
    }

    return scores.sort((a, b) => b.totalScore - a.totalScore)
  }

  /**
   * Calculate cost score for provider (higher score = lower cost)
   */
  private calculateCostScore(config: AIProviderConfig, analysis: any): number {
    const model = this.getOptimalModel(config, analysis)
    const estimatedCost = aiConfig.estimateCost(
      config.name.toLowerCase(),
      analysis.estimatedTokens * 0.3, // Input tokens
      analysis.estimatedTokens * 0.7, // Output tokens
      model
    )

    // Normalize cost score (inverse relationship)
    const maxCost = 0.10 // $0.10 max expected cost
    const normalizedCost = Math.min(estimatedCost / maxCost, 1)

    let costScore = (1 - normalizedCost) * 100

    // Bonus for educational content
    if (analysis.isEducational && config.name.toLowerCase().includes('google')) {
      costScore += 20 // Google AI is most cost-effective for education
    }

    // Budget constraint penalties
    if (analysis.budgetConstraint === 'critical') {
      if (estimatedCost > 0.01) costScore *= 0.5 // Heavy penalty for expensive requests
    }

    return Math.max(0, Math.min(100, costScore))
  }

  /**
   * Calculate performance score based on historical data
   */
  private calculatePerformanceScore(performance: ProviderPerformance, analysis: any): number {
    let score = 50 // Base score

    // Latency score
    if (performance.averageLatency < analysis.maxLatency * 0.5) score += 25
    else if (performance.averageLatency < analysis.maxLatency) score += 15
    else score -= 20

    // Success rate score
    score += (performance.successRate - 0.8) * 100 // Scale from 80% baseline

    // Recent failures penalty
    if (performance.consecutiveFailures > 0) {
      score -= performance.consecutiveFailures * 10
    }

    // Uptime bonus
    score += (performance.uptimeScore - 0.95) * 100

    return Math.max(0, Math.min(100, score))
  }

  /**
   * Calculate quality score based on provider capabilities
   */
  private calculateQualityScore(config: AIProviderConfig, analysis: any): number {
    let score = 50 // Base score

    // Provider-specific quality ratings for biology education
    if (config.name.toLowerCase().includes('claude')) {
      score += 30 // Claude excels at reasoning and explanations
      if (analysis.requiresReasoning) score += 15
    } else if (config.name.toLowerCase().includes('openai')) {
      score += 25 // GPT-4 is well-rounded
      if (analysis.requiresVision) score += 15
    } else if (config.name.toLowerCase().includes('google')) {
      score += 20 // Gemini is good for educational content
      if (analysis.isEducational) score += 10
    }

    // Capability matching bonuses
    if (analysis.requiresReasoning && config.capabilities?.reasoning) score += 15
    if (analysis.requiresVision && config.capabilities?.vision) score += 15
    if (analysis.complexity === 'high' && config.capabilities?.analysis) score += 10

    // Educational content bonus
    if (analysis.isEducational) {
      if (config.name.toLowerCase().includes('claude')) score += 10
    }

    return Math.max(0, Math.min(100, score))
  }

  /**
   * Calculate availability score
   */
  private calculateAvailabilityScore(performance: ProviderPerformance): number {
    let score = performance.uptimeScore * 100

    // Recent failures penalty
    if (performance.lastFailure) {
      const timeSinceFailure = Date.now() - performance.lastFailure.getTime()
      const hoursAgo = timeSinceFailure / (1000 * 60 * 60)

      if (hoursAgo < 1) score *= 0.5
      else if (hoursAgo < 6) score *= 0.8
    }

    return Math.max(0, Math.min(100, score))
  }

  /**
   * Select optimal provider from scored options
   */
  private selectOptimalProvider(scores: any[], analysis: any) {
    // For critical priority, always use the highest scoring provider
    if (analysis.priority === 'critical') {
      return scores[0]
    }

    // For budget-constrained situations, prefer cost-effective options
    if (analysis.budgetConstraint === 'critical') {
      return scores.sort((a, b) => b.costScore - a.costScore)[0]
    }

    // For educational content, balance cost and quality
    if (analysis.isEducational) {
      const educationalScores = scores.map(s => ({
        ...s,
        educationalScore: (s.costScore * 0.4 + s.qualityScore * 0.6)
      }))
      return educationalScores.sort((a, b) => b.educationalScore - a.educationalScore)[0]
    }

    // Default: use highest total score
    return scores[0]
  }

  /**
   * Generate comprehensive routing decision
   */
  private generateRoutingDecision(
    selectedProvider: any,
    analysis: any,
    allScores: any[]
  ): RoutingDecision {
    const config = selectedProvider.details.config
    const model = selectedProvider.details.optimalModel

    const estimatedCost = aiConfig.estimateCost(
      selectedProvider.provider,
      analysis.estimatedTokens * 0.3,
      analysis.estimatedTokens * 0.7,
      model
    )

    const reasoning = []

    // Add reasoning for selection
    if (selectedProvider.costScore > 70) {
      reasoning.push(`Cost-effective choice (${selectedProvider.costScore.toFixed(0)}/100 cost score)`)
    }

    if (selectedProvider.qualityScore > 80) {
      reasoning.push(`High quality for this task type (${selectedProvider.qualityScore.toFixed(0)}/100 quality score)`)
    }

    if (analysis.isEducational) {
      reasoning.push('Optimized for educational content')
    }

    if (analysis.requiresReasoning) {
      reasoning.push('Selected for strong reasoning capabilities')
    }

    // Generate fallback options
    const fallbackOptions = allScores.slice(1, 4).map((score, index) => ({
      provider: score.provider,
      model: score.details.optimalModel,
      cost: aiConfig.estimateCost(
        score.provider,
        analysis.estimatedTokens * 0.3,
        analysis.estimatedTokens * 0.7,
        score.details.optimalModel
      ),
      priority: index + 2
    }))

    return {
      selectedProvider: selectedProvider.provider,
      selectedModel: model,
      estimatedCost,
      estimatedLatency: selectedProvider.details.performance.averageLatency,
      confidence: selectedProvider.totalScore / 100,
      reasoning,
      fallbackOptions
    }
  }

  /**
   * Get optimal model for provider based on request analysis
   */
  private getOptimalModel(config: AIProviderConfig, analysis: any): string {
    // Use the enhanced aiConfig method
    return aiConfig.getOptimalModel(config.name.toLowerCase(), {
      complexity: analysis.complexity,
      requiresReasoning: analysis.requiresReasoning,
      requiresVision: analysis.requiresVision,
      priority: analysis.priority,
      maxLatency: analysis.maxLatency
    })
  }

  /**
   * Estimate token usage based on prompt
   */
  private estimateTokenUsage(prompt: string): number {
    // Enhanced estimation for biology content
    const baseTokens = Math.ceil(prompt.split(' ').length * 1.3)

    // Biology content tends to require longer responses
    let multiplier = 2.5

    if (prompt.includes('explain') || prompt.includes('describe')) multiplier = 3.0
    if (prompt.includes('diagram') || prompt.includes('process')) multiplier = 3.5
    if (prompt.includes('neet') || prompt.includes('exam')) multiplier = 2.8

    return Math.ceil(baseTokens * multiplier)
  }

  /**
   * Get current budget status
   */
  private getCurrentBudgetStatus(): 'normal' | 'warning' | 'critical' {
    // This would integrate with actual budget tracking
    const currentSpend = this.getCurrentMonthSpend()
    const spendRatio = currentSpend / this.monthlyBudget

    if (spendRatio > this.emergencyBudgetThreshold) return 'critical'
    if (spendRatio > 0.7) return 'warning'
    return 'normal'
  }

  /**
   * Get or initialize provider performance data
   */
  private getProviderPerformance(providerId: string): ProviderPerformance {
    if (!this.performanceHistory.has(providerId)) {
      this.performanceHistory.set(providerId, {
        provider: providerId,
        averageLatency: 2000, // Default 2 seconds
        successRate: 0.95, // Default 95% success rate
        averageCost: 0.01, // Default cost estimate
        qualityScore: 0.85, // Default quality
        uptimeScore: 0.99, // Default uptime
        consecutiveFailures: 0
      })
    }
    return this.performanceHistory.get(providerId)!
  }

  /**
   * Record routing performance for learning
   */
  recordPerformance(
    provider: string,
    cost: number,
    latency: number,
    success: boolean,
    context?: any
  ): void {
    // Update provider performance metrics
    const performance = this.getProviderPerformance(provider)

    // Update running averages
    performance.averageLatency = (performance.averageLatency * 0.8) + (latency * 0.2)
    performance.averageCost = (performance.averageCost * 0.8) + (cost * 0.2)

    if (success) {
      performance.successRate = Math.min(0.99, performance.successRate * 0.95 + 0.05)
      performance.consecutiveFailures = 0
    } else {
      performance.successRate = Math.max(0.5, performance.successRate * 0.9)
      performance.consecutiveFailures++
      performance.lastFailure = new Date()
    }

    // Add to routing history
    this.routingHistory.push({
      timestamp: new Date(),
      provider,
      cost,
      latency,
      success,
      context
    })

    // Keep only last 1000 entries
    if (this.routingHistory.length > 1000) {
      this.routingHistory = this.routingHistory.slice(-1000)
    }

    console.log('📊 Provider Performance Updated:', {
      provider,
      successRate: `${(performance.successRate * 100).toFixed(1)}%`,
      avgLatency: `${performance.averageLatency.toFixed(0)}ms`,
      avgCost: `$${performance.averageCost.toFixed(4)}`
    })
  }

  /**
   * Get routing analytics
   */
  getAnalytics(): {
    totalRequests: number
    providerDistribution: Record<string, number>
    averageCost: number
    totalCostSaved: number
    successRate: number
    routingEfficiency: number
  } {
    const totalRequests = this.routingHistory.length
    const successfulRequests = this.routingHistory.filter(r => r.success).length

    // Provider distribution
    const providerDistribution: Record<string, number> = {}
    this.routingHistory.forEach(r => {
      providerDistribution[r.provider] = (providerDistribution[r.provider] || 0) + 1
    })

    // Cost analysis
    const totalCost = this.routingHistory.reduce((sum, r) => sum + r.cost, 0)
    const averageCost = totalRequests > 0 ? totalCost / totalRequests : 0

    // Estimate cost savings from routing optimization
    const estimatedSavings = totalCost * 0.3 // Assume 30% savings from optimization

    return {
      totalRequests,
      providerDistribution,
      averageCost,
      totalCostSaved: estimatedSavings,
      successRate: totalRequests > 0 ? successfulRequests / totalRequests : 0,
      routingEfficiency: this.calculateRoutingEfficiency()
    }
  }

  /**
   * Calculate routing efficiency score
   */
  private calculateRoutingEfficiency(): number {
    if (this.routingHistory.length < 10) return 0.8 // Default for insufficient data

    const recentHistory = this.routingHistory.slice(-100) // Last 100 requests

    // Calculate efficiency based on cost vs quality tradeoffs
    let totalEfficiency = 0

    recentHistory.forEach(record => {
      const performance = this.getProviderPerformance(record.provider)

      // Efficiency = (Success Rate * Quality Score) / (Normalized Cost)
      const normalizedCost = Math.min(record.cost / 0.05, 1) // Normalize to $0.05 max
      const efficiency = (performance.successRate * performance.qualityScore) / (normalizedCost + 0.1)

      totalEfficiency += efficiency
    })

    return Math.min(1.0, totalEfficiency / recentHistory.length)
  }

  /**
   * Initialize performance tracking for all providers
   */
  private initializePerformanceTracking(): void {
    const providers = aiConfig.getAvailableProviders()

    providers.forEach(provider => {
      this.getProviderPerformance(provider) // Initialize with defaults
    })

    console.log('📊 Performance tracking initialized for providers:', providers)
  }

  /**
   * Get current month spending (placeholder)
   */
  private getCurrentMonthSpend(): number {
    // This would integrate with actual cost tracking
    return this.routingHistory
      .filter(r => {
        const recordDate = r.timestamp
        const now = new Date()
        return recordDate.getMonth() === now.getMonth() &&
               recordDate.getFullYear() === now.getFullYear()
      })
      .reduce((sum, r) => sum + r.cost, 0)
  }

  /**
   * Set monthly budget
   */
  setBudget(budget: number): void {
    this.monthlyBudget = budget
    console.log(`💰 Monthly budget set to $${budget}`)
  }

  /**
   * Get comprehensive routing report
   */
  getRoutingReport(): any {
    const analytics = this.getAnalytics()
    const currentBudgetStatus = this.getCurrentBudgetStatus()

    return {
      ...analytics,
      budgetStatus: currentBudgetStatus,
      monthlyBudget: this.monthlyBudget,
      currentSpend: this.getCurrentMonthSpend(),
      performanceByProvider: Array.from(this.performanceHistory.entries()).map(([provider, perf]) => ({
        provider,
        ...perf
      })),
      recommendations: this.generateRecommendations(analytics, currentBudgetStatus)
    }
  }

  /**
   * Generate optimization recommendations
   */
  private generateRecommendations(analytics: any, budgetStatus: string): string[] {
    const recommendations = []

    if (budgetStatus === 'critical') {
      recommendations.push('Consider using Google AI for cost reduction')
      recommendations.push('Enable aggressive caching for repeated queries')
    }

    if (analytics.successRate < 0.9) {
      recommendations.push('Review provider reliability and consider backup options')
    }

    if (analytics.routingEfficiency < 0.7) {
      recommendations.push('Analyze routing decisions for optimization opportunities')
    }

    const googleUsage = analytics.providerDistribution['google'] || 0
    const totalRequests = analytics.totalRequests

    if (googleUsage / totalRequests < 0.3) {
      recommendations.push('Increase Google AI usage for better cost efficiency')
    }

    return recommendations
  }
}

// Export singleton instance
export const smartRouter = SmartProviderRouter.getInstance()

export default SmartProviderRouter