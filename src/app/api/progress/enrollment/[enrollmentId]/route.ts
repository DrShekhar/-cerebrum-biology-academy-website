import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { validateUserSession } from '@/lib/auth/config'

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
      include: {
        courses: {
          include: {
            study_materials: {
              where: { isPublished: true },
            },
            chapters: {
              include: {
                study_materials: {
                  where: { isPublished: true },
                },
              },
            },
          },
        },
      },
    })

    if (!enrollment) {
      return NextResponse.json({ error: 'Enrollment not found' }, { status: 404 })
    }

    if (enrollment.userId !== session.userId) {
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 403 })
    }

    const courseId = enrollment.courseId
    const userId = session.userId

    const totalMaterials = await prisma.study_materials.count({
      where: {
        courseId,
        isPublished: true,
      },
    })

    const materialsViewed = await prisma.material_progress.count({
      where: {
        userId,
        study_materials: {
          courseId,
          isPublished: true,
        },
        status: {
          in: ['VIEWED', 'IN_PROGRESS', 'DOWNLOADED', 'COMPLETED'],
        },
      },
    })

    // Get the course to determine curriculum and grade
    const course = await prisma.courses.findUnique({
      where: { id: courseId },
    })

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    }

    // Map StudentClass to grade string for TestTemplate queries
    const gradeMapping: Record<string, string> = {
      CLASS_11: 'CLASS_11',
      CLASS_12: 'CLASS_12',
      CLASS_9: 'CLASS_9',
      CLASS_10: 'CLASS_10',
      DROPPER: 'CLASS_12', // Droppers typically study class 12 curriculum
      FOUNDATION: 'CLASS_9',
    }

    const grade = gradeMapping[course.class] || 'CLASS_12'

    // Count completed test sessions (use curriculum/grade matching since no direct courseId)
    const testsCompleted = await prisma.test_sessions.count({
      where: {
        userId,
        status: 'COMPLETED',
        test_templates: {
          curriculum: 'NEET', // Assuming NEET courses
          grade: grade,
          isActive: true,
          isPublished: true,
        },
      },
    })

    const totalTests = await prisma.test_templates.count({
      where: {
        curriculum: 'NEET',
        grade: grade,
        isActive: true,
        isPublished: true,
      },
    })

    const studyTimeResult = await prisma.test_sessions.aggregate({
      where: {
        userId,
        status: 'COMPLETED',
        test_templates: {
          curriculum: 'NEET',
          grade: grade,
        },
      },
      _sum: {
        timeSpent: true,
      },
    })

    const studyTimeSeconds = studyTimeResult._sum.timeSpent || 0
    const studyHours = studyTimeSeconds / 3600

    const courseDuration = enrollment.course.duration
    const targetStudyHours = courseDuration * 40

    let materialProgress = 0
    if (totalMaterials > 0) {
      materialProgress = (materialsViewed / totalMaterials) * 0.3 * 100
    }

    let testProgress = 0
    if (totalTests > 0) {
      testProgress = (testsCompleted / totalTests) * 0.4 * 100
    }

    let studyTimeProgress = 0
    if (targetStudyHours > 0) {
      studyTimeProgress = Math.min((studyHours / targetStudyHours) * 0.3 * 100, 30)
    }

    const overallProgress = Math.round(materialProgress + testProgress + studyTimeProgress)

    const progressBreakdown = {
      materials: {
        viewed: materialsViewed,
        total: totalMaterials,
        percentage: totalMaterials > 0 ? Math.round((materialsViewed / totalMaterials) * 100) : 0,
        weight: 30,
      },
      tests: {
        completed: testsCompleted,
        total: totalTests,
        percentage: totalTests > 0 ? Math.round((testsCompleted / totalTests) * 100) : 0,
        weight: 40,
      },
      studyTime: {
        hours: Math.round(studyHours * 10) / 10,
        targetHours: targetStudyHours,
        percentage: targetStudyHours > 0 ? Math.round((studyHours / targetStudyHours) * 100) : 0,
        weight: 30,
      },
    }

    return NextResponse.json({
      enrollmentId,
      courseId,
      courseName: enrollment.course.name,
      overallProgress,
      progressBreakdown,
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
