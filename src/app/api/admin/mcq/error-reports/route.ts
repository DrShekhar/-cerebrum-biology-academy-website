import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import type { ErrorReportStatus } from '@/generated/prisma'
import { XP_REWARDS } from '@/lib/mcq/types'

// GET - Fetch error reports
export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id || session.user.role?.toUpperCase() !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized - Admin access required' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || 'PENDING'
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')

    const where: Record<string, unknown> = {}

    if (status !== 'ALL') {
      where.status = status as ErrorReportStatus
    }

    const [reports, total] = await Promise.all([
      prisma.answer_error_reports.findMany({
        where,
        orderBy: { createdAt: 'asc' },
        take: limit,
        skip: offset,
        include: {
          communityQuestion: {
            select: {
              question: true,
              options: true,
              correctAnswer: true,
              explanation: true,
            },
          },
        },
      }),
      prisma.answer_error_reports.count({ where }),
    ])

    // For official questions, we need to fetch them separately
    const reportsWithQuestions = await Promise.all(
      reports.map(async (report) => {
        if (report.questionId && !report.communityQuestionId) {
          const question = await prisma.questions.findUnique({
            where: { id: report.questionId },
            select: {
              question: true,
              options: true,
              correctAnswer: true,
              explanation: true,
            },
          })
          return { ...report, officialQuestion: question }
        }
        return report
      })
    )

    // Get stats
    const stats = await prisma.answer_error_reports.groupBy({
      by: ['status'],
      _count: true,
    })

    const statusCounts = Object.fromEntries(stats.map((s) => [s.status, s._count]))

    return NextResponse.json({
      reports: reportsWithQuestions,
      total,
      limit,
      offset,
      stats: statusCounts,
    })
  } catch (error) {
    console.error('Error reports GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch reports' }, { status: 500 })
  }
}

// POST - Resolve an error report
export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id || session.user.role?.toUpperCase() !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized - Admin access required' }, { status: 401 })
    }

    const body = await request.json()
    const { reportId, action, resolution, updatedAnswer } = body

    if (!reportId || !action) {
      return NextResponse.json({ error: 'reportId and action required' }, { status: 400 })
    }

    if (!['accept', 'reject', 'duplicate'].includes(action)) {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }

    const report = await prisma.answer_error_reports.findUnique({
      where: { id: reportId },
    })

    if (!report) {
      return NextResponse.json({ error: 'Report not found' }, { status: 404 })
    }

    if (action === 'accept') {
      // Update the report
      await prisma.answer_error_reports.update({
        where: { id: reportId },
        data: {
          status: 'ACCEPTED' as ErrorReportStatus,
          reviewedBy: session.user.id,
          reviewedAt: new Date(),
          resolution: resolution || 'Answer corrected',
          isValid: true,
          reporterXpAwarded: XP_REWARDS.errorReportAccepted,
        },
      })

      // Update the question if new answer provided
      if (updatedAnswer && report.communityQuestionId) {
        await prisma.community_questions.update({
          where: { id: report.communityQuestionId },
          data: {
            correctAnswer: updatedAnswer,
            status: 'DISPUTED',
          },
        })
      }

      // Award XP to reporter
      await prisma.mcq_user_stats.upsert({
        where: { freeUserId: report.reportedBy },
        create: {
          freeUserId: report.reportedBy,
          totalXp: XP_REWARDS.errorReportAccepted,
          errorsAccepted: 1,
        },
        update: {
          totalXp: { increment: XP_REWARDS.errorReportAccepted },
          errorsAccepted: { increment: 1 },
        },
      })

      return NextResponse.json({
        success: true,
        message: 'Report accepted, answer updated',
      })
    } else if (action === 'reject') {
      await prisma.answer_error_reports.update({
        where: { id: reportId },
        data: {
          status: 'REJECTED' as ErrorReportStatus,
          reviewedBy: session.user.id,
          reviewedAt: new Date(),
          resolution: resolution || 'Report invalid',
          isValid: false,
        },
      })

      return NextResponse.json({
        success: true,
        message: 'Report rejected',
      })
    } else if (action === 'duplicate') {
      await prisma.answer_error_reports.update({
        where: { id: reportId },
        data: {
          status: 'DUPLICATE' as ErrorReportStatus,
          reviewedBy: session.user.id,
          reviewedAt: new Date(),
          resolution: resolution || 'Duplicate report',
        },
      })

      return NextResponse.json({
        success: true,
        message: 'Marked as duplicate',
      })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Error reports POST error:', error)
    return NextResponse.json({ error: 'Failed to process action' }, { status: 500 })
  }
}
