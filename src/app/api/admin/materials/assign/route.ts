/**
 * Admin Material Assignment API
 *
 * POST /api/admin/materials/assign - Grant students access to a study material
 *
 * Targets can be individual userIds, a student group (members resolved), a
 * course (ACTIVE enrollments resolved), or any combination. Grants are
 * idempotent (material_access has a unique [materialId, userId] constraint;
 * duplicates are skipped).
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function POST(request: NextRequest) {
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

    const body = await request.json().catch(() => null)
    if (!body || typeof body.materialId !== 'string' || !body.materialId) {
      return NextResponse.json({ error: 'materialId is required' }, { status: 400 })
    }

    const { materialId, userIds, groupId, courseId } = body as {
      materialId: string
      userIds?: string[]
      groupId?: string
      courseId?: string
    }

    if ((!Array.isArray(userIds) || userIds.length === 0) && !groupId && !courseId) {
      return NextResponse.json(
        { error: 'Provide at least one target: userIds, groupId or courseId' },
        { status: 400 }
      )
    }

    const material = await prisma.study_materials.findUnique({
      where: { id: materialId },
      select: { id: true, title: true },
    })
    if (!material) {
      return NextResponse.json({ error: 'Material not found' }, { status: 404 })
    }

    const targetIds = new Set<string>()

    if (Array.isArray(userIds)) {
      for (const id of userIds) {
        if (typeof id === 'string' && id) targetIds.add(id)
      }
    }

    if (groupId) {
      try {
        const members = await prisma.student_group_members.findMany({
          where: { groupId },
          select: { userId: true },
        })
        for (const m of members) targetIds.add(m.userId)
      } catch (error) {
        return NextResponse.json(
          {
            error:
              'Groups are not provisioned yet. Run scripts/apply-student-groups.sh, then retry.',
          },
          { status: 400 }
        )
      }
    }

    if (courseId) {
      const enrollments = await prisma.enrollments.findMany({
        where: { courseId, status: 'ACTIVE' },
        select: { userId: true },
      })
      for (const e of enrollments) targetIds.add(e.userId)
    }

    if (targetIds.size === 0) {
      return NextResponse.json({
        success: true,
        granted: 0,
        targeted: 0,
        message: 'No students resolved for the given targets',
      })
    }

    // Only grant to users that actually exist (invalid ids would break the FK)
    const existingUsers = await prisma.users.findMany({
      where: { id: { in: Array.from(targetIds) } },
      select: { id: true },
    })

    const reason = groupId
      ? `Assigned via group ${groupId}`
      : courseId
        ? `Assigned via course ${courseId}`
        : 'Assigned individually'

    const records = existingUsers.map((user, index) => ({
      id: `matacc_${Date.now()}_${index}_${Math.random().toString(36).slice(2, 9)}`,
      materialId,
      userId: user.id,
      grantedBy: session.user.id,
      grantedAt: new Date(),
      reason,
    }))

    const result = await prisma.material_access.createMany({
      data: records,
      skipDuplicates: true,
    })

    return NextResponse.json({
      success: true,
      material: { id: material.id, title: material.title },
      targeted: records.length,
      granted: result.count,
      alreadyHadAccess: records.length - result.count,
    })
  } catch (error) {
    console.error('Failed to assign material:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to assign material',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
