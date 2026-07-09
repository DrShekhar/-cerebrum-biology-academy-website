/**
 * Seed the purpose-authored NEET full mock (180 Q: 45 Physics + 45 Chemistry +
 * 45 Botany + 45 Zoology) into the `questions` table and ensure the CBT
 * template row. Idempotent — re-running upserts by stable id, never duplicates.
 *
 * Source of truth: scripts/neet-mock/{physics,chemistry,botany,zoology}.json
 * (authored + answer-key-verified). These are tagged source=NEET_MOCK_SOURCE so
 * the CBT serves ONLY them, never the general Biology bank.
 *
 * Run:  npx tsx scripts/seed-neet-mock.ts
 */
import fs from 'fs'
import path from 'path'
import { PrismaClient } from '../src/generated/prisma'
import { NEET_MOCK_SOURCE, ensureNeetTemplate } from '../src/lib/cbt/paper'

const prisma = new PrismaClient()

interface AuthoredQuestion {
  topic: string
  subtopic?: string
  question: string
  options: string[]
  answer: string // A|B|C|D
  explanation?: string
  difficulty: 'EASY' | 'MEDIUM' | 'HARD'
  ncertClass?: number
  ncertChapter?: string
  type?: string
}

const SECTIONS: { key: 'physics' | 'chemistry' | 'botany' | 'zoology'; file: string }[] = [
  { key: 'physics', file: 'physics.json' },
  { key: 'chemistry', file: 'chemistry.json' },
  { key: 'botany', file: 'botany.json' },
  { key: 'zoology', file: 'zoology.json' },
]

const ANSWER_INDEX: Record<string, number> = { A: 0, B: 1, C: 2, D: 3 }

function loadSection(file: string): AuthoredQuestion[] {
  const full = path.join(__dirname, 'neet-mock', file)
  const parsed = JSON.parse(fs.readFileSync(full, 'utf8')) as AuthoredQuestion[]
  if (!Array.isArray(parsed)) throw new Error(`${file}: not a JSON array`)
  return parsed
}

function validate(section: string, qs: AuthoredQuestion[]): string[] {
  const errs: string[] = []
  qs.forEach((q, i) => {
    const at = `${section}[${i + 1}]`
    if (!q.question?.trim()) errs.push(`${at}: empty question`)
    if (!Array.isArray(q.options) || q.options.length !== 4)
      errs.push(`${at}: needs exactly 4 options`)
    if (!(q.answer in ANSWER_INDEX)) errs.push(`${at}: answer must be A/B/C/D (got ${q.answer})`)
    if (!['EASY', 'MEDIUM', 'HARD'].includes(q.difficulty))
      errs.push(`${at}: bad difficulty ${q.difficulty}`)
  })
  return errs
}

async function main() {
  console.log('=== NEET full-mock seed ===\n')

  // Load + validate all four sections BEFORE writing anything.
  const loaded = SECTIONS.map((s) => ({ ...s, qs: loadSection(s.file) }))
  const allErrs = loaded.flatMap((s) => validate(s.key, s.qs))
  if (allErrs.length) {
    console.error('Validation failed — nothing written:\n' + allErrs.join('\n'))
    process.exit(1)
  }
  for (const s of loaded) {
    if (s.qs.length !== 45) {
      console.error(`${s.key}: expected 45 questions, got ${s.qs.length} — aborting.`)
      process.exit(1)
    }
  }

  const templateId = await ensureNeetTemplate()
  console.log(`Template ready: ${templateId}\n`)

  let upserted = 0
  for (const s of loaded) {
    for (let i = 0; i < s.qs.length; i++) {
      const q = s.qs[i]
      const num = String(i + 1).padStart(3, '0')
      const id = `neet-mock-01-${s.key}-${num}`
      const answerLetter = q.answer.toUpperCase()
      await prisma.questions.upsert({
        where: { id },
        update: {
          question: q.question,
          options: q.options,
          correctAnswer: answerLetter,
          explanation: q.explanation || null,
          difficulty: q.difficulty,
          topic: q.topic,
          subtopic: q.subtopic || null,
          subject: s.key,
          source: NEET_MOCK_SOURCE,
          ncertClass: q.ncertClass ?? null,
          ncertChapterName: q.ncertChapter || null,
          isActive: true,
          isVerified: true,
          isNeetImportant: true,
          updatedAt: new Date(),
        },
        create: {
          id,
          slug: id,
          question: q.question,
          options: q.options,
          correctAnswer: answerLetter,
          explanation: q.explanation || null,
          difficulty: q.difficulty,
          topic: q.topic,
          subtopic: q.subtopic || null,
          subject: s.key,
          source: NEET_MOCK_SOURCE,
          type: 'MCQ',
          category: 'MOCK_TEST',
          curriculum: 'NEET',
          grade: 'Class 11-12',
          marks: 4,
          ncertClass: q.ncertClass ?? null,
          ncertChapterName: q.ncertChapter || null,
          isActive: true,
          isVerified: true,
          isNeetImportant: true,
          updatedAt: new Date(),
        },
      })
      upserted++
    }
    console.log(`  ${s.key}: ${s.qs.length} questions`)
  }

  console.log(`\nDone — ${upserted} questions upserted under source=${NEET_MOCK_SOURCE}.`)
  await prisma.$disconnect()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
