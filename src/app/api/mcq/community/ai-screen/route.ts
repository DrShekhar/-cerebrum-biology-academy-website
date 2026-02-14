import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { rateLimit } from '@/lib/rateLimit'
import {
  screenQuestion,
  getScreeningDecision,
  formatScreeningReport,
  type QuestionToScreen,
} from '@/lib/mcq/aiScreening'

export async function POST(request: NextRequest) {
  try {
    const rateLimitResult = await rateLimit(request, { maxRequests: 5, windowMs: 60 * 60 * 1000 })
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
    const { questionId } = body

    if (!questionId) {
      return NextResponse.json({ error: 'Question ID is required' }, { status: 400 })
    }

    const question = await prisma.community_questions.findUnique({
      where: { id: questionId },
    })

    if (!question) {
      return NextResponse.json({ error: 'Question not found' }, { status: 404 })
    }

    if (question.aiScreenedAt) {
      return NextResponse.json({
        message: 'Question already screened',
        aiScore: question.aiScore,
        aiAnalysis: question.aiAnalysis,
        aiApproved: question.aiApproved,
      })
    }

    const options = question.options as string[]
    const questionData: QuestionToScreen = {
      question: question.question,
      options,
      correctAnswer: question.correctAnswer,
      explanation: question.explanation || undefined,
      topic: question.topic,
      subtopic: question.subtopic || undefined,
      difficulty: question.difficulty,
      isPYQ: question.isPYQ,
      pyqYear: question.pyqYear || undefined,
    }

    const screeningResult = await screenQuestion(questionData)
    const decision = getScreeningDecision(screeningResult)

    let newStatus = question.status
    if (decision.autoApprove) {
      newStatus = 'AI_APPROVED'
    } else if (decision.autoReject) {
      newStatus = 'AI_REJECTED'
    } else {
      newStatus = 'ADMIN_REVIEW'
    }

    await prisma.community_questions.update({
      where: { id: questionId },
      data: {
        aiScore: screeningResult.overallScore,
        aiAnalysis: screeningResult as unknown as object,
        aiScreenedAt: new Date(),
        aiApproved: decision.autoApprove,
        status: newStatus,
        rejectionReason: decision.autoReject ? decision.reason : null,
      },
    })

    return NextResponse.json({
      success: true,
      questionId,
      result: screeningResult,
      decision,
      newStatus,
      report: formatScreeningReport(screeningResult),
    })
  } catch (error) {
    console.error('AI Screening API Error:', error)
    return NextResponse.json({ error: 'Failed to screen question' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const questionId = searchParams.get('questionId')

    if (!questionId) {
      return NextResponse.json({ error: 'Question ID is required' }, { status: 400 })
    }

    const question = await prisma.community_questions.findUnique({
      where: { id: questionId },
      select: {
        id: true,
        aiScore: true,
        aiAnalysis: true,
        aiScreenedAt: true,
        aiApproved: true,
        status: true,
      },
    })

    if (!question) {
      return NextResponse.json({ error: 'Question not found' }, { status: 404 })
    }

    if (!question.aiScreenedAt) {
      return NextResponse.json({
        screened: false,
        message: 'Question has not been AI screened yet',
      })
    }

    return NextResponse.json({
      screened: true,
      questionId: question.id,
      aiScore: question.aiScore,
      aiAnalysis: question.aiAnalysis,
      aiApproved: question.aiApproved,
      screenedAt: question.aiScreenedAt,
      status: question.status,
    })
  } catch (error) {
    console.error('AI Screening GET Error:', error)
    return NextResponse.json({ error: 'Failed to get screening result' }, { status: 500 })
  }
}
