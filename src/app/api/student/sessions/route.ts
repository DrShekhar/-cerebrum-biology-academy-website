/**
 * Student Class Sessions API
 * GET: Fetch upcoming and past class sessions
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const session = await auth()

    if (!session || !session.user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    if (session.user.role !== 'student') {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Student access only' },
        { status: 403 }
      )
    }

    const { searchParams } = new URL(req.url)
    const type = searchParams.get('type') || 'upcoming'
    const courseId = searchParams.get('courseId')

    const enrollments = await prisma.enrollments.findMany({
      where: {
        userId: session.user.id,
        status: 'ACTIVE',
      },
      select: {
        id: true,
        courseId: true,
      },
    })

    if (enrollments.length === 0) {
      return NextResponse.json({
        success: true,
        data: {
          sessions: [],
          upcoming: [],
          today: [],
        },
      })
    }

    const enrollmentIds = enrollments.map((e) => e.id)
    const courseIds = enrollments.map((e) => e.courseId)

    const where: any = {
      OR: [
        { enrollmentId: { in: enrollmentIds } },
        { courseId: { in: courseIds }, enrollmentId: null },
      ],
    }

    if (courseId) {
      where.courseId = courseId
    }

    const now = new Date()
    const startOfToday = new Date(now)
    startOfToday.setHours(0, 0, 0, 0)
    const endOfToday = new Date(now)
    endOfToday.setHours(23, 59, 59, 999)

    if (type === 'upcoming') {
      where.startTime = { gte: now }
      where.status = { in: ['SCHEDULED', 'ONGOING'] }
    } else if (type === 'past') {
      where.startTime = { lt: now }
      where.status = { in: ['COMPLETED', 'CANCELLED'] }
    } else if (type === 'today') {
      where.startTime = { gte: startOfToday, lte: endOfToday }
    }

    const sessions = await prisma.class_sessions.findMany({
      where,
      include: {
        course: {
          select: {
            id: true,
            name: true,
            type: true,
            class: true,
          },
        },
        teacher: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        attendance: {
          where: {
            studentId: session.user.id,
          },
          select: {
            id: true,
            status: true,
            checkInTime: true,
            isLate: true,
            participationScore: true,
          },
        },
      },
      orderBy: {
        startTime: type === 'past' ? 'desc' : 'asc',
      },
      take: type === 'today' ? undefined : 20,
    })

    const upcomingSessions = sessions.filter(
      (s) => new Date(s.startTime) > now && (s.status === 'SCHEDULED' || s.status === 'ONGOING')
    )

    const todaySessions = sessions.filter((s) => {
      const sessionDate = new Date(s.startTime)
      return sessionDate >= startOfToday && sessionDate <= endOfToday
    })

    return NextResponse.json({
      success: true,
      data: {
        sessions,
        upcoming: upcomingSessions.slice(0, 5),
        today: todaySessions,
      },
    })
  } catch (error) {
    console.error('Error fetching sessions:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch sessions' }, { status: 500 })
  }
}
