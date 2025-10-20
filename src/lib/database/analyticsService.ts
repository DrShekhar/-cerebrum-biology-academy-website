import { prisma, DatabaseUtils } from './connection'
import { AnalyticsCacheService } from '../cache/redis'
import type {
  TestSession,
  TestAttempt,
  UserProgress,
  Question,
  PerformanceReport,
  Prisma
} from '@/generated/prisma'

export interface GlobalStats {
  totalUsers: number
  totalTests: number
  totalQuestions: number
  testsToday: number
  testsThisWeek: number
  testsThisMonth: number
  averageTestScore: number
  averageTestTime: number
  mostPopularTopics: { topic: string; count: number }[]
  activeUsers: number
  topPerformers: { userId: string; name: string; score: number }[]
}

export interface TopicAnalytics {
  topic: string
  totalAttempts: number
  averageScore: number
  averageTime: number
  difficultyDistribution: Record<string, number>
  popularQuestions: { id: string; title: string; attempts: number }[]
  improvementTrend: { date: string; averageScore: number }[]
}

export interface UserPerformanceAnalytics {
  userId: string
  totalTests: number
  averageScore: number
  bestScore: number
  totalStudyTime: number
  consistencyScore: number
  improvementRate: number
  strongTopics: string[]
  weakTopics: string[]
  recommendedActions: string[]
  learningPath: { topic: string; priority: number; estimatedTime: number }[]
}

export interface LeaderboardEntry {
  userId: string
  name: string
  score: number
  testsCompleted: number
  averageScore: number
  rank: number
  badge?: string
}

