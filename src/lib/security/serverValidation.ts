/**
 * Server-Side Validation and Rate Limiting for Test Security
 * Implements comprehensive backend validation and abuse prevention
 */

export interface ValidationRule {
  name: string
  enabled: boolean
  severity: 'low' | 'medium' | 'high' | 'critical'
  action: 'log' | 'warn' | 'throttle' | 'block' | 'terminate'
  parameters: Record<string, any>
}

export interface RateLimitConfig {
  windowMs: number
  maxRequests: number
  skipSuccessfulRequests: boolean
  skipFailedRequests: boolean
  keyGenerator: (req: any) => string
  onLimitReached: (req: any, res: any) => void
}

export interface ValidationResult {
  isValid: boolean
  violations: string[]
  score: number
  action: 'allow' | 'warn' | 'throttle' | 'block' | 'terminate'
  metadata: Record<string, any>
}

export interface SubmissionValidation {
  userId: string
  sessionId: string
  questionId: string
  answer: number
  submissionTime: number
  timeSpent: number
  clientHash: string
  ipAddress: string
  userAgent: string
}

export interface ConcurrentSessionCheck {
  userId: string
  ipAddress: string
  maxConcurrentSessions: number
  currentSessions: number
  isViolation: boolean
}

export interface TimingAnalysis {
  questionId: string
  userId: string
  timeSpent: number
  expectedMinTime: number
  expectedMaxTime: number
  averageTime: number
  isOutlier: boolean
  suspicionLevel: 'none' | 'low' | 'medium' | 'high'
}

export class ServerValidationManager {
  private validationRules: Map<string, ValidationRule> = new Map()
  private rateLimiters: Map<string, RateLimitConfig> = new Map()
  private submissionHistory: Map<string, any[]> = new Map()
  private sessionRegistry: Map<string, Set<string>> = new Map() // IP -> sessionIds
  private userSessions: Map<string, Set<string>> = new Map() // userId -> sessionIds
  private questionTimings: Map<string, number[]> = new Map() // questionId -> timings
  private ipWhitelist: Set<string> = new Set()
  private ipBlacklist: Set<string> = new Set()

  constructor() {
    this.initializeDefaultRules()
    this.initializeRateLimiters()
  }

  /**
   * Initialize default validation rules
   */
  private initializeDefaultRules(): void {
    const defaultRules: ValidationRule[] = [
      {
        name: 'submission_rate_limit',
        enabled: true,
        severity: 'high',
        action: 'throttle',
        parameters: {
          maxSubmissionsPerMinute: 10,
          windowMs: 60000
        }
      },
      {
        name: 'answer_time_validation',
        enabled: true,
        severity: 'medium',
        action: 'warn',
        parameters: {
          minTimeSeconds: 5,
          maxTimeSeconds: 300,
          outlierThreshold: 2.5 // standard deviations
        }
      },
      {
        name: 'concurrent_session_limit',
        enabled: true,
        severity: 'critical',
        action: 'block',
        parameters: {
          maxSessionsPerUser: 1,
          maxSessionsPerIP: 3
        }
      },
      {
        name: 'sequential_submission_pattern',
        enabled: true,
        severity: 'medium',
        action: 'warn',
        parameters: {
          maxConsecutiveFastAnswers: 5,
          fastAnswerThreshold: 10 // seconds
        }
      },
      {
        name: 'ip_geolocation_validation',
        enabled: true,
        severity: 'low',
        action: 'log',
        parameters: {
          allowVPN: false,
          allowTor: false,
          maxLocationChanges: 2
        }
      },
      {
        name: 'user_agent_consistency',
        enabled: true,
        severity: 'medium',
        action: 'warn',
        parameters: {
          allowUserAgentChanges: false
        }
      },
      {
        name: 'answer_pattern_analysis',
        enabled: true,
        severity: 'high',
        action: 'warn',
        parameters: {
          maxSimilarityScore: 0.8,
          minimumAnswersForAnalysis: 10
        }
      }
    ]

    defaultRules.forEach(rule => {
      this.validationRules.set(rule.name, rule)
    })
  }

