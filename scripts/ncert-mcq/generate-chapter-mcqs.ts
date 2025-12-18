/**
 * Generate Chapter MCQs Script
 *
 * Generates 25-30 NEET-style MCQs per page of NCERT content for a specific chapter.
 * Uses ShekharSirAgent for generation and ArchanaMaamAgent for verification.
 * Applies PYQ framing skills for authentic NEET patterns.
 */

import * as dotenv from 'dotenv'
// Load environment variables from .env file
dotenv.config()

import { PrismaClient } from '../../src/generated/prisma/index.js'
import { ShekharSirAgent, GenerationRequest } from '../../src/lib/ai/agents/ShekharSirAgent'
import { ArchanaMaamAgent } from '../../src/lib/ai/agents/ArchanaMaamAgent'
import { NCERTContentReader, NCERTChapter, NCERTPage } from '../../src/lib/ncert/NCERTContentReader'
import {
  NEET_QUESTION_TYPES,
  calculateTypeDistribution,
  generateQuestionPrompt,
  validateQuestionAgainstNEETStandards,
  DIFFICULTY_CALIBRATION,
} from '../../src/lib/ai/skills/PYQFramingSkill'
import { QuestionSeed } from '../question-seeder/types'

const prisma = new PrismaClient()
const shekharSir = new ShekharSirAgent()
const archanaMaam = new ArchanaMaamAgent()
const ncertReader = new NCERTContentReader()

interface GenerationConfig {
  questionsPerPage: number
  minQuestionsPerPage: number
  maxQuestionsPerPage: number
  difficultyDistribution: { EASY: number; MEDIUM: number; HARD: number }
  batchSize: number
  verifyQuestions: boolean
  saveToDatabase: boolean
  dryRun: boolean
}

const DEFAULT_CONFIG: GenerationConfig = {
  questionsPerPage: 27, // Average of 25-30
  minQuestionsPerPage: 25,
  maxQuestionsPerPage: 30,
  difficultyDistribution: { EASY: 0.3, MEDIUM: 0.5, HARD: 0.2 },
  batchSize: 10,
  verifyQuestions: true,
  saveToDatabase: true,
  dryRun: false,
}

interface GenerationResult {
  chapter: NCERTChapter
  totalGenerated: number
  totalVerified: number
  totalSaved: number
  pageResults: {
    pageNumber: number
    generated: number
    verified: number
    saved: number
  }[]
  errors: string[]
  duration: number
}

/**
 * Generate questions for a specific NCERT chapter
 */
export async function generateChapterMCQs(
  ncertClass: 11 | 12,
  chapterNumber: number,
  config: Partial<GenerationConfig> = {}
): Promise<GenerationResult> {
  const cfg = { ...DEFAULT_CONFIG, ...config }
  const startTime = Date.now()
  const errors: string[] = []

  console.log(`\n${'='.repeat(60)}`)
  console.log(`Generating MCQs for Class ${ncertClass}, Chapter ${chapterNumber}`)
  console.log(`${'='.repeat(60)}`)

  // Load chapter metadata
  const chapter = await ncertReader.getChapter(ncertClass, chapterNumber)
  if (!chapter) {
    throw new Error(`Chapter ${chapterNumber} not found for Class ${ncertClass}`)
  }

  console.log(`Chapter: ${chapter.name}`)
  console.log(`Pages: ${chapter.startPage}-${chapter.endPage} (${chapter.totalPages} pages)`)
  console.log(`NEET Weightage: ${chapter.neetWeightage}`)
  console.log(`Target Questions: ${chapter.totalPages * cfg.questionsPerPage}`)

  // Get chapter pages with content
  const pages = await ncertReader.getChapterPages(ncertClass, chapterNumber)
  console.log(`\nLoaded ${pages.length} pages of content`)

  const pageResults: GenerationResult['pageResults'] = []
  let totalGenerated = 0
  let totalVerified = 0
  let totalSaved = 0

  // Generate questions for each page
  for (const page of pages) {
    console.log(`\n--- Page ${page.pageNumber} ---`)

    const pageResult = await generatePageQuestions(page, chapter, cfg)

    pageResults.push({
      pageNumber: page.pageNumber,
      generated: pageResult.generated,
      verified: pageResult.verified,
      saved: pageResult.saved,
    })

    totalGenerated += pageResult.generated
    totalVerified += pageResult.verified
    totalSaved += pageResult.saved

    if (pageResult.errors.length > 0) {
      errors.push(...pageResult.errors)
    }

    // Rate limiting between pages
    await sleep(2000)
  }

  const duration = Date.now() - startTime

  console.log(`\n${'='.repeat(60)}`)
  console.log(`Chapter ${chapterNumber} Generation Complete`)
  console.log(`${'='.repeat(60)}`)
  console.log(`Total Generated: ${totalGenerated}`)
  console.log(`Total Verified: ${totalVerified}`)
  console.log(`Total Saved: ${totalSaved}`)
  console.log(`Duration: ${(duration / 1000 / 60).toFixed(1)} minutes`)
  if (errors.length > 0) {
    console.log(`Errors: ${errors.length}`)
  }

  return {
    chapter,
    totalGenerated,
    totalVerified,
    totalSaved,
    pageResults,
    errors,
    duration,
  }
}

