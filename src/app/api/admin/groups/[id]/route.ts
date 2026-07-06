/**
 * Admin Student Group Detail API
 *
 * GET    /api/admin/groups/[id] - Group detail with members + content (ADMIN/TEACHER)
 * PATCH  /api/admin/groups/[id] - Update group fields (ADMIN)
 * DELETE /api/admin/groups/[id] - Delete group + its member/content rows (ADMIN)
 *
 * Delete removes ONLY the group, its membership rows and its content
 * assignments — never the underlying students, materials, videos or tests.
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import type { StudentClass } from '@/generated/prisma'
import {
  isGroupsNotProvisioned,
  groupsNotProvisionedResponse,
} from '@/lib/admin/groupsProvisioning'

const CLASS_LEVELS: StudentClass[] = [
  'CLASS_9',
  'CLASS_10',
  'CLASS_11',
  'CLASS_12',
  'DROPPER',
  'FOUNDATION',
]

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized. Please sign in.' }, { status: 401 })
    }
    const role = session.user.role?.toUpperCase()
    if (role !== 'ADMIN' && role !== 'TEACHER') {
      return NextResponse.json(
        { error: 'Forbidden. Admin or teacher access required.' },
        { status: 403 }
      )
    }

    const { id } = await params

    const group = await prisma.student_groups.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        classLevel: true,
        startDate: true,
        endDate: true,
        createdBy: true,
        createdAt: true,
        student_group_members: {
          orderBy: { addedAt: 'desc' },
          select: {
            id: true,
            userId: true,
            addedAt: true,
            users: { select: { name: true, email: true, phone: true } },
          },
        },
        group_content: {
          orderBy: { assignedAt: 'desc' },
          select: {
            id: true,
            materialId: true,
            videoLectureId: true,
            testTemplateId: true,
            releaseAt: true,
            dayOffset: true,
            assignedAt: true,
            study_materials: { select: { title: true } },
            video_lectures: { select: { title: true } },
            test_templates: { select: { title: true } },
          },
        },
      },
    })

    if (!group) {
      return NextResponse.json({ error: 'Group not found' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      group: {
        id: group.id,
        name: group.name,
        description: group.description,
        classLevel: group.classLevel,
        startDate: group.startDate,
        endDate: group.endDate,
        createdBy: group.createdBy,
        createdAt: group.createdAt,
        members: group.student_group_members.map((m) => ({
          id: m.id,
          userId: m.userId,
          name: m.users.name,
          email: m.users.email,
          phone: m.users.phone,
          addedAt: m.addedAt,
        })),
        content: group.group_content.map((c) => ({
          id: c.id,
          type: c.materialId ? 'material' : c.videoLectureId ? 'video' : 'test',
          refId: c.materialId || c.videoLectureId || c.testTemplateId,
          title:
            c.study_materials?.title ||
            c.video_lectures?.title ||
            c.test_templates?.title ||
            'Unknown item',
          releaseAt: c.releaseAt,
          dayOffset: c.dayOffset,
          assignedAt: c.assignedAt,
        })),
      },
    })
  } catch (error) {
    if (isGroupsNotProvisioned(error)) return groupsNotProvisionedResponse()
    console.error('Failed to fetch group:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch group' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized. Please sign in.' }, { status: 401 })
    }
    if (session.user.role?.toUpperCase() !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden. Admin access required.' }, { status: 403 })
    }

    const { id } = await params
    const body = await request.json().catch(() => null)
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Request body is required' }, { status: 400 })
    }

    const data: {
      name?: string
      description?: string | null
      classLevel?: StudentClass | null
      startDate?: Date | null
      endDate?: Date | null
    } = {}

    if (body.name !== undefined) {
      const name = typeof body.name === 'string' ? body.name.trim() : ''
      if (!name) {
        return NextResponse.json({ error: 'name cannot be empty' }, { status: 400 })
      }
      data.name = name
    }
    if (body.description !== undefined) {
      data.description =
        typeof body.description === 'string' && body.description.trim()
          ? body.description.trim()
          : null
    }
    if (body.classLevel !== undefined) {
      if (body.classLevel === null || body.classLevel === '') {
        data.classLevel = null
      } else if (CLASS_LEVELS.includes(body.classLevel)) {
        data.classLevel = body.classLevel
      } else {
        return NextResponse.json(
          { error: `classLevel must be one of: ${CLASS_LEVELS.join(', ')}` },
          { status: 400 }
        )
      }
    }
    for (const field of ['startDate', 'endDate'] as const) {
      if (body[field] !== undefined) {
        if (body[field] === null || body[field] === '') {
          data[field] = null
        } else {
          const date = new Date(body[field])
          if (isNaN(date.getTime())) {
            return NextResponse.json({ error: `${field} is not a valid date` }, { status: 400 })
          }
          data[field] = date
        }
      }
    }

    if (Object.keys(data).length === 0) {
      return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 })
    }

    const existing = await prisma.student_groups.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ error: 'Group not found' }, { status: 404 })
    }

    const start = data.startDate !== undefined ? data.startDate : existing.startDate
    const end = data.endDate !== undefined ? data.endDate : existing.endDate
    if (start && end && end.getTime() < start.getTime()) {
      return NextResponse.json({ error: 'endDate cannot be before startDate' }, { status: 400 })
    }

    const group = await prisma.student_groups.update({ where: { id }, data })
    return NextResponse.json({ success: true, group })
  } catch (error) {
    if (isGroupsNotProvisioned(error)) return groupsNotProvisionedResponse()
    console.error('Failed to update group:', error)
    return NextResponse.json({ success: false, error: 'Failed to update group' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized. Please sign in.' }, { status: 401 })
    }
    if (session.user.role?.toUpperCase() !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden. Admin access required.' }, { status: 403 })
    }

    const { id } = await params

    const existing = await prisma.student_groups.findUnique({ where: { id }, select: { id: true } })
    if (!existing) {
      return NextResponse.json({ error: 'Group not found' }, { status: 404 })
    }

    // Explicit cleanup inside a transaction (belt-and-braces alongside the
    // SQL ON DELETE CASCADE) — removes assignments + memberships, never the
    // underlying users/materials/videos/tests.
    await prisma.$transaction([
      prisma.group_content.deleteMany({ where: { groupId: id } }),
      prisma.student_group_members.deleteMany({ where: { groupId: id } }),
      prisma.student_groups.delete({ where: { id } }),
    ])

    return NextResponse.json({ success: true, deleted: id })
  } catch (error) {
    if (isGroupsNotProvisioned(error)) return groupsNotProvisionedResponse()
    console.error('Failed to delete group:', error)
    return NextResponse.json({ success: false, error: 'Failed to delete group' }, { status: 500 })
  }
}
