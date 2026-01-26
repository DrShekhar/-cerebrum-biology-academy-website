/**
 * NCERT MCQ Generator - CLI-based (Uses Claude Max Subscription)
 *
 * Generates NEET-style MCQs for NCERT Biology chapters.
 * Uses ShekharSirAgent with Claude CLI for generation.
 *
 * Usage:
 *   npx tsx scripts/ncert-mcq/generate-ncert-mcqs-cli.ts <class> <chapter>
 *   npx tsx scripts/ncert-mcq/generate-ncert-mcqs-cli.ts --all
 *   npx tsx scripts/ncert-mcq/generate-ncert-mcqs-cli.ts --resume
 */

import * as dotenv from 'dotenv'
dotenv.config()

import * as fs from 'fs'
import * as path from 'path'
import { PrismaClient } from '../../src/generated/prisma/index.js'
import { ShekharSirAgent } from '../../src/lib/ai/agents/ShekharSirAgent.js'
import { QuestionSeed } from '../question-seeder/types'

const prisma = new PrismaClient()
const shekharSir = new ShekharSirAgent({ model: 'sonnet' })

// Progress file path
const PROGRESS_FILE = path.join(process.cwd(), 'resources/ncert-mcq-progress.json')

// NCERT Biology Index - simplified for generation
const NCERT_CHAPTERS = {
  class11: [
    { chapter: 1, name: 'The Living World', neetWeightage: 'LOW', targetQuestions: 40 },
    { chapter: 2, name: 'Biological Classification', neetWeightage: 'MEDIUM', targetQuestions: 60 },
    { chapter: 3, name: 'Plant Kingdom', neetWeightage: 'HIGH', targetQuestions: 80 },
    { chapter: 4, name: 'Animal Kingdom', neetWeightage: 'HIGH', targetQuestions: 80 },
    {
      chapter: 5,
      name: 'Morphology of Flowering Plants',
      neetWeightage: 'HIGH',
      targetQuestions: 80,
    },
    { chapter: 6, name: 'Anatomy of Flowering Plants', neetWeightage: 'HIGH', targetQuestions: 80 },
    {
      chapter: 7,
      name: 'Structural Organisation in Animals',
      neetWeightage: 'HIGH',
      targetQuestions: 70,
    },
    { chapter: 8, name: 'Cell: The Unit of Life', neetWeightage: 'HIGH', targetQuestions: 100 },
    { chapter: 9, name: 'Biomolecules', neetWeightage: 'HIGH', targetQuestions: 80 },
    {
      chapter: 10,
      name: 'Cell Cycle and Cell Division',
      neetWeightage: 'HIGH',
      targetQuestions: 70,
    },
    { chapter: 11, name: 'Transport in Plants', neetWeightage: 'HIGH', targetQuestions: 70 },
    { chapter: 12, name: 'Mineral Nutrition', neetWeightage: 'MEDIUM', targetQuestions: 50 },
    {
      chapter: 13,
      name: 'Photosynthesis in Higher Plants',
      neetWeightage: 'HIGH',
      targetQuestions: 90,
    },
    { chapter: 14, name: 'Respiration in Plants', neetWeightage: 'HIGH', targetQuestions: 80 },
    {
      chapter: 15,
      name: 'Plant Growth and Development',
      neetWeightage: 'MEDIUM',
      targetQuestions: 60,
    },
    { chapter: 16, name: 'Digestion and Absorption', neetWeightage: 'HIGH', targetQuestions: 80 },
    {
      chapter: 17,
      name: 'Breathing and Exchange of Gases',
      neetWeightage: 'HIGH',
      targetQuestions: 70,
    },
    {
      chapter: 18,
      name: 'Body Fluids and Circulation',
      neetWeightage: 'HIGH',
      targetQuestions: 90,
    },
    {
      chapter: 19,
      name: 'Excretory Products and their Elimination',
      neetWeightage: 'HIGH',
      targetQuestions: 80,
    },
    { chapter: 20, name: 'Locomotion and Movement', neetWeightage: 'HIGH', targetQuestions: 80 },
    {
      chapter: 21,
      name: 'Neural Control and Coordination',
      neetWeightage: 'HIGH',
      targetQuestions: 90,
    },
    {
      chapter: 22,
      name: 'Chemical Coordination and Integration',
      neetWeightage: 'HIGH',
      targetQuestions: 80,
    },
  ],
  class12: [
    { chapter: 1, name: 'Reproduction in Organisms', neetWeightage: 'LOW', targetQuestions: 40 },
    {
      chapter: 2,
      name: 'Sexual Reproduction in Flowering Plants',
      neetWeightage: 'HIGH',
      targetQuestions: 90,
    },
    { chapter: 3, name: 'Human Reproduction', neetWeightage: 'HIGH', targetQuestions: 90 },
    { chapter: 4, name: 'Reproductive Health', neetWeightage: 'MEDIUM', targetQuestions: 50 },
    {
      chapter: 5,
      name: 'Principles of Inheritance and Variation',
      neetWeightage: 'HIGH',
      targetQuestions: 100,
    },
    {
      chapter: 6,
      name: 'Molecular Basis of Inheritance',
      neetWeightage: 'HIGH',
      targetQuestions: 100,
    },
    { chapter: 7, name: 'Evolution', neetWeightage: 'HIGH', targetQuestions: 80 },
    { chapter: 8, name: 'Human Health and Disease', neetWeightage: 'HIGH', targetQuestions: 80 },
    {
      chapter: 9,
      name: 'Strategies for Enhancement in Food Production',
      neetWeightage: 'MEDIUM',
      targetQuestions: 50,
    },
    {
      chapter: 10,
      name: 'Microbes in Human Welfare',
      neetWeightage: 'MEDIUM',
      targetQuestions: 50,
    },
    {
      chapter: 11,
      name: 'Biotechnology: Principles and Processes',
      neetWeightage: 'HIGH',
      targetQuestions: 90,
    },
    {
      chapter: 12,
      name: 'Biotechnology and its Applications',
      neetWeightage: 'HIGH',
      targetQuestions: 80,
    },
    { chapter: 13, name: 'Organisms and Populations', neetWeightage: 'HIGH', targetQuestions: 80 },
    { chapter: 14, name: 'Ecosystem', neetWeightage: 'HIGH', targetQuestions: 80 },
    {
      chapter: 15,
      name: 'Biodiversity and Conservation',
      neetWeightage: 'MEDIUM',
      targetQuestions: 60,
    },
    { chapter: 16, name: 'Environmental Issues', neetWeightage: 'MEDIUM', targetQuestions: 50 },
  ],
}

