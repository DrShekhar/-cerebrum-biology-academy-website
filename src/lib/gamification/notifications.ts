/**
 * Gamification Notifications Service
 * Real-time notifications for achievements, streaks, and milestones
 *
 * Features:
 * - Multiple notification types with priorities
 * - Read/unread tracking
 * - Notification preferences
 * - Scheduled notifications (streak reminders)
 */

import { prisma } from '@/lib/prisma'
import { GamificationNotificationType } from '@/types/prisma-enums'

export type NotificationPriority = 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT'

export interface GamificationNotification {
  id: string
  userId: string
  type: GamificationNotificationType
  title: string
  message: string
  metadata: Record<string, unknown>
  isRead: boolean
  readAt: Date | null
  priority: NotificationPriority
  expiresAt: Date | null
  createdAt: Date
}

export interface CreateNotificationParams {
  userId: string
  type: GamificationNotificationType
  title: string
  message: string
  metadata?: Record<string, unknown>
  priority?: NotificationPriority
  expiresAt?: Date
}

/**
 * Create a new gamification notification
 */
export async function createNotification(
  params: CreateNotificationParams
): Promise<GamificationNotification> {
  const { userId, type, title, message, metadata = {}, priority = 'NORMAL', expiresAt } = params

  const notification = await prisma.gamification_notifications.create({
    data: {
      userId,
      type,
      title,
      message,
      metadata,
      priority,
      expiresAt,
    },
  })

  return notification as GamificationNotification
}

/**
 * Get user's notifications with pagination and filters
 */
export async function getNotifications(
  userId: string,
  params: {
    limit?: number
    offset?: number
    unreadOnly?: boolean
    types?: GamificationNotificationType[]
  } = {}
): Promise<{ notifications: GamificationNotification[]; unreadCount: number; total: number }> {
  const { limit = 20, offset = 0, unreadOnly = false, types } = params

  const where = {
    userId,
    ...(unreadOnly && { isRead: false }),
    ...(types && types.length > 0 && { type: { in: types } }),
    OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
  }

  const [notifications, unreadCount, total] = await Promise.all([
    prisma.gamification_notifications.findMany({
      where,
      orderBy: [{ priority: 'desc' }, { createdAt: 'desc' }],
      take: limit,
      skip: offset,
    }),
    prisma.gamification_notifications.count({
      where: {
        userId,
        isRead: false,
        OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
      },
    }),
    prisma.gamification_notifications.count({ where }),
  ])

  return {
    notifications: notifications as GamificationNotification[],
    unreadCount,
    total,
  }
}

/**
 * Mark a notification as read
 */
export async function markAsRead(notificationId: string, userId: string): Promise<boolean> {
  const result = await prisma.gamification_notifications.updateMany({
    where: { id: notificationId, userId },
    data: { isRead: true, readAt: new Date() },
  })

  return result.count > 0
}

/**
 * Mark all notifications as read
 */
export async function markAllAsRead(userId: string): Promise<number> {
  const result = await prisma.gamification_notifications.updateMany({
    where: { userId, isRead: false },
    data: { isRead: true, readAt: new Date() },
  })

  return result.count
}

/**
 * Delete a notification
 */
export async function deleteNotification(notificationId: string, userId: string): Promise<boolean> {
  const result = await prisma.gamification_notifications.deleteMany({
    where: { id: notificationId, userId },
  })

  return result.count > 0
}

/**
 * Get unread notification count
 */
export async function getUnreadCount(userId: string): Promise<number> {
  return prisma.gamification_notifications.count({
    where: {
      userId,
      isRead: false,
      OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
    },
  })
}

/**
 * Create streak reminder notification (called by cron job)
 */
export async function createStreakReminder(
  userId: string,
  currentStreak: number
): Promise<GamificationNotification> {
  return createNotification({
    userId,
    type: 'STREAK_AT_RISK',
    title: 'Keep Your Streak Alive!',
    message: `Don't forget to practice today! Your ${currentStreak}-day streak is waiting.`,
    metadata: { currentStreak },
    priority: 'HIGH',
    expiresAt: getEndOfDay(),
  })
}

/**
 * Create daily challenge notification
 */
export async function createDailyChallengeNotification(
  userId: string,
  challengeDetails: { topicName: string; questionCount: number }
): Promise<GamificationNotification> {
  return createNotification({
    userId,
    type: 'DAILY_CHALLENGE',
    title: "Today's Challenge is Ready!",
    message: `Complete ${challengeDetails.questionCount} questions on ${challengeDetails.topicName} to earn bonus XP!`,
    metadata: challengeDetails,
    priority: 'NORMAL',
    expiresAt: getEndOfDay(),
  })
}

/**
 * Create leaderboard position change notification
 */
export async function createLeaderboardNotification(
  userId: string,
  params: { newRank: number; previousRank: number; leaderboardType: string }
): Promise<GamificationNotification | null> {
  const { newRank, previousRank, leaderboardType } = params

  // Only notify for improvements or significant drops
  const rankChange = previousRank - newRank
  if (rankChange === 0) return null

  const isImprovement = rankChange > 0
  const title = isImprovement ? 'Leaderboard Climb!' : 'Leaderboard Update'
  const message = isImprovement
    ? `You moved up ${rankChange} spots to #${newRank} on the ${leaderboardType} leaderboard!`
    : `You dropped to #${newRank} on the ${leaderboardType} leaderboard. Keep practicing!`

  return createNotification({
    userId,
    type: 'LEADERBOARD_CHANGE',
    title,
    message,
    metadata: { newRank, previousRank, rankChange, leaderboardType },
    priority: newRank <= 10 ? 'HIGH' : 'NORMAL',
  })
}

/**
 * Clean up expired notifications (called by cron job)
 */
export async function cleanupExpiredNotifications(): Promise<number> {
  const result = await prisma.gamification_notifications.deleteMany({
    where: {
      expiresAt: { lt: new Date() },
    },
  })

  return result.count
}

// Helper functions

function getEndOfDay(): Date {
  const endOfDay = new Date()
  endOfDay.setHours(23, 59, 59, 999)
  return endOfDay
}

export default {
  createNotification,
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  getUnreadCount,
  createStreakReminder,
  createDailyChallengeNotification,
  createLeaderboardNotification,
  cleanupExpiredNotifications,
}
