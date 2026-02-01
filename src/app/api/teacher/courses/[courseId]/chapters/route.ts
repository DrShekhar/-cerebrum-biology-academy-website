/**
 * Teacher Course Chapters API
 * GET /api/teacher/courses/[courseId]/chapters - Get chapters for a course
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function GET(request: NextRequest, { params }: { params: { courseId: string } }) {
  try {
    const session = await auth()
    if (!session || session.user.role !== 'TEACHER') {
      return NextResponse.json({ error: 'Unauthorized. Teacher access required.' }, { status: 401 })
    }

    const { courseId } = params

    const chapters = await prisma.chapters.findMany({
      where: {
        courseId,
        isActive: true,
      },
      select: {
        id: true,
        title: true,
        description: true,
        orderIndex: true,
      },
      orderBy: {
        orderIndex: 'asc',
      },
    })

    return NextResponse.json({
      success: true,
      chapters,
    })
  } catch (error) {
    console.error('Failed to fetch chapters:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch chapters',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
