import { prisma as db } from '@/lib/database'
import type { LiveAnalytics, RealTimeSession } from '@/lib/types/analytics'

export class RealTimeAnalyticsService {
  private activeSessions: Map<string, RealTimeSession> = new Map()
  private subscribers: Set<(data: LiveAnalytics) => void> = new Set()

  /**
   * Subscribe to real-time analytics updates
   */
  subscribe(callback: (data: LiveAnalytics) => void): () => void {
    this.subscribers.add(callback)
    return () => this.subscribers.delete(callback)
  }

  /**
   * Update session activity
   */
  async updateSession(sessionData: Partial<RealTimeSession>): Promise<void> {
    if (!sessionData.sessionId) return

    const existing = this.activeSessions.get(sessionData.sessionId)
    const updated: RealTimeSession = {
      ...existing,
      ...sessionData,
      lastActivity: new Date(),
    } as RealTimeSession

    this.activeSessions.set(sessionData.sessionId, updated)

    // Update database
    await db.testSession
      .update({
        where: { sessionToken: sessionData.sessionId },
        data: {
          currentQuestionIndex: sessionData.currentQuestion,
          updatedAt: new Date(),
        },
      })
      .catch(() => {
        // Handle error silently for real-time updates
      })

    // Broadcast updates
    this.broadcastUpdate()
  }

  /**
   * Start a new session
   */
  async startSession(sessionData: RealTimeSession): Promise<void> {
    this.activeSessions.set(sessionData.sessionId, {
      ...sessionData,
      lastActivity: new Date(),
    })

    this.broadcastUpdate()
  }

  /**
   * End a session
   */
  async endSession(sessionId: string): Promise<void> {
    this.activeSessions.delete(sessionId)
    this.broadcastUpdate()
  }

  /**
   * Get current live analytics
   */
  async getLiveAnalytics(): Promise<LiveAnalytics> {
    // Clean up stale sessions (older than 5 minutes)
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000)
    for (const [sessionId, session] of this.activeSessions.entries()) {
      if (session.lastActivity < fiveMinutesAgo) {
        this.activeSessions.delete(sessionId)
      }
    }

    // Get today's test completion data
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const todayTests = await db.testAttempt.findMany({
      where: {
        submittedAt: {
          gte: today,
        },
        status: 'COMPLETED',
      },
    })

    const completedTestsToday = todayTests.length
    const averageScoreToday =
      todayTests.length > 0
        ? todayTests.reduce((sum, test) => sum + test.percentage, 0) / todayTests.length
        : 0

