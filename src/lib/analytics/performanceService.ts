import { prisma as db } from '@/lib/database'
import type {
  UserPerformanceData,
  TestSessionAnalytics,
  TopicAnalytics,
  ProgressTrend,
  ComparativeAnalytics,
  PerformanceMetrics
} from '@/lib/types/analytics'

export class PerformanceAnalyticsService {
  /**
   * Get comprehensive user performance data
   */
  async getUserPerformanceData(userId: string, timeRange?: { from: Date; to: Date }): Promise<UserPerformanceData> {
    const whereClause = {
      freeUserId: userId,
      ...(timeRange && {
        startedAt: {
          gte: timeRange.from,
          lte: timeRange.to
        }
      })
    }

    // Get test attempts with detailed analysis
    const testAttempts = await db.testAttempt.findMany({
      where: whereClause,
      include: {
        testQuestions: {
          include: {
            question: true
          }
        }
      },
      orderBy: { startedAt: 'desc' }
    })

    // Get user profile
    const user = await db.freeUser.findUnique({
      where: { id: userId },
      include: {
        achievements: true,
        studyPlans: true
      }
    })

    if (!user) {
      throw new Error('User not found')
    }

    // Calculate overall metrics
    const totalTests = testAttempts.length
    const completedTests = testAttempts.filter(t => t.status === 'COMPLETED').length
    const averageScore = totalTests > 0
      ? testAttempts.reduce((sum, test) => sum + test.percentage, 0) / totalTests
      : 0

    // Calculate topic-wise performance
    const topicPerformance: Record<string, TopicAnalytics> = {}

    testAttempts.forEach(attempt => {
      attempt.testQuestions.forEach(tq => {
        const topic = tq.question.topic
        if (!topicPerformance[topic]) {
          topicPerformance[topic] = {
            topic,
            totalQuestions: 0,
            correctAnswers: 0,
            averageTime: 0,
            accuracy: 0,
            trend: [],
            difficulty: {
              easy: { correct: 0, total: 0 },
              medium: { correct: 0, total: 0 },
              hard: { correct: 0, total: 0 }
            }
          }
        }

        topicPerformance[topic].totalQuestions++
        if (tq.isCorrect) topicPerformance[topic].correctAnswers++
        if (tq.timeSpent) {
          topicPerformance[topic].averageTime =
            (topicPerformance[topic].averageTime + tq.timeSpent) / 2
        }

        // Track difficulty-wise performance
        const difficulty = tq.question.difficulty.toLowerCase() as 'easy' | 'medium' | 'hard'
        if (topicPerformance[topic].difficulty[difficulty]) {
          topicPerformance[topic].difficulty[difficulty].total++
          if (tq.isCorrect) {
            topicPerformance[topic].difficulty[difficulty].correct++
          }
        }
      })
    })

    // Calculate accuracy for each topic
    Object.values(topicPerformance).forEach(topic => {
      topic.accuracy = topic.totalQuestions > 0
        ? (topic.correctAnswers / topic.totalQuestions) * 100
        : 0
    })

    // Calculate progress trends (last 30 days)
    const last30Days = new Date()
    last30Days.setDate(last30Days.getDate() - 30)

    const recentTests = testAttempts.filter(t =>
      t.startedAt >= last30Days && t.status === 'COMPLETED'
    )

    const progressTrend: ProgressTrend[] = this.generateProgressTrend(recentTests)

    return {
      userId,
      userName: user.name || 'Unknown',
      totalTests,
      completedTests,
      averageScore,
      totalStudyTime: testAttempts.reduce((sum, test) => sum + (test.timeSpent || 0), 0),
      currentStreak: user.studyStreak,
      totalPoints: user.totalPoints,
      topicPerformance: Object.values(topicPerformance),
      progressTrend,
      strengths: this.identifyStrengths(topicPerformance),
      weaknesses: this.identifyWeaknesses(topicPerformance),
      achievements: user.achievements.map(a => ({
        type: a.type,
        title: a.title,
        earnedAt: a.earnedAt,
        points: a.points
      })),
      timeRange: timeRange || { from: new Date(0), to: new Date() }
    }
  }

