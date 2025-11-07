/**
 * Behavioral Analysis System for Test Integrity
 * Tracks user behavior patterns to detect cheating attempts
 */

export interface MouseMovement {
  timestamp: number
  x: number
  y: number
  eventType: 'move' | 'click' | 'scroll'
  velocity: number
  acceleration: number
}

export interface KeystrokePattern {
  timestamp: number
  key: string
  keyCode: number
  duration: number // Time key was held down
  dwellTime: number // Time between keystrokes
  pressure?: number // For supported devices
}

export interface AnswerPattern {
  questionId: string
  timeToFirstInteraction: number // Time until user starts answering
  totalTimeSpent: number
  clickCount: number
  keystrokeCount: number
  changedAnswer: boolean
  finalAnswer: number | null
  confidence: 'high' | 'medium' | 'low'
}

export interface BehavioralFlags {
  suspiciouslyFastAnswers: number
  suspiciouslySlow: number
  unusualMousePatterns: number
  inconsistentTypingRhythm: number
  possibleExternalHelp: number
  roboticBehavior: number
  patternBreaks: number
}

export interface BehavioralProfile {
  userId: string
  sessionId: string
  averageMouseSpeed: number
  typingRhythm: number[]
  answerTimePattern: number[]
  confidenceLevel: number
  suspiciousActivities: BehavioralFlags
  riskScore: number
  isHuman: boolean
}

export class BehavioralAnalyzer {
  private userId: string
  private sessionId: string
  private mouseMovements: MouseMovement[] = []
  private keystrokePatterns: KeystrokePattern[] = []
  private answerPatterns: AnswerPattern[] = []
  private currentQuestionId: string | null = null
  private questionStartTime: number = 0
  private isRecording: boolean = false
  private onSuspiciousActivity: (activity: string, severity: 'low' | 'medium' | 'high') => void

  constructor(
    userId: string,
    sessionId: string,
    onSuspiciousActivity: (activity: string, severity: 'low' | 'medium' | 'high') => void
  ) {
    this.userId = userId
    this.sessionId = sessionId
    this.onSuspiciousActivity = onSuspiciousActivity
  }

  /**
   * Start behavioral monitoring
   */
  startMonitoring(): void {
    if (this.isRecording) return

    this.isRecording = true
    this.setupMouseTracking()
    this.setupKeystrokeTracking()
    this.setupScrollTracking()

    console.log('🧠 Behavioral analysis started')
  }

  /**
   * Stop behavioral monitoring
   */
  stopMonitoring(): void {
    this.isRecording = false
    console.log('🧠 Behavioral analysis stopped')
  }

  /**
   * Set up mouse movement tracking
   */
  private setupMouseTracking(): void {
    let lastMovement: MouseMovement | null = null

    const trackMouse = (event: MouseEvent, eventType: 'move' | 'click') => {
      if (!this.isRecording) return

      const timestamp = Date.now()
      const movement: MouseMovement = {
        timestamp,
        x: event.clientX,
        y: event.clientY,
        eventType,
        velocity: 0,
        acceleration: 0,
      }

      if (lastMovement && eventType === 'move') {
        const timeDiff = timestamp - lastMovement.timestamp
        const distance = Math.sqrt(
          Math.pow(movement.x - lastMovement.x, 2) + Math.pow(movement.y - lastMovement.y, 2)
        )
        movement.velocity = distance / timeDiff
        movement.acceleration = (movement.velocity - (lastMovement.velocity || 0)) / timeDiff
      }

      this.mouseMovements.push(movement)
      lastMovement = movement

      // Analyze in real-time
      this.analyzeMouseBehavior(movement)

      // Keep only recent movements (last 30 seconds)
      const thirtySecondsAgo = timestamp - 30000
      this.mouseMovements = this.mouseMovements.filter((m) => m.timestamp > thirtySecondsAgo)
    }

    document.addEventListener('mousemove', (e) => trackMouse(e, 'move'))
    document.addEventListener('click', (e) => trackMouse(e, 'click'))
  }

