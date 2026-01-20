/**
 * Streak Protection Service
 * Handles streak freezes, recovery windows, and at-risk notifications
 *
 * Features:
 * - Streak freeze (prevent streak loss for 1 day)
 * - Recovery window (24-hour grace period to recover broken streak)
 * - Weekend pass (optional protection on weekends)
 * - Exam pause (pause streak during exam periods)
 */

import { prisma } from '@/lib/prisma'
import { StreakProtectionType } from '@/types/prisma-enums'

// Constants
export const STREAK_PROTECTION_CONFIG = {
  // Free users get 1 freeze per week, paid users get more based on tier
  FREE_FREEZES_PER_WEEK: 1,
  PURSUIT_FREEZES_PER_WEEK: 2,
  ASCENT_FREEZES_PER_WEEK: 3,
  PINNACLE_FREEZES_PER_WEEK: 5,

  // Recovery window hours after streak break
  RECOVERY_WINDOW_HOURS: 24,

  // XP cost to recover a broken streak (scales with streak length)
  RECOVERY_BASE_XP_COST: 50,
  RECOVERY_XP_PER_DAY: 10, // Additional XP cost per day of streak

  // Streak milestones that unlock protection features
  WEEKEND_PASS_UNLOCK_STREAK: 14,
  EXAM_PAUSE_UNLOCK_STREAK: 30,
}

export interface StreakStatus {
  currentStreak: number
  longestStreak: number
  isAtRisk: boolean
  isProtected: boolean
  protectedUntil: Date | null
  freezesAvailable: number
  freezesUsedThisWeek: number
  canRecover: boolean
  recoveryDeadline: Date | null
  recoveryXpCost: number | null
  lastActivity: Date | null
}

export interface ProtectionResult {
  success: boolean
  message: string
  newStatus?: StreakStatus
}

/**
 * Get user's current streak status with protection details
 */
export async function getStreakStatus(userId: string): Promise<StreakStatus | null> {
  const userStats = await prisma.mcq_user_stats.findUnique({
    where: { userId },
    select: {
      currentStreak: true,
      longestStreak: true,
      lastPracticeDate: true,
      streakFreezeCount: true,
      lastStreakBreak: true,
      streakRecoveryDeadline: true,
      isStreakAtRisk: true,
      streakProtectedUntil: true,
    },
  })

  if (!userStats) {
    return null
  }

  // Get user's subscription tier for freeze allowance
  const user = await prisma.users.findUnique({
    where: { id: userId },
    select: { subscriptionTier: true },
  })

  const tier = user?.subscriptionTier || 'FREE'
  const maxFreezesPerWeek = getMaxFreezesForTier(tier)

  // Count freezes used this week
  const weekStart = getWeekStart()
  const freezesUsedThisWeek = await prisma.gamification_streak_protection.count({
    where: {
      userId,
      type: 'FREEZE',
      createdAt: { gte: weekStart },
    },
  })

  // Check if currently protected
  const now = new Date()
  const isProtected = userStats.streakProtectedUntil
    ? userStats.streakProtectedUntil > now
    : false

  // Check if can recover (within recovery window)
  const canRecover = userStats.streakRecoveryDeadline
    ? userStats.streakRecoveryDeadline > now
    : false

  // Calculate recovery cost if applicable
  let recoveryXpCost: number | null = null
  if (canRecover && userStats.lastStreakBreak) {
    const brokenStreak = await getStreakAtBreak(userId, userStats.lastStreakBreak)
    recoveryXpCost = calculateRecoveryCost(brokenStreak)
  }

  return {
    currentStreak: userStats.currentStreak,
    longestStreak: userStats.longestStreak,
    isAtRisk: userStats.isStreakAtRisk,
    isProtected,
    protectedUntil: userStats.streakProtectedUntil,
    freezesAvailable: Math.max(0, maxFreezesPerWeek - freezesUsedThisWeek),
    freezesUsedThisWeek,
    canRecover,
    recoveryDeadline: userStats.streakRecoveryDeadline,
    recoveryXpCost,
    lastActivity: userStats.lastPracticeDate,
  }
}

/**
 * Use a streak freeze to protect the current streak
 */
