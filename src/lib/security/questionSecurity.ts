/**
 * Question Security System for Test Integrity
 * Handles question randomization, encryption, and secure delivery
 */

import { SimpleQuestion, TestResponse } from '../../types/simpleTest'

export interface SecureQuestion {
  id: string
  encryptedContent: string
  encryptedOptions: string[]
  questionHash: string
  deliveryTime: number
  expiryTime: number
  allowedAttempts: number
  currentAttempts: number
  isActive: boolean
}

export interface QuestionPool {
  poolId: string
  testId: string
  totalQuestions: number
  questionsPerUser: number
  difficulty: 'easy' | 'medium' | 'hard' | 'mixed'
  subject: string
  topics: string[]
  questions: SecureQuestion[]
  shuffleOptions: boolean
  timeBasedUnlock: boolean
  questionTimeLimit: number // seconds per question
}

export interface QuestionDeliveryLog {
  userId: string
  questionId: string
  deliveredAt: number
  ipAddress: string
  userAgent: string
  deliveryHash: string
}

export interface AnswerValidation {
  questionId: string
  submittedAnswer: number
  submissionTime: number
  timeSpent: number
  isValid: boolean
  hash: string
  clientFingerprint: string
}

export class QuestionSecurityManager {
  private encryptionKey: CryptoKey | null = null
  private deliveredQuestions: Map<string, SecureQuestion> = new Map()
  private deliveryLogs: QuestionDeliveryLog[] = []
  private questionPools: Map<string, QuestionPool> = new Map()
  private userQuestionSets: Map<string, string[]> = new Map() // userId -> questionIds

  constructor() {
    this.initializeEncryption()
  }

  /**
   * Initialize encryption for question security
   */
  private async initializeEncryption(): Promise<void> {
    this.encryptionKey = await crypto.subtle.generateKey(
      {
        name: 'AES-GCM',
        length: 256
      },
      false,
      ['encrypt', 'decrypt']
    )
  }

  /**
   * Create a secure question pool from source questions
   */
  async createQuestionPool(
    testId: string,
    sourceQuestions: SimpleQuestion[],
    config: {
      questionsPerUser: number
      shuffleOptions: boolean
      timeBasedUnlock: boolean
      questionTimeLimit: number
      difficulty?: 'easy' | 'medium' | 'hard' | 'mixed'
    }
  ): Promise<QuestionPool> {
    if (!this.encryptionKey) {
      await this.initializeEncryption()
    }

    const poolId = await this.generatePoolId(testId)
    const secureQuestions: SecureQuestion[] = []

    for (const question of sourceQuestions) {
      const secureQuestion = await this.encryptQuestion(question)
      secureQuestions.push(secureQuestion)
    }

    const pool: QuestionPool = {
      poolId,
      testId,
      totalQuestions: sourceQuestions.length,
      questionsPerUser: config.questionsPerUser,
      difficulty: config.difficulty || 'mixed',
      subject: sourceQuestions[0]?.subject || 'biology',
      topics: [...new Set(sourceQuestions.map(q => q.topic))],
      questions: secureQuestions,
      shuffleOptions: config.shuffleOptions,
      timeBasedUnlock: config.timeBasedUnlock,
      questionTimeLimit: config.questionTimeLimit
    }

    this.questionPools.set(poolId, pool)
    console.log(`🔒 Question pool created with ${secureQuestions.length} questions`)

    return pool
  }

  /**
   * Generate unique question set for a user
   */
  generateUserQuestionSet(
    poolId: string,
    userId: string,
    randomSeed?: string
  ): string[] {
    const pool = this.questionPools.get(poolId)
    if (!pool) {
      throw new Error('Question pool not found')
    }

    // Use deterministic randomization based on userId and optional seed
    const seed = randomSeed || userId
    const rng = this.createSeededRandom(seed)

    // Shuffle questions array
    const shuffledQuestions = [...pool.questions].sort(() => rng() - 0.5)

    // Select required number of questions
    const selectedQuestions = shuffledQuestions
      .slice(0, pool.questionsPerUser)
      .map(q => q.id)

    this.userQuestionSets.set(userId, selectedQuestions)

    console.log(`📋 Generated question set for user ${userId}: ${selectedQuestions.length} questions`)
    return selectedQuestions
  }

