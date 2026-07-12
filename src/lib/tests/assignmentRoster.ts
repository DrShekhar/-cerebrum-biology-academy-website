import { prisma } from '@/lib/prisma'

const ASSIGN_TO_MAP: Record<string, string> = {
  ALL: 'ALL_STUDENTS',
  COURSE: 'ALL_STUDENTS',
  CLASS: 'SPECIFIC_CLASS',
  BATCH: 'SPECIFIC_BATCH',
  INDIVIDUAL: 'INDIVIDUAL_STUDENTS',
  STUDENTS: 'INDIVIDUAL_STUDENTS',
}

export function normalizeAssignToType(assignToType: unknown): string {
  return (
    ASSIGN_TO_MAP[String(assignToType).toUpperCase()] ||
    (typeof assignToType === 'string' ? assignToType.toUpperCase() : 'ALL_STUDENTS')
  )
}

export interface RosterTargets {
  assignToType: unknown
  courseId?: string | null
  assignedClassIds?: string[] | null
  assignedStudentIds?: string[] | null
}

/**
 * Resolve the concrete set of student user-ids a test assignment targets.
 *  - ALL_STUDENTS: everyone ACTIVE-enrolled in the course.
 *  - SPECIFIC_CLASS: everyone ACTIVE-enrolled in a course of the selected class
 *    level(s) (assignedClassIds are StudentClass values, e.g. CLASS_12).
 *  - INDIVIDUAL_STUDENTS: the explicit list.
 *
 * Used at both creation (totalAssigned) and publish (submission rows), so the
 * roster is identical no matter which path assigns the students.
 */
export async function resolveAssignmentStudentIds(targets: RosterTargets): Promise<string[]> {
  const normalized = normalizeAssignToType(targets.assignToType)

  if (normalized === 'ALL_STUDENTS' && targets.courseId) {
    const e = await prisma.enrollments.findMany({
      where: { courseId: targets.courseId, status: 'ACTIVE' },
      select: { userId: true },
    })
    return Array.from(new Set(e.map((x) => x.userId)))
  }

  if (
    normalized === 'SPECIFIC_CLASS' &&
    Array.isArray(targets.assignedClassIds) &&
    targets.assignedClassIds.length > 0
  ) {
    const e = await prisma.enrollments.findMany({
      where: {
        status: 'ACTIVE',
        courses: { class: { in: targets.assignedClassIds as any } },
      },
      select: { userId: true },
    })
    return Array.from(new Set(e.map((x) => x.userId)))
  }

  if (normalized === 'INDIVIDUAL_STUDENTS' && Array.isArray(targets.assignedStudentIds)) {
    return Array.from(new Set(targets.assignedStudentIds))
  }

  return []
}
