/**
 * Generate All NCERT MCQs - Master Script
 *
 * Orchestrates the generation of 25-30 MCQs per page for all 38 NCERT Biology chapters.
 * Prioritizes high-weightage chapters and tracks progress for resumable execution.
 */

import { PrismaClient } from '../../src/generated/prisma/index.js'
import { NCERTContentReader, NCERTChapter } from '../../src/lib/ncert/NCERTContentReader'
import { generateChapterMCQs, GenerationResult, GenerationConfig } from './generate-chapter-mcqs'
import * as fs from 'fs'
import * as path from 'path'

const prisma = new PrismaClient()
const ncertReader = new NCERTContentReader()

interface ProgressState {
  startedAt: string
  lastUpdated: string
  completedChapters: { ncertClass: number; chapter: number; questionsGenerated: number }[]
  failedChapters: { ncertClass: number; chapter: number; error: string }[]
  totalQuestionsGenerated: number
  totalQuestionsTarget: number
}

const PROGRESS_FILE = path.join(process.cwd(), 'resources', 'ncert-mcq-progress.json')

/**
 * Load or initialize progress state
 */
function loadProgress(): ProgressState {
  if (fs.existsSync(PROGRESS_FILE)) {
    const content = fs.readFileSync(PROGRESS_FILE, 'utf-8')
    return JSON.parse(content)
  }

  return {
    startedAt: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
    completedChapters: [],
    failedChapters: [],
    totalQuestionsGenerated: 0,
    totalQuestionsTarget: 0,
  }
}

/**
 * Save progress state
 */
function saveProgress(state: ProgressState): void {
  state.lastUpdated = new Date().toISOString()
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(state, null, 2))
}

/**
 * Check if chapter has been completed
 */
function isChapterCompleted(state: ProgressState, ncertClass: number, chapter: number): boolean {
  return state.completedChapters.some((c) => c.ncertClass === ncertClass && c.chapter === chapter)
}

/**
 * Get chapters ordered by priority (high weightage first)
 */
async function getPrioritizedChapters(): Promise<NCERTChapter[]> {
  const index = await ncertReader.loadIndex()
  const allChapters = [...index.class11.chapters, ...index.class12.chapters]

  // Sort by NEET weightage priority
  const weightageOrder = { VERY_HIGH: 0, HIGH: 1, MEDIUM: 2, LOW: 3 }

  return allChapters.sort((a, b) => {
    const aWeight = weightageOrder[a.neetWeightage as keyof typeof weightageOrder] ?? 3
    const bWeight = weightageOrder[b.neetWeightage as keyof typeof weightageOrder] ?? 3
    if (aWeight !== bWeight) return aWeight - bWeight
    // If same weightage, prioritize Class 12 (more important for NEET)
    if (a.ncertClass !== b.ncertClass) return b.ncertClass - a.ncertClass
    return a.number - b.number
  })
}

/**
 * Calculate total target questions
 */
async function calculateTargetQuestions(): Promise<number> {
  const stats = await ncertReader.getSummaryStats()
  // 27 questions per page (average of 25-30)
  return stats.totalPages * 27
}

/**
 * Generate MCQs for all chapters with progress tracking
 */
