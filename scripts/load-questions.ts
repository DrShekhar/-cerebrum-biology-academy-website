/**
 * Universal Question Loader Script
 * Loads questions from JSON files into database
 */

import { PrismaClient } from '../src/generated/prisma'
import * as crypto from 'crypto'
import * as fs from 'fs'
import * as path from 'path'

const prisma = new PrismaClient()

interface QuestionData {
  topic: string
  subtopic?: string
  question: string
  options: string[]
  correctAnswer: string
  explanation: string
  difficulty: 'EASY' | 'MEDIUM' | 'HARD'
  source: string
  examYear?: number
  type: 'MCQ' | 'MATCH_FOLLOWING'
  tags?: string[]
}

async function loadFromJSON(filename: string) {
  const filePath = path.join(__dirname, filename)

  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filename}`)
    return { inserted: 0, duplicates: 0 }
  }

  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as QuestionData[]
  console.log(`\nProcessing ${filename}: ${data.length} questions`)

  let inserted = 0
  let duplicates = 0

  for (const q of data) {
    try {
      const existing = await prisma.questions.findFirst({
        where: { question: q.question, isActive: true },
      })

      if (existing) {
        duplicates++
        continue
      }

      await prisma.questions.create({
        data: {
          id: crypto.randomUUID(),
          topic: q.topic,
          subtopic: q.subtopic,
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
          difficulty: q.difficulty,
          source: q.source,
          examYear: q.examYear,
          type: q.type || 'MCQ',
          tags: q.tags,
          curriculum: 'NCERT',
          grade: 'Class 11-12',
          subject: 'Biology',
          isActive: true,
          isVerified: true,
          updatedAt: new Date(),
        },
      })
      inserted++
    } catch (error) {
      // Skip errors
    }
  }

  return { inserted, duplicates }
}

async function main() {
  console.log('=== NEET Biology Question Loader ===\n')

  // Get all JSON files in scripts directory
  const files = fs
    .readdirSync(__dirname)
    .filter((f) => f.startsWith('questions-') && f.endsWith('.json'))

  let totalInserted = 0
  let totalDuplicates = 0

  for (const file of files) {
    const { inserted, duplicates } = await loadFromJSON(file)
    totalInserted += inserted
    totalDuplicates += duplicates
    console.log(`  Inserted: ${inserted}, Duplicates: ${duplicates}`)
  }

  console.log('\n=== Summary ===')
  console.log(`Total Inserted: ${totalInserted}`)
  console.log(`Total Duplicates: ${totalDuplicates}`)

  const totalCount = await prisma.questions.count({ where: { isActive: true } })
  console.log(`\nTotal questions in database: ${totalCount}`)

  // Show distribution
  const byDifficulty = await prisma.questions.groupBy({
    by: ['difficulty'],
    where: { isActive: true },
    _count: { difficulty: true },
  })

  console.log('\nBy Difficulty:')
  byDifficulty.forEach((d) => {
    const pct = ((d._count.difficulty / totalCount) * 100).toFixed(1)
    console.log(`  ${d.difficulty}: ${d._count.difficulty} (${pct}%)`)
  })

  await prisma.$disconnect()
}

main()
