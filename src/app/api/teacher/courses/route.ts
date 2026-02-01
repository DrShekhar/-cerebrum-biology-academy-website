/**
 * Teacher Courses API
 * GET /api/teacher/courses - Get all active courses
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session || session.user.role !== 'TEACHER') {
      return NextResponse.json({ error: 'Unauthorized. Teacher access required.' }, { status: 401 })
    }

    const courses = await prisma.courses.findMany({
      where: {
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        description: true,
        type: true,
        class: true,
      },
      orderBy: {
        sortOrder: 'asc',
      },
    })

    return NextResponse.json({
      success: true,
      courses,
    })
  } catch (error) {
    console.error('Failed to fetch courses:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch courses',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