    // Get popular topics from recent sessions
    const recentTests = await db.testAttempt.findMany({
      where: {
        startedAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000), // Last 24 hours
        },
      },
      include: {
        testQuestions: {
          include: {
            question: true,
          },
        },
      },
    })

    const topicStats: Record<string, { attempts: number; totalScore: number }> = {}

    recentTests.forEach((test) => {
      test.testQuestions.forEach((tq) => {
        const topic = tq.question.topic
        if (!topicStats[topic]) {
          topicStats[topic] = { attempts: 0, totalScore: 0 }
        }
        topicStats[topic].attempts++
        topicStats[topic].totalScore += tq.isCorrect ? 1 : 0
      })
    })

    const popularTopics = Object.entries(topicStats)
      .map(([topic, stats]) => ({
        topic,
        testsAttempted: stats.attempts,
        averageScore: stats.attempts > 0 ? (stats.totalScore / stats.attempts) * 100 : 0,
      }))
      .sort((a, b) => b.testsAttempted - a.testsAttempted)
      .slice(0, 10)

    // Get overall performance metrics
    const totalTests = await db.testAttempt.count({
      where: { status: 'COMPLETED' },
    })

    const totalUsers = await db.freeUser.count()

    const activeUsersLast7Days = await db.freeUser.count({
      where: {
        lastActiveDate: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
      },
    })

    return {
      activeUsers: this.activeSessions.size,
      activeSessions: Array.from(this.activeSessions.values()),
      completedTestsToday,
      averageScoreToday,
      popularTopics,
      performance: {
        totalTests,
        totalUsers,
        conversionRate: 0, // Calculate based on demo bookings vs enrollments
        retentionRate: totalUsers > 0 ? (activeUsersLast7Days / totalUsers) * 100 : 0,
      },
    }
  }

  /**
   * Get active sessions for monitoring
   */
  getActiveSessions(): RealTimeSession[] {
    return Array.from(this.activeSessions.values())
  }

  /**
   * Get session by ID
   */
  getSession(sessionId: string): RealTimeSession | undefined {
    return this.activeSessions.get(sessionId)
  }

  /**
   * Update test progress in real-time
   */
  async updateTestProgress(
    sessionId: string,
    progress: {
      currentQuestion: number
      score: number
      accuracy: number
      timeRemaining?: number
    }
  ): Promise<void> {
    const session = this.activeSessions.get(sessionId)
    if (!session) return

    const updated: RealTimeSession = {
      ...session,
      currentQuestion: progress.currentQuestion,
      score: progress.score,
      accuracy: progress.accuracy,
      timeRemaining: progress.timeRemaining || session.timeRemaining,
      lastActivity: new Date(),
    }

    this.activeSessions.set(sessionId, updated)
    this.broadcastUpdate()
  }

  /**
   * Track test completion in real-time
   */
  async completeTest(
    sessionId: string,
    finalResults: {
      score: number
      accuracy: number
      timeTaken: number
    }
  ): Promise<void> {
    const session = this.activeSessions.get(sessionId)
    if (!session) return

    const completed: RealTimeSession = {
      ...session,
      status: 'completed',
      score: finalResults.score,
      accuracy: finalResults.accuracy,
      lastActivity: new Date(),
    }

    this.activeSessions.set(sessionId, completed)

    // Remove from active sessions after a delay
    setTimeout(() => {
      this.activeSessions.delete(sessionId)
      this.broadcastUpdate()
    }, 5000)

    this.broadcastUpdate()
  }

  /**
   * Get real-time statistics for dashboard
   */
  async getDashboardStats(): Promise<{
    activeTests: number
    completedToday: number
    averageScore: number
    topPerformers: Array<{ name: string; score: number }>
  }> {
    const activeSessions = Array.from(this.activeSessions.values())
    const activeTests = activeSessions.filter((s) => s.status === 'active').length

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const todayCompletions = await db.testAttempt.findMany({
      where: {
        submittedAt: {
          gte: today,
        },
        status: 'COMPLETED',
      },
      include: {
        freeUser: true,
      },
      orderBy: {
        percentage: 'desc',
      },
      take: 5,
    })

    const completedToday = todayCompletions.length
    const averageScore =
      completedToday > 0
        ? todayCompletions.reduce((sum, test) => sum + test.percentage, 0) / completedToday
        : 0

    const topPerformers = todayCompletions.map((test) => ({
      name: test.freeUser.name || 'Anonymous',
      score: test.percentage,
    }))

    return {
      activeTests,
      completedToday,
      averageScore,
      topPerformers,
    }
  }

  /**
   * Broadcast updates to all subscribers
   */
  private async broadcastUpdate(): Promise<void> {
    try {
      const liveData = await this.getLiveAnalytics()
      this.subscribers.forEach((callback) => {
        try {
          callback(liveData)
        } catch (error) {
          console.error('Error in analytics subscriber callback:', error)
        }
      })
    } catch (error) {
      console.error('Error broadcasting analytics update:', error)
    }
  }

  /**
   * Initialize with existing active sessions
   */
  async initialize(): Promise<void> {
    try {
      // Load active sessions from database
      const activeSessions = await db.testSession.findMany({
        where: {
          status: 'IN_PROGRESS',
          updatedAt: {
            gte: new Date(Date.now() - 5 * 60 * 1000), // Last 5 minutes
          },
        },
        include: {
          testTemplate: true,
          freeUser: true,
        },
      })

      activeSessions.forEach((session) => {
        const realTimeSession: RealTimeSession = {
          sessionId: session.sessionToken,
          userId: session.freeUserId || '',
          testId: session.testTemplateId,
          currentQuestion: session.currentQuestionIndex,
          totalQuestions: session.testTemplate?.totalQuestions || 0,
          timeRemaining: session.remainingTime || 0,
          status: 'active',
          score: session.totalScore || 0,
          accuracy: session.percentage || 0,
          lastActivity: session.updatedAt,
        }

        this.activeSessions.set(session.sessionToken, realTimeSession)
      })

      console.log(`Initialized with ${this.activeSessions.size} active sessions`)
    } catch (error) {
      console.error('Error initializing real-time analytics:', error)
    }
  }

  /**
   * Cleanup stale sessions periodically
   */
  startCleanup(): void {
    setInterval(() => {
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000)
      let cleaned = 0

      for (const [sessionId, session] of this.activeSessions.entries()) {
        if (session.lastActivity < fiveMinutesAgo) {
          this.activeSessions.delete(sessionId)
          cleaned++
        }
      }

      if (cleaned > 0) {
        console.log(`Cleaned up ${cleaned} stale sessions`)
        this.broadcastUpdate()
      }
    }, 60000) // Run every minute
  }
}

export const realTimeAnalytics = new RealTimeAnalyticsService()
