/**
 * Content Generation API
 *
 * POST /api/agents/generate-content
 * Generates marketing content, templates, and messages
 */

import { NextRequest, NextResponse } from 'next/server'
import { ContentGeneratorAgent } from '@/lib/crm-agents'
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
    const { contentType, customPrompt, metadata, async = false } = body

    if (!contentType && !customPrompt) {
      return NextResponse.json(
        { success: false, error: 'Content type or custom prompt is required' },
        { status: 400 }
      )
    }

    // If async, queue the task
    if (async) {
      const taskId = await AgentTaskManager.createTask({
        agentType: AgentType.CONTENT_GENERATOR,
        input: {
          trigger: 'API_REQUEST',
          contentType,
          customPrompt,
          metadata,
          triggeredBy: authResult.session.userId,
        },
      })

      return NextResponse.json({
        success: true,
        message: 'Content generation queued',
        taskId,
      })
    }

    // Execute synchronously
    const agent = new ContentGeneratorAgent()
    const result = await agent.execute({
      metadata: { contentType, customPrompt, ...metadata },
    })

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || result.message },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      data: result.data,
      nextSteps: result.nextSteps,
    })
  } catch (error) {
    console.error('[API] Content generation error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
