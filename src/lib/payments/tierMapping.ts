import { CoachingTier } from '@/generated/prisma'
import {
  CoachingTiers,
  CoachingSubscriptionTier,
} from '@/lib/subscriptions/SmartSubscriptionTiers'

const TIER_PRICE_RANGES: { tier: CoachingTier; min: number; max: number }[] = [
  { tier: 'PINNACLE', min: 90000, max: Infinity },
  { tier: 'ASCENT', min: 60000, max: 89999 },
  { tier: 'PURSUIT', min: 30000, max: 59999 },
]

export function mapCourseToTier(
  courseId: string,
  totalFees?: number
): CoachingTier {
  if (totalFees && totalFees > 0) {
    for (const range of TIER_PRICE_RANGES) {
      if (totalFees >= range.min && totalFees <= range.max) {
        return range.tier
      }
    }
  }

  const courseIdLower = courseId.toLowerCase()
  if (courseIdLower.includes('pinnacle')) return 'PINNACLE'
  if (courseIdLower.includes('ascent')) return 'ASCENT'
  if (courseIdLower.includes('pursuit')) return 'PURSUIT'

  if (totalFees && totalFees > 0) {
    const pinnaclePrice = CoachingTiers[CoachingSubscriptionTier.PINNACLE].price
    const ascentPrice = CoachingTiers[CoachingSubscriptionTier.ASCENT].price
    const pursuitPrice = CoachingTiers[CoachingSubscriptionTier.PURSUIT].price

    const diffs = [
      { tier: 'PINNACLE' as CoachingTier, diff: Math.abs(totalFees - pinnaclePrice) },
      { tier: 'ASCENT' as CoachingTier, diff: Math.abs(totalFees - ascentPrice) },
      { tier: 'PURSUIT' as CoachingTier, diff: Math.abs(totalFees - pursuitPrice) },
    ]

    diffs.sort((a, b) => a.diff - b.diff)
    return diffs[0].tier
  }

  return 'PURSUIT'
}
