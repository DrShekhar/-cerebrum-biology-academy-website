import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth/config'
import type { WorkSubmissionStatus } from '@/generated/prisma'

export const dynamic = 'force-dynamic'

interface RouteContext {
  params: Promise<{ id: string }>
}

// ============================================
// GET - Fetch worksheet details with content
// ============================================

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ success: false, error: 'Authentication required' }, { status: 401 })
    }

    const worksheet = await prisma.worksheets.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true,
        courseId: true,
        chapterId: true,
        topicId: true,
        content: true,
        instructions: true,
        maxMarks: true,
        duration: true,
        difficulty: true,
        status: true,
        dueDate: true,
        allowLateSubmission: true,
        publishedAt: true,
        attachments: true,
        tags: true,
        submissions: {
          where: { studentId: session.user.id },
          select: {
            id: true,
            status: true,
            answers: true,
            attachments: true,
            startedAt: true,
            submittedAt: true,
            grade: true,
            feedback: true,
            gradedAt: true,
            isLate: true,
            timeSpent: true,
          },
        },
      },
    })

    if (!worksheet) {
      return NextResponse.json({ success: false, error: 'Worksheet not found' }, { status: 404 })
    }

    if (worksheet.status !== 'PUBLISHED') {
      return NextResponse.json({ success: false, error: 'Worksheet not available' }, { status: 404 })
    }

    const submission = worksheet.submissions[0]
    const now = new Date()
    const isDuePassed = worksheet.dueDate ? new Date(worksheet.dueDate) < now : false

    // Increment download count if accessing content
    await prisma.worksheets.update({
      where: { id },
      data: { downloadCount: { increment: 1 } },
    })

    return NextResponse.json({
      success: true,
      data: {
        ...worksheet,
        submission: submission || null,
        submissionStatus: submission?.status || 'NOT_STARTED',
        isOverdue: isDuePassed && (!submission || submission.status === 'NOT_STARTED'),
        canSubmit: !isDuePassed || worksheet.allowLateSubmission,
        submissions: undefined,
      },
    })
  } catch (error) {
    console.error('Error fetching worksheet:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch worksheet' }, { status: 500 })
  }
}

// ============================================
// POST - Start or submit worksheet
// ============================================

export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ success: false, error: 'Authentication required' }, { status: 401 })
    }

    const body = await request.json()
    const action = body.action as 'start' | 'save' | 'submit'

    // Validate action
    if (!['start', 'save', 'submit'].includes(action)) {
      return NextResponse.json(
        { success: false, error: 'Invalid action. Must be start, save, or submit' },
        { status: 400 }
      )
    }

    // Get worksheet and check availability
    const worksheet = await prisma.worksheets.findUnique({
      where: { id },
      select: {
        id: true,
        status: true,
        dueDate: true,
        allowLateSubmission: true,
        maxMarks: true,
      },
    })

    if (!worksheet || worksheet.status !== 'PUBLISHED') {
      return NextResponse.json({ success: false, error: 'Worksheet not found' }, { status: 404 })
    }

    const now = new Date()
    const isDuePassed = worksheet.dueDate ? new Date(worksheet.dueDate) < now : false
    const canSubmit = !isDuePassed || worksheet.allowLateSubmission

    if (action === 'submit' && !canSubmit) {
      return NextResponse.json(
        { success: false, error: 'Submission deadline has passed' },
        { status: 400 }
      )
    }

    // Get or create submission
    let submission = await prisma.worksheet_submissions.findUnique({
      where: {
        worksheetId_studentId: {
          worksheetId: id,
          studentId: session.user.id,
        },
      },
    })

    if (action === 'start') {
      if (submission && submission.status !== 'NOT_STARTED') {
        return NextResponse.json({
          success: true,
          data: submission,
          message: 'Worksheet already started',
        })
      }

      // Create or update to IN_PROGRESS
      submission = await prisma.worksheet_submissions.upsert({
        where: {
          worksheetId_studentId: {
            worksheetId: id,
            studentId: session.user.id,
          },
        },
        update: {
          status: 'IN_PROGRESS',
          startedAt: submission?.startedAt || now,
        },
        create: {
          worksheetId: id,
          studentId: session.user.id,
          status: 'IN_PROGRESS',
          startedAt: now,
        },
      })

      return NextResponse.json({
        success: true,
        data: submission,
        message: 'Worksheet started',
      })
    }

    if (action === 'save') {
      if (!submission) {
        return NextResponse.json(
          { success: false, error: 'Please start the worksheet first' },
          { status: 400 }
        )
      }

      if (submission.status === 'SUBMITTED' || submission.status === 'GRADED') {
        return NextResponse.json(
          { success: false, error: 'Cannot modify submitted worksheet' },
          { status: 400 }
        )
      }

      // Calculate time spent
      const timeSpent = submission.startedAt
        ? Math.floor((now.getTime() - new Date(submission.startedAt).getTime()) / 1000 / 60)
        : 0

      submission = await prisma.worksheet_submissions.update({
        where: { id: submission.id },
        data: {
          answers: body.answers,
          attachments: body.attachments || [],
          timeSpent,
        },
      })

      return NextResponse.json({
        success: true,
        data: submission,
        message: 'Progress saved',
      })
    }

    if (action === 'submit') {
      if (!submission) {
        return NextResponse.json(
          { success: false, error: 'Please start the worksheet first' },
          { status: 400 }
        )
      }

      if (submission.status === 'SUBMITTED' || submission.status === 'GRADED') {
        return NextResponse.json(
          { success: false, error: 'Worksheet already submitted' },
          { status: 400 }
        )
      }

      // Calculate time spent
      const timeSpent = submission.startedAt
        ? Math.floor((now.getTime() - new Date(submission.startedAt).getTime()) / 1000 / 60)
        : 0

      submission = await prisma.worksheet_submissions.update({
        where: { id: submission.id },
        data: {
          status: 'SUBMITTED',
          answers: body.answers,
          attachments: body.attachments || [],
          submittedAt: now,
          isLate: isDuePassed,
          timeSpent,
        },
      })

      return NextResponse.json({
        success: true,
        data: submission,
        message: isDuePassed ? 'Worksheet submitted (late)' : 'Worksheet submitted successfully',
      })
    }

    return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Error processing worksheet action:', error)
    return NextResponse.json({ success: false, error: 'Failed to process action' }, { status: 500 })
  }
}
