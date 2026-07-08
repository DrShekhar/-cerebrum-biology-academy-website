/**
 * Cerebrum Scholarship Test (CST) — the ANTHE/NSAT-style lead machine
 * (PLATFORM_VISION §3.1). Reuses the CBT engine's question adaptation +
 * scoring; adds config, paper selection sized by config, and waiver bands.
 *
 * Design notes:
 * - No account required: registrations are keyed by an unguessable token.
 * - "Everyone wins a tier": the lowest band grants a floor waiver so every
 *   completed attempt produces a concrete counselor hook.
 * - Bands/duration/window are admin-editable on the scholarship_tests row.
 */

import crypto from 'crypto'
import { prisma } from '@/lib/prisma'
import { correctLetter, toClientQuestion, type ClientQuestion } from '@/lib/cbt/paper'

export const DEFAULT_SLUG = 'cerebrum-scholarship-test'
export const CORRECT_MARKS = 4
export const NEGATIVE_MARKS = 1

export interface WaiverBand {
  minPercent: number
  waiverPercent: number
}

/** Sorted high→low; the last band is the "everyone wins" floor. */
export const DEFAULT_WAIVER_BANDS: WaiverBand[] = [
  { minPercent: 85, waiverPercent: 90 },
  { minPercent: 70, waiverPercent: 75 },
  { minPercent: 55, waiverPercent: 50 },
  { minPercent: 40, waiverPercent: 25 },
  { minPercent: 0, waiverPercent: 10 },
]

export const CLASS_LEVELS = ['CLASS_11', 'CLASS_12', 'DROPPER'] as const
export type ScholarshipClassLevel = (typeof CLASS_LEVELS)[number]

/** Get (or lazily create) the default scholarship test config row. */
export async function ensureDefaultScholarshipTest() {
  const existing = await prisma.scholarship_tests.findUnique({
    where: { slug: DEFAULT_SLUG },
  })
  if (existing) return existing
  return prisma.scholarship_tests.create({
    data: {
      slug: DEFAULT_SLUG,
      name: 'Cerebrum Scholarship Test (CST)',
      isActive: true,
      questionCount: 45,
      durationMin: 60,
      waiverBands: DEFAULT_WAIVER_BANDS as unknown as object,
    },
  })
}

export function parseBands(raw: unknown): WaiverBand[] {
  if (!Array.isArray(raw)) return DEFAULT_WAIVER_BANDS
  const bands = raw
    .filter(
      (b): b is WaiverBand =>
        !!b && typeof b.minPercent === 'number' && typeof b.waiverPercent === 'number'
    )
    .sort((a, b) => b.minPercent - a.minPercent)
  return bands.length ? bands : DEFAULT_WAIVER_BANDS
}

export function computeWaiver(percent: number, bands: WaiverBand[]): number {
  for (const band of bands) {
    if (percent >= band.minPercent) return band.waiverPercent
  }
  return 0
}

/** Exam window check. Null bounds = always open (until owner sets dates). */
export function isWindowOpen(test: { windowStartAt: Date | null; windowEndAt: Date | null }) {
  const now = Date.now()
  if (test.windowStartAt && now < test.windowStartAt.getTime()) return false
  if (test.windowEndAt && now > test.windowEndAt.getTime()) return false
  return true
}

const QUESTION_SELECT = {
  id: true,
  question: true,
  options: true,
  correctAnswer: true,
  subject: true,
  topic: true,
  marks: true,
  difficulty: true,
  explanationImage: true,
} as const

type DbQuestion = Parameters<typeof correctLetter>[0]

function shuffle<T>(a: T[]): T[] {
  const arr = [...a]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

/**
 * Select a fresh scholarship paper from the bank, biased to the taker's class
 * level (grade 11 for CLASS_11, grade 12 for CLASS_12, mixed for DROPPER),
 * topped up from the general biology pool when the graded pool is thin.
 */
export async function selectScholarshipQuestions(
  count: number,
  classLevel: string
): Promise<DbQuestion[]> {
  const grades =
    classLevel === 'CLASS_11' ? ['11'] : classLevel === 'CLASS_12' ? ['12'] : ['11', '12']

  const graded = await prisma.questions.findMany({
    where: { isActive: true, grade: { in: grades } },
    select: QUESTION_SELECT,
    take: count * 6,
  })

  let pool: DbQuestion[] = graded as DbQuestion[]
  if (pool.length < count) {
    const filler = await prisma.questions.findMany({
      where: { isActive: true, id: { notIn: pool.map((q) => q.id) } },
      select: QUESTION_SELECT,
      take: count * 4,
    })
    pool = pool.concat(filler as DbQuestion[])
  }

  return shuffle(pool).slice(0, count)
}

/** Load a stored paper (ordered ids) back into DB rows, order-preserved. */
export async function loadPaperQuestions(ids: string[]): Promise<DbQuestion[]> {
  const rows = await prisma.questions.findMany({
    where: { id: { in: ids } },
    select: QUESTION_SELECT,
  })
  const byId = new Map(rows.map((r) => [r.id, r as DbQuestion]))
  return ids.map((id) => byId.get(id)).filter((q): q is DbQuestion => !!q)
}

export function toClientQuestions(questions: DbQuestion[]): ClientQuestion[] {
  return questions.map((q) => toClientQuestion(q))
}

export interface ScholarshipScore {
  correct: number
  incorrect: number
  unattempted: number
  score: number
  maxScore: number
  percent: number
}

/** Server-side scoring: +4 / −1, unattempted 0. */
export function scoreAnswers(
  questions: DbQuestion[],
  answers: Record<string, string>
): ScholarshipScore {
  let correct = 0
  let incorrect = 0
  for (const q of questions) {
    const given = answers[q.id]
    if (!given) continue
    if (given === correctLetter(q)) correct++
    else incorrect++
  }
  const unattempted = questions.length - correct - incorrect
  const maxScore = questions.length * CORRECT_MARKS
  const score = correct * CORRECT_MARKS - incorrect * NEGATIVE_MARKS
  const percent = maxScore > 0 ? Math.max(0, Math.round((score / maxScore) * 1000) / 10) : 0
  return { correct, incorrect, unattempted, score, maxScore, percent }
}

export function newToken(): string {
  return crypto.randomBytes(24).toString('base64url')
}
