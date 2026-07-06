/**
 * Teacher Worksheet Submissions API
 *
 * GET /api/teacher/worksheets/[worksheetId]/submissions - Submissions with
 * student info for the grading view
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ worksheetId: string }> }
) {
  try {
    const session = await auth()
    if (!session || (session.user.role !== 'TEACHER' && session.user.role !== 'ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized. Teacher access required.' }, { status: 401 })
    }

    const { worksheetId } = await params

    const worksheet = await prisma.worksheets.findUnique({
      where: { id: worksheetId },
      select: { id: true, title: true, maxMarks: true },
    })
    if (!worksheet) {
      return NextResponse.json({ error: 'Worksheet not found' }, { status: 404 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')

    const submissions = await prisma.worksheet_submissions.findMany({
      where: {
        worksheetId,
        ...(status ? { status } : {}),
      },
      select: {
        id: true,
        status: true,
        grade: true,
        feedback: true,
        isLate: true,
        timeSpent: true,
        submittedAt: true,
        gradedAt: true,
        attachments: true,
        users: {
          select: { id: true, name: true, email: true },
        },
      },
      orderBy: [{ status: 'asc' }, { submittedAt: 'desc' }],
    })

    return NextResponse.json({
      success: true,
      worksheet,
      submissions: submissions.map((s) => ({
        id: s.id,
        status: s.status,
        grade: s.grade,
        feedback: s.feedback,
        isLate: s.isLate,
        timeSpent: s.timeSpent,
        submittedAt: s.submittedAt,
        gradedAt: s.gradedAt,
        attachments: s.attachments,
        student: s.users,
      })),
    })
  } catch (error) {
    console.error('Failed to fetch worksheet submissions:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch submissions' },
      { status: 500 }
    )
  }
}
