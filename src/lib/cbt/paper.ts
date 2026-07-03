import { prisma } from '@/lib/prisma'

/**
 * CBT NEET-paper assembly + scoring helpers.
 *
 * Builds a 180-question / 720-mark NEET Biology full mock from the live question
 * bank, keyed to a canonical test_templates row. Correct answers NEVER leave the
 * server — the client receives options only, and scoring happens on submit.
 */

export const NEET_TEMPLATE_SLUG = 'neet-biology-full-mock'
export const PAPER_SIZE = 180
export const CORRECT_MARKS = 4
export const NEGATIVE_MARKS = 1
export const DURATION_MIN = 180

export interface ClientQuestion {
  id: string
  questionText: string
  questionImage?: string
  options: { id: string; text: string }[]
  correctAnswer: '' // always blank client-side
  difficulty: 'easy' | 'medium' | 'hard'
  topic: string
  subtopic: string
  subject: 'biology' | 'botany' | 'zoology'
  marks: number
  timeAllocated: number
  keywords: string[]
  relatedConcepts: string[]
  explanation: string
}

function letter(i: number): string {
  return String.fromCharCode(65 + i)
}

function parseOptions(raw: unknown): string[] {
  if (Array.isArray(raw)) return raw.map((o) => String(o))
  if (typeof raw === 'string') {
    try {
      const p = JSON.parse(raw)
      return Array.isArray(p) ? p.map((o) => String(o)) : []
    } catch {
      return []
    }
  }
  return []
}

type DbQuestion = {
  id: string
  question: string
  options: unknown
  correctAnswer: string
  subject: string
  topic: string
  marks: number
  difficulty: string
  explanationImage: string | null
}

/** Server-side: which option LETTER is correct for this question. */
export function correctLetter(q: DbQuestion): string {
  const opts = parseOptions(q.options)
  const raw = (q.correctAnswer || '').trim()
  if (/^[A-Za-z]$/.test(raw)) return raw.toUpperCase()
  const idx = opts.findIndex((o) => o.trim().toLowerCase() === raw.toLowerCase())
  return idx >= 0 ? letter(idx) : ''
}

/** Map a DB question to the client shape (no correct answer). */
export function toClientQuestion(q: DbQuestion): ClientQuestion {
  const opts = parseOptions(q.options)
  const subj = (q.subject || 'biology').toLowerCase()
  return {
    id: q.id,
    questionText: q.question,
    questionImage: q.explanationImage || undefined,
    options: opts.map((text, i) => ({ id: letter(i), text })),
    correctAnswer: '',
    difficulty: (['easy', 'medium', 'hard'].includes(q.difficulty?.toLowerCase())
      ? q.difficulty.toLowerCase()
      : 'medium') as 'easy' | 'medium' | 'hard',
    topic: q.topic || '',
    subtopic: '',
    subject: (subj === 'botany' || subj === 'zoology' ? subj : 'biology') as
      | 'biology'
      | 'botany'
      | 'zoology',
    marks: CORRECT_MARKS,
    timeAllocated: 60,
    keywords: [],
    relatedConcepts: [],
    explanation: '',
  }
}

/** Ensure the canonical NEET full-mock template row exists; return its id. */
export async function ensureNeetTemplate(): Promise<string> {
  const existing = await prisma.test_templates.findUnique({
    where: { slug: NEET_TEMPLATE_SLUG },
    select: { id: true },
  })
  if (existing) return existing.id

  const created = await prisma.test_templates.create({
    data: {
      id: `tmpl_${NEET_TEMPLATE_SLUG}`,
      title: 'NEET Biology Full Mock (CBT)',
      description: '180-question, 720-mark NEET-pattern Biology full mock in CBT exam mode.',
      slug: NEET_TEMPLATE_SLUG,
      type: 'MOCK_TEST',
      category: 'FULL_SYLLABUS',
      timeLimit: DURATION_MIN,
      totalQuestions: PAPER_SIZE,
      totalMarks: PAPER_SIZE * CORRECT_MARKS,
      curriculum: 'NEET',
      grade: 'all',
      subject: 'biology',
      topics: [],
      negativeMarking: true,
      markingScheme: { correct: CORRECT_MARKS, incorrect: -NEGATIVE_MARKS, unattempted: 0 },
      instructions: [
        'This is a NEET-pattern full mock in computer-based-test mode.',
        'Do not switch tabs or exit full-screen — such events are recorded.',
      ],
      isActive: true,
      isPublished: true,
      publishedAt: new Date(),
      updatedAt: new Date(),
    },
  })
  return created.id
}

/**
 * Select a fresh 180-question NEET paper from the bank. Prefers a Botany/Zoology
 * split; falls back to general biology when subjects aren't tagged. Returns the
 * ordered questions (grouped by subject) — DB rows, not yet client-adapted.
 */
export async function selectPaperQuestions(): Promise<DbQuestion[]> {
  const select = {
    id: true,
    question: true,
    options: true,
    correctAnswer: true,
    subject: true,
    topic: true,
    marks: true,
    difficulty: true,
    explanationImage: true,
  }
  const [botany, zoology] = await Promise.all([
    prisma.questions.findMany({
      where: { isActive: true, subject: { equals: 'botany', mode: 'insensitive' } },
      select,
      take: 400,
    }),
    prisma.questions.findMany({
      where: { isActive: true, subject: { equals: 'zoology', mode: 'insensitive' } },
      select,
      take: 400,
    }),
  ])

  const shuffle = <T>(a: T[]): T[] => {
    const arr = [...a]
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  }

  const half = PAPER_SIZE / 2
  let picked: DbQuestion[] = [
    ...shuffle(botany as DbQuestion[]).slice(0, half),
    ...shuffle(zoology as DbQuestion[]).slice(0, half),
  ]

  // Fallback: not enough tagged botany/zoology — top up from general biology.
  if (picked.length < PAPER_SIZE) {
    const have = new Set(picked.map((q) => q.id))
    const more = await prisma.questions.findMany({
      where: { isActive: true, id: { notIn: [...have] } },
      select,
      take: PAPER_SIZE * 2,
    })
    picked = [...picked, ...shuffle(more as DbQuestion[])].slice(0, PAPER_SIZE)
  }

  // Group by subject so sections/palette are contiguous.
  const order = ['botany', 'zoology', 'biology']
  picked.sort(
    (a, b) =>
      order.indexOf((a.subject || 'biology').toLowerCase()) -
      order.indexOf((b.subject || 'biology').toLowerCase())
  )
  return picked
}
