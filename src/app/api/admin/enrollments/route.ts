import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireAdminAuth } from '@/lib/auth'
import { v4 as uuidv4 } from 'uuid'
import { mapCourseToTier } from '@/lib/payments/tierMapping'

const createEnrollmentSchema = z.object({
  userId: z.string().optional(),
  studentName: z.string().optional(),
  studentEmail: z.string().email().optional(),
  studentPhone: z.string().optional(),
  courseId: z.string().min(1),
  paymentPlan: z.enum(['FULL', 'QUARTERLY', 'MONTHLY', 'CUSTOM']).default('FULL'),
  totalFees: z.number().min(0).optional(),
  paidAmount: z.number().min(0).default(0),
})

export async function GET(request: NextRequest) {
  try {
    await requireAdminAuth()

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const courseId = searchParams.get('courseId')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = (page - 1) * limit

    const where: Record<string, unknown> = {}

    if (status && status !== 'all') {
      where.status = status.toUpperCase()
    }
    if (courseId) {
      where.courseId = courseId
    }
    if (search) {
      where.users = {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
        ],
      }
    }

    const [enrollments, total] = await Promise.all([
      prisma.enrollments.findMany({
        where,
        include: {
          users: { select: { id: true, name: true, email: true, phone: true } },
          courses: { select: { id: true, name: true, totalFees: true } },
          payments: {
            select: { id: true, amount: true, status: true, createdAt: true },
            orderBy: { createdAt: 'desc' },
            take: 5,
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: offset,
        take: limit,
      }),
      prisma.enrollments.count({ where }),
    ])

    const statusCounts = await prisma.enrollments.groupBy({
      by: ['status'],
      _count: true,
    })

    const revenue = await prisma.enrollments.aggregate({
      _sum: { paidAmount: true, totalFees: true },
    })

    return NextResponse.json({
      success: true,
      data: {
        enrollments,
        pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
        stats: {
          total,
          statusCounts: statusCounts.reduce(
            (acc, s) => ({ ...acc, [s.status]: s._count }),
            {} as Record<string, number>
          ),
          totalRevenue: revenue._sum.paidAmount || 0,
          totalFees: revenue._sum.totalFees || 0,
        },
      },
    })
  } catch (error) {
    if (error instanceof Error && error.message === 'Admin authentication required') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Fetch enrollments error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch enrollments' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await requireAdminAuth()

    const body = await request.json()
    const validatedData = createEnrollmentSchema.parse(body)

    const course = await prisma.courses.findUnique({
      where: { id: validatedData.courseId },
    })

    if (!course) {
      return NextResponse.json(
        { success: false, error: 'Course not found' },
        { status: 404 }
      )
    }

    let userId = validatedData.userId

    if (!userId && validatedData.studentEmail) {
      const existingUser = await prisma.users.findFirst({
        where: { email: validatedData.studentEmail },
      })
      if (existingUser) {
        userId = existingUser.id
      }
    }

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: 'User not found. Provide a valid userId or existing studentEmail.',
        },
        { status: 400 }
      )
    }

    const existingEnrollment = await prisma.enrollments.findUnique({
      where: { userId_courseId: { userId, courseId: validatedData.courseId } },
    })

    if (existingEnrollment) {
      return NextResponse.json(
        { success: false, error: 'Student is already enrolled in this course' },
        { status: 409 }
      )
    }

    const totalFees = validatedData.totalFees ?? course.totalFees
    const paidAmount = validatedData.paidAmount
    const pendingAmount = totalFees - paidAmount

    const result = await prisma.$transaction(async (tx) => {
      const enrollment = await tx.enrollments.create({
        data: {
          id: uuidv4(),
          userId,
          courseId: validatedData.courseId,
          status: paidAmount >= totalFees ? 'ACTIVE' : 'PENDING',
          totalFees,
          paidAmount,
          pendingAmount: Math.max(0, pendingAmount),
          paymentPlan: validatedData.paymentPlan as any,
          enrollmentDate: new Date(),
          startDate: paidAmount >= totalFees ? new Date() : null,
          updatedAt: new Date(),
        },
      })

      const tierFromCourse = mapCourseToTier(validatedData.courseId, totalFees)
      await tx.users.update({
        where: { id: userId! },
        data: { coachingTier: tierFromCourse },
      })

      await tx.activities.create({
        data: {
          id: uuidv4(),
          userId: userId!,
          action: 'manual_enrollment_created',
          description: `Manual enrollment in "${course.name}" by admin ${session.user.email}`,
          metadata: {
            enrollmentId: enrollment.id,
            courseId: validatedData.courseId,
            totalFees,
            paidAmount,
            paymentPlan: validatedData.paymentPlan,
          },
        },
      })

      return enrollment
    })

    return NextResponse.json(
      { success: true, message: 'Enrollment created', data: result },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof Error && error.message === 'Admin authentication required') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: error.issues },
        { status: 400 }
      )
    }
    console.error('Create enrollment error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create enrollment' },
      { status: 500 }
    )
  }
}
