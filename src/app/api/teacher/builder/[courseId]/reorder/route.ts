import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

/**
 * Course builder — one-shot drag-and-drop reorder (TEACHER/ADMIN).
 *
 * PATCH { chapterIds: string[] }            — full chapter order for the course
 * PATCH { chapterId, topicIds: string[] }   — full topic order within a chapter
 *
 * The submitted list must cover exactly the rows that exist (ids are verified
 * against the DB) — orderIndex is rewritten to array position for ALL rows in
 * one transaction, self-healing any duplicate indexes.
 */

const bodySchema = z.union([
  z.object({ chapterIds: z.array(z.string()).min(1) }),
  z.object({ chapterId: z.string(), topicIds: z.array(z.string()).min(1) }),
])

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  const session = await auth()
  const role = session?.user?.role
  if (!session || (role !== 'TEACHER' && role !== 'ADMIN')) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized. Teacher access required.' },
      { status: 401 }
    )
  }
  const { courseId } = await params

  const parsed = bodySchema.safeParse(await req.json().catch(() => ({})))
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: 'Invalid reorder payload' }, { status: 400 })
  }

  try {
    if ('chapterIds' in parsed.data) {
      const { chapterIds } = parsed.data
      const existing = await prisma.chapters.findMany({
        where: { courseId },
        select: { id: true },
      })
      const existingIds = new Set(existing.map((c) => c.id))
      if (
        chapterIds.length !== existingIds.size ||
        !chapterIds.every((id) => existingIds.has(id))
      ) {
        return NextResponse.json(
          { success: false, error: 'Order list does not match the course chapters — reload' },
          { status: 409 }
        )
      }
      await prisma.$transaction(
        chapterIds.map((id, i) =>
          prisma.chapters.update({ where: { id }, data: { orderIndex: i, updatedAt: new Date() } })
        )
      )
      return NextResponse.json({ success: true })
    }

    const { chapterId, topicIds } = parsed.data
    const chapter = await prisma.chapters.findFirst({
      where: { id: chapterId, courseId },
      select: { id: true },
    })
    if (!chapter) {
      return NextResponse.json({ success: false, error: 'Chapter not found' }, { status: 404 })
    }
    const existing = await prisma.topics.findMany({ where: { chapterId }, select: { id: true } })
    const existingIds = new Set(existing.map((t) => t.id))
    if (topicIds.length !== existingIds.size || !topicIds.every((id) => existingIds.has(id))) {
      return NextResponse.json(
        { success: false, error: 'Order list does not match the chapter topics — reload' },
        { status: 409 }
      )
    }
    await prisma.$transaction(
      topicIds.map((id, i) =>
        prisma.topics.update({ where: { id }, data: { orderIndex: i, updatedAt: new Date() } })
      )
    )
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[builder/reorder] failed:', error)
    return NextResponse.json({ success: false, error: 'Reorder failed' }, { status: 500 })
  }
}
