import { exec } from 'child_process'
import { promisify } from 'util'
import fs from 'fs/promises'
import path from 'path'

const execAsync = promisify(exec)

async function globalTeardown() {
  console.log('🧹 Starting Cerebrum Biology Academy E2E Test Cleanup...')

  // 1. Stop mock AI services
  console.log('🤖 Stopping mock AI services...')
  try {
    await execAsync('npm run test:ai:mock:stop')
    console.log('✅ Mock AI services stopped')
  } catch (error) {
    console.warn('⚠️ Mock AI services cleanup skipped')
  }

  // 2. Clean test database
  console.log('🗄️ Cleaning test database...')
  try {
    await execAsync('npm run db:test:cleanup')
    console.log('✅ Test database cleaned')
  } catch (error) {
    console.warn('⚠️ Database cleanup skipped')
  }

  // 3. Generate test coverage report
  console.log('📊 Generating comprehensive test report...')
  try {
    const testResults = await generateTestReport()
    await saveTestReport(testResults)
    console.log('✅ Test report generated')
  } catch (error) {
    console.error('❌ Test report generation failed:', error.message)
  }

  // 4. Cleanup temporary files
  console.log('🗂️ Cleaning temporary test files...')
  try {
    await cleanupTempFiles()
    console.log('✅ Temporary files cleaned')
  } catch (error) {
    console.warn('⚠️ Temp file cleanup skipped:', error.message)
  }

  // 5. Performance metrics summary
  console.log('⚡ Summarizing performance metrics...')
  try {
    await summarizePerformanceMetrics()
    console.log('✅ Performance summary generated')
  } catch (error) {
    console.warn('⚠️ Performance summary skipped:', error.message)
  }

  console.log('🎯 Global teardown completed successfully!')
}

async function generateTestReport() {
  const report = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'test',
    summary: {
      e2e: await getE2EResults(),
      unit: await getUnitTestResults(),
      integration: await getIntegrationResults(),
      performance: await getPerformanceResults(),
      security: await getSecurityResults(),
      accessibility: await getAccessibilityResults(),
    },
    coverage: await getCoverageMetrics(),
    aiTesting: await getAITestingResults(),
  }

  return report
}

async function getE2EResults() {
  try {
    const resultsPath = 'test-results/playwright-results.json'
    const results = await fs.readFile(resultsPath, 'utf-8')
    const data = JSON.parse(results)

    return {
      total: data.stats?.total || 0,
      passed: data.stats?.passed || 0,
      failed: data.stats?.failed || 0,
      duration: data.stats?.duration || 0,
    }
  } catch {
    return { total: 0, passed: 0, failed: 0, duration: 0 }
  }
}

async function getUnitTestResults() {
  try {
    const { stdout } = await execAsync('npm run test:coverage -- --passWithNoTests --json')
    const results = JSON.parse(stdout)

    return {
      total: results.numTotalTests || 0,
      passed: results.numPassedTests || 0,
      failed: results.numFailedTests || 0,
      coverage: results.coverageMap ? Object.keys(results.coverageMap).length : 0,
    }
  } catch {
    return { total: 0, passed: 0, failed: 0, coverage: 0 }
  }
}

async function getIntegrationResults() {
  try {
    const { stdout } = await execAsync('npm run test:integration -- --json')
    const results = JSON.parse(stdout)

    return {
      total: results.numTotalTests || 0,
      passed: results.numPassedTests || 0,
      failed: results.numFailedTests || 0,
    }
  } catch {
    return { total: 0, passed: 0, failed: 0 }
  }
}

async function getPerformanceResults() {
  try {
    const performanceLog = await fs.readFile('test-results/performance-metrics.json', 'utf-8')
    const metrics = JSON.parse(performanceLog)

    return {
      avgPageLoad: metrics.avgPageLoad || 0,
      avgApiResponse: metrics.avgApiResponse || 0,
      passedBenchmarks: metrics.passedBenchmarks || 0,
      totalBenchmarks: metrics.totalBenchmarks || 0,
    }
  } catch {
    return { avgPageLoad: 0, avgApiResponse: 0, passedBenchmarks: 0, totalBenchmarks: 0 }
  }
}

async function getSecurityResults() {
  try {
    const securityLog = await fs.readFile('test-results/security-scan.json', 'utf-8')
    const results = JSON.parse(securityLog)

    return {
      vulnerabilities: results.vulnerabilities || 0,
      criticalIssues: results.critical || 0,
      warningIssues: results.warnings || 0,
      passed: results.passed || 0,
    }
  } catch {
    return { vulnerabilities: 0, criticalIssues: 0, warningIssues: 0, passed: 0 }
  }
}

