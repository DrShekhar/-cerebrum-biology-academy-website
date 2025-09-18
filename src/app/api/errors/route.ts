import { NextRequest } from 'next/server'
import { handleError, successResponse, logError } from '@/lib/errors'
import { withErrorHandling } from '@/lib/errors'

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
    // TODO: Implement database storage or external service integration
    // Examples:

    // 1. Database storage
    // await prisma.errorReport.create({
    //   data: {
    //     fingerprint: errorReport.fingerprint,
    //     message: errorReport.error.message,
    //     stack: errorReport.error.stack,
    //     severity: errorReport.severity,
    //     context: errorReport.context,
    //     clientIP,
    //     createdAt: new Date(),
    //   }
    // })

    // 2. External service (Sentry, DataDog, etc.)
    // await sendToExternalService(errorReport)

    // 3. Email alerts for critical errors
    // if (errorReport.severity === 'critical') {
    //   await sendCriticalErrorAlert(errorReport)
    // }

    console.log('Error report stored:', {
      fingerprint: errorReport.fingerprint,
      severity: errorReport.severity,
      clientIP,
    })
  } catch (error) {
    console.error('Failed to store error report:', error)
  }
}

// Health check endpoint
async function GET() {
  return successResponse({
    status: 'operational',
    timestamp: new Date().toISOString(),
  })
}

export { POST, GET }
