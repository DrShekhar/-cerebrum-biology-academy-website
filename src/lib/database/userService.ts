import { prisma, DatabaseUtils } from './connection'
import { UserCacheService } from '../cache/redis'
import type { User, FreeUser, UserProgress, PerformanceReport, Prisma } from '@/generated/prisma'

export interface CreateFreeUserInput {
  email: string
  name?: string
  grade?: string
  curriculum?: string
  school?: string
  city?: string
  preferences?: Record<string, any>
}

export interface UpdateUserProgressInput {
  userId?: string
  freeUserId?: string
  topic: string
  curriculum: string
  grade: string
  totalQuestions: number
  correctAnswers: number
  averageTime?: number
  improvementRate?: number
}

export interface UserPerformanceMetrics {
  averageScore: number
  totalTestsTaken: number
  bestScore: number
  weakestTopics: string[]
  strongestTopics: string[]
  overallProgress: number
  recentImprovement: number
}

export class UserService {
  // Free User Management
  static async createFreeUser(data: CreateFreeUserInput): Promise<FreeUser> {
    try {
      const user = await prisma.freeUser.create({
        data: {
          ...data,
          registrationDate: new Date(),
          preferences: data.preferences ? JSON.stringify(data.preferences) : null,
        },
      })

      // Initialize user progress for common topics
      await this.initializeUserProgress(
        user.id,
        user.curriculum || 'NEET',
        user.grade || 'CLASS_12'
      )

      return user
    } catch (error) {
      console.error('Failed to create free user:', error)
      throw new Error('Failed to create user account')
    }
  }

  static async getFreeUserById(id: string): Promise<FreeUser | null> {
    try {
      // Try cache first
      const cached = await UserCacheService.getUserSession(id)
      if (cached?.user) {
        return cached.user
      }

      // OPTIMIZED: Single query with all related data to prevent N+1
      const user = await prisma.freeUser.findUnique({
        where: { id },
        include: {
          testAttempts: {
            orderBy: { startedAt: 'desc' },
            take: 5,
            // Select only necessary fields to reduce data transfer
            select: {
              id: true,
              title: true,
              percentage: true,
              score: true,
              totalMarks: true,
              timeSpent: true,
              startedAt: true,
              submittedAt: true,
              difficulty: true,
              status: true,
            },
          },
          userProgress: {
            orderBy: { lastPracticed: 'desc' },
            // Select only necessary fields
            select: {
              id: true,
              topic: true,
              subtopic: true,
              accuracy: true,
              masteryScore: true,
              currentLevel: true,
              totalQuestions: true,
              correctAnswers: true,
              lastPracticed: true,
            },
          },
          achievements: {
            where: { isCompleted: true },
            orderBy: { earnedAt: 'desc' },
            // Select only necessary fields
            select: {
              id: true,
              type: true,
              title: true,
              description: true,
              icon: true,
              points: true,
              earnedAt: true,
            },
          },
        },
      })

      if (user) {
        // Cache user data
        await UserCacheService.cacheUserSession(id, { user })
      }

      return user
    } catch (error) {
      console.error('Failed to fetch free user:', error)
      return null
    }
  }

  static async getFreeUserByEmail(email: string): Promise<FreeUser | null> {
    try {
      // OPTIMIZED: Single query with selective field loading
      return await prisma.freeUser.findUnique({
        where: { email },
        include: {
          userProgress: {
            // Select only necessary fields
            select: {
              id: true,
              topic: true,
              accuracy: true,
              masteryScore: true,
              currentLevel: true,
              lastPracticed: true,
            },
          },
          testAttempts: {
            orderBy: { startedAt: 'desc' },
            take: 3,
            // Select only necessary fields
            select: {
              id: true,
              title: true,
              percentage: true,
              score: true,
              startedAt: true,
              submittedAt: true,
            },
          },
        },
      })
    } catch (error) {
      console.error('Failed to fetch free user by email:', error)
      return null
    }
  }

