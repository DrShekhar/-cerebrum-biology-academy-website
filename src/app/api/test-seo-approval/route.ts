/**
 * Test endpoint for SEO Content Approval
 * DELETE AFTER TESTING
 */

import { NextResponse } from 'next/server'
import { sendForApproval } from '@/lib/seo-marketing/approvalService'
import { getQueueItem } from '@/lib/seo-marketing/queueService'

export async function GET(request: Request) {
  // Verify cron secret for security
  const authHeader = request.headers.get('Authorization')
  const cronSecret = process.env.CRON_SECRET

  if (authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const QUEUE_ITEM_ID = 'cmk4qg3sl0001il7huizqdw2k'

  try {
    // Get queue item
    const item = await getQueueItem(QUEUE_ITEM_ID)

    if (!item) {
      return NextResponse.json({ error: 'Queue item not found' }, { status: 404 })
    }

    // Send approval
    const result = await sendForApproval(QUEUE_ITEM_ID)

    return NextResponse.json({
      success: result,
      item: {
        id: item.id,
        status: item.status,
        title: item.generatedTitle,
        type: item.type,
      },
      message: result ? 'WhatsApp approval message sent!' : 'Failed to send',
    })
  } catch (error) {
    return NextResponse.json({
      error: 'Test failed',
      details: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 })
  }
}
