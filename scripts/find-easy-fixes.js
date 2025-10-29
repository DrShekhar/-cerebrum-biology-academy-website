#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const errorFile = process.argv[2] || '/tmp/tsc-errors.txt'

if (!fs.existsSync(errorFile)) {
  console.error(`Error file not found: ${errorFile}`)
  process.exit(1)
}

const content = fs.readFileSync(errorFile, 'utf-8')
const lines = content.split('\n').filter((line) => line.includes('error TS'))

const errorsByFile = {}
const easyFixPatterns = {
  TS1361: {
    description: 'Import type used as value - change import type to import',
    difficulty: 1,
    example: "import { Prisma } from '@prisma/client' // instead of import type",
  },
  TS2367: {
    description: 'Type comparison has no overlap - fix string literals',
    difficulty: 1,
    example: "session.role === 'admin' // instead of 'ADMIN'",
  },
  TS2304: {
    description: 'Cannot find name - add missing import or declaration',
    difficulty: 2,
    example: 'declare const gtag: (...args: any[]) => void',
  },
  TS2305: {
    description: 'Module has no exported member - fix import name',
    difficulty: 2,
    example: "import { Zap } from 'lucide-react' // instead of Lightning",
  },
  TS2307: {
    description: 'Cannot find module - fix path or create module',
    difficulty: 3,
    example: 'Update import path or comment out if unused',
  },
}

lines.forEach((line) => {
  const match = line.match(/^(.+?)\((\d+),(\d+)\):\s+error\s+(TS\d+):\s+(.+)$/)

  if (match) {
    const [, filePath, lineNum, colNum, errorCode, message] = match

    if (!errorsByFile[filePath]) {
      errorsByFile[filePath] = []
    }
    errorsByFile[filePath].push({ errorCode, lineNum, colNum, message })
  }
})

const fileAnalysis = Object.entries(errorsByFile).map(([file, errors]) => {
  const errorCounts = {}
  let difficultyScore = 0
  let hasEasyFix = false

  errors.forEach((e) => {
    errorCounts[e.errorCode] = (errorCounts[e.errorCode] || 0) + 1

    if (easyFixPatterns[e.errorCode]) {
      hasEasyFix = true
      difficultyScore += easyFixPatterns[e.errorCode].difficulty
    } else {
      difficultyScore += 5
    }
  })

  const avgDifficulty = difficultyScore / errors.length

  return {
    file,
    errorCount: errors.length,
    errorCounts,
    avgDifficulty,
    hasEasyFix,
    errors,
  }
})

const easyFiles = fileAnalysis
  .filter((f) => f.avgDifficulty <= 3 && f.errorCount >= 1)
  .sort((a, b) => {
    if (a.avgDifficulty !== b.avgDifficulty) {
      return a.avgDifficulty - b.avgDifficulty
    }
    return a.errorCount - b.errorCount
  })

const highImpactFiles = fileAnalysis
  .filter((f) => f.errorCount >= 10 && f.hasEasyFix)
  .sort((a, b) => {
    const scoreA = b.errorCount * (4 - a.avgDifficulty)
    const scoreB = a.errorCount * (4 - b.avgDifficulty)
    return scoreA - scoreB
  })

console.log('='.repeat(80))
console.log('EASY FIX OPPORTUNITIES')
console.log('='.repeat(80))

console.log('\n🎯 TOP 20 EASIEST FILES TO FIX (Low difficulty, few errors)\n')
easyFiles.slice(0, 20).forEach((f, index) => {
  const topError = Object.entries(f.errorCounts).sort((a, b) => b[1] - a[1])[0]
  const errorCode = topError[0]
  const pattern = easyFixPatterns[errorCode]

  console.log(`${index + 1}. ${f.file}`)
  console.log(`   Errors: ${f.errorCount} | Difficulty: ${'⭐'.repeat(Math.ceil(f.avgDifficulty))}`)
  if (pattern) {
    console.log(`   Main issue: ${errorCode} - ${pattern.description}`)
    console.log(`   Fix: ${pattern.example}`)
  }
  console.log()
})

