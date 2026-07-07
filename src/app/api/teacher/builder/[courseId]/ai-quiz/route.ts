import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { SONNET } from '@/lib/ai/models'

/**
 * AI quiz generation for the course builder (TEACHER/ADMIN) — the
 * LearnWorlds/Thinkific "AI assessment" feature on our own stack.
 *
 * POST — draft MCQs from a chapter's content (chapter + topic titles):
 *        { chapterId, questionCount?, difficulty? } →
 *        { quiz: { questions: [{question, options[4], correctIndex, explanation, topic}] } }
 *        Nothing is persisted — the teacher reviews the draft first.
 * PUT  — apply a reviewed draft in one transaction:
 *        creates questions rows (verified, tagged to this chapter), a
 *        test_template scoped to that tag, and a TEST study_material lesson
 *        in the chapter. Students take it via the existing CBT flow.
 */

const MAX_QUESTIONS = 30

async function requireTeacher() {
  const session = await auth()
  const role = session?.user?.role
  if (!session || (role !== 'TEACHER' && role !== 'ADMIN')) return null
  return session
}

interface DraftQuestion {
  question: string
  options: string[]
  correctIndex: number
  explanation?: string
  topic?: string
}

function sanitizeQuiz(raw: unknown): DraftQuestion[] {
  const questions = (raw as { questions?: unknown })?.questions
  if (!Array.isArray(questions)) return []
  return questions
    .slice(0, MAX_QUESTIONS)
    .map((q) => {
      const item = q as {
        question?: unknown
        options?: unknown
        correctIndex?: unknown
        explanation?: unknown
        topic?: unknown
      }
      const question = (item.question || '').toString().trim().slice(0, 1000)
      const options = Array.isArray(item.options)
        ? item.options.map((o) => (o ?? '').toString().trim().slice(0, 300)).filter(Boolean)
        : []
      const correctIndex = Number(item.correctIndex)
      if (!question || options.length !== 4 || !(correctIndex >= 0 && correctIndex <= 3)) {
        return null
      }
      const out: DraftQuestion = {
        question,
        options,
        correctIndex,
        explanation: (item.explanation || '').toString().trim().slice(0, 1000) || undefined,
        topic: (item.topic || '').toString().trim().slice(0, 200) || undefined,
      }
      return out
    })
    .filter((q): q is DraftQuestion => q !== null)
}

const gradeFromClass = (cls: string | null | undefined) =>
  cls === 'CLASS_11' ? 'CLASS_11' : 'CLASS_12'

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  if (!(await requireTeacher())) {
    return NextResponse.json({ error: 'Unauthorized. Teacher access required.' }, { status: 401 })
  }
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { success: false, error: 'AI generation is not configured yet.' },
      { status: 503 }
    )
  }

  const { courseId } = await params
  const body = await req.json().catch(() => ({}))
  const chapterId = (body.chapterId || '').toString()
  const questionCount = Math.min(MAX_QUESTIONS, Math.max(3, Number(body.questionCount) || 10))
  const difficulty = ['EASY', 'MEDIUM', 'HARD'].includes(body.difficulty)
    ? (body.difficulty as string)
    : 'MEDIUM'

  const chapter = await prisma.chapters.findFirst({
    where: { id: chapterId, courseId },
    select: {
      title: true,
      description: true,
      topics: { where: { isActive: true }, select: { title: true }, orderBy: { orderIndex: 'asc' } },
      courses: { select: { name: true, class: true } },
    },
  })
  if (!chapter) {
    return NextResponse.json({ success: false, error: 'Chapter not found' }, { status: 404 })
  }

  try {
    const anthropic = new Anthropic({ apiKey })
    const message = await anthropic.messages.create({
      model: SONNET,
      max_tokens: 6000,
      system: `You are a NEET-Biology question setter for an Indian coaching academy.
Write NCERT-aligned multiple-choice questions as pure JSON — no prose, no markdown fences. Shape:
{"questions":[{"question":"…","options":["…","…","…","…"],"correctIndex":0,"explanation":"one-two lines","topic":"…"}]}
Rules: exactly ${questionCount} questions; difficulty ${difficulty}; exactly 4 options each;
exactly one correct option; distribute correctIndex evenly across 0-3; NEET exam style;
explanations teach the concept, not just restate the answer.`,
      messages: [
        {
          role: 'user',
          content: `Course: ${chapter.courses.name}
Chapter: ${chapter.title}${chapter.description ? `\nAbout: ${chapter.description}` : ''}
Topics covered: ${chapter.topics.map((t) => t.title).join(', ') || chapter.title}`,
        },
      ],
    })

    const text =
      message.content.find((b): b is Anthropic.TextBlock => b.type === 'text')?.text || ''
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      return NextResponse.json(
        { success: false, error: 'The AI returned an unexpected format — try again.' },
        { status: 502 }
      )
    }

    let parsed: unknown
    try {
      parsed = JSON.parse(jsonMatch[0])
    } catch {
      return NextResponse.json(
        { success: false, error: 'Could not parse the AI quiz — try again.' },
        { status: 502 }
      )
    }

    const questions = sanitizeQuiz(parsed)
    if (questions.length === 0) {
      return NextResponse.json(
        { success: false, error: 'The AI quiz was empty — try again.' },
        { status: 502 }
      )
    }

    return NextResponse.json({ success: true, quiz: { questions, difficulty } })
  } catch (error) {
    console.error('AI quiz generate error:', error)
    return NextResponse.json(
      { success: false, error: 'The AI question setter is busy — please try again.' },
      { status: 500 }
    )
  }
}

