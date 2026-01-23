/**
 * Adaptive Testing Engine - Main Orchestrator
 * Central engine that coordinates all adaptive testing components
 *
 * Features:
 * - Unified API for adaptive testing operations
 * - Session management and state persistence
 * - Real-time decision making
 * - Integration with existing AssessmentAI
 * - Performance optimization
 * - Error handling and recovery
 * - Analytics and reporting
 */

import { irtEngine, ItemParameters, StudentResponse, AbilityEstimate } from './ItemResponseTheory'
import { catEngine, CATSession, CATConfiguration } from './ComputerAdaptiveTesting'
import { performanceAnalytics, PerformanceProfile } from './PerformanceAnalytics'
import { personalizedSequencing, LearningPath } from './PersonalizedSequencing'
import { learningGapAnalysis, GapAnalysisReport } from './LearningGapAnalysis'

export interface AdaptiveTestSession {
  id: string
  studentId: string
  configuration: AdaptiveTestConfiguration
  state: 'initializing' | 'active' | 'paused' | 'completed' | 'terminated'

  // Component sessions
  catSession: CATSession
  performanceProfile: PerformanceProfile
  learningPath: LearningPath

  // Test data
  currentItem: ItemParameters | null
  administeredItems: ItemParameters[]
  responses: StudentResponse[]

  // Real-time metrics
  currentAbility: AbilityEstimate
  progressMetrics: {
    itemsCompleted: number
    estimatedCompletion: number // percentage
    timeElapsed: number // minutes
    accuracyTrend: 'improving' | 'stable' | 'declining'
    engagementLevel: number // 0-1
    difficultyProgression: number[]
  }

  // Adaptive decisions
  adaptations: {
    difficultyAdjustments: number
    timeExtensions: number
    contentRedirections: number
    interventions: string[]
  }

  // Analytics
  gapAnalysis: GapAnalysisReport | null
  predictions: {
    finalScore: number
    timeToCompletion: number
    masteryLevel: string
    riskAreas: string[]
  }

  // Metadata
  timestamps: {
    created: Date
    started: Date | null
    lastActivity: Date
    completed: Date | null
  }

  // Settings
  settings: {
    enableRealTimeAdaptation: boolean
    enableGapDetection: boolean
    enablePersonalizedSequencing: boolean
    debugMode: boolean
  }
}

export interface AdaptiveTestConfiguration {
  testType: 'diagnostic' | 'formative' | 'summative' | 'practice'
  curriculum: string
  grade: string
  topics: string[]

  // Termination criteria
  termination: {
    minItems: number
    maxItems: number
    targetSE: number
    targetInformation: number
    timeLimit: number // minutes
    masteryThreshold: number
  }

  // Adaptation settings
  adaptation: {
    algorithm: 'irt_only' | 'cat_hybrid' | 'ml_enhanced'
    difficultyRange: [number, number]
    contentBalancing: boolean
    realTimeAdjustment: boolean
    gapDetection: boolean
    personalizedSequencing: boolean
  }

  // Performance settings
  performance: {
    cacheResults: boolean
    batchSize: number
    maxConcurrentSessions: number
    enablePredictiveLoading: boolean
  }

  // Reporting settings
  reporting: {
    generateDetailedReport: boolean
    includeGapAnalysis: boolean
    includePredictions: boolean
    enableRealTimeAnalytics: boolean
  }
}

export interface AdaptiveTestResult {
  sessionId: string
  studentId: string
  finalResults: {
    abilityEstimate: AbilityEstimate
    scaledScore: number
    percentileRank: number
    masteryLevel: string
    topicScores: Map<string, number>
  }
  performance: {
    itemsCompleted: number
    totalTime: number
    averageItemTime: number
    accuracy: number
    efficiency: number
  }
  adaptations: {
    totalAdjustments: number
    adaptationTypes: string[]
    interventions: string[]
    personalizations: string[]
  }
  gaps: {
    identifiedGaps: string[]
    criticalGaps: string[]
    recommendations: string[]
    remediationPlan: any
  }
  predictions: {
    futurePerformance: number
    readinessLevel: string
    riskFactors: string[]
    strengths: string[]
  }
  diagnostics: {
    algorithmPerformance: any
    adaptationEffectiveness: any
    systemMetrics: any
  }
}

