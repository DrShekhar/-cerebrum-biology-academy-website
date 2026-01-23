/**
 * Smart Provider Selection Engine
 * Advanced AI provider routing based on question type, complexity, cost, and performance
 */

import { aiConfig } from './aiConfig'

export interface TaskAnalysis {
  complexity: 'low' | 'medium' | 'high'
  questionType: 'factual' | 'conceptual' | 'analytical' | 'creative' | 'problem-solving'
  domain: 'biology' | 'chemistry' | 'physics' | 'general' | 'neet-specific'
  requiresReasoning: boolean
  requiresVision: boolean
  estimatedTokens: number
  priority: 'low' | 'medium' | 'high' | 'critical'
  maxLatency: number // milliseconds
  studentLevel: 'class-9' | 'class-10' | 'class-11' | 'class-12' | 'neet-dropper'
}

export interface ProviderScore {
  provider: string
  score: number
  confidence: number
  estimatedCost: number
  estimatedLatency: number
  qualityScore: number
  reasoningScore: number
  reliability: number
}

export interface SelectionCriteria {
  maxCost?: number
  maxLatency?: number
  minQuality?: number
  preferProvider?: string
  costWeight: number // 0-1, how much to weight cost
  qualityWeight: number // 0-1, how much to weight quality
  speedWeight: number // 0-1, how much to weight speed
}

export class SmartProviderSelector {
  private performanceHistory: Map<string, number[]> = new Map()
  private costHistory: Map<string, number[]> = new Map()
  private reliabilityScores: Map<string, number> = new Map()

  constructor() {
    this.initializePerformanceTracking()
  }

  /**
   * Analyze task characteristics from prompt and context
   */
  analyzeTask(prompt: string, context?: any): TaskAnalysis {
    const promptLower = prompt.toLowerCase()

    // Analyze complexity
    const complexity = this.analyzeComplexity(prompt)

    // Determine question type
    const questionType = this.determineQuestionType(prompt)

    // Identify domain
    const domain = this.identifyDomain(prompt)

    // Check if reasoning is required
    const requiresReasoning = this.requiresReasoning(prompt)

    // Check if vision is required
    const requiresVision = this.requiresVision(prompt)

    // Estimate token usage
    const estimatedTokens = this.estimateTokens(prompt, complexity)

    // Determine priority based on context
    const priority = this.determinePriority(context)

    // Set max latency based on priority
    const maxLatency = this.getMaxLatency(priority)

    return {
      complexity,
      questionType,
      domain,
      requiresReasoning,
      requiresVision,
      estimatedTokens,
      priority,
      maxLatency,
      studentLevel: context?.studentLevel || 'class-12',
    }
  }

  /**
   * Select optimal provider based on task analysis
   */
  selectProvider(task: TaskAnalysis, criteria: SelectionCriteria): ProviderScore[] {
    const availableProviders = aiConfig.getAvailableProviders()
    const scores: ProviderScore[] = []

    for (const provider of availableProviders) {
      const score = this.calculateProviderScore(provider, task, criteria)
      if (score) {
        scores.push(score)
      }
    }

    // Sort by overall score (descending)
    return scores.sort((a, b) => b.score - a.score)
  }

  /**
   * Calculate comprehensive score for a provider
   */
  private calculateProviderScore(
    providerName: string,
    task: TaskAnalysis,
    criteria: SelectionCriteria
  ): ProviderScore | null {
    const config = aiConfig.getProvider(providerName)
    if (!config) return null

    // Get optimal model for this task
    const model = aiConfig.getOptimalModel(providerName, {
      complexity: task.complexity,
      requiresReasoning: task.requiresReasoning,
      requiresVision: task.requiresVision,
      priority: task.priority,
      maxLatency: task.maxLatency,
    })

    // Calculate individual scores
    const qualityScore = this.calculateQualityScore(providerName, task, model)
    const costScore = this.calculateCostScore(providerName, task, model)
    const speedScore = this.calculateSpeedScore(providerName, task, model)
    const reasoningScore = this.calculateReasoningScore(providerName, task)
    const reliability = this.getReliabilityScore(providerName)

    // Weight the scores based on criteria
    const weightedScore =
      (qualityScore * criteria.qualityWeight +
        (1 - costScore) * criteria.costWeight + // Invert cost (lower cost = higher score)
        speedScore * criteria.speedWeight) /
      (criteria.qualityWeight + criteria.costWeight + criteria.speedWeight)

    // Apply preference bonus
    let finalScore = weightedScore
    if (criteria.preferProvider === providerName) {
      finalScore *= 1.2 // 20% bonus for preferred provider
    }

    // Apply reliability factor
    finalScore *= reliability

    // Estimate cost and latency
    const estimatedCost = aiConfig.estimateCost(
      providerName,
      task.estimatedTokens * 0.3,
      task.estimatedTokens * 0.7,
      model
    )
    const estimatedLatency = this.estimateLatency(providerName, task)

    return {
      provider: providerName,
      score: Math.min(1, Math.max(0, finalScore)), // Clamp between 0-1
      confidence: this.calculateConfidence(qualityScore, reliability),
      estimatedCost,
      estimatedLatency,
      qualityScore,
      reasoningScore,
      reliability,
    }
  }

