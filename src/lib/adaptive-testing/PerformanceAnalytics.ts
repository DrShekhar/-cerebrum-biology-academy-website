/**
 * Real-time Performance Analysis and Ability Estimation
 * Advanced analytics engine for adaptive testing
 *
 * Features:
 * - Real-time ability tracking
 * - Performance prediction models
 * - Learning curve analysis
 * - Cognitive load assessment
 * - Engagement monitoring
 * - Mastery level detection
 */

import { AbilityEstimate, StudentResponse, ItemParameters } from './ItemResponseTheory'
import { CATSession } from './ComputerAdaptiveTesting'

export interface PerformanceMetrics {
  currentAbility: number
  abilityGrowth: number // rate of ability change
  accuracy: number
  speed: number // items per minute
  efficiency: number // accuracy * speed
  consistency: number // variance in performance
  engagement: number // based on response patterns
  cognitiveLoad: number // estimated mental effort
  confidenceLevel: number
  masteryIndicators: {
    topicMastery: Map<string, number>
    skillMastery: Map<string, number>
    overallMastery: number
  }
}

export interface PredictionModel {
  finalScorePrediction: {
    estimate: number
    confidenceInterval: [number, number]
    probabilityDistribution: number[]
  }
  timeToCompletion: {
    estimate: number // minutes
    range: [number, number]
    factors: string[]
  }
  successProbability: {
    passProbability: number
    excellenceProbability: number
    strugglingProbability: number
  }
  learningTrajectory: {
    expectedGrowth: number
    plateauRisk: number
    accelerationPotential: number
  }
}

export interface LearningCurve {
  phases: {
    exploration: boolean // initial learning phase
    acquisition: boolean // rapid improvement phase
    fluency: boolean // consolidation phase
    mastery: boolean // expert performance phase
  }
  currentPhase: 'exploration' | 'acquisition' | 'fluency' | 'mastery'
  timeInPhase: number // minutes
  phaseProgression: number // 0-1 within current phase
  nextPhaseRequirements: string[]
}

export interface CognitiveAssessment {
  workingMemoryLoad: number // 0-1 scale
  processingSpeed: number // relative to expected
  attentionLevel: number // sustained attention indicator
  metacognition: number // self-awareness of performance
  strategicThinking: number // problem-solving approach quality
  adaptability: number // response to changing difficulty
}

export interface EngagementAnalysis {
  overall: number // 0-1 engagement score
  trends: {
    increasing: boolean
    decreasing: boolean
    stable: boolean
    fluctuating: boolean
  }
  factors: {
    difficultyAlignment: number
    pacing: number
    feedback: number
    progress: number
  }
  interventionNeeded: boolean
  recommendedActions: string[]
}

export interface RealTimeInsights {
  alerts: {
    type: 'warning' | 'critical' | 'positive'
    message: string
    action: string
    priority: number
  }[]
  adaptations: {
    difficultyAdjustment: number
    paceAdjustment: number
    contentFocus: string[]
    interventions: string[]
  }
  opportunities: {
    accelerationPossible: boolean
    depthExploration: string[]
    strengthBuilding: string[]
  }
}

export interface PerformanceProfile {
  studentId: string
  sessionId: string
  baseline: {
    initialAbility: number
    expectedPerformance: number
    priorKnowledge: Map<string, number>
  }
  currentState: PerformanceMetrics
  progression: {
    abilityHistory: { timestamp: Date; ability: number }[]
    accuracyHistory: { timestamp: Date; accuracy: number }[]
    speedHistory: { timestamp: Date; speed: number }[]
    engagementHistory: { timestamp: Date; engagement: number }[]
  }
  predictions: PredictionModel
  learningCurve: LearningCurve
  cognitiveAssessment: CognitiveAssessment
  engagement: EngagementAnalysis
  insights: RealTimeInsights
  lastUpdated: Date
}

class PerformanceAnalytics {
  private static instance: PerformanceAnalytics
  private performanceProfiles: Map<string, PerformanceProfile> = new Map()
  private sessionAnalytics: Map<string, any> = new Map()

  // Algorithm parameters
  private readonly ENGAGEMENT_WEIGHTS = {
    responseTime: 0.3,
    accuracy: 0.25,
    consistency: 0.2,
    progression: 0.25
  }

