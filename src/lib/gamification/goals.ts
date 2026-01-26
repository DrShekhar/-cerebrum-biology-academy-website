/**
 * Goals Service
 * Daily and weekly goal tracking for students
 *
 * Features:
 * - Customizable daily/weekly goals
 * - Progress tracking with auto-completion
 * - Goal streaks and bonuses
 * - Default goals for new users
 */

import { prisma } from '@/lib/prisma'
import { recordXpEvent } from './xpEvents'
import { createNotification } from './notifications'

export type GoalType = 'DAILY' | 'WEEKLY'
export type GoalMetric =
  | 'QUESTIONS_ANSWERED'
  | 'QUESTIONS_CORRECT'
  | 'ACCURACY_PERCENTAGE'
  | 'STUDY_MINUTES'
  | 'SESSIONS_COMPLETED'
  | 'TESTS_COMPLETED'
  | 'CHAPTERS_REVIEWED'

export interface GoalDefinition {
  id: string
  userId: string
  goalType: GoalType
  metric: GoalMetric
  targetValue: number
  currentValue: number
  isCompleted: boolean
  completedAt: Date | null
  startDate: Date
  endDate: Date
  xpReward: number
  streakBonus: number
  consecutiveCompletions: number
}

export interface GoalProgress {
  goal: GoalDefinition
  percentage: number
  remaining: number
  timeRemaining: string
  isExpired: boolean
}

// Default goal configurations
export const DEFAULT_GOALS = {
  daily: [
    { metric: 'QUESTIONS_ANSWERED' as GoalMetric, targetValue: 20, xpReward: 20 },
    { metric: 'QUESTIONS_CORRECT' as GoalMetric, targetValue: 15, xpReward: 25 },
    { metric: 'STUDY_MINUTES' as GoalMetric, targetValue: 30, xpReward: 15 },
  ],
  weekly: [
    { metric: 'QUESTIONS_ANSWERED' as GoalMetric, targetValue: 100, xpReward: 100 },
    { metric: 'TESTS_COMPLETED' as GoalMetric, targetValue: 2, xpReward: 75 },
    { metric: 'ACCURACY_PERCENTAGE' as GoalMetric, targetValue: 70, xpReward: 50 },
  ],
}

// Streak bonus multipliers
const STREAK_BONUSES = {
  3: 1.1, // 10% bonus after 3 consecutive completions
  5: 1.25, // 25% bonus after 5
  7: 1.5, // 50% bonus after 7
  14: 2.0, // 100% bonus after 14
}

/**
 * Get user's active goals with progress
 */
export async function getUserGoals(userId: string): Promise<{
  daily: GoalProgress[]
  weekly: GoalProgress[]
}> {
  const now = new Date()

  // Get or create daily goals
  let dailyGoals = await prisma.gamification_goals.findMany({
    where: {
      userId,
      goalType: 'DAILY',
      endDate: { gte: now },
    },
  })

  // Get or create weekly goals
  let weeklyGoals = await prisma.gamification_goals.findMany({
    where: {
      userId,
      goalType: 'WEEKLY',
      endDate: { gte: now },
    },
  })

  // Create default goals if none exist
  if (dailyGoals.length === 0) {
    dailyGoals = await createDefaultGoals(userId, 'DAILY')
  }
  if (weeklyGoals.length === 0) {
    weeklyGoals = await createDefaultGoals(userId, 'WEEKLY')
  }

  return {
    daily: dailyGoals.map(goalToProgress),
    weekly: weeklyGoals.map(goalToProgress),
  }
}

/**
 * Update goal progress based on user activity
 */
