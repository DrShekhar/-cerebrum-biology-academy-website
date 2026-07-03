import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { SONNET } from '@/lib/ai/models'

/**
 * AI course-outline generation for the course builder (TEACHER/ADMIN).
 *
 * POST — generate a draft outline from a prompt:
 *        { prompt?, chapterCount? } → { outline: { chapters: [{title, description, topics}] } }
 *        Nothing is persisted — the teacher reviews the draft in the builder.
 * PUT  — apply a reviewed outline: creates the chapters + topics in one
 *        transaction, appended after any existing chapters (drip/prerequisites
 *        can then be set per chapter in the builder).
 */

const MAX_CHAPTERS = 30
const MAX_TOPICS = 15

interface OutlineChapter {
  title: string
  description?: string
  topics: string[]
}

async function requireTeacher() {
  const session = await auth()
  const role = session?.user?.role
  if (!session || (role !== 'TEACHER' && role !== 'ADMIN')) return null
  return session
}

function sanitizeOutline(raw: unknown): OutlineChapter[] {
  const chapters = (raw as { chapters?: unknown })?.chapters
  if (!Array.isArray(chapters)) return []
  return chapters
    .slice(0, MAX_CHAPTERS)
    .map((c) => {
      const ch = c as { title?: unknown; description?: unknown; topics?: unknown }
      const title = (ch.title || '').toString().trim().slice(0, 200)
      if (!title) return null
      const topics = Array.isArray(ch.topics)
        ? ch.topics
            .slice(0, MAX_TOPICS)
            .map((t) => (typeof t === 'string' ? t : (t as { title?: string })?.title || ''))
            .map((t) => t.toString().trim().slice(0, 200))
            .filter(Boolean)
        : []
      const out: OutlineChapter = {
        title,
        description: (ch.description || '').toString().trim().slice(0, 500) || undefined,
        topics,
      }
      return out
    })
    .filter((c): c is OutlineChapter => c !== null)
}

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
  const course = await prisma.courses.findUnique({
    where: { id: courseId },
    select: { name: true, description: true, type: true, class: true },
  })
  if (!course) {
    return NextResponse.json({ success: false, error: 'Course not found' }, { status: 404 })
  }

  const body = await req.json().catch(() => ({}))
  const prompt: string = (body.prompt || '').toString().trim().slice(0, 2000)
  const chapterCount = Math.min(MAX_CHAPTERS, Math.max(3, Number(body.chapterCount) || 10))

  try {
    const anthropic = new Anthropic({ apiKey })
    const message = await anthropic.messages.create({
      model: SONNET,
      max_tokens: 3000,
      system: `You are a NEET-Biology curriculum designer for an Indian coaching academy.
Design a course outline as pure JSON — no prose, no markdown fences. Shape:
{"chapters":[{"title":"…","description":"one line","topics":["…","…"]}]}
Rules: about ${chapterCount} chapters unless the syllabus clearly needs fewer; 3–8 topics per
chapter; NCERT-aligned terminology; order chapters pedagogically (foundations first).`,
      messages: [
        {
          role: 'user',
          content: `Course: ${course.name}${course.class ? ` (Class ${course.class})` : ''}${
            course.description ? `\nAbout: ${course.description}` : ''
          }${prompt ? `\nTeacher's instructions: ${prompt}` : ''}`,
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
        { success: false, error: 'Could not parse the AI outline — try again.' },
        { status: 502 }
      )
    }

    const chapters = sanitizeOutline(parsed)
    if (chapters.length === 0) {
      return NextResponse.json(
        { success: false, error: 'The AI outline was empty — try a more specific prompt.' },
        { status: 502 }
      )
    }

    return NextResponse.json({ success: true, outline: { chapters } })
  } catch (error) {
    console.error('AI outline generate error:', error)
    return NextResponse.json(
      { success: false, error: 'The AI designer is busy — please try again.' },
      { status: 500 }
    )
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ courseId: string }> }) {
  if (!(await requireTeacher())) {
    return NextResponse.json({ error: 'Unauthorized. Teacher access required.' }, { status: 401 })
  }
  const { courseId } = await params
  const course = await prisma.courses.findUnique({ where: { id: courseId }, select: { id: true } })
  if (!course) {
    return NextResponse.json({ success: false, error: 'Course not found' }, { status: 404 })
  }

  const body = await req.json().catch(() => ({}))
  const chapters = sanitizeOutline(body.outline ?? body)
  if (chapters.length === 0) {
    return NextResponse.json(
      { success: false, error: 'No valid chapters to apply.' },
      { status: 400 }
    )
  }

  // Append after existing chapters so applying an outline never reorders prior work.
  const last = await prisma.chapters.findFirst({
    where: { courseId },
    orderBy: { orderIndex: 'desc' },
    select: { orderIndex: true },
  })
  let nextIndex = (last?.orderIndex ?? -1) + 1
  const stamp = Date.now()

  try {
    const created = await prisma.$transaction(async (tx) => {
      let chapterCount = 0
      let topicCount = 0
      for (let ci = 0; ci < chapters.length; ci++) {
        const ch = chapters[ci]
        const chapterId = `ch_${stamp}_${ci}_${Math.random().toString(36).slice(2, 7)}`
        await tx.chapters.create({
          data: {
            id: chapterId,
            courseId,
            title: ch.title,
            description: ch.description || null,
            orderIndex: nextIndex++,
            updatedAt: new Date(),
          },
        })
        chapterCount++
        for (let ti = 0; ti < ch.topics.length; ti++) {
          await tx.topics.create({
            data: {
              id: `tp_${stamp}_${ci}_${ti}_${Math.random().toString(36).slice(2, 7)}`,
              chapterId,
              title: ch.topics[ti],
              orderIndex: ti,
              updatedAt: new Date(),
            },
          })
          topicCount++
        }
      }
      return { chapterCount, topicCount }
    })

    return NextResponse.json({ success: true, ...created })
  } catch (error) {
    console.error('AI outline apply error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to apply the outline.' },
      { status: 500 }
    )
  }
}
