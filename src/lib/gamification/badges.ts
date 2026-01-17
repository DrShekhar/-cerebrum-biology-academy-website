/**
 * Badges Service
 * Manages achievement badges with automatic unlock detection
 *
 * Features:
 * - Badge definitions with rarity tiers
 * - Automatic badge unlock checking
 * - Progress tracking for in-progress badges
 * - Badge display and showcase
 */

import { prisma } from '@/lib/prisma'
import { recordXpEvent, XP_REWARDS } from './xpEvents'

// Badge Rarity Tiers
export type BadgeRarity = 'COMMON' | 'UNCOMMON' | 'RARE' | 'EPIC' | 'LEGENDARY'

// Badge Categories
export type BadgeCategory =
  | 'STREAK'
  | 'ACCURACY'
  | 'VOLUME'
  | 'SPEED'
  | 'CONSISTENCY'
  | 'MASTERY'
  | 'SOCIAL'
  | 'SPECIAL'

export interface BadgeDefinition {
  id: string
  name: string
  description: string
  icon: string // Emoji or icon identifier
  rarity: BadgeRarity
  category: BadgeCategory
  xpReward: number
  requirement: {
    type: string
    value: number
    unit?: string
  }
  checkFunction?: string // Name of the check function
}

// Badge Definitions - All available badges
export const BADGE_DEFINITIONS: BadgeDefinition[] = [
  // ===== STREAK BADGES =====
  {
    id: 'streak_7',
    name: 'Week Warrior',
    description: 'Maintain a 7-day study streak',
    icon: '🔥',
    rarity: 'COMMON',
    category: 'STREAK',
    xpReward: 50,
    requirement: { type: 'streak', value: 7, unit: 'days' },
  },
  {
    id: 'streak_14',
    name: 'Fortnight Fighter',
    description: 'Maintain a 14-day study streak',
    icon: '💪',
    rarity: 'UNCOMMON',
    category: 'STREAK',
    xpReward: 100,
    requirement: { type: 'streak', value: 14, unit: 'days' },
  },
  {
    id: 'streak_30',
    name: 'Monthly Master',
    description: 'Maintain a 30-day study streak',
    icon: '⭐',
    rarity: 'RARE',
    category: 'STREAK',
    xpReward: 250,
    requirement: { type: 'streak', value: 30, unit: 'days' },
  },
  {
    id: 'streak_60',
    name: 'Dedication Deity',
    description: 'Maintain a 60-day study streak',
    icon: '🌟',
    rarity: 'EPIC',
    category: 'STREAK',
    xpReward: 500,
    requirement: { type: 'streak', value: 60, unit: 'days' },
  },
  {
    id: 'streak_100',
    name: 'Century Champion',
    description: 'Maintain a 100-day study streak',
    icon: '💯',
    rarity: 'LEGENDARY',
    category: 'STREAK',
    xpReward: 1000,
    requirement: { type: 'streak', value: 100, unit: 'days' },
  },

  // ===== ACCURACY BADGES =====
  {
    id: 'accuracy_70',
    name: 'Sharp Shooter',
    description: 'Achieve 70% overall accuracy',
    icon: '🎯',
    rarity: 'COMMON',
    category: 'ACCURACY',
    xpReward: 50,
    requirement: { type: 'accuracy', value: 70, unit: 'percent' },
  },
  {
    id: 'accuracy_80',
    name: 'Precision Pro',
    description: 'Achieve 80% overall accuracy',
    icon: '🎪',
    rarity: 'UNCOMMON',
    category: 'ACCURACY',
    xpReward: 100,
    requirement: { type: 'accuracy', value: 80, unit: 'percent' },
  },
  {
    id: 'accuracy_90',
    name: 'Accuracy Ace',
    description: 'Achieve 90% overall accuracy',
    icon: '🏆',
    rarity: 'RARE',
    category: 'ACCURACY',
    xpReward: 250,
    requirement: { type: 'accuracy', value: 90, unit: 'percent' },
  },
  {
    id: 'accuracy_95',
    name: 'Near Perfect',
    description: 'Achieve 95% overall accuracy',
    icon: '👑',
    rarity: 'EPIC',
    category: 'ACCURACY',
    xpReward: 500,
    requirement: { type: 'accuracy', value: 95, unit: 'percent' },
  },
  {
    id: 'perfect_session',
    name: 'Flawless',
    description: 'Complete a practice session with 100% accuracy (min 10 questions)',
    icon: '💎',
    rarity: 'RARE',
    category: 'ACCURACY',
    xpReward: 200,
    requirement: { type: 'perfect_session', value: 1, unit: 'sessions' },
  },

  // ===== VOLUME BADGES =====
  {
    id: 'questions_100',
    name: 'Century',
    description: 'Answer 100 questions',
    icon: '📚',
    rarity: 'COMMON',
    category: 'VOLUME',
    xpReward: 50,
    requirement: { type: 'questions', value: 100 },
  },
  {
    id: 'questions_500',
    name: 'Quincentennial',
    description: 'Answer 500 questions',
    icon: '📖',
    rarity: 'UNCOMMON',
    category: 'VOLUME',
    xpReward: 150,
    requirement: { type: 'questions', value: 500 },
  },
  {
    id: 'questions_1000',
    name: 'Millennium',
    description: 'Answer 1,000 questions',
    icon: '🎓',
    rarity: 'RARE',
    category: 'VOLUME',
    xpReward: 300,
    requirement: { type: 'questions', value: 1000 },
  },
  {
    id: 'questions_5000',
    name: 'Knowledge Titan',
    description: 'Answer 5,000 questions',
    icon: '🧠',
    rarity: 'EPIC',
    category: 'VOLUME',
    xpReward: 750,
    requirement: { type: 'questions', value: 5000 },
  },
  {
    id: 'questions_10000',
    name: 'MCQ Legend',
    description: 'Answer 10,000 questions',
    icon: '🌌',
    rarity: 'LEGENDARY',
    category: 'VOLUME',
    xpReward: 1500,
    requirement: { type: 'questions', value: 10000 },
  },

  // ===== MASTERY BADGES =====
  {
    id: 'chapter_master',
    name: 'Chapter Champion',
    description: 'Complete all questions in any chapter',
    icon: '📕',
    rarity: 'UNCOMMON',
    category: 'MASTERY',
    xpReward: 100,
    requirement: { type: 'chapter_complete', value: 1 },
  },
  {
    id: 'topic_expert',
    name: 'Topic Expert',
    description: 'Score 90%+ in any topic with 50+ questions',
    icon: '🔬',
    rarity: 'RARE',
    category: 'MASTERY',
    xpReward: 200,
    requirement: { type: 'topic_mastery', value: 90, unit: 'percent' },
  },
  {
    id: 'subject_scholar',
    name: 'Biology Scholar',
    description: 'Complete 500+ questions across all NEET biology topics',
    icon: '🧬',
    rarity: 'EPIC',
    category: 'MASTERY',
    xpReward: 500,
    requirement: { type: 'subject_coverage', value: 500 },
  },

  // ===== CONSISTENCY BADGES =====
  {
    id: 'early_bird',
    name: 'Early Bird',
    description: 'Practice before 7 AM for 5 days',
    icon: '🌅',
    rarity: 'UNCOMMON',
    category: 'CONSISTENCY',
    xpReward: 75,
    requirement: { type: 'early_practice', value: 5, unit: 'days' },
  },
  {
    id: 'night_owl',
    name: 'Night Owl',
    description: 'Practice after 10 PM for 5 days',
    icon: '🦉',
    rarity: 'UNCOMMON',
    category: 'CONSISTENCY',
    xpReward: 75,
    requirement: { type: 'late_practice', value: 5, unit: 'days' },
  },
  {
    id: 'weekend_warrior',
    name: 'Weekend Warrior',
    description: 'Practice on 10 consecutive weekends',
    icon: '🗓️',
    rarity: 'RARE',
    category: 'CONSISTENCY',
    xpReward: 200,
    requirement: { type: 'weekend_practice', value: 10 },
  },

  // ===== SPECIAL BADGES =====
  {
    id: 'first_steps',
    name: 'First Steps',
    description: 'Complete your first practice session',
    icon: '👶',
    rarity: 'COMMON',
    category: 'SPECIAL',
    xpReward: 25,
    requirement: { type: 'first_session', value: 1 },
  },
  {
    id: 'comeback_king',
    name: 'Comeback King',
    description: 'Recover a lost streak using XP',
    icon: '🔄',
    rarity: 'RARE',
    category: 'SPECIAL',
    xpReward: 100,
    requirement: { type: 'streak_recovery', value: 1 },
  },
  {
    id: 'neet_ready',
    name: 'NEET Ready',
    description: 'Score 85%+ on a full mock test',
    icon: '🏅',
    rarity: 'EPIC',
    category: 'SPECIAL',
    xpReward: 500,
    requirement: { type: 'mock_test_score', value: 85, unit: 'percent' },
  },
  {
    id: 'top_10',
    name: 'Top 10',
    description: 'Reach top 10 on the weekly leaderboard',
    icon: '🥇',
    rarity: 'EPIC',
    category: 'SOCIAL',
    xpReward: 300,
    requirement: { type: 'leaderboard_rank', value: 10 },
  },
  {
    id: 'top_3',
    name: 'Podium Finish',
    description: 'Reach top 3 on any leaderboard',
    icon: '🏆',
    rarity: 'LEGENDARY',
    category: 'SOCIAL',
    xpReward: 500,
    requirement: { type: 'leaderboard_rank', value: 3 },
  },
]

