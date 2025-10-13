/**
 * Token Optimization Engine for AI Cost Reduction
 * Intelligent prompt optimization and token usage minimization
 * Specialized for educational content and biology topics
 */

interface OptimizationResult {
  originalPrompt: string
  optimizedPrompt: string
  originalTokenCount: number
  optimizedTokenCount: number
  tokenSavings: number
  costSavings: number
  optimizationTechniques: string[]
  qualityScore: number
  recommendations: string[]
}

interface TokenAnalysis {
  totalTokens: number
  promptTokens: number
  responseTokens: number
  efficiency: {
    promptEfficiency: number // Useful tokens / Total tokens
    responseRelevance: number // Relevant content / Total response
    overallEfficiency: number
  }
  wastageAreas: string[]
  optimizationOpportunities: string[]
}

export class TokenOptimizer {
  private static instance: TokenOptimizer

  // Biology-specific optimization patterns
  private biologyTermOptimizations = new Map([
    ['deoxyribonucleic acid', 'DNA'],
    ['ribonucleic acid', 'RNA'],
    ['adenosine triphosphate', 'ATP'],
    ['adenosine diphosphate', 'ADP'],
    ['nicotinamide adenine dinucleotide', 'NAD'],
    ['nicotinamide adenine dinucleotide phosphate', 'NADP'],
    ['photosynthesis process', 'photosynthesis'],
    ['cellular respiration process', 'cellular respiration'],
    ['mitochondrial membrane', 'mitochondrial membrane'],
    ['endoplasmic reticulum', 'ER']
  ])

  // Common educational prompt optimizations
  private educationalOptimizations = new Map([
    ['can you please explain', 'explain'],
    ['could you help me understand', 'explain'],
    ['i would like to know about', 'about'],
    ['what is the difference between', 'compare'],
    ['what are the similarities and differences', 'compare'],
    ['provide a detailed explanation of', 'explain'],
    ['give me an overview of', 'overview:'],
    ['tell me about', 'about'],
    ['describe in detail', 'describe'],
    ['what is the significance of', 'significance:']
  ])

  // Token-expensive patterns to optimize
  private expensivePatterns = [
    /please\s+/gi,
    /can\s+you\s+/gi,
    /could\s+you\s+/gi,
    /would\s+you\s+/gi,
    /i\s+would\s+like\s+to\s+know\s+/gi,
    /i\s+need\s+help\s+with\s+/gi,
    /help\s+me\s+understand\s+/gi
  ]

  // Essential biology context that should be preserved
  private essentialContext = [
    'NEET', 'NCERT', 'Class 11', 'Class 12',
    'medical entrance', 'biology exam',
    'molecular level', 'cellular level',
    'organism level', 'ecosystem level'
  ]

  private optimizationStats = {
    totalOptimizations: 0,
    totalTokensSaved: 0,
    totalCostSaved: 0,
    averageTokenReduction: 0
  }

  constructor() {
    console.log('🔧 Token Optimizer initialized')
  }

  static getInstance(): TokenOptimizer {
    if (!TokenOptimizer.instance) {
      TokenOptimizer.instance = new TokenOptimizer()
    }
    return TokenOptimizer.instance
  }

