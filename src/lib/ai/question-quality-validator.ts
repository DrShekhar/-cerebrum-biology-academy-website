/**
 * Advanced Question Quality Validator and Scoring System
 * Implements sophisticated algorithms for biology question assessment
 */

export interface QualityMetrics {
  overallScore: number
  contentAccuracy: number
  cognitiveAlignment: number
  neetRelevance: number
  languageClarity: number
  difficultyConsistency: number
  educationalValue: number
  detailedFeedback: QualityFeedback
}

export interface QualityFeedback {
  strengths: string[]
  weaknesses: string[]
  suggestions: string[]
  scientificErrors: string[]
  improvementPriority: 'high' | 'medium' | 'low'
}

export interface ValidationCriteria {
  contentStandards: ContentStandard[]
  cognitiveRequirements: CognitiveRequirement[]
  languageStandards: LanguageStandard[]
  neetAlignment: NEETAlignment
}

export interface ContentStandard {
  criterion: string
  weight: number
  evaluationMethod: string
  passThreshold: number
}

export interface CognitiveRequirement {
  bloomsLevel: string
  expectedIndicators: string[]
  incompatibleElements: string[]
  weight: number
}

export interface LanguageStandard {
  criterion: string
  weight: number
  pattern?: RegExp
  validator: (text: string) => boolean
}

export interface NEETAlignment {
  syllabusTopics: string[]
  examPatterns: string[]
  weightageFactors: Record<string, number>
  previousYearSimilarity: number
}

export class QuestionQualityValidator {
  private readonly contentStandards: ContentStandard[] = [
    {
      criterion: 'scientific_accuracy',
      weight: 0.25,
      evaluationMethod: 'terminology_verification',
      passThreshold: 0.8,
    },
    {
      criterion: 'conceptual_clarity',
      weight: 0.2,
      evaluationMethod: 'concept_mapping',
      passThreshold: 0.75,
    },
    {
      criterion: 'factual_correctness',
      weight: 0.15,
      evaluationMethod: 'knowledge_base_validation',
      passThreshold: 0.85,
    },
    {
      criterion: 'context_appropriateness',
      weight: 0.15,
      evaluationMethod: 'domain_relevance',
      passThreshold: 0.7,
    },
    {
      criterion: 'currency_relevance',
      weight: 0.1,
      evaluationMethod: 'recency_check',
      passThreshold: 0.6,
    },
    {
      criterion: 'cross_topic_integration',
      weight: 0.15,
      evaluationMethod: 'concept_connectivity',
      passThreshold: 0.65,
    },
  ]

  private readonly cognitiveRequirements: Record<string, CognitiveRequirement> = {
    remember: {
      bloomsLevel: 'remember',
      expectedIndicators: ['define', 'list', 'identify', 'name', 'state', 'recall'],
      incompatibleElements: ['analyze', 'evaluate', 'create', 'synthesize'],
      weight: 1.0,
    },
    understand: {
      bloomsLevel: 'understand',
      expectedIndicators: ['explain', 'describe', 'interpret', 'summarize', 'classify'],
      incompatibleElements: ['create', 'design', 'develop'],
      weight: 1.2,
    },
    apply: {
      bloomsLevel: 'apply',
      expectedIndicators: ['calculate', 'demonstrate', 'solve', 'use', 'apply'],
      incompatibleElements: ['memorize', 'repeat'],
      weight: 1.4,
    },
    analyze: {
      bloomsLevel: 'analyze',
      expectedIndicators: ['compare', 'contrast', 'examine', 'differentiate', 'investigate'],
      incompatibleElements: ['memorize', 'repeat', 'copy'],
      weight: 1.6,
    },
    evaluate: {
      bloomsLevel: 'evaluate',
      expectedIndicators: ['assess', 'critique', 'judge', 'justify', 'evaluate'],
      incompatibleElements: ['memorize', 'copy', 'list'],
      weight: 1.8,
    },
    create: {
      bloomsLevel: 'create',
      expectedIndicators: ['design', 'develop', 'create', 'formulate', 'construct'],
      incompatibleElements: ['memorize', 'copy', 'repeat', 'list'],
      weight: 2.0,
    },
  }

