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

    const material = await prisma.study_materials.findUnique({
      where: { id: materialId },
      select: { id: true, isPublished: true, accessLevel: true, courseId: true },
    })
    if (!material || !material.isPublished) {
      return NextResponse.json({ success: false, error: 'Material not found' }, { status: 404 })
    }

    // Entitlement gate (mirrors the download route): FREE, explicit grant, or
    // an ACTIVE enrolment in the material's course.
    if (material.accessLevel !== 'FREE') {
      const grant = await prisma.material_access.findUnique({
        where: { materialId_userId: { materialId, userId } },
        select: { id: true },
      })
      let allowed = !!grant
      if (!allowed && material.courseId) {
        const enrollment = await prisma.enrollments.findFirst({
          where: { userId, courseId: material.courseId, status: 'ACTIVE' },
          select: { id: true },
        })
        allowed = !!enrollment
      }
      if (!allowed) {
        return NextResponse.json(
          { success: false, error: 'You need to be enrolled to access this material.' },
          { status: 403 }
        )
      }
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
    return NextResponse.json({ success: false, error: 'Failed to update progress' }, { status: 500 })
  }
}
