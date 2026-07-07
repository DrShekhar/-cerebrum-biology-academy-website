/**
 * Inbound WhatsApp → CRM lead engine (Wave 1 of the smart-CRM plan).
 *
 * First message from an unknown phone creates a CRM lead (canonical dedup,
 * round-robin assignment, follow-up task, initial score) and a conversation
 * thread. EVERY message threads into whatsapp_conversations/whatsapp_messages
 * and bells the owning counselor.
 *
 * Deliberately NOT the upsertLead wrapper: an inbound message must not stamp
 * lastContactedAt (that means WE reached out — SLA/KPIs depend on it), must
 * not fire the welcome series (the webhook auto-reply already answers), must
 * not ping the admin per message, and must not emit a CAPI Lead for organic
 * chat. Subsequent messages skip the lead write entirely — no per-message
 * timeline spam or rescoring.
 *
 * Never throws — the webhook's auto-reply path must survive any CRM failure.
 */

import { randomUUID } from 'crypto'
import { prisma } from '@/lib/prisma'
import { upsertLeadCore } from '@/lib/leads/upsertLead'
import { updateLeadScore } from '@/lib/leadScoring'
import { notifyStaff } from '@/lib/staff/notify'
import { logger } from '@/lib/utils/logger'

export interface InboundCaptureInput {
  phone: string
  message: string
  messageType?: string
  providerMessageId?: string
  profileName?: string | null
}

export interface InboundCaptureResult {
  leadId: string | null
  conversationId: string | null
  createdLead: boolean
}

const last10 = (phone: string) => phone.replace(/[^0-9]/g, '').slice(-10)

export async function captureInboundWhatsAppLead(
  input: InboundCaptureInput
): Promise<InboundCaptureResult> {
  const empty: InboundCaptureResult = { leadId: null, conversationId: null, createdLead: false }
  try {
    const digits = last10(input.phone)
    if (digits.length < 10) return empty

    // Existing thread? (oldest first, so concurrent creates converge on one.)
    let conversation = await prisma.whatsapp_conversations.findFirst({
      where: { phone: { endsWith: digits } },
      orderBy: { createdAt: 'asc' },
      select: { id: true, leadId: true, assignedCounselorId: true },
    })

    let leadId = conversation?.leadId || null
    let counselorId = conversation?.assignedCounselorId || null
    let createdLead = false
    let leadName: string | null = null

    if (!conversation || !leadId) {
      // First contact (or legacy thread without a lead): one canonical lead
      // write. upsertLeadCore dedups by phone; a known lead is touched once.
      const result = await upsertLeadCore(prisma, {
        name: input.profileName?.trim() || `WhatsApp Lead ${digits.slice(-4)}`,
        phone: input.phone,
        email: null,
        courseInterest: 'WhatsApp Enquiry',
        source: 'whatsapp-inbound',
        message: input.message.slice(0, 500),
      })
      leadId = result.leadId
      createdLead = result.created
      counselorId = counselorId || result.assignedToId
      if (result.created) void updateLeadScore(result.leadId).catch(() => {})
    }

    if (!conversation) {
      await prisma.whatsapp_conversations.create({
        data: {
          id: randomUUID(),
          phone: input.phone,
          leadId,
          assignedCounselorId: counselorId,
          lastMessageAt: new Date(),
          updatedAt: new Date(),
        },
      })
      // Re-read oldest-first: if a concurrent webhook created a sibling
      // thread, everyone converges on the same (oldest) conversation.
      conversation = await prisma.whatsapp_conversations.findFirst({
        where: { phone: { endsWith: digits } },
        orderBy: { createdAt: 'asc' },
        select: { id: true, leadId: true, assignedCounselorId: true },
      })
      if (!conversation) return empty
    }

    await prisma.whatsapp_conversations.update({
      where: { id: conversation.id },
      data: {
        leadId: conversation.leadId || leadId,
        assignedCounselorId: conversation.assignedCounselorId || counselorId,
        lastMessageAt: new Date(),
        status: 'ACTIVE',
        updatedAt: new Date(),
      },
    })

    // Idempotent append (messageId unique; webhook retries are no-ops).
    if (input.providerMessageId) {
      const dupe = await prisma.whatsapp_messages.findUnique({
        where: { messageId: input.providerMessageId },
        select: { id: true },
      })
      if (dupe) return { leadId, conversationId: conversation.id, createdLead: false }
    }
    await prisma.whatsapp_messages.create({
      data: {
        id: randomUUID(),
        conversationId: conversation.id,
        messageId: input.providerMessageId || null,
        phone: input.phone,
        direction: 'INBOUND',
        content: input.message.slice(0, 4000),
        messageType: input.messageType || 'text',
        status: 'DELIVERED',
      },
    })

    const bellTo = conversation.assignedCounselorId || counselorId
    if (bellTo) {
      if (!leadName && leadId) {
        const row = await prisma.leads.findUnique({
          where: { id: leadId },
          select: { studentName: true },
        })
        leadName = row?.studentName || null
      }
      await notifyStaff({
        userIds: [bellTo],
        type: 'WHATSAPP_INBOUND',
        title: `WhatsApp from ${leadName || input.phone}`,
        body: input.message.slice(0, 140),
        href: `/counselor/whatsapp-inbox?conversation=${conversation.id}`,
        leadId,
      })
    }

    return { leadId, conversationId: conversation.id, createdLead }
  } catch (error) {
    logger.error('inbound WhatsApp lead capture failed', {
      service: 'inbound-lead-capture',
      error: error instanceof Error ? error.message : String(error),
    })
    return empty
  }
}
