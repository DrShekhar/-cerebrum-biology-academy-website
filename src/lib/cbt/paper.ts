import { prisma } from '@/lib/prisma'

/**
 * CBT NEET-paper assembly + scoring helpers.
 *
 * Serves a fixed, purpose-authored 180-question / 720-mark NEET-pattern full
 * mock — 45 Physics + 45 Chemistry + 45 Botany + 45 Zoology — tagged with
 * NEET_MOCK_SOURCE (NOT drawn from the general Biology question bank), keyed to
 * a canonical test_templates row. Correct answers NEVER leave the server — the
 * client receives options only, and scoring happens on submit.
 */

export const NEET_TEMPLATE_SLUG = 'neet-full-mock'
export const PAPER_SIZE = 180
export const CORRECT_MARKS = 4
export const NEGATIVE_MARKS = 1
export const DURATION_MIN = 180

export type SectionKey = 'physics' | 'chemistry' | 'botany' | 'zoology'

/**
 * Real NEET-UG blueprint: 45 Physics + 45 Chemistry + 45 Botany + 45 Zoology
 * = 180 questions / 720 marks. Physics & Chemistry come from their own tagged
 * questions in the bank; Botany & Zoology are classified out of the (untagged)
 * Biology bank by topic.
 */
export const SECTION_BLUEPRINT: { key: SectionKey; count: number }[] = [
  { key: 'physics', count: 45 },
  { key: 'chemistry', count: 45 },
  { key: 'botany', count: 45 },
  { key: 'zoology', count: 45 },
]

export interface ClientQuestion {
  id: string
  questionText: string
  questionImage?: string
  options: { id: string; text: string }[]
  correctAnswer: '' // always blank client-side
  difficulty: 'easy' | 'medium' | 'hard'
  topic: string
  subtopic: string
  subject: SectionKey
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
  questionImage: string | null
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
  const subject = resolveSection(q.id, q.topic, q.subject)
  return {
    id: q.id,
    questionText: q.question,
    questionImage: q.questionImage || q.explanationImage || undefined,
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
      title: 'NEET Full Mock (CBT)',
      description:
        '180-question, 720-mark NEET-pattern full mock — 45 Physics, 45 Chemistry, 45 Botany, 45 Zoology — in CBT exam mode.',
      slug: NEET_TEMPLATE_SLUG,
      type: 'MOCK_TEST',
      category: 'FULL_SYLLABUS',
      timeLimit: DURATION_MIN,
      totalQuestions: PAPER_SIZE,
      totalMarks: PAPER_SIZE * CORRECT_MARKS,
      curriculum: 'NEET',
      grade: 'all',
      subject: 'mixed',
      topics: [],
      negativeMarking: true,
      markingScheme: { correct: CORRECT_MARKS, incorrect: -NEGATIVE_MARKS, unattempted: 0 },
      instructions: [
        'NEET-pattern full mock — 180 questions (45 Physics, 45 Chemistry, 45 Botany, 45 Zoology), 720 marks, 3 hours.',
        'Each correct answer +4, each wrong answer −1, unattempted 0.',
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

/** Source tag on the fresh, purpose-authored NEET mock questions (NOT the
 *  general Biology bank) — the paper is served exclusively from these. */
export const NEET_MOCK_SOURCE = 'CEREBRUM_NEET_MOCK_2026_01'

/** Resolve a question to its NEET section from its subject tag. The authored
 *  paper tags every question physics/chemistry/botany/zoology, so this is a
 *  pure lookup — identical on fresh paper, resume and review. */
export function resolveSection(_id: string, _topic: string, subject: string): SectionKey {
  const s = (subject || '').toLowerCase()
  if (s === 'physics' || s === 'chemistry' || s === 'zoology') return s
  return 'botany'
}

function sectionRank(subject: string): number {
  const i = SECTION_BLUEPRINT.findIndex((b) => b.key === (subject || '').toLowerCase())
  return i < 0 ? SECTION_BLUEPRINT.length : i
}

/**
 * Assemble the NEET full mock: the 180 purpose-authored questions (45 Physics +
 * 45 Chemistry + 45 Botany + 45 Zoology), ordered Physics → Chemistry → Botany
 * → Zoology, then by id within a section. This is a fixed curated paper — it is
 * NOT drawn from the general Biology question bank. Returns [] (→ 503) until the
 * paper has been seeded.
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
    questionImage: true,
  }

  const rows = (await prisma.questions.findMany({
    where: { isActive: true, source: NEET_MOCK_SOURCE },
    select,
  })) as DbQuestion[]

  return rows.sort((a, b) => {
    const ra = sectionRank(a.subject)
    const rb = sectionRank(b.subject)
    if (ra !== rb) return ra - rb
    return a.id.localeCompare(b.id)
  })
}
