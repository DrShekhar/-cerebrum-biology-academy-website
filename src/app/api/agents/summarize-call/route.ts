/**
 * Call Summary API
 *
 * POST /api/agents/summarize-call
 * Generates AI-powered summaries of call transcripts
 */

import { NextRequest, NextResponse } from 'next/server'
import { CallSummaryAgent } from '@/lib/crm-agents'
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
        agentType: AgentType.CALL_SUMMARY,
        communicationId,
        input: { trigger: 'API_REQUEST' },
      })

      return NextResponse.json({
        success: true,
        message: 'Call summary generation queued',
        taskId,
      })
    }

    // Execute synchronously
    const agent = new CallSummaryAgent()
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
    console.error('[API] Call summary error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
