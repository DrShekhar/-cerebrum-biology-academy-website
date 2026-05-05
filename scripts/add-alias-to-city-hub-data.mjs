#!/usr/bin/env node
/* For each gurgaon/gurugram entry in src/data/city-seo/city-hub-data.ts,
 * append the alias spelling to metaDescription if missing.
 *
 * Idempotent — skips entries whose metaDescription already references both spellings.
 */
import fs from 'node:fs'
import path from 'node:path'

const DATA_FILE = path.resolve('src/data/city-seo/city-hub-data.ts')
const text = fs.readFileSync(DATA_FILE, 'utf8')

// Match each top-level entry whose key contains gurgaon or gurugram.
// Capture the key, then within that block find metaDescription:\n      'X'.
const entryRe = /'([^']*(?:gurgaon|gurugram)[^']*)':\s*\{([\s\S]*?)\n  \},/g

let updated = 0
let skipped = 0
let noDesc = 0
const changes = []

const newText = text.replace(entryRe, (block, slug, body) => {
  const isGurgaon = slug.includes('gurgaon') && !slug.includes('gurugram')
  const primary = isGurgaon ? 'Gurgaon' : 'Gurugram'
  const alias = isGurgaon ? 'Gurugram' : 'Gurgaon'

  // Find metaDescription: 'X' (possibly across two lines)
  const descRe = /(metaDescription:\s*\n?\s*)('([^']*)'|"([^"]*)")/
  const m = body.match(descRe)
  if (!m) {
    noDesc++
    return block
  }
  const [matched, prefix, quoted, single, dbl] = m
  const inner = single ?? dbl
  const innerLower = inner.toLowerCase()

  if (innerLower.includes('gurgaon') && innerLower.includes('gurugram')) {
    skipped++
    return block
  }
  if (!innerLower.includes(primary.toLowerCase())) {
    skipped++
    return block
  }

  const primaryRe = new RegExp(primary, 'i')
  const newInner = inner.replace(primaryRe, (mw) => `${mw} (${alias})`)
  if (newInner === inner) {
    skipped++
    return block
  }
  const newQuoted = single ? `'${newInner}'` : `"${newInner}"`
  const newBody = body.replace(matched, prefix + newQuoted)
  updated++
  changes.push({ slug, len: newInner.length })
  return block.replace(body, newBody)
})

if (newText !== text) {
  fs.writeFileSync(DATA_FILE, newText)
}

console.log(`Updated: ${updated}, Skipped: ${skipped}, No description: ${noDesc}`)
for (const c of changes) console.log(`  ${c.slug} (len ${c.len})`)
