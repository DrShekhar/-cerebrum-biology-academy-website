/**
 * Teacher Worksheet Grading API
 *
 * PATCH /api/teacher/worksheets/[worksheetId]/submissions/[submissionId]/grade
 * Set grade and/or feedback on a worksheet submission so it reaches the
 * student's unified feedback feed. Worksheets have no owning teacher column,
 * so the gate is role-based (TEACHER/ADMIN).
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ worksheetId: string; submissionId: string }> }
) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized. Please sign in.' }, { status: 401 })
    }
    if (session.user.role !== 'TEACHER' && session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Forbidden. Teacher or admin access required.' },
        { status: 403 }
      )
    }

    const { worksheetId, submissionId } = await params
    const body = await request.json().catch(() => null)
    if (!body || (body.grade === undefined && body.feedback === undefined)) {
      return NextResponse.json({ error: 'Provide grade and/or feedback' }, { status: 400 })
    }

    const { grade, feedback } = body as { grade?: number | null; feedback?: string | null }

    const worksheet = await prisma.worksheets.findUnique({
      where: { id: worksheetId },
      select: { id: true, maxMarks: true },
    })
    if (!worksheet) {
      return NextResponse.json({ error: 'Worksheet not found' }, { status: 404 })
    }

    const submission = await prisma.worksheet_submissions.findFirst({
      where: { id: submissionId, worksheetId },
      select: { id: true, status: true, submittedAt: true },
    })
    if (!submission) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 })
    }
    if (!submission.submittedAt) {
      return NextResponse.json(
        { error: 'Cannot grade a submission that has not been submitted' },
        { status: 400 }
      )
    }

    if (grade !== undefined && grade !== null) {
      const numericGrade = Number(grade)
      if (Number.isNaN(numericGrade) || numericGrade < 0) {
        return NextResponse.json({ error: 'Grade must be a non-negative number' }, { status: 400 })
      }
      if (worksheet.maxMarks !== null && numericGrade > worksheet.maxMarks) {
        return NextResponse.json(
          { error: `Grade must be between 0 and ${worksheet.maxMarks}` },
          { status: 400 }
        )
      }
    }

    const updated = await prisma.worksheet_submissions.update({
      where: { id: submissionId },
      data: {
        ...(grade !== undefined ? { grade: grade === null ? null : Number(grade) } : {}),
        ...(feedback !== undefined ? { feedback: feedback || null } : {}),
        status: 'GRADED',
        gradedAt: new Date(),
      },
      include: {
        worksheets: { select: { id: true, title: true, maxMarks: true } },
        users: { select: { id: true, name: true, email: true } },
      },
    })

    const { users, worksheets, ...submissionRest } = updated
    return NextResponse.json({
      success: true,
      message: 'Worksheet submission graded successfully',
      submission: { ...submissionRest, student: users, worksheet: worksheets },
    })
  } catch (error) {
    console.error('Failed to grade worksheet submission:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to grade worksheet submission',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