  private readonly COGNITIVE_LOAD_FACTORS = {
    itemDifficulty: 0.4,
    responseTime: 0.3,
    accuracy: 0.2,
    itemComplexity: 0.1
  }

  constructor() {
    // Initialize analytics engine
  }

  static getInstance(): PerformanceAnalytics {
    if (!PerformanceAnalytics.instance) {
      PerformanceAnalytics.instance = new PerformanceAnalytics()
    }
    return PerformanceAnalytics.instance
  }

  /**
   * Initialize performance tracking for a student session
   */
  initializePerformanceTracking(
    studentId: string,
    sessionId: string,
    initialAbility: number,
    priorKnowledge?: Map<string, number>
  ): PerformanceProfile {
    const profile: PerformanceProfile = {
      studentId,
      sessionId,
      baseline: {
        initialAbility,
        expectedPerformance: this.calculateExpectedPerformance(initialAbility),
        priorKnowledge: priorKnowledge || new Map()
      },
      currentState: {
        currentAbility: initialAbility,
        abilityGrowth: 0,
        accuracy: 0,
        speed: 0,
        efficiency: 0,
        consistency: 1,
        engagement: 0.8, // Start with moderate engagement
        cognitiveLoad: 0.5,
        confidenceLevel: 0.5,
        masteryIndicators: {
          topicMastery: new Map(),
          skillMastery: new Map(),
          overallMastery: 0
        }
      },
      progression: {
        abilityHistory: [{ timestamp: new Date(), ability: initialAbility }],
        accuracyHistory: [],
        speedHistory: [],
        engagementHistory: [{ timestamp: new Date(), engagement: 0.8 }]
      },
      predictions: this.initializePredictions(initialAbility),
      learningCurve: this.initializeLearningCurve(),
      cognitiveAssessment: this.initializeCognitiveAssessment(),
      engagement: this.initializeEngagementAnalysis(),
      insights: { alerts: [], adaptations: { difficultyAdjustment: 0, paceAdjustment: 0, contentFocus: [], interventions: [] }, opportunities: { accelerationPossible: false, depthExploration: [], strengthBuilding: [] } },
      lastUpdated: new Date()
    }

    this.performanceProfiles.set(sessionId, profile)
    return profile
  }

  /**
   * Update performance analytics with new response
   */
  updatePerformanceAnalytics(
    sessionId: string,
    response: StudentResponse,
    item: ItemParameters,
    currentAbility: AbilityEstimate,
    allResponses: StudentResponse[]
  ): PerformanceProfile {
    const profile = this.performanceProfiles.get(sessionId)
    if (!profile) throw new Error('Performance profile not found')

    // Update basic metrics
    this.updateBasicMetrics(profile, response, item, currentAbility, allResponses)

    // Update learning curve analysis
    this.updateLearningCurve(profile, allResponses)

    // Update cognitive assessment
    this.updateCognitiveAssessment(profile, response, item, allResponses)

    // Update engagement analysis
    this.updateEngagementAnalysis(profile, response, allResponses)

    // Update predictions
    this.updatePredictions(profile, allResponses)

    // Generate real-time insights
    this.generateRealTimeInsights(profile)

    profile.lastUpdated = new Date()
    this.performanceProfiles.set(sessionId, profile)

    return profile
  }