const applySchema = z.object({
  chapterId: z.string().min(1),
  title: z.string().max(200).optional(),
  timeLimit: z.number().min(5).max(180).optional(),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']).default('MEDIUM'),
  questions: z
    .array(
      z.object({
        question: z.string().min(5).max(1000),
        options: z.array(z.string().min(1).max(300)).length(4),
        correctIndex: z.number().min(0).max(3),
        explanation: z.string().max(1000).optional(),
        topic: z.string().max(200).optional(),
      })
    )
    .min(1)
    .max(MAX_QUESTIONS),
})

export async function PUT(req: NextRequest, { params }: { params: Promise<{ courseId: string }> }) {
  const session = await requireTeacher()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized. Teacher access required.' }, { status: 401 })
  }
  const { courseId } = await params

  const parsed = applySchema.safeParse(await req.json().catch(() => ({})))
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: 'Invalid quiz payload', details: parsed.error.issues },
      { status: 400 }
    )
  }
  const { chapterId, title, timeLimit, difficulty, questions } = parsed.data

  const chapter = await prisma.chapters.findFirst({
    where: { id: chapterId, courseId },
    select: { id: true, title: true, courses: { select: { class: true, name: true } } },
  })
  if (!chapter) {
    return NextResponse.json({ success: false, error: 'Chapter not found' }, { status: 404 })
  }

  const stamp = Date.now()
  // Unique topic tag scopes the CBT question pull to exactly this quiz.
  const topicTag = `${chapter.title} [quiz ${stamp.toString(36)}]`.slice(0, 190)
  const grade = gradeFromClass(chapter.courses.class)
  const letters = ['A', 'B', 'C', 'D'] as const

  try {
    const result = await prisma.$transaction(async (tx) => {
      for (let i = 0; i < questions.length; i++) {
        const q = questions[i]
        await tx.questions.create({
          data: {
            id: `q_${stamp}_${i}_${Math.random().toString(36).slice(2, 7)}`,
            topic: topicTag,
            subtopic: q.topic || null,
            curriculum: 'NEET',
            grade,
            type: 'MCQ',
            question: q.question,
            options: q.options,
            correctAnswer: letters[q.correctIndex],
            explanation: q.explanation || null,
            source: 'ai-quiz-builder',
            difficulty: difficulty as never,
            isActive: true,
            isVerified: true,
            verifiedBy: session.user.id,
            updatedAt: new Date(),
          },
        })
      }

      const template = await tx.test_templates.create({
        data: {
          id: `tt_${stamp}_${Math.random().toString(36).slice(2, 7)}`,
          title: title?.trim() || `${chapter.title} — Chapter Quiz`,
          description: `Auto-generated chapter quiz for ${chapter.courses.name} / ${chapter.title}`,
          slug: `quiz-${stamp}-${Math.random().toString(36).slice(2, 9)}`,
          type: 'PRACTICE_TEST',
          category: 'CHAPTER_WISE',
          difficulty: difficulty as never,
          timeLimit: timeLimit || Math.max(10, questions.length * 2),
          totalQuestions: questions.length,
          totalMarks: questions.length,
          curriculum: 'NEET',
          grade,
          subject: 'biology',
          topics: [topicTag],
          negativeMarking: false,
          isActive: true,
          isPublished: true,
          createdBy: session.user.id,
          updatedAt: new Date(),
        },
      })

      const material = await tx.study_materials.create({
        data: {
          id: `material_${stamp}_${Math.random().toString(36).slice(2)}`,
          title: template.title,
          materialType: 'TEST',
          testTemplateId: template.id,
          fileUrl: '',
          fileName: '',
          fileSize: 0,
          mimeType: 'application/x-test',
          courseId,
          chapterId,
          uploadedBy: session.user.id,
          accessLevel: 'ENROLLED',
          isPublished: true,
          publishedAt: new Date(),
          updatedAt: new Date(),
        },
      })

      return { templateId: template.id, materialId: material.id }
    })

    return NextResponse.json(
      { success: true, questionCount: questions.length, ...result },
      { status: 201 }
    )
  } catch (error) {
    console.error('AI quiz apply error:', error)
    return NextResponse.json({ success: false, error: 'Failed to save the quiz.' }, { status: 500 })
  }
}
