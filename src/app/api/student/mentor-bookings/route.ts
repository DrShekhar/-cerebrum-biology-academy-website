import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { resolveBookableMentorSlot } from '@/lib/mentor/slots'
import { notifyStaff } from '@/lib/staff/notify'
import { emailService } from '@/lib/email/emailService'

export const dynamic = 'force-dynamic'

/**
 * Fire-and-forget booking notifications. Previously a booking notified
 * NOBODY — the mentor could only find out by polling their slots page, and
 * the student got no confirmation beyond the returned JSON.
 */
async function notifyBookingEvent(params: {
  action: 'booked' | 'cancelled'
  teacherId: string
  studentId: string
  topic: string | null
  date: string
  startTime: string
}) {
  try {
    const [teacher, student] = await Promise.all([
      prisma.users.findUnique({
        where: { id: params.teacherId },
        select: { name: true, email: true },
      }),
      prisma.users.findUnique({
        where: { id: params.studentId },
        select: { name: true, email: true },
      }),
    ])

    const sessionLabel = `${params.topic || 'Mentor session'} on ${params.date} at ${params.startTime}`
    const studentName = student?.name || 'A student'

    // Bell notification on the mentor's staff dashboard
    void notifyStaff({
      userIds: [params.teacherId],
      type: 'SYSTEM',
      title: params.action === 'booked' ? 'New mentor session booked' : 'Mentor session cancelled',
      body: `${studentName} ${params.action === 'booked' ? 'booked' : 'cancelled'}: ${sessionLabel}`,
      href: '/teacher/mentor-slots',
    })

    // Email the mentor (no-ops gracefully if email keys are unset)
    if (teacher?.email) {
      void emailService
        .send({
          to: teacher.email,
          subject:
            params.action === 'booked'
              ? `New mentor session: ${sessionLabel}`
              : `Cancelled: ${sessionLabel}`,
          html: `<p>Hi ${teacher.name || 'there'},</p><p>${studentName} has ${
            params.action === 'booked' ? 'booked' : 'cancelled'
          } a mentor session:</p><p><strong>${sessionLabel}</strong></p><p>Manage your slots: https://cerebrumbiologyacademy.com/teacher/mentor-slots</p>`,
        })
        .catch(() => {})
    }

    // Confirmation email to the student on booking
    if (params.action === 'booked' && student?.email) {
      void emailService
        .send({
          to: student.email,
          subject: `Session confirmed: ${sessionLabel}`,
          html: `<p>Hi ${student.name || 'there'},</p><p>Your mentor session is confirmed:</p><p><strong>${sessionLabel}</strong>${
            teacher?.name ? ` with ${teacher.name}` : ''
          }</p><p>You can view or cancel it anytime from your dashboard: https://cerebrumbiologyacademy.com/student/mentor</p>`,
        })
        .catch(() => {})
    }
  } catch (error) {
    // Notifications must never fail the booking itself.
    console.error('[mentor-bookings] notification error:', error)
  }
}

/**
 * Student mentor-session bookings.
 *
 * GET    — the caller's own bookings (with slot detail).
 * POST   — book a projected slot/date; re-checks capacity + past-date inside a
 *          transaction to prevent oversell; copies the slot's meeting link.
 * PATCH  — cancel the caller's own BOOKED booking (body: { id }).
 * DELETE — cancel via ?id= (same guard as PATCH).
 */

const bookSchema = z.object({
  slotId: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'date must be YYYY-MM-DD'),
  startTime: z.string().regex(/^\d{2}:\d{2}$/, 'startTime must be HH:MM'),
  studentNote: z.string().max(500).optional().nullable(),
})

async function requireStudentSession() {
  const session = await auth()
  if (!session?.user) {
    return { error: NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 }) }
  }
  return { session }
}

export async function GET() {
  const gate = await requireStudentSession()
  if ('error' in gate) return gate.error

  const bookings = await prisma.mentor_bookings.findMany({
    where: { studentId: gate.session.user.id },
    include: {
      slot: {
        select: { topic: true, mode: true, durationMins: true, teacherName: true },
      },
    },
    orderBy: [{ date: 'desc' }, { startTime: 'desc' }],
  })
  return NextResponse.json({ success: true, data: { bookings } })
}

