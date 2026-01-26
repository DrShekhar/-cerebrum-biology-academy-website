#!/usr/bin/env node
/**
 * Comprehensive Test Report Generator
 * Consolidates all test results into a single comprehensive report
 */

const fs = require('fs')
const path = require('path')

function readJSONFile(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf8'))
    }
  } catch (error) {
    console.warn(`Warning: Could not read ${filePath}:`, error.message)
  }
  return null
}

function calculateOverallScore(results) {
  const weights = {
    unit: 0.25,
    integration: 0.2,
    e2e: 0.2,
    performance: 0.15,
    security: 0.1,
    accessibility: 0.05,
    ai: 0.05,
  }

  let totalScore = 0
  let totalWeight = 0

  Object.entries(weights).forEach(([category, weight]) => {
    if (results[category] && results[category].score !== undefined) {
      totalScore += results[category].score * weight
      totalWeight += weight
    }
  })

  return totalWeight > 0 ? totalScore / totalWeight : 0
}

function generateBadge(score) {
  if (score >= 90) return '🟢 Excellent'
  if (score >= 80) return '🟡 Good'
  if (score >= 70) return '🟠 Fair'
  return '🔴 Needs Improvement'
}

function formatDuration(ms) {
  const seconds = Math.floor(ms / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)

  if (hours > 0) return `${hours}h ${minutes % 60}m ${seconds % 60}s`
  if (minutes > 0) return `${minutes}m ${seconds % 60}s`
  return `${seconds}s`
}