  /**
   * Initialize rate limiters
   */
  private initializeRateLimiters(): void {
    // Submission rate limiter
    this.rateLimiters.set('submission', {
      windowMs: 60000, // 1 minute
      maxRequests: 20,
      skipSuccessfulRequests: false,
      skipFailedRequests: true,
      keyGenerator: (req) => `${req.userId}:${req.sessionId}`,
      onLimitReached: (req, res) => {
        console.warn(`Rate limit exceeded for user ${req.userId}`)
      }
    })

    // Heartbeat rate limiter
    this.rateLimiters.set('heartbeat', {
      windowMs: 30000, // 30 seconds
      maxRequests: 2,
      skipSuccessfulRequests: false,
      skipFailedRequests: false,
      keyGenerator: (req) => req.sessionId,
      onLimitReached: (req, res) => {
        console.warn(`Heartbeat rate limit exceeded for session ${req.sessionId}`)
      }
    })

    // Question request limiter
    this.rateLimiters.set('question', {
      windowMs: 5000, // 5 seconds
      maxRequests: 1,
      skipSuccessfulRequests: false,
      skipFailedRequests: true,
      keyGenerator: (req) => `${req.userId}:${req.questionId}`,
      onLimitReached: (req, res) => {
        console.warn(`Question request rate limit exceeded for user ${req.userId}`)
      }
    })
  }

  /**
   * Validate answer submission
   */
  async validateSubmission(submission: SubmissionValidation): Promise<ValidationResult> {
    const violations: string[] = []
    let score = 0
    let action: ValidationResult['action'] = 'allow'

    // Check rate limiting
    const rateLimitResult = this.checkRateLimit('submission', {
      userId: submission.userId,
      sessionId: submission.sessionId
    })

    if (!rateLimitResult.allowed) {
      violations.push('Submission rate limit exceeded')
      score += 15
      action = 'throttle'
    }

    // Validate timing
    const timingValidation = await this.validateAnswerTiming(
      submission.questionId,
      submission.userId,
      submission.timeSpent
    )

    if (timingValidation.isOutlier) {
      violations.push(`Answer timing suspicious: ${timingValidation.suspicionLevel}`)
      score += timingValidation.suspicionLevel === 'high' ? 10 : 5
    }

    // Check concurrent sessions
    const concurrentCheck = this.checkConcurrentSessions(
      submission.userId,
      submission.ipAddress
    )

    if (concurrentCheck.isViolation) {
      violations.push('Concurrent session limit exceeded')
      score += 20
      action = 'block'
    }

    // Validate submission hash
    const expectedHash = await this.generateSubmissionHash(submission)
    if (submission.clientHash !== expectedHash) {
      violations.push('Submission hash validation failed')
      score += 25
      action = 'terminate'
    }

    // Check IP reputation
    const ipValidation = await this.validateIPAddress(submission.ipAddress)
    if (!ipValidation.isValid) {
      violations.push(`IP validation failed: ${ipValidation.reason}`)
      score += ipValidation.severity === 'high' ? 15 : 5
    }

    // Analyze submission patterns
    const patternAnalysis = this.analyzeSubmissionPattern(submission)
    if (patternAnalysis.isSuspicious) {
      violations.push('Suspicious submission pattern detected')
      score += 10
    }

    // Check user agent consistency
    const userAgentCheck = this.validateUserAgent(submission.userId, submission.userAgent)
    if (!userAgentCheck.isConsistent) {
      violations.push('User agent inconsistency detected')
      score += 5
    }

    // Determine final action based on score
    if (score >= 30) action = 'terminate'
    else if (score >= 20) action = 'block'
    else if (score >= 10) action = 'warn'
    else if (score >= 5) action = 'throttle'

    // Store submission for pattern analysis
    this.storeSubmission(submission)

    return {
      isValid: violations.length === 0,
      violations,
      score,
      action,
      metadata: {
        timingAnalysis: timingValidation,
        concurrentSessions: concurrentCheck,
        ipValidation,
        patternAnalysis,
        userAgentCheck
      }
    }
  }

  /**
   * Check rate limiting for a specific type
   */
  checkRateLimit(type: string, request: any): { allowed: boolean; remaining: number; resetTime: number } {
    const config = this.rateLimiters.get(type)
    if (!config) {
      return { allowed: true, remaining: Infinity, resetTime: 0 }
    }

    const key = config.keyGenerator(request)
    const now = Date.now()
    const windowStart = now - config.windowMs

    // Get or create request history for this key
    let requests = this.submissionHistory.get(key) || []

    // Filter out old requests
    requests = requests.filter(timestamp => timestamp > windowStart)

    const allowed = requests.length < config.maxRequests

    if (allowed) {
      requests.push(now)
      this.submissionHistory.set(key, requests)
    } else {
      config.onLimitReached(request, null)
    }

    return {
      allowed,
      remaining: Math.max(0, config.maxRequests - requests.length),
      resetTime: Math.min(...requests) + config.windowMs
    }
  }

