/**
 * Teacher Assignment Submissions API
 * GET /api/teacher/assignments/[id]/submissions - Get all submissions for an assignment
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth()
    if (!session || session.user.role !== 'teacher') {
      return NextResponse.json({ error: 'Unauthorized. Teacher access required.' }, { status: 401 })
    }

    const assignmentId = params.id
    const teacherId = session.user.id

    const searchParams = request.nextUrl.searchParams
    const statusFilter = searchParams.get('status') || 'all'
    const searchQuery = searchParams.get('search') || ''

    const assignment = await prisma.assignments.findFirst({
      where: {
        id: assignmentId,
        teacherId,
      },
      select: {
        id: true,
        title: true,
        description: true,
        maxMarks: true,
        dueDate: true,
        status: true,
        allowLateSubmission: true,
        allowResubmission: true,
        course: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    if (!assignment) {
      return NextResponse.json({ error: 'Assignment not found' }, { status: 404 })
    }

    const where: any = {
      assignmentId,
    }

    if (statusFilter !== 'all') {
      where.status = statusFilter
    }

    if (searchQuery) {
      where.student = {
        OR: [
          { name: { contains: searchQuery, mode: 'insensitive' } },
          { email: { contains: searchQuery, mode: 'insensitive' } },
        ],
      }
    }

    const [submissions, statistics] = await Promise.all([
      prisma.assignment_submissions.findMany({
        where,
        select: {
          id: true,
          status: true,
          submittedAt: true,
          grade: true,
          feedback: true,
          gradedAt: true,
          isLate: true,
          resubmissionCount: true,
          submittedFiles: true,
          submittedText: true,
          student: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: [{ status: 'asc' }, { submittedAt: 'desc' }],
      }),
      prisma.assignment_submissions.groupBy({
        by: ['status'],
        where: { assignmentId },
        _count: {
          id: true,
        },
      }),
    ])

    const statsMap = statistics.reduce(
      (acc, item) => {
        acc[item.status] = item._count.id
        return acc
      },
      {} as Record<string, number>
    )

    const totalSubmissions = await prisma.assignment_submissions.count({
      where: { assignmentId },
    })

    const gradedCount = await prisma.assignment_submissions.count({
      where: { assignmentId, status: 'GRADED' },
    })

    const averageGrade = await prisma.assignment_submissions.aggregate({
      where: { assignmentId, status: 'GRADED' },
      _avg: {
        grade: true,
      },
    })

    return NextResponse.json({
      success: true,
      assignment,
      submissions,
      statistics: {
        total: totalSubmissions,
        notSubmitted: statsMap.NOT_SUBMITTED || 0,
        submitted: statsMap.SUBMITTED || 0,
        late: statsMap.LATE || 0,
        graded: statsMap.GRADED || 0,
        resubmitRequired: statsMap.RESUBMIT_REQUIRED || 0,
        gradedCount,
        averageGrade: averageGrade._avg.grade || 0,
        gradingProgress:
          totalSubmissions > 0 ? Math.round((gradedCount / totalSubmissions) * 100) : 0,
      },
    })
  } catch (error) {
    console.error('Failed to fetch assignment submissions:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch assignment submissions',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
