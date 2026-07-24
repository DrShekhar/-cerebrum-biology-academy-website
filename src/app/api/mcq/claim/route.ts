/**
 * POST /api/mcq/claim — link anonymous MCQ practice history to the signed-in
 * account.
 *
 * MCQ practice identifies guests by a localStorage `mcq_free_user_id`; before
 * this endpoint existed, signing up LOST the entire practice history (stats,
 * XP, streak, badges stayed keyed to the anonymous id forever). The client
 * calls this once after login with its stored freeUserId:
 *
 * - account has no stats row  → the guest row is claimed (userId stamped)
 * - account already has a row → guest progress is MERGED in (counters summed,
 *   streaks/mastery/badges combined, level recomputed) and the guest row
 *   deleted. Practice sessions are re-keyed either way.
 *
 * Idempotent: claiming an already-linked or nonexistent freeUserId is a no-op.
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import {
  getLevelProgress,
  identifyWeakAndStrongTopics,
  calculateAccuracy,
} from '@/lib/mcq/gamification'
import type { Prisma } from '@/generated/prisma'

type TopicMastery = Record<string, { attempted: number; correct: number; mastery: number }>

function mergeMastery(a: TopicMastery, b: TopicMastery): TopicMastery {
  const merged: TopicMastery = { ...a }
  for (const [topic, stats] of Object.entries(b)) {
    const prior = merged[topic]
    const attempted = (prior?.attempted || 0) + stats.attempted
    const correct = (prior?.correct || 0) + stats.correct
    merged[topic] = {
      attempted,
      correct,
      mastery: attempted > 0 ? Math.round((correct / attempted) * 100) : 0,
    }
  }
  return merged
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    const userId = session?.user?.id
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }

    const body = await request.json().catch(() => ({}) as Record<string, unknown>)
    const freeUserId = typeof body.freeUserId === 'string' ? body.freeUserId : null
    if (!freeUserId) {
      return NextResponse.json({ success: false, error: 'freeUserId required' }, { status: 400 })
    }

    const guestStats = await prisma.mcq_user_stats.findUnique({ where: { freeUserId } })
    if (!guestStats) {
      return NextResponse.json({ success: true, claimed: false, message: 'No practice history' })
    }

    if (guestStats.userId === userId) {
      return NextResponse.json({ success: true, claimed: true, message: 'Already linked' })
    }
    if (guestStats.userId && guestStats.userId !== userId) {
      // The guest profile is linked to a DIFFERENT account — never reassign.
      return NextResponse.json(
        { success: false, error: 'This practice history belongs to another account' },
        { status: 403 }
      )
    }

    const accountStats = await prisma.mcq_user_stats.findUnique({ where: { userId } })

    if (!accountStats) {
      // Simple claim: stamp the account onto the guest row.
      await prisma.$transaction([
        prisma.mcq_user_stats.update({
          where: { id: guestStats.id },
          data: { userId },
        }),
        prisma.mcq_practice_sessions.updateMany({
          where: { freeUserId },
          data: { userId },
        }),
      ])
      return NextResponse.json({
        success: true,
        claimed: true,
        merged: false,
        message: 'Practice history linked to your account',
      })
    }

    // Merge guest progress into the existing account row, then remove the
    // guest row (its freeUserId is freed so future anonymous use starts clean).
    const totalQuestions = accountStats.totalQuestions + guestStats.totalQuestions
    const correctAnswers = accountStats.correctAnswers + guestStats.correctAnswers
    const totalXp = accountStats.totalXp + guestStats.totalXp
    const mergedMastery = mergeMastery(
      (accountStats.topicMastery as TopicMastery) || {},
      (guestStats.topicMastery as TopicMastery) || {}
    )
    const { weakTopics, strongTopics } = identifyWeakAndStrongTopics(mergedMastery)
    const mergedBadges = Array.from(
      new Set([
        ...((accountStats.badges as string[]) || []),
        ...((guestStats.badges as string[]) || []),
      ])
    )
    const lastPracticeDate =
      [accountStats.lastPracticeDate, guestStats.lastPracticeDate]
        .filter((d): d is Date => d != null)
        .sort((a, b) => b.getTime() - a.getTime())[0] || null
    const levelInfo = getLevelProgress(totalXp)

    await prisma.$transaction([
      prisma.mcq_user_stats.update({
        where: { id: accountStats.id },
        data: {
          totalQuestions,
          correctAnswers,
          accuracy: calculateAccuracy(correctAnswers, totalQuestions),
          totalXp,
          currentLevel: levelInfo.currentLevel.level,
          levelProgress: levelInfo.progress,
          currentStreak: Math.max(accountStats.currentStreak, guestStats.currentStreak),
          longestStreak: Math.max(accountStats.longestStreak, guestStats.longestStreak),
          lastPracticeDate,
          dailyChallengesTotal: accountStats.dailyChallengesTotal + guestStats.dailyChallengesTotal,
          questionsSubmitted: accountStats.questionsSubmitted + guestStats.questionsSubmitted,
          questionsApproved: accountStats.questionsApproved + guestStats.questionsApproved,
          topicMastery: mergedMastery as unknown as Prisma.InputJsonValue,
          weakTopics,
          strongTopics,
          badges: mergedBadges as unknown as Prisma.InputJsonValue,
        },
      }),
      prisma.mcq_practice_sessions.updateMany({
        where: { freeUserId },
        data: { userId },
      }),
      prisma.mcq_user_stats.delete({ where: { id: guestStats.id } }),
    ])

    return NextResponse.json({
      success: true,
      claimed: true,
      merged: true,
      message: 'Practice history merged into your account',
    })
  } catch (error) {
    console.error('MCQ claim error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to link practice history' },
      { status: 500 }
    )
  }
}
