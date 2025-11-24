import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { z } from 'zod'

const resolveDoubtSchema = z.object({
  rating: z.number().min(1).max(5).optional(),
  feedback: z.string().optional(),
})

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized. Please sign in.' }, { status: 401 })
    }

    const userId = session.user.id
    const doubtId = params.id
    const body = await request.json()

    const validatedData = resolveDoubtSchema.parse(body)

    const doubt = await prisma.doubtTickets.findUnique({
      where: { id: doubtId },
      select: {
        id: true,
        studentId: true,
        status: true,
      },
    })

    if (!doubt) {
      return NextResponse.json({ success: false, error: 'Doubt not found' }, { status: 404 })
    }

    if (doubt.studentId !== userId) {
      return NextResponse.json(
        { success: false, error: 'Only the student can resolve their own doubt' },
        { status: 403 }
      )
    }

    if (doubt.status === 'CLOSED') {
      return NextResponse.json(
        { success: false, error: 'Doubt is already closed' },
        { status: 400 }
      )
    }

    const updatedDoubt = await prisma.doubtTickets.update({
      where: { id: doubtId },
      data: {
        status: 'RESOLVED',
        resolvedAt: new Date(),
        studentRating: validatedData.rating,
        studentFeedback: validatedData.feedback,
      },
      include: {
        instructor: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    return NextResponse.json({
      success: true,
      doubt: {
        id: updatedDoubt.id,
        status: updatedDoubt.status,
        resolvedAt: updatedDoubt.resolvedAt,
        studentRating: updatedDoubt.studentRating,
        studentFeedback: updatedDoubt.studentFeedback,
      },
      message: 'Doubt marked as resolved successfully',
    })
  } catch (error) {
    console.error('Failed to resolve doubt:', error)

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

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to resolve doubt',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
