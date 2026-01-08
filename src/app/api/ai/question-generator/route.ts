// AI Question Generator API Endpoint - Simplified version
// Complex AI features temporarily disabled

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth/config'

interface QuestionRequest {
  topics: string[]
  curriculum: 'NEET' | 'CBSE' | 'ICSE' | 'IB' | 'IGCSE'
  grade: string
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Mixed'
  questionCount: number
  questionTypes: ('MCQ' | 'SHORT_ANSWER' | 'DIAGRAM' | 'TRUE_FALSE')[]
  timeLimit?: number
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { topics, curriculum, grade, difficulty, questionCount, questionTypes } =
      body as QuestionRequest

    // Validate input
    if (!topics || !Array.isArray(topics) || topics.length === 0) {
      return NextResponse.json({ error: 'Topics are required' }, { status: 400 })
    }

    if (!questionCount || questionCount < 1 || questionCount > 50) {
      return NextResponse.json(
        { error: 'Question count must be between 1 and 50' },
        { status: 400 }
      )
    }

    // Return service upgrade message
    return NextResponse.json({
      success: false,
      message: 'AI Question Generator is being upgraded. Advanced features will be available soon.',
      contact: '+91 88264 44334',
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Question Generator Error:', error)
    return NextResponse.json(
      {
        error: 'Failed to generate questions',
        message: 'Service temporarily unavailable. Please contact +91 88264 44334.',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    status: 'upgrading',
    message: 'AI Question Generator is being upgraded.',
    contact: '+91 88264 44334',
    timestamp: new Date().toISOString(),
  })
}
