/**
 * SEO Content Machine - Queue Service
 *
 * Manages the content generation queue, tracks limits, and handles status updates.
 * Enforces $5 USD monthly cap on API usage.
 */

import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/utils/logger'
import type {
  ContentGenerationType,
  ContentTriggerSource,
  ContentPriority,
  ContentGenerationStatus,
} from '@/generated/prisma'

// Cost per token (Claude Sonnet 3.5)
const COST_PER_INPUT_TOKEN = 0.000003 // $3 per 1M tokens
const COST_PER_OUTPUT_TOKEN = 0.000015 // $15 per 1M tokens

// Default monthly limits
const DEFAULT_MONTHLY_COST_LIMIT = 5.0 // $5 USD max per month

export interface QueueAddInput {
  type: ContentGenerationType
  triggerSource: ContentTriggerSource
  topic: string
  keywords?: string[]
  sourceUrl?: string
  additionalContext?: string
  priority?: ContentPriority
}

export interface QueueItem {
  id: string
  type: ContentGenerationType
  triggerSource: ContentTriggerSource
  priority: ContentPriority
  status: ContentGenerationStatus
  topic: string
  keywords: string[]
  sourceUrl: string | null
  generatedTitle: string | null
  generatedSlug: string | null
  createdAt: Date
  updatedAt: Date
}

export interface MonthlyLimits {
  month: string
  blogsGenerated: number
  newsGenerated: number
  landingPages: number
  tokensUsed: number
  costUsd: number
  maxMonthlyBlogs: number
  maxMonthlyNews: number
  maxMonthlyPages: number
  maxMonthlyCostUsd: number
  isAtLimit: boolean
  remainingBudget: number
}

/**
 * Get current month in YYYY-MM format
 */
function getCurrentMonth(): string {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
}

/**
 * Get or create monthly limits record
 */
export async function getOrCreateMonthlyLimits(): Promise<MonthlyLimits> {
  const month = getCurrentMonth()

  let limits = await prisma.content_generation_limits.findUnique({
    where: { month },
  })

  if (!limits) {
    limits = await prisma.content_generation_limits.create({
      data: {
        month,
        maxMonthlyCostUsd: DEFAULT_MONTHLY_COST_LIMIT,
      },
    })
  }

  return {
    month: limits.month,
    blogsGenerated: limits.blogsGenerated,
    newsGenerated: limits.newsGenerated,
    landingPages: limits.landingPages,
    tokensUsed: limits.tokensUsed,
    costUsd: limits.costUsd,
    maxMonthlyBlogs: limits.maxMonthlyBlogs,
    maxMonthlyNews: limits.maxMonthlyNews,
    maxMonthlyPages: limits.maxMonthlyPages,
    maxMonthlyCostUsd: limits.maxMonthlyCostUsd,
    isAtLimit: limits.costUsd >= limits.maxMonthlyCostUsd,
    remainingBudget: Math.max(0, limits.maxMonthlyCostUsd - limits.costUsd),
  }
}

/**
 * Check if we can generate more content (within budget)
 */
export async function canGenerateContent(
  type: ContentGenerationType
): Promise<{ allowed: boolean; reason?: string }> {
  const limits = await getOrCreateMonthlyLimits()

  // Check cost limit first (most important)
  if (limits.isAtLimit) {
    return {
      allowed: false,
      reason: `Monthly budget limit of $${limits.maxMonthlyCostUsd} reached. Current spend: $${limits.costUsd.toFixed(2)}`,
    }
  }

  // Check type-specific limits
  switch (type) {
    case 'BLOG_POST':
      if (limits.blogsGenerated >= limits.maxMonthlyBlogs) {
        return {
          allowed: false,
          reason: `Monthly blog limit (${limits.maxMonthlyBlogs}) reached`,
        }
      }
      break
    case 'NEWS_ARTICLE':
      if (limits.newsGenerated >= limits.maxMonthlyNews) {
        return {
          allowed: false,
          reason: `Monthly news limit (${limits.maxMonthlyNews}) reached`,
        }
      }
      break
    case 'SEO_LANDING_PAGE':
      if (limits.landingPages >= limits.maxMonthlyPages) {
        return {
          allowed: false,
          reason: `Monthly landing page limit (${limits.maxMonthlyPages}) reached`,
        }
      }
      break
  }

  return { allowed: true }
}

