import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth/config'

export const dynamic = 'force-dynamic'

interface RouteParams {
  params: Promise<{ childId: string }>
}

/**
 * GET /api/parent/children/[childId]/homework
 * Fetch homework/assignments for a specific child
 *
 * Query params:
 * - status: Filter by status (all, pending, submitted, graded)
 * - limit: Number of results (default 20)
 * - offset: Pagination offset (default 0)
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }

    const { childId } = await params
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || 'all'
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100)
    const offset = parseInt(searchParams.get('offset') || '0')

    // Verify parent has access to this child
    const parentChildRelation = await prisma.parent_child_relationships.findFirst({
      where: {
        parentId: session.user.id,
        childId: childId,
      },
      include: {
        child: {
          select: { id: true, name: true, email: true, currentClass: true },
        },
      },
    })

    if (!parentChildRelation) {
      return NextResponse.json(
        { success: false, error: "You do not have access to this child's data" },
        { status: 403 }
      )
    }

    // Get child's enrolled course IDs
    const enrollments = await prisma.enrollments.findMany({
      where: { studentId: childId },
      select: { courseId: true },
    })

    const courseIds = enrollments.map((e) => e.courseId)

    // Build status filter for submissions
    const statusFilter = (() => {
      switch (status) {
        case 'pending':
          return { status: { in: ['NOT_SUBMITTED', 'PENDING'] as const } }
        case 'submitted':
          return { status: 'SUBMITTED' as const }
        case 'graded':
          return { status: 'GRADED' as const }
        default:
          return {}
      }
    })()

    // Get assignments with submission status
    const assignments = await prisma.assignments.findMany({
      where: {
        courseId: { in: courseIds },
        status: 'PUBLISHED',
      },
      include: {
        course: { select: { id: true, name: true } },
        chapter: { select: { id: true, name: true } },
        teacher: { select: { id: true, name: true } },
        submissions: {
          where: {
            studentId: childId,
            ...statusFilter,
          },
        },
      },
      orderBy: { dueDate: 'desc' },
      skip: offset,
      take: limit,
    })

    // Transform data for parent view
    const homework = assignments.map((assignment) => {
      const submission = assignment.submissions[0]
      const now = new Date()
      const dueDate = new Date(assignment.dueDate)
      const isOverdue = dueDate < now && (!submission || submission.status === 'NOT_SUBMITTED')

      return {
        id: assignment.id,
        title: assignment.title,
        description: assignment.description,
        course: assignment.course,
        chapter: assignment.chapter,
        teacher: assignment.teacher,
        dueDate: assignment.dueDate.toISOString(),
        maxMarks: assignment.maxMarks,
        allowLateSubmission: assignment.allowLateSubmission,
        latePenaltyPercentage: assignment.latePenaltyPercentage,
        isOverdue,
        submission: submission
          ? {
              id: submission.id,
              status: submission.status,
              submittedAt: submission.submittedAt?.toISOString(),
              grade: submission.grade,
              feedback: submission.feedback,
              gradedAt: submission.gradedAt?.toISOString(),
              isLate: submission.isLate,
              resubmissionCount: submission.resubmissionCount,
            }
          : {
              status: 'NOT_SUBMITTED',
              submittedAt: null,
              grade: null,
              feedback: null,
              gradedAt: null,
              isLate: false,
            },
        statusLabel: getStatusLabel(submission?.status || 'NOT_SUBMITTED', isOverdue),
      }
    })

    // Calculate statistics
    const allSubmissions = await prisma.assignment_submissions.findMany({
      where: { studentId: childId },
      select: {
        status: true,
        grade: true,
        isLate: true,
        assignment: { select: { maxMarks: true } },
      },
    })

    const stats = {
      total: allSubmissions.length,
      pending: allSubmissions.filter((s) => s.status === 'NOT_SUBMITTED' || s.status === 'PENDING')
        .length,
      submitted: allSubmissions.filter((s) => s.status === 'SUBMITTED').length,
      graded: allSubmissions.filter((s) => s.status === 'GRADED').length,
      late: allSubmissions.filter((s) => s.isLate).length,
      avgScore: calculateAverageScore(allSubmissions),
    }

    return NextResponse.json({
      success: true,
      data: {
        child: parentChildRelation.child,
        homework,
        stats,
        pagination: {
          limit,
          offset,
          hasMore: homework.length === limit,
        },
      },
    })
  } catch (error) {
    console.error('Error fetching child homework:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch homework data' },
      { status: 500 }
    )
  }
}

function getStatusLabel(status: string, isOverdue: boolean): string {
  if (isOverdue && status === 'NOT_SUBMITTED') return 'Overdue'
  switch (status) {
    case 'NOT_SUBMITTED':
      return 'Not Started'
    case 'PENDING':
      return 'In Progress'
    case 'SUBMITTED':
      return 'Submitted - Awaiting Review'
    case 'GRADED':
      return 'Graded'
    default:
      return status
  }
}

interface SubmissionWithGrade {
  grade: number | null
  assignment: { maxMarks: number }
}

function calculateAverageScore(submissions: SubmissionWithGrade[]): number {
  const gradedSubmissions = submissions.filter((s) => s.grade !== null)
  if (gradedSubmissions.length === 0) return 0

  const totalPercentage = gradedSubmissions.reduce((acc, s) => {
    const percentage = ((s.grade || 0) / s.assignment.maxMarks) * 100
    return acc + percentage
  }, 0)

  return Math.round(totalPercentage / gradedSubmissions.length)
}