console.log('='.repeat(80))
console.log('🚀 HIGH IMPACT FILES (Many errors, but easy to fix)\n')
highImpactFiles.slice(0, 10).forEach((f, index) => {
  const easyErrors = Object.entries(f.errorCounts)
    .filter(([code]) => easyFixPatterns[code])
    .sort((a, b) => b[1] - a[1])

  console.log(`${index + 1}. ${f.file}`)
  console.log(
    `   Total Errors: ${f.errorCount} | Impact Score: ${Math.round(f.errorCount * (4 - f.avgDifficulty))}`
  )

  easyErrors.forEach(([code, count]) => {
    const pattern = easyFixPatterns[code]
    console.log(`   - ${code} (${count}): ${pattern.description}`)
  })
  console.log()
})

console.log('='.repeat(80))
console.log('📋 FIX RECIPES BY ERROR TYPE\n')

Object.entries(easyFixPatterns).forEach(([code, info]) => {
  const filesWithError = fileAnalysis.filter((f) => f.errorCounts[code] > 0)
  const totalOccurrences = filesWithError.reduce((sum, f) => sum + f.errorCounts[code], 0)

  console.log(`${code} (${totalOccurrences} occurrences in ${filesWithError.length} files)`)
  console.log(`  Difficulty: ${'⭐'.repeat(info.difficulty)}`)
  console.log(`  Description: ${info.description}`)
  console.log(`  Fix example: ${info.example}`)
  console.log()
})

console.log('='.repeat(80))
console.log('💡 SUGGESTED FIX ORDER (Start here!)\n')

const fixOrder = [
  {
    phase: 'Phase 1A - Import Type Fixes (Highest impact)',
    files: highImpactFiles.filter((f) => f.errorCounts['TS1361'] > 0).slice(0, 3),
    estimatedSavings: highImpactFiles
      .filter((f) => f.errorCounts['TS1361'])
      .slice(0, 3)
      .reduce((sum, f) => sum + (f.errorCounts['TS1361'] || 0), 0),
  },
  {
    phase: 'Phase 1B - Quick Wins (1-3 errors each)',
    files: easyFiles.filter((f) => f.errorCount <= 3).slice(0, 15),
    estimatedSavings: easyFiles
      .filter((f) => f.errorCount <= 3)
      .slice(0, 15)
      .reduce((sum, f) => sum + f.errorCount, 0),
  },
  {
    phase: 'Phase 1C - Missing Names & Imports',
    files: easyFiles.filter((f) => f.errorCounts['TS2304'] || f.errorCounts['TS2307']).slice(0, 10),
    estimatedSavings: easyFiles
      .filter((f) => f.errorCounts['TS2304'] || f.errorCounts['TS2307'])
      .slice(0, 10)
      .reduce((sum, f) => sum + f.errorCount, 0),
  },
]

fixOrder.forEach(({ phase, files, estimatedSavings }) => {
  console.log(`${phase}`)
  console.log(`Estimated errors to fix: ${estimatedSavings}`)
  files.forEach((f) => {
    console.log(`  - ${path.basename(f.file)} (${f.errorCount} errors)`)
  })
  console.log()
})

const totalEasySavings = fixOrder.reduce((sum, p) => sum + p.estimatedSavings, 0)
console.log(`🎉 Total quick wins available: ~${totalEasySavings} errors`)
console.log('='.repeat(80))

const reportPath = path.join(process.cwd(), 'easy-fixes-report.json')
fs.writeFileSync(
  reportPath,
  JSON.stringify(
    {
      easyFiles: easyFiles.slice(0, 50),
      highImpactFiles: highImpactFiles.slice(0, 20),
      fixOrder,
      totalQuickWins: totalEasySavings,
    },
    null,
    2
  )
)

console.log(`\nDetailed report saved to: ${reportPath}\n`)