/**
 * Generate questions for a single page
 */
async function generatePageQuestions(
  page: NCERTPage,
  chapter: NCERTChapter,
  config: GenerationConfig
): Promise<{
  generated: number
  verified: number
  saved: number
  errors: string[]
}> {
  const errors: string[] = []
  const allQuestions: QuestionSeed[] = []

  // Calculate question type distribution for this page
  const typeDistribution = calculateTypeDistribution(config.questionsPerPage)

  console.log(`  Generating ${config.questionsPerPage} questions...`)
  console.log(`  Key terms: ${page.keyTerms.slice(0, 5).join(', ')}`)
  console.log(`  Figures: ${page.figures.join(', ') || 'None'}`)

  // Generate questions by type
  for (const [qType, count] of typeDistribution) {
    if (count === 0) continue

    // Determine difficulty for this batch
    const difficulty = getDifficultyForBatch(allQuestions.length, config.questionsPerPage, config.difficultyDistribution)

    try {
      console.log(`    Calling Claude API for ${count} ${qType} questions (${difficulty})...`)

      const result = await shekharSir.generateQuestions({
        ncertClass: chapter.ncertClass,
        ncertChapter: chapter.number,
        ncertChapterName: chapter.name,
        count,
        difficulty,
        topics: chapter.topicsCovered, // Add chapter topics for context
        includePYQStyle: true,
        includeNEETImportant: chapter.neetWeightage === 'VERY_HIGH' || chapter.neetWeightage === 'HIGH',
        questionTypes: [qType as 'MCQ' | 'MATCH_FOLLOWING' | 'TRUE_FALSE' | 'DIAGRAM'],
      })

      console.log(`    API returned ${result.questions.length} questions`)

      // Add NCERT page reference to each question
      const questionsWithPage = result.questions.map((q) => ({
        ...q,
        ncertPage: page.pageNumber,
        isNcertBased: true,
      }))

      allQuestions.push(...questionsWithPage)

      // Small delay between API calls
      await sleep(1000)
    } catch (error) {
      console.error(`    API Error: ${error}`)
      errors.push(`Failed to generate ${qType} questions: ${error}`)
    }
  }

  console.log(`  Generated: ${allQuestions.length} questions`)

  // Verify questions if enabled
  let verifiedQuestions = allQuestions
  if (config.verifyQuestions && allQuestions.length > 0) {
    console.log(`  Verifying questions...`)
    const verificationResults = await archanaMaam.verifyBatch(allQuestions)
    verifiedQuestions = allQuestions.filter((_, i) => verificationResults.results[i]?.isValid)
    console.log(`  Verified: ${verifiedQuestions.length}/${allQuestions.length}`)
  }

  // Balance answer distribution
  const balancedQuestions = balanceAnswerDistribution(verifiedQuestions)

  // Save to database if enabled
  let savedCount = 0
  if (config.saveToDatabase && !config.dryRun && balancedQuestions.length > 0) {
    console.log(`  Saving to database...`)
    savedCount = await saveQuestionsToDatabase(balancedQuestions, chapter)
    console.log(`  Saved: ${savedCount} questions`)
  }

  return {
    generated: allQuestions.length,
    verified: verifiedQuestions.length,
    saved: savedCount,
    errors,
  }
}

/**
 * Determine difficulty level based on batch position
 */
function getDifficultyForBatch(
  currentCount: number,
  totalCount: number,
  distribution: { EASY: number; MEDIUM: number; HARD: number }
): 'EASY' | 'MEDIUM' | 'HARD' {
  const progress = currentCount / totalCount
  const easyThreshold = distribution.EASY
  const mediumThreshold = easyThreshold + distribution.MEDIUM

  if (progress < easyThreshold) return 'EASY'
  if (progress < mediumThreshold) return 'MEDIUM'
  return 'HARD'
}

/**
 * Balance answer distribution across A, B, C, D
 */
