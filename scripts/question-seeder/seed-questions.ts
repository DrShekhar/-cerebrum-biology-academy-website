/**
 * Question Seeder Script
 * Seeds NCERT-aligned biology questions into the database
 */

import { PrismaClient } from '../../src/generated/prisma/index.js'
import { QuestionSeed, ChapterQuestionSet } from './types.js'
import { randomUUID } from 'crypto'

// Import question sets - Class 11
import { chapter8Questions } from './questions/class11-ch08-cell-structure.js'
import { chapter10Questions } from './questions/class11-ch10-cell-cycle.js'
import { chapter18Class11Questions } from './questions/class11-ch18-body-fluids-circulation.js'

// Import question sets - Class 12
import { chapter3Class12Questions } from './questions/class12-ch03-human-reproduction.js'
import { chapter5Class12Questions } from './questions/class12-ch05-inheritance-variation.js'
import { chapter6Class12Questions } from './questions/class12-ch06-molecular-inheritance.js'
import { chapter8Class12Questions } from './questions/class12-ch08-human-health-disease.js'

const prisma = new PrismaClient()

// All question sets to seed
const ALL_QUESTION_SETS: ChapterQuestionSet[] = [
  // Class 11
  chapter8Questions,
  chapter10Questions,
  chapter18Class11Questions,
  // Class 12
  chapter3Class12Questions,
  chapter5Class12Questions,
  chapter6Class12Questions,
  chapter8Class12Questions,
]

// Generate a URL-friendly slug
function generateSlug(question: string): string {
  return question
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 100)
    .replace(/-+$/, '')
}

// Map difficulty to enum
function mapDifficulty(difficulty: string): 'EASY' | 'MEDIUM' | 'HARD' | 'EXPERT' {
  const mapping: Record<string, 'EASY' | 'MEDIUM' | 'HARD' | 'EXPERT'> = {
    EASY: 'EASY',
    MEDIUM: 'MEDIUM',
    HARD: 'HARD',
    EXPERT: 'EXPERT',
  }
  return mapping[difficulty] || 'MEDIUM'
}

// Map category to enum
function mapCategory(category: string): 'PRACTICE' | 'MOCK_TEST' | 'PREVIOUS_YEAR' | 'CONCEPT_BUILDER' | 'COMPETITIVE' {
  const mapping: Record<string, 'PRACTICE' | 'MOCK_TEST' | 'PREVIOUS_YEAR' | 'CONCEPT_BUILDER' | 'COMPETITIVE'> = {
    PRACTICE: 'PRACTICE',
    MOCK_TEST: 'MOCK_TEST',
    PREVIOUS_YEAR: 'PREVIOUS_YEAR',
    CONCEPT_BUILDER: 'CONCEPT_BUILDER',
    COMPETITIVE: 'COMPETITIVE',
  }
  return mapping[category] || 'PRACTICE'
}

