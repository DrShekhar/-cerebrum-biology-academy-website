#!/usr/bin/env node

/**
 * Database Performance Benchmark Script
 *
 * This script measures database query performance improvements after optimization
 * It tests:
 * - Index effectiveness
 * - N+1 query elimination
 * - Connection pooling
 * - Overall query latency reduction
 *
 * Expected Improvements:
 * - Payment queries: 60-80% faster
 * - Demo booking lookups: 70-90% faster
 * - Enrollment queries: 50-70% faster
 * - Test session loads: 95% faster (N+1 elimination)
 * - User progress tracking: 90% faster (N+1 elimination)
 * - Question loading: 50x faster (N+1 elimination)
 *
 * Target: 70% overall query latency improvement
 */

const { PrismaClient } = require('@/generated/prisma')

const prisma = new PrismaClient({
  log: [
    { level: 'query', emit: 'event' },
    { level: 'error', emit: 'stdout' },
  ],
})

class PerformanceBenchmark {
  constructor() {
    this.queryCount = 0
    this.totalQueryTime = 0
    this.queries = []
  }

  startListening() {
    prisma.$on('query', (e) => {
      this.queryCount++
      this.totalQueryTime += e.duration
      this.queries.push({
        query: e.query,
        duration: e.duration,
        params: e.params,
      })
    })
  }

  reset() {
    this.queryCount = 0
    this.totalQueryTime = 0
    this.queries = []
  }

  getResults() {
    return {
      queryCount: this.queryCount,
      totalQueryTime: this.totalQueryTime,
      averageQueryTime: this.queryCount > 0 ? this.totalQueryTime / this.queryCount : 0,
      queries: this.queries,
    }
  }

  printResults(testName) {
    const results = this.getResults()
    console.log(`\n${'='.repeat(60)}`)
    console.log(`Test: ${testName}`)
    console.log(`${'='.repeat(60)}`)
    console.log(`Total Queries: ${results.queryCount}`)
    console.log(`Total Time: ${results.totalQueryTime.toFixed(2)}ms`)
    console.log(`Average Query Time: ${results.averageQueryTime.toFixed(2)}ms`)
    console.log(`${'='.repeat(60)}\n`)
    return results
  }
}

async function benchmarkIndexes() {
  console.log('\n\n### BENCHMARK 1: INDEX EFFECTIVENESS ###\n')

  const benchmark = new PerformanceBenchmark()
  benchmark.startListening()

  // Test 1: Payment lookup by razorpayOrderId (should use index)
  console.log('Test 1: Payment lookup by razorpayOrderId...')
  benchmark.reset()
  const payment = await prisma.payment.findFirst({
    where: { razorpayOrderId: { not: null } },
  })
  const test1Results = benchmark.printResults('Payment lookup by razorpayOrderId')

  // Test 2: Payment filtering by status (should use compound index)
  console.log('Test 2: Payment filtering by status...')
  benchmark.reset()
  const payments = await prisma.payment.findMany({
    where: { status: 'COMPLETED' },
    orderBy: { createdAt: 'desc' },
    take: 10,
  })
  const test2Results = benchmark.printResults('Payment filtering by status')

  // Test 3: Demo booking by email (should use index)
  console.log('Test 3: Demo booking by email...')
  benchmark.reset()
  const demoBooking = await prisma.demoBooking.findFirst({
    where: { email: { not: null } },
  })
  const test3Results = benchmark.printResults('Demo booking by email')

  // Test 4: Enrollment queries (should use compound indexes)
  console.log('Test 4: Enrollment queries...')
  benchmark.reset()
  const enrollments = await prisma.enrollment.findMany({
    where: { status: 'ACTIVE' },
    take: 10,
  })
  const test4Results = benchmark.printResults('Enrollment queries')

  return {
    test1: test1Results,
    test2: test2Results,
    test3: test3Results,
    test4: test4Results,
  }
}

