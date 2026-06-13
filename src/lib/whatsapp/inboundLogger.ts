import { randomUUID } from 'crypto'
import { prisma } from '@/lib/prisma'

interface InboundLogInput {
  /** E.164-ish phone the message was sent from (with or without leading +) */
  fromPhone: string
  /** Text body or extracted text content; for media-only messages pass a label like "[Image]" */
  message: string
  /** Provider's message id, used for de-duplication via whatsappMessageId */
  providerMessageId?: string
  /** ISO timestamp of when the message was sent, if available */
  sentAt?: Date
  /** Media URLs (e.g., S3-hosted recordings, images). Stored on crm_communications.attachments */
  attachments?: string[]
}

interface InboundLogResult {
  /** "logged" → matched a lead and wrote a crm_communications row */
  /** "unmatched" → phone not in CRM; nothing written. Caller may still respond. */
  /** "duplicate" → already logged this providerMessageId; skipped. */
  /** "skipped" → no assigned counselor or other reason we can't log. */
  outcome: 'logged' | 'unmatched' | 'duplicate' | 'skipped'
  leadId?: string
  communicationId?: string
}

/**
 * Last-10-digits normalization. Leads are stored with various phone
 * formats (+91 88264 44334, 918826444334, 8826444334, etc.); WhatsApp
 * webhooks deliver E.164 without +. Matching by last 10 digits handles
 * Indian numbers reliably; international leads will need their own
 * normalization. Keeping this small + intentional.
 */
function normalize(phone: string): string {
  return phone.replace(/[^0-9]/g, '').slice(-10)
}

/**
 * Log an inbound WhatsApp message to crm_communications, routed to the
 * lead identified by phone number. Idempotent on providerMessageId.
 *
 * Failure mode is "skip + return outcome" — never throw. The webhook
 * caller has other work to do (AI replies, intent routing, etc.) and
 * we don't want CRM logging to break those flows.
 */
export async function logInboundWhatsAppMessage(input: InboundLogInput): Promise<InboundLogResult> {
  try {
    const last10 = normalize(input.fromPhone)
    if (last10.length < 10) {
      return { outcome: 'skipped' }
    }

    // Dedupe by providerMessageId to survive webhook retries.
    if (input.providerMessageId) {
      const existing = await prisma.crm_communications.findFirst({
        where: { whatsappMessageId: input.providerMessageId },
        select: { id: true, leadId: true },
      })
      if (existing) {
        return {
          outcome: 'duplicate',
          leadId: existing.leadId,
          communicationId: existing.id,
        }
      }
    }

    // Match lead by last-10 normalized phone. There may be duplicates;
    // pick most recently active. Indexed on `phone`.
    const candidates = await prisma.leads.findMany({
      where: {
        OR: [{ phone: last10 }, { phone: { endsWith: last10 } }],
      },
      orderBy: { updatedAt: 'desc' },
      take: 1,
      select: { id: true, assignedToId: true },
    })

    const lead = candidates[0]
    if (!lead) {
      return { outcome: 'unmatched' }
    }

    // `sentById` is FK-required. For inbound, attribute to the lead's
    // owner — they "own" the thread and the direction field already
    // marks this as coming from the student/parent, not the counselor.
    if (!lead.assignedToId) {
      return { outcome: 'skipped' }
    }

    const created = await prisma.crm_communications.create({
      data: {
        id: randomUUID(),
        leadId: lead.id,
        type: 'WHATSAPP',
        direction: 'INBOUND',
        message: input.message.slice(0, 4000), // safety cap
        status: 'DELIVERED',
        sentById: lead.assignedToId,
        sentAt: input.sentAt ?? new Date(),
        whatsappMessageId: input.providerMessageId,
        attachments: input.attachments ?? [],
      },
      select: { id: true },
    })

    // Bump lead.lastContactedAt so the counselor sees this lead at the
    // top of their queue next time.
    await prisma.leads.update({
      where: { id: lead.id },
      data: { lastContactedAt: new Date() },
    })

    return { outcome: 'logged', leadId: lead.id, communicationId: created.id }
  } catch (error) {
    console.error('[inboundLogger] Failed to log inbound WhatsApp:', error)
    return { outcome: 'skipped' }
  }
}
