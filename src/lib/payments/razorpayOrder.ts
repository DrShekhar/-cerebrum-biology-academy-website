import Razorpay from 'razorpay'
import { normalizeTier } from '@/lib/payments/tierMapping'
import type { CoachingTier } from '@/generated/prisma'

/**
 * Read the coaching tier the student actually selected, from the Razorpay ORDER
 * notes (set server-side in /api/enrollment/create-order). We fetch the order —
 * not the payment entity — because Razorpay does not reliably echo order notes
 * onto the payment entity, so payment.notes.tier is usually empty.
 *
 * Best-effort: returns null on any failure (missing creds, network, no note), so
 * the caller can fall back to the fee heuristic. Never throws.
 */
export async function fetchOrderTier(orderId: string): Promise<CoachingTier | null> {
  try {
    if (!orderId) return null
    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
    const keySecret = process.env.RAZORPAY_KEY_SECRET
    if (!keyId || !keySecret) return null

    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret })
    const order = await razorpay.orders.fetch(orderId)
    const notes = (order?.notes ?? {}) as Record<string, unknown>
    return normalizeTier(typeof notes.tier === 'string' ? notes.tier : null)
  } catch {
    return null
  }
}
