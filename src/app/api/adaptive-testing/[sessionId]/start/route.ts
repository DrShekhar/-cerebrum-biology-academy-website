/**
 * API Route: Start Adaptive Testing Session
 * POST /api/adaptive-testing/[sessionId]/start
 */

import { NextRequest, NextResponse } from 'next/server'
import { adaptiveTestingEngine } from '@/lib/adaptive-testing/AdaptiveTestingEngine'
import { auth } from '@/lib/auth/config'

export async function POST(request: NextRequest, { params }: { params: { sessionId: string } }) {
  try {
    // Get user session
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    const { sessionId } = params

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID is required' }, { status: 400 })
    }

    // Start the adaptive test session
    const result = await adaptiveTestingEngine.startSession(sessionId)

    return NextResponse.json({
      success: true,
      session: {
        id: result.session.id,
        state: result.session.state,
        progressMetrics: result.session.progressMetrics,
        timestamps: result.session.timestamps,
      },
      firstItem: result.firstItem
        ? {
            id: result.firstItem.id,
            type: result.firstItem.type,
            question: result.firstItem.question,
            options: result.firstItem.options,
            difficulty: result.firstItem.difficulty,
            estimatedTime: result.firstItem.estimatedTime,
            topic: result.firstItem.topic,
            subtopic: result.firstItem.subtopic,
          }
        : null,
      instructions: result.instructions,
    })
  } catch (error) {
    console.error('Error starting adaptive test session:', error)

    return NextResponse.json(
      {
        error: 'Failed to start adaptive test session',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest, { params }: { params: { sessionId: string } }) {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
