import { NextRequest, NextResponse } from 'next/server'
import { processQueue } from '@/lib/followupProcessor'

export async function POST(request: NextRequest) {
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

export async function GET() {
  return NextResponse.json(
    {
      success: false,
      error: 'Method not allowed. Use POST with proper authorization.',
    },
    { status: 405 }
  )
}
