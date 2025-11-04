import { prisma } from '@/lib/prisma'

/**
 * Rank and Percentile Calculation Utilities
 * Provides functions to calculate user rankings, percentiles, and comparative metrics
 */

/**
 * Result interface for rank calculations
 */
export interface RankResult {
  rank: number
  percentile: number
  totalUsers: number
  score: number
  usersAbove: number
  usersBelow: number
}

/**
 * Result interface for test-specific rank calculations
 */
export interface TestRankResult extends RankResult {
  testTemplateId: string
  testTitle?: string
  averageScore: number
  topScore: number
}

/**
 * Calculate user's overall rank based on latest or average scores
 * Compares user against all other users across all tests
 *
 * @param userId - User or FreeUser ID
 * @param userType - Type of user ('user' or 'freeUser')
 * @param useAverageScore - If true, use average score; if false, use latest score
 * @returns RankResult with rank, percentile, and related metrics
 */
export async function calculateUserRank(
  userId: string,
  userType: 'user' | 'freeUser' = 'freeUser',
  useAverageScore: boolean = false
): Promise<RankResult | null> {
  try {
    const userField = userType === 'user' ? 'userId' : 'freeUserId'

    // Get user's score
    const userSessions = await prisma.testSession.findMany({
      where: {
        [userField]: userId,
        status: 'COMPLETED',
        totalScore: { not: null },
      },
      select: {
        totalScore: true,
        percentage: true,
      },
      orderBy: {
        submittedAt: 'desc',
      },
    })

    if (userSessions.length === 0) {
      return null
    }

    const userScore = useAverageScore
      ? Math.round(
          userSessions.reduce((sum, s) => sum + (s.totalScore || 0), 0) / userSessions.length
        )
      : userSessions[0].totalScore || 0

    // Count users with better scores
    const usersAboveCount = await prisma.testSession.groupBy({
      by: [userField],
      where: {
        [userField]: { not: null },
        status: 'COMPLETED',
        totalScore: { not: null },
      },
      _avg: {
        totalScore: true,
      },
      _max: {
        totalScore: true,
      },
      having: useAverageScore
        ? { totalScore: { _avg: { gt: userScore } } }
        : { totalScore: { _max: { gt: userScore } } },
    })

    // Count total users who have completed at least one test
    const totalUsersData = await prisma.testSession.groupBy({
      by: [userField],
      where: {
        [userField]: { not: null },
        status: 'COMPLETED',
        totalScore: { not: null },
      },
    })

    const totalUsers = totalUsersData.length
    const usersAbove = usersAboveCount.length
    const rank = usersAbove + 1
    const usersBelow = totalUsers - rank
    const percentile =
      totalUsers > 1 ? Math.round(((totalUsers - rank) / totalUsers) * 100 * 10) / 10 : 100

    return {
      rank,
      percentile,
      totalUsers,
      score: userScore,
      usersAbove,
      usersBelow,
    }
  } catch (error) {
    console.error('Error calculating user rank:', error)
    throw new Error('Failed to calculate user rank')
  }
}

/**
 * Calculate user's rank for a specific test template
 * Compares user against all others who took the same test
 *
 * @param userId - User or FreeUser ID
 * @param testTemplateId - ID of the test template
 * @param userType - Type of user ('user' or 'freeUser')
 * @param useLatestAttempt - If true, use latest attempt; if false, use best attempt
 * @returns TestRankResult with test-specific ranking information
 */
