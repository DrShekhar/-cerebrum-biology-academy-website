/**
 * SEO Content Machine - Content Processor Cron Job
 *
 * Main orchestrator that processes the content queue:
 * 1. Gets PENDING items from the queue
 * 2. Generates content using Claude API
 * 3. Sends to owner's WhatsApp for approval
 *
 * Vercel Cron: every 10 minutes
 */

import { NextRequest, NextResponse } from 'next/server'
import { logger } from '@/lib/utils/logger'
import {
  getPendingItems,
  getOrCreateMonthlyLimits,
  getQueueStats,
} from '@/lib/seo-marketing/queueService'
import { processQueueItem } from '@/lib/seo-marketing/contentGenerator'
import { sendForApproval } from '@/lib/seo-marketing/approvalService'

// CRON secret for Vercel
const CRON_SECRET = process.env.CRON_SECRET

/**
 * GET handler - for status checking
 */
export async function GET() {
  const stats = await getQueueStats()
  const limits = await getOrCreateMonthlyLimits()

  return NextResponse.json({
    service: 'SEO Content Processor',
    status: 'active',
    schedule: 'Every 10 minutes',
    queue: stats.queue,
    budget: {
      used: `$${limits.costUsd.toFixed(2)}`,
      remaining: `$${limits.remainingBudget.toFixed(2)}`,
      limit: `$${limits.maxMonthlyCostUsd.toFixed(2)}`,
    },
  })
}

/**
 * POST handler - triggered by Vercel Cron
 */
export async function POST(request: NextRequest) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization')
  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    logger.warn('Unauthorized cron request', { service: 'seo-processor' })
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    logger.info('Starting content processor cron job', { service: 'seo-processor' })

    // Check budget
    const limits = await getOrCreateMonthlyLimits()
    if (limits.isAtLimit) {
      logger.info('Monthly budget limit reached', {
        service: 'seo-processor',
        costUsd: limits.costUsd,
        limit: limits.maxMonthlyCostUsd,
      })
      return NextResponse.json({
        success: false,
        message: `Monthly budget limit reached ($${limits.costUsd.toFixed(2)}/$${limits.maxMonthlyCostUsd.toFixed(2)})`,
      })
    }

    // Get pending items (limit to 2 per run to control costs)
    const pendingItems = await getPendingItems(2)

    if (pendingItems.length === 0) {
      logger.info('No pending items in queue', { service: 'seo-processor' })
      return NextResponse.json({
        success: true,
        message: 'No pending items to process',
        processed: 0,
      })
    }

    logger.info(`Processing ${pendingItems.length} pending items`, {
      service: 'seo-processor',
      ids: pendingItems.map((item) => item.id.substring(0, 8)),
    })

    const results = {
      processed: 0,
      sentForApproval: 0,
      failed: 0,
      details: [] as { id: string; status: string; title?: string; error?: string }[],
    }

    for (const item of pendingItems) {
      try {
        // Check remaining budget before each item
        const currentLimits = await getOrCreateMonthlyLimits()
        if (currentLimits.remainingBudget < 0.10) {
          logger.warn('Insufficient budget for content generation', {
            service: 'seo-processor',
            remaining: currentLimits.remainingBudget,
            queueItemId: item.id,
          })
          results.details.push({
            id: item.id.substring(0, 8),
            status: 'skipped',
            error: 'Insufficient budget',
          })
          continue
        }

        // Generate content
        logger.info(`Processing queue item: ${item.topic}`, {
          service: 'seo-processor',
          queueItemId: item.id,
          type: item.type,
        })

        const generationResult = await processQueueItem(item.id)

        if (!generationResult.success) {
          logger.error('Content generation failed', {
            service: 'seo-processor',
            queueItemId: item.id,
            error: generationResult.error,
          })
          results.failed++
          results.details.push({
            id: item.id.substring(0, 8),
            status: 'failed',
            error: generationResult.error,
          })
          continue
        }

        results.processed++

        // Send for approval via WhatsApp
        const approvalSent = await sendForApproval(item.id)

        if (approvalSent) {
          results.sentForApproval++
          results.details.push({
            id: item.id.substring(0, 8),
            status: 'sent_for_approval',
            title: item.topic,
          })
        } else {
          results.details.push({
            id: item.id.substring(0, 8),
            status: 'generated_but_approval_failed',
            title: item.topic,
          })
        }

        // Small delay between items
        await new Promise((resolve) => setTimeout(resolve, 1000))
      } catch (error) {
        logger.error('Error processing queue item', {
          service: 'seo-processor',
          queueItemId: item.id,
          error: error instanceof Error ? error.message : 'Unknown error',
        })
        results.failed++
        results.details.push({
          id: item.id.substring(0, 8),
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error',
        })
      }
    }

    // Get updated budget info
    const updatedLimits = await getOrCreateMonthlyLimits()

    logger.info('Content processor completed', {
      service: 'seo-processor',
      processed: results.processed,
      sentForApproval: results.sentForApproval,
      failed: results.failed,
      budgetUsed: updatedLimits.costUsd,
    })

    return NextResponse.json({
      success: true,
      message: `Processed ${results.processed} items, ${results.sentForApproval} sent for approval`,
      ...results,
      budget: {
        used: `$${updatedLimits.costUsd.toFixed(2)}`,
        remaining: `$${updatedLimits.remainingBudget.toFixed(2)}`,
      },
    })
  } catch (error) {
    logger.error('Content processor cron failed', {
      service: 'seo-processor',
      error: error instanceof Error ? error.message : 'Unknown error',
    })

    return NextResponse.json(
      {
        success: false,
        error: 'Internal error during content processing',
      },
      { status: 500 }
    )
  }
}
