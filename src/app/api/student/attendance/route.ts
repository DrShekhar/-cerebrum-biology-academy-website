/**
 * Student Attendance API
 * GET: Fetch student's attendance records
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
    const status = searchParams.get('status') || 'ALL'
    const sessionType = searchParams.get('sessionType') || 'ALL'
    const dateFrom = searchParams.get('dateFrom')
    const dateTo = searchParams.get('dateTo')
    const courseId = searchParams.get('courseId')

    const where: any = {
      studentId: session.user.id,
    }

    if (status && status !== 'ALL') {
      where.status = status
    }

    if (dateFrom || dateTo) {
      where.session = {
        ...where.session,
        scheduledDate: {
          ...(dateFrom && { gte: new Date(dateFrom) }),
          ...(dateTo && { lte: new Date(dateTo) }),
        },
      }
    }

    if (sessionType && sessionType !== 'ALL') {
      where.session = {
        ...where.session,
        sessionType: sessionType,
      }
    }

    if (courseId) {
      where.session = {
        ...where.session,
        courseId: courseId,
      }
    }

    const attendanceRecords = await prisma.student_attendance.findMany({
      where,
      include: {
        session: {
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
          },
        },
        markedByUser: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        markedAt: 'desc',
      },
    })

    const statistics = {
      totalSessions: attendanceRecords.length,
      present: attendanceRecords.filter((r) => r.status === 'PRESENT').length,
      absent: attendanceRecords.filter((r) => r.status === 'ABSENT').length,
      late: attendanceRecords.filter((r) => r.status === 'LATE').length,
      excused: attendanceRecords.filter((r) => r.status === 'EXCUSED').length,
      attendancePercentage:
        attendanceRecords.length > 0
          ? Math.round(
              (attendanceRecords.filter((r) => r.status === 'PRESENT' || r.status === 'LATE')
                .length /
                attendanceRecords.length) *
                100
            )
          : 0,
    }

    return NextResponse.json({
      success: true,
      data: {
        attendance: attendanceRecords,
        statistics,
      },
    })
  } catch (error) {
    console.error('Error fetching attendance:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch attendance records' },
      { status: 500 }
    )
  }
}
