import { NextRequest, NextResponse } from 'next/server'
import { authenticateStaff } from '@/lib/auth/staff-auth'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

/**
 * GET /api/staff/notifications?before=<ISO>&limit=30 — bell dropdown feed,
 * newest first, keyset pagination.
 */
export async function GET(request: NextRequest) {
  const authResult = await authenticateStaff()
  if ('error' in authResult) return authResult.error
  const { session } = authResult

  try {
    const { searchParams } = new URL(request.url)
    const before = searchParams.get('before')
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '30', 10)))

    const beforeDate = before ? new Date(before) : null
    const notifications = await prisma.staff_notifications.findMany({
      where: {
        userId: session.userId,
        ...(beforeDate && !isNaN(beforeDate.getTime()) ? { createdAt: { lt: beforeDate } } : {}),
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    })

    // Resolve actor names in one query (actorId is a loose ref, no FK).
    const actorIds = Array.from(
      new Set(notifications.map((n) => n.actorId).filter((id): id is string => Boolean(id)))
    )
    const actors = actorIds.length
      ? await prisma.users.findMany({
          where: { id: { in: actorIds } },
          select: { id: true, name: true },
        })
      : []
    const actorNames = new Map(actors.map((a) => [a.id, a.name]))

    return NextResponse.json({
      success: true,
      data: {
        notifications: notifications.map((n) => ({
          ...n,
          actorName: n.actorId ? actorNames.get(n.actorId) || null : null,
        })),
        hasMore: notifications.length === limit,
      },
    })
  } catch (error) {
    console.error('[staff/notifications] GET failed:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to load notifications' },
      { status: 500 }
    )
  }
}