  /**
   * Deliver a question securely to a user
   */
  async deliverQuestion(
    poolId: string,
    questionId: string,
    userId: string,
    userAgent: string,
    ipAddress: string
  ): Promise<{
    question: SimpleQuestion
    timeLimit: number
    hash: string
  } | null> {
    const pool = this.questionPools.get(poolId)
    if (!pool) {
      throw new Error('Question pool not found')
    }

    const userQuestions = this.userQuestionSets.get(userId)
    if (!userQuestions || !userQuestions.includes(questionId)) {
      throw new Error('Question not authorized for this user')
    }

    const secureQuestion = pool.questions.find(q => q.id === questionId)
    if (!secureQuestion) {
      throw new Error('Question not found in pool')
    }

    // Check if question is available for delivery
    if (!secureQuestion.isActive) {
      return null
    }

    // Check time-based unlock
    if (pool.timeBasedUnlock && Date.now() < secureQuestion.deliveryTime) {
      return null
    }

    // Check expiry
    if (Date.now() > secureQuestion.expiryTime) {
      return null
    }

    // Check attempt limits
    if (secureQuestion.currentAttempts >= secureQuestion.allowedAttempts) {
      return null
    }

    // Decrypt question
    const question = await this.decryptQuestion(secureQuestion)

    // Shuffle options if configured
    if (pool.shuffleOptions) {
      question.options = this.shuffleArray(question.options, userId + questionId)
    }

    // Generate delivery hash
    const deliveryHash = await this.generateDeliveryHash(questionId, userId, Date.now())

    // Log delivery
    const deliveryLog: QuestionDeliveryLog = {
      userId,
      questionId,
      deliveredAt: Date.now(),
      ipAddress,
      userAgent,
      deliveryHash
    }
    this.deliveryLogs.push(deliveryLog)

    // Update question delivery count
    secureQuestion.currentAttempts++
    this.deliveredQuestions.set(`${userId}-${questionId}`, secureQuestion)

    return {
      question,
      timeLimit: pool.questionTimeLimit,
      hash: deliveryHash
    }
  }

  /**
   * Validate answer submission
   */
  async validateAnswerSubmission(
    userId: string,
    questionId: string,
    submittedAnswer: number,
    submissionTime: number,
    clientHash: string,
    clientFingerprint: string
  ): Promise<{
    isValid: boolean
    reason?: string
    timeSpent: number
    score: number
  }> {
    const deliveredQuestion = this.deliveredQuestions.get(`${userId}-${questionId}`)
    if (!deliveredQuestion) {
      return {
        isValid: false,
        reason: 'Question not delivered to this user',
        timeSpent: 0,
        score: 0
      }
    }

    // Find delivery log
    const deliveryLog = this.deliveryLogs.find(
      log => log.userId === userId && log.questionId === questionId
    )
    if (!deliveryLog) {
      return {
        isValid: false,
        reason: 'No delivery record found',
        timeSpent: 0,
        score: 0
      }
    }

    const timeSpent = submissionTime - deliveryLog.deliveredAt

    // Validate submission timing
    if (timeSpent < 1000) { // Less than 1 second
      return {
        isValid: false,
        reason: 'Submission too fast',
        timeSpent,
        score: 0
      }
    }

    // Get pool for time limit validation
    const poolId = Object.values(this.questionPools.entries())
      .find(([_, pool]) => pool.questions.some(q => q.id === questionId))?.[0]

    if (poolId) {
      const pool = this.questionPools.get(poolId)!
      if (timeSpent > pool.questionTimeLimit * 1000) {
        return {
          isValid: false,
          reason: 'Time limit exceeded',
          timeSpent,
          score: 0
        }
      }
    }

    // Validate hash
    const expectedHash = await this.generateSubmissionHash(
      userId,
      questionId,
      submittedAnswer,
      submissionTime
    )

    if (clientHash !== expectedHash) {
      return {
        isValid: false,
        reason: 'Hash validation failed',
        timeSpent,
        score: 0
      }
    }

    // Decrypt and get correct answer
    const question = await this.decryptQuestion(deliveredQuestion)
    const isCorrect = submittedAnswer === question.correctAnswer
    const score = isCorrect ? question.marks : 0

    return {
      isValid: true,
      timeSpent,
      score
    }
  }