export async function POST(request: NextRequest) {
  const gate = await requireStudentSession()
  if ('error' in gate) return gate.error
  const studentId = gate.session.user.id

  try {
    const data = bookSchema.parse(await request.json())

    const result = await prisma.$transaction(async (tx) => {
      const bookable = await resolveBookableMentorSlot(data.slotId, data.date)
      if (!bookable) return { error: 'unavailable' as const }
      const { slot } = bookable

      // The chosen time must match the slot's real start time.
      if (data.startTime !== slot.startTime) return { error: 'unavailable' as const }

      // Guard: no double-booking the same slot/date/time.
      const existing = await tx.mentor_bookings.findFirst({
        where: {
          slotId: slot.id,
          date: data.date,
          startTime: slot.startTime,
          studentId,
          status: { in: ['BOOKED', 'COMPLETED'] },
        },
        select: { id: true },
      })
      if (existing) return { error: 'duplicate' as const }

      const booking = await tx.mentor_bookings.create({
        data: {
          slotId: slot.id,
          studentId,
          teacherId: slot.teacherId,
          date: data.date,
          startTime: slot.startTime,
          status: 'BOOKED',
          studentNote: data.studentNote || null,
          meetingUrl: slot.meetingUrl || null,
        },
      })
      return { booking, slotTopic: slot.topic as string | null }
    })

    if ('error' in result) {
      if (result.error === 'duplicate') {
        return NextResponse.json(
          { success: false, error: 'You already booked this session.' },
          { status: 409 }
        )
      }
      return NextResponse.json(
        { success: false, error: 'That session just filled up — please pick another.' },
        { status: 409 }
      )
    }

    void notifyBookingEvent({
      action: 'booked',
      teacherId: result.booking.teacherId,
      studentId,
      topic: result.slotTopic,
      date: result.booking.date,
      startTime: result.booking.startTime,
    })

    return NextResponse.json({ success: true, data: { booking: result.booking } })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.issues.map((e) => e.message).join(', ') },
        { status: 400 }
      )
    }
    // Unique-constraint race → treat as duplicate.
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      (error as { code?: string }).code === 'P2002'
    ) {
      return NextResponse.json(
        { success: false, error: 'You already booked this session.' },
        { status: 409 }
      )
    }
    console.error('[student/mentor-bookings] POST error:', error)
    return NextResponse.json({ success: false, error: 'Could not book session' }, { status: 500 })
  }
}

/** Cancel a BOOKED booking the caller owns. */
async function cancelOwnBooking(studentId: string, id: string) {
  if (!id) {
    return NextResponse.json({ success: false, error: 'id required' }, { status: 400 })
  }
  const booking = await prisma.mentor_bookings.findUnique({
    where: { id },
    include: { slot: { select: { topic: true } } },
  })
  if (!booking || booking.studentId !== studentId) {
    return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 })
  }
  if (booking.status !== 'BOOKED') {
    return NextResponse.json(
      { success: false, error: 'Only upcoming (booked) sessions can be cancelled.' },
      { status: 409 }
    )
  }
  const updated = await prisma.mentor_bookings.update({
    where: { id },
    data: { status: 'CANCELLED' },
  })

  void notifyBookingEvent({
    action: 'cancelled',
    teacherId: booking.teacherId,
    studentId,
    topic: booking.slot?.topic || null,
    date: booking.date,
    startTime: booking.startTime,
  })

  return NextResponse.json({ success: true, data: { booking: updated } })
}

export async function PATCH(request: NextRequest) {
  const gate = await requireStudentSession()
  if ('error' in gate) return gate.error
  const body = await request.json().catch(() => ({}))
  return cancelOwnBooking(gate.session.user.id, String(body?.id || ''))
}

export async function DELETE(request: NextRequest) {
  const gate = await requireStudentSession()
  if ('error' in gate) return gate.error
  const id = new URL(request.url).searchParams.get('id') || ''
  return cancelOwnBooking(gate.session.user.id, id)
}
