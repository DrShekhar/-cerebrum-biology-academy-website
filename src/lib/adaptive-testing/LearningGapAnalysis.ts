/**
 * Learning Gap Identification and Remediation System
 * Advanced system for detecting, analyzing, and addressing learning gaps
 *
 * Features:
 * - Multi-dimensional gap detection
 * - Root cause analysis
 * - Prerequisite gap tracking
 * - Conceptual gap identification
 * - Personalized remediation planning
 * - Progress monitoring
 * - Early intervention systems
 */

import { ItemParameters, StudentResponse } from './ItemResponseTheory'
import { PerformanceProfile } from './PerformanceAnalytics'
import { KnowledgeNode } from './PersonalizedSequencing'

export interface LearningGap {
  id: string
  type: 'conceptual' | 'procedural' | 'prerequisite' | 'application' | 'metacognitive'
  topic: string
  subtopic: string
  severity: number // 0-1 scale (1 = critical gap)
  confidence: number // 0-1 scale (confidence in gap detection)
  evidence: {
    itemsAttempted: number
    successRate: number
    consistentFailures: boolean
    timePatterns: 'too_fast' | 'too_slow' | 'normal'
    errorPatterns: string[]
    responseConfidenceAlignment: number
  }
  rootCauses: {
    primary: string
    contributing: string[]
    hypotheses: string[]
  }
  impact: {
    currentPerformance: number
    futureRisk: number
    prerequisiteBlocking: string[]
    dependentConcepts: string[]
  }
  detection: {
    method: string
    timestamp: Date
    triggerItems: string[]
    algorithmConfidence: number
  }
  remediation: {
    priority: 'immediate' | 'high' | 'medium' | 'low'
    estimatedEffort: number // hours
    suggestedApproach: string[]
    prerequisiteWork: string[]
    scaffoldingNeeded: boolean
  }
}

export interface GapPattern {
  patternId: string
  name: string
  description: string
  indicators: {
    performance: {
      accuracyThreshold: number
      consistencyRequired: boolean
      timePatternSignificance: number
    }
    content: {
      topicSpecific: boolean
      difficultyLevel: string
      bloomsLevel: string[]
    }
    behavioral: {
      confidenceAlignment: number
      guessPattern: boolean
      timeAllocation: string
    }
  }
  prevalence: number // how common this pattern is
  interventions: string[]
}

export interface RemediationPlan {
  id: string
  studentId: string
  gaps: string[] // gap IDs
  strategy: 'sequential' | 'parallel' | 'scaffolded' | 'spiral'
  phases: {
    name: string
    duration: number // hours
    objectives: string[]
    activities: RemediationActivity[]
    assessments: string[]
    successCriteria: string[]
  }[]
  timeline: {
    startDate: Date
    estimatedCompletion: Date
    milestones: { date: Date; description: string }[]
  }
  personalization: {
    learningStyle: string
    preferredModalities: string[]
    paceAdjustments: number
    scaffoldingLevel: number
  }
  monitoring: {
    checkpoints: Date[]
    progressMetrics: string[]
    adaptationTriggers: string[]
  }
}

export interface RemediationActivity {
  id: string
  type: 'review' | 'practice' | 'explanation' | 'application' | 'metacognitive'
  name: string
  description: string
  estimatedTime: number // minutes
  difficulty: number
  prerequisites: string[]
  resources: {
    content: string[]
    tools: string[]
    references: string[]
  }
  adaptations: {
    visualSupport: boolean
    auditorySupport: boolean
    kinestheticSupport: boolean
    scaffolding: string[]
  }
}

export interface GapAnalysisReport {
  studentId: string
  sessionId: string
  analysisDate: Date
  summary: {
    totalGaps: number
    criticalGaps: number
    gapsByType: Map<string, number>
    gapsByTopic: Map<string, number>
    overallSeverity: number
    urgencyLevel: 'immediate' | 'high' | 'medium' | 'low'
  }
  detailedGaps: LearningGap[]
  patterns: {
    identifiedPatterns: string[]
    riskFactors: string[]
    protectiveFactors: string[]
  }
  recommendations: {
    immediate: string[]
    shortTerm: string[]
    longTerm: string[]
    preventive: string[]
  }
  remediationPlan: RemediationPlan
  monitoring: {
    keyIndicators: string[]
    checkpointSchedule: Date[]
    successMetrics: string[]
  }
}

class LearningGapAnalysis {
  private static instance: LearningGapAnalysis
  private detectedGaps: Map<string, LearningGap[]> = new Map() // studentId -> gaps
  private gapPatterns: Map<string, GapPattern> = new Map()
  private remediationPlans: Map<string, RemediationPlan> = new Map()
  private interventionHistory: Map<string, any[]> = new Map()

  // Detection algorithms configuration
  private readonly DETECTION_THRESHOLDS = {
    accuracy: 0.6, // Below this accuracy suggests a gap
    consistency: 0.7, // Below this consistency suggests unstable understanding
    timeDeviation: 2.0, // Standard deviations from expected time
    confidenceAlignment: 0.3, // Minimum alignment between confidence and performance
    prerequisiteThreshold: 0.7, // Minimum mastery for prerequisites
  }

