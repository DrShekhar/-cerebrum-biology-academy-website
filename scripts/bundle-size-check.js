#!/usr/bin/env node

/**
 * Bundle Size Monitoring Script
 * Checks if bundle sizes are within acceptable limits
 */

const fs = require('fs')
const path = require('path')

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
}

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

// Bundle size limits (in KB)
const LIMITS = {
  mainBundle: 300, // Main JS bundle
  totalJS: 1000, // Total JS across all chunks
  totalCSS: 100, // Total CSS
  page: 200, // Individual page bundle
}

function formatSize(bytes) {
  const kb = bytes / 1024
  return `${kb.toFixed(2)} KB`
}

function getDirectorySize(dir) {
  let size = 0

  if (!fs.existsSync(dir)) return size

  const files = fs.readdirSync(dir)

  for (const file of files) {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      size += getDirectorySize(filePath)
    } else {
      size += stat.size
    }
  }

  return size
}

function analyzeBundleSize() {
  log('\n📦 BUNDLE SIZE ANALYSIS', 'blue')
  log('='.repeat(60), 'blue')

  const nextDir = path.join(process.cwd(), '.next')

  if (!fs.existsSync(nextDir)) {
    log('❌ .next directory not found. Run build first: npm run build', 'red')
    process.exit(1)
  }

  const staticDir = path.join(nextDir, 'static')
  const chunksDir = path.join(staticDir, 'chunks')
  const cssDir = path.join(staticDir, 'css')

  // Calculate sizes
  const totalJSSize = getDirectorySize(chunksDir)
  const totalCSSSize = getDirectorySize(cssDir)
  const totalStaticSize = getDirectorySize(staticDir)

  log('\n📊 Bundle Sizes:', 'blue')
  log(
    `  Total JavaScript: ${formatSize(totalJSSize)}`,
    totalJSSize / 1024 > LIMITS.totalJS ? 'red' : 'green'
  )
  log(
    `  Total CSS: ${formatSize(totalCSSSize)}`,
    totalCSSSize / 1024 > LIMITS.totalCSS ? 'red' : 'green'
  )
  log(`  Total Static Assets: ${formatSize(totalStaticSize)}`)

  // Check limits
  const issues = []

  if (totalJSSize / 1024 > LIMITS.totalJS) {
    issues.push({
      type: 'JavaScript Bundle Too Large',
      actual: formatSize(totalJSSize),
      limit: `${LIMITS.totalJS} KB`,
      recommendation: 'Consider code splitting, lazy loading, or removing unused dependencies',
    })
  }

  if (totalCSSSize / 1024 > LIMITS.totalCSS) {
    issues.push({
      type: 'CSS Bundle Too Large',
      actual: formatSize(totalCSSSize),
      limit: `${LIMITS.totalCSS} KB`,
      recommendation: 'Consider PurgeCSS or removing unused Tailwind classes',
    })
  }

  // Analyze individual chunks
  log('\n📄 Largest Chunks:', 'blue')
  const chunks = []

  if (fs.existsSync(chunksDir)) {
    const files = fs.readdirSync(chunksDir)

    for (const file of files) {
      if (file.endsWith('.js')) {
        const filePath = path.join(chunksDir, file)
        const stat = fs.statSync(filePath)
        chunks.push({ name: file, size: stat.size })
      }
    }
  }

  chunks.sort((a, b) => b.size - a.size)
  chunks.slice(0, 10).forEach((chunk) => {
    const color = chunk.size / 1024 > LIMITS.page ? 'yellow' : 'reset'
    log(`  ${chunk.name}: ${formatSize(chunk.size)}`, color)
  })

  // Report issues
  if (issues.length > 0) {
    log('\n⚠️  Bundle Size Issues:', 'yellow')
    issues.forEach((issue) => {
      log(`\n  ❌ ${issue.type}`, 'red')
      log(`     Actual: ${issue.actual}`, 'red')
      log(`     Limit: ${issue.limit}`, 'yellow')
      log(`     💡 ${issue.recommendation}`, 'blue')
    })
  }

  // Summary
  log('\n' + '='.repeat(60), 'blue')

  if (issues.length === 0) {
    log('✅ All bundle sizes are within acceptable limits!', 'green')
    process.exit(0)
  } else {
    log(`⚠️  ${issues.length} bundle size issue(s) found`, 'yellow')
    log('\nRun: npm run build:analyze', 'blue')
    log('To analyze bundle composition interactively', 'blue')

    // Don't fail build, just warn
    process.exit(0)
  }
}

analyzeBundleSize()
