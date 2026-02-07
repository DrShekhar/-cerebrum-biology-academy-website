import { prisma } from '@/lib/prisma'

/**
 * Weak Areas Analysis Utilities
 * Identifies topics where users need improvement and provides recommendations
 */

/**
 * Difficulty level for a topic
 */
export type TopicDifficulty = 'easy' | 'medium' | 'hard' | 'critical'

/**
 * Result interface for weak area analysis
 */
export interface WeakAreaResult {
  topic: string
  subtopic?: string
  accuracy: number
  totalQuestions: number
  correctAnswers: number
  incorrectAnswers: number
  averageTimePerQuestion?: number
  difficulty: TopicDifficulty
  recommendedStudyTime: number
  lastPracticed: Date | null
  improvementRate?: number
  confidenceLevel?: number
}

/**
 * Result interface for topic strength analysis
 */
export interface TopicStrengthResult {
  topic: string
  accuracy: number
  totalQuestions: number
  masteryScore: number
  lastPracticed: Date | null
}

/**
 * Analyze weak areas for a user
 * Returns topics with less than specified accuracy threshold
 *
 * @param userId - User or FreeUser ID
 * @param userType - Type of user ('user' or 'freeUser')
 * @param limit - Maximum number of weak areas to return (default: 5)
 * @param accuracyThreshold - Threshold below which topics are considered weak (default: 50%)
 * @param minAttempts - Minimum attempts required to consider a topic (default: 3)
 * @returns Array of weak areas sorted by priority
 */
