/**
 * Test endpoint for SEO Content Approval
 * DELETE AFTER TESTING
 */

import { NextResponse } from 'next/server'
import { sendForApproval } from '@/lib/seo-marketing/approvalService'
import { getQueueItem } from '@/lib/seo-marketing/queueService'

export async function GET(request: Request) {
  // Get queue item ID from query param
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id') || 'cmk4qg3sl0001il7huizqdw2k'
  const secret = searchParams.get('secret')

  // Simple secret check
  if (secret !== 'test123approval') {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }

  const QUEUE_ITEM_ID = id

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
