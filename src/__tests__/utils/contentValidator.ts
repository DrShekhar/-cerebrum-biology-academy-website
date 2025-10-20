/**
 * Educational Content Validator
 * Comprehensive validation utilities for AI-generated educational content
 */

interface ValidationResult {
  accuracy: number
  relevance: number
  appropriateLevel: boolean
  scientificTermsUsed: string[]
  neetCompliant: boolean
  hasFormulas: boolean
  hasExamples: boolean
  complexityScore: number
  advancedTermsCount: number
  hasDetailedExplanations: boolean
  hasApplications: boolean
}

interface ConsistencyCheck {
  consistencyScore: number
  contradictions: string[]
  coreFactsPresent: boolean
}

interface SafetyCheck {
  isAppropriate: boolean
  isEducational: boolean
  hasInappropriateContent: boolean
  ageAppropriate: boolean
}

interface SensitiveContentValidation {
  isProfessional: boolean
  isScientific: boolean
  usesMedicalTerminology: boolean
  avoidsCasualLanguage: boolean
}

interface EducationalValueValidation {
  isEducational: boolean
  hasLearningObjectives: boolean
  isFactual: boolean
  hasEntertainmentOnly: boolean
}

interface NEETValidation {
  syllabusAligned: boolean
  hasExamContext: boolean
  difficulty: string
  hasKeywords: boolean
}

interface NEETQuestionValidation {
  isNEETLevel: boolean
  hasValidDistractors: boolean
  explanationQuality: number
}

interface RegionalValidation {
  hasIndianContext: boolean
  isRegionallyAppropriate: boolean
  hasLocalExamples: boolean
}

interface AdaptiveValidation {
  isAdaptedToUser: boolean
  complexity: string
  hasMoreExamples: boolean
}

interface SecurityValidation {
  hasMaliciousContent: boolean
  isProperlyFormatted: boolean
  hasValidEncoding: boolean
}

interface IntegrityValidation {
  isCorrupted: boolean
  isComplete: boolean
  hasValidStructure: boolean
}

export class EducationalContentValidator {
  private biologyTerms: Set<string>
  private neetKeywords: Set<string>
  private inappropriateTerms: Set<string>
  private medicalTerms: Set<string>

  constructor() {
    this.initializeTermSets()
  }

  private initializeTermSets() {
    this.biologyTerms = new Set([
      'photosynthesis',
      'respiration',
      'mitosis',
      'meiosis',
      'dna',
      'rna',
      'protein',
      'enzyme',
      'cell',
      'nucleus',
      'chloroplast',
      'mitochondria',
      'glucose',
      'atp',
      'chlorophyll',
      'hemoglobin',
      'antibody',
      'antigen',
      'chromosome',
      'gene',
      'allele',
      'phenotype',
      'genotype',
      'heredity',
      'evolution',
      'natural selection',
      'adaptation',
      'ecosystem',
      'biodiversity',
    ])

    this.neetKeywords = new Set([
      'neet',
      'medical entrance',
      'ncert',
      'aiims',
      'jipmer',
      'biology syllabus',
      'exam pattern',
      'previous year',
      'important topics',
      'weightage',
      'scoring',
    ])

    this.inappropriateTerms = new Set([
      'inappropriate',
      'offensive',
      'vulgar',
      'hate',
      'discrimination',
      'violence',
      'explicit',
    ])

    this.medicalTerms = new Set([
      'anatomy',
      'physiology',
      'pathology',
      'diagnosis',
      'treatment',
      'therapy',
      'medical',
      'clinical',
      'patient',
      'disease',
      'syndrome',
      'disorder',
    ])
  }

