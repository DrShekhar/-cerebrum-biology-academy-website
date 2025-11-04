import { prisma } from '@/lib/prisma'
import { calculateBiologyScore } from './scoreCalculator'

/**
 * Prediction Engine Utilities
 * Provides ML-ready predictions for exam scores, readiness, and expected ranks
 */

/**
 * Result interface for score prediction
 */
export interface ScorePredictionResult {
  predictedScore: number
  confidenceInterval: {
    lower: number
    upper: number
  }
  confidence: number
  baselineScore: number
  trendFactor: number
  methodology: 'linear_regression' | 'moving_average' | 'insufficient_data'
  dataPoints: number
  recommendation: string
}

/**
 * Result interface for readiness score
 */
export interface ReadinessScoreResult {
  readinessScore: number
  category: 'not_ready' | 'needs_improvement' | 'good' | 'very_good' | 'excellent'
  factors: {
    scoreConsistency: number
    accuracyTrend: number
    syllabusCompletion: number
    studyFrequency: number
    weakAreasCount: number
  }
  recommendations: string[]
  estimatedDaysToReady: number | null
}

/**
 * Result interface for expected rank prediction
 */
export interface ExpectedRankResult {
  expectedRank: number
  confidenceInterval: {
    bestCase: number
    worstCase: number
  }
  percentile: number
  totalCandidates: number
  basedOnScore: number
  factors: string[]
}

/**
 * Predict user's expected exam score using linear regression
 * Analyzes historical test data to project future performance
 *
 * @param userId - User or FreeUser ID
 * @param userType - Type of user ('user' or 'freeUser')
 * @param testsToAnalyze - Number of recent tests to analyze (default: 10)
 * @returns Score prediction with confidence interval
 */
export async function predictExamScore(
  userId: string,
  userType: 'user' | 'freeUser' = 'freeUser',
  testsToAnalyze: number = 10
): Promise<ScorePredictionResult | null> {
  try {
    const userField = userType === 'user' ? 'userId' : 'freeUserId'

    // Get recent test sessions with scores
    const testSessions = await prisma.testSession.findMany({
      where: {
        [userField]: userId,
        status: 'COMPLETED',
        totalScore: { not: null },
      },
      select: {
        totalScore: true,
        percentage: true,
        submittedAt: true,
      },
      orderBy: {
        submittedAt: 'desc',
      },
      take: testsToAnalyze,
    })

    if (testSessions.length < 3) {
      return {
        predictedScore: testSessions[0]?.totalScore || 0,
        confidenceInterval: {
          lower: 0,
          upper: 0,
        },
        confidence: 0,
        baselineScore: testSessions[0]?.totalScore || 0,
        trendFactor: 0,
        methodology: 'insufficient_data',
        dataPoints: testSessions.length,
        recommendation: 'Take at least 3 tests to generate accurate predictions',
      }
    }

    // Reverse to get chronological order for regression
    const scores = testSessions.reverse().map((s) => s.totalScore || 0)
    const dataPoints = scores.length

    // Perform linear regression
    const { slope, intercept, rSquared } = linearRegression(scores)

    // Predict next score (n+1 position)
    const predictedScore = Math.round(slope * dataPoints + intercept)

    // Calculate standard deviation for confidence interval
    const stdDev = calculateStandardDeviation(scores)
    const confidenceInterval = {
      lower: Math.max(0, Math.round(predictedScore - 1.96 * stdDev)),
      upper: Math.round(predictedScore + 1.96 * stdDev),
    }

    // Confidence based on R-squared and data points
    const confidence = Math.min(
      100,
      Math.round(rSquared * 100 * (dataPoints / testsToAnalyze) * 10) / 10
    )

    const baselineScore = scores[scores.length - 1]
    const trendFactor = Math.round(slope * 10 * 10) / 10

    // Determine methodology
    let methodology: 'linear_regression' | 'moving_average' | 'insufficient_data'
    if (dataPoints >= 5 && rSquared > 0.5) {
      methodology = 'linear_regression'
    } else if (dataPoints >= 3) {
      methodology = 'moving_average'
      // Use moving average instead
      const recentScores = scores.slice(-3)
      const avgScore = recentScores.reduce((sum, s) => sum + s, 0) / recentScores.length
      return {
        predictedScore: Math.round(avgScore),
        confidenceInterval: {
          lower: Math.round(avgScore - stdDev),
          upper: Math.round(avgScore + stdDev),
        },
        confidence: 60,
        baselineScore,
        trendFactor,
        methodology,
        dataPoints,
        recommendation: generateScoreRecommendation(avgScore, trendFactor, dataPoints),
      }
    } else {
      methodology = 'insufficient_data'
    }

    const recommendation = generateScoreRecommendation(predictedScore, trendFactor, dataPoints)

    return {
      predictedScore: Math.max(0, predictedScore),
      confidenceInterval,
      confidence,
      baselineScore,
      trendFactor,
      methodology,
      dataPoints,
      recommendation,
    }
  } catch (error) {
    console.error('Error predicting exam score:', error)
    throw new Error('Failed to predict exam score')
  }
}

