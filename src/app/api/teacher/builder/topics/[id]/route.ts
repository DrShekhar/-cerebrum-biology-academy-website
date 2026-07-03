import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

/**
 * Course builder — topic operations (TEACHER/ADMIN).
 * PATCH  — update { title?, description?, isActive?, orderIndex? }.
 * DELETE — remove the topic.
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
  if (body.isActive !== undefined) data.isActive = Boolean(body.isActive)
  if (typeof body.orderIndex === 'number') data.orderIndex = body.orderIndex

  try {
    const topic = await prisma.topics.update({ where: { id }, data })
    return NextResponse.json({ success: true, topic })
  } catch {
    return NextResponse.json({ success: false, error: 'Topic not found' }, { status: 404 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireTeacher()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized. Teacher access required.' }, { status: 401 })
  }
  const { id } = await params
  try {
    await prisma.topics.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: false, error: 'Topic not found' }, { status: 404 })
  }
}
