/**
 * Computer Adaptive Testing (CAT) Engine
 * Real-time adaptive test administration with advanced algorithms
 *
 * Features:
 * - Real-time difficulty adjustment
 * - Content balancing and exposure control
 * - Multiple termination criteria
 * - Performance prediction
 * - Learning gap identification
 * - Adaptive time allocation
 */

import {
  irtEngine,
  ItemParameters,
  StudentResponse,
  AbilityEstimate,
  AdaptiveTestState,
} from './ItemResponseTheory'

export interface CATConfiguration {
  algorithm: 'maximum_information' | 'bayesian_optimal' | 'hybrid'
  startingAbility: number
  minimumItems: number
  maximumItems: number
  targetStandardError: number
  targetInformation: number
  contentBalancing: {
    enabled: boolean
    topicWeights: Map<string, number>
    difficultyDistribution: {
      easy: number // percentage
      medium: number // percentage
      hard: number // percentage
    }
    bloomsLevelBalance: boolean
  }
  exposureControl: {
    enabled: boolean
    maxExposureRate: number // maximum times an item can be used
    stratificationLevels: number // number of ability strata for exposure control
  }
  timeManagement: {
    adaptiveTime: boolean
    baseTimePerItem: number // seconds
    difficultyTimeMultiplier: number
    maximumTimePerItem: number
    warningTimeThreshold: number
  }
  terminationCriteria: {
    standardErrorBased: boolean
    informationBased: boolean
    confidenceBased: boolean
    minimumConfidenceLevel: number
  }
  realTimeAnalysis: {
    performancePrediction: boolean
    learningGapDetection: boolean
    difficultyCalibration: boolean
    responseTimeAnalysis: boolean
  }
}

export interface CATSession {
  id: string
  studentId: string
  configuration: CATConfiguration
  state: AdaptiveTestState
  realTimeMetrics: {
    currentDifficulty: number
    estimatedCompletion: number // percentage
    predictedFinalScore: number
    confidenceInterval: [number, number]
    timeRemaining: number
    averageItemTime: number
    difficultyTrend: 'increasing' | 'decreasing' | 'stable'
    performanceTrend: 'improving' | 'declining' | 'stable'
  }
  adaptiveAdjustments: {
    difficultyChanges: number[]
    timeExtensions: number[]
    contentAdjustments: string[]
    interventions: string[]
  }
  learningGaps: {
    identifiedGaps: string[]
    severity: Map<string, number> // 0-1 scale
    recommendations: string[]
    remediationSuggestions: string[]
  }
  metadata: {
    startTime: Date
    lastUpdateTime: Date
    totalPauseTime: number
    systemInterventions: number
    adaptationEvents: string[]
  }
}

export interface AdaptationEvent {
  timestamp: Date
  type: 'difficulty_adjustment' | 'time_extension' | 'content_branching' | 'termination_check'
  trigger: string
  action: string
  parameters: Record<string, any>
  outcome: string
}

export interface LearningGap {
  topic: string
  subtopic: string
  severity: number // 0-1 scale
  confidence: number // how confident we are about this gap
  evidenceCount: number // number of items contributing to this assessment
  patterns: {
    consistentErrors: boolean
    timeStruggle: boolean
    difficultySpecific: boolean
    prerequisiteGap: boolean
  }
  recommendations: {
    remediation: string[]
    practiceAreas: string[]
    prerequisiteReview: string[]
  }
}

class ComputerAdaptiveTesting {
  private static instance: ComputerAdaptiveTesting
  private activeSessions: Map<string, CATSession> = new Map()
  private itemBank: ItemParameters[] = []
  private exposureRates: Map<string, number> = new Map()
  private performanceDatabase: Map<string, StudentResponse[]> = new Map()

  constructor() {
    this.initializeItemBank()
  }

  static getInstance(): ComputerAdaptiveTesting {
    if (!ComputerAdaptiveTesting.instance) {
      ComputerAdaptiveTesting.instance = new ComputerAdaptiveTesting()
    }
    return ComputerAdaptiveTesting.instance
  }

