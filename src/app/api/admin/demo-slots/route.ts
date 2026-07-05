import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireAdminAuth } from '@/lib/auth/admin-auth'

export const dynamic = 'force-dynamic'

const slotSchema = z.object({
  dayOfWeek: z.number().int().min(0).max(6),
  startTime: z.string().regex(/^\d{2}:\d{2}$/, 'startTime must be HH:MM'),
  durationMins: z.number().int().min(15).max(180).default(45),
  teacherId: z.string().optional().nullable(),
  teacherName: z.string().max(80).optional().nullable(),
  capacity: z.number().int().min(1).max(200).default(15),
  zoomJoinUrl: z.string().url().optional().nullable().or(z.literal('')),
  track: z.string().max(40).optional().nullable(),
  isActive: z.boolean().default(true),
})

/** GET — all recurring slots + all blocks, for the admin calendar UI. */
export const GET = requireAdminAuth(async () => {
  const [slots, blocks] = await Promise.all([
    prisma.demo_slots.findMany({ orderBy: [{ dayOfWeek: 'asc' }, { startTime: 'asc' }] }),
    prisma.demo_slot_blocks.findMany({ orderBy: { startDate: 'asc' } }),
  ])
  return NextResponse.json({ success: true, slots, blocks })
})

/** POST — create a recurring slot. */
export const POST = requireAdminAuth(async (request: NextRequest) => {
  try {
    const data = slotSchema.parse(await request.json())
    const slot = await prisma.demo_slots.create({
      data: {
        dayOfWeek: data.dayOfWeek,
        startTime: data.startTime,
        durationMins: data.durationMins,
        teacherId: data.teacherId || null,
        teacherName: data.teacherName || null,
        capacity: data.capacity,
        zoomJoinUrl: data.zoomJoinUrl || null,
        track: data.track || null,
        isActive: data.isActive,
      },
    })
    return NextResponse.json({ success: true, slot })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.issues.map((e) => e.message).join(', ') },
        { status: 400 }
      )
    }
    throw error
  }
})

/** PATCH — update a slot (partial). Body: { id, ...fields }. */
export const PATCH = requireAdminAuth(async (request: NextRequest) => {
  const body = await request.json()
  const id = String(body.id || '')
  if (!id) return NextResponse.json({ success: false, error: 'id required' }, { status: 400 })
  const data = slotSchema.partial().parse(body)
  const slot = await prisma.demo_slots.update({
    where: { id },
    data: {
      ...(data.dayOfWeek !== undefined ? { dayOfWeek: data.dayOfWeek } : {}),
      ...(data.startTime !== undefined ? { startTime: data.startTime } : {}),
      ...(data.durationMins !== undefined ? { durationMins: data.durationMins } : {}),
      ...(data.teacherName !== undefined ? { teacherName: data.teacherName || null } : {}),
      ...(data.capacity !== undefined ? { capacity: data.capacity } : {}),
      ...(data.zoomJoinUrl !== undefined ? { zoomJoinUrl: data.zoomJoinUrl || null } : {}),
      ...(data.track !== undefined ? { track: data.track || null } : {}),
      ...(data.isActive !== undefined ? { isActive: data.isActive } : {}),
    },
  })
  return NextResponse.json({ success: true, slot })
})

/** DELETE — remove a slot. Query: ?id=... */
export const DELETE = requireAdminAuth(async (request: NextRequest) => {
  const id = new URL(request.url).searchParams.get('id')
  if (!id) return NextResponse.json({ success: false, error: 'id required' }, { status: 400 })
  await prisma.demo_slots.delete({ where: { id } })
  return NextResponse.json({ success: true })
})