  static async updateFreeUser(
    id: string,
    data: Partial<CreateFreeUserInput>
  ): Promise<FreeUser | null> {
    try {
      const user = await prisma.freeUser.update({
        where: { id },
        data: {
          ...data,
          preferences: data.preferences ? JSON.stringify(data.preferences) : undefined,
          updatedAt: new Date(),
        },
      })

      // Invalidate cache
      await UserCacheService.cacheUserSession(id, { user })

      return user
    } catch (error) {
      console.error('Failed to update free user:', error)
      return null
    }
  }

  // User Progress Management
  static async initializeUserProgress(
    userId: string,
    curriculum: string,
    grade: string
  ): Promise<void> {
    const defaultTopics = [
      'Cell Biology',
      'Molecular Biology',
      'Genetics',
      'Plant Physiology',
      'Human Physiology',
      'Ecology',
      'Evolution',
      'Biotechnology',
    ]

    const progressData = defaultTopics.map((topic) => ({
      freeUserId: userId,
      topic,
      curriculum,
      grade,
      totalQuestions: 0,
      correctAnswers: 0,
      accuracy: 0,
      currentLevel: 'EASY' as const,
      masteryScore: 0,
    }))

    try {
      await prisma.userProgress.createMany({
        data: progressData,
        skipDuplicates: true,
      })
    } catch (error) {
      console.error('Failed to initialize user progress:', error)
    }
  }

  static async updateUserProgress(data: UpdateUserProgressInput): Promise<UserProgress | null> {
    try {
      const accuracy =
        data.totalQuestions > 0 ? (data.correctAnswers / data.totalQuestions) * 100 : 0

      // Determine mastery level based on accuracy and total questions
      let masteryScore = accuracy
      if (data.totalQuestions >= 20) {
        masteryScore = accuracy * 0.8 + (Math.min(data.totalQuestions, 100) / 100) * 20
      }

      const currentLevel = accuracy >= 80 ? 'HARD' : accuracy >= 60 ? 'MEDIUM' : 'EASY'

      const progress = await prisma.userProgress.upsert({
        where: {
          userId_topic_curriculum_grade: data.userId
            ? {
                userId: data.userId,
                topic: data.topic,
                curriculum: data.curriculum,
                grade: data.grade,
              }
            : undefined,
          freeUserId_topic_curriculum_grade: data.freeUserId
            ? {
                freeUserId: data.freeUserId,
                topic: data.topic,
                curriculum: data.curriculum,
                grade: data.grade,
              }
            : undefined,
        },
        update: {
          totalQuestions: data.totalQuestions,
          correctAnswers: data.correctAnswers,
          accuracy,
          averageTime: data.averageTime,
          improvementRate: data.improvementRate || 0,
          currentLevel,
          masteryScore,
          lastPracticed: new Date(),
          updatedAt: new Date(),
        },
        create: {
          userId: data.userId,
          freeUserId: data.freeUserId,
          topic: data.topic,
          curriculum: data.curriculum,
          grade: data.grade,
          totalQuestions: data.totalQuestions,
          correctAnswers: data.correctAnswers,
          accuracy,
          averageTime: data.averageTime,
          improvementRate: data.improvementRate || 0,
          currentLevel,
          masteryScore,
          lastPracticed: new Date(),
        },
      })

      // Cache updated progress
      const userId = data.userId || data.freeUserId || ''
      await UserCacheService.cacheUserProgress(progress)

      return progress
    } catch (error) {
      console.error('Failed to update user progress:', error)
      return null
    }
  }

  static async getUserProgress(
    userId: string,
    isFreeUser: boolean = true
  ): Promise<UserProgress[]> {
    try {
      const whereClause = isFreeUser ? { freeUserId: userId } : { userId }

      return await prisma.userProgress.findMany({
        where: whereClause,
        orderBy: [{ masteryScore: 'desc' }, { lastPracticed: 'desc' }],
      })
    } catch (error) {
      console.error('Failed to fetch user progress:', error)
      return []
    }
  }

  static async getTopicProgress(
    userId: string,
    topic: string,
    isFreeUser: boolean = true
  ): Promise<UserProgress | null> {
    try {
      // Try cache first
      const cached = await UserCacheService.getUserProgress(userId, topic)
      if (cached) {
        return cached
      }

      const whereClause = isFreeUser ? { freeUserId: userId } : { userId }

      const progress = await prisma.userProgress.findFirst({
        where: {
          ...whereClause,
          topic,
        },
      })

      if (progress) {
        await UserCacheService.cacheUserProgress(progress)
      }

      return progress
    } catch (error) {
      console.error('Failed to fetch topic progress:', error)
      return null
    }
  }

