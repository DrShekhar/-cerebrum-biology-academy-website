import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export const dynamic = 'force-dynamic'

/**
 * PATCH  — edit / toggle one of the caller's mentor slots (partial update).
 * DELETE — remove a slot (its future bookings cascade via the schema relation).
 *
 * Teachers may only touch their own slots; ADMIN may manage any.
 */

const patchSchema = z.object({
  dayOfWeek: z.number().int().min(0).max(6).optional(),
  startTime: z
    .string()
    .regex(/^\d{2}:\d{2}$/, 'startTime must be HH:MM')
    .optional(),
  durationMins: z.number().int().min(10).max(180).optional(),
  capacity: z.number().int().min(1).max(50).optional(),
  mode: z.enum(['online', 'offline']).optional(),
  meetingUrl: z.string().url().optional().nullable().or(z.literal('')),
  topic: z.string().max(120).optional().nullable(),
  courseId: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
})

async function gateSlot(id: string) {
  const session = await auth()
  const role = (session?.user?.role || '').toUpperCase()
  if (!session?.user || (role !== 'TEACHER' && role !== 'ADMIN')) {
    return { error: NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 }) }
  }
  const slot = await prisma.mentor_slots.findUnique({ where: { id } })
  if (!slot) {
    return {
      error: NextResponse.json({ success: false, error: 'Slot not found' }, { status: 404 }),
    }
  }
  if (role !== 'ADMIN' && slot.teacherId !== session.user.id) {
    return { error: NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 }) }
  }
  return { slot }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const gate = await gateSlot(id)
  if ('error' in gate) return gate.error

  try {
    const data = patchSchema.parse(await request.json())
    const slot = await prisma.mentor_slots.update({
      where: { id },
      data: {
        ...(data.dayOfWeek !== undefined ? { dayOfWeek: data.dayOfWeek } : {}),
        ...(data.startTime !== undefined ? { startTime: data.startTime } : {}),
        ...(data.durationMins !== undefined ? { durationMins: data.durationMins } : {}),
        ...(data.capacity !== undefined ? { capacity: data.capacity } : {}),
        ...(data.mode !== undefined ? { mode: data.mode } : {}),
        ...(data.meetingUrl !== undefined ? { meetingUrl: data.meetingUrl || null } : {}),
        ...(data.topic !== undefined ? { topic: data.topic || null } : {}),
        ...(data.courseId !== undefined ? { courseId: data.courseId || null } : {}),
        ...(data.isActive !== undefined ? { isActive: data.isActive } : {}),
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
    console.error('[teacher/mentor-slots] PATCH error:', error)
    return NextResponse.json({ success: false, error: 'Could not update slot' }, { status: 500 })
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const gate = await gateSlot(id)
  if ('error' in gate) return gate.error

  await prisma.mentor_slots.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
