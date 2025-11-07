import { NextRequest, NextResponse } from 'next/server'
import { withOptionalAuth } from '@/lib/auth/middleware'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { unstable_cache } from 'next/cache'

// Query parameter validation schema
const querySchema = z.object({
  userId: z.string().optional(),
})

// Progress calculation types
interface BiologyScore {
  current: number
  target: number
  improvement: number
}

interface NEETScore {
  current: number
  target: number
  improvement: number
  rank: number
  percentile: number
}

interface ComponentScores {
  zoology: number
  botany: number
  physics: number
  chemistry: number
}

interface SyllabusProgress {
  completed: number
  total: number
  percentage: number
}

interface StudyHours {
  total: number
  thisWeek: number
  target: number
  percentage: number
}

interface Streak {
  current: number
  best: number
  lastActive: Date
}

interface StrongArea {
  topic: string
  accuracy: number
  masteryScore: number
}

interface WeakArea {
  topic: string
  difficulty: string
  accuracy: number
  recommendedTime: number
  lastPracticed: Date | null
}

interface UserProgressResponse {
  biologyScore: BiologyScore
  neetScore: NEETScore
  componentScores: ComponentScores
  syllabus: SyllabusProgress
  studyHours: StudyHours
  streak: Streak
  strongAreas: StrongArea[]
  weakAreas: WeakArea[]
  lastUpdated: Date
}

/**
 * Get default progress data for new users
 */
function getDefaultProgressData(): UserProgressResponse {
  return {
    biologyScore: {
      current: 0,
      target: 360,
      improvement: 0,
    },
    neetScore: {
      current: 0,
      target: 720,
      improvement: 0,
      rank: 0,
      percentile: 0,
    },
    componentScores: {
      zoology: 0,
      botany: 0,
      physics: 0,
      chemistry: 0,
    },
    syllabus: {
      completed: 0,
      total: 100,
      percentage: 0,
    },
    studyHours: {
      total: 0,
      thisWeek: 0,
      target: 400,
      percentage: 0,
    },
    streak: {
      current: 0,
      best: 0,
      lastActive: new Date(),
    },
    strongAreas: [],
    weakAreas: [],
    lastUpdated: new Date(),
  }
}

/**
 * Calculate comprehensive user progress metrics
 */
