import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { OMRAnswerKeyStatus } from '@/generated/prisma'
import { requireAdminAuth } from '@/lib/auth'

const verifySchema = z.object({
  questionNos: z.array(z.number().int().min(1)).optional(),
  verifyAll: z.boolean().optional(),
  verifiedBy: z.string().optional(),
  note: z.string().optional(),
})

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ paperId: string }> }
) {
  try {
    await requireAdminAuth()

    const { paperId } = await params
    const body = await request.json()
    const validation = verifySchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: 'Invalid input', details: validation.error.issues },
        { status: 400 }
      )
    }

    const { questionNos, verifyAll, verifiedBy, note } = validation.data

    const paper = await prisma.omr_papers.findUnique({
      where: { id: paperId },
    })

    if (!paper) {
      return NextResponse.json({ success: false, error: 'Paper not found' }, { status: 404 })
    }

    const where: Record<string, unknown> = { paperId }
    if (!verifyAll && questionNos && questionNos.length > 0) {
      where.questionNo = { in: questionNos }
    }

    const updateResult = await prisma.omr_answer_keys.updateMany({
      where,
      data: {
        keyStatus: OMRAnswerKeyStatus.VERIFIED,
        verifiedBy: verifiedBy || 'Admin',
        verifiedAt: new Date(),
        verificationNote: note,
      },
    })

    const totalVerified = await prisma.omr_answer_keys.count({
      where: { paperId, keyStatus: 'VERIFIED' },
    })

    const hasVerifiedKey = totalVerified === paper.totalQuestions

    await prisma.omr_papers.update({
      where: { id: paperId },
      data: {
        hasVerifiedKey,
        verifiedKeyUploadedAt: hasVerifiedKey ? new Date() : paper.verifiedKeyUploadedAt,
      },
    })

    return NextResponse.json({
      success: true,
      message: `${updateResult.count} answer keys verified`,
      totalVerified,
      hasVerifiedKey,
    })
  } catch (error) {
    console.error('Error verifying answer keys:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to verify answer keys' },
      { status: 500 }
    )
  }
}
