/**
 * Upsell Analysis API
 *
 * POST /api/agents/analyze-upsell
 * Analyzes upsell/cross-sell opportunities for enrolled students
 */

import { NextRequest, NextResponse } from 'next/server'
import { ProductAgent } from '@/lib/crm-agents'
import { AgentTaskManager } from '@/lib/crm-agents/base'
import { AgentType } from '@/generated/prisma'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, async = false } = body

    if (!userId) {
      return NextResponse.json({ success: false, error: 'User ID is required' }, { status: 400 })
    }

    // If async, queue the task and return immediately
    if (async) {
      const taskId = await AgentTaskManager.createTask({
        agentType: AgentType.PRODUCT_AGENT,
        input: {
          action: 'upsell',
          userId,
          trigger: 'API_REQUEST',
        },
      })

      return NextResponse.json({
        success: true,
        message: 'Upsell analysis queued',
        taskId,
      })
    }

    // Execute synchronously
    const agent = new ProductAgent()
    const result = await agent.analyzeUpsell({
      metadata: {
        userId,
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
    console.error('[API] Upsell analysis error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
