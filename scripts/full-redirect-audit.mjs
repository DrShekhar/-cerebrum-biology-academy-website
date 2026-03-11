#!/usr/bin/env node

/**
 * Full Redirect Audit Script
 * Checks ALL redirect sources for chains, loops, non-301s, sitemap conflicts, and internal links
 */

import {
  seoPageConsolidationRedirects,
  neetCoachingLocationRedirects,
  localAreaPageRedirects,
  gsc404CleanupRedirects,
  thinPageConsolidationRedirects,
  gsc404CleanupBatch3Redirects,
  hubPageConsolidationRedirects,
  cannibalizationConsolidationRedirects,
  areaConsolidationRedirects,
} from '../src/config/seo-redirects.mjs'

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

// ===== 1. Extract ALL inline redirects from next.config.mjs =====
const configContent = fs.readFileSync(path.join(ROOT, 'next.config.mjs'), 'utf-8')
const redirectSection = configContent.substring(
  configContent.indexOf('async redirects()'),
  configContent.indexOf('...cannibalizationConsolidationRedirects')
)
// Filter out commented lines before matching
const uncommentedLines = redirectSection.split('\n').filter(l => !l.trim().startsWith('//')).join('\n')
const inlineMatches = [...uncommentedLines.matchAll(
  /source:\s*['"]([^'"]+)['"].*?destination:\s*['"]([^'"]+)['"].*?permanent:\s*(true|false)/gs
)]
const inlineRedirects = inlineMatches.map(m => ({
  source: m[1],
  destination: m[2],
  permanent: m[3] === 'true',
  origin: 'next.config.mjs'
}))

// Combine all seo-redirects.mjs arrays
const allExternalRedirects = [
  ...seoPageConsolidationRedirects,
  ...(neetCoachingLocationRedirects || []),
  ...localAreaPageRedirects,
  ...gsc404CleanupRedirects,
  ...thinPageConsolidationRedirects,
  ...gsc404CleanupBatch3Redirects,
  ...hubPageConsolidationRedirects,
  ...(cannibalizationConsolidationRedirects || []),
  ...(areaConsolidationRedirects || []),
].map(r => ({ ...r, origin: 'seo-redirects.mjs' }))

const allRedirects = [...inlineRedirects, ...allExternalRedirects]

console.log('='.repeat(70))
console.log('FULL REDIRECT AUDIT REPORT')
console.log('='.repeat(70))
console.log(`\nTotal redirects: ${allRedirects.length}`)
console.log(`  - Inline (next.config.mjs): ${inlineRedirects.length}`)
console.log(`  - seo-redirects.mjs arrays: ${allExternalRedirects.length}`)

// ===== 2. Build redirect map (source → destination) =====
const redirectMap = new Map()
const wildcardRedirects = []
const nonPermanentRedirects = []
const duplicates = []

for (const r of allRedirects) {
  const isWild = r.source.includes(':path') || r.source.includes(':area') ||
                 r.source.includes(':slug') || r.source.includes(':city') ||
                 r.source.includes(':topic')
  if (isWild) {
    wildcardRedirects.push(r)
  } else {
    if (redirectMap.has(r.source)) {
      const existing = redirectMap.get(r.source)
      if (existing.destination !== r.destination) {
        duplicates.push({ source: r.source, dest1: existing.destination, dest2: r.destination, origin1: existing.origin, origin2: r.origin })
      }
    }
    redirectMap.set(r.source, { destination: r.destination, origin: r.origin })
  }
  if (!r.permanent) {
    nonPermanentRedirects.push(r)
  }
}

console.log(`  - Exact-match redirects: ${redirectMap.size}`)
console.log(`  - Wildcard redirects: ${wildcardRedirects.length}`)

// ===== 3. Check for conflicting duplicates =====
if (duplicates.length > 0) {
  console.log('\n' + '='.repeat(70))
  console.log('CONFLICTING DUPLICATES')
  console.log('='.repeat(70))
  console.log(`\n  ✗ Found ${duplicates.length} conflicting duplicates:\n`)
  for (const d of duplicates) {
    console.log(`  ${d.source}:`)
    console.log(`    → ${d.dest1} (from ${d.origin1})`)
    console.log(`    → ${d.dest2} (from ${d.origin2})`)
  }
}

