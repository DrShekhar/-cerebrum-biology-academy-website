/**
 * India-timezone datetime helpers.
 *
 * The platform's users (teachers/admins scheduling classes) all work in IST and
 * type wall-clock times into `<input type="datetime-local">`, which yields a
 * NAIVE string like "2026-07-15T10:00" with no timezone. `new Date(naive)` on the
 * server interprets that in the SERVER's timezone — UTC on Vercel — so a 10:00 IST
 * class was being stored as 10:00 UTC (= 15:30 IST), corrupting both the displayed
 * time and reminder firing. These helpers pin naive strings to Asia/Kolkata.
 *
 * IST is a fixed +05:30 offset with no DST, so a literal offset suffix is exact.
 */

const IST_OFFSET = '+05:30'

/**
 * Interpret a naive datetime-local / date string as Asia/Kolkata wall-clock time
 * and return the correct UTC instant. Strings that already carry an explicit zone
 * (trailing Z or ±hh:mm) are trusted as-is. Returns an Invalid Date for empty input.
 */
export function parseISTDateTime(local: string | null | undefined): Date {
  if (!local) return new Date(NaN)
  const s = local.trim()
  // Already zoned (…Z or …+hh:mm / …-hh:mm) — trust it.
  if (/[zZ]$/.test(s) || /[+-]\d{2}:\d{2}$/.test(s)) return new Date(s)
  // Date-only → midnight IST.
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return new Date(`${s}T00:00:00${IST_OFFSET}`)
  // "YYYY-MM-DDTHH:mm" (add seconds) or "…:ss".
  const withSecs = /T\d{2}:\d{2}$/.test(s) ? `${s}:00` : s
  return new Date(`${withSecs}${IST_OFFSET}`)
}

function istParts(date: Date): Record<string, string> {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(date)
  const out: Record<string, string> = {}
  for (const p of parts) out[p.type] = p.value
  // Some engines emit '24' for midnight under hour12:false — normalize.
  if (out.hour === '24') out.hour = '00'
  return out
}

/**
 * Format a Date (or ISO string) to a "YYYY-MM-DDTHH:mm" string in IST, suitable
 * for pre-filling `<input type="datetime-local">`. Using toISOString() here (as the
 * old code did) rendered the stored instant in UTC, showing 04:30 for a 10:00 class.
 */
export function toISTDateTimeLocal(date: Date | string | null | undefined): string {
  if (!date) return ''
  const d = typeof date === 'string' ? new Date(date) : date
  if (isNaN(d.getTime())) return ''
  const p = istParts(d)
  return `${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}`
}

/** Format a Date/ISO string to "YYYY-MM-DD" in IST, for `<input type="date">`. */
export function toISTDateInput(date: Date | string | null | undefined): string {
  if (!date) return ''
  const d = typeof date === 'string' ? new Date(date) : date
  if (isNaN(d.getTime())) return ''
  const p = istParts(d)
  return `${p.year}-${p.month}-${p.day}`
}

/** Extract the wall-clock "HH:mm" from a naive datetime-local string, else ''. */
export function wallTimeOf(local: string | null | undefined): string {
  if (!local) return ''
  const m = local.trim().match(/T(\d{2}:\d{2})/)
  return m ? m[1] : ''
}
