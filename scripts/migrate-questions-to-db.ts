/**
 * Comprehensive MCQ Migration Script
 * Migrates all questions from TypeScript files to PostgreSQL database
 * Includes: Existing questions + Missing chapters + PYQ Collection
 */

import { PrismaClient } from '../src/generated/prisma/index.js'

const prisma = new PrismaClient()

// ============================================================================
// NEET BIOLOGY COMPLETE SYLLABUS MAPPING
// ============================================================================

const NEET_CHAPTERS = {
  // CLASS 11 - BOTANY
  'ch-11-1': { name: 'The Living World', topic: 'Diversity in Living World', class: '11' },
  'ch-11-2': { name: 'Biological Classification', topic: 'Diversity in Living World', class: '11' },
  'ch-11-3': { name: 'Plant Kingdom', topic: 'Diversity in Living World', class: '11' },
  'ch-11-4': { name: 'Animal Kingdom', topic: 'Diversity in Living World', class: '11' },
  'ch-11-5': {
    name: 'Morphology of Flowering Plants',
    topic: 'Structural Organisation',
    class: '11',
  },
  'ch-11-6': { name: 'Anatomy of Flowering Plants', topic: 'Structural Organisation', class: '11' },
  'ch-11-7': {
    name: 'Structural Organisation in Animals',
    topic: 'Structural Organisation',
    class: '11',
  },
  'ch-11-8': { name: 'Cell: The Unit of Life', topic: 'Cell Structure and Function', class: '11' },
  'ch-11-9': { name: 'Biomolecules', topic: 'Cell Structure and Function', class: '11' },
  'ch-11-10': {
    name: 'Cell Cycle and Cell Division',
    topic: 'Cell Structure and Function',
    class: '11',
  },
  'ch-11-11': { name: 'Transport in Plants', topic: 'Plant Physiology', class: '11' },
  'ch-11-12': { name: 'Mineral Nutrition', topic: 'Plant Physiology', class: '11' },
  'ch-11-13': { name: 'Photosynthesis in Higher Plants', topic: 'Plant Physiology', class: '11' },
  'ch-11-14': { name: 'Respiration in Plants', topic: 'Plant Physiology', class: '11' },
  'ch-11-15': { name: 'Plant Growth and Development', topic: 'Plant Physiology', class: '11' },
  'ch-11-16': { name: 'Digestion and Absorption', topic: 'Human Physiology', class: '11' },
  'ch-11-17': { name: 'Breathing and Exchange of Gases', topic: 'Human Physiology', class: '11' },
  'ch-11-18': { name: 'Body Fluids and Circulation', topic: 'Human Physiology', class: '11' },
  'ch-11-19': {
    name: 'Excretory Products and Elimination',
    topic: 'Human Physiology',
    class: '11',
  },
  'ch-11-20': { name: 'Locomotion and Movement', topic: 'Human Physiology', class: '11' },
  'ch-11-21': { name: 'Neural Control and Coordination', topic: 'Human Physiology', class: '11' },
  'ch-11-22': {
    name: 'Chemical Coordination and Integration',
    topic: 'Human Physiology',
    class: '11',
  },

  // CLASS 12 - BOTANY & ZOOLOGY
  'ch-12-1': { name: 'Reproduction in Organisms', topic: 'Reproduction', class: '12' },
  'ch-12-2': {
    name: 'Sexual Reproduction in Flowering Plants',
    topic: 'Reproduction',
    class: '12',
  },
  'ch-12-3': { name: 'Human Reproduction', topic: 'Reproduction', class: '12' },
  'ch-12-4': { name: 'Reproductive Health', topic: 'Reproduction', class: '12' },
  'ch-12-5': {
    name: 'Principles of Inheritance and Variation',
    topic: 'Genetics and Evolution',
    class: '12',
  },
  'ch-12-6': {
    name: 'Molecular Basis of Inheritance',
    topic: 'Genetics and Evolution',
    class: '12',
  },
  'ch-12-7': { name: 'Evolution', topic: 'Genetics and Evolution', class: '12' },
  'ch-12-8': { name: 'Human Health and Disease', topic: 'Biology and Human Welfare', class: '12' },
  'ch-12-9': {
    name: 'Strategies for Enhancement in Food Production',
    topic: 'Biology and Human Welfare',
    class: '12',
  },
  'ch-12-10': {
    name: 'Microbes in Human Welfare',
    topic: 'Biology and Human Welfare',
    class: '12',
  },
  'ch-12-11': {
    name: 'Biotechnology: Principles and Processes',
    topic: 'Biotechnology',
    class: '12',
  },
  'ch-12-12': { name: 'Biotechnology and its Applications', topic: 'Biotechnology', class: '12' },
  'ch-12-13': { name: 'Organisms and Populations', topic: 'Ecology', class: '12' },
  'ch-12-14': { name: 'Ecosystem', topic: 'Ecology', class: '12' },
  'ch-12-15': { name: 'Biodiversity and Conservation', topic: 'Ecology', class: '12' },
  'ch-12-16': { name: 'Environmental Issues', topic: 'Ecology', class: '12' },
}

