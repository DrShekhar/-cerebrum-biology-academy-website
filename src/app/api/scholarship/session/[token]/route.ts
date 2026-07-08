import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import {
  isWindowOpen,
  selectScholarshipQuestions,
  loadPaperQuestions,
  toClientQuestions,
} from '@/lib/scholarship/scholarshipTest'

export const dynamic = 'force-dynamic'

/**
 * GET /api/scholarship/session/[token] — start or resume the exam. On first
 * call, selects and freezes the paper (ordered question ids) so resume shows
 * the same questions. Never returns correct answers to the client.
 */
export async function GET(_request: NextRequest, context: { params: Promise<{ token: string }> }) {
  try {
    const { token } = await context.params
    const registration = await prisma.scholarship_registrations.findUnique({
      where: { token },
      include: { test: true },
    })
    if (!registration) {
      return NextResponse.json({ success: false, error: 'Invalid exam link.' }, { status: 404 })
    }
    if (registration.status === 'COMPLETED') {
      return NextResponse.json({ success: true, data: { completed: true } })
    }
    if (!registration.test.isActive || !isWindowOpen(registration.test)) {
      return NextResponse.json(
        { success: false, error: 'The exam window is closed.' },
        { status: 400 }
      )
    }

    let paperIds = (registration.paper as string[] | null) || null
    if (!paperIds || paperIds.length === 0) {
      const questions = await selectScholarshipQuestions(
        registration.test.questionCount,
        registration.classLevel
      )
      if (questions.length < Math.min(10, registration.test.questionCount)) {
        return NextResponse.json(
          { success: false, error: 'The exam is not ready yet. Please try again later.' },
          { status: 503 }
        )
      }
      paperIds = questions.map((q) => q.id)
      await prisma.scholarship_registrations.update({
        where: { id: registration.id },
        data: {
          paper: paperIds,
          status: 'STARTED',
          startedAt: registration.startedAt || new Date(),
        },
      })
      return NextResponse.json({
        success: true,
        data: {
          testName: registration.test.name,
          studentName: registration.studentName,
          durationMin: registration.test.durationMin,
          questions: toClientQuestions(questions),
          savedState: null,
        },
      })
    }

    const questions = await loadPaperQuestions(paperIds)
    return NextResponse.json({
      success: true,
      data: {
        testName: registration.test.name,
        studentName: registration.studentName,
        durationMin: registration.test.durationMin,
        questions: toClientQuestions(questions),
        savedState: registration.answerState || null,
      },
    })
  } catch (error) {
    console.error('[scholarship/session] GET failed:', error)
    return NextResponse.json({ success: false, error: 'Could not load the exam.' }, { status: 500 })
  }
}

/** PATCH — autosave progress (answers/marks/timer/proctor events). */
export async function PATCH(request: NextRequest, context: { params: Promise<{ token: string }> }) {
  try {
    const { token } = await context.params
    const body = await request.json().catch(() => null)
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ success: false, error: 'Invalid state' }, { status: 400 })
    }
    const registration = await prisma.scholarship_registrations.findUnique({
      where: { token },
      select: { id: true, status: true },
    })
    if (!registration || registration.status === 'COMPLETED') {
      return NextResponse.json({ success: false, error: 'Not available' }, { status: 400 })
    }
    // Cap stored proctor events defensively.
    const suspicious = Array.isArray(body.suspiciousActivity)
      ? body.suspiciousActivity.slice(0, 200)
      : undefined
    await prisma.scholarship_registrations.update({
      where: { id: registration.id },
      data: {
        answerState: {
          answers: body.answers || {},
          marked: body.marked || [],
          visited: body.visited || [],
          currentIndex: body.currentIndex || 0,
          remainingTime: body.remainingTime ?? null,
          tabSwitchCount: body.tabSwitchCount || 0,
          fullscreenExits: body.fullscreenExits || 0,
        },
        ...(suspicious ? { suspicious } : {}),
      },
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[scholarship/session] PATCH failed:', error)
    return NextResponse.json({ success: false, error: 'Autosave failed' }, { status: 500 })
  }
}
