import { prisma } from '@/lib/prisma'

/**
 * Demo-slot availability.
 *
 * demo_slots hold a recurring weekly pattern (dayOfWeek + startTime). For the
 * next N days we project each active slot onto real dates and compute seats
 * remaining = capacity − (active bookings already on that date+time).
 *
 * Dates/times are handled in IST (Asia/Kolkata) since all demos run in IST.
 */

const IST_OFFSET_MIN = 330 // +05:30

export interface AvailableSlot {
  slotId: string
  date: string // YYYY-MM-DD (IST)
  dayLabel: string // e.g. "Tue, 8 Jul"
  startTime: string // "17:00"
  timeLabel: string // "5:00 PM"
  teacherName: string | null
  track: string | null
  seatsLeft: number
  capacity: number
}

/** Current date in IST as a YYYY-MM-DD string + weekday, without pulling a tz lib. */
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

interface BlockRow {
  startDate: string
  endDate: string
  slotId: string | null
  startTime: string | null
}

/** True if a (date, slot) is covered by any block. */
function isBlocked(blocks: BlockRow[], date: string, slotId: string, startTime: string): boolean {
  for (const b of blocks) {
    if (date < b.startDate || date > b.endDate) continue // outside range
    if (b.slotId && b.slotId !== slotId) continue // scoped to a different slot
    if (b.startTime && b.startTime !== startTime) continue // scoped to a different time
    return true // matches range, and slot/time scope (or whole-day) → blocked
  }
  return false
}

function to12h(startTime: string): string {
  const [hStr, mStr] = startTime.split(':')
  const h = parseInt(hStr, 10)
  const suffix = h >= 12 ? 'PM' : 'AM'
  const h12 = h % 12 === 0 ? 12 : h % 12
  return `${h12}:${mStr ?? '00'} ${suffix}`
}

/**
 * Return bookable slots across the next `daysAhead` days (default 10),
 * skipping any slot whose start time has already passed today, and any that
 * are fully booked. Sorted by date then time.
 */
export async function getAvailableSlots(
  now: Date = new Date(),
  daysAhead = 10
): Promise<AvailableSlot[]> {
  const slots = await prisma.demo_slots.findMany({ where: { isActive: true } })
  if (slots.length === 0) return []

  const blocks = await prisma.demo_slot_blocks.findMany()

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
      // Skip anything the owner/counselor has blocked.
      if (isBlocked(blocks, dateStr, slot.id, slot.startTime)) continue
      candidates.push({ slot, date: dateStr, dow })
    }
  }
  if (candidates.length === 0) return []

  // Count existing active bookings per (date, time) in one query.
  const dates = [...new Set(candidates.map((c) => c.date))]
  const times = [...new Set(candidates.map((c) => c.slot.startTime))]
  const booked = await prisma.demo_bookings.groupBy({
    by: ['preferredDate', 'preferredTime'],
    where: {
      preferredDate: { in: dates },
      preferredTime: { in: times },
      status: { in: ['PENDING', 'CONFIRMED', 'RESCHEDULED'] },
    },
    _count: { _all: true },
  })
  const bookedMap = new Map<string, number>()
  for (const b of booked) {
    bookedMap.set(`${b.preferredDate}|${b.preferredTime}`, b._count._all)
  }

  const out: AvailableSlot[] = []
  for (const { slot, date, dow } of candidates) {
    const taken = bookedMap.get(`${date}|${slot.startTime}`) ?? 0
    const seatsLeft = slot.capacity - taken
    if (seatsLeft <= 0) continue
    const [, mo, dy] = date.split('-').map((x) => parseInt(x, 10))
    out.push({
      slotId: slot.id,
      date,
      dayLabel: `${DAYS[dow]}, ${dy} ${MONTHS[mo - 1]}`,
      startTime: slot.startTime,
      timeLabel: to12h(slot.startTime),
      teacherName: slot.teacherName,
      track: slot.track,
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
 * the slot row. Returns null if the slot is inactive, the date doesn't match
 * its weekday, or it's now full. Callers should run this inside the booking
 * transaction to avoid oversell.
 */
export async function resolveBookableSlot(
  slotId: string,
  date: string
): Promise<{
  slot: NonNullable<Awaited<ReturnType<typeof prisma.demo_slots.findUnique>>>
  seatsLeft: number
} | null> {
  const slot = await prisma.demo_slots.findUnique({ where: { id: slotId } })
  if (!slot || !slot.isActive) return null

  const parts = date.split('-').map((x) => parseInt(x, 10))
  if (parts.length !== 3 || parts.some(Number.isNaN)) return null
  const dow = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2])).getUTCDay()
  if (dow !== slot.dayOfWeek) return null

  // Respect owner/counselor blocks at commit time.
  const blocks = await prisma.demo_slot_blocks.findMany({
    where: { startDate: { lte: date }, endDate: { gte: date } },
  })
  if (isBlocked(blocks, date, slot.id, slot.startTime)) return null

  const taken = await prisma.demo_bookings.count({
    where: {
      preferredDate: date,
      preferredTime: slot.startTime,
      status: { in: ['PENDING', 'CONFIRMED', 'RESCHEDULED'] },
    },
  })
  const seatsLeft = slot.capacity - taken
  if (seatsLeft <= 0) return null
  return { slot, seatsLeft }
}
