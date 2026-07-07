import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

/**
 * Course builder — chapter operations (TEACHER/ADMIN).
 *
 * PATCH  — update { title?, description?, releaseAt?, requiresPrevious?,
 *          isActive?, orderIndex? } (null releaseAt clears the drip).
 * DELETE — remove the chapter (cascades topics/materials links per schema).
 * POST   — add a topic { title, description? } (appended last).
 */

async function requireTeacher() {
  const session = await auth()
  const role = session?.user?.role
  if (!session || (role !== 'TEACHER' && role !== 'ADMIN')) return null
  return session
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireTeacher()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized. Teacher access required.' }, { status: 401 })
  }
  const { id } = await params
  const body = await req.json().catch(() => ({}))

  // Atomic reorder: { move: 'up' | 'down' }. Re-fetches the course's chapters
  // in order, swaps positions, and rewrites orderIndex = array position for ALL
  // of them in one transaction — self-healing if duplicates ever crept in.
  if (body.move === 'up' || body.move === 'down') {
    const target = await prisma.chapters.findUnique({
      where: { id },
      select: { id: true, courseId: true },
    })
    if (!target) {
      return NextResponse.json({ success: false, error: 'Chapter not found' }, { status: 404 })
    }
    const siblings = await prisma.chapters.findMany({
      where: { courseId: target.courseId },
      orderBy: [{ orderIndex: 'asc' }, { createdAt: 'asc' }],
      select: { id: true },
    })
    const idx = siblings.findIndex((c) => c.id === id)
    const swapWith = body.move === 'up' ? idx - 1 : idx + 1
    if (idx < 0 || swapWith < 0 || swapWith >= siblings.length) {
      return NextResponse.json({ success: true, moved: false })
    }
    const order = siblings.map((c) => c.id)
    ;[order[idx], order[swapWith]] = [order[swapWith], order[idx]]
    await prisma.$transaction(
      order.map((chapterId, i) =>
        prisma.chapters.update({
          where: { id: chapterId },
          data: { orderIndex: i, updatedAt: new Date() },
        })
      )
    )
    return NextResponse.json({ success: true, moved: true })
  }

  const data: Record<string, unknown> = { updatedAt: new Date() }
  if (body.title !== undefined) {
    const t = body.title.toString().trim()
    if (!t) return NextResponse.json({ success: false, error: 'Title required' }, { status: 400 })
    data.title = t
  }
  if (body.description !== undefined) data.description = body.description?.toString().trim() || null
  if (body.releaseAt !== undefined)
    data.releaseAt = body.releaseAt ? new Date(body.releaseAt) : null
  if (body.dripDaysAfterEnroll !== undefined) {
    const days =
      body.dripDaysAfterEnroll === null || body.dripDaysAfterEnroll === ''
        ? null
        : parseInt(String(body.dripDaysAfterEnroll), 10)
    if (days !== null && (!Number.isFinite(days) || days < 0 || days > 3650)) {
      return NextResponse.json(
        { success: false, error: 'Drip days must be between 0 and 3650' },
        { status: 400 }
      )
    }
    data.dripDaysAfterEnroll = days
  }
  if (body.requiresPrevious !== undefined) data.requiresPrevious = Boolean(body.requiresPrevious)
  if (body.isActive !== undefined) data.isActive = Boolean(body.isActive)
  if (typeof body.orderIndex === 'number') data.orderIndex = body.orderIndex

  try {
    const chapter = await prisma.chapters.update({ where: { id }, data })
    return NextResponse.json({ success: true, chapter })
  } catch {
    return NextResponse.json({ success: false, error: 'Chapter not found' }, { status: 404 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireTeacher()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized. Teacher access required.' }, { status: 401 })
  }
  const { id } = await params
  try {
    await prisma.chapters.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: false, error: 'Chapter not found' }, { status: 404 })
  }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireTeacher()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized. Teacher access required.' }, { status: 401 })
  }
  const { id: chapterId } = await params
  const body = await req.json().catch(() => ({}))
  const title: string = (body.title || '').toString().trim()
  if (!title) {
    return NextResponse.json({ success: false, error: 'Title is required' }, { status: 400 })
  }

  const chapter = await prisma.chapters.findUnique({
    where: { id: chapterId },
    select: { id: true },
  })
  if (!chapter) {
    return NextResponse.json({ success: false, error: 'Chapter not found' }, { status: 404 })
  }

  const last = await prisma.topics.findFirst({
    where: { chapterId },
    orderBy: { orderIndex: 'desc' },
    select: { orderIndex: true },
  })

  const topic = await prisma.topics.create({
    data: {
      id: `tp_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
      chapterId,
      title,
      description: (body.description || '').toString().trim() || null,
      orderIndex: (last?.orderIndex ?? -1) + 1,
      updatedAt: new Date(),
    },
  })

  return NextResponse.json({ success: true, topic }, { status: 201 })
}
