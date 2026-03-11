#!/usr/bin/env node
/**
 * Batch-add canonical tags to pages missing them.
 *
 * For 'use client' pages: creates a sibling layout.tsx with canonical metadata.
 * For server pages with `export const metadata`: adds alternates.canonical.
 * For server pages without metadata: adds a metadata export with canonical.
 *
 * Skips internal/private pages (admin, student, consultant, counselor, auth, etc.)
 * Skips pages that already have canonical (via generatePageMetadata, alternates.canonical, etc.)
 *
 * Usage: node scripts/add-canonical-tags.mjs [--dry-run]
 */

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'fs'
import { join, relative, dirname } from 'path'

const APP_DIR = join(process.cwd(), 'src/app')
const DRY_RUN = process.argv.includes('--dry-run')

// Directories to skip (internal/private pages)
const SKIP_DIRS = new Set([
  'admin',
  'student',
  'consultant',
  'counselor',
  'auth',
  'api',
  '(overlay)',
  'demo',
  'test',
  'error',
  'error-boundary-test',
  'claudechat',
  'claudechat-standalone',
  'claudechat-demo',
  'ceri-ai-demo',
  'mcq-benchmark',
  'mcq-difficulty-test',
  'mcq-topic-review',
  'brand-studio',
  'settings',
  'test-platform',
  'tests',
  'dashboard',
  'color-palette',
  'security-demo',
  'testing-demo',
  'toast-demo',
  'counselor-demo',
  'counselor-poc',
  'test-voice',
  'test-learning',
  'simple-test-gen',
  'enrollment-demo',
  'mcq-player',
  'onboarding',
])

// Also skip these specific paths
const SKIP_PATHS = new Set([
  'src/app/layout.tsx',
  'src/app/not-found.tsx',
  'src/app/error.tsx',
])

function getAllPageFiles(dir, files = []) {
  const entries = readdirSync(dir)
  for (const entry of entries) {
    const fullPath = join(dir, entry)
    const stat = statSync(fullPath)
    if (stat.isDirectory()) {
      // Check if this directory should be skipped
      const dirName = entry.replace(/^\(|\)$/g, '') // strip route group parens
      if (SKIP_DIRS.has(entry) || SKIP_DIRS.has(dirName)) continue
      getAllPageFiles(fullPath, files)
    } else if (entry === 'page.tsx') {
      files.push(fullPath)
    }
  }
  return files
}

function hasCanonical(content) {
  // Check various canonical patterns
  if (content.includes('generatePageMetadata')) return true
  if (content.includes('alternates') && content.includes('canonical')) return true
  if (/alternates:\s*\{[^}]*canonical/s.test(content)) return true
  return false
}

function hasLayoutWithCanonical(pageDir) {
  const layoutPath = join(pageDir, 'layout.tsx')
  if (!existsSync(layoutPath)) return false
  const content = readFileSync(layoutPath, 'utf-8')
  return hasCanonical(content)
}