export class AnalyticsService {
  // Global Platform Analytics
  static async getGlobalStats(): Promise<GlobalStats> {
    try {
      // Try cache first
      const cached = await AnalyticsCacheService.getGlobalStats()
      if (cached) {
        return cached
      }

      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

      // Parallel queries for better performance
      const [
        totalUsers,
        totalTests,
        totalQuestions,
        testsToday,
        testsThisWeek,
        testsThisMonth,
        recentAttempts,
        topicCounts,
        topPerformers,
        onlineUsers
      ] = await Promise.all([
        prisma.freeUser.count(),
        prisma.testAttempt.count(),
        prisma.question.count({ where: { isActive: true } }),
        prisma.testAttempt.count({
          where: { startedAt: { gte: today } }
        }),
        prisma.testAttempt.count({
          where: { startedAt: { gte: weekAgo } }
        }),
        prisma.testAttempt.count({
          where: { startedAt: { gte: monthAgo } }
        }),
        prisma.testAttempt.findMany({
          where: { startedAt: { gte: monthAgo } },
          select: { percentage: true, timeSpent: true }
        }),
        prisma.testAttempt.groupBy({
          by: ['topicWiseScore'],
          _count: true,
          where: { startedAt: { gte: monthAgo } }
        }),
        prisma.freeUser.findMany({
          orderBy: { averageScore: 'desc' },
          take: 10,
          select: { id: true, name: true, averageScore: true }
        }),
        AnalyticsCacheService.getOnlineUsersCount()
      ])

      // Calculate averages
      const averageTestScore = recentAttempts.length > 0
        ? recentAttempts.reduce((sum, test) => sum + test.percentage, 0) / recentAttempts.length
        : 0

      const averageTestTime = recentAttempts.length > 0
        ? recentAttempts.reduce((sum, test) => sum + test.timeSpent, 0) / recentAttempts.length
        : 0

      // Process topic popularity
      const topicPopularity: Record<string, number> = {}
      topicCounts.forEach(group => {
        if (group.topicWiseScore) {
          const topics = group.topicWiseScore as Record<string, number>
          Object.keys(topics).forEach(topic => {
            topicPopularity[topic] = (topicPopularity[topic] || 0) + group._count
          })
        }
      })

      const mostPopularTopics = Object.entries(topicPopularity)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10)
        .map(([topic, count]) => ({ topic, count }))

      const stats: GlobalStats = {
        totalUsers,
        totalTests,
        totalQuestions,
        testsToday,
        testsThisWeek,
        testsThisMonth,
        averageTestScore,
        averageTestTime,
        mostPopularTopics,
        activeUsers: onlineUsers,
        topPerformers: topPerformers.map(user => ({
          userId: user.id,
          name: user.name || 'Anonymous',
          score: user.averageScore || 0
        }))
      }

      // Cache the results
      await AnalyticsCacheService.cacheGlobalStats(stats)

      return stats
    } catch (error) {
      console.error('Failed to fetch global stats:', error)
      return {
        totalUsers: 0,
        totalTests: 0,
        totalQuestions: 0,
        testsToday: 0,
        testsThisWeek: 0,
        testsThisMonth: 0,
        averageTestScore: 0,
        averageTestTime: 0,
        mostPopularTopics: [],
        activeUsers: 0,
        topPerformers: []
      }
    }
  }

  // Topic-specific Analytics
  static async getTopicAnalytics(topic: string): Promise<TopicAnalytics | null> {
    try {
      const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)

      // Get test attempts for this topic
      const attempts = await prisma.testAttempt.findMany({
        where: {
          startedAt: { gte: monthAgo },
          topicWiseScore: { path: [topic], not: Prisma.AnyNull }
        },
        select: {
          topicWiseScore: true,
          timeSpent: true,
          startedAt: true,
          difficulty: true
        }
      })

      if (attempts.length === 0) {
        return null
      }

      // Calculate metrics
      const topicScores = attempts
        .map(attempt => {
          const scores = attempt.topicWiseScore as Record<string, number>
          return scores[topic] || 0
        })
        .filter(score => score > 0)

      const averageScore = topicScores.reduce((sum, score) => sum + score, 0) / topicScores.length
      const averageTime = attempts.reduce((sum, attempt) => sum + attempt.timeSpent, 0) / attempts.length

      // Difficulty distribution
      const difficultyDistribution: Record<string, number> = {}
      attempts.forEach(attempt => {
        const difficulty = attempt.difficulty
        difficultyDistribution[difficulty] = (difficultyDistribution[difficulty] || 0) + 1
      })

      // Get popular questions for this topic
      const popularQuestions = await prisma.question.findMany({
        where: {
          topic,
          isActive: true
        },
        orderBy: { totalAttempts: 'desc' },
        take: 5,
        select: { id: true, question: true, totalAttempts: true }
      })

      // Improvement trend (last 30 days)
      const dailyScores: Record<string, number[]> = {}
      attempts.forEach(attempt => {
        const date = attempt.startedAt.toISOString().split('T')[0]
        const scores = attempt.topicWiseScore as Record<string, number>
        const score = scores[topic]

        if (score) {
          if (!dailyScores[date]) {
            dailyScores[date] = []
          }
          dailyScores[date].push(score)
        }
      })

      const improvementTrend = Object.entries(dailyScores)
        .map(([date, scores]) => ({
          date,
          averageScore: scores.reduce((sum, score) => sum + score, 0) / scores.length
        }))
        .sort((a, b) => a.date.localeCompare(b.date))

      return {
        topic,
        totalAttempts: attempts.length,
        averageScore,
        averageTime,
        difficultyDistribution,
        popularQuestions: popularQuestions.map(q => ({
          id: q.id,
          title: q.question.substring(0, 50) + '...',
          attempts: q.totalAttempts
        })),
        improvementTrend
      }
    } catch (error) {
      console.error('Failed to fetch topic analytics:', error)
      return null
    }
  }

  // User Performance Analytics
  static async getUserPerformanceAnalytics(
    userId: string,
    isFreeUser: boolean = true
  ): Promise<UserPerformanceAnalytics | null> {
    try {
      const whereClause = isFreeUser ? { freeUserId: userId } : { userId }
      const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)

      // Get user's test attempts
      const testAttempts = await prisma.testAttempt.findMany({
        where: {
          ...whereClause,
          startedAt: { gte: monthAgo }
        },
        orderBy: { startedAt: 'desc' }
      })

      if (testAttempts.length === 0) {
        return null
      }

      // Calculate basic metrics
      const totalTests = testAttempts.length
      const averageScore = testAttempts.reduce((sum, test) => sum + test.percentage, 0) / totalTests
      const bestScore = Math.max(...testAttempts.map(test => test.percentage))
      const totalStudyTime = testAttempts.reduce((sum, test) => sum + test.timeSpent, 0) / 60 // Convert to minutes

      // Calculate consistency score (lower standard deviation = higher consistency)
      const scores = testAttempts.map(test => test.percentage)
      const variance = scores.reduce((sum, score) => sum + Math.pow(score - averageScore, 2), 0) / scores.length
      const standardDeviation = Math.sqrt(variance)
      const consistencyScore = Math.max(0, 100 - standardDeviation) // Inverse of standard deviation

      // Calculate improvement rate (comparing first half vs second half of attempts)
      let improvementRate = 0
      if (totalTests >= 4) {
        const midPoint = Math.floor(totalTests / 2)
        const earlierTests = testAttempts.slice(midPoint)
        const recentTests = testAttempts.slice(0, midPoint)

        const earlierAvg = earlierTests.reduce((sum, test) => sum + test.percentage, 0) / earlierTests.length
        const recentAvg = recentTests.reduce((sum, test) => sum + test.percentage, 0) / recentTests.length

        improvementRate = recentAvg - earlierAvg
      }

      // Analyze topic performance
      const topicPerformance: Record<string, { scores: number[]; totalTime: number }> = {}

      testAttempts.forEach(attempt => {
        if (attempt.topicWiseScore) {
          const scores = attempt.topicWiseScore as Record<string, number>
          Object.entries(scores).forEach(([topic, score]) => {
            if (!topicPerformance[topic]) {
              topicPerformance[topic] = { scores: [], totalTime: 0 }
            }
            topicPerformance[topic].scores.push(score)
            topicPerformance[topic].totalTime += attempt.timeSpent
          })
        }
      })

      // Identify strong and weak topics
      const topicAverages = Object.entries(topicPerformance).map(([topic, data]) => ({
        topic,
        average: data.scores.reduce((sum, score) => sum + score, 0) / data.scores.length,
        attempts: data.scores.length
      }))

      const strongTopics = topicAverages
        .filter(t => t.average >= 80 && t.attempts >= 2)
        .sort((a, b) => b.average - a.average)
        .slice(0, 3)
        .map(t => t.topic)

      const weakTopics = topicAverages
        .filter(t => t.average < 60 && t.attempts >= 2)
        .sort((a, b) => a.average - b.average)
        .slice(0, 3)
        .map(t => t.topic)

      // Generate recommended actions
      const recommendedActions: string[] = []

      if (averageScore < 60) {
        recommendedActions.push('Focus on fundamental concepts before attempting advanced questions')
      }

      if (consistencyScore < 70) {
        recommendedActions.push('Practice regularly to improve consistency in performance')
      }

      if (improvementRate < 0) {
        recommendedActions.push('Review previous mistakes and focus on weak areas')
      }

      if (weakTopics.length > 0) {
        recommendedActions.push(`Dedicate extra time to improving ${weakTopics[0]}`)
      }

      if (strongTopics.length > 0) {
        recommendedActions.push(`Build on your strength in ${strongTopics[0]} with advanced questions`)
      }

      // Generate learning path
      const learningPath = topicAverages
        .filter(t => t.average < 80)
        .sort((a, b) => {
          // Prioritize topics with more attempts but lower scores
          const aPriority = (1 / (a.average + 1)) * a.attempts
          const bPriority = (1 / (b.average + 1)) * b.attempts
          return bPriority - aPriority
        })
        .slice(0, 5)
        .map((t, index) => ({
          topic: t.topic,
          priority: index + 1,
          estimatedTime: Math.max(30, Math.round((100 - t.average) * 2)) // 30-200 minutes based on performance gap
        }))

      return {
        userId,
        totalTests,
        averageScore,
        bestScore,
        totalStudyTime,
        consistencyScore,
        improvementRate,
        strongTopics,
        weakTopics,
        recommendedActions,
        learningPath
      }
    } catch (error) {
      console.error('Failed to fetch user performance analytics:', error)
      return null
    }
  }

  // Leaderboard Management
  static async getLeaderboard(
    type: 'overall' | 'weekly' | 'monthly' = 'overall',
    limit: number = 50
  ): Promise<LeaderboardEntry[]> {
    try {
      // Try cache first
      const cached = await AnalyticsCacheService.getLeaderboard(type, limit)
      if (cached.length > 0) {
        return cached
      }

      let dateFilter: Date | undefined

      switch (type) {
        case 'weekly':
          dateFilter = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          break
        case 'monthly':
          dateFilter = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
          break
      }

      const whereClause = dateFilter ? {
        testAttempts: {
          some: {
            startedAt: { gte: dateFilter }
          }
        }
      } : {}

      const users = await prisma.freeUser.findMany({
        where: whereClause,
        include: {
          testAttempts: {
            where: dateFilter ? { startedAt: { gte: dateFilter } } : {},
            select: { percentage: true, startedAt: true }
          }
        },
        orderBy: { averageScore: 'desc' },
        take: limit
      })

      const leaderboard: LeaderboardEntry[] = users
        .filter(user => user.testAttempts.length > 0)
        .map((user, index) => {
          const scores = user.testAttempts.map(attempt => attempt.percentage)
          const averageScore = scores.reduce((sum, score) => sum + score, 0) / scores.length

          // Assign badges based on performance
          let badge: string | undefined
          if (index === 0) badge = 'gold'
          else if (index === 1) badge = 'silver'
          else if (index === 2) badge = 'bronze'
          else if (averageScore >= 90) badge = 'expert'
          else if (averageScore >= 80) badge = 'advanced'

          return {
            userId: user.id,
            name: user.name || 'Anonymous',
            score: Math.round(averageScore),
            testsCompleted: user.testAttempts.length,
            averageScore: Math.round(averageScore),
            rank: index + 1,
            badge
          }
        })

      // Cache the results
      await AnalyticsCacheService.cacheLeaderboard(type, leaderboard)

      return leaderboard
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error)
      return []
    }
  }

  // Performance Tracking
  static async trackUserActivity(
    userId: string,
    activity: {
      type: 'test_start' | 'test_complete' | 'question_answer' | 'login' | 'logout'
      metadata?: Record<string, any>
    }
  ): Promise<void> {
    try {
      // Add to online users if login
      if (activity.type === 'login') {
        await AnalyticsCacheService.addOnlineUser(userId)
      } else if (activity.type === 'logout') {
        await AnalyticsCacheService.removeOnlineUser(userId)
      }

      // Track in analytics events
      await prisma.analyticsEvent.create({
        data: {
          userId: null, // This might be a regular user ID
          eventType: 'user_activity',
          eventName: activity.type,
          properties: activity.metadata ? JSON.stringify(activity.metadata) : null,
          createdAt: new Date()
        }
      })
    } catch (error) {
      console.error('Failed to track user activity:', error)
    }
  }

  // Question Performance Analytics
  static async getQuestionAnalytics(
    questionId?: string,
    topic?: string,
    timeRange: number = 30 // days
  ): Promise<{
    totalAttempts: number
    accuracy: number
    averageTime: number
    difficultyDistribution: Record<string, number>
    topMistakes: { questionId: string; errorRate: number; question: string }[]
  }> {
    try {
      const dateFilter = new Date(Date.now() - timeRange * 24 * 60 * 60 * 1000)

      const where: Prisma.UserQuestionResponseWhereInput = {
        answeredAt: { gte: dateFilter }
      }

      if (questionId) {
        where.questionId = questionId
      } else if (topic) {
        where.question = { topic }
      }

      const responses = await prisma.userQuestionResponse.findMany({
        where,
        include: { question: true }
      })

      const totalAttempts = responses.length
      const correctResponses = responses.filter(r => r.isCorrect).length
      const accuracy = totalAttempts > 0 ? (correctResponses / totalAttempts) * 100 : 0

      const totalTime = responses.reduce((sum, r) => sum + (r.timeSpent || 0), 0)
      const averageTime = totalAttempts > 0 ? totalTime / totalAttempts : 0

      // Difficulty distribution
      const difficultyDistribution: Record<string, number> = {}
      responses.forEach(response => {
        const difficulty = response.question.difficulty
        difficultyDistribution[difficulty] = (difficultyDistribution[difficulty] || 0) + 1
      })

      // Top mistakes (questions with highest error rate)
      const questionErrors: Record<string, { total: number; errors: number; question: string }> = {}

      responses.forEach(response => {
        const qId = response.questionId
        if (!questionErrors[qId]) {
          questionErrors[qId] = {
            total: 0,
            errors: 0,
            question: response.question.question
          }
        }
        questionErrors[qId].total++
        if (!response.isCorrect) {
          questionErrors[qId].errors++
        }
      })

      const topMistakes = Object.entries(questionErrors)
        .filter(([_, data]) => data.total >= 5) // Minimum 5 attempts
        .map(([qId, data]) => ({
          questionId: qId,
          errorRate: (data.errors / data.total) * 100,
          question: data.question.substring(0, 100) + '...'
        }))
        .sort((a, b) => b.errorRate - a.errorRate)
        .slice(0, 10)

      return {
        totalAttempts,
        accuracy,
        averageTime,
        difficultyDistribution,
        topMistakes
      }
    } catch (error) {
      console.error('Failed to fetch question analytics:', error)
      return {
        totalAttempts: 0,
        accuracy: 0,
        averageTime: 0,
        difficultyDistribution: {},
        topMistakes: []
      }
    }
  }

  // Test Performance Analytics
  static async getTestAnalytics(
    testTemplateId?: string,
    timeRange: number = 30
  ): Promise<{
    totalAttempts: number
    completionRate: number
    averageScore: number
    averageTime: number
    passRate: number
    difficultyEffectiveness: Record<string, { attempts: number; averageScore: number }>
  }> {
    try {
      const dateFilter = new Date(Date.now() - timeRange * 24 * 60 * 60 * 1000)

      const where: Prisma.TestAttemptWhereInput = {
        startedAt: { gte: dateFilter }
      }

      if (testTemplateId) {
        where.testTemplateId = testTemplateId
      }

      const [attempts, sessions] = await Promise.all([
        prisma.testAttempt.findMany({
          where,
          include: { testTemplate: true }
        }),
        prisma.testSession.findMany({
          where: {
            testTemplateId: testTemplateId || undefined,
            createdAt: { gte: dateFilter }
          }
        })
      ])

      const totalAttempts = attempts.length
      const completedAttempts = attempts.filter(a => a.status === 'COMPLETED').length
      const completionRate = totalAttempts > 0 ? (completedAttempts / totalAttempts) * 100 : 0

      const completedTests = attempts.filter(a => a.status === 'COMPLETED')
      const averageScore = completedTests.length > 0
        ? completedTests.reduce((sum, test) => sum + test.percentage, 0) / completedTests.length
        : 0

      const averageTime = completedTests.length > 0
        ? completedTests.reduce((sum, test) => sum + test.timeSpent, 0) / completedTests.length
        : 0

      // Pass rate (assuming 60% is passing)
      const passedTests = completedTests.filter(test => test.percentage >= 60).length
      const passRate = completedTests.length > 0 ? (passedTests / completedTests.length) * 100 : 0

      // Difficulty effectiveness
      const difficultyEffectiveness: Record<string, { attempts: number; averageScore: number }> = {}

      completedTests.forEach(test => {
        const difficulty = test.difficulty
        if (!difficultyEffectiveness[difficulty]) {
          difficultyEffectiveness[difficulty] = { attempts: 0, averageScore: 0 }
        }
        difficultyEffectiveness[difficulty].attempts++
        difficultyEffectiveness[difficulty].averageScore += test.percentage
      })

      // Calculate averages for each difficulty
      Object.keys(difficultyEffectiveness).forEach(difficulty => {
        const data = difficultyEffectiveness[difficulty]
        data.averageScore = data.averageScore / data.attempts
      })

      return {
        totalAttempts,
        completionRate,
        averageScore,
        averageTime,
        passRate,
        difficultyEffectiveness
      }
    } catch (error) {
      console.error('Failed to fetch test analytics:', error)
      return {
        totalAttempts: 0,
        completionRate: 0,
        averageScore: 0,
        averageTime: 0,
        passRate: 0,
        difficultyEffectiveness: {}
      }
    }
  }

  // Cleanup and Maintenance
  static async cleanupOldAnalytics(daysToKeep: number = 90): Promise<number> {
    try {
      const cutoffDate = new Date(Date.now() - daysToKeep * 24 * 60 * 60 * 1000)

      const result = await prisma.analyticsEvent.deleteMany({
        where: {
          createdAt: { lt: cutoffDate }
        }
      })

      console.log(`Cleaned up ${result.count} old analytics events`)
      return result.count
    } catch (error) {
      console.error('Failed to cleanup old analytics:', error)
      return 0
    }
  }

  // Real-time Dashboard Data
  static async getDashboardData(): Promise<{
    onlineUsers: number
    activeTests: number
    testsCompletedToday: number
    averageScoreToday: number
    recentActivity: { type: string; count: number; trend: 'up' | 'down' | 'stable' }[]
  }> {
    try {
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000)

      const [
        onlineUsers,
        activeTests,
        todayTests,
        yesterdayTests,
        todayScores
      ] = await Promise.all([
        AnalyticsCacheService.getOnlineUsersCount(),
        AnalyticsCacheService.getActiveTestsCount(),
        prisma.testAttempt.findMany({
          where: {
            startedAt: { gte: today },
            status: 'COMPLETED'
          },
          select: { percentage: true }
        }),
        prisma.testAttempt.count({
          where: {
            startedAt: { gte: yesterday, lt: today },
            status: 'COMPLETED'
          }
        }),
        prisma.testAttempt.findMany({
          where: {
            startedAt: { gte: today },
            status: 'COMPLETED'
          },
          select: { percentage: true }
        })
      ])

      const testsCompletedToday = todayTests.length
      const averageScoreToday = todayTests.length > 0
        ? todayTests.reduce((sum, test) => sum + test.percentage, 0) / todayTests.length
        : 0

      // Calculate trends
      const testTrend = testsCompletedToday > yesterdayTests ? 'up' :
                      testsCompletedToday < yesterdayTests ? 'down' : 'stable'

      const recentActivity = [
        { type: 'Tests Completed', count: testsCompletedToday, trend: testTrend as any },
        { type: 'Online Users', count: onlineUsers, trend: 'stable' as any },
        { type: 'Active Tests', count: activeTests, trend: 'stable' as any }
      ]

      return {
        onlineUsers,
        activeTests,
        testsCompletedToday,
        averageScoreToday,
        recentActivity
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
      return {
        onlineUsers: 0,
        activeTests: 0,
        testsCompletedToday: 0,
        averageScoreToday: 0,
        recentActivity: []
      }
    }
  }
}

export default AnalyticsService