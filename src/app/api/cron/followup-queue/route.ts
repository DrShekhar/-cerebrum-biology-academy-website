import { NextRequest, NextResponse } from 'next/server'
import { processQueue } from '@/lib/followupProcessor'

// Vercel Cron invokes registered paths with GET (Authorization: Bearer CRON_SECRET),
// so GET must run the real processing — a 405 stub here means the queue is never drained.
async function handleCron(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    const cronSecret = process.env.CRON_SECRET

    if (!cronSecret) {
      console.error('CRON_SECRET not configured')
      return NextResponse.json(
        { success: false, error: 'Cron configuration error' },
        { status: 500 }
      )
    }

    if (authHeader !== `Bearer ${cronSecret}`) {
      console.error('Unauthorized cron job attempt')
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

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
}

export async function GET(request: NextRequest) {
  return handleCron(request)
}

export async function POST(request: NextRequest) {
  return handleCron(request)
}