export async function useStreakFreeze(userId: string): Promise<ProtectionResult> {
  const status = await getStreakStatus(userId)

  if (!status) {
    return { success: false, message: 'User stats not found' }
  }

  if (status.freezesAvailable <= 0) {
    return { success: false, message: 'No streak freezes available this week' }
  }

  if (status.isProtected) {
    return { success: false, message: 'Streak is already protected' }
  }

  if (status.currentStreak === 0) {
    return { success: false, message: 'No active streak to protect' }
  }

  // Calculate protection end time (end of tomorrow)
  const protectedUntil = new Date()
  protectedUntil.setDate(protectedUntil.getDate() + 1)
  protectedUntil.setHours(23, 59, 59, 999)

  // Create protection record and update user stats
  await prisma.$transaction([
    prisma.gamification_streak_protection.create({
      data: {
        userId,
        type: 'FREEZE',
        streakAtProtection: status.currentStreak,
        expiresAt: protectedUntil,
        xpCost: 0,
      },
    }),
    prisma.mcq_user_stats.update({
      where: { userId },
      data: {
        streakFreezeCount: { increment: 1 },
        streakProtectedUntil: protectedUntil,
        isStreakAtRisk: false,
      },
    }),
  ])

  const newStatus = await getStreakStatus(userId)
  return {
    success: true,
    message: `Streak freeze activated! Your ${status.currentStreak}-day streak is protected until tomorrow.`,
    newStatus: newStatus || undefined,
  }
}

/**
 * Recover a broken streak using XP
 */
export async function recoverStreak(userId: string): Promise<ProtectionResult> {
  const status = await getStreakStatus(userId)

  if (!status) {
    return { success: false, message: 'User stats not found' }
  }

  if (!status.canRecover) {
    return { success: false, message: 'Recovery window has expired' }
  }

  if (!status.recoveryXpCost) {
    return { success: false, message: 'Unable to calculate recovery cost' }
  }

  // Get user's current XP
  const userStats = await prisma.mcq_user_stats.findUnique({
    where: { userId },
    select: {
      totalPoints: true,
      lastStreakBreak: true,
    },
  })

  if (!userStats) {
    return { success: false, message: 'User stats not found' }
  }

  if (userStats.totalPoints < status.recoveryXpCost) {
    return {
      success: false,
      message: `Not enough XP. Need ${status.recoveryXpCost} XP, have ${userStats.totalPoints} XP`
    }
  }

  // Get the streak value at the time of break
  const streakAtBreak = await getStreakAtBreak(userId, userStats.lastStreakBreak!)

  // Recover the streak
  await prisma.$transaction([
    prisma.gamification_streak_protection.create({
      data: {
        userId,
        type: 'RECOVERY',
        streakAtProtection: streakAtBreak,
        xpCost: status.recoveryXpCost,
        wasUsed: true,
        usedAt: new Date(),
      },
    }),
    prisma.mcq_user_stats.update({
      where: { userId },
      data: {
        currentStreak: streakAtBreak,
        totalPoints: { decrement: status.recoveryXpCost },
        streakRecoveryDeadline: null,
        lastStreakBreak: null,
        isStreakAtRisk: false,
      },
    }),
    // Log the XP expense
    prisma.gamification_xp_events.create({
      data: {
        userId,
        eventType: 'STREAK_MILESTONE', // Using closest match
        xpAmount: -status.recoveryXpCost,
        description: `Streak recovery - restored ${streakAtBreak}-day streak`,
        metadata: {
          recoveredStreak: streakAtBreak,
          cost: status.recoveryXpCost,
        },
      },
    }),
  ])

  const newStatus = await getStreakStatus(userId)
  return {
    success: true,
    message: `Streak recovered! Your ${streakAtBreak}-day streak has been restored.`,
    newStatus: newStatus || undefined,
  }
}

/**
 * Mark a streak as at-risk (called when user hasn't practiced today)
 */
export async function markStreakAtRisk(userId: string): Promise<void> {
  const userStats = await prisma.mcq_user_stats.findUnique({
    where: { userId },
    select: {
      currentStreak: true,
      streakProtectedUntil: true,
      isStreakAtRisk: true,
    },
  })

  if (!userStats || userStats.currentStreak === 0) {
    return
  }

  // Don't mark at risk if protected
  const now = new Date()
  if (userStats.streakProtectedUntil && userStats.streakProtectedUntil > now) {
    return
  }

  // Already at risk
  if (userStats.isStreakAtRisk) {
    return
  }

  await prisma.$transaction([
    prisma.mcq_user_stats.update({
      where: { userId },
      data: { isStreakAtRisk: true },
    }),
    prisma.gamification_notifications.create({
      data: {
        userId,
        type: 'STREAK_AT_RISK',
        title: 'Streak at Risk!',
        message: `Your ${userStats.currentStreak}-day streak is at risk! Practice today to keep it alive.`,
        metadata: { currentStreak: userStats.currentStreak },
        priority: 'HIGH',
      },
    }),
  ])
}

