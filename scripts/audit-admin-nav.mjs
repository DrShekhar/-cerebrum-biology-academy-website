#!/usr/bin/env node
/**
 * Verifies the admin sidebar config (src/config/adminNav.ts) against the
 * filesystem route tree:
 *   1. every nav href has a real page.tsx
 *   2. every /admin page.tsx is reachable from the nav (or allowlisted)
 * Run: node scripts/audit-admin-nav.mjs
 */
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const NAV_FILE = 'src/config/adminNav.ts'
const APP_DIR = 'src/app/admin'

// Pages intentionally not in the sidebar.
const ALLOWLIST = new Set([
  '/admin/login', // auth exempt
  '/admin/enrollments', // redirect stub → /admin/courses/enrollments
  '/admin/students/[id]', // detail page (reached from lists)
  '/admin/students/leads/[id]', // detail page
  '/admin/omr/papers/new', // reached from OMR hub
  '/admin/omr/papers/[id]', // detail page
  '/admin/omr/papers/[id]/answer-keys', // detail page
])

const navSource = readFileSync(NAV_FILE, 'utf8')
const hrefs = [...navSource.matchAll(/href:\s*'([^']+)'/g)].map((m) => m[1])

let failures = 0

// 1. Every href resolves to a page.tsx
for (const href of new Set(hrefs)) {
  const pagePath = join('src/app', href.replace(/^\//, ''), 'page.tsx')
  if (!existsSync(pagePath)) {
    console.error(`✗ nav href has no page: ${href} (expected ${pagePath})`)
    failures++
  }
}

// 2. Every admin page is reachable
function walkPages(dir, routes = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) {
      walkPages(full, routes)
    } else if (entry === 'page.tsx') {
      routes.push('/' + dir.replace(/^src\/app\//, ''))
    }
  }
  return routes
}

const pages = walkPages(APP_DIR)
const hrefSet = new Set(hrefs)
for (const route of pages) {
  if (!hrefSet.has(route) && !ALLOWLIST.has(route)) {
    console.error(`✗ page not reachable from nav: ${route}`)
    failures++
  }
}

if (failures) {
  console.error(`\n${failures} problem(s).`)
  process.exit(1)
}
console.log(`✓ nav ↔ routes consistent (${hrefs.length} hrefs, ${pages.length} pages)`)
