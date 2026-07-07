import { NextRequest, NextResponse } from 'next/server'
import { authenticateStaff } from '@/lib/auth/staff-auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { mentionedUserIds, stripMentionMarkup } from '@/lib/staff/mentions'
import { notifyStaff } from '@/lib/staff/notify'

export const dynamic = 'force-dynamic'

async function requireMembership(channelId: string, userId: string, isAdmin: boolean) {
  const membership = await prisma.staff_channel_members.findUnique({
    where: { channelId_userId: { channelId, userId } },
    include: { channel: { select: { id: true, name: true, isArchived: true } } },
  })
  if (membership) return membership.channel
  if (isAdmin) {
    // ADMIN may view any channel for oversight.
    return prisma.staff_channels.findUnique({
      where: { id: channelId },
      select: { id: true, name: true, isArchived: true },
    })
  }
  return null
}

/**
 * GET /api/staff/channels/[id]/messages?after=<ISO>&limit=50
 * Timestamp-cursor pattern (same as the proven quiz chat): `after` = the
 * incremental poll (asc), `before` = backfill older history (desc→reverse).
 */
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authResult = await authenticateStaff()
  if ('error' in authResult) return authResult.error
  const { session } = authResult

  try {
    const { id } = await params
    const channel = await requireMembership(id, session.userId, session.role === 'ADMIN')
    if (!channel) {
      return NextResponse.json({ success: false, error: 'Channel not found' }, { status: 404 })
    }

    const { searchParams } = new URL(request.url)
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '50', 10)))
    const after = searchParams.get('after')
    const before = searchParams.get('before')
    const afterDate = after ? new Date(after) : null
    const beforeDate = before ? new Date(before) : null

    const isIncremental = afterDate && !isNaN(afterDate.getTime())
    const messages = await prisma.staff_messages.findMany({
      where: {
        channelId: id,
        // gte, not gt: two messages can share a millisecond; the client
        // dedupes by id, so re-including the boundary message is safe while
        // gt would permanently skip its same-ms sibling.
        ...(isIncremental ? { createdAt: { gte: afterDate! } } : {}),
        ...(beforeDate && !isNaN(beforeDate.getTime()) ? { createdAt: { lt: beforeDate } } : {}),
      },
      orderBy: { createdAt: isIncremental ? 'asc' : 'desc' },
      take: limit,
      include: { sender: { select: { id: true, name: true, role: true } } },
    })

    const ordered = isIncremental ? messages : messages.reverse()

    return NextResponse.json({
      success: true,
      data: {
        messages: ordered.map((m) =>
          m.deletedAt
            ? { id: m.id, deleted: true, createdAt: m.createdAt, sender: m.sender }
            : {
                id: m.id,
                content: m.content,
                mentionedUserIds: m.mentionedUserIds,
                attachments: m.attachments,
                editedAt: m.editedAt,
                createdAt: m.createdAt,
                sender: m.sender,
              }
        ),
        hasMore: !isIncremental && messages.length === limit,
      },
    })
  } catch (error) {
    console.error('[staff/channels/messages] GET failed:', error)
    return NextResponse.json({ success: false, error: 'Failed to load messages' }, { status: 500 })
  }
}

const postSchema = z.object({
  content: z.string().min(1).max(4000),
  attachments: z.array(z.string().url()).max(5).optional(),
})

function rand(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
}

/**
 * POST /api/staff/channels/[id]/messages — one transaction: create message,
 * bump channel.lastMessageAt + sender's own watermark; then mention fanout.
 * Returns the created message so the client appends without waiting a poll.
 */
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authResult = await authenticateStaff()
  if ('error' in authResult) return authResult.error
  const { session } = authResult

  try {
    const { id } = await params
    // Posting requires actual membership (ADMIN oversight is read-only).
    const membership = await prisma.staff_channel_members.findUnique({
      where: { channelId_userId: { channelId: id, userId: session.userId } },
      include: { channel: { select: { name: true, isArchived: true } } },
    })
    if (!membership || membership.channel.isArchived) {
      return NextResponse.json(
        { success: false, error: 'You are not a member of this channel' },
        { status: 403 }
      )
    }

    const parsed = postSchema.safeParse(await request.json())
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 })
    }

    const mentions = mentionedUserIds(parsed.data.content)
    const now = new Date()

    const message = await prisma.$transaction(async (tx) => {
      const created = await tx.staff_messages.create({
        data: {
          id: rand('smsg'),
          channelId: id,
          senderId: session.userId,
          content: parsed.data.content,
          mentionedUserIds: mentions,
          attachments: parsed.data.attachments || [],
        },
        include: { sender: { select: { id: true, name: true, role: true } } },
      })
      await tx.staff_channels.update({
        where: { id },
        data: { lastMessageAt: now },
      })
      await tx.staff_channel_members.update({
        where: { channelId_userId: { channelId: id, userId: session.userId } },
        data: { lastReadAt: now },
      })
      return created
    })

    if (mentions.length > 0) {
      void notifyStaff({
        userIds: mentions,
        type: 'MENTION_CHAT',
        title: `${session.name || 'A teammate'} mentioned you in #${membership.channel.name}`,
        body: stripMentionMarkup(parsed.data.content).slice(0, 200),
        href: '/admin/team-chat',
        actorId: session.userId,
        channelId: id,
      })
    }

    return NextResponse.json({ success: true, data: { message } }, { status: 201 })
  } catch (error) {
    console.error('[staff/channels/messages] POST failed:', error)
    return NextResponse.json({ success: false, error: 'Failed to send message' }, { status: 500 })
  }
}