/**
 * Break a streak (called when grace period expires)
 */
export async function breakStreak(userId: string): Promise<void> {
  const userStats = await prisma.mcq_user_stats.findUnique({
    where: { userId },
    select: {
      currentStreak: true,
      longestStreak: true,
      streakProtectedUntil: true,
    },
  })

  if (!userStats || userStats.currentStreak === 0) {
    return
  }

  // Don't break if protected
  const now = new Date()
  if (userStats.streakProtectedUntil && userStats.streakProtectedUntil > now) {
    return
  }

  const brokenStreak = userStats.currentStreak
  const recoveryDeadline = new Date()
  recoveryDeadline.setHours(recoveryDeadline.getHours() + STREAK_PROTECTION_CONFIG.RECOVERY_WINDOW_HOURS)

  await prisma.$transaction([
    prisma.mcq_user_stats.update({
      where: { userId },
      data: {
        currentStreak: 0,
        lastStreakBreak: now,
        streakRecoveryDeadline: recoveryDeadline,
        isStreakAtRisk: false,
        streakProtectedUntil: null,
      },
    }),
    prisma.gamification_notifications.create({
      data: {
        userId,
        type: 'STREAK_BROKEN',
        title: 'Streak Lost',
        message: `Your ${brokenStreak}-day streak has ended. You have 24 hours to recover it!`,
        metadata: {
          brokenStreak,
          recoveryDeadline: recoveryDeadline.toISOString(),
          recoveryCost: calculateRecoveryCost(brokenStreak),
        },
        priority: 'HIGH',
      },
    }),
  ])
}

/**
 * Clear streak at-risk status (called when user practices)
 */
export async function clearStreakAtRisk(userId: string): Promise<void> {
  await prisma.mcq_user_stats.update({
    where: { userId },
    data: {
      isStreakAtRisk: false,
      streakProtectedUntil: null,
    },
  })
}

// Helper functions

function getMaxFreezesForTier(tier: string): number {
  switch (tier) {
    case 'PINNACLE':
      return STREAK_PROTECTION_CONFIG.PINNACLE_FREEZES_PER_WEEK
    case 'ASCENT':
      return STREAK_PROTECTION_CONFIG.ASCENT_FREEZES_PER_WEEK
    case 'PURSUIT':
      return STREAK_PROTECTION_CONFIG.PURSUIT_FREEZES_PER_WEEK
    default:
      return STREAK_PROTECTION_CONFIG.FREE_FREEZES_PER_WEEK
  }
}

function getWeekStart(): Date {
  const now = new Date()
  const dayOfWeek = now.getDay()
  const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)
  const weekStart = new Date(now.setDate(diff))
  weekStart.setHours(0, 0, 0, 0)
  return weekStart
}

function calculateRecoveryCost(streakLength: number): number {
  return STREAK_PROTECTION_CONFIG.RECOVERY_BASE_XP_COST +
    (streakLength * STREAK_PROTECTION_CONFIG.RECOVERY_XP_PER_DAY)
}

async function getStreakAtBreak(userId: string, breakDate: Date): Promise<number> {
  // Look for the most recent protection record or calculate from history
  const lastProtection = await prisma.gamification_streak_protection.findFirst({
    where: {
      userId,
      createdAt: { lte: breakDate },
    },
    orderBy: { createdAt: 'desc' },
  })

  if (lastProtection) {
    return lastProtection.streakAtProtection
  }

  // Fallback: count consecutive practice days before the break
  const sessions = await prisma.mcq_practice_sessions.findMany({
    where: {
      userId,
      createdAt: { lt: breakDate },
    },
    orderBy: { createdAt: 'desc' },
    take: 365, // Max streak we'd track
    select: { createdAt: true },
  })

  if (sessions.length === 0) {
    return 0
  }

  // Count consecutive days
  let streak = 1
  let lastDate = new Date(sessions[0].createdAt)
  lastDate.setHours(0, 0, 0, 0)

  for (let i = 1; i < sessions.length; i++) {
    const sessionDate = new Date(sessions[i].createdAt)
    sessionDate.setHours(0, 0, 0, 0)

    const diffDays = Math.floor((lastDate.getTime() - sessionDate.getTime()) / (1000 * 60 * 60 * 24))

    if (diffDays === 1) {
      streak++
      lastDate = sessionDate
    } else if (diffDays > 1) {
      break
    }
  }

  return streak
}

export default {
  getStreakStatus,
  useStreakFreeze,
  recoverStreak,
  markStreakAtRisk,
  breakStreak,
  clearStreakAtRisk,
  STREAK_PROTECTION_CONFIG,
}
