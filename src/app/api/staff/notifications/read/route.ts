import { NextRequest, NextResponse } from 'next/server'
import { authenticateStaff } from '@/lib/auth/staff-auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

const readSchema = z.union([
  z.object({ ids: z.array(z.string()).min(1).max(200) }),
  z.object({ all: z.literal(true) }),
])

/**
 * POST /api/staff/notifications/read — { ids: [...] } or { all: true }.
 * Scoped to the caller; you cannot mark someone else's notifications.
 */
export async function POST(request: NextRequest) {
  const authResult = await authenticateStaff()
  if ('error' in authResult) return authResult.error
  const { session } = authResult

  try {
    const parsed = readSchema.safeParse(await request.json())
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 })
    }

    const where =
      'all' in parsed.data
        ? { userId: session.userId, isRead: false }
        : { userId: session.userId, id: { in: parsed.data.ids } }

    const result = await prisma.staff_notifications.updateMany({
      where,
      data: { isRead: true, readAt: new Date() },
    })

    return NextResponse.json({ success: true, data: { updated: result.count } })
  } catch (error) {
    console.error('[staff/notifications/read] POST failed:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to mark notifications read' },
      { status: 500 }
    )
  }
}
