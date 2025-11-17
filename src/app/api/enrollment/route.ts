import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

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
    const body = await request.json()
    const validatedData = EnrollmentSchema.parse(body)

    let userId = validatedData.userId

    if (!userId) {
      const existingUser = await prisma.user.findUnique({
        where: { email: validatedData.email },
      })

      if (existingUser) {
        userId = existingUser.id
      } else {
        const newUser = await prisma.user.create({
          data: {
            name: validatedData.studentName,
            email: validatedData.email,
            phone: validatedData.phone,
            role: 'STUDENT',
          },
        })
        userId = newUser.id
        console.log('Created new user:', { id: newUser.id, email: newUser.email })
      }
    }

    const enrollment = await prisma.enrollment.create({
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

    console.log('Enrollment created:', {
      id: enrollment.id,
      userId,
      courseId: enrollment.courseId,
      status: enrollment.status,
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
    const searchParams = request.nextUrl.searchParams
    const enrollmentId = searchParams.get('id')

    if (enrollmentId) {
      const enrollment = await prisma.enrollment.findUnique({
        where: { id: enrollmentId },
        include: {
          course: true,
          user: {
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

      return NextResponse.json({ enrollment })
    }

    // List enrollments (admin only - add auth check in production)
    const enrollments = await prisma.enrollment.findMany({
      take: 50,
      orderBy: { createdAt: 'desc' },
      include: {
        course: true,
        user: {
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