  /**
   * Optimize prompt for minimum token usage while preserving meaning
   */
  optimizePrompt(
    prompt: string,
    context?: {
      subject?: string
      level?: string
      priority?: 'low' | 'medium' | 'high' | 'critical'
      maxTokenReduction?: number
      preserveEducationalContext?: boolean
    }
  ): OptimizationResult {
    const originalTokenCount = this.estimateTokenCount(prompt)
    let optimizedPrompt = prompt
    const appliedTechniques: string[] = []

    // Apply optimization techniques in order of impact
    optimizedPrompt = this.removeRedundantPhrases(optimizedPrompt, appliedTechniques)
    optimizedPrompt = this.optimizeBiologyTerminology(optimizedPrompt, appliedTechniques)
    optimizedPrompt = this.compressEducationalPhrases(optimizedPrompt, appliedTechniques)
    optimizedPrompt = this.optimizeQuestionStructure(optimizedPrompt, appliedTechniques)
    optimizedPrompt = this.removeFillerWords(optimizedPrompt, appliedTechniques)

    // Preserve essential context if required
    if (context?.preserveEducationalContext !== false) {
      optimizedPrompt = this.preserveEssentialContext(prompt, optimizedPrompt, appliedTechniques)
    }

    // Apply aggressive optimization for low priority requests
    if (context?.priority === 'low') {
      optimizedPrompt = this.applyAggressiveOptimization(optimizedPrompt, appliedTechniques)
    }

    const optimizedTokenCount = this.estimateTokenCount(optimizedPrompt)
    const tokenSavings = originalTokenCount - optimizedTokenCount
    const costSavings = this.calculateCostSavings(tokenSavings)

    // Update statistics
    this.updateOptimizationStats(tokenSavings, costSavings)

    const result: OptimizationResult = {
      originalPrompt: prompt,
      optimizedPrompt,
      originalTokenCount,
      optimizedTokenCount,
      tokenSavings,
      costSavings,
      optimizationTechniques: appliedTechniques,
      qualityScore: this.calculateQualityScore(prompt, optimizedPrompt),
      recommendations: this.generateRecommendations(prompt, optimizedPrompt, context)
    }

    console.log('🔧 Prompt optimized:', {
      tokenReduction: `${tokenSavings} tokens (${((tokenSavings / originalTokenCount) * 100).toFixed(1)}%)`,
      costSavings: `$${costSavings.toFixed(4)}`,
      techniques: appliedTechniques.length,
      quality: `${(result.qualityScore * 100).toFixed(1)}%`
    })

    return result
  }

