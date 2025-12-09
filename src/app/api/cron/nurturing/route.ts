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

// Verify the request is from Vercel Cron
function verifyCronRequest(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET

  // In development, allow all requests
  if (process.env.NODE_ENV === 'development') {
    return true
  }

  // If no CRON_SECRET is set, allow requests (with warning)
  if (!cronSecret) {
    console.warn('CRON_SECRET not set - cron endpoint is unprotected')
    return true
  }

  // Verify the authorization header
  return authHeader === `Bearer ${cronSecret}`
}

export async function GET(request: NextRequest) {
  // Verify the request is authorized
  if (!verifyCronRequest(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  const startTime = Date.now()

  try {
    // Process scheduled follow-ups
    const stats = await processScheduledNurturing()

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

// Also support POST for manual triggers
export async function POST(request: NextRequest) {
  return GET(request)
}
