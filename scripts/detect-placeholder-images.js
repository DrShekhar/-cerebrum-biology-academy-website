#!/usr/bin/env node

/**
 * Placeholder Image Detector
 *
 * This script identifies fake/placeholder images in the codebase by:
 * 1. Checking if image file extensions match their actual content type
 * 2. Identifying SVG placeholders disguised as JPG/PNG files
 * 3. Detecting very small file sizes that indicate placeholders
 *
 * Usage: node scripts/detect-placeholder-images.js
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const PUBLIC_DIR = path.join(__dirname, '../public')

// Image directories to scan
const IMAGE_DIRS = ['faculty', 'testimonials', 'avatars', 'images', 'assets', 'students', 'team']

// File signatures for common image formats
const FILE_SIGNATURES = {
  jpeg: [0xff, 0xd8, 0xff],
  png: [0x89, 0x50, 0x4e, 0x47],
  gif: [0x47, 0x49, 0x46],
  webp: [0x52, 0x49, 0x46, 0x46], // RIFF header
  svg: [0x3c, 0x3f, 0x78, 0x6d], // <?xm or <svg
}

function getFileSignature(filePath, bytes = 12) {
  try {
    const buffer = Buffer.alloc(bytes)
    const fd = fs.openSync(filePath, 'r')
    fs.readSync(fd, buffer, 0, bytes, 0)
    fs.closeSync(fd)
    return buffer
  } catch (error) {
    return null
  }
}

function detectActualType(filePath) {
  const signature = getFileSignature(filePath)
  if (!signature) return 'unknown'

  // Check for SVG (text-based)
  const headerText = signature.toString('utf8', 0, 12).toLowerCase()
  if (
    headerText.includes('<?xml') ||
    headerText.includes('<svg') ||
    headerText.includes('<!doctype')
  ) {
    return 'svg'
  }

  // Check binary signatures
  if (signature[0] === 0xff && signature[1] === 0xd8 && signature[2] === 0xff) {
    return 'jpeg'
  }
  if (
    signature[0] === 0x89 &&
    signature[1] === 0x50 &&
    signature[2] === 0x4e &&
    signature[3] === 0x47
  ) {
    return 'png'
  }
  if (signature[0] === 0x47 && signature[1] === 0x49 && signature[2] === 0x46) {
    return 'gif'
  }
  if (signature.toString('utf8', 0, 4) === 'RIFF') {
    return 'webp'
  }

  return 'unknown'
}

function getExpectedType(filename) {
  const ext = path.extname(filename).toLowerCase()
  const extMap = {
    '.jpg': 'jpeg',
    '.jpeg': 'jpeg',
    '.png': 'png',
    '.gif': 'gif',
    '.webp': 'webp',
    '.svg': 'svg',
  }
  return extMap[ext] || 'unknown'
}

function scanDirectory(dir, results = { fake: [], real: [], suspicious: [] }) {
  if (!fs.existsSync(dir)) return results

  const entries = fs.readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      scanDirectory(fullPath, results)
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase()
      if (['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'].includes(ext)) {
        const stats = fs.statSync(fullPath)
        const actualType = detectActualType(fullPath)
        const expectedType = getExpectedType(entry.name)
        const relativePath = path.relative(PUBLIC_DIR, fullPath)

        const fileInfo = {
          path: relativePath,
          size: stats.size,
          expectedType,
          actualType,
          sizeKB: (stats.size / 1024).toFixed(2),
        }

        // Check for mismatched types (fake images)
        if (actualType !== expectedType && actualType !== 'unknown') {
          fileInfo.issue = `Extension says ${expectedType} but content is ${actualType}`
          results.fake.push(fileInfo)
        }
        // Check for suspiciously small images (likely placeholders)
        else if (stats.size < 500 && actualType !== 'svg') {
          fileInfo.issue = 'File size too small, likely a placeholder'
          results.suspicious.push(fileInfo)
        }
        // Real images
        else {
          results.real.push(fileInfo)
        }
      }
    }
  }

  return results
}

function printReport(results) {
  console.log('\n' + '='.repeat(70))
  console.log('🔍 PLACEHOLDER IMAGE DETECTION REPORT')
  console.log('='.repeat(70))

  console.log('\n📊 SUMMARY:')
  console.log(`   ❌ Fake/Placeholder Images: ${results.fake.length}`)
  console.log(`   ⚠️  Suspicious Images: ${results.suspicious.length}`)
  console.log(`   ✅ Real Images: ${results.real.length}`)

  if (results.fake.length > 0) {
    console.log('\n' + '-'.repeat(70))
    console.log('❌ FAKE IMAGES (SVG placeholders disguised as other formats):')
    console.log('-'.repeat(70))
    results.fake.forEach((file) => {
      console.log(`\n   📁 ${file.path}`)
      console.log(`      Size: ${file.sizeKB} KB`)
      console.log(`      Issue: ${file.issue}`)
      console.log(`      Action: Replace with real ${file.expectedType.toUpperCase()} image`)
    })
  }

  if (results.suspicious.length > 0) {
    console.log('\n' + '-'.repeat(70))
    console.log('⚠️  SUSPICIOUS IMAGES (unusually small):')
    console.log('-'.repeat(70))
    results.suspicious.forEach((file) => {
      console.log(`\n   📁 ${file.path}`)
      console.log(`      Size: ${file.sizeKB} KB`)
      console.log(`      Issue: ${file.issue}`)
    })
  }

  if (results.real.length > 0) {
    console.log('\n' + '-'.repeat(70))
    console.log('✅ REAL IMAGES:')
    console.log('-'.repeat(70))
    results.real.forEach((file) => {
      console.log(`   ✓ ${file.path} (${file.sizeKB} KB)`)
    })
  }

  // Generate action items
  if (results.fake.length > 0) {
    console.log('\n' + '='.repeat(70))
    console.log('📋 ACTION ITEMS:')
    console.log('='.repeat(70))

    const byDir = {}
    results.fake.forEach((file) => {
      const dir = path.dirname(file.path)
      if (!byDir[dir]) byDir[dir] = []
      byDir[dir].push(file)
    })

    Object.keys(byDir).forEach((dir) => {
      console.log(`\n📂 ${dir}/`)
      byDir[dir].forEach((file) => {
        const filename = path.basename(file.path)
        console.log(`   → Replace ${filename} with real photo`)
      })
    })
  }

  console.log('\n' + '='.repeat(70))
  console.log('Report generated at:', new Date().toISOString())
  console.log('='.repeat(70) + '\n')
}

// Main execution
console.log('Scanning public directory for placeholder images...')
const results = scanDirectory(PUBLIC_DIR)
printReport(results)

// Exit with error code if fake images found
if (results.fake.length > 0) {
  console.log(`\n⚠️  Found ${results.fake.length} fake placeholder images that need replacement.\n`)
  process.exit(1)
} else {
  console.log('\n✅ No fake placeholder images detected!\n')
  process.exit(0)
}
