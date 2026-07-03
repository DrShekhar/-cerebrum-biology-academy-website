/**
 * Student Material Download Tracking API
 *
 * POST /api/student/materials/[id]/download - Track material download
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { hasTierAccess, getUserTier, tierLabel } from '@/lib/access/tierAccess'

/**
 * POST - Track material download and update progress
 */
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Authentication check
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized. Please sign in.' }, { status: 401 })
    }

    const { id: materialId } = await params
    const userId = session.user.id

    // Verify material exists and is published
    const material = await prisma.study_materials.findUnique({
      where: { id: materialId },
      select: {
        id: true,
        isPublished: true,
        title: true,
        accessLevel: true,
        requiredTier: true,
        courseId: true,
      },
    })

    if (!material) {
      return NextResponse.json({ success: false, error: 'Material not found' }, { status: 404 })
    }

    if (!material.isPublished) {
      return NextResponse.json(
        { success: false, error: 'Material is not available for download' },
        { status: 403 }
      )
    }

    // Entitlement gate (was missing — only isPublished was checked, so any signed-in
    // user with a material id could track/obtain a non-entitled material). Allow only
    // FREE materials, an explicit material_access grant, or an ACTIVE enrollment in
    // the material's course.
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

    // Tier gate: enrollment alone isn't enough for tier-exclusive content.
    if (material.requiredTier) {
      const userTier = await getUserTier(userId)
      if (!hasTierAccess(userTier, material.requiredTier)) {
        return NextResponse.json(
          {
            success: false,
            error: `“${material.title}” is part of the ${tierLabel(material.requiredTier)} plan. Upgrade to access it.`,
            requiredTier: material.requiredTier,
            upgradeUrl: '/pricing',
          },
          { status: 403 }
        )
      }
    }

    // Update material download count
    await prisma.study_materials.update({
      where: { id: materialId },
      data: {
        totalDownloads: { increment: 1 },
        totalViews: { increment: 1 }, // Also count as a view
      },
    })

    // Create or update student progress
    try {
      await prisma.material_progress.upsert({
        where: {
          materialId_userId: {
            materialId,
            userId,
          },
        },
        update: {
          downloadedAt: new Date(),
          lastViewedAt: new Date(),
          status: 'DOWNLOADED',
        },
        create: {
          id: `matprog_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
          updatedAt: new Date(),
          materialId,
          userId,
          status: 'DOWNLOADED',
          downloadedAt: new Date(),
          lastViewedAt: new Date(),
        },
      })
    } catch (progressError) {
      // If progress tracking fails, log but don't fail the request
      console.error('Progress tracking failed:', progressError)
    }

    return NextResponse.json({
      success: true,
      message: 'Download tracked successfully',
      material: {
        id: material.id,
        title: material.title,
      },
    })
  } catch (error) {
    console.error('Download tracking error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to track download',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
