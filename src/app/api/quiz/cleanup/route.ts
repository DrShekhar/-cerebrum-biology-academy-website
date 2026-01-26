import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ipRateLimit, getRateLimitHeaders } from '@/lib/middleware/rateLimit'
import { timingSafeEqual } from 'crypto'

export const dynamic = 'force-dynamic'

// Secret key for cleanup endpoint (MUST be set in environment - fail closed)
const CLEANUP_SECRET = process.env.QUIZ_CLEANUP_SECRET

// Helper to check if cleanup is properly configured (min 32 chars for security)
function isCleanupConfigured(): boolean {
  return Boolean(CLEANUP_SECRET && CLEANUP_SECRET.length >= 32)
}

// Verify the cleanup secret with timing-safe comparison
function verifyCleanupAuth(request: NextRequest): {
  valid: boolean
  error?: string
  status?: number
} {
  // Fail closed: require properly configured secret
  if (!isCleanupConfigured()) {
    console.error('QUIZ_CLEANUP_SECRET not configured or too short (min 32 chars)')
    return { valid: false, error: 'Service not configured', status: 503 }
  }

  const authHeader = request.headers.get('authorization')
  const providedSecret = authHeader?.replace('Bearer ', '') || ''

  // Quick length check first
  if (providedSecret.length !== CLEANUP_SECRET!.length) {
    return { valid: false, error: 'Unauthorized', status: 401 }
  }

  // Use timing-safe comparison to prevent timing attacks
  const secretBuffer = Buffer.from(CLEANUP_SECRET!)
  const providedBuffer = Buffer.from(providedSecret)

  if (!timingSafeEqual(secretBuffer, providedBuffer)) {
    return { valid: false, error: 'Unauthorized', status: 401 }
  }

  return { valid: true }
}

export async function POST(request: NextRequest) {
  try {
    const rateLimitResult = await ipRateLimit(request, {
      limit: 5,
      window: 60 * 60 * 1000, // 1 hour
      endpoint: 'quiz:cleanup',
    })

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { success: false, error: 'Too many requests.' },
        { status: 429, headers: getRateLimitHeaders(rateLimitResult) }
      )
    }

    // Verify cleanup secret with fail-closed behavior
    const authResult = verifyCleanupAuth(request)
    if (!authResult.valid) {
      return NextResponse.json(
        { success: false, error: authResult.error },
        { status: authResult.status || 401 }
      )
    }

    const now = new Date()

    // Clean up sessions older than 24 hours that are still WAITING
    const waitingCutoff = new Date(now.getTime() - 24 * 60 * 60 * 1000)

    // Clean up COMPLETED sessions older than 7 days
    const completedCutoff = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

    // Clean up IN_PROGRESS/PAUSED sessions older than 12 hours (likely abandoned)
    const activeCutoff = new Date(now.getTime() - 12 * 60 * 60 * 1000)

    // Delete old WAITING sessions
    const waitingDeleted = await prisma.quiz_sessions.deleteMany({
      where: {
        status: 'WAITING',
        createdAt: { lt: waitingCutoff },
      },
    })

    // Delete old COMPLETED sessions
    const completedDeleted = await prisma.quiz_sessions.deleteMany({
      where: {
        status: 'COMPLETED',
        endedAt: { lt: completedCutoff },
      },
    })

    // Delete abandoned IN_PROGRESS/PAUSED sessions
    const abandonedDeleted = await prisma.quiz_sessions.deleteMany({
      where: {
        status: { in: ['IN_PROGRESS', 'PAUSED'] },
        updatedAt: { lt: activeCutoff },
      },
    })

    const totalDeleted = waitingDeleted.count + completedDeleted.count + abandonedDeleted.count

    return NextResponse.json({
      success: true,
      data: {
        deletedCounts: {
          waiting: waitingDeleted.count,
          completed: completedDeleted.count,
          abandoned: abandonedDeleted.count,
          total: totalDeleted,
        },
        cutoffs: {
          waiting: waitingCutoff.toISOString(),
          completed: completedCutoff.toISOString(),
          abandoned: activeCutoff.toISOString(),
        },
      },
    })
  } catch (error) {
    console.error('Error cleaning up quiz sessions:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to clean up sessions' },
      { status: 500 }
    )
  }
}

// GET - Get cleanup stats without deleting
export async function GET(request: NextRequest) {
  try {
    const rateLimitResult = await ipRateLimit(request, {
      limit: 20,
      window: 60 * 60 * 1000,
      endpoint: 'quiz:cleanup:stats',
    })

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { success: false, error: 'Too many requests.' },
        { status: 429, headers: getRateLimitHeaders(rateLimitResult) }
      )
    }

    // Verify cleanup secret with fail-closed behavior
    const authResult = verifyCleanupAuth(request)
    if (!authResult.valid) {
      return NextResponse.json(
        { success: false, error: authResult.error },
        { status: authResult.status || 401 }
      )
    }

    const now = new Date()
    const waitingCutoff = new Date(now.getTime() - 24 * 60 * 60 * 1000)
    const completedCutoff = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const activeCutoff = new Date(now.getTime() - 12 * 60 * 60 * 1000)

    // Count sessions that would be cleaned up
    const [waitingCount, completedCount, abandonedCount, totalActive] = await Promise.all([
      prisma.quiz_sessions.count({
        where: {
          status: 'WAITING',
          createdAt: { lt: waitingCutoff },
        },
      }),
      prisma.quiz_sessions.count({
        where: {
          status: 'COMPLETED',
          endedAt: { lt: completedCutoff },
        },
      }),
      prisma.quiz_sessions.count({
        where: {
          status: { in: ['IN_PROGRESS', 'PAUSED'] },
          updatedAt: { lt: activeCutoff },
        },
      }),
      prisma.quiz_sessions.count({
        where: {
          status: { in: ['WAITING', 'IN_PROGRESS', 'PAUSED'] },
        },
      }),
    ])

    return NextResponse.json({
      success: true,
      data: {
        pendingCleanup: {
          waiting: waitingCount,
          completed: completedCount,
          abandoned: abandonedCount,
          total: waitingCount + completedCount + abandonedCount,
        },
        activeSessions: totalActive,
        cutoffs: {
          waiting: '24 hours',
          completed: '7 days',
          abandoned: '12 hours',
        },
      },
    })
  } catch (error) {
    console.error('Error getting cleanup stats:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to get cleanup stats' },
      { status: 500 }
    )
  }
}
