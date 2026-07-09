import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export const dynamic = 'force-dynamic'

/**
 * Teacher/admin mentor-slot management.
 *
 * GET  — list the caller's own recurring slots (ADMIN sees all).
 * POST — create a recurring weekly slot; teacherId/teacherName come from session.
 */

const slotSchema = z.object({
  dayOfWeek: z.number().int().min(0).max(6),
  startTime: z.string().regex(/^\d{2}:\d{2}$/, 'startTime must be HH:MM'),
  durationMins: z.number().int().min(10).max(180).default(30),
  capacity: z.number().int().min(1).max(50).default(1),
  mode: z.enum(['online', 'offline']).default('online'),
  meetingUrl: z.string().url().optional().nullable().or(z.literal('')),
  topic: z.string().max(120).optional().nullable(),
  courseId: z.string().optional().nullable(),
  isActive: z.boolean().default(true),
})

async function requireTeacherSession() {
  const session = await auth()
  const role = (session?.user?.role || '').toUpperCase()
  if (!session?.user || (role !== 'TEACHER' && role !== 'ADMIN')) {
    return { error: NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 }) }
  }
  return { session, role }
}

export async function GET() {
  const gate = await requireTeacherSession()
  if ('error' in gate) return gate.error

  // Admins manage the full roster; teachers see only their own slots.
  const where = gate.role === 'ADMIN' ? {} : { teacherId: gate.session.user.id }
  const slots = await prisma.mentor_slots.findMany({
    where,
    orderBy: [{ dayOfWeek: 'asc' }, { startTime: 'asc' }],
  })
  return NextResponse.json({ success: true, data: { slots } })
}

export async function POST(request: NextRequest) {
  const gate = await requireTeacherSession()
  if ('error' in gate) return gate.error

  try {
    const data = slotSchema.parse(await request.json())
    const slot = await prisma.mentor_slots.create({
      data: {
        teacherId: gate.session.user.id,
        teacherName: gate.session.user.name || null,
        dayOfWeek: data.dayOfWeek,
        startTime: data.startTime,
        durationMins: data.durationMins,
        capacity: data.capacity,
        mode: data.mode,
        meetingUrl: data.meetingUrl || null,
        topic: data.topic || null,
        courseId: data.courseId || null,
        isActive: data.isActive,
      },
    })
    return NextResponse.json({ success: true, data: { slot } })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.issues.map((e) => e.message).join(', ') },
        { status: 400 }
      )
    }
    console.error('[teacher/mentor-slots] POST error:', error)
    return NextResponse.json({ success: false, error: 'Could not create slot' }, { status: 500 })
  }
}
