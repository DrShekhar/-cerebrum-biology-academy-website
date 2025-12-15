import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import type { DailyChallenge, DailyChallengeResult } from '@/lib/mcq/types'
import { XP_REWARDS } from '@/lib/mcq/types'

// GET - Fetch today's daily challenge
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const freeUserId = searchParams.get('freeUserId')

    // Get today's date (midnight IST)
    const now = new Date()
    const todayUTC = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()))

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

    // Verify the challenge exists
    const challenge = await prisma.daily_challenges.findUnique({
      where: { id: challengeId },
    })

    if (!challenge) {
      return NextResponse.json({ error: 'Challenge not found' }, { status: 404 })
    }

    // Check if already completed
    const userStats = await prisma.mcq_user_stats.findUnique({
      where: { freeUserId },
    })

    const todayUTC = new Date(
      Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
    )

    if (
      userStats?.dailyChallengeCompleted &&
      userStats.dailyChallengeDate &&
      isSameDay(userStats.dailyChallengeDate, todayUTC)
    ) {
      return NextResponse.json({ error: 'Challenge already completed today' }, { status: 400 })
    }

    // Calculate XP
    const isPerfect = score === totalQuestions
    let xpEarned = challenge.xpReward
    if (isPerfect) {
      xpEarned += challenge.bonusXp
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

  // If not enough official questions, also get from community
  if (selectedIds.length < 5) {
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