  // Performance Analytics
  static async calculateUserPerformanceMetrics(
    userId: string,
    isFreeUser: boolean = true
  ): Promise<UserPerformanceMetrics> {
    try {
      // Try cache first
      const cached = await UserCacheService.getUserPerformance(userId)
      if (cached) {
        return cached
      }

      const whereClause = isFreeUser ? { freeUserId: userId } : { userId }

      // OPTIMIZED: Single query with selective fields to reduce data transfer
      const [testAttempts, userProgress] = await Promise.all([
        prisma.testAttempt.findMany({
          where: whereClause,
          orderBy: { startedAt: 'desc' },
          take: 50,
          // Select only fields needed for metrics calculation
          select: {
            id: true,
            percentage: true,
            startedAt: true,
            topicWiseScore: true,
          },
        }),
        prisma.userProgress.findMany({
          where: whereClause,
          orderBy: { masteryScore: 'desc' },
          // Select only fields needed for metrics
          select: {
            id: true,
            topic: true,
            masteryScore: true,
            accuracy: true,
          },
        }),
      ])

      // Calculate metrics
      const totalTests = testAttempts.length
      const averageScore =
        totalTests > 0
          ? testAttempts.reduce((sum, test) => sum + test.percentage, 0) / totalTests
          : 0

      const bestScore =
        totalTests > 0 ? Math.max(...testAttempts.map((test) => test.percentage)) : 0

      // Identify weak and strong topics
      const weakTopics = userProgress
        .filter((p) => p.masteryScore < 60)
        .sort((a, b) => a.masteryScore - b.masteryScore)
        .slice(0, 3)
        .map((p) => p.topic)

      const strongTopics = userProgress
        .filter((p) => p.masteryScore >= 80)
        .sort((a, b) => b.masteryScore - a.masteryScore)
        .slice(0, 3)
        .map((p) => p.topic)

      // Calculate overall progress
      const overallProgress =
        userProgress.length > 0
          ? userProgress.reduce((sum, p) => sum + p.masteryScore, 0) / userProgress.length
          : 0

      // Calculate recent improvement (last 10 vs previous 10 tests)
      let recentImprovement = 0
      if (totalTests >= 10) {
        const recentTests = testAttempts.slice(0, 10)
        const previousTests = testAttempts.slice(10, 20)

        if (previousTests.length > 0) {
          const recentAvg =
            recentTests.reduce((sum, t) => sum + t.percentage, 0) / recentTests.length
          const previousAvg =
            previousTests.reduce((sum, t) => sum + t.percentage, 0) / previousTests.length
          recentImprovement = recentAvg - previousAvg
        }
      }

      const metrics: UserPerformanceMetrics = {
        averageScore,
        totalTestsTaken: totalTests,
        bestScore,
        weakestTopics: weakTopics,
        strongestTopics: strongTopics,
        overallProgress,
        recentImprovement,
      }

      // Cache the metrics
      await UserCacheService.cacheUserPerformance(userId, metrics)

      return metrics
    } catch (error) {
      console.error('Failed to calculate performance metrics:', error)
      return {
        averageScore: 0,
        totalTestsTaken: 0,
        bestScore: 0,
        weakestTopics: [],
        strongestTopics: [],
        overallProgress: 0,
        recentImprovement: 0,
      }
    }
  }