// ===== 4. Check for redirect chains =====
console.log('\n' + '='.repeat(70))
console.log('REDIRECT CHAINS (A → B → C)')
console.log('='.repeat(70))

const chains = []
for (const [source, info] of redirectMap) {
  const dest = info.destination
  if (redirectMap.has(dest)) {
    const chain = [source, dest]
    let current = dest
    const visited = new Set([source, dest])
    while (redirectMap.has(current)) {
      const next = redirectMap.get(current).destination
      if (visited.has(next)) {
        chain.push(next + ' (LOOP!)')
        break
      }
      chain.push(next)
      visited.add(next)
      current = next
    }
    chains.push({
      source,
      currentDestination: dest,
      finalDestination: chain[chain.length - 1],
      chainLength: chain.length - 1,
      chain: chain.join(' → '),
      origin: info.origin,
    })
  }
}

// Check wildcard redirects whose destinations are also redirect sources
const wildcardChains = []
for (const r of wildcardRedirects) {
  const dest = r.destination
  if (redirectMap.has(dest)) {
    const chain = [r.source, dest]
    let current = dest
    const visited = new Set([dest])
    while (redirectMap.has(current)) {
      const next = redirectMap.get(current).destination
      if (visited.has(next)) {
        chain.push(next + ' (LOOP!)')
        break
      }
      chain.push(next)
      visited.add(next)
      current = next
    }
    wildcardChains.push({
      source: r.source,
      currentDestination: dest,
      finalDestination: chain[chain.length - 1],
      chain: chain.join(' → '),
      origin: r.origin,
    })
  }
}

const allChains = [...chains, ...wildcardChains]
if (allChains.length === 0) {
  console.log('\n  ✓ No redirect chains found!')
} else {
  console.log(`\n  ✗ Found ${allChains.length} redirect chains:\n`)
  for (const c of allChains) {
    console.log(`  [${c.origin}] ${c.chain}`)
  }
}

// ===== 5. Check for redirect loops =====
console.log('\n' + '='.repeat(70))
console.log('REDIRECT LOOPS (A → B → A)')
console.log('='.repeat(70))

const loops = []
for (const [source, info] of redirectMap) {
  const visited = new Set([source])
  let current = info.destination
  while (redirectMap.has(current)) {
    if (visited.has(current)) {
      loops.push({ source, loopAt: current })
      break
    }
    visited.add(current)
    current = redirectMap.get(current).destination
  }
}

if (loops.length === 0) {
  console.log('\n  ✓ No redirect loops found!')
} else {
  console.log(`\n  ✗ Found ${loops.length} redirect loops:\n`)
  for (const l of loops) {
    console.log(`  ${l.source} loops at ${l.loopAt}`)
  }
}

// ===== 6. Check for non-301 redirects =====
console.log('\n' + '='.repeat(70))
console.log('NON-301 (NON-PERMANENT) REDIRECTS')
console.log('='.repeat(70))

if (nonPermanentRedirects.length === 0) {
  console.log('\n  ✓ All config redirects are 301 (permanent)!')
} else {
  console.log(`\n  ✗ Found ${nonPermanentRedirects.length} non-permanent redirects:\n`)
  for (const r of nonPermanentRedirects) {
    console.log(`  ${r.source} → ${r.destination} (permanent: ${r.permanent}) [${r.origin}]`)
  }
}

console.log('\n  Note: middleware.ts has 302 for blocked demo/test pages → / (intentional, production-only)')

// ===== 7. Check sitemap for redirect source URLs =====
console.log('\n' + '='.repeat(70))
console.log('SITEMAP — checking for redirect sources in generated URLs')
console.log('='.repeat(70))

const sitemapPath = path.join(ROOT, 'src/app/sitemap.ts')
let sitemapContent = ''
try {
  sitemapContent = fs.readFileSync(sitemapPath, 'utf-8')
} catch {
  console.log('\n  Could not read sitemap.ts')
}