export async function calculateTestRank(
  userId: string,
  testTemplateId: string,
  userType: 'user' | 'freeUser' = 'freeUser',
  useLatestAttempt: boolean = true
): Promise<TestRankResult | null> {
  try {
    const userField = userType === 'user' ? 'userId' : 'freeUserId'

    // Get test template details
    const testTemplate = await prisma.testTemplate.findUnique({
      where: { id: testTemplateId },
      select: { title: true, totalMarks: true },
    })

    if (!testTemplate) {
      throw new Error('Test template not found')
    }

    // Get user's score for this test
    const userSessions = await prisma.testSession.findMany({
      where: {
        [userField]: userId,
        testTemplateId,
        status: 'COMPLETED',
        totalScore: { not: null },
      },
      select: {
        totalScore: true,
        percentage: true,
      },
      orderBy: useLatestAttempt ? { submittedAt: 'desc' } : { totalScore: 'desc' },
    })

    if (userSessions.length === 0) {
      return null
    }

    const userScore = userSessions[0].totalScore || 0

    // Get all completed sessions for this test
    const allSessions = await prisma.testSession.findMany({
      where: {
        testTemplateId,
        status: 'COMPLETED',
        totalScore: { not: null },
      },
      select: {
        userId: true,
        freeUserId: true,
        totalScore: true,
      },
      orderBy: {
        totalScore: 'desc',
      },
    })

    // Group by user and get their best/latest score
    const userScores = new Map<string, number>()

    for (const session of allSessions) {
      const sessionUserId = session.userId || session.freeUserId
      if (!sessionUserId) continue

      const existingScore = userScores.get(sessionUserId)
      const currentScore = session.totalScore || 0

      if (existingScore === undefined) {
        userScores.set(sessionUserId, currentScore)
      } else if (useLatestAttempt) {
        // For latest attempt, the first one encountered is the latest (due to ordering)
        continue
      } else if (currentScore > existingScore) {
        // For best attempt, keep the highest score
        userScores.set(sessionUserId, currentScore)
      }
    }

    // Calculate rank
    const sortedScores = Array.from(userScores.values()).sort((a, b) => b - a)
    const usersAbove = sortedScores.filter((score) => score > userScore).length
    const totalUsers = userScores.size
    const rank = usersAbove + 1
    const usersBelow = totalUsers - rank
    const percentile =
      totalUsers > 1 ? Math.round(((totalUsers - rank) / totalUsers) * 100 * 10) / 10 : 100

    // Calculate statistics
    const averageScore =
      sortedScores.length > 0
        ? Math.round(sortedScores.reduce((sum, s) => sum + s, 0) / sortedScores.length)
        : 0
    const topScore = sortedScores[0] || 0

    return {
      rank,
      percentile,
      totalUsers,
      score: userScore,
      usersAbove,
      usersBelow,
      testTemplateId,
      testTitle: testTemplate.title,
      averageScore,
      topScore,
    }
  } catch (error) {
    console.error('Error calculating test rank:', error)
    throw new Error('Failed to calculate test rank')
  }
}

/**
 * Calculate percentile from rank and total users
 * Helper function for converting rank to percentile
 *
 * @param rank - User's rank (1 = best)
 * @param totalUsers - Total number of users
 * @returns Percentile value (0-100)
 */
export function calculatePercentile(rank: number, totalUsers: number): number {
  if (totalUsers <= 0) return 0
  if (rank <= 0) return 100
  if (rank > totalUsers) return 0

  return Math.round(((totalUsers - rank) / totalUsers) * 100 * 10) / 10
}

/**
 * Get top performers for leaderboard
 * Returns top N users by score across all tests or specific test
 *
 * @param limit - Number of top users to return (default: 10)
 * @param testTemplateId - Optional: Filter by specific test template
 * @param useAverageScore - If true, rank by average; if false, rank by best score
 * @returns Array of top performers with their scores and ranks
 */
export async function getTopPerformers(
  limit: number = 10,
  testTemplateId?: string,
  useAverageScore: boolean = false
): Promise<
  Array<{
    userId: string
    userType: 'user' | 'freeUser'
    userName?: string
    rank: number
    score: number
    percentile: number
    totalTests: number
  }>
