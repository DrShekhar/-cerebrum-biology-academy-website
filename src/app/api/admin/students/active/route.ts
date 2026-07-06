import { NextResponse } from 'next/server'
import { requireAdminAuth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// Active students with REAL engagement data. The /admin/students/active page
// previously rendered a hardcoded mock array (fake schools, scores,
// "parent satisfaction") with no fetch at all.
export async function GET() {
  try {
    await requireAdminAuth()

    const enrollments = await prisma.enrollments.findMany({
      where: { status: 'ACTIVE' },
      select: {
        userId: true,
        createdAt: true,
        courses: { select: { name: true } },
        users: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            lastActiveAt: true,
            createdAt: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 500,
    })

    // Group enrollments per student
    const byStudent = new Map<
      string,
      {
        id: string
        name: string
        email: string
        phone: string
        courses: string[]
        joiningDate: Date
        lastActivity: Date | null
      }
    >()
    for (const e of enrollments) {
      const u = e.users
      const existing = byStudent.get(u.id)
      if (existing) {
        existing.courses.push(e.courses.name)
        if (e.createdAt < existing.joiningDate) existing.joiningDate = e.createdAt
      } else {
        byStudent.set(u.id, {
          id: u.id,
          name: u.name,
          email: u.email,
          phone: u.phone || '',
          courses: [e.courses.name],
          joiningDate: e.createdAt,
          lastActivity: u.lastActiveAt,
        })
      }
    }
    const studentIds = [...byStudent.keys()]
    if (studentIds.length === 0) {
      return NextResponse.json({ success: true, students: [] })
    }

    const [attemptRows, attendanceAll, attendancePresent, paymentAgg] = await Promise.all([
      // NOTE: groupBy on test_attempts trips a TS2615 circular-type error in
      // this Prisma version — aggregate in JS instead (bounded: ≤500 students).
      // test_attempts are keyed by freeUserId, which the test flow populates
      // with the signed-in user's id (same convention as /api/student/gradebook)
      prisma.test_attempts.findMany({
        where: { freeUserId: { in: studentIds }, status: 'COMPLETED' },
        select: { freeUserId: true, percentage: true },
      }),
      prisma.student_attendance.groupBy({
        by: ['studentId'],
        where: { studentId: { in: studentIds } },
        _count: true,
      }),
      prisma.student_attendance.groupBy({
        by: ['studentId'],
        where: { studentId: { in: studentIds }, status: 'PRESENT' },
        _count: true,
      }),
      prisma.payments.groupBy({
        by: ['userId'],
        where: { userId: { in: studentIds }, status: 'COMPLETED' },
        _sum: { amount: true },
      }),
    ])

    const scoreSums = new Map<string, { sum: number; n: number }>()
    for (const a of attemptRows) {
      const agg = scoreSums.get(a.freeUserId) || { sum: 0, n: 0 }
      agg.sum += a.percentage
      agg.n += 1
      scoreSums.set(a.freeUserId, agg)
    }
    const avgScore = Object.fromEntries(
      [...scoreSums.entries()].map(([id, a]) => [id, a.sum / a.n])
    )
    const testsTaken = Object.fromEntries([...scoreSums.entries()].map(([id, a]) => [id, a.n]))
    const attTotal = Object.fromEntries(attendanceAll.map((a) => [a.studentId, a._count]))
    const attPresent = Object.fromEntries(attendancePresent.map((a) => [a.studentId, a._count]))
    const paid = Object.fromEntries(paymentAgg.map((p) => [p.userId, p._sum.amount || 0]))

    const students = [...byStudent.values()].map((s) => ({
      id: s.id,
      name: s.name,
      email: s.email,
      phone: s.phone,
      coursesEnrolled: s.courses,
      joiningDate: s.joiningDate.toISOString(),
      lastActivity: s.lastActivity?.toISOString() || null,
      averageScore: avgScore[s.id] != null ? Math.round(avgScore[s.id] as number) : null,
      testsTaken: testsTaken[s.id] || 0,
      attendanceRate: attTotal[s.id]
        ? Math.round(((attPresent[s.id] || 0) / attTotal[s.id]) * 100)
        : null,
      totalPayments: paid[s.id] || 0,
    }))

    return NextResponse.json({ success: true, students })
  } catch (error) {
    console.error('[admin/students/active] failed:', error)
    return NextResponse.json({ error: 'Failed to load active students' }, { status: 500 })
  }
}
