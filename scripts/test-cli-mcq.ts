/**
 * Test CLI-based MCQ generation
 * Run with: npx ts-node scripts/test-cli-mcq.ts
 */

import { ShekharSirAgent } from '../src/lib/ai/agents/ShekharSirAgent.js'

async function testCLIMCQGeneration() {
  console.log('Testing CLI-based MCQ generation...\n')

  const shekharSir = new ShekharSirAgent({
    model: 'sonnet', // Use Claude Sonnet
  })

  try {
    console.log('Generating 2 test questions for Class 11, Chapter 8 (Cell: The Unit of Life)...\n')

    const result = await shekharSir.generateQuestions({
      ncertClass: 11,
      ncertChapter: 8,
      ncertChapterName: 'Cell: The Unit of Life',
      count: 2,
      difficulty: 'MEDIUM',
      includeNEETImportant: true,
    })

    console.log(`Generated ${result.questions.length} questions in ${result.metadata.generationTime}ms\n`)

    if (result.questions.length > 0) {
      console.log('Sample Question:')
      console.log('================')
      const q = result.questions[0]
      console.log(`Q: ${q.question}`)
      console.log(`A) ${q.options?.[0]}`)
      console.log(`B) ${q.options?.[1]}`)
      console.log(`C) ${q.options?.[2]}`)
      console.log(`D) ${q.options?.[3]}`)
      console.log(`\nCorrect Answer: ${q.correctAnswer}`)
      console.log(`\nExplanation: ${q.explanation}`)
      console.log(`\nDifficulty: ${q.difficulty}`)
      console.log(`NEET Weightage: ${q.neetWeightage}`)
      console.log('\n✅ CLI-based MCQ generation is working!')
    } else {
      console.log('❌ No questions generated. Check Claude CLI output.')
    }
  } catch (error) {
    console.error('❌ Error during generation:', error)
    process.exit(1)
  }
}

testCLIMCQGeneration()
