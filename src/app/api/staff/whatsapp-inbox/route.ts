import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { randomUUID } from 'crypto'
import { prisma } from '@/lib/prisma'
import { authenticateStaff } from '@/lib/auth/staff-auth'
import { sendWhatsAppMessage } from '@/lib/interakt'
import { mentionedUserIds, stripMentionMarkup } from '@/lib/staff/mentions'
import { notifyStaff } from '@/lib/staff/notify'

/**
 * Shared WhatsApp TEAM inbox v2 — one number, whole team (WHATSAPP_INBOX_V2
 * plan, Phase 1). All staff can see every thread; replying to a thread that
 * belongs to someone else performs a transparent TAKEOVER (system event in
 * the thread). Internal notes (never sent to WhatsApp) interleave in the
 * thread with @mention fanout to the staff bell.
 *
 * GET  ?tab=mine|unassigned|all        — conversation list + queue counts
 * GET  ?conversationId=…               — full thread (all staff)
 * POST { conversationId, message, type: 'reply'|'note' }
 * PATCH { conversationId, action: 'assign'|'close'|'reopen', assigneeId? }
 */

const SYSTEM_EVENT = 'system_event'
const INTERNAL_NOTE = 'internal_note'

async function addSystemEvent(conversationId: string, phone: string, text: string) {
  try {
    await prisma.whatsapp_messages.create({
      data: {
        id: randomUUID(),
        conversationId,
        phone,
        direction: 'OUTBOUND',
        content: text,
        messageType: SYSTEM_EVENT,
        status: 'SENT',
      },
    })
  } catch (error) {
    console.error('[whatsapp-inbox] system event failed:', error)
  }
}