  // Biology domain knowledge for gap analysis
  private readonly BIOLOGY_CONCEPTS = {
    fundamentals: ['Cell Structure', 'Cell Function', 'Biomolecules', 'Energy Flow'],
    intermediate: [
      'Cellular Processes',
      'Genetics Basics',
      'Evolution Principles',
      'Ecosystem Dynamics',
    ],
    advanced: [
      'Molecular Biology',
      'Population Genetics',
      'Phylogenetics',
      'Biogeochemical Cycles',
    ],
    prerequisites: new Map([
      ['Cellular Processes', ['Cell Structure', 'Biomolecules']],
      ['Genetics Basics', ['Cell Structure', 'Cell Function']],
      ['Molecular Biology', ['Genetics Basics', 'Biomolecules']],
      ['Population Genetics', ['Genetics Basics', 'Evolution Principles']],
    ]),
  }

  constructor() {
    this.initializeGapPatterns()
  }

  static getInstance(): LearningGapAnalysis {
    if (!LearningGapAnalysis.instance) {
      LearningGapAnalysis.instance = new LearningGapAnalysis()
    }
    return LearningGapAnalysis.instance
  }

  /**
   * Analyze student responses to identify learning gaps
   */
  analyzeForGaps(
    studentId: string,
    sessionId: string,
    responses: StudentResponse[],
    items: ItemParameters[],
    performanceProfile: PerformanceProfile,
    knowledgeGraph: Map<string, KnowledgeNode>
  ): GapAnalysisReport {
    // Create item lookup for efficient access
    const itemLookup = new Map(items.map((item) => [item.id, item]))

    // Detect gaps using multiple algorithms
    const detectedGaps = this.detectGapsMultiModal(
      responses,
      itemLookup,
      performanceProfile,
      knowledgeGraph
    )

    // Analyze gap patterns
    const patterns = this.analyzeGapPatterns(detectedGaps, responses, itemLookup)

    // Generate remediation plan
    const remediationPlan = this.generateRemediationPlan(
      studentId,
      detectedGaps,
      performanceProfile
    )

    // Create comprehensive report
    const report = this.generateGapAnalysisReport(
      studentId,
      sessionId,
      detectedGaps,
      patterns,
      remediationPlan
    )

    // Store results
    this.detectedGaps.set(studentId, detectedGaps)
    this.remediationPlans.set(studentId, remediationPlan)

    return report
  }

  /**
   * Monitor gap remediation progress
   */
  monitorRemediationProgress(
    studentId: string,
    newResponses: StudentResponse[],
    items: ItemParameters[]
  ): {
    progressSummary: {
      gapsAddressed: number
      gapsRemaining: number
      improvementRate: number
      timeOnTrack: boolean
    }
    gapUpdates: {
      resolved: string[]
      improved: string[]
      persistent: string[]
      newGaps: string[]
    }
    recommendations: {
      continueCurrentPlan: boolean
      adjustments: string[]
      newInterventions: string[]
    }
  } {
    const existingGaps = this.detectedGaps.get(studentId) || []
    const itemLookup = new Map(items.map((item) => [item.id, item]))

    // Re-analyze gaps with new data
    const currentGaps = this.detectGapsFromResponses(newResponses, itemLookup)

    // Compare with previous gaps
    const gapComparison = this.compareGapStates(existingGaps, currentGaps)

    // Calculate progress metrics
    const progressSummary = this.calculateRemediationProgress(existingGaps, currentGaps)

    // Generate updated recommendations
    const recommendations = this.generateProgressRecommendations(gapComparison, progressSummary)

    // Update stored gaps
    this.detectedGaps.set(studentId, currentGaps)

    return {
      progressSummary,
      gapUpdates: gapComparison,
      recommendations,
    }
  }

  /**
   * Predict learning gaps before they become critical
   */
  predictEmergingGaps(
    studentId: string,
    responses: StudentResponse[],
    items: ItemParameters[],
    performanceProfile: PerformanceProfile
  ): {
    riskGaps: {
      concept: string
      riskLevel: number // 0-1
      timeToEmergence: number // estimated days
      riskFactors: string[]
      preventiveActions: string[]
    }[]
    earlyWarnings: {
      type: string
      severity: 'low' | 'medium' | 'high'
      message: string
      action: string
    }[]
    preventiveRecommendations: string[]
  } {
    const itemLookup = new Map(items.map((item) => [item.id, item]))
    const riskGaps: any[] = []
    const earlyWarnings: any[] = []

    // Analyze response patterns for early warning signs
    const patterns = this.analyzeResponsePatterns(responses, itemLookup)

    // Check for declining performance trends
    if (patterns.accuracyTrend === 'declining') {
      earlyWarnings.push({
        type: 'performance_decline',
        severity: 'medium',
        message: 'Accuracy is declining over recent responses',
        action: 'Review recent topics and consider reinforcement',
      })
    }

    // Check for prerequisite weaknesses
    for (const [concept, prerequisites] of this.BIOLOGY_CONCEPTS.prerequisites) {
      const prereqStrength = this.assessPrerequisiteStrength(prerequisites, responses, itemLookup)
      if (prereqStrength < 0.7) {
        riskGaps.push({
          concept,
          riskLevel: 1 - prereqStrength,
          timeToEmergence: Math.round((1 - prereqStrength) * 14), // days
          riskFactors: [`Weak ${prerequisites.join(', ')} foundation`],
          preventiveActions: [`Strengthen ${prerequisites[0]} understanding`],
        })
      }
    }

    // Check for cognitive overload indicators
    if (performanceProfile.cognitiveAssessment.workingMemoryLoad > 0.8) {
      earlyWarnings.push({
        type: 'cognitive_overload',
        severity: 'high',
        message: 'High cognitive load detected',
        action: 'Reduce complexity and provide more scaffolding',
      })
    }

    // Generate preventive recommendations
    const preventiveRecommendations = this.generatePreventiveRecommendations(
      riskGaps,
      earlyWarnings
    )

    return {
      riskGaps,
      earlyWarnings,
      preventiveRecommendations,
    }
  }

