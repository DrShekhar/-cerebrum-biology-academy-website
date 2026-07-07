/**
 * Inbound WhatsApp → CRM lead engine (Wave 1 of the smart-CRM plan).
 *
 * Every inbound WhatsApp message now:
 *  1. upserts a CRM lead by phone (canonical dedup path — a known lead is
 *     touched, an unknown phone becomes a fresh WHATSAPP-source lead with
 *     round-robin counselor assignment),
 *  2. upserts the whatsapp_conversations thread (leadId + counselor +
 *     lastMessageAt) and appends the whatsapp_messages row (idempotent on
 *     provider message id),
 *  3. rings the assigned counselor's staff bell (WHATSAPP_INBOUND).
 *
 * Never throws — the webhook's auto-reply path must survive any CRM failure.
 */

import { randomUUID } from 'crypto'
import { prisma } from '@/lib/prisma'
import { upsertLead } from '@/lib/leads/upsertLead'
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

    // 1. Canonical lead write: dedup by phone; new phones become real leads
    //    with counselor assignment, scoring, and the FOLLOW_UP_CALL task.
    const lead = await upsertLead({
      name: input.profileName?.trim() || `WhatsApp Lead ${digits.slice(-4)}`,
      phone: input.phone,
      email: null,
      courseInterest: 'WhatsApp Enquiry',
      source: 'whatsapp-inbound',
      message: input.message.slice(0, 500),
    })
    if (!lead?.leadId) return empty

    const leadRow = await prisma.leads.findUnique({
      where: { id: lead.leadId },
      select: { id: true, studentName: true, assignedToId: true },
    })
    if (!leadRow) return empty

    // 2. Conversation thread upsert (by phone last-10) + message append.
    let conversation = await prisma.whatsapp_conversations.findFirst({
      where: { phone: { endsWith: digits } },
      select: { id: true, assignedCounselorId: true },
    })
    if (!conversation) {
      conversation = await prisma.whatsapp_conversations.create({
        data: {
          id: randomUUID(),
          phone: input.phone,
          leadId: leadRow.id,
          assignedCounselorId: leadRow.assignedToId,
          lastMessageAt: new Date(),
          updatedAt: new Date(),
        },
        select: { id: true, assignedCounselorId: true },
      })
    } else {
      await prisma.whatsapp_conversations.update({
        where: { id: conversation.id },
        data: {
          leadId: leadRow.id,
          assignedCounselorId: conversation.assignedCounselorId || leadRow.assignedToId,
          lastMessageAt: new Date(),
          status: 'ACTIVE',
          updatedAt: new Date(),
        },
      })
    }

    // Idempotent append (messageId is unique; webhook retries are no-ops).
    if (input.providerMessageId) {
      const dupe = await prisma.whatsapp_messages.findUnique({
        where: { messageId: input.providerMessageId },
        select: { id: true },
      })
      if (dupe) {
        return { leadId: leadRow.id, conversationId: conversation.id, createdLead: false }
      }
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

    // 3. Bell the counselor who owns the thread (fall back to lead assignee).
    const counselorId = conversation.assignedCounselorId || leadRow.assignedToId
    if (counselorId) {
      await notifyStaff({
        userIds: [counselorId],
        type: 'WHATSAPP_INBOUND',
        title: `WhatsApp from ${leadRow.studentName}`,
        body: input.message.slice(0, 140),
        href: `/counselor/whatsapp-inbox?conversation=${conversation.id}`,
        leadId: leadRow.id,
      })
    }

    return { leadId: leadRow.id, conversationId: conversation.id, createdLead: !!lead.created }
  } catch (error) {
    logger.error('inbound WhatsApp lead capture failed', {
      service: 'inbound-lead-capture',
      error: error instanceof Error ? error.message : String(error),
    })
    return empty
  }
}
