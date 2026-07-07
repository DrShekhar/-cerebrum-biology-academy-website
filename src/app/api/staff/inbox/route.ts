import { NextResponse } from 'next/server'
import { authenticateStaff } from '@/lib/auth/staff-auth'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

/**
 * GET /api/staff/inbox — the single cheap endpoint both bells poll (~15s).
 *
 * Cost on an idle poll: one indexed count + one membership fetch. Per-channel
 * unread counts are computed ONLY for channels whose denormalized
 * lastMessageAt is newer than the member's lastReadAt watermark.
 */
export async function GET() {
  const authResult = await authenticateStaff()
  if ('error' in authResult) return authResult.error
  const { session } = authResult

  try {
    const [notificationUnread, memberships] = await Promise.all([
      prisma.staff_notifications.count({
        where: { userId: session.userId, isRead: false },
      }),
      prisma.staff_channel_members.findMany({
        where: { userId: session.userId, channel: { isArchived: false } },
        select: {
          lastReadAt: true,
          channel: {
            select: { id: true, name: true, type: true, lastMessageAt: true },
          },
        },
      }),
    ])

    const staleMemberships = memberships.filter(
      (m) => m.channel.lastMessageAt && m.channel.lastMessageAt > m.lastReadAt
    )

    const unreadByChannel = new Map<string, number>()
    if (staleMemberships.length > 0) {
      const counts = await Promise.all(
        staleMemberships.map((m) =>
          prisma.staff_messages.count({
            where: {
              channelId: m.channel.id,
              createdAt: { gt: m.lastReadAt },
              deletedAt: null,
              senderId: { not: session.userId },
            },
          })
        )
      )
      staleMemberships.forEach((m, i) => unreadByChannel.set(m.channel.id, counts[i]))
    }

    const channels = memberships
      .map((m) => ({
        id: m.channel.id,
        name: m.channel.name,
        type: m.channel.type,
        lastMessageAt: m.channel.lastMessageAt,
        unread: unreadByChannel.get(m.channel.id) || 0,
      }))
      .sort((a, b) => (b.lastMessageAt?.getTime() || 0) - (a.lastMessageAt?.getTime() || 0))

    return NextResponse.json({
      success: true,
      data: {
        notificationUnread,
        channels,
        channelUnreadTotal: channels.reduce((sum, c) => sum + c.unread, 0),
        serverTime: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error('[staff/inbox] GET failed:', error)
    return NextResponse.json({ success: false, error: 'Failed to load inbox' }, { status: 500 })
  }
}