export async function updateGoalProgress(
  userId: string,
  metric: GoalMetric,
  incrementValue: number = 1,
  absoluteValue?: number
): Promise<GoalDefinition[]> {
  const now = new Date()

  // Find active goals for this metric
  const goals = await prisma.gamification_goals.findMany({
    where: {
      userId,
      metric,
      isCompleted: false,
      endDate: { gte: now },
    },
  })

  const completedGoals: GoalDefinition[] = []

  for (const goal of goals) {
    // Calculate new value
    const newValue =
      absoluteValue !== undefined ? absoluteValue : goal.currentValue + incrementValue

    const isNowCompleted = newValue >= goal.targetValue

    // Update the goal
    const updated = await prisma.gamification_goals.update({
      where: { id: goal.id },
      data: {
        currentValue: newValue,
        isCompleted: isNowCompleted,
        completedAt: isNowCompleted ? now : null,
        consecutiveCompletions: isNowCompleted
          ? goal.consecutiveCompletions + 1
          : goal.consecutiveCompletions,
      },
    })

    if (isNowCompleted && !goal.isCompleted) {
      // Goal just completed - award XP
      const streakMultiplier = getStreakMultiplier(updated.consecutiveCompletions)
      const xpReward = Math.round(goal.xpReward * streakMultiplier)
      const streakBonus = xpReward - goal.xpReward

      await recordXpEvent({
        userId,
        eventType: 'DAILY_CHALLENGE',
        xpAmount: xpReward,
        description: `Completed ${goal.goalType.toLowerCase()} goal: ${formatMetric(metric)}`,
        metadata: {
          goalId: goal.id,
          metric,
          targetValue: goal.targetValue,
          consecutiveCompletions: updated.consecutiveCompletions,
          streakBonus,
        },
        relatedEntityId: goal.id,
        relatedEntityType: 'goal',
      })

      // Create notification
      await createNotification({
        userId,
        type: 'ACHIEVEMENT_PROGRESS',
        title: `${goal.goalType === 'DAILY' ? 'Daily' : 'Weekly'} Goal Complete!`,
        message: `You completed your ${formatMetric(metric)} goal! +${xpReward} XP${
          streakBonus > 0 ? ` (includes ${streakBonus} streak bonus!)` : ''
        }`,
        metadata: {
          goalType: goal.goalType,
          metric,
          xpReward,
          streakBonus,
          consecutiveCompletions: updated.consecutiveCompletions,
        },
        priority: 'NORMAL',
      })

      completedGoals.push(updated as unknown as GoalDefinition)
    }
  }

  return completedGoals
}

/**
 * Set custom goal for a user
 */
export async function setCustomGoal(
  userId: string,
  params: {
    goalType: GoalType
    metric: GoalMetric
    targetValue: number
    xpReward?: number
  }
): Promise<GoalDefinition> {
  const { goalType, metric, targetValue, xpReward } = params

  // Calculate dates
  const { startDate, endDate } = getGoalPeriod(goalType)

  // Check for existing goal with same metric and type
  const existing = await prisma.gamification_goals.findFirst({
    where: {
      userId,
      goalType,
      metric,
      isCompleted: false,
      endDate: { gte: new Date() },
    },
  })

  if (existing) {
    // Update existing goal
    const updated = await prisma.gamification_goals.update({
      where: { id: existing.id },
      data: { targetValue, xpReward: xpReward || existing.xpReward },
    })
    return updated as unknown as GoalDefinition
  }

  // Create new goal
  const goal = await prisma.gamification_goals.create({
    data: {
      userId,
      goalType,
      metric,
      targetValue,
      currentValue: 0,
      xpReward: xpReward || calculateDefaultXpReward(targetValue, goalType),
      startDate,
      endDate,
    },
  })

  return goal as unknown as GoalDefinition
}

/**
 * Get goal completion history
 */
export async function getGoalHistory(
  userId: string,
  params: {
    limit?: number
    offset?: number
    goalType?: GoalType
  } = {}
): Promise<{ goals: GoalDefinition[]; total: number }> {
  const { limit = 20, offset = 0, goalType } = params

  const where = {
    userId,
    isCompleted: true,
    ...(goalType && { goalType }),
  }

  const [goals, total] = await Promise.all([
    prisma.gamification_goals.findMany({
      where,
      orderBy: { completedAt: 'desc' },
      take: limit,
      skip: offset,
    }),
    prisma.gamification_goals.count({ where }),
  ])

  return {
    goals: goals as unknown as GoalDefinition[],
    total,
  }
}

/**
 * Get goal statistics for a user
 */
export async function getGoalStats(userId: string): Promise<{
  totalCompleted: number
  dailyCompleted: number
  weeklyCompleted: number
  currentDailyStreak: number
  currentWeeklyStreak: number
  longestDailyStreak: number
  longestWeeklyStreak: number
  totalXpFromGoals: number
}> {
  const [daily, weekly, xpFromGoals] = await Promise.all([
    prisma.gamification_goals.findMany({
      where: { userId, goalType: 'DAILY', isCompleted: true },
      select: { consecutiveCompletions: true },
      orderBy: { completedAt: 'desc' },
    }),
    prisma.gamification_goals.findMany({
      where: { userId, goalType: 'WEEKLY', isCompleted: true },
      select: { consecutiveCompletions: true },
      orderBy: { completedAt: 'desc' },
    }),
    prisma.gamification_xp_events.aggregate({
      where: {
        userId,
        relatedEntityType: 'goal',
      },
      _sum: { xpAmount: true },
    }),
  ])

  const dailyStreaks = daily.map((d) => d.consecutiveCompletions)
  const weeklyStreaks = weekly.map((w) => w.consecutiveCompletions)

  return {
    totalCompleted: daily.length + weekly.length,
    dailyCompleted: daily.length,
    weeklyCompleted: weekly.length,
    currentDailyStreak: dailyStreaks[0] || 0,
    currentWeeklyStreak: weeklyStreaks[0] || 0,
    longestDailyStreak: Math.max(0, ...dailyStreaks),
    longestWeeklyStreak: Math.max(0, ...weeklyStreaks),
    totalXpFromGoals: xpFromGoals._sum.xpAmount || 0,
  }
}