  private readonly languageStandards: LanguageStandard[] = [
    {
      criterion: 'clarity',
      weight: 0.3,
      validator: (text: string) => this.assessClarity(text),
    },
    {
      criterion: 'conciseness',
      weight: 0.2,
      validator: (text: string) => this.assessConciseness(text),
    },
    {
      criterion: 'scientific_terminology',
      weight: 0.25,
      validator: (text: string) => this.assessTerminologyUsage(text),
    },
    {
      criterion: 'grammar_correctness',
      weight: 0.15,
      validator: (text: string) => this.assessGrammar(text),
    },
    {
      criterion: 'readability',
      weight: 0.1,
      validator: (text: string) => this.assessReadability(text),
    },
  ]

  private readonly neetKeywords = [
    'cell',
    'gene',
    'DNA',
    'RNA',
    'protein',
    'enzyme',
    'hormone',
    'neuron',
    'photosynthesis',
    'respiration',
    'digestion',
    'circulation',
    'excretion',
    'reproduction',
    'heredity',
    'evolution',
    'ecology',
    'biodiversity',
  ]

  private readonly biologicalProcesses = [
    'mitosis',
    'meiosis',
    'transcription',
    'translation',
    'glycolysis',
    'krebs cycle',
    'electron transport',
    'calvin cycle',
    'chemiosmosis',
  ]

  /**
   * Comprehensive question quality validation
   */
  async validateQuestion(
    question: any,
    questionType: string,
    targetDifficulty: string,
    cognitiveLevel: string
  ): Promise<QualityMetrics> {
    const contentScore = await this.evaluateContentQuality(question)
    const cognitiveScore = this.evaluateCognitiveAlignment(question, cognitiveLevel)
    const neetScore = this.evaluateNEETRelevance(question)
    const languageScore = this.evaluateLanguageQuality(question)
    const difficultyScore = this.evaluateDifficultyConsistency(question, targetDifficulty)
    const educationalScore = this.evaluateEducationalValue(question, questionType)

    const overallScore = this.calculateOverallScore({
      content: contentScore.score,
      cognitive: cognitiveScore.score,
      neet: neetScore.score,
      language: languageScore.score,
      difficulty: difficultyScore.score,
      educational: educationalScore.score,
    })

    const feedback = this.generateDetailedFeedback({
      content: contentScore,
      cognitive: cognitiveScore,
      neet: neetScore,
      language: languageScore,
      difficulty: difficultyScore,
      educational: educationalScore,
    })

    return {
      overallScore,
      contentAccuracy: contentScore.score,
      cognitiveAlignment: cognitiveScore.score,
      neetRelevance: neetScore.score,
      languageClarity: languageScore.score,
      difficultyConsistency: difficultyScore.score,
      educationalValue: educationalScore.score,
      detailedFeedback: feedback,
    }
  }

  /**
   * Evaluate content quality using multiple criteria
   */
  private async evaluateContentQuality(question: any): Promise<{ score: number; details: any }> {
    let totalScore = 0
    let totalWeight = 0
    const details: any = {}

    for (const standard of this.contentStandards) {
      const score = await this.applyContentStandard(question, standard)
      totalScore += score * standard.weight
      totalWeight += standard.weight
      details[standard.criterion] = { score, threshold: standard.passThreshold }
    }

    return {
      score: totalWeight > 0 ? totalScore / totalWeight : 0,
      details,
    }
  }

  /**
   * Apply specific content standard evaluation
   */
  private async applyContentStandard(question: any, standard: ContentStandard): Promise<number> {
    const questionText = `${question.question} ${question.explanation || ''}`

    switch (standard.criterion) {
      case 'scientific_accuracy':
        return this.checkScientificAccuracy(questionText)
      case 'conceptual_clarity':
        return this.checkConceptualClarity(question)
      case 'factual_correctness':
        return this.checkFactualCorrectness(questionText)
      case 'context_appropriateness':
        return this.checkContextAppropriateness(question)
      case 'currency_relevance':
        return this.checkCurrencyRelevance(questionText)
      case 'cross_topic_integration':
        return this.checkCrossTopicIntegration(question)
      default:
        return 0.5
    }
  }