  /**
   * Encrypt a question for secure storage
   */
  private async encryptQuestion(question: SimpleQuestion): Promise<SecureQuestion> {
    if (!this.encryptionKey) {
      throw new Error('Encryption key not available')
    }

    const questionContent = JSON.stringify({
      question: question.question,
      correctAnswer: question.correctAnswer,
      explanation: question.explanation,
      subject: question.subject,
      topic: question.topic,
      difficulty: question.difficulty,
      marks: question.marks
    })

    const encryptedContent = await this.encrypt(questionContent)
    const encryptedOptions = await Promise.all(
      question.options.map(option => this.encrypt(option))
    )

    const questionHash = await this.generateQuestionHash(question)

    return {
      id: question.id,
      encryptedContent,
      encryptedOptions,
      questionHash,
      deliveryTime: Date.now(),
      expiryTime: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
      allowedAttempts: 1,
      currentAttempts: 0,
      isActive: true
    }
  }

  /**
   * Decrypt a secure question
   */
  private async decryptQuestion(secureQuestion: SecureQuestion): Promise<SimpleQuestion> {
    if (!this.encryptionKey) {
      throw new Error('Encryption key not available')
    }

    const contentJson = await this.decrypt(secureQuestion.encryptedContent)
    const content = JSON.parse(contentJson)

    const options = await Promise.all(
      secureQuestion.encryptedOptions.map(encOpt => this.decrypt(encOpt))
    )

    return {
      id: secureQuestion.id,
      question: content.question,
      options,
      correctAnswer: content.correctAnswer,
      explanation: content.explanation,
      subject: content.subject,
      topic: content.topic,
      difficulty: content.difficulty,
      marks: content.marks
    }
  }

  /**
   * Encrypt data using AES-GCM
   */
  private async encrypt(data: string): Promise<string> {
    if (!this.encryptionKey) {
      throw new Error('Encryption key not available')
    }

    const encoder = new TextEncoder()
    const dataBytes = encoder.encode(data)
    const iv = crypto.getRandomValues(new Uint8Array(12))

    const encrypted = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      this.encryptionKey,
      dataBytes
    )

    // Combine IV and encrypted data
    const combined = new Uint8Array(iv.length + encrypted.byteLength)
    combined.set(iv)
    combined.set(new Uint8Array(encrypted), iv.length)

