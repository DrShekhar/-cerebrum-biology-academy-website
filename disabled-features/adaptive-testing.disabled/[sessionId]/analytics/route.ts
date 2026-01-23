/**
 * API Route: Get Real-time Adaptive Test Analytics
 * GET /api/adaptive-testing/[sessionId]/analytics
 */

import { NextRequest, NextResponse } from 'next/server'
import { adaptiveTestingEngine } from '@/lib/adaptive-testing/AdaptiveTestingEngine'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/config'

export async function GET(
  request: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  try {
    // Get user session
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const { sessionId } = params

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      )
    }

    // Get real-time analytics
    const analytics = adaptiveTestingEngine.getRealTimeAnalytics(sessionId)

    // Get session status
    const status = adaptiveTestingEngine.getSessionStatus(sessionId)

    return NextResponse.json({
      success: true,
      sessionId,
      status,
      analytics: {
        performance: {
          currentAbility: analytics.performance.abilityScore,
          accuracy: analytics.performance.accuracy,
          speed: analytics.performance.speed,
          engagement: analytics.performance.engagement
        },
        progress: {
          itemsCompleted: analytics.progress.itemsCompleted,
          estimatedCompletion: analytics.progress.progress,
          timeElapsed: analytics.progress.timeElapsed,
          currentLevel: status.currentAbility,
          learningPhase: analytics.progress.learningPhase,
          masteryAreas: analytics.progress.masteryAreas || [],
          strugglingAreas: analytics.progress.strugglingAreas || []
        },
        adaptations: {
          totalAdjustments: analytics.adaptations.total,
          recentChanges: analytics.adaptations.recent,
          effectiveness: analytics.adaptations.effectiveness
        },
        predictions: {
          finalScore: analytics.predictions.finalScore,
          timeRemaining: analytics.predictions.timeRemaining,
          successProbability: analytics.predictions.successProbability,
          learningVelocity: analytics.predictions.learningVelocity || 0,
          stabilityIndex: analytics.predictions.stabilityIndex || 0
        },
        gaps: analytics.gaps ? {
          totalGaps: analytics.gaps.totalGaps,
          criticalGaps: analytics.gaps.criticalGaps,
          recommendations: analytics.gaps.recommendations
        } : null,
        recommendations: analytics.recommendations
      },
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Error getting adaptive test analytics:', error)

    return NextResponse.json(
      {
        error: 'Failed to get analytics',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function POST(
  _request: NextRequest,
  { params: _params }: { params: { sessionId: string } }
) {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}