// MCQ Gamification Engine
// Handles XP calculation, level progression, streaks, and badges

import {
  LEVEL_CONFIG,
  XP_REWARDS,
  type UserStats,
  type TopicMastery,
  type LevelConfig,
} from './types'
import type { DifficultyLevel, BadgeCategory, BadgeRarity } from '@/generated/prisma'

// ============================================
// XP CALCULATION
// ============================================

export function calculateXPForAnswer(
  isCorrect: boolean,
  difficulty: DifficultyLevel,
  isFirstAttempt: boolean = true
): number {
  if (!isCorrect) return 0

  let xp = 0
  switch (difficulty) {
    case 'EASY':
      xp = XP_REWARDS.correctEasy
      break
    case 'MEDIUM':
      xp = XP_REWARDS.correctMedium
      break
    case 'HARD':
      xp = XP_REWARDS.correctHard
      break
    default:
      xp = XP_REWARDS.correctMedium
  }

  if (isFirstAttempt) {
    xp += XP_REWARDS.firstAttemptBonus
  }

  return xp
}

export function calculateDailyChallengeXP(
  score: number,
  totalQuestions: number,
  baseReward: number = XP_REWARDS.dailyChallengeComplete,
  bonusReward: number = XP_REWARDS.dailyChallengePerfect
): number {
  if (score === 0) return 0

  let xp = baseReward
  if (score === totalQuestions) {
    xp += bonusReward
  }

  return xp
}

// ============================================
// LEVEL SYSTEM
// ============================================

export function getLevelFromXP(totalXp: number): LevelConfig {
  let currentLevel = LEVEL_CONFIG[0]

  for (const level of LEVEL_CONFIG) {
    if (totalXp >= level.xpRequired) {
      currentLevel = level
    } else {
      break
    }
  }

  return currentLevel
}

export function getLevelProgress(totalXp: number): {
  currentLevel: LevelConfig
  nextLevel: LevelConfig | null
  progress: number
  xpToNextLevel: number
} {
  const currentLevel = getLevelFromXP(totalXp)
  const currentIndex = LEVEL_CONFIG.findIndex((l) => l.level === currentLevel.level)
  const nextLevel = currentIndex < LEVEL_CONFIG.length - 1 ? LEVEL_CONFIG[currentIndex + 1] : null

  if (!nextLevel) {
    return {
      currentLevel,
      nextLevel: null,
      progress: 100,
      xpToNextLevel: 0,
    }
  }

  const xpInCurrentLevel = totalXp - currentLevel.xpRequired
  const xpNeededForNextLevel = nextLevel.xpRequired - currentLevel.xpRequired
  const progress = (xpInCurrentLevel / xpNeededForNextLevel) * 100

  return {
    currentLevel,
    nextLevel,
    progress: Math.min(progress, 100),
    xpToNextLevel: nextLevel.xpRequired - totalXp,
  }
}

export function checkLevelUp(
  previousXp: number,
  newXp: number
): { leveledUp: boolean; newLevel?: LevelConfig; previousLevel?: LevelConfig } {
  const previousLevel = getLevelFromXP(previousXp)
  const newLevel = getLevelFromXP(newXp)

  if (newLevel.level > previousLevel.level) {
    return {
      leveledUp: true,
      newLevel,
      previousLevel,
    }
  }

  return { leveledUp: false }
}

// ============================================
// STREAK MANAGEMENT
// ============================================

export function updateStreak(
  lastPracticeDate: Date | null,
  currentStreak: number,
  minimumQuestions: number = 5,
  questionsToday: number = 0
): {
  newStreak: number
  streakBroken: boolean
  streakMaintained: boolean
  streakIncreased: boolean
} {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  if (!lastPracticeDate) {
    if (questionsToday >= minimumQuestions) {
      return {
        newStreak: 1,
        streakBroken: false,
        streakMaintained: false,
        streakIncreased: true,
      }
    }
    return {
      newStreak: 0,
      streakBroken: false,
      streakMaintained: false,
      streakIncreased: false,
    }
  }

  const lastPractice = new Date(lastPracticeDate)
  const lastPracticeDay = new Date(
    lastPractice.getFullYear(),
    lastPractice.getMonth(),
    lastPractice.getDate()
  )

  const dayDiff = Math.floor((today.getTime() - lastPracticeDay.getTime()) / (1000 * 60 * 60 * 24))

  if (dayDiff === 0) {
    return {
      newStreak: currentStreak,
      streakBroken: false,
      streakMaintained: true,
      streakIncreased: false,
    }
  }

  if (dayDiff === 1 && questionsToday >= minimumQuestions) {
    return {
      newStreak: currentStreak + 1,
      streakBroken: false,
      streakMaintained: false,
      streakIncreased: true,
    }
  }

  if (questionsToday >= minimumQuestions) {
    return {
      newStreak: 1,
      streakBroken: currentStreak > 0,
      streakMaintained: false,
      streakIncreased: false,
    }
  }

  return {
    newStreak: 0,
    streakBroken: currentStreak > 0,
    streakMaintained: false,
    streakIncreased: false,
  }
}