// ============================================================================
// DIFFICULTY MAPPING
// ============================================================================

function mapDifficulty(difficulty: string): 'EASY' | 'MEDIUM' | 'HARD' {
  const d = difficulty.toUpperCase()
  if (d === 'EASY') return 'EASY'
  if (d === 'HARD') return 'HARD'
  return 'MEDIUM'
}

// ============================================================================
// CONVERT FULL-TEXT ANSWER TO LETTER (A/B/C/D)
// ============================================================================

function convertAnswerToLetter(correctAnswer: string, options: string[]): string {
  const index = options.findIndex(
    (opt) => opt.trim().toLowerCase() === correctAnswer.trim().toLowerCase()
  )
  if (index === -1) {
    // Try partial match
    const partialIndex = options.findIndex(
      (opt) =>
        opt.toLowerCase().includes(correctAnswer.toLowerCase().substring(0, 20)) ||
        correctAnswer.toLowerCase().includes(opt.toLowerCase().substring(0, 20))
    )
    if (partialIndex !== -1) {
      return ['A', 'B', 'C', 'D'][partialIndex]
    }
    console.warn(`Could not match answer: "${correctAnswer}" in options`)
    return 'A' // Default to A if no match
  }
  return ['A', 'B', 'C', 'D'][index]
}

// ============================================================================
// GENERATE UNIQUE ID
// ============================================================================

