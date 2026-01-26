/**
 * Analyze PYQ Patterns Script
 *
 * Analyzes existing NEET PYQs (2008-2025) to extract question patterns,
 * stem structures, distractor techniques, and topic-specific styles.
 * The output is used to train the PYQFramingSkill for generating
 * authentic NEET-style questions.
 */

import { PrismaClient } from '../../src/generated/prisma/index.js'

const prisma = new PrismaClient()

interface PatternAnalysis {
  stemPatterns: { pattern: string; count: number; examples: string[] }[]
  questionTypes: { type: string; count: number; percentage: number }[]
  difficultyDistribution: { difficulty: string; count: number; percentage: number }[]
  topicPatterns: { topic: string; avgQuestions: number; commonPatterns: string[] }[]
  distractorTechniques: { technique: string; frequency: number }[]
  ncertReferences: { chapter: string; frequency: number }[]
}

// Common question stem patterns in NEET Biology
const STEM_PATTERNS = [
  { regex: /^Which of the following/i, name: 'WHICH_FOLLOWING' },
  { regex: /^Which one of the following/i, name: 'WHICH_ONE_FOLLOWING' },
  { regex: /^Select the correct/i, name: 'SELECT_CORRECT' },
  { regex: /^Select the incorrect/i, name: 'SELECT_INCORRECT' },
  { regex: /^Identify the correct/i, name: 'IDENTIFY_CORRECT' },
  { regex: /^Consider the following statements/i, name: 'CONSIDER_STATEMENTS' },
  { regex: /^Read the following statements/i, name: 'READ_STATEMENTS' },
  { regex: /^Match/i, name: 'MATCH_FOLLOWING' },
  { regex: /^Assertion.*Reason/i, name: 'ASSERTION_REASON' },
  { regex: /^In the given (diagram|figure)/i, name: 'DIAGRAM_BASED' },
  { regex: /^The (diagram|figure) shows/i, name: 'FIGURE_SHOWS' },
  { regex: /^Identify.*from the (diagram|figure)/i, name: 'IDENTIFY_DIAGRAM' },
  { regex: /^A student observed/i, name: 'APPLICATION_SCENARIO' },
  { regex: /^In an experiment/i, name: 'EXPERIMENT_BASED' },
  { regex: /^The process of/i, name: 'PROCESS_OF' },
  { regex: /^The function of/i, name: 'FUNCTION_OF' },
  { regex: /^Which (hormone|enzyme|vitamin)/i, name: 'WHICH_SUBSTANCE' },
  { regex: /^During (meiosis|mitosis|photosynthesis)/i, name: 'DURING_PROCESS' },
  { regex: /is (found|present|located) in/i, name: 'LOCATION_BASED' },
  { regex: /is responsible for/i, name: 'RESPONSIBLE_FOR' },
  { regex: /^\d+ and \d+ (are|is)/i, name: 'NUMBER_REFERENCE' },
  { regex: /^The correct sequence/i, name: 'CORRECT_SEQUENCE' },
  { regex: /^Which pair/i, name: 'WHICH_PAIR' },
  { regex: /^All of the following.*except/i, name: 'ALL_EXCEPT' },
]

// Distractor analysis patterns
const DISTRACTOR_PATTERNS = [
  { name: 'SIMILAR_SOUNDING', indicator: (opts: string[]) => hasSimilarSoundingOptions(opts) },
  { name: 'PARTIAL_TRUTH', indicator: (opts: string[]) => hasPartialTruth(opts) },
  { name: 'REVERSED_STATEMENT', indicator: (opts: string[]) => hasReversedStatement(opts) },
  { name: 'COMMONLY_CONFUSED', indicator: (opts: string[]) => hasCommonlyConfused(opts) },
  { name: 'NUMBER_VARIATION', indicator: (opts: string[]) => hasNumberVariation(opts) },
]

function hasSimilarSoundingOptions(options: string[]): boolean {
  const words = options.flatMap((o) => o.toLowerCase().split(/\s+/))
  const uniqueWords = new Set(words)
  return words.length - uniqueWords.size > 2
}

function hasPartialTruth(options: string[]): boolean {
  const commonTerms = ['and', 'both', 'only', 'also', 'as well as']
  return options.filter((o) => commonTerms.some((t) => o.toLowerCase().includes(t))).length >= 2
}

function hasReversedStatement(options: string[]): boolean {
  const negations = ['not', "doesn't", "don't", 'never', 'absent']
  return options.filter((o) => negations.some((n) => o.toLowerCase().includes(n))).length >= 1
}

