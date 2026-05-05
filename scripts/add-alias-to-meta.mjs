#!/usr/bin/env node
/* Append the alias-city spelling to metadata.description on every
 * gurgaon/gurugram page. We expand the FIRST occurrence of the primary
 * spelling — "Gurgaon" → "Gurgaon (Gurugram)" (or the reverse).
 *
 * Idempotent — skip files that already include both spellings in the
 * metadata.description block.
 */
import fs from 'node:fs'
import path from 'node:path'

const APP_DIR = path.resolve('src/app')

function processFile(slug) {
  const filePath = path.join(APP_DIR, slug, 'page.tsx')
  if (!fs.existsSync(filePath)) return { slug, status: 'missing' }
  const isGurgaon = slug.includes('gurgaon')
  const isGurugram = slug.includes('gurugram')
  if (!isGurgaon && !isGurugram) return { slug, status: 'skipped-no-spelling' }

  // Some slugs include both spellings (e.g., test fixtures). Default to gurgaon.
  const primary = isGurgaon && !isGurugram ? 'Gurgaon' : 'Gurugram'
  const alias = primary === 'Gurgaon' ? 'Gurugram' : 'Gurgaon'

  const original = fs.readFileSync(filePath, 'utf8')

  // Locate the metadata.description literal. Capture group 1 is the prefix
  // (`description:` plus whitespace/newline) so we can preserve it in the
  // replacement. Group 2 is the opening quote, group 3 is the body.
  const descRe = /(description:\s*\n?\s*)(['"`])([\s\S]*?)\2/
  const m = original.match(descRe)
  if (!m) return { slug, status: 'no-description-literal' }
  const [matched, prefix, quote, body] = m

  // Already has both spellings in description? Skip.
  const bodyLower = body.toLowerCase()
  if (bodyLower.includes('gurgaon') && bodyLower.includes('gurugram')) {
    return { slug, status: 'already-dual' }
  }
  // Description doesn't mention the primary spelling at all — leave it alone
  // (probably a generic description; safer than mangling).
  if (!bodyLower.includes(primary.toLowerCase())) {
    return { slug, status: 'primary-not-in-desc' }
  }

  // Insert the alias right after the first case-insensitive primary match.
  const primaryRe = new RegExp(primary, 'i')
  const newBody = body.replace(primaryRe, (matchedWord) => `${matchedWord} (${alias})`)
  if (newBody === body) return { slug, status: 'no-change' }

  // Length guard — Google truncates around 160 chars; flag if we push past 175.
  const overLong = newBody.length > 175
  const replaced = original.replace(matched, `${prefix}${quote}${newBody}${quote}`)
  fs.writeFileSync(filePath, replaced)
  return { slug, status: overLong ? 'updated-long' : 'updated', length: newBody.length }
}

function main() {
  const slugs = fs.readdirSync(APP_DIR).filter((e) => /gurgaon|gurugram/i.test(e))
  const results = slugs.map(processFile)
  const counts = results.reduce((acc, r) => {
    acc[r.status] = (acc[r.status] || 0) + 1
    return acc
  }, {})
  console.log(`Total: ${slugs.length}`)
  console.log(JSON.stringify(counts, null, 2))
  for (const r of results) {
    if (r.status !== 'updated' && r.status !== 'skipped-no-spelling') {
      console.log(`  ${r.status}: ${r.slug}${r.length ? ` (len ${r.length})` : ''}`)
    }
  }
}

main()