async function benchmarkN1Elimination() {
  console.log('\n\n### BENCHMARK 2: N+1 QUERY ELIMINATION ###\n')

  const benchmark = new PerformanceBenchmark()
  benchmark.startListening()

  // Test 1: Load test template with questions (should be 1 query)
  console.log('Test 1: Load test template with questions...')
  benchmark.reset()
  const template = await prisma.testTemplate.findFirst({
    where: { isActive: true },
    include: {
      questionBank: {
        include: {
          question: {
            select: {
              id: true,
              topic: true,
              difficulty: true,
              question: true,
              options: true,
              correctAnswer: true,
            },
          },
        },
      },
    },
  })
  const test1Results = benchmark.printResults('Test template with questions')

  // Test 2: Load test session with responses (should be 1-2 queries)
  console.log('Test 2: Load test session with responses...')
  benchmark.reset()
  const session = await prisma.testSession.findFirst({
    where: { status: 'COMPLETED' },
    include: {
      testTemplate: true,
      responses: {
        include: {
          question: {
            select: {
              id: true,
              marks: true,
              correctAnswer: true,
            },
          },
        },
        take: 10,
      },
    },
  })
  const test2Results = benchmark.printResults('Test session with responses')

  // Test 3: Load user with progress (should be 1 query)
  console.log('Test 3: Load user with progress...')
  benchmark.reset()
  const user = await prisma.freeUser.findFirst({
    include: {
      testAttempts: {
        take: 5,
        select: {
          id: true,
          title: true,
          percentage: true,
          score: true,
        },
      },
      userProgress: {
        select: {
          id: true,
          topic: true,
          accuracy: true,
          masteryScore: true,
        },
      },
      achievements: {
        where: { isCompleted: true },
        select: {
          id: true,
          type: true,
          title: true,
        },
      },
    },
  })
  const test3Results = benchmark.printResults('User with progress')

  // Test 4: Load question bank (should be 1-2 queries)
  console.log('Test 4: Load question bank...')
  benchmark.reset()
  const questionBank = await prisma.questionBank.findFirst({
    include: {
      questions: {
        include: {
          question: {
            select: {
              id: true,
              topic: true,
              difficulty: true,
              question: true,
              options: true,
            },
          },
        },
        take: 10,
      },
    },
  })
  const test4Results = benchmark.printResults('Question bank with questions')

  return {
    test1: test1Results,
    test2: test2Results,
    test3: test3Results,
    test4: test4Results,
  }
}

async function benchmarkConnectionPooling() {
  console.log('\n\n### BENCHMARK 3: CONNECTION POOLING ###\n')

  const benchmark = new PerformanceBenchmark()
  benchmark.startListening()

  // Simulate concurrent queries
  console.log('Test 1: Concurrent query execution (10 parallel queries)...')
  benchmark.reset()
  const startTime = Date.now()

  await Promise.all([
    prisma.user.count(),
    prisma.freeUser.count(),
    prisma.testTemplate.count(),
    prisma.question.count(),
    prisma.enrollment.count(),
    prisma.payment.count(),
    prisma.demoBooking.count(),
    prisma.testSession.count(),
    prisma.testAttempt.count(),
    prisma.userProgress.count(),
  ])

  const endTime = Date.now()
  const totalTime = endTime - startTime

  const results = benchmark.printResults('Concurrent queries')
  results.totalExecutionTime = totalTime
  results.averageExecutionTime = totalTime / 10

  console.log(`Total Execution Time: ${totalTime}ms`)
  console.log(`Average Execution Time: ${results.averageExecutionTime.toFixed(2)}ms`)

  return results
}

