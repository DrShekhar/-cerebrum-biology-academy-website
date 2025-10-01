import { prisma as db } from '@/lib/database'
import type { Leaderboard, LeaderboardEntry } from '@/lib/types/analytics'

export class LeaderboardService {
  /**
   * Get global leaderboard
   */
  async getGlobalLeaderboard(
    period: 'daily' | 'weekly' | 'monthly' | 'allTime' = 'weekly',
    limit: number = 50
  ): Promise<Leaderboard> {
    const timeRange = this.getTimeRange(period)

    const testAttempts = await db.testAttempt.findMany({
      where: {
        status: 'COMPLETED',
        ...(timeRange && {
          submittedAt: {
            gte: timeRange.start,
            lte: timeRange.end
          }
        })
      },
      include: {
        freeUser: true
      }
    })

    // Group by user and calculate metrics
    const userStats: Record<string, {
      userId: string
      name: string
      totalScore: number
      testsCompleted: number
      totalTime: number
      bestScore: number
    }> = {}

    testAttempts.forEach(attempt => {
      const userId = attempt.freeUserId
      if (!userStats[userId]) {
        userStats[userId] = {
          userId,
          name: attempt.freeUser.name || 'Anonymous',
          totalScore: 0,
          testsCompleted: 0,
          totalTime: 0,
          bestScore: 0
        }
      }

      userStats[userId].totalScore += attempt.percentage
      userStats[userId].testsCompleted++
      userStats[userId].totalTime += attempt.timeSpent
      userStats[userId].bestScore = Math.max(userStats[userId].bestScore, attempt.percentage)
    })

    // Calculate leaderboard entries
    const entries: LeaderboardEntry[] = Object.values(userStats)
      .filter(user => user.testsCompleted > 0)
      .map(user => {
        const averageScore = user.totalScore / user.testsCompleted
        const averageTime = user.totalTime / user.testsCompleted

        return {
          rank: 0, // Will be set after sorting
          userId: user.userId,
          name: user.name,
          score: Math.round(averageScore * 100) / 100,
          testsCompleted: user.testsCompleted,
          averageTime: Math.round(averageTime),
          badgeCount: 0, // TODO: Calculate from achievements
          streakDays: 0, // TODO: Calculate streak
          change: 0 // TODO: Calculate from previous period
        }
      })
      .sort((a, b) => {
        // Primary sort: average score
        if (b.score !== a.score) return b.score - a.score
        // Secondary sort: tests completed
        if (b.testsCompleted !== a.testsCompleted) return b.testsCompleted - a.testsCompleted
        // Tertiary sort: average time (less is better)
        return a.averageTime - b.averageTime
      })
      .slice(0, limit)

    // Assign ranks
    entries.forEach((entry, index) => {
      entry.rank = index + 1
    })

    return {
      type: 'global',
      period,
      entries,
      totalParticipants: Object.keys(userStats).length
    }
  }

  /**
   * Get grade-specific leaderboard
   */
  async getGradeLeaderboard(
    grade: string,
    period: 'daily' | 'weekly' | 'monthly' | 'allTime' = 'weekly',
    limit: number = 50
  ): Promise<Leaderboard> {
    const timeRange = this.getTimeRange(period)

    const testAttempts = await db.testAttempt.findMany({
      where: {
        status: 'COMPLETED',
        freeUser: {
          grade
        },
        ...(timeRange && {
          submittedAt: {
            gte: timeRange.start,
            lte: timeRange.end
          }
        })
      },
      include: {
        freeUser: true
      }
    })

    return this.processLeaderboardData(testAttempts, 'grade', period, limit)
  }