  /**
   * Calculate quality score based on provider capabilities
   */
  private calculateQualityScore(provider: string, task: TaskAnalysis, model: string): number {
    let score = 0.5 // Base score

    // Provider-specific quality ratings for biology education
    switch (provider) {
      case 'anthropic':
        score = 0.95 // Claude excels at reasoning and education
        if (task.domain === 'biology') score += 0.05
        if (task.requiresReasoning) score += 0.05
        if (task.questionType === 'analytical') score += 0.05
        break

      case 'openai':
        score = 0.85 // Strong general capabilities
        if (task.requiresVision) score += 0.1
        if (task.questionType === 'problem-solving') score += 0.05
        if (model.includes('o1')) score += 0.15 // O1 reasoning boost
        break

      case 'google':
        score = 0.8 // Good for factual and fast responses
        if (task.questionType === 'factual') score += 0.1
        if (task.complexity === 'low') score += 0.05
        if (task.maxLatency < 1000) score += 0.1 // Very fast
        break
    }

    // Adjust for complexity
    if (task.complexity === 'high' && provider === 'anthropic') score += 0.05
    if (task.complexity === 'low' && provider === 'google') score += 0.05

    return Math.min(1, score)
  }

  /**
   * Calculate cost efficiency score
   */
  private calculateCostScore(provider: string, task: TaskAnalysis, model: string): number {
    const estimatedCost = aiConfig.estimateCost(
      provider,
      task.estimatedTokens * 0.3,
      task.estimatedTokens * 0.7,
      model
    )

    // Normalize cost score (lower cost = higher score)
    const maxExpectedCost = 0.1 // $0.10 as reference point
    return Math.max(0, 1 - estimatedCost / maxExpectedCost)
  }

  /**
   * Calculate speed score based on expected latency
   */
  private calculateSpeedScore(provider: string, task: TaskAnalysis, model: string): number {
    const estimatedLatency = this.estimateLatency(provider, task)

    // Normalize speed score (lower latency = higher score)
    const maxAcceptableLatency = 10000 // 10 seconds
    return Math.max(0, 1 - estimatedLatency / maxAcceptableLatency)
  }

  /**
   * Calculate reasoning capability score
   */
  private calculateReasoningScore(provider: string, task: TaskAnalysis): number {
    if (!task.requiresReasoning) return 0.5

    const reasoningCapabilities = {
      anthropic: 0.95, // Claude excels at reasoning
      openai: 0.9, // O1 models are strong
      google: 0.8, // Good but not specialized
    }

    return reasoningCapabilities[provider as keyof typeof reasoningCapabilities] || 0.5
  }

  /**
   * Analyze complexity from prompt content
   */
  private analyzeComplexity(prompt: string): 'low' | 'medium' | 'high' {
    const promptLower = prompt.toLowerCase()

    // High complexity indicators
    const highComplexityPatterns = [
      /analyze.*relationship/i,
      /compare.*contrast/i,
      /evaluate.*evidence/i,
      /explain.*mechanism/i,
      /derive.*formula/i,
      /prove.*theorem/i,
      /multi.*step/i,
      /complex.*process/i,
    ]

    // Low complexity indicators
    const lowComplexityPatterns = [
      /what is/i,
      /define/i,
      /list/i,
      /name/i,
      /simple.*question/i,
      /true.*false/i,
      /fill.*blank/i,
    ]

    if (highComplexityPatterns.some((pattern) => pattern.test(promptLower))) {
      return 'high'
    }

    if (lowComplexityPatterns.some((pattern) => pattern.test(promptLower))) {
      return 'low'
    }

    // Check length as additional factor
    if (prompt.length > 500) return 'high'
    if (prompt.length < 100) return 'low'

    return 'medium'
  }

