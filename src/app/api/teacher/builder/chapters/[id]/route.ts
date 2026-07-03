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

  const data: Record<string, unknown> = { updatedAt: new Date() }
  if (body.title !== undefined) {
    const t = body.title.toString().trim()
    if (!t) return NextResponse.json({ success: false, error: 'Title required' }, { status: 400 })
    data.title = t
  }
  if (body.description !== undefined) data.description = body.description?.toString().trim() || null
  if (body.releaseAt !== undefined)
    data.releaseAt = body.releaseAt ? new Date(body.releaseAt) : null
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