  /**
   * Generate targeted interventions for specific gaps
   */
  generateTargetedIntervention(
    gapId: string,
    studentProfile: PerformanceProfile,
    timeConstraints: { available: number; urgent: boolean }
  ): {
    intervention: {
      type: string
      activities: RemediationActivity[]
      estimatedTime: number
      successProbability: number
    }
    alternatives: {
      quick: RemediationActivity[]
      comprehensive: RemediationActivity[]
      maintenance: RemediationActivity[]
    }
    monitoring: {
      indicators: string[]
      checkpoints: number[] // days from start
      adaptationTriggers: string[]
    }
  } {
    // Find the specific gap
    const allGaps = Array.from(this.detectedGaps.values()).flat()
    const gap = allGaps.find((g) => g.id === gapId)

    if (!gap) {
      throw new Error('Gap not found')
    }

    // Generate primary intervention
    const intervention = this.designIntervention(gap, studentProfile, timeConstraints)

    // Generate alternatives
    const alternatives = this.generateInterventionAlternatives(gap, studentProfile)

    // Define monitoring plan
    const monitoring = this.designMonitoringPlan(gap, intervention)

    return {
      intervention,
      alternatives,
      monitoring,
    }
  }

  // Private helper methods

  private initializeGapPatterns(): void {
    // Conceptual misunderstanding pattern
    this.gapPatterns.set('conceptual_misunderstanding', {
      patternId: 'conceptual_misunderstanding',
      name: 'Conceptual Misunderstanding',
      description: 'Student has fundamental misconceptions about core concepts',
      indicators: {
        performance: {
          accuracyThreshold: 0.4,
          consistencyRequired: true,
          timePatternSignificance: 0.5,
        },
        content: {
          topicSpecific: true,
          difficultyLevel: 'any',
          bloomsLevel: ['understand', 'apply'],
        },
        behavioral: {
          confidenceAlignment: 0.3,
          guessPattern: false,
          timeAllocation: 'normal',
        },
      },
      prevalence: 0.25,
      interventions: [
        'conceptual_restructuring',
        'misconception_addressing',
        'multiple_representations',
      ],
    })

    // Prerequisite gap pattern
    this.gapPatterns.set('prerequisite_gap', {
      patternId: 'prerequisite_gap',
      name: 'Prerequisite Knowledge Gap',
      description: 'Student lacks necessary prerequisite knowledge',
      indicators: {
        performance: {
          accuracyThreshold: 0.5,
          consistencyRequired: false,
          timePatternSignificance: 1.0,
        },
        content: {
          topicSpecific: false,
          difficultyLevel: 'building_up',
          bloomsLevel: ['remember', 'understand'],
        },
        behavioral: {
          confidenceAlignment: 0.4,
          guessPattern: true,
          timeAllocation: 'too_fast',
        },
      },
      prevalence: 0.35,
      interventions: ['prerequisite_review', 'scaffolded_instruction', 'foundational_practice'],
    })

    // Procedural gap pattern
    this.gapPatterns.set('procedural_gap', {
      patternId: 'procedural_gap',
      name: 'Procedural Skill Gap',
      description: 'Student understands concepts but struggles with procedures',
      indicators: {
        performance: {
          accuracyThreshold: 0.6,
          consistencyRequired: false,
          timePatternSignificance: 0.8,
        },
        content: {
          topicSpecific: true,
          difficultyLevel: 'any',
          bloomsLevel: ['apply', 'analyze'],
        },
        behavioral: {
          confidenceAlignment: 0.5,
          guessPattern: false,
          timeAllocation: 'too_slow',
        },
      },
      prevalence: 0.2,
      interventions: ['step_by_step_practice', 'worked_examples', 'metacognitive_strategies'],
    })

    // Application gap pattern
    this.gapPatterns.set('application_gap', {
      patternId: 'application_gap',
      name: 'Application Difficulty',
      description: 'Student knows facts but cannot apply knowledge',
      indicators: {
        performance: {
          accuracyThreshold: 0.7,
          consistencyRequired: true,
          timePatternSignificance: 0.6,
        },
        content: {
          topicSpecific: false,
          difficultyLevel: 'advanced',
          bloomsLevel: ['apply', 'analyze', 'evaluate'],
        },
        behavioral: {
          confidenceAlignment: 0.6,
          guessPattern: false,
          timeAllocation: 'too_slow',
        },
      },
      prevalence: 0.15,
      interventions: ['transfer_practice', 'problem_solving_strategies', 'authentic_tasks'],
    })
  }