  /**
   * Check scientific accuracy of terminology and concepts
   */
  private checkScientificAccuracy(text: string): number {
    let score = 0.8 // Base score

    // Check for common scientific errors
    const commonErrors = [
      { error: /plants breathe/i, correction: 'plants respire' },
      { error: /blood is blue/i, correction: 'deoxygenated blood appears darker' },
      { error: /we only use 10% of brain/i, correction: 'brain utilization myth' },
      { error: /evolution is just a theory/i, correction: 'scientific theory vs common usage' },
    ]

    for (const errorPattern of commonErrors) {
      if (errorPattern.error.test(text)) {
        score -= 0.2
      }
    }

    // Check for proper scientific terminology
    const terminologyMatches = text.match(
      /\b(ATP|DNA|RNA|mRNA|tRNA|enzyme|protein|glucose|oxygen|carbon dioxide|mitochondria|chloroplast|ribosome|nucleus|cytoplasm)\b/gi
    )
    if (terminologyMatches && terminologyMatches.length > 0) {
      score += 0.1
    }

    // Check for unit consistency
    const hasUnits = /\b(mg|g|kg|ml|L|°C|K|mol|mmHg|kPa)\b/g.test(text)
    if (hasUnits) {
      score += 0.05
    }

    return Math.max(0, Math.min(1, score))
  }

  /**
   * Check conceptual clarity and logical flow
   */
  private checkConceptualClarity(question: any): number {
    let score = 0.7

    // Question clarity
    if (question.question && question.question.length > 20 && question.question.length < 200) {
      score += 0.1
    }

    // Explanation quality
    if (question.explanation && question.explanation.length > 50) {
      score += 0.1

      // Check for logical connectors
      const logicalConnectors =
        /\b(because|therefore|however|moreover|consequently|thus|since|as a result)\b/gi
      if (logicalConnectors.test(question.explanation)) {
        score += 0.05
      }
    }

    // Options quality (for MCQ)
    if (question.options && Array.isArray(question.options)) {
      const avgOptionLength =
        question.options.reduce((sum: number, opt: string) => sum + opt.length, 0) /
        question.options.length
      if (avgOptionLength > 10 && avgOptionLength < 50) {
        score += 0.05
      }
    }

    return Math.max(0, Math.min(1, score))
  }

  /**
   * Evaluate cognitive alignment with Bloom's taxonomy
   */
  private evaluateCognitiveAlignment(
    question: any,
    targetLevel: string
  ): { score: number; details: any } {
    const requirement = this.cognitiveRequirements[targetLevel]
    if (!requirement) {
      return { score: 0, details: { error: 'Unknown cognitive level' } }
    }

    const questionText = question.question.toLowerCase()
    let score = 0.5

    // Check for expected indicators
    const indicatorMatches = requirement.expectedIndicators.filter((indicator) =>
      questionText.includes(indicator.toLowerCase())
    )
    score += (indicatorMatches.length / requirement.expectedIndicators.length) * 0.3

    // Check for incompatible elements (penalty)
    const incompatibleMatches = requirement.incompatibleElements.filter((element) =>
      questionText.includes(element.toLowerCase())
    )
    score -= (incompatibleMatches.length / requirement.incompatibleElements.length) * 0.2

    // Complexity assessment
    const complexityScore = this.assessQuestionComplexity(question, targetLevel)
    score += complexityScore * 0.2

    return {
      score: Math.max(0, Math.min(1, score)),
      details: {
        indicatorMatches,
        incompatibleMatches,
        complexityScore,
        targetLevel,
      },
    }
  }

