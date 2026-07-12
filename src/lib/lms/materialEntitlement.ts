import { prisma } from '@/lib/prisma'
import { getGroupGrantedContent } from '@/lib/student/groupContent'
import { getUserTier, hasTierAccess, tierLabel } from '@/lib/access/tierAccess'
import type { CoachingTier } from '@/generated/prisma'

/**
 * Single source of truth for "may this user consume this study material?".
 *
 * The same ladder was previously copy-pasted across the video, article,
 * download and material-complete routes and had already drifted (the complete
 * route was missing the free-preview and group-grant branches). Centralising it
 * keeps every content surface enforcing the identical rule.
 *
 * Ladder (any one grants access, then the tier gate must also pass):
 *   1. accessLevel === 'FREE'
 *   2. the material's chapter is a free preview
 *   3. an explicit material_access grant
 *   4. an ACTIVE enrollment in the material's course
 *   5. a group_content (batch) grant
 * Then: requiredTier must be satisfied by the user's coaching tier.
 */
export interface EntitlementResult {
  allowed: boolean
  status: number
  error?: string
  requiredTier?: CoachingTier | null
  upgradeUrl?: string
}

export async function assertMaterialEntitlement(
  userId: string,
  materialId: string
): Promise<EntitlementResult> {
  const material = await prisma.study_materials.findUnique({
    where: { id: materialId },
    select: {
      id: true,
      title: true,
      isPublished: true,
      accessLevel: true,
      requiredTier: true,
      courseId: true,
      chapters: { select: { isFreePreview: true } },
    },
  })

  if (!material || !material.isPublished) {
    return { allowed: false, status: 404, error: 'Material not found' }
  }

  const inFreePreviewChapter = !!material.chapters?.isFreePreview

  if (material.accessLevel !== 'FREE' && !inFreePreviewChapter) {
    let allowed = false

    const grant = await prisma.material_access.findUnique({
      where: { materialId_userId: { materialId, userId } },
      select: { id: true },
    })
    allowed = !!grant

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
      return {
        allowed: false,
        status: 403,
        error: 'You need to be enrolled to access this material.',
      }
    }
  }

  // Tier gate: enrollment alone isn't enough for tier-exclusive content.
  if (material.requiredTier) {
    const userTier = await getUserTier(userId)
    if (!hasTierAccess(userTier, material.requiredTier)) {
      return {
        allowed: false,
        status: 403,
        error: `“${material.title}” is part of the ${tierLabel(material.requiredTier)} plan. Upgrade to access it.`,
        requiredTier: material.requiredTier,
        upgradeUrl: '/pricing',
      }
    }
  }

  return { allowed: true, status: 200 }
}
