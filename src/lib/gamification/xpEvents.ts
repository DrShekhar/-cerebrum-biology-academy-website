/**
 * XP Events Service
 * Event sourcing for XP tracking - records every XP gain/loss
 *
 * Features:
 * - Track all XP events with detailed metadata
 * - Calculate XP breakdown by category
 * - Support for XP milestones and bonuses
 * - Analytics and reporting
 */

import { prisma } from '@/lib/prisma'
import { XpEventType } from '@/types/prisma-enums'

// XP Reward Constants
export const XP_REWARDS = {
  // MCQ Related
  MCQ_CORRECT_EASY: 5,
  MCQ_CORRECT_MEDIUM: 10,
  MCQ_CORRECT_HARD: 15,
  MCQ_FIRST_ATTEMPT_BONUS: 5,
  MCQ_STREAK_BONUS_BASE: 2, // Per streak multiplier
  MCQ_PERFECT_SESSION: 25, // All correct in a session

  // Test Related
  TEST_COMPLETED: 50,
  TEST_SCORE_90_PLUS: 100,
  TEST_SCORE_80_PLUS: 50,
  TEST_PERFECT_SCORE: 200,

  // Daily Activities
  DAILY_CHALLENGE_COMPLETE: 30,
  DAILY_LOGIN: 5,
  FIRST_PRACTICE_OF_DAY: 10,

  // Assignments & Classes
  ASSIGNMENT_SUBMITTED: 20,
  ASSIGNMENT_PERFECT: 50,
  CLASS_ATTENDED: 15,
  CLASS_FULL_ATTENDANCE_WEEK: 75,

  // Achievements
  STREAK_MILESTONE_7: 50,
  STREAK_MILESTONE_14: 100,
  STREAK_MILESTONE_30: 250,
  STREAK_MILESTONE_60: 500,
  STREAK_MILESTONE_90: 1000,
  STREAK_MILESTONE_180: 2500,
  STREAK_MILESTONE_365: 5000,

  BADGE_EARNED: 25,
  LEVEL_UP: 50,

  // Social & Contribution
  REFERRAL: 100,
  CONTRIBUTOR_BONUS: 50,
  SPECIAL_EVENT: 100, // Variable based on event
}

export interface XpEvent {
  id: string
  userId: string
  eventType: XpEventType
  xpAmount: number
  description: string
  metadata: Record<string, unknown>
  createdAt: Date
}

export interface XpBreakdown {
  total: number
  byCategory: {
    mcq: number
    tests: number
    assignments: number
    classes: number
    streaks: number
    badges: number
    other: number
  }
  byPeriod: {
    today: number
    thisWeek: number
    thisMonth: number
    allTime: number
  }
}

export interface RecordXpEventParams {
  userId: string
  eventType: XpEventType
  xpAmount: number
  description: string
  metadata?: Record<string, unknown>
  relatedEntityId?: string
  relatedEntityType?: string
}

/**
 * Record an XP event and update user's total points
 */
export async function recordXpEvent(params: RecordXpEventParams): Promise<XpEvent> {
  const { userId, eventType, xpAmount, description, metadata = {}, relatedEntityId, relatedEntityType } = params

  const [event] = await prisma.$transaction([
    prisma.gamification_xp_events.create({
      data: {
        userId,
        eventType,
        xpAmount,
        description,
        metadata,
        relatedEntityId,
        relatedEntityType,
      },
    }),
    prisma.mcq_user_stats.upsert({
      where: { userId },
      create: {
        userId,
        totalPoints: xpAmount,
        totalQuestions: 0,
        correctAnswers: 0,
        currentStreak: 0,
        longestStreak: 0,
        currentLevel: 1,
        badgesEarned: [],
        weeklyXp: xpAmount,
        monthlyXp: xpAmount,
      },
      update: {
        totalPoints: { increment: xpAmount },
        weeklyXp: { increment: xpAmount },
        monthlyXp: { increment: xpAmount },
      },
    }),
  ])

  // Check for level up
  await checkAndAwardLevelUp(userId)

  // Check for XP milestones
  await checkXpMilestones(userId)

  return event as XpEvent
}