  /**
   * Get subject-specific leaderboard
   */
  async getSubjectLeaderboard(
    subject: string,
    period: 'daily' | 'weekly' | 'monthly' | 'allTime' = 'weekly',
    limit: number = 50
  ): Promise<Leaderboard> {
    const timeRange = this.getTimeRange(period)

    const testAttempts = await db.testAttempt.findMany({
      where: {
        status: 'COMPLETED',
        ...(timeRange && {
          submittedAt: {
            gte: timeRange.start,
            lte: timeRange.end
          }
        })
      },
      include: {
        freeUser: true,
        testQuestions: {
          include: {
            question: {
              where: {
                subject
              }
            }
          }
        }
      }
    })

    // Filter attempts that have questions from the specified subject
    const filteredAttempts = testAttempts.filter(attempt =>
      attempt.testQuestions.some(tq => tq.question?.subject === subject)
    )

    return this.processLeaderboardData(filteredAttempts, 'subject', period, limit)
  }

  /**
   * Get topic-specific leaderboard
   */
  async getTopicLeaderboard(
    topic: string,
    period: 'daily' | 'weekly' | 'monthly' | 'allTime' = 'weekly',
    limit: number = 50
  ): Promise<Leaderboard> {
    const timeRange = this.getTimeRange(period)

    const testAttempts = await db.testAttempt.findMany({
      where: {
        status: 'COMPLETED',
        topics: {
          path: '$',
          array_contains: topic
        },
        ...(timeRange && {
          submittedAt: {
            gte: timeRange.start,
            lte: timeRange.end
          }
        })
      },
      include: {
        freeUser: true,
        testQuestions: {
          include: {
            question: {
              where: {
                topic
              }
            }
          }
        }
      }
    })

    return this.processLeaderboardData(testAttempts, 'topic', period, limit)
  }

  /**
   * Get user's position in leaderboard
   */
  async getUserPosition(
    userId: string,
    type: 'global' | 'grade' | 'subject' | 'topic',
    period: 'daily' | 'weekly' | 'monthly' | 'allTime' = 'weekly',
    filter?: string
  ): Promise<LeaderboardEntry | null> {
    let leaderboard: Leaderboard

    switch (type) {
      case 'global':
        leaderboard = await this.getGlobalLeaderboard(period, 1000)
        break
      case 'grade':
        if (!filter) throw new Error('Grade filter required for grade leaderboard')
        leaderboard = await this.getGradeLeaderboard(filter, period, 1000)
        break
      case 'subject':
        if (!filter) throw new Error('Subject filter required for subject leaderboard')
        leaderboard = await this.getSubjectLeaderboard(filter, period, 1000)
        break
      case 'topic':
        if (!filter) throw new Error('Topic filter required for topic leaderboard')
        leaderboard = await this.getTopicLeaderboard(filter, period, 1000)
        break
      default:
        throw new Error('Invalid leaderboard type')
    }

    return leaderboard.entries.find(entry => entry.userId === userId) || null
  }

  /**
   * Get weekly progress comparison
   */
  async getWeeklyProgress(userId: string): Promise<{
    currentWeek: LeaderboardEntry | null
    previousWeek: LeaderboardEntry | null
    improvement: number
  }> {
    const currentWeek = await this.getUserPosition(userId, 'global', 'weekly')

    // Get previous week data
    const lastWeek = new Date()
    lastWeek.setDate(lastWeek.getDate() - 7)

    const previousWeekAttempts = await db.testAttempt.findMany({
      where: {
        freeUserId: userId,
        status: 'COMPLETED',
        submittedAt: {
          gte: new Date(lastWeek.getTime() - 7 * 24 * 60 * 60 * 1000),
          lt: lastWeek
        }
      }
    })

    let previousWeek: LeaderboardEntry | null = null
    if (previousWeekAttempts.length > 0) {
      const totalScore = previousWeekAttempts.reduce((sum, attempt) => sum + attempt.percentage, 0)
      const averageScore = totalScore / previousWeekAttempts.length
      const totalTime = previousWeekAttempts.reduce((sum, attempt) => sum + attempt.timeSpent, 0)

      previousWeek = {
        rank: 0,
        userId,
        name: '',
        score: averageScore,
        testsCompleted: previousWeekAttempts.length,
        averageTime: totalTime / previousWeekAttempts.length,
        badgeCount: 0,
        streakDays: 0,
        change: 0
      }
    }

    const improvement = currentWeek && previousWeek
      ? currentWeek.score - previousWeek.score
      : 0

    return {
      currentWeek,
      previousWeek,
      improvement
    }
  }