export interface SessionManager {
  activeSessions: Map<string, AdaptiveTestSession>
  sessionHistory: Map<string, AdaptiveTestSession[]>
  performanceCache: Map<string, any>
  analyticsCollector: any
}

class AdaptiveTestingEngine {
  private static instance: AdaptiveTestingEngine
  private sessionManager: SessionManager
  private initialized = false

  // Configuration defaults
  private readonly DEFAULT_CONFIG: Partial<AdaptiveTestConfiguration> = {
    termination: {
      minItems: 10,
      maxItems: 30,
      targetSE: 0.3,
      targetInformation: 10,
      timeLimit: 60,
      masteryThreshold: 0.8,
    },
    adaptation: {
      algorithm: 'cat_hybrid',
      difficultyRange: [-3, 3],
      contentBalancing: true,
      realTimeAdjustment: true,
      gapDetection: true,
      personalizedSequencing: true,
    },
    performance: {
      cacheResults: true,
      batchSize: 5,
      maxConcurrentSessions: 100,
      enablePredictiveLoading: true,
    },
    reporting: {
      generateDetailedReport: true,
      includeGapAnalysis: true,
      includePredictions: true,
      enableRealTimeAnalytics: true,
    },
  }

  constructor() {
    this.sessionManager = {
      activeSessions: new Map(),
      sessionHistory: new Map(),
      performanceCache: new Map(),
      analyticsCollector: {},
    }
  }

  static getInstance(): AdaptiveTestingEngine {
    if (!AdaptiveTestingEngine.instance) {
      AdaptiveTestingEngine.instance = new AdaptiveTestingEngine()
    }
    return AdaptiveTestingEngine.instance
  }

  /**
   * Initialize the adaptive testing engine
   */
  async initialize(): Promise<void> {
    if (this.initialized) return

    try {
      // Initialize component engines
      await this.initializeComponents()

      // Setup session management
      this.setupSessionManagement()

      // Initialize analytics
      this.initializeAnalytics()

      this.initialized = true
      console.log('Adaptive Testing Engine initialized successfully')
    } catch (error) {
      console.error('Failed to initialize Adaptive Testing Engine:', error)
      throw error
    }
  }

  /**
   * Create a new adaptive test session
   */
  async createSession(
    studentId: string,
    configuration: Partial<AdaptiveTestConfiguration>
  ): Promise<AdaptiveTestSession> {
    if (!this.initialized) {
      await this.initialize()
    }

    // Merge with defaults
    const config = this.mergeConfiguration(configuration)

    // Validate configuration
    this.validateConfiguration(config)

    // Create session ID
    const sessionId = this.generateSessionId(studentId)

    try {
      // Initialize CAT session
      const catConfig = this.createCATConfiguration(config)
      const catSession = await catEngine.createSession(
        studentId,
        catConfig,
        config.curriculum,
        config.grade,
        config.topics
      )

      // Initialize performance tracking
      const performanceProfile = performanceAnalytics.initializePerformanceTracking(
        studentId,
        sessionId,
        0, // Initial ability estimate
        new Map() // Prior knowledge
      )

      // Initialize learning path
      const learningPath = personalizedSequencing.initializeLearningPath(
        studentId,
        config.curriculum,
        config.grade,
        new Map(), // Prior knowledge
        config.topics
      )

      // Create adaptive test session
      const session: AdaptiveTestSession = {
        id: sessionId,
        studentId,
        configuration: config,
        state: 'initializing',
        catSession,
        performanceProfile,
        learningPath,
        currentItem: null,
        administeredItems: [],
        responses: [],
        currentAbility: {
          theta: 0,
          standardError: 2.0,
          confidence: 0.1,
          informationGained: 0,
          estimationMethod: 'EAP',
          convergence: false,
          iterations: 0,
        },
        progressMetrics: {
          itemsCompleted: 0,
          estimatedCompletion: 0,
          timeElapsed: 0,
          accuracyTrend: 'stable',
          engagementLevel: 0.8,
          difficultyProgression: [],
        },
        adaptations: {
          difficultyAdjustments: 0,
          timeExtensions: 0,
          contentRedirections: 0,
          interventions: [],
        },
        gapAnalysis: null,
        predictions: {
          finalScore: 50,
          timeToCompletion: config.termination!.timeLimit!,
          masteryLevel: 'Developing',
          riskAreas: [],
        },
        timestamps: {
          created: new Date(),
          started: null,
          lastActivity: new Date(),
          completed: null,
        },
        settings: {
          enableRealTimeAdaptation: config.adaptation!.realTimeAdjustment!,
          enableGapDetection: config.adaptation!.gapDetection!,
          enablePersonalizedSequencing: config.adaptation!.personalizedSequencing!,
          debugMode: false,
        },
      }

      // Store session
      this.sessionManager.activeSessions.set(sessionId, session)

      // Log session creation
      this.logSessionEvent(sessionId, 'session_created', {
        studentId,
        configuration: config,
      })

      return session
    } catch (error) {
      console.error('Failed to create adaptive test session:', error)
      throw new Error(`Session creation failed: ${error.message}`)
    }
  }

