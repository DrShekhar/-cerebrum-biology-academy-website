// Webhook Management API
// CRUD operations for webhook configurations

import { NextRequest, NextResponse } from 'next/server'
import { withAdmin, ValidatedSession } from '@/lib/auth/middleware'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// Blocked hosts to prevent SSRF attacks
const BLOCKED_HOSTS = [
  'localhost',
  '127.0.0.1',
  '0.0.0.0',
  '::1',
  '10.',
  '172.16.',
  '172.17.',
  '172.18.',
  '172.19.',
  '172.20.',
  '172.21.',
  '172.22.',
  '172.23.',
  '172.24.',
  '172.25.',
  '172.26.',
  '172.27.',
  '172.28.',
  '172.29.',
  '172.30.',
  '172.31.',
  '192.168.',
  '169.254.',
  'metadata.google',
  'metadata.aws',
  '100.100.100.200', // AWS metadata
]

// Validate webhook URL to prevent SSRF
function validateWebhookUrl(url: string): { valid: boolean; error?: string } {
  try {
    const parsedUrl = new URL(url)

    // Must be HTTPS in production
    if (process.env.NODE_ENV === 'production' && parsedUrl.protocol !== 'https:') {
      return { valid: false, error: 'Webhook URL must use HTTPS in production' }
    }

    // Check for blocked hosts
    const hostname = parsedUrl.hostname.toLowerCase()
    for (const blocked of BLOCKED_HOSTS) {
      if (hostname === blocked || hostname.startsWith(blocked) || hostname.endsWith('.' + blocked)) {
        return { valid: false, error: 'Webhook URL cannot point to internal/private networks' }
      }
    }

    // Block IPs that look like internal addresses
    const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/
    if (ipv4Regex.test(hostname)) {
      const octets = hostname.split('.').map(Number)
      // Block private ranges
      if (octets[0] === 10 ||
          (octets[0] === 172 && octets[1] >= 16 && octets[1] <= 31) ||
          (octets[0] === 192 && octets[1] === 168) ||
          (octets[0] === 127) ||
          (octets[0] === 169 && octets[1] === 254)) {
        return { valid: false, error: 'Webhook URL cannot point to private IP addresses' }
      }
    }

    // Must have a valid port (default 443 for https, 80 for http)
    const port = parsedUrl.port ? parseInt(parsedUrl.port) : (parsedUrl.protocol === 'https:' ? 443 : 80)
    if (port < 1 || port > 65535) {
      return { valid: false, error: 'Invalid port number' }
    }

    return { valid: true }
  } catch {
    return { valid: false, error: 'Invalid URL format' }
  }
}

const webhookSchema = z.object({
  name: z.string().min(1).max(100),
  url: z.string().url().refine(
    (url) => validateWebhookUrl(url).valid,
    { message: 'Invalid webhook URL - blocked host or invalid format' }
  ),
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
  ])),
  isActive: z.boolean().optional().default(true),
  secret: z.string().optional(), // For HMAC signature verification
  headers: z.record(z.string(), z.string()).optional(), // Custom headers
  retryPolicy: z.object({
    maxRetries: z.number().min(0).max(10).optional().default(3),
    retryDelayMs: z.number().min(1000).max(60000).optional().default(5000),
  }).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
})

// GET: List all webhooks
async function handleGET(
  request: NextRequest,
  _session: ValidatedSession
): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url)
    const includeInactive = searchParams.get('includeInactive') === 'true'

    const webhooks = await prisma.webhooks.findMany({
      where: includeInactive ? undefined : { isActive: true },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        url: true,
        events: true,
        isActive: true,
        headers: true,
        retryPolicy: true,
        metadata: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: { webhook_deliveries: true },
        },
      },
    })

    // Get delivery stats for each webhook
    const webhooksWithStats = await Promise.all(
      webhooks.map(async (webhook) => {
        const [successCount, failureCount, lastDelivery] = await Promise.all([
          prisma.webhook_deliveries.count({
            where: { webhookId: webhook.id, status: 'SUCCESS' },
          }),
          prisma.webhook_deliveries.count({
            where: { webhookId: webhook.id, status: 'FAILED' },
          }),
          prisma.webhook_deliveries.findFirst({
            where: { webhookId: webhook.id },
            orderBy: { createdAt: 'desc' },
            select: { createdAt: true, status: true },
          }),
        ])

        return {
          ...webhook,
          stats: {
            totalDeliveries: webhook._count.webhook_deliveries,
            successCount,
            failureCount,
            successRate: webhook._count.webhook_deliveries > 0
              ? Math.round((successCount / webhook._count.webhook_deliveries) * 100)
              : 0,
            lastDelivery: lastDelivery?.createdAt || null,
            lastStatus: lastDelivery?.status || null,
          },
        }
      })
    )

    return NextResponse.json({
      success: true,
      data: webhooksWithStats,
    })
  } catch (error) {
    console.error('Error fetching webhooks:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch webhooks' },
      { status: 500 }
    )
  }
}

// POST: Create new webhook
async function handlePOST(
  request: NextRequest,
  session: ValidatedSession
): Promise<NextResponse> {
  try {
    const body = await request.json()
    const validatedData = webhookSchema.parse(body)

    // Generate secret if not provided
    const secret = validatedData.secret || generateWebhookSecret()

    const webhook = await prisma.webhooks.create({
      data: {
        id: `wh_${Date.now()}_${Math.random().toString(36).substring(7)}`,
        name: validatedData.name,
        url: validatedData.url,
        events: validatedData.events,
        isActive: validatedData.isActive,
        secret,
        headers: validatedData.headers || {},
        retryPolicy: validatedData.retryPolicy || { maxRetries: 3, retryDelayMs: 5000 },
        metadata: validatedData.metadata || {},
        createdById: session.userId,
        updatedAt: new Date(),
      },
    })

    // Log activity
    await prisma.activities.create({
      data: {
        id: `act_${Date.now()}_${Math.random().toString(36).substring(7)}`,
        userId: session.userId,
        action: 'WEBHOOK_CREATED',
        description: `Created webhook: ${webhook.name}`,
        metadata: { webhookId: webhook.id, events: webhook.events },
      },
    })

    return NextResponse.json({
      success: true,
      data: {
        ...webhook,
        secret, // Return secret only on creation
      },
      message: 'Webhook created successfully',
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: error.issues },
        { status: 400 }
      )
    }

    console.error('Error creating webhook:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create webhook' },
      { status: 500 }
    )
  }
}

// Helper to generate webhook secret
function generateWebhookSecret(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let secret = 'whsec_'
  for (let i = 0; i < 32; i++) {
    secret += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return secret
}

export const GET = withAdmin(handleGET)
export const POST = withAdmin(handlePOST)