export async function GET(request: NextRequest) {
  const authResult = await authenticateStaff()
  if ('error' in authResult) return authResult.error
  const { session } = authResult

  try {
    const conversationId = request.nextUrl.searchParams.get('conversationId')

    if (conversationId) {
      // Team model: every staff member can view every thread — actions are
      // attributed and takeovers are logged, so transparency replaces walls.
      const conversation = await prisma.whatsapp_conversations.findUnique({
        where: { id: conversationId },
        include: {
          leads: { select: { id: true, studentName: true, courseInterest: true, stage: true } },
          users: { select: { id: true, name: true } },
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
              users: { select: { id: true, name: true } },
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
      return NextResponse.json({ success: true, data: { conversation } })
    }

    // List view with queue tabs + counts.
    const tab = request.nextUrl.searchParams.get('tab') || 'mine'
    const tabWhere =
      tab === 'unassigned'
        ? { assignedCounselorId: null }
        : tab === 'all'
          ? {}
          : { assignedCounselorId: session.userId }

    const [conversations, unassignedCount, mineCount, allCount] = await Promise.all([
      prisma.whatsapp_conversations.findMany({
        where: tabWhere,
        orderBy: { lastMessageAt: 'desc' },
        take: 100,
        include: {
          leads: { select: { id: true, studentName: true, stage: true } },
          users: { select: { id: true, name: true } },
          whatsapp_messages: {
            orderBy: { timestamp: 'desc' },
            take: 1,
            where: { messageType: { notIn: [SYSTEM_EVENT, INTERNAL_NOTE] } },
            select: { content: true, direction: true, timestamp: true },
          },
        },
      }),
      prisma.whatsapp_conversations.count({ where: { assignedCounselorId: null } }),
      prisma.whatsapp_conversations.count({ where: { assignedCounselorId: session.userId } }),
      prisma.whatsapp_conversations.count(),
    ])

    return NextResponse.json({
      success: true,
      data: {
        counts: { unassigned: unassignedCount, mine: mineCount, all: allCount },
        conversations: conversations.map((c) => ({
          id: c.id,
          phone: c.phone,
          status: c.status,
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
  type: z.enum(['reply', 'note']).optional().default('reply'),
})

export async function POST(request: NextRequest) {
  const authResult = await authenticateStaff()
  if ('error' in authResult) return authResult.error
  const { session } = authResult

  const parsed = postSchema.safeParse(await request.json().catch(() => ({})))
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: 'Invalid message' }, { status: 400 })
  }

  try {
    const conversation = await prisma.whatsapp_conversations.findUnique({
      where: { id: parsed.data.conversationId },
      select: {
        id: true,
        phone: true,
        leadId: true,
        status: true,
        assignedCounselorId: true,
        users: { select: { id: true, name: true } },
      },
    })
    if (!conversation) {
      return NextResponse.json({ success: false, error: 'Conversation not found' }, { status: 404 })
    }

    // ── Internal note: never sent to WhatsApp; @mentions ring the staff bell.
    if (parsed.data.type === 'note') {
      const message = await prisma.whatsapp_messages.create({
        data: {
          id: randomUUID(),
          conversationId: conversation.id,
          phone: conversation.phone,
          direction: 'OUTBOUND',
          content: parsed.data.message,
          messageType: INTERNAL_NOTE,
          status: 'SENT',
          sentBy: session.userId,
        },
        select: { id: true, content: true, timestamp: true },
      })

      const mentioned = mentionedUserIds(parsed.data.message)
      if (mentioned.length > 0) {
        void notifyStaff({
          userIds: mentioned,
          type: 'MENTION_CHAT',
          title: `${session.name || 'A teammate'} mentioned you on a WhatsApp thread`,
          body: stripMentionMarkup(parsed.data.message).slice(0, 300),
          href: `/counselor/whatsapp-inbox?conversation=${conversation.id}`,
          actorId: session.userId,
          leadId: conversation.leadId,
        })
      }
      return NextResponse.json({ success: true, data: { message } })
    }

    // ── Reply: any staff member can continue any conversation. Replying to a
    // thread owned by someone else = transparent takeover (event + reassign).
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

    const previousOwnerId = conversation.assignedCounselorId
    const isTakeover = !!previousOwnerId && previousOwnerId !== session.userId

    await prisma.whatsapp_conversations.update({
      where: { id: conversation.id },
      data: {
        lastMessageAt: new Date(),
        // First reply claims an unassigned thread; replying to someone
        // else's thread takes it over (logged below).
        assignedCounselorId: session.userId,
        status: 'ACTIVE',
        updatedAt: new Date(),
      },
    })
    if (isTakeover) {
      await addSystemEvent(
        conversation.id,
        conversation.phone,
        `${session.name || 'A teammate'} took over from ${conversation.users?.name || 'the previous owner'}`
      )
      void notifyStaff({
        userIds: [previousOwnerId],
        type: 'SYSTEM',
        title: `${session.name || 'A teammate'} took over a WhatsApp thread`,
        body: `The conversation with ${conversation.phone} is now handled by ${session.name || 'them'}.`,
        href: `/counselor/whatsapp-inbox?conversation=${conversation.id}`,
        actorId: session.userId,
        leadId: conversation.leadId,
      })
    }
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

const patchSchema = z.object({
  conversationId: z.string().min(1),
  action: z.enum(['assign', 'close', 'reopen']),
  assigneeId: z.string().nullable().optional(),
})

export async function PATCH(request: NextRequest) {
  const authResult = await authenticateStaff()
  if ('error' in authResult) return authResult.error
  const { session } = authResult

  const parsed = patchSchema.safeParse(await request.json().catch(() => ({})))
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 })
  }
  const { conversationId, action, assigneeId } = parsed.data

  try {
    const conversation = await prisma.whatsapp_conversations.findUnique({
      where: { id: conversationId },
      select: {
        id: true,
        phone: true,
        leadId: true,
        status: true,
        users: { select: { id: true, name: true } },
      },
    })
    if (!conversation) {
      return NextResponse.json({ success: false, error: 'Conversation not found' }, { status: 404 })
    }

    if (action === 'assign') {
      let assignee: { id: string; name: string } | null = null
      if (assigneeId) {
        assignee = await prisma.users.findFirst({
          where: { id: assigneeId, role: { in: ['ADMIN', 'COUNSELOR', 'TEACHER'] } },
          select: { id: true, name: true },
        })
        if (!assignee) {
          return NextResponse.json(
            { success: false, error: 'Assignee must be a staff member' },
            { status: 400 }
          )
        }
      }
      await prisma.whatsapp_conversations.update({
        where: { id: conversationId },
        data: { assignedCounselorId: assignee?.id || null, updatedAt: new Date() },
      })
      await addSystemEvent(
        conversationId,
        conversation.phone,
        assignee
          ? `${session.name || 'A teammate'} assigned this conversation to ${assignee.name}`
          : `${session.name || 'A teammate'} moved this conversation to Unassigned`
      )
      if (assignee && assignee.id !== session.userId) {
        void notifyStaff({
          userIds: [assignee.id],
          type: 'SYSTEM',
          title: 'WhatsApp conversation assigned to you',
          body: `${session.name || 'A teammate'} assigned you the conversation with ${conversation.phone}.`,
          href: `/counselor/whatsapp-inbox?conversation=${conversationId}`,
          actorId: session.userId,
          leadId: conversation.leadId,
        })
      }
      return NextResponse.json({ success: true })
    }

    // close / reopen
    const newStatus = action === 'close' ? 'CLOSED' : 'ACTIVE'
    if (conversation.status !== newStatus) {
      await prisma.whatsapp_conversations.update({
        where: { id: conversationId },
        data: { status: newStatus, updatedAt: new Date() },
      })
      await addSystemEvent(
        conversationId,
        conversation.phone,
        `${session.name || 'A teammate'} ${action === 'close' ? 'resolved' : 'reopened'} this conversation`
      )
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[staff/whatsapp-inbox] PATCH failed:', error)
    return NextResponse.json({ success: false, error: 'Action failed' }, { status: 500 })
  }
}