  /**
   * Validate answer timing
   */
  async validateAnswerTiming(
    questionId: string,
    userId: string,
    timeSpent: number
  ): Promise<TimingAnalysis> {
    const rule = this.validationRules.get('answer_time_validation')!
    const { minTimeSeconds, maxTimeSeconds, outlierThreshold } = rule.parameters

    // Get historical timings for this question
    const timings = this.questionTimings.get(questionId) || []

    // Add current timing
    timings.push(timeSpent)
    this.questionTimings.set(questionId, timings.slice(-100)) // Keep last 100 timings

    const timeSpentSeconds = timeSpent / 1000

    // Basic time validation
    if (timeSpentSeconds < minTimeSeconds) {
      return {
        questionId,
        userId,
        timeSpent,
        expectedMinTime: minTimeSeconds * 1000,
        expectedMaxTime: maxTimeSeconds * 1000,
        averageTime: this.calculateAverage(timings),
        isOutlier: true,
        suspicionLevel: 'high'
      }
    }

    if (timeSpentSeconds > maxTimeSeconds) {
      return {
        questionId,
        userId,
        timeSpent,
        expectedMinTime: minTimeSeconds * 1000,
        expectedMaxTime: maxTimeSeconds * 1000,
        averageTime: this.calculateAverage(timings),
        isOutlier: true,
        suspicionLevel: 'medium'
      }
    }

    // Statistical outlier detection
    if (timings.length >= 10) {
      const average = this.calculateAverage(timings)
      const stdDev = this.calculateStandardDeviation(timings, average)
      const zScore = Math.abs(timeSpent - average) / stdDev

      if (zScore > outlierThreshold) {
        return {
          questionId,
          userId,
          timeSpent,
          expectedMinTime: minTimeSeconds * 1000,
          expectedMaxTime: maxTimeSeconds * 1000,
          averageTime: average,
          isOutlier: true,
          suspicionLevel: zScore > outlierThreshold * 2 ? 'high' : 'medium'
        }
      }
    }

    return {
      questionId,
      userId,
      timeSpent,
      expectedMinTime: minTimeSeconds * 1000,
      expectedMaxTime: maxTimeSeconds * 1000,
      averageTime: this.calculateAverage(timings),
      isOutlier: false,
      suspicionLevel: 'none'
    }
  }

  /**
   * Check concurrent sessions
   */
  checkConcurrentSessions(userId: string, ipAddress: string): ConcurrentSessionCheck {
    const rule = this.validationRules.get('concurrent_session_limit')!
    const { maxSessionsPerUser, maxSessionsPerIP } = rule.parameters

    // Check user sessions
    const userSessions = this.userSessions.get(userId) || new Set()

    // Check IP sessions
    const ipSessions = this.sessionRegistry.get(ipAddress) || new Set()

    const isViolation = userSessions.size > maxSessionsPerUser || ipSessions.size > maxSessionsPerIP

    return {
      userId,
      ipAddress,
      maxConcurrentSessions: Math.min(maxSessionsPerUser, maxSessionsPerIP),
      currentSessions: Math.max(userSessions.size, ipSessions.size),
      isViolation
    }
  }

  /**
   * Validate IP address
   */
  async validateIPAddress(ipAddress: string): Promise<{
    isValid: boolean
    reason?: string
    severity: 'low' | 'medium' | 'high'
    metadata: any
  }> {
    // Check whitelist
    if (this.ipWhitelist.has(ipAddress)) {
      return { isValid: true, severity: 'low', metadata: { whitelisted: true } }
    }

    // Check blacklist
    if (this.ipBlacklist.has(ipAddress)) {
      return {
        isValid: false,
        reason: 'IP address is blacklisted',
        severity: 'high',
        metadata: { blacklisted: true }
      }
    }

    // Validate IP format
    if (!this.isValidIPAddress(ipAddress)) {
      return {
        isValid: false,
        reason: 'Invalid IP address format',
        severity: 'medium',
        metadata: { invalidFormat: true }
      }
    }

    // Check for private/local addresses
    if (this.isPrivateIP(ipAddress)) {
      return {
        isValid: false,
        reason: 'Private IP address not allowed',
        severity: 'medium',
        metadata: { privateIP: true }
      }
    }

    // In a real implementation, you would check:
    // - VPN/Proxy detection services
    // - Geolocation services
    // - Threat intelligence feeds
    // - TOR exit node lists

    return { isValid: true, severity: 'low', metadata: {} }
  }

