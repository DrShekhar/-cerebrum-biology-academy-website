/**
 * Student — mark a material complete (or un-complete).
 *
 * POST /api/student/materials/[id]/complete  body: { completed?: boolean }
 * Writes material_progress.status = COMPLETED (or VIEWED when un-completing),
 * which feeds the weighted course-progress calculation. Entitlement-gated the
 * same way as the download route.
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { assertMaterialEntitlement } from '@/lib/lms/materialEntitlement'

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized. Please sign in.' }, { status: 401 })
    }

    const { id: materialId } = await params
    const userId = session.user.id
    const body = await request.json().catch(() => ({}))
    const completed = body.completed !== false // default true

    // Shared entitlement gate — same ladder as video/article/download (FREE,
    // free-preview chapter, material_access grant, ACTIVE enrollment, group
    // grant, then tier). Previously this route hand-rolled a subset and had
    // drifted (missing the free-preview and group branches).
    const entitlement = await assertMaterialEntitlement(userId, materialId)
    if (!entitlement.allowed) {
      return NextResponse.json(
        { success: false, error: entitlement.error || 'Not authorized' },
        { status: entitlement.status }
      )
    }

    const status = completed ? 'COMPLETED' : 'VIEWED'
    await prisma.material_progress.upsert({
      where: { materialId_userId: { materialId, userId } },
      update: {
        status,
        completedAt: completed ? new Date() : null,
        lastViewedAt: new Date(),
      },
      create: {
        id: `matprog_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
        updatedAt: new Date(),
        materialId,
        userId,
        status,
        completedAt: completed ? new Date() : null,
        firstViewedAt: new Date(),
        lastViewedAt: new Date(),
      },
    })

    return NextResponse.json({ success: true, completed })
  } catch (error) {
    console.error('Failed to mark material complete:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update progress' },
      { status: 500 }
    )
  }
}
