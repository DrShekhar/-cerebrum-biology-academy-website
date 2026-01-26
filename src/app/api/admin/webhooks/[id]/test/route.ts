// Webhook Test API
// Send a test payload to verify webhook configuration

import { NextRequest, NextResponse } from 'next/server'
import { withAdmin, ValidatedSession } from '@/lib/auth/middleware'
import { prisma } from '@/lib/prisma'
import { WebhookService } from '@/lib/webhooks/webhookService'

// POST: Send test webhook
async function handlePOST(request: NextRequest, session: ValidatedSession): Promise<NextResponse> {
  try {
    const url = new URL(request.url)
    const pathParts = url.pathname.split('/')
    const id = pathParts[pathParts.length - 2] // Get ID before /test

    if (!id) {
      return NextResponse.json({ success: false, error: 'Webhook ID required' }, { status: 400 })
    }

    const webhook = await prisma.webhooks.findUnique({
      where: { id },
    })

    if (!webhook) {
      return NextResponse.json({ success: false, error: 'Webhook not found' }, { status: 404 })
    }

    // Send test payload
    const testPayload = {
      event: 'test.webhook',
      timestamp: new Date().toISOString(),
      data: {
        message: 'This is a test webhook from Cerebrum CRM',
        webhookId: webhook.id,
        webhookName: webhook.name,
        testTriggeredBy: session.userId,
      },
    }

    const result = await WebhookService.sendWebhook(webhook, testPayload, true)

    // Log activity
    await prisma.activities.create({
      data: {
        id: `act_${Date.now()}_${Math.random().toString(36).substring(7)}`,
        userId: session.userId,
        action: 'WEBHOOK_TESTED',
        description: `Tested webhook: ${webhook.name}`,
        metadata: {
          webhookId: webhook.id,
          success: result.success,
          statusCode: result.statusCode,
        },
      },
    })

    return NextResponse.json({
      success: result.success,
      data: {
        statusCode: result.statusCode,
        responseTime: result.responseTime,
        response: result.response,
        error: result.error,
      },
      message: result.success ? 'Test webhook sent successfully' : 'Test webhook failed',
    })
  } catch (error) {
    console.error('Error testing webhook:', error)
    return NextResponse.json({ success: false, error: 'Failed to test webhook' }, { status: 500 })
  }
}

export const POST = withAdmin(handlePOST)