async function getAccessibilityResults() {
  try {
    const a11yLog = await fs.readFile('test-results/accessibility-report.json', 'utf-8')
    const results = JSON.parse(a11yLog)

    return {
      violations: results.violations || 0,
      warnings: results.warnings || 0,
      passed: results.passed || 0,
      wcagLevel: results.wcagLevel || 'AA',
    }
  } catch {
    return { violations: 0, warnings: 0, passed: 0, wcagLevel: 'AA' }
  }
}

async function getCoverageMetrics() {
  try {
    const coveragePath = 'coverage/coverage-summary.json'
    const coverage = await fs.readFile(coveragePath, 'utf-8')
    const data = JSON.parse(coverage)

    return {
      lines: data.total?.lines?.pct || 0,
      functions: data.total?.functions?.pct || 0,
      branches: data.total?.branches?.pct || 0,
      statements: data.total?.statements?.pct || 0,
    }
  } catch {
    return { lines: 0, functions: 0, branches: 0, statements: 0 }
  }
}

async function getAITestingResults() {
  try {
    const aiLog = await fs.readFile('test-results/ai-testing-metrics.json', 'utf-8')
    const results = JSON.parse(aiLog)

    return {
      contentQualityTests: results.contentQuality || 0,
      aiResponseTests: results.aiResponses || 0,
      performanceTests: results.aiPerformance || 0,
      accuracyScore: results.accuracyScore || 0,
    }
  } catch {
    return { contentQualityTests: 0, aiResponseTests: 0, performanceTests: 0, accuracyScore: 0 }
  }
}

async function saveTestReport(report: any) {
  const reportPath = 'test-results/comprehensive-test-report.json'
  await fs.writeFile(reportPath, JSON.stringify(report, null, 2))

  // Also create a human-readable summary
  const summary = `
# Cerebrum Biology Academy - Test Execution Summary

**Generated:** ${report.timestamp}
**Environment:** ${report.environment}

## Test Results Overview

### End-to-End Tests
- Total: ${report.summary.e2e.total}
- Passed: ${report.summary.e2e.passed}
- Failed: ${report.summary.e2e.failed}
- Duration: ${report.summary.e2e.duration}ms

### Unit Tests
- Total: ${report.summary.unit.total}
- Passed: ${report.summary.unit.passed}
- Failed: ${report.summary.unit.failed}
- Coverage: ${report.coverage.lines}% lines

### Performance
- Avg Page Load: ${report.summary.performance.avgPageLoad}ms
- Avg API Response: ${report.summary.performance.avgApiResponse}ms
- Benchmarks Passed: ${report.summary.performance.passedBenchmarks}/${report.summary.performance.totalBenchmarks}

### Security
- Vulnerabilities Found: ${report.summary.security.vulnerabilities}
- Critical Issues: ${report.summary.security.criticalIssues}
- Tests Passed: ${report.summary.security.passed}

### Accessibility
- WCAG Level: ${report.summary.accessibility.wcagLevel}
- Violations: ${report.summary.accessibility.violations}
- Tests Passed: ${report.summary.accessibility.passed}

### AI Testing
- Content Quality Tests: ${report.aiTesting.contentQualityTests}
- AI Response Tests: ${report.aiTesting.aiResponseTests}
- Accuracy Score: ${report.aiTesting.accuracyScore}%

## Coverage Metrics
- Lines: ${report.coverage.lines}%
- Functions: ${report.coverage.functions}%
- Branches: ${report.coverage.branches}%
- Statements: ${report.coverage.statements}%
`

  await fs.writeFile('test-results/test-summary.md', summary)
}

async function cleanupTempFiles() {
  const tempDirs = ['test-cache', 'playwright-state', 'tmp-test-data']

  for (const dir of tempDirs) {
    try {
      await fs.rm(dir, { recursive: true, force: true })
    } catch {
      // Ignore if directory doesn't exist
    }
  }
}

async function summarizePerformanceMetrics() {
  // Create performance trends if multiple test runs exist
  const metricsFile = 'test-results/performance-trends.json'

  try {
    const existingTrends = await fs.readFile(metricsFile, 'utf-8')
    const trends = JSON.parse(existingTrends)

    // Add current run to trends
    trends.runs.push({
      timestamp: new Date().toISOString(),
      metrics: await getPerformanceResults(),
    })

    // Keep only last 10 runs
    if (trends.runs.length > 10) {
      trends.runs = trends.runs.slice(-10)
    }

    await fs.writeFile(metricsFile, JSON.stringify(trends, null, 2))
  } catch {
    // Create new trends file
    const trends = {
      runs: [
        {
          timestamp: new Date().toISOString(),
          metrics: await getPerformanceResults(),
        },
      ],
    }
    await fs.writeFile(metricsFile, JSON.stringify(trends, null, 2))
  }
}

export default globalTeardown
