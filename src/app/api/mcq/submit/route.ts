import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { rateLimit } from '@/lib/rateLimit'
import {
  calculateXPForAnswer,
  calculateMTFScore,
  getLevelProgress,
  checkLevelUp,
  updateStreak,
  updateTopicMastery,
  identifyWeakAndStrongTopics,
  calculateAccuracy,
  checkBadgeUnlock,
} from '@/lib/mcq/gamification'
import type { AnswerSubmission, AnswerResult, UserStats, QuestionType } from '@/lib/mcq/types'
import type { DifficultyLevel } from '@/generated/prisma'

// Helper to check if a table doesn't exist error
function isTableNotExistError(error: unknown): boolean {
  return (
    error instanceof Error &&
    (error.message.includes('does not exist') ||
      error.message.includes('relation') ||
      error.message.includes('table'))
  )
}

// Safely run a database operation, returning null if table doesn't exist
async function safeDbOperation<T>(
  operation: () => Promise<T>,
  operationName: string
): Promise<T | null> {
  try {
    return await operation()
  } catch (error) {
    if (isTableNotExistError(error)) {
      return null
    }
    throw error
  }
}

// POST /api/mcq/submit - Submit an answer
export async function POST(request: NextRequest) {
  try {
    const rateLimitResult = await rateLimit(request, { maxRequests: 60, windowMs: 60 * 60 * 1000 })
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': String(rateLimitResult.limit),
            'X-RateLimit-Remaining': String(rateLimitResult.remaining),
            'X-RateLimit-Reset': String(rateLimitResult.reset),
          },
        }
      )
    }

    const body = await request.json()
    const submission: AnswerSubmission & {
      freeUserId?: string
      questionSource?: 'official' | 'community'
      topic?: string
      difficulty?: DifficultyLevel
      questionType?: QuestionType
    } = body

    const {
      questionId,
      selectedAnswer,
      timeSpent,
      sessionId,
      freeUserId,
      questionSource,
      topic,
      difficulty,
      questionType,
    } = submission

    if (!questionId || !selectedAnswer || !sessionId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Fetch the question to verify the answer
    let correctAnswer: string | null = null
    let explanation: string | null = null
    let questionTopic = topic || 'General'
    let questionDifficulty: DifficultyLevel = difficulty || 'MEDIUM'

    // Try community questions first if specified
    if (questionSource === 'community') {
      const communityQuestion = (await safeDbOperation(
        () =>
          prisma.community_questions.findUnique({
            where: { id: questionId },
            select: { correctAnswer: true, explanation: true, topic: true, difficulty: true },
          }),
        'community_questions.findUnique'
      )) as {
        correctAnswer: string
        explanation: string | null
        topic: string
        difficulty: DifficultyLevel
      } | null
      if (communityQuestion) {
        correctAnswer = communityQuestion.correctAnswer
        explanation = communityQuestion.explanation
        questionTopic = communityQuestion.topic
        questionDifficulty = communityQuestion.difficulty
      }
    }

    // If not found in community or is official, try official questions
    if (!correctAnswer) {
      const officialQuestion = await prisma.questions.findUnique({
        where: { id: questionId },
        select: { correctAnswer: true, explanation: true, topic: true, difficulty: true },
      })
      if (officialQuestion) {
        correctAnswer = officialQuestion.correctAnswer
        explanation = officialQuestion.explanation
        questionTopic = officialQuestion.topic || 'General'
        questionDifficulty = officialQuestion.difficulty
      }
    }

    if (!correctAnswer) {
      return NextResponse.json({ success: false, error: 'Question not found' }, { status: 404 })
    }

    // Normalize correctAnswer to letter format (A, B, C, D)
    // MTF questions use T/F patterns, skip normalization for them
    let normalizedCorrectAnswer = correctAnswer
    const validLetters = ['A', 'B', 'C', 'D']
    const isMTFType = questionType === 'MTF'

    if (!isMTFType && !validLetters.includes(correctAnswer)) {
      // correctAnswer is text, need to find which option it matches
      // First, fetch the question options
      let options: string[] = []

      if (questionSource === 'community') {
        const questionWithOptions = (await safeDbOperation(
          () =>
            prisma.community_questions.findUnique({
              where: { id: questionId },
              select: { options: true },
            }),
          'community_questions.findUnique for options'
        )) as { options: string[] | string } | null
        if (questionWithOptions?.options) {
          try {
            options = Array.isArray(questionWithOptions.options)
              ? questionWithOptions.options
              : JSON.parse(questionWithOptions.options)
          } catch {
            console.error('Failed to parse community question options')
          }
        }
      }

      if (options.length === 0) {
        const officialQuestionWithOptions = await prisma.questions.findUnique({
          where: { id: questionId },
          select: { options: true },
        })
        if (officialQuestionWithOptions?.options) {
          try {
            options = Array.isArray(officialQuestionWithOptions.options)
              ? (officialQuestionWithOptions.options as string[])
              : JSON.parse(officialQuestionWithOptions.options as string)
          } catch {
            console.error('Failed to parse official question options')
          }
        }
      }

      if (!options || options.length === 0) {
        console.error(
          `Normalization failed for question ${questionId}: options array is empty or null`
        )
        return NextResponse.json(
          {
            success: false,
            error: 'Could not verify answer. Please try again.',
            data: { normalizationFailed: true },
          },
          { status: 500 }
        )
      }

      // Find the index of the correct answer text in options
      const correctIndex = options.findIndex(
        (opt) => opt.toLowerCase().trim() === correctAnswer.toLowerCase().trim()
      )

      if (correctIndex !== -1 && correctIndex < 4) {
        normalizedCorrectAnswer = validLetters[correctIndex]
      } else {
        console.error(
          `Normalization failed for question ${questionId}: could not find matching option for correctAnswer "${correctAnswer}" in options [${options.join(', ')}]`
        )
        return NextResponse.json(
          {
            success: false,
            error: 'Could not verify answer. Please try again.',
            data: { normalizationFailed: true },
          },
          { status: 500 }
        )
      }
    }

    // Branch scoring based on question type
    const isMTF = questionType === 'MTF'
    let isCorrect: boolean
    let xpEarned: number
    let partialScore: number | undefined
    let mtfDetails: { partialScore: number; correctStatements: string; userStatements: string; correctCount: number; totalStatements: number } | undefined

    if (isMTF) {
      const mtfResult = calculateMTFScore(selectedAnswer, correctAnswer)
      partialScore = mtfResult.score
      isCorrect = mtfResult.score >= 0.6
      xpEarned = mtfResult.xpEarned
      mtfDetails = {
        partialScore: mtfResult.score,
        correctStatements: correctAnswer,
        userStatements: selectedAnswer,
        correctCount: mtfResult.correctCount,
        totalStatements: mtfResult.total,
      }
    } else {
      isCorrect = selectedAnswer === normalizedCorrectAnswer
      xpEarned = calculateXPForAnswer(isCorrect, questionDifficulty, true)
    }

    // Try to update session stats (graceful failure if table doesn't exist)
    await safeDbOperation(
      () =>
        prisma.mcq_practice_sessions.updateMany({
          where: {
            OR: [{ id: sessionId }, { sessionToken: sessionId }],
          },
          data: {
            questionsAttempted: { increment: 1 },
            correctAnswers: isCorrect ? { increment: 1 } : undefined,
            timeSpent: { increment: timeSpent || 0 },
            xpEarned: { increment: xpEarned },
          },
        }),
      'mcq_practice_sessions.updateMany'
    )

    // If we have a freeUserId, try to update user stats (graceful failure if table doesn't exist)
    let newBadges: ReturnType<typeof checkBadgeUnlock> = []
    let levelUpInfo = null
    let streakInfo = null

    if (freeUserId) {
      const userStatsResult = await safeDbOperation(async () => {
        // Get or create user stats
        let userStats = await prisma.mcq_user_stats.findUnique({
          where: { freeUserId },
        })

        if (!userStats) {
          userStats = await prisma.mcq_user_stats.create({
            data: {
              freeUserId,
              totalQuestions: 0,
              correctAnswers: 0,
              accuracy: 0,
              currentStreak: 0,
              longestStreak: 0,
              totalXp: 0,
              currentLevel: 1,
              levelProgress: 0,
              topicMastery: {},
              badges: [],
            },
          })
        }

        const previousXp = userStats.totalXp
        const newXp = previousXp + xpEarned

        // Update topic mastery
        const currentMastery =
          (userStats.topicMastery as Record<
            string,
            { attempted: number; correct: number; mastery: number }
          >) || {}
        const updatedMastery = updateTopicMastery(currentMastery, questionTopic, isCorrect)
        const { weakTopics, strongTopics } = identifyWeakAndStrongTopics(updatedMastery)

        // Check for streak update
        const questionsToday = userStats.totalQuestions + 1
        const localStreakInfo = updateStreak(
          userStats.lastPracticeDate,
          userStats.currentStreak,
          5,
          questionsToday
        )

        const newStreak = localStreakInfo.newStreak
        const longestStreak = Math.max(userStats.longestStreak, newStreak)

        // Calculate new accuracy
        const newTotalQuestions = userStats.totalQuestions + 1
        const newCorrectAnswers = userStats.correctAnswers + (isCorrect ? 1 : 0)
        const newAccuracy = calculateAccuracy(newCorrectAnswers, newTotalQuestions)

        // Check for level up
        const levelUp = checkLevelUp(previousXp, newXp)
        const localLevelUpInfo = levelUp.leveledUp
          ? {
              newLevel: levelUp.newLevel!.level,
              xpRequired: levelUp.newLevel!.xpRequired,
              xpProgress: getLevelProgress(newXp).progress,
            }
          : null

        // Update user stats
        await prisma.mcq_user_stats.update({
          where: { freeUserId },
          data: {
            totalQuestions: newTotalQuestions,
            correctAnswers: newCorrectAnswers,
            accuracy: newAccuracy,
            currentStreak: newStreak,
            longestStreak,
            lastPracticeDate: new Date(),
            totalXp: newXp,
            currentLevel: getLevelProgress(newXp).currentLevel.level,
            levelProgress: getLevelProgress(newXp).progress,
            topicMastery: updatedMastery,
            weakTopics,
            strongTopics,
          },
        })

        // Check for new badges
        const existingBadges = (userStats.badges as string[]) || []
        const statsForBadgeCheck: UserStats = {
          id: userStats.id,
          freeUserId: userStats.freeUserId || undefined,
          userId: userStats.userId || undefined,
          totalQuestions: newTotalQuestions,
          correctAnswers: newCorrectAnswers,
          accuracy: newAccuracy,
          currentStreak: newStreak,
          longestStreak,
          totalXp: newXp,
          currentLevel: getLevelProgress(newXp).currentLevel.level,
          levelProgress: getLevelProgress(newXp).progress,
          dailyChallengeCompleted: userStats.dailyChallengeCompleted,
          dailyChallengesTotal: userStats.dailyChallengesTotal,
          questionsSubmitted: userStats.questionsSubmitted,
          questionsApproved: userStats.questionsApproved,
          errorsReported: userStats.errorsReported,
          errorsAccepted: userStats.errorsAccepted,
          contributorRank: userStats.contributorRank || undefined,
        }

        const localNewBadges = checkBadgeUnlock(statsForBadgeCheck, existingBadges)

        if (localNewBadges.length > 0) {
          const newBadgeCodes = localNewBadges.map((b) => b.code)
          const allBadges = [...existingBadges, ...newBadgeCodes]
          const badgeXp = localNewBadges.reduce((sum, b) => sum + b.xpReward, 0)

          await prisma.mcq_user_stats.update({
            where: { freeUserId },
            data: {
              badges: allBadges,
              totalXp: { increment: badgeXp },
            },
          })
        }

        return {
          streakInfo: localStreakInfo,
          levelUpInfo: localLevelUpInfo,
          badges: localNewBadges,
        }
      }, 'mcq_user_stats operations')

      if (userStatsResult) {
        streakInfo = userStatsResult.streakInfo
        levelUpInfo = userStatsResult.levelUpInfo
        newBadges = userStatsResult.badges
      }
    }

    // Update question attempt stats for community questions (graceful failure)
    if (questionSource === 'community') {
      await safeDbOperation(
        () =>
          prisma.community_questions.update({
            where: { id: questionId },
            data: {
              totalAttempts: { increment: 1 },
              correctAttempts: isCorrect ? { increment: 1 } : undefined,
            },
          }),
        'community_questions.update'
      )
    }

    const result: AnswerResult = {
      isCorrect,
      correctAnswer: isMTF ? correctAnswer : normalizedCorrectAnswer,
      explanation: explanation || undefined,
      xpEarned,
      streakUpdated: !!streakInfo?.streakIncreased,
      newStreak: streakInfo?.newStreak,
      badgesUnlocked:
        newBadges.length > 0
          ? newBadges.map((b) => ({
              id: b.code,
              code: b.code,
              name: b.name,
              description: b.description,
              icon: b.icon,
              category: b.category,
              rarity: b.rarity,
              xpReward: b.xpReward,
            }))
          : undefined,
      levelUp: levelUpInfo || undefined,
      partialScore,
      mtfDetails,
    }

    return NextResponse.json({
      success: true,
      data: result,
    })
  } catch (error) {
    console.error('Error submitting MCQ answer:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to submit answer',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
