import { prisma } from '@/lib/prisma'
import type { CoachingTier } from '@/generated/prisma'

/**
 * Tier-based content gating.
 *
 * CoachingTier is ordered: FREE < PURSUIT < ASCENT < PINNACLE. A student can
 * access content whose requiredTier is at or below their own tier; content with
 * requiredTier = null has no tier restriction (enrollment/accessLevel rules
 * still apply separately).
 */

const TIER_ORDER: Record<CoachingTier, number> = {
  FREE: 0,
  PURSUIT: 1,
  ASCENT: 2,
  PINNACLE: 3,
}

export function hasTierAccess(
  userTier: CoachingTier | null | undefined,
  requiredTier: CoachingTier | null | undefined
): boolean {
  if (!requiredTier) return true // unrestricted content
  return TIER_ORDER[userTier || 'FREE'] >= TIER_ORDER[requiredTier]
}

/** The signed-in user's coaching tier (FREE when unknown). */
export async function getUserTier(userId: string): Promise<CoachingTier> {
  try {
    const user = await prisma.users.findUnique({
      where: { id: userId },
      select: { coachingTier: true },
    })
    return user?.coachingTier || 'FREE'
  } catch {
    return 'FREE'
  }
}

/** Human label used in upgrade messages. */
export function tierLabel(tier: CoachingTier): string {
  const labels: Record<CoachingTier, string> = {
    FREE: 'Free',
    PURSUIT: 'Pursuit',
    ASCENT: 'Ascent',
    PINNACLE: 'Pinnacle',
  }
  return labels[tier]
}
