/**
 * Test script for Biology Content MCP Server
 * Tests database connectivity and query functionality
 */

import { PrismaClient } from '@/generated/prisma'

const db = new PrismaClient({
  log: ['error', 'warn'],
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
})

async function testDatabaseConnection() {
  console.log('Testing database connection...')
  try {
    await db.$queryRaw`SELECT 1`
    console.log('✓ Database connection successful')
    return true
  } catch (error) {
    console.error('✗ Database connection failed:', error)
    return false
  }
}

async function testQueryQuestions() {
  console.log('\nTesting question queries...')
  try {
    const questions = await db.question.findMany({
      where: {
        isActive: true,
        topic: {
          contains: 'Cell',
          mode: 'insensitive',
        },
      },
      take: 3,
      select: {
        id: true,
        topic: true,
        difficulty: true,
        question: true,
        correctAnswer: true,
      },
    })

    console.log(`✓ Found ${questions.length} questions`)
    questions.forEach((q, i) => {
      console.log(`  ${i + 1}. [${q.difficulty}] ${q.question.substring(0, 60)}...`)
    })
    return true
  } catch (error) {
    console.error('✗ Question query failed:', error)
    return false
  }
}

async function testQueryStudentProgress() {
  console.log('\nTesting student progress queries...')
  try {
    const progress = await db.userProgress.findMany({
      where: {
        accuracy: {
          lt: 60,
        },
      },
      take: 3,
      orderBy: {
        accuracy: 'asc',
      },
      select: {
        topic: true,
        accuracy: true,
        totalQuestions: true,
        correctAnswers: true,
      },
    })

    console.log(`✓ Found ${progress.length} weak areas`)
    progress.forEach((p, i) => {
      console.log(
        `  ${i + 1}. ${p.topic}: ${p.accuracy.toFixed(1)}% (${p.correctAnswers}/${p.totalQuestions})`
      )
    })
    return true
  } catch (error) {
    console.error('✗ Progress query failed:', error)
    return false
  }
}

async function testQueryChapterNotes() {
  console.log('\nTesting chapter notes queries...')
  try {
    const notes = await db.chapterNote.findMany({
      where: {
        isPublished: true,
        subject: 'Biology',
      },
      take: 3,
      select: {
        title: true,
        chapter: true,
        difficulty: true,
        viewCount: true,
      },
    })

    console.log(`✓ Found ${notes.length} chapter notes`)
    notes.forEach((n, i) => {
      console.log(`  ${i + 1}. ${n.chapter} - ${n.title} (${n.difficulty}, Views: ${n.viewCount})`)
    })
    return true
  } catch (error) {
    console.error('✗ Chapter notes query failed:', error)
    return false
  }
}

async function main() {
  console.log('===================================')
  console.log('Biology Content MCP Server Tests')
  console.log('===================================\n')

  const results = {
    connection: await testDatabaseConnection(),
    questions: await testQueryQuestions(),
    progress: await testQueryStudentProgress(),
    notes: await testQueryChapterNotes(),
  }

  console.log('\n===================================')
  console.log('Test Summary')
  console.log('===================================')
  console.log(`Database Connection: ${results.connection ? '✓' : '✗'}`)
  console.log(`Question Queries:    ${results.questions ? '✓' : '✗'}`)
  console.log(`Progress Queries:    ${results.progress ? '✓' : '✗'}`)
  console.log(`Chapter Notes:       ${results.notes ? '✓' : '✗'}`)

  const allPassed = Object.values(results).every((r) => r === true)
  console.log(`\nOverall: ${allPassed ? '✓ All tests passed' : '✗ Some tests failed'}`)

  await db.$disconnect()
  process.exit(allPassed ? 0 : 1)
}

main().catch((error) => {
  console.error('Test error:', error)
  process.exit(1)
})
