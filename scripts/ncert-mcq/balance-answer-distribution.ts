/**
 * Balance Answer Distribution Script
 *
 * Analyzes and fixes the answer distribution (A, B, C, D) for questions
 * to achieve a balanced ~25% distribution for each option.
 * Only modifies questions where option order is semantically interchangeable.
 */

import { PrismaClient } from '../../src/generated/prisma/index.js'

const prisma = new PrismaClient()

interface DistributionStats {
  total: number
  distribution: { A: number; B: number; C: number; D: number }
  percentages: { A: number; B: number; C: number; D: number }
}

/**
 * Get current answer distribution
 */
async function getAnswerDistribution(filter?: {
  isNcertBased?: boolean
}): Promise<DistributionStats> {
  let results: { correctAnswer: string; count: bigint }[]

  if (filter?.isNcertBased) {
    results = await prisma.$queryRaw<{ correctAnswer: string; count: bigint }[]>`
      SELECT "correctAnswer", COUNT(*) as count
      FROM questions
      WHERE "correctAnswer" IN ('A', 'B', 'C', 'D')
      AND "isNcertBased" = true
      GROUP BY "correctAnswer"
    `
  } else {
    results = await prisma.$queryRaw<{ correctAnswer: string; count: bigint }[]>`
      SELECT "correctAnswer", COUNT(*) as count
      FROM questions
      WHERE "correctAnswer" IN ('A', 'B', 'C', 'D')
      GROUP BY "correctAnswer"
    `
  }

  const distribution = { A: 0, B: 0, C: 0, D: 0 }
  let total = 0

  for (const row of results) {
    const answer = row.correctAnswer as keyof typeof distribution
    if (answer in distribution) {
      distribution[answer] = Number(row.count)
      total += Number(row.count)
    }
  }

  const percentages = {
    A: total > 0 ? Math.round((distribution.A / total) * 100) : 0,
    B: total > 0 ? Math.round((distribution.B / total) * 100) : 0,
    C: total > 0 ? Math.round((distribution.C / total) * 100) : 0,
    D: total > 0 ? Math.round((distribution.D / total) * 100) : 0,
  }

  return { total, distribution, percentages }
}

/**
 * Check if question options are semantically interchangeable
 * (i.e., rotating them won't change the meaning)
 */
function areOptionsInterchangeable(question: string, options: string[]): boolean {
  // Don't rotate if options have sequential patterns
  const hasSequence = options.some((opt) => /^(i|ii|iii|iv|1|2|3|4|a\)|b\)|c\)|d\))/i.test(opt))
  if (hasSequence) return false

  // Don't rotate if question references specific options by letter
  const referencesOptions = /option\s+[ABCD]|choose\s+[ABCD]|answer\s+is\s+[ABCD]/i.test(question)
  if (referencesOptions) return false

  // Don't rotate if options are "All of the above" / "None of the above"
  const hasAllNone = options.some((opt) =>
    /all\s+of\s+the\s+above|none\s+of\s+the\s+above|both\s+\([abcd]\)\s+and/i.test(opt)
  )
  if (hasAllNone) return false

  // Don't rotate match-the-following options
  const isMatch = options.some((opt) => /-\s*\([ivIV]+\)|-\s*\d+/.test(opt))
  if (isMatch) return false

  // Don't rotate assertion-reason options (standard format)
  const isAssertionReason = options.some((opt) => /both\s+A\s+and\s+R/i.test(opt))
  if (isAssertionReason) return false

  return true
}

/**
 * Rotate options and correct answer to achieve target distribution
 */
function rotateOptions(
  options: string[],
  currentCorrectIndex: number,
  targetCorrectIndex: number
): { newOptions: string[]; newCorrectIndex: number } {
  if (currentCorrectIndex === targetCorrectIndex) {
    return { newOptions: options, newCorrectIndex: currentCorrectIndex }
  }

  // Simple swap: move the correct answer to the target position
  const newOptions = [...options]
  const temp = newOptions[targetCorrectIndex]
  newOptions[targetCorrectIndex] = newOptions[currentCorrectIndex]
  newOptions[currentCorrectIndex] = temp

  return { newOptions, newCorrectIndex: targetCorrectIndex }
}

/**
 * Balance answer distribution for all questions
 */
