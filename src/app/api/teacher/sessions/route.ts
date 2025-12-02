/**
 * Teacher Sessions API
 * GET: Fetch teacher's class sessions
 * POST: Create a new class session
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const createSessionSchema = z.object({
  courseId: z.string(),
  enrollmentId: z.string().optional(),
  title: z.string().min(1),
  description: z.string().optional(),
  sessionType: z.enum([
    'REGULAR',
    'DOUBT_CLEARING',
    'REVISION',
    'TEST',
    'PRACTICAL',
    'WORKSHOP',
    'SEMINAR',
    'GUEST_LECTURE',
    'EXTRA_CLASS',
  ]),
  scheduledDate: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  duration: z.number(),
  meetingLink: z.string().url().optional(),
  meetingId: z.string().optional(),
  meetingPassword: z.string().optional(),
  location: z.string().optional(),
  topic: z.string().optional(),
  chapter: z.string().optional(),
  syllabusCovered: z.any().optional(),
  isRecurring: z.boolean().optional(),
  recurringPattern: z
    .object({
      frequency: z.enum(['DAILY', 'WEEKLY', 'MONTHLY']),
      interval: z.number(),
      endDate: z.string(),
      daysOfWeek: z.array(z.number()).optional(),
    })
    .optional(),
})

export async function GET(req: NextRequest) {
  try {
    const session = await auth()

    if (!session || !session.user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    if (session.user.role !== 'teacher') {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Teacher access only' },
        { status: 403 }
      )
    }

    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status') || 'ALL'
    const courseId = searchParams.get('courseId')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    const where: any = {
      teacherId: session.user.id,
    }

    if (status && status !== 'ALL') {
      where.status = status
    }

    if (courseId) {
      where.courseId = courseId
    }

    if (startDate || endDate) {
      where.scheduledDate = {
        ...(startDate && { gte: new Date(startDate) }),
        ...(endDate && { lte: new Date(endDate) }),
      }
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
        attendance: {
          select: {
            id: true,
            status: true,
            studentId: true,
          },
        },
      },
      orderBy: {
        startTime: 'asc',
      },
    })

    const statistics = {
      total: sessions.length,
      scheduled: sessions.filter((s) => s.status === 'SCHEDULED').length,
      ongoing: sessions.filter((s) => s.status === 'ONGOING').length,
      completed: sessions.filter((s) => s.status === 'COMPLETED').length,
      cancelled: sessions.filter((s) => s.status === 'CANCELLED').length,
    }

    return NextResponse.json({
      success: true,
      data: {
        sessions,
        statistics,
      },
    })
  } catch (error) {
    console.error('Error fetching sessions:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch sessions' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth()

    if (!session || !session.user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    if (session.user.role !== 'teacher') {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Teacher access only' },
        { status: 403 }
      )
    }

    const body = await req.json()
    const validatedData = createSessionSchema.parse(body)

    const course = await prisma.courses.findUnique({
      where: { id: validatedData.courseId },
    })

    if (!course) {
      return NextResponse.json({ success: false, error: 'Course not found' }, { status: 404 })
    }

    if (validatedData.isRecurring && validatedData.recurringPattern) {
      const sessionsToCreate = generateRecurringSessions(validatedData, session.user.id)

      const createdSessions = await prisma.$transaction(
        sessionsToCreate.map((sessionData) => prisma.class_sessions.create({ data: sessionData }))
      )

      return NextResponse.json({
        success: true,
        message: `${createdSessions.length} recurring sessions created successfully`,
        data: { sessions: createdSessions },
      })
    } else {
      const newSession = await prisma.class_sessions.create({
        data: {
          courseId: validatedData.courseId,
          enrollmentId: validatedData.enrollmentId,
          title: validatedData.title,
          description: validatedData.description,
          sessionType: validatedData.sessionType,
          scheduledDate: new Date(validatedData.scheduledDate),
          startTime: new Date(validatedData.startTime),
          endTime: new Date(validatedData.endTime),
          duration: validatedData.duration,
          teacherId: session.user.id,
          meetingLink: validatedData.meetingLink,
          meetingId: validatedData.meetingId,
          meetingPassword: validatedData.meetingPassword,
          location: validatedData.location,
          topic: validatedData.topic,
          chapter: validatedData.chapter,
          syllabusCovered: validatedData.syllabusCovered,
          status: 'SCHEDULED',
        },
        include: {
          course: {
            select: {
              id: true,
              name: true,
              type: true,
              class: true,
            },
          },
        },
      })

      return NextResponse.json({
        success: true,
        message: 'Session created successfully',
        data: { session: newSession },
      })
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: error.issues },
        { status: 400 }
      )
    }

    console.error('Error creating session:', error)
    return NextResponse.json({ success: false, error: 'Failed to create session' }, { status: 500 })
  }
}

function generateRecurringSessions(data: any, teacherId: string) {
  const sessions = []
  const { recurringPattern } = data
  const startDate = new Date(data.scheduledDate)
  const endDate = new Date(recurringPattern.endDate)
  const startTime = new Date(data.startTime)
  const endTime = new Date(data.endTime)

  const currentDate = new Date(startDate)

  while (currentDate <= endDate) {
    let shouldCreate = false

    if (recurringPattern.frequency === 'DAILY') {
      shouldCreate = true
    } else if (
      recurringPattern.frequency === 'WEEKLY' &&
      recurringPattern.daysOfWeek?.includes(currentDate.getDay())
    ) {
      shouldCreate = true
    } else if (
      recurringPattern.frequency === 'MONTHLY' &&
      currentDate.getDate() === startDate.getDate()
    ) {
      shouldCreate = true
    }

    if (shouldCreate) {
      const sessionStartTime = new Date(currentDate)
      sessionStartTime.setHours(startTime.getHours(), startTime.getMinutes(), 0, 0)

      const sessionEndTime = new Date(currentDate)
      sessionEndTime.setHours(endTime.getHours(), endTime.getMinutes(), 0, 0)

      sessions.push({
        courseId: data.courseId,
        enrollmentId: data.enrollmentId,
        title: data.title,
        description: data.description,
        sessionType: data.sessionType,
        scheduledDate: new Date(currentDate),
        startTime: sessionStartTime,
        endTime: sessionEndTime,
        duration: data.duration,
        teacherId: teacherId,
        meetingLink: data.meetingLink,
        meetingId: data.meetingId,
        meetingPassword: data.meetingPassword,
        location: data.location,
        topic: data.topic,
        chapter: data.chapter,
        syllabusCovered: data.syllabusCovered,
        status: 'SCHEDULED',
      })
    }

    if (recurringPattern.frequency === 'DAILY') {
      currentDate.setDate(currentDate.getDate() + recurringPattern.interval)
    } else if (recurringPattern.frequency === 'WEEKLY') {
      currentDate.setDate(currentDate.getDate() + 7 * recurringPattern.interval)
    } else if (recurringPattern.frequency === 'MONTHLY') {
      currentDate.setMonth(currentDate.getMonth() + recurringPattern.interval)
    }
  }

  return sessions
}
