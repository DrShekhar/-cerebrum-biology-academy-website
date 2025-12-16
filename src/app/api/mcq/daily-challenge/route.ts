import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import type { DailyChallenge, DailyChallengeResult } from '@/lib/mcq/types'
import { XP_REWARDS } from '@/lib/mcq/types'

// Helper to check if table doesn't exist
function isTableNotExistError(error: unknown): boolean {
  return (
    error instanceof Error &&
    (error.message.includes('does not exist') ||
      error.message.includes('relation') ||
      error.message.includes('table'))
  )
}

// GET - Fetch today's daily challenge
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const freeUserId = searchParams.get('freeUserId')

    // Get today's date (midnight IST)
    const now = new Date()
    const todayUTC = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()))

    try {
      // Check if today's challenge exists
      let challenge = await prisma.daily_challenges.findUnique({
        where: { date: todayUTC },
      })

      // If no challenge exists for today, create one
      if (!challenge) {
        challenge = await createDailyChallenge(todayUTC)
      }

      // Check if user has already completed today's challenge
      let userCompletion = null
      if (freeUserId) {
        try {
          const userStats = await prisma.mcq_user_stats.findUnique({
            where: { freeUserId },
            select: {
              dailyChallengeCompleted: true,
              dailyChallengeDate: true,
            },
          })

          if (
            userStats?.dailyChallengeCompleted &&
            userStats.dailyChallengeDate &&
            isSameDay(userStats.dailyChallengeDate, todayUTC)
          ) {
            userCompletion = {
              completed: true,
              date: userStats.dailyChallengeDate,
            }
          }
        } catch (err) {
          // If user stats table doesn't exist, just proceed without completion info
          if (isTableNotExistError(err)) {
            console.log('mcq_user_stats table not found for daily challenge check')
          } else {
            throw err
          }
        }
      }

      const response: DailyChallenge & { userCompletion?: typeof userCompletion } = {
        id: challenge.id,
        date: challenge.date,
        topic: challenge.topic || undefined,
        questionCount: challenge.questionCount,
        difficulty: challenge.difficulty || undefined,
        timeLimit: challenge.timeLimit || undefined,
        questionIds: challenge.questionIds as string[],
        xpReward: challenge.xpReward,
        bonusXp: challenge.bonusXp,
        participantCount: challenge.participantCount,
        perfectScoreCount: challenge.perfectScoreCount,
        avgScore: challenge.avgScore || undefined,
        userCompletion,
      }

      return NextResponse.json(response)
    } catch (dbError) {
      // If daily_challenges table doesn't exist, return a mock challenge
      if (isTableNotExistError(dbError)) {
        console.log('daily_challenges table not found, returning mock challenge')

        // Get random question IDs from official questions
        const questions = await prisma.questions.findMany({
          where: { isActive: true },
          select: { id: true },
          take: 100,
        })

        const shuffled = questions.sort(() => Math.random() - 0.5)
        const selectedIds = shuffled.slice(0, 5).map((q) => q.id)

        const mockChallenge: DailyChallenge = {
          id: `mock_${todayUTC.toISOString().split('T')[0]}`,
          date: todayUTC,
          questionCount: 5,
          questionIds: selectedIds,
          xpReward: XP_REWARDS.dailyChallengeComplete,
          bonusXp: XP_REWARDS.dailyChallengePerfect,
          participantCount: 0,
          perfectScoreCount: 0,
        }

        return NextResponse.json(mockChallenge)
      }
      throw dbError
    }
  } catch (error) {
    console.error('Daily Challenge GET Error:', error)
    return NextResponse.json({ error: 'Failed to fetch daily challenge' }, { status: 500 })
  }
}