  /**
   * Start an adaptive test session
   */
  async startSession(sessionId: string): Promise<{
    session: AdaptiveTestSession
    firstItem: ItemParameters | null
    instructions: string[]
  }> {
    const session = this.getSession(sessionId)

    if (session.state !== 'initializing') {
      throw new Error(`Cannot start session in state: ${session.state}`)
    }

    try {
      // Update session state
      session.state = 'active'
      session.timestamps.started = new Date()

      // Get first item
      const firstItemResult = await catEngine.getNextItem(session.catSession.id)
      session.currentItem = firstItemResult.item

      if (firstItemResult.item) {
        // Update tracking
        session.progressMetrics.estimatedCompletion = firstItemResult.testStatus.progress
      }

      // Generate instructions
      const instructions = this.generateSessionInstructions(session)

      // Log session start
      this.logSessionEvent(sessionId, 'session_started', {
        firstItem: firstItemResult.item?.id,
        estimatedTime: session.configuration.termination!.timeLimit,
      })

      return {
        session,
        firstItem: firstItemResult.item,
        instructions,
      }
    } catch (error) {
      console.error('Failed to start session:', error)
      session.state = 'terminated'
      throw error
    }
  }

  /**
   * Process a student response and get next item
   */
  async processResponse(
    sessionId: string,
    itemId: string,
    response: boolean,
    responseTime: number,
    confidence?: number
  ): Promise<{
    processed: boolean
    nextItem: ItemParameters | null
    sessionComplete: boolean
    adaptations: string[]
    insights: any
    recommendations: string[]
  }> {
    const session = this.getSession(sessionId)

    if (session.state !== 'active') {
      throw new Error(`Cannot process response in session state: ${session.state}`)
    }

    try {
      // Create response record
      const studentResponse: StudentResponse = {
        itemId,
        response,
        responseTime,
        confidence,
        timestamp: new Date(),
      }

      // Add to session
      session.responses.push(studentResponse)
      session.timestamps.lastActivity = new Date()

      // Update administered items
      if (session.currentItem && session.currentItem.id === itemId) {
        session.administeredItems.push(session.currentItem)
      }

      // Process with CAT engine
      const catResult = await catEngine.processResponse(
        session.catSession.id,
        itemId,
        response,
        responseTime,
        confidence
      )

      // Update ability estimate
      session.currentAbility = catResult.updatedAbility

      // Update performance analytics
      session.performanceProfile = performanceAnalytics.updatePerformanceAnalytics(
        sessionId,
        studentResponse,
        session.currentItem!,
        catResult.updatedAbility,
        session.responses
      )

      // Update progress metrics
      this.updateProgressMetrics(session)

      // Perform gap analysis if enabled
      if (session.settings.enableGapDetection && session.responses.length >= 5) {
        session.gapAnalysis = learningGapAnalysis.analyzeForGaps(
          session.studentId,
          sessionId,
          session.responses,
          session.administeredItems,
          session.performanceProfile,
          new Map() // Knowledge graph would come from personalized sequencing
        )
      }

      // Get next item
      let nextItem: ItemParameters | null = null
      let sessionComplete = false

      const nextItemResult = await catEngine.getNextItem(session.catSession.id)

      if (nextItemResult.testStatus.shouldContinue) {
        nextItem = nextItemResult.item
        session.currentItem = nextItem
      } else {
        sessionComplete = true
        session.state = 'completed'
        session.timestamps.completed = new Date()
      }

      // Generate adaptations and insights
      const adaptations = this.generateAdaptations(session, catResult)
      const insights = this.generateRealTimeInsights(session)
      const recommendations = this.generateRecommendations(session)

      // Update session metrics
      this.updateAdaptationMetrics(session, adaptations)

      // Log response processing
      this.logSessionEvent(sessionId, 'response_processed', {
        itemId,
        response,
        responseTime,
        abilityUpdate: catResult.updatedAbility.theta,
        nextItem: nextItem?.id,
        sessionComplete,
      })

      return {
        processed: true,
        nextItem,
        sessionComplete,
        adaptations,
        insights,
        recommendations,
      }
    } catch (error) {
      console.error('Failed to process response:', error)
      throw error
    }
  }