  /**
   * Analyze submission patterns
   */
  analyzeSubmissionPattern(submission: SubmissionValidation): {
    isSuspicious: boolean
    patterns: string[]
    confidence: number
  } {
    const patterns: string[] = []
    let suspicionScore = 0

    // Get user's recent submissions
    const userKey = `pattern_${submission.userId}`
    const recentSubmissions = this.submissionHistory.get(userKey) || []

    // Add current submission
    recentSubmissions.push({
      questionId: submission.questionId,
      timeSpent: submission.timeSpent,
      submissionTime: submission.submissionTime,
      answer: submission.answer
    })

    // Keep last 20 submissions
    const submissions = recentSubmissions.slice(-20)
    this.submissionHistory.set(userKey, submissions)

    if (submissions.length >= 5) {
      // Check for consistent timing patterns
      const timings = submissions.map(s => s.timeSpent)
      const timingVariance = this.calculateVariance(timings)

      if (timingVariance < 1000) { // Very consistent timing
        patterns.push('Consistent timing pattern')
        suspicionScore += 5
      }

      // Check for sequential answer patterns
      const answers = submissions.slice(-10).map(s => s.answer)
      const sequentialPattern = this.detectSequentialPattern(answers)

      if (sequentialPattern) {
        patterns.push('Sequential answer pattern detected')
        suspicionScore += 10
      }

      // Check for rapid consecutive submissions
      const intervals = []
      for (let i = 1; i < submissions.length; i++) {
        intervals.push(submissions[i].submissionTime - submissions[i-1].submissionTime)
      }

      const averageInterval = this.calculateAverage(intervals)
      if (averageInterval < 10000) { // Less than 10 seconds between submissions
        patterns.push('Rapid consecutive submissions')
        suspicionScore += 8
      }
    }

    return {
      isSuspicious: suspicionScore > 10,
      patterns,
      confidence: Math.min(suspicionScore / 20, 1)
    }
  }

  /**
   * Validate user agent consistency
   */
  validateUserAgent(userId: string, userAgent: string): {
    isConsistent: boolean
    previousUserAgent?: string
    changeCount: number
  } {
    const rule = this.validationRules.get('user_agent_consistency')!

    if (!rule.parameters.allowUserAgentChanges) {
      const key = `ua_${userId}`
      const stored = this.submissionHistory.get(key)

      if (!stored) {
        this.submissionHistory.set(key, { userAgent, changeCount: 0 })
        return { isConsistent: true, changeCount: 0 }
      }

      if (stored.userAgent !== userAgent) {
        stored.changeCount++
        stored.userAgent = userAgent

        return {
          isConsistent: false,
          previousUserAgent: stored.userAgent,
          changeCount: stored.changeCount
        }
      }

      return { isConsistent: true, changeCount: stored.changeCount }
    }

    return { isConsistent: true, changeCount: 0 }
  }

