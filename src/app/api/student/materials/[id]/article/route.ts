import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { hasTierAccess, getUserTier, tierLabel } from '@/lib/access/tierAccess'
import { getGroupGrantedContent } from '@/lib/student/groupContent'

export const dynamic = 'force-dynamic'

/**
 * GET /api/student/materials/[id]/article — read an ARTICLE lesson's markdown.
 * Entitlement gating mirrors the download route exactly: FREE materials, an
 * explicit material_access grant, an ACTIVE enrollment in the course, or a
 * group (batch) assignment; then the tier gate on top.
 */
export async function GET(_request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ success: false, error: 'Please sign in.' }, { status: 401 })
    }
    const { id: materialId } = await context.params
    const userId = session.user.id

    const material = await prisma.study_materials.findUnique({
      where: { id: materialId },
      select: {
        id: true,
        title: true,
        materialType: true,
        contentBody: true,
        isPublished: true,
        accessLevel: true,
        requiredTier: true,
        courseId: true,
        chapters: { select: { isFreePreview: true } },
        courses: { select: { name: true } },
      },
    })
    if (!material || material.materialType !== 'ARTICLE') {
      return NextResponse.json({ success: false, error: 'Article not found' }, { status: 404 })
    }
    if (!material.isPublished) {
      return NextResponse.json({ success: false, error: 'Not available' }, { status: 403 })
    }

    const inFreePreviewChapter = !!material.chapters?.isFreePreview
    if (material.accessLevel !== 'FREE' && !inFreePreviewChapter) {
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
        const groupGrants = await getGroupGrantedContent(userId)
        allowed = groupGrants.materialIds.includes(materialId)
      }
      if (!allowed) {
        return NextResponse.json(
          { success: false, error: 'You need to be enrolled to read this lesson.' },
          { status: 403 }
        )
      }
    }

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

    return NextResponse.json({
      success: true,
      data: {
        id: material.id,
        title: material.title,
        contentBody: material.contentBody || '',
        courseName: material.courses?.name || null,
        courseId: material.courseId,
      },
    })
  } catch (error) {
    console.error('[student/article] failed:', error)
    return NextResponse.json({ success: false, error: 'Failed to load article' }, { status: 500 })
  }
}
