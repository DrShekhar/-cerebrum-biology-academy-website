import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth/config'
import type { DifficultyLevel } from '@/generated/prisma'

export const dynamic = 'force-dynamic'

// ============================================
// GET - Fetch available worksheets for student
// ============================================

export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const courseId = searchParams.get('courseId')
    const difficulty = searchParams.get('difficulty') as DifficultyLevel | null
    const status = searchParams.get('status') // 'pending', 'submitted', 'graded', 'all'
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')

    // Get user's enrolled courses
    const enrollments = await prisma.enrollments.findMany({
      where: {
        userId: session.user.id,
        status: { in: ['ACTIVE', 'PENDING'] },
      },
      select: { courseId: true },
    })

    const enrolledCourseIds = enrollments.map((e) => e.courseId)

    // Base query conditions
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const whereClause: any = {
      status: 'PUBLISHED',
      publishedAt: { lte: new Date() },
      OR: [
        { courseId: null }, // Global worksheets
        { courseId: { in: enrolledCourseIds } }, // Course-specific worksheets
      ],
    }

    if (courseId) {
      whereClause.courseId = courseId
    }

    if (difficulty) {
      whereClause.difficulty = difficulty
    }

    // Fetch worksheets with student's submission status
    const worksheets = await prisma.worksheets.findMany({
      where: whereClause,
      orderBy: [{ dueDate: 'asc' }, { publishedAt: 'desc' }],
      take: limit,
      skip: offset,
      select: {
        id: true,
        title: true,
        description: true,
        courseId: true,
        chapterId: true,
        topicId: true,
        instructions: true,
        maxMarks: true,
        duration: true,
        difficulty: true,
        dueDate: true,
        allowLateSubmission: true,
        publishedAt: true,
        attachments: true,
        tags: true,
        downloadCount: true,
        submissions: {
          where: { studentId: session.user.id },
          select: {
            id: true,
            status: true,
            startedAt: true,
            submittedAt: true,
            grade: true,
            feedback: true,
            gradedAt: true,
            isLate: true,
            timeSpent: true,
          },
        },
      },
    })

    // Filter by submission status if requested
    let filteredWorksheets = worksheets
    if (status && status !== 'all') {
      filteredWorksheets = worksheets.filter((w) => {
        const submission = w.submissions[0]
        switch (status) {
          case 'pending':
            return !submission || submission.status === 'NOT_STARTED'
          case 'in_progress':
            return submission?.status === 'IN_PROGRESS'
          case 'submitted':
            return submission?.status === 'SUBMITTED'
          case 'graded':
            return submission?.status === 'GRADED'
          default:
            return true
        }
      })
    }

    // Transform to include submission info at top level
    const transformedWorksheets = filteredWorksheets.map((w) => {
      const submission = w.submissions[0]
      const now = new Date()
      const isDuePassed = w.dueDate ? new Date(w.dueDate) < now : false

      return {
        ...w,
        submission: submission || null,
        submissionStatus: submission?.status || 'NOT_STARTED',
        isOverdue: isDuePassed && (!submission || submission.status === 'NOT_STARTED'),
        canSubmit: !isDuePassed || w.allowLateSubmission,
        submissions: undefined,
      }
    })

    // Calculate stats
    const stats = {
      total: transformedWorksheets.length,
      pending: transformedWorksheets.filter((w) => w.submissionStatus === 'NOT_STARTED').length,
      inProgress: transformedWorksheets.filter((w) => w.submissionStatus === 'IN_PROGRESS').length,
      submitted: transformedWorksheets.filter((w) => w.submissionStatus === 'SUBMITTED').length,
      graded: transformedWorksheets.filter((w) => w.submissionStatus === 'GRADED').length,
      overdue: transformedWorksheets.filter((w) => w.isOverdue).length,
    }

    return NextResponse.json({
      success: true,
      data: {
        worksheets: transformedWorksheets,
        stats,
        pagination: {
          total: transformedWorksheets.length,
          limit,
          offset,
          hasMore: worksheets.length === limit,
        },
      },
    })
  } catch (error) {
    console.error('Error fetching worksheets:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch worksheets' },
      { status: 500 }
    )
  }
}