  /**
   * Get real-time session analytics
   */
  getRealTimeAnalytics(sessionId: string): {
    performance: any
    progress: any
    adaptations: any
    predictions: any
    gaps: any
    recommendations: string[]
  } {
    const session = this.getSession(sessionId)

    // Get CAT analytics
    const catAnalytics = catEngine.getRealTimeAnalytics(session.catSession.id)

    // Get performance dashboard
    const performanceDashboard = performanceAnalytics.getPerformanceDashboard(sessionId)

    // Get learning patterns
    const learningPatterns = performanceAnalytics.analyzeLearningPatterns(sessionId)

    // Get path insights
    const pathInsights = personalizedSequencing.generatePathInsights(session.studentId)

    return {
      performance: performanceDashboard.performance,
      progress: {
        ...performanceDashboard.summary,
        learningPhase: session.performanceProfile.learningCurve.currentPhase,
        masteryAreas: learningPatterns.masteryAreas,
        strugglingAreas: learningPatterns.strugglingAreas,
      },
      adaptations: {
        total: Object.values(session.adaptations)
          .filter((val): val is number => typeof val === 'number')
          .reduce((sum, val) => sum + val, 0),
        recent: session.adaptations.interventions.slice(-3),
        effectiveness: this.calculateAdaptationEffectiveness(session),
      },
      predictions: {
        ...performanceDashboard.predictions,
        learningVelocity: learningPatterns.learningVelocity,
        stabilityIndex: learningPatterns.stabilityIndex,
      },
      gaps: session.gapAnalysis
        ? {
            totalGaps: session.gapAnalysis.summary.totalGaps,
            criticalGaps: session.gapAnalysis.summary.criticalGaps,
            recommendations: session.gapAnalysis.recommendations.immediate,
          }
        : null,
      recommendations: performanceDashboard.recommendations,
    }
  }

  /**
   * Complete and finalize a test session
   */
  async completeSession(sessionId: string): Promise<AdaptiveTestResult> {
    const session = this.getSession(sessionId)

    if (session.state === 'completed') {
      // Session already completed, return cached result
      return this.generateTestResult(session)
    }

    try {
      // Mark session as completed
      session.state = 'completed'
      session.timestamps.completed = new Date()

      // Final gap analysis
      if (session.settings.enableGapDetection) {
        session.gapAnalysis = learningGapAnalysis.analyzeForGaps(
          session.studentId,
          sessionId,
          session.responses,
          session.administeredItems,
          session.performanceProfile,
          new Map()
        )
      }

      // Generate final predictions
      this.updateFinalPredictions(session)

      // Generate comprehensive result
      const result = this.generateTestResult(session)

      // Archive session
      this.archiveSession(session)

      // Log completion
      this.logSessionEvent(sessionId, 'session_completed', {
        finalScore: result.finalResults.scaledScore,
        itemsCompleted: result.performance.itemsCompleted,
        totalTime: result.performance.totalTime,
        adaptations: result.adaptations.totalAdjustments,
      })

      return result
    } catch (error) {
      console.error('Failed to complete session:', error)
      session.state = 'terminated'
      throw error
    }
  }