  /**
   * Determine question type from prompt
   */
  private determineQuestionType(prompt: string): TaskAnalysis['questionType'] {
    const promptLower = prompt.toLowerCase()

    if (/what|when|where|who|define|list/i.test(promptLower)) {
      return 'factual'
    }

    if (/explain|describe|how.*work|mechanism/i.test(promptLower)) {
      return 'conceptual'
    }

    if (/analyze|compare|evaluate|assess|critique/i.test(promptLower)) {
      return 'analytical'
    }

    if (/solve|calculate|find.*solution|problem/i.test(promptLower)) {
      return 'problem-solving'
    }

    if (/create|design|imagine|write.*story/i.test(promptLower)) {
      return 'creative'
    }

    return 'conceptual' // Default
  }

  /**
   * Identify domain from prompt content
   */
  private identifyDomain(prompt: string): TaskAnalysis['domain'] {
    const promptLower = prompt.toLowerCase()

    const biologyTerms = [
      'cell',
      'dna',
      'protein',
      'enzyme',
      'photosynthesis',
      'respiration',
      'genetics',
      'evolution',
      'ecology',
      'anatomy',
      'physiology',
      'organism',
      'membrane',
      'mitochondria',
      'chloroplast',
      'nucleus',
      'chromosome',
    ]

    const chemistryTerms = [
      'molecule',
      'atom',
      'reaction',
      'bond',
      'compound',
      'element',
      'acid',
      'base',
      'ph',
      'oxidation',
      'reduction',
      'catalyst',
    ]

    const physicsTerms = [
      'force',
      'energy',
      'motion',
      'wave',
      'light',
      'electricity',
      'magnetism',
      'quantum',
      'relativity',
      'thermodynamics',
    ]

    const neetTerms = ['neet', 'medical entrance', 'aiims', 'jipmer', 'ncert']

    if (neetTerms.some((term) => promptLower.includes(term))) {
      return 'neet-specific'
    }

    if (biologyTerms.some((term) => promptLower.includes(term))) {
      return 'biology'
    }

    if (chemistryTerms.some((term) => promptLower.includes(term))) {
      return 'chemistry'
    }

    if (physicsTerms.some((term) => promptLower.includes(term))) {
      return 'physics'
    }

    return 'general'
  }

  /**
   * Check if task requires reasoning
   */
  private requiresReasoning(prompt: string): boolean {
    const reasoningIndicators = [
      /why/i,
      /because/i,
      /reason/i,
      /cause/i,
      /effect/i,
      /relationship/i,
      /connection/i,
      /implication/i,
      /consequence/i,
      /step.*by.*step/i,
      /logical/i,
      /conclude/i,
      /infer/i,
      /deduce/i,
    ]

    return reasoningIndicators.some((pattern) => pattern.test(prompt))
  }

  /**
   * Check if task requires vision capabilities
   */
  private requiresVision(prompt: string): boolean {
    const visionIndicators = [
      /image/i,
      /picture/i,
      /diagram/i,
      /chart/i,
      /graph/i,
      /figure/i,
      /visual/i,
      /see.*image/i,
      /look.*at/i,
      /analyze.*photo/i,
    ]

    return visionIndicators.some((pattern) => pattern.test(prompt))
  }

  /**
   * Estimate token usage
   */
  private estimateTokens(prompt: string, complexity: 'low' | 'medium' | 'high'): number {
    const inputTokens = Math.ceil(prompt.split(' ').length * 1.3)

    const responseMultipliers = {
      low: 1.5,
      medium: 2.5,
      high: 4.0,
    }

    return Math.ceil(inputTokens + inputTokens * responseMultipliers[complexity])
  }

  /**
   * Determine priority from context
   */
  private determinePriority(context?: any): TaskAnalysis['priority'] {
    if (context?.urgent || context?.deadline) return 'critical'
    if (context?.important) return 'high'
    if (context?.practice) return 'low'
    return 'medium'
  }

  /**
   * Get max latency based on priority
   */
  private getMaxLatency(priority: TaskAnalysis['priority']): number {
    const latencyLimits = {
      critical: 2000, // 2 seconds
      high: 5000, // 5 seconds
      medium: 10000, // 10 seconds
      low: 15000, // 15 seconds
    }

    return latencyLimits[priority]
  }