/**
 * Record XP for answering an MCQ correctly
 */
export async function recordMcqXp(
  userId: string,
  params: {
    difficulty: 'EASY' | 'MEDIUM' | 'HARD'
    isFirstAttempt: boolean
    currentStreak: number
    sessionId?: string
    questionId?: string
  }
): Promise<XpEvent> {
  const { difficulty, isFirstAttempt, currentStreak, sessionId, questionId } = params

  // Base XP by difficulty
  let baseXp = XP_REWARDS.MCQ_CORRECT_EASY
  if (difficulty === 'MEDIUM') baseXp = XP_REWARDS.MCQ_CORRECT_MEDIUM
  if (difficulty === 'HARD') baseXp = XP_REWARDS.MCQ_CORRECT_HARD

  // First attempt bonus
  const firstAttemptBonus = isFirstAttempt ? XP_REWARDS.MCQ_FIRST_ATTEMPT_BONUS : 0

  // Streak bonus (caps at 10x)
  const streakMultiplier = Math.min(currentStreak, 10)
  const streakBonus = streakMultiplier * XP_REWARDS.MCQ_STREAK_BONUS_BASE

  const totalXp = baseXp + firstAttemptBonus + streakBonus

  return recordXpEvent({
    userId,
    eventType: 'MCQ_CORRECT',
    xpAmount: totalXp,
    description: `Correct ${difficulty.toLowerCase()} MCQ answer`,
    metadata: {
      difficulty,
      isFirstAttempt,
      currentStreak,
      baseXp,
      firstAttemptBonus,
      streakBonus,
    },
    relatedEntityId: questionId || sessionId,
    relatedEntityType: questionId ? 'mcq_question' : 'mcq_session',
  })
}

/**
 * Record XP for completing a test
 */
export async function recordTestXp(
  userId: string,
  params: {
    testId: string
    score: number
    totalMarks: number
    isPerfect: boolean
  }
): Promise<XpEvent[]> {
  const { testId, score, totalMarks, isPerfect } = params
  const events: XpEvent[] = []
  const percentage = (score / totalMarks) * 100

  // Base completion XP
  events.push(
    await recordXpEvent({
      userId,
      eventType: 'TEST_COMPLETED',
      xpAmount: XP_REWARDS.TEST_COMPLETED,
      description: 'Test completed',
      metadata: { testId, score, totalMarks, percentage },
      relatedEntityId: testId,
      relatedEntityType: 'test',
    })
  )

  // Bonus for high scores
  if (isPerfect) {
    events.push(
      await recordXpEvent({
        userId,
        eventType: 'TEST_COMPLETED',
        xpAmount: XP_REWARDS.TEST_PERFECT_SCORE,
        description: 'Perfect score bonus!',
        metadata: { testId, score, totalMarks },
        relatedEntityId: testId,
        relatedEntityType: 'test',
      })
    )
  } else if (percentage >= 90) {
    events.push(
      await recordXpEvent({
        userId,
        eventType: 'TEST_COMPLETED',
        xpAmount: XP_REWARDS.TEST_SCORE_90_PLUS,
        description: '90%+ score bonus',
        metadata: { testId, score, totalMarks, percentage },
        relatedEntityId: testId,
        relatedEntityType: 'test',
      })
    )
  } else if (percentage >= 80) {
    events.push(
      await recordXpEvent({
        userId,
        eventType: 'TEST_COMPLETED',
        xpAmount: XP_REWARDS.TEST_SCORE_80_PLUS,
        description: '80%+ score bonus',
        metadata: { testId, score, totalMarks, percentage },
        relatedEntityId: testId,
        relatedEntityType: 'test',
      })
    )
  }

  return events
}