interface Progress {
  startedAt: string
  lastUpdated: string
  completedChapters: { ncertClass: number; chapter: number; questionsGenerated: number }[]
  failedChapters: { ncertClass: number; chapter: number; error: string }[]
  totalQuestionsGenerated: number
  totalQuestionsTarget: number
}

function loadProgress(): Progress {
  try {
    return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf-8'))
  } catch {
    return {
      startedAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      completedChapters: [],
      failedChapters: [],
      totalQuestionsGenerated: 0,
      totalQuestionsTarget: 20520,
    }
  }
}

function saveProgress(progress: Progress) {
  progress.lastUpdated = new Date().toISOString()
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2))
}

function isChapterCompleted(progress: Progress, ncertClass: number, chapter: number): boolean {
  return progress.completedChapters.some(
    (c) => c.ncertClass === ncertClass && c.chapter === chapter
  )
}

async function generateChapterQuestions(
  ncertClass: 11 | 12,
  chapterNo: number,
  chapterName: string,
  targetQuestions: number,
  neetWeightage: string
): Promise<number> {
  console.log(`\n${'='.repeat(60)}`)
  console.log(`Generating MCQs for Class ${ncertClass}, Chapter ${chapterNo}: ${chapterName}`)
  console.log(`Target: ${targetQuestions} questions | NEET Weightage: ${neetWeightage}`)
  console.log(`${'='.repeat(60)}\n`)

  let totalGenerated = 0
  const batchSize = 10
  const batches = Math.ceil(targetQuestions / batchSize)
  const difficulties = ['EASY', 'MEDIUM', 'HARD'] as const
  const difficultyDistribution = { EASY: 0.3, MEDIUM: 0.5, HARD: 0.2 }

  for (let batch = 0; batch < batches; batch++) {
    const remainingCount = targetQuestions - totalGenerated
    const batchCount = Math.min(batchSize, remainingCount)

    if (batchCount <= 0) break

    // Vary difficulty across batches
    const progress = batch / batches
    let difficulty: 'EASY' | 'MEDIUM' | 'HARD'
    if (progress < difficultyDistribution.EASY) {
      difficulty = 'EASY'
    } else if (progress < difficultyDistribution.EASY + difficultyDistribution.MEDIUM) {
      difficulty = 'MEDIUM'
    } else {
      difficulty = 'HARD'
    }

    console.log(
      `  Batch ${batch + 1}/${batches}: Generating ${batchCount} ${difficulty} questions...`
    )

    try {
      const result = await shekharSir.generateQuestions({
        ncertClass,
        ncertChapter: chapterNo,
        ncertChapterName: chapterName,
        count: batchCount,
        difficulty,
        includeNEETImportant: neetWeightage === 'HIGH' || neetWeightage === 'VERY_HIGH',
        includePYQStyle: true,
      })

      console.log(`    Generated ${result.questions.length} questions`)

      // Balance and save questions
      const balancedQuestions = balanceAnswerDistribution(result.questions)
      const savedCount = await saveQuestionsToDatabase(
        balancedQuestions,
        ncertClass,
        chapterNo,
        chapterName,
        neetWeightage
      )
      console.log(`    Saved ${savedCount} questions to database`)

      totalGenerated += savedCount

      // Rate limiting - wait between batches
      if (batch < batches - 1) {
        console.log(`    Waiting 3 seconds before next batch...`)
        await sleep(3000)
      }
    } catch (error) {
      console.error(`    Error in batch ${batch + 1}:`, error)
      // Continue with next batch
    }
  }

  console.log(`\n✅ Chapter ${chapterNo} complete: Generated ${totalGenerated} questions`)
  return totalGenerated
}

