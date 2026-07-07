import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireAdminAuth } from '@/lib/auth'
import { v4 as uuidv4 } from 'uuid'

/**
 * GET /api/admin/courses/[courseId] — full course detail for the admin
 * workspace (settings + counts + pricing rows + instructor).
 */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ courseId: string }> }
) {
  try {
    await requireAdminAuth()
    const { courseId } = await context.params

    const course = await prisma.courses.findUnique({
      where: { id: courseId },
      include: {
        instructor: { select: { id: true, name: true, email: true } },
        course_pricing: { orderBy: { currency: 'asc' } },
        _count: {
          select: { enrollments: true, chapters: true, study_materials: true, certificates: true },
        },
      },
    })

    if (!course) {
      return NextResponse.json({ success: false, error: 'Course not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: course })
  } catch (error) {
    if (error instanceof Error && error.message === 'Admin authentication required') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    console.error('[admin/courses/:id] GET failed:', error)
    return NextResponse.json({ success: false, error: 'Failed to load course' }, { status: 500 })
  }
}

const patchSchema = z.object({
  name: z.string().min(5).max(200).optional(),
  description: z.string().min(20).optional(),
  type: z
    .enum(['NEET_COMPLETE', 'CLASS_11', 'CLASS_12', 'DROPPER', 'FOUNDATION', 'CRASH_COURSE'])
    .optional(),
  class: z.enum(['CLASS_9', 'CLASS_10', 'CLASS_11', 'CLASS_12', 'DROPPER', 'FOUNDATION']).optional(),
  duration: z.number().min(1).max(36).optional(),
  totalFees: z.number().min(1000).optional(), // rupees; stored as paise
  instructorId: z.string().nullable().optional(),
  maxCapacity: z.number().min(1).max(2000).nullable().optional(),
  startDate: z.string().nullable().optional(),
  scheduleInfo: z.string().nullable().optional(),
  thumbnailUrl: z.string().url().nullable().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional(),
  syllabus: z.array(z.string()).nullable().optional(),
  features: z.array(z.string()).nullable().optional(),
  sortOrder: z.number().optional(),
})

/**
 * PATCH /api/admin/courses/[courseId] — partial update from the workspace
 * Settings tab. Status transitions keep isActive in lockstep so every legacy
 * isActive-filtered query (public catalog, student lists) stays correct.
 */
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ courseId: string }> }
) {
  try {
    const adminSession = await requireAdminAuth()
    const { courseId } = await context.params

    const parsed = patchSchema.safeParse(await request.json())
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: parsed.error.issues },
        { status: 400 }
      )
    }
    const p = parsed.data

    const existing = await prisma.courses.findUnique({ where: { id: courseId } })
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Course not found' }, { status: 404 })
    }

    const data: Record<string, unknown> = { updatedAt: new Date() }
    if (p.name !== undefined) data.name = p.name
    if (p.description !== undefined) data.description = p.description
    if (p.type !== undefined) data.type = p.type
    if (p.class !== undefined) data.class = p.class
    if (p.duration !== undefined) data.duration = p.duration
    if (p.totalFees !== undefined) data.totalFees = Math.round(p.totalFees * 100)
    if (p.instructorId !== undefined) data.instructorId = p.instructorId
    if (p.maxCapacity !== undefined) data.maxCapacity = p.maxCapacity
    if (p.startDate !== undefined) data.startDate = p.startDate ? new Date(p.startDate) : null
    if (p.scheduleInfo !== undefined) data.scheduleInfo = p.scheduleInfo
    if (p.thumbnailUrl !== undefined) data.thumbnailUrl = p.thumbnailUrl
    if (p.syllabus !== undefined) data.syllabus = p.syllabus
    if (p.features !== undefined) data.features = p.features
    if (p.sortOrder !== undefined) data.sortOrder = p.sortOrder
    if (p.status !== undefined) {
      data.status = p.status
      data.isActive = p.status === 'PUBLISHED'
    }

    const updated = await prisma.courses.update({ where: { id: courseId }, data })

    if (p.status && p.status !== existing.status) {
      await prisma.activities.create({
        data: {
          id: uuidv4(),
          userId: adminSession?.user?.id || 'admin',
          action: 'course_status_changed',
          description: `Course "${updated.name}" ${existing.status} → ${p.status}`,
          metadata: { courseId, from: existing.status, to: p.status },
        },
      })
    }

    return NextResponse.json({ success: true, data: updated })
  } catch (error) {
    if (error instanceof Error && error.message === 'Admin authentication required') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    console.error('[admin/courses/:id] PATCH failed:', error)
    return NextResponse.json({ success: false, error: 'Failed to update course' }, { status: 500 })
  }
}
