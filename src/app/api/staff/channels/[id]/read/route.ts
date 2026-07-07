import { NextRequest, NextResponse } from 'next/server'
import { authenticateStaff } from '@/lib/auth/staff-auth'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

/**
 * POST /api/staff/channels/[id]/read — set the caller's read watermark.
 */
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authResult = await authenticateStaff()
  if ('error' in authResult) return authResult.error
  const { session } = authResult

  try {
    const { id } = await params
    await prisma.staff_channel_members.update({
      where: { channelId_userId: { channelId: id, userId: session.userId } },
      data: { lastReadAt: new Date() },
    })
    return NextResponse.json({ success: true })
  } catch {
    // Not a member (or channel gone) — nothing to mark.
    return NextResponse.json({ success: false, error: 'Not a member' }, { status: 404 })
  }
}
