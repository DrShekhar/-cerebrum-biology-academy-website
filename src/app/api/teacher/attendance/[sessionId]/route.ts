/**
 * Teacher Attendance Marking API
 * GET: Fetch attendance records for a session
 * POST: Mark attendance for multiple students
 * PUT: Update individual attendance record
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const markAttendanceSchema = z.object({
  studentId: z.string(),
  status: z.enum(['PRESENT', 'ABSENT', 'LATE', 'EXCUSED', 'HALF_DAY']),
  checkInTime: z.string().optional(),
  notes: z.string().optional(),
  participationScore: z.number().min(0).max(10).optional(),
})

const bulkMarkSchema = z.object({
  records: z.array(markAttendanceSchema),
})

export async function GET(req: NextRequest, { params }: { params: { sessionId: string } }) {
  try {
    const session = await auth()

    if (!session || !session.user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    if (session.user.role !== 'TEACHER') {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Teacher access only' },
        { status: 403 }
      )
    }

    const classSession = await prisma.class_sessions.findUnique({
      where: { id: params.sessionId },
      include: {
        course: {
          select: {
            id: true,
            name: true,
            class: true,
          },
        },
        attendance: {
          include: {
            student: {
              select: {
                id: true,
                name: true,
                email: true,
                phone: true,
              },
            },
          },
        },
      },
    })

    if (!classSession) {
      return NextResponse.json({ success: false, error: 'Session not found' }, { status: 404 })
    }

    if (classSession.teacherId !== session.user.id) {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Not your session' },
        { status: 403 }
      )
    }

    const enrolledStudents = await prisma.enrollments.findMany({
      where: {
        courseId: classSession.courseId,
        status: 'ACTIVE',
      },
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
      },
    })

    const studentsWithAttendance = enrolledStudents.map((enrollment) => {
      const attendanceRecord = classSession.attendance.find(
        (a) => a.studentId === enrollment.studentId
      )

      return {
        ...enrollment.student,
        enrollmentId: enrollment.id,
        attendance: attendanceRecord || null,
      }
    })

    return NextResponse.json({
      success: true,
      data: {
        session: classSession,
        students: studentsWithAttendance,
        statistics: {
          totalStudents: studentsWithAttendance.length,
          marked: classSession.attendance.length,
          unmarked: studentsWithAttendance.length - classSession.attendance.length,
          present: classSession.attendance.filter((a) => a.status === 'PRESENT').length,
          absent: classSession.attendance.filter((a) => a.status === 'ABSENT').length,
          late: classSession.attendance.filter((a) => a.status === 'LATE').length,
          excused: classSession.attendance.filter((a) => a.status === 'EXCUSED').length,
        },
      },
    })
  } catch (error) {
    console.error('Error fetching attendance:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch attendance' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest, { params }: { params: { sessionId: string } }) {
  try {
    const session = await auth()

    if (!session || !session.user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    if (session.user.role !== 'TEACHER') {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Teacher access only' },
        { status: 403 }
      )
    }

    const classSession = await prisma.class_sessions.findUnique({
      where: { id: params.sessionId },
    })

    if (!classSession) {
      return NextResponse.json({ success: false, error: 'Session not found' }, { status: 404 })
    }

    if (classSession.teacherId !== session.user.id) {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Not your session' },
        { status: 403 }
      )
    }

    const body = await req.json()
    const validatedData = bulkMarkSchema.parse(body)

    const attendanceRecords = await prisma.$transaction(
      validatedData.records.map((record) =>
        prisma.student_attendance.upsert({
          where: {
            sessionId_studentId: {
              sessionId: params.sessionId,
              studentId: record.studentId,
            },
          },
          create: {
            sessionId: params.sessionId,
            studentId: record.studentId,
            status: record.status,
            markedBy: session.user.id,
            checkInTime: record.checkInTime ? new Date(record.checkInTime) : null,
            isLate: record.status === 'LATE',
            notes: record.notes,
            participationScore: record.participationScore,
          },
          update: {
            status: record.status,
            markedBy: session.user.id,
            markedAt: new Date(),
            checkInTime: record.checkInTime ? new Date(record.checkInTime) : undefined,
            isLate: record.status === 'LATE',
            notes: record.notes,
            participationScore: record.participationScore,
          },
        })
      )
    )

    const presentCount = attendanceRecords.filter(
      (r) => r.status === 'PRESENT' || r.status === 'LATE' || r.status === 'HALF_DAY'
    ).length

    await prisma.class_sessions.update({
      where: { id: params.sessionId },
      data: {
        attendanceMarked: true,
        presentCount: presentCount,
        totalStudents: validatedData.records.length,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Attendance marked successfully',
      data: { records: attendanceRecords },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: error.issues },
        { status: 400 }
      )
    }

    console.error('Error marking attendance:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to mark attendance' },
      { status: 500 }
    )
  }
}

export async function PUT(req: NextRequest, { params }: { params: { sessionId: string } }) {
  try {
    const session = await auth()

    if (!session || !session.user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    if (session.user.role !== 'TEACHER') {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Teacher access only' },
        { status: 403 }
      )
    }

    const classSession = await prisma.class_sessions.findUnique({
      where: { id: params.sessionId },
    })

    if (!classSession) {
      return NextResponse.json({ success: false, error: 'Session not found' }, { status: 404 })
    }

    if (classSession.teacherId !== session.user.id) {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Not your session' },
        { status: 403 }
      )
    }

    const body = await req.json()
    const { attendanceId, ...updateData } = body

    if (!attendanceId) {
      return NextResponse.json({ success: false, error: 'Attendance ID required' }, { status: 400 })
    }

    const updatedRecord = await prisma.student_attendance.update({
      where: { id: attendanceId },
      data: {
        ...updateData,
        markedBy: session.user.id,
        markedAt: new Date(),
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Attendance updated successfully',
      data: { record: updatedRecord },
    })
  } catch (error) {
    console.error('Error updating attendance:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update attendance' },
      { status: 500 }
    )
  }
}