  private detectGapsMultiModal(
    responses: StudentResponse[],
    itemLookup: Map<string, ItemParameters>,
    performanceProfile: PerformanceProfile,
    knowledgeGraph: Map<string, KnowledgeNode>
  ): LearningGap[] {
    const gaps: LearningGap[] = []

    // Algorithm 1: Performance-based detection
    gaps.push(...this.detectPerformanceGaps(responses, itemLookup))

    // Algorithm 2: Pattern-based detection
    gaps.push(...this.detectPatternGaps(responses, itemLookup, performanceProfile))

    // Algorithm 3: Prerequisite-based detection
    gaps.push(...this.detectPrerequisiteGaps(responses, itemLookup, knowledgeGraph))

    // Algorithm 4: Time-based detection
    gaps.push(...this.detectTimingGaps(responses, itemLookup))

    // Algorithm 5: Confidence-alignment detection
    gaps.push(...this.detectConfidenceGaps(responses, itemLookup))

    // Consolidate and rank gaps
    return this.consolidateGaps(gaps)
  }

  private detectPerformanceGaps(
    responses: StudentResponse[],
    itemLookup: Map<string, ItemParameters>
  ): LearningGap[] {
    const gaps: LearningGap[] = []
    const topicPerformance = new Map<
      string,
      { correct: number; total: number; responses: StudentResponse[] }
    >()

    // Group responses by topic
    for (const response of responses) {
      const item = itemLookup.get(response.itemId)
      if (!item) continue

      const topicData = topicPerformance.get(item.topic) || { correct: 0, total: 0, responses: [] }
      topicData.total++
      topicData.responses.push(response)
      if (response.response) topicData.correct++
      topicPerformance.set(item.topic, topicData)
    }

    // Identify gaps based on low performance
    for (const [topic, data] of topicPerformance.entries()) {
      if (data.total < 3) continue // Need sufficient data

      const accuracy = data.correct / data.total
      if (accuracy < this.DETECTION_THRESHOLDS.accuracy) {
        const gap = this.createPerformanceGap(topic, data, accuracy)
        gaps.push(gap)
      }
    }

    return gaps
  }

  private detectPatternGaps(
    responses: StudentResponse[],
    itemLookup: Map<string, ItemParameters>,
    performanceProfile: PerformanceProfile
  ): LearningGap[] {
    const gaps: LearningGap[] = []

    // Check each gap pattern
    for (const [patternId, pattern] of this.gapPatterns) {
      const matchingResponses = this.findPatternMatches(responses, itemLookup, pattern)

      if (matchingResponses.length >= 3) {
        // Minimum evidence threshold
        const gap = this.createPatternGap(patternId, pattern, matchingResponses, itemLookup)
        gaps.push(gap)
      }
    }

    return gaps
  }

  private detectPrerequisiteGaps(
    responses: StudentResponse[],
    itemLookup: Map<string, ItemParameters>,
    knowledgeGraph: Map<string, KnowledgeNode>
  ): LearningGap[] {
    const gaps: LearningGap[] = []

    // Check for prerequisite violations
    for (const [concept, prerequisites] of this.BIOLOGY_CONCEPTS.prerequisites) {
      const conceptPerformance = this.calculateConceptPerformance(concept, responses, itemLookup)
      const prerequisiteStrength = this.assessPrerequisiteStrength(
        prerequisites,
        responses,
        itemLookup
      )

      // If struggling with concept but prerequisites are weak
      if (
        conceptPerformance < 0.6 &&
        prerequisiteStrength < this.DETECTION_THRESHOLDS.prerequisiteThreshold
      ) {
        const gap = this.createPrerequisiteGap(
          concept,
          prerequisites,
          prerequisiteStrength,
          conceptPerformance
        )
        gaps.push(gap)
      }
    }

    return gaps
  }

  private detectTimingGaps(
    responses: StudentResponse[],
    itemLookup: Map<string, ItemParameters>
  ): LearningGap[] {
    const gaps: LearningGap[] = []

    // Analyze timing patterns by topic
    const topicTimings = new Map<string, number[]>()

    for (const response of responses) {
      const item = itemLookup.get(response.itemId)
      if (!item) continue

      const timings = topicTimings.get(item.topic) || []
      timings.push(response.responseTime)
      topicTimings.set(item.topic, timings)
    }

    // Detect unusual timing patterns
    for (const [topic, timings] of topicTimings.entries()) {
      if (timings.length < 3) continue

      const avgTime = timings.reduce((sum, time) => sum + time, 0) / timings.length
      const expectedTime = 60 // Base expectation in seconds

      const timeDeviation = Math.abs(avgTime - expectedTime) / expectedTime

      if (timeDeviation > this.DETECTION_THRESHOLDS.timeDeviation) {
        const gap = this.createTimingGap(topic, avgTime, expectedTime, timeDeviation)
        gaps.push(gap)
      }
    }

    return gaps
  }

