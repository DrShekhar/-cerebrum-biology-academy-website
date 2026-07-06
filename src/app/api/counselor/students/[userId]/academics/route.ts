import { NextRequest, NextResponse } from 'next/server'
import { authenticateCounselor } from '@/lib/auth/counselor-auth'
import { prisma } from '@/lib/prisma'
import { getStudentContext, gradeLabel } from '@/lib/student/context'

export const dynamic = 'force-dynamic'

/**
 * GET /api/counselor/students/[userId]/academics — one consolidated academic
 * snapshot of a student for staff (roadmap P3: "students detail should be
 * accessible to the counsellor and also to the admin").
 *
 * Role: COUNSELOR or ADMIN (authenticateCounselor). Counselors handle all
 * leads, so they may view any student's academics; lead-based lookup below
 * still honors the per-counselor lead tenant isolation used by
 * /api/counselor/leads/[id].
 *
 * Two lookup modes:
 *   - default:      [userId] is a users.id (admin drill-down, converted leads)
 *   - ?from=lead:   [userId] is a leads.id — the linked student account is
 *                   resolved by email / phone-last-10 match (leads have no
 *                   convertedUserId column). Returns { linkedStudent: null }
 *                   when no student account matches yet.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const authResult = await authenticateCounselor()
    if ('error' in authResult) return authResult.error
    const { session } = authResult

    const { userId: rawId } = await params
    const fromLead = request.nextUrl.searchParams.get('from') === 'lead'

    let userId = rawId
    let leadInfo: { id: string; studentName: string } | null = null

    if (fromLead) {
      // Same tenant isolation as /api/counselor/leads/[id]
      const lead = await prisma.leads.findFirst({
        where: {
          id: rawId,
          ...(session.role === 'ADMIN' ? {} : { assignedToId: session.userId }),
        },
        select: { id: true, studentName: true, email: true, phone: true },
      })
      if (!lead) {
        return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 })
      }
      leadInfo = { id: lead.id, studentName: lead.studentName }

      const last10 = lead.phone.replace(/\D/g, '').slice(-10)
      const student = await prisma.users.findFirst({
        where: {
          role: 'STUDENT',
          OR: [
            ...(lead.email
              ? [{ email: { equals: lead.email, mode: 'insensitive' as const } }]
              : []),
            ...(last10.length === 10 ? [{ phone: { endsWith: last10 } }] : []),
          ],
        },
        select: { id: true },
        orderBy: { createdAt: 'desc' },
      })
      if (!student) {
        return NextResponse.json({ success: true, data: { lead: leadInfo, linkedStudent: null } })
      }
      userId = student.id
    }

    const ctx = await getStudentContext(userId)
    if (!ctx) {
      return NextResponse.json({ success: false, error: 'Student not found' }, { status: 404 })
    }

    const [user, enrollments, attempts, homeworkCounts, recentFeedback, attendance, payments] =
      await Promise.all([
        prisma.users.findUnique({
          where: { id: userId },
          select: { phone: true, lastActiveAt: true, createdAt: true },
        }),
        prisma.enrollments.findMany({
          where: { userId },
          orderBy: { enrollmentDate: 'desc' },
          take: 10,
          select: {
            id: true,
            status: true,
            enrollmentDate: true,
            currentProgress: true,
            totalFees: true,
            paidAmount: true,
            pendingAmount: true,
            courses: { select: { name: true, class: true } },
          },
        }),
        // Convention (see /api/student/gradebook): test_attempts.freeUserId
        // holds the user id for logged-in students.
        prisma.test_attempts.findMany({
          where: { freeUserId: userId, status: 'COMPLETED' },
          orderBy: { startedAt: 'desc' },
          take: 50,
          select: {
            id: true,
            title: true,
            score: true,
            totalMarks: true,
            percentage: true,
            startedAt: true,
            submittedAt: true,
            test_templates: { select: { title: true } },
          },
        }),
        prisma.assignment_submissions.groupBy({
          by: ['status'],
          where: { studentId: userId },
          _count: { _all: true },
        }),
        prisma.assignment_submissions.findMany({
          where: { studentId: userId, status: 'GRADED', feedback: { not: null } },
          orderBy: { gradedAt: 'desc' },
          take: 3,
          select: {
            id: true,
            grade: true,
            feedback: true,
            gradedAt: true,
            assignments: { select: { title: true, maxMarks: true } },
          },
        }),
        prisma.student_attendance.findMany({
          where: { studentId: userId },
          orderBy: { markedAt: 'desc' },
          take: 60,
          select: {
            id: true,
            status: true,
            markedAt: true,
            isLate: true,
            class_sessions: { select: { title: true, scheduledDate: true } },
          },
        }),
        prisma.payments.findMany({
          where: { userId },
          orderBy: { createdAt: 'desc' },
          take: 5,
          select: {
            id: true,
            amount: true,
            status: true,
            createdAt: true,
            enrollments: { select: { courses: { select: { name: true } } } },
          },
        }),
      ])

    const pct = (a: (typeof attempts)[number]) =>
      a.percentage ?? (a.totalMarks > 0 ? (a.score / a.totalMarks) * 100 : 0)
    const round1 = (n: number) => Math.round(n * 10) / 10

    const testStats = {
      completed: attempts.length,
      averagePercentage: attempts.length
        ? round1(attempts.reduce((s, a) => s + pct(a), 0) / attempts.length)
        : 0,
      bestPercentage: attempts.length ? round1(Math.max(...attempts.map(pct))) : 0,
      recent: attempts.slice(0, 10).map((a) => ({
        id: a.id,
        title: a.test_templates?.title || a.title,
        score: a.score,
        totalMarks: a.totalMarks,
        percentage: round1(pct(a)),
        date: (a.submittedAt || a.startedAt).toISOString(),
      })),
    }

    const homework: Record<string, number> = {}
    for (const row of homeworkCounts) homework[row.status] = row._count._all

    const presentCount = attendance.filter(
      (a) => a.status === 'PRESENT' || a.status === 'LATE'
    ).length
    const attendanceStats = {
      recorded: attendance.length,
      present: presentCount,
      rate: attendance.length ? Math.round((presentCount / attendance.length) * 100) : null,
      recent: attendance.slice(0, 7).map((a) => ({
        id: a.id,
        status: a.status,
        isLate: a.isLate,
        date: (a.class_sessions?.scheduledDate || a.markedAt).toISOString(),
        sessionTitle: a.class_sessions?.title || 'Class session',
      })),
    }

    const lastTestAt = attempts[0] ? attempts[0].submittedAt || attempts[0].startedAt : null
    const lastActiveCandidates = [lastTestAt, user?.lastActiveAt].filter(Boolean) as Date[]
    const lastActiveAt = lastActiveCandidates.length
      ? new Date(Math.max(...lastActiveCandidates.map((d) => d.getTime())))
      : null

    return NextResponse.json({
      success: true,
      data: {
        lead: leadInfo,
        linkedStudent: fromLead ? { id: userId } : undefined,
        student: {
          id: ctx.userId,
          name: ctx.name,
          email: ctx.email,
          phone: user?.phone || null,
          grade: ctx.grade,
          gradeLabel: gradeLabel(ctx.grade),
          courseNames: ctx.courseNames,
          coachingTier: ctx.coachingTier,
          trialDaysRemaining: ctx.trialDaysRemaining,
          joinedAt: user?.createdAt?.toISOString() || null,
        },
        enrollments: enrollments.map((e) => ({
          id: e.id,
          courseName: e.courses.name,
          courseClass: e.courses.class,
          status: e.status,
          enrolledAt: e.enrollmentDate.toISOString(),
          progress: e.currentProgress,
          totalFees: e.totalFees,
          paidAmount: e.paidAmount,
          pendingAmount: e.pendingAmount,
        })),
        tests: testStats,
        homework: {
          counts: homework,
          graded: homework.GRADED || 0,
          pending: (homework.NOT_SUBMITTED || 0) + (homework.RESUBMIT_REQUIRED || 0),
          submitted: (homework.SUBMITTED || 0) + (homework.LATE || 0),
          recentFeedback: recentFeedback.map((f) => ({
            id: f.id,
            assignmentTitle: f.assignments.title,
            grade: f.grade,
            maxMarks: f.assignments.maxMarks,
            feedback: f.feedback,
            gradedAt: f.gradedAt?.toISOString() || null,
          })),
        },
        attendance: attendanceStats,
        lastActive: {
          lastTestAt: lastTestAt ? lastTestAt.toISOString() : null,
          lastSeenAt: user?.lastActiveAt?.toISOString() || null,
          latest: lastActiveAt ? lastActiveAt.toISOString() : null,
        },
        payments: {
          totalPaid: enrollments.reduce((s, e) => s + (e.paidAmount || 0), 0),
          totalPending: enrollments.reduce((s, e) => s + (e.pendingAmount || 0), 0),
          recent: payments.map((p) => ({
            id: p.id,
            amount: p.amount,
            status: p.status,
            date: p.createdAt.toISOString(),
            courseName: p.enrollments?.courses?.name || null,
          })),
        },
      },
    })
  } catch (error) {
    console.error('[counselor/students/academics] failed:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to load student academics' },
      { status: 500 }
    )
  }
}