  /**
   * Estimate latency for provider
   */
  private estimateLatency(provider: string, task: TaskAnalysis): number {
    // Base latencies (milliseconds)
    const baseTimes = {
      google: 800, // Fastest
      openai: 2000, // Medium
      anthropic: 3000, // Slower but higher quality
    }

    let estimatedTime = baseTimes[provider as keyof typeof baseTimes] || 3000

    // Adjust for complexity
    const complexityMultipliers = {
      low: 0.7,
      medium: 1.0,
      high: 1.8,
    }

    estimatedTime *= complexityMultipliers[task.complexity]

    // Adjust for reasoning requirements
    if (task.requiresReasoning) {
      estimatedTime *= 1.5
    }

    return estimatedTime
  }

  /**
   * Get reliability score for provider
   */
  private getReliabilityScore(provider: string): number {
    const score = this.reliabilityScores.get(provider)
    if (score !== undefined) return score

    // Default reliability scores
    const defaultScores = {
      anthropic: 0.95,
      openai: 0.9,
      google: 0.85,
    }

    return defaultScores[provider as keyof typeof defaultScores] || 0.8
  }

  /**
   * Calculate confidence in the selection
   */
  private calculateConfidence(qualityScore: number, reliability: number): number {
    return (qualityScore + reliability) / 2
  }

  /**
   * Update provider performance metrics
   */
  updatePerformance(
    provider: string,
    metrics: {
      latency: number
      cost: number
      success: boolean
      quality?: number
    }
  ): void {
    // Update latency history
    const latencyHistory = this.performanceHistory.get(`${provider}_latency`) || []
    latencyHistory.push(metrics.latency)
    if (latencyHistory.length > 100) latencyHistory.shift() // Keep last 100
    this.performanceHistory.set(`${provider}_latency`, latencyHistory)

    // Update cost history
    const costHistory = this.costHistory.get(provider) || []
    costHistory.push(metrics.cost)
    if (costHistory.length > 100) costHistory.shift()
    this.costHistory.set(provider, costHistory)

    // Update reliability score
    const currentReliability = this.reliabilityScores.get(provider) || 0.8
    const successFactor = metrics.success ? 0.01 : -0.05
    const newReliability = Math.max(0.1, Math.min(1.0, currentReliability + successFactor))
    this.reliabilityScores.set(provider, newReliability)
  }

  /**
   * Get performance analytics
   */
  getAnalytics(): {
    providerPerformance: Record<
      string,
      {
        avgLatency: number
        avgCost: number
        reliability: number
        requestCount: number
      }
    >
    recommendations: string[]
  } {
    const analytics: {
      providerPerformance: Record<
        string,
        {
          avgLatency: number
          avgCost: number
          reliability: number
          requestCount: number
        }
      >
      recommendations: string[]
    } = { providerPerformance: {}, recommendations: [] }

    for (const provider of aiConfig.getAvailableProviders()) {
      const latencyHistory = this.performanceHistory.get(`${provider}_latency`) || []
      const costHistory = this.costHistory.get(provider) || []

      analytics.providerPerformance[provider] = {
        avgLatency:
          latencyHistory.length > 0
            ? latencyHistory.reduce((a, b) => a + b, 0) / latencyHistory.length
            : 0,
        avgCost:
          costHistory.length > 0 ? costHistory.reduce((a, b) => a + b, 0) / costHistory.length : 0,
        reliability: this.reliabilityScores.get(provider) || 0.8,
        requestCount: latencyHistory.length,
      }
    }

    // Generate recommendations
    const recommendations = []

    // Find most cost-effective provider
    let minCostProvider = ''
    let minCost = Infinity
    for (const [provider, metrics] of Object.entries(analytics.providerPerformance)) {
      if (metrics.avgCost > 0 && metrics.avgCost < minCost) {
        minCost = metrics.avgCost
        minCostProvider = provider
      }
    }

    if (minCostProvider) {
      recommendations.push(
        `Use ${minCostProvider} for cost optimization (avg: $${minCost.toFixed(4)})`
      )
    }

    analytics.recommendations = recommendations
    return analytics
  }

  /**
   * Initialize performance tracking
   */
  private initializePerformanceTracking(): void {
    // Set default reliability scores
    this.reliabilityScores.set('anthropic', 0.95)
    this.reliabilityScores.set('openai', 0.9)
    this.reliabilityScores.set('google', 0.85)
  }
}

// Export singleton instance
export const smartProviderSelector = new SmartProviderSelector()
