/**
 * Teacher Videos API
 * GET /api/teacher/videos — list video lectures (with checkpoint counts) so
 * teachers have a discoverable entry point to the interactive-video checkpoint
 * editor at /teacher/videos/[videoLectureId]/checkpoints.
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session || (session.user.role !== 'TEACHER' && session.user.role !== 'ADMIN')) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Teacher access required.' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')?.trim()

    const lectures = await prisma.video_lectures.findMany({
      where: search ? { title: { contains: search, mode: 'insensitive' } } : undefined,
      orderBy: { createdAt: 'desc' },
      take: 200,
      select: {
        id: true,
        title: true,
        duration: true,
        uploadStatus: true,
        createdAt: true,
        study_materials: {
          select: {
            courses: { select: { name: true } },
            chapters: { select: { title: true } },
          },
        },
        _count: { select: { video_checkpoints: true } },
      },
    })

    const data = lectures.map((l) => ({
      id: l.id,
      title: l.title,
      duration: l.duration,
      uploadStatus: l.uploadStatus,
      createdAt: l.createdAt,
      courseName: l.study_materials?.courses?.name || null,
      chapterTitle: l.study_materials?.chapters?.title || null,
      checkpointCount: l._count.video_checkpoints,
    }))

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Failed to list teacher videos:', error)
    return NextResponse.json({ success: false, error: 'Failed to load videos' }, { status: 500 })
  }
}