/**
 * Record XP for a streak milestone
 */
export async function recordStreakMilestone(
  userId: string,
  streakDays: number
): Promise<XpEvent | null> {
  const milestoneMap: Record<number, number> = {
    7: XP_REWARDS.STREAK_MILESTONE_7,
    14: XP_REWARDS.STREAK_MILESTONE_14,
    30: XP_REWARDS.STREAK_MILESTONE_30,
    60: XP_REWARDS.STREAK_MILESTONE_60,
    90: XP_REWARDS.STREAK_MILESTONE_90,
    180: XP_REWARDS.STREAK_MILESTONE_180,
    365: XP_REWARDS.STREAK_MILESTONE_365,
  }

  const xpReward = milestoneMap[streakDays]
  if (!xpReward) return null

  // Check if already awarded
  const existing = await prisma.gamification_xp_events.findFirst({
    where: {
      userId,
      eventType: 'STREAK_MILESTONE',
      metadata: {
        path: ['streakDays'],
        equals: streakDays,
      },
    },
  })

  if (existing) return null

  const event = await recordXpEvent({
    userId,
    eventType: 'STREAK_MILESTONE',
    xpAmount: xpReward,
    description: `${streakDays}-day streak milestone!`,
    metadata: { streakDays },
  })

  // Create notification
  await prisma.gamification_notifications.create({
    data: {
      userId,
      type: 'STREAK_MILESTONE',
      title: 'Streak Milestone Achieved!',
      message: `Congratulations! You've maintained a ${streakDays}-day study streak and earned ${xpReward} XP!`,
      metadata: { streakDays, xpReward },
      priority: streakDays >= 30 ? 'HIGH' : 'NORMAL',
    },
  })

  return event
}

/**
 * Get user's XP history with pagination
 */
export async function getXpHistory(
  userId: string,
  params: {
    limit?: number
    offset?: number
    eventType?: XpEventType
    startDate?: Date
    endDate?: Date
  } = {}
): Promise<{ events: XpEvent[]; total: number }> {
  const { limit = 20, offset = 0, eventType, startDate, endDate } = params

  const where = {
    userId,
    ...(eventType && { eventType }),
    ...(startDate || endDate
      ? {
          createdAt: {
            ...(startDate && { gte: startDate }),
            ...(endDate && { lte: endDate }),
          },
        }
      : {}),
  }

  const [events, total] = await Promise.all([
    prisma.gamification_xp_events.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    }),
    prisma.gamification_xp_events.count({ where }),
  ])

  return { events: events as XpEvent[], total }
}

/**
 * Get user's XP breakdown by category and time period
 */
export async function getXpBreakdown(userId: string): Promise<XpBreakdown> {
  const now = new Date()
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const weekStart = new Date(now)
  weekStart.setDate(now.getDate() - now.getDay())
  weekStart.setHours(0, 0, 0, 0)
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)

  // Get all events for the user
  const events = await prisma.gamification_xp_events.findMany({
    where: { userId },
    select: {
      eventType: true,
      xpAmount: true,
      createdAt: true,
    },
  })

  // Calculate breakdown
  const breakdown: XpBreakdown = {
    total: 0,
    byCategory: {
      mcq: 0,
      tests: 0,
      assignments: 0,
      classes: 0,
      streaks: 0,
      badges: 0,
      other: 0,
    },
    byPeriod: {
      today: 0,
      thisWeek: 0,
      thisMonth: 0,
      allTime: 0,
    },
  }

  for (const event of events) {
    const xp = event.xpAmount
    breakdown.total += xp
    breakdown.byPeriod.allTime += xp

    // Time period breakdown
    if (event.createdAt >= todayStart) {
      breakdown.byPeriod.today += xp
    }
    if (event.createdAt >= weekStart) {
      breakdown.byPeriod.thisWeek += xp
    }
    if (event.createdAt >= monthStart) {
      breakdown.byPeriod.thisMonth += xp
    }

    // Category breakdown
    switch (event.eventType) {
      case 'MCQ_CORRECT':
      case 'MCQ_STREAK_BONUS':
        breakdown.byCategory.mcq += xp
        break
      case 'TEST_COMPLETED':
        breakdown.byCategory.tests += xp
        break
      case 'ASSIGNMENT_SUBMITTED':
      case 'ASSIGNMENT_PERFECT':
        breakdown.byCategory.assignments += xp
        break
      case 'CLASS_ATTENDED':
        breakdown.byCategory.classes += xp
        break
      case 'STREAK_MILESTONE':
        breakdown.byCategory.streaks += xp
        break
      case 'BADGE_EARNED':
        breakdown.byCategory.badges += xp
        break
      default:
        breakdown.byCategory.other += xp
    }
  }

  return breakdown
}

