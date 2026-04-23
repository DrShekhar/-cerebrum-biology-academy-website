/**
 * Current batch seat availability for /biology-classes.
 *
 * Update the `filled` count and `updatedAt` date whenever the batch
 * manager refreshes seat numbers. Leave a batch as `null` when we
 * do not have a reliable count — the UI auto-hides the counter for
 * that batch (better to show nothing than stale data).
 *
 * Google Ads trust policy: scarcity must be real. If a batch fills
 * up, raise the `filled` count to match `total` and mark as "Waitlist".
 */

export interface BatchSeatInfo {
  filled: number
  total: number
  /** Optional override label shown instead of the computed status. */
  statusOverride?: string
}

export type BatchKey = 'class-11' | 'class-12' | 'dropper' | 'weekend'

export const batchSeats: Record<BatchKey, BatchSeatInfo | null> = {
  'class-11': { filled: 16, total: 20 },
  'class-12': null,
  dropper: null,
  weekend: null,
}

/** Date of last seat count refresh. Shown as small tooltip on the counter. */
export const seatsUpdatedAt = '2026-04-23'

/**
 * Derive a display status from seat data:
 *  - < 50% full  → "Enrolling"
 *  - 50–79% full → "Filling fast"
 *  - 80–99% full → "Almost full"
 *  - 100% full   → "Waitlist"
 */
export function seatsStatus(seats: BatchSeatInfo): string {
  if (seats.statusOverride) return seats.statusOverride
  const pct = (seats.filled / seats.total) * 100
  if (pct >= 100) return 'Waitlist'
  if (pct >= 80) return 'Almost full'
  if (pct >= 50) return 'Filling fast'
  return 'Enrolling'
}

/** Percentage filled as a 0–100 number, rounded. */
export function seatsPercent(seats: BatchSeatInfo): number {
  return Math.round((seats.filled / seats.total) * 100)
}