  private detectConfidenceGaps(
    responses: StudentResponse[],
    itemLookup: Map<string, ItemParameters>
  ): LearningGap[] {
    const gaps: LearningGap[] = []

    // Analyze confidence-performance alignment
    const confidenceResponses = responses.filter((r) => r.confidence !== undefined)

    if (confidenceResponses.length < 5) return gaps // Need sufficient confidence data

    const topicConfidenceData = new Map<
      string,
      { alignments: number[]; responses: StudentResponse[] }
    >()

    for (const response of confidenceResponses) {
      const item = itemLookup.get(response.itemId)
      if (!item || response.confidence === undefined) continue

      const normalizedConfidence = response.confidence / 5 // Convert to 0-1 scale
      const actualPerformance = response.response ? 1 : 0
      const alignment = 1 - Math.abs(normalizedConfidence - actualPerformance)

      const topicData = topicConfidenceData.get(item.topic) || { alignments: [], responses: [] }
      topicData.alignments.push(alignment)
      topicData.responses.push(response)
      topicConfidenceData.set(item.topic, topicData)
    }

    // Identify topics with poor confidence-performance alignment
    for (const [topic, data] of topicConfidenceData.entries()) {
      if (data.alignments.length < 3) continue

      const avgAlignment =
        data.alignments.reduce((sum, alignment) => sum + alignment, 0) / data.alignments.length

      if (avgAlignment < this.DETECTION_THRESHOLDS.confidenceAlignment) {
        const gap = this.createConfidenceGap(topic, data, avgAlignment)
        gaps.push(gap)
      }
    }

    return gaps
  }

  private consolidateGaps(gaps: LearningGap[]): LearningGap[] {
    // Remove duplicates and merge similar gaps
    const consolidatedGaps = new Map<string, LearningGap>()

    for (const gap of gaps) {
      const key = `${gap.topic}_${gap.type}`
      const existing = consolidatedGaps.get(key)

      if (existing) {
        // Merge evidence and increase confidence
        existing.evidence.itemsAttempted += gap.evidence.itemsAttempted
        existing.confidence = Math.max(existing.confidence, gap.confidence)
        existing.severity = Math.max(existing.severity, gap.severity)
      } else {
        consolidatedGaps.set(key, gap)
      }
    }

    // Sort by severity and confidence
    return Array.from(consolidatedGaps.values()).sort(
      (a, b) => b.severity * b.confidence - a.severity * a.confidence
    )
  }

  // Helper methods for gap creation
  private createPerformanceGap(
    topic: string,
    data: { correct: number; total: number; responses: StudentResponse[] },
    accuracy: number
  ): LearningGap {
    const severity = 1 - accuracy
    const confidence = Math.min(1, data.total / 10) // More data = higher confidence

    return {
      id: `perf_gap_${topic}_${Date.now()}`,
      type: 'conceptual',
      topic,
      subtopic: topic,
      severity,
      confidence,
      evidence: {
        itemsAttempted: data.total,
        successRate: accuracy,
        consistentFailures: data.correct === 0,
        timePatterns: 'normal',
        errorPatterns: ['low_accuracy'],
        responseConfidenceAlignment: 0.5,
      },
      rootCauses: {
        primary: 'insufficient_understanding',
        contributing: ['lack_of_practice', 'conceptual_confusion'],
        hypotheses: ['needs_different_explanation', 'prerequisite_gaps'],
      },
      impact: {
        currentPerformance: severity,
        futureRisk: severity * 0.8,
        prerequisiteBlocking: [],
        dependentConcepts: this.findDependentConcepts(topic),
      },
      detection: {
        method: 'performance_analysis',
        timestamp: new Date(),
        triggerItems: data.responses.map((r) => r.itemId),
        algorithmConfidence: confidence,
      },
      remediation: {
        priority: severity > 0.7 ? 'immediate' : severity > 0.5 ? 'high' : 'medium',
        estimatedEffort: Math.round(severity * 10), // hours
        suggestedApproach: ['review_fundamentals', 'guided_practice', 'concept_mapping'],
        prerequisiteWork: this.BIOLOGY_CONCEPTS.prerequisites.get(topic) || [],
        scaffoldingNeeded: severity > 0.6,
      },
    }
  }

  private createPatternGap(
    patternId: string,
    pattern: GapPattern,
    matchingResponses: StudentResponse[],
    itemLookup: Map<string, ItemParameters>
  ): LearningGap {
    const topics = matchingResponses
      .map((r) => itemLookup.get(r.itemId)?.topic)
      .filter(Boolean) as string[]
    const primaryTopic = topics[0] || 'Unknown'

    return {
      id: `pattern_gap_${patternId}_${Date.now()}`,
      type: patternId as any,
      topic: primaryTopic,
      subtopic: primaryTopic,
      severity: 0.7, // Pattern-detected gaps are typically significant
      confidence: 0.8,
      evidence: {
        itemsAttempted: matchingResponses.length,
        successRate: matchingResponses.filter((r) => r.response).length / matchingResponses.length,
        consistentFailures: true,
        timePatterns: 'normal',
        errorPatterns: [pattern.name],
        responseConfidenceAlignment: 0.4,
      },
      rootCauses: {
        primary: pattern.description,
        contributing: pattern.interventions,
        hypotheses: [`Matches ${pattern.name} pattern`],
      },
      impact: {
        currentPerformance: 0.7,
        futureRisk: 0.8,
        prerequisiteBlocking: [],
        dependentConcepts: [],
      },
      detection: {
        method: 'pattern_analysis',
        timestamp: new Date(),
        triggerItems: matchingResponses.map((r) => r.itemId),
        algorithmConfidence: 0.8,
      },
      remediation: {
        priority: 'high',
        estimatedEffort: 8,
        suggestedApproach: pattern.interventions,
        prerequisiteWork: [],
        scaffoldingNeeded: true,
      },
    }
  }

