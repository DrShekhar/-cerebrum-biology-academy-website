import { prisma } from '@/lib/prisma'

/**
 * Study Streak Calculation Utilities
 * Tracks consecutive days of user activity and study patterns
 */

/**
 * Result interface for study streak calculations
 */
export interface StreakResult {
  currentStreak: number
  bestStreak: number
  lastActive: Date | null
  totalActiveDays: number
  streakStartDate: Date | null
  isActiveToday: boolean
  daysUntilStreakBreak: number
}

/**
 * Activity data for a specific date
 */
interface ActivityData {
  date: Date
  testSessionCount: number
  questionResponseCount: number
  studyTimeMinutes: number
}

/**
 * Calculate user's current and best study streak
 * Counts consecutive days with any activity (tests, questions, or study time)
 *
 * @param userId - User or FreeUser ID
 * @param userType - Type of user ('user' or 'freeUser')
 * @param minActivityThreshold - Minimum activities required for a day to count (default: 1)
 * @returns StreakResult with current streak, best streak, and related metrics
 */
export async function calculateStudyStreak(
  userId: string,
  userType: 'user' | 'freeUser' = 'freeUser',
  minActivityThreshold: number = 1
): Promise<StreakResult> {
  try {
    const userField = userType === 'user' ? 'userId' : 'freeUserId'

    // Get all activity dates
    const activityDates = await getActivityDates(userId, userType)

    if (activityDates.length === 0) {
      return {
        currentStreak: 0,
        bestStreak: 0,
        lastActive: null,
        totalActiveDays: 0,
        streakStartDate: null,
        isActiveToday: false,
        daysUntilStreakBreak: 0,
      }
    }

    // Sort dates in descending order (most recent first)
    const sortedDates = activityDates
      .map((d) => normalizeDate(d))
      .sort((a, b) => b.getTime() - a.getTime())

    const today = normalizeDate(new Date())
    const yesterday = normalizeDate(new Date(Date.now() - 24 * 60 * 60 * 1000))
    const mostRecentActivity = sortedDates[0]

    // Check if active today or yesterday (grace period)
    const isActiveToday = isSameDay(mostRecentActivity, today)
    const isActiveYesterday = isSameDay(mostRecentActivity, yesterday)

    // Calculate current streak
    let currentStreak = 0
    let streakStartDate: Date | null = null

    if (isActiveToday || isActiveYesterday) {
      currentStreak = 1
      streakStartDate = mostRecentActivity
      let previousDate = mostRecentActivity

      for (let i = 1; i < sortedDates.length; i++) {
        const currentDate = sortedDates[i]
        const dayDiff = getDaysDifference(previousDate, currentDate)

        if (dayDiff === 1) {
          // Consecutive day
          currentStreak++
          streakStartDate = currentDate
          previousDate = currentDate
        } else {
          // Streak broken
          break
        }
      }
    }

    // Calculate best streak (all time)
    const bestStreak = calculateBestStreak(sortedDates)

    // Calculate days until streak break
    const daysUntilStreakBreak = currentStreak > 0 ? (isActiveToday ? 1 : 0) : 0

    return {
      currentStreak,
      bestStreak,
      lastActive: mostRecentActivity,
      totalActiveDays: new Set(sortedDates.map((d) => d.toDateString())).size,
      streakStartDate,
      isActiveToday,
      daysUntilStreakBreak,
    }
  } catch (error) {
    console.error('Error calculating study streak:', error)
    throw new Error('Failed to calculate study streak')
  }
}

/**
 * Get user's best streak (longest consecutive days) in history
 *
 * @param userId - User or FreeUser ID
 * @param userType - Type of user ('user' or 'freeUser')
 * @returns Number of consecutive days in best streak
 */
export async function getBestStreak(
  userId: string,
  userType: 'user' | 'freeUser' = 'freeUser'
): Promise<number> {
  try {
    const activityDates = await getActivityDates(userId, userType)

    if (activityDates.length === 0) {
      return 0
    }

    const sortedDates = activityDates
      .map((d) => normalizeDate(d))
      .sort((a, b) => b.getTime() - a.getTime())

    return calculateBestStreak(sortedDates)
  } catch (error) {
    console.error('Error getting best streak:', error)
    throw new Error('Failed to get best streak')
  }
}

