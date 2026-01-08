/**
 * SEO Content Machine - Approval Service
 *
 * Handles WhatsApp-based approval workflow for generated content.
 * Sends previews to owner, processes approval/rejection/feedback.
 */

import {
  sendWhatsAppMessage,
  sendSEOContentApproval,
  sendSEOPublishedNotification,
  sendSEODailySummary,
} from '@/lib/interakt'
import { logger } from '@/lib/utils/logger'
import {
  updateQueueStatus,
  getQueueItem,
  findPendingApprovalForOwner,
  getQueueStats,
} from './queueService'
import { regenerateWithFeedback } from './contentGenerator'
import type { ContentGenerationStatus } from '@/generated/prisma'

// Owner's WhatsApp number for approval messages
const OWNER_PHONE = process.env.OWNER_WHATSAPP_NUMBER || '919999744334'

// Maximum preview length for WhatsApp message
const MAX_PREVIEW_LENGTH = 500

// ============================================
// TYPES
// ============================================

export interface ApprovalMessage {
  queueItemId: string
  title: string
  type: string
  preview: string
  wordCount?: number
  estimatedReadTime?: number
}

export interface ApprovalResponse {
  action: 'approve' | 'reject' | 'iterate' | 'unknown'
  feedback?: string
  queueItemId?: string
}

// ============================================
// APPROVAL MESSAGE SENDING
// ============================================

/**
 * Send content preview to owner for approval
 */