function generateReport() {
  const timestamp = new Date().toISOString()
  const results = {}

  // Collect Unit Test Results
  const jestResults = readJSONFile('coverage/coverage-summary.json')
  if (jestResults) {
    results.unit = {
      total: jestResults.total?.lines?.total || 0,
      covered: jestResults.total?.lines?.covered || 0,
      percentage: jestResults.total?.lines?.pct || 0,
      score: jestResults.total?.lines?.pct || 0,
    }
  }

  // Collect Integration Test Results
  const integrationResults = readJSONFile('test-results/integration-results.json')
  if (integrationResults) {
    results.integration = {
      total: integrationResults.numTotalTests || 0,
      passed: integrationResults.numPassedTests || 0,
      failed: integrationResults.numFailedTests || 0,
      score:
        integrationResults.numTotalTests > 0
          ? (integrationResults.numPassedTests / integrationResults.numTotalTests) * 100
          : 0,
    }
  }

  // Collect E2E Test Results
  const playwrightResults = readJSONFile('test-results/playwright-results.json')
  if (playwrightResults) {
    results.e2e = {
      total: playwrightResults.stats?.total || 0,
      passed: playwrightResults.stats?.passed || 0,
      failed: playwrightResults.stats?.failed || 0,
      duration: playwrightResults.stats?.duration || 0,
      score:
        playwrightResults.stats?.total > 0
          ? (playwrightResults.stats?.passed / playwrightResults.stats?.total) * 100
          : 0,
    }
  }

  // Collect Performance Test Results
  const performanceResults = readJSONFile('test-results/performance-metrics.json')
  if (performanceResults) {
    results.performance = {
      avgPageLoad: performanceResults.avgPageLoad || 0,
      avgApiResponse: performanceResults.avgApiResponse || 0,
      passedBenchmarks: performanceResults.passedBenchmarks || 0,
      totalBenchmarks: performanceResults.totalBenchmarks || 0,
      score:
        performanceResults.totalBenchmarks > 0
          ? (performanceResults.passedBenchmarks / performanceResults.totalBenchmarks) * 100
          : 0,
    }
  }

  // Collect Security Test Results
  const securityResults = readJSONFile('test-results/security-scan.json')
  if (securityResults) {
    results.security = {
      vulnerabilities: securityResults.vulnerabilities || 0,
      criticalIssues: securityResults.critical || 0,
      warningIssues: securityResults.warnings || 0,
      passed: securityResults.passed || 0,
      score:
        securityResults.vulnerabilities === 0
          ? 100
          : Math.max(0, 100 - (securityResults.critical * 20 + securityResults.warnings * 5)),
    }
  }

  // Collect Accessibility Test Results
  const accessibilityResults = readJSONFile('test-results/accessibility-report.json')
  if (accessibilityResults) {
    results.accessibility = {
      violations: accessibilityResults.violations || 0,
      warnings: accessibilityResults.warnings || 0,
      passed: accessibilityResults.passed || 0,
      wcagLevel: accessibilityResults.wcagLevel || 'AA',
      score:
        accessibilityResults.violations === 0
          ? 100
          : Math.max(0, 100 - accessibilityResults.violations * 10),
    }
  }

  // Collect AI Testing Results
  const aiResults = readJSONFile('test-results/ai-testing-metrics.json')
  if (aiResults) {
    results.ai = {
      contentQualityTests: aiResults.contentQuality || 0,
      aiResponseTests: aiResults.aiResponses || 0,
      performanceTests: aiResults.aiPerformance || 0,
      accuracyScore: aiResults.accuracyScore || 0,
      score: aiResults.accuracyScore || 0,
    }
  }

  const overallScore = calculateOverallScore(results)
  const badge = generateBadge(overallScore)

  // Generate the report
  let report = `
# 🧪 Cerebrum Biology Academy - Comprehensive Test Report

**Generated:** ${new Date(timestamp).toLocaleString()}
**Overall Score:** ${overallScore.toFixed(1)}% ${badge}
**Commit:** ${process.env.GITHUB_SHA?.substring(0, 7) || 'local'}
**Branch:** ${process.env.GITHUB_REF?.replace('refs/heads/', '') || 'local'}

## 📊 Test Results Summary

| Test Category | Status | Score | Details |
|---------------|--------|-------|---------|`

  // Unit Tests
  if (results.unit) {
    const status =
      results.unit.percentage >= 80 ? '✅' : results.unit.percentage >= 70 ? '⚠️' : '❌'
    report += `
| Unit Tests | ${status} | ${results.unit.percentage.toFixed(1)}% | ${results.unit.covered}/${results.unit.total} lines covered |`
  }

  // Integration Tests
  if (results.integration) {
    const status =
      results.integration.score >= 90 ? '✅' : results.integration.score >= 80 ? '⚠️' : '❌'
    report += `
| Integration Tests | ${status} | ${results.integration.score.toFixed(1)}% | ${results.integration.passed}/${results.integration.total} tests passed |`
  }

  // E2E Tests
  if (results.e2e) {
    const status = results.e2e.score >= 95 ? '✅' : results.e2e.score >= 90 ? '⚠️' : '❌'
    report += `
| E2E Tests | ${status} | ${results.e2e.score.toFixed(1)}% | ${results.e2e.passed}/${results.e2e.total} tests passed (${formatDuration(results.e2e.duration)}) |`
  }

  // Performance Tests
  if (results.performance) {
    const status =
      results.performance.score >= 80 ? '✅' : results.performance.score >= 60 ? '⚠️' : '❌'
    report += `
| Performance Tests | ${status} | ${results.performance.score.toFixed(1)}% | ${results.performance.passedBenchmarks}/${results.performance.totalBenchmarks} benchmarks passed |`
  }

  // Security Tests
  if (results.security) {
    const status =
      results.security.criticalIssues === 0
        ? '✅'
        : results.security.criticalIssues <= 2
          ? '⚠️'
          : '❌'
    report += `
| Security Tests | ${status} | ${results.security.score.toFixed(1)}% | ${results.security.vulnerabilities} vulnerabilities, ${results.security.criticalIssues} critical |`
  }

  // Accessibility Tests
  if (results.accessibility) {
    const status =
      results.accessibility.violations === 0
        ? '✅'
        : results.accessibility.violations <= 5
          ? '⚠️'
          : '❌'
    report += `
| Accessibility Tests | ${status} | ${results.accessibility.score.toFixed(1)}% | ${results.accessibility.violations} violations, WCAG ${results.accessibility.wcagLevel} |`
  }

  // AI Tests
  if (results.ai) {
    const status =
      results.ai.accuracyScore >= 90 ? '✅' : results.ai.accuracyScore >= 80 ? '⚠️' : '❌'
    report += `
| AI Content Quality | ${status} | ${results.ai.accuracyScore.toFixed(1)}% | ${results.ai.contentQualityTests} content tests, ${results.ai.aiResponseTests} response tests |`
  }

  report += `

## 📈 Detailed Results

### 🔬 Unit Test Coverage`

  if (results.unit) {
    report += `
- **Lines:** ${results.unit.covered}/${results.unit.total} (${results.unit.percentage.toFixed(1)}%)
- **Status:** ${results.unit.percentage >= 80 ? 'PASS ✅' : 'NEEDS IMPROVEMENT ⚠️'}
- **Requirement:** ≥80% line coverage for production`
  } else {
    report += `
- **Status:** No unit test data available`
  }

  report += `

### 🔄 Integration Tests`

  if (results.integration) {
    report += `
- **Total Tests:** ${results.integration.total}
- **Passed:** ${results.integration.passed}
- **Failed:** ${results.integration.failed}
- **Pass Rate:** ${results.integration.score.toFixed(1)}%
- **Status:** ${results.integration.score >= 90 ? 'PASS ✅' : 'NEEDS IMPROVEMENT ⚠️'}`
  } else {
    report += `
- **Status:** No integration test data available`
  }

  report += `

### 🎭 End-to-End Tests`

  if (results.e2e) {
    report += `
- **Total Tests:** ${results.e2e.total}
- **Passed:** ${results.e2e.passed}
- **Failed:** ${results.e2e.failed}
- **Duration:** ${formatDuration(results.e2e.duration)}
- **Pass Rate:** ${results.e2e.score.toFixed(1)}%
- **Status:** ${results.e2e.score >= 95 ? 'PASS ✅' : 'NEEDS IMPROVEMENT ⚠️'}`
  } else {
    report += `
- **Status:** No E2E test data available`
  }

  report += `

### ⚡ Performance Tests`

  if (results.performance) {
    report += `
- **Benchmarks Passed:** ${results.performance.passedBenchmarks}/${results.performance.totalBenchmarks}
- **Avg Page Load:** ${results.performance.avgPageLoad}ms
- **Avg API Response:** ${results.performance.avgApiResponse}ms
- **Performance Score:** ${results.performance.score.toFixed(1)}%
- **Status:** ${results.performance.score >= 80 ? 'PASS ✅' : 'NEEDS IMPROVEMENT ⚠️'}`
  } else {
    report += `
- **Status:** No performance test data available`
  }

  report += `

### 🔒 Security Tests`

  if (results.security) {
    report += `
- **Total Vulnerabilities:** ${results.security.vulnerabilities}
- **Critical Issues:** ${results.security.criticalIssues}
- **Warning Issues:** ${results.security.warningIssues}
- **Tests Passed:** ${results.security.passed}
- **Security Score:** ${results.security.score.toFixed(1)}%
- **Status:** ${results.security.criticalIssues === 0 ? 'PASS ✅' : 'CRITICAL ISSUES FOUND ❌'}`
  } else {
    report += `
- **Status:** No security test data available`
  }

  report += `

### ♿ Accessibility Tests`

  if (results.accessibility) {
    report += `
- **WCAG Level:** ${results.accessibility.wcagLevel}
- **Violations:** ${results.accessibility.violations}
- **Warnings:** ${results.accessibility.warnings}
- **Tests Passed:** ${results.accessibility.passed}
- **Accessibility Score:** ${results.accessibility.score.toFixed(1)}%
- **Status:** ${results.accessibility.violations === 0 ? 'PASS ✅' : 'VIOLATIONS FOUND ⚠️'}`
  } else {
    report += `
- **Status:** No accessibility test data available`
  }

  report += `

### 🤖 AI Content Quality`

  if (results.ai) {
    report += `
- **Content Quality Tests:** ${results.ai.contentQualityTests}
- **AI Response Tests:** ${results.ai.aiResponseTests}
- **Performance Tests:** ${results.ai.performanceTests}
- **Accuracy Score:** ${results.ai.accuracyScore.toFixed(1)}%
- **Status:** ${results.ai.accuracyScore >= 90 ? 'PASS ✅' : 'NEEDS IMPROVEMENT ⚠️'}`
  } else {
    report += `
- **Status:** No AI test data available`
  }

  // Recommendations
  report += `

## 🎯 Recommendations`

  const recommendations = []

  if (results.unit && results.unit.percentage < 80) {
    recommendations.push('📊 Increase unit test coverage to at least 80%')
  }

  if (results.integration && results.integration.score < 90) {
    recommendations.push('🔄 Improve integration test reliability')
  }

  if (results.e2e && results.e2e.score < 95) {
    recommendations.push('🎭 Fix failing end-to-end tests')
  }

  if (results.performance && results.performance.score < 80) {
    recommendations.push('⚡ Optimize application performance')
  }

  if (results.security && results.security.criticalIssues > 0) {
    recommendations.push('🔒 **URGENT:** Fix critical security vulnerabilities')
  }

  if (results.accessibility && results.accessibility.violations > 0) {
    recommendations.push('♿ Address accessibility violations for WCAG compliance')
  }

  if (results.ai && results.ai.accuracyScore < 90) {
    recommendations.push('🤖 Improve AI content quality and accuracy')
  }

  if (recommendations.length === 0) {
    report += `

✅ **All tests are passing!** Your code meets the quality standards.`
  } else {
    recommendations.forEach((rec) => {
      report += `
- ${rec}`
    })
  }

  // Production readiness
  report += `

## 🚀 Production Readiness

**Status:** `

  const productionReady =
    (results.unit?.percentage || 0) >= 80 &&
    (results.integration?.score || 0) >= 90 &&
    (results.e2e?.score || 0) >= 95 &&
    (results.security?.criticalIssues || 0) === 0 &&
    overallScore >= 85

  if (productionReady) {
    report += `**READY FOR PRODUCTION** ✅

All quality gates are satisfied. The application is ready for deployment.`
  } else {
    report += `**NOT READY FOR PRODUCTION** ❌

Please address the recommendations above before deploying to production.`
  }

  report += `

---

*Generated by Cerebrum Biology Academy QA Testing Framework*
*For detailed test results, check the individual test artifacts.*`

  return report
}

// Generate and output the report
try {
  const report = generateReport()
  console.log(report)
} catch (error) {
  console.error('Error generating test report:', error)
  process.exit(1)
}