async function calculateUserProgress(userId: string): Promise<UserProgressResponse> {
  try {
    // Fetch user data
    const user = await prisma.freeUser.findUnique({
      where: { id: userId },
      include: {
        testAttempts: {
          where: { status: 'COMPLETED' },
          orderBy: { submittedAt: 'desc' },
          take: 50,
        },
        userProgress: true,
      },
    })

    // Return default data for new users
    if (!user) {
      return getDefaultProgressData()
    }

    // Calculate biology score (average of recent tests)
    const recentTests = user.testAttempts.slice(0, 10)
    const biologyTests = recentTests.filter((t) =>
      ['biology', 'botany', 'zoology'].includes(t.difficulty?.toLowerCase() || '')
    )
    const currentBiologyScore =
      biologyTests.length > 0
        ? biologyTests.reduce((sum, t) => sum + t.percentage, 0) / biologyTests.length
        : 0

    // Calculate improvement (compare last 5 vs previous 5 tests)
    const last5 = recentTests.slice(0, 5)
    const previous5 = recentTests.slice(5, 10)
    const last5Avg =
      last5.length > 0 ? last5.reduce((sum, t) => sum + t.percentage, 0) / last5.length : 0
    const previous5Avg =
      previous5.length > 0
        ? previous5.reduce((sum, t) => sum + t.percentage, 0) / previous5.length
        : 0
    const improvement = last5Avg - previous5Avg

    // NEET score calculation (scaled to 720)
    const neetScoreCurrent = Math.round((currentBiologyScore / 100) * 360)
    const neetScoreTarget = 720

    // Calculate rank and percentile (mock - replace with actual calculation)
    const totalStudents = await prisma.freeUser.count()
    const betterPerformers = await prisma.freeUser.count({
      where: {
        averageScore: { gt: user.averageScore || 0 },
      },
    })
    const rank = betterPerformers + 1
    const percentile = ((totalStudents - rank) / totalStudents) * 100

    // Component scores from test attempts
    const componentScores: ComponentScores = {
      zoology: 0,
      botany: 0,
      physics: 0,
      chemistry: 0,
    }

    // Calculate component scores from topic-wise data
    recentTests.forEach((test) => {
      if (test.topicWiseScore) {
        const topicScores = test.topicWiseScore as Record<string, number>
        Object.entries(topicScores).forEach(([topic, score]) => {
          const topicLower = topic.toLowerCase()
          if (topicLower.includes('zoology') || topicLower.includes('animal')) {
            componentScores.zoology += score
          } else if (topicLower.includes('botany') || topicLower.includes('plant')) {
            componentScores.botany += score
          } else if (topicLower.includes('physics')) {
            componentScores.physics += score
          } else if (topicLower.includes('chemistry')) {
            componentScores.chemistry += score
          }
        })
      }
    })

    // Normalize component scores
    const testCount = recentTests.length || 1
    componentScores.zoology = Math.round(componentScores.zoology / testCount)
    componentScores.botany = Math.round(componentScores.botany / testCount)
    componentScores.physics = Math.round(componentScores.physics / testCount)
    componentScores.chemistry = Math.round(componentScores.chemistry / testCount)

    // Syllabus progress
    const totalTopics = await prisma.userProgress.count({
      where: {
        OR: [{ freeUserId: userId }, { userId: userId }],
      },
    })
    const completedTopics = await prisma.userProgress.count({
      where: {
        OR: [{ freeUserId: userId }, { userId: userId }],
        masteryScore: { gte: 80 },
      },
    })
    const syllabusPercentage = totalTopics > 0 ? (completedTopics / totalTopics) * 100 : 0

    // Study hours calculation
    const totalTimeSpent = user.testAttempts.reduce((sum, t) => sum + (t.timeSpent || 0), 0)
    const totalHours = Math.round(totalTimeSpent / 3600)

    // Calculate this week's study time
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
    const thisWeekTests = user.testAttempts.filter(
      (t) => t.submittedAt && t.submittedAt >= oneWeekAgo
    )
    const thisWeekTime = thisWeekTests.reduce((sum, t) => sum + (t.timeSpent || 0), 0)
    const thisWeekHours = Math.round(thisWeekTime / 3600)

    // Streak calculation
    const streak: Streak = {
      current: user.studyStreak || 0,
      best: 30, // Mock - should be tracked separately
      lastActive: user.lastActiveDate || new Date(),
    }

    // Strong areas (topics with high mastery)
    const strongAreas: StrongArea[] = user.userProgress
      .filter((p) => p.masteryScore >= 80 && p.accuracy >= 80)
      .sort((a, b) => b.masteryScore - a.masteryScore)
      .slice(0, 5)
      .map((p) => ({
        topic: p.topic,
        accuracy: Math.round(p.accuracy),
        masteryScore: Math.round(p.masteryScore),
      }))

    // Weak areas (topics needing improvement)
    const weakAreas: WeakArea[] = user.userProgress
      .filter((p) => p.masteryScore < 60 || p.accuracy < 70)
      .sort((a, b) => a.masteryScore - b.masteryScore)
      .slice(0, 5)
      .map((p) => ({
        topic: p.topic,
        difficulty: p.currentLevel || 'MEDIUM',
        accuracy: Math.round(p.accuracy),
        recommendedTime: 120, // Mock - 2 hours recommended
        lastPracticed: p.lastPracticed,
      }))

    return {
      biologyScore: {
        current: Math.round(currentBiologyScore * 3.6), // Scale to 360
        target: 360,
        improvement: Math.round(improvement),
      },
      neetScore: {
        current: neetScoreCurrent,
        target: neetScoreTarget,
        improvement: Math.round(improvement),
        rank: rank,
        percentile: Math.round(percentile * 10) / 10,
      },
      componentScores,
      syllabus: {
        completed: completedTopics,
        total: totalTopics || 100,
        percentage: Math.round(syllabusPercentage),
      },
      studyHours: {
        total: totalHours,
        thisWeek: thisWeekHours,
        target: 400,
        percentage: Math.round((totalHours / 400) * 100),
      },
      streak,
      strongAreas,
      weakAreas,
      lastUpdated: new Date(),
    }
  } catch (error) {
    console.error('Error calculating user progress:', error)
    throw error
  }
}

/**
 * GET /api/user/progress
 * Fetch comprehensive user progress data with caching
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
          details: validationResult.error.errors,
        },
        { status: 400 }
      )
    }

    // Create cached version of progress calculation
    const getCachedProgress = unstable_cache(
      async (uid: string) => calculateUserProgress(uid),
      ['user-progress'],
      { revalidate: 300, tags: [`user-${userId}`] }
    )

    // Fetch progress data
    const progressData = await getCachedProgress(userId)

    return NextResponse.json(
      {
        success: true,
        data: progressData,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('API Error - User Progress:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch progress',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
})
