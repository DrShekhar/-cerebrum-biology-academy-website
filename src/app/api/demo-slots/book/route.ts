import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { randomUUID } from 'crypto'
import { prisma } from '@/lib/prisma'
import { resolveBookableSlot } from '@/lib/demo/slots'
import { upsertLead } from '@/lib/leads/upsertLead'
import { withRateLimit } from '@/lib/middleware/rateLimit'

export const dynamic = 'force-dynamic'

const CLASS_MAP: Record<
  string,
  'CLASS_9' | 'CLASS_10' | 'CLASS_11' | 'CLASS_12' | 'DROPPER' | 'FOUNDATION'
> = {
  '9': 'CLASS_9',
  '10': 'CLASS_10',
  '11': 'CLASS_11',
  '12': 'CLASS_12',
  dropper: 'DROPPER',
  foundation: 'FOUNDATION',
}

const bookSchema = z.object({
  slotId: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'date must be YYYY-MM-DD'),
  name: z.string().trim().min(2).max(80),
  phone: z
    .string()
    .trim()
    .refine((p) => p.replace(/\D/g, '').length >= 8, 'valid phone required'),
  studentClass: z.string().optional(),
  email: z.string().email().optional(),
  purpose: z.enum(['demo', 'faculty']).default('demo'),
  source: z.string().optional(),
})

/**
 * POST /api/demo-slots/book — book a demo/faculty slot.
 *
 * Shared by the on-site widget and (later) the WhatsApp Flow completion
 * webhook. Re-checks availability inside a transaction to prevent oversell,
 * creates the demo_booking on the slot's shared Zoom link, then fires the
 * CRM pipeline (dedup + round-robin counselor + follow-up task) fire-and-forget.
 */
export async function POST(request: NextRequest) {
  const rl = await withRateLimit(request, {
    identifier: 'demo-slots-book',
    limit: 30,
    window: 10 * 60 * 1000,
    keyPrefix: 'demo-slots-book',
    failClosed: false,
  })
  if (!rl.success) {
    return NextResponse.json(
      { success: false, error: 'Too many attempts. Please try again shortly.' },
      { status: 429 }
    )
  }

  try {
    const body = await request.json()
    const data = bookSchema.parse(body)

    const created = await prisma.$transaction(async (tx) => {
      const bookable = await resolveBookableSlot(data.slotId, data.date)
      if (!bookable) return { error: 'slot_unavailable' as const }
      const { slot } = bookable

      const studentClass = data.studentClass
        ? CLASS_MAP[data.studentClass.toLowerCase()]
        : undefined

      const booking = await tx.demo_bookings.create({
        data: {
          id: randomUUID(),
          studentName: data.name.trim(),
          phone: data.phone.trim(),
          email: data.email ?? null,
          studentClass: studentClass ?? null,
          preferredDate: data.date,
          preferredTime: slot.startTime,
          status: 'CONFIRMED',
          demoType: 'FREE',
          assignedTo: slot.teacherId ?? null,
          message:
            data.purpose === 'faculty'
              ? `Faculty interaction booked${slot.teacherName ? ` with ${slot.teacherName}` : ''}`
              : `Demo class booked${slot.teacherName ? ` with ${slot.teacherName}` : ''}`,
          source: data.source ?? 'demo-slot-picker',
          updatedAt: new Date(),
        },
        select: { id: true, preferredDate: true, preferredTime: true },
      })
      return { booking, slot }
    })

    if ('error' in created) {
      return NextResponse.json(
        { success: false, error: 'That slot just filled up or was blocked — please pick another.' },
        { status: 409 }
      )
    }

    // CRM: dedup by phone, round-robin counselor assignment, follow-up task.
    // Fire-and-forget — never block the booking confirmation on it.
    void upsertLead({
      name: data.name,
      phone: data.phone,
      email: data.email,
      courseInterest: data.purpose === 'faculty' ? 'Faculty interaction' : 'Free demo class',
      source: `demo-slot:${data.purpose}`,
      message: `Booked ${created.booking.preferredDate} ${created.slot.startTime}${
        created.slot.teacherName ? ` with ${created.slot.teacherName}` : ''
      }`,
    }).catch(() => {})

    return NextResponse.json({
      success: true,
      booking: {
        id: created.booking.id,
        date: created.booking.preferredDate,
        time: created.booking.preferredTime,
        joinUrl: created.slot.zoomJoinUrl,
        teacher: created.slot.teacherName,
      },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.issues.map((e) => e.message).join(', ') },
        { status: 400 }
      )
    }
    console.error('[demo-slots/book] error:', error)
    return NextResponse.json(
      { success: false, error: 'Could not complete booking' },
      { status: 500 }
    )
  }
}