  /**
   * Get test session analytics
   */
  async getTestSessionAnalytics(testAttemptId: string): Promise<TestSessionAnalytics> {
    const testAttempt = await db.testAttempt.findUnique({
      where: { id: testAttemptId },
      include: {
        testQuestions: {
          include: {
            question: true
          }
        },
        freeUser: true
      }
    })

    if (!testAttempt) {
      throw new Error('Test attempt not found')
    }

    const totalQuestions = testAttempt.testQuestions.length
    const correctAnswers = testAttempt.testQuestions.filter(tq => tq.isCorrect).length
    const accuracy = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0

    // Question-wise analysis
    const questionAnalysis = testAttempt.testQuestions.map(tq => ({
      questionId: tq.questionId,
      topic: tq.question.topic,
      difficulty: tq.question.difficulty,
      isCorrect: tq.isCorrect || false,
      timeSpent: tq.timeSpent || 0,
      selectedAnswer: tq.selectedAnswer,
      correctAnswer: tq.question.correctAnswer,
      explanation: tq.question.explanation
    }))

    // Topic-wise breakdown
    const topicBreakdown: Record<string, any> = {}
    testAttempt.testQuestions.forEach(tq => {
      const topic = tq.question.topic
      if (!topicBreakdown[topic]) {
        topicBreakdown[topic] = {
          topic,
          total: 0,
          correct: 0,
          timeSpent: 0
        }
      }
      topicBreakdown[topic].total++
      if (tq.isCorrect) topicBreakdown[topic].correct++
      topicBreakdown[topic].timeSpent += tq.timeSpent || 0
    })

    return {
      testAttemptId,
      userId: testAttempt.freeUserId,
      title: testAttempt.title,
      totalQuestions,
      correctAnswers,
      accuracy,
      score: testAttempt.score,
      totalMarks: testAttempt.totalMarks,
      percentage: testAttempt.percentage,
      timeSpent: testAttempt.timeSpent,
      timeLimit: testAttempt.timeLimit,
      startedAt: testAttempt.startedAt,
      submittedAt: testAttempt.submittedAt,
      questionAnalysis,
      topicBreakdown: Object.values(topicBreakdown),
      recommendations: this.generateRecommendations(questionAnalysis, Object.values(topicBreakdown))
    }
  }

  /**
   * Get topic-wise performance analysis
   */
  async getTopicAnalytics(userId: string, topic: string): Promise<TopicAnalytics> {
    const testAttempts = await db.testAttempt.findMany({
      where: {
        freeUserId: userId,
        topics: {
          path: '$',
          array_contains: topic
        }
      },
      include: {
        testQuestions: {
          include: {
            question: {
              where: { topic }
            }
          }
        }
      },
      orderBy: { startedAt: 'desc' }
    })

    let totalQuestions = 0
    let correctAnswers = 0
    let totalTime = 0
    const difficulty = {
      easy: { correct: 0, total: 0 },
      medium: { correct: 0, total: 0 },
      hard: { correct: 0, total: 0 }
    }

    // Calculate trend data (last 10 tests)
    const trend: Array<{ date: Date; accuracy: number; timePerQuestion: number }> = []

    testAttempts.slice(0, 10).forEach(attempt => {
      const topicQuestions = attempt.testQuestions.filter(tq => tq.question.topic === topic)
      if (topicQuestions.length === 0) return

      const correct = topicQuestions.filter(tq => tq.isCorrect).length
      const total = topicQuestions.length
      const time = topicQuestions.reduce((sum, tq) => sum + (tq.timeSpent || 0), 0)

      totalQuestions += total
      correctAnswers += correct
      totalTime += time

      trend.push({
        date: attempt.startedAt,
        accuracy: total > 0 ? (correct / total) * 100 : 0,
        timePerQuestion: total > 0 ? time / total : 0
      })

      // Track difficulty
      topicQuestions.forEach(tq => {
        const diff = tq.question.difficulty.toLowerCase() as 'easy' | 'medium' | 'hard'
        if (difficulty[diff]) {
          difficulty[diff].total++
          if (tq.isCorrect) difficulty[diff].correct++
        }
      })
    })

    return {
      topic,
      totalQuestions,
      correctAnswers,
      accuracy: totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0,
      averageTime: totalQuestions > 0 ? totalTime / totalQuestions : 0,
      difficulty,
      trend: trend.reverse() // Show chronological order
    }
  }

