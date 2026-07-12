import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { correctLetter } from '@/lib/cbt/paper'
import { assertMaterialEntitlement } from '@/lib/lms/materialEntitlement'

/**
 * POST /api/lms/videos/checkpoint — answer an in-video quiz checkpoint.
 * Validates server-side (the client never has the answer key), records the
 * response (STUDY_MODE) for analytics/spaced-repetition, and returns
 * correctness + the correct option + explanation.
 */
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    const userId = (session?.user as { id?: string } | undefined)?.id
    if (!userId) {
      return NextResponse.json({ success: false, error: 'Sign in required' }, { status: 401 })
    }

    const body = await request.json().catch(() => ({}))
    const checkpointId: string = (body.checkpointId || '').toString()
    const selectedAnswer: string = (body.selectedAnswer || '').toString().toUpperCase()
    if (!checkpointId || !selectedAnswer) {
      return NextResponse.json(
        { success: false, error: 'checkpointId and selectedAnswer required' },
        { status: 400 }
      )
    }

    const checkpoint = await prisma.video_checkpoints.findUnique({
      where: { id: checkpointId },
      include: {
        video_lectures: { select: { studyMaterialId: true } },
        questions: {
          select: {
            id: true,
            question: true,
            options: true,
            correctAnswer: true,
            explanation: true,
            subject: true,
            topic: true,
            marks: true,
            difficulty: true,
            explanationImage: true,
          },
        },
      },
    })
    if (!checkpoint) {
      return NextResponse.json({ success: false, error: 'Checkpoint not found' }, { status: 404 })
    }

    // SECURITY: this route returns the answer key + explanation, so gate it by
    // the same entitlement as watching the video. Without this any signed-in
    // user could harvest checkpoint answers by id, bypassing the enrollment gate
    // the player enforces.
    const entitlement = await assertMaterialEntitlement(
      userId,
      checkpoint.video_lectures.studyMaterialId
    )
    if (!entitlement.allowed) {
      return NextResponse.json(
        { success: false, error: entitlement.error || 'Not authorized' },
        { status: entitlement.status }
      )
    }

    const correct = correctLetter(checkpoint.questions as never)
    const isCorrect = selectedAnswer === correct

    // Record for analytics + mastery (best-effort, never blocks the player).
    await prisma.user_question_responses
      .create({
        data: {
          id: `uqr_vcp_${checkpoint.id}_${userId}_${Date.now()}`,
          userId,
          questionId: checkpoint.questions.id,
          selectedAnswer,
          isCorrect,
          marksAwarded: 0,
          responseMode: 'STUDY_MODE',
        },
      })
      .catch(() => {})

    return NextResponse.json({
      success: true,
      isCorrect,
      correctAnswer: correct,
      explanation: checkpoint.questions.explanation || '',
    })
  } catch (error) {
    console.error('Checkpoint answer error:', error)
    return NextResponse.json({ success: false, error: 'Failed to submit answer' }, { status: 500 })
  }
}
