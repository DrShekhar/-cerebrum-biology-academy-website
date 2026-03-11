#!/usr/bin/env node
/**
 * Audit sitemap URLs against actual pages in the filesystem.
 * Extracts all URL paths from sitemap.ts and checks if corresponding
 * page.tsx/layout.tsx files exist.
 */

import fs from 'fs'
import path from 'path'

const APP_DIR = path.resolve('src/app')

// Read the sitemap file
const sitemapContent = fs.readFileSync('src/app/sitemap.ts', 'utf8')

// Extract all hardcoded URL paths from template literals
// Pattern: url: `${baseUrl}/some-path`
const urlMatches = [...sitemapContent.matchAll(/url:\s*`\$\{baseUrl\}([^`]*)`/g)]
const hardcodedPaths = urlMatches.map(m => m[1] || '/')

// Also extract dynamic generation patterns
// Look for map functions that generate URLs
const dynamicPatterns = []

// Check: getAllGurugramAreaSlugs, getAllNoidaAreaSlugs, etc.
const areaImports = [
  { fn: 'getAllGurugramAreaSlugs', prefix: '/neet-coaching-gurugram/' },
  { fn: 'getAllNoidaAreaSlugs', prefix: '/neet-coaching-noida/' },
  { fn: 'getAllFaridabadAreaSlugs', prefix: '/neet-coaching-faridabad/' },
  { fn: 'getAllGhaziabadAreaSlugs', prefix: '/neet-coaching-ghaziabad/' },
  { fn: 'getAllSouthDelhiAreaSlugs', prefix: '/neet-coaching-south-delhi/' },
]

// Check if these are still referenced in the sitemap (vs commented out)
for (const { fn, prefix } of areaImports) {
  // Look for actual usage in URL generation (not just imports)
  const usagePattern = new RegExp(`${fn}\\(\\)`)
  if (usagePattern.test(sitemapContent)) {
    dynamicPatterns.push({ fn, prefix, type: 'area-slugs' })
  }
}

function pageExists(urlPath) {
  if (urlPath === '/') return true // Root page

  // Normalize the path
  const cleanPath = urlPath.replace(/^\//, '')

  // Check various possible file locations
  const candidates = [
    path.join(APP_DIR, cleanPath, 'page.tsx'),
    path.join(APP_DIR, cleanPath, 'page.jsx'),
    path.join(APP_DIR, cleanPath, 'page.ts'),
    path.join(APP_DIR, cleanPath, 'page.js'),
    path.join(APP_DIR, cleanPath, 'layout.tsx'),
  ]

  return candidates.some(c => fs.existsSync(c))
}

function isRedirected(urlPath) {
  // Check if this path matches any redirect source in seo-redirects
  try {
    const redirectsContent = fs.readFileSync('src/config/seo-redirects.mjs', 'utf8')
    // Exact match
    if (redirectsContent.includes(`source: '${urlPath}'`)) return true
    // Wildcard match check (simplified)
    const segments = urlPath.split('/').filter(Boolean)
    if (segments.length >= 2) {
      const parentPath = '/' + segments.slice(0, -1).join('/')
      const wildcardPattern = `source: '${parentPath}/:`
      if (redirectsContent.includes(wildcardPattern)) return true
    }
    return false
  } catch {
    return false
  }
}

function isDynamicRoute(urlPath) {
  // Check if this URL would be served by a dynamic [param] route
  const segments = urlPath.replace(/^\//, '').split('/')

  // Try each level for a dynamic route
  for (let i = segments.length - 1; i >= 0; i--) {
    const basePath = segments.slice(0, i).join('/')
    const dirPath = basePath ? path.join(APP_DIR, basePath) : APP_DIR

    if (!fs.existsSync(dirPath)) continue

    try {
      const entries = fs.readdirSync(dirPath)
      const dynamicDirs = entries.filter(e => e.startsWith('[') && e.endsWith(']'))
      for (const dynDir of dynamicDirs) {
        const dynPagePath = path.join(dirPath, dynDir, 'page.tsx')
        if (fs.existsSync(dynPagePath)) {
          return { matched: true, route: path.join(basePath, dynDir) }
        }
      }
    } catch {
      continue
    }
  }
  return { matched: false }
}

// Categorize URLs
const results = {
  exists: [],
  dynamicRoute: [],
  redirected: [],
  missing404: [],
}

console.log(`Checking ${hardcodedPaths.length} hardcoded sitemap URLs...\n`)

for (const urlPath of hardcodedPaths) {
  if (pageExists(urlPath)) {
    results.exists.push(urlPath)
  } else if (isRedirected(urlPath)) {
    results.redirected.push(urlPath)
  } else {
    const dynCheck = isDynamicRoute(urlPath)
    if (dynCheck.matched) {
      results.dynamicRoute.push({ url: urlPath, route: dynCheck.route })
    } else {
      results.missing404.push(urlPath)
    }
  }
}

// Check dynamic area generation patterns
console.log(`\n=== Dynamic URL Generation Still in Sitemap ===`)
for (const pattern of dynamicPatterns) {
  console.log(`WARNING: ${pattern.fn}() still generates URLs with prefix ${pattern.prefix}`)
  console.log(`  These area pages may no longer exist!`)
}

// Summary
console.log(`\n=== SITEMAP AUDIT RESULTS ===`)
console.log(`Total hardcoded URLs: ${hardcodedPaths.length}`)
console.log(`  Exists (page found):     ${results.exists.length}`)
console.log(`  Dynamic route matched:   ${results.dynamicRoute.length}`)
console.log(`  Already redirected:      ${results.redirected.length}`)
console.log(`  MISSING (404):           ${results.missing404.length}`)

if (results.missing404.length > 0) {
  console.log(`\n=== 404 URLs (No Page, No Redirect) ===`)
  for (const url of results.missing404) {
    console.log(`  ${url}`)
  }
}

if (results.redirected.length > 0) {
  console.log(`\n=== URLs with Redirects (should be removed from sitemap) ===`)
  for (const url of results.redirected) {
    console.log(`  ${url}`)
  }
}

// Write results to file for further processing
const report = {
  timestamp: new Date().toISOString(),
  summary: {
    total: hardcodedPaths.length,
    exists: results.exists.length,
    dynamicRoute: results.dynamicRoute.length,
    redirected: results.redirected.length,
    missing404: results.missing404.length,
  },
  missing404: results.missing404,
  redirected: results.redirected,
  dynamicRoutes: results.dynamicRoute,
}

fs.writeFileSync('scripts/sitemap-audit-results.json', JSON.stringify(report, null, 2))
console.log(`\nFull results saved to scripts/sitemap-audit-results.json`)
