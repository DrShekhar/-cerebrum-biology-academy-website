import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { BIOLOGY_TOPICS } from '@/lib/mcq/types'

interface TopicStats {
  topic: string
  attempted: number
  correct: number
  accuracy: number
  mastery: number
  avgTimeSpent: number
  lastPracticed: Date | null
  trend: 'improving' | 'stable' | 'declining' | 'new'
}

interface DailyProgress {
  date: string
  questionsAttempted: number
  correctAnswers: number
  accuracy: number
  xpEarned: number
}

interface AnalyticsData {
  topicStats: TopicStats[]
  weakTopics: string[]
  strongTopics: string[]
  overallStats: {
    totalQuestions: number
    correctAnswers: number
    accuracy: number
    averageTimePerQuestion: number
    totalTimeSpent: number
    currentStreak: number
    longestStreak: number
  }
  dailyProgress: DailyProgress[]
  recommendedTopics: string[]
  reviewStats: {
    totalScheduled: number
    dueToday: number
    masteredCount: number
  }
}

/**
 * GET /api/mcq/analytics
 * Get detailed analytics for a user
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const freeUserId = searchParams.get('freeUserId')
    const days = parseInt(searchParams.get('days') || '30')

    if (!freeUserId) {
      return NextResponse.json({ success: false, error: 'freeUserId is required' }, { status: 400 })
    }

    // Get user stats
    const userStats = await prisma.mcq_user_stats.findUnique({
      where: { freeUserId },
    })

    if (!userStats) {
      return NextResponse.json({
        success: true,
        data: getEmptyAnalytics(),
      })
    }

    // Get topic mastery data
    const topicMastery =
      (userStats.topicMastery as Record<
        string,
        { attempted: number; correct: number; mastery: number }
      >) || {}

    // Calculate topic stats
    const topicStats: TopicStats[] = BIOLOGY_TOPICS.map((topic) => {
      const stats = topicMastery[topic] || { attempted: 0, correct: 0, mastery: 0 }
      const accuracy = stats.attempted > 0 ? Math.round((stats.correct / stats.attempted) * 100) : 0

      const trend: TopicStats['trend'] =
        stats.attempted < 5
          ? 'new'
          : accuracy >= 70
            ? 'improving'
            : accuracy >= 50
              ? 'stable'
              : 'declining'

      return {
        topic,
        attempted: stats.attempted,
        correct: stats.correct,
        accuracy,
        mastery: stats.mastery || 0,
        avgTimeSpent: 30, // Default, could be calculated from responses
        lastPracticed: null,
        trend,
      }
    }).sort((a, b) => b.attempted - a.attempted)

    // Identify weak and strong topics
    const practisedTopics = topicStats.filter((t) => t.attempted >= 5)
    const weakTopics = practisedTopics.filter((t) => t.accuracy < 60).map((t) => t.topic)
    const strongTopics = practisedTopics.filter((t) => t.accuracy >= 80).map((t) => t.topic)

    // Get daily progress for the last N days
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    const dailyResponses = await prisma.user_question_responses.groupBy({
      by: ['answeredAt'],
      where: {
        freeUserId,
        answeredAt: { gte: startDate },
      },
      _count: { id: true },
      _sum: { xpEarned: true },
    })

    // Aggregate by day
    const dailyMap = new Map<string, DailyProgress>()
    for (let i = 0; i < days; i++) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]
      dailyMap.set(dateStr, {
        date: dateStr,
        questionsAttempted: 0,
        correctAnswers: 0,
        accuracy: 0,
        xpEarned: 0,
      })
    }

    // Get correct answers count per day
    const correctByDay = await prisma.user_question_responses.groupBy({
      by: ['answeredAt'],
      where: {
        freeUserId,
        answeredAt: { gte: startDate },
        isCorrect: true,
      },
      _count: { id: true },
    })

    // Process responses into daily buckets
    dailyResponses.forEach((r) => {
      if (r.answeredAt) {
        const dateStr = r.answeredAt.toISOString().split('T')[0]
        const existing = dailyMap.get(dateStr)
        if (existing) {
          existing.questionsAttempted += r._count.id
          existing.xpEarned += r._sum.xpEarned || 0
        }
      }
    })

    correctByDay.forEach((r) => {
      if (r.answeredAt) {
        const dateStr = r.answeredAt.toISOString().split('T')[0]
        const existing = dailyMap.get(dateStr)
        if (existing) {
          existing.correctAnswers += r._count.id
        }
      }
    })

    // Calculate accuracy for each day
    const dailyProgress = Array.from(dailyMap.values())
      .map((d) => ({
        ...d,
        accuracy:
          d.questionsAttempted > 0
            ? Math.round((d.correctAnswers / d.questionsAttempted) * 100)
            : 0,
      }))
      .sort((a, b) => a.date.localeCompare(b.date))

    // Get review stats
    const now = new Date()
    const reviewStats = {
      totalScheduled: await prisma.question_review_schedule.count({
        where: { freeUserId },
      }),
      dueToday: await prisma.question_review_schedule.count({
        where: {
          freeUserId,
          nextReviewAt: { lte: now },
        },
      }),
      masteredCount: await prisma.question_review_schedule.count({
        where: {
          freeUserId,
          repetitions: { gte: 5 },
          easeFactor: { gte: 2.3 },
        },
      }),
    }

    // Generate recommended topics (weak topics or least practiced)
    const recommendedTopics = [
      ...weakTopics.slice(0, 3),
      ...topicStats
        .filter((t) => t.attempted < 10 && !weakTopics.includes(t.topic))
        .slice(0, 2)
        .map((t) => t.topic),
    ].slice(0, 5)

    // Calculate overall stats
    const totalTimeSpent = userStats.totalQuestions * 30 // Estimate based on 30s avg

    const analyticsData: AnalyticsData = {
      topicStats,
      weakTopics,
      strongTopics,
      overallStats: {
        totalQuestions: userStats.totalQuestions,
        correctAnswers: userStats.correctAnswers,
        accuracy: userStats.accuracy,
        averageTimePerQuestion: 30,
        totalTimeSpent,
        currentStreak: userStats.currentStreak,
        longestStreak: userStats.longestStreak,
      },
      dailyProgress,
      recommendedTopics,
      reviewStats,
    }

    return NextResponse.json({
      success: true,
      data: analyticsData,
    })
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}

function getEmptyAnalytics(): AnalyticsData {
  return {
    topicStats: BIOLOGY_TOPICS.map((topic) => ({
      topic,
      attempted: 0,
      correct: 0,
      accuracy: 0,
      mastery: 0,
      avgTimeSpent: 0,
      lastPracticed: null,
      trend: 'new' as const,
    })),
    weakTopics: [],
    strongTopics: [],
    overallStats: {
      totalQuestions: 0,
      correctAnswers: 0,
      accuracy: 0,
      averageTimePerQuestion: 0,
      totalTimeSpent: 0,
      currentStreak: 0,
      longestStreak: 0,
    },
    dailyProgress: [],
    recommendedTopics: BIOLOGY_TOPICS.slice(0, 5),
    reviewStats: {
      totalScheduled: 0,
      dueToday: 0,
      masteredCount: 0,
    },
  }
}