  async validateBiologyContent(content: string, topic: string): Promise<ValidationResult> {
    const words = content.toLowerCase().split(/\s+/)
    const scientificTermsUsed = words.filter((word) => this.biologyTerms.has(word))

    // Calculate accuracy based on topic relevance and scientific term usage
    const topicMentions = content.toLowerCase().includes(topic.toLowerCase()) ? 1 : 0
    const termDensity = scientificTermsUsed.length / words.length
    const accuracy = Math.min((topicMentions + termDensity * 10) / 2, 1)

    // Calculate relevance
    const relevantTerms = scientificTermsUsed.length
    const relevance = Math.min(relevantTerms / 5, 1) // Normalize to max 1

    // Check for formulas (basic pattern matching)
    const hasFormulas =
      /[A-Z]+[0-9]*\s*[+\-=]\s*[A-Z]+[0-9]*/.test(content) ||
      content.includes('→') ||
      content.includes('C6H12O6')

    // Check for examples
    const hasExamples =
      content.includes('example') ||
      content.includes('for instance') ||
      content.includes('such as') ||
      content.includes('like')

    // Calculate complexity score
    const complexWords = words.filter((word) => word.length > 8).length
    const complexityScore = Math.min((complexWords / words.length) * 10, 1)

    // Count advanced terms
    const advancedTermsCount = scientificTermsUsed.filter(
      (term) => term.length > 10 || this.medicalTerms.has(term)
    ).length

    return {
      accuracy,
      relevance,
      appropriateLevel: accuracy > 0.7 && relevance > 0.6,
      scientificTermsUsed,
      neetCompliant: this.checkNEETCompliance(content),
      hasFormulas,
      hasExamples,
      complexityScore,
      advancedTermsCount,
      hasDetailedExplanations: content.length > 500 && content.includes('.'),
      hasApplications: content.includes('application') || content.includes('used in'),
    }
  }

  async checkFactualConsistency(responses: string[], topic: string): Promise<ConsistencyCheck> {
    // Extract key facts from each response
    const factSets = responses.map((response) => this.extractKeyFacts(response, topic))

    // Check for contradictions
    const contradictions: string[] = []

    // Calculate consistency score based on common facts
    const allFacts = factSets.flat()
    const factCounts = new Map<string, number>()

    allFacts.forEach((fact) => {
      factCounts.set(fact, (factCounts.get(fact) || 0) + 1)
    })

    const consistentFacts = Array.from(factCounts.entries()).filter(
      ([_, count]) => count >= responses.length * 0.8
    ) // 80% agreement

    const consistencyScore = consistentFacts.length / Math.max(factCounts.size, 1)

    return {
      consistencyScore,
      contradictions,
      coreFactsPresent: consistentFacts.length > 0,
    }
  }

  async checkContentSafety(content: string): Promise<SafetyCheck> {
    const words = content.toLowerCase().split(/\s+/)
    const hasInappropriateTerm = words.some((word) => this.inappropriateTerms.has(word))

    return {
      isAppropriate: !hasInappropriateTerm && content.length > 50,
      isEducational: this.isEducationalContent(content),
      hasInappropriateContent: hasInappropriateTerm,
      ageAppropriate: !hasInappropriateTerm && this.isAgeAppropriate(content),
    }
  }

  async validateSensitiveContent(content: string): Promise<SensitiveContentValidation> {
    const words = content.toLowerCase().split(/\s+/)
    const medicalTermCount = words.filter((word) => this.medicalTerms.has(word)).length

    return {
      isProfessional: !content.includes('casual') && content.includes('scientific'),
      isScientific: medicalTermCount > 0 || this.hasScientificLanguage(content),
      usesMedicalTerminology: medicalTermCount > 0,
      avoidsCasualLanguage: !this.hasCasualLanguage(content),
    }
  }

  async validateEducationalValue(content: string): Promise<EducationalValueValidation> {
    return {
      isEducational: this.isEducationalContent(content),
      hasLearningObjectives: content.includes('learn') || content.includes('understand'),
      isFactual: this.isFactualContent(content),
      hasEntertainmentOnly: this.isEntertainmentOnly(content),
    }
  }

