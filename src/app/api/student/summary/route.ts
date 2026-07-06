import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getStudentContext, gradeLabel } from '@/lib/student/context'
import { getXpBreakdown } from '@/lib/gamification/xpEvents'
import { getStreakStatus } from '@/lib/gamification/streakProtection'

export const dynamic = 'force-dynamic'

/**
 * GET /api/student/summary — everything the dashboard HEADER needs in one
 * call (roadmap P0b): identity + avatar, canonical grade & courses, tier /
 * trial, streak & XP, and action counts (due homework, next live class,
 * resumable mock test).
 */
export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const userId = session.user.id

    const ctx = await getStudentContext(userId)
    if (!ctx) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const now = new Date()
    const [xp, streak, dueHomework, nextSession, cbtInProgress, unreadFeedback] =
      await Promise.allSettled([
        getXpBreakdown(userId),
        getStreakStatus(userId),
        prisma.assignment_submissions.count({
          where: {
            studentId: userId,
            status: { in: ['NOT_SUBMITTED', 'RESUBMIT_REQUIRED'] },
            assignments: { status: 'PUBLISHED', dueDate: { gte: now } },
          },
        }),
        ctx.courseIds.length
          ? prisma.class_sessions.findFirst({
              where: {
                courseId: { in: ctx.courseIds },
                scheduledDate: { gte: now },
                status: { not: 'CANCELLED' },
              },
              orderBy: { scheduledDate: 'asc' },
              select: {
                id: true,
                title: true,
                scheduledDate: true,
                meetingLink: true,
                courses: { select: { name: true } },
              },
            })
          : Promise.resolve(null),
        prisma.test_sessions.findFirst({
          where: { userId, status: 'IN_PROGRESS' },
          orderBy: { createdAt: 'desc' },
          select: { id: true },
        }),
        prisma.assignment_submissions.count({
          where: { studentId: userId, status: 'GRADED', feedback: { not: null } },
        }),
      ])

    const val = <T,>(r: PromiseSettledResult<T>, fallback: T): T =>
      r.status === 'fulfilled' ? r.value : fallback

    const xpData = val(xp, null as Awaited<ReturnType<typeof getXpBreakdown>> | null)
    const streakData = val(streak, null as Awaited<ReturnType<typeof getStreakStatus>> | null)
    const next = val(nextSession, null as never)

    return NextResponse.json({
      success: true,
      student: {
        id: ctx.userId,
        name: ctx.name,
        email: ctx.email,
        avatarUrl: ctx.avatarUrl,
        grade: ctx.grade,
        gradeLabel: gradeLabel(ctx.grade),
        grades: ctx.grades,
        courseIds: ctx.courseIds,
        courseNames: ctx.courseNames,
        ncertClass: ctx.ncertClass,
        coachingTier: ctx.coachingTier,
        trialDaysRemaining: ctx.trialDaysRemaining,
      },
      gamification: {
        totalXp: xpData?.total ?? 0,
        currentStreak: streakData?.currentStreak ?? 0,
      },
      actions: {
        dueHomework: val(dueHomework, 0),
        gradedWithFeedback: val(unreadFeedback, 0),
        nextClass: next
          ? {
              id: next.id,
              title: next.title || next.courses?.name || 'Live class',
              at: next.scheduledDate,
              joinUrl: next.meetingLink || null,
            }
          : null,
        resumeTestId: val(cbtInProgress, null as { id: string } | null)?.id || null,
      },
    })
  } catch (error) {
    console.error('[student/summary] failed:', error)
    return NextResponse.json({ error: 'Failed to load summary' }, { status: 500 })
  }
}
