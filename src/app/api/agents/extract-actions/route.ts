/**
 * Action Item Extraction API
 *
 * POST /api/agents/extract-actions
 * Extracts actionable tasks from call transcripts
 */

import { NextRequest, NextResponse } from 'next/server'
import { ActionItemExtractorAgent } from '@/lib/crm-agents'
import { AgentTaskManager } from '@/lib/crm-agents/base'
import { AgentType } from '@/generated/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { communicationId, async = false } = body

    if (!communicationId) {
      return NextResponse.json(
        { success: false, error: 'Communication ID is required' },
        { status: 400 }
      )
    }

    // If async, queue the task
    if (async) {
      const taskId = await AgentTaskManager.createTask({
        agentType: AgentType.ACTION_EXTRACTOR,
        communicationId,
        input: { trigger: 'API_REQUEST' },
      })

      return NextResponse.json({
        success: true,
        message: 'Action extraction queued',
        taskId,
      })
    }

    // Execute synchronously
    const agent = new ActionItemExtractorAgent()
    const result = await agent.execute({ communicationId })

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || result.message },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      data: result.data,
      action: result.action,
      nextSteps: result.nextSteps,
    })
  } catch (error) {
    console.error('[API] Action extraction error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
