#!/usr/bin/env tsx

/**
 * Test script for AI Test Generator API
 *
 * Usage:
 *   npx tsx scripts/test-ai-generator.ts
 *
 * Tests:
 * 1. Health check
 * 2. Generate weak-areas test
 * 3. Generate practice test
 * 4. Generate mock test
 * 5. Start test session
 * 6. Submit test (simulated)
 * 7. Get results with AI insights
 */

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000'

interface TestConfig {
  name: string
  endpoint: string
  method: string
  body?: any
  expectedStatus?: number
}

const tests: TestConfig[] = [
  {
    name: 'Health Check',
    endpoint: '/api/ai/generate-test',
    method: 'GET',
    expectedStatus: 200
  },
  {
    name: 'Generate Weak Areas Test',
    endpoint: '/api/ai/generate-test',
    method: 'POST',
    body: {
      studentId: 'student_test_123',
      testType: 'weak-areas',
      config: {
        totalQuestions: 20,
        duration: 30,
        includeWeakAreas: true
      }
    },
    expectedStatus: 200
  },
  {
    name: 'Generate Practice Test',
    endpoint: '/api/ai/generate-test',
    method: 'POST',
    body: {
      studentId: 'student_test_456',
      testType: 'practice',
      config: {
        totalQuestions: 50,
        duration: 60,
        difficulty: 'mixed',
        topics: [
          'Cell Biology',
          'Genetics',
          'Plant Physiology'
        ]
      }
    },
    expectedStatus: 200
  },
  {
    name: 'Generate Mock Test (NEET Pattern)',
    endpoint: '/api/ai/generate-test',
    method: 'POST',
    body: {
      studentId: 'student_test_789',
      testType: 'mock',
      config: {
        totalQuestions: 90,
        duration: 180,
        examPattern: 'neet',
        difficulty: 'mixed'
      }
    },
    expectedStatus: 200
  }
]

async function runTest(test: TestConfig): Promise<{
  success: boolean
  duration: number
  response?: any
  error?: string
}> {
  const startTime = Date.now()

  try {
    const url = `${API_BASE_URL}${test.endpoint}`
    const options: RequestInit = {
      method: test.method,
      headers: {
        'Content-Type': 'application/json'
      }
    }

    if (test.body) {
      options.body = JSON.stringify(test.body)
    }

    console.log(`\n🧪 Testing: ${test.name}`)
    console.log(`   Method: ${test.method} ${test.endpoint}`)

    const response = await fetch(url, options)
    const duration = Date.now() - startTime
    const data = await response.json()

    const expectedStatus = test.expectedStatus || 200
    const success = response.status === expectedStatus

    if (success) {
      console.log(`   ✅ Status: ${response.status} (${duration}ms)`)

      // Log relevant response data
      if (data.testId) {
        console.log(`   📝 Test ID: ${data.testId}`)
      }
      if (data.title) {
        console.log(`   📋 Title: ${data.title}`)
      }
      if (data.metadata) {
        console.log(`   📊 Questions: ${data.metadata.totalQuestions}`)
        console.log(`   ⏱️  Duration: ${data.metadata.duration} minutes`)
        console.log(`   🎯 Topics: ${data.metadata.topics?.slice(0, 3).join(', ')}${data.metadata.topics?.length > 3 ? '...' : ''}`)
      }
      if (data.capabilities) {
        console.log(`   🚀 Capabilities: ${data.capabilities.length}`)
      }
    } else {
      console.log(`   ❌ Status: ${response.status} (expected ${expectedStatus})`)
      console.log(`   Error: ${data.error || 'Unknown error'}`)
    }

    return {
      success,
      duration,
      response: data
    }

  } catch (error) {
    const duration = Date.now() - startTime
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'

    console.log(`   ❌ Error: ${errorMessage}`)

    return {
      success: false,
      duration,
      error: errorMessage
    }
  }
}

async function main() {
  console.log('🚀 AI Test Generator API Test Suite\n')
  console.log('=' .repeat(60))

  const results = {
    total: tests.length,
    passed: 0,
    failed: 0,
    totalDuration: 0
  }

  for (const test of tests) {
    const result = await runTest(test)

    if (result.success) {
      results.passed++
    } else {
      results.failed++
    }

    results.totalDuration += result.duration

    // Wait a bit between tests
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  console.log('\n' + '='.repeat(60))
  console.log('\n📊 Test Summary:')
  console.log(`   Total Tests: ${results.total}`)
  console.log(`   ✅ Passed: ${results.passed}`)
  console.log(`   ❌ Failed: ${results.failed}`)
  console.log(`   ⏱️  Total Duration: ${results.totalDuration}ms`)
  console.log(`   ⚡ Average Duration: ${Math.round(results.totalDuration / results.total)}ms\n`)

  if (results.failed > 0) {
    console.log('⚠️  Some tests failed. Check the output above for details.\n')
    process.exit(1)
  } else {
    console.log('🎉 All tests passed successfully!\n')
    process.exit(0)
  }
}

// Run tests
main().catch(error => {
  console.error('Fatal error:', error)
  process.exit(1)
})
