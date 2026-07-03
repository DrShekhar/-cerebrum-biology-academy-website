import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

/**
 * Course builder — tree + chapter creation (TEACHER/ADMIN).
 *
 * GET  /api/teacher/builder/[courseId] — full authoring tree:
 *      course → chapters (with drip/prerequisite) → topics + material counts.
 * POST /api/teacher/builder/[courseId] — create a chapter
 *      { title, description?, releaseAt?, requiresPrevious? } (appended last).
 */

async function requireTeacher() {
  const session = await auth()
  const role = session?.user?.role
  if (!session || (role !== 'TEACHER' && role !== 'ADMIN')) return null
  return session
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  const session = await requireTeacher()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized. Teacher access required.' }, { status: 401 })
  }
  const { courseId } = await params

  const course = await prisma.courses.findUnique({
    where: { id: courseId },
    select: { id: true, name: true, description: true, isActive: true },
  })
  if (!course) {
    return NextResponse.json({ success: false, error: 'Course not found' }, { status: 404 })
  }

  const chapters = await prisma.chapters.findMany({
    where: { courseId },
    orderBy: { orderIndex: 'asc' },
    select: {
      id: true,
      title: true,
      description: true,
      orderIndex: true,
      isActive: true,
      releaseAt: true,
      requiresPrevious: true,
      topics: {
        orderBy: { orderIndex: 'asc' },
        select: {
          id: true,
          title: true,
          orderIndex: true,
          isActive: true,
          _count: { select: { study_materials: true } },
        },
      },
      _count: { select: { study_materials: true } },
    },
  })

  return NextResponse.json({
    success: true,
    course,
    chapters: chapters.map((c) => ({
      id: c.id,
      title: c.title,
      description: c.description,
      orderIndex: c.orderIndex,
      isActive: c.isActive,
      releaseAt: c.releaseAt,
      requiresPrevious: c.requiresPrevious,
      materialCount: c._count.study_materials,
      topics: c.topics.map((t) => ({
        id: t.id,
        title: t.title,
        orderIndex: t.orderIndex,
        isActive: t.isActive,
        materialCount: t._count.study_materials,
      })),
    })),
  })
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  const session = await requireTeacher()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized. Teacher access required.' }, { status: 401 })
  }
  const { courseId } = await params
  const body = await req.json().catch(() => ({}))
  const title: string = (body.title || '').toString().trim()
  if (!title) {
    return NextResponse.json({ success: false, error: 'Title is required' }, { status: 400 })
  }

  const course = await prisma.courses.findUnique({ where: { id: courseId }, select: { id: true } })
  if (!course) {
    return NextResponse.json({ success: false, error: 'Course not found' }, { status: 404 })
  }

  const last = await prisma.chapters.findFirst({
    where: { courseId },
    orderBy: { orderIndex: 'desc' },
    select: { orderIndex: true },
  })

  const chapter = await prisma.chapters.create({
    data: {
      id: `ch_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
      courseId,
      title,
      description: (body.description || '').toString().trim() || null,
      orderIndex: (last?.orderIndex ?? -1) + 1,
      releaseAt: body.releaseAt ? new Date(body.releaseAt) : null,
      requiresPrevious: Boolean(body.requiresPrevious),
      updatedAt: new Date(),
    },
  })

  return NextResponse.json({ success: true, chapter }, { status: 201 })
}