export interface UserBadge {
  id: string
  badgeId: string
  userId: string
  badge: BadgeDefinition
  earnedAt: Date
  showcased: boolean
}

export interface BadgeProgress {
  badge: BadgeDefinition
  currentValue: number
  targetValue: number
  percentage: number
  isEarned: boolean
  earnedAt?: Date
}

/**
 * Get all badges for a user (earned and progress)
 */
export async function getUserBadges(userId: string): Promise<{
  earned: UserBadge[]
  inProgress: BadgeProgress[]
  available: BadgeDefinition[]
}> {
  // Get user's earned badges
  const earnedBadges = await prisma.gamification_user_badges.findMany({
    where: { userId },
    orderBy: { earnedAt: 'desc' },
  })

  const earnedBadgeIds = new Set(earnedBadges.map((b) => b.badgeId))

  // Get user stats for progress calculation
  const userStats = await prisma.mcq_user_stats.findUnique({
    where: { userId },
  })

  // Map earned badges
  const earned: UserBadge[] = earnedBadges.map((eb) => {
    const definition = BADGE_DEFINITIONS.find((d) => d.id === eb.badgeId)
    return {
      id: eb.id,
      badgeId: eb.badgeId,
      userId: eb.userId,
      badge: definition!,
      earnedAt: eb.earnedAt,
      showcased: eb.showcased,
    }
  })

  // Calculate progress for unearned badges
  const inProgress: BadgeProgress[] = []
  const available: BadgeDefinition[] = []

  for (const badge of BADGE_DEFINITIONS) {
    if (earnedBadgeIds.has(badge.id)) continue

    const progress = await calculateBadgeProgress(badge, userId, userStats)

    if (progress.percentage > 0 && progress.percentage < 100) {
      inProgress.push(progress)
    } else if (progress.percentage === 0) {
      available.push(badge)
    }
  }

  // Sort in-progress by percentage descending
  inProgress.sort((a, b) => b.percentage - a.percentage)

  return { earned, inProgress, available }
}