function balanceAnswerDistribution(questions: QuestionSeed[]): QuestionSeed[] {
  // Count current distribution
  const distribution = { A: 0, B: 0, C: 0, D: 0 }
  const targetPerOption = Math.ceil(questions.length / 4)

  const balanced: QuestionSeed[] = []

  for (const q of questions) {
    // Find which option is correct
    const correctIndex = q.options?.findIndex((o) => o === q.correctAnswer) ?? -1
    const currentOption = ['A', 'B', 'C', 'D'][correctIndex] as keyof typeof distribution

    if (currentOption && distribution[currentOption] < targetPerOption) {
      // Keep as is
      distribution[currentOption]++
      balanced.push(q)
    } else {
      // Rotate options to balance distribution
      const newQ = rotateOptionsForBalance(q, distribution, targetPerOption)
      if (newQ) {
        balanced.push(newQ)
      }
    }
  }

  return balanced
}

/**
 * Rotate options to achieve better distribution
 */
function rotateOptionsForBalance(
  question: QuestionSeed,
  distribution: Record<string, number>,
  targetPerOption: number
): QuestionSeed | null {
  if (!question.options || question.options.length !== 4) return question

  // Find which position needs more questions
  const options = ['A', 'B', 'C', 'D']
  const needsMore = options.find((opt) => distribution[opt] < targetPerOption)

  if (!needsMore) return question

  const targetIndex = options.indexOf(needsMore)
  const currentCorrectIndex = question.options.findIndex((o) => o === question.correctAnswer)

  if (targetIndex === currentCorrectIndex) {
    distribution[needsMore]++
    return question
  }

  // Rotate options
  const newOptions = [...question.options]
  const temp = newOptions[targetIndex]
  newOptions[targetIndex] = newOptions[currentCorrectIndex]
  newOptions[currentCorrectIndex] = temp

  distribution[needsMore]++

  return {
    ...question,
    options: newOptions,
    correctAnswer: question.correctAnswer, // Correct answer text stays the same
  }
}

/**
 * Save questions to database
 */
async function saveQuestionsToDatabase(questions: QuestionSeed[], chapter: NCERTChapter): Promise<number> {
  let savedCount = 0

  for (const q of questions) {
    try {
      // Check for duplicates
      const existing = await prisma.questions.findFirst({
        where: {
          question: q.question,
          ncertClass: chapter.ncertClass,
          ncertChapter: chapter.number,
        },
      })

      if (existing) {
        console.log(`    Skipping duplicate: ${q.question.slice(0, 50)}...`)
        continue
      }

      // Find correct answer index for letter
      const correctIndex = q.options?.findIndex((o) => o === q.correctAnswer) ?? 0
      const correctLetter = ['A', 'B', 'C', 'D'][correctIndex]

      await prisma.questions.create({
        data: {
          id: `ncert_${chapter.ncertClass}_${chapter.number}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          question: q.question,
          type: q.type || 'MCQ',
          options: q.options || [],
          correctAnswer: correctLetter,
          explanation: q.explanation || '',
          difficulty: q.difficulty || 'MEDIUM',
          category: 'PRACTICE',
          curriculum: 'NCERT',
          grade: chapter.ncertClass.toString(),
          topic: q.topic || chapter.topicsCovered[0] || chapter.name,
          subtopic: q.subtopic,
          tags: q.tags || [],
          ncertClass: chapter.ncertClass,
          ncertChapter: chapter.number,
          ncertChapterName: chapter.name,
          ncertPage: q.ncertPage,
          ncertFigure: q.ncertFigure,
          isNcertBased: true,
          neetWeightage: q.neetWeightage || chapter.neetWeightage,
          isNeetImportant: chapter.neetWeightage === 'VERY_HIGH' || chapter.neetWeightage === 'HIGH',
          updatedAt: new Date(),
        },
      })

      savedCount++
    } catch (error) {
      console.error(`    Failed to save question: ${error}`)
    }
  }

  return savedCount
}

/**
 * Utility function for delays
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * CLI entry point
 */
async function main() {
  const args = process.argv.slice(2)

  if (args.length < 2) {
    console.log('Usage: npx ts-node scripts/ncert-mcq/generate-chapter-mcqs.ts <class> <chapter> [--dry-run]')
    console.log('Example: npx ts-node scripts/ncert-mcq/generate-chapter-mcqs.ts 11 8')
    process.exit(1)
  }

  const ncertClass = parseInt(args[0]) as 11 | 12
  const chapterNumber = parseInt(args[1])
  const dryRun = args.includes('--dry-run')

  if (ncertClass !== 11 && ncertClass !== 12) {
    console.error('Class must be 11 or 12')
    process.exit(1)
  }

  try {
    const result = await generateChapterMCQs(ncertClass, chapterNumber, { dryRun })

    console.log('\n--- Final Summary ---')
    console.log(JSON.stringify(result, null, 2))
  } catch (error) {
    console.error('Generation failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

// Run if called directly
if (require.main === module) {
  main()
}

export type { GenerationConfig, GenerationResult }
