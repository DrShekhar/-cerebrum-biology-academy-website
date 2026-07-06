/**
 * NEET-UG marks → All India Rank estimation.
 *
 * IMPORTANT — these are ESTIMATES, not official NTA numbers. The breakpoints
 * below are anchored to published NEET-UG 2024 (~23.3 lakh candidates) and
 * NEET-UG 2025 (~22.7 lakh candidates) marks-vs-rank data widely reported
 * after the official results, then smoothed. Actual ranks in any year depend
 * on paper difficulty, tie-break rules and the candidate pool, so the same
 * marks can land noticeably higher or lower. Always present output as a RANGE
 * with a previous-year-data disclaimer.
 */

export interface RankPrediction {
  /** Point estimate of All India Rank */
  air: number
  /** Optimistic end of the estimated AIR band */
  airLow: number
  /** Conservative end of the estimated AIR band */
  airHigh: number
  /** Approximate percentile among all candidates */
  percentile: number
}

/** Approximate total NEET-UG candidate pool (2024/2025 average). */
export const TOTAL_CANDIDATES = 2300000

/**
 * ~20 anchor breakpoints (marks out of 720 → approximate AIR).
 * Sorted by descending marks; ranks between anchors are linearly interpolated.
 */
export const MARKS_TO_RANK_TABLE: ReadonlyArray<{ marks: number; rank: number }> = [
  { marks: 720, rank: 1 },
  { marks: 715, rank: 15 },
  { marks: 710, rank: 60 },
  { marks: 700, rank: 250 },
  { marks: 690, rank: 600 },
  { marks: 680, rank: 1200 },
  { marks: 670, rank: 2300 },
  { marks: 660, rank: 4200 },
  { marks: 650, rank: 6500 },
  { marks: 640, rank: 10500 },
  { marks: 620, rank: 21000 },
  { marks: 600, rank: 36000 },
  { marks: 580, rank: 57000 },
  { marks: 560, rank: 84000 },
  { marks: 540, rank: 122000 },
  { marks: 520, rank: 172000 },
  { marks: 500, rank: 237000 },
  { marks: 450, rank: 490000 },
  { marks: 400, rank: 865000 },
  { marks: 300, rank: 1500000 },
  { marks: 200, rank: 1900000 },
  { marks: 137, rank: 2100000 },
]

const MIN_TABLE_MARKS = MARKS_TO_RANK_TABLE[MARKS_TO_RANK_TABLE.length - 1].marks

/**
 * Estimate All India Rank from NEET marks via linear interpolation between
 * the anchor breakpoints, returned as a band (±15%, widened at low marks
 * where year-to-year variance is much larger).
 */
export function predictRank(marks: number): RankPrediction {
  const m = Math.max(0, Math.min(720, Math.round(marks)))

  let air: number
  if (m >= 720) {
    air = 1
  } else if (m < MIN_TABLE_MARKS) {
    // Below the last published anchor (~qualifying zone and under):
    // taper linearly toward the bottom of the candidate pool.
    const last = MARKS_TO_RANK_TABLE[MARKS_TO_RANK_TABLE.length - 1]
    const ratio = (last.marks - m) / last.marks
    air = Math.round(last.rank + ratio * (TOTAL_CANDIDATES - last.rank))
  } else {
    air = MARKS_TO_RANK_TABLE[MARKS_TO_RANK_TABLE.length - 1].rank
    for (let i = 0; i < MARKS_TO_RANK_TABLE.length - 1; i++) {
      const upper = MARKS_TO_RANK_TABLE[i]
      const lower = MARKS_TO_RANK_TABLE[i + 1]
      if (m <= upper.marks && m > lower.marks) {
        const t = (upper.marks - m) / (upper.marks - lower.marks)
        air = Math.round(upper.rank + t * (lower.rank - upper.rank))
        break
      }
    }
  }

  // Uncertainty band: ±15% at the top, widening to ±25% below 500 marks
  // (historical variance grows sharply in the middle of the distribution).
  const spread = m >= 500 ? 0.15 : 0.25
  const airLow = Math.max(1, Math.floor(air * (1 - spread)))
  const airHigh = Math.min(TOTAL_CANDIDATES, Math.ceil(air * (1 + spread)))

  const percentile =
    Math.round(Math.max(0, Math.min(100, (1 - air / TOTAL_CANDIDATES) * 100)) * 100) / 100

  return { air, airLow, airHigh, percentile }
}
