/**
 * Test endpoint for SEO Content Approval
 * DELETE AFTER TESTING
 */

import { NextResponse } from 'next/server'
import { sendSEOContentApproval } from '@/lib/interakt'
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
  const OWNER_PHONE = process.env.OWNER_WHATSAPP_NUMBER || '919999744334'

  try {
    // Get queue item
    const item = await getQueueItem(QUEUE_ITEM_ID)

    if (!item) {
      return NextResponse.json({ error: 'Queue item not found' }, { status: 404 })
    }

    // Parse content for preview
    let preview = item.generatedExcerpt || item.topic
    let wordCount = 0
    if (item.generatedContent) {
      try {
        const content = JSON.parse(item.generatedContent)
        if (content.content) {
          wordCount = content.content.split(/\s+/).length
          const firstPara = content.content.split('\n\n')[0]?.replace(/[#*]/g, '')
          preview = firstPara?.substring(0, 200) || preview
        }
      } catch {
        // Use default preview
      }
    }

    // Call Interakt directly to get full error details
    const result = await sendSEOContentApproval({
      phone: OWNER_PHONE,
      contentType: 'Blog Post',
      title: item.generatedTitle || item.topic,
      preview,
      wordCount,
      readTime: Math.ceil(wordCount / 200),
      iterationCount: item.iterationCount,
      referenceId: QUEUE_ITEM_ID,
    })

    return NextResponse.json({
      success: result.success,
      item: {
        id: item.id,
        status: item.status,
        title: item.generatedTitle,
        type: item.type,
      },
      interaktResponse: result,
      message: result.success ? 'WhatsApp approval message sent!' : 'Failed to send',
    })
  } catch (error) {
    return NextResponse.json({
      error: 'Test failed',
      details: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    }, { status: 500 })
  }
}
