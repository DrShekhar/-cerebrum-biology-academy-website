/**
 * API Route: Run Task Automation
 * POST /api/counselor/tasks/automation/run
 */

import { NextRequest, NextResponse } from 'next/server'
import { withCounselor } from '@/lib/auth/middleware'
import { TaskService } from '@/lib/counselor/taskService'

async function handlePOST(req: NextRequest, session: any) {
  try {
    const result = await TaskService.runAutomation(session.userId)

    return NextResponse.json({
      success: true,
      data: result,
      message: `Created ${result.total} automated tasks`,
    })
  } catch (error) {
    console.error('Run automation error:', error)

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to run automation',
      },
      { status: 500 }
    )
  }
}

export const POST = withCounselor(handlePOST)