  private createPrerequisiteGap(
    concept: string,
    prerequisites: string[],
    prerequisiteStrength: number,
    conceptPerformance: number
  ): LearningGap {
    const severity = 1 - prerequisiteStrength

    return {
      id: `prereq_gap_${concept}_${Date.now()}`,
      type: 'prerequisite',
      topic: concept,
      subtopic: concept,
      severity,
      confidence: 0.9, // High confidence in prerequisite analysis
      evidence: {
        itemsAttempted: 5, // Estimated
        successRate: conceptPerformance,
        consistentFailures: true,
        timePatterns: 'normal',
        errorPatterns: ['prerequisite_weakness'],
        responseConfidenceAlignment: 0.5,
      },
      rootCauses: {
        primary: 'prerequisite_knowledge_gap',
        contributing: prerequisites.map((p) => `weak_${p}`),
        hypotheses: ['needs_prerequisite_review'],
      },
      impact: {
        currentPerformance: severity,
        futureRisk: 0.9, // High future risk if prerequisites not addressed
        prerequisiteBlocking: [concept],
        dependentConcepts: this.findDependentConcepts(concept),
      },
      detection: {
        method: 'prerequisite_analysis',
        timestamp: new Date(),
        triggerItems: [],
        algorithmConfidence: 0.9,
      },
      remediation: {
        priority: 'immediate',
        estimatedEffort: Math.round(severity * 15),
        suggestedApproach: ['prerequisite_review', 'scaffolded_progression'],
        prerequisiteWork: prerequisites,
        scaffoldingNeeded: true,
      },
    }
  }

  private createTimingGap(
    topic: string,
    avgTime: number,
    expectedTime: number,
    timeDeviation: number
  ): LearningGap {
    const isSlowResponse = avgTime > expectedTime
    const gapType = isSlowResponse ? 'procedural' : 'metacognitive'

    return {
      id: `timing_gap_${topic}_${Date.now()}`,
      type: gapType,
      topic,
      subtopic: topic,
      severity: Math.min(1, timeDeviation / 2),
      confidence: 0.6,
      evidence: {
        itemsAttempted: 5, // Estimated
        successRate: 0.5, // Unknown from timing alone
        consistentFailures: false,
        timePatterns: isSlowResponse ? 'too_slow' : 'too_fast',
        errorPatterns: [isSlowResponse ? 'slow_processing' : 'hasty_responses'],
        responseConfidenceAlignment: 0.5,
      },
      rootCauses: {
        primary: isSlowResponse ? 'processing_difficulty' : 'insufficient_reflection',
        contributing: isSlowResponse ? ['lack_of_automaticity'] : ['impulsive_responding'],
        hypotheses: [isSlowResponse ? 'needs_more_practice' : 'needs_metacognitive_training'],
      },
      impact: {
        currentPerformance: 0.4,
        futureRisk: 0.6,
        prerequisiteBlocking: [],
        dependentConcepts: [],
      },
      detection: {
        method: 'timing_analysis',
        timestamp: new Date(),
        triggerItems: [],
        algorithmConfidence: 0.6,
      },
      remediation: {
        priority: 'medium',
        estimatedEffort: 5,
        suggestedApproach: isSlowResponse ? ['fluency_practice'] : ['metacognitive_strategies'],
        prerequisiteWork: [],
        scaffoldingNeeded: false,
      },
    }
  }

  private createConfidenceGap(
    topic: string,
    data: { alignments: number[]; responses: StudentResponse[] },
    avgAlignment: number
  ): LearningGap {
    return {
      id: `confidence_gap_${topic}_${Date.now()}`,
      type: 'metacognitive',
      topic,
      subtopic: topic,
      severity: 1 - avgAlignment,
      confidence: 0.7,
      evidence: {
        itemsAttempted: data.responses.length,
        successRate: data.responses.filter((r) => r.response).length / data.responses.length,
        consistentFailures: false,
        timePatterns: 'normal',
        errorPatterns: ['confidence_miscalibration'],
        responseConfidenceAlignment: avgAlignment,
      },
      rootCauses: {
        primary: 'metacognitive_awareness_gap',
        contributing: ['overconfidence', 'underconfidence'],
        hypotheses: ['needs_calibration_training'],
      },
      impact: {
        currentPerformance: 0.3,
        futureRisk: 0.5,
        prerequisiteBlocking: [],
        dependentConcepts: [],
      },
      detection: {
        method: 'confidence_analysis',
        timestamp: new Date(),
        triggerItems: data.responses.map((r) => r.itemId),
        algorithmConfidence: 0.7,
      },
      remediation: {
        priority: 'medium',
        estimatedEffort: 4,
        suggestedApproach: ['metacognitive_training', 'confidence_calibration'],
        prerequisiteWork: [],
        scaffoldingNeeded: false,
      },
    }
  }

