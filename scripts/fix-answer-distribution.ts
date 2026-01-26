/**
 * Script to fix MCQ answer distribution bias
 * Shuffles options and updates correctAnswer to achieve ~25% distribution for each option
 *
 * Current: B=52%, A=27%, C=18%, D=2%
 * Target:  A=25%, B=25%, C=25%, D=25%
 */

import { PrismaClient } from '../src/generated/prisma'

const prisma = new PrismaClient()

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Convert index to letter
function indexToLetter(index: number): string {
  return ['A', 'B', 'C', 'D'][index]
}

// Convert letter to index
function letterToIndex(letter: string): number {
  return { A: 0, B: 1, C: 2, D: 3 }[letter.toUpperCase()] ?? -1
}

async function fixAnswerDistribution() {
  console.log('Starting answer distribution fix...\n')

  // Get current distribution
  const currentDist = await prisma.$queryRaw<{ correctAnswer: string; count: bigint }[]>`
    SELECT "correctAnswer", COUNT(*) as count
    FROM questions
    WHERE "isActive" = true AND "correctAnswer" IN ('A', 'B', 'C', 'D')
    GROUP BY "correctAnswer"
    ORDER BY "correctAnswer"
  `

  console.log('Current distribution:')
  const total = currentDist.reduce((sum, d) => sum + Number(d.count), 0)
  currentDist.forEach((d) => {
    const pct = ((Number(d.count) / total) * 100).toFixed(1)
    console.log(`  ${d.correctAnswer}: ${d.count} (${pct}%)`)
  })

  // Calculate how many we need of each answer
  const targetPerAnswer = Math.floor(total / 4)
  console.log(`\nTarget: ~${targetPerAnswer} per answer (25%)`)

  // Get all questions
  const questions = await prisma.questions.findMany({
    where: {
      isActive: true,
      correctAnswer: { in: ['A', 'B', 'C', 'D'] },
    },
    select: {
      id: true,
      options: true,
      correctAnswer: true,
    },
  })

  console.log(`\nProcessing ${questions.length} questions...`)

  // Current counts
  const counts = { A: 0, B: 0, C: 0, D: 0 }

  // Questions that can be reassigned (we'll shuffle and pick)
  const toProcess = shuffleArray(questions)

  let updated = 0
  let skipped = 0

  for (const q of toProcess) {
    const options = q.options as string[]
    if (!Array.isArray(options) || options.length !== 4) {
      skipped++
      continue
    }

    const currentAnswerIndex = letterToIndex(q.correctAnswer)
    if (currentAnswerIndex === -1) {
      skipped++
      continue
    }

    const correctOptionText = options[currentAnswerIndex]

    // Find which position needs more answers
    const minCount = Math.min(counts.A, counts.B, counts.C, counts.D)
    const needsMore = Object.entries(counts).filter(([_, c]) => c <= targetPerAnswer)

    // If all are balanced, just keep current
    if (
      needsMore.length === 0 ||
      counts[q.correctAnswer as keyof typeof counts] < targetPerAnswer
    ) {
      counts[q.correctAnswer as keyof typeof counts]++
      continue
    }

    // Pick a position that needs more
    const targetPositions = needsMore.map(([letter]) => letter).sort(() => Math.random() - 0.5)
    const targetLetter = targetPositions[0] as 'A' | 'B' | 'C' | 'D'
    const targetIndex = letterToIndex(targetLetter)

    // Shuffle options to put correct answer at target position
    const newOptions = [...options]
    // Swap current correct position with target position
    ;[newOptions[currentAnswerIndex], newOptions[targetIndex]] = [
      newOptions[targetIndex],
      newOptions[currentAnswerIndex],
    ]

    // Update the question
    await prisma.questions.update({
      where: { id: q.id },
      data: {
        options: newOptions,
        correctAnswer: targetLetter,
      },
    })

    counts[targetLetter]++
    updated++

    if (updated % 100 === 0) {
      console.log(`  Updated ${updated} questions...`)
      // Small delay to prevent connection overload
      await new Promise((resolve) => setTimeout(resolve, 100))
    }
  }

  console.log(`\nUpdated: ${updated} questions`)
  console.log(`Skipped: ${skipped} questions`)

  // Get new distribution
  const newDist = await prisma.$queryRaw<{ correctAnswer: string; count: bigint }[]>`
    SELECT "correctAnswer", COUNT(*) as count
    FROM questions
    WHERE "isActive" = true AND "correctAnswer" IN ('A', 'B', 'C', 'D')
    GROUP BY "correctAnswer"
    ORDER BY "correctAnswer"
  `

  console.log('\nNew distribution:')
  const newTotal = newDist.reduce((sum, d) => sum + Number(d.count), 0)
  newDist.forEach((d) => {
    const pct = ((Number(d.count) / newTotal) * 100).toFixed(1)
    console.log(`  ${d.correctAnswer}: ${d.count} (${pct}%)`)
  })
}

fixAnswerDistribution()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