export function getStreakBonus(streak: number): number {
  if (streak >= 30) return XP_REWARDS.streak30Days
  if (streak >= 7) return XP_REWARDS.streak7Days
  return 0
}

export function shouldAwardStreakBadge(
  previousStreak: number,
  newStreak: number
): { award: boolean; milestoneReached?: number } {
  const milestones = [3, 7, 14, 30, 60, 100]

  for (const milestone of milestones) {
    if (previousStreak < milestone && newStreak >= milestone) {
      return { award: true, milestoneReached: milestone }
    }
  }

  return { award: false }
}

// ============================================
// TOPIC MASTERY
// ============================================

export function updateTopicMastery(
  currentMastery: Record<string, TopicMastery> | null,
  topic: string,
  isCorrect: boolean
): Record<string, TopicMastery> {
  const mastery = currentMastery || {}

  if (!mastery[topic]) {
    mastery[topic] = { attempted: 0, correct: 0, mastery: 0 }
  }

  mastery[topic].attempted += 1
  if (isCorrect) {
    mastery[topic].correct += 1
  }

  mastery[topic].mastery = Math.round((mastery[topic].correct / mastery[topic].attempted) * 100)

  return mastery
}

export function identifyWeakAndStrongTopics(
  mastery: Record<string, TopicMastery> | null,
  minAttempts: number = 10
): { weakTopics: string[]; strongTopics: string[] } {
  if (!mastery) {
    return { weakTopics: [], strongTopics: [] }
  }

  const weakTopics: string[] = []
  const strongTopics: string[] = []

  for (const [topic, data] of Object.entries(mastery)) {
    if (data.attempted < minAttempts) continue

    if (data.mastery < 60) {
      weakTopics.push(topic)
    } else if (data.mastery >= 85) {
      strongTopics.push(topic)
    }
  }

  return { weakTopics, strongTopics }
}

// ============================================
// ACCURACY CALCULATION
// ============================================

export function calculateAccuracy(correct: number, total: number): number {
  if (total === 0) return 0
  return Math.round((correct / total) * 100 * 100) / 100
}

// ============================================
// BADGE SYSTEM
// ============================================

export interface BadgeDefinition {
  code: string
  name: string
  description: string
  icon: string
  category: BadgeCategory
  rarity: BadgeRarity
  requirement: {
    type: 'streak' | 'questions' | 'accuracy' | 'contribution' | 'topic_mastery' | 'daily_challenge'
    value: number
    topic?: string
  }
  xpReward: number
}

