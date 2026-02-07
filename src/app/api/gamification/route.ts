import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import {
  getStreakStatus,
  getXpBreakdown,
  getUserBadges,
  getUserGoals,
  getUnreadCount,
  getShowcasedBadges,
} from '@/lib/gamification'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const freeUserId = searchParams.get('freeUserId')

    // Check for authenticated user first
    const session = await auth()
    const authenticatedUserId = session?.user?.id

    // Determine which user to fetch
    const isPaidUser = !!authenticatedUserId && !freeUserId
    const userIdToQuery = freeUserId || userId || authenticatedUserId

    if (!userIdToQuery) {
      return NextResponse.json({ error: 'Missing userId or freeUserId parameter' }, { status: 400 })
    }

    // Fetch data based on user type
    if (isPaidUser && authenticatedUserId === userIdToQuery) {
      return await getPaidUserGamification(authenticatedUserId)
    }

    // Legacy free user gamification
    return await getFreeUserGamification(userIdToQuery)
  } catch (error) {
    console.error('Error fetching gamification data:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch gamification data',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

/**
 * Get gamification data for paid/authenticated users
 * Uses the new gamification services
 */
async function getPaidUserGamification(userId: string) {
  // Fetch user stats from mcq_user_stats
  const userStats = await prisma.mcq_user_stats.findUnique({
    where: { userId },
  })

  // Get user info
  const user = await prisma.users.findUnique({
    where: { id: userId },
    select: { id: true, name: true, subscriptionTier: true },
  })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  // Parallel fetch for performance
  const [streakStatus, xpBreakdown, badges, goals, notificationCount, showcasedBadges] =
    await Promise.all([
      getStreakStatus(userId),
      getXpBreakdown(userId),
      getUserBadges(userId),
      getUserGoals(userId),
      getUnreadCount(userId),
      getShowcasedBadges(userId),
    ])

  const currentLevel = userStats?.currentLevel || 1
  const totalPoints = userStats?.totalPoints || 0
  const { xpForCurrentLevel, xpForNextLevel, levelProgress } = calculateLevelProgress(
    currentLevel,
    totalPoints
  )

  return NextResponse.json({
    success: true,
    user: {
      id: user.id,
      name: user.name || 'Student',
      tier: user.subscriptionTier,
      isPaidUser: true,
    },
    gamification: {
      // XP and Level
      totalPoints,
      currentLevel,
      levelName: getLevelName(currentLevel),
      xpInCurrentLevel: totalPoints - xpForCurrentLevel,
      xpNeededForNextLevel: xpForNextLevel - xpForCurrentLevel,
      levelProgress,

      // Streak (enhanced with protection)
      streak: streakStatus
        ? {
            current: streakStatus.currentStreak,
            longest: streakStatus.longestStreak,
            isAtRisk: streakStatus.isAtRisk,
            isProtected: streakStatus.isProtected,
            protectedUntil: streakStatus.protectedUntil,
            freezesAvailable: streakStatus.freezesAvailable,
            canRecover: streakStatus.canRecover,
            recoveryDeadline: streakStatus.recoveryDeadline,
            recoveryXpCost: streakStatus.recoveryXpCost,
            lastActivity: streakStatus.lastActivity,
            nextMilestone: getNextStreakMilestone(streakStatus.currentStreak),
          }
        : null,

      // XP Breakdown
      xpBreakdown: {
        today: xpBreakdown.byPeriod.today,
        thisWeek: xpBreakdown.byPeriod.thisWeek,
        thisMonth: xpBreakdown.byPeriod.thisMonth,
        byCategory: xpBreakdown.byCategory,
      },

      // Badges (enhanced)
      badges: {
        earned: badges.earned.length,
        total: badges.earned.length + badges.inProgress.length + badges.available.length,
        recent: badges.earned.slice(0, 5),
        inProgress: badges.inProgress.slice(0, 3),
        showcased: showcasedBadges,
      },

      // Goals
      goals: {
        daily: goals.daily,
        weekly: goals.weekly,
        completedToday: [...goals.daily, ...goals.weekly].filter((g) => g.goal.isCompleted).length,
      },

      // Notifications
      unreadNotifications: notificationCount,

      // Stats
      stats: {
        totalQuestions: userStats?.totalQuestions || 0,
        correctAnswers: userStats?.correctAnswers || 0,
        accuracy: userStats?.totalQuestions
          ? Math.round((userStats.correctAnswers / userStats.totalQuestions) * 100)
          : 0,
        weeklyXp: userStats?.weeklyXp || 0,
        monthlyXp: userStats?.monthlyXp || 0,
      },
    },
  })
}

/**
 * Legacy gamification for free users
 */
async function getFreeUserGamification(userIdToQuery: string) {
  const user = await prisma.free_users.findUnique({
    where: { id: userIdToQuery },
    select: {
      id: true,
      name: true,
      totalPoints: true,
      currentLevel: true,
      studyStreak: true,
      achievements: {
        orderBy: {
          earnedAt: 'desc',
        },
      },
    },
  })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  const currentLevel = user.currentLevel || 1
  const totalPoints = user.totalPoints || 0
  const { xpForCurrentLevel, xpForNextLevel, levelProgress } = calculateLevelProgress(
    currentLevel,
    totalPoints
  )

  const achievements = user.achievements.map((achievement) => ({
    id: achievement.id,
    type: achievement.type,
    title: achievement.title,
    description: achievement.description,
    icon: achievement.icon || getIconForAchievementType(achievement.type),
    points: achievement.points,
    isCompleted: achievement.isCompleted,
    earnedAt: achievement.earnedAt,
    currentProgress: achievement.currentProgress,
    targetProgress: achievement.targetProgress,
  }))

  const completedAchievements = achievements.filter((a) => a.isCompleted)
  const inProgressAchievements = achievements.filter((a) => !a.isCompleted)
  const recentAchievements = completedAchievements.slice(0, 5)

  const studyStreak = user.studyStreak || 0
  const streakMilestone = getNextStreakMilestone(studyStreak)

  return NextResponse.json({
    success: true,
    user: {
      id: user.id,
      name: user.name || 'Student',
      isPaidUser: false,
    },
    gamification: {
      totalPoints,
      currentLevel,
      levelName: getLevelName(currentLevel),
      xpInCurrentLevel: totalPoints - xpForCurrentLevel,
      xpNeededForNextLevel: xpForNextLevel - xpForCurrentLevel,
      levelProgress,

      streak: {
        current: studyStreak,
        longest: studyStreak,
        nextMilestone: streakMilestone,
      },

      badges: {
        total: achievements.length,
        earned: completedAchievements.length,
        recent: recentAchievements,
        inProgress: inProgressAchievements.slice(0, 3),
      },

      rank: null,
    },
  })
}

function calculateLevelProgress(currentLevel: number, totalPoints: number) {
  const levels = [0, 100, 250, 500, 1000, 2000, 3500, 5500, 7500, 10000, Infinity]
  const xpForCurrentLevel = levels[currentLevel - 1] || 0
  const xpForNextLevel = levels[currentLevel] || levels[levels.length - 1]
  const xpInCurrentLevel = Math.max(0, totalPoints - xpForCurrentLevel)
  const xpNeededForNextLevel = xpForNextLevel - xpForCurrentLevel
  const levelProgress = Math.min(100, Math.round((xpInCurrentLevel / xpNeededForNextLevel) * 100))

  return { xpForCurrentLevel, xpForNextLevel, levelProgress }
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
  return names[level - 1] || 'NEET Warrior'
}

function getIconForAchievementType(type: string): string {
  const iconMap: Record<string, string> = {
    FIRST_TEST: '🎯',
    STREAK_7_DAYS: '🔥',
    STREAK_30_DAYS: '🏆',
    TOPIC_MASTER: '⭐',
    SPEED_DEMON: '⚡',
    PERFECTIONIST: '💯',
    COMMUNITY_HELPER: '🤝',
    BOOKWORM: '📚',
  }

  return iconMap[type] || '🏅'
}

function getNextStreakMilestone(currentStreak: number): { days: number; reward: number } {
  const milestones = [
    { days: 7, reward: 50 },
    { days: 14, reward: 100 },
    { days: 30, reward: 250 },
    { days: 60, reward: 500 },
    { days: 90, reward: 1000 },
    { days: 180, reward: 2500 },
    { days: 365, reward: 5000 },
  ]

  for (const milestone of milestones) {
    if (currentStreak < milestone.days) {
      return milestone
    }
  }

  // If they've passed all milestones, return the highest one
  return milestones[milestones.length - 1]
}
