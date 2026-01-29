/**
 * Notification Queue with Retry Mechanism
 * Handles failed notifications with exponential backoff
 */

import { Redis } from '@upstash/redis'

export type NotificationType = 'whatsapp' | 'email' | 'sms' | 'push'

export interface NotificationPayload {
  id: string
  type: NotificationType
  recipient: string // Phone/email/token
  content: {
    template?: string
    message?: string
    subject?: string
    data?: Record<string, any>
  }
  metadata?: {
    userId?: string
    bookingId?: string
    orderId?: string
    context?: string
  }
  createdAt: string
  attempts: number
  lastAttemptAt?: string
  lastError?: string
  nextRetryAt?: string
}

export interface RetryConfig {
  maxRetries: number
  baseDelayMs: number
  maxDelayMs: number
}

const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxRetries: 5,
  baseDelayMs: 1000, // 1 second
  maxDelayMs: 3600000, // 1 hour max
}

// Create Redis client if configured
const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null

// In-memory fallback for development
const inMemoryQueue: NotificationPayload[] = []
const failedQueue: NotificationPayload[] = []

/**
 * Calculate exponential backoff delay
 */
function calculateBackoff(attempt: number, config: RetryConfig): number {
  // Exponential backoff with jitter
  const exponentialDelay = config.baseDelayMs * Math.pow(2, attempt)
  const jitter = Math.random() * 1000 // Add up to 1 second jitter
  return Math.min(exponentialDelay + jitter, config.maxDelayMs)
}

/**
 * Queue a notification for sending
 */
export async function queueNotification(
  type: NotificationType,
  recipient: string,
  content: NotificationPayload['content'],
  metadata?: NotificationPayload['metadata']
): Promise<string> {
  const id = `notif_${Date.now()}_${Math.random().toString(36).substring(7)}`

  const notification: NotificationPayload = {
    id,
    type,
    recipient,
    content,
    metadata,
    createdAt: new Date().toISOString(),
    attempts: 0,
  }

  if (redis) {
    await redis.lpush('notification:queue', JSON.stringify(notification))
    console.log(`[NotificationQueue] Queued ${type} notification: ${id}`)
  } else {
    inMemoryQueue.push(notification)
    console.log(`[NotificationQueue] Queued ${type} notification (in-memory): ${id}`)
  }

  return id
}

/**
 * Get next notification to process
 */
export async function getNextNotification(): Promise<NotificationPayload | null> {
  if (redis) {
    const data = await redis.rpop('notification:queue')
    if (data) {
      return typeof data === 'string' ? JSON.parse(data) : data
    }
    return null
  } else {
    return inMemoryQueue.shift() || null
  }
}

/**
 * Mark notification as failed and schedule retry
 */
export async function scheduleRetry(
  notification: NotificationPayload,
  error: string,
  config: RetryConfig = DEFAULT_RETRY_CONFIG
): Promise<boolean> {
  notification.attempts++
  notification.lastAttemptAt = new Date().toISOString()
  notification.lastError = error

  if (notification.attempts >= config.maxRetries) {
    // Max retries reached, move to dead letter queue
    console.error(`[NotificationQueue] Max retries reached for ${notification.id}, moving to DLQ`)
    await moveToDeadLetterQueue(notification)
    return false
  }

  // Calculate next retry time
  const delay = calculateBackoff(notification.attempts, config)
  const nextRetryAt = new Date(Date.now() + delay)
  notification.nextRetryAt = nextRetryAt.toISOString()

  console.log(`[NotificationQueue] Scheduling retry ${notification.attempts}/${config.maxRetries} for ${notification.id} at ${nextRetryAt.toISOString()}`)

  if (redis) {
    // Store in retry queue with score = retry timestamp
    await redis.zadd('notification:retry', {
      score: nextRetryAt.getTime(),
      member: JSON.stringify(notification),
    })
  } else {
    // In-memory: re-add to queue (simplified, no delay)
    inMemoryQueue.push(notification)
  }

  return true
}