// Helper functions

async function checkAndAwardLevelUp(userId: string): Promise<void> {
  const userStats = await prisma.mcq_user_stats.findUnique({
    where: { userId },
    select: { totalPoints: true, currentLevel: true },
  })

  if (!userStats) return

  const newLevel = getLevelFromXp(userStats.totalPoints)

  if (newLevel > userStats.currentLevel) {
    // Award level up XP and update level
    await prisma.$transaction([
      prisma.mcq_user_stats.update({
        where: { userId },
        data: { currentLevel: newLevel },
      }),
      prisma.gamification_xp_events.create({
        data: {
          userId,
          eventType: 'LEVEL_UP',
          xpAmount: XP_REWARDS.LEVEL_UP,
          description: `Level up to ${getLevelName(newLevel)}!`,
          metadata: { oldLevel: userStats.currentLevel, newLevel },
        },
      }),
      prisma.gamification_notifications.create({
        data: {
          userId,
          type: 'LEVEL_UP',
          title: 'Level Up!',
          message: `Congratulations! You've reached level ${newLevel} - ${getLevelName(newLevel)}!`,
          metadata: { newLevel, levelName: getLevelName(newLevel) },
          priority: 'HIGH',
        },
      }),
    ])
  }
}

async function checkXpMilestones(userId: string): Promise<void> {
  const userStats = await prisma.mcq_user_stats.findUnique({
    where: { userId },
    select: { totalPoints: true },
  })

  if (!userStats) return

  const milestones = [100, 500, 1000, 2500, 5000, 10000, 25000, 50000, 100000]

  for (const milestone of milestones) {
    if (userStats.totalPoints >= milestone) {
      const existing = await prisma.gamification_xp_events.findFirst({
        where: {
          userId,
          eventType: 'XP_MILESTONE' as XpEventType,
          metadata: {
            path: ['milestone'],
            equals: milestone,
          },
        },
      })

      if (!existing) {
        await prisma.gamification_notifications.create({
          data: {
            userId,
            type: 'XP_MILESTONE',
            title: 'XP Milestone!',
            message: `You've earned ${milestone.toLocaleString()} total XP!`,
            metadata: { milestone },
            priority: 'NORMAL',
          },
        })
      }
    }
  }
}

function getLevelFromXp(xp: number): number {
  const levels = [0, 100, 250, 500, 1000, 2000, 3500, 5500, 7500, 10000]
  for (let i = levels.length - 1; i >= 0; i--) {
    if (xp >= levels[i]) return i + 1
  }
  return 1
}

function getLevelName(level: number): string {
  const names = [
    'Beginner',
    'Apprentice',
    'Scholar',
    'Achiever',
    'Expert',
    'Master',
    'Champion',
    'Elite',
    'Legend',
    'NEET Warrior',
  ]
  return names[level - 1] || 'Unknown'
}

export default {
  recordXpEvent,
  recordMcqXp,
  recordTestXp,
  recordStreakMilestone,
  getXpHistory,
  getXpBreakdown,
  XP_REWARDS,
}
