import { NextResponse } from 'next/server'
import { requireAdminAuth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

// Honest read-only security summary — reports what IS, no fake toggles.
export async function GET() {
  try {
    await requireAdminAuth()

    const staffCounts = await prisma.users.groupBy({
      by: ['role'],
      where: { role: { in: ['ADMIN', 'COUNSELOR', 'TEACHER'] } },
      _count: { _all: true },
    })

    const recentStaff = await prisma.users.findMany({
      where: { role: { in: ['ADMIN', 'COUNSELOR', 'TEACHER'] } },
      select: { id: true, name: true, email: true, role: true, lastActiveAt: true },
      orderBy: { lastActiveAt: { sort: 'desc', nulls: 'last' } },
      take: 20,
    })

    return NextResponse.json({
      success: true,
      data: {
        auth: {
          provider: 'NextAuth v5 (JWT sessions)',
          sessionMaxAge: '7 days',
          accessTokenMaxAge: '15 minutes',
          passwordHashing: 'bcrypt',
          passwordMinLength: 8,
          twoFactorAuth: false,
        },
        staffCounts: staffCounts.map((s) => ({ role: s.role, count: s._count._all })),
        recentStaff,
      },
    })
  } catch (error) {
    if (error instanceof Error && error.message === 'Admin authentication required') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    console.error('[admin/settings/security] GET failed:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to load security summary' },
      { status: 500 }
    )
  }
}
