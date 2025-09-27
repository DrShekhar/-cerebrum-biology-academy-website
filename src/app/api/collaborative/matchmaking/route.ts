/**
 * API Routes for Study Partner Matchmaking
 */

import { NextRequest, NextResponse } from 'next/server'
import { CollaborativeLearningManager } from '@/lib/collaborative/CollaborativeLearningManager'

// Use singleton pattern for collaborative manager
let collaborativeManager: CollaborativeLearningManager

if (!collaborativeManager) {
  collaborativeManager = new CollaborativeLearningManager()
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { student } = body

    if (!student || !student.id) {
      return NextResponse.json({ error: 'Valid student profile required' }, { status: 400 })
    }

    // Find compatible study partners
    const matches = await collaborativeManager.findStudyPartners(student)

    return NextResponse.json({
      success: true,
      matches,
      totalMatches: matches.length,
      message: `Found ${matches.length} potential study partners`,
    })
  } catch (error) {
    console.error('Error finding study partners:', error)
    return NextResponse.json({ error: 'Failed to find study partners' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const studentId = searchParams.get('studentId')

    if (!studentId) {
      return NextResponse.json({ error: 'Student ID required' }, { status: 400 })
    }

    // Get learning analytics for the student
    const analytics = await collaborativeManager.getLearningAnalytics(studentId)

    return NextResponse.json({
      success: true,
      analytics,
      message: 'Learning analytics retrieved successfully',
    })
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json({ error: 'Failed to fetch learning analytics' }, { status: 500 })
  }
}
