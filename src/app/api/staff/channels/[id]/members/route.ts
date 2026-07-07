import { NextRequest, NextResponse } from 'next/server'
import { authenticateStaff } from '@/lib/auth/staff-auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

const memberSchema = z.object({ userId: z.string().min(1) })

function rand(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
}

async function callerRole(channelId: string, userId: string): Promise<string | null> {
  const m = await prisma.staff_channel_members.findUnique({
    where: { channelId_userId: { channelId, userId } },
    select: { role: true },
  })
  return m?.role || null
}

/**
 * POST /api/staff/channels/[id]/members — add a staff member.
 * Channel OWNER or ADMIN only. TEAM channels only.
 */
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authResult = await authenticateStaff()
  if ('error' in authResult) return authResult.error
  const { session } = authResult

  try {
    const { id } = await params
    const parsed = memberSchema.safeParse(await request.json())
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 })
    }

    const channel = await prisma.staff_channels.findUnique({
      where: { id },
      select: { type: true, isArchived: true },
    })
    if (!channel || channel.isArchived) {
      return NextResponse.json({ success: false, error: 'Channel not found' }, { status: 404 })
    }
    if (channel.type === 'DIRECT') {
      return NextResponse.json(
        { success: false, error: 'Direct messages cannot gain members' },
        { status: 400 }
      )
    }

    const role = await callerRole(id, session.userId)
    if (role !== 'OWNER' && session.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Only the channel owner or an admin can add members' },
        { status: 403 }
      )
    }

    const target = await prisma.users.findFirst({
      where: { id: parsed.data.userId, role: { in: ['ADMIN', 'TEACHER', 'COUNSELOR'] } },
      select: { id: true },
    })
    if (!target) {
      return NextResponse.json(
        { success: false, error: 'User is not a staff member' },
        { status: 400 }
      )
    }

    await prisma.staff_channel_members.upsert({
      where: { channelId_userId: { channelId: id, userId: target.id } },
      create: { id: rand('chanm'), channelId: id, userId: target.id },
      update: {},
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[staff/channels/members] POST failed:', error)
    return NextResponse.json({ success: false, error: 'Failed to add member' }, { status: 500 })
  }
}

/**
 * DELETE /api/staff/channels/[id]/members — remove a member.
 * OWNER/ADMIN remove anyone; members may remove themselves (leave).
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await authenticateStaff()
  if ('error' in authResult) return authResult.error
  const { session } = authResult

  try {
    const { id } = await params
    const parsed = memberSchema.safeParse(await request.json())
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 })
    }

    const isSelf = parsed.data.userId === session.userId
    const role = await callerRole(id, session.userId)
    if (!isSelf && role !== 'OWNER' && session.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Only the channel owner or an admin can remove members' },
        { status: 403 }
      )
    }

    await prisma.staff_channel_members.deleteMany({
      where: { channelId: id, userId: parsed.data.userId },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[staff/channels/members] DELETE failed:', error)
    return NextResponse.json({ success: false, error: 'Failed to remove member' }, { status: 500 })
  }
}
