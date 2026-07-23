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
import { isAnswerCorrect, resolveCorrectIndex } from '@/lib/tests/answerKey'

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

    // The create UI stores showResults lowercase ('immediately' | 'after_deadline'
    // | 'manual'); older data may be uppercase. Normalize so results actually
    // reveal. 'manual' shows only once a teacher marks the submission GRADED.
    const showResultsMode = (assignment.showResults || '').toUpperCase()
    const showAnswers =
      submission.status === 'GRADED' ||
      (submission.status === 'SUBMITTED' &&
        (showResultsMode === 'IMMEDIATELY' || (showResultsMode === 'AFTER_DEADLINE' && isPastDue)))

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
          // Return the resolved 0-based index so the results UI can compare it
          // directly against the student's selected option index.
          correctAnswer: resolveCorrectIndex(q.questions.options, q.questions.correctAnswer),
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
                    options: true,
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

    // SECURITY: enforce the assignment DUE DATE server-side — browser timers can
    // be paused or bypassed. We deliberately gate on dueDate only (not
    // startedAt+duration wall-clock): the attempt supports legitimate
    // pause/resume (startedAt is preserved and remainingTime is carried), so a
    // wall-clock check would wrongly expire a student who resumed later.
    const assignmentMeta = submission.test_assignments
    const dueDate = assignmentMeta.dueDate ? new Date(assignmentMeta.dueDate) : null
    const nowTs = new Date()
    const GRACE_MS = 30 * 1000 // clock skew / in-flight submit
    const pastDeadline = dueDate ? nowTs.getTime() > dueDate.getTime() + GRACE_MS : false

    if (pastDeadline && !submit) {
      // No edits after the deadline — reject late autosaves outright.
      return NextResponse.json(
        { error: 'The deadline for this test has passed. Your test can no longer be edited.' },
        { status: 400 }
      )
    }
    // A late submit is allowed to close the attempt, but is graded ONLY on the
    // answers saved before the deadline — the request body's answers are ignored
    // (else a student could wait out the timer and submit fresh answers).
    const gradeSavedOnly = pastDeadline

    const updateData: any = {}

    if (answers !== undefined && !gradeSavedOnly) updateData.answers = answers
    if (timeSpent !== undefined) updateData.timeSpent = timeSpent
    if (remainingTime !== undefined) updateData.remainingTime = remainingTime
    if (tabSwitchCount !== undefined) updateData.tabSwitchCount = tabSwitchCount
    if (fullscreenExits !== undefined) updateData.fullscreenExits = fullscreenExits

    if (submit) {
      updateData.status = 'SUBMITTED'
      updateData.submittedAt = new Date()

      const assignment = submission.test_assignments
      const questionsMap = new Map(
        assignment.test_assignment_questions.map((q) => [q.questionId, q])
      )

      let totalScore = 0
      let questionsAttempted = 0
      let questionsCorrect = 0
      let questionsWrong = 0
      let questionsSkipped = 0

      // Per-question response rows for the shared assessment store — this is
      // what the Mistakes notebook and Mastery map read. Before this, assigned
      // tests never wrote per-question rows, so a student's mistakes from
      // assigned tests were invisible to both features.
      const responseRows: {
        id: string
        userId: string
        questionId: string
        selectedAnswer: string
        isCorrect: boolean
        marksAwarded: number
        responseMode: 'TEST_MODE'
      }[] = []

      // Past the deadline we score only what was saved in time; otherwise the
      // just-submitted answers (falling back to the last autosave).
      const answersList =
        (gradeSavedOnly ? submission.answers : answers || submission.answers) || []

      for (const q of assignment.test_assignment_questions) {
        const answer = answersList.find((a: any) => a.questionId === q.questionId)

        if (!answer || answer.selectedAnswer === null || answer.selectedAnswer === undefined) {
          questionsSkipped++
          continue
        }

        questionsAttempted++
        // The client sends a numeric option index; correctAnswer may be stored
        // as a letter, option text, or index — resolve both to an index.
        const correct = isAnswerCorrect(
          q.questions.options,
          q.questions.correctAnswer,
          answer.selectedAnswer
        )

        let marksAwarded = 0
        if (correct) {
          questionsCorrect++
          totalScore += q.marks
          marksAwarded = q.marks
        } else {
          questionsWrong++
          if (assignment.negativeMarking) {
            // Prefer the per-question penalty; fall back to the assignment-level
            // value the create UI actually sets (per-question negativeMarks is
            // usually null), so the promised "−N per wrong" is applied.
            const penalty =
              q.negativeMarks != null
                ? Number(q.negativeMarks)
                : assignment.negativeMarkValue != null
                  ? Number(assignment.negativeMarkValue)
                  : 0
            totalScore -= penalty
            marksAwarded = -penalty
          }
        }

        // Store the answer as a letter (A/B/C/…) to match the CBT rows the
        // Mistakes notebook already renders; deterministic id = idempotent.
        const selectedIndex = Number(answer.selectedAnswer)
        responseRows.push({
          id: `uqr_${submission.id}_${q.questionId}`.slice(0, 190),
          userId: submission.studentId,
          questionId: q.questionId,
          selectedAnswer: Number.isInteger(selectedIndex)
            ? String.fromCharCode(65 + selectedIndex)
            : String(answer.selectedAnswer),
          isCorrect: correct,
          marksAwarded,
          responseMode: 'TEST_MODE',
        })
      }

      if (responseRows.length > 0) {
        try {
          await prisma.user_question_responses.createMany({
            data: responseRows,
            skipDuplicates: true,
          })
        } catch (responseError) {
          // Mistakes/Mastery feed is best-effort — never fail the submission.
          console.error('Failed to record per-question responses:', responseError)
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
