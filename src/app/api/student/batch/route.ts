/**
 * Student "My Batch" API
 *
 * GET /api/student/batch — returns the cohort(s) the signed-in student belongs
 * to (via student_group_members), each with its roster, the content shared to
 * the batch (group_content → materials / videos / tests, drip-gated), and any
 * batch-scoped notices (notices.groupId). READ-ONLY cohort view — no posting.
 *
 * Efficient: one membership query, one members query, one content query and one
 * notices query across all of the student's groups (no per-group N+1).
 */

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { isGroupItemReleased } from '@/lib/student/groupContent'

const MEMBER_CAP = 30

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Please sign in.' },
        { status: 401 }
      )
    }

    const userId = session.user.id

    // 1) The student's group memberships (+ group meta and member count)
    const memberships = await prisma.student_group_members.findMany({
      where: { userId },
      select: {
        student_groups: {
          select: {
            id: true,
            name: true,
            description: true,
            classLevel: true,
            startDate: true,
            _count: { select: { student_group_members: true } },
          },
        },
      },
      orderBy: { addedAt: 'desc' },
    })

    if (memberships.length === 0) {
      return NextResponse.json({ success: true, data: { groups: [] } })
    }

    const groups = memberships.map((m) => m.student_groups)
    const groupIds = groups.map((g) => g.id)
    const startByGroup = new Map(groups.map((g) => [g.id, g.startDate]))

    // 2) Rosters, 3) shared content and 4) batch notices — in parallel
    const [rosterRows, contentRows, notices] = await Promise.all([
      prisma.student_group_members.findMany({
        where: { groupId: { in: groupIds } },
        select: {
          groupId: true,
          users: { select: { id: true, name: true } },
        },
        orderBy: { addedAt: 'asc' },
      }),
      prisma.group_content.findMany({
        where: { groupId: { in: groupIds } },
        select: {
          id: true,
          groupId: true,
          releaseAt: true,
          dayOffset: true,
          assignedAt: true,
          study_materials: { select: { id: true, title: true, materialType: true } },
          video_lectures: { select: { id: true, title: true } },
          test_templates: { select: { id: true, title: true } },
        },
        orderBy: { assignedAt: 'desc' },
      }),
      prisma.notices.findMany({
        where: {
          groupId: { in: groupIds },
          isActive: true,
          OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
        },
        select: {
          id: true,
          groupId: true,
          title: true,
          content: true,
          category: true,
          isPinned: true,
          priority: true,
          publishedAt: true,
          createdAt: true,
        },
        orderBy: [{ isPinned: 'desc' }, { priority: 'desc' }, { createdAt: 'desc' }],
      }),
    ])

    const now = new Date()

    // Roster grouped per group, capped for payload size
    const rosterByGroup = new Map<string, { id: string; name: string }[]>()
    for (const row of rosterRows) {
      const list = rosterByGroup.get(row.groupId) ?? []
      if (list.length < MEMBER_CAP) list.push({ id: row.users.id, name: row.users.name })
      rosterByGroup.set(row.groupId, list)
    }

    // Shared content grouped per group (drip-gated to what's actually released)
    const contentByGroup = new Map<
      string,
      {
        id: string
        kind: 'material' | 'video' | 'test'
        title: string
        type: string
        href: string
      }[]
    >()
    for (const c of contentRows) {
      if (!isGroupItemReleased(c, startByGroup.get(c.groupId) ?? null, now)) continue
      let item: {
        id: string
        kind: 'material' | 'video' | 'test'
        title: string
        type: string
        href: string
      } | null = null
      if (c.study_materials) {
        item = {
          id: c.id,
          kind: 'material',
          title: c.study_materials.title,
          type: c.study_materials.materialType,
          href: `/api/student/materials/${c.study_materials.id}/download`,
        }
      } else if (c.video_lectures) {
        item = {
          id: c.id,
          kind: 'video',
          title: c.video_lectures.title,
          type: 'VIDEO',
          href: `/learn/${c.video_lectures.id}`,
        }
      } else if (c.test_templates) {
        item = {
          id: c.id,
          kind: 'test',
          title: c.test_templates.title,
          type: 'TEST',
          href: `/student/tests/${c.test_templates.id}`,
        }
      }
      if (!item) continue
      const list = contentByGroup.get(c.groupId) ?? []
      list.push(item)
      contentByGroup.set(c.groupId, list)
    }

    // Notices grouped per group
    const noticesByGroup = new Map<string, typeof notices>()
    for (const n of notices) {
      const list = noticesByGroup.get(n.groupId!) ?? []
      list.push(n)
      noticesByGroup.set(n.groupId!, list)
    }

    const data = {
      groups: groups.map((g) => ({
        id: g.id,
        name: g.name,
        description: g.description,
        classLevel: g.classLevel,
        memberCount: g._count.student_group_members,
        members: rosterByGroup.get(g.id) ?? [],
        sharedContent: contentByGroup.get(g.id) ?? [],
        notices: (noticesByGroup.get(g.id) ?? []).map((n) => ({
          id: n.id,
          title: n.title,
          content: n.content,
          category: n.category,
          isPinned: n.isPinned,
          publishedAt: n.publishedAt ?? n.createdAt,
        })),
      })),
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    // Groups tables may not be provisioned in every environment — fail soft
    console.error('Failed to load student batch:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to load your batch',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
