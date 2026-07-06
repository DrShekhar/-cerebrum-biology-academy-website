/**
 * Admin Student Group Members API
 *
 * POST   /api/admin/groups/[id]/members - Add students { userIds: string[] } (ADMIN, idempotent)
 * DELETE /api/admin/groups/[id]/members - Remove students { userIds: string[] } (ADMIN)
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import {
  isGroupsNotProvisioned,
  groupsNotProvisionedResponse,
} from '@/lib/admin/groupsProvisioning'

async function requireAdminSession() {
  const session = await auth()
  if (!session) {
    return {
      session: null,
      response: NextResponse.json({ error: 'Unauthorized. Please sign in.' }, { status: 401 }),
    }
  }
  if (session.user.role?.toUpperCase() !== 'ADMIN') {
    return {
      session: null,
      response: NextResponse.json({ error: 'Forbidden. Admin access required.' }, { status: 403 }),
    }
  }
  return { session, response: null }
}

function parseUserIds(body: unknown): string[] {
  const userIds = (body as { userIds?: unknown } | null)?.userIds
  if (!Array.isArray(userIds)) return []
  return [...new Set(userIds.filter((id): id is string => typeof id === 'string' && !!id))]
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { session, response } = await requireAdminSession()
    if (!session) return response

    const { id: groupId } = await params
    const userIds = parseUserIds(await request.json().catch(() => null))
    if (userIds.length === 0) {
      return NextResponse.json({ error: 'userIds (non-empty array) is required' }, { status: 400 })
    }

    const group = await prisma.student_groups.findUnique({
      where: { id: groupId },
      select: { id: true },
    })
    if (!group) {
      return NextResponse.json({ error: 'Group not found' }, { status: 404 })
    }

    // Only add users that actually exist (invalid ids would break the FK)
    const existingUsers = await prisma.users.findMany({
      where: { id: { in: userIds } },
      select: { id: true },
    })

    const records = existingUsers.map((user, index) => ({
      id: `sgm_${Date.now()}_${index}_${Math.random().toString(36).slice(2, 9)}`,
      groupId,
      userId: user.id,
      addedBy: session.user.id,
      addedAt: new Date(),
    }))

    const result = await prisma.student_group_members.createMany({
      data: records,
      skipDuplicates: true,
    })

    return NextResponse.json({
      success: true,
      requested: userIds.length,
      added: result.count,
      alreadyMembers: records.length - result.count,
      unknownUsers: userIds.length - records.length,
    })
  } catch (error) {
    if (isGroupsNotProvisioned(error)) return groupsNotProvisionedResponse()
    console.error('Failed to add group members:', error)
    return NextResponse.json({ success: false, error: 'Failed to add members' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { session, response } = await requireAdminSession()
    if (!session) return response

    const { id: groupId } = await params
    const userIds = parseUserIds(await request.json().catch(() => null))
    if (userIds.length === 0) {
      return NextResponse.json({ error: 'userIds (non-empty array) is required' }, { status: 400 })
    }

    const result = await prisma.student_group_members.deleteMany({
      where: { groupId, userId: { in: userIds } },
    })

    return NextResponse.json({ success: true, removed: result.count })
  } catch (error) {
    if (isGroupsNotProvisioned(error)) return groupsNotProvisionedResponse()
    console.error('Failed to remove group members:', error)
    return NextResponse.json({ success: false, error: 'Failed to remove members' }, { status: 500 })
  }
}
