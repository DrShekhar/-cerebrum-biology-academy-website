/**
 * Persist WhatsApp delivery-status callbacks onto the stored message rows so a
 * counselor can SEE when a message didn't land.
 *
 * Before this, Meta/Interakt status callbacks (including `failed` — how the
 * out-of-24h-window error 131047 arrives, since the send API returns success
 * synchronously) went to an in-memory Map + console.log. The inbox wrote 'SENT'
 * and it never changed, so a reply that died outside the window showed SENT
 * forever and the lead quietly went cold.
 *
 * Keyed by the provider message id (wamid): whatsapp_messages.messageId (unique,
 * the Team Inbox thread) and crm_communications.whatsappMessageId (the lead
 * timeline). Status only moves forward (a late `delivered` can't clobber a
 * `read`); FAILED is terminal and always recorded. Never throws.
 */

import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/utils/logger'

type DeliveryStatus = 'SENT' | 'DELIVERED' | 'READ' | 'FAILED'

/** Provider status string (Meta: sent/delivered/read/failed; Interakt also
 * sends 'undelivered') → our enum. */
const STATUS_MAP: Record<string, DeliveryStatus> = {
  sent: 'SENT',
  delivered: 'DELIVERED',
  read: 'READ',
  opened: 'READ',
  failed: 'FAILED',
  undelivered: 'FAILED',
}

/** Statuses a given status is allowed to overwrite (strictly lower rank). */
const LOWER_THAN: Record<Exclude<DeliveryStatus, 'FAILED'>, DeliveryStatus[]> = {
  SENT: ['PENDING' as DeliveryStatus],
  DELIVERED: ['PENDING' as DeliveryStatus, 'SENT'],
  READ: ['PENDING' as DeliveryStatus, 'SENT', 'DELIVERED'],
}

export interface DeliveryStatusInput {
  providerMessageId?: string | null
  /** Raw provider status string, e.g. 'delivered' | 'failed'. */
  status: string
  /** Human-readable failure reason (Meta errors[].title/message), if any. */
  errorMessage?: string | null
}

export async function persistWhatsAppDeliveryStatus(input: DeliveryStatusInput): Promise<void> {
  try {
    const wamid = input.providerMessageId
    if (!wamid) return
    const mapped = STATUS_MAP[(input.status || '').toLowerCase()]
    if (!mapped) return

    if (mapped === 'FAILED') {
      // Terminal — record on both surfaces unless already FAILED.
      const [msg, comm] = await Promise.all([
        prisma.whatsapp_messages.updateMany({
          where: { messageId: wamid, status: { not: 'FAILED' } },
          data: { status: 'FAILED' },
        }),
        prisma.crm_communications.updateMany({
          where: { whatsappMessageId: wamid, status: { not: 'FAILED' } },
          data: { status: 'FAILED' },
        }),
      ])
      logger.warn('WhatsApp message delivery FAILED', {
        service: 'whatsapp-status',
        providerMessageId: wamid,
        error: input.errorMessage || undefined,
        inboxRowsUpdated: msg.count,
        timelineRowsUpdated: comm.count,
      })
      return
    }

    // Forward-only advance for sent/delivered/read.
    const overwrites = LOWER_THAN[mapped]
    await Promise.all([
      prisma.whatsapp_messages.updateMany({
        where: { messageId: wamid, status: { in: overwrites } },
        data: { status: mapped },
      }),
      prisma.crm_communications.updateMany({
        where: { whatsappMessageId: wamid, status: { in: overwrites } },
        data: { status: mapped },
      }),
    ])
  } catch (error) {
    logger.error('persistWhatsAppDeliveryStatus failed', {
      service: 'whatsapp-status',
      error: error instanceof Error ? error.message : String(error),
    })
  }
}