/**
 * Calculate readiness score (0-100%)
 * Evaluates multiple factors to determine exam readiness
 *
 * @param userId - User or FreeUser ID
 * @param userType - Type of user ('user' or 'freeUser')
 * @returns Readiness score with detailed breakdown
 */
export async function calculateReadinessScore(
  userId: string,
  userType: 'user' | 'freeUser' = 'freeUser'
): Promise<ReadinessScoreResult> {
  try {
    const userField = userType === 'user' ? 'userId' : 'freeUserId'

    // Factor 1: Score Consistency (30% weight)
    const recentScores = await prisma.testSession.findMany({
      where: {
        [userField]: userId,
        status: 'COMPLETED',
        totalScore: { not: null },
      },
      select: { totalScore: true },
      orderBy: { submittedAt: 'desc' },
      take: 5,
    })

    const scoreConsistency =
      recentScores.length >= 3
        ? calculateConsistency(recentScores.map((s) => s.totalScore || 0))
        : 0

    // Factor 2: Accuracy Trend (25% weight)
    const accuracyData = await prisma.userQuestionResponse.findMany({
      where: {
        [userField]: userId,
      },
      select: {
        isCorrect: true,
        answeredAt: true,
      },
      orderBy: {
        answeredAt: 'desc',
      },
      take: 100,
    })

    const accuracyTrend = calculateAccuracyTrend(accuracyData)

    // Factor 3: Syllabus Completion (25% weight)
    const syllabusCompletion = await calculateSyllabusCompletionScore(userId, userType)

    // Factor 4: Study Frequency (10% weight)
    const studyFrequency = await calculateStudyFrequency(userId, userType)

    // Factor 5: Weak Areas Count (10% weight) - fewer is better
    const weakAreasCount = await prisma.userProgress.count({
      where: {
        [userField]: userId,
        accuracy: { lt: 50 },
      },
    })

    const weakAreasScore = Math.max(0, 100 - weakAreasCount * 10)

    // Calculate weighted readiness score
    const readinessScore = Math.round(
      scoreConsistency * 0.3 +
        accuracyTrend * 0.25 +
        syllabusCompletion * 0.25 +
        studyFrequency * 0.1 +
        weakAreasScore * 0.1
    )

    // Determine category
    let category: 'not_ready' | 'needs_improvement' | 'good' | 'very_good' | 'excellent'
    if (readinessScore < 40) {
      category = 'not_ready'
    } else if (readinessScore < 60) {
      category = 'needs_improvement'
    } else if (readinessScore < 75) {
      category = 'good'
    } else if (readinessScore < 90) {
      category = 'very_good'
    } else {
      category = 'excellent'
    }

    // Generate recommendations
    const recommendations = generateReadinessRecommendations({
      readinessScore,
      scoreConsistency,
      accuracyTrend,
      syllabusCompletion,
      weakAreasCount,
    })

    // Estimate days to ready (if not already ready)
    let estimatedDaysToReady: number | null = null
    if (readinessScore < 75) {
      const improvementNeeded = 75 - readinessScore
      // Assuming 1-2 points improvement per week with consistent practice
      estimatedDaysToReady = Math.ceil((improvementNeeded / 1.5) * 7)
    }

    return {
      readinessScore,
      category,
      factors: {
        scoreConsistency,
        accuracyTrend,
        syllabusCompletion,
        studyFrequency,
        weakAreasCount,
      },
      recommendations,
      estimatedDaysToReady,
    }
  } catch (error) {
    console.error('Error calculating readiness score:', error)
    throw new Error('Failed to calculate readiness score')
  }
}