/**
 * Get user's last active date (most recent activity)
 *
 * @param userId - User or FreeUser ID
 * @param userType - Type of user ('user' or 'freeUser')
 * @returns Date of last activity or null if no activity
 */
export async function getLastActiveDate(
  userId: string,
  userType: 'user' | 'freeUser' = 'freeUser'
): Promise<Date | null> {
  try {
    const userField = userType === 'user' ? 'userId' : 'freeUserId'

    // Check test sessions
    const latestTestSession = await prisma.testSession.findFirst({
      where: {
        [userField]: userId,
        submittedAt: { not: null },
      },
      orderBy: {
        submittedAt: 'desc',
      },
      select: {
        submittedAt: true,
      },
    })

    // Check question responses
    const latestQuestionResponse = await prisma.userQuestionResponse.findFirst({
      where: {
        [userField]: userId,
      },
      orderBy: {
        answeredAt: 'desc',
      },
      select: {
        answeredAt: true,
      },
    })

    // Check last active field in user table
    let lastActiveFromProfile: Date | null = null
    if (userType === 'user') {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { lastActiveAt: true },
      })
      lastActiveFromProfile = user?.lastActiveAt || null
    } else {
      const freeUser = await prisma.freeUser.findUnique({
        where: { id: userId },
        select: { lastActiveDate: true },
      })
      lastActiveFromProfile = freeUser?.lastActiveDate || null
    }

    // Get the most recent date from all sources
    const dates = [
      latestTestSession?.submittedAt,
      latestQuestionResponse?.answeredAt,
      lastActiveFromProfile,
    ].filter((d): d is Date => d !== null && d !== undefined)

    if (dates.length === 0) {
      return null
    }

    return new Date(Math.max(...dates.map((d) => d.getTime())))
  } catch (error) {
    console.error('Error getting last active date:', error)
    throw new Error('Failed to get last active date')
  }
}

/**
 * Get detailed activity calendar for a user
 * Returns activity data for each day in a specified period
 *
 * @param userId - User or FreeUser ID
 * @param userType - Type of user ('user' or 'freeUser')
 * @param days - Number of days to look back (default: 30)
 * @returns Array of activity data for each day
 */
export async function getActivityCalendar(
  userId: string,
  userType: 'user' | 'freeUser' = 'freeUser',
  days: number = 30
): Promise<ActivityData[]> {
  try {
    const userField = userType === 'user' ? 'userId' : 'freeUserId'
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)
    startDate.setHours(0, 0, 0, 0)

    // Get test sessions
    const testSessions = await prisma.testSession.findMany({
      where: {
        [userField]: userId,
        submittedAt: { gte: startDate },
      },
      select: {
        submittedAt: true,
        timeSpent: true,
      },
    })

    // Get question responses
    const questionResponses = await prisma.userQuestionResponse.findMany({
      where: {
        [userField]: userId,
        answeredAt: { gte: startDate },
      },
      select: {
        answeredAt: true,
        timeSpent: true,
      },
    })

    // Group by date
    const activityMap = new Map<string, ActivityData>()

    // Process test sessions
    for (const session of testSessions) {
      if (!session.submittedAt) continue

      const dateKey = normalizeDate(session.submittedAt).toDateString()
      const existing = activityMap.get(dateKey) || {
        date: normalizeDate(session.submittedAt),
        testSessionCount: 0,
        questionResponseCount: 0,
        studyTimeMinutes: 0,
      }

      existing.testSessionCount++
      existing.studyTimeMinutes += Math.round((session.timeSpent || 0) / 60)
      activityMap.set(dateKey, existing)
    }

    // Process question responses
    for (const response of questionResponses) {
      const dateKey = normalizeDate(response.answeredAt).toDateString()
      const existing = activityMap.get(dateKey) || {
        date: normalizeDate(response.answeredAt),
        testSessionCount: 0,
        questionResponseCount: 0,
        studyTimeMinutes: 0,
      }

      existing.questionResponseCount++
      existing.studyTimeMinutes += Math.round((response.timeSpent || 0) / 60)
      activityMap.set(dateKey, existing)
    }

    // Fill in missing days with zero activity
    const calendar: ActivityData[] = []
    for (let i = 0; i < days; i++) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const normalizedDate = normalizeDate(date)
      const dateKey = normalizedDate.toDateString()

      const activity = activityMap.get(dateKey) || {
        date: normalizedDate,
        testSessionCount: 0,
        questionResponseCount: 0,
        studyTimeMinutes: 0,
      }

      calendar.push(activity)
    }

    return calendar.sort((a, b) => b.date.getTime() - a.date.getTime())
  } catch (error) {
    console.error('Error getting activity calendar:', error)
    throw new Error('Failed to get activity calendar')
  }
}

