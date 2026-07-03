import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

/**
 * Interactive-video checkpoints — teacher management (TEACHER/ADMIN).
 * GET    — list checkpoints for a lecture (with question preview).
 * POST   — add { timeSeconds, questionId } (question from the bank).
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
  const body = await req.json().catch(() => ({}))
  const timeSeconds = Number(body.timeSeconds)
  const questionId = (body.questionId || '').toString()

  if (!Number.isFinite(timeSeconds) || timeSeconds < 0 || !questionId) {
    return NextResponse.json(
      { success: false, error: 'timeSeconds and questionId are required' },
      { status: 400 }
    )
  }

  const [lecture, question] = await Promise.all([
    prisma.video_lectures.findUnique({ where: { id: videoLectureId }, select: { id: true } }),
    prisma.questions.findUnique({ where: { id: questionId }, select: { id: true } }),
  ])
  if (!lecture) {
    return NextResponse.json({ success: false, error: 'Video lecture not found' }, { status: 404 })
  }
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
        isRequired: body.isRequired === undefined ? true : Boolean(body.isRequired),
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
