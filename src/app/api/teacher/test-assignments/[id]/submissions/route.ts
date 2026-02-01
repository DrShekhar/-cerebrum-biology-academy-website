/**
 * Teacher Test Assignment Submissions API
 *
 * GET /api/teacher/test-assignments/[id]/submissions - Get all submissions for a test
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()
    if (!session || (session.user.role !== 'TEACHER' && session.user.role !== 'ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized. Teacher access required.' }, { status: 401 })
    }

    const { id } = await params
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')

    const assignment = await prisma.test_assignments.findUnique({
      where: { id },
      select: { teacherId: true },
    })

    if (!assignment) {
      return NextResponse.json({ error: 'Test assignment not found' }, { status: 404 })
    }

    if (assignment.teacherId !== session.user.id && session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized to view these submissions' }, { status: 403 })
    }

    const where: any = {
      testAssignmentId: id,
    }

    if (status) {
      where.status = status
    }

    const [submissions, total] = await Promise.all([
      prisma.test_assignment_submissions.findMany({
        where,
        include: {
          student: {
            select: {
              id: true,
              name: true,
              email: true,
              profile: true,
            },
          },
        },
        orderBy: [{ status: 'asc' }, { submittedAt: 'desc' }],
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.test_assignment_submissions.count({ where }),
    ])

    const stats = await prisma.test_assignment_submissions.groupBy({
      by: ['status'],
      where: { testAssignmentId: id },
      _count: true,
    })

    const statsMap = {
      total,
      notStarted: stats.find((s) => s.status === 'NOT_STARTED')?._count || 0,
      inProgress: stats.find((s) => s.status === 'IN_PROGRESS')?._count || 0,
      submitted: stats.find((s) => s.status === 'SUBMITTED')?._count || 0,
      graded: stats.find((s) => s.status === 'GRADED')?._count || 0,
    }

    return NextResponse.json({
      success: true,
      submissions: submissions.map((s) => ({
        id: s.id,
        student: s.student,
        status: s.status,
        startedAt: s.startedAt,
        submittedAt: s.submittedAt,
        timeSpent: s.timeSpent,
        tabSwitchCount: s.tabSwitchCount,
        fullscreenExits: s.fullscreenExits,
        totalScore: s.totalScore,
        percentage: s.percentage,
        questionsAttempted: s.questionsAttempted,
        questionsCorrect: s.questionsCorrect,
        questionsWrong: s.questionsWrong,
        questionsSkipped: s.questionsSkipped,
        isGraded: s.isGraded,
        gradedAt: s.gradedAt,
        teacherFeedback: s.teacherFeedback,
        createdAt: s.createdAt,
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      stats: statsMap,
    })
  } catch (error) {
    console.error('Failed to fetch test submissions:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch test submissions',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