function balanceAnswerDistribution(questions: QuestionSeed[]): QuestionSeed[] {
  const distribution = { A: 0, B: 0, C: 0, D: 0 }
  const targetPerOption = Math.ceil(questions.length / 4)
  const balanced: QuestionSeed[] = []

  for (const q of questions) {
    const correctIndex = q.options?.findIndex((o) => o === q.correctAnswer) ?? -1
    if (correctIndex === -1) {
      balanced.push(q)
      continue
    }

    const currentOption = ['A', 'B', 'C', 'D'][correctIndex] as keyof typeof distribution

    if (distribution[currentOption] < targetPerOption) {
      distribution[currentOption]++
      balanced.push(q)
    } else {
      // Rotate options for balance
      const options = ['A', 'B', 'C', 'D']
      const needsMore = options.find(
        (opt) => distribution[opt as keyof typeof distribution] < targetPerOption
      )
      if (needsMore) {
        const targetIndex = options.indexOf(needsMore)
        const newOptions = [...(q.options || [])]
        const temp = newOptions[targetIndex]
        newOptions[targetIndex] = newOptions[correctIndex]
        newOptions[correctIndex] = temp
        distribution[needsMore as keyof typeof distribution]++
        balanced.push({ ...q, options: newOptions })
      } else {
        balanced.push(q)
      }
    }
  }

  return balanced
}

