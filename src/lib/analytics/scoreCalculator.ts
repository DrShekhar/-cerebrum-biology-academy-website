import { prisma } from '@/lib/prisma'

/**
 * NEET Score Calculation Utilities
 * Provides functions to calculate biology scores, component scores, and improvements
 */

/**
 * NEET scoring constants
 */
export const NEET_SCORING = {
  BIOLOGY_TOTAL: 360,
  ZOOLOGY_TOTAL: 180,
  BOTANY_TOTAL: 180,
  BIOLOGY_QUESTIONS: 90,
  ZOOLOGY_QUESTIONS: 45,
  BOTANY_QUESTIONS: 45,
  MARKS_PER_QUESTION: 4,
  NEGATIVE_MARKS: -1,
  NEET_TOTAL: 720,
  PHYSICS_TOTAL: 180,
  CHEMISTRY_TOTAL: 180,
}

/**
 * Result interface for biology score calculation
 */
export interface BiologyScoreResult {
  totalScore: number
  maxScore: number
  percentage: number
  zoologyScore: number
  botanyScore: number
  questionsAttempted: number
  correctAnswers: number
  incorrectAnswers: number
  accuracy: number
  estimatedNEETScore?: number
}

/**
 * Result interface for component score breakdown
 */
export interface ComponentScoreResult {
  zoology: {
    score: number
    maxScore: number
    percentage: number
    questionsAttempted: number
    correctAnswers: number
    accuracy: number
  }
  botany: {
    score: number
    maxScore: number
    percentage: number
    questionsAttempted: number
    correctAnswers: number
    accuracy: number
  }
  totalBiology: {
    score: number
    maxScore: number
    percentage: number
  }
}

/**
 * Result interface for score improvement
 */
export interface ScoreImprovementResult {
  currentScore: number
  previousScore: number
  improvement: number
  improvementPercentage: number
  trend: 'improving' | 'declining' | 'stable'
  last5Tests: Array<{
    testId: string
    score: number
    percentage: number
    date: Date
  }>
  averageImprovement: number
}

/**
 * Calculate user's biology score (out of 360)
 * Can use latest test or average of all tests
 *
 * @param userId - User or FreeUser ID
 * @param userType - Type of user ('user' or 'freeUser')
 * @param useAverage - If true, calculate average; if false, use latest test
 * @returns Biology score result with breakdown
 */
