import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { randomBytes, createHash, timingSafeEqual } from 'crypto'

export function generateHostToken(): string {
  return randomBytes(32).toString('hex')
}

// Generate a participant token based on their ID and session
// This is a deterministic token that can be regenerated for validation
export function generateParticipantToken(participantId: string, sessionId: string): string {
  const secret = process.env.QUIZ_PARTICIPANT_SECRET
  if (!secret || secret.length < 32) {
    throw new Error('QUIZ_PARTICIPANT_SECRET must be set and at least 32 characters')
  }
  return createHash('sha256')
    .update(`${participantId}:${sessionId}:${secret}`)
    .digest('hex')
}

// Verify a participant token
export function verifyParticipantToken(
  providedToken: string,
  participantId: string,
  sessionId: string
): boolean {
  const expectedToken = generateParticipantToken(participantId, sessionId)
  if (providedToken.length !== expectedToken.length) {
    return false
  }
  try {
    return timingSafeEqual(Buffer.from(providedToken), Buffer.from(expectedToken))
  } catch {
    return false
  }
}

export async function verifyHostToken(
  request: NextRequest,
  roomCode: string
): Promise<{ valid: boolean; session?: Awaited<ReturnType<typeof prisma.quiz_sessions.findUnique>>; error?: string }> {
  const authHeader = request.headers.get('x-host-token')

  if (!authHeader) {
    return { valid: false, error: 'Host authorization required' }
  }

  const session = await prisma.quiz_sessions.findUnique({
    where: { roomCode: roomCode.toUpperCase() },
    include: {
      participants: true,
      rounds: {
        orderBy: { roundNumber: 'desc' },
        take: 10,
      },
    },
  })

  if (!session) {
    return { valid: false, error: 'Quiz session not found' }
  }

  // Use timing-safe comparison to prevent timing attacks
  try {
    const hostTokenBuffer = Buffer.from(session.hostToken)
    const authBuffer = Buffer.from(authHeader)
    if (hostTokenBuffer.length !== authBuffer.length || !timingSafeEqual(hostTokenBuffer, authBuffer)) {
      return { valid: false, error: 'Invalid host token' }
    }
  } catch {
    return { valid: false, error: 'Invalid host token' }
  }

  return { valid: true, session }
}

export function unauthorizedResponse(error: string = 'Unauthorized') {
  return NextResponse.json(
    { success: false, error },
    { status: 401 }
  )
}
