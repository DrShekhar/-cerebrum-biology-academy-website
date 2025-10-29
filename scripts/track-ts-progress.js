#!/usr/bin/env node

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const progressFile = path.join(process.cwd(), '.ts-progress.json')

function getErrorCount() {
  try {
    const output = execSync('npx tsc --noEmit 2>&1', {
      encoding: 'utf-8',
      maxBuffer: 10 * 1024 * 1024,
      stdio: 'pipe',
    })

    const errorLines = output.split('\n').filter((line) => line.includes('error TS'))
    return errorLines.length
  } catch (error) {
    if (error.stdout) {
      const errorLines = error.stdout.split('\n').filter((line) => line.includes('error TS'))
      return errorLines.length
    }
    return 0
  }
}

function loadProgress() {
  if (fs.existsSync(progressFile)) {
    return JSON.parse(fs.readFileSync(progressFile, 'utf-8'))
  }
  return {
    baseline: null,
    checkpoints: [],
    phases: {
      phase1: { target: 500, started: null, completed: null },
      phase2: { target: 400, started: null, completed: null },
      phase3: { target: 200, started: null, completed: null },
    },
  }
}

function saveProgress(data) {
  fs.writeFileSync(progressFile, JSON.stringify(data, null, 2))
}

function recordCheckpoint(message) {
  const progress = loadProgress()
  const errorCount = getErrorCount()

  if (progress.baseline === null) {
    progress.baseline = errorCount
    console.log(`\n📊 Baseline established: ${errorCount} errors`)
  }

  const checkpoint = {
    timestamp: new Date().toISOString(),
    errorCount,
    message,
    reduction: progress.baseline - errorCount,
    percentComplete: (((progress.baseline - errorCount) / (progress.baseline - 200)) * 100).toFixed(
      1
    ),
  }

  progress.checkpoints.push(checkpoint)

  if (errorCount <= 500 && !progress.phases.phase1.completed) {
    progress.phases.phase1.completed = new Date().toISOString()
    console.log('🎉 Phase 1 Complete! Target reached: ≤500 errors')
  }
  if (errorCount <= 400 && !progress.phases.phase2.completed) {
    progress.phases.phase2.completed = new Date().toISOString()
    console.log('🎉 Phase 2 Complete! Target reached: ≤400 errors')
  }
  if (errorCount <= 200 && !progress.phases.phase3.completed) {
    progress.phases.phase3.completed = new Date().toISOString()
    console.log('🎉 Phase 3 Complete! Target reached: ≤200 errors')
    console.log('🏆 MISSION ACCOMPLISHED! All targets achieved!')
  }

  saveProgress(progress)

  console.log('\n' + '='.repeat(80))
  console.log('TYPESCRIPT ERROR TRACKING')
  console.log('='.repeat(80))
  console.log(`Current errors: ${errorCount}`)
  console.log(`Baseline: ${progress.baseline}`)
  console.log(`Errors fixed: ${checkpoint.reduction}`)
  console.log(`Progress: ${checkpoint.percentComplete}% to 200 target`)
  console.log(`Message: ${message}`)

  if (progress.checkpoints.length > 1) {
    const previous = progress.checkpoints[progress.checkpoints.length - 2]
    const change = previous.errorCount - errorCount
    if (change > 0) {
      console.log(`📉 Reduced by ${change} since last checkpoint`)
    } else if (change < 0) {
      console.log(`📈 Increased by ${Math.abs(change)} since last checkpoint`)
    } else {
      console.log(`➡️  No change since last checkpoint`)
    }
  }

  console.log('\nPhase Status:')
  Object.entries(progress.phases).forEach(([phase, data]) => {
    const status = data.completed
      ? '✅ Complete'
      : errorCount <= data.target
        ? '🎯 Target Reached!'
        : `🔄 In Progress (${data.target} target)`
    console.log(`  ${phase.toUpperCase()}: ${status}`)
  })

  console.log('='.repeat(80) + '\n')

  return checkpoint
}

function showHistory() {
  const progress = loadProgress()

  if (!progress.baseline) {
    console.log('No progress data available. Run with a message to record first checkpoint.')
    return
  }

  console.log('\n' + '='.repeat(80))
  console.log('TYPESCRIPT ERROR REDUCTION HISTORY')
  console.log('='.repeat(80))
  console.log(`Baseline: ${progress.baseline} errors\n`)

  progress.checkpoints.forEach((cp, index) => {
    const date = new Date(cp.timestamp).toLocaleString()
    console.log(`${index + 1}. [${date}]`)
    console.log(
      `   Errors: ${cp.errorCount} (${cp.reduction > 0 ? '-' : '+'}${Math.abs(cp.reduction)})`
    )
    console.log(`   Progress: ${cp.percentComplete}%`)
    console.log(`   ${cp.message}\n`)
  })

  console.log('='.repeat(80) + '\n')
}

const command = process.argv[2]
const message = process.argv.slice(3).join(' ')

if (command === 'history' || command === 'show') {
  showHistory()
} else if (command === 'reset') {
  if (fs.existsSync(progressFile)) {
    fs.unlinkSync(progressFile)
    console.log('Progress data reset.')
  }
} else if (message) {
  recordCheckpoint(message)
} else {
  console.log(`
Usage:
  node track-ts-progress.js <message>       Record checkpoint with message
  node track-ts-progress.js history         Show all checkpoints
  node track-ts-progress.js reset           Reset progress data

Examples:
  node track-ts-progress.js "Fixed missing imports in API routes"
  node track-ts-progress.js "Added types to implicit any parameters"
  node track-ts-progress.js history
  `)
}
