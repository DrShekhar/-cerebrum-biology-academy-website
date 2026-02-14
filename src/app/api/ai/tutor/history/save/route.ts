import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { auth } from '@/lib/auth/config'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const SaveMessageSchema = z.object({
  sessionId: z.string(),
  userId: z.string().optional(),
  freeUserId: z.string().optional(),
  message: z.string(),
  isUserMessage: z.boolean(),
  ncertReferences: z.array(z.string()).optional(),
  relatedTopics: z.array(z.string()).optional(),
  confidence: z.number().min(0).max(100).optional(),
  tokensUsed: z.number().optional(),
  topic: z.string().optional(),
  difficulty: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = SaveMessageSchema.parse(body)

    // Ensure at least one user identifier is provided
    if (!validatedData.userId && !validatedData.freeUserId) {
      return NextResponse.json(
        { error: 'Either userId or freeUserId must be provided' },
        { status: 400 }
      )
    }

    // Save chat message to database
    const chatHistory = await prisma.chat_history.create({
      data: {
        sessionId: validatedData.sessionId,
        userId: validatedData.userId || null,
        freeUserId: validatedData.freeUserId || null,
        message: validatedData.message,
        isUserMessage: validatedData.isUserMessage,
        ncertReferences: validatedData.ncertReferences || null,
        relatedTopics: validatedData.relatedTopics || null,
        confidence: validatedData.confidence || null,
        tokensUsed: validatedData.tokensUsed || null,
        topic: validatedData.topic || null,
        difficulty: validatedData.difficulty || null,
      },
    })

    return NextResponse.json({
      success: true,
      messageId: chatHistory.id,
      createdAt: chatHistory.createdAt,
    })
  } catch (error) {
    console.error('Error saving chat history:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        error: 'Failed to save chat history',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