export async function calculateBiologyScore(
  userId: string,
  userType: 'user' | 'freeUser' = 'freeUser',
  useAverage: boolean = false
): Promise<BiologyScoreResult | null> {
  try {
    const userField = userType === 'user' ? 'userId' : 'freeUserId'

    // Get completed test sessions
    const testSessions = await prisma.testSession.findMany({
      where: {
        [userField]: userId,
        status: 'COMPLETED',
        totalScore: { not: null },
      },
      select: {
        id: true,
        totalScore: true,
        percentage: true,
        testTemplate: {
          select: {
            subject: true,
            totalMarks: true,
            totalQuestions: true,
          },
        },
        responses: {
          select: {
            isCorrect: true,
            selectedAnswer: true,
            marksAwarded: true,
            question: {
              select: {
                subject: true,
                marks: true,
              },
            },
          },
        },
      },
      orderBy: {
        submittedAt: 'desc',
      },
    })

    if (testSessions.length === 0) {
      return null
    }

    // Calculate scores
    let totalBiologyScore = 0
    let totalZoologyScore = 0
    let totalBotanyScore = 0
    let totalQuestionsAttempted = 0
    let totalCorrectAnswers = 0
    let totalIncorrectAnswers = 0
    let sessionCount = 0

    const sessionsToAnalyze = useAverage ? testSessions : [testSessions[0]]

    for (const session of sessionsToAnalyze) {
      let biologyScore = 0
      let zoologyScore = 0
      let botanyScore = 0
      let questionsAttempted = 0
      let correctAnswers = 0
      let incorrectAnswers = 0

      for (const response of session.responses) {
        const subject = response.question.subject.toLowerCase()

        if (subject === 'biology' || subject === 'zoology' || subject === 'botany') {
          if (response.selectedAnswer) {
            questionsAttempted++
          }

          if (response.isCorrect) {
            correctAnswers++
            const marks = response.marksAwarded || response.question.marks || 4
            biologyScore += marks

            if (subject === 'zoology') {
              zoologyScore += marks
            } else if (subject === 'botany') {
              botanyScore += marks
            } else {
              // Generic biology - split equally
              zoologyScore += marks / 2
              botanyScore += marks / 2
            }
          } else if (response.selectedAnswer) {
            incorrectAnswers++
            // Apply negative marking if applicable
            biologyScore += NEET_SCORING.NEGATIVE_MARKS
            if (subject === 'zoology') {
              zoologyScore += NEET_SCORING.NEGATIVE_MARKS / 2
            } else if (subject === 'botany') {
              botanyScore += NEET_SCORING.NEGATIVE_MARKS / 2
            }
          }
        }
      }

      totalBiologyScore += biologyScore
      totalZoologyScore += zoologyScore
      totalBotanyScore += botanyScore
      totalQuestionsAttempted += questionsAttempted
      totalCorrectAnswers += correctAnswers
      totalIncorrectAnswers += incorrectAnswers
      sessionCount++
    }

    // Calculate averages if needed
    if (useAverage && sessionCount > 1) {
      totalBiologyScore = Math.round(totalBiologyScore / sessionCount)
      totalZoologyScore = Math.round(totalZoologyScore / sessionCount)
      totalBotanyScore = Math.round(totalBotanyScore / sessionCount)
      totalQuestionsAttempted = Math.round(totalQuestionsAttempted / sessionCount)
      totalCorrectAnswers = Math.round(totalCorrectAnswers / sessionCount)
      totalIncorrectAnswers = Math.round(totalIncorrectAnswers / sessionCount)
    }

    const accuracy =
      totalQuestionsAttempted > 0
        ? Math.round((totalCorrectAnswers / totalQuestionsAttempted) * 100 * 10) / 10
        : 0

    const percentage = Math.round((totalBiologyScore / NEET_SCORING.BIOLOGY_TOTAL) * 100 * 10) / 10

    // Estimate full NEET score (assuming similar performance in Physics and Chemistry)
    const estimatedNEETScore = Math.round(
      (totalBiologyScore / NEET_SCORING.BIOLOGY_TOTAL) * NEET_SCORING.NEET_TOTAL
    )

    return {
      totalScore: totalBiologyScore,
      maxScore: NEET_SCORING.BIOLOGY_TOTAL,
      percentage,
      zoologyScore: totalZoologyScore,
      botanyScore: totalBotanyScore,
      questionsAttempted: totalQuestionsAttempted,
      correctAnswers: totalCorrectAnswers,
      incorrectAnswers: totalIncorrectAnswers,
      accuracy,
      estimatedNEETScore,
    }
  } catch (error) {
    console.error('Error calculating biology score:', error)
    throw new Error('Failed to calculate biology score')
  }
}

/**
 * Calculate full NEET score (out of 720)
 * Estimates based on available subject data
 *
 * @param userId - User or FreeUser ID
 * @param userType - Type of user ('user' or 'freeUser')
 * @param useAverage - If true, calculate average; if false, use latest test
 * @returns Estimated NEET score
 */
export async function calculateNEETScore(
  userId: string,
  userType: 'user' | 'freeUser' = 'freeUser',
  useAverage: boolean = false
): Promise<{
  totalScore: number
  maxScore: number
  percentage: number
  biologyScore: number
  physicsScore?: number
  chemistryScore?: number
  isEstimated: boolean
  estimationNote?: string
} | null> {
  try {
    const biologyResult = await calculateBiologyScore(userId, userType, useAverage)

    if (!biologyResult) {
      return null
    }

    // For now, we only have biology data
    // In a full implementation, you would fetch physics and chemistry scores similarly
    const totalScore = biologyResult.totalScore
    const percentage = Math.round((totalScore / NEET_SCORING.NEET_TOTAL) * 100 * 10) / 10

    return {
      totalScore,
      maxScore: NEET_SCORING.NEET_TOTAL,
      percentage,
      biologyScore: biologyResult.totalScore,
      isEstimated: true,
      estimationNote:
        'Based on biology performance only. Full NEET score includes Physics and Chemistry.',
    }
  } catch (error) {
    console.error('Error calculating NEET score:', error)
    throw new Error('Failed to calculate NEET score')
  }
}

/**
 * Calculate component scores (Zoology and Botany breakdown)
 *
 * @param userId - User or FreeUser ID
 * @param userType - Type of user ('user' or 'freeUser')
 * @param useAverage - If true, calculate average; if false, use latest test
 * @returns Component score breakdown
 */