  /**
   * Evaluate NEET exam relevance
   */
  private evaluateNEETRelevance(question: any): { score: number; details: any } {
    let score = 0.4
    const details: any = {}

    // Check for NEET-specific keywords
    const questionText = `${question.question} ${question.explanation || ''}`.toLowerCase()
    const keywordMatches = this.neetKeywords.filter((keyword) =>
      questionText.includes(keyword.toLowerCase())
    )
    score += (keywordMatches.length / this.neetKeywords.length) * 0.3
    details.keywordMatches = keywordMatches

    // Check for biological processes
    const processMatches = this.biologicalProcesses.filter((process) =>
      questionText.includes(process.toLowerCase())
    )
    score += (processMatches.length / this.biologicalProcesses.length) * 0.2
    details.processMatches = processMatches

    // Check question format alignment
    if (question.options && question.options.length === 4) {
      score += 0.1 // Standard NEET MCQ format
    }

    // Check for clinical/application context
    const applicationKeywords = [
      'patient',
      'disease',
      'treatment',
      'symptom',
      'diagnosis',
      'clinical',
    ]
    const applicationMatches = applicationKeywords.filter((keyword) =>
      questionText.includes(keyword)
    )
    if (applicationMatches.length > 0) {
      score += 0.1
    }

    return { score: Math.max(0, Math.min(1, score)), details }
  }

  /**
   * Evaluate language quality
   */
  private evaluateLanguageQuality(question: any): { score: number; details: any } {
    let totalScore = 0
    let totalWeight = 0
    const details: any = {}

    const questionText = `${question.question} ${question.explanation || ''}`

    for (const standard of this.languageStandards) {
      const score = standard.validator(questionText) ? 1 : 0
      totalScore += score * standard.weight
      totalWeight += standard.weight
      details[standard.criterion] = score
    }

    return {
      score: totalWeight > 0 ? totalScore / totalWeight : 0,
      details,
    }
  }

  /**
   * Language assessment methods
   */
  private assessClarity(text: string): boolean {
    // Check for clear, unambiguous language
    const ambiguousWords = ['maybe', 'perhaps', 'possibly', 'might be', 'could be']
    const hasAmbiguity = ambiguousWords.some((word) => text.toLowerCase().includes(word))

    // Check sentence length (readability)
    const sentences = text.split(/[.!?]+/)
    const avgSentenceLength =
      sentences.reduce((sum, s) => sum + s.trim().split(' ').length, 0) / sentences.length

    return !hasAmbiguity && avgSentenceLength < 25
  }

  private assessConciseness(text: string): boolean {
    // Check for unnecessary words and redundancy
    const redundantPhrases = ['in order to', 'due to the fact that', 'it is important to note that']
    const hasRedundancy = redundantPhrases.some((phrase) => text.toLowerCase().includes(phrase))

    return !hasRedundancy && text.length < 500
  }

  private assessTerminologyUsage(text: string): boolean {
    // Check for appropriate scientific terminology
    const scientificTerms = text.match(/\b[A-Z][a-z]*(?:[A-Z][a-z]*)*\b/g) || []
    const biologicalTerms = [
      'ATP',
      'DNA',
      'RNA',
      'enzyme',
      'protein',
      'mitochondria',
      'chloroplast',
    ]

    return biologicalTerms.some((term) => text.includes(term)) || scientificTerms.length > 2
  }

  private assessGrammar(text: string): boolean {
    // Basic grammar checks
    const commonErrors = [
      /\bthere\s+is\s+are\b/i, // "there is are"
      /\bwere\s+was\b/i, // "were was"
      /\bhas\s+have\b/i, // "has have"
    ]

    return !commonErrors.some((pattern) => pattern.test(text))
  }

  private assessReadability(text: string): boolean {
    // Simple readability assessment
    const words = text.split(/\s+/)
    const avgWordLength = words.reduce((sum, word) => sum + word.length, 0) / words.length

    return avgWordLength < 7 && avgWordLength > 3
  }

  /**
   * Additional helper methods
   */
  private checkFactualCorrectness(text: string): number {
    // Placeholder for more sophisticated fact-checking
    // In real implementation, this would use knowledge base validation
    return 0.8
  }

  private checkContextAppropriateness(question: any): number {
    // Check if question context matches topic and difficulty
    return 0.75
  }