/**
 * Calculate expected rank based on predicted score
 * Uses historical data to estimate rank
 *
 * @param userId - User or FreeUser ID
 * @param userType - Type of user ('user' or 'freeUser')
 * @returns Expected rank prediction
 */
export async function calculateExpectedRank(
  userId: string,
  userType: 'user' | 'freeUser' = 'freeUser'
): Promise<ExpectedRankResult | null> {
  try {
    // Get predicted score
    const prediction = await predictExamScore(userId, userType)

    if (!prediction) {
      return null
    }

    const predictedScore = prediction.predictedScore

    // Get all users' scores for comparison
    const allScores = await prisma.testSession.groupBy({
      by: ['userId', 'freeUserId'],
      where: {
        status: 'COMPLETED',
        totalScore: { not: null },
      },
      _max: {
        totalScore: true,
      },
    })

    const totalCandidates = allScores.length
    const scoresAbove = allScores.filter((s) => (s._max.totalScore || 0) > predictedScore).length

    const expectedRank = scoresAbove + 1
    const percentile =
      totalCandidates > 0
        ? Math.round(((totalCandidates - expectedRank) / totalCandidates) * 100 * 10) / 10
        : 0

    // Calculate confidence interval for rank
    const scoresAboveLower = allScores.filter(
      (s) => (s._max.totalScore || 0) > prediction.confidenceInterval.lower
    ).length
    const scoresAboveUpper = allScores.filter(
      (s) => (s._max.totalScore || 0) > prediction.confidenceInterval.upper
    ).length

    const confidenceInterval = {
      bestCase: scoresAboveUpper + 1,
      worstCase: scoresAboveLower + 1,
    }

    const factors = [
      `Based on ${prediction.dataPoints} recent test performances`,
      `${prediction.methodology.replace('_', ' ')} methodology`,
      `Confidence level: ${prediction.confidence}%`,
    ]

    if (prediction.trendFactor > 0) {
      factors.push('Showing positive improvement trend')
    } else if (prediction.trendFactor < 0) {
      factors.push('Showing declining trend - needs improvement')
    }

    return {
      expectedRank,
      confidenceInterval,
      percentile,
      totalCandidates,
      basedOnScore: predictedScore,
      factors,
    }
  } catch (error) {
    console.error('Error calculating expected rank:', error)
    throw new Error('Failed to calculate expected rank')
  }
}

/**
 * Prepare data for ML model integration
 * Exports structured data for training machine learning models
 *
 * @param userId - User or FreeUser ID
 * @param userType - Type of user ('user' or 'freeUser')
 * @returns Structured data for ML model
 */
export async function prepareMLData(
  userId: string,
  userType: 'user' | 'freeUser' = 'freeUser'
): Promise<{
  features: {
    recentScores: number[]
    accuracyHistory: number[]
    topicMastery: Record<string, number>
    studyTimePerDay: number[]
    testFrequency: number
    avgTimePerQuestion: number
    weakAreasCount: number
    strongAreasCount: number
  }
  target: {
    latestScore: number
    targetScore: number
  }
  metadata: {
    userId: string
    userType: string
    dataPoints: number
    lastUpdated: Date
  }
}> {
  try {
    const userField = userType === 'user' ? 'userId' : 'freeUserId'

    // Get recent scores
    const recentSessions = await prisma.testSession.findMany({
      where: {
        [userField]: userId,
        status: 'COMPLETED',
        totalScore: { not: null },
      },
      select: {
        totalScore: true,
        percentage: true,
        timeSpent: true,
        submittedAt: true,
      },
      orderBy: { submittedAt: 'desc' },
      take: 20,
    })

    const recentScores = recentSessions.map((s) => s.totalScore || 0)

    // Get accuracy history
    const responses = await prisma.userQuestionResponse.findMany({
      where: { [userField]: userId },
      select: { isCorrect: true, timeSpent: true },
      orderBy: { answeredAt: 'desc' },
      take: 100,
    })

    const accuracyHistory = calculateRollingAccuracy(responses)

    // Get topic mastery
    const topicProgress = await prisma.userProgress.findMany({
      where: { [userField]: userId },
      select: {
        topic: true,
        masteryScore: true,
        accuracy: true,
      },
    })

    const topicMastery: Record<string, number> = {}
    for (const progress of topicProgress) {
      topicMastery[progress.topic] = progress.masteryScore
    }

    // Calculate study time per day (last 30 days)
    const studyTimePerDay = await calculateDailyStudyTime(userId, userType, 30)

    // Test frequency (tests per week)
    const testFrequency =
      recentSessions.length > 0
        ? recentSessions.length / 4 // Assuming 4 weeks of data
        : 0

    // Average time per question
    const avgTimePerQuestion =
      responses.length > 0
        ? responses.reduce((sum, r) => sum + (r.timeSpent || 0), 0) / responses.length
        : 0

    // Weak and strong areas count
    const weakAreasCount = topicProgress.filter((p) => p.accuracy < 50).length
    const strongAreasCount = topicProgress.filter((p) => p.masteryScore >= 70).length

    return {
      features: {
        recentScores,
        accuracyHistory,
        topicMastery,
        studyTimePerDay,
        testFrequency,
        avgTimePerQuestion,
        weakAreasCount,
        strongAreasCount,
      },
      target: {
        latestScore: recentScores[0] || 0,
        targetScore: 600, // Default NEET target
      },
      metadata: {
        userId,
        userType,
        dataPoints: recentScores.length,
        lastUpdated: new Date(),
      },
    }
  } catch (error) {
    console.error('Error preparing ML data:', error)
    throw new Error('Failed to prepare ML data')
  }
}