export async function calculateComponentScores(
  userId: string,
  userType: 'user' | 'freeUser' = 'freeUser',
  useAverage: boolean = false
): Promise<ComponentScoreResult | null> {
  try {
    const biologyResult = await calculateBiologyScore(userId, userType, useAverage)

    if (!biologyResult) {
      return null
    }

    return {
      zoology: {
        score: biologyResult.zoologyScore,
        maxScore: NEET_SCORING.ZOOLOGY_TOTAL,
        percentage:
          Math.round((biologyResult.zoologyScore / NEET_SCORING.ZOOLOGY_TOTAL) * 100 * 10) / 10,
        questionsAttempted: Math.round(biologyResult.questionsAttempted / 2),
        correctAnswers: Math.round(biologyResult.correctAnswers / 2),
        accuracy: biologyResult.accuracy,
      },
      botany: {
        score: biologyResult.botanyScore,
        maxScore: NEET_SCORING.BOTANY_TOTAL,
        percentage:
          Math.round((biologyResult.botanyScore / NEET_SCORING.BOTANY_TOTAL) * 100 * 10) / 10,
        questionsAttempted: Math.round(biologyResult.questionsAttempted / 2),
        correctAnswers: Math.round(biologyResult.correctAnswers / 2),
        accuracy: biologyResult.accuracy,
      },
      totalBiology: {
        score: biologyResult.totalScore,
        maxScore: NEET_SCORING.BIOLOGY_TOTAL,
        percentage: biologyResult.percentage,
      },
    }
  } catch (error) {
    console.error('Error calculating component scores:', error)
    throw new Error('Failed to calculate component scores')
  }
}

/**
 * Calculate score improvement over time
 * Compares latest test with previous tests
 *
 * @param userId - User or FreeUser ID
 * @param userType - Type of user ('user' or 'freeUser')
 * @returns Score improvement analysis
 */
export async function calculateImprovement(
  userId: string,
  userType: 'user' | 'freeUser' = 'freeUser'
): Promise<ScoreImprovementResult | null> {
  try {
    const userField = userType === 'user' ? 'userId' : 'freeUserId'

    // Get recent test sessions
    const testSessions = await prisma.testSession.findMany({
      where: {
        [userField]: userId,
        status: 'COMPLETED',
        totalScore: { not: null },
      },
      select: {
        id: true,
        totalScore: true,
        percentage: true,
        submittedAt: true,
      },
      orderBy: {
        submittedAt: 'desc',
      },
      take: 5,
    })

    if (testSessions.length < 2) {
      return null
    }

    const currentScore = testSessions[0].totalScore || 0
    const previousScore = testSessions[1].totalScore || 0
    const improvement = currentScore - previousScore
    const improvementPercentage =
      previousScore > 0 ? Math.round((improvement / previousScore) * 100 * 10) / 10 : 0

    // Determine trend
    let trend: 'improving' | 'declining' | 'stable'
    if (improvementPercentage > 5) {
      trend = 'improving'
    } else if (improvementPercentage < -5) {
      trend = 'declining'
    } else {
      trend = 'stable'
    }

    // Calculate average improvement across all tests
    let totalImprovement = 0
    let improvementCount = 0

    for (let i = 0; i < testSessions.length - 1; i++) {
      const current = testSessions[i].totalScore || 0
      const previous = testSessions[i + 1].totalScore || 0
      totalImprovement += current - previous
      improvementCount++
    }

    const averageImprovement =
      improvementCount > 0 ? Math.round(totalImprovement / improvementCount) : 0

    // Format last 5 tests
    const last5Tests = testSessions.map((session) => ({
      testId: session.id,
      score: session.totalScore || 0,
      percentage: session.percentage || 0,
      date: session.submittedAt || new Date(),
    }))

    return {
      currentScore,
      previousScore,
      improvement,
      improvementPercentage,
      trend,
      last5Tests,
      averageImprovement,
    }
  } catch (error) {
    console.error('Error calculating improvement:', error)
    throw new Error('Failed to calculate improvement')
  }
}

/**
 * Get score distribution across difficulty levels
 *
 * @param userId - User or FreeUser ID
 * @param userType - Type of user ('user' or 'freeUser')
 * @returns Score breakdown by difficulty level
 */
