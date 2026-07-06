/**
 * Admin Student Groups API
 *
 * GET  /api/admin/groups - List groups with member/content counts (ADMIN/TEACHER)
 * POST /api/admin/groups - Create a group (ADMIN)
 *
 * Groups (batches/cohorts) are admin-curated sets of students that receive
 * materials/videos/tests as a unit, with optional drip scheduling. Tables are
 * owner-provisioned (scripts/apply-student-groups.sh) — both handlers fail
 * soft with a 400 when the tables are missing.
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

export async function GET() {
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

    const groups = await prisma.student_groups.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        description: true,
        classLevel: true,
        startDate: true,
        endDate: true,
        createdAt: true,
        _count: { select: { student_group_members: true, group_content: true } },
      },
    })

    return NextResponse.json({
      success: true,
      groups: groups.map((g) => ({
        id: g.id,
        name: g.name,
        description: g.description,
        classLevel: g.classLevel,
        startDate: g.startDate,
        endDate: g.endDate,
        createdAt: g.createdAt,
        memberCount: g._count.student_group_members,
        contentCount: g._count.group_content,
      })),
    })
  } catch (error) {
    if (isGroupsNotProvisioned(error)) return groupsNotProvisionedResponse()
    console.error('Failed to list groups:', error)
    return NextResponse.json({ success: false, error: 'Failed to list groups' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized. Please sign in.' }, { status: 401 })
    }
    if (session.user.role?.toUpperCase() !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden. Admin access required.' }, { status: 403 })
    }

    const body = await request.json().catch(() => null)
    const name = typeof body?.name === 'string' ? body.name.trim() : ''
    if (!name) {
      return NextResponse.json({ error: 'name is required' }, { status: 400 })
    }

    const description =
      typeof body.description === 'string' && body.description.trim()
        ? body.description.trim()
        : null

    let classLevel: StudentClass | null = null
    if (body.classLevel) {
      if (!CLASS_LEVELS.includes(body.classLevel)) {
        return NextResponse.json(
          { error: `classLevel must be one of: ${CLASS_LEVELS.join(', ')}` },
          { status: 400 }
        )
      }
      classLevel = body.classLevel
    }

    let startDate: Date | null = null
    let endDate: Date | null = null
    if (body.startDate) {
      startDate = new Date(body.startDate)
      if (isNaN(startDate.getTime())) {
        return NextResponse.json({ error: 'startDate is not a valid date' }, { status: 400 })
      }
    }
    if (body.endDate) {
      endDate = new Date(body.endDate)
      if (isNaN(endDate.getTime())) {
        return NextResponse.json({ error: 'endDate is not a valid date' }, { status: 400 })
      }
    }
    if (startDate && endDate && endDate.getTime() < startDate.getTime()) {
      return NextResponse.json({ error: 'endDate cannot be before startDate' }, { status: 400 })
    }

    const group = await prisma.student_groups.create({
      data: {
        id: `sgrp_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
        name,
        description,
        classLevel,
        startDate,
        endDate,
        createdBy: session.user.id,
      },
    })

    return NextResponse.json({ success: true, group }, { status: 201 })
  } catch (error) {
    if (isGroupsNotProvisioned(error)) return groupsNotProvisionedResponse()
    console.error('Failed to create group:', error)
    return NextResponse.json({ success: false, error: 'Failed to create group' }, { status: 500 })
  }
}
