/**
 * Offer Generation API
 *
 * POST /api/agents/generate-offer
 * Generates personalized pricing offers for a lead and course
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
    const { leadId, courseId, urgency = 'medium', async = false } = body

    if (!leadId) {
      return NextResponse.json({ success: false, error: 'Lead ID is required' }, { status: 400 })
    }

    if (!courseId) {
      return NextResponse.json({ success: false, error: 'Course ID is required' }, { status: 400 })
    }

    // If async, queue the task and return immediately
    if (async) {
      const taskId = await AgentTaskManager.createTask({
        agentType: AgentType.PRODUCT_AGENT,
        leadId,
        input: {
          action: 'offer',
          courseId,
          urgency,
          trigger: 'API_REQUEST',
          triggeredBy: authResult.session.userId,
        },
      })

      return NextResponse.json({
        success: true,
        message: 'Offer generation queued',
        taskId,
      })
    }

    // Execute synchronously
    const agent = new ProductAgent()
    const result = await agent.generateOffer({
      leadId,
      metadata: {
        courseId,
        urgency,
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
    console.error('[API] Offer generation error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