export async function getScoreByDifficulty(
  userId: string,
  userType: 'user' | 'freeUser' = 'freeUser'
): Promise<{
  easy: { score: number; accuracy: number; questionsAttempted: number }
  medium: { score: number; accuracy: number; questionsAttempted: number }
  hard: { score: number; accuracy: number; questionsAttempted: number }
  expert: { score: number; accuracy: number; questionsAttempted: number }
} | null> {
  try {
    const userField = userType === 'user' ? 'userId' : 'freeUserId'

    // Get all question responses
    const responses = await prisma.userQuestionResponse.findMany({
      where: {
        [userField]: userId,
        question: {
          isActive: true,
        },
      },
      select: {
        isCorrect: true,
        marksAwarded: true,
        question: {
          select: {
            difficulty: true,
            marks: true,
          },
        },
      },
    })

    if (responses.length === 0) {
      return null
    }

    // Initialize difficulty stats
    const difficultyStats = {
      EASY: { score: 0, correct: 0, total: 0 },
      MEDIUM: { score: 0, correct: 0, total: 0 },
      HARD: { score: 0, correct: 0, total: 0 },
      EXPERT: { score: 0, correct: 0, total: 0 },
    }

    // Calculate stats for each difficulty
    for (const response of responses) {
      const difficulty = response.question.difficulty
      const marks = response.marksAwarded || response.question.marks || 4

      difficultyStats[difficulty].total++
      if (response.isCorrect) {
        difficultyStats[difficulty].correct++
        difficultyStats[difficulty].score += marks
      }
    }

    return {
      easy: {
        score: difficultyStats.EASY.score,
        accuracy:
          difficultyStats.EASY.total > 0
            ? Math.round((difficultyStats.EASY.correct / difficultyStats.EASY.total) * 100 * 10) /
              10
            : 0,
        questionsAttempted: difficultyStats.EASY.total,
      },
      medium: {
        score: difficultyStats.MEDIUM.score,
        accuracy:
          difficultyStats.MEDIUM.total > 0
            ? Math.round(
                (difficultyStats.MEDIUM.correct / difficultyStats.MEDIUM.total) * 100 * 10
              ) / 10
            : 0,
        questionsAttempted: difficultyStats.MEDIUM.total,
      },
      hard: {
        score: difficultyStats.HARD.score,
        accuracy:
          difficultyStats.HARD.total > 0
            ? Math.round((difficultyStats.HARD.correct / difficultyStats.HARD.total) * 100 * 10) /
              10
            : 0,
        questionsAttempted: difficultyStats.HARD.total,
      },
      expert: {
        score: difficultyStats.EXPERT.score,
        accuracy:
          difficultyStats.EXPERT.total > 0
            ? Math.round(
                (difficultyStats.EXPERT.correct / difficultyStats.EXPERT.total) * 100 * 10
              ) / 10
            : 0,
        questionsAttempted: difficultyStats.EXPERT.total,
      },
    }
  } catch (error) {
    console.error('Error getting score by difficulty:', error)
    throw new Error('Failed to get score by difficulty')
  }
}

/**
 * Get target score progress
 * Shows how close user is to their target score
 *
 * @param userId - User or FreeUser ID
 * @param targetScore - User's target NEET score (default: 600)
 * @param userType - Type of user ('user' or 'freeUser')
 * @returns Progress towards target score
 */
export async function getTargetScoreProgress(
  userId: string,
  targetScore: number = 600,
  userType: 'user' | 'freeUser' = 'freeUser'
): Promise<{
  currentScore: number
  targetScore: number
  progress: number
  remaining: number
  isOnTrack: boolean
  projectedScore?: number
} | null> {
  try {
    const biologyResult = await calculateBiologyScore(userId, userType, false)

    if (!biologyResult) {
      return null
    }

    const currentScore = biologyResult.estimatedNEETScore || 0
    const remaining = Math.max(0, targetScore - currentScore)
    const progress = targetScore > 0 ? Math.round((currentScore / targetScore) * 100 * 10) / 10 : 0

    // Get improvement trend to project future score
    const improvementResult = await calculateImprovement(userId, userType)
    const projectedScore =
      improvementResult && improvementResult.averageImprovement > 0
        ? currentScore + improvementResult.averageImprovement * 5 // Project 5 tests ahead
        : undefined

    const isOnTrack = projectedScore ? projectedScore >= targetScore : progress >= 75

    return {
      currentScore,
      targetScore,
      progress,
      remaining,
      isOnTrack,
      projectedScore,
    }
  } catch (error) {
    console.error('Error getting target score progress:', error)
    throw new Error('Failed to get target score progress')
  }
}
