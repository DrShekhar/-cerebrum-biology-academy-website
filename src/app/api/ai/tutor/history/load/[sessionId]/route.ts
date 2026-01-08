import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth/config'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

interface RouteContext {
  params: Promise<{
    sessionId: string
  }>
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { sessionId } = await context.params

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID is required' }, { status: 400 })
    }

    // Fetch all messages for this session, ordered by creation time
    const messages = await prisma.chatHistory.findMany({
      where: {
        sessionId: sessionId,
      },
      orderBy: {
        createdAt: 'asc',
      },
    })

    // Format messages for frontend consumption
    const formattedMessages = messages.map((msg) => ({
      id: msg.id,
      message: msg.message,
      isUserMessage: msg.isUserMessage,
      ncertReferences: msg.ncertReferences as string[] | null,
      relatedTopics: msg.relatedTopics as string[] | null,
      confidence: msg.confidence,
      tokensUsed: msg.tokensUsed,
      topic: msg.topic,
      difficulty: msg.difficulty,
      timestamp: msg.createdAt,
    }))

    return NextResponse.json({
      success: true,
      sessionId,
      messageCount: formattedMessages.length,
      messages: formattedMessages,
    })
  } catch (error) {
    console.error('Error loading chat history:', error)

    return NextResponse.json(
      {
        error: 'Failed to load chat history',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