async function generateAllNCERTMCQs(config: Partial<GenerationConfig> = {}): Promise<void> {
  console.log('\n' + '='.repeat(70))
  console.log('NCERT Biology MCQ Generation - Master Script')
  console.log('='.repeat(70))

  // Load existing progress
  const state = loadProgress()
  console.log(`\nProgress loaded: ${state.completedChapters.length} chapters completed`)

  // Calculate targets
  const stats = await ncertReader.getSummaryStats()
  state.totalQuestionsTarget = await calculateTargetQuestions()

  console.log(`\nTotal chapters: ${stats.totalChapters}`)
  console.log(`Total pages: ${stats.totalPages}`)
  console.log(`Target questions: ${state.totalQuestionsTarget}`)
  console.log(`Available chapters: ${stats.availableChapters}`)

  // Get prioritized chapter list
  const chapters = await getPrioritizedChapters()
  console.log(`\nChapter priority order determined`)

  // Get current question count
  const currentCount = await prisma.questions.count({
    where: { isNcertBased: true },
  })
  state.totalQuestionsGenerated = currentCount
  console.log(`Current NCERT-based questions: ${currentCount}`)

  // Process each chapter
  let processedCount = 0
  const totalToProcess = chapters.filter(
    (ch) => !isChapterCompleted(state, ch.ncertClass, ch.number) && ch.pdfAvailable
  ).length

  console.log(`Chapters to process: ${totalToProcess}`)
  console.log('\n' + '-'.repeat(70))

  for (const chapter of chapters) {
    // Skip if already completed
    if (isChapterCompleted(state, chapter.ncertClass, chapter.number)) {
      console.log(`[SKIP] Class ${chapter.ncertClass} Ch.${chapter.number}: ${chapter.name} (already done)`)
      continue
    }

    // Skip if PDF not available
    if (!chapter.pdfAvailable) {
      console.log(`[SKIP] Class ${chapter.ncertClass} Ch.${chapter.number}: ${chapter.name} (no PDF)`)
      continue
    }

    processedCount++
    console.log(`\n[${'#'.repeat(processedCount)}${'.'.repeat(totalToProcess - processedCount)}] Processing ${processedCount}/${totalToProcess}`)

    try {
      const result = await generateChapterMCQs(chapter.ncertClass as 11 | 12, chapter.number, {
        ...config,
        verifyQuestions: true,
        saveToDatabase: true,
      })

      // Update progress
      state.completedChapters.push({
        ncertClass: chapter.ncertClass,
        chapter: chapter.number,
        questionsGenerated: result.totalSaved,
      })
      state.totalQuestionsGenerated += result.totalSaved

      saveProgress(state)

      console.log(`[SUCCESS] Class ${chapter.ncertClass} Ch.${chapter.number}: ${result.totalSaved} questions saved`)

      // Longer delay between chapters to avoid rate limits
      await sleep(5000)
    } catch (error) {
      console.error(`[FAILED] Class ${chapter.ncertClass} Ch.${chapter.number}: ${error}`)

      state.failedChapters.push({
        ncertClass: chapter.ncertClass,
        chapter: chapter.number,
        error: String(error),
      })

      saveProgress(state)

      // Continue with next chapter despite errors
      await sleep(2000)
    }
  }

  // Final summary
  console.log('\n' + '='.repeat(70))
  console.log('GENERATION COMPLETE')
  console.log('='.repeat(70))
  console.log(`\nCompleted chapters: ${state.completedChapters.length}`)
  console.log(`Failed chapters: ${state.failedChapters.length}`)
  console.log(`Total questions generated: ${state.totalQuestionsGenerated}`)
  console.log(`Target: ${state.totalQuestionsTarget}`)
  console.log(`Achievement: ${((state.totalQuestionsGenerated / state.totalQuestionsTarget) * 100).toFixed(1)}%`)

  if (state.failedChapters.length > 0) {
    console.log('\nFailed chapters:')
    for (const failed of state.failedChapters) {
      console.log(`  - Class ${failed.ncertClass} Ch.${failed.chapter}: ${failed.error}`)
    }
  }

  // Save final progress
  saveProgress(state)

  // Final database stats
  await printDatabaseStats()
}

/**
 * Print current database statistics
 */
async function printDatabaseStats(): Promise<void> {
  console.log('\n' + '-'.repeat(70))
  console.log('DATABASE STATISTICS')
  console.log('-'.repeat(70))

  const totalQuestions = await prisma.questions.count()
  const ncertQuestions = await prisma.questions.count({ where: { isNcertBased: true } })
  const pyqQuestions = await prisma.questions.count({ where: { category: 'PREVIOUS_YEAR' } })

  // Answer distribution
  const answerDist = await prisma.$queryRaw<{ correctAnswer: string; count: bigint }[]>`
    SELECT "correctAnswer", COUNT(*) as count
    FROM questions
    WHERE "isNcertBased" = true
    GROUP BY "correctAnswer"
  `

  // Difficulty distribution
  const diffDist = await prisma.$queryRaw<{ difficulty: string; count: bigint }[]>`
    SELECT difficulty, COUNT(*) as count
    FROM questions
    WHERE "isNcertBased" = true
    GROUP BY difficulty
  `

  // Chapter distribution
  const chapterDist = await prisma.$queryRaw<{ ncertClass: number; ncertChapter: number; count: bigint }[]>`
    SELECT "ncertClass", "ncertChapter", COUNT(*) as count
    FROM questions
    WHERE "isNcertBased" = true AND "ncertClass" IS NOT NULL
    GROUP BY "ncertClass", "ncertChapter"
    ORDER BY "ncertClass", "ncertChapter"
  `

  console.log(`\nTotal questions: ${totalQuestions}`)
  console.log(`NCERT-based: ${ncertQuestions} (${((ncertQuestions / totalQuestions) * 100).toFixed(1)}%)`)
  console.log(`PYQs: ${pyqQuestions} (${((pyqQuestions / totalQuestions) * 100).toFixed(1)}%)`)

  console.log('\nAnswer Distribution (NCERT questions):')
  for (const row of answerDist) {
    const pct = ((Number(row.count) / ncertQuestions) * 100).toFixed(1)
    console.log(`  ${row.correctAnswer}: ${row.count} (${pct}%)`)
  }

  console.log('\nDifficulty Distribution (NCERT questions):')
  for (const row of diffDist) {
    const pct = ((Number(row.count) / ncertQuestions) * 100).toFixed(1)
    console.log(`  ${row.difficulty}: ${row.count} (${pct}%)`)
  }

  console.log('\nChapter Coverage:')
  const class11Chapters = chapterDist.filter((c) => c.ncertClass === 11)
  const class12Chapters = chapterDist.filter((c) => c.ncertClass === 12)

  console.log(`  Class 11: ${class11Chapters.length} chapters covered`)
  console.log(`  Class 12: ${class12Chapters.length} chapters covered`)
}