function hasCommonlyConfused(options: string[]): boolean {
  const confusedPairs = [
    ['mitosis', 'meiosis'],
    ['DNA', 'RNA'],
    ['prokaryote', 'eukaryote'],
    ['anabolism', 'catabolism'],
    ['aerobic', 'anaerobic'],
    ['symbiosis', 'parasitism'],
    ['xylem', 'phloem'],
  ]
  return confusedPairs.some(
    ([a, b]) =>
      options.some((o) => o.toLowerCase().includes(a)) &&
      options.some((o) => o.toLowerCase().includes(b))
  )
}

function hasNumberVariation(options: string[]): boolean {
  const numbers = options.map((o) => o.match(/\d+/g)).filter(Boolean)
  return numbers.length >= 3
}

async function analyzePYQPatterns(): Promise<PatternAnalysis> {
  console.log('=== NEET PYQ Pattern Analysis ===\n')

  // Fetch all PYQs
  const pyqs = await prisma.questions.findMany({
    where: {
      OR: [{ category: 'PREVIOUS_YEAR' }, { examYear: { not: null } }],
    },
    select: {
      id: true,
      question: true,
      options: true,
      correctAnswer: true,
      explanation: true,
      difficulty: true,
      topic: true,
      subtopic: true,
      ncertClass: true,
      ncertChapter: true,
      examYear: true,
      source: true,
    },
  })

  console.log(`Found ${pyqs.length} PYQs to analyze\n`)

  // 1. Analyze stem patterns
  const stemAnalysis = new Map<string, { count: number; examples: string[] }>()

  for (const q of pyqs) {
    for (const pattern of STEM_PATTERNS) {
      if (pattern.regex.test(q.question)) {
        const existing = stemAnalysis.get(pattern.name) || { count: 0, examples: [] }
        existing.count++
        if (existing.examples.length < 3) {
          existing.examples.push(q.question.slice(0, 100))
        }
        stemAnalysis.set(pattern.name, existing)
        break
      }
    }
  }

  const stemPatterns = Array.from(stemAnalysis.entries())
    .map(([pattern, data]) => ({ pattern, ...data }))
    .sort((a, b) => b.count - a.count)

  console.log('Stem Patterns:')
  for (const sp of stemPatterns.slice(0, 10)) {
    console.log(`  ${sp.pattern}: ${sp.count} (${((sp.count / pyqs.length) * 100).toFixed(1)}%)`)
  }

  // 2. Analyze question types
  const questionTypes = [
    {
      type: 'DIRECT_FACTUAL',
      patterns: ['WHICH_FOLLOWING', 'WHICH_ONE_FOLLOWING', 'FUNCTION_OF', 'PROCESS_OF'],
    },
    { type: 'CONCEPTUAL', patterns: ['CONSIDER_STATEMENTS', 'READ_STATEMENTS', 'SELECT_CORRECT'] },
    { type: 'ASSERTION_REASON', patterns: ['ASSERTION_REASON'] },
    { type: 'MATCH_FOLLOWING', patterns: ['MATCH_FOLLOWING'] },
    { type: 'DIAGRAM_BASED', patterns: ['DIAGRAM_BASED', 'FIGURE_SHOWS', 'IDENTIFY_DIAGRAM'] },
    { type: 'APPLICATION', patterns: ['APPLICATION_SCENARIO', 'EXPERIMENT_BASED'] },
  ]

  const typeDistribution = questionTypes.map((qt) => {
    const count = stemPatterns
      .filter((sp) => qt.patterns.includes(sp.pattern))
      .reduce((sum, sp) => sum + sp.count, 0)
    return {
      type: qt.type,
      count,
      percentage: Math.round((count / pyqs.length) * 100),
    }
  })

  console.log('\nQuestion Type Distribution:')
  for (const qt of typeDistribution) {
    console.log(`  ${qt.type}: ${qt.count} (${qt.percentage}%)`)
  }

  // 3. Difficulty distribution
  const difficultyMap = new Map<string, number>()
  for (const q of pyqs) {
    const d = q.difficulty || 'MEDIUM'
    difficultyMap.set(d, (difficultyMap.get(d) || 0) + 1)
  }

  const difficultyDistribution = Array.from(difficultyMap.entries()).map(([difficulty, count]) => ({
    difficulty,
    count,
    percentage: Math.round((count / pyqs.length) * 100),
  }))

  console.log('\nDifficulty Distribution:')
  for (const dd of difficultyDistribution) {
    console.log(`  ${dd.difficulty}: ${dd.count} (${dd.percentage}%)`)
  }

  // 4. Topic patterns
  const topicMap = new Map<string, string[]>()
  for (const q of pyqs) {
    if (q.topic) {
      const existing = topicMap.get(q.topic) || []
      const matchedPattern = STEM_PATTERNS.find((p) => p.regex.test(q.question))?.name
      if (matchedPattern) {
        existing.push(matchedPattern)
      }
      topicMap.set(q.topic, existing)
    }
  }

  const topicPatterns = Array.from(topicMap.entries())
    .map(([topic, patterns]) => {
      const patternCounts = new Map<string, number>()
      patterns.forEach((p) => patternCounts.set(p, (patternCounts.get(p) || 0) + 1))
      const commonPatterns = Array.from(patternCounts.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([p]) => p)
      return {
        topic,
        avgQuestions: patterns.length,
        commonPatterns,
      }
    })
    .sort((a, b) => b.avgQuestions - a.avgQuestions)
    .slice(0, 15)

  console.log('\nTop Topics and Their Patterns:')
  for (const tp of topicPatterns.slice(0, 10)) {
    console.log(`  ${tp.topic}: ${tp.avgQuestions} questions`)
    console.log(`    Common: ${tp.commonPatterns.join(', ')}`)
  }

  // 5. Distractor techniques analysis
  const distractorAnalysis = new Map<string, number>()
  for (const q of pyqs) {
    if (q.options && Array.isArray(q.options)) {
      for (const pattern of DISTRACTOR_PATTERNS) {
        if (pattern.indicator(q.options as string[])) {
          distractorAnalysis.set(pattern.name, (distractorAnalysis.get(pattern.name) || 0) + 1)
        }
      }
    }
  }

  const distractorTechniques = Array.from(distractorAnalysis.entries())
    .map(([technique, frequency]) => ({ technique, frequency }))
    .sort((a, b) => b.frequency - a.frequency)

  console.log('\nDistractor Techniques:')
  for (const dt of distractorTechniques) {
    console.log(
      `  ${dt.technique}: ${dt.frequency} (${((dt.frequency / pyqs.length) * 100).toFixed(1)}%)`
    )
  }

  // 6. NCERT chapter frequency
  const chapterMap = new Map<string, number>()
  for (const q of pyqs) {
    if (q.ncertClass && q.ncertChapter) {
      const key = `Class ${q.ncertClass}, Ch.${q.ncertChapter}`
      chapterMap.set(key, (chapterMap.get(key) || 0) + 1)
    }
  }

  const ncertReferences = Array.from(chapterMap.entries())
    .map(([chapter, frequency]) => ({ chapter, frequency }))
    .sort((a, b) => b.frequency - a.frequency)
    .slice(0, 20)

  console.log('\nMost Frequent NCERT Chapters:')
  for (const nr of ncertReferences.slice(0, 10)) {
    console.log(`  ${nr.chapter}: ${nr.frequency} questions`)
  }

  // Summary statistics
  console.log('\n=== Summary Statistics ===')
  console.log(`Total PYQs analyzed: ${pyqs.length}`)
  console.log(`Unique stem patterns found: ${stemPatterns.length}`)
  console.log(`Topics covered: ${topicMap.size}`)

  // Year distribution
  const yearMap = new Map<number, number>()
  for (const q of pyqs) {
    if (q.examYear) {
      yearMap.set(q.examYear, (yearMap.get(q.examYear) || 0) + 1)
    }
  }

  console.log('\nYear Distribution:')
  const sortedYears = Array.from(yearMap.entries()).sort((a, b) => b[0] - a[0])
  for (const [year, count] of sortedYears.slice(0, 10)) {
    console.log(`  ${year}: ${count} questions`)
  }

  await prisma.$disconnect()

  return {
    stemPatterns,
    questionTypes: typeDistribution,
    difficultyDistribution,
    topicPatterns,
    distractorTechniques,
    ncertReferences,
  }
}

// Export pattern data for use in PYQFramingSkill
export async function exportPYQPatterns(): Promise<void> {
  const analysis = await analyzePYQPatterns()

  // Write analysis to JSON file for skill training
  const fs = await import('fs')
  const outputPath = './resources/pyq-pattern-analysis.json'

  fs.writeFileSync(outputPath, JSON.stringify(analysis, null, 2))
  console.log(`\nPattern analysis saved to ${outputPath}`)
}

// Run analysis
analyzePYQPatterns().catch(console.error)