/**
 * Add item to the content generation queue
 */
export async function addToQueue(input: QueueAddInput): Promise<QueueItem | null> {
  const { type, triggerSource, topic, keywords = [], sourceUrl, additionalContext, priority } = input

  // Check if we can generate this content type
  const check = await canGenerateContent(type)
  if (!check.allowed) {
    logger.warn('Cannot add to queue - limit reached', {
      service: 'seo-queue',
      type,
      reason: check.reason,
    })
    return null
  }

  // Check for duplicate topic in pending/generating queue
  const existing = await prisma.content_generation_queue.findFirst({
    where: {
      topic,
      type,
      status: { in: ['PENDING', 'GENERATING', 'REVIEW', 'ITERATING'] },
    },
  })

  if (existing) {
    logger.info('Duplicate topic already in queue', {
      service: 'seo-queue',
      existingId: existing.id,
      topic,
    })
    return existing as QueueItem
  }

  const item = await prisma.content_generation_queue.create({
    data: {
      type,
      triggerSource,
      topic,
      keywords,
      sourceUrl,
      additionalContext,
      priority: priority || 'NORMAL',
      status: 'PENDING',
    },
  })

  logger.info('Added item to content queue', {
    service: 'seo-queue',
    id: item.id,
    type,
    topic,
    triggerSource,
  })

  return item as QueueItem
}

/**
 * Get pending items from queue (by priority)
 */
export async function getPendingItems(limit: number = 5): Promise<QueueItem[]> {
  const items = await prisma.content_generation_queue.findMany({
    where: { status: 'PENDING' },
    orderBy: [
      { priority: 'asc' }, // URGENT=0, HIGH=1, NORMAL=2, LOW=3 - lower first
      { createdAt: 'asc' }, // Older first (FIFO within priority)
    ],
    take: limit,
  })

  return items as QueueItem[]
}

/**
 * Get items awaiting review (sent to WhatsApp)
 */
export async function getItemsInReview(): Promise<QueueItem[]> {
  const items = await prisma.content_generation_queue.findMany({
    where: { status: 'REVIEW' },
    orderBy: { approvalSentAt: 'asc' },
  })

  return items as QueueItem[]
}

/**
 * Get approved items ready to publish
 */
export async function getApprovedItems(): Promise<QueueItem[]> {
  const items = await prisma.content_generation_queue.findMany({
    where: { status: 'APPROVED' },
    orderBy: { updatedAt: 'asc' },
  })

  return items as QueueItem[]
}

/**
 * Update queue item status
 */
export async function updateQueueStatus(
  id: string,
  status: ContentGenerationStatus,
  additionalData?: Partial<{
    generatedTitle: string
    generatedSlug: string
    generatedContent: string
    generatedMeta: Record<string, unknown>
    generatedExcerpt: string
    whatsappMessageId: string
    approvalSentAt: Date
    approvalResponse: string
    iterationFeedback: string
    publishedUrl: string
    publishedAt: Date
    tokensUsed: number
    costUsd: number
    errorMessage: string
  }>
): Promise<QueueItem | null> {
  try {
    // If iterating, increment counter
    let iterationCount
    if (status === 'ITERATING') {
      const current = await prisma.content_generation_queue.findUnique({
        where: { id },
        select: { iterationCount: true },
      })
      iterationCount = (current?.iterationCount || 0) + 1
    }

    const item = await prisma.content_generation_queue.update({
      where: { id },
      data: {
        status,
        ...(iterationCount !== undefined && { iterationCount }),
        ...additionalData,
      },
    })

    logger.info('Updated queue item status', {
      service: 'seo-queue',
      id,
      status,
    })

    return item as QueueItem
  } catch (error) {
    logger.error('Failed to update queue status', {
      service: 'seo-queue',
      id,
      status,
      error,
    })
    return null
  }
}