/**
 * Get streak milestones (achievements based on streak length)
 *
 * @param currentStreak - User's current streak length
 * @param bestStreak - User's best streak length
 * @returns Array of achieved and next milestones
 */
export function getStreakMilestones(
  currentStreak: number,
  bestStreak: number
): {
  achieved: Array<{ days: number; title: string; icon: string }>
  next: { days: number; title: string; icon: string; daysRemaining: number } | null
} {
  const milestones = [
    { days: 3, title: 'Getting Started', icon: '🔥' },
    { days: 7, title: 'Week Warrior', icon: '⭐' },
    { days: 14, title: 'Two Week Champion', icon: '🏆' },
    { days: 30, title: 'Month Master', icon: '👑' },
    { days: 60, title: 'Dedicated Scholar', icon: '💎' },
    { days: 90, title: 'Quarter Champion', icon: '🚀' },
    { days: 180, title: 'Half Year Hero', icon: '🦸' },
    { days: 365, title: 'Year Legend', icon: '🌟' },
  ]

  const achieved = milestones.filter((m) => bestStreak >= m.days)
  const next = milestones.find((m) => currentStreak < m.days)

  return {
    achieved,
    next: next
      ? {
          ...next,
          daysRemaining: next.days - currentStreak,
        }
      : null,
  }
}

/**
 * Helper function to get all activity dates for a user
 * Combines test sessions and question responses
 */
async function getActivityDates(userId: string, userType: 'user' | 'freeUser'): Promise<Date[]> {
  const userField = userType === 'user' ? 'userId' : 'freeUserId'

  // Get test session dates
  const testSessions = await prisma.testSession.findMany({
    where: {
      [userField]: userId,
      submittedAt: { not: null },
    },
    select: {
      submittedAt: true,
    },
  })

  // Get question response dates
  const questionResponses = await prisma.userQuestionResponse.findMany({
    where: {
      [userField]: userId,
    },
    select: {
      answeredAt: true,
    },
  })

  // Combine all dates
  const allDates = [
    ...testSessions.map((s) => s.submittedAt).filter((d): d is Date => d !== null),
    ...questionResponses.map((r) => r.answeredAt),
  ]

  return allDates
}

/**
 * Helper function to calculate the longest streak from sorted dates
 */
function calculateBestStreak(sortedDates: Date[]): number {
  if (sortedDates.length === 0) return 0

  let bestStreak = 1
  let currentStreak = 1
  let previousDate = sortedDates[0]

  for (let i = 1; i < sortedDates.length; i++) {
    const currentDate = sortedDates[i]
    const dayDiff = getDaysDifference(previousDate, currentDate)

    if (dayDiff === 1) {
      currentStreak++
      bestStreak = Math.max(bestStreak, currentStreak)
    } else {
      currentStreak = 1
    }

    previousDate = currentDate
  }

  return bestStreak
}

/**
 * Normalize date to midnight for consistent comparison
 */
function normalizeDate(date: Date): Date {
  const normalized = new Date(date)
  normalized.setHours(0, 0, 0, 0)
  return normalized
}

/**
 * Check if two dates are the same day
 */
function isSameDay(date1: Date, date2: Date): boolean {
  return normalizeDate(date1).getTime() === normalizeDate(date2).getTime()
}

/**
 * Get difference in days between two dates
 */
function getDaysDifference(date1: Date, date2: Date): number {
  const normalized1 = normalizeDate(date1)
  const normalized2 = normalizeDate(date2)
  const diffTime = Math.abs(normalized1.getTime() - normalized2.getTime())
  return Math.round(diffTime / (1000 * 60 * 60 * 24))
}