  /**
   * Get comparative analytics (user vs class average)
   */
  async getComparativeAnalytics(userId: string, grade: string): Promise<ComparativeAnalytics> {
    const user = await db.freeUser.findUnique({
      where: { id: userId }
    })

    if (!user) {
      throw new Error('User not found')
    }

    // Get user performance
    const userPerformance = await this.getUserPerformanceData(userId)

    // Get class average performance
    const classUsers = await db.freeUser.findMany({
      where: {
        grade,
        id: { not: userId }
      },
      include: {
        testAttempts: {
          where: { status: 'COMPLETED' }
        }
      }
    })

    // Calculate class averages
    const classData = {
      totalUsers: classUsers.length,
      averageScore: 0,
      averageTestsTaken: 0,
      averageStudyTime: 0,
      topPerformers: []
    }

    if (classUsers.length > 0) {
      const classStats = classUsers.map(classUser => {
        const completedTests = classUser.testAttempts.filter(t => t.status === 'COMPLETED')
        const avgScore = completedTests.length > 0
          ? completedTests.reduce((sum, test) => sum + test.percentage, 0) / completedTests.length
          : 0
        const totalTime = completedTests.reduce((sum, test) => sum + (test.timeSpent || 0), 0)

        return {
          userId: classUser.id,
          name: classUser.name,
          avgScore,
          testsTaken: completedTests.length,
          totalTime
        }
      })

      classData.averageScore = classStats.reduce((sum, user) => sum + user.avgScore, 0) / classStats.length
      classData.averageTestsTaken = classStats.reduce((sum, user) => sum + user.testsTaken, 0) / classStats.length
      classData.averageStudyTime = classStats.reduce((sum, user) => sum + user.totalTime, 0) / classStats.length

      // Get top 5 performers
      classData.topPerformers = classStats
        .sort((a, b) => b.avgScore - a.avgScore)
        .slice(0, 5)
        .map((user, index) => ({
          rank: index + 1,
          name: user.name || 'Anonymous',
          score: user.avgScore
        }))
    }

    // Calculate user rank
    const userRank = classUsers.filter(classUser => {
      const completedTests = classUser.testAttempts.filter(t => t.status === 'COMPLETED')
      const avgScore = completedTests.length > 0
        ? completedTests.reduce((sum, test) => sum + test.percentage, 0) / completedTests.length
        : 0
      return avgScore > userPerformance.averageScore
    }).length + 1

    return {
      user: {
        rank: userRank,
        score: userPerformance.averageScore,
        testsTaken: userPerformance.completedTests,
        studyTime: userPerformance.totalStudyTime,
        strengths: userPerformance.strengths,
        weaknesses: userPerformance.weaknesses
      },
      class: classData,
      percentile: classUsers.length > 0 ? ((classUsers.length - userRank + 1) / classUsers.length) * 100 : 0,
      comparison: {
        scoreComparison: userPerformance.averageScore - classData.averageScore,
        testsComparison: userPerformance.completedTests - classData.averageTestsTaken,
        timeComparison: userPerformance.totalStudyTime - classData.averageStudyTime
      }
    }
  }

  /**
   * Get performance metrics for dashboard
   */
  async getPerformanceMetrics(userId: string, period: 'week' | 'month' | 'quarter' = 'month'): Promise<PerformanceMetrics> {
    const now = new Date()
    const startDate = new Date()

    switch (period) {
      case 'week':
        startDate.setDate(now.getDate() - 7)
        break
      case 'month':
        startDate.setMonth(now.getMonth() - 1)
        break
      case 'quarter':
        startDate.setMonth(now.getMonth() - 3)
        break
    }

    const testAttempts = await db.testAttempt.findMany({
      where: {
        freeUserId: userId,
        startedAt: {
          gte: startDate
        },
        status: 'COMPLETED'
      },
      include: {
        testQuestions: {
          include: {
            question: true
          }
        }
      }
    })

    const totalTests = testAttempts.length
    const totalQuestions = testAttempts.reduce((sum, test) => sum + test.testQuestions.length, 0)
    const correctAnswers = testAttempts.reduce((sum, test) =>
      sum + test.testQuestions.filter(tq => tq.isCorrect).length, 0
    )
    const totalTime = testAttempts.reduce((sum, test) => sum + (test.timeSpent || 0), 0)

    // Get improvement metrics
    const midPoint = new Date(startDate.getTime() + (now.getTime() - startDate.getTime()) / 2)
    const firstHalf = testAttempts.filter(t => t.startedAt < midPoint)
    const secondHalf = testAttempts.filter(t => t.startedAt >= midPoint)

    const firstHalfAvg = firstHalf.length > 0
      ? firstHalf.reduce((sum, test) => sum + test.percentage, 0) / firstHalf.length
      : 0
    const secondHalfAvg = secondHalf.length > 0
      ? secondHalf.reduce((sum, test) => sum + test.percentage, 0) / secondHalf.length
      : 0

    return {
      period,
      totalTests,
      totalQuestions,
      correctAnswers,
      accuracy: totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0,
      averageScore: totalTests > 0
        ? testAttempts.reduce((sum, test) => sum + test.percentage, 0) / totalTests
        : 0,
      totalStudyTime: totalTime,
      averageTestTime: totalTests > 0 ? totalTime / totalTests : 0,
      improvement: secondHalfAvg - firstHalfAvg,
      consistencyScore: this.calculateConsistencyScore(testAttempts),
      topTopics: this.getTopPerformingTopics(testAttempts, 5),
      weakTopics: this.getWeakPerformingTopics(testAttempts, 5)
    }
  }

