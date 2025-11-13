/**
 * Quality Assurance Pipeline
 * Automated scoring, content validation, and quality monitoring for AI-generated responses
 */

import { TaskAnalysis } from './SmartProviderSelector'

interface QualityMetrics {
  accuracy: number // 0-1, factual correctness
  relevance: number // 0-1, relevance to question
  clarity: number // 0-1, readability and structure
  completeness: number // 0-1, thoroughness of answer
  educationalValue: number // 0-1, learning effectiveness
  biologySpecific: number // 0-1, biology domain accuracy
  neetAlignment: number // 0-1, NEET exam relevance
  safety: number // 0-1, content safety score
}

interface QualityReport {
  overallScore: number
  metrics: QualityMetrics
  confidence: number
  flags: QualityFlag[]
  recommendations: string[]
  passesThreshold: boolean
  processingTime: number
}

interface QualityFlag {
  type: 'error' | 'warning' | 'info'
  category: 'accuracy' | 'safety' | 'relevance' | 'structure' | 'domain'
  message: string
  severity: number // 0-1
  suggestion?: string
}

interface ValidationContext {
  prompt: string
  response: string
  taskAnalysis: TaskAnalysis
  provider: string
  model: string
  studentLevel: string
  subject: string
}

export class QualityAssurancePipeline {
  private qualityThreshold = 0.7
  private biologyConcepts = new Map<string, string[]>()
  private neetTopics = new Set<string>()
  private unsafePatterns: RegExp[] = []

  constructor() {
    this.initializeBiologyKnowledge()
    this.initializeNEETTopics()
    this.initializeSafetyPatterns()
  }

  /**
   * Main quality assessment method
   */
  async assessQuality(context: ValidationContext): Promise<QualityReport> {
    const startTime = Date.now()

    try {
      // Run all quality checks in parallel for speed
      const [
        accuracyScore,
        relevanceScore,
        clarityScore,
        completenessScore,
        educationalScore,
        biologyScore,
        neetScore,
        safetyScore,
      ] = await Promise.all([
        this.assessAccuracy(context),
        this.assessRelevance(context),
        this.assessClarity(context),
        this.assessCompleteness(context),
        this.assessEducationalValue(context),
        this.assessBiologySpecificity(context),
        this.assessNEETAlignment(context),
        this.assessSafety(context),
      ])

      const metrics: QualityMetrics = {
        accuracy: accuracyScore,
        relevance: relevanceScore,
        clarity: clarityScore,
        completeness: completenessScore,
        educationalValue: educationalScore,
        biologySpecific: biologyScore,
        neetAlignment: neetScore,
        safety: safetyScore,
      }

      // Calculate weighted overall score
      const overallScore = this.calculateOverallScore(metrics, context.taskAnalysis)

      // Generate flags and recommendations
      const flags = this.generateFlags(metrics, context)
      const recommendations = this.generateRecommendations(metrics, flags)

      // Calculate confidence based on consistency of metrics
      const confidence = this.calculateConfidence(metrics)

      const report: QualityReport = {
        overallScore,
        metrics,
        confidence,
        flags,
        recommendations,
        passesThreshold: overallScore >= this.qualityThreshold,
        processingTime: Date.now() - startTime,
      }

      console.log(
        `QA Assessment completed: ${overallScore.toFixed(2)} (${report.processingTime}ms)`
      )
      return report
    } catch (error) {
      console.error('Quality assessment failed:', error)
      return this.createFailureReport(Date.now() - startTime)
    }
  }