/**
 * Retry failed chapters
 */
async function retryFailedChapters(config: Partial<GenerationConfig> = {}): Promise<void> {
  const state = loadProgress()

  if (state.failedChapters.length === 0) {
    console.log('No failed chapters to retry')
    return
  }

  console.log(`Retrying ${state.failedChapters.length} failed chapters...`)

  const failedCopy = [...state.failedChapters]
  state.failedChapters = []

  for (const failed of failedCopy) {
    try {
      const result = await generateChapterMCQs(failed.ncertClass as 11 | 12, failed.chapter, config)

      state.completedChapters.push({
        ncertClass: failed.ncertClass,
        chapter: failed.chapter,
        questionsGenerated: result.totalSaved,
      })
      state.totalQuestionsGenerated += result.totalSaved

      console.log(`[RETRY SUCCESS] Class ${failed.ncertClass} Ch.${failed.chapter}`)
    } catch (error) {
      state.failedChapters.push({
        ncertClass: failed.ncertClass,
        chapter: failed.chapter,
        error: String(error),
      })
      console.log(`[RETRY FAILED] Class ${failed.ncertClass} Ch.${failed.chapter}`)
    }

    saveProgress(state)
    await sleep(5000)
  }
}

/**
 * Generate questions for a specific class only
 */
async function generateForClass(ncertClass: 11 | 12, config: Partial<GenerationConfig> = {}): Promise<void> {
  const chapters = await ncertReader.getChaptersForClass(ncertClass)
  const state = loadProgress()

  console.log(`\nGenerating for Class ${ncertClass} (${chapters.length} chapters)`)

  for (const chapter of chapters) {
    if (isChapterCompleted(state, ncertClass, chapter.number) || !chapter.pdfAvailable) {
      continue
    }

    try {
      const result = await generateChapterMCQs(ncertClass, chapter.number, config)
      state.completedChapters.push({
        ncertClass,
        chapter: chapter.number,
        questionsGenerated: result.totalSaved,
      })
      state.totalQuestionsGenerated += result.totalSaved
      saveProgress(state)
    } catch (error) {
      state.failedChapters.push({
        ncertClass,
        chapter: chapter.number,
        error: String(error),
      })
      saveProgress(state)
    }

    await sleep(5000)
  }
}

/**
 * Utility sleep function
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * CLI entry point
 */
async function main() {
  const args = process.argv.slice(2)

  const command = args[0] || 'all'
  const dryRun = args.includes('--dry-run')

  const config: Partial<GenerationConfig> = { dryRun }

  try {
    switch (command) {
      case 'all':
        await generateAllNCERTMCQs(config)
        break

      case 'class11':
        await generateForClass(11, config)
        break

      case 'class12':
        await generateForClass(12, config)
        break

      case 'retry':
        await retryFailedChapters(config)
        break

      case 'stats':
        await printDatabaseStats()
        break

      case 'progress':
        const state = loadProgress()
        console.log(JSON.stringify(state, null, 2))
        break

      default:
        console.log('NCERT MCQ Generator - Master Script')
        console.log('\nUsage:')
        console.log('  npx ts-node scripts/ncert-mcq/generate-all-ncert-mcqs.ts [command] [options]')
        console.log('\nCommands:')
        console.log('  all       - Generate for all chapters (default)')
        console.log('  class11   - Generate for Class 11 only')
        console.log('  class12   - Generate for Class 12 only')
        console.log('  retry     - Retry failed chapters')
        console.log('  stats     - Print database statistics')
        console.log('  progress  - Show current progress')
        console.log('\nOptions:')
        console.log('  --dry-run - Run without saving to database')
    }
  } finally {
    await prisma.$disconnect()
  }
}

// Run if called directly
if (require.main === module) {
  main()
}

export { generateAllNCERTMCQs, generateForClass, retryFailedChapters, printDatabaseStats }