export async function analyzeWeakAreas(
  userId: string,
  userType: 'user' | 'freeUser' = 'freeUser',
  limit: number = 5,
  accuracyThreshold: number = 50,
  minAttempts: number = 3
): Promise<WeakAreaResult[]> {
  try {
    const userField = userType === 'user' ? 'userId' : 'freeUserId'

    // Get user progress data
    const progressData = await prisma.userProgress.findMany({
      where: {
        [userField]: userId,
        totalQuestions: { gte: minAttempts },
      },
      select: {
        topic: true,
        subtopic: true,
        totalQuestions: true,
        correctAnswers: true,
        accuracy: true,
        averageTime: true,
        lastPracticed: true,
        improvementRate: true,
      },
    })

    // Get question responses for additional analysis
    const questionResponses = await prisma.user_question_responses.findMany({
      where: {
        [userField]: userId,
        question: {
          isActive: true,
        },
      },
      select: {
        question: {
          select: {
            topic: true,
            subtopic: true,
          },
        },
        isCorrect: true,
        timeSpent: true,
        confidence: true,
        answeredAt: true,
      },
      orderBy: {
        answeredAt: 'desc',
      },
    })

    // Combine and analyze data
    const topicMap = new Map<
      string,
      {
        topic: string
        subtopic?: string
        correctAnswers: number
        incorrectAnswers: number
        totalQuestions: number
        totalTime: number
        lastPracticed: Date | null
        confidenceSum: number
        confidenceCount: number
      }
    >()

    // Process progress data
    for (const progress of progressData) {
      const key = progress.subtopic ? `${progress.topic}:${progress.subtopic}` : progress.topic

      topicMap.set(key, {
        topic: progress.topic,
        subtopic: progress.subtopic || undefined,
        correctAnswers: progress.correctAnswers,
        incorrectAnswers: progress.totalQuestions - progress.correctAnswers,
        totalQuestions: progress.totalQuestions,
        totalTime: (progress.averageTime || 0) * progress.totalQuestions,
        lastPracticed: progress.lastPracticed,
        confidenceSum: 0,
        confidenceCount: 0,
      })
    }

    // Process question responses to fill gaps
    for (const response of questionResponses) {
      const key = response.question.subtopic
        ? `${response.question.topic}:${response.question.subtopic}`
        : response.question.topic

      const existing = topicMap.get(key)
      if (existing) {
        if (response.confidence) {
          existing.confidenceSum += response.confidence
          existing.confidenceCount++
        }
      } else {
        // Create new entry if not in progress data
        const current = topicMap.get(key) || {
          topic: response.question.topic,
          subtopic: response.question.subtopic || undefined,
          correctAnswers: 0,
          incorrectAnswers: 0,
          totalQuestions: 0,
          totalTime: 0,
          lastPracticed: null,
          confidenceSum: 0,
          confidenceCount: 0,
        }

        current.totalQuestions++
        if (response.isCorrect) {
          current.correctAnswers++
        } else {
          current.incorrectAnswers++
        }

        if (response.timeSpent) {
          current.totalTime += response.timeSpent
        }

        if (!current.lastPracticed || response.answeredAt > current.lastPracticed) {
          current.lastPracticed = response.answeredAt
        }

        if (response.confidence) {
          current.confidenceSum += response.confidence
          current.confidenceCount++
        }

        topicMap.set(key, current)
      }
    }

    // Calculate weak areas
    const weakAreas: WeakAreaResult[] = []

    for (const [key, data] of topicMap) {
      const accuracy =
        data.totalQuestions > 0
          ? Math.round((data.correctAnswers / data.totalQuestions) * 100 * 10) / 10
          : 0

      // Only include topics below accuracy threshold with minimum attempts
      if (accuracy < accuracyThreshold && data.totalQuestions >= minAttempts) {
        const averageTimePerQuestion =
          data.totalQuestions > 0 ? Math.round(data.totalTime / data.totalQuestions) : undefined

        const difficulty = calculateDifficulty(accuracy, data.totalQuestions)
        const recommendedStudyTime = calculateRecommendedStudyTime(
          accuracy,
          data.totalQuestions,
          difficulty
        )

        const confidenceLevel =
          data.confidenceCount > 0
            ? Math.round((data.confidenceSum / data.confidenceCount) * 10) / 10
            : undefined

        weakAreas.push({
          topic: data.topic,
          subtopic: data.subtopic,
          accuracy,
          totalQuestions: data.totalQuestions,
          correctAnswers: data.correctAnswers,
          incorrectAnswers: data.incorrectAnswers,
          averageTimePerQuestion,
          difficulty,
          recommendedStudyTime,
          lastPracticed: data.lastPracticed,
          confidenceLevel,
        })
      }
    }

    // Sort by priority: lowest accuracy first, then by number of attempts
    weakAreas.sort((a, b) => {
      if (a.accuracy !== b.accuracy) {
        return a.accuracy - b.accuracy
      }
      return b.totalQuestions - a.totalQuestions
    })

    return weakAreas.slice(0, limit)
  } catch (error) {
    console.error('Error analyzing weak areas:', error)
    throw new Error('Failed to analyze weak areas')
  }
}

/**
 * Calculate difficulty level for a topic based on accuracy and attempts
 *
 * @param accuracy - User's accuracy percentage (0-100)
 * @param attempts - Number of attempts on this topic
 * @returns Difficulty level
 */
export function calculateDifficulty(accuracy: number, attempts: number): TopicDifficulty {
  // Critical: Very low accuracy with many attempts (struggling significantly)
  if (accuracy < 30 && attempts >= 10) {
    return 'critical'
  }

  // Hard: Low accuracy
  if (accuracy < 40) {
    return 'hard'
  }

  // Medium: Below average accuracy
  if (accuracy < 50) {
    return 'medium'
  }

  // Easy: Near threshold but still weak
  return 'easy'
}

/**
 * Calculate recommended study time in minutes per day
 * Based on accuracy, attempts, and difficulty level
 *
 * @param accuracy - User's accuracy percentage (0-100)
 * @param attempts - Number of attempts on this topic
 * @param difficulty - Topic difficulty level
 * @returns Recommended study time in minutes per day
 */
