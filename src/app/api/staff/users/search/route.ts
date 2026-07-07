import { NextRequest, NextResponse } from 'next/server'
import { authenticateStaff, STAFF_ROLES } from '@/lib/auth/staff-auth'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

/**
 * GET /api/staff/users/search?q=&limit=8 — mention autocomplete + member
 * picker. Staff only, never students/parents; emails only for ADMIN callers.
 */
export async function GET(request: NextRequest) {
  const authResult = await authenticateStaff()
  if ('error' in authResult) return authResult.error
  const { session } = authResult

  try {
    const { searchParams } = new URL(request.url)
    const q = (searchParams.get('q') || '').trim()
    const limit = Math.min(20, Math.max(1, parseInt(searchParams.get('limit') || '8', 10)))

    const staff = await prisma.users.findMany({
      where: {
        role: { in: [...STAFF_ROLES] },
        ...(q ? { name: { contains: q, mode: 'insensitive' } } : {}),
      },
      select: { id: true, name: true, role: true, email: session.role === 'ADMIN' },
      orderBy: { name: 'asc' },
      take: limit,
    })

    return NextResponse.json({ success: true, data: { users: staff } })
  } catch (error) {
    console.error('[staff/users/search] GET failed:', error)
    return NextResponse.json({ success: false, error: 'Failed to search staff' }, { status: 500 })
  }
}
