/**
 * Agent Tasks API
 *
 * GET /api/agents/tasks - List agent tasks with filters (requires counselor auth)
 * POST /api/agents/tasks - Process pending tasks (requires cron auth)
 * DELETE /api/agents/tasks - Cancel a task (requires counselor auth)
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { AgentTaskManager } from '@/lib/crm-agents/base'
import { processPendingAgentTasks } from '@/lib/crm-agents/processor'
import { AgentTaskStatus } from '@/generated/prisma'
import { authenticateCounselor } from '@/lib/auth/counselor-auth'
import {
  verifyCronAuth,
  createCronUnauthorizedResponse,
  createCronConfigErrorResponse,
} from '@/lib/auth/cron-auth'

/**
 * GET /api/agents/tasks
 * List agent tasks with optional filtering
 */
export async function GET(request: NextRequest) {
  // SECURITY: Require counselor authentication
  const authResult = await authenticateCounselor()
  if ('error' in authResult) {
    return authResult.error
  }

  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') as AgentTaskStatus | null
    const agentType = searchParams.get('agentType')
    const leadId = searchParams.get('leadId')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    // Build filter
    const where: Record<string, unknown> = {}
    if (status) where.status = status
    if (agentType) where.agentType = agentType
    if (leadId) where.leadId = leadId

    // Get tasks
    const [tasks, total] = await Promise.all([
      prisma.agent_tasks.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
        include: {
          lead: {
            select: {
              id: true,
              studentName: true,
              stage: true,
            },
          },
        },
      }),
      prisma.agent_tasks.count({ where }),
    ])

    // Get stats
    const stats = await AgentTaskManager.getStats()

    return NextResponse.json({
      success: true,
      data: {
        tasks,
        pagination: {
          total,
          limit,
          offset,
          hasMore: offset + limit < total,
        },
        stats,
      },
    })
  } catch (error) {
    console.error('[API] Get tasks error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

/**
 * POST /api/agents/tasks
 * Process pending tasks (for cron jobs)
 */
export async function POST(request: NextRequest) {
  // SECURITY: Strict cron authentication
  const cronAuthResult = verifyCronAuth(request)
  if (!cronAuthResult.authorized) {
    if (cronAuthResult.error?.includes('not set')) {
      return createCronConfigErrorResponse(cronAuthResult.error)
    }
    return createCronUnauthorizedResponse(cronAuthResult.error || 'Unauthorized')
  }

  try {
    // Process pending tasks
    const result = await processPendingAgentTasks()

    return NextResponse.json({
      success: true,
      data: result,
    })
  } catch (error) {
    console.error('[API] Process tasks error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

/**
 * DELETE /api/agents/tasks
 * Cancel a specific task
 */
export async function DELETE(request: NextRequest) {
  // SECURITY: Require counselor authentication
  const authResult = await authenticateCounselor()
  if ('error' in authResult) {
    return authResult.error
  }

  try {
    const { searchParams } = new URL(request.url)
    const taskId = searchParams.get('taskId')

    if (!taskId) {
      return NextResponse.json({ success: false, error: 'Task ID is required' }, { status: 400 })
    }

    await AgentTaskManager.cancelTask(taskId)

    return NextResponse.json({
      success: true,
      message: 'Task cancelled',
    })
  } catch (error) {
    console.error('[API] Cancel task error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