  /**
   * Get real-time performance dashboard data
   */
  getPerformanceDashboard(sessionId: string): {
    summary: {
      currentLevel: string
      progress: number
      timeElapsed: number
      itemsCompleted: number
    }
    performance: {
      abilityScore: number
      accuracy: number
      speed: number
      engagement: number
    }
    trends: {
      abilityTrend: 'improving' | 'stable' | 'declining'
      accuracyTrend: 'improving' | 'stable' | 'declining'
      speedTrend: 'improving' | 'stable' | 'declining'
      engagementTrend: 'improving' | 'stable' | 'declining'
    }
    predictions: {
      finalScore: number
      timeRemaining: number
      successProbability: number
    }
    recommendations: string[]
    alerts: { type: string; message: string; priority: number }[]
  } {
    const profile = this.performanceProfiles.get(sessionId)
    if (!profile) throw new Error('Performance profile not found')

    // Calculate summary
    const currentLevel = this.getAbilityLevel(profile.currentState.currentAbility)
    const progress = this.calculateProgress(profile)
    const timeElapsed = (Date.now() - profile.progression.abilityHistory[0].timestamp.getTime()) / (1000 * 60)
    const itemsCompleted = profile.progression.accuracyHistory.length

    // Calculate trends
    const trends = this.calculateTrends(profile)

    // Get latest predictions
    const predictions = {
      finalScore: profile.predictions.finalScorePrediction.estimate,
      timeRemaining: profile.predictions.timeToCompletion.estimate,
      successProbability: profile.predictions.successProbability.passProbability
    }

    // Generate recommendations
    const recommendations = this.generateRecommendations(profile)

    return {
      summary: {
        currentLevel,
        progress,
        timeElapsed,
        itemsCompleted
      },
      performance: {
        abilityScore: Math.round(50 + 10 * profile.currentState.currentAbility),
        accuracy: Math.round(profile.currentState.accuracy * 100),
        speed: Math.round(profile.currentState.speed * 60), // items per hour
        engagement: Math.round(profile.currentState.engagement * 100)
      },
      trends,
      predictions,
      recommendations,
      alerts: profile.insights.alerts
    }
  }

  /**
   * Analyze learning patterns and detect mastery
   */
  analyzeLearningPatterns(sessionId: string): {
    masteryAreas: string[]
    emergingSkills: string[]
    strugglingAreas: string[]
    learningVelocity: number
    stabilityIndex: number
    adaptationNeeded: boolean
    nextLearningTargets: string[]
  } {
    const profile = this.performanceProfiles.get(sessionId)
    if (!profile) throw new Error('Performance profile not found')

    // Analyze topic-level mastery
    const masteryAreas: string[] = []
    const emergingSkills: string[] = []
    const strugglingAreas: string[] = []

    for (const [topic, mastery] of profile.currentState.masteryIndicators.topicMastery) {
      if (mastery >= 0.8) masteryAreas.push(topic)
      else if (mastery >= 0.6) emergingSkills.push(topic)
      else if (mastery < 0.4) strugglingAreas.push(topic)
    }

    // Calculate learning velocity (ability change rate)
    const abilityHistory = profile.progression.abilityHistory
    let learningVelocity = 0
    if (abilityHistory.length >= 2) {
      const start = abilityHistory[0]
      const end = abilityHistory[abilityHistory.length - 1]
      const timeSpan = (end.timestamp.getTime() - start.timestamp.getTime()) / (1000 * 60) // minutes
      learningVelocity = (end.ability - start.ability) / Math.max(1, timeSpan)
    }

    // Calculate stability index (consistency in performance)
    const stabilityIndex = profile.currentState.consistency

    // Determine if adaptation is needed
    const adaptationNeeded =
      profile.currentState.engagement < 0.6 ||
      profile.currentState.cognitiveLoad > 0.8 ||
      strugglingAreas.length > 2

    // Suggest next learning targets
    const nextLearningTargets = this.identifyNextLearningTargets(profile)

    return {
      masteryAreas,
      emergingSkills,
      strugglingAreas,
      learningVelocity,
      stabilityIndex,
      adaptationNeeded,
      nextLearningTargets
    }
  }