  // Additional helper methods (simplified implementations)
  private detectGapsFromResponses(
    responses: StudentResponse[],
    itemLookup: Map<string, ItemParameters>
  ): LearningGap[] {
    // Simplified gap detection for monitoring
    return this.detectPerformanceGaps(responses, itemLookup)
  }

  private compareGapStates(existingGaps: LearningGap[], currentGaps: LearningGap[]): any {
    const existingTopics = new Set(existingGaps.map((g) => g.topic))
    const currentTopics = new Set(currentGaps.map((g) => g.topic))

    return {
      resolved: Array.from(existingTopics).filter((topic) => !currentTopics.has(topic)),
      improved: [], // Would need more sophisticated comparison
      persistent: Array.from(existingTopics).filter((topic) => currentTopics.has(topic)),
      newGaps: Array.from(currentTopics).filter((topic) => !existingTopics.has(topic)),
    }
  }

  private calculateRemediationProgress(
    existingGaps: LearningGap[],
    currentGaps: LearningGap[]
  ): any {
    return {
      gapsAddressed: Math.max(0, existingGaps.length - currentGaps.length),
      gapsRemaining: currentGaps.length,
      improvementRate:
        existingGaps.length > 0
          ? (existingGaps.length - currentGaps.length) / existingGaps.length
          : 1,
      timeOnTrack: true, // Simplified
    }
  }

  private generateProgressRecommendations(gapComparison: any, progressSummary: any): any {
    return {
      continueCurrentPlan: progressSummary.improvementRate > 0.5,
      adjustments:
        gapComparison.persistent.length > 0 ? ['Intensify efforts on persistent gaps'] : [],
      newInterventions: gapComparison.newGaps.length > 0 ? ['Address newly identified gaps'] : [],
    }
  }

  private analyzeGapPatterns(
    detectedGaps: LearningGap[],
    responses: StudentResponse[],
    itemLookup: Map<string, ItemParameters>
  ): any {
    return {
      identifiedPatterns: Array.from(new Set(detectedGaps.map((g) => g.type))),
      riskFactors: ['low_prior_knowledge', 'insufficient_practice'],
      protectiveFactors: ['high_engagement', 'good_study_habits'],
    }
  }

  private generateRemediationPlan(
    studentId: string,
    gaps: LearningGap[],
    performanceProfile: PerformanceProfile
  ): RemediationPlan {
    const criticalGaps = gaps.filter((g) => g.severity > 0.7)
    const estimatedDuration = gaps.reduce((sum, gap) => sum + gap.remediation.estimatedEffort, 0)

    return {
      id: `remediation_${studentId}_${Date.now()}`,
      studentId,
      gaps: gaps.map((g) => g.id),
      strategy: 'sequential',
      phases: [
        {
          name: 'Foundation Building',
          duration: estimatedDuration * 0.6,
          objectives: ['Address critical gaps', 'Build prerequisites'],
          activities: this.generateRemediationActivities(criticalGaps),
          assessments: ['prerequisite_check', 'concept_understanding'],
          successCriteria: ['70% accuracy on practice items', 'Consistent performance'],
        },
      ],
      timeline: {
        startDate: new Date(),
        estimatedCompletion: new Date(Date.now() + estimatedDuration * 24 * 60 * 60 * 1000),
        milestones: [
          {
            date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            description: 'Week 1 checkpoint',
          },
          {
            date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
            description: 'Week 2 assessment',
          },
        ],
      },
      personalization: {
        learningStyle: 'visual', // Would be determined from profile
        preferredModalities: ['visual', 'kinesthetic'],
        paceAdjustments: 0,
        scaffoldingLevel: 2,
      },
      monitoring: {
        checkpoints: [
          new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        ],
        progressMetrics: ['accuracy_improvement', 'time_efficiency', 'confidence_growth'],
        adaptationTriggers: ['no_improvement_after_3_days', 'accuracy_below_60%'],
      },
    }
  }

  private generateGapAnalysisReport(
    studentId: string,
    sessionId: string,
    gaps: LearningGap[],
    patterns: any,
    remediationPlan: RemediationPlan
  ): GapAnalysisReport {
    const criticalGaps = gaps.filter((g) => g.severity > 0.7).length
    const gapsByType = new Map<string, number>()
    const gapsByTopic = new Map<string, number>()

    for (const gap of gaps) {
      gapsByType.set(gap.type, (gapsByType.get(gap.type) || 0) + 1)
      gapsByTopic.set(gap.topic, (gapsByTopic.get(gap.topic) || 0) + 1)
    }

    const overallSeverity =
      gaps.length > 0 ? gaps.reduce((sum, gap) => sum + gap.severity, 0) / gaps.length : 0

    return {
      studentId,
      sessionId,
      analysisDate: new Date(),
      summary: {
        totalGaps: gaps.length,
        criticalGaps,
        gapsByType,
        gapsByTopic,
        overallSeverity,
        urgencyLevel: criticalGaps > 2 ? 'immediate' : criticalGaps > 0 ? 'high' : 'medium',
      },
      detailedGaps: gaps,
      patterns,
      recommendations: {
        immediate: gaps
          .filter((g) => g.remediation.priority === 'immediate')
          .map((g) => g.remediation.suggestedApproach[0]),
        shortTerm: ['Implement remediation plan', 'Monitor progress weekly'],
        longTerm: ['Build strong foundations', 'Develop metacognitive skills'],
        preventive: ['Regular practice', 'Concept mapping', 'Peer discussion'],
      },
      remediationPlan,
      monitoring: {
        keyIndicators: ['accuracy_trend', 'time_efficiency', 'confidence_alignment'],
        checkpointSchedule: remediationPlan.monitoring.checkpoints,
        successMetrics: ['Gap reduction', 'Performance improvement', 'Sustained progress'],
      },
    }
  }