async function saveQuestionsToDatabase(
  questions: QuestionSeed[],
  ncertClass: number,
  chapterNo: number,
  chapterName: string,
  neetWeightage: string
): Promise<number> {
  let savedCount = 0

  for (const q of questions) {
    try {
      // Check for duplicates
      const existing = await prisma.questions.findFirst({
        where: {
          question: q.question,
          ncertClass,
          ncertChapter: chapterNo,
        },
      })

      if (existing) {
        console.log(`      Skipping duplicate...`)
        continue
      }

      // Find correct answer index for letter
      const correctIndex = q.options?.findIndex((o) => o === q.correctAnswer) ?? 0
      const correctLetter = ['A', 'B', 'C', 'D'][correctIndex]

      await prisma.questions.create({
        data: {
          id: `ncert_${ncertClass}_${chapterNo}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          question: q.question,
          type: q.type || 'MCQ',
          options: q.options || [],
          correctAnswer: correctLetter,
          explanation: q.explanation || '',
          difficulty: q.difficulty || 'MEDIUM',
          category: 'PRACTICE',
          curriculum: 'NCERT',
          grade: ncertClass.toString(),
          topic: q.topic || chapterName,
          subtopic: q.subtopic,
          tags: q.tags || [],
          ncertClass,
          ncertChapter: chapterNo,
          ncertChapterName: chapterName,
          ncertPage: q.ncertPage,
          ncertFigure: q.ncertFigure,
          isNcertBased: true,
          neetWeightage: q.neetWeightage || neetWeightage,
          isNeetImportant: neetWeightage === 'HIGH' || neetWeightage === 'VERY_HIGH',
          updatedAt: new Date(),
        },
      })

      savedCount++
    } catch (error) {
      console.error(`      Failed to save question:`, error)
    }
  }

  return savedCount
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function generateAllChapters() {
  const progress = loadProgress()

  console.log('\n' + '='.repeat(70))
  console.log('NCERT MCQ GENERATION - ALL CHAPTERS')
  console.log('='.repeat(70))
  console.log(`Total questions generated so far: ${progress.totalQuestionsGenerated}`)
  console.log(`Completed chapters: ${progress.completedChapters.length}`)
  console.log('='.repeat(70) + '\n')

  // Generate Class 11 chapters
  for (const chapter of NCERT_CHAPTERS.class11) {
    if (isChapterCompleted(progress, 11, chapter.chapter)) {
      console.log(`⏭️  Skipping Class 11, Chapter ${chapter.chapter} (already completed)`)
      continue
    }

    try {
      const generated = await generateChapterQuestions(
        11,
        chapter.chapter,
        chapter.name,
        chapter.targetQuestions,
        chapter.neetWeightage
      )

      progress.completedChapters.push({
        ncertClass: 11,
        chapter: chapter.chapter,
        questionsGenerated: generated,
      })
      progress.totalQuestionsGenerated += generated
      saveProgress(progress)

      // Wait between chapters
      console.log('\nWaiting 5 seconds before next chapter...\n')
      await sleep(5000)
    } catch (error) {
      console.error(`❌ Failed to generate Class 11, Chapter ${chapter.chapter}:`, error)
      progress.failedChapters.push({
        ncertClass: 11,
        chapter: chapter.chapter,
        error: String(error),
      })
      saveProgress(progress)
    }
  }

  // Generate Class 12 chapters
  for (const chapter of NCERT_CHAPTERS.class12) {
    if (isChapterCompleted(progress, 12, chapter.chapter)) {
      console.log(`⏭️  Skipping Class 12, Chapter ${chapter.chapter} (already completed)`)
      continue
    }

    try {
      const generated = await generateChapterQuestions(
        12,
        chapter.chapter,
        chapter.name,
        chapter.targetQuestions,
        chapter.neetWeightage
      )

      progress.completedChapters.push({
        ncertClass: 12,
        chapter: chapter.chapter,
        questionsGenerated: generated,
      })
      progress.totalQuestionsGenerated += generated
      saveProgress(progress)

      // Wait between chapters
      console.log('\nWaiting 5 seconds before next chapter...\n')
      await sleep(5000)
    } catch (error) {
      console.error(`❌ Failed to generate Class 12, Chapter ${chapter.chapter}:`, error)
      progress.failedChapters.push({
        ncertClass: 12,
        chapter: chapter.chapter,
        error: String(error),
      })
      saveProgress(progress)
    }
  }

  console.log('\n' + '='.repeat(70))
  console.log('GENERATION COMPLETE')
  console.log('='.repeat(70))
  console.log(`Total questions generated: ${progress.totalQuestionsGenerated}`)
  console.log(`Completed chapters: ${progress.completedChapters.length}/38`)
  console.log(`Failed chapters: ${progress.failedChapters.length}`)
  console.log('='.repeat(70) + '\n')
}

async function generateSingleChapter(ncertClass: 11 | 12, chapterNo: number) {
  const chapters = ncertClass === 11 ? NCERT_CHAPTERS.class11 : NCERT_CHAPTERS.class12
  const chapter = chapters.find((c) => c.chapter === chapterNo)

  if (!chapter) {
    console.error(`Chapter ${chapterNo} not found for Class ${ncertClass}`)
    process.exit(1)
  }

  const progress = loadProgress()

  if (isChapterCompleted(progress, ncertClass, chapterNo)) {
    console.log(`Chapter already completed. Use --force to regenerate.`)
    return
  }

  const generated = await generateChapterQuestions(
    ncertClass,
    chapter.chapter,
    chapter.name,
    chapter.targetQuestions,
    chapter.neetWeightage
  )

  progress.completedChapters.push({
    ncertClass,
    chapter: chapterNo,
    questionsGenerated: generated,
  })
  progress.totalQuestionsGenerated += generated
  saveProgress(progress)
}

async function main() {
  const args = process.argv.slice(2)

  try {
    if (args.includes('--all') || args.includes('--resume')) {
      await generateAllChapters()
    } else if (args.length >= 2) {
      const ncertClass = parseInt(args[0]) as 11 | 12
      const chapterNo = parseInt(args[1])

      if (ncertClass !== 11 && ncertClass !== 12) {
        console.error('Class must be 11 or 12')
        process.exit(1)
      }

      await generateSingleChapter(ncertClass, chapterNo)
    } else {
      console.log('Usage:')
      console.log('  npx tsx scripts/ncert-mcq/generate-ncert-mcqs-cli.ts <class> <chapter>')
      console.log('  npx tsx scripts/ncert-mcq/generate-ncert-mcqs-cli.ts --all')
      console.log('  npx tsx scripts/ncert-mcq/generate-ncert-mcqs-cli.ts --resume')
      console.log('')
      console.log('Examples:')
      console.log(
        '  npx tsx scripts/ncert-mcq/generate-ncert-mcqs-cli.ts 11 3  # Class 11, Chapter 3'
      )
      console.log('  npx tsx scripts/ncert-mcq/generate-ncert-mcqs-cli.ts --all  # All chapters')
    }
  } finally {
    await prisma.$disconnect()
  }
}

main()
