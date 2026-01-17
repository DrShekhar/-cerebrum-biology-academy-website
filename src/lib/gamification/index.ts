/**
 * Gamification Module
 * Comprehensive gamification system for Cerebrum Biology Academy
 *
 * Features:
 * - Study streaks with freeze/recovery mechanics
 * - XP event sourcing and tracking
 * - Achievement badges with rarity tiers
 * - Daily/weekly goals with streak bonuses
 * - Real-time gamification notifications
 */

// Streak Protection
export {
  getStreakStatus,
  useStreakFreeze,
  recoverStreak,
  markStreakAtRisk,
  breakStreak,
  clearStreakAtRisk,
  STREAK_PROTECTION_CONFIG,
  type StreakStatus,
  type ProtectionResult,
} from './streakProtection'

// XP Events
export {
  recordXpEvent,
  recordMcqXp,
  recordTestXp,
  recordStreakMilestone,
  getXpHistory,
  getXpBreakdown,
  XP_REWARDS,
  type XpEvent,
  type XpBreakdown,
  type RecordXpEventParams,
} from './xpEvents'

// Badges
export {
  BADGE_DEFINITIONS,
  getUserBadges,
  checkAndAwardBadges,
  awardBadge,
  toggleBadgeShowcase,
  getShowcasedBadges,
  type BadgeDefinition,
  type BadgeRarity,
  type BadgeCategory,
  type UserBadge,
  type BadgeProgress,
} from './badges'

// Notifications
export {
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
  type GamificationNotification,
  type NotificationPriority,
  type CreateNotificationParams,
} from './notifications'

// Goals
export {
  getUserGoals,
  updateGoalProgress,
  setCustomGoal,
  getGoalHistory,
  getGoalStats,
  refreshExpiredGoals,
  DEFAULT_GOALS,
  type GoalDefinition,
  type GoalProgress,
  type GoalType,
  type GoalMetric,
} from './goals'

// Unified gamification service
export const gamification = {
  // Streak operations
  streak: {
    getStatus: async (userId: string) => {
      const { getStreakStatus } = await import('./streakProtection')
      return getStreakStatus(userId)
    },
    useFreeze: async (userId: string) => {
      const { useStreakFreeze } = await import('./streakProtection')
      return useStreakFreeze(userId)
    },
    recover: async (userId: string) => {
      const { recoverStreak } = await import('./streakProtection')
      return recoverStreak(userId)
    },
  },

  // XP operations
  xp: {
    record: async (params: import('./xpEvents').RecordXpEventParams) => {
      const { recordXpEvent } = await import('./xpEvents')
      return recordXpEvent(params)
    },
    getHistory: async (userId: string, params?: Parameters<typeof import('./xpEvents').getXpHistory>[1]) => {
      const { getXpHistory } = await import('./xpEvents')
      return getXpHistory(userId, params)
    },
    getBreakdown: async (userId: string) => {
      const { getXpBreakdown } = await import('./xpEvents')
      return getXpBreakdown(userId)
    },
  },

  // Badge operations
  badges: {
    getAll: async (userId: string) => {
      const { getUserBadges } = await import('./badges')
      return getUserBadges(userId)
    },
    checkAndAward: async (userId: string, context?: Parameters<typeof import('./badges').checkAndAwardBadges>[1]) => {
      const { checkAndAwardBadges } = await import('./badges')
      return checkAndAwardBadges(userId, context)
    },
    getShowcased: async (userId: string) => {
      const { getShowcasedBadges } = await import('./badges')
      return getShowcasedBadges(userId)
    },
  },

  // Notification operations
  notifications: {
    get: async (userId: string, params?: Parameters<typeof import('./notifications').getNotifications>[1]) => {
      const { getNotifications } = await import('./notifications')
      return getNotifications(userId, params)
    },
    markRead: async (notificationId: string, userId: string) => {
      const { markAsRead } = await import('./notifications')
      return markAsRead(notificationId, userId)
    },
    markAllRead: async (userId: string) => {
      const { markAllAsRead } = await import('./notifications')
      return markAllAsRead(userId)
    },
    getUnreadCount: async (userId: string) => {
      const { getUnreadCount } = await import('./notifications')
      return getUnreadCount(userId)
    },
  },

  // Goal operations
  goals: {
    get: async (userId: string) => {
      const { getUserGoals } = await import('./goals')
      return getUserGoals(userId)
    },
    updateProgress: async (userId: string, metric: import('./goals').GoalMetric, incrementValue?: number) => {
      const { updateGoalProgress } = await import('./goals')
      return updateGoalProgress(userId, metric, incrementValue)
    },
    setCustom: async (userId: string, params: Parameters<typeof import('./goals').setCustomGoal>[1]) => {
      const { setCustomGoal } = await import('./goals')
      return setCustomGoal(userId, params)
    },
    getStats: async (userId: string) => {
      const { getGoalStats } = await import('./goals')
      return getGoalStats(userId)
    },
  },
}

export default gamification
