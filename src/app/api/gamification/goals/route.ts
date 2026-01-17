/**
 * Gamification Goals API
 * GET: Get user's daily/weekly goals and stats
 * POST: Set custom goal
 * PUT: Update goal progress (for manual tracking)
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import {
  getUserGoals,
  setCustomGoal,
  updateGoalProgress,
  getGoalHistory,
  getGoalStats,
  DEFAULT_GOALS,
  type GoalType,
  type GoalMetric,
} from '@/lib/gamification'

export async function GET(req: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const view = searchParams.get('view') || 'current' // 'current', 'history', 'stats'

    if (view === 'history') {
      const limit = parseInt(searchParams.get('limit') || '20')
      const offset = parseInt(searchParams.get('offset') || '0')
      const goalType = searchParams.get('goalType') as GoalType | undefined

      const history = await getGoalHistory(session.user.id, { limit, offset, goalType })

      return NextResponse.json({
        success: true,
        data: {
          goals: history.goals,
          total: history.total,
          hasMore: offset + history.goals.length < history.total,
        },
      })
    }

    if (view === 'stats') {
      const stats = await getGoalStats(session.user.id)

      return NextResponse.json({
        success: true,
        data: { stats },
      })
    }

    // Default: current goals
    const goals = await getUserGoals(session.user.id)
    const stats = await getGoalStats(session.user.id)

    // Calculate overall progress
    const allGoals = [...goals.daily, ...goals.weekly]
    const completedToday = allGoals.filter((g) => g.goal.isCompleted).length
    const totalGoals = allGoals.length

    return NextResponse.json({
      success: true,
      data: {
        daily: goals.daily,
        weekly: goals.weekly,
        summary: {
          completedToday,
          totalGoals,
          dailyStreak: stats.currentDailyStreak,
          weeklyStreak: stats.currentWeeklyStreak,
          totalXpFromGoals: stats.totalXpFromGoals,
        },
        defaults: DEFAULT_GOALS,
      },
    })
  } catch (error) {
    console.error('Error fetching goals:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch goals' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { goalType, metric, targetValue, xpReward } = body

    // Validate inputs
    if (!goalType || !['DAILY', 'WEEKLY'].includes(goalType)) {
      return NextResponse.json(
        { success: false, error: 'Invalid goalType. Use "DAILY" or "WEEKLY"' },
        { status: 400 }
      )
    }

    const validMetrics: GoalMetric[] = [
      'QUESTIONS_ANSWERED',
      'QUESTIONS_CORRECT',
      'ACCURACY_PERCENTAGE',
      'STUDY_MINUTES',
      'SESSIONS_COMPLETED',
      'TESTS_COMPLETED',
      'CHAPTERS_REVIEWED',
    ]

    if (!metric || !validMetrics.includes(metric)) {
      return NextResponse.json(
        { success: false, error: `Invalid metric. Valid options: ${validMetrics.join(', ')}` },
        { status: 400 }
      )
    }

    if (!targetValue || targetValue <= 0) {
      return NextResponse.json(
        { success: false, error: 'targetValue must be a positive number' },
        { status: 400 }
      )
    }

    const goal = await setCustomGoal(session.user.id, {
      goalType: goalType as GoalType,
      metric: metric as GoalMetric,
      targetValue,
      xpReward,
    })

    return NextResponse.json({
      success: true,
      message: `${goalType.toLowerCase()} goal set successfully`,
      data: { goal },
    })
  } catch (error) {
    console.error('Error setting goal:', error)
    return NextResponse.json({ success: false, error: 'Failed to set goal' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { metric, incrementValue, absoluteValue } = body

    const validMetrics: GoalMetric[] = [
      'QUESTIONS_ANSWERED',
      'QUESTIONS_CORRECT',
      'ACCURACY_PERCENTAGE',
      'STUDY_MINUTES',
      'SESSIONS_COMPLETED',
      'TESTS_COMPLETED',
      'CHAPTERS_REVIEWED',
    ]

    if (!metric || !validMetrics.includes(metric)) {
      return NextResponse.json(
        { success: false, error: `Invalid metric. Valid options: ${validMetrics.join(', ')}` },
        { status: 400 }
      )
    }

    if (incrementValue === undefined && absoluteValue === undefined) {
      return NextResponse.json(
        { success: false, error: 'Provide either incrementValue or absoluteValue' },
        { status: 400 }
      )
    }

    const completedGoals = await updateGoalProgress(
      session.user.id,
      metric as GoalMetric,
      incrementValue,
      absoluteValue
    )

    // Get updated goals
    const goals = await getUserGoals(session.user.id)

    return NextResponse.json({
      success: true,
      message: completedGoals.length > 0 ? `${completedGoals.length} goal(s) completed!` : 'Progress updated',
      data: {
        completedGoals,
        daily: goals.daily,
        weekly: goals.weekly,
      },
    })
  } catch (error) {
    console.error('Error updating goal progress:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update goal progress' },
      { status: 500 }
    )
  }
}
