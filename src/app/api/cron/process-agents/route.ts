/**
 * Agent Processing Cron Job
 *
 * This route is called periodically by Vercel Cron to process pending agent tasks.
 * Configure in vercel.json with path /api/cron/process-agents and schedule every 5 min
 */

import { NextRequest, NextResponse } from 'next/server'
import { processPendingAgentTasks } from '@/lib/crm-agents/processor'
import { verifyCronAuth, createCronUnauthorizedResponse, createCronConfigErrorResponse } from '@/lib/auth/cron-auth'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

export async function GET(request: NextRequest) {
  // SECURITY: Strict cron authentication
  const authResult = verifyCronAuth(request)
  if (!authResult.authorized) {
    console.log('[CRON] Unauthorized request to process-agents')
    if (authResult.error?.includes('not set')) {
      return createCronConfigErrorResponse(authResult.error)
    }
    return createCronUnauthorizedResponse(authResult.error || 'Unauthorized')
  }

  try {
    console.log('[CRON] Starting agent task processing...')

    const result = await processPendingAgentTasks()

    console.log(
      `[CRON] Complete: processed=${result.processed}, succeeded=${result.succeeded}, failed=${result.failed}`
    )

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      result,
    })
  } catch (error) {
    console.error('[CRON] Agent processing error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  return GET(request)
}
