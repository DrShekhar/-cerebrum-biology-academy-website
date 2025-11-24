/**
 * Teacher Chapter Topics API
 * GET /api/teacher/chapters/[chapterId]/topics - Get topics for a chapter
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function GET(request: NextRequest, { params }: { params: { chapterId: string } }) {
  try {
    const session = await auth()
    if (!session || session.user.role !== 'teacher') {
      return NextResponse.json({ error: 'Unauthorized. Teacher access required.' }, { status: 401 })
    }

    const { chapterId } = params

    const topics = await prisma.topics.findMany({
      where: {
        chapterId,
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
      topics,
    })
  } catch (error) {
    console.error('Failed to fetch topics:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch topics',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
