/**
 * Admin Student Group Content API
 *
 * POST   /api/admin/groups/[id]/content - Assign one item to the group (ADMIN/TEACHER)
 *        { materialId? | videoLectureId? | testTemplateId?, releaseAt?, dayOffset? }
 *        Exactly one item ref; releaseAt (absolute) and dayOffset (days after
 *        group startDate) are optional drip controls — at most one of them.
 * DELETE /api/admin/groups/[id]/content - Remove an assignment { contentId } (ADMIN/TEACHER)
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import {
  isGroupsNotProvisioned,
  groupsNotProvisionedResponse,
} from '@/lib/admin/groupsProvisioning'

async function requireStaffSession() {
  const session = await auth()
  if (!session) {
    return {
      session: null,
      response: NextResponse.json({ error: 'Unauthorized. Please sign in.' }, { status: 401 }),
    }
  }
  const role = session.user.role?.toUpperCase()
  if (role !== 'ADMIN' && role !== 'TEACHER') {
    return {
      session: null,
      response: NextResponse.json(
        { error: 'Forbidden. Admin or teacher access required.' },
        { status: 403 }
      ),
    }
  }
  return { session, response: null }
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { session, response } = await requireStaffSession()
    if (!session) return response

    const { id: groupId } = await params
    const body = await request.json().catch(() => null)
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Request body is required' }, { status: 400 })
    }

    const materialId =
      typeof body.materialId === 'string' && body.materialId ? body.materialId : null
    const videoLectureId =
      typeof body.videoLectureId === 'string' && body.videoLectureId ? body.videoLectureId : null
    const testTemplateId =
      typeof body.testTemplateId === 'string' && body.testTemplateId ? body.testTemplateId : null

    const refCount = [materialId, videoLectureId, testTemplateId].filter(Boolean).length
    if (refCount !== 1) {
      return NextResponse.json(
        { error: 'Provide exactly one of: materialId, videoLectureId, testTemplateId' },
        { status: 400 }
      )
    }

    let releaseAt: Date | null = null
    let dayOffset: number | null = null
    if (body.releaseAt !== undefined && body.releaseAt !== null && body.releaseAt !== '') {
      releaseAt = new Date(body.releaseAt)
      if (isNaN(releaseAt.getTime())) {
        return NextResponse.json({ error: 'releaseAt is not a valid date' }, { status: 400 })
      }
    }
    if (body.dayOffset !== undefined && body.dayOffset !== null && body.dayOffset !== '') {
      dayOffset = Number(body.dayOffset)
      if (!Number.isInteger(dayOffset) || dayOffset < 0) {
        return NextResponse.json(
          { error: 'dayOffset must be a non-negative integer' },
          { status: 400 }
        )
      }
    }
    if (releaseAt && dayOffset !== null) {
      return NextResponse.json(
        { error: 'Provide either releaseAt or dayOffset, not both' },
        { status: 400 }
      )
    }

    const group = await prisma.student_groups.findUnique({
      where: { id: groupId },
      select: { id: true, startDate: true },
    })
    if (!group) {
      return NextResponse.json({ error: 'Group not found' }, { status: 404 })
    }
    if (dayOffset !== null && !group.startDate) {
      return NextResponse.json(
        { error: 'dayOffset drip needs the group to have a startDate — set one first' },
        { status: 400 }
      )
    }

    // Verify the referenced item exists (loose refs would 500 on the FK)
    let title = ''
    if (materialId) {
      const material = await prisma.study_materials.findUnique({
        where: { id: materialId },
        select: { title: true },
      })
      if (!material) return NextResponse.json({ error: 'Material not found' }, { status: 404 })
      title = material.title
    } else if (videoLectureId) {
      const video = await prisma.video_lectures.findUnique({
        where: { id: videoLectureId },
        select: { title: true },
      })
      if (!video) return NextResponse.json({ error: 'Video lecture not found' }, { status: 404 })
      title = video.title
    } else if (testTemplateId) {
      const test = await prisma.test_templates.findUnique({
        where: { id: testTemplateId },
        select: { title: true },
      })
      if (!test) return NextResponse.json({ error: 'Test template not found' }, { status: 404 })
      title = test.title
    }

    // Idempotent: skip if this exact item is already assigned to the group
    const existing = await prisma.group_content.findFirst({
      where: { groupId, materialId, videoLectureId, testTemplateId },
      select: { id: true },
    })
    if (existing) {
      return NextResponse.json({
        success: true,
        alreadyAssigned: true,
        content: { id: existing.id, title },
      })
    }

    const content = await prisma.group_content.create({
      data: {
        id: `gcon_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
        groupId,
        materialId,
        videoLectureId,
        testTemplateId,
        releaseAt,
        dayOffset,
        assignedBy: session.user.id,
      },
    })

    return NextResponse.json(
      { success: true, alreadyAssigned: false, content: { ...content, title } },
      { status: 201 }
    )
  } catch (error) {
    if (isGroupsNotProvisioned(error)) return groupsNotProvisionedResponse()
    console.error('Failed to assign group content:', error)
    return NextResponse.json({ success: false, error: 'Failed to assign content' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { session, response } = await requireStaffSession()
    if (!session) return response

    const { id: groupId } = await params
    const body = await request.json().catch(() => null)
    const contentId =
      typeof (body as { contentId?: unknown } | null)?.contentId === 'string'
        ? (body as { contentId: string }).contentId
        : ''
    if (!contentId) {
      return NextResponse.json({ error: 'contentId is required' }, { status: 400 })
    }

    const result = await prisma.group_content.deleteMany({
      where: { id: contentId, groupId },
    })
    if (result.count === 0) {
      return NextResponse.json({ error: 'Content assignment not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, removed: contentId })
  } catch (error) {
    if (isGroupsNotProvisioned(error)) return groupsNotProvisionedResponse()
    console.error('Failed to remove group content:', error)
    return NextResponse.json({ success: false, error: 'Failed to remove content' }, { status: 500 })
  }
}
