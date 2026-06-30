import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { validateUserSession } from '@/lib/auth/config'
import { recomputeEnrollmentProgress } from '@/lib/lms/enrollmentProgress'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

interface RouteContext {
  params: Promise<{
    enrollmentId: string
  }>
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const session = await validateUserSession(request)
    if (!session.valid || !session.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { enrollmentId } = await context.params

    const enrollment = await prisma.enrollments.findUnique({
      where: { id: enrollmentId },
      select: { userId: true, courseId: true, courses: { select: { name: true } } },
    })

    if (!enrollment) {
      return NextResponse.json({ error: 'Enrollment not found' }, { status: 404 })
    }

    if (enrollment.userId !== session.userId) {
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 403 })
    }

    // Single source of truth: computes the weighted progress AND persists it to
    // enrollments.currentProgress.
    const prog = await recomputeEnrollmentProgress(enrollmentId)
    if (!prog) {
      return NextResponse.json({ error: 'Could not compute progress' }, { status: 500 })
    }

    const { materials, tests, studyTime } = prog.breakdown
    return NextResponse.json({
      enrollmentId,
      courseId: enrollment.courseId,
      courseName: enrollment.courses.name,
      overallProgress: prog.overallProgress,
      progressBreakdown: {
        materials: {
          viewed: materials.viewed,
          total: materials.total,
          percentage: materials.total > 0 ? Math.round((materials.viewed / materials.total) * 100) : 0,
          weight: materials.weight,
        },
        tests: {
          completed: tests.completed,
          total: tests.total,
          percentage: tests.total > 0 ? Math.round((tests.completed / tests.total) * 100) : 0,
          weight: tests.weight,
        },
        studyTime: {
          hours: studyTime.hours,
          targetHours: studyTime.targetHours,
          percentage:
            studyTime.targetHours > 0 ? Math.round((studyTime.hours / studyTime.targetHours) * 100) : 0,
          weight: studyTime.weight,
        },
      },
      lastUpdated: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error calculating progress:', error)
    return NextResponse.json(
      {
        error: 'Failed to calculate progress',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
