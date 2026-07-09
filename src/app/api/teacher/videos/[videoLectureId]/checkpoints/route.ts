import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

/**
 * Interactive-video checkpoints — teacher management (TEACHER/ADMIN).
 * GET    — list checkpoints for a lecture (with question preview).
 * POST   — add a checkpoint at { timeSeconds }, EITHER:
 *          { questionId }                       (attach a bank question), OR
 *          { newQuestion: { text, options[], correctAnswer, difficulty? } }
 *          (author a fresh in-video question; a questions row is created).
 * DELETE — remove ?checkpointId=…
 */

async function requireTeacher() {
  const session = await auth()
  const role = session?.user?.role
  if (!session || (role !== 'TEACHER' && role !== 'ADMIN')) return null
  return session
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ videoLectureId: string }> }
) {
  if (!(await requireTeacher())) {
    return NextResponse.json({ error: 'Unauthorized. Teacher access required.' }, { status: 401 })
  }
  const { videoLectureId } = await params
  const checkpoints = await prisma.video_checkpoints.findMany({
    where: { videoLectureId },
    orderBy: { timeSeconds: 'asc' },
    include: {
      questions: { select: { id: true, question: true, topic: true, difficulty: true } },
    },
  })
  return NextResponse.json({
    success: true,
    checkpoints: checkpoints.map((c) => ({
      id: c.id,
      timeSeconds: c.timeSeconds,
      isRequired: c.isRequired,
      question: {
        id: c.questions.id,
        text: c.questions.question,
        topic: c.questions.topic,
        difficulty: c.questions.difficulty,
      },
    })),
  })
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ videoLectureId: string }> }
) {
  if (!(await requireTeacher())) {
    return NextResponse.json({ error: 'Unauthorized. Teacher access required.' }, { status: 401 })
  }
  const { videoLectureId } = await params
  const session = await requireTeacher()
  const body = await req.json().catch(() => ({}))
  const timeSeconds = Number(body.timeSeconds)
  const isRequired = body.isRequired === undefined ? true : Boolean(body.isRequired)

  if (!Number.isFinite(timeSeconds) || timeSeconds < 0) {
    return NextResponse.json({ success: false, error: 'timeSeconds is required' }, { status: 400 })
  }

  const lecture = await prisma.video_lectures.findUnique({
    where: { id: videoLectureId },
    select: { id: true, title: true },
  })
  if (!lecture) {
    return NextResponse.json({ success: false, error: 'Video lecture not found' }, { status: 404 })
  }

  // Resolve the questionId — either an existing bank question, or author a new
  // one inline from { newQuestion: { text, options[], correctAnswer, difficulty } }.
  let questionId = (body.questionId || '').toString()

  if (!questionId && body.newQuestion) {
    const nq = body.newQuestion as {
      text?: string
      options?: string[]
      correctAnswer?: string
      difficulty?: string
    }
    const text = (nq.text || '').trim()
    const options = Array.isArray(nq.options) ? nq.options.map((o) => String(o).trim()) : []
    const answer = (nq.correctAnswer || '').trim().toUpperCase()
    const difficulty = ['EASY', 'MEDIUM', 'HARD'].includes((nq.difficulty || '').toUpperCase())
      ? (nq.difficulty as string).toUpperCase()
      : 'MEDIUM'
    if (text.length < 3 || options.length < 2 || options.some((o) => !o)) {
      return NextResponse.json(
        { success: false, error: 'A question and at least two non-empty options are required' },
        { status: 400 }
      )
    }
    if (!['A', 'B', 'C', 'D'].includes(answer) || 'ABCD'.indexOf(answer) >= options.length) {
      return NextResponse.json(
        { success: false, error: 'Pick which option is correct' },
        { status: 400 }
      )
    }
    const created = await prisma.questions.create({
      data: {
        id: `vcpq_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
        topic: `In-video: ${lecture.title}`.slice(0, 190),
        subtopic: 'video checkpoint',
        curriculum: 'NEET',
        grade: 'all',
        type: 'MCQ',
        question: text,
        options,
        correctAnswer: answer,
        source: 'video-checkpoint',
        difficulty: difficulty as never,
        isActive: true,
        isVerified: true,
        verifiedBy: session?.user?.id,
        updatedAt: new Date(),
      },
      select: { id: true },
    })
    questionId = created.id
  }

  if (!questionId) {
    return NextResponse.json(
      { success: false, error: 'Provide a question (from the bank or a new one)' },
      { status: 400 }
    )
  }

  const question = await prisma.questions.findUnique({
    where: { id: questionId },
    select: { id: true },
  })
  if (!question) {
    return NextResponse.json({ success: false, error: 'Question not found' }, { status: 404 })
  }

  try {
    const checkpoint = await prisma.video_checkpoints.create({
      data: {
        id: `vcp_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
        videoLectureId,
        questionId,
        timeSeconds: Math.round(timeSeconds),
        isRequired,
      },
    })
    return NextResponse.json({ success: true, checkpoint }, { status: 201 })
  } catch (e: unknown) {
    if ((e as { code?: string })?.code === 'P2002') {
      return NextResponse.json(
        { success: false, error: 'A checkpoint already exists at that timestamp' },
        { status: 409 }
      )
    }
    throw e
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ videoLectureId: string }> }
) {
  if (!(await requireTeacher())) {
    return NextResponse.json({ error: 'Unauthorized. Teacher access required.' }, { status: 401 })
  }
  const { videoLectureId } = await params
  const checkpointId = new URL(req.url).searchParams.get('checkpointId')
  if (!checkpointId) {
    return NextResponse.json({ success: false, error: 'checkpointId required' }, { status: 400 })
  }
  await prisma.video_checkpoints.deleteMany({ where: { id: checkpointId, videoLectureId } })
  return NextResponse.json({ success: true })
}