// POST - Submit daily challenge results
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { challengeId, freeUserId, score, totalQuestions, timeSpent } = body

    if (!challengeId || !freeUserId || score === undefined || !totalQuestions) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const isPerfect = score === totalQuestions
    let xpEarned = XP_REWARDS.dailyChallengeComplete
    if (isPerfect) {
      xpEarned += XP_REWARDS.dailyChallengePerfect
    }

    try {
      // Verify the challenge exists
      const challenge = await prisma.daily_challenges.findUnique({
        where: { id: challengeId },
      })

      if (!challenge) {
        // If challenge not found but ID starts with mock_, it's a mock challenge
        if (challengeId.startsWith('mock_')) {
          const result: DailyChallengeResult = {
            challengeId,
            score,
            totalQuestions,
            timeSpent,
            isPerfect,
            xpEarned,
            rank: 1,
          }
          return NextResponse.json(result)
        }
        return NextResponse.json({ error: 'Challenge not found' }, { status: 404 })
      }

      const todayUTC = new Date(
        Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
      )

      // Check if already completed
      try {
        const userStats = await prisma.mcq_user_stats.findUnique({
          where: { freeUserId },
        })

        if (
          userStats?.dailyChallengeCompleted &&
          userStats.dailyChallengeDate &&
          isSameDay(userStats.dailyChallengeDate, todayUTC)
        ) {
          return NextResponse.json({ error: 'Challenge already completed today' }, { status: 400 })
        }

        // Update challenge stats
        await prisma.daily_challenges.update({
          where: { id: challengeId },
          data: {
            participantCount: { increment: 1 },
            perfectScoreCount: isPerfect ? { increment: 1 } : undefined,
            avgScore:
              challenge.participantCount > 0
                ? ((challenge.avgScore || 0) * challenge.participantCount + score) /
                  (challenge.participantCount + 1)
                : score,
          },
        })

        // Update user stats
        if (userStats) {
          await prisma.mcq_user_stats.update({
            where: { freeUserId },
            data: {
              totalXp: { increment: xpEarned },
              dailyChallengeCompleted: true,
              dailyChallengeDate: todayUTC,
              dailyChallengesTotal: { increment: 1 },
            },
          })
        } else {
          await prisma.mcq_user_stats.create({
            data: {
              freeUserId,
              totalXp: xpEarned,
              dailyChallengeCompleted: true,
              dailyChallengeDate: todayUTC,
              dailyChallengesTotal: 1,
            },
          })
        }

        const result: DailyChallengeResult = {
          challengeId,
          score,
          totalQuestions,
          timeSpent,
          isPerfect,
          xpEarned,
          rank: challenge.participantCount + 1,
        }

        return NextResponse.json(result)
      } catch (statsError) {
        // If stats table doesn't exist, just return the result without updating stats
        if (isTableNotExistError(statsError)) {
          console.log('mcq_user_stats table not found, skipping stats update')
          const result: DailyChallengeResult = {
            challengeId,
            score,
            totalQuestions,
            timeSpent,
            isPerfect,
            xpEarned,
            rank: challenge.participantCount + 1,
          }
          return NextResponse.json(result)
        }
        throw statsError
      }
    } catch (dbError) {
      // If daily_challenges table doesn't exist, return mock result
      if (isTableNotExistError(dbError)) {
        console.log('daily_challenges table not found, returning mock result')
        const result: DailyChallengeResult = {
          challengeId,
          score,
          totalQuestions,
          timeSpent,
          isPerfect,
          xpEarned,
          rank: 1,
        }
        return NextResponse.json(result)
      }
      throw dbError
    }
  } catch (error) {
    console.error('Daily Challenge POST Error:', error)
    return NextResponse.json({ error: 'Failed to submit challenge result' }, { status: 500 })
  }
}

// Helper: Create a new daily challenge
async function createDailyChallenge(date: Date) {
  // Get 5 random questions from the database
  const questions = await prisma.questions.findMany({
    where: {
      isActive: true,
    },
    select: {
      id: true,
    },
    take: 100,
  })

  // Shuffle and pick 5
  const shuffled = questions.sort(() => Math.random() - 0.5)
  const selectedIds = shuffled.slice(0, 5).map((q) => q.id)

  // Try to get community questions if not enough official ones
  if (selectedIds.length < 5) {
    try {
      const communityQuestions = await prisma.community_questions.findMany({
        where: {
          status: 'APPROVED',
        },
        select: {
          id: true,
        },
        take: 5 - selectedIds.length,
      })

      selectedIds.push(...communityQuestions.map((q) => q.id))
    } catch (err) {
      // If community_questions table doesn't exist, just use what we have
      if (isTableNotExistError(err)) {
        console.log('community_questions table not found for daily challenge')
      } else {
        throw err
      }
    }
  }

  return prisma.daily_challenges.create({
    data: {
      date,
      questionCount: 5,
      questionIds: selectedIds,
      xpReward: XP_REWARDS.dailyChallengeComplete,
      bonusXp: XP_REWARDS.dailyChallengePerfect,
    },
  })
}

// Helper: Check if two dates are the same day
function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getUTCFullYear() === date2.getUTCFullYear() &&
    date1.getUTCMonth() === date2.getUTCMonth() &&
    date1.getUTCDate() === date2.getUTCDate()
  )
}
