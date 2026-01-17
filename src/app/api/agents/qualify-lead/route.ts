/**
 * Lead Qualification API
 *
 * POST /api/agents/qualify-lead
 * Triggers AI lead qualification for a specific lead
 */

import { NextRequest, NextResponse } from 'next/server'
import { LeadQualifierAgent } from '@/lib/crm-agents'
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

    // If async, queue the task and return immediately
    if (async) {
      const taskId = await AgentTaskManager.createTask({
        agentType: AgentType.LEAD_QUALIFIER,
        leadId,
        input: { trigger: 'API_REQUEST', triggeredBy: authResult.session.userId },
      })

      return NextResponse.json({
        success: true,
        message: 'Lead qualification queued',
        taskId,
      })
    }

    // Execute synchronously
    const agent = new LeadQualifierAgent()
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
      action: result.action,
      nextSteps: result.nextSteps,
    })
  } catch (error) {
    console.error('[API] Lead qualification error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
