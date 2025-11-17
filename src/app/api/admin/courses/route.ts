import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireAdminAuth } from '@/lib/auth'
import { v4 as uuidv4 } from 'uuid'

const createCourseSchema = z.object({
  name: z.string().min(5, 'Course name must be at least 5 characters').max(200),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  type: z.enum(['NEET_COMPLETE', 'CLASS_11', 'CLASS_12', 'DROPPER', 'FOUNDATION', 'CRASH_COURSE']),
  class: z.enum(['CLASS_9', 'CLASS_10', 'CLASS_11', 'CLASS_12', 'DROPPER', 'FOUNDATION']),
  duration: z.number().min(1, 'Duration must be at least 1 month').max(36),
  totalFees: z.number().min(1000, 'Fees must be at least 1000'),
  instructor: z.string().min(2, 'Instructor name is required'),
  maxCapacity: z.number().min(1, 'Capacity must be at least 1').max(500),
  startDate: z.string().min(1, 'Start date is required'),
  schedule: z.string().min(5, 'Schedule details are required'),
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
        totalFees: validatedData.totalFees,
        syllabus: validatedData.syllabus || null,
        features: validatedData.features || null,
        isActive: true,
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