  /**
   * Predict optimal stopping point
   */
  predictOptimalStoppingPoint(sessionId: string): {
    recommendedStoppingPoint: number // number of additional items
    confidence: number
    rationale: string
    alternatives: {
      conservative: number
      aggressive: number
      balanced: number
    }
  } {
    const profile = this.performanceProfiles.get(sessionId)
    if (!profile) throw new Error('Performance profile not found')

    // Analyze current precision and information gain rate
    const currentPrecision = 1 / (profile.currentState.confidenceLevel + 0.1)
    const informationGainRate = this.calculateInformationGainRate(profile)
    const fatigueLevel = this.estimateFatigueLevel(profile)

    // Calculate optimal stopping point
    let recommendedStoppingPoint = 0
    let rationale = ''

    if (currentPrecision < 0.3 && informationGainRate > 0.1) {
      // High precision, good information gain - continue
      recommendedStoppingPoint = Math.min(10, Math.round(5 / informationGainRate))
      rationale = 'Continue testing for improved precision'
    } else if (fatigueLevel > 0.7) {
      // High fatigue - stop soon
      recommendedStoppingPoint = Math.min(3, Math.round(2 / Math.max(0.1, informationGainRate)))
      rationale = 'Stop soon due to fatigue indicators'
    } else if (profile.currentState.confidenceLevel > 0.9) {
      // High confidence - can stop
      recommendedStoppingPoint = 0
      rationale = 'Sufficient precision achieved'
    } else {
      // Standard continuation
      recommendedStoppingPoint = Math.round(3 / Math.max(0.1, informationGainRate))
      rationale = 'Continue for standard precision'
    }

    const confidence = Math.max(0.6, Math.min(0.95, profile.currentState.confidenceLevel))

    return {
      recommendedStoppingPoint: Math.max(0, Math.min(20, recommendedStoppingPoint)),
      confidence,
      rationale,
      alternatives: {
        conservative: Math.max(0, recommendedStoppingPoint + 3),
        aggressive: Math.max(0, recommendedStoppingPoint - 2),
        balanced: recommendedStoppingPoint
      }
    }
  }

  // Private helper methods

  private updateBasicMetrics(
    profile: PerformanceProfile,
    response: StudentResponse,
    item: ItemParameters,
    currentAbility: AbilityEstimate,
    allResponses: StudentResponse[]
  ): void {
    // Update ability
    const previousAbility = profile.currentState.currentAbility
    profile.currentState.currentAbility = currentAbility.theta
    profile.currentState.abilityGrowth = currentAbility.theta - previousAbility
    profile.currentState.confidenceLevel = currentAbility.confidence

    // Update accuracy
    const correctResponses = allResponses.filter(r => r.response).length
    profile.currentState.accuracy = correctResponses / allResponses.length

    // Update speed (items per minute)
    const totalTime = allResponses.reduce((sum, r) => sum + r.responseTime, 0) / 60 // convert to minutes
    profile.currentState.speed = allResponses.length / Math.max(1, totalTime)

    // Update efficiency
    profile.currentState.efficiency = profile.currentState.accuracy * profile.currentState.speed

    // Update consistency (inverse of standard deviation of recent performance)
    if (allResponses.length >= 5) {
      const recentResponses = allResponses.slice(-5)
      const accuracies = recentResponses.map(r => r.response ? 1 : 0)
      const mean = accuracies.reduce((sum, acc) => sum + acc, 0) / accuracies.length
      const variance = accuracies.reduce((sum, acc) => sum + Math.pow(acc - mean, 2), 0) / accuracies.length
      profile.currentState.consistency = Math.max(0, 1 - variance)
    }

    // Update progression history
    profile.progression.abilityHistory.push({
      timestamp: new Date(),
      ability: currentAbility.theta
    })
    profile.progression.accuracyHistory.push({
      timestamp: new Date(),
      accuracy: profile.currentState.accuracy
    })
    profile.progression.speedHistory.push({
      timestamp: new Date(),
      speed: profile.currentState.speed
    })
  }

  private updateLearningCurve(profile: PerformanceProfile, allResponses: StudentResponse[]): void {
    // Simplified learning curve analysis
    if (allResponses.length < 5) {
      profile.learningCurve.currentPhase = 'exploration'
    } else if (allResponses.length < 15) {
      profile.learningCurve.currentPhase = 'acquisition'
    } else if (profile.currentState.consistency > 0.7) {
      profile.learningCurve.currentPhase = 'fluency'
    } else if (profile.currentState.accuracy > 0.85) {
      profile.learningCurve.currentPhase = 'mastery'
    }

    // Update phase indicators
    profile.learningCurve.phases.exploration = allResponses.length <= 5
    profile.learningCurve.phases.acquisition = allResponses.length > 5 && allResponses.length <= 15
    profile.learningCurve.phases.fluency = profile.currentState.consistency > 0.7
    profile.learningCurve.phases.mastery = profile.currentState.accuracy > 0.85
  }

