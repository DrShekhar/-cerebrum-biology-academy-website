import { NextRequest, NextResponse } from 'next/server'
import { authenticateStaff } from '@/lib/auth/staff-auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

/**
 * GET /api/staff/channels — the caller's channels with last-message preview
 * and unread count.
 */
export async function GET() {
  const authResult = await authenticateStaff()
  if ('error' in authResult) return authResult.error
  const { session } = authResult

  try {
    const memberships = await prisma.staff_channel_members.findMany({
      where: { userId: session.userId, channel: { isArchived: false } },
      include: {
        channel: {
          include: {
            members: {
              include: { user: { select: { id: true, name: true, role: true } } },
            },
            messages: {
              where: { deletedAt: null },
              orderBy: { createdAt: 'desc' },
              take: 1,
              include: { sender: { select: { name: true } } },
            },
          },
        },
      },
    })

    const channels = await Promise.all(
      memberships.map(async (m) => {
        const unread =
          m.channel.lastMessageAt && m.channel.lastMessageAt > m.lastReadAt
            ? await prisma.staff_messages.count({
                where: {
                  channelId: m.channel.id,
                  createdAt: { gt: m.lastReadAt },
                  deletedAt: null,
                  senderId: { not: session.userId },
                },
              })
            : 0
        const last = m.channel.messages[0]
        // DIRECT channels render as the other member's name.
        const other =
          m.channel.type === 'DIRECT'
            ? m.channel.members.find((mem) => mem.userId !== session.userId)?.user
            : null
        return {
          id: m.channel.id,
          name: other?.name || m.channel.name,
          description: m.channel.description,
          type: m.channel.type,
          lastMessageAt: m.channel.lastMessageAt,
          unread,
          members: m.channel.members.map((mem) => ({
            id: mem.user.id,
            name: mem.user.name,
            role: mem.user.role,
            channelRole: mem.role,
          })),
          lastMessage: last
            ? { content: last.content.slice(0, 120), senderName: last.sender.name }
            : null,
        }
      })
    )

    channels.sort(
      (a, b) =>
        (b.lastMessageAt ? new Date(b.lastMessageAt).getTime() : 0) -
        (a.lastMessageAt ? new Date(a.lastMessageAt).getTime() : 0)
    )

    return NextResponse.json({ success: true, data: { channels } })
  } catch (error) {
    console.error('[staff/channels] GET failed:', error)
    return NextResponse.json({ success: false, error: 'Failed to load channels' }, { status: 500 })
  }
}

const createSchema = z.object({
  name: z.string().min(1).max(80).optional(),
  description: z.string().max(300).optional(),
  type: z.enum(['TEAM', 'DIRECT']).default('TEAM'),
  memberIds: z.array(z.string()).min(1).max(50),
})

function rand(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
}

/**
 * POST /api/staff/channels — create a TEAM channel or start a DM.
 * Any staff member can create. DIRECT channels dedupe: starting a DM with
 * someone you already have one with returns the existing channel.
 */
export async function POST(request: NextRequest) {
  const authResult = await authenticateStaff()
  if ('error' in authResult) return authResult.error
  const { session } = authResult

  try {
    const parsed = createSchema.safeParse(await request.json())
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: 'Invalid payload', details: parsed.error.issues },
        { status: 400 }
      )
    }
    const data = parsed.data

    // Members must be staff; creator is always included.
    const memberIds = Array.from(new Set([...data.memberIds, session.userId]))
    const staff = await prisma.users.findMany({
      where: { id: { in: memberIds }, role: { in: ['ADMIN', 'TEACHER', 'COUNSELOR'] } },
      select: { id: true, name: true },
    })
    if (staff.length !== memberIds.length) {
      return NextResponse.json(
        { success: false, error: 'All members must be staff (admin/teacher/counselor)' },
        { status: 400 }
      )
    }

    if (data.type === 'DIRECT') {
      if (memberIds.length !== 2) {
        return NextResponse.json(
          { success: false, error: 'A direct message has exactly one other member' },
          { status: 400 }
        )
      }
      const otherId = memberIds.find((id) => id !== session.userId)!
      // Dedupe: existing DIRECT channel containing both users.
      const existing = await prisma.staff_channels.findFirst({
        where: {
          type: 'DIRECT',
          isArchived: false,
          AND: [
            { members: { some: { userId: session.userId } } },
            { members: { some: { userId: otherId } } },
          ],
        },
        select: { id: true },
      })
      if (existing) {
        return NextResponse.json({
          success: true,
          data: { channelId: existing.id, existing: true },
        })
      }
    }

    if (data.type === 'TEAM' && !data.name?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Team channels need a name' },
        { status: 400 }
      )
    }

    const otherName = staff.find((s) => s.id !== session.userId)?.name || 'Direct message'
    const channel = await prisma.staff_channels.create({
      data: {
        id: rand('chan'),
        name: data.type === 'DIRECT' ? otherName : data.name!.trim(),
        description: data.description?.trim() || null,
        type: data.type,
        createdById: session.userId,
        members: {
          create: memberIds.map((userId) => ({
            id: rand('chanm'),
            userId,
            role: userId === session.userId ? 'OWNER' : 'MEMBER',
          })),
        },
      },
    })

    return NextResponse.json(
      { success: true, data: { channelId: channel.id, existing: false } },
      { status: 201 }
    )
  } catch (error) {
    console.error('[staff/channels] POST failed:', error)
    return NextResponse.json({ success: false, error: 'Failed to create channel' }, { status: 500 })
  }
}
