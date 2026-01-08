/**
 * Test Details API
 * Fetches test details and questions for a specific test ID
 */

import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/generated/prisma/index.js'
import { auth } from '@/lib/auth/config'

const prisma = new PrismaClient()

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ testId: string }> }
) {
  try {
    const authSession = await auth()
    if (!authSession) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { testId } = await params

    if (!testId) {
      return NextResponse.json({ error: 'Test ID is required' }, { status: 400 })
    }

    // Fetch test session
    const testSession = await prisma.test_sessions.findUnique({
      where: { id: testId },
      include: {
        test_templates: {
          select: {
            title: true,
            description: true,
            timeLimit: true,
            totalQuestions: true,
            totalMarks: true,
            instructions: true,
          },
        },
        user_question_responses: {
          include: {
            questions: {
              select: {
                id: true,
                question: true,
                options: true,
                topic: true,
                subtopic: true,
                difficulty: true,
                marks: true,
                timeLimit: true,
              },
            },
          },
        },
      },
    })

    if (!testSession) {
      return NextResponse.json({ error: 'Test not found' }, { status: 404 })
    }

    // Format response
    const testDetails = {
      testId: testSession.id,
      sessionToken: testSession.sessionToken,
      status: testSession.status,
      startedAt: testSession.startedAt,
      submittedAt: testSession.submittedAt,
      timeSpent: testSession.timeSpent,
      remainingTime: testSession.remainingTime,
      currentQuestionIndex: testSession.currentQuestionIndex,
      questionsAnswered: testSession.questionsAnswered,
      template: testSession.test_templates,
      questions: testSession.user_question_responses.map((r) => ({
        id: r.questions.id,
        question: r.questions.question,
        options: Array.isArray(r.questions.options)
          ? r.questions.options
          : JSON.parse((r.questions.options as string) || '[]'),
        topic: r.questions.topic,
        subtopic: r.questions.subtopic,
        difficulty: r.questions.difficulty,
        marks: r.questions.marks,
        timeLimit: r.questions.timeLimit,
        selectedAnswer: r.selectedAnswer,
      })),
    }

    return NextResponse.json(testDetails)
  } catch (error) {
    console.error('Error fetching test details:', error)
    return NextResponse.json({ error: 'Failed to fetch test details' }, { status: 500 })
  }
}

/**
 * Update test progress (for saving current state)
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ testId: string }> }
) {
  try {
    const authSession = await auth()
    if (!authSession) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { testId } = await params
    const body = await request.json()

    const {
      currentQuestionIndex,
      questionsAnswered,
      questionsMarkedForReview,
      timeSpent,
      tabSwitchCount,
      fullscreenExits,
    } = body

    const updatedSession = await prisma.test_sessions.update({
      where: { id: testId },
      data: {
        currentQuestionIndex,
        questionsAnswered,
        questionsMarkedForReview,
        timeSpent,
        tabSwitchCount,
        fullscreenExits,
        updatedAt: new Date(),
      },
    })

    return NextResponse.json({
      success: true,
      testId: updatedSession.id,
      updatedAt: updatedSession.updatedAt,
    })
  } catch (error) {
    console.error('Error updating test progress:', error)
    return NextResponse.json({ error: 'Failed to update test progress' }, { status: 500 })
  }
}
