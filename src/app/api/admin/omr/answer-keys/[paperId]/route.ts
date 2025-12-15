import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { OMRAnswerKeyStatus } from '@/generated/prisma'

const answerKeySchema = z.object({
  questionNo: z.number().int().min(1),
  section: z.string().optional(),
  correctAnswer: z.string().min(1).max(10),
  explanation: z.string().optional(),
  topic: z.string().optional(),
  subtopic: z.string().optional(),
  difficulty: z.string().optional(),
  keyStatus: z.nativeEnum(OMRAnswerKeyStatus).optional(),
})

const bulkUploadSchema = z.object({
  keys: z.array(answerKeySchema),
  replaceExisting: z.boolean().optional(),
})

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ paperId: string }> }
) {
  try {
    const { paperId } = await params
    const { searchParams } = new URL(request.url)
    const keyStatus = searchParams.get('keyStatus') as OMRAnswerKeyStatus | null

    const paper = await prisma.omr_papers.findUnique({
      where: { id: paperId },
    })

    if (!paper) {
      return NextResponse.json({ success: false, error: 'Paper not found' }, { status: 404 })
    }

    const where: Record<string, unknown> = { paperId }
    if (keyStatus) where.keyStatus = keyStatus

    const answerKeys = await prisma.omr_answer_keys.findMany({
      where,
      orderBy: { questionNo: 'asc' },
    })

    return NextResponse.json({
      success: true,
      paper: {
        id: paper.id,
        paperCode: paper.paperCode,
        title: paper.title,
        totalQuestions: paper.totalQuestions,
        hasVerifiedKey: paper.hasVerifiedKey,
      },
      answerKeys,
      totalKeys: answerKeys.length,
      verifiedCount: answerKeys.filter((k) => k.keyStatus === 'VERIFIED').length,
      unverifiedCount: answerKeys.filter((k) => k.keyStatus === 'UNVERIFIED').length,
    })
  } catch (error) {
    console.error('Error fetching answer keys:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch answer keys' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ paperId: string }> }
) {
  try {
    const { paperId } = await params
    const body = await request.json()
    const validation = bulkUploadSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: 'Invalid input', details: validation.error.issues },
        { status: 400 }
      )
    }

    const { keys, replaceExisting } = validation.data

    const paper = await prisma.omr_papers.findUnique({
      where: { id: paperId },
    })

    if (!paper) {
      return NextResponse.json({ success: false, error: 'Paper not found' }, { status: 404 })
    }

    const invalidQuestions = keys.filter(
      (k) => k.questionNo < 1 || k.questionNo > paper.totalQuestions
    )

    if (invalidQuestions.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid question numbers: ${invalidQuestions.map((k) => k.questionNo).join(', ')}. Must be between 1 and ${paper.totalQuestions}`,
        },
        { status: 400 }
      )
    }

    if (replaceExisting) {
      await prisma.omr_answer_keys.deleteMany({
        where: { paperId },
      })
    }

    const sections = paper.sections as { name: string; start: number; end: number }[] | null

    const keysToCreate = keys.map((key) => {
      let section = key.section
      if (!section && sections) {
        const foundSection = sections.find(
          (s) => key.questionNo >= s.start && key.questionNo <= s.end
        )
        section = foundSection?.name
      }

      return {
        paperId,
        questionNo: key.questionNo,
        section,
        correctAnswer: key.correctAnswer.toUpperCase(),
        explanation: key.explanation,
        topic: key.topic,
        subtopic: key.subtopic,
        difficulty: key.difficulty,
        keyStatus: key.keyStatus || OMRAnswerKeyStatus.UNVERIFIED,
      }
    })

    if (replaceExisting) {
      await prisma.omr_answer_keys.createMany({
        data: keysToCreate,
      })
    } else {
      for (const key of keysToCreate) {
        await prisma.omr_answer_keys.upsert({
          where: {
            paperId_questionNo: {
              paperId: key.paperId,
              questionNo: key.questionNo,
            },
          },
          create: key,
          update: {
            correctAnswer: key.correctAnswer,
            explanation: key.explanation,
            topic: key.topic,
            subtopic: key.subtopic,
            difficulty: key.difficulty,
            section: key.section,
          },
        })
      }
    }

    const totalKeys = await prisma.omr_answer_keys.count({
      where: { paperId },
    })

    const verifiedCount = await prisma.omr_answer_keys.count({
      where: { paperId, keyStatus: 'VERIFIED' },
    })

    const hasVerifiedKey = verifiedCount === paper.totalQuestions

    await prisma.omr_papers.update({
      where: { id: paperId },
      data: {
        hasVerifiedKey,
        verifiedKeyUploadedAt: hasVerifiedKey ? new Date() : null,
      },
    })

    return NextResponse.json({
      success: true,
      message: `${keys.length} answer keys uploaded successfully`,
      totalKeys,
      verifiedCount,
      hasVerifiedKey,
    })
  } catch (error) {
    console.error('Error uploading answer keys:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to upload answer keys' },
      { status: 500 }
    )
  }
}
