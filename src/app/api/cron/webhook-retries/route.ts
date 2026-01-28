import { NextRequest, NextResponse } from 'next/server'
import { WebhookService } from '@/lib/webhooks/webhookService'

/**
 * Cron endpoint for processing webhook retries
 * Should be called every minute by Vercel Cron or external scheduler
 */
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

    const result = await WebhookService.processPendingRetries()

    return NextResponse.json({
      success: true,
      message: 'Webhook retries processed successfully',
      data: result,
    })
  } catch (error) {
    console.error('Error in webhook retries cron job:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Webhook retry processing failed',
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