/**
 * Check and award badges based on current user stats
 */
export async function checkAndAwardBadges(
  userId: string,
  context?: {
    sessionAccuracy?: number
    sessionQuestions?: number
    testScore?: number
    leaderboardRank?: number
    isStreakRecovery?: boolean
  }
): Promise<UserBadge[]> {
  const userStats = await prisma.mcq_user_stats.findUnique({
    where: { userId },
  })

  if (!userStats) return []

  const earnedBadges = await prisma.gamification_user_badges.findMany({
    where: { userId },
    select: { badgeId: true },
  })

  const earnedBadgeIds = new Set(earnedBadges.map((b) => b.badgeId))
  const newBadges: UserBadge[] = []

  for (const badge of BADGE_DEFINITIONS) {
    if (earnedBadgeIds.has(badge.id)) continue

    const shouldAward = await checkBadgeRequirement(badge, userId, userStats, context)

    if (shouldAward) {
      const awarded = await awardBadge(userId, badge)
      if (awarded) {
        newBadges.push(awarded)
      }
    }
  }

  return newBadges
}

/**
 * Award a specific badge to a user
 */
export async function awardBadge(userId: string, badge: BadgeDefinition): Promise<UserBadge | null> {
  // Check if already earned
  const existing = await prisma.gamification_user_badges.findFirst({
    where: { userId, badgeId: badge.id },
  })

  if (existing) return null

  // Award the badge
  const userBadge = await prisma.gamification_user_badges.create({
    data: {
      userId,
      badgeId: badge.id,
      badgeName: badge.name,
      badgeDescription: badge.description,
      rarity: badge.rarity,
      category: badge.category,
      iconUrl: badge.icon,
      xpRewarded: badge.xpReward,
    },
  })

  // Award XP for the badge
  await recordXpEvent({
    userId,
    eventType: 'BADGE_EARNED',
    xpAmount: badge.xpReward,
    description: `Earned badge: ${badge.name}`,
    metadata: { badgeId: badge.id, badgeName: badge.name, rarity: badge.rarity },
    relatedEntityId: userBadge.id,
    relatedEntityType: 'badge',
  })

  // Create notification
  await prisma.gamification_notifications.create({
    data: {
      userId,
      type: 'BADGE_EARNED',
      title: 'New Badge Unlocked!',
      message: `You earned the "${badge.name}" badge! +${badge.xpReward} XP`,
      metadata: {
        badgeId: badge.id,
        badgeName: badge.name,
        badgeIcon: badge.icon,
        rarity: badge.rarity,
        xpReward: badge.xpReward,
      },
      priority: badge.rarity === 'LEGENDARY' || badge.rarity === 'EPIC' ? 'HIGH' : 'NORMAL',
    },
  })

  // Update badgesEarned array in user stats
  await prisma.mcq_user_stats.update({
    where: { userId },
    data: {
      badgesEarned: {
        push: badge.id,
      },
    },
  })

  return {
    id: userBadge.id,
    badgeId: badge.id,
    userId,
    badge,
    earnedAt: userBadge.earnedAt,
    showcased: false,
  }
}