  /**
   * Generate submission hash for validation
   */
  private async generateSubmissionHash(submission: SubmissionValidation): Promise<string> {
    const data = `${submission.userId}-${submission.questionId}-${submission.answer}-${submission.submissionTime}`
    const encoder = new TextEncoder()
    const dataBytes = encoder.encode(data)
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBytes)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  }

  /**
   * Store submission for pattern analysis
   */
  private storeSubmission(submission: SubmissionValidation): void {
    // Store in various keys for different types of analysis
    const keys = [
      `user_${submission.userId}`,
      `session_${submission.sessionId}`,
      `ip_${submission.ipAddress}`,
      `question_${submission.questionId}`
    ]

    keys.forEach(key => {
      const history = this.submissionHistory.get(key) || []
      history.push({
        timestamp: Date.now(),
        submission
      })

      // Keep last 100 entries
      this.submissionHistory.set(key, history.slice(-100))
    })
  }

  /**
   * Register a new session
   */
  registerSession(sessionId: string, userId: string, ipAddress: string): void {
    // Register in user sessions
    if (!this.userSessions.has(userId)) {
      this.userSessions.set(userId, new Set())
    }
    this.userSessions.get(userId)!.add(sessionId)

    // Register in IP sessions
    if (!this.sessionRegistry.has(ipAddress)) {
      this.sessionRegistry.set(ipAddress, new Set())
    }
    this.sessionRegistry.get(ipAddress)!.add(sessionId)
  }

  /**
   * Unregister a session
   */
  unregisterSession(sessionId: string, userId: string, ipAddress: string): void {
    // Remove from user sessions
    this.userSessions.get(userId)?.delete(sessionId)
    if (this.userSessions.get(userId)?.size === 0) {
      this.userSessions.delete(userId)
    }

    // Remove from IP sessions
    this.sessionRegistry.get(ipAddress)?.delete(sessionId)
    if (this.sessionRegistry.get(ipAddress)?.size === 0) {
      this.sessionRegistry.delete(ipAddress)
    }
  }

  /**
   * Utility functions
   */
  private calculateAverage(numbers: number[]): number {
    if (numbers.length === 0) return 0
    return numbers.reduce((sum, num) => sum + num, 0) / numbers.length
  }

  private calculateVariance(numbers: number[]): number {
    if (numbers.length === 0) return 0
    const avg = this.calculateAverage(numbers)
    const squaredDiffs = numbers.map(num => Math.pow(num - avg, 2))
    return this.calculateAverage(squaredDiffs)
  }

  private calculateStandardDeviation(numbers: number[], average?: number): number {
    if (numbers.length === 0) return 0
    const avg = average ?? this.calculateAverage(numbers)
    const squaredDiffs = numbers.map(num => Math.pow(num - avg, 2))
    const variance = this.calculateAverage(squaredDiffs)
    return Math.sqrt(variance)
  }

  private detectSequentialPattern(answers: number[]): boolean {
    if (answers.length < 4) return false

    // Check for ascending sequence
    let ascending = true
    let descending = true

    for (let i = 1; i < answers.length; i++) {
      if (answers[i] !== answers[i-1] + 1) ascending = false
      if (answers[i] !== answers[i-1] - 1) descending = false
    }

    return ascending || descending
  }

  private isValidIPAddress(ip: string): boolean {
    const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
    const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/
    return ipv4Regex.test(ip) || ipv6Regex.test(ip)
  }

  private isPrivateIP(ip: string): boolean {
    const privateRanges = [
      /^10\./,
      /^172\.(1[6-9]|2[0-9]|3[0-1])\./,
      /^192\.168\./,
      /^127\./,
      /^169\.254\./
    ]

    return privateRanges.some(range => range.test(ip))
  }

  /**
   * Add IP to whitelist
   */
  addToWhitelist(ipAddress: string): void {
    this.ipWhitelist.add(ipAddress)
  }

  /**
   * Add IP to blacklist
   */
  addToBlacklist(ipAddress: string): void {
    this.ipBlacklist.add(ipAddress)
  }

  /**
   * Get validation statistics
   */
  getValidationStats() {
    return {
      totalValidations: Array.from(this.submissionHistory.values())
        .reduce((sum, history) => sum + history.length, 0),
      activeSessions: Array.from(this.userSessions.values())
        .reduce((sum, sessions) => sum + sessions.size, 0),
      uniqueIPs: this.sessionRegistry.size,
      whitelistedIPs: this.ipWhitelist.size,
      blacklistedIPs: this.ipBlacklist.size,
      ruleStatus: Array.from(this.validationRules.entries()).map(([name, rule]) => ({
        name,
        enabled: rule.enabled,
        severity: rule.severity
      }))
    }
  }

  /**
   * Update validation rule
   */
  updateRule(ruleName: string, updates: Partial<ValidationRule>): void {
    const rule = this.validationRules.get(ruleName)
    if (rule) {
      Object.assign(rule, updates)
      console.log(`Updated validation rule: ${ruleName}`)
    }
  }

  /**
   * Generate validation report
   */
  generateValidationReport() {
    const stats = this.getValidationStats()

    return {
      timestamp: new Date().toISOString(),
      statistics: stats,
      recentViolations: this.getRecentViolations(),
      topViolatingIPs: this.getTopViolatingIPs(),
      systemHealth: {
        rulesActive: Array.from(this.validationRules.values()).filter(r => r.enabled).length,
        totalRules: this.validationRules.size,
        rateLimitersActive: this.rateLimiters.size
      }
    }
  }

  private getRecentViolations() {
    // Implementation would aggregate recent violations
    return []
  }

  private getTopViolatingIPs() {
    // Implementation would return IPs with most violations
    return []
  }
}

export default ServerValidationManager