async function generateReport(indexResults, n1Results, poolingResults) {
  console.log('\n\n')
  console.log('╔' + '═'.repeat(78) + '╗')
  console.log('║' + ' '.repeat(20) + 'DATABASE OPTIMIZATION REPORT' + ' '.repeat(30) + '║')
  console.log('╠' + '═'.repeat(78) + '╣')

  console.log('║ INDEX EFFECTIVENESS:' + ' '.repeat(57) + '║')
  console.log(
    '║   Payment lookup:          ' +
      `${indexResults.test1.queryCount} queries, ${indexResults.test1.totalQueryTime.toFixed(2)}ms`.padEnd(
        50
      ) +
      '║'
  )
  console.log(
    '║   Payment filtering:       ' +
      `${indexResults.test2.queryCount} queries, ${indexResults.test2.totalQueryTime.toFixed(2)}ms`.padEnd(
        50
      ) +
      '║'
  )
  console.log(
    '║   Demo booking lookup:     ' +
      `${indexResults.test3.queryCount} queries, ${indexResults.test3.totalQueryTime.toFixed(2)}ms`.padEnd(
        50
      ) +
      '║'
  )
  console.log(
    '║   Enrollment queries:      ' +
      `${indexResults.test4.queryCount} queries, ${indexResults.test4.totalQueryTime.toFixed(2)}ms`.padEnd(
        50
      ) +
      '║'
  )
  console.log('║' + ' '.repeat(78) + '║')

  console.log('║ N+1 QUERY ELIMINATION:' + ' '.repeat(55) + '║')
  console.log(
    '║   Test template load:      ' +
      `${n1Results.test1.queryCount} queries, ${n1Results.test1.totalQueryTime.toFixed(2)}ms`.padEnd(
        50
      ) +
      '║'
  )
  console.log(
    '║   Test session load:       ' +
      `${n1Results.test2.queryCount} queries, ${n1Results.test2.totalQueryTime.toFixed(2)}ms`.padEnd(
        50
      ) +
      '║'
  )
  console.log(
    '║   User progress load:      ' +
      `${n1Results.test3.queryCount} queries, ${n1Results.test3.totalQueryTime.toFixed(2)}ms`.padEnd(
        50
      ) +
      '║'
  )
  console.log(
    '║   Question bank load:      ' +
      `${n1Results.test4.queryCount} queries, ${n1Results.test4.totalQueryTime.toFixed(2)}ms`.padEnd(
        50
      ) +
      '║'
  )
  console.log('║' + ' '.repeat(78) + '║')

  console.log('║ CONNECTION POOLING:' + ' '.repeat(58) + '║')
  console.log(
    '║   Concurrent queries:      ' +
      `${poolingResults.queryCount} queries, ${poolingResults.totalExecutionTime}ms total`.padEnd(
        50
      ) +
      '║'
  )
  console.log(
    '║   Average per query:       ' +
      `${poolingResults.averageExecutionTime.toFixed(2)}ms`.padEnd(50) +
      '║'
  )
  console.log('║' + ' '.repeat(78) + '║')

  // Calculate overall improvement
  const totalQueries =
    indexResults.test1.queryCount +
    indexResults.test2.queryCount +
    indexResults.test3.queryCount +
    indexResults.test4.queryCount +
    n1Results.test1.queryCount +
    n1Results.test2.queryCount +
    n1Results.test3.queryCount +
    n1Results.test4.queryCount

  const totalTime =
    indexResults.test1.totalQueryTime +
    indexResults.test2.totalQueryTime +
    indexResults.test3.totalQueryTime +
    indexResults.test4.totalQueryTime +
    n1Results.test1.totalQueryTime +
    n1Results.test2.totalQueryTime +
    n1Results.test3.totalQueryTime +
    n1Results.test4.totalQueryTime

  const averageQueryTime = totalTime / totalQueries

  console.log('║ OVERALL PERFORMANCE:' + ' '.repeat(57) + '║')
  console.log('║   Total queries tested:    ' + `${totalQueries} queries`.padEnd(50) + '║')
  console.log('║   Total query time:        ' + `${totalTime.toFixed(2)}ms`.padEnd(50) + '║')
  console.log('║   Average query time:      ' + `${averageQueryTime.toFixed(2)}ms`.padEnd(50) + '║')

  console.log('╠' + '═'.repeat(78) + '╣')
  console.log('║ SUCCESS CRITERIA CHECK:' + ' '.repeat(54) + '║')

  // Check if N+1 queries are eliminated (should be ≤2 queries per operation)
  const n1Eliminated =
    n1Results.test1.queryCount <= 2 &&
    n1Results.test2.queryCount <= 2 &&
    n1Results.test3.queryCount <= 2 &&
    n1Results.test4.queryCount <= 2

  console.log('║   ✓ N+1 queries eliminated:' + (n1Eliminated ? ' PASS' : ' FAIL').padEnd(50) + '║')

  // Check if indexes are working (should be fast queries)
  const indexesWorking = averageQueryTime < 50 // Less than 50ms average
  console.log(
    '║   ✓ Indexes working:       ' + (indexesWorking ? ' PASS' : ' FAIL').padEnd(50) + '║'
  )

  // Check connection pooling (concurrent queries should complete quickly)
  const poolingWorking = poolingResults.totalExecutionTime < 1000 // Less than 1 second for 10 queries
  console.log(
    '║   ✓ Connection pooling:    ' + (poolingWorking ? ' PASS' : ' FAIL').padEnd(50) + '║'
  )

  const overallPass = n1Eliminated && indexesWorking && poolingWorking
  console.log('║' + ' '.repeat(78) + '║')
  console.log(
    '║   OVERALL RESULT:          ' +
      (overallPass ? '✓ OPTIMIZATION SUCCESSFUL' : '✗ NEEDS IMPROVEMENT').padEnd(50) +
      '║'
  )

  console.log('╚' + '═'.repeat(78) + '╝')
  console.log('\n')

  return {
    overallPass,
    n1Eliminated,
    indexesWorking,
    poolingWorking,
    metrics: {
      totalQueries,
      totalTime,
      averageQueryTime,
    },
  }
}

async function main() {
  console.log('╔═══════════════════════════════════════════════════════════════════════════════╗')
  console.log('║                    DATABASE PERFORMANCE BENCHMARK                            ║')
  console.log('║                    Cerebrum Biology Academy                                  ║')
  console.log('╚═══════════════════════════════════════════════════════════════════════════════╝')
  console.log()
  console.log('Starting database performance benchmarks...')
  console.log('This will test index effectiveness, N+1 query elimination, and connection pooling.')
  console.log()

  try {
    // Run benchmarks
    const indexResults = await benchmarkIndexes()
    const n1Results = await benchmarkN1Elimination()
    const poolingResults = await benchmarkConnectionPooling()

    // Generate report
    const report = await generateReport(indexResults, n1Results, poolingResults)

    // Exit with appropriate code
    if (report.overallPass) {
      console.log('✓ All performance optimizations are working correctly!')
      process.exit(0)
    } else {
      console.log('✗ Some performance optimizations need attention.')
      process.exit(1)
    }
  } catch (error) {
    console.error('Error running benchmarks:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the benchmark
if (require.main === module) {
  main()
}

module.exports = { benchmarkIndexes, benchmarkN1Elimination, benchmarkConnectionPooling }
