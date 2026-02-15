/**
 * Seed MCQ question batches directly into Supabase
 * Reads JSON batch files and inserts into the questions table via Prisma
 *
 * Usage: npx tsx prisma/seed-mcq-batches.ts
 */

import { PrismaClient } from '../src/generated/prisma'
import * as fs from 'fs'
import * as path from 'path'
import * as crypto from 'crypto'

const prisma = new PrismaClient()

const BATCH_DIR = path.join(__dirname, '..', 'src', 'data', 'mcq-batches')

interface BatchQuestion {
  type?: string
  topic: string
  subtopic?: string
  chapter?: string
  question: string
  options: string[]
  correctAnswer: string
  explanation?: string
  difficulty?: string
  ncertClass?: number
  ncertChapter?: number
  ncertChapterName?: string
  ncertPage?: number
  ncertFigure?: string
  neetWeightage?: string
  isNcertBased?: boolean
  isNeetImportant?: boolean
  isPYQ?: boolean
  pyqYear?: number
  tags?: string[]
  isOlympiad?: boolean
  olympiadLevel?: string
  campbellChapter?: number
  campbellUnit?: number
  campbellEdition?: number
  conceptualDepth?: string
}

interface BatchFile {
  batch: {
    name: string
    version?: number
    source?: string
    totalQuestions?: number
  }
  questions: BatchQuestion[]
}

async function seedBatch(filePath: string): Promise<number> {
  const fileName = path.basename(filePath)
  console.log(`\nProcessing: ${fileName}`)

  const raw = fs.readFileSync(filePath, 'utf-8')
  const data: BatchFile = JSON.parse(raw)
  const { batch, questions } = data

  console.log(`  Batch: ${batch.name}`)
  console.log(`  Questions: ${questions.length}`)

  let imported = 0
  let skipped = 0

  for (const q of questions) {
    const normalizedText = q.question.toLowerCase().trim().replace(/\s+/g, ' ')

    const existing = await prisma.questions.findFirst({
      where: {
        question: {
          contains: normalizedText.slice(0, 100),
          mode: 'insensitive',
        },
      },
      select: { id: true },
    })

    if (existing) {
      skipped++
      continue
    }

    await prisma.questions.create({
      data: {
        id: crypto.randomUUID(),
        topic: q.topic.trim(),
        subtopic: q.subtopic?.trim() || null,
        curriculum: 'NCERT',
        grade: q.ncertClass ? `Class ${q.ncertClass}` : 'Class 11',
        type: (q.type as any) || 'MCQ',
        question: q.question.trim(),
        options: q.options,
        correctAnswer: q.correctAnswer.toUpperCase(),
        explanation: q.explanation?.trim() || null,
        difficulty: (q.difficulty as any) || 'MEDIUM',
        subject: 'biology',
        isActive: true,
        isVerified: true,
        isNcertBased: q.isNcertBased ?? true,
        ncertClass: q.ncertClass || null,
        ncertChapter: q.ncertChapter || null,
        ncertChapterName: q.ncertChapterName?.trim() || q.chapter?.trim() || null,
        ncertPage: q.ncertPage || null,
        ncertFigure: q.ncertFigure || null,
        neetWeightage: q.neetWeightage || null,
        isNeetImportant: q.isNeetImportant ?? false,
        tags: q.tags || null,
        examYear: q.pyqYear || null,
        source: batch.source || 'batch-import',
        isOlympiad: q.isOlympiad ?? false,
        olympiadLevel: q.olympiadLevel || null,
        campbellChapter: q.campbellChapter || null,
        campbellUnit: q.campbellUnit || null,
        campbellEdition: q.campbellEdition || null,
        conceptualDepth: q.conceptualDepth || null,
        updatedAt: new Date(),
      },
    })
    imported++
  }

  console.log(`  Imported: ${imported}, Skipped (duplicates): ${skipped}`)
  return imported
}

async function main() {
  console.log('=== MCQ Batch Import ===')
  console.log(`Batch directory: ${BATCH_DIR}`)

  const files = fs.readdirSync(BATCH_DIR).filter((f) => f.endsWith('.json'))
  console.log(`Found ${files.length} batch files`)

  let totalImported = 0

  for (const file of files) {
    const count = await seedBatch(path.join(BATCH_DIR, file))
    totalImported += count
  }

  console.log(`\n=== DONE ===`)
  console.log(`Total imported: ${totalImported} questions`)
}

main()
  .catch((e) => {
    console.error('Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