  // Additional simplified helper methods
  private findDependentConcepts(concept: string): string[] {
    const dependent: string[] = []
    for (const [topic, prerequisites] of this.BIOLOGY_CONCEPTS.prerequisites) {
      if (prerequisites.includes(concept)) {
        dependent.push(topic)
      }
    }
    return dependent
  }

  private findPatternMatches(
    responses: StudentResponse[],
    itemLookup: Map<string, ItemParameters>,
    pattern: GapPattern
  ): StudentResponse[] {
    // Simplified pattern matching
    return responses.filter((response) => {
      const item = itemLookup.get(response.itemId)
      if (!item) return false

      const accuracy = response.response ? 1 : 0
      return accuracy < pattern.indicators.performance.accuracyThreshold
    })
  }

  private calculateConceptPerformance(
    concept: string,
    responses: StudentResponse[],
    itemLookup: Map<string, ItemParameters>
  ): number {
    const conceptResponses = responses.filter((response) => {
      const item = itemLookup.get(response.itemId)
      return item && (item.topic === concept || item.subtopic === concept)
    })

    if (conceptResponses.length === 0) return 0

    const correct = conceptResponses.filter((r) => r.response).length
    return correct / conceptResponses.length
  }

  private assessPrerequisiteStrength(
    prerequisites: string[],
    responses: StudentResponse[],
    itemLookup: Map<string, ItemParameters>
  ): number {
    if (prerequisites.length === 0) return 1

    const strengths = prerequisites.map((prereq) =>
      this.calculateConceptPerformance(prereq, responses, itemLookup)
    )

    return strengths.reduce((sum, strength) => sum + strength, 0) / strengths.length
  }

  private analyzeResponsePatterns(
    responses: StudentResponse[],
    itemLookup: Map<string, ItemParameters>
  ): any {
    const recentResponses = responses.slice(-10)
    const recentAccuracy =
      recentResponses.filter((r) => r.response).length / Math.max(1, recentResponses.length)
    const earlyAccuracy =
      responses.slice(0, 10).filter((r) => r.response).length /
      Math.max(1, responses.slice(0, 10).length)

    return {
      accuracyTrend:
        recentAccuracy > earlyAccuracy + 0.1
          ? 'improving'
          : recentAccuracy < earlyAccuracy - 0.1
            ? 'declining'
            : 'stable',
    }
  }

  private generatePreventiveRecommendations(riskGaps: any[], earlyWarnings: any[]): string[] {
    const recommendations = []

    if (riskGaps.length > 0) {
      recommendations.push('Strengthen foundational concepts')
      recommendations.push('Increase practice frequency')
    }

    if (earlyWarnings.some((w) => w.type === 'cognitive_overload')) {
      recommendations.push('Reduce cognitive load with scaffolding')
      recommendations.push('Break complex tasks into smaller steps')
    }

    return recommendations
  }

  private designIntervention(gap: LearningGap, profile: PerformanceProfile, constraints: any): any {
    const activities = this.generateRemediationActivities([gap])

    return {
      type: gap.type,
      activities,
      estimatedTime: gap.remediation.estimatedEffort,
      successProbability: 0.8,
    }
  }

  private generateInterventionAlternatives(gap: LearningGap, profile: PerformanceProfile): any {
    const baseActivities = this.generateRemediationActivities([gap])

    return {
      quick: baseActivities.slice(0, 1),
      comprehensive: baseActivities,
      maintenance: baseActivities.slice(-1),
    }
  }

  private designMonitoringPlan(gap: LearningGap, intervention: any): any {
    return {
      indicators: ['accuracy_improvement', 'response_time', 'confidence'],
      checkpoints: [3, 7, 14], // days
      adaptationTriggers: ['no_improvement', 'performance_decline'],
    }
  }

  private generateRemediationActivities(gaps: LearningGap[]): RemediationActivity[] {
    return gaps.map((gap) => ({
      id: `activity_${gap.id}`,
      type: 'review' as const,
      name: `Review ${gap.topic}`,
      description: `Targeted review for ${gap.topic} understanding`,
      estimatedTime: 30,
      difficulty: 0.4,
      prerequisites: gap.remediation.prerequisiteWork,
      resources: {
        content: [`${gap.topic} explanations`],
        tools: ['concept_mapper', 'practice_quiz'],
        references: [`${gap.topic} textbook chapter`],
      },
      adaptations: {
        visualSupport: true,
        auditorySupport: false,
        kinestheticSupport: false,
        scaffolding: ['step_by_step_guide', 'worked_examples'],
      },
    }))
  }
}

export const learningGapAnalysis = LearningGapAnalysis.getInstance()
export default LearningGapAnalysis
