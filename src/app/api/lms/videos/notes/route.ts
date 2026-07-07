/**
 * In-player video notes (LearnWorlds-style) — a student's own timestamped
 * notes on a lecture. Notes are strictly user-scoped: you only ever see and
 * touch your own.
 *
 * GET    ?videoLectureId=…             — own notes, timestamp asc
 * POST   { videoLectureId, timestamp, content } — add a note
 * DELETE ?id=…                          — delete own note
 */

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    const videoLectureId = request.nextUrl.searchParams.get('videoLectureId')
    if (!videoLectureId) {
      return NextResponse.json(
        { success: false, error: 'videoLectureId is required' },
        { status: 400 }
      )
    }

    const notes = await prisma.video_notes.findMany({
      where: { videoLectureId, userId: session.user.id },
      select: { id: true, timestamp: true, content: true, createdAt: true },
      orderBy: { timestamp: 'asc' },
    })

    return NextResponse.json({ success: true, data: { notes } })
  } catch (error) {
    console.error('[lms/videos/notes] GET failed:', error)
    return NextResponse.json({ success: false, error: 'Failed to load notes' }, { status: 500 })
  }
}

const postSchema = z.object({
  videoLectureId: z.string().min(1),
  timestamp: z.number().int().min(0),
  content: z.string().min(1).max(2000),
})

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const parsed = postSchema.safeParse(await request.json().catch(() => ({})))
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: 'Invalid note payload' }, { status: 400 })
    }

    const lecture = await prisma.video_lectures.findUnique({
      where: { id: parsed.data.videoLectureId },
      select: { id: true },
    })
    if (!lecture) {
      return NextResponse.json({ success: false, error: 'Video not found' }, { status: 404 })
    }

    const note = await prisma.video_notes.create({
      data: {
        id: `vn_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
        videoLectureId: parsed.data.videoLectureId,
        userId: session.user.id,
        timestamp: parsed.data.timestamp,
        content: parsed.data.content.trim(),
        updatedAt: new Date(),
      },
      select: { id: true, timestamp: true, content: true, createdAt: true },
    })

    return NextResponse.json({ success: true, data: { note } }, { status: 201 })
  } catch (error) {
    console.error('[lms/videos/notes] POST failed:', error)
    return NextResponse.json({ success: false, error: 'Failed to save note' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    const id = request.nextUrl.searchParams.get('id')
    if (!id) {
      return NextResponse.json({ success: false, error: 'id is required' }, { status: 400 })
    }

    // deleteMany scoped by userId: never deletes someone else's note.
    const result = await prisma.video_notes.deleteMany({
      where: { id, userId: session.user.id },
    })
    if (result.count === 0) {
      return NextResponse.json({ success: false, error: 'Note not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[lms/videos/notes] DELETE failed:', error)
    return NextResponse.json({ success: false, error: 'Failed to delete note' }, { status: 500 })
  }
}
