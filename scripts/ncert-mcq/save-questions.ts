/**
 * Save Questions Script
 * Saves generated questions to the database
 *
 * Usage: npx tsx scripts/ncert-mcq/save-questions.ts <json-file>
 */

import * as dotenv from 'dotenv'
dotenv.config()

import * as fs from 'fs'
import * as path from 'path'
import { PrismaClient } from '../../src/generated/prisma/index.js'

const prisma = new PrismaClient()

interface Question {
  question: string
  options: string[]
  correctAnswer: string
  explanation: string
  difficulty: 'EASY' | 'MEDIUM' | 'HARD'
  topic: string
  subtopic?: string
  ncertPage?: number
  ncertFigure?: string
  neetWeightage?: 'HIGH' | 'MEDIUM' | 'LOW'
}

interface QuestionBatch {
  ncertClass: 11 | 12
  ncertChapter: number
  ncertChapterName: string
  questions: Question[]
}

async function saveQuestions(batch: QuestionBatch): Promise<number> {
  let savedCount = 0

  for (const q of batch.questions) {
    try {
      // Check for duplicates
      const existing = await prisma.questions.findFirst({
        where: {
          question: q.question,
          ncertClass: batch.ncertClass,
          ncertChapter: batch.ncertChapter,
        },
      })

      if (existing) {
        console.log(`  Skipping duplicate: ${q.question.slice(0, 50)}...`)
        continue
      }

      // Determine correct answer letter
      let correctLetter = q.correctAnswer
      if (q.correctAnswer.length > 1) {
        // If correctAnswer is the full text, find its index
        const idx = q.options.findIndex((o) => o === q.correctAnswer)
        if (idx >= 0) {
          correctLetter = ['A', 'B', 'C', 'D'][idx]
        }
      }

      await prisma.questions.create({
        data: {
          id: `ncert_${batch.ncertClass}_${batch.ncertChapter}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          question: q.question,
          type: 'MCQ',
          options: q.options,
          correctAnswer: correctLetter,
          explanation: q.explanation,
          difficulty: q.difficulty,
          category: 'PRACTICE',
          curriculum: 'NCERT',
          grade: batch.ncertClass.toString(),
          topic: q.topic || batch.ncertChapterName,
          subtopic: q.subtopic,
          tags: ['ncert', `class${batch.ncertClass}`, `ch${batch.ncertChapter}`],
          ncertClass: batch.ncertClass,
          ncertChapter: batch.ncertChapter,
          ncertChapterName: batch.ncertChapterName,
          ncertPage: q.ncertPage,
          ncertFigure: q.ncertFigure,
          isNcertBased: true,
          neetWeightage: q.neetWeightage || 'MEDIUM',
          isNeetImportant: q.neetWeightage === 'HIGH',
          updatedAt: new Date(),
        },
      })

      savedCount++
      console.log(`  ✓ Saved: ${q.question.slice(0, 60)}...`)
    } catch (error) {
      console.error(`  ✗ Failed: ${error}`)
    }
  }

  return savedCount
}

async function main() {
  const args = process.argv.slice(2)

  if (args.length < 1) {
    console.log('Usage: npx tsx scripts/ncert-mcq/save-questions.ts <json-file>')
    console.log('')
    console.log('JSON file format:')
    console.log('{')
    console.log('  "ncertClass": 11,')
    console.log('  "ncertChapter": 1,')
    console.log('  "ncertChapterName": "The Living World",')
    console.log('  "questions": [...]')
    console.log('}')
    process.exit(1)
  }

  const jsonFile = args[0]

  if (!fs.existsSync(jsonFile)) {
    console.error(`File not found: ${jsonFile}`)
    process.exit(1)
  }

  const batch: QuestionBatch = JSON.parse(fs.readFileSync(jsonFile, 'utf-8'))

  console.log(
    `\nSaving questions for Class ${batch.ncertClass}, Chapter ${batch.ncertChapter}: ${batch.ncertChapterName}`
  )
  console.log(`Total questions: ${batch.questions.length}\n`)

  const saved = await saveQuestions(batch)

  console.log(`\n✅ Saved ${saved}/${batch.questions.length} questions`)

  // Update progress file
  const progressFile = path.join(process.cwd(), 'resources/ncert-mcq-progress.json')
  const progress = JSON.parse(fs.readFileSync(progressFile, 'utf-8'))

  // Check if chapter already exists
  const existingIdx = progress.completedChapters.findIndex(
    (c: any) => c.ncertClass === batch.ncertClass && c.chapter === batch.ncertChapter
  )

  if (existingIdx >= 0) {
    progress.completedChapters[existingIdx].questionsGenerated += saved
  } else {
    progress.completedChapters.push({
      ncertClass: batch.ncertClass,
      chapter: batch.ncertChapter,
      questionsGenerated: saved,
    })
  }

  progress.totalQuestionsGenerated += saved
  progress.lastUpdated = new Date().toISOString()

  fs.writeFileSync(progressFile, JSON.stringify(progress, null, 2))
  console.log(`Progress updated: ${progress.totalQuestionsGenerated} total questions`)

  await prisma.$disconnect()
}

main()
