import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { randomUUID } from 'crypto'
import { prisma } from '@/lib/prisma'
import { authenticateStaff } from '@/lib/auth/staff-auth'
import { sendWhatsAppMessage } from '@/lib/interakt'

/**
 * Shared WhatsApp inbox (our Meritto-Echo) — counselors work inbound
 * WhatsApp threads from the CRM instead of a shared phone.
 *
 * GET  ?view=list                      — conversation list (role-scoped:
 *       COUNSELOR sees own threads + unassigned; ADMIN sees all)
 * GET  ?conversationId=…               — full thread, messages asc
 * POST { conversationId, message }     — reply; sends via the WhatsApp hub
 *       (Meta → Interakt fallback), records the OUTBOUND message, stamps the
 *       lead's lastContactedAt. 503 with env-var names when unconfigured.
 */

export async function GET(request: NextRequest) {
  const authResult = await authenticateStaff()
  if ('error' in authResult) return authResult.error
  const { session } = authResult
  const isAdmin = session.role === 'ADMIN'

  try {
    const conversationId = request.nextUrl.searchParams.get('conversationId')

    if (conversationId) {
      const conversation = await prisma.whatsapp_conversations.findUnique({
        where: { id: conversationId },
        include: {
          leads: { select: { id: true, studentName: true, courseInterest: true, stage: true } },
          whatsapp_messages: {
            orderBy: { timestamp: 'asc' },
            take: 200,
            select: {
              id: true,
              direction: true,
              content: true,
              messageType: true,
              status: true,
              timestamp: true,
              users: { select: { name: true } },
            },
          },
        },
      })
      if (!conversation) {
        return NextResponse.json(
          { success: false, error: 'Conversation not found' },
          { status: 404 }
        )
      }
      if (
        !isAdmin &&
        conversation.assignedCounselorId &&
        conversation.assignedCounselorId !== session.userId
      ) {
        return NextResponse.json(
          { success: false, error: 'This thread belongs to another counselor' },
          { status: 403 }
        )
      }
      return NextResponse.json({ success: true, data: { conversation } })
    }

    // List view — most recent first. Counselors see their threads plus
    // unassigned ones (so nothing sits invisible); admins see everything.
    const where = isAdmin
      ? {}
      : { OR: [{ assignedCounselorId: session.userId }, { assignedCounselorId: null }] }

    const conversations = await prisma.whatsapp_conversations.findMany({
      where,
      orderBy: { lastMessageAt: 'desc' },
      take: 100,
      include: {
        leads: { select: { id: true, studentName: true, stage: true } },
        users: { select: { id: true, name: true } },
        whatsapp_messages: {
          orderBy: { timestamp: 'desc' },
          take: 1,
          select: { content: true, direction: true, timestamp: true },
        },
      },
    })

    return NextResponse.json({
      success: true,
      data: {
        conversations: conversations.map((c) => ({
          id: c.id,
          phone: c.phone,
          lead: c.leads,
          counselor: c.users,
          lastMessageAt: c.lastMessageAt,
          lastMessage: c.whatsapp_messages[0] || null,
        })),
      },
    })
  } catch (error) {
    console.error('[staff/whatsapp-inbox] GET failed:', error)
    return NextResponse.json({ success: false, error: 'Failed to load inbox' }, { status: 500 })
  }
}

const postSchema = z.object({
  conversationId: z.string().min(1),
  message: z.string().min(1).max(4000),
})

export async function POST(request: NextRequest) {
  const authResult = await authenticateStaff()
  if ('error' in authResult) return authResult.error
  const { session } = authResult
  const isAdmin = session.role === 'ADMIN'

  const parsed = postSchema.safeParse(await request.json().catch(() => ({})))
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: 'Invalid message' }, { status: 400 })
  }

  try {
    const conversation = await prisma.whatsapp_conversations.findUnique({
      where: { id: parsed.data.conversationId },
      select: { id: true, phone: true, leadId: true, assignedCounselorId: true },
    })
    if (!conversation) {
      return NextResponse.json({ success: false, error: 'Conversation not found' }, { status: 404 })
    }
    if (
      !isAdmin &&
      conversation.assignedCounselorId &&
      conversation.assignedCounselorId !== session.userId
    ) {
      return NextResponse.json(
        { success: false, error: 'This thread belongs to another counselor' },
        { status: 403 }
      )
    }

    const result = await sendWhatsAppMessage({
      phone: conversation.phone,
      message: parsed.data.message,
    })
    if (!result.success) {
      const unconfigured = (result.error || '').toLowerCase().includes('not configured')
      return NextResponse.json(
        {
          success: false,
          error: unconfigured
            ? 'WhatsApp is not configured — set WHATSAPP_ACCESS_TOKEN + WHATSAPP_PHONE_NUMBER_ID (or INTERAKT_API_KEY)'
            : result.error || 'Send failed (outside the 24h window? Use a template.)',
        },
        { status: unconfigured ? 503 : 502 }
      )
    }

    const message = await prisma.whatsapp_messages.create({
      data: {
        id: randomUUID(),
        conversationId: conversation.id,
        messageId: result.messageId || null,
        phone: conversation.phone,
        direction: 'OUTBOUND',
        content: parsed.data.message,
        messageType: 'text',
        status: 'SENT',
        sentBy: session.userId,
      },
      select: { id: true, direction: true, content: true, status: true, timestamp: true },
    })

    await prisma.whatsapp_conversations.update({
      where: { id: conversation.id },
      data: {
        lastMessageAt: new Date(),
        // First reply claims an unassigned thread.
        assignedCounselorId: conversation.assignedCounselorId || session.userId,
        updatedAt: new Date(),
      },
    })
    if (conversation.leadId) {
      await prisma.leads.update({
        where: { id: conversation.leadId },
        data: { lastContactedAt: new Date(), updatedAt: new Date() },
      })
    }

    return NextResponse.json({ success: true, data: { message } })
  } catch (error) {
    console.error('[staff/whatsapp-inbox] POST failed:', error)
    return NextResponse.json({ success: false, error: 'Failed to send' }, { status: 500 })
  }
}