  private updateCognitiveAssessment(
    profile: PerformanceProfile,
    response: StudentResponse,
    item: ItemParameters,
    allResponses: StudentResponse[]
  ): void {
    // Calculate cognitive load based on response time and item difficulty
    const expectedTime = 60 // base expected time in seconds
    const timeRatio = response.responseTime / expectedTime
    const difficultyFactor = Math.max(0.5, Math.min(2.0, 1 + item.difficulty))

    const workingMemoryLoad = Math.min(1, timeRatio * difficultyFactor * 0.4)
    const processingSpeed = Math.min(2, expectedTime / response.responseTime)

    profile.cognitiveAssessment.workingMemoryLoad =
      (profile.cognitiveAssessment.workingMemoryLoad * 0.8) + (workingMemoryLoad * 0.2)
    profile.cognitiveAssessment.processingSpeed =
      (profile.cognitiveAssessment.processingSpeed * 0.8) + (processingSpeed * 0.2)

    // Update attention level based on consistency
    profile.cognitiveAssessment.attentionLevel = profile.currentState.consistency

    // Simple metacognition estimate based on confidence alignment with accuracy
    if (response.confidence) {
      const confidenceAccuracy = Math.abs((response.confidence / 5) - (response.response ? 1 : 0))
      profile.cognitiveAssessment.metacognition =
        (profile.cognitiveAssessment.metacognition * 0.9) + ((1 - confidenceAccuracy) * 0.1)
    }
  }

  private updateEngagementAnalysis(
    profile: PerformanceProfile,
    response: StudentResponse,
    allResponses: StudentResponse[]
  ): void {
    // Calculate engagement based on multiple factors
    const timeConsistency = this.calculateTimeConsistency(allResponses)
    const accuracyTrend = this.calculateAccuracyTrend(allResponses)
    const responsePattern = this.analyzeResponsePattern(allResponses)

    const engagement =
      timeConsistency * this.ENGAGEMENT_WEIGHTS.responseTime +
      accuracyTrend * this.ENGAGEMENT_WEIGHTS.accuracy +
      profile.currentState.consistency * this.ENGAGEMENT_WEIGHTS.consistency +
      responsePattern * this.ENGAGEMENT_WEIGHTS.progression

    profile.currentState.engagement = Math.max(0, Math.min(1, engagement))

    profile.progression.engagementHistory.push({
      timestamp: new Date(),
      engagement: profile.currentState.engagement
    })

    // Update engagement trends
    const recentEngagement = profile.progression.engagementHistory.slice(-5)
    if (recentEngagement.length >= 3) {
      const trend = recentEngagement[recentEngagement.length - 1].engagement - recentEngagement[0].engagement
      profile.engagement.trends.increasing = trend > 0.1
      profile.engagement.trends.decreasing = trend < -0.1
      profile.engagement.trends.stable = Math.abs(trend) <= 0.1
    }

    // Check if intervention is needed
    profile.engagement.interventionNeeded = profile.currentState.engagement < 0.5
    if (profile.engagement.interventionNeeded) {
      profile.engagement.recommendedActions = [
        'Consider a short break',
        'Adjust difficulty level',
        'Provide encouraging feedback'
      ]
    }
  }

  private updatePredictions(profile: PerformanceProfile, allResponses: StudentResponse[]): void {
    // Update final score prediction
    const currentScore = 50 + 10 * profile.currentState.currentAbility
    const growthRate = profile.currentState.abilityGrowth
    const projectedFinalScore = currentScore + (growthRate * 10) // simplified projection

    profile.predictions.finalScorePrediction.estimate = Math.round(
      Math.max(0, Math.min(100, projectedFinalScore))
    )

    // Update success probabilities
    const abilityScore = profile.currentState.currentAbility
    profile.predictions.successProbability.passProbability = Math.max(0, Math.min(1, (abilityScore + 2) / 4))
    profile.predictions.successProbability.excellenceProbability = Math.max(0, Math.min(1, (abilityScore - 1) / 3))
    profile.predictions.successProbability.strugglingProbability = Math.max(0, Math.min(1, (1 - abilityScore) / 3))

    // Update time to completion
    const averageTime = allResponses.reduce((sum, r) => sum + r.responseTime, 0) / Math.max(1, allResponses.length)
    const estimatedRemainingItems = Math.max(0, 20 - allResponses.length) // assume max 20 items
    profile.predictions.timeToCompletion.estimate = (estimatedRemainingItems * averageTime) / 60 // minutes
  }

