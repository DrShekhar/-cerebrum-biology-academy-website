// Gamification Components - Barrel Export
// Provides unified access to all gamification UI components and data hooks

// Core Display Components
export { XPProgressCard } from './XPProgressCard'
export { StreakWidget } from './StreakWidget'
export { AchievementsDisplay } from './AchievementsDisplay'

// Enhanced Gamification Components
export { StreakProtectionWidget } from './StreakProtectionWidget'
export { BadgeGallery } from './BadgeGallery'
export { GoalProgressCard } from './GoalProgressCard'
export { NotificationPopover } from './NotificationPopover'
export { Leaderboard } from './Leaderboard'

// Data Hooks - For fetching and managing gamification data
export {
  useGamification,
  useStreak,
  useBadges,
  useNotifications,
  useLeaderboard,
  useGoals,
} from './hooks'
