import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireAdminAuth } from '@/lib/auth'
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcryptjs'

const convertLeadSchema = z.object({
  leadId: z.string().min(1, 'Lead ID is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  coachingTier: z.enum(['FREE', 'PURSUIT', 'ASCENT', 'PINNACLE']),
  courseId: z.string().optional(),
  createEnrollment: z.boolean().default(false),
})

export async function POST(request: NextRequest) {
  try {
    const session = await requireAdminAuth()

    const body = await request.json()
    const validatedData = convertLeadSchema.parse(body)

    const lead = await prisma.leads.findUnique({
      where: { id: validatedData.leadId },
    })

    if (!lead) {
      return NextResponse.json(
        { success: false, error: 'Lead not found' },
        { status: 404 }
      )
    }

    if (lead.convertedAt) {
      return NextResponse.json(
        { success: false, error: 'This lead has already been converted' },
        { status: 400 }
      )
    }

    const existingUser = await prisma.users.findFirst({
      where: {
        OR: [
          ...(lead.email ? [{ email: lead.email }] : []),
          { phone: lead.phone },
        ],
      },
    })

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          error: `A user already exists with this ${existingUser.email === lead.email ? 'email' : 'phone number'}`,
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
          name: lead.studentName,
          email: lead.email || `${lead.phone.replace(/\D/g, '')}@placeholder.cerebrum.app`,
          phone: lead.phone,
          role: 'STUDENT',
          passwordHash,
          coachingTier: validatedData.coachingTier as any,
          emailVerified: lead.email ? new Date() : null,
          profile: {
            status: 'active',
            convertedFromLead: lead.id,
            createdBy: session.user.email,
          },
          updatedAt: new Date(),
        },
      })

      await tx.leads.update({
        where: { id: lead.id },
        data: {
          stage: 'ACTIVE_STUDENT',
          convertedAt: new Date(),
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
          leadId: lead.id,
          action: 'lead_converted',
          description: `Lead "${lead.studentName}" converted to student account by admin ${session.user.email}`,
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
        message: `Lead "${lead.studentName}" converted to student account`,
        data: {
          userId: result.user.id,
          name: result.user.name,
          email: result.user.email,
          phone: result.user.phone,
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

    console.error('Convert lead error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to convert lead' },
      { status: 500 }
    )
  }
}
