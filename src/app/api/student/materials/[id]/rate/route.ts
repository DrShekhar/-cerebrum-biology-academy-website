/**
 * Student — rate a material 1–5 (LearnWorlds/Thinkific-style lesson ratings).
 *
 * POST /api/student/materials/[id]/rate  body: { rating: 1-5, feedback? }
 * Stores the student's rating on their material_progress row (one rating per
 * student per material — re-rating overwrites) and recomputes the material's
 * avgRating/ratingCount aggregate. Entitlement-gated like complete/download.
 */

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

const bodySchema = z.object({
  rating: z.number().int().min(1).max(5),
  feedback: z.string().max(1000).optional(),
})

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Please sign in.' },
        { status: 401 }
      )
    }

    const { id: materialId } = await params
    const userId = session.user.id

    const parsed = bodySchema.safeParse(await request.json().catch(() => ({})))
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: 'Rating must be a whole number from 1 to 5' },
        { status: 400 }
      )
    }

    const material = await prisma.study_materials.findUnique({
      where: { id: materialId },
      select: { id: true, isPublished: true, accessLevel: true, courseId: true },
    })
    if (!material || !material.isPublished) {
      return NextResponse.json({ success: false, error: 'Material not found' }, { status: 404 })
    }

    // Entitlement gate (mirrors complete/download): FREE, explicit grant, or
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
          { success: false, error: 'You do not have access to this material' },
          { status: 403 }
        )
      }
    }

    await prisma.material_progress.upsert({
      where: { materialId_userId: { materialId, userId } },
      create: {
        id: `mp_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
        materialId,
        userId,
        status: 'VIEWED',
        rating: parsed.data.rating,
        feedback: parsed.data.feedback || null,
        firstViewedAt: new Date(),
        lastViewedAt: new Date(),
        updatedAt: new Date(),
      },
      update: {
        rating: parsed.data.rating,
        feedback: parsed.data.feedback ?? undefined,
        updatedAt: new Date(),
      },
    })

    // Recompute the aggregate from actual rows — self-healing, no drift.
    const agg = await prisma.material_progress.aggregate({
      where: { materialId, rating: { not: null } },
      _avg: { rating: true },
      _count: { rating: true },
    })
    const avgRating = Math.round((agg._avg.rating || 0) * 10) / 10
    const ratingCount = agg._count.rating

    await prisma.study_materials.update({
      where: { id: materialId },
      data: { avgRating, ratingCount, updatedAt: new Date() },
    })

    return NextResponse.json({
      success: true,
      data: { rating: parsed.data.rating, avgRating, ratingCount },
    })
  } catch (error) {
    console.error('[student/materials/rate] failed:', error)
    return NextResponse.json({ success: false, error: 'Failed to save rating' }, { status: 500 })
  }
}
