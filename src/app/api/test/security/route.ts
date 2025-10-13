import { NextRequest, NextResponse } from 'next/server'
import ServerValidationManager from '../../../../lib/security/serverValidation'

// Initialize server validation manager
const validationManager = new ServerValidationManager()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, ...data } = body

    switch (action) {
      case 'submit_answer':
        return await handleAnswerSubmission(request, data)
      case 'heartbeat':
        return await handleHeartbeat(request, data)
      case 'violation_report':
        return await handleViolationReport(request, data)
      case 'session_register':
        return await handleSessionRegister(request, data)
      case 'session_validate':
        return await handleSessionValidate(request, data)
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('Security API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

async function handleAnswerSubmission(request: NextRequest, data: any) {
  const clientIP = getClientIP(request)
  const userAgent = request.headers.get('user-agent') || ''

  const submission = {
    userId: data.userId,
    sessionId: data.sessionId,
    questionId: data.questionId,
    submittedAnswer: data.answer,
    submissionTime: Date.now(),
    timeSpent: data.timeSpent,
    clientHash: data.hash,
    ipAddress: clientIP,
    userAgent
  }

  const validation = await validationManager.validateSubmission(submission)

  // Store submission result
  const response = {
    isValid: validation.isValid,
    violations: validation.violations,
    score: validation.score,
    action: validation.action,
    timestamp: Date.now()
  }

  // Add security headers
  const headers = new Headers()
  headers.set('X-Security-Score', validation.score.toString())
  headers.set('X-Validation-Action', validation.action)

  if (validation.action === 'block' || validation.action === 'terminate') {
    return NextResponse.json(
      {
        error: 'Submission blocked due to security violations',
        violations: validation.violations,
        action: validation.action
      },
      { status: 403, headers }
    )
  }

  if (validation.action === 'throttle') {
    return NextResponse.json(
      response,
      { status: 429, headers }
    )
  }

  return NextResponse.json(response, { headers })
}

async function handleHeartbeat(request: NextRequest, data: any) {
  const clientIP = getClientIP(request)

  // Validate heartbeat rate limiting
  const rateLimitResult = validationManager.checkRateLimit('heartbeat', {
    sessionId: data.sessionId
  })

  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      { error: 'Heartbeat rate limit exceeded' },
      { status: 429 }
    )
  }

  // Process heartbeat data
  const heartbeatResponse = {
    timestamp: Date.now(),
    status: 'active',
    remainingTime: rateLimitResult.resetTime - Date.now(),
    serverTime: Date.now()
  }

  return NextResponse.json(heartbeatResponse)
}

async function handleViolationReport(request: NextRequest, data: any) {
  const clientIP = getClientIP(request)
  const userAgent = request.headers.get('user-agent') || ''

  // Log violation
  console.warn('Security violation reported:', {
    userId: data.userId,
    sessionId: data.sessionId,
    violation: data.violation,
    severity: data.severity,
    ipAddress: clientIP,
    userAgent,
    timestamp: Date.now()
  })

  // Store violation in database or external logging service
  // This would integrate with your logging infrastructure

  // Check if user should be blocked
  const userViolations = await getUserViolationCount(data.userId, clientIP)

  if (userViolations > 10) {
    // Block user
    validationManager.addToBlacklist(clientIP)

    return NextResponse.json({
      action: 'block',
      message: 'Too many security violations'
    })
  }

  return NextResponse.json({
    action: 'continue',
    message: 'Violation logged'
  })
}

async function handleSessionRegister(request: NextRequest, data: any) {
  const clientIP = getClientIP(request)

  // Register session
  validationManager.registerSession(data.sessionId, data.userId, clientIP)

  // Check concurrent session limits
  const concurrentCheck = validationManager.checkConcurrentSessions(data.userId, clientIP)

  if (concurrentCheck.isViolation) {
    return NextResponse.json(
      {
        error: 'Concurrent session limit exceeded',
        maxSessions: concurrentCheck.maxConcurrentSessions,
        currentSessions: concurrentCheck.currentSessions
      },
      { status: 403 }
    )
  }

  return NextResponse.json({
    sessionId: data.sessionId,
    status: 'registered',
    timestamp: Date.now()
  })
}

async function handleSessionValidate(request: NextRequest, data: any) {
  const clientIP = getClientIP(request)

  // Validate session integrity
  const validation = await validationManager.validateSubmission({
    userId: data.userId,
    sessionId: data.sessionId,
    questionId: 'session_validate',
    submittedAnswer: 0,
    submissionTime: Date.now(),
    timeSpent: 0,
    clientHash: data.hash || '',
    ipAddress: clientIP,
    userAgent: request.headers.get('user-agent') || ''
  })

  return NextResponse.json({
    isValid: validation.isValid,
    violations: validation.violations,
    action: validation.action
  })
}

function getClientIP(request: NextRequest): string {
  // Check various headers for client IP
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0] ||
    request.headers.get('x-real-ip') ||
    request.headers.get('cf-connecting-ip') ||
    'unknown'
  )
}

async function getUserViolationCount(userId: string, ipAddress: string): Promise<number> {
  // This would query your database for user violation history
  // For now, return a mock count
  return 0
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const action = url.searchParams.get('action')

    switch (action) {
      case 'stats':
        return handleStatsRequest()
      case 'report':
        return handleReportRequest()
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('Security API GET error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

async function handleStatsRequest() {
  const stats = validationManager.getValidationStats()
  return NextResponse.json(stats)
}

async function handleReportRequest() {
  const report = validationManager.generateValidationReport()
  return NextResponse.json(report)
}