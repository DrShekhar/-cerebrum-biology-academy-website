/**
 * Test Details API
 * Fetches test details and questions for a specific test ID
 */

import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/generated/prisma/index.js'

const prisma = new PrismaClient()

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ testId: string }> }
) {
  try {
    const { testId } = await params

    if (!testId) {
      return NextResponse.json({ error: 'Test ID is required' }, { status: 400 })
    }

    // Fetch test session
    const session = await prisma.testSession.findUnique({
      where: { id: testId },
      include: {
        testTemplate: {
          select: {
            title: true,
            description: true,
            timeLimit: true,
            totalQuestions: true,
            totalMarks: true,
            instructions: true,
          },
        },
        responses: {
          include: {
            question: {
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

    if (!session) {
      return NextResponse.json({ error: 'Test not found' }, { status: 404 })
    }

    // Format response
    const testDetails = {
      testId: session.id,
      sessionToken: session.sessionToken,
      status: session.status,
      startedAt: session.startedAt,
      submittedAt: session.submittedAt,
      timeSpent: session.timeSpent,
      remainingTime: session.remainingTime,
      currentQuestionIndex: session.currentQuestionIndex,
      questionsAnswered: session.questionsAnswered,
      template: session.testTemplate,
      questions: session.responses.map((r) => ({
        id: r.question.id,
        question: r.question.question,
        options: Array.isArray(r.question.options)
          ? r.question.options
          : JSON.parse((r.question.options as string) || '[]'),
        topic: r.question.topic,
        subtopic: r.question.subtopic,
        difficulty: r.question.difficulty,
        marks: r.question.marks,
        timeLimit: r.question.timeLimit,
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

    const session = await prisma.testSession.update({
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
      testId: session.id,
      updatedAt: session.updatedAt,
    })
  } catch (error) {
    console.error('Error updating test progress:', error)
    return NextResponse.json({ error: 'Failed to update test progress' }, { status: 500 })
  }
}
