/**
 * Test Session Start API
 * Initializes a test session and tracks start time
 */

import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/generated/prisma/index.js'

const prisma = new PrismaClient()

interface StartTestRequest {
  testId: string
  studentId: string
}

export async function POST(request: NextRequest) {
  try {
    const body: StartTestRequest = await request.json()
    const { testId, studentId } = body

    if (!testId || !studentId) {
      return NextResponse.json(
        { error: 'Missing required fields: testId and studentId' },
        { status: 400 }
      )
    }

    // Update test session to started
    const session = await prisma.test_sessions.update({
      where: { id: testId },
      data: {
        status: 'IN_PROGRESS',
        startedAt: new Date(),
        updatedAt: new Date(),
      },
      include: {
        test_templates: true,
      },
    })

    console.log(`🚀 Test session started: ${testId} for student ${studentId}`)

    return NextResponse.json({
      success: true,
      testId: session.id,
      sessionToken: session.sessionToken,
      startedAt: session.startedAt,
      status: session.status,
    })
  } catch (error) {
    console.error('Error starting test session:', error)
    return NextResponse.json({ error: 'Failed to start test session' }, { status: 500 })
  }
}