  /**
   * Set up keystroke pattern tracking
   */
  private setupKeystrokeTracking(): void {
    const keyDownTimes: Map<string, number> = new Map()
    let lastKeystroke: KeystrokePattern | null = null

    document.addEventListener('keydown', (event) => {
      if (!this.isRecording) return
      keyDownTimes.set(event.key, Date.now())
    })

    document.addEventListener('keyup', (event) => {
      if (!this.isRecording) return

      const keyDownTime = keyDownTimes.get(event.key)
      if (!keyDownTime) return

      const timestamp = Date.now()
      const keystroke: KeystrokePattern = {
        timestamp,
        key: event.key,
        keyCode: event.keyCode,
        duration: timestamp - keyDownTime,
        dwellTime: lastKeystroke ? timestamp - lastKeystroke.timestamp : 0,
      }

      this.keystrokePatterns.push(keystroke)
      lastKeystroke = keystroke

      // Analyze typing rhythm
      this.analyzeTypingPattern(keystroke)

      keyDownTimes.delete(event.key)

      // Keep only recent keystrokes
      const fiveMinutesAgo = timestamp - 300000
      this.keystrokePatterns = this.keystrokePatterns.filter((k) => k.timestamp > fiveMinutesAgo)
    })
  }

  /**
   * Set up scroll behavior tracking
   */
  private setupScrollTracking(): void {
    let lastScrollTime = 0
    let scrollCount = 0

    document.addEventListener('scroll', () => {
      if (!this.isRecording) return

      const now = Date.now()
      scrollCount++

      // Detect rapid scrolling (potential searching behavior)
      if (now - lastScrollTime < 100) {
        if (scrollCount > 10) {
          this.onSuspiciousActivity(
            'Rapid scrolling detected - possible searching behavior',
            'medium'
          )
          scrollCount = 0
        }
      } else {
        scrollCount = 0
      }

      lastScrollTime = now
    })
  }

  /**
   * Start tracking a new question
   */
  startQuestionTracking(questionId: string): void {
    this.currentQuestionId = questionId
    this.questionStartTime = Date.now()
  }

  /**
   * Record answer submission for analysis
   */
  recordAnswer(questionId: string, answer: number | null, changedAnswer: boolean): void {
    if (!this.currentQuestionId || this.currentQuestionId !== questionId) return

    const endTime = Date.now()
    const totalTimeSpent = endTime - this.questionStartTime

    // Count interactions during this question
    const questionMouseEvents = this.mouseMovements.filter(
      (m) => m.timestamp >= this.questionStartTime && m.timestamp <= endTime
    )
    const questionKeystrokes = this.keystrokePatterns.filter(
      (k) => k.timestamp >= this.questionStartTime && k.timestamp <= endTime
    )

    const answerPattern: AnswerPattern = {
      questionId,
      timeToFirstInteraction: this.calculateTimeToFirstInteraction(),
      totalTimeSpent,
      clickCount: questionMouseEvents.filter((m) => m.eventType === 'click').length,
      keystrokeCount: questionKeystrokes.length,
      changedAnswer,
      finalAnswer: answer,
      confidence: this.calculateConfidence(
        totalTimeSpent,
        questionMouseEvents.length,
        changedAnswer
      ),
    }

    this.answerPatterns.push(answerPattern)
    this.analyzeAnswerPattern(answerPattern)
  }

  /**
   * Calculate time to first interaction with question
   */
  private calculateTimeToFirstInteraction(): number {
    const questionStart = this.questionStartTime
    const firstInteraction = Math.min(
      ...this.mouseMovements
        .filter((m) => m.timestamp >= questionStart && m.eventType === 'click')
        .map((m) => m.timestamp),
      ...this.keystrokePatterns.filter((k) => k.timestamp >= questionStart).map((k) => k.timestamp)
    )

    return firstInteraction === Infinity ? 0 : firstInteraction - questionStart
  }

  /**
   * Calculate confidence level based on behavior
   */
  private calculateConfidence(
    timeSpent: number,
    interactions: number,
    changedAnswer: boolean
  ): 'high' | 'medium' | 'low' {
    let score = 0

    // Time-based confidence
    if (timeSpent > 30000 && timeSpent < 180000)
      score += 2 // 30s to 3min is reasonable
    else if (timeSpent > 10000) score += 1
    else score -= 1 // Too fast is suspicious

    // Interaction-based confidence
    if (interactions > 2 && interactions < 20) score += 1
    else if (interactions > 20) score -= 1 // Too many interactions might indicate confusion or searching

    // Answer changing behavior
    if (changedAnswer) score += 1 // Changing answers shows consideration

    if (score >= 3) return 'high'
    if (score >= 1) return 'medium'
    return 'low'
  }

