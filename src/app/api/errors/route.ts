import { NextRequest } from 'next/server'
import { handleError, successResponse, logError } from '@/lib/errors'
import { withErrorHandling } from '@/lib/errors'
import prisma from '@/lib/prisma'

// Rate limiting for error reporting API
const reportCounts = new Map<string, { count: number; resetTime: number }>()
const MAX_REPORTS_PER_IP = 50 // per hour
const RATE_LIMIT_WINDOW = 60 * 60 * 1000 // 1 hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const current = reportCounts.get(ip)

  if (!current || now > current.resetTime) {
    reportCounts.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return true
  }

  if (current.count >= MAX_REPORTS_PER_IP) {
    return false
  }

  current.count++
  return true
}

async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'

  // Rate limit error reports
  if (!checkRateLimit(ip)) {
    return handleError(new Error('Too many error reports'), '/api/errors')
  }

  try {
    const errorReport = await request.json()

    // Validate error report structure
    if (!errorReport.error || !errorReport.error.message) {
      return handleError(new Error('Invalid error report format'), '/api/errors')
    }

    // Log the error using our error handling system
    const error = new Error(errorReport.error.message)
    error.stack = errorReport.error.stack
    error.name = errorReport.error.name || 'ClientError'

    logError(error, {
      source: 'client_error_report',
      fingerprint: errorReport.fingerprint,
      severity: errorReport.severity || 'normal',
      context: errorReport.context,
      clientIP: ip,
      timestamp: new Date().toISOString(),
    })

    // In production, you might want to:
    // 1. Store in database for analytics
    // 2. Send to external monitoring service
    // 3. Alert team for critical errors
    // 4. Update error counters for dashboard

    if (process.env.NODE_ENV === 'production') {
      // Store error report in database or send to monitoring service
      await storeErrorReport(errorReport, ip)
    }

    return successResponse(
      { received: true, fingerprint: errorReport.fingerprint },
      'Error report received'
    )
  } catch (error) {
    return handleError(error, '/api/errors')
  }
}

async function storeErrorReport(errorReport: any, clientIP: string) {
  try {
    const fingerprint =
      errorReport.fingerprint ||
      `${errorReport.error.name}-${errorReport.error.message}`.substring(0, 100)

    const existingError = await prisma.error_reports.findFirst({
      where: { fingerprint },
      orderBy: { lastSeen: 'desc' },
    })

    if (existingError) {
      await prisma.error_reports.update({
        where: { id: existingError.id },
        data: {
          occurrences: existingError.occurrences + 1,
          lastSeen: new Date(),
          context: errorReport.context || existingError.context,
          stack: errorReport.error.stack || existingError.stack,
        },
      })
    } else {
      await prisma.error_reports.create({
        data: {
          fingerprint,
          message: errorReport.error.message,
          stack: errorReport.error.stack,
          errorName: errorReport.error.name || 'Error',
          severity: mapSeverity(errorReport.severity),
          context: errorReport.context,
          url: errorReport.context?.url,
          userAgent: errorReport.context?.userAgent,
          clientIP,
          userId: errorReport.context?.userId,
        },
      })
    }

    if (errorReport.severity === 'critical') {
      console.error('🚨 CRITICAL ERROR REPORTED:', {
        fingerprint,
        message: errorReport.error.message,
        clientIP,
      })
    }

    console.log('Error report stored:', {
      fingerprint,
      severity: errorReport.severity,
      clientIP,
      isNew: !existingError,
    })
  } catch (error) {
    console.error('Failed to store error report:', error)
  }
}

function mapSeverity(severity?: string): 'low' | 'normal' | 'high' | 'critical' {
  if (!severity) return 'normal'
  const normalizedSeverity = severity.toLowerCase()
  if (['low', 'normal', 'high', 'critical'].includes(normalizedSeverity)) {
    return normalizedSeverity as 'low' | 'normal' | 'high' | 'critical'
  }
  return 'normal'
}

// Health check endpoint
async function GET() {
  return successResponse({
    status: 'operational',
    timestamp: new Date().toISOString(),
  })
}

export { POST, GET }
