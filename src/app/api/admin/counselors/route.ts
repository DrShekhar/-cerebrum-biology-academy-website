import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdminAuth } from '@/lib/auth'

/**
 * GET /api/admin/counselors
 * Fetch active counselors for lead assignment
 */
export async function GET(_request: NextRequest) {
  try {
    await requireAdminAuth()

    const counselors = await prisma.users.findMany({
      where: {
        role: { in: ['COUNSELOR', 'ADMIN'] },
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        _count: {
          select: {
            leads: true,
          },
        },
      },
      orderBy: { name: 'asc' },
    })

    return NextResponse.json({
      success: true,
      data: counselors.map((c) => ({
        id: c.id,
        name: c.name,
        email: c.email,
        role: c.role,
        leadCount: c._count.leads,
      })),
    })
  } catch (error) {
    console.error('Get counselors error:', error)

    if (error instanceof Error && error.message === 'Admin authentication required') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    return NextResponse.json(
      { success: false, error: 'Failed to fetch counselors' },
      { status: 500 }
    )
  }
}