export function calculateRecommendedStudyTime(
  accuracy: number,
  attempts: number,
  difficulty: TopicDifficulty
): number {
  let baseTime = 30 // Base 30 minutes

  // Adjust based on difficulty
  const difficultyMultipliers: Record<TopicDifficulty, number> = {
    easy: 1.0,
    medium: 1.3,
    hard: 1.6,
    critical: 2.0,
  }

  baseTime *= difficultyMultipliers[difficulty]

  // Adjust based on accuracy (lower accuracy = more time)
  const accuracyFactor = Math.max(0.5, (100 - accuracy) / 100)
  baseTime *= accuracyFactor

  // Adjust based on attempts (more attempts with low accuracy = more focused time)
  if (attempts >= 20 && accuracy < 40) {
    baseTime *= 1.2
  }

  return Math.round(baseTime)
}

/**
 * Get strong areas (topics with high mastery)
 *
 * @param userId - User or FreeUser ID
 * @param userType - Type of user ('user' or 'freeUser')
 * @param limit - Maximum number of strong areas to return (default: 5)
 * @param masteryThreshold - Minimum mastery score to be considered strong (default: 70)
 * @returns Array of strong topic areas
 */
export async function getStrongAreas(
  userId: string,
  userType: 'user' | 'freeUser' = 'freeUser',
  limit: number = 5,
  masteryThreshold: number = 70
): Promise<TopicStrengthResult[]> {
  try {
    const userField = userType === 'user' ? 'userId' : 'freeUserId'

    const progressData = await prisma.userProgress.findMany({
      where: {
        [userField]: userId,
        masteryScore: { gte: masteryThreshold },
      },
      select: {
        topic: true,
        accuracy: true,
        totalQuestions: true,
        masteryScore: true,
        lastPracticed: true,
      },
      orderBy: {
        masteryScore: 'desc',
      },
      take: limit,
    })

    return progressData.map((p) => ({
      topic: p.topic,
      accuracy: p.accuracy,
      totalQuestions: p.totalQuestions,
      masteryScore: p.masteryScore,
      lastPracticed: p.lastPracticed,
    }))
  } catch (error) {
    console.error('Error getting strong areas:', error)
    throw new Error('Failed to get strong areas')
  }
}

/**
 * Get improvement trends for weak areas
 * Shows how accuracy has changed over time
 *
 * @param userId - User or FreeUser ID
 * @param topic - Topic to analyze
 * @param userType - Type of user ('user' or 'freeUser')
 * @param days - Number of days to look back (default: 30)
 * @returns Array of accuracy data points over time
 */
export async function getImprovementTrend(
  userId: string,
  topic: string,
  userType: 'user' | 'freeUser' = 'freeUser',
  days: number = 30
): Promise<
  Array<{
    date: Date
    accuracy: number
    questionsAnswered: number
  }>
> {
  try {
    const userField = userType === 'user' ? 'userId' : 'freeUserId'
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    // Get question responses for this topic
    const responses = await prisma.user_question_responses.findMany({
      where: {
        [userField]: userId,
        question: {
          topic: topic,
          isActive: true,
        },
        answeredAt: { gte: startDate },
      },
      select: {
        isCorrect: true,
        answeredAt: true,
      },
      orderBy: {
        answeredAt: 'asc',
      },
    })

    // Group by week for better visualization
    const weeklyData = new Map<
      string,
      {
        correct: number
        total: number
        date: Date
      }
    >()

    for (const response of responses) {
      const weekKey = getWeekKey(response.answeredAt)
      const existing = weeklyData.get(weekKey) || {
        correct: 0,
        total: 0,
        date: getStartOfWeek(response.answeredAt),
      }

      existing.total++
      if (response.isCorrect) {
        existing.correct++
      }

      weeklyData.set(weekKey, existing)
    }

    // Convert to array and calculate accuracy
    const trend = Array.from(weeklyData.values())
      .map((data) => ({
        date: data.date,
        accuracy: data.total > 0 ? Math.round((data.correct / data.total) * 100 * 10) / 10 : 0,
        questionsAnswered: data.total,
      }))
      .sort((a, b) => a.date.getTime() - b.date.getTime())

    return trend
  } catch (error) {
    console.error('Error getting improvement trend:', error)
    throw new Error('Failed to get improvement trend')
  }
}

