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

export async function POST(request: NextRequest) {
  try {
    const session = await requireAdmin()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 401 })
    }

    const body = await request.json()
    const { courseId, title, description } = body
    if (!courseId || !title?.trim()) {
      return NextResponse.json(
        { success: false, error: 'courseId and title are required' },
        { status: 400 }
      )
    }

    // Append to the end of the course's chapter list.
    const last = await prisma.chapters.findFirst({
      where: { courseId },
      orderBy: { orderIndex: 'desc' },
      select: { orderIndex: true },
    })

    const chapter = await prisma.chapters.create({
      data: {
        id: `chapter_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
        courseId,
        title: title.trim(),
        description: description?.trim() || null,
        orderIndex: (last?.orderIndex ?? -1) + 1,
        updatedAt: new Date(),
      },
    })

    return NextResponse.json({ success: true, chapter }, { status: 201 })
  } catch (error) {
    console.error('Error creating chapter:', error)
    return NextResponse.json({ success: false, error: 'Failed to create chapter' }, { status: 500 })
  }
}
