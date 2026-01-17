/**
 * Call Preparation API
 *
 * POST /api/agents/call-prep
 * Generates call preparation briefs for counselors
 */

import { NextRequest, NextResponse } from 'next/server'
import { CallPrepAgent } from '@/lib/crm-agents'
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
    const { leadId, async = false } = body

    if (!leadId) {
      return NextResponse.json({ success: false, error: 'Lead ID is required' }, { status: 400 })
    }

    // If async, queue the task
    if (async) {
      const taskId = await AgentTaskManager.createTask({
        agentType: AgentType.CALL_PREP,
        leadId,
        input: { trigger: 'API_REQUEST', triggeredBy: authResult.session.userId },
      })

      return NextResponse.json({
        success: true,
        message: 'Call prep generation queued',
        taskId,
      })
    }

    // Execute synchronously
    const agent = new CallPrepAgent()
    const result = await agent.execute({ leadId })

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
    console.error('[API] Call prep error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