/**
 * Get practice recommendations for weak areas
 *
 * @param userId - User or FreeUser ID
 * @param userType - Type of user ('user' or 'freeUser')
 * @param limit - Number of recommendations (default: 3)
 * @returns Array of recommended topics with study plans
 */
export async function getPracticeRecommendations(
  userId: string,
  userType: 'user' | 'freeUser' = 'freeUser',
  limit: number = 3
): Promise<
  Array<{
    topic: string
    reason: string
    targetAccuracy: number
    estimatedQuestionsNeeded: number
    priority: 'high' | 'medium' | 'low'
  }>
> {
  try {
    const weakAreas = await analyzeWeakAreas(userId, userType, limit * 2)

    const recommendations = weakAreas.slice(0, limit).map((area) => {
      let reason = ''
      let priority: 'high' | 'medium' | 'low' = 'medium'

      if (area.difficulty === 'critical') {
        reason = 'Critical weakness requiring immediate attention'
        priority = 'high'
      } else if (area.difficulty === 'hard') {
        reason = 'Significant improvement needed'
        priority = 'high'
      } else if (area.difficulty === 'medium') {
        reason = 'Below average performance'
        priority = 'medium'
      } else {
        reason = 'Needs slight improvement'
        priority = 'low'
      }

      // Estimate questions needed to reach 70% accuracy
      const targetAccuracy = 70
      const improvementNeeded = targetAccuracy - area.accuracy
      const estimatedQuestionsNeeded = Math.ceil(improvementNeeded * 2)

      return {
        topic: area.topic,
        reason,
        targetAccuracy,
        estimatedQuestionsNeeded: Math.max(10, estimatedQuestionsNeeded),
        priority,
      }
    })

    return recommendations
  } catch (error) {
    console.error('Error getting practice recommendations:', error)
    throw new Error('Failed to get practice recommendations')
  }
}

/**
 * Compare user's weak areas with peer averages
 *
 * @param userId - User or FreeUser ID
 * @param userType - Type of user ('user' or 'freeUser')
 * @returns Comparison data showing how user performs relative to peers
 */
export async function compareWithPeers(
  userId: string,
  userType: 'user' | 'freeUser' = 'freeUser'
): Promise<
  Array<{
    topic: string
    userAccuracy: number
    peerAverage: number
    difference: number
    ranking: 'above' | 'average' | 'below'
  }>
> {
  try {
    const userField = userType === 'user' ? 'userId' : 'freeUserId'

    // Get user's progress
    const userProgress = await prisma.userProgress.findMany({
      where: {
        [userField]: userId,
      },
      select: {
        topic: true,
        accuracy: true,
      },
    })

    // Get peer averages for same topics
    const comparisons = await Promise.all(
      userProgress.map(async (progress) => {
        const peerData = await prisma.userProgress.aggregate({
          where: {
            topic: progress.topic,
            [userField]: { not: userId },
          },
          _avg: {
            accuracy: true,
          },
        })

        const peerAverage = peerData._avg.accuracy || 0
        const difference = Math.round((progress.accuracy - peerAverage) * 10) / 10

        let ranking: 'above' | 'average' | 'below'
        if (difference > 5) {
          ranking = 'above'
        } else if (difference < -5) {
          ranking = 'below'
        } else {
          ranking = 'average'
        }

        return {
          topic: progress.topic,
          userAccuracy: progress.accuracy,
          peerAverage: Math.round(peerAverage * 10) / 10,
          difference,
          ranking,
        }
      })
    )

    // Sort by difference (most below average first)
    return comparisons.sort((a, b) => a.difference - b.difference)
  } catch (error) {
    console.error('Error comparing with peers:', error)
    throw new Error('Failed to compare with peers')
  }
}

/**
 * Helper function to get week key for grouping
 */
function getWeekKey(date: Date): string {
  const year = date.getFullYear()
  const week = getWeekNumber(date)
  return `${year}-W${week}`
}

/**
 * Helper function to get week number
 */
function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const dayNum = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7)
}

/**
 * Helper function to get start of week
 */
function getStartOfWeek(date: Date): Date {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day
  return new Date(d.setDate(diff))
}
