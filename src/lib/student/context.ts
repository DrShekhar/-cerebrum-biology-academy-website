import { prisma } from '@/lib/prisma'

/**
 * Student context resolver — THE single source of truth for a student's
 * grade/class, courses, and tier (roadmap P0a).
 *
 * Why: `users` has NO grade column. Grade was scattered across profile JSON
 * under three different keys (`currentClass` | `grade` | `class`, written by
 * three different signup paths) and several pages hardcoded CLASS_12. The
 * canonical source is the student's ACTIVE enrollments → courses.class
 * (StudentClass enum); profile JSON keys are only a fallback for students
 * with no enrollment yet.
 */

export type StudentGrade =
  | 'CLASS_9'
  | 'CLASS_10'
  | 'CLASS_11'
  | 'CLASS_12'
  | 'DROPPER'
  | 'FOUNDATION'
  | null

export interface StudentContext {
  userId: string
  name: string
  email: string
  avatarUrl: string | null
  /** Canonical grade from enrollments; profile-JSON fallback; null if unknown */
  grade: StudentGrade
  /** All distinct classes across active enrollments (a dropper may also hold a Class 12 course) */
  grades: StudentGrade[]
  courseIds: string[]
  courseNames: string[]
  coachingTier: string
  trialEndDate: Date | null
  trialDaysRemaining: number
  /** 11 | 12 | null — for MCQ deep-links (?ncertClass=) */
  ncertClass: 11 | 12 | null
}

const GRADE_ORDER: Record<string, number> = {
  DROPPER: 6,
  CLASS_12: 5,
  CLASS_11: 4,
  CLASS_10: 3,
  CLASS_9: 2,
  FOUNDATION: 1,
}

function normalizeProfileGrade(value: unknown): StudentGrade {
  if (typeof value !== 'string' || !value) return null
  const v = value.toUpperCase().replace(/[^A-Z0-9]/g, '')
  if (v.includes('DROPPER') || v === 'DROP') return 'DROPPER'
  if (v.includes('FOUNDATION')) return 'FOUNDATION'
  if (v.includes('12')) return 'CLASS_12'
  if (v.includes('11')) return 'CLASS_11'
  if (v.includes('10')) return 'CLASS_10'
  if (v.includes('9')) return 'CLASS_9'
  return null
}

export async function getStudentContext(userId: string): Promise<StudentContext | null> {
  const user = await prisma.users.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      profile: true,
      coachingTier: true,
      trialEndDate: true,
      enrollments: {
        where: { status: 'ACTIVE' },
        select: { courses: { select: { id: true, name: true, class: true } } },
      },
    },
  })
  if (!user) return null

  const courses = user.enrollments.map((e) => e.courses)
  const grades = [...new Set(courses.map((c) => c.class))] as StudentGrade[]

  // Canonical grade = highest-priority class among active enrollments
  let grade: StudentGrade =
    grades.length > 0
      ? (grades
          .slice()
          .sort(
            (a, b) => (GRADE_ORDER[b || ''] || 0) - (GRADE_ORDER[a || ''] || 0)
          )[0] as StudentGrade)
      : null

  const profile = (user.profile as Record<string, unknown> | null) || {}
  if (!grade) {
    // Fallback: the three historical profile keys, in the order they were introduced
    grade =
      normalizeProfileGrade(profile.currentClass) ||
      normalizeProfileGrade(profile.grade) ||
      normalizeProfileGrade(profile.class)
  }

  const trialEndDate = user.trialEndDate
  const trialDaysRemaining = trialEndDate
    ? Math.max(0, Math.ceil((trialEndDate.getTime() - Date.now()) / 86_400_000))
    : 0

  // Droppers revise the full syllabus — default their practice links to 12.
  const ncertClass: 11 | 12 | null =
    grade === 'CLASS_11' ? 11 : grade === 'CLASS_12' || grade === 'DROPPER' ? 12 : null

  return {
    userId: user.id,
    name: user.name,
    email: user.email,
    avatarUrl: typeof profile.avatarUrl === 'string' ? profile.avatarUrl : null,
    grade,
    grades,
    courseIds: courses.map((c) => c.id),
    courseNames: courses.map((c) => c.name),
    coachingTier: user.coachingTier || 'FREE',
    trialEndDate,
    trialDaysRemaining,
    ncertClass,
  }
}

/** Human label for a StudentClass value ("Class 12", "Dropper", …) */
export function gradeLabel(grade: StudentGrade): string | null {
  if (!grade) return null
  if (grade === 'DROPPER') return 'Dropper'
  if (grade === 'FOUNDATION') return 'Foundation'
  return `Class ${grade.replace('CLASS_', '')}`
}
