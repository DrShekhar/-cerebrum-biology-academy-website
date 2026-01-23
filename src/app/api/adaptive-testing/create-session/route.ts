/**
 * API Route: Create Adaptive Testing Session
 * POST /api/adaptive-testing/create-session
 */

import { NextRequest, NextResponse } from 'next/server'
import { adaptiveTestingEngine } from '@/lib/adaptive-testing/AdaptiveTestingEngine'
import { auth } from '@/lib/auth/config'

export async function POST(request: NextRequest) {
  try {
    // Get user session
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    // Parse request body
    const body = await request.json()
    const {
      testType = 'formative',
      curriculum = 'NEET',
      grade = '12',
      topics = [],
      termination,
      adaptation,
      performance,
      reporting,
    } = body

    // Validate required fields
    if (!curriculum || !grade) {
      return NextResponse.json({ error: 'Curriculum and grade are required' }, { status: 400 })
    }

    // Create adaptive test configuration
    const configuration = {
      testType,
      curriculum,
      grade,
      topics: Array.isArray(topics) ? topics : [],
      termination: {
        minItems: 10,
        maxItems: 30,
        targetSE: 0.3,
        targetInformation: 10,
        timeLimit: 60,
        masteryThreshold: 0.8,
        ...termination,
      },
      adaptation: {
        algorithm: 'cat_hybrid',
        difficultyRange: [-3, 3],
        contentBalancing: true,
        realTimeAdjustment: true,
        gapDetection: true,
        personalizedSequencing: true,
        ...adaptation,
      },
      performance: {
        cacheResults: true,
        batchSize: 5,
        maxConcurrentSessions: 100,
        enablePredictiveLoading: true,
        ...performance,
      },
      reporting: {
        generateDetailedReport: true,
        includeGapAnalysis: true,
        includePredictions: true,
        enableRealTimeAnalytics: true,
        ...reporting,
      },
    }

    // Create session
    const adaptiveSession = await adaptiveTestingEngine.createSession(
      session.user.id,
      configuration
    )

    // Return session details
    return NextResponse.json({
      success: true,
      session: {
        id: adaptiveSession.id,
        studentId: adaptiveSession.studentId,
        state: adaptiveSession.state,
        configuration: adaptiveSession.configuration,
        timestamps: adaptiveSession.timestamps,
      },
    })
  } catch (error) {
    console.error('Error creating adaptive test session:', error)

    return NextResponse.json(
      {
        error: 'Failed to create adaptive test session',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
