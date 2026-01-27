/**
 * Cron endpoint for processing WhatsApp nurturing sequences
 * Run daily at 10 AM IST via Vercel Cron
 *
 * Add to vercel.json:
 * {
 *   "crons": [{
 *     "path": "/api/cron/nurturing-sequence",
 *     "schedule": "30 4 * * *"  // 10 AM IST (4:30 UTC)
 *   }]
 * }
 */

import { NextRequest, NextResponse } from 'next/server'
import { processNurturingMessages } from '@/lib/whatsapp/contentLeadFollowup'
import { logger } from '@/lib/utils/logger'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

export async function GET(request: NextRequest) {
  try {
    // Verify cron secret for security
    const authHeader = request.headers.get('authorization')
    const cronSecret = process.env.CRON_SECRET

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      logger.warn('Unauthorized cron request', { service: 'nurturing-cron' })
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    logger.info('Starting nurturing sequence processing', { service: 'nurturing-cron' })

    const result = await processNurturingMessages()

    logger.info('Nurturing sequence processing complete', {
      service: 'nurturing-cron',
      processed: result.processed,
      success: result.success,
    })

    return NextResponse.json({
      success: true,
      message: `Processed ${result.processed || 0} nurturing messages`,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    logger.error('Nurturing cron error', {
      service: 'nurturing-cron',
      error: error instanceof Error ? error.message : 'Unknown error',
    })

    return NextResponse.json(
      { success: false, error: 'Failed to process nurturing messages' },
      { status: 500 }
    )
  }
}
