/**
 * Seed MCQ question batches directly into Supabase
 * Reads JSON batch files and inserts into the questions table via Prisma
 *
 * Usage:
 *   npx tsx prisma/seed-mcq-batches.ts          # Only seed new/changed files
 *   npx tsx prisma/seed-mcq-batches.ts --force   # Re-seed everything
 */

import { PrismaClient } from '../src/generated/prisma'
import * as fs from 'fs'
import * as path from 'path'
import * as crypto from 'crypto'

const prisma = new PrismaClient()

const BATCH_DIR = path.join(__dirname, '..', 'src', 'data', 'mcq-batches')
const STATE_FILE = path.join(__dirname, '.seed-state.json')
const forceMode = process.argv.includes('--force')

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
  sourceTextbook?: string
  dataContext?: string
  experimentContext?: string
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

interface SeedState {
  [relPath: string]: {
    hash: string
    questionCount: number
    importedCount: number
    lastSeeded: string
  }
}

function fileHash(filePath: string): string {
  const content = fs.readFileSync(filePath)
  return crypto.createHash('sha256').update(content).digest('hex')
}

function loadState(): SeedState {
  if (fs.existsSync(STATE_FILE)) {
    return JSON.parse(fs.readFileSync(STATE_FILE, 'utf-8'))
  }
  return {}
}

function saveState(state: SeedState): void {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2))
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

    const isMTF = q.type === 'MTF'
    await prisma.questions.create({
      data: {
        id: crypto.randomUUID(),
        topic: q.topic.trim(),
        subtopic: q.subtopic?.trim() || null,
        curriculum: q.isOlympiad ? 'Campbell' : 'NCERT',
        grade: q.ncertClass ? `Class ${q.ncertClass}` : q.isOlympiad ? 'Olympiad' : 'Class 11',
        type: (q.type as any) || 'MCQ',
        question: q.question.trim(),
        options: q.options,
        correctAnswer: isMTF ? q.correctAnswer.toUpperCase() : q.correctAnswer.toUpperCase(),
        explanation: q.explanation?.trim() || null,
        difficulty: (q.difficulty as any) || 'MEDIUM',
        subject: 'biology',
        isActive: true,
        isVerified: true,
        isNcertBased: q.isNcertBased ?? !q.isOlympiad,
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
        sourceTextbook: q.sourceTextbook || null,
        dataContext: q.dataContext || null,
        experimentContext: q.experimentContext || null,
        updatedAt: new Date(),
      },
    })
    imported++
  }

  console.log(`  Imported: ${imported}, Skipped (duplicates): ${skipped}`)
  return imported
}

function findJsonFiles(dir: string): string[] {
  const results: string[] = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      results.push(...findJsonFiles(fullPath))
    } else if (entry.name.endsWith('.json') && !entry.name.startsWith('_')) {
      results.push(fullPath)
    }
  }
  return results
}

async function main() {
  console.log('=== MCQ Batch Import ===')
  console.log(`Batch directory: ${BATCH_DIR}`)
  if (forceMode) console.log('Mode: FORCE (re-seeding all files)')

  const files = findJsonFiles(BATCH_DIR)
  console.log(`Found ${files.length} batch files (including subdirectories)`)

  const state = forceMode ? {} : loadState()
  let totalImported = 0
  let filesProcessed = 0
  let filesSkipped = 0

  for (const file of files) {
    const relPath = path.relative(BATCH_DIR, file)
    const hash = fileHash(file)

    if (!forceMode && state[relPath] && state[relPath].hash === hash) {
      filesSkipped++
      continue
    }

    const count = await seedBatch(file)
    totalImported += count
    filesProcessed++

    const data: BatchFile = JSON.parse(fs.readFileSync(file, 'utf-8'))
    state[relPath] = {
      hash,
      questionCount: data.questions.length,
      importedCount: count,
      lastSeeded: new Date().toISOString(),
    }

    saveState(state)
  }

  console.log('\n=== DONE ===')
  console.log(`Files processed: ${filesProcessed}, Files skipped (unchanged): ${filesSkipped}`)
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