> {
  try {
    const whereClause: any = {
      status: 'COMPLETED',
      totalScore: { not: null },
    }

    if (testTemplateId) {
      whereClause.testTemplateId = testTemplateId
    }

    // Get all completed test sessions
    const sessions = await prisma.testSession.findMany({
      where: whereClause,
      select: {
        userId: true,
        freeUserId: true,
        totalScore: true,
        user: {
          select: { name: true },
        },
        freeUser: {
          select: { name: true },
        },
      },
    })

    // Group by user and calculate their score
    const userStats = new Map<
      string,
      {
        userId: string
        userType: 'user' | 'freeUser'
        userName?: string
        scores: number[]
        totalTests: number
      }
    >()

    for (const session of sessions) {
      const userId = session.userId || session.freeUserId
      const userType = session.userId ? 'user' : 'freeUser'
      const userName = session.user?.name || session.freeUser?.name

      if (!userId) continue

      const existing = userStats.get(userId)
      const score = session.totalScore || 0

      if (existing) {
        existing.scores.push(score)
        existing.totalTests++
      } else {
        userStats.set(userId, {
          userId,
          userType,
          userName,
          scores: [score],
          totalTests: 1,
        })
      }
    }

    // Calculate final scores and sort
    const rankedUsers = Array.from(userStats.values())
      .map((user) => ({
        userId: user.userId,
        userType: user.userType,
        userName: user.userName,
        score: useAverageScore
          ? Math.round(user.scores.reduce((sum, s) => sum + s, 0) / user.scores.length)
          : Math.max(...user.scores),
        totalTests: user.totalTests,
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map((user, index) => ({
        ...user,
        rank: index + 1,
        percentile: calculatePercentile(index + 1, userStats.size),
      }))

    return rankedUsers
  } catch (error) {
    console.error('Error getting top performers:', error)
    throw new Error('Failed to get top performers')
  }
}

/**
 * Get user's rank history over time
 * Shows how user's rank has changed across recent tests
 *
 * @param userId - User or FreeUser ID
 * @param userType - Type of user ('user' or 'freeUser')
 * @param limit - Number of recent tests to include (default: 10)
 * @returns Array of rank data points with timestamps
 */
export async function getRankHistory(
  userId: string,
  userType: 'user' | 'freeUser' = 'freeUser',
  limit: number = 10
): Promise<
  Array<{
    testTemplateId: string
    testTitle?: string
    rank: number
    percentile: number
    score: number
    submittedAt: Date
  }>
> {
  try {
    const userField = userType === 'user' ? 'userId' : 'freeUserId'

    // Get user's recent completed tests
    const userSessions = await prisma.testSession.findMany({
      where: {
        [userField]: userId,
        status: 'COMPLETED',
        totalScore: { not: null },
      },
      select: {
        id: true,
        testTemplateId: true,
        totalScore: true,
        submittedAt: true,
        testTemplate: {
          select: { title: true },
        },
      },
      orderBy: {
        submittedAt: 'desc',
      },
      take: limit,
    })

    // Calculate rank for each test
    const rankHistory = await Promise.all(
      userSessions.map(async (session) => {
        const rankResult = await calculateTestRank(userId, session.testTemplateId, userType, true)

        return {
          testTemplateId: session.testTemplateId,
          testTitle: session.testTemplate.title,
          rank: rankResult?.rank || 0,
          percentile: rankResult?.percentile || 0,
          score: session.totalScore || 0,
          submittedAt: session.submittedAt || new Date(),
        }
      })
    )

    return rankHistory
  } catch (error) {
    console.error('Error getting rank history:', error)
    throw new Error('Failed to get rank history')
  }
}

/**
 * Handle edge cases for rank calculations
 * Provides default values when there's insufficient data
 */
export function handleRankEdgeCase(totalUsers: number, hasUserData: boolean): RankResult | null {
  if (!hasUserData) {
    return null
  }

  if (totalUsers === 0) {
    return {
      rank: 1,
      percentile: 100,
      totalUsers: 1,
      score: 0,
      usersAbove: 0,
      usersBelow: 0,
    }
  }

  return null
}
