// Webhook Service
// Handles webhook delivery, retries, and event dispatching

import { prisma } from '@/lib/prisma'
import crypto from 'crypto'

export interface WebhookConfig {
  id: string
  name: string
  url: string
  secret: string | null
  headers: Record<string, string> | null
  retryPolicy: { maxRetries?: number; retryDelayMs?: number } | null
  isActive: boolean
  events: string[]
}

export interface WebhookPayload {
  event: string
  timestamp: string
  data: Record<string, unknown>
}

export interface WebhookDeliveryResult {
  success: boolean
  statusCode?: number
  responseTime?: number
  response?: string
  error?: string
}

export class WebhookService {
  // Send webhook to a specific endpoint
  static async sendWebhook(
    webhook: WebhookConfig,
    payload: WebhookPayload,
    isTest: boolean = false,
    attemptNumber: number = 1,
    deliveryId?: string,
    maxRetries?: number
  ): Promise<WebhookDeliveryResult & { deliveryId?: string }> {
    const startTime = Date.now()

    try {
      // Prepare headers
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'User-Agent': 'Cerebrum-Webhook/1.0',
        'X-Webhook-ID': webhook.id,
        'X-Webhook-Event': payload.event,
        'X-Webhook-Timestamp': payload.timestamp,
        'X-Webhook-Attempt': String(attemptNumber),
        ...(webhook.headers || {}),
      }

      // Add signature if secret is configured
      if (webhook.secret) {
        const signature = this.generateSignature(payload, webhook.secret)
        headers['X-Webhook-Signature'] = signature
        headers['X-Webhook-Signature-256'] = `sha256=${signature}`
      }

      // Send request
      const response = await fetch(webhook.url, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(30000), // 30 second timeout
      })

      const responseTime = Date.now() - startTime
      const responseBody = await response.text()

      // Create or update delivery record (unless it's a test)
      let recordId = deliveryId
      if (!isTest) {
        recordId = await this.upsertDeliveryRecord(webhook.id, payload, {
          success: response.ok,
          statusCode: response.status,
          responseBody: responseBody.substring(0, 5000), // Limit response size
          responseTime,
          attemptNumber,
          existingId: deliveryId,
          maxRetries: maxRetries || webhook.retryPolicy?.maxRetries || 3,
        })
      }