/**
 * Helper: Perform linear regression on score data
 */
function linearRegression(scores: number[]): {
  slope: number
  intercept: number
  rSquared: number
} {
  const n = scores.length
  const x = Array.from({ length: n }, (_, i) => i)

  const sumX = x.reduce((sum, val) => sum + val, 0)
  const sumY = scores.reduce((sum, val) => sum + val, 0)
  const sumXY = x.reduce((sum, val, i) => sum + val * scores[i], 0)
  const sumX2 = x.reduce((sum, val) => sum + val * val, 0)
  const sumY2 = scores.reduce((sum, val) => sum + val * val, 0)

  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX)
  const intercept = (sumY - slope * sumX) / n

  // Calculate R-squared
  const meanY = sumY / n
  const ssTotal = scores.reduce((sum, y) => sum + Math.pow(y - meanY, 2), 0)
  const ssResidual = scores.reduce((sum, y, i) => {
    const predicted = slope * i + intercept
    return sum + Math.pow(y - predicted, 2)
  }, 0)
  const rSquared = 1 - ssResidual / ssTotal

  return { slope, intercept, rSquared: Math.max(0, rSquared) }
}

/**
 * Helper: Calculate standard deviation
 */
function calculateStandardDeviation(values: number[]): number {
  const mean = values.reduce((sum, val) => sum + val, 0) / values.length
  const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length
  return Math.sqrt(variance)
}

/**
 * Helper: Calculate consistency score
 */
function calculateConsistency(scores: number[]): number {
  if (scores.length < 2) return 0

  const stdDev = calculateStandardDeviation(scores)
  const mean = scores.reduce((sum, s) => sum + s, 0) / scores.length
  const coefficientOfVariation = mean > 0 ? (stdDev / mean) * 100 : 100

  // Lower CV = higher consistency
  return Math.max(0, Math.min(100, 100 - coefficientOfVariation))
}

/**
 * Helper: Calculate accuracy trend
 */
function calculateAccuracyTrend(
  responses: Array<{ isCorrect: boolean | null; answeredAt: Date }>
): number {
  if (responses.length < 10) return 0

  const recentAccuracy = responses.slice(0, 50)
  const olderAccuracy = responses.slice(50, 100)

  const recentCorrect = recentAccuracy.filter((r) => r.isCorrect).length
  const olderCorrect = olderAccuracy.filter((r) => r.isCorrect).length

  const recentRate = (recentCorrect / recentAccuracy.length) * 100
  const olderRate =
    olderAccuracy.length > 0 ? (olderCorrect / olderAccuracy.length) * 100 : recentRate

  return Math.max(0, Math.min(100, recentRate))
}

/**
 * Helper: Calculate syllabus completion score
 */
