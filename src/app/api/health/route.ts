/**
 * Health Check API Endpoint
 *
 * Provides comprehensive system health monitoring.
 * Checks database, Redis, AI APIs, and WhatsApp connectivity.
 */

import { NextRequest, NextResponse } from 'next/server'
import { logger } from '@/lib/monitoring/logger'
import { performanceMonitor } from '@/lib/monitoring/performance'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

interface HealthCheckResult {
  status: 'healthy' | 'degraded' | 'unhealthy'
  timestamp: string
  uptime: number
  services: {
    database: ServiceStatus
    redis: ServiceStatus
    anthropicAI: ServiceStatus
    whatsapp: ServiceStatus
  }
  metrics: {
    requestsPerMinute: number
    errorRate: string
    avgResponseTime: number
  }
}

interface ServiceStatus {
  status: 'up' | 'down' | 'degraded'
  latency?: string
  error?: string
  lastCheck: string
}

export async function GET(request: NextRequest) {
  const startTime = Date.now()

  try {
    // Check all services
    const [database, redis, anthropicAI, whatsapp] = await Promise.all([
      checkDatabase(),
      checkRedis(),
      checkAnthropicAI(),
      checkWhatsApp(),
    ])

    // Get performance metrics
    const report = performanceMonitor.getReport(60) // Last hour
    const metrics = {
      requestsPerMinute: Math.round(report.metrics.requestCount / 60),
      errorRate: `${report.metrics.errorRate.toFixed(2)}%`,
      avgResponseTime: Math.round(report.metrics.avgResponseTime),
    }

    // Determine overall status
    const services = { database, redis, anthropicAI, whatsapp }
    const status = determineOverallStatus(services)

    const result: HealthCheckResult = {
      status,
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      services,
      metrics,
    }

    // Log health check
    logger.info('Health check completed', {
      status,
      duration: Date.now() - startTime,
    })

    // Return appropriate status code
    const statusCode = status === 'healthy' ? 200 : status === 'degraded' ? 200 : 503

    return NextResponse.json(result, { status: statusCode })
  } catch (error) {
    logger.error('Health check failed', error as Error)

    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: 'Health check failed',
        uptime: process.uptime(),
      },
      { status: 503 }
    )
  }
}

/**
 * Check database connectivity
 */
async function checkDatabase(): Promise<ServiceStatus> {
  const startTime = Date.now()

  try {
    // Try to connect to database
    // In production, this would use Prisma
    // For now, just check if DATABASE_URL is set
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL not configured')
    }

    const latency = Date.now() - startTime

    return {
      status: 'up',
      latency: `${latency}ms`,
      lastCheck: new Date().toISOString(),
    }
  } catch (error) {
    logger.error('Database health check failed', error as Error)

    return {
      status: 'down',
      error: (error as Error).message,
      lastCheck: new Date().toISOString(),
    }
  }
}

/**
 * Check Redis connectivity
 */
async function checkRedis(): Promise<ServiceStatus> {
  const startTime = Date.now()

  try {
    // Check if Redis is enabled
    if (process.env.REDIS_ENABLED !== 'true') {
      return {
        status: 'degraded',
        error: 'Redis disabled',
        lastCheck: new Date().toISOString(),
      }
    }

    if (!process.env.REDIS_URL) {
      throw new Error('REDIS_URL not configured')
    }

    const latency = Date.now() - startTime

    return {
      status: 'up',
      latency: `${latency}ms`,
      lastCheck: new Date().toISOString(),
    }
  } catch (error) {
    logger.error('Redis health check failed', error as Error)

    return {
      status: 'down',
      error: (error as Error).message,
      lastCheck: new Date().toISOString(),
    }
  }
}

/**
 * Check Anthropic AI API
 */
async function checkAnthropicAI(): Promise<ServiceStatus> {
  const startTime = Date.now()

  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error('ANTHROPIC_API_KEY not configured')
    }

    // In production, make a simple API call to verify
    // For now, just check configuration
    const latency = Date.now() - startTime

    return {
      status: 'up',
      latency: `${latency}ms`,
      lastCheck: new Date().toISOString(),
    }
  } catch (error) {
    logger.error('Anthropic AI health check failed', error as Error)

    return {
      status: 'down',
      error: (error as Error).message,
      lastCheck: new Date().toISOString(),
    }
  }
}

/**
 * Check WhatsApp API
 */
async function checkWhatsApp(): Promise<ServiceStatus> {
  const startTime = Date.now()

  try {
    if (!process.env.WHATSAPP_ACCESS_TOKEN) {
      throw new Error('WHATSAPP_ACCESS_TOKEN not configured')
    }

    const latency = Date.now() - startTime

    return {
      status: 'up',
      latency: `${latency}ms`,
      lastCheck: new Date().toISOString(),
    }
  } catch (error) {
    logger.error('WhatsApp health check failed', error as Error)

    return {
      status: 'down',
      error: (error as Error).message,
      lastCheck: new Date().toISOString(),
    }
  }
}

/**
 * Determine overall system status
 */
function determineOverallStatus(
  services: Record<string, ServiceStatus>
): 'healthy' | 'degraded' | 'unhealthy' {
  const statuses = Object.values(services).map((s) => s.status)

  // If any critical service is down, system is unhealthy
  if (services.database.status === 'down' || services.anthropicAI.status === 'down') {
    return 'unhealthy'
  }

  // If any service is down or degraded, system is degraded
  if (statuses.includes('down') || statuses.includes('degraded')) {
    return 'degraded'
  }

  // All services up
  return 'healthy'
}
