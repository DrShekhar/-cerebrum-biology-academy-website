import { prisma } from '@/lib/prisma'

/**
 * CBT NEET-paper assembly + scoring helpers.
 *
 * Builds a 180-question / 720-mark NEET-pattern Biology full mock (90 Botany +
 * 90 Zoology) from the live question bank, keyed to a canonical test_templates
 * row. Correct answers NEVER leave the
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
  // Section is a pure function of the question (resolveSection), so it lands in
  // the SAME tab on the fresh paper, on resume and in review — even though the
  // DB row is tagged only "biology".
  const subject = resolveSection(q.id, q.topic, q.subject)
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
    subject,
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
      description:
        '180-question, 720-mark NEET-pattern Biology full mock (90 Botany + 90 Zoology) in CBT exam mode.',
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
        'NEET-pattern Biology full mock — 180 questions (90 Botany + 90 Zoology), 720 marks, 3 hours.',
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

// Topic keywords that place a Biology question in the NEET Botany vs Zoology
// section (the bank is ~99.9% tagged only "biology", so section is derived).
const BOTANY_HINTS = [
  'plant',
  'botany',
  'flower',
  'photosynth',
  'mineral nutrition',
  'transport in plant',
  'respiration in plant',
  'morphology of flowering',
  'anatomy of flowering',
  'plant growth',
  'plant kingdom',
  'seed',
  'root',
  'transpiration',
  'food production',
]
const ZOOLOGY_HINTS = [
  'human',
  'animal',
  'zoology',
  'digestion',
  'circulation',
  'body fluid',
  'breathing',
  'exchange of gases',
  'excret',
  'neural',
  'locomotion',
  'movement',
  'health and disease',
  'chemical coordination',
  'endocrine',
  'reproduction in organism',
]

/** Stable 0/1 from an id — splits cross-cutting topics evenly & deterministically. */
function idBit(id: string): number {
  let h = 0
  for (let i = 0; i < id.length; i++) h = (h + id.charCodeAt(i)) % 2
  return h
}

/**
 * Resolve a question to Botany or Zoology — DETERMINISTIC and pure, so the
 * same question lands in the same section on the fresh paper, on resume, and
 * in review (the session stores only ids, everything else re-derives). Tagged
 * subject wins; else topic hints; else a stable id-hash splits cross-cutting
 * topics (genetics/cell/ecology/biotech) evenly between the two sections.
 */
export function resolveSection(id: string, topic: string, subject: string): 'botany' | 'zoology' {
  const s = (subject || '').toLowerCase()
  if (s === 'botany' || s === 'zoology') return s
  const t = (topic || '').toLowerCase()
  if (BOTANY_HINTS.some((h) => t.includes(h))) return 'botany'
  if (ZOOLOGY_HINTS.some((h) => t.includes(h))) return 'zoology'
  return idBit(id) === 0 ? 'botany' : 'zoology'
}

function shuffle<T>(a: T[]): T[] {
  const arr = [...a]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

/**
 * Select a fresh 180-question NEET-pattern paper: 90 Botany + 90 Zoology,
 * classified from the bank by topic. Each selected row's `subject` is set to
 * its resolved section so the exam UI groups it into the right tab/palette.
 * Returns the ordered questions (Botany first, then Zoology).
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
  const half = PAPER_SIZE / 2 // 90 per section

  // Pull a large, varied pool (bank is ~19.6k biology). Cap keeps it cheap;
  // the shuffle below makes every attempt a different paper.
  const raw = (await prisma.questions.findMany({
    where: { isActive: true },
    select,
    take: 2000,
  })) as DbQuestion[]
  // Only usable MCQs: at least two parseable options (options is Json?).
  const pool = raw.filter((q) => parseOptions(q.options).length >= 2)

  // Deterministic section per question — matches toClientQuestion exactly, so
  // fresh/resume/review always agree on which tab each question is in.
  const botany: DbQuestion[] = []
  const zoology: DbQuestion[] = []
  for (const q of shuffle(pool)) {
    if (resolveSection(q.id, q.topic, q.subject) === 'botany') botany.push(q)
    else zoology.push(q)
  }

  // 90 + 90. If one side is thin (tiny dev bank only), the paper still reaches
  // 180 by borrowing from the other side; in prod both pools far exceed 90.
  const botanySection = botany.slice(0, half)
  const zoologySection = zoology.slice(0, half)
  let picked = [...botanySection, ...zoologySection]
  if (picked.length < PAPER_SIZE) {
    const have = new Set(picked.map((q) => q.id))
    const filler = [...botany.slice(half), ...zoology.slice(half)].filter((q) => !have.has(q.id))
    picked = [...picked, ...shuffle(filler)].slice(0, PAPER_SIZE)
  }

  // Botany section first, then Zoology (standard NEET Biology order).
  picked.sort(
    (a, b) =>
      (resolveSection(a.id, a.topic, a.subject) === 'botany' ? 0 : 1) -
      (resolveSection(b.id, b.topic, b.subject) === 'botany' ? 0 : 1)
  )
  return picked
}