  // Helper methods
  private generateProgressTrend(tests: any[]): ProgressTrend[] {
    return tests.map(test => ({
      date: test.startedAt,
      score: test.percentage,
      accuracy: test.percentage,
      testsCompleted: 1,
      studyTime: test.timeSpent || 0
    }))
  }

  private identifyStrengths(topicPerformance: Record<string, TopicAnalytics>): string[] {
    return Object.values(topicPerformance)
      .filter(topic => topic.accuracy >= 80 && topic.totalQuestions >= 5)
      .sort((a, b) => b.accuracy - a.accuracy)
      .slice(0, 3)
      .map(topic => topic.topic)
  }

  private identifyWeaknesses(topicPerformance: Record<string, TopicAnalytics>): string[] {
    return Object.values(topicPerformance)
      .filter(topic => topic.accuracy < 60 && topic.totalQuestions >= 5)
      .sort((a, b) => a.accuracy - b.accuracy)
      .slice(0, 3)
      .map(topic => topic.topic)
  }

  private generateRecommendations(questionAnalysis: any[], topicBreakdown: any[]): string[] {
    const recommendations: string[] = []

    // Weak topics
    const weakTopics = topicBreakdown
      .filter(topic => topic.correct / topic.total < 0.6)
      .map(topic => topic.topic)

    if (weakTopics.length > 0) {
      recommendations.push(`Focus on improving: ${weakTopics.join(', ')}`)
    }

    // Time management
    const avgTimePerQuestion = questionAnalysis.reduce((sum, q) => sum + q.timeSpent, 0) / questionAnalysis.length
    if (avgTimePerQuestion > 120) { // More than 2 minutes per question
      recommendations.push('Work on time management - try to solve questions faster')
    }

    // Difficulty patterns
    const hardQuestions = questionAnalysis.filter(q => q.difficulty === 'Hard')
    const hardAccuracy = hardQuestions.length > 0
      ? hardQuestions.filter(q => q.isCorrect).length / hardQuestions.length
      : 0

    if (hardAccuracy < 0.4) {
      recommendations.push('Practice more challenging questions to improve problem-solving skills')
    }

    return recommendations
  }

  private calculateConsistencyScore(tests: any[]): number {
    if (tests.length < 2) return 100

    const scores = tests.map(test => test.percentage)
    const mean = scores.reduce((sum, score) => sum + score, 0) / scores.length
    const variance = scores.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) / scores.length
    const standardDeviation = Math.sqrt(variance)

    // Consistency score: lower standard deviation = higher consistency
    return Math.max(0, 100 - standardDeviation)
  }

  private getTopPerformingTopics(tests: any[], limit: number): Array<{ topic: string; accuracy: number }> {
    const topicStats: Record<string, { correct: number; total: number }> = {}

    tests.forEach(test => {
      test.testQuestions.forEach((tq: any) => {
        const topic = tq.question.topic
        if (!topicStats[topic]) {
          topicStats[topic] = { correct: 0, total: 0 }
        }
        topicStats[topic].total++
        if (tq.isCorrect) topicStats[topic].correct++
      })
    })

    return Object.entries(topicStats)
      .map(([topic, stats]) => ({
        topic,
        accuracy: stats.total > 0 ? (stats.correct / stats.total) * 100 : 0
      }))
      .filter(item => item.accuracy > 0)
      .sort((a, b) => b.accuracy - a.accuracy)
      .slice(0, limit)
  }

  private getWeakPerformingTopics(tests: any[], limit: number): Array<{ topic: string; accuracy: number }> {
    const topicStats: Record<string, { correct: number; total: number }> = {}

    tests.forEach(test => {
      test.testQuestions.forEach((tq: any) => {
        const topic = tq.question.topic
        if (!topicStats[topic]) {
          topicStats[topic] = { correct: 0, total: 0 }
        }
        topicStats[topic].total++
        if (tq.isCorrect) topicStats[topic].correct++
      })
    })

    return Object.entries(topicStats)
      .map(([topic, stats]) => ({
        topic,
        accuracy: stats.total > 0 ? (stats.correct / stats.total) * 100 : 0
      }))
      .filter(item => item.accuracy < 100)
      .sort((a, b) => a.accuracy - b.accuracy)
      .slice(0, limit)
  }
}

export const performanceAnalytics = new PerformanceAnalyticsService()