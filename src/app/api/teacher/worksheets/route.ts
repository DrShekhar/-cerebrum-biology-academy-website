/**
 * Teacher Worksheets API
 *
 * GET  /api/teacher/worksheets - List worksheets with submission counts
 * POST /api/teacher/worksheets - Create a worksheet (draft or published)
 * PATCH /api/teacher/worksheets - Edit / publish / unpublish a worksheet
 *
 * (worksheets have no owner column, so any TEACHER/ADMIN sees all — same
 * visibility the admin builder uses. Until 2026-07 the `worksheets` table had
 * NO writer anywhere in the codebase: students had a full taking/grading UI
 * over a table nothing could populate.)
 */

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

const worksheetSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  // null/omitted = global worksheet (visible to all enrolled students)
  courseId: z.string().nullable().optional(),
  chapterId: z.string().nullable().optional(),
  topicId: z.string().nullable().optional(),
  instructions: z.string().max(5000).optional(),
  maxMarks: z.number().int().min(1).max(1000).optional(),
  duration: z.number().int().min(1).max(600).optional(),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD', 'EXPERT']).optional(),
  dueDate: z.string().datetime().nullable().optional(),
  allowLateSubmission: z.boolean().optional(),
  content: z.unknown().optional(),
  attachments: z.array(z.string().url()).max(20).optional(),
  tags: z.array(z.string().max(40)).max(20).optional(),
  publish: z.boolean().optional(),
})

async function requireTeacherSession() {
  const session = await auth()
  const role = (session?.user?.role || '').toUpperCase()
  if (!session || (role !== 'TEACHER' && role !== 'ADMIN')) {
    return null
  }
  return session
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session || (session.user.role !== 'TEACHER' && session.user.role !== 'ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized. Teacher access required.' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')

    const where: Record<string, unknown> = {}
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ]
    }

    const [worksheets, total] = await Promise.all([
      prisma.worksheets.findMany({
        where,
        select: {
          id: true,
          title: true,
          description: true,
          maxMarks: true,
          difficulty: true,
          status: true,
          dueDate: true,
          publishedAt: true,
          submissions: {
            select: { status: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.worksheets.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      worksheets: worksheets.map((w) => {
        const submitted = w.submissions.filter((s) => s.status === 'SUBMITTED').length
        const graded = w.submissions.filter((s) => s.status === 'GRADED').length
        return {
          id: w.id,
          title: w.title,
          description: w.description,
          maxMarks: w.maxMarks,
          difficulty: w.difficulty,
          status: w.status,
          dueDate: w.dueDate,
          publishedAt: w.publishedAt,
          counts: {
            total: w.submissions.length,
            submitted,
            graded,
            awaitingGrade: submitted,
          },
        }
      }),
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    })
  } catch (error) {
    console.error('Failed to fetch teacher worksheets:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch worksheets' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await requireTeacherSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized. Teacher access required.' }, { status: 401 })
    }

    const body = await request.json()
    const parsed = worksheetSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: parsed.error.issues },
        { status: 400 }
      )
    }
    const data = parsed.data

    // A course-scoped worksheet must point at a real course, or it will be
    // invisible to everyone forever.
    if (data.courseId) {
      const course = await prisma.courses.findUnique({
        where: { id: data.courseId },
        select: { id: true },
      })
      if (!course) {
        return NextResponse.json({ success: false, error: 'Course not found' }, { status: 404 })
      }
    }

    const publish = data.publish === true
    const worksheet = await prisma.worksheets.create({
      data: {
        title: data.title,
        description: data.description,
        courseId: data.courseId || null,
        chapterId: data.chapterId || null,
        topicId: data.topicId || null,
        instructions: data.instructions,
        maxMarks: data.maxMarks,
        duration: data.duration,
        difficulty: data.difficulty,
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
        allowLateSubmission: data.allowLateSubmission ?? false,
        content: (data.content ?? undefined) as never,
        attachments: data.attachments ?? undefined,
        tags: data.tags ?? [],
        status: publish ? 'PUBLISHED' : 'DRAFT',
        publishedAt: publish ? new Date() : null,
      },
    })

    return NextResponse.json({
      success: true,
      worksheet: { id: worksheet.id, title: worksheet.title, status: worksheet.status },
      message: publish ? 'Worksheet published' : 'Worksheet saved as draft',
    })
  } catch (error) {
    console.error('Failed to create worksheet:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create worksheet' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await requireTeacherSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized. Teacher access required.' }, { status: 401 })
    }

    const body = await request.json()
    const { id, ...rest } = body
    if (!id || typeof id !== 'string') {
      return NextResponse.json({ success: false, error: 'Worksheet id required' }, { status: 400 })
    }

    const existing = await prisma.worksheets.findUnique({ where: { id }, select: { id: true } })
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Worksheet not found' }, { status: 404 })
    }

    const parsed = worksheetSchema.partial().safeParse(rest)
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: parsed.error.issues },
        { status: 400 }
      )
    }
    const data = parsed.data

    const updateData: Record<string, unknown> = {}
    if (data.title !== undefined) updateData.title = data.title
    if (data.description !== undefined) updateData.description = data.description
    if (data.courseId !== undefined) updateData.courseId = data.courseId
    if (data.chapterId !== undefined) updateData.chapterId = data.chapterId
    if (data.topicId !== undefined) updateData.topicId = data.topicId
    if (data.instructions !== undefined) updateData.instructions = data.instructions
    if (data.maxMarks !== undefined) updateData.maxMarks = data.maxMarks
    if (data.duration !== undefined) updateData.duration = data.duration
    if (data.difficulty !== undefined) updateData.difficulty = data.difficulty
    if (data.dueDate !== undefined) {
      updateData.dueDate = data.dueDate ? new Date(data.dueDate) : null
    }
    if (data.allowLateSubmission !== undefined) {
      updateData.allowLateSubmission = data.allowLateSubmission
    }
    if (data.content !== undefined) updateData.content = data.content
    if (data.attachments !== undefined) updateData.attachments = data.attachments
    if (data.tags !== undefined) updateData.tags = data.tags
    if (data.publish !== undefined) {
      updateData.status = data.publish ? 'PUBLISHED' : 'DRAFT'
      updateData.publishedAt = data.publish ? new Date() : null
    }

    const worksheet = await prisma.worksheets.update({
      where: { id },
      data: updateData as never,
    })

    return NextResponse.json({
      success: true,
      worksheet: { id: worksheet.id, title: worksheet.title, status: worksheet.status },
    })
  } catch (error) {
    console.error('Failed to update worksheet:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update worksheet' },
      { status: 500 }
    )
  }
}
