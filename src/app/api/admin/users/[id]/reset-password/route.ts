import { NextRequest, NextResponse } from 'next/server'
import { requireAdminAuth } from '@/lib/auth'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import type { Prisma } from '@/generated/prisma'

export const dynamic = 'force-dynamic'

/**
 * POST /api/admin/users/[id]/reset-password — admin sets a server-generated
 * temporary password, returned in plaintext EXACTLY ONCE. Chosen over a
 * reset email because email delivery depends on credentials that may not be
 * configured; this path always works.
 */
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdminAuth()
    const session = await auth()
    const { id } = await params

    const user = await prisma.users.findUnique({
      where: { id },
      select: { id: true, name: true, email: true, profile: true },
    })
    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 })
    }

    // 12 chars from an unambiguous alphabet (no 0/O/1/l).
    const alphabet = 'abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789'
    const tempPassword = Array.from(crypto.randomBytes(12))
      .map((b) => alphabet[b % alphabet.length])
      .join('')

    const passwordHash = await bcrypt.hash(tempPassword, 12)
    const profile = (user.profile as Record<string, unknown> | null) || {}

    await prisma.users.update({
      where: { id },
      data: {
        passwordHash,
        profile: { ...profile, mustChangePassword: true } as Prisma.InputJsonValue,
        updatedAt: new Date(),
      },
    })

    await prisma.activities.create({
      data: {
        id: `act_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        userId: id,
        action: 'password_reset_by_admin',
        description: `Password reset for ${user.name || user.email} by an admin`,
        metadata: { resetBy: session?.user?.id || null },
      },
    })

    return NextResponse.json({
      success: true,
      data: {
        tempPassword,
        note: 'Share this with the user securely — it will not be shown again.',
      },
    })
  } catch (error) {
    if (error instanceof Error && error.message === 'Admin authentication required') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    console.error('[admin/users/reset-password] POST failed:', error)
    return NextResponse.json({ success: false, error: 'Failed to reset password' }, { status: 500 })
  }
}
