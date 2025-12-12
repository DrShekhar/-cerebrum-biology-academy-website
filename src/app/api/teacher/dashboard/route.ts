/**
 * Teacher Dashboard API
 *
 * GET /api/teacher/dashboard - Get teacher dashboard data including stats, activities, and schedule
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session || session.user.role !== 'teacher') {
      return NextResponse.json({ error: 'Unauthorized. Teacher access required.' }, { status: 401 })
    }

    const teacherId = session.user.id

    // Get current date for filtering
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    const weekAgo = new Date(today)
    weekAgo.setDate(weekAgo.getDate() - 7)

    // Fetch all data in parallel for better performance
    const [
      totalAssignments,
      pendingSubmissions,
      studentDoubts,
      activeStudents,
      recentSubmissions,
      recentDoubts,
      upcomingSessions,
      gradedSubmissions,
    ] = await Promise.all([
      // Total assignments created by teacher
      prisma.assignment.count({
        where: { teacherId },
      }),

      // Pending submissions (submitted but not graded)
      prisma.assignmentSubmission.count({
        where: {
          assignment: { teacherId },
          status: 'SUBMITTED',
        },
      }),

      // Unanswered doubts for teacher's courses
      prisma.doubt.count({
        where: {
          OR: [{ assignedTeacherId: teacherId }, { status: 'PENDING' }],
          answeredAt: null,
        },
      }),

      // Count of unique students in teacher's courses
      prisma.enrollment.count({
        where: {
          course: {
            teachers: {
              some: { id: teacherId },
            },
          },
          status: 'ACTIVE',
        },
      }),

      // Recent submissions (last 7 days)
      prisma.assignmentSubmission.findMany({
        where: {
          assignment: { teacherId },
          submittedAt: { gte: weekAgo },
        },
        include: {
          student: { select: { name: true } },
          assignment: { select: { title: true } },
        },
        orderBy: { submittedAt: 'desc' },
        take: 5,
      }),

      // Recent doubts
      prisma.doubt.findMany({
        where: {
          OR: [{ assignedTeacherId: teacherId }, { status: 'PENDING' }],
        },
        include: {
          student: { select: { name: true } },
        },
        orderBy: { createdAt: 'desc' },
        take: 5,
      }),

      // Today's sessions
      prisma.session.findMany({
        where: {
          teacherId,
          scheduledAt: {
            gte: today,
            lt: tomorrow,
          },
        },
        include: {
          course: { select: { name: true } },
          batch: { select: { name: true, _count: { select: { students: true } } } },
        },
        orderBy: { scheduledAt: 'asc' },
        take: 5,
      }),

      // Calculate average score from graded submissions
      prisma.assignmentSubmission.aggregate({
        where: {
          assignment: { teacherId },
          grade: { not: null },
        },
        _avg: { grade: true },
      }),
    ])

    // Format recent activities
    const recentActivities = [
      ...recentSubmissions.map((sub) => ({
        id: sub.id,
        type: 'submission' as const,
        title: `New submission for "${sub.assignment.title}"`,
        studentName: sub.student.name,
        timestamp: sub.submittedAt?.toISOString() || new Date().toISOString(),
      })),
      ...recentDoubts.map((doubt) => ({
        id: doubt.id,
        type: 'doubt' as const,
        title: doubt.question.substring(0, 50) + (doubt.question.length > 50 ? '...' : ''),
        studentName: doubt.student?.name || 'Anonymous',
        timestamp: doubt.createdAt.toISOString(),
      })),
    ]
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 10)

    // Format upcoming classes
    const upcomingClasses = upcomingSessions.map((session) => ({
      id: session.id,
      title: session.title || session.course.name,
      batch: session.batch?.name || 'All Students',
      time: new Date(session.scheduledAt).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      studentsCount: session.batch?._count?.students || 0,
    }))

    // Calculate stats
    const stats = {
      totalAssignments,
      pendingSubmissions,
      upcomingClasses: upcomingSessions.length,
      studentDoubts,
      averageScore: Math.round(gradedSubmissions._avg.grade || 0),
      activeStudents,
    }

    return NextResponse.json({
      success: true,
      stats,
      recentActivities,
      upcomingClasses,
    })
  } catch (error) {
    console.error('Error fetching teacher dashboard:', error)
    return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 })
  }
}