  private generateRealTimeInsights(profile: PerformanceProfile): void {
    const insights: RealTimeInsights = {
      alerts: [],
      adaptations: {
        difficultyAdjustment: 0,
        paceAdjustment: 0,
        contentFocus: [],
        interventions: []
      },
      opportunities: {
        accelerationPossible: false,
        depthExploration: [],
        strengthBuilding: []
      }
    }

    // Generate alerts
    if (profile.currentState.engagement < 0.4) {
      insights.alerts.push({
        type: 'critical',
        message: 'Low engagement detected',
        action: 'Consider intervention',
        priority: 1
      })
    }

    if (profile.cognitiveAssessment.workingMemoryLoad > 0.8) {
      insights.alerts.push({
        type: 'warning',
        message: 'High cognitive load',
        action: 'Reduce difficulty temporarily',
        priority: 2
      })
    }

    if (profile.currentState.accuracy > 0.9 && profile.currentState.consistency > 0.8) {
      insights.alerts.push({
        type: 'positive',
        message: 'Excellent performance',
        action: 'Consider acceleration',
        priority: 3
      })
    }

    // Generate adaptations
    if (profile.currentState.accuracy < 0.5) {
      insights.adaptations.difficultyAdjustment = -0.5
      insights.adaptations.interventions.push('Reduce difficulty')
    } else if (profile.currentState.accuracy > 0.9) {
      insights.adaptations.difficultyAdjustment = 0.3
      insights.adaptations.interventions.push('Increase difficulty')
    }

    if (profile.currentState.speed < 0.5) {
      insights.adaptations.paceAdjustment = -0.2
      insights.adaptations.interventions.push('Allow more time')
    }

    // Identify opportunities
    if (profile.currentState.accuracy > 0.85 && profile.currentState.consistency > 0.8) {
      insights.opportunities.accelerationPossible = true
    }

    profile.insights = insights
  }

  // Additional helper methods
  private calculateExpectedPerformance(initialAbility: number): number {
    return 50 + 10 * initialAbility
  }

  private initializePredictions(initialAbility: number): PredictionModel {
    const baseScore = 50 + 10 * initialAbility
    return {
      finalScorePrediction: {
        estimate: baseScore,
        confidenceInterval: [Math.max(0, baseScore - 20), Math.min(100, baseScore + 20)],
        probabilityDistribution: []
      },
      timeToCompletion: {
        estimate: 30, // 30 minutes default
        range: [20, 45],
        factors: ['item_difficulty', 'student_speed', 'fatigue']
      },
      successProbability: {
        passProbability: Math.max(0, Math.min(1, (initialAbility + 2) / 4)),
        excellenceProbability: Math.max(0, Math.min(1, (initialAbility - 1) / 3)),
        strugglingProbability: Math.max(0, Math.min(1, (1 - initialAbility) / 3))
      },
      learningTrajectory: {
        expectedGrowth: 0.2,
        plateauRisk: 0.3,
        accelerationPotential: 0.5
      }
    }
  }

  private initializeLearningCurve(): LearningCurve {
    return {
      phases: {
        exploration: true,
        acquisition: false,
        fluency: false,
        mastery: false
      },
      currentPhase: 'exploration',
      timeInPhase: 0,
      phaseProgression: 0,
      nextPhaseRequirements: ['Complete 5 items', 'Achieve 60% accuracy']
    }
  }

  private initializeCognitiveAssessment(): CognitiveAssessment {
    return {
      workingMemoryLoad: 0.5,
      processingSpeed: 1.0,
      attentionLevel: 0.8,
      metacognition: 0.6,
      strategicThinking: 0.6,
      adaptability: 0.7
    }
  }

  private initializeEngagementAnalysis(): EngagementAnalysis {
    return {
      overall: 0.8,
      trends: {
        increasing: false,
        decreasing: false,
        stable: true,
        fluctuating: false
      },
      factors: {
        difficultyAlignment: 0.8,
        pacing: 0.8,
        feedback: 0.8,
        progress: 0.8
      },
      interventionNeeded: false,
      recommendedActions: []
    }
  }

  private getAbilityLevel(ability: number): string {
    if (ability > 1.5) return 'Advanced'
    if (ability > 0.5) return 'Proficient'
    if (ability > -0.5) return 'Developing'
    if (ability > -1.5) return 'Beginning'
    return 'Below Basic'
  }

