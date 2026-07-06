/**
 * Group-granted content resolver
 *
 * A student can receive materials/videos/tests through group membership
 * (student_groups + group_content). Items support drip scheduling:
 *   - releaseAt set        → visible once releaseAt <= now
 *   - dayOffset set        → visible once group.startDate + dayOffset days <= now
 *                            (held back while the group has no startDate)
 *   - neither set          → visible immediately
 *
 * Fails soft: if the groups tables have not been provisioned yet (owner runs
 * scripts/apply-student-groups.sh), callers just see no group grants.
 */

import { prisma } from '@/lib/prisma'

export interface GroupGrantedContent {
  materialIds: string[]
  videoLectureIds: string[]
  testTemplateIds: string[]
}

const EMPTY: GroupGrantedContent = {
  materialIds: [],
  videoLectureIds: [],
  testTemplateIds: [],
}

const DAY_MS = 24 * 60 * 60 * 1000

export function isGroupItemReleased(
  item: { releaseAt: Date | null; dayOffset: number | null },
  groupStartDate: Date | null,
  now: Date = new Date()
): boolean {
  if (item.releaseAt) {
    return item.releaseAt.getTime() <= now.getTime()
  }
  if (item.dayOffset !== null && item.dayOffset !== undefined) {
    if (!groupStartDate) return false
    return groupStartDate.getTime() + item.dayOffset * DAY_MS <= now.getTime()
  }
  return true
}

export async function getGroupGrantedContent(userId: string): Promise<GroupGrantedContent> {
  try {
    const memberships = await prisma.student_group_members.findMany({
      where: { userId },
      select: {
        groupId: true,
        student_groups: { select: { startDate: true } },
      },
    })
    if (memberships.length === 0) return EMPTY

    const startByGroup = new Map(memberships.map((m) => [m.groupId, m.student_groups.startDate]))

    const items = await prisma.group_content.findMany({
      where: { groupId: { in: Array.from(startByGroup.keys()) } },
      select: {
        groupId: true,
        materialId: true,
        videoLectureId: true,
        testTemplateId: true,
        releaseAt: true,
        dayOffset: true,
      },
    })

    const now = new Date()
    const materialIds = new Set<string>()
    const videoLectureIds = new Set<string>()
    const testTemplateIds = new Set<string>()

    for (const item of items) {
      if (!isGroupItemReleased(item, startByGroup.get(item.groupId) ?? null, now)) continue
      if (item.materialId) materialIds.add(item.materialId)
      if (item.videoLectureId) videoLectureIds.add(item.videoLectureId)
      if (item.testTemplateId) testTemplateIds.add(item.testTemplateId)
    }

    return {
      materialIds: Array.from(materialIds),
      videoLectureIds: Array.from(videoLectureIds),
      testTemplateIds: Array.from(testTemplateIds),
    }
  } catch (error) {
    // Groups tables may not exist yet in this environment — degrade gracefully
    console.warn(
      'getGroupGrantedContent failed (groups tables missing?):',
      error instanceof Error ? error.message : 'Unknown error'
    )
    return EMPTY
  }
}
