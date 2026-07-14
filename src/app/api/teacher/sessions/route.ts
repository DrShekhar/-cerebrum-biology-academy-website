/**
 * Teacher Sessions API
 * GET: Fetch teacher's class sessions
 * POST: Create a new class session
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { parseISTDateTime, wallTimeOf } from '@/lib/utils/datetime'

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

    if (session.user.role !== 'TEACHER' && session.user.role !== 'ADMIN') {
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

    // ADMIN oversees every teacher's sessions; a TEACHER sees only their own.
    const where: any = session.user.role === 'ADMIN' ? {} : { teacherId: session.user.id }

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
        courses: {
          select: {
            id: true,
            name: true,
            type: true,
            class: true,
          },
        },
        student_attendance: {
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

    // Recording pipeline status for linked sessions (Zoom -> Cloudflare).
    const linkedLectureIds = sessions
      .map((s) => s.videoLectureId)
      .filter((id): id is string => !!id)
    const lectures = linkedLectureIds.length
      ? await prisma.video_lectures.findMany({
          where: { id: { in: linkedLectureIds } },
          select: { id: true, uploadStatus: true },
        })
      : []
    const lectureStatusById = new Map(lectures.map((l) => [l.id, l.uploadStatus]))

    const getRecording = (s: (typeof sessions)[number]) => {
      if (s.videoLectureId) {
        const uploadStatus = lectureStatusById.get(s.videoLectureId)
        if (uploadStatus === 'READY') {
          return { state: 'READY' as const, url: `/learn/${s.videoLectureId}` }
        }
        if (uploadStatus === 'FAILED') {
          return { state: 'FAILED' as const, url: null }
        }
        return { state: 'PROCESSING' as const, url: null }
      }
      if (s.recordingUrl) {
        // Raw Zoom fallback URL written by the pipeline's fail-soft path,
        // or a manually pasted link.
        return { state: 'RAW' as const, url: s.recordingUrl }
      }
      return { state: 'NONE' as const, url: null }
    }

    const sessionsResponse = sessions.map((s) => {
      const { courses, student_attendance, ...rest } = s
      return {
        ...rest,
        course: courses,
        attendance: student_attendance,
        recording: getRecording(s),
      }
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
        sessions: sessionsResponse,
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

    if (session.user.role !== 'TEACHER' && session.user.role !== 'ADMIN') {
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
          id: `sess_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
          updatedAt: new Date(),
          courseId: validatedData.courseId,
          enrollmentId: validatedData.enrollmentId,
          title: validatedData.title,
          description: validatedData.description,
          sessionType: validatedData.sessionType,
          scheduledDate: parseISTDateTime(validatedData.scheduledDate),
          startTime: parseISTDateTime(validatedData.startTime),
          endTime: parseISTDateTime(validatedData.endTime),
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

      const { courses: newCourses, ...newSessionRest } = newSession
      const newSessionResponse = { ...newSessionRest, course: newCourses }

      return NextResponse.json({
        success: true,
        message: 'Session created successfully',
        data: { session: newSessionResponse },
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

  // Work entirely in IST wall-clock terms. The naive datetime-local inputs are
  // IST; iterating with plain new Date()/getHours()/setHours() would run in the
  // server's timezone (UTC on Vercel) and shift every occurrence by +5:30.
  const startYmd = String(data.scheduledDate).slice(0, 10) // "YYYY-MM-DD"
  const endYmd = String(recurringPattern.endDate).slice(0, 10)
  const startHHmm = wallTimeOf(data.startTime) || '00:00'
  const endHHmm = wallTimeOf(data.endTime) || '00:00'
  const startDayOfMonth = parseInt(startYmd.slice(8, 10), 10)

  // Iterate calendar dates in UTC so day boundaries/weekday are stable regardless
  // of the server timezone (each date is anchored at UTC-midnight).
  const cursor = new Date(`${startYmd}T00:00:00Z`)
  const end = new Date(`${endYmd}T00:00:00Z`)

  while (cursor <= end) {
    const ymd = cursor.toISOString().slice(0, 10)
    const dayOfWeek = cursor.getUTCDay()
    const dayOfMonth = cursor.getUTCDate()
    let shouldCreate = false

    if (recurringPattern.frequency === 'DAILY') {
      shouldCreate = true
    } else if (
      recurringPattern.frequency === 'WEEKLY' &&
      recurringPattern.daysOfWeek?.includes(dayOfWeek)
    ) {
      shouldCreate = true
    } else if (recurringPattern.frequency === 'MONTHLY' && dayOfMonth === startDayOfMonth) {
      shouldCreate = true
    }

    if (shouldCreate) {
      const sessionStartTime = parseISTDateTime(`${ymd}T${startHHmm}`)
      const sessionEndTime = parseISTDateTime(`${ymd}T${endHHmm}`)

      sessions.push({
        // class_sessions.id has no DB default and updatedAt has no @updatedAt —
        // both must be supplied (the single-session path does the same), else
        // every recurring create() is rejected.
        id: `sess_${Date.now()}_${sessions.length}_${Math.random().toString(36).slice(2, 9)}`,
        updatedAt: new Date(),
        courseId: data.courseId,
        enrollmentId: data.enrollmentId,
        title: data.title,
        description: data.description,
        sessionType: data.sessionType,
        scheduledDate: parseISTDateTime(ymd),
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

    // Advance the UTC-anchored cursor. Using setUTC* keeps the iteration in the
    // same timezone frame the weekday/day-of-month checks above rely on.
    if (recurringPattern.frequency === 'DAILY') {
      cursor.setUTCDate(cursor.getUTCDate() + recurringPattern.interval)
    } else if (recurringPattern.frequency === 'WEEKLY') {
      cursor.setUTCDate(cursor.getUTCDate() + 7 * recurringPattern.interval)
    } else if (recurringPattern.frequency === 'MONTHLY') {
      cursor.setUTCMonth(cursor.getUTCMonth() + recurringPattern.interval)
    }
  }

  return sessions
}
