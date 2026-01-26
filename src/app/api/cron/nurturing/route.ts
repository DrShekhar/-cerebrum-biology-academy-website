/**
 * Cron Job API for Lead Nurturing
 *
 * This endpoint is called by Vercel Cron to process scheduled follow-ups.
 * Configure in vercel.json with a cron schedule.
 *
 * GET /api/cron/nurturing - Process scheduled nurturing tasks
 */

import { NextRequest, NextResponse } from 'next/server'
import { processScheduledNurturing, cleanupFollowupQueue } from '@/lib/automation/leadNurturing'
import { whatsappDripService } from '@/lib/automation/whatsappDripService'
import {
  verifyCronAuth,
  createCronUnauthorizedResponse,
  createCronConfigErrorResponse,
} from '@/lib/auth/cron-auth'

export async function GET(request: NextRequest) {
  // SECURITY: Strict cron authentication (no dev bypass)
  const authResult = verifyCronAuth(request)
  if (!authResult.authorized) {
    if (authResult.error?.includes('not set')) {
      return createCronConfigErrorResponse(authResult.error)
    }
    return createCronUnauthorizedResponse(authResult.error || 'Unauthorized')
  }

  const startTime = Date.now()

  try {
    // Process scheduled follow-ups
    const stats = await processScheduledNurturing()

    // Process WhatsApp drip sequences
    const dripStats = await whatsappDripService.processScheduledDrips()

    // Process demo reminders (24h, 1h, 15m before)
    const reminderStats = await whatsappDripService.processDemoReminders()

    // Run cleanup once a day (check if it's midnight hour)
    const currentHour = new Date().getHours()
    let cleanupCount = 0
    if (currentHour === 0) {
      cleanupCount = await cleanupFollowupQueue(30)
    }

    const duration = Date.now() - startTime

    return NextResponse.json({
      success: true,
      message: 'Cron job completed',
      stats,
      dripStats,
      reminderStats,
      cleanupCount,
      duration: `${duration}ms`,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Cron job error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}

// Also support POST for manual triggers (still requires auth)
export async function POST(request: NextRequest) {
  return GET(request)
}