// Seed a single question
async function seedQuestion(q: QuestionSeed, chapterSet: ChapterQuestionSet): Promise<boolean> {
  try {
    // Check if question already exists (by similar question text)
    const existing = await prisma.questions.findFirst({
      where: {
        question: {
          contains: q.question.substring(0, 50),
        },
      },
    })

    if (existing) {
      console.log(`  [SKIP] Question already exists: ${q.question.substring(0, 50)}...`)
      return false
    }

    // Determine if this is a PYQ
    const isPYQ = q.neetYear !== undefined
    const category = isPYQ ? 'PREVIOUS_YEAR' : mapCategory(q.category)

    // Build tags with NCERT metadata
    const enrichedTags = [
      ...q.tags,
      `ncert-class-${q.ncertClass}`,
      `ncert-ch-${q.ncertChapter}`,
      q.neetWeightage ? `neet-${q.neetWeightage.toLowerCase()}` : null,
      q.ncertFigure ? `fig-${q.ncertFigure}` : null,
    ].filter(Boolean)

    // Build keywords with NCERT info (legacy support)
    const keywords = {
      ncertClass: q.ncertClass,
      ncertChapter: q.ncertChapter,
      ncertChapterName: q.ncertChapterName,
      ncertFigure: q.ncertFigure || null,
      ncertPage: q.ncertPage || null,
      neetWeightage: q.neetWeightage,
      isNEETImportant: q.isNEETImportant,
    }

    // Create the question with dedicated NCERT fields
    await prisma.questions.create({
      data: {
        id: randomUUID(),
        question: q.question,
        type: q.type as any,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        difficulty: mapDifficulty(q.difficulty) as any,
        category: category as any,
        topic: q.topic,
        subtopic: q.subtopic || null,
        tags: enrichedTags,
        keywords: keywords,
        curriculum: 'NCERT',
        grade: q.ncertClass === 11 ? 'CLASS_11' : 'CLASS_12',
        subject: 'BIOLOGY',
        slug: generateSlug(q.question) + '-' + Date.now().toString(36),
        source: q.neetYear ? `NEET ${q.neetYear}` : 'NCERT',
        examYear: q.neetYear || null,
        isVerified: true,
        isActive: true,
        updatedAt: new Date(),
        // Dedicated NCERT fields for filtering
        isNcertBased: true,
        ncertClass: q.ncertClass,
        ncertChapter: q.ncertChapter,
        ncertChapterName: q.ncertChapterName,
        ncertFigure: q.ncertFigure || null,
        ncertPage: q.ncertPage || null,
        neetWeightage: q.neetWeightage,
        isNeetImportant: q.isNEETImportant,
      },
    })

    return true
  } catch (error) {
    console.error(`  [ERROR] Failed to seed question: ${q.question.substring(0, 50)}...`)
    console.error(error)
    return false
  }
}

// Seed all questions from a chapter set
async function seedChapterQuestions(chapterSet: ChapterQuestionSet): Promise<{ success: number; skipped: number; failed: number }> {
  console.log(`\n📚 Seeding: Class ${chapterSet.ncertClass} - Chapter ${chapterSet.chapterNo}: ${chapterSet.chapterName}`)
  console.log(`   Total questions: ${chapterSet.questions.length}`)

  let success = 0
  let skipped = 0
  let failed = 0

  for (const question of chapterSet.questions) {
    const result = await seedQuestion(question, chapterSet)
    if (result === true) {
      success++
    } else if (result === false) {
      skipped++
    } else {
      failed++
    }
  }

  console.log(`   ✅ Added: ${success} | ⏭️ Skipped: ${skipped} | ❌ Failed: ${failed}`)
  return { success, skipped, failed }
}

// Main seeding function
async function main() {
  console.log('=' .repeat(60))
  console.log('NCERT Biology Question Seeder')
  console.log('='.repeat(60))

  const startTime = Date.now()
  let totalSuccess = 0
  let totalSkipped = 0
  let totalFailed = 0

  try {
    // Test database connection
    await prisma.$connect()
    console.log('\n✅ Database connected')

    // Get current question count
    const initialCount = await prisma.questions.count()
    console.log(`📊 Current questions in database: ${initialCount}`)

    // Seed each chapter
    for (const chapterSet of ALL_QUESTION_SETS) {
      const result = await seedChapterQuestions(chapterSet)
      totalSuccess += result.success
      totalSkipped += result.skipped
      totalFailed += result.failed
    }

    // Get final count
    const finalCount = await prisma.questions.count()

    console.log('\n' + '='.repeat(60))
    console.log('SEEDING COMPLETE')
    console.log('='.repeat(60))
    console.log(`\n📊 Summary:`)
    console.log(`   Questions added: ${totalSuccess}`)
    console.log(`   Questions skipped: ${totalSkipped}`)
    console.log(`   Questions failed: ${totalFailed}`)
    console.log(`   Total in database: ${finalCount}`)
    console.log(`   Time elapsed: ${((Date.now() - startTime) / 1000).toFixed(2)}s`)
  } catch (error) {
    console.error('\n❌ Seeding failed:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run the seeder
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