  /**
   * Remove redundant phrases and unnecessary words
   */
  private removeRedundantPhrases(prompt: string, techniques: string[]): string {
    let optimized = prompt

    // Remove common redundant phrases
    for (const [verbose, concise] of this.educationalOptimizations) {
      const regex = new RegExp(verbose.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')
      if (regex.test(optimized)) {
        optimized = optimized.replace(regex, concise)
        techniques.push(`Replaced "${verbose}" with "${concise}"`)
      }
    }

    // Remove expensive patterns
    this.expensivePatterns.forEach((pattern, index) => {
      if (pattern.test(optimized)) {
        optimized = optimized.replace(pattern, '')
        techniques.push(`Removed expensive pattern ${index + 1}`)
      }
    })

    return optimized.trim()
  }

  /**
   * Optimize biology-specific terminology
   */
  private optimizeBiologyTerminology(prompt: string, techniques: string[]): string {
    let optimized = prompt

    for (const [fullTerm, abbreviation] of this.biologyTermOptimizations) {
      const regex = new RegExp(fullTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')
      if (regex.test(optimized)) {
        optimized = optimized.replace(regex, abbreviation)
        techniques.push(`Abbreviated "${fullTerm}" to "${abbreviation}"`)
      }
    }

    return optimized
  }

  /**
   * Compress educational phrases while preserving meaning
   */
  private compressEducationalPhrases(prompt: string, techniques: string[]): string {
    let optimized = prompt

    // Educational phrase compressions
    const compressions = [
      { from: /explain\s+the\s+process\s+of\s+/gi, to: 'explain ', description: 'Simplified process explanation' },
      { from: /what\s+is\s+the\s+function\s+of\s+/gi, to: 'function of ', description: 'Compressed function query' },
      { from: /how\s+does\s+the\s+process\s+of\s+/gi, to: 'how does ', description: 'Simplified process question' },
      { from: /in\s+the\s+context\s+of\s+biology\s+/gi, to: 'in biology ', description: 'Compressed biology context' },
      { from: /according\s+to\s+the\s+ncert\s+textbook\s+/gi, to: 'per NCERT ', description: 'Compressed NCERT reference' },
      { from: /for\s+the\s+neet\s+examination\s+/gi, to: 'for NEET ', description: 'Compressed NEET context' },
      { from: /at\s+the\s+molecular\s+level\s+/gi, to: 'molecularly ', description: 'Compressed molecular level' },
      { from: /at\s+the\s+cellular\s+level\s+/gi, to: 'cellularly ', description: 'Compressed cellular level' }
    ]

    compressions.forEach(compression => {
      if (compression.from.test(optimized)) {
        optimized = optimized.replace(compression.from, compression.to)
        techniques.push(compression.description)
      }
    })

    return optimized
  }

  /**
   * Optimize question structure for efficiency
   */
  private optimizeQuestionStructure(prompt: string, techniques: string[]): string {
    let optimized = prompt

    // Question structure optimizations
    if (optimized.includes('What is') && optimized.includes('and how does it')) {
      optimized = optimized.replace(/what\s+is\s+(.+?)\s+and\s+how\s+does\s+it\s+/gi, 'Define $1 and its ')
      techniques.push('Optimized definition + function question structure')
    }

    if (optimized.includes('compare') && optimized.includes('contrast')) {
      optimized = optimized.replace(/compare\s+and\s+contrast\s+/gi, 'compare ')
      techniques.push('Simplified compare/contrast to compare')
    }

    if (optimized.includes('similarities') && optimized.includes('differences')) {
      optimized = optimized.replace(/similarities\s+and\s+differences\s+between\s+/gi, 'compare ')
      techniques.push('Compressed similarities/differences to compare')
    }

    return optimized
  }

  /**
   * Remove filler words and unnecessary articles
   */
  private removeFillerWords(prompt: string, techniques: string[]): string {
    let optimized = prompt

    const fillerWords = [
      /\s+basically\s+/gi,
      /\s+actually\s+/gi,
      /\s+really\s+/gi,
      /\s+quite\s+/gi,
      /\s+very\s+much\s+/gi,
      /\s+kind\s+of\s+/gi,
      /\s+sort\s+of\s+/gi
    ]

    fillerWords.forEach((filler, index) => {
      if (filler.test(optimized)) {
        optimized = optimized.replace(filler, ' ')
        techniques.push(`Removed filler word pattern ${index + 1}`)
      }
    })

    // Clean up extra spaces
    optimized = optimized.replace(/\s+/g, ' ').trim()

    return optimized
  }

  /**
   * Preserve essential educational context
   */
  private preserveEssentialContext(originalPrompt: string, optimizedPrompt: string, techniques: string[]): string {
    let preserved = optimizedPrompt

    this.essentialContext.forEach(context => {
      const contextRegex = new RegExp(context, 'gi')
      if (contextRegex.test(originalPrompt) && !contextRegex.test(preserved)) {
        preserved = `${context}: ${preserved}`
        techniques.push(`Preserved essential context: ${context}`)
      }
    })

    return preserved
  }

  /**
   * Apply aggressive optimization for low priority requests
   */
  private applyAggressiveOptimization(prompt: string, techniques: string[]): string {
    let optimized = prompt

    // Remove all examples requests
    if (optimized.includes('example') || optimized.includes('examples')) {
      optimized = optimized.replace(/\s*with\s+examples?\s*/gi, '')
      optimized = optimized.replace(/\s*give\s+examples?\s*/gi, '')
      techniques.push('Removed example requests for cost savings')
    }

    // Compress detailed explanations
    optimized = optimized.replace(/detailed\s+explanation\s+of\s+/gi, '')
    optimized = optimized.replace(/comprehensive\s+overview\s+of\s+/gi, '')
    optimized = optimized.replace(/step\s+by\s+step\s+/gi, '')

    if (optimized !== prompt) {
      techniques.push('Applied aggressive optimization for low priority')
    }

    return optimized
  }

  /**
   * Analyze token usage patterns
   */
  analyzeTokenUsage(
    prompt: string,
    response: string,
    metadata?: {
      provider?: string
      model?: string
      actualTokens?: { input: number; output: number }
    }
  ): TokenAnalysis {
    const promptTokens = metadata?.actualTokens?.input || this.estimateTokenCount(prompt)
    const responseTokens = metadata?.actualTokens?.output || this.estimateTokenCount(response)
    const totalTokens = promptTokens + responseTokens

    // Analyze prompt efficiency
    const promptEfficiency = this.calculatePromptEfficiency(prompt)

    // Analyze response relevance
    const responseRelevance = this.calculateResponseRelevance(prompt, response)

    // Overall efficiency
    const overallEfficiency = (promptEfficiency + responseRelevance) / 2

    // Identify wastage areas
    const wastageAreas = this.identifyWastageAreas(prompt, response)

    // Identify optimization opportunities
    const optimizationOpportunities = this.identifyOptimizationOpportunities(prompt, response)

    return {
      totalTokens,
      promptTokens,
      responseTokens,
      efficiency: {
        promptEfficiency,
        responseRelevance,
        overallEfficiency
      },
      wastageAreas,
      optimizationOpportunities
    }
  }

  /**
   * Calculate prompt efficiency (useful content vs total tokens)
   */
  private calculatePromptEfficiency(prompt: string): number {
    let efficiency = 0.5 // Base efficiency

    // Penalty for redundant phrases
    this.educationalOptimizations.forEach(([verbose, _]) => {
      if (prompt.toLowerCase().includes(verbose)) {
        efficiency -= 0.05
      }
    })

    // Penalty for filler words
    const fillerCount = (prompt.match(/\s+(very|really|quite|actually|basically)\s+/gi) || []).length
    efficiency -= fillerCount * 0.02

    // Bonus for concise biology terms
    this.biologyTermOptimizations.forEach(([_, abbreviation]) => {
      if (prompt.includes(abbreviation)) {
        efficiency += 0.03
      }
    })

    // Bonus for direct questions
    if (prompt.startsWith('Explain') || prompt.startsWith('Define') || prompt.startsWith('Compare')) {
      efficiency += 0.1
    }

    return Math.max(0, Math.min(1, efficiency))
  }

  /**
   * Calculate response relevance
   */
  private calculateResponseRelevance(prompt: string, response: string): number {
    // Basic relevance calculation based on keyword overlap
    const promptKeywords = this.extractKeywords(prompt)
    const responseKeywords = this.extractKeywords(response)

    const overlap = promptKeywords.filter(keyword =>
      responseKeywords.some(rKeyword => rKeyword.includes(keyword) || keyword.includes(rKeyword))
    )

    const relevance = overlap.length / Math.max(promptKeywords.length, 1)

    // Bonus for biology-specific terms in response
    let biologyBonus = 0
    this.biologyTermOptimizations.forEach(([fullTerm, abbreviation]) => {
      if (response.includes(fullTerm) || response.includes(abbreviation)) {
        biologyBonus += 0.05
      }
    })

    return Math.min(1, relevance + biologyBonus)
  }

  /**
   * Extract keywords from text
   */
  private extractKeywords(text: string): string[] {
    const words = text.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 3)

    // Filter out common stop words
    const stopWords = ['that', 'this', 'with', 'from', 'they', 'them', 'their', 'there', 'then', 'than']
    return words.filter(word => !stopWords.includes(word))
  }

  /**
   * Identify token wastage areas
   */
  private identifyWastageAreas(prompt: string, response: string): string[] {
    const wastage = []

    // Check for verbose phrases in prompt
    this.educationalOptimizations.forEach(([verbose, concise]) => {
      if (prompt.toLowerCase().includes(verbose)) {
        wastage.push(`Verbose phrase: "${verbose}" could be "${concise}"`)
      }
    })

    // Check for repeated information
    const promptWords = prompt.toLowerCase().split(/\s+/)
    const duplicates = promptWords.filter((word, index) =>
      promptWords.indexOf(word) !== index && word.length > 4
    )

    if (duplicates.length > 0) {
      wastage.push(`Repeated words in prompt: ${duplicates.slice(0, 3).join(', ')}`)
    }

    // Check response length vs content quality
    const responseTokens = this.estimateTokenCount(response)
    const responseQuality = this.calculateResponseRelevance(prompt, response)

    if (responseTokens > 500 && responseQuality < 0.7) {
      wastage.push('Response is lengthy but may contain irrelevant content')
    }

    return wastage
  }

  /**
   * Identify optimization opportunities
   */
  private identifyOptimizationOpportunities(prompt: string, response: string): string[] {
    const opportunities = []

    // Check for biology term optimization opportunities
    this.biologyTermOptimizations.forEach(([fullTerm, abbreviation]) => {
      if (prompt.includes(fullTerm)) {
        opportunities.push(`Use "${abbreviation}" instead of "${fullTerm}"`)
      }
    })

    // Check for prompt structure optimization
    if (prompt.includes('What is') && prompt.includes('and how')) {
      opportunities.push('Combine definition and function questions for efficiency')
    }

    // Check for batching opportunities
    if (prompt.includes('explain') && prompt.length < 100) {
      opportunities.push('Consider batching similar explanation requests')
    }

    // Check for caching opportunities
    const promptKeywords = this.extractKeywords(prompt)
    const commonBiologyTopics = ['photosynthesis', 'respiration', 'mitosis', 'meiosis', 'dna', 'rna']

    if (promptKeywords.some(keyword => commonBiologyTopics.includes(keyword))) {
      opportunities.push('Common biology topic - ideal for caching')
    }

    return opportunities
  }

  /**
   * Estimate token count for text
   */
  private estimateTokenCount(text: string): number {
    // Enhanced estimation for biology content
    const words = text.split(/\s+/).length
    const characters = text.length

    // Base estimation: ~1.3 tokens per word
    let tokens = Math.ceil(words * 1.3)

    // Adjust for scientific terminology (tends to be more tokens)
    const scientificTerms = (text.match(/\b[A-Z]{2,}\b/g) || []).length // Acronyms like DNA, RNA
    tokens += scientificTerms * 0.5

    // Adjust for technical words (longer words tend to be more tokens)
    const longWords = text.match(/\b\w{8,}\b/g) || []
    tokens += longWords.length * 0.3

    return Math.ceil(tokens)
  }

  /**
   * Calculate cost savings from token reduction
   */
  private calculateCostSavings(tokenSavings: number): number {
    // Average cost per token across providers (weighted by usage)
    const averageCostPerToken = 0.00001 // $0.01 per 1K tokens average

    return tokenSavings * averageCostPerToken
  }

  /**
   * Calculate quality score (how well optimization preserves meaning)
   */
  private calculateQualityScore(original: string, optimized: string): number {
    // Simple quality score based on preservation of key elements
    let quality = 1.0

    // Check if essential keywords are preserved
    const originalKeywords = this.extractKeywords(original)
    const optimizedKeywords = this.extractKeywords(optimized)

    const preservedKeywords = originalKeywords.filter(keyword =>
      optimizedKeywords.some(oKeyword => oKeyword.includes(keyword) || keyword.includes(oKeyword))
    )

    const keywordPreservation = preservedKeywords.length / Math.max(originalKeywords.length, 1)
    quality *= keywordPreservation

    // Check if essential context is preserved
    this.essentialContext.forEach(context => {
      const contextRegex = new RegExp(context, 'gi')
      if (contextRegex.test(original) && !contextRegex.test(optimized)) {
        quality *= 0.9 // 10% penalty for lost context
      }
    })

    // Penalty for over-optimization
    const reductionRatio = optimized.length / original.length
    if (reductionRatio < 0.3) {
      quality *= 0.8 // Penalty for aggressive reduction
    }

    return Math.max(0, Math.min(1, quality))
  }

  /**
   * Generate optimization recommendations
   */
  private generateRecommendations(
    original: string,
    optimized: string,
    context?: any
  ): string[] {
    const recommendations = []

    const tokenReduction = this.estimateTokenCount(original) - this.estimateTokenCount(optimized)
    const reductionPercentage = (tokenReduction / this.estimateTokenCount(original)) * 100

    if (reductionPercentage > 30) {
      recommendations.push('Excellent optimization achieved - consider applying similar patterns to future prompts')
    } else if (reductionPercentage > 15) {
      recommendations.push('Good optimization - monitor response quality for further improvements')
    } else if (reductionPercentage < 5) {
      recommendations.push('Limited optimization possible - prompt is already efficient')
    }

    // Context-specific recommendations
    if (context?.priority === 'low') {
      recommendations.push('For low priority requests, consider more aggressive optimization')
    }

    if (original.includes('example') || original.includes('examples')) {
      recommendations.push('Consider caching common examples to reduce repeated generation costs')
    }

    return recommendations
  }

  /**
   * Update optimization statistics
   */
  private updateOptimizationStats(tokenSavings: number, costSavings: number): void {
    this.optimizationStats.totalOptimizations++
    this.optimizationStats.totalTokensSaved += tokenSavings
    this.optimizationStats.totalCostSaved += costSavings

    this.optimizationStats.averageTokenReduction =
      this.optimizationStats.totalTokensSaved / this.optimizationStats.totalOptimizations
  }

  /**
   * Get optimization statistics
   */
  getOptimizationStats(): {
    totalOptimizations: number
    totalTokensSaved: number
    totalCostSaved: number
    averageTokenReduction: number
    estimatedMonthlySavings: number
  } {
    return {
      ...this.optimizationStats,
      estimatedMonthlySavings: this.optimizationStats.totalCostSaved * 30 // Rough monthly estimate
    }
  }

  /**
   * Optimize multiple prompts in batch
   */
  optimizeBatch(prompts: Array<{
    prompt: string
    context?: any
  }>): OptimizationResult[] {
    console.log(`🔧 Optimizing batch of ${prompts.length} prompts...`)

    const results = prompts.map(({ prompt, context }) =>
      this.optimizePrompt(prompt, context)
    )

    const totalTokenSavings = results.reduce((sum, result) => sum + result.tokenSavings, 0)
    const totalCostSavings = results.reduce((sum, result) => sum + result.costSavings, 0)

    console.log(`✅ Batch optimization complete:`, {
      prompts: results.length,
      totalTokenSavings,
      totalCostSavings: `$${totalCostSavings.toFixed(4)}`,
      averageReduction: `${(totalTokenSavings / results.length).toFixed(1)} tokens`
    })

    return results
  }

  /**
   * Get optimization report
   */
  getOptimizationReport(): any {
    const stats = this.getOptimizationStats()

    return {
      stats,
      topOptimizationTechniques: this.getTopOptimizationTechniques(),
      biologySpecificOptimizations: Array.from(this.biologyTermOptimizations.entries()),
      educationalOptimizations: Array.from(this.educationalOptimizations.entries()),
      recommendations: this.generateOverallRecommendations(stats)
    }
  }

  /**
   * Get top optimization techniques
   */
  private getTopOptimizationTechniques(): Array<{ technique: string; impact: string }> {
    return [
      { technique: 'Biology term abbreviation', impact: 'High - 20-30% token reduction' },
      { technique: 'Educational phrase compression', impact: 'Medium - 10-20% token reduction' },
      { technique: 'Redundant phrase removal', impact: 'Medium - 15-25% token reduction' },
      { technique: 'Question structure optimization', impact: 'Low-Medium - 5-15% token reduction' },
      { technique: 'Filler word removal', impact: 'Low - 2-8% token reduction' }
    ]
  }

  /**
   * Generate overall recommendations
   */
  private generateOverallRecommendations(stats: any): string[] {
    const recommendations = []

    if (stats.averageTokenReduction > 50) {
      recommendations.push('Excellent optimization performance - maintain current strategies')
    } else if (stats.averageTokenReduction > 20) {
      recommendations.push('Good optimization - consider more aggressive techniques for low-priority requests')
    } else {
      recommendations.push('Optimization potential exists - review and apply more techniques')
    }

    if (stats.totalCostSaved > 10) {
      recommendations.push('Significant cost savings achieved - scale optimization across all requests')
    }

    recommendations.push('Consider implementing automatic prompt optimization for recurring patterns')
    recommendations.push('Monitor response quality to ensure optimization doesn\'t impact educational value')

    return recommendations
  }
}

// Export singleton instance
export const tokenOptimizer = TokenOptimizer.getInstance()

export default TokenOptimizer