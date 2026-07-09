import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export const dynamic = 'force-dynamic'

/**
 * Article (rich-text) lessons — the "Ebook" lesson category (welcome pages,
 * course overviews, FAQs, summaries) as simple markdown lessons.
 *
 * POST  { chapterId, title, contentBody }        — create an ARTICLE lesson
 * PATCH { materialId, title?, contentBody? }     — edit it
 */

async function requireBuilderAccess() {
  const session = await auth()
  const role = (session?.user?.role || '').toUpperCase()
  if (!session || (role !== 'TEACHER' && role !== 'ADMIN')) {
    return null
  }
  return session
}

const createSchema = z.object({
  chapterId: z.string().min(1),
  title: z.string().trim().min(2).max(200),
  contentBody: z.string().trim().min(1).max(100_000),
})

export async function POST(request: NextRequest) {
  const session = await requireBuilderAccess()
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }
  const parsed = createSchema.safeParse(await request.json().catch(() => ({})))
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: 'Invalid article' }, { status: 400 })
  }
  const { chapterId, title, contentBody } = parsed.data

  try {
    const chapter = await prisma.chapters.findUnique({
      where: { id: chapterId },
      select: { id: true, courseId: true },
    })
    if (!chapter) {
      return NextResponse.json({ success: false, error: 'Chapter not found' }, { status: 404 })
    }

    const material = await prisma.study_materials.create({
      data: {
        id: `material_${Date.now()}_${Math.random().toString(36).slice(2)}`,
        title,
        materialType: 'ARTICLE',
        contentBody,
        fileUrl: '',
        fileName: '',
        fileSize: 0,
        mimeType: 'text/markdown',
        courseId: chapter.courseId,
        chapterId,
        uploadedBy: session.user.id,
        accessLevel: 'ENROLLED',
        isPublished: true,
        publishedAt: new Date(),
        updatedAt: new Date(),
      },
      select: { id: true, title: true },
    })
    return NextResponse.json({ success: true, data: { materialId: material.id } }, { status: 201 })
  } catch (error) {
    console.error('[builder/articles] POST failed:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create the article' },
      { status: 500 }
    )
  }
}

const patchSchema = z.object({
  materialId: z.string().min(1),
  title: z.string().trim().min(2).max(200).optional(),
  contentBody: z.string().trim().min(1).max(100_000).optional(),
})

export async function PATCH(request: NextRequest) {
  const session = await requireBuilderAccess()
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }
  const parsed = patchSchema.safeParse(await request.json().catch(() => ({})))
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: 'Invalid update' }, { status: 400 })
  }
  const { materialId, title, contentBody } = parsed.data

  try {
    const existing = await prisma.study_materials.findFirst({
      where: { id: materialId, materialType: 'ARTICLE' },
      select: { id: true },
    })
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Article not found' }, { status: 404 })
    }
    await prisma.study_materials.update({
      where: { id: materialId },
      data: {
        ...(title !== undefined ? { title } : {}),
        ...(contentBody !== undefined ? { contentBody } : {}),
        updatedAt: new Date(),
      },
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[builder/articles] PATCH failed:', error)
    return NextResponse.json({ success: false, error: 'Failed to update' }, { status: 500 })
  }
}
