import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireAdminAuth } from '@/lib/auth'
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcryptjs'

const createStudentAccountSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  phone: z
    .string()
    .min(10, 'Phone must be at least 10 digits')
    .regex(/^[+]?[\d\s()-]+$/, 'Invalid phone number format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  coachingTier: z.enum(['FREE', 'PURSUIT', 'ASCENT', 'PINNACLE']).default('FREE'),
  courseId: z.string().optional(),
  createEnrollment: z.boolean().default(false),
})

export async function POST(request: NextRequest) {
  try {
    const session = await requireAdminAuth()

    const body = await request.json()
    const validatedData = createStudentAccountSchema.parse(body)

    const existingUser = await prisma.users.findFirst({
      where: {
        OR: [{ email: validatedData.email }, { phone: validatedData.phone }],
      },
    })

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          error:
            existingUser.email === validatedData.email
              ? 'Email already registered'
              : 'Phone number already registered',
        },
        { status: 409 }
      )
    }

    const passwordHash = await bcrypt.hash(validatedData.password, 12)
    const userId = uuidv4()

    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.users.create({
        data: {
          id: userId,
          name: validatedData.name,
          email: validatedData.email,
          phone: validatedData.phone,
          role: 'STUDENT',
          passwordHash,
          coachingTier: validatedData.coachingTier as any,
          emailVerified: new Date(),
          profile: {
            status: 'active',
            createdBy: session.user.email,
          },
          updatedAt: new Date(),
        },
      })

      let enrollment = null
      if (validatedData.createEnrollment && validatedData.courseId) {
        const course = await tx.courses.findUnique({
          where: { id: validatedData.courseId },
        })

        if (course) {
          enrollment = await tx.enrollments.create({
            data: {
              id: uuidv4(),
              userId: user.id,
              courseId: course.id,
              status: 'ACTIVE',
              totalFees: course.totalFees,
              paidAmount: 0,
              pendingAmount: course.totalFees,
              paymentPlan: 'FULL',
              enrollmentDate: new Date(),
              startDate: new Date(),
              updatedAt: new Date(),
            },
          })
        }
      }

      await tx.activities.create({
        data: {
          id: uuidv4(),
          userId: user.id,
          action: 'student_account_created',
          description: `Student account "${validatedData.name}" created by admin ${session.user.email}`,
          metadata: {
            coachingTier: validatedData.coachingTier,
            enrollmentCreated: !!enrollment,
            courseId: validatedData.courseId || null,
          },
        },
      })

      return { user, enrollment }
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Student account created successfully',
        data: {
          id: result.user.id,
          name: result.user.name,
          email: result.user.email,
          phone: result.user.phone,
          role: result.user.role,
          coachingTier: result.user.coachingTier,
          enrollmentId: result.enrollment?.id || null,
        },
      },
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

    console.error('Create student account error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create student account' },
      { status: 500 }
    )
  }
}