export const BADGE_DEFINITIONS: BadgeDefinition[] = [
  {
    code: 'first_steps',
    name: 'First Steps',
    description: 'Complete your first 10 questions',
    icon: '👣',
    category: 'MILESTONE',
    rarity: 'COMMON',
    requirement: { type: 'questions', value: 10 },
    xpReward: 10,
  },
  {
    code: 'century',
    name: 'Century',
    description: 'Answer 100 questions',
    icon: '💯',
    category: 'MILESTONE',
    rarity: 'UNCOMMON',
    requirement: { type: 'questions', value: 100 },
    xpReward: 50,
  },
  {
    code: 'thousand_club',
    name: 'Thousand Club',
    description: 'Answer 1000 questions',
    icon: '🎯',
    category: 'MILESTONE',
    rarity: 'RARE',
    requirement: { type: 'questions', value: 1000 },
    xpReward: 200,
  },
  {
    code: 'consistent_3',
    name: 'Getting Started',
    description: 'Maintain a 3-day streak',
    icon: '🔥',
    category: 'STREAK',
    rarity: 'COMMON',
    requirement: { type: 'streak', value: 3 },
    xpReward: 15,
  },
  {
    code: 'week_warrior',
    name: 'Week Warrior',
    description: 'Maintain a 7-day streak',
    icon: '⚡',
    category: 'STREAK',
    rarity: 'UNCOMMON',
    requirement: { type: 'streak', value: 7 },
    xpReward: 50,
  },
  {
    code: 'fortnight_fighter',
    name: 'Fortnight Fighter',
    description: 'Maintain a 14-day streak',
    icon: '🌟',
    category: 'STREAK',
    rarity: 'RARE',
    requirement: { type: 'streak', value: 14 },
    xpReward: 100,
  },
  {
    code: 'monthly_master',
    name: 'Monthly Master',
    description: 'Maintain a 30-day streak',
    icon: '👑',
    category: 'STREAK',
    rarity: 'EPIC',
    requirement: { type: 'streak', value: 30 },
    xpReward: 300,
  },
  {
    code: 'sharpshooter',
    name: 'Sharpshooter',
    description: 'Achieve 90%+ accuracy (min 20 questions)',
    icon: '🎯',
    category: 'ACCURACY',
    rarity: 'UNCOMMON',
    requirement: { type: 'accuracy', value: 90 },
    xpReward: 75,
  },
  {
    code: 'perfectionist',
    name: 'Perfectionist',
    description: 'Achieve 95%+ accuracy (min 50 questions)',
    icon: '💎',
    category: 'ACCURACY',
    rarity: 'RARE',
    requirement: { type: 'accuracy', value: 95 },
    xpReward: 150,
  },
  {
    code: 'contributor',
    name: 'Contributor',
    description: 'Get your first question approved',
    icon: '✍️',
    category: 'CONTRIBUTOR',
    rarity: 'UNCOMMON',
    requirement: { type: 'contribution', value: 1 },
    xpReward: 100,
  },
  {
    code: 'prolific_author',
    name: 'Prolific Author',
    description: 'Get 10 questions approved',
    icon: '📝',
    category: 'CONTRIBUTOR',
    rarity: 'RARE',
    requirement: { type: 'contribution', value: 10 },
    xpReward: 500,
  },
  {
    code: 'daily_devotee_5',
    name: 'Daily Devotee',
    description: 'Complete 5 daily challenges',
    icon: '📅',
    category: 'SPECIAL',
    rarity: 'UNCOMMON',
    requirement: { type: 'daily_challenge', value: 5 },
    xpReward: 50,
  },
  {
    code: 'daily_devotee_30',
    name: 'Challenge Champion',
    description: 'Complete 30 daily challenges',
    icon: '🏆',
    category: 'SPECIAL',
    rarity: 'EPIC',
    requirement: { type: 'daily_challenge', value: 30 },
    xpReward: 300,
  },
]

export function checkBadgeUnlock(stats: UserStats, existingBadges: string[]): BadgeDefinition[] {
  const newBadges: BadgeDefinition[] = []

  for (const badge of BADGE_DEFINITIONS) {
    if (existingBadges.includes(badge.code)) continue

    let unlocked = false

    switch (badge.requirement.type) {
      case 'questions':
        unlocked = stats.totalQuestions >= badge.requirement.value
        break
      case 'streak':
        unlocked =
          stats.currentStreak >= badge.requirement.value ||
          stats.longestStreak >= badge.requirement.value
        break
      case 'accuracy':
        const minQuestions = badge.requirement.value === 90 ? 20 : 50
        unlocked = stats.totalQuestions >= minQuestions && stats.accuracy >= badge.requirement.value
        break
      case 'contribution':
        unlocked = stats.questionsApproved >= badge.requirement.value
        break
      case 'daily_challenge':
        unlocked = stats.dailyChallengesTotal >= badge.requirement.value
        break
    }

    if (unlocked) {
      newBadges.push(badge)
    }
  }

  return newBadges
}

// ============================================
// CONTRIBUTOR RANK
// ============================================

export type ContributorRank = 'BRONZE' | 'SILVER' | 'GOLD' | 'EXPERT'

export function getContributorRank(questionsApproved: number): ContributorRank | null {
  if (questionsApproved >= 50) return 'EXPERT'
  if (questionsApproved >= 20) return 'GOLD'
  if (questionsApproved >= 10) return 'SILVER'
  if (questionsApproved >= 3) return 'BRONZE'
  return null
}

export function getContributorRankDetails(rank: ContributorRank | null): {
  name: string
  icon: string
  color: string
  minQuestions: number
} | null {
  const ranks = {
    BRONZE: { name: 'Bronze Contributor', icon: '🥉', color: '#CD7F32', minQuestions: 3 },
    SILVER: { name: 'Silver Contributor', icon: '🥈', color: '#C0C0C0', minQuestions: 10 },
    GOLD: { name: 'Gold Contributor', icon: '🥇', color: '#FFD700', minQuestions: 20 },
    EXPERT: { name: 'Expert Contributor', icon: '💫', color: '#9B59B6', minQuestions: 50 },
  }

  return rank ? ranks[rank] : null
}