  async validateNEETAlignment(content: string, topic: string): Promise<NEETValidation> {
    const words = content.toLowerCase()
    const hasNEETKeywords = Array.from(this.neetKeywords).some((keyword) => words.includes(keyword))

    return {
      syllabusAligned: this.checkNEETSyllabusAlignment(content, topic),
      hasExamContext: hasNEETKeywords || content.includes('exam'),
      difficulty: this.assessNEETDifficulty(content),
      hasKeywords: hasNEETKeywords,
    }
  }

  async validateNEETQuestion(question: any): Promise<NEETQuestionValidation> {
    const optionsQuality = this.assessOptionQuality(question.options)
    const explanationQuality = this.assessExplanationQuality(question.explanation)

    return {
      isNEETLevel: this.isNEETLevelQuestion(question),
      hasValidDistractors: optionsQuality > 0.7,
      explanationQuality,
    }
  }

  async validateRegionalContext(content: string): Promise<RegionalValidation> {
    const indianContext =
      content.includes('India') ||
      content.includes('Indian') ||
      content.includes('NCERT') ||
      content.includes('CBSE')

    return {
      hasIndianContext: indianContext,
      isRegionallyAppropriate: indianContext && !this.hasInappropriateRegionalContent(content),
      hasLocalExamples: this.hasLocalExamples(content),
    }
  }

  async validateAdaptiveContent(content: string, userProfile: any): Promise<AdaptiveValidation> {
    const complexity = this.assessComplexity(content)

    return {
      isAdaptedToUser: this.isAdaptedToUserLevel(content, userProfile),
      complexity: complexity < 0.5 ? 'simplified' : complexity > 0.8 ? 'advanced' : 'standard',
      hasMoreExamples: content.split('example').length > 2,
    }
  }

  async validateSecurity(content: string): Promise<SecurityValidation> {
    return {
      hasMaliciousContent: this.hasMaliciousContent(content),
      isProperlyFormatted: this.isProperlyFormatted(content),
      hasValidEncoding: this.hasValidEncoding(content),
    }
  }

  async validateIntegrity(content: string): Promise<IntegrityValidation> {
    return {
      isCorrupted: this.isCorrupted(content),
      isComplete: this.isComplete(content),
      hasValidStructure: this.hasValidStructure(content),
    }
  }

  // Private helper methods
  private extractKeyFacts(content: string, topic: string): string[] {
    // Simple fact extraction based on sentences containing topic
    const sentences = content.split('.')
    return sentences
      .filter((sentence) => sentence.toLowerCase().includes(topic.toLowerCase()))
      .map((sentence) => sentence.trim())
      .filter((sentence) => sentence.length > 10)
  }

  private checkNEETCompliance(content: string): boolean {
    const words = content.toLowerCase()
    return (
      Array.from(this.neetKeywords).some((keyword) => words.includes(keyword)) ||
      this.biologyTerms.size > 0
    )
  }

  private isEducationalContent(content: string): boolean {
    const educationalWords = ['learn', 'study', 'understand', 'concept', 'theory', 'principle']
    return educationalWords.some((word) => content.toLowerCase().includes(word))
  }

  private isAgeAppropriate(content: string): boolean {
    // Check for age-inappropriate content
    const inappropriateWords = ['violence', 'explicit', 'adult']
    return !inappropriateWords.some((word) => content.toLowerCase().includes(word))
  }

  private hasScientificLanguage(content: string): boolean {
    const scientificWords = ['research', 'study', 'analysis', 'hypothesis', 'theory']
    return scientificWords.some((word) => content.toLowerCase().includes(word))
  }

  private hasCasualLanguage(content: string): boolean {
    const casualWords = ['awesome', 'cool', 'dude', 'hey', 'wow']
    return casualWords.some((word) => content.toLowerCase().includes(word))
  }

