import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import type { CommunityQuestionStatus } from '@/generated/prisma'
import { XP_REWARDS } from '@/lib/mcq/types'

// GET - Fetch pending questions for moderation
export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id || session.user.role?.toUpperCase() !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized - Admin access required' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || 'PENDING'
    const topic = searchParams.get('topic')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')

    const where: Record<string, unknown> = {}

    if (status === 'PENDING') {
      where.status = { in: ['PENDING', 'AI_APPROVED', 'AI_REJECTED'] }
    } else {
      where.status = status as CommunityQuestionStatus
    }

    if (topic) {
      where.topic = topic
    }

    const [questions, total] = await Promise.all([
      prisma.community_questions.findMany({
        where,
        orderBy: [{ aiScore: 'desc' }, { createdAt: 'asc' }],
        take: limit,
        skip: offset,
        select: {
          id: true,
          question: true,
          options: true,
          correctAnswer: true,
          explanation: true,
          topic: true,
          subtopic: true,
          chapter: true,
          difficulty: true,
          isPYQ: true,
          pyqYear: true,
          submittedBy: true,
          submitterName: true,
          submitterPhone: true,
          submitterEmail: true,
          aiScore: true,
          aiAnalysis: true,
          aiScreenedAt: true,
          aiApproved: true,
          status: true,
          reviewedBy: true,
          reviewedAt: true,
          reviewNotes: true,
          rejectionReason: true,
          totalAttempts: true,
          correctAttempts: true,
          reportCount: true,
          createdAt: true,
        },
      }),
      prisma.community_questions.count({ where }),
    ])

    // Get stats
    const stats = await prisma.community_questions.groupBy({
      by: ['status'],
      _count: true,
    })

    const statusCounts = Object.fromEntries(stats.map((s) => [s.status, s._count]))

    return NextResponse.json({
      questions,
      total,
      limit,
      offset,
      stats: statusCounts,
    })
  } catch (error) {
    console.error('Moderation GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 })
  }
}

// POST - Approve or reject a question
export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id || session.user.role?.toUpperCase() !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized - Admin access required' }, { status: 401 })
    }

    const body = await request.json()
    const { questionId, action, reviewNotes, rejectionReason, edits } = body

    if (!questionId || !action) {
      return NextResponse.json({ error: 'questionId and action required' }, { status: 400 })
    }

    if (!['approve', 'reject', 'request_revision'].includes(action)) {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }

    const question = await prisma.community_questions.findUnique({
      where: { id: questionId },
    })

    if (!question) {
      return NextResponse.json({ error: 'Question not found' }, { status: 404 })
    }

    if (action === 'approve') {
      // Apply any edits
      const updateData: Record<string, unknown> = {
        status: 'APPROVED' as CommunityQuestionStatus,
        reviewedBy: session.user.id,
        reviewedAt: new Date(),
        reviewNotes: reviewNotes || null,
        publishedAt: new Date(),
        contributorXpAwarded: XP_REWARDS.questionApproved,
      }

      if (edits) {
        if (edits.question) updateData.question = edits.question
        if (edits.options) updateData.options = edits.options
        if (edits.correctAnswer) updateData.correctAnswer = edits.correctAnswer
        if (edits.explanation) updateData.explanation = edits.explanation
        if (edits.topic) updateData.topic = edits.topic
        if (edits.difficulty) updateData.difficulty = edits.difficulty
      }

      await prisma.community_questions.update({
        where: { id: questionId },
        data: updateData,
      })

      // Award XP to contributor
      await prisma.mcq_user_stats.upsert({
        where: { freeUserId: question.submittedBy },
        create: {
          freeUserId: question.submittedBy,
          totalXp: XP_REWARDS.questionApproved,
          questionsApproved: 1,
        },
        update: {
          totalXp: { increment: XP_REWARDS.questionApproved },
          questionsApproved: { increment: 1 },
        },
      })

      return NextResponse.json({
        success: true,
        message: 'Question approved and published',
      })
    } else if (action === 'reject') {
      if (!rejectionReason) {
        return NextResponse.json({ error: 'Rejection reason required' }, { status: 400 })
      }

      await prisma.community_questions.update({
        where: { id: questionId },
        data: {
          status: 'REJECTED' as CommunityQuestionStatus,
          reviewedBy: session.user.id,
          reviewedAt: new Date(),
          reviewNotes: reviewNotes || null,
          rejectionReason,
        },
      })

      return NextResponse.json({
        success: true,
        message: 'Question rejected',
      })
    } else if (action === 'request_revision') {
      await prisma.community_questions.update({
        where: { id: questionId },
        data: {
          status: 'ADMIN_REVIEW' as CommunityQuestionStatus,
          reviewedBy: session.user.id,
          reviewedAt: new Date(),
          reviewNotes: reviewNotes || 'Revision requested',
        },
      })

      return NextResponse.json({
        success: true,
        message: 'Revision requested',
      })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Moderation POST error:', error)
    return NextResponse.json({ error: 'Failed to process action' }, { status: 500 })
  }
}