export async function sendForApproval(queueItemId: string): Promise<boolean> {
  const item = await getQueueItem(queueItemId)
  if (!item) {
    logger.error('Queue item not found for approval', {
      service: 'seo-approval',
      queueItemId,
    })
    return false
  }

  try {
    // Parse generated content to extract preview
    let preview = ''
    let wordCount = 0
    let title = item.generatedTitle || item.topic

    if (item.generatedContent) {
      try {
        const content = JSON.parse(item.generatedContent)
        if (content.frontmatter) {
          title = content.frontmatter.title || title
          preview = content.frontmatter.excerpt || content.frontmatter.summary || ''
        }
        if (content.content) {
          wordCount = content.content.split(/\s+/).length
          if (!preview) {
            // Get first paragraph as preview
            const firstPara = content.content.split('\n\n')[0]?.replace(/[#*]/g, '')
            preview = firstPara?.substring(0, MAX_PREVIEW_LENGTH) || ''
          }
        }
        if (content.pageData) {
          title = content.pageData.title || title
          preview = content.pageData.metaDescription || ''
        }
      } catch {
        preview = item.generatedExcerpt || item.topic
      }
    }

    // Format content type for display
    const typeDisplay = formatContentType(item.type)
    const readTime = Math.ceil(wordCount / 200)

    // Use template message to bypass 24-hour rule
    const result = await sendSEOContentApproval({
      phone: OWNER_PHONE,
      contentType: typeDisplay,
      title,
      preview: preview.substring(0, 300),
      wordCount,
      readTime,
      iterationCount: item.iterationCount,
      referenceId: queueItemId,
    })

    if (result.success) {
      // Update queue item with approval tracking
      await updateQueueStatus(queueItemId, 'REVIEW', {
        whatsappMessageId: result.messageId,
        approvalSentAt: new Date(),
      })

      logger.info('Sent content for approval', {
        service: 'seo-approval',
        queueItemId,
        title,
        messageId: result.messageId,
      })

      return true
    } else {
      logger.error('Failed to send approval message', {
        service: 'seo-approval',
        queueItemId,
        error: result.error,
      })
      return false
    }
  } catch (error) {
    logger.error('Error sending for approval', {
      service: 'seo-approval',
      queueItemId,
      error,
    })
    return false
  }
}

/**
 * Send daily summary to owner
 */
export async function sendDailySummary(): Promise<boolean> {
  try {
    const stats = await getQueueStats()

    // Use template message to bypass 24-hour rule
    const result = await sendSEODailySummary({
      phone: OWNER_PHONE,
      pendingCount: stats.queue.pending,
      reviewCount: stats.queue.review,
      publishedCount: stats.queue.published,
      budgetUsed: `$${stats.limits.costUsd.toFixed(2)}`,
      budgetRemaining: `$${stats.limits.remainingBudget.toFixed(2)}`,
    })

    return result.success
  } catch (error) {
    logger.error('Failed to send daily summary', {
      service: 'seo-approval',
      error,
    })
    return false
  }
}

/**
 * Send notification when content is published
 */
export async function sendPublishedNotification(
  queueItemId: string,
  publishedUrl: string
): Promise<boolean> {
  const item = await getQueueItem(queueItemId)
  if (!item) return false

  try {
    const typeDisplay = formatContentType(item.type)

    // Use template message to bypass 24-hour rule
    const result = await sendSEOPublishedNotification({
      phone: OWNER_PHONE,
      contentType: typeDisplay,
      title: item.generatedTitle || item.topic,
      publishedUrl,
    })

    return result.success
  } catch (error) {
    logger.error('Failed to send published notification', {
      service: 'seo-approval',
      queueItemId,
      error,
    })
    return false
  }
}

// ============================================
// APPROVAL RESPONSE PROCESSING
// ============================================

/**
 * Parse owner's WhatsApp response
 */
export function parseApprovalResponse(text: string): ApprovalResponse {
  const lowerText = text.toLowerCase().trim()

  // Check for approval keywords
  if (
    lowerText === 'yes' ||
    lowerText === 'y' ||
    lowerText === 'publish' ||
    lowerText === 'approve' ||
    lowerText === 'ok' ||
    lowerText === 'go' ||
    lowerText === 'lgtm' ||
    lowerText === '👍' ||
    lowerText === '✅'
  ) {
    return { action: 'approve' }
  }

  // Check for rejection keywords
  if (
    lowerText === 'no' ||
    lowerText === 'n' ||
    lowerText === 'reject' ||
    lowerText === 'delete' ||
    lowerText === 'skip' ||
    lowerText === 'cancel' ||
    lowerText === '👎' ||
    lowerText === '❌'
  ) {
    return { action: 'reject' }
  }

  // Check for status request
  if (lowerText === 'status' || lowerText === 'stats' || lowerText === 'summary') {
    return { action: 'unknown', feedback: 'status_request' }
  }

  // Everything else is feedback for iteration
  if (text.length > 2) {
    return { action: 'iterate', feedback: text }
  }

  return { action: 'unknown' }
}

/**
 * Process owner's approval response
 */
export async function processApprovalResponse(
  phone: string,
  text: string
): Promise<{ processed: boolean; message?: string }> {
  // Only process messages from owner
  const normalizedPhone = normalizePhone(phone)
  const normalizedOwner = normalizePhone(OWNER_PHONE)

  if (normalizedPhone !== normalizedOwner) {
    return { processed: false }
  }

  const response = parseApprovalResponse(text)

  // Handle status request
  if (response.feedback === 'status_request') {
    await sendDailySummary()
    return { processed: true, message: 'Sent status summary' }
  }

  // Find pending approval for this owner
  const pendingItem = await findPendingApprovalForOwner()

  if (!pendingItem) {
    // No pending items - send helpful message
    if (response.action !== 'unknown') {
      await sendWhatsAppMessage({
        phone: OWNER_PHONE,
        message: `No content currently awaiting approval.

Reply "status" to see queue summary.`,
      })
    }
    return { processed: true, message: 'No pending approval' }
  }

  switch (response.action) {
    case 'approve':
      await updateQueueStatus(pendingItem.id, 'APPROVED', {
        approvalResponse: text,
      })

      await sendWhatsAppMessage({
        phone: OWNER_PHONE,
        message: `✅ *Approved!*

"${pendingItem.generatedTitle || pendingItem.topic}" will be published shortly.`,
      })

      logger.info('Content approved via WhatsApp', {
        service: 'seo-approval',
        queueItemId: pendingItem.id,
        title: pendingItem.generatedTitle,
      })

      return { processed: true, message: 'Approved' }

    case 'reject':
      await updateQueueStatus(pendingItem.id, 'REJECTED', {
        approvalResponse: text,
      })

      await sendWhatsAppMessage({
        phone: OWNER_PHONE,
        message: `❌ *Rejected*

"${pendingItem.generatedTitle || pendingItem.topic}" has been rejected and will not be published.`,
      })

      logger.info('Content rejected via WhatsApp', {
        service: 'seo-approval',
        queueItemId: pendingItem.id,
        title: pendingItem.generatedTitle,
      })

      return { processed: true, message: 'Rejected' }

    case 'iterate':
      // Check iteration limit
      if (pendingItem.iterationCount >= 3) {
        await sendWhatsAppMessage({
          phone: OWNER_PHONE,
          message: `⚠️ *Maximum iterations reached (3)*

Please reply "yes" to publish as-is, or "no" to reject.`,
        })
        return { processed: true, message: 'Max iterations reached' }
      }

      // Update status to ITERATING
      await updateQueueStatus(pendingItem.id, 'ITERATING', {
        iterationFeedback: response.feedback,
      })

      await sendWhatsAppMessage({
        phone: OWNER_PHONE,
        message: `🔄 *Regenerating...*

Your feedback: "${response.feedback?.substring(0, 100)}..."

Will send updated version shortly.`,
      })

      // Trigger regeneration (async - will send new preview when done)
      regenerateWithFeedback(pendingItem.id, response.feedback || '')
        .then(async (result) => {
          if (result.success) {
            // Send new preview
            await sendForApproval(pendingItem.id)
          } else {
            await sendWhatsAppMessage({
              phone: OWNER_PHONE,
              message: `❌ *Regeneration failed*

${result.error || 'Unknown error'}

Reply "yes" to publish original, or "no" to reject.`,
            })
          }
        })
        .catch((error) => {
          logger.error('Regeneration failed', {
            service: 'seo-approval',
            queueItemId: pendingItem.id,
            error,
          })
        })

      logger.info('Content iteration requested via WhatsApp', {
        service: 'seo-approval',
        queueItemId: pendingItem.id,
        feedback: response.feedback?.substring(0, 100),
        iteration: pendingItem.iterationCount + 1,
      })

      return { processed: true, message: 'Iterating' }

    default:
      return { processed: false }
  }
}

/**
 * Check if a message is from the owner
 */
export function isFromOwner(phone: string): boolean {
  return normalizePhone(phone) === normalizePhone(OWNER_PHONE)
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Format content type for display
 */
function formatContentType(type: string): string {
  const typeMap: Record<string, string> = {
    BLOG_POST: 'Blog Post',
    NEWS_ARTICLE: 'News Article',
    SEO_LANDING_PAGE: 'Landing Page',
  }
  return typeMap[type] || type
}

/**
 * Normalize phone number for comparison
 */
function normalizePhone(phone: string): string {
  return phone.replace(/[^\d]/g, '').slice(-10)
}

/**
 * Get owner phone number
 */
export function getOwnerPhone(): string {
  return OWNER_PHONE
}