/**
 * Get notifications due for retry
 */
export async function getRetryDueNotifications(): Promise<NotificationPayload[]> {
  const now = Date.now()

  if (redis) {
    // Get all notifications with score <= now
    // Using zrange with BYSCORE for Upstash Redis compatibility
    const data = await redis.zrange('notification:retry', 0, now, { byScore: true })

    if (data.length > 0) {
      // Remove them from retry queue
      await redis.zremrangebyscore('notification:retry', 0, now)

      return data.map((item) =>
        typeof item === 'string' ? JSON.parse(item) : item
      )
    }
    return []
  } else {
    // In-memory doesn't track retry times, return all failed
    const due = failedQueue.splice(0, 10)
    return due
  }
}

/**
 * Move notification to dead letter queue (after max retries)
 */
export async function moveToDeadLetterQueue(notification: NotificationPayload): Promise<void> {
  if (redis) {
    await redis.lpush('notification:dlq', JSON.stringify(notification))
  } else {
    failedQueue.push(notification)
  }

  console.error(`[NotificationQueue] Notification ${notification.id} moved to DLQ after ${notification.attempts} attempts. Last error: ${notification.lastError}`)
}

/**
 * Get dead letter queue items (for admin review)
 */
export async function getDeadLetterQueue(limit: number = 50): Promise<NotificationPayload[]> {
  if (redis) {
    const data = await redis.lrange('notification:dlq', 0, limit - 1)
    return data.map((item) => typeof item === 'string' ? JSON.parse(item) : item)
  } else {
    return failedQueue.slice(0, limit)
  }
}

/**
 * Remove item from dead letter queue
 */
export async function removeFromDLQ(notificationId: string): Promise<boolean> {
  if (redis) {
    const dlq = await getDeadLetterQueue(1000)
    const item = dlq.find((n) => n.id === notificationId)
    if (item) {
      await redis.lrem('notification:dlq', 1, JSON.stringify(item))
      return true
    }
    return false
  } else {
    const index = failedQueue.findIndex((n) => n.id === notificationId)
    if (index !== -1) {
      failedQueue.splice(index, 1)
      return true
    }
    return false
  }
}

/**
 * Retry a specific notification from DLQ
 */
export async function retryFromDLQ(notificationId: string): Promise<boolean> {
  if (redis) {
    const dlq = await getDeadLetterQueue(1000)
    const notification = dlq.find((n) => n.id === notificationId)

    if (notification) {
      // Reset attempts and re-queue
      notification.attempts = 0
      notification.lastError = undefined
      notification.nextRetryAt = undefined

      await redis.lrem('notification:dlq', 1, JSON.stringify(notification))
      await redis.lpush('notification:queue', JSON.stringify(notification))

      console.log(`[NotificationQueue] Retrying notification ${notificationId} from DLQ`)
      return true
    }
    return false
  } else {
    const index = failedQueue.findIndex((n) => n.id === notificationId)
    if (index !== -1) {
      const [notification] = failedQueue.splice(index, 1)
      notification.attempts = 0
      inMemoryQueue.push(notification)
      return true
    }
    return false
  }
}

/**
 * Get queue statistics
 */
export async function getQueueStats(): Promise<{
  pending: number
  retrying: number
  deadLetter: number
}> {
  if (redis) {
    const [pending, retrying, deadLetter] = await Promise.all([
      redis.llen('notification:queue'),
      redis.zcard('notification:retry'),
      redis.llen('notification:dlq'),
    ])

    return { pending, retrying, deadLetter }
  } else {
    return {
      pending: inMemoryQueue.length,
      retrying: 0,
      deadLetter: failedQueue.length,
    }
  }
}

export default {
  queueNotification,
  getNextNotification,
  scheduleRetry,
  getRetryDueNotifications,
  moveToDeadLetterQueue,
  getDeadLetterQueue,
  removeFromDLQ,
  retryFromDLQ,
  getQueueStats,
}