/**
 * Record token usage and cost
 */
export async function recordTokenUsage(
  queueItemId: string,
  inputTokens: number,
  outputTokens: number
): Promise<void> {
  const cost = inputTokens * COST_PER_INPUT_TOKEN + outputTokens * COST_PER_OUTPUT_TOKEN
  const totalTokens = inputTokens + outputTokens

  // Update queue item
  await prisma.content_generation_queue.update({
    where: { id: queueItemId },
    data: {
      tokensUsed: totalTokens,
      costUsd: cost,
    },
  })

  // Update monthly limits
  const month = getCurrentMonth()
  const item = await prisma.content_generation_queue.findUnique({
    where: { id: queueItemId },
    select: { type: true },
  })

  if (!item) return

  // Get type-specific increment
  const typeIncrements: Record<string, object> = {
    BLOG_POST: { blogsGenerated: { increment: 1 } },
    NEWS_ARTICLE: { newsGenerated: { increment: 1 } },
    SEO_LANDING_PAGE: { landingPages: { increment: 1 } },
  }

  await prisma.content_generation_limits.upsert({
    where: { month },
    create: {
      month,
      tokensUsed: totalTokens,
      costUsd: cost,
      ...(item.type === 'BLOG_POST' && { blogsGenerated: 1 }),
      ...(item.type === 'NEWS_ARTICLE' && { newsGenerated: 1 }),
      ...(item.type === 'SEO_LANDING_PAGE' && { landingPages: 1 }),
    },
    update: {
      tokensUsed: { increment: totalTokens },
      costUsd: { increment: cost },
      ...(typeIncrements[item.type] || {}),
    },
  })

  logger.info('Recorded token usage', {
    service: 'seo-queue',
    queueItemId,
    inputTokens,
    outputTokens,
    cost: cost.toFixed(4),
  })
}

/**
 * Get queue item by ID
 */
export async function getQueueItem(id: string) {
  return prisma.content_generation_queue.findUnique({
    where: { id },
  })
}

/**
 * Get queue item by WhatsApp message ID
 */
export async function getQueueItemByWhatsAppId(whatsappMessageId: string) {
  return prisma.content_generation_queue.findFirst({
    where: { whatsappMessageId },
  })
}

/**
 * Find recent queue item awaiting approval for a phone number
 * Used when processing WhatsApp replies
 */
export async function findPendingApprovalForOwner() {
  return prisma.content_generation_queue.findFirst({
    where: {
      status: { in: ['REVIEW', 'ITERATING'] },
      approvalSentAt: { not: null },
    },
    orderBy: { approvalSentAt: 'desc' },
  })
}

/**
 * Get queue statistics
 */
export async function getQueueStats() {
  const [pending, generating, review, approved, published, failed, limits] = await Promise.all([
    prisma.content_generation_queue.count({ where: { status: 'PENDING' } }),
    prisma.content_generation_queue.count({ where: { status: 'GENERATING' } }),
    prisma.content_generation_queue.count({ where: { status: 'REVIEW' } }),
    prisma.content_generation_queue.count({ where: { status: 'APPROVED' } }),
    prisma.content_generation_queue.count({ where: { status: 'PUBLISHED' } }),
    prisma.content_generation_queue.count({ where: { status: 'FAILED' } }),
    getOrCreateMonthlyLimits(),
  ])

  return {
    queue: { pending, generating, review, approved, published, failed },
    limits,
  }
}

/**
 * Clean up old items (published/failed older than 30 days)
 */
export async function cleanupOldItems(daysOld: number = 30): Promise<number> {
  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - daysOld)

  const result = await prisma.content_generation_queue.deleteMany({
    where: {
      status: { in: ['PUBLISHED', 'FAILED', 'REJECTED'] },
      updatedAt: { lt: cutoffDate },
    },
  })

  logger.info('Cleaned up old queue items', {
    service: 'seo-queue',
    deleted: result.count,
    daysOld,
  })

  return result.count
}
