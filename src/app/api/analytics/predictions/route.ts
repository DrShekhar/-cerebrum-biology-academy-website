import { NextRequest, NextResponse } from 'next/server'
import { withOptionalAuth } from '@/lib/auth/middleware'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { unstable_cache } from 'next/cache'

// Query parameter validation schema
const querySchema = z.object({
  userId: z.string().optional(),
})

interface PredictedScore {
  biology: number
  neet: number
  confidence: number
}

interface Milestone {
  date: Date
  targetScore: number
  onTrack: boolean
}

interface PredictionsResponse {
  predictedScore: PredictedScore
  readinessScore: number
  expectedRank: number
  examDate: Date
  daysRemaining: number
  recommendedFocus: string[]
  milestones: Milestone[]
}

/**
 * Get default predictions for new users
 */
function getDefaultPredictions(): PredictionsResponse {
  const examDate = new Date('2025-05-15')
  const daysRemaining = Math.max(
    0,
    Math.floor((examDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
  )

  return {
    predictedScore: {
      biology: 0,
      neet: 0,
      confidence: 0.5,
    },
    readinessScore: 0,
    expectedRank: 0,
    examDate,
    daysRemaining,
    recommendedFocus: [
      'Start with Cell Biology basics',
      'Practice NCERT questions',
      'Build study routine',
    ],
    milestones: [],
  }
}

/**
 * Simple linear regression for score prediction
 */
function predictScore(
  testScores: number[],
  testDates: Date[]
): { predicted: number; confidence: number } {
  if (testScores.length < 3) {
    return { predicted: testScores[testScores.length - 1] || 0, confidence: 0.5 }
  }

  // Convert dates to timestamps for regression
  const timestamps = testDates.map((d) => d.getTime())
  const n = testScores.length

  // Calculate means
  const meanX = timestamps.reduce((sum, x) => sum + x, 0) / n
  const meanY = testScores.reduce((sum, y) => sum + y, 0) / n

  // Calculate slope and intercept
  let numerator = 0
  let denominator = 0

  for (let i = 0; i < n; i++) {
    numerator += (timestamps[i] - meanX) * (testScores[i] - meanY)
    denominator += (timestamps[i] - meanX) ** 2
  }

  const slope = denominator !== 0 ? numerator / denominator : 0
  const intercept = meanY - slope * meanX

  // Predict future score (30 days from now)
  const futureTimestamp = Date.now() + 30 * 24 * 60 * 60 * 1000
  const predicted = slope * futureTimestamp + intercept

  // Calculate confidence based on variance
  const variance = testScores.reduce((sum, score) => sum + (score - meanY) ** 2, 0) / n
  const confidence = Math.max(0.5, Math.min(0.95, 1 - variance / 1000))

  return { predicted: Math.max(0, Math.min(100, predicted)), confidence }
}

/**
 * Calculate exam readiness score based on multiple factors
 */
function calculateReadinessScore(
  averageScore: number,
  totalTests: number,
  studyStreak: number,
  syllabusCompletion: number,
  recentImprovement: number
): number {
  // Weighted scoring system
  const scoreWeight = 0.4
  const testCountWeight = 0.15
  const streakWeight = 0.15
  const syllabusWeight = 0.2
  const improvementWeight = 0.1

  const scoreComponent = (averageScore / 100) * scoreWeight
  const testCountComponent = Math.min(totalTests / 50, 1) * testCountWeight
  const streakComponent = Math.min(studyStreak / 30, 1) * streakWeight
  const syllabusComponent = (syllabusCompletion / 100) * syllabusWeight
  const improvementComponent = Math.max(0, Math.min(recentImprovement / 20, 1)) * improvementWeight

  const readinessScore =
    (scoreComponent +
      testCountComponent +
      streakComponent +
      syllabusComponent +
      improvementComponent) *
    100

  return Math.round(readinessScore)
}

/**
 * Predict user performance using ML-ready analytics
 */
async function generatePredictions(userId: string): Promise<PredictionsResponse> {
  try {
    // Fetch user data
    const user = await prisma.free_users.findUnique({
      where: { id: userId },
      include: {
        testAttempts: {
          where: { status: 'COMPLETED' },
          orderBy: { submittedAt: 'desc' },
          take: 30,
        },
        userProgress: true,
      },
    })

    // Return default predictions for new users
    if (!user || user.testAttempts.length === 0) {
      return getDefaultPredictions()
    }

    // Extract test scores and dates for prediction
    const testScores = user.testAttempts.map((t) => t.percentage)
    const testDates = user.testAttempts
      .map((t) => t.submittedAt)
      .filter((d): d is Date => d !== null)

    // Predict biology score
    const biologyPrediction = predictScore(testScores, testDates)

    // Predict NEET score (biology is 50% of NEET)
    const neetPrediction = {
      predicted: biologyPrediction.predicted * 7.2, // Scale to 720
      confidence: biologyPrediction.confidence,
    }

    // Calculate syllabus completion
    const totalTopics = user.userProgress.length
    const completedTopics = user.userProgress.filter((p) => p.masteryScore >= 80).length
    const syllabusCompletion = totalTopics > 0 ? (completedTopics / totalTopics) * 100 : 0

    // Calculate recent improvement
    const recentTests = user.testAttempts.slice(0, 5)
    const olderTests = user.testAttempts.slice(5, 10)
    const recentAvg =
      recentTests.length > 0
        ? recentTests.reduce((sum, t) => sum + t.percentage, 0) / recentTests.length
        : 0
    const olderAvg =
      olderTests.length > 0
        ? olderTests.reduce((sum, t) => sum + t.percentage, 0) / olderTests.length
        : 0
    const recentImprovement = recentAvg - olderAvg

    // Calculate readiness score
    const readinessScore = calculateReadinessScore(
      user.averageScore || 0,
      user.totalTestsTaken || 0,
      user.studyStreak || 0,
      syllabusCompletion,
      recentImprovement
    )

    // Calculate expected rank (mock calculation)
    const totalStudents = await prisma.free_users.count()
    const betterPerformers = await prisma.free_users.count({
      where: {
        averageScore: { gt: biologyPrediction.predicted },
      },
    })
    const expectedRank = Math.round(betterPerformers * 1.2) // Adjust for growth

    // Set exam date (mock - typically NEET is in May)
    const examDate = new Date('2025-05-15')
    const daysRemaining = Math.max(
      0,
      Math.floor((examDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    )

    // Identify weak areas for recommended focus
    const weakTopics = user.userProgress
      .filter((p) => p.masteryScore < 60 || p.accuracy < 70)
      .sort((a, b) => a.masteryScore - b.masteryScore)
      .slice(0, 5)
      .map((p) => p.topic)

    // Generate milestones (weekly targets)
    const milestones: Milestone[] = []
    const currentScore = user.averageScore || 0
    const targetScore = biologyPrediction.predicted
    const weeksRemaining = Math.max(1, Math.floor(daysRemaining / 7))
    const scoreIncrement = (targetScore - currentScore) / weeksRemaining

    for (let i = 1; i <= Math.min(weeksRemaining, 12); i++) {
      const milestoneDate = new Date()
      milestoneDate.setDate(milestoneDate.getDate() + i * 7)

      const milestoneTarget = currentScore + scoreIncrement * i

      // Check if on track (based on recent tests)
      const recentAverage =
        recentTests.length > 0
          ? recentTests.reduce((sum, t) => sum + t.percentage, 0) / recentTests.length
          : 0
      const expectedAtThisPoint = currentScore + scoreIncrement * Math.min(i, 4)
      const onTrack = recentAverage >= expectedAtThisPoint - 5 // 5% tolerance

      milestones.push({
        date: milestoneDate,
        targetScore: Math.round(milestoneTarget * 10) / 10,
        onTrack,
      })
    }

    return {
      predictedScore: {
        biology: Math.round(biologyPrediction.predicted * 3.6), // Scale to 360
        neet: Math.round(neetPrediction.predicted),
        confidence: Math.round(biologyPrediction.confidence * 100) / 100,
      },
      readinessScore,
      expectedRank,
      examDate,
      daysRemaining,
      recommendedFocus: weakTopics,
      milestones,
    }
  } catch (error) {
    console.error('Error generating predictions:', error)
    throw error
  }
}

/**
 * GET /api/analytics/predictions
 * Generate ML-ready predictions for user performance
 */
export const GET = withOptionalAuth(async (request: NextRequest, session) => {
  try {
    const { searchParams } = new URL(request.url)
    const userIdParam = searchParams.get('userId')

    // Use authenticated user ID or provided userId
    const userId = userIdParam || session?.userId

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID required', message: 'userId parameter or authentication required' },
        { status: 400 }
      )
    }

    // Validate query parameters
    const validationResult = querySchema.safeParse({ userId })
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Invalid parameters',
          details: validationResult.error.issues,
        },
        { status: 400 }
      )
    }

    // Create cached version of predictions
    const getCachedPredictions = unstable_cache(
      async (uid: string) => generatePredictions(uid),
      ['user-predictions'],
      { revalidate: 3600, tags: [`user-${userId}`] }
    )

    // Generate predictions
    const predictions = await getCachedPredictions(userId)

    return NextResponse.json(
      {
        success: true,
        data: predictions,
        generatedAt: new Date(),
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('API Error - Predictions:', error)
    return NextResponse.json(
      {
        error: 'Failed to generate predictions',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
})
