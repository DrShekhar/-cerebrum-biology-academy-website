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

const errorsByCode = {}
const errorsByFile = {}
const errorsByDirectory = {}

lines.forEach((line) => {
  const match = line.match(/^(.+?)\((\d+),(\d+)\):\s+error\s+(TS\d+):\s+(.+)$/)

  if (match) {
    const [, filePath, lineNum, colNum, errorCode, message] = match
    const fileName = path.basename(filePath)
    const directory = path.dirname(filePath)

    if (!errorsByCode[errorCode]) {
      errorsByCode[errorCode] = []
    }
    errorsByCode[errorCode].push({ filePath, lineNum, colNum, message })

    if (!errorsByFile[filePath]) {
      errorsByFile[filePath] = []
    }
    errorsByFile[filePath].push({ errorCode, lineNum, colNum, message })

    if (!errorsByDirectory[directory]) {
      errorsByDirectory[directory] = 0
    }
    errorsByDirectory[directory]++
  }
})

console.log('='.repeat(80))
console.log('TYPESCRIPT ERROR ANALYSIS REPORT')
console.log('='.repeat(80))
console.log(`\nTotal Errors: ${lines.length}`)
console.log(`Unique Error Codes: ${Object.keys(errorsByCode).length}`)
console.log(`Files with Errors: ${Object.keys(errorsByFile).length}`)
console.log(`Directories with Errors: ${Object.keys(errorsByDirectory).length}`)

console.log('\n' + '='.repeat(80))
console.log('ERROR DISTRIBUTION BY CODE (Top 15)')
console.log('='.repeat(80))

const sortedByCodes = Object.entries(errorsByCode)
  .sort((a, b) => b[1].length - a[1].length)
  .slice(0, 15)

sortedByCodes.forEach(([code, errors]) => {
  console.log(`\n${code}: ${errors.length} occurrences`)
  console.log(
    `  Sample: ${errors[0].message.substring(0, 100)}${errors[0].message.length > 100 ? '...' : ''}`
  )
})

console.log('\n' + '='.repeat(80))
console.log('FILES WITH MOST ERRORS (Top 20)')
console.log('='.repeat(80))

const sortedByFiles = Object.entries(errorsByFile)
  .sort((a, b) => b[1].length - a[1].length)
  .slice(0, 20)

sortedByFiles.forEach(([file, errors], index) => {
  const errorCounts = {}
  errors.forEach((e) => {
    errorCounts[e.errorCode] = (errorCounts[e.errorCode] || 0) + 1
  })

  const errorSummary = Object.entries(errorCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([code, count]) => `${code}(${count})`)
    .join(', ')

  console.log(`${index + 1}. ${file}`)
  console.log(`   Errors: ${errors.length} - ${errorSummary}`)
})

console.log('\n' + '='.repeat(80))
console.log('DIRECTORY DISTRIBUTION (Top 15)')
console.log('='.repeat(80))

const sortedByDirs = Object.entries(errorsByDirectory)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 15)

sortedByDirs.forEach(([dir, count], index) => {
  console.log(`${index + 1}. ${dir}: ${count} errors`)
})

console.log('\n' + '='.repeat(80))
console.log('QUICK WIN FILES (1-3 errors)')
console.log('='.repeat(80))

const quickWins = Object.entries(errorsByFile)
  .filter(([, errors]) => errors.length >= 1 && errors.length <= 3)
  .sort((a, b) => a[1].length - b[1].length)

console.log(`\nFound ${quickWins.length} files with 1-3 errors:`)
quickWins.slice(0, 20).forEach(([file, errors]) => {
  console.log(`  ${file}: ${errors.length} error(s)`)
})

console.log('\n' + '='.repeat(80))
console.log('SUMMARY BY ERROR TYPE')
console.log('='.repeat(80))

const errorDescriptions = {
  TS2304: 'Cannot find name (missing imports/declarations)',
  TS2339: 'Property does not exist on type',
  TS2345: 'Argument type not assignable',
  TS2322: 'Type not assignable',
  TS7006: 'Implicit any type',
  TS2367: 'Type comparison has no overlap',
  TS2769: 'No overload matches call',
  TS2353: 'Unknown property in object literal',
  TS2362: 'Left-hand side of arithmetic must be number',
  TS2363: 'Right-hand side of arithmetic must be number',
  TS2365: 'Operator cannot be applied to types',
  TS2717: 'Subsequent property declarations type mismatch',
  TS2307: 'Cannot find module',
}

console.log('\nError Type Breakdown:')
Object.entries(errorsByCode)
  .sort((a, b) => b[1].length - a[1].length)
  .forEach(([code, errors]) => {
    const description = errorDescriptions[code] || 'Other'
    console.log(`  ${code} (${description}): ${errors.length}`)
  })

const jsonReport = {
  summary: {
    totalErrors: lines.length,
    uniqueErrorCodes: Object.keys(errorsByCode).length,
    filesAffected: Object.keys(errorsByFile).length,
    directoriesAffected: Object.keys(errorsByDirectory).length,
  },
  errorsByCode: Object.fromEntries(
    Object.entries(errorsByCode).map(([code, errors]) => [
      code,
      { count: errors.length, description: errorDescriptions[code] || 'Other' },
    ])
  ),
  quickWinFiles: quickWins.slice(0, 50).map(([file, errors]) => ({
    file,
    errorCount: errors.length,
    errors: errors.map((e) => ({ code: e.errorCode, line: e.lineNum })),
  })),
  highImpactFiles: sortedByFiles.slice(0, 30).map(([file, errors]) => ({
    file,
    errorCount: errors.length,
    topErrors: Object.entries(
      errors.reduce((acc, e) => {
        acc[e.errorCode] = (acc[e.errorCode] || 0) + 1
        return acc
      }, {})
    )
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5),
  })),
}

const reportPath = path.join(process.cwd(), 'ts-error-analysis.json')
fs.writeFileSync(reportPath, JSON.stringify(jsonReport, null, 2))
console.log(`\n\nDetailed JSON report saved to: ${reportPath}`)

console.log('\n' + '='.repeat(80))
