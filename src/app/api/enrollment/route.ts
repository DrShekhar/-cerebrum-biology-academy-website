import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { auth } from '@/lib/auth/config'
import { requireAdminAuth } from '@/lib/auth'

const EnrollmentSchema = z.object({
  studentName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().regex(/^\+?[\d\s\-\(\)]{10,15}$/),
  courseId: z.string(),
  installmentPlan: z.enum(['FULL', 'QUARTERLY', 'MONTHLY']).optional(),
  amount: z.number().positive(),
  paymentId: z.string().optional(),
  userId: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    // Require authentication
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = EnrollmentSchema.parse(body)

    // Use authenticated user's ID, or allow admin to specify userId
    let userId = session.user.id
    if (validatedData.userId && validatedData.userId !== session.user.id) {
      // Only admin can create enrollment for other users
      if (session.user.role !== 'ADMIN') {
        return NextResponse.json(
          { error: 'Cannot create enrollment for another user' },
          { status: 403 }
        )
      }
      userId = validatedData.userId
    }

    if (!userId) {
      const existingUser = await prisma.users.findUnique({
        where: { email: validatedData.email },
      })

      if (existingUser) {
        userId = existingUser.id
      } else {
        const newUser = await prisma.users.create({
          data: {
            name: validatedData.studentName,
            email: validatedData.email,
            phone: validatedData.phone,
            role: 'STUDENT',
          },
        })
        userId = newUser.id
      }
    }

    const enrollment = await prisma.enrollments.create({
      data: {
        userId,
        courseId: validatedData.courseId,
        status: 'PENDING',
        totalFees: validatedData.amount * 100,
        paidAmount: 0,
        pendingAmount: validatedData.amount * 100,
        paymentPlan: validatedData.installmentPlan || 'FULL',
      },
    })

    return NextResponse.json({
      success: true,
      enrollmentId: enrollment.id,
      userId,
      message: 'Enrollment created successfully',
    })
  } catch (error) {
    console.error('Enrollment error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid enrollment data', details: error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        error: 'Failed to create enrollment',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Require authentication
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const enrollmentId = searchParams.get('id')

    if (enrollmentId) {
      const enrollment = await prisma.enrollments.findUnique({
        where: { id: enrollmentId },
        include: {
          courses: true,
          users: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      })

      if (!enrollment) {
        return NextResponse.json({ error: 'Enrollment not found' }, { status: 404 })
      }

      // Users can only see their own enrollment unless admin
      if (enrollment.userId !== session.user.id && session.user.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Access denied' }, { status: 403 })
      }

      return NextResponse.json({ enrollment })
    }

    // List enrollments - admin only
    await requireAdminAuth()

    const enrollments = await prisma.enrollments.findMany({
      take: 50,
      orderBy: { createdAt: 'desc' },
      include: {
        courses: true,
        users: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    return NextResponse.json({ enrollments })
  } catch (error) {
    console.error('Get enrollment error:', error)
    return NextResponse.json({ error: 'Failed to fetch enrollments' }, { status: 500 })
  }
}
