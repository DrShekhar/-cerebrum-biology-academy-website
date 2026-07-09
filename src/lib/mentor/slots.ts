import { prisma } from '@/lib/prisma'

/**
 * Mentor 1:1 / small-group session availability.
 *
 * mentor_slots hold a recurring weekly pattern (dayOfWeek + startTime). For the
 * next N days we project each active slot onto real dates and compute seats
 * remaining = capacity − (active bookings already on that date+time+slot).
 *
 * Mirrors the demo-slot engine (src/lib/demo/slots.ts). Dates/times are handled
 * in IST (Asia/Kolkata) since all sessions run in IST.
 */

const IST_OFFSET_MIN = 330 // +05:30

export interface AvailableMentorSlot {
  slotId: string
  date: string // YYYY-MM-DD (IST)
  dayLabel: string // e.g. "Tue, 8 Jul"
  startTime: string // "17:00"
  timeLabel: string // "5:00 PM"
  durationMins: number
  teacherId: string
  teacherName: string | null
  mode: string // "online" | "offline"
  topic: string | null
  courseId: string | null
  seatsLeft: number
  capacity: number
}

/** Current date in IST as parts, without pulling a tz lib. */
function istToday(now: Date): { year: number; month: number; day: number; dow: number } {
  const ist = new Date(now.getTime() + IST_OFFSET_MIN * 60_000)
  return {
    year: ist.getUTCFullYear(),
    month: ist.getUTCMonth(), // 0-based
    day: ist.getUTCDate(),
    dow: ist.getUTCDay(),
  }
}

function pad(n: number): string {
  return n < 10 ? `0${n}` : `${n}`
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function to12h(startTime: string): string {
  const [hStr, mStr] = startTime.split(':')
  const h = parseInt(hStr, 10)
  const suffix = h >= 12 ? 'PM' : 'AM'
  const h12 = h % 12 === 0 ? 12 : h % 12
  return `${h12}:${mStr ?? '00'} ${suffix}`
}

/**
 * Return bookable mentor sessions across the next `daysAhead` days (default 14),
 * skipping any slot whose start time has already passed today, and any that are
 * fully booked. Optionally scope to one teacher or one course. Sorted by date
 * then time. Seats are counted in one grouped query (no N+1).
 */
export async function getAvailableMentorSlots(
  now: Date = new Date(),
  daysAhead = 14,
  filter: { teacherId?: string; courseId?: string } = {}
): Promise<AvailableMentorSlot[]> {
  const slots = await prisma.mentor_slots.findMany({
    where: {
      isActive: true,
      ...(filter.teacherId ? { teacherId: filter.teacherId } : {}),
      ...(filter.courseId ? { courseId: filter.courseId } : {}),
    },
  })
  if (slots.length === 0) return []

  const today = istToday(now)
  const nowIstMinutes = (() => {
    const ist = new Date(now.getTime() + IST_OFFSET_MIN * 60_000)
    return ist.getUTCHours() * 60 + ist.getUTCMinutes()
  })()

  // Build candidate (slot, date) pairs for the window.
  const candidates: { slot: (typeof slots)[number]; date: string; dow: number }[] = []
  const base = Date.UTC(today.year, today.month, today.day)
  for (let offset = 0; offset <= daysAhead; offset++) {
    const d = new Date(base + offset * 86_400_000)
    const dow = d.getUTCDay()
    const dateStr = `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`
    for (const slot of slots) {
      if (slot.dayOfWeek !== dow) continue
      // Skip slots earlier today than the current time.
      if (offset === 0) {
        const [h, m] = slot.startTime.split(':').map((x) => parseInt(x, 10))
        if (h * 60 + (m || 0) <= nowIstMinutes) continue
      }
      candidates.push({ slot, date: dateStr, dow })
    }
  }
  if (candidates.length === 0) return []

  // Count existing active bookings per (slot, date, time) in one grouped query.
  const slotIds = [...new Set(candidates.map((c) => c.slot.id))]
  const dates = [...new Set(candidates.map((c) => c.date))]
  const booked = await prisma.mentor_bookings.groupBy({
    by: ['slotId', 'date', 'startTime'],
    where: {
      slotId: { in: slotIds },
      date: { in: dates },
      status: { in: ['BOOKED', 'COMPLETED'] },
    },
    _count: { _all: true },
  })
  const bookedMap = new Map<string, number>()
  for (const b of booked) {
    bookedMap.set(`${b.slotId}|${b.date}|${b.startTime}`, b._count._all)
  }

  const out: AvailableMentorSlot[] = []
  for (const { slot, date, dow } of candidates) {
    const taken = bookedMap.get(`${slot.id}|${date}|${slot.startTime}`) ?? 0
    const seatsLeft = slot.capacity - taken
    if (seatsLeft <= 0) continue
    const [, mo, dy] = date.split('-').map((x) => parseInt(x, 10))
    out.push({
      slotId: slot.id,
      date,
      dayLabel: `${DAYS[dow]}, ${dy} ${MONTHS[mo - 1]}`,
      startTime: slot.startTime,
      timeLabel: to12h(slot.startTime),
      durationMins: slot.durationMins,
      teacherId: slot.teacherId,
      teacherName: slot.teacherName,
      mode: slot.mode,
      topic: slot.topic,
      courseId: slot.courseId,
      seatsLeft,
      capacity: slot.capacity,
    })
  }

  out.sort((a, b) =>
    a.date === b.date ? a.startTime.localeCompare(b.startTime) : a.date.localeCompare(b.date)
  )
  return out
}

/**
 * Re-check a single (slot, date) is still bookable at commit time, and return
 * the slot row + seats left. Returns null if the slot is inactive, the date
 * doesn't match its weekday, the date is in the past, or it's now full. Callers
 * should run this inside the booking transaction to avoid oversell.
 */
export async function resolveBookableMentorSlot(
  slotId: string,
  date: string,
  now: Date = new Date()
): Promise<{
  slot: NonNullable<Awaited<ReturnType<typeof prisma.mentor_slots.findUnique>>>
  seatsLeft: number
} | null> {
  const slot = await prisma.mentor_slots.findUnique({ where: { id: slotId } })
  if (!slot || !slot.isActive) return null

  const parts = date.split('-').map((x) => parseInt(x, 10))
  if (parts.length !== 3 || parts.some(Number.isNaN)) return null
  const dow = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2])).getUTCDay()
  if (dow !== slot.dayOfWeek) return null

  // Reject past dates (IST). Same-day only if the start time hasn't passed.
  const today = istToday(now)
  const todayStr = `${today.year}-${pad(today.month + 1)}-${pad(today.day)}`
  if (date < todayStr) return null
  if (date === todayStr) {
    const ist = new Date(now.getTime() + IST_OFFSET_MIN * 60_000)
    const nowMin = ist.getUTCHours() * 60 + ist.getUTCMinutes()
    const [h, m] = slot.startTime.split(':').map((x) => parseInt(x, 10))
    if (h * 60 + (m || 0) <= nowMin) return null
  }

  const taken = await prisma.mentor_bookings.count({
    where: {
      slotId: slot.id,
      date,
      startTime: slot.startTime,
      status: { in: ['BOOKED', 'COMPLETED'] },
    },
  })
  const seatsLeft = slot.capacity - taken
  if (seatsLeft <= 0) return null
  return { slot, seatsLeft }
}
