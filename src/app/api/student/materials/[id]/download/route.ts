/**
 * Student Material Delivery + Download Tracking API
 *
 * GET  /api/student/materials/[id]/download — entitlement-gated delivery:
 *      tracks the download, then redirects to the stored fileUrl. This is
 *      what the course-page "Open" links hit (they are plain <a href> GETs —
 *      the old POST-only route returned 405 and never served the file).
 * POST /api/student/materials/[id]/download — track only (legacy callers).
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { hasTierAccess, getUserTier, tierLabel } from '@/lib/access/tierAccess'
import { getGroupGrantedContent } from '@/lib/student/groupContent'

/**
 * POST - Track material download and update progress
 */
async function handleDownload(
  request: NextRequest,
  params: Promise<{ id: string }>,
  deliver: boolean
) {
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
        fileUrl: true,
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
        // Group (batch) assignment via group_content (release gate applied)
        const groupGrants = await getGroupGrantedContent(userId)
        allowed = groupGrants.materialIds.includes(materialId)
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

    // For delivery, resolve + validate the file target BEFORE counting or
    // redirecting: only http(s) absolute URLs are allowed (guards against a
    // relative/garbage fileUrl throwing in redirect(), and against turning
    // this entitlement endpoint into an arbitrary open redirect). Counters
    // must not inflate for a material that can't actually be delivered.
    let deliverUrl: string | null = null
    if (deliver) {
      const raw = (material.fileUrl || '').trim()
      if (!raw) {
        return NextResponse.json(
          { success: false, error: 'This material has no downloadable file.' },
          { status: 404 }
        )
      }
      if (!/^https:\/\//i.test(raw)) {
        console.error('[materials/download] non-absolute-https fileUrl:', materialId)
        return NextResponse.json(
          { success: false, error: 'This material is not available for download.' },
          { status: 404 }
        )
      }
      deliverUrl = raw
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

    if (deliverUrl) {
      // Entitlement + URL validated above — hand the browser the stored file.
      return NextResponse.redirect(deliverUrl)
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

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  return handleDownload(request, params, true)
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  return handleDownload(request, params, false)
}
