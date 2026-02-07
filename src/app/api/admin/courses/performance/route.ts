import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdminAuth } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    await requireAdminAuth()

    const courses = await prisma.courses.findMany({
      where: { isActive: true },
      select: {
        id: true,
        name: true,
        type: true,
        enrollments: {
          select: {
            id: true,
            status: true,
            currentProgress: true,
          },
        },
        assignments: {
          select: {
            id: true,
            submissions: {
              select: {
                id: true,
                status: true,
                grade: true,
              },
            },
          },
        },
      },
      orderBy: { sortOrder: 'asc' },
    })

    const coursePerformance = courses.map((course) => {
      const totalEnrolled = course.enrollments.length
      const activeEnrolled = course.enrollments.filter((e) => e.status === 'ACTIVE').length
      const avgProgress = totalEnrolled > 0
        ? Math.round(course.enrollments.reduce((sum, e) => sum + e.currentProgress, 0) / totalEnrolled)
        : 0
      const completionRate = totalEnrolled > 0
        ? Math.round((course.enrollments.filter((e) => e.currentProgress >= 100).length / totalEnrolled) * 100)
        : 0

      const allSubmissions = course.assignments.flatMap((a) => a.submissions)
      const gradedSubmissions = allSubmissions.filter((s) => s.status === 'GRADED' && s.grade !== null)
      const totalMaxMarks = course.assignments.length * 100
      const avgTestScore = gradedSubmissions.length > 0 && totalMaxMarks > 0
        ? Math.round(gradedSubmissions.reduce((sum, s) => sum + (s.grade || 0), 0) / gradedSubmissions.length)
        : 0

      const totalExpectedSubmissions = course.assignments.length * activeEnrolled
      const actualSubmissions = allSubmissions.filter(
        (s) => s.status === 'SUBMITTED' || s.status === 'LATE' || s.status === 'GRADED'
      ).length
      const submissionRate = totalExpectedSubmissions > 0
        ? Math.round((actualSubmissions / totalExpectedSubmissions) * 100)
        : 0

      return {
        id: course.id,
        name: course.name,
        type: course.type,
        enrolledStudents: totalEnrolled,
        activeStudents: activeEnrolled,
        avgProgress,
        completionRate,
        avgTestScore,
        totalAssignments: course.assignments.length,
        submissionRate,
      }
    })

    return NextResponse.json({
      success: true,
      courses: coursePerformance,
    })
  } catch (error) {
    console.error('Error fetching course performance:', error)
    return NextResponse.json(
      { error: 'Failed to fetch course performance' },
      { status: 500 }
    )
  }
}