async function balanceAnswerDistribution(options: {
  dryRun?: boolean
  onlyNcertBased?: boolean
  batchSize?: number
}): Promise<void> {
  const { dryRun = false, onlyNcertBased = false, batchSize = 100 } = options

  console.log('=== Answer Distribution Balancer ===\n')

  // Get current distribution
  const before = await getAnswerDistribution(onlyNcertBased ? { isNcertBased: true } : undefined)
  console.log('Current Distribution:')
  console.log(`  A: ${before.distribution.A} (${before.percentages.A}%)`)
  console.log(`  B: ${before.distribution.B} (${before.percentages.B}%)`)
  console.log(`  C: ${before.distribution.C} (${before.percentages.C}%)`)
  console.log(`  D: ${before.distribution.D} (${before.percentages.D}%)`)
  console.log(`  Total: ${before.total}\n`)

  // Calculate target distribution (25% each)
  const target = Math.floor(before.total / 4)
  console.log(`Target: ~${target} per option (25%)\n`)

  // Identify over/under represented options
  const overRepresented: (keyof typeof before.distribution)[] = []
  const underRepresented: (keyof typeof before.distribution)[] = []

  for (const opt of ['A', 'B', 'C', 'D'] as const) {
    if (before.distribution[opt] > target * 1.1) {
      overRepresented.push(opt)
    } else if (before.distribution[opt] < target * 0.9) {
      underRepresented.push(opt)
    }
  }

  console.log(`Over-represented: ${overRepresented.join(', ') || 'None'}`)
  console.log(`Under-represented: ${underRepresented.join(', ') || 'None'}`)

  if (overRepresented.length === 0 || underRepresented.length === 0) {
    console.log('\nDistribution is already balanced!')
    return
  }

  // Fetch questions that can be rotated
  const questions = await prisma.questions.findMany({
    where: onlyNcertBased ? { isNcertBased: true } : {},
    select: {
      id: true,
      question: true,
      options: true,
      correctAnswer: true,
    },
    orderBy: { createdAt: 'desc' },
  })

  console.log(`\nAnalyzing ${questions.length} questions for rotation...`)

  // Track changes needed
  const changesNeeded: {
    id: string
    currentAnswer: string
    newAnswer: string
    newOptions: string[]
  }[] = []

  const newDistribution = { ...before.distribution }
  const optionLetters = ['A', 'B', 'C', 'D']

  for (const q of questions) {
    if (!q.options || !Array.isArray(q.options) || q.options.length !== 4) {
      continue
    }

    const currentAnswer = q.correctAnswer as keyof typeof newDistribution
    if (!optionLetters.includes(currentAnswer)) {
      continue
    }

    // Skip if current answer is under-represented
    if (underRepresented.includes(currentAnswer)) {
      continue
    }

    // Skip if we've balanced this option already
    const currentCount = newDistribution[currentAnswer]
    if (currentCount <= target) {
      continue
    }

    // Check if options can be rotated
    if (!areOptionsInterchangeable(q.question, q.options as string[])) {
      continue
    }

    // Find an under-represented target
    const targetOption = underRepresented.find((opt) => newDistribution[opt] < target)
    if (!targetOption) {
      continue
    }

    // Calculate rotation
    const currentIndex = optionLetters.indexOf(currentAnswer)
    const targetIndex = optionLetters.indexOf(targetOption)
    const { newOptions } = rotateOptions(q.options as string[], currentIndex, targetIndex)

    // Update tracking
    newDistribution[currentAnswer]--
    newDistribution[targetOption]++

    changesNeeded.push({
      id: q.id,
      currentAnswer,
      newAnswer: targetOption,
      newOptions,
    })

    // Check if we've balanced enough
    const maxChanged = Math.ceil(before.total * 0.3) // Max 30% changes
    if (changesNeeded.length >= maxChanged) {
      console.log(`Reached max change limit (${maxChanged})`)
      break
    }
  }

  console.log(`\nChanges identified: ${changesNeeded.length}`)

  // Preview changes
  console.log('\nProjected New Distribution:')
  for (const opt of optionLetters as (keyof typeof newDistribution)[]) {
    const pct = Math.round((newDistribution[opt] / before.total) * 100)
    console.log(`  ${opt}: ${newDistribution[opt]} (${pct}%)`)
  }

  if (dryRun) {
    console.log('\n[DRY RUN] No changes applied')
    return
  }

  // Apply changes in batches
  console.log(`\nApplying changes in batches of ${batchSize}...`)

  let applied = 0
  for (let i = 0; i < changesNeeded.length; i += batchSize) {
    const batch = changesNeeded.slice(i, i + batchSize)

    for (const change of batch) {
      await prisma.questions.update({
        where: { id: change.id },
        data: {
          correctAnswer: change.newAnswer,
          options: change.newOptions,
          updatedAt: new Date(),
        },
      })
      applied++
    }

    console.log(`  Applied ${applied}/${changesNeeded.length} changes`)
  }

  // Verify new distribution
  const after = await getAnswerDistribution(onlyNcertBased ? { isNcertBased: true } : undefined)
  console.log('\nFinal Distribution:')
  console.log(`  A: ${after.distribution.A} (${after.percentages.A}%)`)
  console.log(`  B: ${after.distribution.B} (${after.percentages.B}%)`)
  console.log(`  C: ${after.distribution.C} (${after.percentages.C}%)`)
  console.log(`  D: ${after.distribution.D} (${after.percentages.D}%)`)

  // Calculate improvement
  const beforeVariance =
    Object.values(before.percentages).reduce((sum, p) => sum + Math.abs(p - 25), 0) / 4
  const afterVariance =
    Object.values(after.percentages).reduce((sum, p) => sum + Math.abs(p - 25), 0) / 4

  console.log(`\nImprovement: ${(beforeVariance - afterVariance).toFixed(1)}% closer to balanced`)
}