  /**
   * Process leaderboard data
   */
  private processLeaderboardData(
    testAttempts: any[],
    type: Leaderboard['type'],
    period: Leaderboard['period'],
    limit: number
  ): Leaderboard {
    const userStats: Record<string, {
      userId: string
      name: string
      totalScore: number
      testsCompleted: number
      totalTime: number
      bestScore: number
    }> = {}

    testAttempts.forEach(attempt => {
      const userId = attempt.freeUserId
      if (!userStats[userId]) {
        userStats[userId] = {
          userId,
          name: attempt.freeUser.name || 'Anonymous',
          totalScore: 0,
          testsCompleted: 0,
          totalTime: 0,
          bestScore: 0
        }
      }

      userStats[userId].totalScore += attempt.percentage
      userStats[userId].testsCompleted++
      userStats[userId].totalTime += attempt.timeSpent
      userStats[userId].bestScore = Math.max(userStats[userId].bestScore, attempt.percentage)
    })

    const entries: LeaderboardEntry[] = Object.values(userStats)
      .filter(user => user.testsCompleted > 0)
      .map(user => {
        const averageScore = user.totalScore / user.testsCompleted
        const averageTime = user.totalTime / user.testsCompleted

        return {
          rank: 0,
          userId: user.userId,
          name: user.name,
          score: Math.round(averageScore * 100) / 100,
          testsCompleted: user.testsCompleted,
          averageTime: Math.round(averageTime),
          badgeCount: 0,
          streakDays: 0,
          change: 0
        }
      })
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score
        if (b.testsCompleted !== a.testsCompleted) return b.testsCompleted - a.testsCompleted
        return a.averageTime - b.averageTime
      })
      .slice(0, limit)

    entries.forEach((entry, index) => {
      entry.rank = index + 1
    })

    return {
      type,
      period,
      entries,
      totalParticipants: Object.keys(userStats).length
    }
  }

  /**
   * Get time range for period
   */
  private getTimeRange(period: 'daily' | 'weekly' | 'monthly' | 'allTime') {
    const now = new Date()

    switch (period) {
      case 'daily':
        const startOfDay = new Date(now)
        startOfDay.setHours(0, 0, 0, 0)
        return {
          start: startOfDay,
          end: now
        }

      case 'weekly':
        const startOfWeek = new Date(now)
        startOfWeek.setDate(now.getDate() - now.getDay())
        startOfWeek.setHours(0, 0, 0, 0)
        return {
          start: startOfWeek,
          end: now
        }

      case 'monthly':
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
        return {
          start: startOfMonth,
          end: now
        }

      case 'allTime':
        return null

      default:
        return null
    }
  }

  /**
   * Get achievements for user
   */
  async getUserAchievements(userId: string): Promise<number> {
    const achievements = await db.achievement.count({
      where: {
        freeUserId: userId,
        isCompleted: true
      }
    })

    return achievements
  }

  /**
   * Calculate user streak
   */
  async getUserStreak(userId: string): Promise<number> {
    const user = await db.freeUser.findUnique({
      where: { id: userId },
      select: { studyStreak: true }
    })

    return user?.studyStreak || 0
  }

  /**
   * Update leaderboard with achievements and streaks
   */
  async enrichLeaderboard(leaderboard: Leaderboard): Promise<Leaderboard> {
    const enrichedEntries = await Promise.all(
      leaderboard.entries.map(async (entry) => {
        const [badgeCount, streakDays] = await Promise.all([
          this.getUserAchievements(entry.userId),
          this.getUserStreak(entry.userId)
        ])

        return {
          ...entry,
          badgeCount,
          streakDays
        }
      })
    )

    return {
      ...leaderboard,
      entries: enrichedEntries
    }
  }
}

export const leaderboardService = new LeaderboardService()