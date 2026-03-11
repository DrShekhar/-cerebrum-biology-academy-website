import {
  seoPageConsolidationRedirects,
  localAreaPageRedirects,
  gsc404CleanupRedirects,
  thinPageConsolidationRedirects,
  gsc404CleanupBatch3Redirects,
  hubPageConsolidationRedirects,
  cannibalizationConsolidationRedirects,
  areaConsolidationRedirects,
} from '../src/config/seo-redirects.mjs'
import fs from 'fs'

const configContent = fs.readFileSync('next.config.mjs', 'utf-8')
const redirectSection = configContent.substring(
  configContent.indexOf('async redirects()'),
  configContent.indexOf('...cannibalizationConsolidationRedirects')
)
const uncommented = redirectSection.split('\n').filter(l => !l.trim().startsWith('//')).join('\n')
const inlineMatches = [...uncommented.matchAll(/source:\s*['"]([^'"]+)['"].*?destination:\s*['"]([^'"]+)['"].*?permanent:\s*(true|false)/gs)]

const all = [
  ...inlineMatches.map(m => ({s: m[1], d: m[2]})),
  ...[...seoPageConsolidationRedirects, ...localAreaPageRedirects, ...gsc404CleanupRedirects,
      ...thinPageConsolidationRedirects, ...gsc404CleanupBatch3Redirects,
      ...hubPageConsolidationRedirects, ...(cannibalizationConsolidationRedirects||[]),
      ...(areaConsolidationRedirects||[])].map(r => ({s: r.source, d: r.destination}))
]

// Check 1: wildcards where dest could match the source pattern
console.log('=== WILDCARD SELF-MATCH RISK ===')
let found1 = 0
for (const r of all) {
  if (r.s.includes(':') || r.s.includes('*')) {
    const prefix = r.s.split(/[:\*]/)[0]
    if (r.d.startsWith(prefix) && r.d !== prefix.replace(/\/$/, '')) {
      console.log('  RISK:', r.s, '->', r.d)
      found1++
    }
  }
}
if (found1 === 0) console.log('  None found')

// Check 2: source = destination (self-redirect)
console.log('\n=== SELF-REDIRECTS ===')
let found2 = 0
for (const r of all) {
  if (r.s === r.d) {
    console.log('  SELF:', r.s, '->', r.d)
    found2++
  }
}
if (found2 === 0) console.log('  None found')

// Check 3: destinations with trailing slashes or other oddities
console.log('\n=== MALFORMED DESTINATIONS ===')
let found3 = 0
for (const r of all) {
  if (r.d.endsWith('/') && r.d !== '/') { console.log('  TRAILING SLASH:', r.s, '->', r.d); found3++ }
  if (r.d.includes('//')) { console.log('  DOUBLE SLASH:', r.s, '->', r.d); found3++ }
  if (!r.d.startsWith('/') && !r.d.startsWith('http')) { console.log('  NO LEADING SLASH:', r.s, '->', r.d); found3++ }
}
if (found3 === 0) console.log('  None found')

// Check 4: wildcard sources that overlap — e.g., /foo/:path* and /foo/bar both exist
console.log('\n=== OVERLAPPING WILDCARDS ===')
const wildcards = all.filter(r => r.s.includes(':') || r.s.includes('*'))
const exacts = new Set(all.filter(r => !r.s.includes(':') && !r.s.includes('*')).map(r => r.s))
let found4 = 0
for (const w of wildcards) {
  const prefix = w.s.split(/[:\*]/)[0].replace(/\/$/, '')
  for (const e of exacts) {
    if (e.startsWith(prefix + '/') && e !== prefix) {
      // This exact source would also be matched by the wildcard
      const exactDest = all.find(r => r.s === e)?.d
      if (exactDest !== w.d) {
        console.log('  OVERLAP:', w.s, '->', w.d, 'vs', e, '->', exactDest)
        found4++
      }
    }
  }
}
if (found4 === 0) console.log('  None found')

// Check 5: wildcard redirects where the source pattern could match the destination
// e.g., /biology-classes-south-delhi/:area* -> /biology-classes-south-delhi
// This could loop if someone visits /biology-classes-south-delhi/foo -> /biology-classes-south-delhi
// then /biology-classes-south-delhi is exact match, not wildcard, so no loop. BUT:
// What about /biology-classes-south-delhi/:area* where area is empty? That matches /biology-classes-south-delhi/
console.log('\n=== WILDCARD-TO-SELF PATTERNS (potential loop with trailing slash) ===')
let found5 = 0
for (const r of all) {
  if ((r.s.includes(':area*') || r.s.includes(':path*') || r.s.includes(':path+')) ) {
    const prefix = r.s.split(/[:\*]/)[0].replace(/\/$/, '')
    if (r.d === prefix || r.d === prefix + '/') {
      console.log('  POTENTIAL LOOP:', r.s, '->', r.d)
      found5++
    }
  }
}
if (found5 === 0) console.log('  None found')

console.log('\n=== SUMMARY ===')
console.log('Wildcard self-match risks:', found1)
console.log('Self-redirects:', found2)
console.log('Malformed destinations:', found3)
console.log('Overlapping wildcards:', found4)
console.log('Wildcard-to-self loops:', found5)