  /**
   * Initialize adaptive test session
   */
  async createSession(
    studentId: string,
    configuration: CATConfiguration,
    curriculum: string,
    grade: string,
    topics?: string[]
  ): Promise<CATSession> {
    // Filter item bank based on curriculum, grade, and topics
    const availableItems = this.filterItemBank(curriculum, grade, topics)

    const initialState: AdaptiveTestState = {
      studentId,
      currentAbility: {
        theta: configuration.startingAbility,
        standardError: 2.0, // High initial uncertainty
        confidence: 0.1,
        informationGained: 0,
        estimationMethod: 'EAP',
        convergence: false,
        iterations: 0,
      },
      administeredItems: [],
      responses: [],
      availableItems,
      testConfiguration: {
        minItems: configuration.minimumItems,
        maxItems: configuration.maximumItems,
        targetSE: configuration.targetStandardError,
        targetInfo: configuration.targetInformation,
        contentBalancing: configuration.contentBalancing.enabled,
        timeLimit: configuration.maximumItems * configuration.timeManagement.baseTimePerItem,
      },
      performanceMetrics: {
        accuracy: 0,
        averageResponseTime: 0,
        difficultyProgression: [],
        informationProgression: [],
      },
    }

    const session: CATSession = {
      id: `cat_session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      studentId,
      configuration,
      state: initialState,
      realTimeMetrics: {
        currentDifficulty: configuration.startingAbility,
        estimatedCompletion: 0,
        predictedFinalScore: 50,
        confidenceInterval: [30, 70],
        timeRemaining: initialState.testConfiguration.timeLimit,
        averageItemTime: configuration.timeManagement.baseTimePerItem,
        difficultyTrend: 'stable',
        performanceTrend: 'stable',
      },
      adaptiveAdjustments: {
        difficultyChanges: [],
        timeExtensions: [],
        contentAdjustments: [],
        interventions: [],
      },
      learningGaps: {
        identifiedGaps: [],
        severity: new Map(),
        recommendations: [],
        remediationSuggestions: [],
      },
      metadata: {
        startTime: new Date(),
        lastUpdateTime: new Date(),
        totalPauseTime: 0,
        systemInterventions: 0,
        adaptationEvents: [],
      },
    }

    this.activeSessions.set(session.id, session)
    return session
  }

  /**
   * Get next item using adaptive algorithm
   */
  async getNextItem(sessionId: string): Promise<{
    item: ItemParameters | null
    adaptationInfo: {
      selectionReason: string
      informationGain: number
      difficulty: number
      estimatedTime: number
      contentBalance: string
    }
    testStatus: {
      progress: number
      shouldContinue: boolean
      terminationReason?: string
    }
  }> {
    const session = this.activeSessions.get(sessionId)
    if (!session) throw new Error('Session not found')

    // Check termination criteria
    const terminationCheck = irtEngine.shouldTerminateTest(session.state)
    if (terminationCheck.shouldTerminate) {
      return {
        item: null,
        adaptationInfo: {
          selectionReason: 'Test terminated',
          informationGain: 0,
          difficulty: 0,
          estimatedTime: 0,
          contentBalance: 'N/A',
        },
        testStatus: {
          progress: 100,
          shouldContinue: false,
          terminationReason: terminationCheck.reason,
        },
      }
    }

    // Apply content constraints
    const contentConstraints = this.buildContentConstraints(session)

    // Select next item using IRT
    const nextItem = irtEngine.selectNextItem(
      session.state.currentAbility,
      session.state.availableItems,
      session.state.administeredItems,
      contentConstraints
    )

    if (!nextItem) {
      return {
        item: null,
        adaptationInfo: {
          selectionReason: 'No suitable items available',
          informationGain: 0,
          difficulty: 0,
          estimatedTime: 0,
          contentBalance: 'N/A',
        },
        testStatus: {
          progress: 100,
          shouldContinue: false,
          terminationReason: 'Item bank exhausted',
        },
      }
    }

    // Calculate adaptation information
    const informationGain = irtEngine.calculateInformation(
      session.state.currentAbility.theta,
      nextItem
    )
    const progress =
      (session.state.administeredItems.length / session.state.testConfiguration.maxItems) * 100

    // Update exposure tracking
    this.updateExposureRate(nextItem.id)

    // Log adaptation event
    this.logAdaptationEvent(session, {
      timestamp: new Date(),
      type: 'content_branching',
      trigger: 'Item selection',
      action: `Selected item ${nextItem.id}`,
      parameters: {
        itemDifficulty: nextItem.difficulty,
        currentAbility: session.state.currentAbility.theta,
        informationGain,
      },
      outcome: 'Item ready for administration',
    })

    return {
      item: nextItem,
      adaptationInfo: {
        selectionReason: session.configuration.algorithm,
        informationGain,
        difficulty: nextItem.difficulty,
        estimatedTime: this.calculateAdaptiveTime(nextItem, session),
        contentBalance: this.assessContentBalance(session),
      },
      testStatus: {
        progress,
        shouldContinue: true,
      },
    }
  }

  /**
   * Process student response and update ability estimate
   */
  async processResponse(
    sessionId: string,
    itemId: string,
    isCorrect: boolean,
    responseTime: number,
    confidence?: number
  ): Promise<{
    updatedAbility: AbilityEstimate
    nextRecommendation: 'continue' | 'take_break' | 'review_topic' | 'terminate'
    adaptiveChanges: {
      difficultyAdjusted: boolean
      timeExtended: boolean
      contentRedirected: boolean
    }
    learningInsights: {
      newGapsIdentified: string[]
      improvementAreas: string[]
      strengthsConfirmed: string[]
    }
  }> {
    const session = this.activeSessions.get(sessionId)
    if (!session) throw new Error('Session not found')

    // Record response
    const response: StudentResponse = {
      itemId,
      response: isCorrect,
      responseTime,
      confidence,
      timestamp: new Date(),
    }

    session.state.responses.push(response)
    session.state.administeredItems.push(itemId)

    // Update ability estimate using IRT
    const itemBank = session.state.availableItems
    const updatedAbility = irtEngine.estimateAbilityMLE(session.state.responses, itemBank)
    session.state.currentAbility = updatedAbility

    // Update performance metrics
    this.updatePerformanceMetrics(session)

    // Analyze for learning gaps
    const learningGaps = await this.identifyLearningGaps(session)
    session.learningGaps = learningGaps

    // Update real-time metrics
    this.updateRealTimeMetrics(session)

    // Check for adaptive adjustments
    const adaptiveChanges = this.checkAdaptiveAdjustments(session, response)

    // Generate next recommendation
    const nextRecommendation = this.generateNextRecommendation(session, response)

    // Determine learning insights
    const learningInsights = this.analyzeLearningInsights(session)

    session.metadata.lastUpdateTime = new Date()
    this.activeSessions.set(sessionId, session)

    return {
      updatedAbility,
      nextRecommendation,
      adaptiveChanges,
      learningInsights,
    }
  }

  /**
   * Get real-time performance analytics
   */
  getRealTimeAnalytics(sessionId: string): {
    currentPerformance: {
      ability: number
      accuracy: number
      averageTime: number
      itemsCompleted: number
      itemsRemaining: number
    }
    predictions: {
      finalScore: number
      timeToCompletion: number
      confidenceInterval: [number, number]
      successProbability: number
    }
    adaptations: {
      difficultyAdjustments: number
      timeExtensions: number
      contentChanges: number
      interventions: string[]
    }
    learningProfile: {
      strongTopics: string[]
      weakTopics: string[]
      recommendedFocus: string[]
      masteryLevel: string
    }
  } {
    const session = this.activeSessions.get(sessionId)
    if (!session) throw new Error('Session not found')

    const currentPerformance = {
      ability: session.state.currentAbility.theta,
      accuracy: session.state.performanceMetrics.accuracy,
      averageTime: session.state.performanceMetrics.averageResponseTime,
      itemsCompleted: session.state.administeredItems.length,
      itemsRemaining: Math.max(
        0,
        session.state.testConfiguration.maxItems - session.state.administeredItems.length
      ),
    }

    const predictions = this.generatePerformancePredictions(session)
    const learningProfile = this.generateLearningProfile(session)

    return {
      currentPerformance,
      predictions,
      adaptations: {
        difficultyAdjustments: session.adaptiveAdjustments.difficultyChanges.length,
        timeExtensions: session.adaptiveAdjustments.timeExtensions.length,
        contentChanges: session.adaptiveAdjustments.contentAdjustments.length,
        interventions: session.adaptiveAdjustments.interventions,
      },
      learningProfile,
    }
  }

  /**
   * Identify learning gaps using response patterns
   */
  private async identifyLearningGaps(session: CATSession): Promise<{
    identifiedGaps: string[]
    severity: Map<string, number>
    recommendations: string[]
    remediationSuggestions: string[]
  }> {
    const gaps: LearningGap[] = []
    const topicPerformance = new Map<string, { correct: number; total: number; times: number[] }>()

    // Analyze topic-level performance
    for (const response of session.state.responses) {
      const item = session.state.availableItems.find((i) => i.id === response.itemId)
      if (!item) continue

      const topicData = topicPerformance.get(item.topic) || { correct: 0, total: 0, times: [] }
      topicData.total++
      topicData.times.push(response.responseTime)
      if (response.response) topicData.correct++
      topicPerformance.set(item.topic, topicData)
    }

    // Identify gaps
    for (const [topic, data] of topicPerformance.entries()) {
      if (data.total < 2) continue // Need at least 2 responses for reliable assessment

      const accuracy = data.correct / data.total
      const avgTime = data.times.reduce((sum, time) => sum + time, 0) / data.times.length
      const expectedTime = session.configuration.timeManagement.baseTimePerItem

      // Gap detection criteria
      const isAccuracyGap = accuracy < 0.6
      const isTimeGap = avgTime > expectedTime * 1.5
      const isConsistentGap = data.total >= 3 && accuracy < 0.5

      if (isAccuracyGap || isTimeGap || isConsistentGap) {
        const severity = Math.max(0, 1 - accuracy) * (isTimeGap ? 1.2 : 1.0)
        gaps.push({
          topic,
          subtopic: topic, // Simplified for this implementation
          severity: Math.min(1, severity),
          confidence: Math.min(1, data.total / 5), // More responses = higher confidence
          evidenceCount: data.total,
          patterns: {
            consistentErrors: isConsistentGap,
            timeStruggle: isTimeGap,
            difficultySpecific: false, // Would need more analysis
            prerequisiteGap: accuracy < 0.3, // Very low accuracy suggests fundamental gaps
          },
          recommendations: {
            remediation: [`Review ${topic} fundamentals`],
            practiceAreas: [`Focus on ${topic} practice problems`],
            prerequisiteReview: accuracy < 0.3 ? [`Review prerequisites for ${topic}`] : [],
          },
        })
      }
    }

    // Sort gaps by severity
    gaps.sort((a, b) => b.severity - a.severity)

    const identifiedGaps = gaps.map((gap) => gap.topic)
    const severity = new Map(gaps.map((gap) => [gap.topic, gap.severity]))
    const recommendations = gaps
      .slice(0, 3)
      .map((gap) => `Focus on ${gap.topic} (accuracy: ${Math.round((1 - gap.severity) * 100)}%)`)
    const remediationSuggestions = gaps
      .slice(0, 3)
      .flatMap((gap) => gap.recommendations.remediation)

    return {
      identifiedGaps,
      severity,
      recommendations,
      remediationSuggestions,
    }
  }

  /**
   * Update performance metrics
   */
  private updatePerformanceMetrics(session: CATSession): void {
    const responses = session.state.responses
    if (responses.length === 0) return

    const correctResponses = responses.filter((r) => r.response).length
    const accuracy = correctResponses / responses.length

    const totalTime = responses.reduce((sum, r) => sum + r.responseTime, 0)
    const averageTime = totalTime / responses.length

    session.state.performanceMetrics.accuracy = accuracy
    session.state.performanceMetrics.averageResponseTime = averageTime
    session.state.performanceMetrics.difficultyProgression.push(session.state.currentAbility.theta)
    session.state.performanceMetrics.informationProgression.push(
      session.state.currentAbility.informationGained
    )
  }

  /**
   * Update real-time metrics
   */
  private updateRealTimeMetrics(session: CATSession): void {
    const metrics = session.realTimeMetrics
    const state = session.state

    // Update current difficulty
    metrics.currentDifficulty = state.currentAbility.theta

    // Calculate completion percentage
    metrics.estimatedCompletion =
      (state.administeredItems.length / state.testConfiguration.maxItems) * 100

    // Predict final score
    const scoreReport = irtEngine.generateScoreReport(
      state.currentAbility,
      state.responses,
      state.availableItems
    )
    metrics.predictedFinalScore = scoreReport.scaledScore

    // Update confidence interval
    const se = state.currentAbility.standardError
    const theta = state.currentAbility.theta
    metrics.confidenceInterval = [
      Math.max(0, Math.round(50 + 10 * (theta - 1.96 * se))),
      Math.min(100, Math.round(50 + 10 * (theta + 1.96 * se))),
    ]

    // Update trends
    if (state.performanceMetrics.difficultyProgression.length >= 3) {
      const recent = state.performanceMetrics.difficultyProgression.slice(-3)
      const trend = recent[2] - recent[0]
      metrics.difficultyTrend = trend > 0.2 ? 'increasing' : trend < -0.2 ? 'decreasing' : 'stable'
    }

    // Calculate time remaining
    const itemsRemaining = Math.max(
      0,
      state.testConfiguration.maxItems - state.administeredItems.length
    )
    const avgItemTime =
      state.performanceMetrics.averageResponseTime ||
      session.configuration.timeManagement.baseTimePerItem
    metrics.timeRemaining = itemsRemaining * avgItemTime
    metrics.averageItemTime = avgItemTime
  }

  /**
   * Check for adaptive adjustments needed
   */
  private checkAdaptiveAdjustments(
    session: CATSession,
    lastResponse: StudentResponse
  ): {
    difficultyAdjusted: boolean
    timeExtended: boolean
    contentRedirected: boolean
  } {
    let difficultyAdjusted = false
    let timeExtended = false
    let contentRedirected = false

    const responses = session.state.responses
    const config = session.configuration

    // Check for difficulty adjustment
    if (responses.length >= 3) {
      const recentResponses = responses.slice(-3)
      const recentAccuracy =
        recentResponses.filter((r) => r.response).length / recentResponses.length

      if (recentAccuracy >= 0.8 && session.state.currentAbility.standardError < 0.7) {
        // Increase difficulty
        session.adaptiveAdjustments.difficultyChanges.push(0.5)
        difficultyAdjusted = true
      } else if (recentAccuracy <= 0.3 && session.state.currentAbility.standardError > 1.0) {
        // Decrease difficulty
        session.adaptiveAdjustments.difficultyChanges.push(-0.5)
        difficultyAdjusted = true
      }
    }

    // Check for time extension
    if (
      config.timeManagement.adaptiveTime &&
      lastResponse.responseTime > config.timeManagement.maximumTimePerItem * 0.8
    ) {
      if (session.state.currentAbility.confidence > 0.6) {
        // Only extend for capable students
        session.adaptiveAdjustments.timeExtensions.push(config.timeManagement.baseTimePerItem * 0.5)
        timeExtended = true
      }
    }

    // Check for content redirection
    if (session.learningGaps.identifiedGaps.length > 0) {
      const highSeverityGaps = Array.from(session.learningGaps.severity.entries())
        .filter(([_, severity]) => severity > 0.7)
        .map(([topic, _]) => topic)

      if (highSeverityGaps.length > 0) {
        session.adaptiveAdjustments.contentAdjustments.push(
          `Redirect to ${highSeverityGaps[0]} remediation`
        )
        contentRedirected = true
      }
    }

    return { difficultyAdjusted, timeExtended, contentRedirected }
  }

  /**
   * Generate next recommendation
   */
  private generateNextRecommendation(
    session: CATSession,
    lastResponse: StudentResponse
  ): 'continue' | 'take_break' | 'review_topic' | 'terminate' {
    const responses = session.state.responses
    const config = session.configuration

    // Check for fatigue indicators
    if (responses.length > 0) {
      const recentTimes = responses.slice(-5).map((r) => r.responseTime)
      const avgRecentTime = recentTimes.reduce((sum, time) => sum + time, 0) / recentTimes.length
      const baseTime = config.timeManagement.baseTimePerItem

      if (avgRecentTime > baseTime * 2) {
        return 'take_break'
      }
    }

    // Check for severe learning gaps
    const highSeverityGaps = Array.from(session.learningGaps.severity.entries()).filter(
      ([_, severity]) => severity > 0.8
    )

    if (highSeverityGaps.length > 2) {
      return 'review_topic'
    }

    // Check termination criteria
    const termCheck = irtEngine.shouldTerminateTest(session.state)
    if (termCheck.shouldTerminate) {
      return 'terminate'
    }

    return 'continue'
  }

  /**
   * Analyze learning insights
   */
  private analyzeLearningInsights(session: CATSession): {
    newGapsIdentified: string[]
    improvementAreas: string[]
    strengthsConfirmed: string[]
  } {
    // This would involve comparing current gaps with previous assessments
    // For now, return basic analysis
    return {
      newGapsIdentified: session.learningGaps.identifiedGaps.slice(0, 2),
      improvementAreas: session.learningGaps.recommendations.slice(0, 3),
      strengthsConfirmed: [], // Would need historical data
    }
  }

  /**
   * Generate performance predictions
   */
  private generatePerformancePredictions(session: CATSession): {
    finalScore: number
    timeToCompletion: number
    confidenceInterval: [number, number]
    successProbability: number
  } {
    const ability = session.state.currentAbility
    const finalScore = Math.round(50 + 10 * ability.theta)

    const itemsRemaining =
      session.state.testConfiguration.maxItems - session.state.administeredItems.length
    const avgTime =
      session.state.performanceMetrics.averageResponseTime ||
      session.configuration.timeManagement.baseTimePerItem
    const timeToCompletion = itemsRemaining * avgTime

    const se = ability.standardError
    const confidenceInterval: [number, number] = [
      Math.max(0, Math.round(50 + 10 * (ability.theta - 1.96 * se))),
      Math.min(100, Math.round(50 + 10 * (ability.theta + 1.96 * se))),
    ]

    // Simple success probability based on current ability
    const successProbability = Math.max(0, Math.min(1, (ability.theta + 2) / 4))

    return {
      finalScore,
      timeToCompletion,
      confidenceInterval,
      successProbability,
    }
  }

  /**
   * Generate learning profile
   */
  private generateLearningProfile(session: CATSession): {
    strongTopics: string[]
    weakTopics: string[]
    recommendedFocus: string[]
    masteryLevel: string
  } {
    const topicPerformance = new Map<string, number>()

    // Calculate topic-level performance
    for (const response of session.state.responses) {
      const item = session.state.availableItems.find((i) => i.id === response.itemId)
      if (!item) continue

      const current = topicPerformance.get(item.topic) || 0
      topicPerformance.set(item.topic, current + (response.response ? 1 : 0))
    }

    const strongTopics = Array.from(topicPerformance.entries())
      .filter(([_, score]) => score > 0.7)
      .map(([topic, _]) => topic)
      .slice(0, 3)

    const weakTopics = Array.from(session.learningGaps.severity.entries())
      .sort(([_, a], [__, b]) => b - a)
      .map(([topic, _]) => topic)
      .slice(0, 3)

    const recommendedFocus = session.learningGaps.recommendations.slice(0, 3)

    let masteryLevel = 'Developing'
    const ability = session.state.currentAbility.theta
    if (ability > 1.5) masteryLevel = 'Advanced'
    else if (ability > 0.5) masteryLevel = 'Proficient'
    else if (ability < -0.5) masteryLevel = 'Beginning'

    return {
      strongTopics,
      weakTopics,
      recommendedFocus,
      masteryLevel,
    }
  }

  // Helper methods
  private initializeItemBank(): void {
    // This would load from the database in a real implementation
    // For now, create some sample items
  }

  private filterItemBank(curriculum: string, grade: string, topics?: string[]): ItemParameters[] {
    // Filter item bank based on criteria
    return this.itemBank.filter((item) => {
      // Basic filtering logic
      return true // Simplified for this implementation
    })
  }

  private buildContentConstraints(session: CATSession): any {
    return {
      maxTimePerItem: session.configuration.timeManagement.maximumTimePerItem,
      topicDistribution: session.configuration.contentBalancing.topicWeights,
      balanceBloomsLevels: session.configuration.contentBalancing.bloomsLevelBalance,
    }
  }

  private calculateAdaptiveTime(item: ItemParameters, session: CATSession): number {
    const baseTime = session.configuration.timeManagement.baseTimePerItem
    const difficultyMultiplier = session.configuration.timeManagement.difficultyTimeMultiplier
    const adjustedTime = baseTime * (1 + item.difficulty * difficultyMultiplier)
    return Math.min(adjustedTime, session.configuration.timeManagement.maximumTimePerItem)
  }

  private assessContentBalance(session: CATSession): string {
    // Assess how well content is balanced across topics
    return 'Balanced' // Simplified
  }

  private updateExposureRate(itemId: string): void {
    const current = this.exposureRates.get(itemId) || 0
    this.exposureRates.set(itemId, current + 1)
  }

  private logAdaptationEvent(session: CATSession, event: AdaptationEvent): void {
    session.metadata.adaptationEvents.push(JSON.stringify(event))
  }
}

export const catEngine = ComputerAdaptiveTesting.getInstance()
export default ComputerAdaptiveTesting
