/**
 * Script to fix MCQ format inconsistencies
 * - Converts escaped JSON options to proper arrays
 * - Converts text answers to letter format (A/B/C/D)
 */

import { PrismaClient } from '../src/generated/prisma'

const prisma = new PrismaClient()

interface QuestionToFix {
  id: string
  options: string
  correctAnswer: string
}

async function fixMCQFormat() {
  console.log('Starting MCQ format fix...\n')

  // Get all questions with text-based answers (not A/B/C/D)
  const questionsToFix = await prisma.$queryRaw<QuestionToFix[]>`
    SELECT id, options::text, "correctAnswer"
    FROM questions
    WHERE "isActive" = true
      AND "correctAnswer" NOT IN ('A', 'B', 'C', 'D')
  `

  console.log(`Found ${questionsToFix.length} questions to fix\n`)

  let fixed = 0
  let errors = 0

  for (const q of questionsToFix) {
    try {
      // Parse the triple-escaped JSON options
      // Format: "\"[\\\"Option1\\\",\\\"Option2\\\"]\""
      let optionsArray: string[]

      let optionsStr = q.options

      // First, remove the outer quotes
      if (optionsStr.startsWith('"') && optionsStr.endsWith('"')) {
        optionsStr = optionsStr.slice(1, -1)
      }

      // Now parse the escaped JSON string - this gives us the inner JSON string
      let innerJson: string
      try {
        innerJson = JSON.parse(`"${optionsStr}"`)
      } catch {
        innerJson = optionsStr
      }

      // Finally parse the actual array
      try {
        optionsArray = JSON.parse(innerJson)
      } catch {
        // Try direct parse
        try {
          optionsArray = JSON.parse(optionsStr)
        } catch {
          console.log(`⚠️ Skipping ${q.id}: Cannot parse options`)
          console.log(`   Raw: ${q.options.substring(0, 100)}...`)
          errors++
          continue
        }
      }

      if (!Array.isArray(optionsArray) || optionsArray.length !== 4) {
        console.log(`⚠️ Skipping ${q.id}: Invalid options array (length: ${optionsArray?.length})`)
        errors++
        continue
      }

      // Find the correct answer index
      const answerIndex = optionsArray.findIndex(
        (opt) => opt.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase()
      )

      if (answerIndex === -1) {
        console.log(`⚠️ Skipping ${q.id}: Answer "${q.correctAnswer}" not found in options`)
        console.log(`   Options: ${JSON.stringify(optionsArray)}`)
        errors++
        continue
      }

      // Convert index to letter (0=A, 1=B, 2=C, 3=D)
      const letterAnswer = ['A', 'B', 'C', 'D'][answerIndex]

      // Update the question
      await prisma.questions.update({
        where: { id: q.id },
        data: {
          options: optionsArray, // Prisma will handle JSON serialization
          correctAnswer: letterAnswer,
        },
      })

      console.log(`✅ Fixed ${q.id}: "${q.correctAnswer}" → "${letterAnswer}"`)
      fixed++
    } catch (error) {
      console.log(`❌ Error fixing ${q.id}:`, error)
      errors++
    }
  }

  console.log(`\n========== Summary ==========`)
  console.log(`Fixed: ${fixed}`)
  console.log(`Errors: ${errors}`)
  console.log(`Total: ${questionsToFix.length}`)
}

fixMCQFormat()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
