import {
  seoPageConsolidationRedirects,
  neetCoachingLocationRedirects,
  localAreaPageRedirects,
  gsc404CleanupRedirects,
  thinPageConsolidationRedirects,
  gsc404CleanupBatch3Redirects,
} from '../src/config/seo-redirects.mjs'

const arrays = {
  seoPage: seoPageConsolidationRedirects,
  neetLocation: neetCoachingLocationRedirects,
  localArea: localAreaPageRedirects,
  gsc404: gsc404CleanupRedirects,
  thinPage: thinPageConsolidationRedirects,
  batch3: gsc404CleanupBatch3Redirects,
}

// Collect all sources with their destinations and origin array
const sourceMap = new Map()
for (const [arrayName, arr] of Object.entries(arrays)) {
  for (const r of arr) {
    const src = r.source
    if (!sourceMap.has(src)) sourceMap.set(src, [])
    sourceMap.get(src).push({ dest: r.destination, array: arrayName })
  }
}

// Find duplicates with conflicting destinations
const conflicting = []
const redundant = []
for (const [src, entries] of sourceMap) {
  if (entries.length > 1) {
    const dests = [...new Set(entries.map((e) => e.dest))]
    if (dests.length > 1) {
      conflicting.push({ source: src, entries })
    } else {
      redundant.push({ source: src, count: entries.length, dest: dests[0], arrays: entries.map((e) => e.array) })
    }
  }
}

console.log(`Total redirects in exported arrays: ${Object.values(arrays).reduce((s, a) => s + a.length, 0)}`)
console.log(`Unique sources: ${sourceMap.size}`)
console.log(`Conflicting duplicates (different destinations): ${conflicting.length}`)
console.log(`Redundant duplicates (same destination): ${redundant.length}`)
console.log()

console.log('=== CONFLICTING DUPLICATES ===')
for (const d of conflicting) {
  console.log(`${d.source}:`)
  for (const e of d.entries) {
    console.log(`  -> ${e.dest} (${e.array})`)
  }
}

console.log()
console.log('=== REDUNDANT DUPLICATES (to remove) ===')
for (const d of redundant) {
  console.log(`${d.source} -> ${d.dest} [appears ${d.count}x in: ${d.arrays.join(', ')}]`)
}

// Find redirect chains: A -> B where B is also a source
console.log()
console.log('=== REDIRECT CHAINS ===')
const allSources = new Set(sourceMap.keys())
for (const [src, entries] of sourceMap) {
  const dest = entries[0].dest // first entry wins
  if (allSources.has(dest)) {
    const nextEntries = sourceMap.get(dest)
    const finalDest = nextEntries[0].dest
    console.log(`${src} -> ${dest} -> ${finalDest} (chain! should go directly to ${finalDest})`)
  }
}
