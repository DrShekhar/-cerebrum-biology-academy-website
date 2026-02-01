/**
 * Student Self Check-In/Check-Out API
 * POST: Check in or check out from an active session
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const session = await auth()

    if (!session || !session.user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    if (session.user.role !== 'STUDENT') {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Student access only' },
        { status: 403 }
      )
    }

    const body = await req.json()
    const { sessionId, action, deviceInfo, location } = body

    if (!sessionId || !action) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: sessionId and action' },
        { status: 400 }
      )
    }

    if (!['check-in', 'check-out'].includes(action)) {
      return NextResponse.json(
        { success: false, error: 'Invalid action. Must be "check-in" or "check-out"' },
        { status: 400 }
      )
    }

    const studentId = session.user.id
    const now = new Date()

    const classSession = await prisma.class_sessions.findUnique({
      where: { id: sessionId },
      include: {
        course: {
          select: {
            id: true,
            name: true,
            attendance_settings: true,
          },
        },
      },
    })

    if (!classSession) {
      return NextResponse.json({ success: false, error: 'Session not found' }, { status: 404 })
    }

    const attendanceSettings = classSession.course?.attendance_settings
    if (attendanceSettings && !attendanceSettings.allowSelfCheckIn) {
      return NextResponse.json(
        { success: false, error: 'Self check-in is not enabled for this course' },
        { status: 403 }
      )
    }

    const sessionStart = new Date(classSession.startTime)
    const sessionEnd = new Date(classSession.endTime)

    if (classSession.status !== 'ONGOING' && classSession.status !== 'SCHEDULED') {
      return NextResponse.json(
        { success: false, error: 'Session is not available for check-in' },
        { status: 400 }
      )
    }

    const existingAttendance = await prisma.student_attendance.findUnique({
      where: {
        sessionId_studentId: {
          sessionId,
          studentId,
        },
      },
    })

    if (action === 'check-in') {
      if (existingAttendance?.checkInTime) {
        return NextResponse.json(
          { success: false, error: 'Already checked in for this session' },
          { status: 400 }
        )
      }

      const lateThreshold = attendanceSettings?.lateThresholdMinutes || 10
      const lateBy = Math.max(0, Math.floor((now.getTime() - sessionStart.getTime()) / 60000))
      const isLate = lateBy > lateThreshold

      const attendanceData = {
        status: isLate ? ('LATE' as const) : ('PRESENT' as const),
        checkInTime: now,
        isLate,
        lateBy: isLate ? lateBy : null,
        deviceInfo: deviceInfo || null,
        location: location ? JSON.stringify(location) : null,
        markedAt: now,
        markedBy: studentId,
        metadata: {
          selfCheckIn: true,
          checkInMethod: 'manual',
          userAgent: req.headers.get('user-agent') || null,
        },
      }

      let attendance
      if (existingAttendance) {
        attendance = await prisma.student_attendance.update({
          where: { id: existingAttendance.id },
          data: attendanceData,
          include: {
            session: {
              select: {
                id: true,
                title: true,
                startTime: true,
                endTime: true,
              },
            },
          },
        })
      } else {
        const enrollment = await prisma.enrollments.findFirst({
          where: {
            userId: studentId,
            courseId: classSession.courseId,
            status: 'active',
          },
        })

        attendance = await prisma.student_attendance.create({
          data: {
            sessionId,
            studentId,
            enrollmentId: enrollment?.id || null,
            ...attendanceData,
          },
          include: {
            session: {
              select: {
                id: true,
                title: true,
                startTime: true,
                endTime: true,
              },
            },
          },
        })
      }

      await prisma.class_sessions.update({
        where: { id: sessionId },
        data: {
          presentCount: {
            increment: 1,
          },
        },
      })

      return NextResponse.json({
        success: true,
        message: isLate ? `Checked in (${lateBy} minutes late)` : 'Successfully checked in',
        data: {
          id: attendance.id,
          checkInTime: attendance.checkInTime,
          isLate: attendance.isLate,
          lateBy: attendance.lateBy,
          status: attendance.status,
          session: attendance.session,
        },
      })
    }

    if (action === 'check-out') {
      if (!existingAttendance) {
        return NextResponse.json(
          { success: false, error: 'No attendance record found. Please check in first.' },
          { status: 400 }
        )
      }

      if (!existingAttendance.checkInTime) {
        return NextResponse.json(
          { success: false, error: 'You must check in before checking out' },
          { status: 400 }
        )
      }

      if (existingAttendance.checkOutTime) {
        return NextResponse.json(
          { success: false, error: 'Already checked out from this session' },
          { status: 400 }
        )
      }

      const checkInTime = new Date(existingAttendance.checkInTime)
      const duration = Math.floor((now.getTime() - checkInTime.getTime()) / 60000)

      const attendance = await prisma.student_attendance.update({
        where: { id: existingAttendance.id },
        data: {
          checkOutTime: now,
          duration,
          metadata: {
            ...((existingAttendance.metadata as object) || {}),
            checkOutMethod: 'manual',
            checkOutUserAgent: req.headers.get('user-agent') || null,
          },
        },
        include: {
          session: {
            select: {
              id: true,
              title: true,
              startTime: true,
              endTime: true,
            },
          },
        },
      })

      return NextResponse.json({
        success: true,
        message: `Successfully checked out. Duration: ${duration} minutes`,
        data: {
          id: attendance.id,
          checkInTime: attendance.checkInTime,
          checkOutTime: attendance.checkOutTime,
          duration: attendance.duration,
          status: attendance.status,
          session: attendance.session,
        },
      })
    }

    return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Self check-in error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process check-in/check-out',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await auth()

    if (!session || !session.user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    if (session.user.role !== 'STUDENT') {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Student access only' },
        { status: 403 }
      )
    }

    const studentId = session.user.id
    const now = new Date()

    const ongoingSessions = await prisma.class_sessions.findMany({
      where: {
        status: {
          in: ['ONGOING', 'SCHEDULED'],
        },
        startTime: {
          lte: new Date(now.getTime() + 30 * 60 * 1000),
        },
        endTime: {
          gte: now,
        },
        course: {
          enrollments: {
            some: {
              userId: studentId,
              status: 'active',
            },
          },
        },
      },
      include: {
        course: {
          select: {
            id: true,
            name: true,
            attendance_settings: {
              select: {
                allowSelfCheckIn: true,
                lateThresholdMinutes: true,
              },
            },
          },
        },
        teacher: {
          select: {
            id: true,
            name: true,
          },
        },
        attendance: {
          where: {
            studentId,
          },
          select: {
            id: true,
            status: true,
            checkInTime: true,
            checkOutTime: true,
            isLate: true,
            lateBy: true,
          },
        },
      },
      orderBy: {
        startTime: 'asc',
      },
    })

    const sessionsWithCheckInStatus = ongoingSessions.map((s) => {
      const studentAttendance = s.attendance[0]
      const allowSelfCheckIn = s.course?.attendance_settings?.allowSelfCheckIn ?? true

      return {
        id: s.id,
        title: s.title,
        description: s.description,
        sessionType: s.sessionType,
        startTime: s.startTime,
        endTime: s.endTime,
        status: s.status,
        course: s.course,
        teacher: s.teacher,
        allowSelfCheckIn,
        attendance: studentAttendance
          ? {
              id: studentAttendance.id,
              status: studentAttendance.status,
              checkInTime: studentAttendance.checkInTime,
              checkOutTime: studentAttendance.checkOutTime,
              isLate: studentAttendance.isLate,
              lateBy: studentAttendance.lateBy,
              canCheckIn: !studentAttendance.checkInTime && allowSelfCheckIn,
              canCheckOut:
                !!studentAttendance.checkInTime &&
                !studentAttendance.checkOutTime &&
                allowSelfCheckIn,
            }
          : {
              canCheckIn: allowSelfCheckIn,
              canCheckOut: false,
            },
      }
    })

    return NextResponse.json({
      success: true,
      data: {
        sessions: sessionsWithCheckInStatus,
        count: sessionsWithCheckInStatus.length,
      },
    })
  } catch (error) {
    console.error('Error fetching active sessions:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch active sessions' },
      { status: 500 }
    )
  }
}