function isClientComponent(content) {
  if (content.trimStart().startsWith("'use client'") || content.trimStart().startsWith('"use client"')) return true
  return /^[\s\S]*?['"]use client['"]/m.test(content) && content.includes("'use client'")
}

function hasMetadataExport(content) {
  return /export\s+const\s+metadata\s*[=:]/.test(content) ||
    /export\s+async\s+function\s+generateMetadata/.test(content) ||
    /export\s+function\s+generateMetadata/.test(content)
}

function getCanonicalPath(filePath) {
  const rel = relative(APP_DIR, dirname(filePath))
  if (!rel || rel === '.') return '/'

  // Handle route groups (e.g., (marketing)) - strip them
  const parts = rel.split('/').filter(p => !p.startsWith('('))

  // Handle dynamic segments - skip them for canonical (they use generateMetadata)
  if (parts.some(p => p.startsWith('['))) return null

  return '/' + parts.join('/')
}

function createLayoutWithCanonical(canonicalPath) {
  return `import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '${canonicalPath}' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
`
}

function addCanonicalToMetadata(content, canonicalPath) {
  // Case 1: Has `export const metadata: Metadata = { ... }`
  // Add alternates.canonical to it
  const metadataMatch = content.match(/(export\s+const\s+metadata\s*:\s*Metadata\s*=\s*\{)/)
  if (metadataMatch) {
    const insertPos = metadataMatch.index + metadataMatch[0].length
    const before = content.slice(0, insertPos)
    const after = content.slice(insertPos)
    return before + `\n  alternates: { canonical: '${canonicalPath}' },` + after
  }

  // Case 2: Has `export const metadata = { ... }` (no type annotation)
  const metadataMatch2 = content.match(/(export\s+const\s+metadata\s*=\s*\{)/)
  if (metadataMatch2) {
    const insertPos = metadataMatch2.index + metadataMatch2[0].length
    const before = content.slice(0, insertPos)
    const after = content.slice(insertPos)
    return before + `\n  alternates: { canonical: '${canonicalPath}' },` + after
  }

  return null
}

function addMetadataExport(content, canonicalPath) {
  // Add metadata export at the top (after imports)
  const importEnd = content.lastIndexOf('import ')
  if (importEnd === -1) {
    // No imports, add at top
    return `import type { Metadata } from 'next'\n\nexport const metadata: Metadata = {\n  alternates: { canonical: '${canonicalPath}' },\n}\n\n` + content
  }

  // Find end of last import statement
  const afterLastImport = content.indexOf('\n', content.indexOf('\n', importEnd) + 1)
  // Find the actual end of the import block (could be multi-line)
  let searchFrom = importEnd
  let lastImportEnd = afterLastImport
  while (true) {
    const nextLine = content.indexOf('\n', lastImportEnd + 1)
    if (nextLine === -1) break
    const line = content.slice(lastImportEnd + 1, nextLine).trim()
    if (line.startsWith('import ') || line.startsWith('} from') || line === '') {
      lastImportEnd = nextLine
    } else {
      break
    }
  }

  const before = content.slice(0, lastImportEnd + 1)
  const after = content.slice(lastImportEnd + 1)

  // Check if Metadata import already exists
  const hasMetadataImport = content.includes("import type { Metadata }") || content.includes("import { Metadata")
  const metadataImport = hasMetadataImport ? '' : "import type { Metadata } from 'next'\n"

  return before + '\n' + metadataImport + `\nexport const metadata: Metadata = {\n  alternates: { canonical: '${canonicalPath}' },\n}\n\n` + after
}

// Main
const pageFiles = getAllPageFiles(APP_DIR)
console.log(`Found ${pageFiles.length} page.tsx files`)

let created = 0
let modified = 0
let skipped = 0
let skippedDynamic = 0

const results = { layoutsCreated: [], pagesModified: [], skipped: [] }

for (const filePath of pageFiles) {
  const relPath = relative(process.cwd(), filePath)

  // Skip specific paths
  if (SKIP_PATHS.has(relPath)) {
    skipped++
    continue
  }

  const content = readFileSync(filePath, 'utf-8')
  const pageDir = dirname(filePath)

  // Already has canonical?
  if (hasCanonical(content)) {
    skipped++
    continue
  }

  // Layout already provides canonical?
  if (hasLayoutWithCanonical(pageDir)) {
    skipped++
    continue
  }

  const canonicalPath = getCanonicalPath(filePath)
  if (!canonicalPath) {
    // Dynamic route - skip (should use generateMetadata with params)
    skippedDynamic++
    continue
  }

  if (isClientComponent(content)) {
    // Create sibling layout.tsx
    const layoutPath = join(pageDir, 'layout.tsx')
    if (existsSync(layoutPath)) {
      // Layout exists but no canonical - add canonical to it
      const layoutContent = readFileSync(layoutPath, 'utf-8')
      if (hasMetadataExport(layoutContent)) {
        const updated = addCanonicalToMetadata(layoutContent, canonicalPath)
        if (updated) {
          if (!DRY_RUN) writeFileSync(layoutPath, updated)
          modified++
          results.pagesModified.push(relative(process.cwd(), layoutPath))
        }
      } else {
        const updated = addMetadataExport(layoutContent, canonicalPath)
        if (updated) {
          if (!DRY_RUN) writeFileSync(layoutPath, updated)
          modified++
          results.pagesModified.push(relative(process.cwd(), layoutPath))
        }
      }
    } else {
      // Create new layout.tsx
      const layoutContent = createLayoutWithCanonical(canonicalPath)
      if (!DRY_RUN) writeFileSync(layoutPath, layoutContent)
      created++
      results.layoutsCreated.push(relative(process.cwd(), layoutPath))
    }
  } else {
    // Server component
    if (hasMetadataExport(content)) {
      const updated = addCanonicalToMetadata(content, canonicalPath)
      if (updated) {
        if (!DRY_RUN) writeFileSync(filePath, updated)
        modified++
        results.pagesModified.push(relPath)
      }
    } else {
      const updated = addMetadataExport(content, canonicalPath)
      if (updated) {
        if (!DRY_RUN) writeFileSync(filePath, updated)
        modified++
        results.pagesModified.push(relPath)
      }
    }
  }
}

console.log(`\n=== Results${DRY_RUN ? ' (DRY RUN)' : ''} ===`)
console.log(`Layouts created: ${created}`)
console.log(`Pages/layouts modified: ${modified}`)
console.log(`Skipped (already have canonical): ${skipped}`)
console.log(`Skipped (dynamic routes): ${skippedDynamic}`)

if (results.layoutsCreated.length > 0) {
  console.log(`\nNew layout.tsx files:`)
  results.layoutsCreated.forEach(f => console.log(`  + ${f}`))
}
if (results.pagesModified.length > 0) {
  console.log(`\nModified files:`)
  results.pagesModified.forEach(f => console.log(`  ~ ${f}`))
}
