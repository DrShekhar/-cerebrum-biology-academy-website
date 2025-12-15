import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getLevelProgress, BADGE_DEFINITIONS } from '@/lib/mcq/gamification'
import type { UserStats } from '@/lib/mcq/types'

export const dynamic = 'force-dynamic'

// GET /api/mcq/stats - Get user stats
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const freeUserId = searchParams.get('freeUserId')

    if (!freeUserId) {
      return NextResponse.json({ success: false, error: 'freeUserId is required' }, { status: 400 })
    }

    let userStats = await prisma.mcq_user_stats.findUnique({
      where: { freeUserId },
    })

    if (!userStats) {
      // Create new stats for the user
      userStats = await prisma.mcq_user_stats.create({
        data: {
          freeUserId,
          totalQuestions: 0,
          correctAnswers: 0,
          accuracy: 0,
          currentStreak: 0,
          longestStreak: 0,
          totalXp: 0,
          currentLevel: 1,
          levelProgress: 0,
          topicMastery: {},
          badges: [],
        },
      })
    }

    // Get level details
    const levelDetails = getLevelProgress(userStats.totalXp)

    // Get badge details
    const badgeCodes = (userStats.badges as string[]) || []
    const badges = badgeCodes
      .map((code) => BADGE_DEFINITIONS.find((b) => b.code === code))
      .filter(Boolean)

    const stats: UserStats & {
      levelDetails: typeof levelDetails
      badgeDetails: typeof badges
    } = {
      id: userStats.id,
      freeUserId: userStats.freeUserId || undefined,
      userId: userStats.userId || undefined,
      totalQuestions: userStats.totalQuestions,
      correctAnswers: userStats.correctAnswers,
      accuracy: userStats.accuracy,
      currentStreak: userStats.currentStreak,
      longestStreak: userStats.longestStreak,
      lastPracticeDate: userStats.lastPracticeDate || undefined,
      totalXp: userStats.totalXp,
      currentLevel: userStats.currentLevel,
      levelProgress: userStats.levelProgress,
      dailyChallengeCompleted: userStats.dailyChallengeCompleted,
      dailyChallengeDate: userStats.dailyChallengeDate || undefined,
      dailyChallengesTotal: userStats.dailyChallengesTotal,
      questionsSubmitted: userStats.questionsSubmitted,
      questionsApproved: userStats.questionsApproved,
      errorsReported: userStats.errorsReported,
      errorsAccepted: userStats.errorsAccepted,
      contributorRank: userStats.contributorRank || undefined,
      topicMastery:
        (userStats.topicMastery as Record<
          string,
          { attempted: number; correct: number; mastery: number }
        >) || undefined,
      weakTopics: (userStats.weakTopics as string[]) || undefined,
      strongTopics: (userStats.strongTopics as string[]) || undefined,
      badges: badgeCodes,
      levelDetails,
      badgeDetails: badges,
    }

    return NextResponse.json({
      success: true,
      data: stats,
    })
  } catch (error) {
    console.error('Error fetching MCQ stats:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch stats',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

// POST /api/mcq/stats/session - Create a new practice session
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { freeUserId, topic, difficulty, isPYQOnly, pyqYear, deviceFingerprint, userAgent } = body

    // Generate a session token
    const sessionToken = generateSessionToken()

    const session = await prisma.mcq_practice_sessions.create({
      data: {
        freeUserId: freeUserId || null,
        sessionToken,
        topic: topic || null,
        difficulty: difficulty || null,
        isPYQOnly: isPYQOnly || false,
        pyqYear: pyqYear || null,
        questionsAttempted: 0,
        correctAnswers: 0,
        timeSpent: 0,
        xpEarned: 0,
        leadCaptured: false,
        deviceFingerprint: deviceFingerprint || null,
        userAgent: userAgent || null,
        startedAt: new Date(),
      },
    })

    return NextResponse.json({
      success: true,
      data: {
        sessionId: session.id,
        sessionToken: session.sessionToken,
      },
    })
  } catch (error) {
    console.error('Error creating practice session:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create session',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

function generateSessionToken(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const timestamp = Date.now().toString(36)
  let random = ''
  for (let i = 0; i < 16; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return `mcq_${timestamp}_${random}`
}
