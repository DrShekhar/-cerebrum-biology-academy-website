import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { requireAdminAuth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import type { UserRole } from '@/lib/auth/config'
import { PERMISSION_CATALOG } from '@/lib/auth/permissionCatalog'
import { isDefaultGranted, getUserOverrides } from '@/lib/auth/permissions'

export const dynamic = 'force-dynamic'

/**
 * GET /api/admin/users/[id]/permissions — the per-user permission editor data:
 * every catalog permission with its role default, the current override (if
 * any), and the resulting effective state.
 */
export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdminAuth()
    const { id } = await params

    const user = await prisma.users.findUnique({
      where: { id },
      select: { id: true, name: true, email: true, role: true },
    })
    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 })
    }

    const role = user.role as UserRole
    const overrides = await getUserOverrides(id)

    const permissions = PERMISSION_CATALOG.map((def) => {
      const def_ = isDefaultGranted(def.key, role)
      const override = overrides.get(def.key) || null
      const effective = override === 'GRANT' ? true : override === 'DENY' ? false : def_
      return {
        key: def.key,
        label: def.label,
        description: def.description,
        category: def.category,
        relevant: def.appliesTo.includes(role),
        defaultGranted: def_,
        override, // 'GRANT' | 'DENY' | null
        effective,
      }
    })

    return NextResponse.json({
      success: true,
      data: { user, permissions },
    })
  } catch (error) {
    if (error instanceof Error && error.message === 'Admin authentication required') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    console.error('[admin/users/:id/permissions] GET failed:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to load permissions' },
      { status: 500 }
    )
  }
}

const putSchema = z.object({
  permission: z.string().min(1),
  // GRANT/DENY set an override; INHERIT clears it (back to the role default).
  effect: z.enum(['GRANT', 'DENY', 'INHERIT']),
  reason: z.string().max(500).optional(),
  expiresAt: z.string().datetime().optional(),
})

/**
 * PUT /api/admin/users/[id]/permissions — grant, withdraw, or reset a single
 * permission for a user. Admin only.
 */
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const admin = await requireAdminAuth()
    const { id } = await params

    const parsed = putSchema.safeParse(await request.json().catch(() => ({})))
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 })
    }
    const { permission, effect, reason, expiresAt } = parsed.data

    // Only allow known permissions from the catalog.
    if (!PERMISSION_CATALOG.some((p) => p.key === permission)) {
      return NextResponse.json({ success: false, error: 'Unknown permission' }, { status: 400 })
    }

    const user = await prisma.users.findUnique({ where: { id }, select: { id: true, role: true } })
    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 })
    }

    if (effect === 'INHERIT') {
      await prisma.user_permission_overrides.deleteMany({ where: { userId: id, permission } })
      return NextResponse.json({ success: true, data: { permission, override: null } })
    }

    await prisma.user_permission_overrides.upsert({
      where: { userId_permission: { userId: id, permission } },
      create: {
        userId: id,
        permission,
        effect,
        reason: reason || null,
        grantedById: admin?.user?.id || null,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
      },
      update: {
        effect,
        reason: reason || null,
        grantedById: admin?.user?.id || null,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
      },
    })

    return NextResponse.json({ success: true, data: { permission, override: effect } })
  } catch (error) {
    if (error instanceof Error && error.message === 'Admin authentication required') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    console.error('[admin/users/:id/permissions] PUT failed:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update permission' },
      { status: 500 }
    )
  }
}
