/**
 * Meta Conversions API feedback (smart-CRM wave 3) — fires server-side
 * conversion events on CRM stage transitions so Meta optimizes ad delivery
 * on DEMOS and ENROLLMENTS instead of clicks/leads.
 *
 * Env-gated: requires META_CAPI_ACCESS_TOKEN + META_PIXEL_ID. Without them
 * every call is a silent no-op (same skip-contract as WhatsApp). Never
 * throws — attribution must never break a lead write.
 *
 * User data is SHA-256 hashed per Meta spec (phone digits, lowercased email).
 */

import { createHash } from 'crypto'
import { logger } from '@/lib/utils/logger'

const GRAPH_VERSION = 'v21.0'

export type CapiEventName = 'Lead' | 'Schedule' | 'Purchase'

export interface CapiEventInput {
  eventName: CapiEventName
  phone?: string | null
  email?: string | null
  /** Meta click id (fbclid, formatted or raw) if captured on the lead. */
  fbclid?: string | null
  /** Monetary value in INR for Purchase events. */
  value?: number
  /** Stable id for dedup across retries (e.g. `${leadId}:${stage}`). */
  eventId: string
  sourceUrl?: string
}

const sha256 = (v: string) => createHash('sha256').update(v).digest('hex')

export function isCapiConfigured(): boolean {
  return Boolean(process.env.META_CAPI_ACCESS_TOKEN && process.env.META_PIXEL_ID)
}

export async function sendCapiEvent(input: CapiEventInput): Promise<boolean> {
  if (!isCapiConfigured()) return false
  try {
    const userData: Record<string, unknown> = {}
    if (input.phone) {
      const digits = input.phone.replace(/[^0-9]/g, '')
      // Meta expects country-coded numbers; assume India for bare 10-digit.
      const e164 = digits.length === 10 ? `91${digits}` : digits
      userData.ph = [sha256(e164)]
    }
    if (input.email) userData.em = [sha256(input.email.trim().toLowerCase())]
    if (input.fbclid) {
      // fbc format: fb.1.<timestamp>.<fbclid> — pass through if already formatted.
      userData.fbc = input.fbclid.startsWith('fb.')
        ? input.fbclid
        : `fb.1.${Date.now()}.${input.fbclid}`
    }
    if (!userData.ph && !userData.em) return false // nothing to match on

    const body = {
      data: [
        {
          event_name: input.eventName,
          event_time: Math.floor(Date.now() / 1000),
          event_id: input.eventId,
          action_source: 'system_generated',
          event_source_url: input.sourceUrl || 'https://www.cerebrumbiologyacademy.com',
          user_data: userData,
          ...(input.eventName === 'Purchase'
            ? { custom_data: { currency: 'INR', value: input.value || 0 } }
            : {}),
        },
      ],
    }

    const res = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${process.env.META_PIXEL_ID}/events?access_token=${process.env.META_CAPI_ACCESS_TOKEN}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }
    )
    if (!res.ok) {
      const err = await res.text().catch(() => '')
      logger.warn('Meta CAPI event rejected', { service: 'meta-capi', status: res.status, err })
      return false
    }
    return true
  } catch (error) {
    logger.warn('Meta CAPI send failed', {
      service: 'meta-capi',
      error: error instanceof Error ? error.message : String(error),
    })
    return false
  }
}