async function calculateSyllabusCompletionScore(
  userId: string,
  userType: 'user' | 'freeUser'
): Promise<number> {
  const userField = userType === 'user' ? 'userId' : 'freeUserId'

  const totalTopics = await prisma.userProgress.count({
    where: { [userField]: userId },
  })

  const completedTopics = await prisma.userProgress.count({
    where: {
      [userField]: userId,
      masteryScore: { gte: 70 },
    },
  })

  return totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0
}

/**
 * Helper: Calculate study frequency score
 */
async function calculateStudyFrequency(
  userId: string,
  userType: 'user' | 'freeUser'
): Promise<number> {
  const userField = userType === 'user' ? 'userId' : 'freeUserId'
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const activeDays = await prisma.testSession.findMany({
    where: {
      [userField]: userId,
      submittedAt: { gte: thirtyDaysAgo },
    },
    select: { submittedAt: true },
  })

  const uniqueDays = new Set(activeDays.map((d) => d.submittedAt?.toDateString())).size

  return Math.min(100, Math.round((uniqueDays / 30) * 100))
}

/**
 * Helper: Calculate daily study time
 */
async function calculateDailyStudyTime(
  userId: string,
  userType: 'user' | 'freeUser',
  days: number
): Promise<number[]> {
  const userField = userType === 'user' ? 'userId' : 'freeUserId'
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  const sessions = await prisma.testSession.findMany({
    where: {
      [userField]: userId,
      submittedAt: { gte: startDate },
    },
    select: {
      timeSpent: true,
      submittedAt: true,
    },
  })

  const dailyTime: number[] = Array(days).fill(0)

  for (const session of sessions) {
    if (session.submittedAt) {
      const dayIndex = Math.floor(
        (Date.now() - session.submittedAt.getTime()) / (1000 * 60 * 60 * 24)
      )
      if (dayIndex >= 0 && dayIndex < days) {
        dailyTime[days - dayIndex - 1] += Math.round((session.timeSpent || 0) / 60)
      }
    }
  }

  return dailyTime
}

/**
 * Helper: Calculate rolling accuracy
 */
function calculateRollingAccuracy(responses: Array<{ isCorrect: boolean | null }>): number[] {
  const windowSize = 10
  const accuracy: number[] = []

  for (let i = 0; i < responses.length - windowSize + 1; i++) {
    const window = responses.slice(i, i + windowSize)
    const correct = window.filter((r) => r.isCorrect).length
    accuracy.push(Math.round((correct / windowSize) * 100))
  }

  return accuracy
}

/**
 * Helper: Generate score recommendations
 */
function generateScoreRecommendation(
  predictedScore: number,
  trendFactor: number,
  dataPoints: number
): string {
  if (dataPoints < 5) {
    return 'Take more tests to improve prediction accuracy'
  }

  if (trendFactor > 5) {
    return 'Excellent improvement trend! Keep up the consistent practice'
  } else if (trendFactor > 0) {
    return 'Showing steady improvement. Focus on weak areas to accelerate growth'
  } else if (trendFactor < -5) {
    return 'Declining trend detected. Review recent weak areas and adjust study strategy'
  } else {
    return 'Performance is stable. Consider increasing difficulty to improve scores'
  }
}

/**
 * Helper: Generate readiness recommendations
 */
function generateReadinessRecommendations(factors: {
  readinessScore: number
  scoreConsistency: number
  accuracyTrend: number
  syllabusCompletion: number
  weakAreasCount: number
}): string[] {
  const recommendations: string[] = []

  if (factors.scoreConsistency < 60) {
    recommendations.push('Work on consistency by taking regular practice tests')
  }

  if (factors.accuracyTrend < 60) {
    recommendations.push('Focus on improving accuracy through topic-wise practice')
  }

  if (factors.syllabusCompletion < 70) {
    recommendations.push('Complete pending syllabus topics to improve overall readiness')
  }

  if (factors.weakAreasCount > 5) {
    recommendations.push(`Address ${factors.weakAreasCount} weak areas through targeted practice`)
  }

  if (factors.readinessScore >= 75) {
    recommendations.push(
      'Excellent readiness! Focus on maintaining performance and taking mock tests'
    )
  } else if (factors.readinessScore >= 60) {
    recommendations.push('Good progress! Increase practice intensity for better results')
  } else {
    recommendations.push('Requires significant preparation. Create a structured study plan')
  }

  return recommendations
}
