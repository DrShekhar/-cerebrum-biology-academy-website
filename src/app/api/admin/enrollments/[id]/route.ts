import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireAdminAuth } from '@/lib/auth'
import { v4 as uuidv4 } from 'uuid'

const updateEnrollmentSchema = z.object({
  status: z.enum(['PENDING', 'ACTIVE', 'COMPLETED', 'CANCELLED', 'SUSPENDED']).optional(),
  paymentPlan: z.enum(['FULL', 'QUARTERLY', 'MONTHLY', 'CUSTOM']).optional(),
  endDate: z.string().optional().nullable(),
  paidAmount: z.number().min(0).optional(),
})

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdminAuth()
    const { id } = await params

    const enrollment = await prisma.enrollments.findUnique({
      where: { id },
      include: {
        users: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            coachingTier: true,
          },
        },
        courses: {
          select: { id: true, name: true, totalFees: true, type: true },
        },
        payments: {
          select: {
            id: true,
            amount: true,
            status: true,
            paymentMethod: true,
            createdAt: true,
            completedAt: true,
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    })

    if (!enrollment) {
      return NextResponse.json(
        { success: false, error: 'Enrollment not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: enrollment })
  } catch (error) {
    if (error instanceof Error && error.message === 'Admin authentication required') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Fetch enrollment error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch enrollment' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAdminAuth()
    const { id } = await params

    const body = await request.json()
    const validatedData = updateEnrollmentSchema.parse(body)

    const existing = await prisma.enrollments.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Enrollment not found' },
        { status: 404 }
      )
    }

    const updateData: Record<string, unknown> = { updatedAt: new Date() }

    if (validatedData.status) {
      updateData.status = validatedData.status
      if (validatedData.status === 'ACTIVE' && !existing.startDate) {
        updateData.startDate = new Date()
      }
    }
    if (validatedData.paymentPlan) {
      updateData.paymentPlan = validatedData.paymentPlan
    }
    if (validatedData.endDate !== undefined) {
      updateData.endDate = validatedData.endDate
        ? new Date(validatedData.endDate)
        : null
    }
    if (validatedData.paidAmount !== undefined) {
      updateData.paidAmount = validatedData.paidAmount
      updateData.pendingAmount = Math.max(
        0,
        existing.totalFees - validatedData.paidAmount
      )
    }

    const enrollment = await prisma.$transaction(async (tx) => {
      const updated = await tx.enrollments.update({
        where: { id },
        data: updateData,
      })

      await tx.activities.create({
        data: {
          id: uuidv4(),
          userId: existing.userId,
          action: 'enrollment_updated',
          description: `Enrollment updated by admin ${session.user.email}`,
          metadata: {
            enrollmentId: id,
            changes: validatedData,
          },
        },
      })

      return updated
    })

    return NextResponse.json({ success: true, data: enrollment })
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
    console.error('Update enrollment error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update enrollment' },
      { status: 500 }
    )
  }
}