  // Performance Reports
  static async generatePerformanceReport(
    userId: string,
    reportType: 'DAILY' | 'WEEKLY' | 'MONTHLY',
    isFreeUser: boolean = true
  ): Promise<PerformanceReport | null> {
    try {
      const now = new Date()
      let periodStart: Date
      let periodEnd: Date = now
      let reportPeriod: string

      // Calculate period based on report type
      switch (reportType) {
        case 'DAILY':
          periodStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
          reportPeriod = now.toISOString().split('T')[0] // YYYY-MM-DD
          break
        case 'WEEKLY':
          const weekStart = new Date(now)
          weekStart.setDate(now.getDate() - now.getDay()) // Start of week
          periodStart = weekStart
          reportPeriod = `${now.getFullYear()}-W${Math.ceil(now.getDate() / 7)}`
          break
        case 'MONTHLY':
          periodStart = new Date(now.getFullYear(), now.getMonth(), 1)
          reportPeriod = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
          break
        default:
          throw new Error('Invalid report type')
      }

      const whereClause = isFreeUser ? { freeUserId: userId } : { userId }

      // OPTIMIZED: Get test attempts with only necessary template fields
      const testAttempts = await prisma.testAttempt.findMany({
        where: {
          ...whereClause,
          startedAt: {
            gte: periodStart,
            lte: periodEnd,
          },
        },
        include: {
          testTemplate: {
            // Select only necessary fields from template
            select: {
              id: true,
              subject: true,
              title: true,
            },
          },
        },
      })

      // Calculate metrics
      const testsAttempted = testAttempts.length
      const averageScore =
        testsAttempted > 0
          ? testAttempts.reduce((sum, test) => sum + test.percentage, 0) / testsAttempted
          : null

      const totalStudyTime = testAttempts.reduce((sum, test) => sum + test.timeSpent, 0) / 60 // Convert to minutes

      // Calculate subject-wise scores
      const biologyTests = testAttempts.filter((t) => t.testTemplate?.subject === 'biology')
      const botanyTests = testAttempts.filter((t) => t.testTemplate?.subject === 'botany')
      const zoologyTests = testAttempts.filter((t) => t.testTemplate?.subject === 'zoology')

      const biologyScore =
        biologyTests.length > 0
          ? biologyTests.reduce((sum, t) => sum + t.percentage, 0) / biologyTests.length
          : null

      const botanyScore =
        botanyTests.length > 0
          ? botanyTests.reduce((sum, t) => sum + t.percentage, 0) / botanyTests.length
          : null

      const zoologyScore =
        zoologyTests.length > 0
          ? zoologyTests.reduce((sum, t) => sum + t.percentage, 0) / zoologyTests.length
          : null

      // Analyze topic performance
      const topicScores: Record<string, number[]> = {}
      testAttempts.forEach((attempt) => {
        if (attempt.topicWiseScore) {
          const scores = attempt.topicWiseScore as Record<string, number>
          Object.entries(scores).forEach(([topic, score]) => {
            if (!topicScores[topic]) {
              topicScores[topic] = []
            }
            topicScores[topic].push(score)
          })
        }
      })

      const strongTopics = Object.entries(topicScores)
        .filter(([_, scores]) => scores.length > 0)
        .map(([topic, scores]) => ({
          topic,
          average: scores.reduce((sum, score) => sum + score, 0) / scores.length,
        }))
        .filter((item) => item.average >= 80)
        .sort((a, b) => b.average - a.average)
        .slice(0, 3)
        .map((item) => item.topic)

      const weakTopics = Object.entries(topicScores)
        .filter(([_, scores]) => scores.length > 0)
        .map(([topic, scores]) => ({
          topic,
          average: scores.reduce((sum, score) => sum + score, 0) / scores.length,
        }))
        .filter((item) => item.average < 60)
        .sort((a, b) => a.average - b.average)
        .slice(0, 3)
        .map((item) => item.topic)

      // Create the report
      const report = await prisma.performanceReport.create({
        data: {
          userId: isFreeUser ? undefined : userId,
          freeUserId: isFreeUser ? userId : undefined,
          reportType,
          reportPeriod,
          testsAttempted,
          averageScore,
          totalStudyTime,
          biologyScore,
          botanyScore,
          zoologyScore,
          strongTopics: JSON.stringify(strongTopics),
          weakTopics: JSON.stringify(weakTopics),
          periodStart,
          periodEnd,
        },
      })

      return report
    } catch (error) {
      console.error('Failed to generate performance report:', error)
      return null
    }
  }

