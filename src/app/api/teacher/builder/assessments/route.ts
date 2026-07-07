import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

/**
 * Quiz-as-lesson (TEACHER/ADMIN) — attach an existing test template to a
 * chapter as a curriculum lesson (LearnWorlds/Thinkific "assessment activity").
 *
 * GET  — published, active test templates for the picker.
 * POST — { chapterId, testTemplateId, title? } → creates a study_materials row
 *        of materialType TEST pointing at the template. Completion flows
 *        through the existing CBT session flow (/api/test/create → /test/[id]).
 */

async function requireTeacher() {
  const session = await auth()
  const role = session?.user?.role
  if (!session || (role !== 'TEACHER' && role !== 'ADMIN')) return null
  return session
}

export async function GET() {
  const session = await requireTeacher()
  if (!session) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized. Teacher access required.' },
      { status: 401 }
    )
  }

  const templates = await prisma.test_templates.findMany({
    where: { isActive: true },
    select: {
      id: true,
      title: true,
      type: true,
      difficulty: true,
      timeLimit: true,
      totalQuestions: true,
      isPublished: true,
    },
    orderBy: { createdAt: 'desc' },
    take: 200,
  })

  return NextResponse.json({ success: true, data: { templates } })
}

const postSchema = z.object({
  chapterId: z.string().min(1),
  testTemplateId: z.string().min(1),
  title: z.string().max(200).optional(),
})

export async function POST(req: NextRequest) {
  const session = await requireTeacher()
  if (!session?.user?.id) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized. Teacher access required.' },
      { status: 401 }
    )
  }

  const parsed = postSchema.safeParse(await req.json().catch(() => ({})))
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 })
  }
  const { chapterId, testTemplateId, title } = parsed.data

  const [chapter, template] = await Promise.all([
    prisma.chapters.findUnique({ where: { id: chapterId }, select: { id: true, courseId: true } }),
    prisma.test_templates.findUnique({
      where: { id: testTemplateId },
      select: { id: true, title: true },
    }),
  ])
  if (!chapter) {
    return NextResponse.json({ success: false, error: 'Chapter not found' }, { status: 404 })
  }
  if (!template) {
    return NextResponse.json({ success: false, error: 'Test template not found' }, { status: 404 })
  }

  const material = await prisma.study_materials.create({
    data: {
      id: `material_${Date.now()}_${Math.random().toString(36).slice(2)}`,
      title: title?.trim() || template.title,
      materialType: 'TEST',
      testTemplateId,
      fileUrl: '',
      fileName: '',
      fileSize: 0,
      mimeType: 'application/x-test',
      courseId: chapter.courseId,
      chapterId,
      uploadedBy: session.user.id,
      accessLevel: 'ENROLLED',
      isPublished: true,
      publishedAt: new Date(),
      updatedAt: new Date(),
    },
  })

  return NextResponse.json({ success: true, data: { materialId: material.id } }, { status: 201 })
}
