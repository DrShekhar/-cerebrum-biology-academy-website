/**
 * WhatsApp consent / stop-on-reply enforcement (audit H3).
 *
 * Two protections, both previously missing:
 *  1. OPT-OUT — a lead who texts STOP/UNSUBSCRIBE is recorded in
 *     whatsapp_opt_outs and receives NO further automated marketing (DPDP +
 *     WhatsApp Commerce Policy). START re-subscribes.
 *  2. STOP-ON-REPLY — once a lead replies on WhatsApp a human is engaged, so the
 *     automated welcome series / drips must stop for them.
 *
 * All functions are defensive: they never throw (a suppression-check failure
 * must not break a webhook or a cron), and they fail OPEN only for the
 * not-yet-migrated case (P2021 — the whatsapp_opt_outs table is a pending
 * manual migration) so nothing crashes before the owner applies it.
 */

import { randomUUID } from 'crypto'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/utils/logger'

const last10 = (phone: string) => (phone || '').replace(/\D/g, '').slice(-10)

function isMissingTable(error: unknown): boolean {
  return (error as { code?: unknown } | null)?.code === 'P2021'
}

// Exact-match consent keywords (case-insensitive, trimmed). Kept to exact
// matches so a normal question containing the word "stop" isn't misread.
const STOP_KEYWORDS = new Set([
  'stop',
  'unsubscribe',
  'unsub',
  'optout',
  'opt out',
  'opt-out',
  'cancel',
  'quit',
  'end',
  'stop promotions',
  'stop all',
])
const START_KEYWORDS = new Set([
  'start',
  'unstop',
  'subscribe',
  'resubscribe',
  'resume',
  'optin',
  'opt in',
  'opt-in',
])

export type ConsentIntent = 'STOP' | 'START' | null

/** Classify an inbound text as a STOP/START consent command, or null. */
export function classifyConsentMessage(text?: string | null): ConsentIntent {
  const t = (text || '').trim().toLowerCase()
  if (!t) return null
  if (STOP_KEYWORDS.has(t)) return 'STOP'
  if (START_KEYWORDS.has(t)) return 'START'
  return null
}

/** True if the phone has opted out. Fail-open (false) so sends aren't wrongly blocked. */
export async function isPhoneOptedOut(phone: string): Promise<boolean> {
  const p = last10(phone)
  if (p.length < 10) return false
  try {
    const row = await prisma.whatsapp_opt_outs.findUnique({
      where: { phone: p },
      select: { phone: true },
    })
    return !!row
  } catch (error) {
    if (isMissingTable(error)) return false // migration pending — don't block sends
    logger.error('isPhoneOptedOut failed', {
      service: 'whatsapp-optout',
      error: error instanceof Error ? error.message : String(error),
    })
    return false
  }
}

/** Record an opt-out (idempotent on phone). */
export async function optOutPhone(phone: string, reason = 'user_stop'): Promise<void> {
  const p = last10(phone)
  if (p.length < 10) return
  try {
    await prisma.whatsapp_opt_outs.upsert({
      where: { phone: p },
      create: { id: randomUUID(), phone: p, reason },
      update: { reason },
    })
    logger.info('WhatsApp opt-out recorded', { service: 'whatsapp-optout', reason })
  } catch (error) {
    if (!isMissingTable(error)) {
      logger.error('optOutPhone failed', {
        service: 'whatsapp-optout',
        error: error instanceof Error ? error.message : String(error),
      })
    }
  }
}

/** Remove an opt-out (re-subscribe). */
export async function optInPhone(phone: string): Promise<void> {
  const p = last10(phone)
  if (p.length < 10) return
  try {
    await prisma.whatsapp_opt_outs.deleteMany({ where: { phone: p } })
  } catch (error) {
    if (!isMissingTable(error)) {
      logger.error('optInPhone failed', {
        service: 'whatsapp-optout',
        error: error instanceof Error ? error.message : String(error),
      })
    }
  }
}

/** True if the lead has ever sent an inbound WhatsApp message (a human is engaged). */
export async function hasInboundWhatsAppReply(phone: string): Promise<boolean> {
  const p = last10(phone)
  if (p.length < 10) return false
  try {
    const row = await prisma.whatsapp_messages.findFirst({
      where: { direction: 'INBOUND', phone: { endsWith: p } },
      select: { id: true },
    })
    return !!row
  } catch (error) {
    logger.error('hasInboundWhatsAppReply failed', {
      service: 'whatsapp-optout',
      error: error instanceof Error ? error.message : String(error),
    })
    return false
  }
}

/**
 * The single gate every automated-WhatsApp send path calls before sending to a
 * lead: suppress if the lead opted out OR has replied (stop-on-reply). Never
 * throws; on an unexpected error returns { suppress: false } so a transient
 * failure doesn't silently halt all sends.
 */
export async function shouldSuppressAutomatedWhatsApp(
  phone: string
): Promise<{ suppress: boolean; reason?: 'opted_out' | 'replied' }> {
  if (await isPhoneOptedOut(phone)) return { suppress: true, reason: 'opted_out' }
  if (await hasInboundWhatsAppReply(phone)) return { suppress: true, reason: 'replied' }
  return { suppress: false }
}

/**
 * Immediately cancel a phone's PENDING drip queue rows (stop-on-reply / opt-out
 * takes effect now, not just at the next send-gate check). Matches by the lead's
 * last-10 phone. Never throws.
 */
export async function cancelPendingSequencesForPhone(phone: string): Promise<number> {
  const p = last10(phone)
  if (p.length < 10) return 0
  try {
    const result = await prisma.followup_queue.updateMany({
      where: { status: 'PENDING', leads: { phone: { endsWith: p } } },
      data: { status: 'CANCELLED', completedAt: new Date(), updatedAt: new Date() },
    })
    return result.count
  } catch (error) {
    logger.error('cancelPendingSequencesForPhone failed', {
      service: 'whatsapp-optout',
      error: error instanceof Error ? error.message : String(error),
    })
    return 0
  }
}