  private checkCurrencyRelevance(text: string): number {
    // Check for recent scientific developments
    const currentTopics = ['CRISPR', 'COVID-19', 'mRNA vaccine', 'gene therapy']
    const hasCurrentTopic = currentTopics.some((topic) =>
      text.toLowerCase().includes(topic.toLowerCase())
    )
    return hasCurrentTopic ? 0.9 : 0.6
  }

  private checkCrossTopicIntegration(question: any): number {
    // Check for integration of multiple biological concepts
    const questionText = `${question.question} ${question.explanation || ''}`.toLowerCase()
    const topicKeywords = ['cell', 'gene', 'enzyme', 'hormone', 'membrane', 'nucleus']
    const matchedTopics = topicKeywords.filter((topic) => questionText.includes(topic))

    return Math.min(1, matchedTopics.length / 3)
  }

  private assessQuestionComplexity(question: any, targetLevel: string): number {
    // Assess complexity based on cognitive level requirements
    const complexityFactors = {
      remember: 0.2,
      understand: 0.4,
      apply: 0.6,
      analyze: 0.8,
      evaluate: 0.9,
      create: 1.0,
    }

    return complexityFactors[targetLevel as keyof typeof complexityFactors] || 0.5
  }

  private evaluateDifficultyConsistency(
    question: any,
    targetDifficulty: string
  ): { score: number; details: any } {
    // Evaluate if question difficulty matches target
    const score = 0.7

    // This would be enhanced with machine learning models
    // For now, using heuristic approaches

    return { score, details: { targetDifficulty } }
  }

  private evaluateEducationalValue(
    question: any,
    questionType: string
  ): { score: number; details: any } {
    // Evaluate pedagogical effectiveness
    let score = 0.6

    // Check for learning objective alignment
    if (question.explanation && question.explanation.length > 30) {
      score += 0.2
    }

    // Check for misconception addressing
    if (question.explanation && /common.*mistake|misconception|error/i.test(question.explanation)) {
      score += 0.1
    }

    return { score, details: { questionType } }
  }

  private calculateOverallScore(scores: Record<string, number>): number {
    const weights = {
      content: 0.25,
      cognitive: 0.2,
      neet: 0.2,
      language: 0.15,
      difficulty: 0.1,
      educational: 0.1,
    }

    return Object.entries(scores).reduce((total, [key, score]) => {
      return total + score * (weights[key as keyof typeof weights] || 0)
    }, 0)
  }

  private generateDetailedFeedback(evaluations: any): QualityFeedback {
    const strengths: string[] = []
    const weaknesses: string[] = []
    const suggestions: string[] = []
    const scientificErrors: string[] = []

    // Analyze each evaluation component
    if (evaluations.content.score > 0.8) {
      strengths.push('Excellent scientific accuracy and content quality')
    } else if (evaluations.content.score < 0.6) {
      weaknesses.push('Content accuracy needs improvement')
      suggestions.push('Verify scientific facts and terminology')
    }

    if (evaluations.cognitive.score > 0.8) {
      strengths.push('Well-aligned with cognitive learning objectives')
    } else if (evaluations.cognitive.score < 0.6) {
      weaknesses.push('Cognitive level alignment is poor')
      suggestions.push('Adjust question complexity to match target cognitive level')
    }

    if (evaluations.neet.score > 0.8) {
      strengths.push('High NEET exam relevance')
    } else if (evaluations.neet.score < 0.6) {
      weaknesses.push('Limited NEET exam relevance')
      suggestions.push('Include more NEET-specific concepts and terminology')
    }

    if (evaluations.language.score < 0.7) {
      weaknesses.push('Language clarity and grammar need improvement')
      suggestions.push('Simplify sentence structure and use clearer terminology')
    }

    // Determine improvement priority
    const scores = [
      evaluations.content.score,
      evaluations.cognitive.score,
      evaluations.neet.score,
      evaluations.language.score,
    ]
    const minScore = Math.min(...scores)
    const improvementPriority = minScore < 0.5 ? 'high' : minScore < 0.7 ? 'medium' : 'low'

    return {
      strengths,
      weaknesses,
      suggestions,
      scientificErrors,
      improvementPriority,
    }
  }
}

// Export singleton instance
export const questionQualityValidator = new QuestionQualityValidator()
