/**
 * Teacher — release results for a test assignment.
 *
 * For MANUAL_RELEASE (and any) assignments, flips SUBMITTED submissions to
 * GRADED so the student route reveals scores/answers (it gates reveal on
 * status === 'GRADED'). Auto-graded MCQ scores already exist on submit; this
 * just unlocks visibility.
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function POST(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth()
    if (!session || (session.user.role !== 'TEACHER' && session.user.role !== 'ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized. Teacher access required.' }, { status: 401 })
    }

    const assignment = await prisma.test_assignments.findUnique({
      where: { id: params.id },
      select: { id: true, teacherId: true },
    })
    if (!assignment) {
      return NextResponse.json({ error: 'Assignment not found' }, { status: 404 })
    }
    if (assignment.teacherId !== session.user.id && session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const result = await prisma.test_assignment_submissions.updateMany({
      where: { testAssignmentId: params.id, status: 'SUBMITTED' },
      data: { status: 'GRADED', updatedAt: new Date() },
    })

    return NextResponse.json({ success: true, released: result.count })
  } catch (error) {
    console.error('Failed to release results:', error)
    return NextResponse.json({ success: false, error: 'Failed to release results' }, { status: 500 })
  }
}
