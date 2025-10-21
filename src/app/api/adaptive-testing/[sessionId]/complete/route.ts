/**
 * API Route: Complete Adaptive Testing Session
 * POST /api/adaptive-testing/[sessionId]/complete
 */

import { NextRequest, NextResponse } from 'next/server'
import { adaptiveTestingEngine } from '@/lib/adaptive-testing/AdaptiveTestingEngine'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/config'

export async function POST(request: NextRequest, { params }: { params: { sessionId: string } }) {
  try {
    // Get user session
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    const { sessionId } = params

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID is required' }, { status: 400 })
    }

    // Complete the adaptive test session
    const result = await adaptiveTestingEngine.completeSession(sessionId)

    return NextResponse.json({
      success: true,
      sessionId: result.sessionId,
      results: {
        finalScore: result.finalResults.scaledScore,
        percentileRank: result.finalResults.percentileRank,
        masteryLevel: result.finalResults.masteryLevel,
        abilityEstimate: {
          theta: result.finalResults.abilityEstimate.theta,
          standardError: result.finalResults.abilityEstimate.standardError,
          confidence: result.finalResults.abilityEstimate.confidence,
        },
        topicScores: Object.fromEntries(result.finalResults.topicScores),
      },
      performance: {
        itemsCompleted: result.performance.itemsCompleted,
        totalTime: Math.round(result.performance.totalTime),
        averageItemTime: Math.round(result.performance.averageItemTime),
        accuracy: Math.round(result.performance.accuracy * 100),
        efficiency: Math.round(result.performance.efficiency * 100),
      },
      adaptations: {
        totalAdjustments: result.adaptations.totalAdjustments,
        adaptationTypes: result.adaptations.adaptationTypes,
        interventions: result.adaptations.interventions,
        personalizations: result.adaptations.personalizations,
      },
      gaps: {
        identifiedGaps: result.gaps.identifiedGaps,
        criticalGaps: result.gaps.criticalGaps,
        recommendations: result.gaps.recommendations,
        hasRemediationPlan: !!result.gaps.remediationPlan,
      },
      predictions: {
        futurePerformance: result.predictions.futurePerformance,
        readinessLevel: result.predictions.readinessLevel,
        riskFactors: result.predictions.riskFactors,
        strengths: result.predictions.strengths,
      },
      diagnostics: {
        algorithmPerformance: {
          convergence: result.diagnostics.algorithmPerformance.convergence,
          iterations: result.diagnostics.algorithmPerformance.iterations,
          finalSE: Math.round(result.diagnostics.algorithmPerformance.finalSE * 1000) / 1000,
        },
        adaptationEffectiveness: Math.round(result.diagnostics.adaptationEffectiveness * 100),
        systemMetrics: {
          sessionDuration: Math.round(result.diagnostics.systemMetrics.sessionDuration),
          responseRate: Math.round(result.diagnostics.systemMetrics.responseRate * 100) / 100,
          systemAdaptations: result.diagnostics.systemMetrics.systemAdaptations,
        },
      },
    })
  } catch (error) {
    console.error('Error completing adaptive test session:', error)

    return NextResponse.json(
      {
        error: 'Failed to complete adaptive test session',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest, { params }: { params: { sessionId: string } }) {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
