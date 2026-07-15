/**
 * Teacher Session Detail API
 * GET: Fetch session details
 * PUT: Update session
 * DELETE: Delete/Cancel session
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { parseISTDateTime } from '@/lib/utils/datetime'

const updateSessionSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  sessionType: z
    .enum([
      'REGULAR',
      'DOUBT_CLEARING',
      'REVISION',
      'TEST',
      'PRACTICAL',
      'WORKSHOP',
      'SEMINAR',
      'GUEST_LECTURE',
      'EXTRA_CLASS',
    ])
    .optional(),
  scheduledDate: z.string().optional(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  duration: z.number().optional(),
  meetingLink: z.string().url().optional().nullable(),
  meetingId: z.string().optional().nullable(),
  meetingPassword: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  topic: z.string().optional().nullable(),
  chapter: z.string().optional().nullable(),
  syllabusCovered: z.any().optional(),
  status: z.enum(['SCHEDULED', 'ONGOING', 'COMPLETED', 'CANCELLED', 'RESCHEDULED']).optional(),
  cancelReason: z.string().optional(),
})

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth()

    if (!session || !session.user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    if (session.user.role !== 'TEACHER' && session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Teacher access only' },
        { status: 403 }
      )
    }

    const classSession = await prisma.class_sessions.findUnique({
      where: { id: params.id },
      include: {
        courses: {
          select: {
            id: true,
            name: true,
            type: true,
            class: true,
          },
        },
        users: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        student_attendance: {
          include: {
            users_student_attendance_studentIdTousers: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    })

    if (!classSession) {
      return NextResponse.json({ success: false, error: 'Session not found' }, { status: 404 })
    }

    if (classSession.teacherId !== session.user.id && session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Not your session' },
        { status: 403 }
      )
    }

    const { courses, users, student_attendance, ...sessionRest } = classSession
    const sessionResponse = {
      ...sessionRest,
      course: courses,
      teacher: users,
      attendance: student_attendance.map(
        ({ users_student_attendance_studentIdTousers, ...att }) => ({
          ...att,
          student: users_student_attendance_studentIdTousers,
        })
      ),
    }

    return NextResponse.json({
      success: true,
      data: { session: sessionResponse },
    })
  } catch (error) {
    console.error('Error fetching session:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch session' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth()

    if (!session || !session.user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    if (session.user.role !== 'TEACHER' && session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Teacher access only' },
        { status: 403 }
      )
    }

    const existingSession = await prisma.class_sessions.findUnique({
      where: { id: params.id },
    })

    if (!existingSession) {
      return NextResponse.json({ success: false, error: 'Session not found' }, { status: 404 })
    }

    if (existingSession.teacherId !== session.user.id && session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Not your session' },
        { status: 403 }
      )
    }

    const body = await req.json()
    const validatedData = updateSessionSchema.parse(body)

    const updateData: any = {}

    if (validatedData.title !== undefined) updateData.title = validatedData.title
    if (validatedData.description !== undefined) updateData.description = validatedData.description
    if (validatedData.sessionType !== undefined) updateData.sessionType = validatedData.sessionType
    if (validatedData.scheduledDate !== undefined)
      updateData.scheduledDate = parseISTDateTime(validatedData.scheduledDate)
    if (validatedData.startTime !== undefined) {
      updateData.startTime = parseISTDateTime(validatedData.startTime)
    }
    if (validatedData.endTime !== undefined)
      updateData.endTime = parseISTDateTime(validatedData.endTime)
    if (validatedData.duration !== undefined) updateData.duration = validatedData.duration
    if (validatedData.meetingLink !== undefined) updateData.meetingLink = validatedData.meetingLink
    if (validatedData.meetingId !== undefined) updateData.meetingId = validatedData.meetingId
    if (validatedData.meetingPassword !== undefined)
      updateData.meetingPassword = validatedData.meetingPassword
    if (validatedData.location !== undefined) updateData.location = validatedData.location
    if (validatedData.topic !== undefined) updateData.topic = validatedData.topic
    if (validatedData.chapter !== undefined) updateData.chapter = validatedData.chapter
    if (validatedData.syllabusCovered !== undefined)
      updateData.syllabusCovered = validatedData.syllabusCovered
    if (validatedData.status !== undefined) updateData.status = validatedData.status
    if (validatedData.cancelReason !== undefined)
      updateData.cancelReason = validatedData.cancelReason

    if (validatedData.status === 'CANCELLED') {
      updateData.cancelledAt = new Date()
    }

    const updatedSession = await prisma.class_sessions.update({
      where: { id: params.id },
      data: updateData,
      include: {
        courses: {
          select: {
            id: true,
            name: true,
            type: true,
            class: true,
          },
        },
      },
    })

    // Moving the class re-opens its reminder schedule against the new time —
    // clear the sent-reminder ledger so the class-reminders cron re-notifies.
    // Best-effort (table may not exist yet pre-migration); never fail the update.
    if (validatedData.startTime !== undefined) {
      await prisma.class_reminder_log
        .deleteMany({ where: { sessionId: params.id } })
        .catch(() => {})
    }

    const { courses: updatedCourses, ...updatedSessionRest } = updatedSession
    const updatedSessionResponse = { ...updatedSessionRest, course: updatedCourses }

    return NextResponse.json({
      success: true,
      message: 'Session updated successfully',
      data: { session: updatedSessionResponse },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: error.issues },
        { status: 400 }
      )
    }

    console.error('Error updating session:', error)
    return NextResponse.json({ success: false, error: 'Failed to update session' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth()

    if (!session || !session.user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    if (session.user.role !== 'TEACHER' && session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Teacher access only' },
        { status: 403 }
      )
    }

    const existingSession = await prisma.class_sessions.findUnique({
      where: { id: params.id },
      include: {
        student_attendance: true,
      },
    })

    if (!existingSession) {
      return NextResponse.json({ success: false, error: 'Session not found' }, { status: 404 })
    }

    if (existingSession.teacherId !== session.user.id && session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Not your session' },
        { status: 403 }
      )
    }

    if (existingSession.student_attendance.length > 0) {
      await prisma.class_sessions.update({
        where: { id: params.id },
        data: {
          status: 'CANCELLED',
          cancelledAt: new Date(),
          cancelReason: 'Cancelled by teacher',
        },
      })

      return NextResponse.json({
        success: true,
        message: 'Session cancelled (has attendance records)',
      })
    } else {
      await prisma.class_sessions.delete({
        where: { id: params.id },
      })

      return NextResponse.json({
        success: true,
        message: 'Session deleted successfully',
      })
    }
  } catch (error) {
    console.error('Error deleting session:', error)
    return NextResponse.json({ success: false, error: 'Failed to delete session' }, { status: 500 })
  }
}
