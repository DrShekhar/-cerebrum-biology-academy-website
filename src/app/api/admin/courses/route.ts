import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireAdminAuth } from '@/lib/auth'
import { v4 as uuidv4 } from 'uuid'

export async function GET(request: NextRequest) {
  try {
    await requireAdminAuth()

    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const type = searchParams.get('type')
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = (page - 1) * limit

    const where: Record<string, unknown> = {}

    if (type && type !== 'all') {
      where.type = type.toUpperCase()
    }

    if (status === 'active') {
      where.isActive = true
    } else if (status === 'inactive') {
      where.isActive = false
    } else if (status && ['draft', 'published', 'archived'].includes(status)) {
      where.status = status.toUpperCase()
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ]
    }

    const [courses, total] = await Promise.all([
      prisma.courses.findMany({
        where,
        include: {
          _count: { select: { enrollments: true, chapters: true } },
          instructor: { select: { id: true, name: true } },
        },
        orderBy: { sortOrder: 'asc' },
        skip: offset,
        take: limit,
      }),
      prisma.courses.count({ where }),
    ])

    const activeCount = await prisma.courses.count({ where: { isActive: true } })

    const enrollmentStats = await prisma.enrollments.groupBy({
      by: ['status'],
      _count: true,
    })

    return NextResponse.json({
      success: true,
      data: {
        courses,
        pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
        stats: {
          total,
          active: activeCount,
          totalEnrollments: enrollmentStats.reduce((s, e) => s + e._count, 0),
          activeEnrollments: enrollmentStats.find((e) => e.status === 'ACTIVE')?._count || 0,
        },
      },
    })
  } catch (error) {
    if (error instanceof Error && error.message === 'Admin authentication required') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Fetch courses error:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch courses' }, { status: 500 })
  }
}

const createCourseSchema = z.object({
  name: z.string().min(5, 'Course name must be at least 5 characters').max(200),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  type: z.enum(['NEET_COMPLETE', 'CLASS_11', 'CLASS_12', 'DROPPER', 'FOUNDATION', 'CRASH_COURSE']),
  class: z.enum(['CLASS_9', 'CLASS_10', 'CLASS_11', 'CLASS_12', 'DROPPER', 'FOUNDATION']),
  duration: z.number().min(1, 'Duration must be at least 1 month').max(36),
  totalFees: z.number().min(1000, 'Fees must be at least 1000'),
  instructorId: z.string().nullable().optional(),
  maxCapacity: z.number().min(1).max(2000).nullable().optional(),
  startDate: z.string().nullable().optional(),
  scheduleInfo: z.string().nullable().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).default('DRAFT'),
  syllabus: z.array(z.string()).nullable().optional(),
  features: z.array(z.string()).nullable().optional(),
})

export async function POST(request: NextRequest) {
  try {
    await requireAdminAuth()

    const body = await request.json()
    const validatedData = createCourseSchema.parse(body)

    const course = await prisma.courses.create({
      data: {
        id: uuidv4(),
        name: validatedData.name,
        description: validatedData.description,
        type: validatedData.type as any,
        class: validatedData.class as any,
        duration: validatedData.duration,
        // Form collects rupees; courses.totalFees is stored in paise.
        totalFees: Math.round(validatedData.totalFees * 100),
        syllabus: validatedData.syllabus || null,
        features: validatedData.features || null,
        instructorId: validatedData.instructorId || null,
        maxCapacity: validatedData.maxCapacity ?? null,
        startDate: validatedData.startDate ? new Date(validatedData.startDate) : null,
        scheduleInfo: validatedData.scheduleInfo || null,
        status: validatedData.status,
        // Draft courses stay out of public catalogs until published.
        isActive: validatedData.status === 'PUBLISHED',
        sortOrder: 0,
        updatedAt: new Date(),
      },
    })

    return NextResponse.json(
      { success: true, message: 'Course created successfully', data: course },
      { status: 201 }
    )
  } catch (error) {
    console.error('Create course error:', error)

    if (error instanceof Error && error.message === 'Admin authentication required') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: error.issues,
        },
        { status: 400 }
      )
    }

    return NextResponse.json({ success: false, error: 'Failed to create course' }, { status: 500 })
  }
}

const updateCourseSchema = z.object({
  id: z.string().min(1, 'Course ID is required'),
  name: z.string().min(5, 'Course name must be at least 5 characters').max(200),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  type: z.enum(['NEET_COMPLETE', 'CLASS_11', 'CLASS_12', 'DROPPER', 'FOUNDATION', 'CRASH_COURSE']),
  class: z.enum(['CLASS_9', 'CLASS_10', 'CLASS_11', 'CLASS_12', 'DROPPER', 'FOUNDATION']),
  duration: z.number().min(1, 'Duration must be at least 1 month').max(36),
  totalFees: z.number().min(1000, 'Fees must be at least 1000'),
  instructorId: z.string().nullable().optional(),
  maxCapacity: z.number().min(1).max(2000).nullable().optional(),
  startDate: z.string().nullable().optional(),
  scheduleInfo: z.string().nullable().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional(),
  isActive: z.boolean(),
  syllabus: z.array(z.string()).nullable().optional(),
  features: z.array(z.string()).nullable().optional(),
})

export async function PUT(request: NextRequest) {
  try {
    await requireAdminAuth()

    const body = await request.json()
    const validatedData = updateCourseSchema.parse(body)

    const existingCourse = await prisma.courses.findUnique({
      where: { id: validatedData.id },
    })

    if (!existingCourse) {
      return NextResponse.json({ success: false, error: 'Course not found' }, { status: 404 })
    }

    const updatedCourse = await prisma.courses.update({
      where: { id: validatedData.id },
      data: {
        name: validatedData.name,
        description: validatedData.description,
        type: validatedData.type as any,
        class: validatedData.class as any,
        duration: validatedData.duration,
        // Form collects rupees; courses.totalFees is stored in paise.
        totalFees: Math.round(validatedData.totalFees * 100),
        syllabus: validatedData.syllabus || null,
        features: validatedData.features || null,
        instructorId: validatedData.instructorId || null,
        maxCapacity: validatedData.maxCapacity ?? null,
        startDate: validatedData.startDate ? new Date(validatedData.startDate) : null,
        scheduleInfo: validatedData.scheduleInfo || null,
        ...(validatedData.status
          ? { status: validatedData.status, isActive: validatedData.status === 'PUBLISHED' }
          : { isActive: validatedData.isActive }),
        updatedAt: new Date(),
      },
    })

    await prisma.activities.create({
      data: {
        id: uuidv4(),
        userId: 'admin',
        action: 'course_updated',
        description: `Course "${validatedData.name}" updated`,
        metadata: {
          courseId: updatedCourse.id,
          changes: {
            from: {
              name: existingCourse.name,
              totalFees: existingCourse.totalFees,
              isActive: existingCourse.isActive,
            },
            to: {
              name: validatedData.name,
              totalFees: validatedData.totalFees,
              isActive: validatedData.isActive,
            },
          },
        },
      },
    })

    return NextResponse.json(
      { success: true, message: 'Course updated successfully', data: updatedCourse },
      { status: 200 }
    )
  } catch (error) {
    console.error('Update course error:', error)

    if (error instanceof Error && error.message === 'Admin authentication required') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: error.issues,
        },
        { status: 400 }
      )
    }

    return NextResponse.json({ success: false, error: 'Failed to update course' }, { status: 500 })
  }
}
