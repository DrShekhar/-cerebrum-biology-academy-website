import { CoachingTier } from '@/generated/prisma'
import { CoachingTiers, CoachingSubscriptionTier } from '@/lib/subscriptions/SmartSubscriptionTiers'
import { paiseToRupees } from '@/lib/utils'

// Rupee thresholds. Price ranges are a last-resort heuristic only — GST and
// installment surcharges push totals across tier boundaries, so prefer an
// explicit tier (Razorpay order notes) or a tier keyword in the course ref.
const TIER_PRICE_RANGES: { tier: CoachingTier; min: number; max: number }[] = [
  { tier: 'PINNACLE', min: 90000, max: Infinity },
  { tier: 'ASCENT', min: 60000, max: 89999 },
  { tier: 'PURSUIT', min: 30000, max: 59999 },
]

const PAID_TIERS: CoachingTier[] = ['PINNACLE', 'ASCENT', 'PURSUIT']

export function normalizeTier(value?: string | null): CoachingTier | null {
  if (!value) return null
  const upper = value.trim().toUpperCase()
  return (PAID_TIERS as string[]).includes(upper) ? (upper as CoachingTier) : null
}

/**
 * Resolve the coaching tier for an enrollment.
 *
 * @param courseRef  Course id and/or name (keyword-matched for pinnacle/ascent/pursuit)
 * @param totalFeesPaise  Enrollment/course fees in PAISE (all money columns store paise)
 * @param explicitTier  The tier the student actually selected, when known
 *   (e.g. Razorpay order notes set server-side at order creation) — always wins.
 */
export function mapCourseToTier(
  courseRef: string,
  totalFeesPaise?: number,
  explicitTier?: string | null
): CoachingTier {
  const explicit = normalizeTier(explicitTier)
  if (explicit) return explicit

  const refLower = courseRef.toLowerCase()
  if (refLower.includes('pinnacle')) return 'PINNACLE'
  if (refLower.includes('ascent')) return 'ASCENT'
  if (refLower.includes('pursuit')) return 'PURSUIT'

  const totalFeesRupees = paiseToRupees(totalFeesPaise)
  if (totalFeesRupees > 0) {
    for (const range of TIER_PRICE_RANGES) {
      if (totalFeesRupees >= range.min && totalFeesRupees <= range.max) {
        return range.tier
      }
    }

    const pinnaclePrice = CoachingTiers[CoachingSubscriptionTier.PINNACLE].price
    const ascentPrice = CoachingTiers[CoachingSubscriptionTier.ASCENT].price
    const pursuitPrice = CoachingTiers[CoachingSubscriptionTier.PURSUIT].price

    const diffs = [
      { tier: 'PINNACLE' as CoachingTier, diff: Math.abs(totalFeesRupees - pinnaclePrice) },
      { tier: 'ASCENT' as CoachingTier, diff: Math.abs(totalFeesRupees - ascentPrice) },
      { tier: 'PURSUIT' as CoachingTier, diff: Math.abs(totalFeesRupees - pursuitPrice) },
    ]

    diffs.sort((a, b) => a.diff - b.diff)
    return diffs[0].tier
  }

  return 'PURSUIT'
}