  // User Analytics and Insights
  static async getUserInsights(
    userId: string,
    isFreeUser: boolean = true
  ): Promise<{
    studyStreak: number
    weeklyProgress: number
    strongAreas: string[]
    improvementAreas: string[]
    recommendations: string[]
  }> {
    try {
      const whereClause = isFreeUser ? { freeUserId: userId } : { userId }

      // Get recent test attempts (last 30 days)
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

      const recentAttempts = await prisma.testAttempt.findMany({
        where: {
          ...whereClause,
          startedAt: {
            gte: thirtyDaysAgo,
          },
        },
        orderBy: { startedAt: 'desc' },
      })

      // Calculate study streak
      let studyStreak = 0
      const today = new Date()
      for (let i = 0; i < 30; i++) {
        const checkDate = new Date(today)
        checkDate.setDate(today.getDate() - i)

        const hasStudied = recentAttempts.some((attempt) => {
          const attemptDate = new Date(attempt.startedAt)
          return attemptDate.toDateString() === checkDate.toDateString()
        })

        if (hasStudied) {
          studyStreak++
        } else if (i === 0) {
          // If no study today, check yesterday
          continue
        } else {
          break
        }
      }

      // Calculate weekly progress
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)

      const thisWeekAttempts = recentAttempts.filter((a) => a.startedAt >= weekAgo)
      const weeklyProgress = thisWeekAttempts.length

      // Get user progress for insights
      const userProgress = await this.getUserProgress(userId, isFreeUser)

      const strongAreas = userProgress
        .filter((p) => p.masteryScore >= 80)
        .sort((a, b) => b.masteryScore - a.masteryScore)
        .slice(0, 3)
        .map((p) => p.topic)

      const improvementAreas = userProgress
        .filter((p) => p.masteryScore < 60)
        .sort((a, b) => a.masteryScore - b.masteryScore)
        .slice(0, 3)
        .map((p) => p.topic)

      // Generate recommendations
      const recommendations = []

      if (studyStreak === 0) {
        recommendations.push('Start your learning journey with a quick practice test')
      } else if (studyStreak < 7) {
        recommendations.push('Try to maintain a daily study streak for better retention')
      }

      if (improvementAreas.length > 0) {
        recommendations.push(
          `Focus on improving ${improvementAreas[0]} - practice with easier questions first`
        )
      }

      if (strongAreas.length > 0) {
        recommendations.push(`Great progress in ${strongAreas[0]}! Try advanced level questions`)
      }

      if (weeklyProgress < 3) {
        recommendations.push('Aim for at least 3 practice sessions per week')
      }

      return {
        studyStreak,
        weeklyProgress,
        strongAreas,
        improvementAreas,
        recommendations,
      }
    } catch (error) {
      console.error('Failed to get user insights:', error)
      return {
        studyStreak: 0,
        weeklyProgress: 0,
        strongAreas: [],
        improvementAreas: [],
        recommendations: ['Start with a practice test to assess your current level'],
      }
    }
  }

  // Bulk operations for admin use
  static async bulkUpdateUserLevels(): Promise<number> {
    try {
      const users = await prisma.freeUser.findMany({
        include: {
          userProgress: true,
          testAttempts: {
            orderBy: { startedAt: 'desc' },
            take: 10,
          },
        },
      })

      let updatedCount = 0

      for (const user of users) {
        if (user.testAttempts.length === 0) continue

        const averageScore =
          user.testAttempts.reduce((sum, test) => sum + test.percentage, 0) /
          user.testAttempts.length
        const totalTests = user.testAttempts.length
        const bestScore = Math.max(...user.testAttempts.map((test) => test.percentage))

        // Calculate new level based on performance
        let newLevel = 1
        if (averageScore >= 90 && totalTests >= 20) newLevel = 8
        else if (averageScore >= 80 && totalTests >= 15) newLevel = 6
        else if (averageScore >= 70 && totalTests >= 10) newLevel = 4
        else if (averageScore >= 60 && totalTests >= 5) newLevel = 3
        else if (totalTests >= 3) newLevel = 2

        if (user.currentLevel !== newLevel) {
          await prisma.freeUser.update({
            where: { id: user.id },
            data: {
              currentLevel: newLevel,
              averageScore,
              totalTestsTaken: totalTests,
              bestScore,
            },
          })
          updatedCount++
        }
      }

      return updatedCount
    } catch (error) {
      console.error('Failed to bulk update user levels:', error)
      return 0
    }
  }
}

export default UserService
