/**
 * Counselor Goals API
 * GET: Fetch counselor goals
 * POST: Create new goal
 * PUT: Update goal progress
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { startOfDay, endOfDay, startOfWeek, startOfMonth, endOfMonth, addDays } from 'date-fns'

const createGoalSchema = z.object({
  goalType: z.enum([
    'LEADS_CREATED',
    'CONVERSIONS',
    'REVENUE',
    'DEMOS_SCHEDULED',
    'FOLLOW_UPS',
    'RESPONSE_TIME',
    'CUSTOM',
  ]),
  period: z.enum(['DAILY', 'WEEKLY', 'MONTHLY', 'QUARTERLY', 'YEARLY']),
  targetValue: z.number().positive(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
})

const updateGoalSchema = z.object({
  goalId: z.string(),
  currentValue: z.number().optional(),
  status: z.enum(['ACTIVE', 'ACHIEVED', 'MISSED', 'CANCELLED']).optional(),
})

export async function GET(req: NextRequest) {
  try {
    const session = await auth()

    if (!session || !session.user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    if (session.user.role !== 'COUNSELOR' && session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Counselor access only' },
        { status: 403 }
      )
    }

    const { searchParams } = new URL(req.url)
    const period = searchParams.get('period')
    const status = searchParams.get('status')
    const counselorId = searchParams.get('counselorId') || session.user.id

    if (session.user.role === 'COUNSELOR' && counselorId !== session.user.id) {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Can only view own goals' },
        { status: 403 }
      )
    }

    const where: any = {
      counselorId,
    }

    if (period) {
      where.period = period
    }

    if (status) {
      where.status = status
    }

    const goals = await prisma.counselor_goals.findMany({
      where,
      orderBy: [{ status: 'asc' }, { endDate: 'asc' }],
    })

    const goalsWithProgress = await Promise.all(
      goals.map(async (goal) => {
        let currentValue = Number(goal.currentValue)

        switch (goal.goalType) {
          case 'LEADS_CREATED': {
            const leads = await prisma.leads.count({
              where: {
                assignedToId: counselorId,
                createdAt: {
                  gte: goal.startDate,
                  lte: goal.endDate,
                },
              },
            })
            currentValue = leads
            break
          }
          case 'CONVERSIONS': {
            const conversions = await prisma.leads.count({
              where: {
                assignedToId: counselorId,
                stage: 'ENROLLED',
                convertedAt: {
                  gte: goal.startDate,
                  lte: goal.endDate,
                },
              },
            })
            currentValue = conversions
            break
          }
          case 'REVENUE': {
            const enrollments = await prisma.enrollments.findMany({
              where: {
                users: {
                  leads: {
                    some: {
                      assignedToId: counselorId,
                    },
                  },
                },
                enrollmentDate: {
                  gte: goal.startDate,
                  lte: goal.endDate,
                },
              },
              include: {
                courses: {
                  select: {
                    totalFees: true,
                  },
                },
              },
            })
            currentValue = enrollments.reduce((sum, e) => sum + e.totalFees, 0)
            break
          }
          case 'DEMOS_SCHEDULED': {
            const demos = await prisma.demo_bookings.count({
              where: {
                assignedTo: counselorId,
                status: 'CONFIRMED',
                createdAt: {
                  gte: goal.startDate,
                  lte: goal.endDate,
                },
              },
            })
            currentValue = demos
            break
          }
        }

        const progress = Math.min((currentValue / Number(goal.targetValue)) * 100, 100).toFixed(2)
        const isAchieved = currentValue >= Number(goal.targetValue)
        const isMissed = new Date() > goal.endDate && !isAchieved

        const updatedStatus = isAchieved
          ? 'ACHIEVED'
          : isMissed
            ? 'MISSED'
            : goal.status === 'CANCELLED'
              ? 'CANCELLED'
              : 'ACTIVE'

        if (updatedStatus !== goal.status) {
          await prisma.counselor_goals.update({
            where: { id: goal.id },
            data: {
              status: updatedStatus,
              currentValue,
              progress: parseFloat(progress),
              achievedAt: isAchieved ? new Date() : null,
            },
          })
        }

        return {
          ...goal,
          currentValue,
          progress: parseFloat(progress),
          status: updatedStatus,
          isAchieved,
          isMissed,
        }
      })
    )

    const activeGoals = goalsWithProgress.filter((g) => g.status === 'ACTIVE')
    const achievedGoals = goalsWithProgress.filter((g) => g.status === 'ACHIEVED')
    const missedGoals = goalsWithProgress.filter((g) => g.status === 'MISSED')

    return NextResponse.json({
      success: true,
      data: {
        goals: goalsWithProgress,
        statistics: {
          total: goalsWithProgress.length,
          active: activeGoals.length,
          achieved: achievedGoals.length,
          missed: missedGoals.length,
          achievementRate:
            goalsWithProgress.length > 0
              ? parseFloat(((achievedGoals.length / goalsWithProgress.length) * 100).toFixed(2))
              : 0,
        },
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

    if (!session || !session.user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    if (session.user.role !== 'COUNSELOR' && session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Counselor access only' },
        { status: 403 }
      )
    }

    const body = await req.json()
    const validatedData = createGoalSchema.parse(body)

    let startDate: Date
    let endDate: Date

    if (validatedData.startDate && validatedData.endDate) {
      startDate = new Date(validatedData.startDate)
      endDate = new Date(validatedData.endDate)
    } else {
      const now = new Date()
      switch (validatedData.period) {
        case 'DAILY':
          startDate = startOfDay(now)
          endDate = endOfDay(now)
          break
        case 'WEEKLY':
          startDate = startOfWeek(now, { weekStartsOn: 1 })
          endDate = endOfDay(addDays(startDate, 6))
          break
        case 'MONTHLY':
          startDate = startOfMonth(now)
          endDate = endOfMonth(now)
          break
        case 'QUARTERLY':
          const quarter = Math.floor(now.getMonth() / 3)
          startDate = new Date(now.getFullYear(), quarter * 3, 1)
          endDate = endOfMonth(new Date(now.getFullYear(), quarter * 3 + 2, 1))
          break
        case 'YEARLY':
          startDate = new Date(now.getFullYear(), 0, 1)
          endDate = new Date(now.getFullYear(), 11, 31, 23, 59, 59)
          break
        default:
          startDate = startOfDay(now)
          endDate = endOfDay(now)
      }
    }

    const goal = await prisma.counselor_goals.create({
      data: {
        counselorId: session.user.id,
        goalType: validatedData.goalType,
        period: validatedData.period,
        targetValue: validatedData.targetValue,
        startDate,
        endDate,
        status: 'ACTIVE',
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Goal created successfully',
      data: goal,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: error.issues },
        { status: 400 }
      )
    }

    console.error('Error creating goal:', error)
    return NextResponse.json({ success: false, error: 'Failed to create goal' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await auth()

    if (!session || !session.user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    if (session.user.role !== 'COUNSELOR' && session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Counselor access only' },
        { status: 403 }
      )
    }

    const body = await req.json()
    const validatedData = updateGoalSchema.parse(body)

    const existingGoal = await prisma.counselor_goals.findUnique({
      where: { id: validatedData.goalId },
    })

    if (!existingGoal) {
      return NextResponse.json({ success: false, error: 'Goal not found' }, { status: 404 })
    }

    if (session.user.role === 'COUNSELOR' && existingGoal.counselorId !== session.user.id) {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Can only update own goals' },
        { status: 403 }
      )
    }

    const updateData: any = {}

    if (validatedData.currentValue !== undefined) {
      updateData.currentValue = validatedData.currentValue
      updateData.progress = Math.min(
        (validatedData.currentValue / Number(existingGoal.targetValue)) * 100,
        100
      )

      if (validatedData.currentValue >= Number(existingGoal.targetValue)) {
        updateData.status = 'ACHIEVED'
        updateData.achievedAt = new Date()
      }
    }

    if (validatedData.status) {
      updateData.status = validatedData.status
    }

    const goal = await prisma.counselor_goals.update({
      where: { id: validatedData.goalId },
      data: updateData,
    })

    return NextResponse.json({
      success: true,
      message: 'Goal updated successfully',
      data: goal,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: error.issues },
        { status: 400 }
      )
    }

    console.error('Error updating goal:', error)
    return NextResponse.json({ success: false, error: 'Failed to update goal' }, { status: 500 })
  }
}
