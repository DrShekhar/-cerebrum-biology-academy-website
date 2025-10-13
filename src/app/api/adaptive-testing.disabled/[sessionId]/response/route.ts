/**
 * API Route: Submit Response to Adaptive Test
 * POST /api/adaptive-testing/[sessionId]/response
 */

import { NextRequest, NextResponse } from 'next/server'
import { adaptiveTestingEngine } from '@/lib/adaptive-testing/AdaptiveTestingEngine'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/config'

export async function POST(
  request: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  try {
    // Get user session
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const { sessionId } = params

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      )
    }

    // Parse request body
    const body = await request.json()
    const { itemId, response, responseTime, confidence } = body

    // Validate required fields
    if (!itemId || typeof response !== 'boolean' || typeof responseTime !== 'number') {
      return NextResponse.json(
        { error: 'itemId, response (boolean), and responseTime (number) are required' },
        { status: 400 }
      )
    }

    if (responseTime <= 0) {
      return NextResponse.json(
        { error: 'Response time must be positive' },
        { status: 400 }
      )
    }

    // Process the response
    const result = await adaptiveTestingEngine.processResponse(
      sessionId,
      itemId,
      response,
      responseTime,
      confidence
    )

    // Return processing result
    return NextResponse.json({
      success: true,
      processed: result.processed,
      nextItem: result.nextItem ? {
        id: result.nextItem.id,
        type: result.nextItem.type,
        question: result.nextItem.question,
        options: result.nextItem.options,
        difficulty: result.nextItem.difficulty,
        estimatedTime: result.nextItem.estimatedTime,
        topic: result.nextItem.topic,
        subtopic: result.nextItem.subtopic,
        hints: result.nextItem.hints
      } : null,
      sessionComplete: result.sessionComplete,
      adaptations: result.adaptations,
      insights: result.insights,
      recommendations: result.recommendations
    })

  } catch (error) {
    console.error('Error processing adaptive test response:', error)

    return NextResponse.json(
      {
        error: 'Failed to process response',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}