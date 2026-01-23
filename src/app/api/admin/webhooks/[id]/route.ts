// Individual Webhook Management API
// GET, PATCH, DELETE operations for specific webhooks

import { NextRequest, NextResponse } from 'next/server'
import { withAdmin } from '@/lib/auth/middleware'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const updateWebhookSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  url: z.string().url().optional(),
  events: z.array(z.enum([
    'lead.created',
    'lead.updated',
    'lead.stage_changed',
    'lead.assigned',
    'lead.converted',
    'lead.lost',
    'demo.booked',
    'demo.completed',
    'payment.received',
    'communication.sent',
  ])).optional(),
  isActive: z.boolean().optional(),
  headers: z.record(z.string()).optional(),
  retryPolicy: z.object({
    maxRetries: z.number().min(0).max(10).optional(),
    retryDelayMs: z.number().min(1000).max(60000).optional(),
  }).optional(),
  metadata: z.record(z.unknown()).optional(),
})

// GET: Get webhook details with delivery history
async function handleGET(
  request: NextRequest,
  _session: { userId: string; role: string }
): Promise<NextResponse> {
  try {
    const url = new URL(request.url)
    const id = url.pathname.split('/').pop()

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Webhook ID required' },
        { status: 400 }
      )
    }

    const webhook = await prisma.webhooks.findUnique({
      where: { id },
      include: {
        users: {
          select: { id: true, name: true, email: true },
        },
        webhook_deliveries: {
          orderBy: { createdAt: 'desc' },
          take: 50,
          select: {
            id: true,
            event: true,
            status: true,
            statusCode: true,
            responseBody: true,
            errorMessage: true,
            attempts: true,
            createdAt: true,
            completedAt: true,
          },
        },
      },
    })

    if (!webhook) {
      return NextResponse.json(
        { success: false, error: 'Webhook not found' },
        { status: 404 }
      )
    }

    // Get stats
    const [successCount, failureCount, pendingCount] = await Promise.all([
      prisma.webhook_deliveries.count({
        where: { webhookId: id, status: 'SUCCESS' },
      }),
      prisma.webhook_deliveries.count({
        where: { webhookId: id, status: 'FAILED' },
      }),
      prisma.webhook_deliveries.count({
        where: { webhookId: id, status: 'PENDING' },
      }),
    ])

    return NextResponse.json({
      success: true,
      data: {
        ...webhook,
        // Don't expose secret in GET responses
        secret: webhook.secret ? '••••••••' : null,
        stats: {
          successCount,
          failureCount,
          pendingCount,
          totalDeliveries: successCount + failureCount + pendingCount,
          successRate: (successCount + failureCount) > 0
            ? Math.round((successCount / (successCount + failureCount)) * 100)
            : 0,
        },
      },
    })
  } catch (error) {
    console.error('Error fetching webhook:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch webhook' },
      { status: 500 }
    )
  }
}

// PATCH: Update webhook
async function handlePATCH(
  request: NextRequest,
  session: { userId: string; role: string }
): Promise<NextResponse> {
  try {
    const url = new URL(request.url)
    const id = url.pathname.split('/').pop()

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Webhook ID required' },
        { status: 400 }
      )
    }

    const body = await request.json()
    const validatedData = updateWebhookSchema.parse(body)

    const existingWebhook = await prisma.webhooks.findUnique({
      where: { id },
    })

    if (!existingWebhook) {
      return NextResponse.json(
        { success: false, error: 'Webhook not found' },
        { status: 404 }
      )
    }

    const webhook = await prisma.webhooks.update({
      where: { id },
      data: {
        ...validatedData,
        updatedAt: new Date(),
      },
    })

    // Log activity
    await prisma.activities.create({
      data: {
        id: `act_${Date.now()}_${Math.random().toString(36).substring(7)}`,
        userId: session.userId,
        action: 'WEBHOOK_UPDATED',
        description: `Updated webhook: ${webhook.name}`,
        metadata: { webhookId: webhook.id, changes: Object.keys(validatedData) },
      },
    })

    return NextResponse.json({
      success: true,
      data: {
        ...webhook,
        secret: webhook.secret ? '••••••••' : null,
      },
      message: 'Webhook updated successfully',
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: error.issues },
        { status: 400 }
      )
    }

    console.error('Error updating webhook:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update webhook' },
      { status: 500 }
    )
  }
}

// DELETE: Delete webhook
async function handleDELETE(
  request: NextRequest,
  session: { userId: string; role: string }
): Promise<NextResponse> {
  try {
    const url = new URL(request.url)
    const id = url.pathname.split('/').pop()

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Webhook ID required' },
        { status: 400 }
      )
    }

    const existingWebhook = await prisma.webhooks.findUnique({
      where: { id },
    })

    if (!existingWebhook) {
      return NextResponse.json(
        { success: false, error: 'Webhook not found' },
        { status: 404 }
      )
    }

    // Delete deliveries first (cascade)
    await prisma.webhook_deliveries.deleteMany({
      where: { webhookId: id },
    })

    // Delete webhook
    await prisma.webhooks.delete({
      where: { id },
    })

    // Log activity
    await prisma.activities.create({
      data: {
        id: `act_${Date.now()}_${Math.random().toString(36).substring(7)}`,
        userId: session.userId,
        action: 'WEBHOOK_DELETED',
        description: `Deleted webhook: ${existingWebhook.name}`,
        metadata: { webhookId: id, url: existingWebhook.url },
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Webhook deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting webhook:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete webhook' },
      { status: 500 }
    )
  }
}

export const GET = withAdmin(handleGET)
export const PATCH = withAdmin(handlePATCH)
export const DELETE = withAdmin(handleDELETE)
