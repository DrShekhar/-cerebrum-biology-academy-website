/**
 * Current promotional offer for /online-neet-biology-coaching.
 *
 * Update `expiresAt` when the offer rolls — the landing page auto-hides
 * the scarcity banner after that date. Keeping the date real satisfies
 * Google Ads trust policy (perpetual "limited-time" offers are a
 * policy violation).
 *
 * To remove the offer entirely, set `active: false`.
 */

export interface OnlineNEETOffer {
  active: boolean
  headline: string
  subtext: string
  /** ISO date — offer hides after this moment. */
  expiresAt: string
  /** CTA parameter passed to gtag so campaign analytics can attribute. */
  promoCode: string
}

export const onlineNEETOffer: OnlineNEETOffer = {
  active: true,
  headline: 'Next batch starts May 2026',
  subtext: 'Enrol by 30 April 2026 for 20% off the first 3 months.',
  expiresAt: '2026-04-30T23:59:59+05:30',
  promoCode: 'NEET-ONLINE-APR26',
}

/** Returns the offer if it is active AND not expired, else null. */
export function getActiveOffer(): OnlineNEETOffer | null {
  if (!onlineNEETOffer.active) return null
  const now = Date.now()
  const expiry = Date.parse(onlineNEETOffer.expiresAt)
  if (Number.isFinite(expiry) && now > expiry) return null
  return onlineNEETOffer
}