  /**
   * Pause a test session
   */
  pauseSession(sessionId: string): void {
    const session = this.getSession(sessionId)

    if (session.state === 'active') {
      session.state = 'paused'
      this.logSessionEvent(sessionId, 'session_paused', {})
    }
  }

  /**
   * Resume a paused test session
   */
  resumeSession(sessionId: string): void {
    const session = this.getSession(sessionId)

    if (session.state === 'paused') {
      session.state = 'active'
      session.timestamps.lastActivity = new Date()
      this.logSessionEvent(sessionId, 'session_resumed', {})
    }
  }

  /**
   * Terminate a test session
   */
  terminateSession(sessionId: string, reason: string): void {
    const session = this.getSession(sessionId)

    session.state = 'terminated'
    this.logSessionEvent(sessionId, 'session_terminated', { reason })

    // Remove from active sessions
    this.sessionManager.activeSessions.delete(sessionId)
  }

  /**
   * Get session status and summary
   */
  getSessionStatus(sessionId: string): {
    state: string
    progress: number
    timeElapsed: number
    itemsCompleted: number
    currentAbility: number
    estimatedTimeRemaining: number
  } {
    const session = this.getSession(sessionId)

    const timeElapsed = session.timestamps.started
      ? (Date.now() - session.timestamps.started.getTime()) / (1000 * 60)
      : 0

    const estimatedTimeRemaining = Math.max(
      0,
      session.configuration.termination!.timeLimit! - timeElapsed
    )

    return {
      state: session.state,
      progress: session.progressMetrics.estimatedCompletion,
      timeElapsed,
      itemsCompleted: session.progressMetrics.itemsCompleted,
      currentAbility: session.currentAbility.theta,
      estimatedTimeRemaining,
    }
  }

  // Private helper methods

  private async initializeComponents(): Promise<void> {
    // Components are already initialized as singletons
    // Additional initialization if needed
  }

  private setupSessionManagement(): void {
    // Setup session cleanup and monitoring
    setInterval(() => {
      this.cleanupInactiveSessions()
    }, 300000) // 5 minutes
  }

  private initializeAnalytics(): void {
    // Initialize analytics collection
    this.sessionManager.analyticsCollector = {
      events: [],
      metrics: new Map(),
      startTime: new Date(),
    }
  }

  private mergeConfiguration(
    config: Partial<AdaptiveTestConfiguration>
  ): AdaptiveTestConfiguration {
    return {
      ...this.DEFAULT_CONFIG,
      ...config,
      termination: { ...this.DEFAULT_CONFIG.termination!, ...config.termination },
      adaptation: { ...this.DEFAULT_CONFIG.adaptation!, ...config.adaptation },
      performance: { ...this.DEFAULT_CONFIG.performance!, ...config.performance },
      reporting: { ...this.DEFAULT_CONFIG.reporting!, ...config.reporting },
    } as AdaptiveTestConfiguration
  }

  private validateConfiguration(config: AdaptiveTestConfiguration): void {
    if (!config.curriculum || !config.grade) {
      throw new Error('Curriculum and grade are required')
    }

    if (config.termination!.minItems! > config.termination!.maxItems!) {
      throw new Error('Minimum items cannot exceed maximum items')
    }

    if (config.termination!.timeLimit! <= 0) {
      throw new Error('Time limit must be positive')
    }
  }

