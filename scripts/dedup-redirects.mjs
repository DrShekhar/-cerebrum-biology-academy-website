import { readFileSync, writeFileSync } from 'fs'
import {
  seoPageConsolidationRedirects,
  neetCoachingLocationRedirects,
  localAreaPageRedirects,
  gsc404CleanupRedirects,
  thinPageConsolidationRedirects,
  gsc404CleanupBatch3Redirects,
} from '../src/config/seo-redirects.mjs'

// Step 1: Collect all sources from earlier arrays (these take priority)
const earlierSources = new Set()
const allRedirects = [
  ...seoPageConsolidationRedirects,
  ...neetCoachingLocationRedirects,
  ...localAreaPageRedirects,
  ...gsc404CleanupRedirects,
  ...thinPageConsolidationRedirects,
]
for (const r of allRedirects) {
  earlierSources.add(r.source)
}

// Step 2: Filter batch3 to remove duplicates
const originalCount = gsc404CleanupBatch3Redirects.length
const deduped = gsc404CleanupBatch3Redirects.filter((r) => !earlierSources.has(r.source))
const removedCount = originalCount - deduped.length

console.log(`batch3: ${originalCount} entries`)
console.log(`Duplicates removed: ${removedCount}`)
console.log(`Remaining: ${deduped.length}`)

// Step 3: Also deduplicate within earlier arrays
// Find redundant dupes within gsc404 + thinPage + seoPage + localArea + neetLocation
const seenInEarlier = new Map()
const dupsInEarlier = []
for (const [name, arr] of [
  ['seoPage', seoPageConsolidationRedirects],
  ['neetLocation', neetCoachingLocationRedirects],
  ['localArea', localAreaPageRedirects],
  ['gsc404', gsc404CleanupRedirects],
  ['thinPage', thinPageConsolidationRedirects],
]) {
  for (const r of arr) {
    if (seenInEarlier.has(r.source)) {
      const prev = seenInEarlier.get(r.source)
      dupsInEarlier.push({
        source: r.source,
        firstDest: prev.dest,
        firstArray: prev.array,
        secondDest: r.destination,
        secondArray: name,
      })
    } else {
      seenInEarlier.set(r.source, { dest: r.destination, array: name })
    }
  }
}

console.log(`\nDuplicates within earlier arrays: ${dupsInEarlier.length}`)
for (const d of dupsInEarlier) {
  const conflict = d.firstDest !== d.secondDest ? ' CONFLICT' : ''
  console.log(
    `  ${d.source}: ${d.firstDest} (${d.firstArray}) vs ${d.secondDest} (${d.secondArray})${conflict}`
  )
}

// Step 4: Generate the cleaned batch3 array code
const lines = deduped
  .map(
    (r) =>
      `  { source: '${r.source}', destination: '${r.destination}', permanent: true },`
  )
  .join('\n')

console.log(`\n=== Cleaned batch3 array (${deduped.length} entries) ===`)
console.log(lines)