/**
 * Toggle showcase status for a badge
 */
export async function toggleBadgeShowcase(
  userId: string,
  badgeId: string,
  showcased: boolean
): Promise<boolean> {
  // Max 3 showcased badges
  if (showcased) {
    const currentShowcased = await prisma.gamification_user_badges.count({
      where: { userId, showcased: true },
    })

    if (currentShowcased >= 3) {
      return false // Can't showcase more than 3
    }
  }

  await prisma.gamification_user_badges.updateMany({
    where: { userId, badgeId },
    data: { showcased },
  })

  return true
}

/**
 * Get showcased badges for a user (for profile display)
 */
export async function getShowcasedBadges(userId: string): Promise<UserBadge[]> {
  const showcased = await prisma.gamification_user_badges.findMany({
    where: { userId, showcased: true },
    orderBy: { earnedAt: 'desc' },
    take: 3,
  })

  return showcased.map((sb) => {
    const definition = BADGE_DEFINITIONS.find((d) => d.id === sb.badgeId)
    return {
      id: sb.id,
      badgeId: sb.badgeId,
      userId: sb.userId,
      badge: definition!,
      earnedAt: sb.earnedAt,
      showcased: sb.showcased,
    }
  })
}

// Helper functions

async function calculateBadgeProgress(
  badge: BadgeDefinition,
  userId: string,
  userStats: any
): Promise<BadgeProgress> {
  let currentValue = 0
  const targetValue = badge.requirement.value

  switch (badge.requirement.type) {
    case 'streak':
      currentValue = userStats?.longestStreak || 0
      break
    case 'accuracy':
      currentValue = userStats?.totalQuestions
        ? Math.round((userStats.correctAnswers / userStats.totalQuestions) * 100)
        : 0
      break
    case 'questions':
      currentValue = userStats?.totalQuestions || 0
      break
    case 'first_session':
      currentValue = userStats?.totalQuestions > 0 ? 1 : 0
      break
    default:
      // For complex badges, would need specific queries
      currentValue = 0
  }

  const percentage = Math.min(100, Math.round((currentValue / targetValue) * 100))

  return {
    badge,
    currentValue,
    targetValue,
    percentage,
    isEarned: percentage >= 100,
  }
}

async function checkBadgeRequirement(
  badge: BadgeDefinition,
  userId: string,
  userStats: any,
  context?: any
): Promise<boolean> {
  const req = badge.requirement

  switch (req.type) {
    case 'streak':
      return (userStats.currentStreak || 0) >= req.value

    case 'accuracy':
      if (!userStats.totalQuestions || userStats.totalQuestions < 50) return false
      const accuracy = (userStats.correctAnswers / userStats.totalQuestions) * 100
      return accuracy >= req.value

    case 'questions':
      return (userStats.totalQuestions || 0) >= req.value

    case 'perfect_session':
      return context?.sessionAccuracy === 100 && (context?.sessionQuestions || 0) >= 10

    case 'first_session':
      return (userStats.totalQuestions || 0) >= 1

    case 'streak_recovery':
      return context?.isStreakRecovery === true

    case 'mock_test_score':
      return context?.testScore !== undefined && context.testScore >= req.value

    case 'leaderboard_rank':
      return context?.leaderboardRank !== undefined && context.leaderboardRank <= req.value

    default:
      return false
  }
}

export default {
  BADGE_DEFINITIONS,
  getUserBadges,
  checkAndAwardBadges,
  awardBadge,
  toggleBadgeShowcase,
  getShowcasedBadges,
}
