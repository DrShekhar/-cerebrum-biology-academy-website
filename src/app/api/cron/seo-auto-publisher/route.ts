/**
 * SEO Content Machine - Auto Publisher Cron Job
 *
 * Runs every 5 minutes to publish approved content to the website.
 * Automatically converts approved content to MDX and writes to filesystem.
 *
 * Vercel Cron: * /5 * * * * (every 5 minutes)
 */

import { NextRequest, NextResponse } from 'next/server'
import { logger } from '@/lib/utils/logger'
import { publishAllApproved } from '@/lib/seo-marketing/publisher'
import { getApprovedItems } from '@/lib/seo-marketing/queueService'

// CRON secret for Vercel
const CRON_SECRET = process.env.CRON_SECRET

/**
 * GET handler - for status checking
 */
export async function GET(request: NextRequest) {
  // Check how many items are waiting to be published
  const approvedItems = await getApprovedItems()

  return NextResponse.json({
    service: 'SEO Auto Publisher',
    status: 'active',
    schedule: 'Every 5 minutes',
    pendingPublish: approvedItems.length,
    items: approvedItems.map((item) => ({
      id: item.id.substring(0, 8),
      type: item.type,
      title: item.generatedTitle || item.topic,
      approvedAt: item.updatedAt,
    })),
  })
}

/**
 * POST handler - triggered by Vercel Cron
 */
export async function POST(request: NextRequest) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization')
  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    logger.warn('Unauthorized cron request', { service: 'seo-auto-publisher' })
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    logger.info('Starting auto-publisher cron job', { service: 'seo-auto-publisher' })

    // Get count of approved items before publishing
    const approvedItems = await getApprovedItems()

    if (approvedItems.length === 0) {
      logger.info('No approved content to publish', { service: 'seo-auto-publisher' })
      return NextResponse.json({
        success: true,
        message: 'No approved content to publish',
        published: 0,
        failed: 0,
      })
    }

    logger.info(`Found ${approvedItems.length} approved items to publish`, {
      service: 'seo-auto-publisher',
      items: approvedItems.map((i) => i.id.substring(0, 8)),
    })

    // Publish all approved content
    const result = await publishAllApproved()

    logger.info('Auto-publisher cron completed', {
      service: 'seo-auto-publisher',
      published: result.published,
      failed: result.failed,
      total: approvedItems.length,
    })

    return NextResponse.json({
      success: true,
      message: `Published ${result.published} items, ${result.failed} failed`,
      published: result.published,
      failed: result.failed,
      results: result.results.map((r) => ({
        success: r.success,
        url: r.publishedUrl,
        error: r.error,
      })),
    })
  } catch (error) {
    logger.error('Auto-publisher cron failed', {
      service: 'seo-auto-publisher',
      error: error instanceof Error ? error.message : 'Unknown error',
    })

    return NextResponse.json(
      {
        success: false,
        error: 'Internal error during auto-publishing',
      },
      { status: 500 }
    )
  }
}
