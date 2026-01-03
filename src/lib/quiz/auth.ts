import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { randomBytes } from 'crypto'

export function generateHostToken(): string {
  return randomBytes(32).toString('hex')
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

  if (session.hostToken !== authHeader) {
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