  /**
   * Analyze mouse behavior patterns
   */
  private analyzeMouseBehavior(movement: MouseMovement): void {
    const recentMovements = this.mouseMovements.slice(-20)

    // Check for robotic patterns (too consistent velocity/acceleration)
    if (recentMovements.length >= 10) {
      const velocities = recentMovements.map((m) => m.velocity)
      const velocityVariance = this.calculateVariance(velocities)

      if (velocityVariance < 0.1) {
        this.onSuspiciousActivity('Robotic mouse movement detected', 'high')
      }
    }

    // Check for unusual speed patterns
    if (movement.velocity > 1000) {
      // Very fast movement
      this.onSuspiciousActivity('Unusually fast mouse movement', 'medium')
    }

    // Check for teleportation (instant movement over large distances)
    const lastMovement = recentMovements[recentMovements.length - 2]
    if (lastMovement && movement.eventType === 'move') {
      const distance = Math.sqrt(
        Math.pow(movement.x - lastMovement.x, 2) + Math.pow(movement.y - lastMovement.y, 2)
      )
      const timeDiff = movement.timestamp - lastMovement.timestamp

      if (distance > 500 && timeDiff < 50) {
        // Large jump in short time
        this.onSuspiciousActivity('Mouse teleportation detected', 'high')
      }
    }
  }

  /**
   * Analyze typing patterns for anomalies
   */
  private analyzeTypingPattern(keystroke: KeystrokePattern): void {
    const recentKeystrokes = this.keystrokePatterns.slice(-20)

    if (recentKeystrokes.length >= 10) {
      // Check for consistent timing (robotic typing)
      const dwellTimes = recentKeystrokes.map((k) => k.dwellTime).filter((d) => d > 0)
      const dwellVariance = this.calculateVariance(dwellTimes)

      if (dwellVariance < 5) {
        // Very consistent timing
        this.onSuspiciousActivity('Robotic typing pattern detected', 'high')
      }

      // Check for unusually fast typing
      const averageDwellTime = dwellTimes.reduce((sum, time) => sum + time, 0) / dwellTimes.length
      if (averageDwellTime < 50) {
        // Less than 50ms between keystrokes
        this.onSuspiciousActivity('Unusually fast typing detected', 'medium')
      }
    }

    // Check for long key hold duration (possible auto-clicker)
    if (keystroke.duration > 1000) {
      this.onSuspiciousActivity('Unusually long key hold detected', 'low')
    }
  }

  /**
   * Analyze answer timing patterns
   */
  private analyzeAnswerPattern(pattern: AnswerPattern): void {
    // Check for suspiciously fast answers
    if (pattern.totalTimeSpent < 5000) {
      // Less than 5 seconds
      this.onSuspiciousActivity('Suspiciously fast answer submission', 'high')
    }

    // Check for lack of interaction before answering
    if (pattern.timeToFirstInteraction > pattern.totalTimeSpent * 0.8) {
      this.onSuspiciousActivity('Answer submitted without adequate interaction', 'medium')
    }

    // Check for minimal interactions
    if (pattern.clickCount < 1 && pattern.keystrokeCount < 1) {
      this.onSuspiciousActivity('Answer submitted without any recorded interactions', 'high')
    }

    // Analyze patterns across multiple questions
    if (this.answerPatterns.length >= 5) {
      this.analyzeAnswerConsistency()
    }
  }

  /**
   * Analyze consistency across multiple answers
   */
  private analyzeAnswerConsistency(): void {
    const recentPatterns = this.answerPatterns.slice(-10)
    const times = recentPatterns.map((p) => p.totalTimeSpent)
    const timeVariance = this.calculateVariance(times)

    // Check for unusually consistent timing
    if (timeVariance < 1000) {
      // Very low variance in answer times
      this.onSuspiciousActivity('Unusually consistent answer timing across questions', 'medium')
    }

    // Check for pattern in fast answers
    const fastAnswers = recentPatterns.filter((p) => p.totalTimeSpent < 10000).length
    if (fastAnswers > 7) {
      // More than 70% fast answers
      this.onSuspiciousActivity('High percentage of fast answers detected', 'high')
    }
  }

  /**
   * Calculate statistical variance
   */
  private calculateVariance(numbers: number[]): number {
    if (numbers.length === 0) return 0

    const mean = numbers.reduce((sum, num) => sum + num, 0) / numbers.length
    const squaredDiffs = numbers.map((num) => Math.pow(num - mean, 2))
    return squaredDiffs.reduce((sum, diff) => sum + diff, 0) / numbers.length
  }

