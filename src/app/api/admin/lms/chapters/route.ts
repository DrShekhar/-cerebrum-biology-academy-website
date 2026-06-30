/**
 * Admin LMS — Chapters API
 *
 * GET: list chapters (with topics) for a course. Used by the video uploader and
 * the curriculum builder. Write methods (POST/PUT/DELETE) are added by the
 * curriculum-builder work.
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

async function requireAdmin() {
  const session = await auth()
  if (!session || session.user.role?.toUpperCase() !== 'ADMIN') {
    return null
  }
  return session
}

export async function GET(request: NextRequest) {
  try {
    const session = await requireAdmin()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 401 })
    }

    const courseId = request.nextUrl.searchParams.get('courseId')
    if (!courseId) {
      return NextResponse.json({ error: 'courseId is required' }, { status: 400 })
    }

    const chapters = await prisma.chapters.findMany({
      where: { courseId },
      orderBy: { orderIndex: 'asc' },
      include: {
        topics: {
          select: { id: true, title: true, orderIndex: true },
          orderBy: { orderIndex: 'asc' },
        },
      },
    })

    return NextResponse.json({ success: true, chapters })
  } catch (error) {
    console.error('Error fetching chapters:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch chapters' }, { status: 500 })
  }
}
