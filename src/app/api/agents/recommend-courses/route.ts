/**
 * Course Recommendation API
 *
 * POST /api/agents/recommend-courses
 * Triggers AI course recommendations for a lead or based on profile
 */

import { NextRequest, NextResponse } from 'next/server'
import { ProductAgent } from '@/lib/crm-agents'
import { AgentTaskManager } from '@/lib/crm-agents/base'
import { AgentType } from '@/generated/prisma'
import { authenticateCounselor } from '@/lib/auth/counselor-auth'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

export async function POST(request: NextRequest) {
  // SECURITY: Require counselor authentication
  const authResult = await authenticateCounselor()
  if ('error' in authResult) {
    return authResult.error
  }

  try {
    const body = await request.json()
    const { leadId, userId, profile, budget, async = false } = body

    if (!leadId && !userId && !profile) {
      return NextResponse.json(
        { success: false, error: 'Either leadId, userId, or profile is required' },
        { status: 400 }
      )
    }

    // If async, queue the task and return immediately
    if (async) {
      const taskId = await AgentTaskManager.createTask({
        agentType: AgentType.PRODUCT_AGENT,
        leadId,
        input: {
          action: 'recommend',
          userId,
          profile,
          budget,
          trigger: 'API_REQUEST',
          triggeredBy: authResult.session.userId,
        },
      })

      return NextResponse.json({
        success: true,
        message: 'Course recommendation queued',
        taskId,
      })
    }

    // Execute synchronously
    const agent = new ProductAgent()
    const result = await agent.recommendCourses({
      leadId,
      metadata: {
        userId,
        profile,
        budget,
      },
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
    console.error('[API] Course recommendation error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
