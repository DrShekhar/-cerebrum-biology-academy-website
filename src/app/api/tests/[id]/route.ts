import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

/**
 * GET /api/tests/[id]
 * Fetch a specific test template with questions
 */
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const testId = params.id

    // Fetch test template with questions
    const test = await prisma.test_templates.findUnique({
      where: { id: testId },
      include: {
        testQuestions: {
          include: {
            question: {
              select: {
                id: true,
                type: true,
                difficulty: true,
                question: true,
                options: true,
                topic: true,
                subtopic: true,
                marks: true,
                timeLimit: true,
                explanation: true,
                questionImage: true,
              },
            },
          },
          orderBy: {
            order: 'asc',
          },
        },
      },
    })

    if (!test) {
      return NextResponse.json(
        {
          success: false,
          error: 'Test not found',
        },
        { status: 404 }
      )
    }

    // Transform response
    const transformedTest = {
      id: test.id,
      title: test.title,
      description: test.description,
      type: test.type,
      category: test.category,
      difficulty: test.difficulty,
      timeLimit: test.timeLimit,
      totalQuestions: test.totalQuestions,
      totalMarks: test.totalMarks,
      passingMarks: test.passingMarks,
      isAdaptive: test.isAdaptive,
      instructions: test.instructions || [],
      tags: test.tags || [],
      syllabus: test.syllabus || [],
      questions: test.testQuestions.map((tq) => ({
        id: tq.question.id,
        type: tq.question.type,
        difficulty: tq.question.difficulty,
        question: tq.question.question,
        options: tq.question.options,
        topic: tq.question.topic,
        subtopic: tq.question.subtopic,
        marks: tq.marks,
        timeLimit: tq.question.timeLimit,
        questionImage: tq.question.questionImage,
        order: tq.order,
      })),
    }

    return NextResponse.json({
      success: true,
      data: transformedTest,
    })
  } catch (error) {
    console.error('Error fetching test:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch test',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