  private isFactualContent(content: string): boolean {
    // Check for factual indicators
    return (
      content.includes('research shows') ||
      content.includes('studies indicate') ||
      content.includes('evidence suggests') ||
      !content.includes('opinion')
    )
  }

  private isEntertainmentOnly(content: string): boolean {
    const entertainmentWords = ['funny', 'joke', 'entertainment', 'amusing']
    return entertainmentWords.some((word) => content.toLowerCase().includes(word))
  }

  private checkNEETSyllabusAlignment(content: string, topic: string): boolean {
    // Check if content aligns with NEET syllabus
    const neetTopics = [
      'biomolecules',
      'cell structure',
      'plant physiology',
      'human physiology',
      'genetics',
      'ecology',
      'evolution',
      'biotechnology',
    ]
    return neetTopics.some(
      (neetTopic) =>
        content.toLowerCase().includes(neetTopic) || topic.toLowerCase().includes(neetTopic)
    )
  }

  private assessNEETDifficulty(content: string): string {
    const words = content.split(/\s+/)
    const complexWords = words.filter((word) => word.length > 8).length
    const ratio = complexWords / words.length

    if (ratio < 0.1) return 'basic'
    if (ratio < 0.2) return 'intermediate'
    return 'neet-appropriate'
  }

  private isNEETLevelQuestion(question: any): boolean {
    return (
      question.question.length > 20 &&
      question.options.length === 4 &&
      question.explanation &&
      question.explanation.length > 50
    )
  }

  private assessOptionQuality(options: string[]): number {
    // Check if options are well-formed and have good distractors
    const avgLength = options.reduce((sum, opt) => sum + opt.length, 0) / options.length
    return avgLength > 5 && avgLength < 100 ? 0.8 : 0.5
  }

  private assessExplanationQuality(explanation: string): number {
    if (!explanation) return 0
    const words = explanation.split(/\s+/).length
    return Math.min(words / 50, 1) // Quality based on explanation length
  }

  private hasInappropriateRegionalContent(content: string): boolean {
    // Check for content that might be inappropriate for Indian context
    return false // Placeholder - implement specific checks
  }

  private hasLocalExamples(content: string): boolean {
    const localTerms = ['India', 'Indian', 'subcontinent', 'tropical', 'monsoon']
    return localTerms.some((term) => content.includes(term))
  }

  private assessComplexity(content: string): number {
    const words = content.split(/\s+/)
    const complexWords = words.filter((word) => word.length > 8).length
    return complexWords / words.length
  }

  private isAdaptedToUserLevel(content: string, userProfile: any): boolean {
    // Check if content is adapted to user's performance level
    const complexity = this.assessComplexity(content)
    const userLevel = userProfile.currentLevel

    if (userLevel === 'class-9') return complexity < 0.4
    if (userLevel === 'class-11') return complexity >= 0.4 && complexity <= 0.7
    if (userLevel === 'class-12') return complexity > 0.7
    return true
  }

  private hasMaliciousContent(content: string): boolean {
    const maliciousPatterns = ['<script', 'javascript:', 'onclick=', 'onerror=']
    return maliciousPatterns.some((pattern) => content.toLowerCase().includes(pattern))
  }

  private isProperlyFormatted(content: string): boolean {
    return content.length > 0 && content.trim() === content
  }

  private hasValidEncoding(content: string): boolean {
    // Check for valid UTF-8 encoding
    try {
      return btoa(unescape(encodeURIComponent(content))).length > 0
    } catch {
      return false
    }
  }

  private isCorrupted(content: string): boolean {
    // Check for signs of corruption
    const corruptionSigns = ['�', 'undefined', 'null', '[object Object]']
    return corruptionSigns.some((sign) => content.includes(sign))
  }

  private isComplete(content: string): boolean {
    return content.length > 10 && !content.endsWith('...')
  }

  private hasValidStructure(content: string): boolean {
    // Check for basic structure (sentences, paragraphs)
    return content.includes('.') && content.length > 50
  }
}