  /**
   * Generate behavioral profile
   */
  generateBehavioralProfile(): BehavioralProfile {
    const flags = this.calculateBehavioralFlags()
    const riskScore = this.calculateRiskScore(flags)

    return {
      userId: this.userId,
      sessionId: this.sessionId,
      averageMouseSpeed: this.calculateAverageMouseSpeed(),
      typingRhythm: this.getTypingRhythm(),
      answerTimePattern: this.answerPatterns.map((p) => p.totalTimeSpent),
      confidenceLevel: this.calculateOverallConfidence(),
      suspiciousActivities: flags,
      riskScore,
      isHuman: this.assessHumanLikeness(flags, riskScore),
    }
  }

  /**
   * Calculate behavioral flags
   */
  private calculateBehavioralFlags(): BehavioralFlags {
    return {
      suspiciouslyFastAnswers: this.answerPatterns.filter((p) => p.totalTimeSpent < 5000).length,
      suspiciouslySlow: this.answerPatterns.filter((p) => p.totalTimeSpent > 300000).length,
      unusualMousePatterns: this.mouseMovements.filter((m) => m.velocity > 1000).length,
      inconsistentTypingRhythm: this.keystrokePatterns.filter(
        (k) => k.dwellTime < 20 || k.dwellTime > 1000
      ).length,
      possibleExternalHelp: this.answerPatterns.filter(
        (p) => p.timeToFirstInteraction > p.totalTimeSpent * 0.8
      ).length,
      roboticBehavior: 0, // Calculated separately
      patternBreaks: 0, // Calculated separately
    }
  }

  /**
   * Calculate overall risk score
   */
  private calculateRiskScore(flags: BehavioralFlags): number {
    const weights = {
      suspiciouslyFastAnswers: 5,
      suspiciouslySlow: 2,
      unusualMousePatterns: 3,
      inconsistentTypingRhythm: 4,
      possibleExternalHelp: 6,
      roboticBehavior: 8,
      patternBreaks: 3,
    }

    return Object.entries(flags).reduce((score, [key, value]) => {
      return score + value * weights[key as keyof typeof weights]
    }, 0)
  }

  /**
   * Calculate average mouse speed
   */
  private calculateAverageMouseSpeed(): number {
    if (this.mouseMovements.length === 0) return 0

    const velocities = this.mouseMovements
      .filter((m) => m.eventType === 'move' && m.velocity > 0)
      .map((m) => m.velocity)

    return velocities.length > 0 ? velocities.reduce((sum, v) => sum + v, 0) / velocities.length : 0
  }

  /**
   * Get typing rhythm pattern
   */
  private getTypingRhythm(): number[] {
    return this.keystrokePatterns
      .filter((k) => k.dwellTime > 0)
      .map((k) => k.dwellTime)
      .slice(-20) // Last 20 keystrokes
  }

  /**
   * Calculate overall confidence level
   */
  private calculateOverallConfidence(): number {
    if (this.answerPatterns.length === 0) return 0

    const confidenceScores = this.answerPatterns.map((p) => {
      switch (p.confidence) {
        case 'high':
          return 3
        case 'medium':
          return 2
        case 'low':
          return 1
        default:
          return 0
      }
    })

    return confidenceScores.reduce((sum, score) => sum + score, 0) / confidenceScores.length
  }

  /**
   * Assess if behavior appears human-like
   */
  private assessHumanLikeness(flags: BehavioralFlags, riskScore: number): boolean {
    // High risk score indicates non-human behavior
    if (riskScore > 50) return false

    // Multiple robotic indicators
    if (flags.roboticBehavior > 3 || flags.unusualMousePatterns > 10) return false

    // Too many fast answers without adequate interaction
    if (flags.suspiciouslyFastAnswers > 5 && flags.possibleExternalHelp > 5) return false

    return true
  }

  /**
   * Export behavioral data for analysis
   */
  exportBehavioralData() {
    return {
      sessionInfo: {
        userId: this.userId,
        sessionId: this.sessionId,
        startTime: this.questionStartTime,
        duration: Date.now() - this.questionStartTime,
      },
      mouseData: this.mouseMovements,
      keystrokeData: this.keystrokePatterns,
      answerData: this.answerPatterns,
      profile: this.generateBehavioralProfile(),
    }
  }
}

export default BehavioralAnalyzer
