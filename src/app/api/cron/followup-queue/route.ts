import { NextResponse } from 'next/server'
import { processQueue } from '@/lib/followupProcessor'
import { requireCronAuth } from '@/lib/auth/cron-auth'

// Vercel Cron invokes registered paths with GET (Authorization: Bearer CRON_SECRET),
// so GET must run the real processing — a 405 stub here means the queue is never drained.
const handleCron = requireCronAuth(async () => {
  try {
    const result = await processQueue()

    return NextResponse.json({
      success: true,
      message: 'Queue processing completed',
      data: result,
    })
  } catch (error) {
    console.error('Error in followup queue cron job:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Queue processing failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
})

export const GET = handleCron
export const POST = handleCron
