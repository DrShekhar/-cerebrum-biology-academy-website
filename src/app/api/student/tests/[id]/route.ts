/**
 * Student Test by ID API
 *
 * GET /api/student/tests/[id] - Get test details and questions for taking
 * POST /api/student/tests/[id] - Start test (marks as in_progress)
 * PUT /api/student/tests/[id] - Update progress (save answers, submit)
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized. Please log in.' }, { status: 401 })
    }

    const { id } = await params
    const studentId = session.user.id

    const submission = await prisma.test_assignment_submissions.findFirst({
      where: {
        testAssignmentId: id,
        studentId,
      },
      include: {
        test_assignments: {
          include: {
            users: {
              select: {
                id: true,
                name: true,
              },
            },
            test_assignment_questions: {
              include: {
                questions: {
                  select: {
                    id: true,
                    question: true,
                    options: true,
                    type: true,
                    topic: true,
                    difficulty: true,
                    correctAnswer: true,
                    explanation: true,
                  },
                },
              },
              orderBy: {
                orderIndex: 'asc',
              },
            },
          },
        },
      },
    })

    if (!submission) {
      return NextResponse.json({ error: 'Test not found or not assigned to you' }, { status: 404 })
    }

    const assignment = submission.test_assignments
    const now = new Date()
    const isAvailable = assignment.availableFrom ? new Date(assignment.availableFrom) <= now : true
    const isPastDue = new Date(assignment.dueDate) < now

    const showAnswers =
      submission.status === 'GRADED' ||
      (submission.status === 'SUBMITTED' && assignment.showResults === 'IMMEDIATELY')

    let questions = assignment.test_assignment_questions.map((q) => {
      const base = {
        id: q.id,
        questionId: q.questionId,
        orderIndex: q.orderIndex,
        marks: q.marks,
        negativeMarks: q.negativeMarks,
        question: q.questions.question,
        options: q.questions.options,
        type: q.questions.type,
        topic: q.questions.topic,
        difficulty: q.questions.difficulty,
      }

      if (showAnswers) {
        return {
          ...base,
          correctAnswer: q.questions.correctAnswer,
          explanation: q.questions.explanation,
        }
      }
      return base
    })

    if (assignment.shuffleQuestions && submission.status === 'NOT_STARTED') {
      questions = questions.sort(() => Math.random() - 0.5)
    }

    return NextResponse.json({
      success: true,
      test: {
        submissionId: submission.id,
        testId: assignment.id,
        title: assignment.title,
        description: assignment.description,
        instructions: assignment.instructions,
        difficulty: assignment.difficulty,
        totalQuestions: assignment.totalQuestions,
        totalMarks: assignment.totalMarks,
        duration: assignment.duration,
        negativeMarking: assignment.negativeMarking,
        negativeMarkValue: assignment.negativeMarkValue,
        passingMarks: assignment.passingMarks,
        dueDate: assignment.dueDate,
        teacher: assignment.users,
        status: submission.status,
        startedAt: submission.startedAt,
        submittedAt: submission.submittedAt,
        timeSpent: submission.timeSpent,
        remainingTime: submission.remainingTime,
        answers: submission.answers,
        isAvailable,
        isPastDue,
        showAnswers,
      },
      questions,
      results: showAnswers
        ? {
            totalScore: submission.totalScore,
            percentage: submission.percentage,
            questionsAttempted: submission.questionsAttempted,
            questionsCorrect: submission.questionsCorrect,
            questionsWrong: submission.questionsWrong,
            questionsSkipped: submission.questionsSkipped,
            teacherFeedback: submission.teacherFeedback,
          }
        : null,
    })
  } catch (error) {
    console.error('Failed to fetch test:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch test',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized. Please log in.' }, { status: 401 })
    }

    const { id } = await params
    const studentId = session.user.id

    const submission = await prisma.test_assignment_submissions.findFirst({
      where: {
        testAssignmentId: id,
        studentId,
      },
      include: {
        test_assignments: true,
      },
    })

    if (!submission) {
      return NextResponse.json({ error: 'Test not found or not assigned to you' }, { status: 404 })
    }

    if (submission.status !== 'NOT_STARTED' && submission.status !== 'IN_PROGRESS') {
      return NextResponse.json({ error: 'Test has already been submitted' }, { status: 400 })
    }

    const now = new Date()
    const assignment = submission.test_assignments

    if (assignment.availableFrom && new Date(assignment.availableFrom) > now) {
      return NextResponse.json({ error: 'Test is not available yet' }, { status: 400 })
    }

    if (new Date(assignment.dueDate) < now) {
      return NextResponse.json({ error: 'Test deadline has passed' }, { status: 400 })
    }

    const updatedSubmission = await prisma.test_assignment_submissions.update({
      where: { id: submission.id },
      data: {
        status: 'IN_PROGRESS',
        startedAt: submission.startedAt || now,
        remainingTime: submission.remainingTime ?? assignment.duration * 60,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Test started successfully',
      submission: {
        id: updatedSubmission.id,
        status: updatedSubmission.status,
        startedAt: updatedSubmission.startedAt,
        remainingTime: updatedSubmission.remainingTime,
      },
    })
  } catch (error) {
    console.error('Failed to start test:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to start test',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized. Please log in.' }, { status: 401 })
    }

    const { id } = await params
    const studentId = session.user.id
    const body = await request.json()

    const { answers, timeSpent, remainingTime, tabSwitchCount, fullscreenExits, submit } = body

    const submission = await prisma.test_assignment_submissions.findFirst({
      where: {
        testAssignmentId: id,
        studentId,
      },
      include: {
        test_assignments: {
          include: {
            test_assignment_questions: {
              include: {
                questions: {
                  select: {
                    id: true,
                    correctAnswer: true,
                  },
                },
              },
            },
          },
        },
      },
    })

    if (!submission) {
      return NextResponse.json({ error: 'Test not found or not assigned to you' }, { status: 404 })
    }

    if (submission.status === 'SUBMITTED' || submission.status === 'GRADED') {
      return NextResponse.json({ error: 'Test has already been submitted' }, { status: 400 })
    }

    const updateData: any = {}

    if (answers !== undefined) updateData.answers = answers
    if (timeSpent !== undefined) updateData.timeSpent = timeSpent
    if (remainingTime !== undefined) updateData.remainingTime = remainingTime
    if (tabSwitchCount !== undefined) updateData.tabSwitchCount = tabSwitchCount
    if (fullscreenExits !== undefined) updateData.fullscreenExits = fullscreenExits

    if (submit) {
      updateData.status = 'SUBMITTED'
      updateData.submittedAt = new Date()

      const assignment = submission.test_assignments
      const questionsMap = new Map(assignment.test_assignment_questions.map((q) => [q.questionId, q]))

      let totalScore = 0
      let questionsAttempted = 0
      let questionsCorrect = 0
      let questionsWrong = 0
      let questionsSkipped = 0

      const answersList = answers || submission.answers || []

      for (const q of assignment.test_assignment_questions) {
        const answer = answersList.find((a: any) => a.questionId === q.questionId)

        if (!answer || answer.selectedAnswer === null || answer.selectedAnswer === undefined) {
          questionsSkipped++
          continue
        }

        questionsAttempted++
        const isCorrect = answer.selectedAnswer === q.questions.correctAnswer

        if (isCorrect) {
          questionsCorrect++
          totalScore += q.marks
        } else {
          questionsWrong++
          if (assignment.negativeMarking && q.negativeMarks) {
            totalScore -= Number(q.negativeMarks)
          }
        }
      }

      const percentage = (totalScore / assignment.totalMarks) * 100

      updateData.totalScore = Math.max(0, totalScore)
      updateData.percentage = Math.max(0, percentage)
      updateData.questionsAttempted = questionsAttempted
      updateData.questionsCorrect = questionsCorrect
      updateData.questionsWrong = questionsWrong
      updateData.questionsSkipped = questionsSkipped

      await prisma.test_assignments.update({
        where: { id: assignment.id },
        data: {
          totalSubmitted: { increment: 1 },
        },
      })
    }

    const updatedSubmission = await prisma.test_assignment_submissions.update({
      where: { id: submission.id },
      data: updateData,
    })

    return NextResponse.json({
      success: true,
      message: submit ? 'Test submitted successfully' : 'Progress saved',
      submission: {
        id: updatedSubmission.id,
        status: updatedSubmission.status,
        timeSpent: updatedSubmission.timeSpent,
        remainingTime: updatedSubmission.remainingTime,
        submittedAt: updatedSubmission.submittedAt,
        totalScore: updatedSubmission.totalScore,
        percentage: updatedSubmission.percentage,
        questionsAttempted: updatedSubmission.questionsAttempted,
        questionsCorrect: updatedSubmission.questionsCorrect,
        questionsWrong: updatedSubmission.questionsWrong,
        questionsSkipped: updatedSubmission.questionsSkipped,
      },
    })
  } catch (error) {
    console.error('Failed to update test:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update test',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