  private calculateProgress(profile: PerformanceProfile): number {
    const itemsCompleted = profile.progression.accuracyHistory.length
    const estimatedTotal = Math.max(20, itemsCompleted + 5) // Dynamic estimation
    return Math.min(100, (itemsCompleted / estimatedTotal) * 100)
  }

  private calculateTrends(profile: PerformanceProfile): any {
    const calculateTrend = (history: any[], getValue: (item: any) => number) => {
      if (history.length < 3) return 'stable'
      const recent = history.slice(-3).map(getValue)
      const trend = recent[2] - recent[0]
      if (trend > 0.1) return 'improving'
      if (trend < -0.1) return 'declining'
      return 'stable'
    }

    return {
      abilityTrend: calculateTrend(profile.progression.abilityHistory, item => item.ability),
      accuracyTrend: calculateTrend(profile.progression.accuracyHistory, item => item.accuracy),
      speedTrend: calculateTrend(profile.progression.speedHistory, item => item.speed),
      engagementTrend: calculateTrend(profile.progression.engagementHistory, item => item.engagement)
    }
  }

  private generateRecommendations(profile: PerformanceProfile): string[] {
    const recommendations: string[] = []

    if (profile.currentState.engagement < 0.6) {
      recommendations.push('Take a short break to refresh focus')
    }

    if (profile.currentState.accuracy < 0.6) {
      recommendations.push('Review fundamental concepts before continuing')
    }

    if (profile.currentState.speed < 0.5) {
      recommendations.push('Focus on time management strategies')
    }

    if (profile.currentState.accuracy > 0.9) {
      recommendations.push('Ready for more challenging questions')
    }

    return recommendations.slice(0, 3) // Limit to top 3 recommendations
  }

  private identifyNextLearningTargets(profile: PerformanceProfile): string[] {
    // Simplified - would analyze weak areas and suggest next topics
    return ['Cell Biology', 'Genetics', 'Ecology'].slice(0, 2)
  }

  private calculateInformationGainRate(profile: PerformanceProfile): number {
    // Simplified calculation of how much information is being gained per item
    return Math.max(0.05, 0.3 - (profile.currentState.confidenceLevel * 0.2))
  }

  private estimateFatigueLevel(profile: PerformanceProfile): number {
    // Simple fatigue estimation based on time and performance decline
    const timeElapsed = (Date.now() - profile.progression.abilityHistory[0].timestamp.getTime()) / (1000 * 60)
    const timeFatigue = Math.min(1, timeElapsed / 60) // 1 hour = max time fatigue

    const performanceDecline = profile.currentState.engagement < 0.6 ? 0.3 : 0

    return Math.min(1, timeFatigue + performanceDecline)
  }

  private calculateTimeConsistency(responses: StudentResponse[]): number {
    if (responses.length < 3) return 1

    const times = responses.slice(-5).map(r => r.responseTime)
    const mean = times.reduce((sum, time) => sum + time, 0) / times.length
    const variance = times.reduce((sum, time) => sum + Math.pow(time - mean, 2), 0) / times.length
    const cv = Math.sqrt(variance) / mean // coefficient of variation

    return Math.max(0, 1 - cv) // Lower variance = higher consistency = higher engagement
  }

  private calculateAccuracyTrend(responses: StudentResponse[]): number {
    if (responses.length < 5) return 0.5

    const recent = responses.slice(-5)
    const early = responses.slice(0, 5)

    const recentAccuracy = recent.filter(r => r.response).length / recent.length
    const earlyAccuracy = early.filter(r => r.response).length / early.length

    return Math.max(0, Math.min(1, 0.5 + (recentAccuracy - earlyAccuracy)))
  }

  private analyzeResponsePattern(responses: StudentResponse[]): number {
    // Simple pattern analysis - consistent engagement vs random guessing
    if (responses.length < 3) return 0.8

    const recentTimes = responses.slice(-3).map(r => r.responseTime)
    const hasPattern = recentTimes.every(time => time > 10) // Minimum thinking time

    return hasPattern ? 0.8 : 0.4
  }
}

export const performanceAnalytics = PerformanceAnalytics.getInstance()
export default PerformanceAnalytics