import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import {
  calculateQuality,
  calculateNextReview,
  calculateReviewPriority,
  getRecommendedDailyReviews,
  type ReviewSchedule,
} from '@/lib/mcq/spacedRepetition'

/**
 * GET /api/mcq/review
 * Fetch questions due for review for a user
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const freeUserId = searchParams.get('freeUserId')
    const limit = parseInt(searchParams.get('limit') || '20')
    const includeNew = searchParams.get('includeNew') === 'true'

    if (!freeUserId) {
      return NextResponse.json({ success: false, error: 'freeUserId is required' }, { status: 400 })
    }

    const now = new Date()

    // Get questions due for review
    const dueReviews = await prisma.question_review_schedule.findMany({
      where: {
        freeUserId,
        nextReviewAt: { lte: now },
      },
      include: {
        questions: {
          select: {
            id: true,
            question: true,
            options: true,
            correctAnswer: true,
            explanation: true,
            topic: true,
            subtopic: true,
            difficulty: true,
            source: true,
            isNcertBased: true,
            ncertClass: true,
            ncertChapter: true,
            ncertChapterName: true,
            ncertPage: true,
          },
        },
      },
      orderBy: { nextReviewAt: 'asc' },
    })

    // Sort by priority (most overdue first)
    const sortedReviews = dueReviews.sort((a, b) => {
      const priorityA = calculateReviewPriority({
        easeFactor: a.easeFactor,
        interval: a.interval,
        repetitions: a.repetitions,
        nextReviewAt: a.nextReviewAt,
        lastReviewAt: a.lastReviewAt,
      })
      const priorityB = calculateReviewPriority({
        easeFactor: b.easeFactor,
        interval: b.interval,
        repetitions: b.repetitions,
        nextReviewAt: b.nextReviewAt,
        lastReviewAt: b.lastReviewAt,
      })
      return priorityA - priorityB
    })

    // Get recommended review count
    let newQuestions: (typeof dueReviews)[0]['questions'][] = []

    if (includeNew) {
      // Get questions the user hasn't reviewed yet
      const reviewedQuestionIds = await prisma.question_review_schedule.findMany({
        where: { freeUserId },
        select: { questionId: true },
      })

      const reviewedIds = new Set(reviewedQuestionIds.map((r) => r.questionId))

      // Get new questions to learn
      const newQuestionsData = await prisma.questions.findMany({
        where: {
          id: { notIn: Array.from(reviewedIds) },
          isActive: true,
          curriculum: 'NEET',
        },
        select: {
          id: true,
          question: true,
          options: true,
          correctAnswer: true,
          explanation: true,
          topic: true,
          subtopic: true,
          difficulty: true,
          source: true,
          isNcertBased: true,
          ncertClass: true,
          ncertChapter: true,
          ncertChapterName: true,
          ncertPage: true,
        },
        take: 5, // Max 5 new questions per session
        orderBy: { popularityScore: 'desc' },
      })

      newQuestions = newQuestionsData
    }

    const { reviews: reviewCount, newQuestions: newCount } = getRecommendedDailyReviews(
      sortedReviews.length,
      newQuestions.length,
      limit
    )

    // Format response
    const reviewQuestions = sortedReviews.slice(0, reviewCount).map((r) => ({
      ...r.questions,
      reviewData: {
        easeFactor: r.easeFactor,
        interval: r.interval,
        repetitions: r.repetitions,
        nextReviewAt: r.nextReviewAt,
        isReview: true,
      },
    }))

    const newQuestionsFormatted = newQuestions.slice(0, newCount).map((q) => ({
      ...q,
      reviewData: {
        easeFactor: 2.5,
        interval: 0,
        repetitions: 0,
        nextReviewAt: now,
        isReview: false,
      },
    }))

    // Get stats
    const totalScheduled = await prisma.question_review_schedule.count({
      where: { freeUserId },
    })

    const totalDue = sortedReviews.length

    const masteredCount = await prisma.question_review_schedule.count({
      where: {
        freeUserId,
        repetitions: { gte: 5 },
        easeFactor: { gte: 2.3 },
      },
    })

    return NextResponse.json({
      success: true,
      data: {
        questions: [...reviewQuestions, ...newQuestionsFormatted],
        stats: {
          totalScheduled,
          totalDue,
          masteredCount,
          reviewCount: reviewQuestions.length,
          newCount: newQuestionsFormatted.length,
        },
      },
    })
  } catch (error) {
    console.error('Error fetching review queue:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch review queue' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/mcq/review
 * Record a review result and update schedule
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { freeUserId, questionId, isCorrect, timeSpent, avgTimeForQuestion } = body

    if (!freeUserId || !questionId || typeof isCorrect !== 'boolean') {
      return NextResponse.json(
        { success: false, error: 'freeUserId, questionId, and isCorrect are required' },
        { status: 400 }
      )
    }

    // Calculate quality based on result
    const quality = calculateQuality({
      isCorrect,
      timeSpent: timeSpent || 30,
      avgTimeForQuestion: avgTimeForQuestion || 30,
      quality: isCorrect ? 4 : 0,
    })

    // Get existing schedule or null for new questions
    const existingSchedule = await prisma.question_review_schedule.findUnique({
      where: {
        freeUserId_questionId: { freeUserId, questionId },
      },
    })

    const currentSchedule: ReviewSchedule | null = existingSchedule
      ? {
          easeFactor: existingSchedule.easeFactor,
          interval: existingSchedule.interval,
          repetitions: existingSchedule.repetitions,
          nextReviewAt: existingSchedule.nextReviewAt,
          lastReviewAt: existingSchedule.lastReviewAt,
        }
      : null

    // Calculate next review
    const nextSchedule = calculateNextReview(currentSchedule, quality)

    // Upsert the schedule
    const updatedSchedule = await prisma.question_review_schedule.upsert({
      where: {
        freeUserId_questionId: { freeUserId, questionId },
      },
      create: {
        freeUserId,
        questionId,
        easeFactor: nextSchedule.easeFactor,
        interval: nextSchedule.interval,
        repetitions: nextSchedule.repetitions,
        nextReviewAt: nextSchedule.nextReviewAt,
        lastReviewAt: nextSchedule.lastReviewAt,
      },
      update: {
        easeFactor: nextSchedule.easeFactor,
        interval: nextSchedule.interval,
        repetitions: nextSchedule.repetitions,
        nextReviewAt: nextSchedule.nextReviewAt,
        lastReviewAt: nextSchedule.lastReviewAt,
      },
    })

    return NextResponse.json({
      success: true,
      data: {
        quality,
        schedule: {
          easeFactor: updatedSchedule.easeFactor,
          interval: updatedSchedule.interval,
          repetitions: updatedSchedule.repetitions,
          nextReviewAt: updatedSchedule.nextReviewAt,
          daysUntilReview: updatedSchedule.interval,
        },
      },
    })
  } catch (error) {
    console.error('Error recording review:', error)
    return NextResponse.json({ success: false, error: 'Failed to record review' }, { status: 500 })
  }
}

/**
 * DELETE /api/mcq/review
 * Remove a question from review schedule
 */
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const freeUserId = searchParams.get('freeUserId')
    const questionId = searchParams.get('questionId')

    if (!freeUserId || !questionId) {
      return NextResponse.json(
        { success: false, error: 'freeUserId and questionId are required' },
        { status: 400 }
      )
    }

    await prisma.question_review_schedule.delete({
      where: {
        freeUserId_questionId: { freeUserId, questionId },
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error removing from review:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to remove from review' },
      { status: 500 }
    )
  }
}