function generateId(): string {
  return `mcq_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
}

// ============================================================================
// MAIN MIGRATION FUNCTION
// ============================================================================

async function migrateQuestions() {
  console.log('🚀 Starting MCQ Migration...\n')

  // Import existing questions dynamically
  const {
    class9Questions,
    class10Questions,
    class11Questions,
    class12Questions,
    dropperQuestions,
  } = await import('../src/data/authenticQuestions')

  const { neetPreviousYearQuestions, neetPatternQuestions } = await import(
    '../src/data/comprehensiveNEETQuestionBank'
  )

  // Import NEW missing chapter questions
  const { missingChaptersQuestions } = await import('../src/data/missingChaptersQuestions')

  const { missingChaptersQuestions2 } = await import('../src/data/missingChaptersQuestions2')

  const { class12MissingChaptersQuestions } = await import('../src/data/class12MissingChapters')

  const { class11RemainingQuestions } = await import('../src/data/class11RemainingChapters')

  const { class12RemainingQuestions } = await import('../src/data/class12RemainingChapters')

  // Import PYQ Collection
  const { allPYQQuestions } = await import('../src/data/neetPYQCollection')

  // Import NEW complete chapter question banks (100 questions each)
  const { plantKingdomQuestions } = await import('../src/data/chapter3-plantKingdom')
  const { animalKingdomQuestions } = await import('../src/data/chapter4-animalKingdom')

  // Import Chapter 1 and 2 question banks (100 questions each)
  const { livingWorldQuestions } = await import('../src/data/chapter1-livingWorld')
  const { biologicalClassificationQuestions } = await import(
    '../src/data/chapter2-biologicalClassification'
  )

  // Import Chapter 5 (Morphology) question bank
  const { morphologyQuestions } = await import('../src/data/chapter5-morphology')

  // Combine all existing questions
  const allExistingQuestions = [
    ...class9Questions,
    ...class10Questions,
    ...class11Questions,
    ...class12Questions,
    ...dropperQuestions,
    ...neetPreviousYearQuestions,
    ...(neetPatternQuestions || []),
    // NEW: Missing chapter questions
    ...missingChaptersQuestions,
    ...missingChaptersQuestions2,
    ...class12MissingChaptersQuestions,
    ...class11RemainingQuestions,
    ...class12RemainingQuestions,
    // NEW: Complete chapter question banks (100 each)
    ...plantKingdomQuestions,
    ...animalKingdomQuestions,
    // Chapter 1 and 2 question banks
    ...livingWorldQuestions,
    ...biologicalClassificationQuestions,
    // Chapter 5 (Morphology) question bank
    ...morphologyQuestions,
  ]

  console.log(`📚 Found ${allExistingQuestions.length} existing questions`)
  console.log(`🏆 Found ${allPYQQuestions.length} PYQ questions to add`)

  let migratedCount = 0
  let errorCount = 0
  let pyqCount = 0

  // Migrate existing questions
  for (const q of allExistingQuestions) {
    try {
      const chapterInfo = NEET_CHAPTERS[q.chapterId as keyof typeof NEET_CHAPTERS]
      const topic = chapterInfo?.topic || 'General Biology'
      const chapterName = chapterInfo?.name || 'Unknown Chapter'

      // Determine if PYQ
      const isPYQ =
        (q as any).source?.includes('PYQ') ||
        (q as any).previousYearFrequency > 5 ||
        !!(q as any).year

      const pyqYear =
        (q as any).year ||
        ((q as any).previousYearFrequency > 10
          ? 2020
          : (q as any).previousYearFrequency > 5
            ? 2019
            : null)

      if (isPYQ) pyqCount++

      // Convert answer format
      const correctAnswerLetter = convertAnswerToLetter(q.correctAnswer, q.options)

      await prisma.questions.upsert({
        where: { id: q.id },
        update: {},
        create: {
          id: q.id,
          question: q.question,
          options: q.options,
          correctAnswer: correctAnswerLetter,
          explanation: q.explanation,
          topic: topic,
          subtopic: chapterName,
          curriculum: 'NEET',
          grade: q.classId.replace('class-', 'Class '),
          type: 'MCQ',
          subject: 'biology',
          difficulty: mapDifficulty(q.difficulty),
          isActive: true,
          isVerified: true,
          examYear: pyqYear,
          category: isPYQ ? 'PREVIOUS_YEAR' : 'PRACTICE',
          tags: (q as any).conceptualLinks || (q as any).conceptTags || [],
          relatedConcepts: (q as any).conceptualLinks || [],
          qualityScore: 4.5,
          timeLimit: q.timeEstimate || 60,
          source: (q as any).ncertPageReference || (q as any).ncertReference || 'NCERT',
          updatedAt: new Date(),
        },
      })
      migratedCount++
    } catch (error) {
      console.error(`Error migrating question ${q.id}:`, error)
      errorCount++
    }
  }

  console.log(`\n✅ Migrated ${migratedCount} existing questions`)
  console.log(`🏆 Tagged ${pyqCount} as PYQs from existing`)
  console.log(`❌ Errors: ${errorCount}`)

  // ============================================================================
  // MIGRATE PYQ COLLECTION (2014-2024)
  // ============================================================================
  console.log('\n📚 Migrating PYQ Collection (2014-2024)...')

  let pyqMigratedCount = 0
  let pyqErrorCount = 0

  for (const q of allPYQQuestions) {
    try {
      const chapterInfo = NEET_CHAPTERS[q.chapterId as keyof typeof NEET_CHAPTERS]
      const topic = chapterInfo?.topic || 'General Biology'
      const chapterName = chapterInfo?.name || 'Unknown Chapter'

      // Convert answer format
      const correctAnswerLetter = convertAnswerToLetter(q.correctAnswer, q.options)

      await prisma.questions.upsert({
        where: { id: q.id },
        update: {},
        create: {
          id: q.id,
          question: q.question,
          options: q.options,
          correctAnswer: correctAnswerLetter,
          explanation: q.explanation,
          topic: topic,
          subtopic: chapterName,
          curriculum: 'NEET',
          grade: q.classId.replace('class-', 'Class '),
          type: 'MCQ',
          subject: 'biology',
          difficulty: mapDifficulty(q.difficulty),
          isActive: true,
          isVerified: true,
          examYear: q.year,
          category: 'PREVIOUS_YEAR',
          tags: q.conceptualLinks || [],
          relatedConcepts: q.conceptualLinks || [],
          qualityScore: 5.0, // PYQs are highest quality
          timeLimit: q.timeEstimate || 60,
          source: q.examCode || 'NEET-PYQ',
          updatedAt: new Date(),
        },
      })
      pyqMigratedCount++
    } catch (error) {
      console.error(`Error migrating PYQ ${q.id}:`, error)
      pyqErrorCount++
    }
  }

  console.log(`✅ Migrated ${pyqMigratedCount} PYQ questions`)
  console.log(`❌ PYQ Errors: ${pyqErrorCount}`)

  return {
    migratedCount: migratedCount + pyqMigratedCount,
    pyqCount: pyqCount + pyqMigratedCount,
    errorCount: errorCount + pyqErrorCount,
  }
}

// ============================================================================
// RUN MIGRATION
// ============================================================================

async function main() {
  try {
    const result = await migrateQuestions()

    // Verify counts
    const totalQuestions = await prisma.questions.count()
    const pyqQuestions = await prisma.questions.count({
      where: { category: 'PREVIOUS_YEAR' },
    })
    const verifiedQuestions = await prisma.questions.count({
      where: { isVerified: true },
    })

    console.log('\n📊 Database Summary:')
    console.log(`   Total Questions: ${totalQuestions}`)
    console.log(`   PYQ Questions: ${pyqQuestions}`)
    console.log(`   Verified Questions: ${verifiedQuestions}`)

    // Count by topic
    const topicCounts = await prisma.questions.groupBy({
      by: ['topic'],
      _count: true,
    })

    console.log('\n📖 Questions by Topic:')
    topicCounts.forEach((t) => {
      console.log(`   ${t.topic}: ${t._count}`)
    })
  } catch (error) {
    console.error('Migration failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
