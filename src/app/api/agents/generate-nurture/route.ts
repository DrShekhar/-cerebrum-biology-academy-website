/**
 * Nurture Message Generation API
 *
 * POST /api/agents/generate-nurture
 * Generates personalized nurture messages for leads
 */

import { NextRequest, NextResponse } from 'next/server'
import { NurtureAgent } from '@/lib/crm-agents'
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
    const { leadId, messageType, context, async = false } = body

    if (!leadId) {
      return NextResponse.json({ success: false, error: 'Lead ID is required' }, { status: 400 })
    }

    // If async, queue the task
    if (async) {
      const taskId = await AgentTaskManager.createTask({
        agentType: AgentType.NURTURE,
        leadId,
        input: {
          trigger: 'API_REQUEST',
          messageType,
          context,
          triggeredBy: authResult.session.userId,
        },
      })

      return NextResponse.json({
        success: true,
        message: 'Nurture message generation queued',
        taskId,
      })
    }

    // Execute synchronously
    const agent = new NurtureAgent()
    const result = await agent.execute({
      leadId,
      metadata: { messageType, context },
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
      action: result.action,
      nextSteps: result.nextSteps,
    })
  } catch (error) {
    console.error('[API] Nurture generation error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
