/**
 * CerebrumAggregateRating — DISABLED (2026-06).
 *
 * This component injected an AggregateRating + fabricated sample reviews onto
 * the canonical #organization node. Self-serving review markup on an
 * Organization/LocalBusiness about yourself violates Google's review snippet
 * policy ("ratings must be sourced directly from users" + the reviewed entity
 * must not be the publisher), and the identical 5.0/485 across hubs was a
 * manual-action footprint — GSC had already flagged invalid review snippets
 * once before.
 *
 * The component now renders nothing. It is intentionally kept (rather than
 * deleted) so the many page-level imports keep compiling; remove the usages
 * at leisure. Real ratings belong on the Google Business Profile.
 */

interface CerebrumAggregateRatingProps {
  serviceName?: string
  reviews?: Array<{
    author: string
    score: string
    college: string
    quote: string
  }>
}

export function CerebrumAggregateRating(_props: CerebrumAggregateRatingProps) {
  return null
}
