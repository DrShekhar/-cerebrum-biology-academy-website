/**
 * Enrollment progress — single source of truth.
 *
 * Computes a weighted course-completion percentage (materials 30% + tests 40% +
 * study-time 30%) AND persists it to enrollments.currentProgress, so the value
 * the student sees is real and stored (previously the calculator existed but was
 * orphaned and currentProgress was stuck at 0 from enrolment).
 */

import { prisma } from '@/lib/prisma'

const GRADE_MAPPING: Record<string, string> = {
  CLASS_11: 'CLASS_11',
  CLASS_12: 'CLASS_12',
  CLASS_9: 'CLASS_9',
  CLASS_10: 'CLASS_10',
  DROPPER: 'CLASS_12',
  FOUNDATION: 'CLASS_9',
}

export interface EnrollmentProgressBreakdown {
  overallProgress: number
  breakdown: {
    materials: { viewed: number; total: number; weight: 30 }
    tests: { completed: number; total: number; weight: 40 }
    studyTime: { hours: number; targetHours: number; weight: 30 }
  }
}

/**
 * Compute the weighted progress for an enrollment and write it back to
 * enrollments.currentProgress. Returns the breakdown (overallProgress is the
 * persisted value). Returns null if the enrollment doesn't exist.
 */
export async function recomputeEnrollmentProgress(
  enrollmentId: string
): Promise<EnrollmentProgressBreakdown | null> {
  const enrollment = await prisma.enrollments.findUnique({
    where: { id: enrollmentId },
    select: {
      userId: true,
      courseId: true,
      courses: { select: { class: true, duration: true } },
    },
  })
  if (!enrollment) return null

  const { userId, courseId } = enrollment
  const grade = GRADE_MAPPING[enrollment.courses.class] || 'CLASS_12'

  const [totalMaterials, materialsViewed, testsCompleted, totalTests, studyTimeAgg] =
    await Promise.all([
      prisma.study_materials.count({ where: { courseId, isPublished: true } }),
      prisma.material_progress.count({
        where: {
          userId,
          study_materials: { courseId, isPublished: true },
          status: { in: ['VIEWED', 'IN_PROGRESS', 'DOWNLOADED', 'COMPLETED'] },
        },
      }),
      prisma.test_sessions.count({
        where: {
          userId,
          status: 'COMPLETED',
          test_templates: { curriculum: 'NEET', grade, isActive: true, isPublished: true },
        },
      }),
      prisma.test_templates.count({
        where: { curriculum: 'NEET', grade, isActive: true, isPublished: true },
      }),
      prisma.test_sessions.aggregate({
        where: {
          userId,
          status: 'COMPLETED',
          test_templates: { curriculum: 'NEET', grade },
        },
        _sum: { timeSpent: true },
      }),
    ])

  const studyHours = (studyTimeAgg._sum.timeSpent || 0) / 3600
  const targetStudyHours = enrollment.courses.duration * 40

  const materialProgress = totalMaterials > 0 ? (materialsViewed / totalMaterials) * 0.3 * 100 : 0
  const testProgress = totalTests > 0 ? (testsCompleted / totalTests) * 0.4 * 100 : 0
  const studyTimeProgress =
    targetStudyHours > 0 ? Math.min((studyHours / targetStudyHours) * 0.3 * 100, 30) : 0

  const overallProgress = Math.min(
    100,
    Math.round(materialProgress + testProgress + studyTimeProgress)
  )

  // Persist so the list/detail pages and analytics read a real value.
  await prisma.enrollments.update({
    where: { id: enrollmentId },
    data: { currentProgress: overallProgress, lastAccessDate: new Date() },
  })

  return {
    overallProgress,
    breakdown: {
      materials: { viewed: materialsViewed, total: totalMaterials, weight: 30 },
      tests: { completed: testsCompleted, total: totalTests, weight: 40 },
      studyTime: {
        hours: Math.round(studyHours * 10) / 10,
        targetHours: targetStudyHours,
        weight: 30,
      },
    },
  }
}

/**
 * Mark a study-material lesson COMPLETED for a user and refresh the course
 * progress it belongs to. Shared by any surface that "completes" a lesson —
 * assignment submission, video watch-to-end, etc. — so course progress moves
 * consistently regardless of lesson type. Best-effort: never throws (progress is
 * not worth failing the primary action for); returns false if it couldn't run.
 */
export async function completeMaterialAndRecompute(
  userId: string,
  materialId: string
): Promise<boolean> {
  try {
    const material = await prisma.study_materials.findUnique({
      where: { id: materialId },
      select: { id: true, courseId: true },
    })
    if (!material) return false

    await prisma.material_progress.upsert({
      where: { materialId_userId: { materialId, userId } },
      update: { status: 'COMPLETED', completedAt: new Date(), lastViewedAt: new Date() },
      create: {
        id: `matprog_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
        updatedAt: new Date(),
        materialId,
        userId,
        status: 'COMPLETED',
        completedAt: new Date(),
        firstViewedAt: new Date(),
        lastViewedAt: new Date(),
      },
    })

    if (material.courseId) {
      const enrollment = await prisma.enrollments.findFirst({
        where: { userId, courseId: material.courseId, status: 'ACTIVE' },
        select: { id: true },
      })
      if (enrollment) {
        await recomputeEnrollmentProgress(enrollment.id)
      }
    }
    return true
  } catch (error) {
    console.error('completeMaterialAndRecompute failed:', error)
    return false
  }
}
