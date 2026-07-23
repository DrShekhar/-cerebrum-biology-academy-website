import { NextResponse } from 'next/server'
import { processTimeTriggers } from '@/lib/followupEngine'
import { requireCronAuth } from '@/lib/auth/cron-auth'

// Vercel Cron invokes registered paths with GET (Authorization: Bearer CRON_SECRET),
// so GET must run the real processing — a 405 stub here means triggers never fire.
const handleCron = requireCronAuth(async () => {
  try {
    const result = await processTimeTriggers()

    return NextResponse.json({
      success: true,
      message: 'Follow-up rule sweep completed',
      data: result,
    })
  } catch (error) {
    console.error('Error in followup triggers cron job:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Trigger processing failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
})

export const GET = handleCron
export const POST = handleCron
