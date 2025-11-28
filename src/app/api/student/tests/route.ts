/**
 * Student Tests API
 *
 * GET /api/student/tests - Get all assigned tests for student
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized. Please log in.' }, { status: 401 })
    }

    const studentId = session.user.id
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    const where: any = {
      studentId,
    }

    if (status) {
      where.status = status
    }

    const [submissions, total] = await Promise.all([
      prisma.test_assignment_submissions.findMany({
        where,
        include: {
          testAssignment: {
            select: {
              id: true,
              title: true,
              description: true,
              instructions: true,
              difficulty: true,
              totalQuestions: true,
              totalMarks: true,
              duration: true,
              negativeMarking: true,
              shuffleQuestions: true,
              showResults: true,
              passingMarks: true,
              dueDate: true,
              availableFrom: true,
              status: true,
              teacher: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
        orderBy: [{ status: 'asc' }, { testAssignment: { dueDate: 'asc' } }],
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.test_assignment_submissions.count({ where }),
    ])

    const stats = await prisma.test_assignment_submissions.groupBy({
      by: ['status'],
      where: { studentId },
      _count: true,
    })

    const statsMap = {
      total,
      notStarted: stats.find((s) => s.status === 'NOT_STARTED')?._count || 0,
      inProgress: stats.find((s) => s.status === 'IN_PROGRESS')?._count || 0,
      submitted: stats.find((s) => s.status === 'SUBMITTED')?._count || 0,
      graded: stats.find((s) => s.status === 'GRADED')?._count || 0,
    }

    const now = new Date()

    return NextResponse.json({
      success: true,
      tests: submissions.map((s) => {
        const assignment = s.testAssignment
        const isAvailable = assignment.availableFrom
          ? new Date(assignment.availableFrom) <= now
          : true
        const isPastDue = new Date(assignment.dueDate) < now
        const canTake =
          isAvailable &&
          !isPastDue &&
          assignment.status === 'PUBLISHED' &&
          (s.status === 'NOT_STARTED' || s.status === 'IN_PROGRESS')

        return {
          submissionId: s.id,
          testId: assignment.id,
          title: assignment.title,
          description: assignment.description,
          instructions: assignment.instructions,
          difficulty: assignment.difficulty,
          totalQuestions: assignment.totalQuestions,
          totalMarks: assignment.totalMarks,
          duration: assignment.duration,
          negativeMarking: assignment.negativeMarking,
          passingMarks: assignment.passingMarks,
          dueDate: assignment.dueDate,
          availableFrom: assignment.availableFrom,
          teacher: assignment.teacher,
          status: s.status,
          startedAt: s.startedAt,
          submittedAt: s.submittedAt,
          timeSpent: s.timeSpent,
          remainingTime: s.remainingTime,
          totalScore: s.totalScore,
          percentage: s.percentage,
          questionsAttempted: s.questionsAttempted,
          questionsCorrect: s.questionsCorrect,
          questionsWrong: s.questionsWrong,
          questionsSkipped: s.questionsSkipped,
          isGraded: s.isGraded,
          teacherFeedback: s.teacherFeedback,
          showResults: assignment.showResults,
          isAvailable,
          isPastDue,
          canTake,
        }
      }),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      stats: statsMap,
    })
  } catch (error) {
    console.error('Failed to fetch student tests:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch tests',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