/**
 * Generate detailed distribution report
 */
async function generateDistributionReport(): Promise<void> {
  console.log('=== Answer Distribution Report ===\n')

  // Overall distribution
  const overall = await getAnswerDistribution()
  console.log('Overall Distribution:')
  console.log(`  A: ${overall.distribution.A} (${overall.percentages.A}%)`)
  console.log(`  B: ${overall.distribution.B} (${overall.percentages.B}%)`)
  console.log(`  C: ${overall.distribution.C} (${overall.percentages.C}%)`)
  console.log(`  D: ${overall.distribution.D} (${overall.percentages.D}%)`)
  console.log(`  Total: ${overall.total}`)

  // By category
  console.log('\nBy Category:')
  const categories = await prisma.$queryRaw<
    { category: string; correctAnswer: string; count: bigint }[]
  >`
    SELECT category, "correctAnswer", COUNT(*) as count
    FROM questions
    WHERE "correctAnswer" IN ('A', 'B', 'C', 'D')
    GROUP BY category, "correctAnswer"
    ORDER BY category, "correctAnswer"
  `

  const categoryMap = new Map<string, Record<string, number>>()
  for (const row of categories) {
    if (!categoryMap.has(row.category)) {
      categoryMap.set(row.category, { A: 0, B: 0, C: 0, D: 0, total: 0 })
    }
    const cat = categoryMap.get(row.category)!
    cat[row.correctAnswer] = Number(row.count)
    cat.total += Number(row.count)
  }

  for (const [category, dist] of categoryMap) {
    const total = dist.total
    console.log(`\n  ${category}:`)
    for (const opt of ['A', 'B', 'C', 'D']) {
      const pct = Math.round((dist[opt] / total) * 100)
      const bar = '#'.repeat(Math.round(pct / 5))
      console.log(`    ${opt}: ${dist[opt]} (${pct}%) ${bar}`)
    }
  }

  // By difficulty
  console.log('\nBy Difficulty:')
  const difficulties = await prisma.$queryRaw<
    { difficulty: string; correctAnswer: string; count: bigint }[]
  >`
    SELECT difficulty, "correctAnswer", COUNT(*) as count
    FROM questions
    WHERE "correctAnswer" IN ('A', 'B', 'C', 'D')
    GROUP BY difficulty, "correctAnswer"
    ORDER BY difficulty, "correctAnswer"
  `

  const diffMap = new Map<string, Record<string, number>>()
  for (const row of difficulties) {
    const d = row.difficulty || 'UNKNOWN'
    if (!diffMap.has(d)) {
      diffMap.set(d, { A: 0, B: 0, C: 0, D: 0, total: 0 })
    }
    const diff = diffMap.get(d)!
    diff[row.correctAnswer] = Number(row.count)
    diff.total += Number(row.count)
  }

  for (const [difficulty, dist] of diffMap) {
    const total = dist.total
    console.log(`\n  ${difficulty}:`)
    for (const opt of ['A', 'B', 'C', 'D']) {
      const pct = Math.round((dist[opt] / total) * 100)
      console.log(`    ${opt}: ${dist[opt]} (${pct}%)`)
    }
  }
}

/**
 * CLI entry point
 */
async function main() {
  const args = process.argv.slice(2)

  const command = args[0] || 'report'
  const dryRun = args.includes('--dry-run')
  const ncertOnly = args.includes('--ncert-only')

  try {
    switch (command) {
      case 'balance':
        await balanceAnswerDistribution({
          dryRun,
          onlyNcertBased: ncertOnly,
        })
        break

      case 'report':
        await generateDistributionReport()
        break

      default:
        console.log('Answer Distribution Balancer')
        console.log('\nUsage:')
        console.log(
          '  npx ts-node scripts/ncert-mcq/balance-answer-distribution.ts [command] [options]'
        )
        console.log('\nCommands:')
        console.log('  balance  - Balance the answer distribution')
        console.log('  report   - Generate distribution report (default)')
        console.log('\nOptions:')
        console.log('  --dry-run     - Preview changes without applying')
        console.log('  --ncert-only  - Only balance NCERT-based questions')
    }
  } finally {
    await prisma.$disconnect()
  }
}

// Run if called directly
if (require.main === module) {
  main()
}

export { balanceAnswerDistribution, generateDistributionReport, getAnswerDistribution }
