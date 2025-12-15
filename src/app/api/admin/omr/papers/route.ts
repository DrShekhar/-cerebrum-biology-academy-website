import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { OMRSubjectType, OMRPaperStatus } from '@/generated/prisma'
import { SUBJECT_TYPE_CONFIG } from '@/lib/omr/constants'

const createPaperSchema = z.object({
  paperCode: z.string().min(1).max(50),
  title: z.string().min(1).max(200),
  description: z.string().optional(),
  subjectType: z.nativeEnum(OMRSubjectType),
  targetClass: z.string().min(1),
  examDate: z.string().datetime(),
  submissionStart: z.string().datetime(),
  submissionEnd: z.string().datetime(),
  status: z.nativeEnum(OMRPaperStatus).optional(),
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') as OMRPaperStatus | null
    const subjectType = searchParams.get('subjectType') as OMRSubjectType | null

    const where: Record<string, unknown> = {}
    if (status) where.status = status
    if (subjectType) where.subjectType = subjectType

    const papers = await prisma.omr_papers.findMany({
      where,
      include: {
        _count: {
          select: {
            answerKeys: true,
            submissions: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ success: true, papers })
  } catch (error) {
    console.error('Error fetching OMR papers:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch papers' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validation = createPaperSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: 'Invalid input', details: validation.error.issues },
        { status: 400 }
      )
    }

    const data = validation.data
    const config = SUBJECT_TYPE_CONFIG[data.subjectType]

    const existingPaper = await prisma.omr_papers.findUnique({
      where: { paperCode: data.paperCode },
    })

    if (existingPaper) {
      return NextResponse.json(
        { success: false, error: 'Paper code already exists' },
        { status: 400 }
      )
    }

    const paper = await prisma.omr_papers.create({
      data: {
        paperCode: data.paperCode,
        title: data.title,
        description: data.description,
        subjectType: data.subjectType,
        targetClass: data.targetClass,
        totalQuestions: config.totalQuestions,
        totalMarks: config.totalMarks,
        sections: config.sections,
        examDate: new Date(data.examDate),
        submissionStart: new Date(data.submissionStart),
        submissionEnd: new Date(data.submissionEnd),
        status: data.status || OMRPaperStatus.DRAFT,
      },
    })

    return NextResponse.json({ success: true, paper }, { status: 201 })
  } catch (error) {
    console.error('Error creating OMR paper:', error)
    return NextResponse.json({ success: false, error: 'Failed to create paper' }, { status: 500 })
  }
}