      return {
        success: response.ok,
        statusCode: response.status,
        responseTime,
        response: responseBody.substring(0, 1000),
        deliveryId: recordId,
      }
    } catch (error) {
      const responseTime = Date.now() - startTime
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'

      // Create or update failed delivery record
      let recordId = deliveryId
      if (!isTest) {
        recordId = await this.upsertDeliveryRecord(webhook.id, payload, {
          success: false,
          errorMessage,
          responseTime,
          attemptNumber,
          existingId: deliveryId,
          maxRetries: maxRetries || webhook.retryPolicy?.maxRetries || 3,
        })
      }

      return {
        success: false,
        responseTime,
        error: errorMessage,
        deliveryId: recordId,
      }
    }
  }

  // Generate HMAC signature for payload
  static generateSignature(payload: WebhookPayload, secret: string): string {
    const payloadString = JSON.stringify(payload)
    return crypto
      .createHmac('sha256', secret)
      .update(payloadString)
      .digest('hex')
  }

  // Create or update delivery record in database
  private static async upsertDeliveryRecord(
    webhookId: string,
    payload: WebhookPayload,
    result: {
      success: boolean
      statusCode?: number
      responseBody?: string
      errorMessage?: string
      responseTime?: number
      attemptNumber: number
      existingId?: string
      maxRetries?: number
    }
  ): Promise<string> {
    try {
      const maxRetries = result.maxRetries || 3
      const status = result.success
        ? 'SUCCESS'
        : result.attemptNumber < maxRetries
          ? 'RETRYING'
          : 'FAILED'

      if (result.existingId) {
        // Update existing record with new attempt
        await prisma.webhook_deliveries.update({
          where: { id: result.existingId },
          data: {
            status,
            statusCode: result.statusCode,
            responseBody: result.responseBody,
            errorMessage: result.errorMessage,
            attempts: result.attemptNumber,
            completedAt: result.success ? new Date() : null,
          },
        })
        return result.existingId
      } else {
        // Create new record for first attempt
        const id = `whd_${Date.now()}_${Math.random().toString(36).substring(7)}`
        await prisma.webhook_deliveries.create({
          data: {
            id,
            webhookId,
            event: payload.event,
            payload: payload as object,
            status,
            statusCode: result.statusCode,
            responseBody: result.responseBody,
            errorMessage: result.errorMessage,
            attempts: result.attemptNumber,
            completedAt: result.success ? new Date() : null,
          },
        })
        return id
      }
    } catch (error) {
      console.error('Failed to upsert webhook delivery record:', error)
      return ''
    }
  }

  // Dispatch event to all subscribed webhooks
  static async dispatchEvent(
    event: string,
    data: Record<string, unknown>
  ): Promise<void> {
    try {
      // Find all active webhooks subscribed to this event
      const webhooks = await prisma.webhooks.findMany({
        where: {
          isActive: true,
          events: {
            has: event,
          },
        },
      })

      if (webhooks.length === 0) {
        return
      }

      const payload: WebhookPayload = {
        event,
        timestamp: new Date().toISOString(),
        data,
      }

      // Send to all webhooks concurrently
      const deliveryPromises = webhooks.map(async (webhook) => {
        const config: WebhookConfig = {
          id: webhook.id,
          name: webhook.name,
          url: webhook.url,
          secret: webhook.secret,
          headers: webhook.headers as Record<string, string> | null,
          retryPolicy: webhook.retryPolicy as { maxRetries?: number; retryDelayMs?: number } | null,
          isActive: webhook.isActive,
          events: webhook.events,
        }

        const maxRetries = config.retryPolicy?.maxRetries || 3
        const result = await this.sendWebhook(config, payload, false, 1, undefined, maxRetries)

        // If failed and retry policy allows, schedule retry
        if (!result.success && maxRetries > 1 && result.deliveryId) {
          await this.scheduleRetry(config, payload, 2, result.deliveryId)
        }

        return { webhookId: webhook.id, result }
      })

      await Promise.allSettled(deliveryPromises)
    } catch (error) {
      console.error('Error dispatching webhook event:', error)
    }
  }

  // Schedule a retry for failed delivery
  private static async scheduleRetry(
    webhook: WebhookConfig,
    payload: WebhookPayload,
    attemptNumber: number,
    deliveryId: string
  ): Promise<void> {
    const maxRetries = webhook.retryPolicy?.maxRetries || 3
    const retryDelayMs = webhook.retryPolicy?.retryDelayMs || 5000

    if (attemptNumber > maxRetries) {
      console.warn(`Max retries (${maxRetries}) reached for webhook ${webhook.id}`)
      // Mark delivery as failed
      try {
        await prisma.webhook_deliveries.update({
          where: { id: deliveryId },
          data: { status: 'FAILED', completedAt: new Date() },
        })
      } catch (e) {
        console.error('Failed to update webhook delivery status:', e)
      }
      return
    }

    // Calculate exponential backoff
    const delay = retryDelayMs * Math.pow(2, attemptNumber - 1)

    // Log retry scheduling (debug info)
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Scheduling retry ${attemptNumber} for webhook ${webhook.id} in ${delay}ms`)
    }

    // In production, this should use a proper job queue (e.g., BullMQ, Vercel Cron)
    // For now, use setTimeout as a simple implementation
    setTimeout(async () => {
      const result = await this.sendWebhook(webhook, payload, false, attemptNumber, deliveryId, maxRetries)

      if (!result.success && attemptNumber < maxRetries) {
        await this.scheduleRetry(webhook, payload, attemptNumber + 1, deliveryId)
      }
    }, delay)
  }

  // Convenience methods for common events
  static async onLeadCreated(lead: Record<string, unknown>): Promise<void> {
    await this.dispatchEvent('lead.created', { lead })
  }

  static async onLeadUpdated(lead: Record<string, unknown>, changes: string[]): Promise<void> {
    await this.dispatchEvent('lead.updated', { lead, changes })
  }

  static async onLeadStageChanged(
    lead: Record<string, unknown>,
    previousStage: string,
    newStage: string
  ): Promise<void> {
    await this.dispatchEvent('lead.stage_changed', {
      lead,
      previousStage,
      newStage,
    })
  }

  static async onLeadAssigned(
    lead: Record<string, unknown>,
    counselor: Record<string, unknown>
  ): Promise<void> {
    await this.dispatchEvent('lead.assigned', { lead, counselor })
  }

  static async onLeadConverted(lead: Record<string, unknown>): Promise<void> {
    await this.dispatchEvent('lead.converted', { lead })
  }

  static async onLeadLost(lead: Record<string, unknown>, reason?: string): Promise<void> {
    await this.dispatchEvent('lead.lost', { lead, reason })
  }

  static async onDemoBooked(
    lead: Record<string, unknown>,
    demo: Record<string, unknown>
  ): Promise<void> {
    await this.dispatchEvent('demo.booked', { lead, demo })
  }

  static async onDemoCompleted(
    lead: Record<string, unknown>,
    demo: Record<string, unknown>
  ): Promise<void> {
    await this.dispatchEvent('demo.completed', { lead, demo })
  }

  static async onPaymentReceived(
    lead: Record<string, unknown>,
    payment: Record<string, unknown>
  ): Promise<void> {
    await this.dispatchEvent('payment.received', { lead, payment })
  }

  static async onCommunicationSent(
    lead: Record<string, unknown>,
    communication: Record<string, unknown>
  ): Promise<void> {
    await this.dispatchEvent('communication.sent', { lead, communication })
  }
}
