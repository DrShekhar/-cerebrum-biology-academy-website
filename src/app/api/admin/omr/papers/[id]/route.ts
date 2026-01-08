import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { OMRSubjectType, OMRPaperStatus } from '@/generated/prisma'
import { SUBJECT_TYPE_CONFIG } from '@/lib/omr/constants'
import { requireAdminAuth } from '@/lib/auth'

const updatePaperSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().optional(),
  subjectType: z.nativeEnum(OMRSubjectType).optional(),
  targetClass: z.string().min(1).optional(),
  examDate: z.string().datetime().optional(),
  submissionStart: z.string().datetime().optional(),
  submissionEnd: z.string().datetime().optional(),
  status: z.nativeEnum(OMRPaperStatus).optional(),
  isActive: z.boolean().optional(),
})

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdminAuth()

    const { id } = await params

    const paper = await prisma.omr_papers.findUnique({
      where: { id },
      include: {
        answerKeys: {
          orderBy: { questionNo: 'asc' },
        },
        _count: {
          select: { submissions: true },
        },
      },
    })

    if (!paper) {
      return NextResponse.json({ success: false, error: 'Paper not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, paper })
  } catch (error) {
    console.error('Error fetching OMR paper:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch paper' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdminAuth()

    const { id } = await params
    const body = await request.json()
    const validation = updatePaperSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: 'Invalid input', details: validation.error.issues },
        { status: 400 }
      )
    }

    const data = validation.data

    const existingPaper = await prisma.omr_papers.findUnique({
      where: { id },
    })

    if (!existingPaper) {
      return NextResponse.json({ success: false, error: 'Paper not found' }, { status: 404 })
    }

    const updateData: Record<string, unknown> = {}

    if (data.title) updateData.title = data.title
    if (data.description !== undefined) updateData.description = data.description
    if (data.targetClass) updateData.targetClass = data.targetClass
    if (data.examDate) updateData.examDate = new Date(data.examDate)
    if (data.submissionStart) updateData.submissionStart = new Date(data.submissionStart)
    if (data.submissionEnd) updateData.submissionEnd = new Date(data.submissionEnd)
    if (data.status) updateData.status = data.status
    if (data.isActive !== undefined) updateData.isActive = data.isActive

    if (data.subjectType && data.subjectType !== existingPaper.subjectType) {
      const config = SUBJECT_TYPE_CONFIG[data.subjectType]
      updateData.subjectType = data.subjectType
      updateData.totalQuestions = config.totalQuestions
      updateData.totalMarks = config.totalMarks
      updateData.sections = config.sections
    }

    const paper = await prisma.omr_papers.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json({ success: true, paper })
  } catch (error) {
    console.error('Error updating OMR paper:', error)
    return NextResponse.json({ success: false, error: 'Failed to update paper' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdminAuth()

    const { id } = await params

    const existingPaper = await prisma.omr_papers.findUnique({
      where: { id },
      include: {
        _count: { select: { submissions: true } },
      },
    })

    if (!existingPaper) {
      return NextResponse.json({ success: false, error: 'Paper not found' }, { status: 404 })
    }

    if (existingPaper._count.submissions > 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Cannot delete paper with existing submissions. Archive it instead.',
        },
        { status: 400 }
      )
    }

    await prisma.omr_papers.delete({
      where: { id },
    })

    return NextResponse.json({ success: true, message: 'Paper deleted successfully' })
  } catch (error) {
    console.error('Error deleting OMR paper:', error)
    return NextResponse.json({ success: false, error: 'Failed to delete paper' }, { status: 500 })
  }
}