const sitemapConflicts = []
if (sitemapContent) {
  for (const [source] of redirectMap) {
    const cleanSource = source.replace(/^\//, '')
    // Check for the path in sitemap URL generation
    if (
      sitemapContent.includes(`'/${cleanSource}'`) ||
      sitemapContent.includes(`"/${cleanSource}"`) ||
      sitemapContent.includes(`\`/${cleanSource}\``)
    ) {
      sitemapConflicts.push({ source, destination: redirectMap.get(source).destination })
    }
  }
}

if (sitemapConflicts.length === 0) {
  console.log('\n  ✓ No redirect source URLs found hardcoded in sitemap.ts!')
} else {
  console.log(`\n  ✗ Found ${sitemapConflicts.length} redirect sources in sitemap:\n`)
  for (const s of sitemapConflicts) {
    console.log(`  ${s.source} → ${s.destination}`)
  }
}

// ===== 8. Check internal links pointing to redirect sources =====
console.log('\n' + '='.repeat(70))
console.log('INTERNAL LINKS POINTING TO REDIRECT SOURCES')
console.log('='.repeat(70))

const redirectSources = new Set(redirectMap.keys())

const srcDir = path.join(ROOT, 'src')
const filesToScan = []

function walkDir(dir) {
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        if (!entry.name.startsWith('.') && entry.name !== 'node_modules' && entry.name !== '__tests__' && entry.name !== '.next') {
          walkDir(fullPath)
        }
      } else if (/\.(tsx?|jsx?|mjs)$/.test(entry.name)) {
        filesToScan.push(fullPath)
      }
    }
  } catch { /* skip */ }
}

walkDir(srcDir)

const internalLinkIssues = []
const hrefRegex = /href=["'`{](?:["'`])?([^"'`}\s]+)["'`}]?/g

for (const file of filesToScan) {
  // Skip redirect config files, audit scripts, and data files that define redirects
  const relPath = path.relative(ROOT, file)
  if (
    relPath.includes('seo-redirects') ||
    relPath.includes('audit-redirects') ||
    relPath.includes('full-redirect-audit') ||
    relPath.includes('localAreas.ts') ||
    relPath.includes('__tests__') ||
    relPath.includes('.test.')
  ) continue

  try {
    const content = fs.readFileSync(file, 'utf-8')
    const lines = content.split('\n')

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      let match
      // Reset regex for each line
      const lineHrefRegex = /href=["'{]?"?'?([\/][a-zA-Z0-9\-\/]+)/g
      while ((match = lineHrefRegex.exec(line)) !== null) {
        const href = match[1]
        // Normalize: remove trailing slash
        const cleanHref = href.replace(/\/$/, '') || '/'
        if (redirectSources.has(cleanHref)) {
          internalLinkIssues.push({
            file: relPath,
            line: i + 1,
            href: cleanHref,
            shouldBe: redirectMap.get(cleanHref).destination,
          })
        }
      }
    }
  } catch { /* skip */ }
}

if (internalLinkIssues.length === 0) {
  console.log('\n  ✓ No internal links pointing to redirect sources!')
} else {
  console.log(`\n  ✗ Found ${internalLinkIssues.length} internal links pointing to redirect sources:\n`)
  const byFile = {}
  for (const issue of internalLinkIssues) {
    if (!byFile[issue.file]) byFile[issue.file] = []
    byFile[issue.file].push(issue)
  }
  for (const [file, issues] of Object.entries(byFile)) {
    console.log(`  ${file}:`)
    for (const issue of issues) {
      console.log(`    Line ${issue.line}: href="${issue.href}" → should be "${issue.shouldBe}"`)
    }
  }
}

// ===== 9. Summary =====
console.log('\n' + '='.repeat(70))
console.log('SUMMARY')
console.log('='.repeat(70))
console.log(`\n  Total redirects found: ${allRedirects.length}`)
console.log(`    - next.config.mjs inline: ${inlineRedirects.length}`)
console.log(`    - seo-redirects.mjs arrays: ${allExternalRedirects.length}`)
console.log(`  Conflicting duplicates: ${duplicates.length}`)
console.log(`  Redirect chains: ${allChains.length}`)
console.log(`  Redirect loops: ${loops.length}`)
console.log(`  Non-301 redirects: ${nonPermanentRedirects.length}`)
console.log(`  Sitemap conflicts: ${sitemapConflicts.length}`)
console.log(`  Internal link issues: ${internalLinkIssues.length}`)

const totalIssues = duplicates.length + allChains.length + loops.length + nonPermanentRedirects.length + sitemapConflicts.length + internalLinkIssues.length
if (totalIssues > 0) {
  console.log(`\n  ⚠ TOTAL ISSUES TO FIX: ${totalIssues}`)
  process.exit(1)
} else {
  console.log('\n  ✓ ALL CHECKS PASSED — zero issues found!')
  process.exit(0)
}