    return btoa(String.fromCharCode(...combined))
  }

  /**
   * Decrypt data using AES-GCM
   */
  private async decrypt(encryptedData: string): Promise<string> {
    if (!this.encryptionKey) {
      throw new Error('Encryption key not available')
    }

    const combined = new Uint8Array(
      atob(encryptedData)
        .split('')
        .map(char => char.charCodeAt(0))
    )

    const iv = combined.slice(0, 12)
    const encrypted = combined.slice(12)

    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      this.encryptionKey,
      encrypted
    )

    const decoder = new TextDecoder()
    return decoder.decode(decrypted)
  }

  /**
   * Generate a secure pool ID
   */
  private async generatePoolId(testId: string): Promise<string> {
    const data = testId + Date.now() + Math.random()
    const encoder = new TextEncoder()
    const dataBytes = encoder.encode(data)
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBytes)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 16)
  }

  /**
   * Generate question hash for integrity verification
   */
  private async generateQuestionHash(question: SimpleQuestion): Promise<string> {
    const data = JSON.stringify({
      id: question.id,
      question: question.question,
      options: question.options,
      correctAnswer: question.correctAnswer
    })
    const encoder = new TextEncoder()
    const dataBytes = encoder.encode(data)
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBytes)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  }

  /**
   * Generate delivery hash
   */
  private async generateDeliveryHash(
    questionId: string,
    userId: string,
    timestamp: number
  ): Promise<string> {
    const data = `${questionId}-${userId}-${timestamp}`
    const encoder = new TextEncoder()
    const dataBytes = encoder.encode(data)
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBytes)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  }

  /**
   * Generate submission hash
   */
  private async generateSubmissionHash(
    userId: string,
    questionId: string,
    answer: number,
    timestamp: number
  ): Promise<string> {
    const data = `${userId}-${questionId}-${answer}-${timestamp}`
    const encoder = new TextEncoder()
    const dataBytes = encoder.encode(data)
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBytes)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  }

  /**
   * Create seeded random number generator
   */
  private createSeededRandom(seed: string): () => number {
    let hash = 0
    for (let i = 0; i < seed.length; i++) {
      const char = seed.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32-bit integer
    }

    return function() {
      hash = ((hash * 9301) + 49297) % 233280
      return hash / 233280
    }
  }

  /**
   * Shuffle array with deterministic randomization
   */
  private shuffleArray<T>(array: T[], seed: string): T[] {
    const shuffled = [...array]
    const rng = this.createSeededRandom(seed)

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }

    return shuffled
  }

  /**
   * Get question pool statistics
   */
  getPoolStatistics(poolId: string) {
    const pool = this.questionPools.get(poolId)
    if (!pool) {
      return null
    }

    const deliveryStats = this.deliveryLogs
      .filter(log => pool.questions.some(q => q.id === log.questionId))
      .reduce((stats, log) => {
        stats.totalDeliveries++
        if (!stats.uniqueUsers.has(log.userId)) {
          stats.uniqueUsers.add(log.userId)
        }
        return stats
      }, {
        totalDeliveries: 0,
        uniqueUsers: new Set<string>()
      })

    return {
      poolId,
      totalQuestions: pool.totalQuestions,
      questionsPerUser: pool.questionsPerUser,
      totalDeliveries: deliveryStats.totalDeliveries,
      uniqueUsers: deliveryStats.uniqueUsers.size,
      averageDeliveriesPerUser: deliveryStats.uniqueUsers.size > 0
        ? deliveryStats.totalDeliveries / deliveryStats.uniqueUsers.size
        : 0,
      questionUtilization: pool.questions.map(q => ({
        questionId: q.id,
        deliveryCount: q.currentAttempts,
        isActive: q.isActive
      }))
    }
  }

  /**
   * Invalidate compromised questions
   */
  invalidateQuestions(questionIds: string[], reason: string): void {
    for (const [poolId, pool] of this.questionPools.entries()) {
      let invalidatedCount = 0

      pool.questions.forEach(question => {
        if (questionIds.includes(question.id)) {
          question.isActive = false
          invalidatedCount++
        }
      })

      if (invalidatedCount > 0) {
        console.warn(`🚫 Invalidated ${invalidatedCount} questions in pool ${poolId}: ${reason}`)
      }
    }
  }

  /**
   * Generate security report
   */
  generateSecurityReport() {
    const poolSummaries = Array.from(this.questionPools.entries()).map(([poolId, pool]) => {
      const stats = this.getPoolStatistics(poolId)
      return {
        poolId,
        testId: pool.testId,
        questionCount: pool.totalQuestions,
        activeQuestions: pool.questions.filter(q => q.isActive).length,
        totalDeliveries: stats?.totalDeliveries || 0,
        uniqueUsers: stats?.uniqueUsers || 0
      }
    })

    const recentDeliveries = this.deliveryLogs
      .filter(log => Date.now() - log.deliveredAt < 24 * 60 * 60 * 1000) // Last 24 hours
      .length

    return {
      timestamp: new Date().toISOString(),
      pools: poolSummaries,
      deliveryLogs: {
        total: this.deliveryLogs.length,
        recent24h: recentDeliveries
      },
      security: {
        encryptionActive: !!this.encryptionKey,
        activeQuestions: Array.from(this.questionPools.values())
          .reduce((sum, pool) => sum + pool.questions.filter(q => q.isActive).length, 0),
        totalQuestions: Array.from(this.questionPools.values())
          .reduce((sum, pool) => sum + pool.totalQuestions, 0)
      }
    }
  }
}

export default QuestionSecurityManager