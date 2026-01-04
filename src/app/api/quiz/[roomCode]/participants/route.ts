import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyHostToken, unauthorizedResponse } from '@/lib/quiz/auth'
import { ipRateLimit, getRateLimitHeaders } from '@/lib/middleware/rateLimit'

export const dynamic = 'force-dynamic'

// DELETE - Remove a participant (host only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ roomCode: string }> }
) {
  try {
    const rateLimitResult = await ipRateLimit(request, {
      limit: 30,
      window: 15 * 60 * 1000,
      endpoint: 'quiz:participants:delete',
    })

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { success: false, error: 'Too many requests.' },
        { status: 429, headers: getRateLimitHeaders(rateLimitResult) }
      )
    }

    const { roomCode } = await params
    const { searchParams } = new URL(request.url)
    const participantId = searchParams.get('participantId')

    if (!roomCode || roomCode.length !== 6) {
      return NextResponse.json({ success: false, error: 'Invalid room code' }, { status: 400 })
    }

    if (!participantId) {
      return NextResponse.json(
        { success: false, error: 'Participant ID is required' },
        { status: 400 }
      )
    }

    const authResult = await verifyHostToken(request, roomCode)
    if (!authResult.valid || !authResult.session) {
      return unauthorizedResponse(authResult.error)
    }

    // Find the participant
    const participant = await prisma.quiz_participants.findUnique({
      where: { id: participantId },
    })

    if (!participant) {
      return NextResponse.json({ success: false, error: 'Participant not found' }, { status: 404 })
    }

    if (participant.sessionId !== authResult.session.id) {
      return NextResponse.json(
        { success: false, error: 'Participant does not belong to this session' },
        { status: 403 }
      )
    }

    if (participant.isHost) {
      return NextResponse.json({ success: false, error: 'Cannot remove the host' }, { status: 400 })
    }

    // Use transaction to ensure atomic deletion
    await prisma.$transaction(async (tx) => {
      // Delete the participant's messages first
      await tx.quiz_messages.deleteMany({
        where: { participantId },
      })

      // Delete the participant
      await tx.quiz_participants.delete({
        where: { id: participantId },
      })
    })

    return NextResponse.json({
      success: true,
      data: {
        removedParticipantId: participantId,
        removedParticipantName: participant.name,
      },
    })
  } catch (error) {
    console.error('Error removing participant:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to remove participant' },
      { status: 500 }
    )
  }
}