  private generateSessionId(studentId: string): string {
    return `adaptive_${studentId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private createCATConfiguration(config: AdaptiveTestConfiguration): CATConfiguration {
    return {
      algorithm: 'maximum_information',
      startingAbility: 0,
      minimumItems: config.termination!.minItems!,
      maximumItems: config.termination!.maxItems!,
      targetStandardError: config.termination!.targetSE!,
      targetInformation: config.termination!.targetInformation!,
      contentBalancing: {
        enabled: config.adaptation!.contentBalancing!,
        topicWeights: new Map(),
        difficultyDistribution: { easy: 30, medium: 50, hard: 20 },
        bloomsLevelBalance: true,
      },
      exposureControl: {
        enabled: true,
        maxExposureRate: 0.2,
        stratificationLevels: 5,
      },
      timeManagement: {
        adaptiveTime: true,
        baseTimePerItem: 60,
        difficultyTimeMultiplier: 0.3,
        maximumTimePerItem: 180,
        warningTimeThreshold: 30,
      },
      terminationCriteria: {
        standardErrorBased: true,
        informationBased: true,
        confidenceBased: true,
        minimumConfidenceLevel: 0.8,
      },
      realTimeAnalysis: {
        performancePrediction: true,
        learningGapDetection: true,
        difficultyCalibration: true,
        responseTimeAnalysis: true,
      },
    }
  }

  private getSession(sessionId: string): AdaptiveTestSession {
    const session = this.sessionManager.activeSessions.get(sessionId)
    if (!session) {
      throw new Error(`Session not found: ${sessionId}`)
    }
    return session
  }

  private generateSessionInstructions(session: AdaptiveTestSession): string[] {
    const instructions = [
      'Welcome to your adaptive test session.',
      `This test will adapt to your performance in real-time.`,
      `You will answer between ${session.configuration.termination!.minItems} and ${session.configuration.termination!.maxItems} questions.`,
      'Take your time and do your best on each question.',
      'The test will automatically adjust difficulty based on your responses.',
    ]

    if (session.settings.enableGapDetection) {
      instructions.push('The system will identify areas for improvement during the test.')
    }

    if (session.configuration.termination!.timeLimit! > 0) {
      instructions.push(`Time limit: ${session.configuration.termination!.timeLimit} minutes.`)
    }

    return instructions
  }

  private updateProgressMetrics(session: AdaptiveTestSession): void {
    const metrics = session.progressMetrics

    metrics.itemsCompleted = session.responses.length
    metrics.estimatedCompletion =
      (metrics.itemsCompleted / session.configuration.termination!.maxItems!) * 100

    if (session.timestamps.started) {
      metrics.timeElapsed = (Date.now() - session.timestamps.started.getTime()) / (1000 * 60)
    }

    // Calculate accuracy trend
    if (session.responses.length >= 5) {
      const recent = session.responses.slice(-5)
      const early = session.responses.slice(0, 5)
      const recentAccuracy = recent.filter((r) => r.response).length / recent.length
      const earlyAccuracy = early.filter((r) => r.response).length / early.length

      if (recentAccuracy > earlyAccuracy + 0.1) {
        metrics.accuracyTrend = 'improving'
      } else if (recentAccuracy < earlyAccuracy - 0.1) {
        metrics.accuracyTrend = 'declining'
      } else {
        metrics.accuracyTrend = 'stable'
      }
    }

    // Update engagement level from performance profile
    metrics.engagementLevel = session.performanceProfile.currentState.engagement

    // Track difficulty progression
    metrics.difficultyProgression.push(session.currentAbility.theta)
  }

  private generateAdaptations(session: AdaptiveTestSession, catResult: any): string[] {
    const adaptations: string[] = []

    if (catResult.adaptiveChanges.difficultyAdjusted) {
      adaptations.push('Difficulty level adjusted based on performance')
      session.adaptations.difficultyAdjustments++
    }

    if (catResult.adaptiveChanges.timeExtended) {
      adaptations.push('Additional time granted due to performance')
      session.adaptations.timeExtensions++
    }

    if (catResult.adaptiveChanges.contentRedirected) {
      adaptations.push('Content focus adjusted based on learning gaps')
      session.adaptations.contentRedirections++
    }

    return adaptations
  }

  private generateRealTimeInsights(session: AdaptiveTestSession): any {
    return {
      currentLevel: this.getAbilityLevel(session.currentAbility.theta),
      progressRate:
        session.progressMetrics.estimatedCompletion /
        Math.max(1, session.progressMetrics.timeElapsed),
      engagementStatus:
        session.progressMetrics.engagementLevel > 0.7
          ? 'high'
          : session.progressMetrics.engagementLevel > 0.4
            ? 'moderate'
            : 'low',
      adaptationCount: Object.values(session.adaptations)
        .filter((val): val is number => typeof val === 'number')
        .reduce((sum, val) => sum + val, 0),
      riskFactors: this.identifyRiskFactors(session),
    }
  }

  private generateRecommendations(session: AdaptiveTestSession): string[] {
    const recommendations: string[] = []

    if (session.progressMetrics.engagementLevel < 0.5) {
      recommendations.push('Consider taking a short break to maintain focus')
    }

    if (session.progressMetrics.accuracyTrend === 'declining') {
      recommendations.push('Review recent topics before continuing')
    }

    if (session.currentAbility.standardError > 1.0) {
      recommendations.push('Continue answering questions to improve score precision')
    }

    return recommendations
  }

  private updateAdaptationMetrics(session: AdaptiveTestSession, adaptations: string[]): void {
    session.adaptations.interventions.push(...adaptations)

    // Keep only recent interventions (last 10)
    if (session.adaptations.interventions.length > 10) {
      session.adaptations.interventions = session.adaptations.interventions.slice(-10)
    }
  }

  private updateFinalPredictions(session: AdaptiveTestSession): void {
    const scoreReport = irtEngine.generateScoreReport(
      session.currentAbility,
      session.responses,
      session.administeredItems
    )

    session.predictions = {
      finalScore: scoreReport.scaledScore,
      timeToCompletion: 0, // Test is complete
      masteryLevel: scoreReport.abilityLevel,
      riskAreas: scoreReport.weaknesses,
    }
  }

  private generateTestResult(session: AdaptiveTestSession): AdaptiveTestResult {
    const scoreReport = irtEngine.generateScoreReport(
      session.currentAbility,
      session.responses,
      session.administeredItems
    )

    const totalTime =
      session.timestamps.completed && session.timestamps.started
        ? (session.timestamps.completed.getTime() - session.timestamps.started.getTime()) /
          (1000 * 60)
        : 0

    const accuracy =
      session.responses.filter((r) => r.response).length / Math.max(1, session.responses.length)

    return {
      sessionId: session.id,
      studentId: session.studentId,
      finalResults: {
        abilityEstimate: session.currentAbility,
        scaledScore: scoreReport.scaledScore,
        percentileRank: scoreReport.percentile,
        masteryLevel: scoreReport.abilityLevel,
        topicScores: new Map(), // Would calculate from responses
      },
      performance: {
        itemsCompleted: session.responses.length,
        totalTime,
        averageItemTime: totalTime / Math.max(1, session.responses.length),
        accuracy,
        efficiency: accuracy * (session.responses.length / Math.max(1, totalTime)),
      },
      adaptations: {
        totalAdjustments: Object.values(session.adaptations)
          .filter((val): val is number => typeof val === 'number')
          .reduce((sum, val) => sum + val, 0),
        adaptationTypes: ['difficulty_adjustment', 'time_extension', 'content_redirection'],
        interventions: session.adaptations.interventions,
        personalizations: [], // Would come from personalized sequencing
      },
      gaps: session.gapAnalysis
        ? {
            identifiedGaps: session.gapAnalysis.detailedGaps.map((g) => g.topic),
            criticalGaps: session.gapAnalysis.detailedGaps
              .filter((g) => g.severity > 0.7)
              .map((g) => g.topic),
            recommendations: session.gapAnalysis.recommendations.immediate,
            remediationPlan: session.gapAnalysis.remediationPlan,
          }
        : {
            identifiedGaps: [],
            criticalGaps: [],
            recommendations: [],
            remediationPlan: null,
          },
      predictions: {
        futurePerformance: scoreReport.scaledScore,
        readinessLevel: scoreReport.abilityLevel,
        riskFactors: scoreReport.weaknesses,
        strengths: scoreReport.strengths,
      },
      diagnostics: {
        algorithmPerformance: {
          convergence: session.currentAbility.convergence,
          iterations: session.currentAbility.iterations,
          finalSE: session.currentAbility.standardError,
        },
        adaptationEffectiveness: this.calculateAdaptationEffectiveness(session),
        systemMetrics: {
          sessionDuration: totalTime,
          responseRate: session.responses.length / Math.max(1, totalTime),
          systemAdaptations: Object.values(session.adaptations)
            .filter((val): val is number => typeof val === 'number')
            .reduce((sum, val) => sum + val, 0),
        },
      },
    }
  }

  private archiveSession(session: AdaptiveTestSession): void {
    // Move to session history
    const studentHistory = this.sessionManager.sessionHistory.get(session.studentId) || []
    studentHistory.push(session)
    this.sessionManager.sessionHistory.set(session.studentId, studentHistory)

    // Remove from active sessions
    this.sessionManager.activeSessions.delete(session.id)
  }

  private cleanupInactiveSessions(): void {
    const now = Date.now()
    const INACTIVE_THRESHOLD = 30 * 60 * 1000 // 30 minutes

    for (const [sessionId, session] of this.sessionManager.activeSessions) {
      const lastActivity = session.timestamps.lastActivity.getTime()

      if (now - lastActivity > INACTIVE_THRESHOLD) {
        console.log(`Cleaning up inactive session: ${sessionId}`)
        this.terminateSession(sessionId, 'inactivity_timeout')
      }
    }
  }

  private logSessionEvent(sessionId: string, event: string, data: any): void {
    const logEntry = {
      sessionId,
      event,
      timestamp: new Date(),
      data,
    }

    this.sessionManager.analyticsCollector.events.push(logEntry)

    // Keep only recent events (last 1000)
    if (this.sessionManager.analyticsCollector.events.length > 1000) {
      this.sessionManager.analyticsCollector.events =
        this.sessionManager.analyticsCollector.events.slice(-1000)
    }
  }

  private getAbilityLevel(theta: number): string {
    if (theta > 1.5) return 'Advanced'
    if (theta > 0.5) return 'Proficient'
    if (theta > -0.5) return 'Developing'
    if (theta > -1.5) return 'Beginning'
    return 'Below Basic'
  }

  private identifyRiskFactors(session: AdaptiveTestSession): string[] {
    const riskFactors: string[] = []

    if (session.progressMetrics.engagementLevel < 0.4) {
      riskFactors.push('Low engagement')
    }

    if (session.progressMetrics.accuracyTrend === 'declining') {
      riskFactors.push('Declining performance')
    }

    if (session.currentAbility.standardError > 1.5) {
      riskFactors.push('High uncertainty in ability estimate')
    }

    if (session.gapAnalysis && session.gapAnalysis.summary.criticalGaps > 2) {
      riskFactors.push('Multiple critical learning gaps')
    }

    return riskFactors
  }

  private calculateAdaptationEffectiveness(session: AdaptiveTestSession): number {
    // Simplified calculation - would be more sophisticated in practice
    const totalAdaptations = Object.values(session.adaptations)
      .filter((val): val is number => typeof val === 'number')
      .reduce((sum, val) => sum + val, 0)

    if (totalAdaptations === 0) return 1.0

    // Measure if adaptations led to improved performance
    const performanceImprovement = session.progressMetrics.accuracyTrend === 'improving' ? 0.8 : 0.5
    return Math.min(1.0, performanceImprovement + 0.1 * Math.min(5, totalAdaptations))
  }
}

export const adaptiveTestingEngine = AdaptiveTestingEngine.getInstance()
export default AdaptiveTestingEngine
