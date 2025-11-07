import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const freeUserId = searchParams.get('freeUserId')

    if (!userId && !freeUserId) {
      return NextResponse.json({ error: 'Missing userId or freeUserId parameter' }, { status: 400 })
    }

    // For now, we'll focus on FreeUser gamification
    // Can extend to paid users later
    const userIdToQuery = freeUserId || userId

    if (!userIdToQuery) {
      return NextResponse.json({ error: 'Invalid user identifier' }, { status: 400 })
    }

    // Fetch user data with points, level, and streak
    const user = await prisma.freeUser.findUnique({
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

    // Calculate XP progress to next level
    // Level progression: Level 1 = 0-100 XP, Level 2 = 100-250 XP, Level 3 = 250-500 XP, etc.
    // Formula: XP for next level = currentLevel * 150 + 100
    const currentLevel = user.currentLevel || 1
    const totalPoints = user.totalPoints || 0
    const xpForCurrentLevel = (currentLevel - 1) * 150 + 100
    const xpForNextLevel = currentLevel * 150 + 100
    const xpInCurrentLevel = Math.max(0, totalPoints - xpForCurrentLevel)
    const xpNeededForNextLevel = xpForNextLevel - xpForCurrentLevel

    // Calculate percentage progress to next level
    const levelProgress = Math.min(100, Math.round((xpInCurrentLevel / xpNeededForNextLevel) * 100))

    // Format achievements
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

    // Separate completed and in-progress achievements
    const completedAchievements = achievements.filter((a) => a.isCompleted)
    const inProgressAchievements = achievements.filter((a) => !a.isCompleted)

    // Get recent achievements (last 5 completed)
    const recentAchievements = completedAchievements.slice(0, 5)

    // Calculate study streak details
    const studyStreak = user.studyStreak || 0
    const longestStreak = studyStreak // We'll track this separately in the future
    const streakMilestone = getNextStreakMilestone(studyStreak)

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name || 'Student',
      },
      gamification: {
        // XP and Level
        totalPoints,
        currentLevel,
        xpInCurrentLevel,
        xpNeededForNextLevel,
        levelProgress,

        // Study Streak
        studyStreak,
        longestStreak,
        streakMilestone,

        // Achievements
        totalAchievements: achievements.length,
        completedAchievements: completedAchievements.length,
        recentAchievements,
        inProgressAchievements: inProgressAchievements.slice(0, 3), // Show top 3 in progress

        // Leaderboard position (simplified for now)
        rank: null, // Can calculate if needed
      },
    })
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
