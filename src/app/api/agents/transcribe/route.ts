/**
 * Call Transcription API
 *
 * POST /api/agents/transcribe
 * Transcribes call recordings using OpenAI Whisper
 */

import { NextRequest, NextResponse } from 'next/server'
import { CallTranscriptionService } from '@/lib/crm-agents/callTranscription'
import { AgentTaskManager } from '@/lib/crm-agents/base'
import { AgentType } from '@/generated/prisma'
import { authenticateCounselor } from '@/lib/auth/counselor-auth'

export async function POST(request: NextRequest) {
  // SECURITY: Require counselor authentication
  const authResult = await authenticateCounselor()
  if ('error' in authResult) {
    return authResult.error
  }

  try {
    const body = await request.json()
    const { communicationId, async = true } = body // Default to async for transcription

    if (!communicationId) {
      return NextResponse.json(
        { success: false, error: 'Communication ID is required' },
        { status: 400 }
      )
    }

    // Transcription should usually be async due to processing time
    if (async) {
      const taskId = await AgentTaskManager.createTask({
        agentType: AgentType.CALL_TRANSCRIPTION,
        communicationId,
        input: { trigger: 'API_REQUEST', triggeredBy: authResult.session.userId },
      })

      return NextResponse.json({
        success: true,
        message: 'Transcription queued',
        taskId,
      })
    }

    // Execute synchronously (may take time)
    const service = new CallTranscriptionService()
    const result = await service.transcribeAndStore(communicationId)

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      data: {
        transcriptLength: result.transcript?.length,
        duration: result.duration,
        language: result.language,
      },
    })
  } catch (error) {
    console.error('[API] Transcription error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

/**
 * GET /api/agents/transcribe
 * Get transcription status for a communication
 */
export async function GET(request: NextRequest) {
  // SECURITY: Require counselor authentication
  const authResult = await authenticateCounselor()
  if ('error' in authResult) {
    return authResult.error
  }

  try {
    const { searchParams } = new URL(request.url)
    const communicationId = searchParams.get('communicationId')

    if (!communicationId) {
      return NextResponse.json(
        { success: false, error: 'Communication ID is required' },
        { status: 400 }
      )
    }

    const service = new CallTranscriptionService()
    const status = await service.getTranscriptionStatus(communicationId)

    return NextResponse.json({
      success: true,
      data: status,
    })
  } catch (error) {
    console.error('[API] Transcription status error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