/**
 * Reset expired goals and create new ones (called by cron)
 */
export async function refreshExpiredGoals(userId: string): Promise<void> {
  const now = new Date()

  // Find expired incomplete goals
  const expiredGoals = await prisma.gamification_goals.findMany({
    where: {
      userId,
      endDate: { lt: now },
      isCompleted: false,
    },
  })

  // Reset consecutive completions for expired goals
  if (expiredGoals.length > 0) {
    await prisma.gamification_goals.updateMany({
      where: {
        id: { in: expiredGoals.map((g) => g.id) },
      },
      data: { consecutiveCompletions: 0 },
    })
  }

  // Ensure user has active daily and weekly goals
  await getUserGoals(userId)
}

// Helper functions

async function createDefaultGoals(userId: string, goalType: GoalType): Promise<any[]> {
  const defaults = goalType === 'DAILY' ? DEFAULT_GOALS.daily : DEFAULT_GOALS.weekly
  const { startDate, endDate } = getGoalPeriod(goalType)

  const goals = await prisma.$transaction(
    defaults.map((def) =>
      prisma.gamification_goals.create({
        data: {
          userId,
          goalType,
          metric: def.metric,
          targetValue: def.targetValue,
          currentValue: 0,
          xpReward: def.xpReward,
          startDate,
          endDate,
        },
      })
    )
  )

  return goals
}

function getGoalPeriod(goalType: GoalType): { startDate: Date; endDate: Date } {
  const now = new Date()
  const startDate = new Date(now)
  const endDate = new Date(now)

  if (goalType === 'DAILY') {
    startDate.setHours(0, 0, 0, 0)
    endDate.setHours(23, 59, 59, 999)
  } else {
    // Weekly - starts Monday, ends Sunday
    const dayOfWeek = now.getDay()
    const daysToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek
    startDate.setDate(now.getDate() + daysToMonday)
    startDate.setHours(0, 0, 0, 0)
    endDate.setDate(startDate.getDate() + 6)
    endDate.setHours(23, 59, 59, 999)
  }

  return { startDate, endDate }
}

function goalToProgress(goal: any): GoalProgress {
  const now = new Date()
  const endDate = new Date(goal.endDate)
  const isExpired = endDate < now

  const percentage = Math.min(100, Math.round((goal.currentValue / goal.targetValue) * 100))
  const remaining = Math.max(0, goal.targetValue - goal.currentValue)

  // Calculate time remaining
  let timeRemaining = ''
  if (!isExpired) {
    const diff = endDate.getTime() - now.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    if (hours > 24) {
      timeRemaining = `${Math.floor(hours / 24)}d ${hours % 24}h`
    } else if (hours > 0) {
      timeRemaining = `${hours}h ${minutes}m`
    } else {
      timeRemaining = `${minutes}m`
    }
  }

  return {
    goal: goal as GoalDefinition,
    percentage,
    remaining,
    timeRemaining,
    isExpired,
  }
}

function getStreakMultiplier(consecutiveCompletions: number): number {
  for (const [threshold, multiplier] of Object.entries(STREAK_BONUSES).reverse()) {
    if (consecutiveCompletions >= parseInt(threshold)) {
      return multiplier
    }
  }
  return 1.0
}

function calculateDefaultXpReward(targetValue: number, goalType: GoalType): number {
  const baseXp = goalType === 'DAILY' ? 15 : 50
  return Math.round(baseXp * (1 + targetValue / 100))
}

function formatMetric(metric: GoalMetric): string {
  const formats: Record<GoalMetric, string> = {
    QUESTIONS_ANSWERED: 'Questions Answered',
    QUESTIONS_CORRECT: 'Correct Answers',
    ACCURACY_PERCENTAGE: 'Accuracy',
    STUDY_MINUTES: 'Study Time',
    SESSIONS_COMPLETED: 'Practice Sessions',
    TESTS_COMPLETED: 'Tests Completed',
    CHAPTERS_REVIEWED: 'Chapters Reviewed',
  }
  return formats[metric] || metric
}

export default {
  getUserGoals,
  updateGoalProgress,
  setCustomGoal,
  getGoalHistory,
  getGoalStats,
  refreshExpiredGoals,
  DEFAULT_GOALS,
}
