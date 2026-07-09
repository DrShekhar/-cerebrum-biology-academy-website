import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export const dynamic = 'force-dynamic'

/**
 * Assignment lessons — a graded lesson where the student submits written work
 * or files, and the teacher grades + gives feedback (the existing
 * assignments / assignment_submissions engine, surfaced as a builder lesson).
 *
 * POST { chapterId, title, instructions, maxMarks, dueDate } — creates an
 * `assignments` row (PUBLISHED) + an ASSIGNMENT `study_materials` lesson that
 * links to it. Students open it at /student/assignments/[assignmentId].
 */

async function requireBuilderAccess() {
  const session = await auth()
  const role = (session?.user?.role || '').toUpperCase()
  if (!session?.user?.id || (role !== 'TEACHER' && role !== 'ADMIN')) return null
  return session
}

const createSchema = z.object({
  chapterId: z.string().min(1),
  title: z.string().trim().min(2).max(200),
  instructions: z.string().trim().max(20_000).optional(),
  maxMarks: z.coerce.number().int().min(1).max(1000),
  dueDate: z.string().min(1),
})

export async function POST(request: NextRequest) {
  const session = await requireBuilderAccess()
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }
  const parsed = createSchema.safeParse(await request.json().catch(() => ({})))
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: 'Invalid assignment' }, { status: 400 })
  }
  const { chapterId, title, instructions, maxMarks, dueDate } = parsed.data
  const due = new Date(dueDate)
  if (Number.isNaN(due.getTime())) {
    return NextResponse.json({ success: false, error: 'Invalid due date' }, { status: 400 })
  }

  try {
    const chapter = await prisma.chapters.findUnique({
      where: { id: chapterId },
      select: { id: true, courseId: true },
    })
    if (!chapter) {
      return NextResponse.json({ success: false, error: 'Chapter not found' }, { status: 404 })
    }

    const count = await prisma.study_materials.count({ where: { chapterId } })

    const result = await prisma.$transaction(async (tx) => {
      const assignment = await tx.assignments.create({
        data: {
          id: `assign_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
          teacherId: session.user.id,
          courseId: chapter.courseId,
          chapterId,
          title,
          description: instructions || title,
          instructions: instructions || null,
          maxMarks,
          dueDate: due,
          status: 'PUBLISHED',
          publishedAt: new Date(),
          updatedAt: new Date(),
        },
      })
      const material = await tx.study_materials.create({
        data: {
          id: `material_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
          title,
          materialType: 'ASSIGNMENT',
          assignmentId: assignment.id,
          fileUrl: '',
          fileName: '',
          fileSize: 0,
          mimeType: 'application/x-assignment',
          courseId: chapter.courseId,
          chapterId,
          accessLevel: 'ENROLLED',
          sortOrder: count,
          uploadedBy: session.user.id,
          isPublished: true,
          publishedAt: new Date(),
          updatedAt: new Date(),
        },
      })
      return { assignment, material }
    })

    return NextResponse.json({ success: true, data: result }, { status: 201 })
  } catch (error) {
    console.error('[builder/assignments] create failed:', error)
    return NextResponse.json(
      { success: false, error: 'Could not create assignment' },
      { status: 500 }
    )
  }
}