  /**
   * Assess factual accuracy
   */
  private async assessAccuracy(context: ValidationContext): Promise<number> {
    let score = 0.8 // Base score

    const response = context.response.toLowerCase()
    const prompt = context.prompt.toLowerCase()

    // Check for common biology misconceptions
    const misconceptions = [
      { pattern: /plants don't respire/i, penalty: -0.3 },
      { pattern: /photosynthesis only occurs.*day/i, penalty: -0.2 },
      { pattern: /humans have.*gills/i, penalty: -0.5 },
      { pattern: /dna.*rna.*same/i, penalty: -0.3 },
      { pattern: /all bacteria.*harmful/i, penalty: -0.2 },
    ]

    for (const misconception of misconceptions) {
      if (misconception.pattern.test(response)) {
        score += misconception.penalty
      }
    }

    // Check for factual consistency
    if (this.hasFactualInconsistencies(response)) {
      score -= 0.2
    }

    // Bonus for citing correct scientific principles
    const scientificPrinciples = [
      /conservation.*energy/i,
      /natural selection/i,
      /cell theory/i,
      /mendel.*laws/i,
      /darwin.*evolution/i,
    ]

    for (const principle of scientificPrinciples) {
      if (principle.test(response) && principle.test(prompt)) {
        score += 0.1
      }
    }

    return Math.max(0, Math.min(1, score))
  }

  /**
   * Assess relevance to the question
   */
  private async assessRelevance(context: ValidationContext): Promise<number> {
    const prompt = context.prompt.toLowerCase()
    const response = context.response.toLowerCase()

    // Extract key terms from prompt
    const promptTerms = this.extractKeyTerms(prompt)
    const responseTerms = this.extractKeyTerms(response)

    // Calculate term overlap
    const overlap = promptTerms.filter((term) => responseTerms.includes(term))
    const termRelevance = overlap.length / Math.max(promptTerms.length, 1)

    // Check if response directly addresses the question type
    const questionTypes = [
      { pattern: /what is/i, expectation: /definition|meaning|refers to/i },
      { pattern: /how does/i, expectation: /process|mechanism|works by/i },
      { pattern: /why/i, expectation: /because|reason|due to/i },
      { pattern: /compare/i, expectation: /difference|similar|unlike/i },
      { pattern: /explain/i, expectation: /description|explanation/i },
    ]

    let questionTypeScore = 0.5
    for (const type of questionTypes) {
      if (type.pattern.test(prompt)) {
        if (type.expectation.test(response)) {
          questionTypeScore = 1.0
        } else {
          questionTypeScore = 0.3
        }
        break
      }
    }

    // Weight the scores
    return termRelevance * 0.6 + questionTypeScore * 0.4
  }

  /**
   * Assess clarity and readability
   */
  private async assessClarity(context: ValidationContext): Promise<number> {
    const response = context.response
    let score = 0.5

    // Check sentence length (optimal: 15-25 words)
    const sentences = response.split(/[.!?]+/).filter((s) => s.trim().length > 0)
    const avgSentenceLength =
      sentences.reduce((sum, s) => sum + s.split(' ').length, 0) / sentences.length

    if (avgSentenceLength >= 15 && avgSentenceLength <= 25) {
      score += 0.2
    } else if (avgSentenceLength > 30) {
      score -= 0.1 // Too long
    }

    // Check for structure indicators
    const structureIndicators = [
      /first|second|third|finally/i,
      /\n\s*[-*•]\s/, // Bullet points
      /\n\s*\d+\./, // Numbered lists
      /step \d+/i,
      /in summary|in conclusion/i,
    ]

    let structureScore = 0
    for (const indicator of structureIndicators) {
      if (indicator.test(response)) {
        structureScore += 0.1
      }
    }

    score += Math.min(0.3, structureScore)

    // Penalize for excessive jargon without explanation
    const jargonTerms = [
      'mitochondria',
      'photosynthesis',
      'respiration',
      'chromosome',
      'enzyme',
      'protein',
      'genetics',
      'evolution',
    ]

    let unexplainedJargon = 0
    for (const term of jargonTerms) {
      if (response.toLowerCase().includes(term)) {
        // Check if term is explained
        const explanationPattern = new RegExp(`${term}.*(?:is|are|means|refers to|defined as)`, 'i')
        if (!explanationPattern.test(response)) {
          unexplainedJargon++
        }
      }
    }

    if (unexplainedJargon > 3) {
      score -= 0.2
    }

    return Math.max(0, Math.min(1, score))
  }

  /**
   * Assess completeness of the answer
   */
  private async assessCompleteness(context: ValidationContext): Promise<number> {
    const prompt = context.prompt.toLowerCase()
    const response = context.response

    let score = 0.5

    // Expected length based on question complexity
    const expectedLengths = {
      low: { min: 50, ideal: 150 },
      medium: { min: 100, ideal: 300 },
      high: { min: 200, ideal: 500 },
    }

    const complexity = context.taskAnalysis.complexity
    const expected = expectedLengths[complexity]
    const actualLength = response.length

    if (actualLength >= expected.min) {
      score += 0.2
      if (actualLength >= expected.ideal) {
        score += 0.1
      }
    } else {
      score -= 0.3 // Too short
    }

    // Check if multi-part questions are fully addressed
    if (prompt.includes(' and ') || prompt.includes(' or ')) {
      const parts = prompt.split(/ and | or /)
      let addressedParts = 0

      for (const part of parts) {
        const keyTerms = this.extractKeyTerms(part)
        const addressed = keyTerms.some((term) => response.toLowerCase().includes(term))
        if (addressed) addressedParts++
      }

      const completionRatio = addressedParts / parts.length
      score += (completionRatio - 0.5) * 0.4
    }

    // Bonus for examples and practical applications
    if (/example|for instance|such as/i.test(response)) {
      score += 0.1
    }

    return Math.max(0, Math.min(1, score))
  }

  /**
   * Assess educational value
   */
  private async assessEducationalValue(context: ValidationContext): Promise<number> {
    const response = context.response.toLowerCase()
    let score = 0.5

    // Learning indicators
    const learningIndicators = [
      { pattern: /remember that/i, value: 0.05 },
      { pattern: /key point|important|note that/i, value: 0.1 },
      { pattern: /let's think about|consider/i, value: 0.1 },
      { pattern: /this helps explain/i, value: 0.1 },
      { pattern: /in other words/i, value: 0.05 },
      { pattern: /analogy|like|similar to/i, value: 0.1 },
      { pattern: /practice|exercise/i, value: 0.1 },
    ]

    for (const indicator of learningIndicators) {
      if (indicator.pattern.test(response)) {
        score += indicator.value
      }
    }

    // Student level appropriateness
    const levelIndicators = {
      'class-9': { vocabulary: 'basic', concepts: 'introductory' },
      'class-10': { vocabulary: 'intermediate', concepts: 'foundational' },
      'class-11': { vocabulary: 'advanced', concepts: 'detailed' },
      'class-12': { vocabulary: 'sophisticated', concepts: 'comprehensive' },
      'neet-dropper': { vocabulary: 'expert', concepts: 'exam-focused' },
    }

    const studentLevel = context.studentLevel
    if (this.isAppropriateForLevel(response, studentLevel)) {
      score += 0.2
    }

    // Memory aids and mnemonics
    if (/mnemonic|remember.*acronym|trick to remember/i.test(response)) {
      score += 0.15
    }

    return Math.max(0, Math.min(1, score))
  }

  /**
   * Assess biology-specific accuracy
   */
  private async assessBiologySpecificity(context: ValidationContext): Promise<number> {
    if (context.subject !== 'biology') return 0.8 // Not applicable

    const response = context.response.toLowerCase()
    let score = 0.5

    // Check for proper use of biology terminology
    const biologyConcepts = Array.from(this.biologyConcepts.keys())
    let correctUsage = 0
    let totalUsage = 0

    for (const concept of biologyConcepts) {
      if (response.includes(concept)) {
        totalUsage++
        const relatedTerms = this.biologyConcepts.get(concept) || []

        // Check if concept is used with correct related terms
        const hasCorrectContext = relatedTerms.some((term) => response.includes(term.toLowerCase()))

        if (hasCorrectContext) {
          correctUsage++
        }
      }
    }

    if (totalUsage > 0) {
      score += (correctUsage / totalUsage) * 0.3
    }

    // Check for common biology errors
    const biologyErrors = [
      { pattern: /plants.*don't.*breathe/i, penalty: -0.3 },
      { pattern: /oxygen.*photosynthesis.*product/i, penalty: -0.2 },
      { pattern: /mitochondria.*plant.*only/i, penalty: -0.3 },
    ]

    for (const error of biologyErrors) {
      if (error.pattern.test(response)) {
        score += error.penalty
      }
    }

    return Math.max(0, Math.min(1, score))
  }

  /**
   * Assess NEET exam alignment
   */
  private async assessNEETAlignment(context: ValidationContext): Promise<number> {
    const response = context.response.toLowerCase()
    const prompt = context.prompt.toLowerCase()

    let score = 0.5

    // Check for NEET-specific topic coverage
    const neetTopics = Array.from(this.neetTopics)
    const relevantTopics = neetTopics.filter(
      (topic) => prompt.includes(topic) || response.includes(topic)
    )

    if (relevantTopics.length > 0) {
      score += 0.2
    }

    // NEET question style indicators
    const neetPatterns = [
      /multiple choice|option|correct answer/i,
      /assertion.*reason/i,
      /match.*following/i,
      /which.*following/i,
      /ncert|neet|medical entrance/i,
    ]

    for (const pattern of neetPatterns) {
      if (pattern.test(prompt) || pattern.test(response)) {
        score += 0.1
      }
    }

    // Exam strategy and tips
    if (/strategy|tip.*exam|remember.*exam/i.test(response)) {
      score += 0.1
    }

    return Math.max(0, Math.min(1, score))
  }

  /**
   * Assess content safety
   */
  private async assessSafety(context: ValidationContext): Promise<number> {
    const response = context.response.toLowerCase()
    let score = 1.0 // Start with perfect safety

    // Check against unsafe patterns
    for (const pattern of this.unsafePatterns) {
      if (pattern.test(response)) {
        score -= 0.5 // Significant penalty for safety issues
      }
    }

    // Check for inappropriate content for students
    const inappropriatePatterns = [
      /sexual|adult content/i,
      /violence|harmful/i,
      /drug.*abuse/i,
      /suicide|self.*harm/i,
    ]

    for (const pattern of inappropriatePatterns) {
      if (pattern.test(response)) {
        score -= 0.3
      }
    }

    return Math.max(0, score)
  }

  /**
   * Calculate weighted overall score
   */
  private calculateOverallScore(metrics: QualityMetrics, taskAnalysis: TaskAnalysis): number {
    const weights = {
      accuracy: 0.25,
      relevance: 0.2,
      clarity: 0.15,
      completeness: 0.15,
      educationalValue: 0.1,
      biologySpecific: 0.08,
      neetAlignment: 0.05,
      safety: 0.02,
    }

    // Adjust weights based on task type
    if (taskAnalysis.domain === 'neet-specific') {
      weights.neetAlignment = 0.15
      weights.biologySpecific = 0.15
      weights.accuracy = 0.2
    }

    if (taskAnalysis.questionType === 'factual') {
      weights.accuracy = 0.35
      weights.completeness = 0.1
    }

    if (taskAnalysis.complexity === 'high') {
      weights.completeness = 0.25
      weights.clarity = 0.2
    }

    let totalScore = 0
    let totalWeight = 0

    for (const [metric, weight] of Object.entries(weights)) {
      const value = metrics[metric as keyof QualityMetrics]
      totalScore += value * weight
      totalWeight += weight
    }

    return totalScore / totalWeight
  }

  /**
   * Generate quality flags
   */
  private generateFlags(metrics: QualityMetrics, context: ValidationContext): QualityFlag[] {
    const flags: QualityFlag[] = []

    // Accuracy flags
    if (metrics.accuracy < 0.6) {
      flags.push({
        type: 'error',
        category: 'accuracy',
        message: 'Response contains potential factual inaccuracies',
        severity: 1 - metrics.accuracy,
        suggestion: 'Review scientific facts and cross-reference with reliable sources',
      })
    }

    // Safety flags
    if (metrics.safety < 0.9) {
      flags.push({
        type: 'warning',
        category: 'safety',
        message: 'Response may contain inappropriate content for students',
        severity: 1 - metrics.safety,
        suggestion: 'Review content for age-appropriateness',
      })
    }

    // Relevance flags
    if (metrics.relevance < 0.5) {
      flags.push({
        type: 'warning',
        category: 'relevance',
        message: 'Response does not adequately address the question',
        severity: 1 - metrics.relevance,
        suggestion: 'Ensure response directly answers the question asked',
      })
    }

    // Clarity flags
    if (metrics.clarity < 0.6) {
      flags.push({
        type: 'warning',
        category: 'structure',
        message: 'Response could be clearer and better structured',
        severity: 1 - metrics.clarity,
        suggestion: 'Use simpler language and better organization',
      })
    }

    return flags.sort((a, b) => b.severity - a.severity)
  }

  /**
   * Generate improvement recommendations
   */
  private generateRecommendations(metrics: QualityMetrics, flags: QualityFlag[]): string[] {
    const recommendations: string[] = []

    // Priority recommendations based on flags
    const errorFlags = flags.filter((f) => f.type === 'error')
    const warningFlags = flags.filter((f) => f.type === 'warning')

    if (errorFlags.length > 0) {
      recommendations.push('Address critical accuracy issues before using this response')
    }

    if (warningFlags.length > 2) {
      recommendations.push('Consider regenerating response with different provider or parameters')
    }

    // Specific improvement suggestions
    if (metrics.completeness < 0.7) {
      recommendations.push('Expand response to cover all aspects of the question')
    }

    if (metrics.educationalValue < 0.7) {
      recommendations.push('Add more learning aids like examples, analogies, or memory tricks')
    }

    if (metrics.biologySpecific < 0.7) {
      recommendations.push('Ensure biological terminology is used correctly and precisely')
    }

    return recommendations
  }

  /**
   * Calculate confidence in assessment
   */
  private calculateConfidence(metrics: QualityMetrics): number {
    const values = Object.values(metrics)
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length
    const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length

    // Lower variance = higher confidence
    return Math.max(0.1, 1 - variance)
  }

  /**
   * Create failure report for error cases
   */
  private createFailureReport(processingTime: number): QualityReport {
    return {
      overallScore: 0,
      metrics: {
        accuracy: 0,
        relevance: 0,
        clarity: 0,
        completeness: 0,
        educationalValue: 0,
        biologySpecific: 0,
        neetAlignment: 0,
        safety: 0,
      },
      confidence: 0,
      flags: [
        {
          type: 'error',
          category: 'accuracy',
          message: 'Quality assessment failed',
          severity: 1,
        },
      ],
      recommendations: ['Retry quality assessment'],
      passesThreshold: false,
      processingTime,
    }
  }

  /**
   * Helper methods
   */
  private extractKeyTerms(text: string): string[] {
    // Simple key term extraction
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter((word) => word.length > 3)
      .filter(
        (word) =>
          ![
            'what',
            'how',
            'why',
            'when',
            'where',
            'which',
            'that',
            'this',
            'with',
            'from',
          ].includes(word)
      )
  }

  private hasFactualInconsistencies(text: string): boolean {
    // Simple inconsistency detection
    const contradictions = [
      [/plants.*produce.*oxygen/i, /plants.*don't.*produce.*oxygen/i],
      [/dna.*double.*helix/i, /dna.*single.*strand/i],
      [/mitochondria.*powerhouse/i, /mitochondria.*not.*energy/i],
    ]

    return contradictions.some(([positive, negative]) => positive.test(text) && negative.test(text))
  }

  private isAppropriateForLevel(response: string, studentLevel: string): boolean {
    // Simplified level checking
    const complexWords = [
      'photosynthesis',
      'mitochondria',
      'chromosome',
      'enzyme',
      'protein',
      'genetics',
      'evolution',
      'respiration',
    ]

    const complexWordCount = complexWords.filter((word) =>
      response.toLowerCase().includes(word)
    ).length

    const levelLimits = {
      'class-9': 2,
      'class-10': 3,
      'class-11': 5,
      'class-12': 8,
      'neet-dropper': 10,
    }

    const limit = levelLimits[studentLevel as keyof typeof levelLimits] || 5
    return complexWordCount <= limit
  }

  /**
   * Initialize biology knowledge base
   */
  private initializeBiologyKnowledge(): void {
    this.biologyConcepts.set('photosynthesis', [
      'chloroplast',
      'chlorophyll',
      'light',
      'carbon dioxide',
      'glucose',
      'oxygen',
    ])
    this.biologyConcepts.set('respiration', [
      'mitochondria',
      'glucose',
      'oxygen',
      'carbon dioxide',
      'atp',
      'energy',
    ])
    this.biologyConcepts.set('dna', [
      'nucleotide',
      'base pair',
      'double helix',
      'gene',
      'chromosome',
    ])
    this.biologyConcepts.set('enzyme', [
      'protein',
      'catalyst',
      'substrate',
      'active site',
      'reaction',
    ])
  }

  /**
   * Initialize NEET topics
   */
  private initializeNEETTopics(): void {
    const topics = [
      'diversity of living organisms',
      'structural organisation',
      'cell structure',
      'plant physiology',
      'human physiology',
      'reproduction',
      'genetics',
      'evolution',
      'biology and human welfare',
      'biotechnology',
      'ecology',
    ]

    topics.forEach((topic) => this.neetTopics.add(topic))
  }

  /**
   * Initialize safety patterns
   */
  private initializeSafetyPatterns(): void {
    this.unsafePatterns = [
      /hate speech|discrimination/i,
      /violence|harm.*others/i,
      /inappropriate.*content/i,
    ]
  }

  /**
   * Get quality statistics
   */
  getQualityStats(): {
    threshold: number
    averageProcessingTime: number
    totalAssessments: number
  } {
    return {
      threshold: this.qualityThreshold,
      averageProcessingTime: 150, // Estimated
      totalAssessments: 0, // Would track actual count
    }
  }

  /**
   * Update quality threshold
   */
  setQualityThreshold(threshold: number): void {
    this.qualityThreshold = Math.max(0.1, Math.min(1.0, threshold))
  }
}

// Export singleton instance
export const qualityAssurance = new QualityAssurancePipeline()

// Export QualityReport type
export type { QualityReport }
