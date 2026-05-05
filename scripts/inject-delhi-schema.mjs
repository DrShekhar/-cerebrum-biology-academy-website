#!/usr/bin/env node
/* Inject <DelhiAreaSchema /> into Delhi/NCR landing pages.
 *
 * Targets:
 *   - The 31 zero-schema Delhi pages (gives them Service+Place+ContactPoint).
 *   - The 12 pages with inline LocalBusiness JSON-LD but no contactPoint
 *     (the new component supplies the missing click-to-call signal via
 *     its Service.contactPoint, so we don't need to surgery the inline block).
 *
 * Idempotent — skips pages already wired up.
 */
import fs from 'node:fs'
import path from 'node:path'

const APP_DIR = path.resolve('src/app')
const IMPORT_LINE = "import { DelhiAreaSchema } from '@/components/seo/DelhiAreaSchema'"

// Pages to process. Same enumeration logic as the audit:
//   any slug containing delhi, dwarka, rohini, saket, defence-colony,
//   cr-park, civil-lines, connaught-place, chandni-chowk, green-park,
//   panchsheel-park, safdarjung-enclave, modern-school-delhi, vasant-kunj,
//   vasant-vihar, east-of-kailash, yamuna-vihar, dilshad-garden, shahdara.
const SLUG_RE =
  /(delhi|dwarka|rohini|saket|defence-colony|cr-park|civil-lines|connaught-place|chandni-chowk|green-park|panchsheel-park|safdarjung-enclave|modern-school|vasant-kunj|vasant-vihar|east-of-kailash|yamuna-vihar|dilshad-garden|shahdara)/i

// Sub-area labels for high-value pages. `null` / undefined = use the
// region label only (e.g., "South Delhi") instead of a sub-area string.
const SUB_AREA = {
  // South Delhi sub-localities
  'biology-coaching-defence-colony': 'Defence Colony',
  'biology-tutor-defence-colony': 'Defence Colony',
  'neet-coaching-defence-colony-delhi': 'Defence Colony',
  'best-biology-tuition-cr-park': 'CR Park',
  'biology-classes-cr-park': 'CR Park',
  'neet-coaching-cr-park-delhi': 'CR Park',
  'best-biology-tuition-vasant-vihar': 'Vasant Vihar',
  'biology-classes-vasant-vihar': 'Vasant Vihar',
  'biology-coaching-vasant-vihar-delhi': 'Vasant Vihar',
  'biology-classes-vasant-kunj': 'Vasant Kunj',
  'biology-coaching-vasant-kunj': 'Vasant Kunj',
  'biology-tutor-vasant-kunj': 'Vasant Kunj',
  'neet-coaching-vasant-kunj-delhi': 'Vasant Kunj',
  'neet-coaching-dps-vasant-kunj-students': 'DPS Vasant Kunj',
  'biology-classes-saket': 'Saket',
  'biology-tutor-saket': 'Saket',
  'neet-coaching-saket': 'Saket',
  'neet-coaching-saket-delhi': 'Saket',
  'biology-classes-green-park': 'Green Park',
  'neet-coaching-green-park-delhi': 'Green Park',
  'neet-coaching-panchsheel-park-delhi': 'Panchsheel Park',
  'neet-coaching-safdarjung-enclave-delhi': 'Safdarjung Enclave',
  'biology-coaching-east-of-kailash-delhi': 'East of Kailash',
  // Central Delhi
  'neet-coaching-chandni-chowk-delhi': 'Chandni Chowk',
  'neet-coaching-civil-lines-delhi': 'Civil Lines',
  'neet-coaching-connaught-place-delhi': 'Connaught Place',
  'neet-coaching-modern-school-delhi': 'Modern School',
  // West Delhi / Rohini / Dwarka
  'biology-coaching-dwarka': 'Dwarka',
  'biology-tutor-dwarka': 'Dwarka',
  'neet-coaching-dwarka': 'Dwarka',
  'biology-tuition-rohini': 'Rohini',
  'biology-tutor-rohini': 'Rohini',
  'neet-coaching-rohini': 'Rohini',
  // East Delhi
  'neet-coaching-dilshad-garden-delhi': 'Dilshad Garden',
  'neet-coaching-shahdara-east-delhi': 'Shahdara',
  'neet-coaching-yamuna-vihar-delhi': 'Yamuna Vihar',
}

function buildJsx(slug, indent = '      ') {
  const subArea = SUB_AREA[slug]
  const lines = [`${indent}<DelhiAreaSchema`, `${indent}  pageSlug="${slug}"`]
  if (subArea) {
    lines.push(`${indent}  subArea="${subArea.replace(/"/g, '\\"')}"`)
  }
  lines.push(`${indent}/>`)
  return lines.join('\n')
}

function injectImport(source) {
  if (source.includes("from '@/components/seo/DelhiAreaSchema'")) {
    return { source, addedImport: false }
  }
  const lines = source.split('\n')
  let lastImportEnd = -1
  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    if (/^import\s/.test(line)) {
      if (
        line.includes(' from ') &&
        (line.endsWith("'") || line.endsWith('"') || line.endsWith(';'))
      ) {
        lastImportEnd = i
        i++
        continue
      }
      let j = i
      while (j < lines.length && !/from\s+['"][^'"]+['"];?\s*$/.test(lines[j])) {
        j++
      }
      lastImportEnd = j
      i = j + 1
      continue
    }
    if (line.trim() === '' || /^['"]use [a-z ]+['"];?$/.test(line.trim())) {
      i++
      continue
    }
    if (lastImportEnd >= 0) break
    i++
  }
  if (lastImportEnd === -1) return { source, addedImport: false }
  lines.splice(lastImportEnd + 1, 0, IMPORT_LINE)
  return { source: lines.join('\n'), addedImport: true }
}

function injectJsx(source, slug) {
  if (source.includes('<DelhiAreaSchema')) {
    return { source, addedJsx: false }
  }
  const insertion = buildJsx(slug)

  // Pattern A: opening element or fragment that is NOT self-closing.
  const openTagRe = /(return \(\s*\n\s*<[^/>]*>\s*\n)/
  if (openTagRe.test(source)) {
    return { source: source.replace(openTagRe, `$1${insertion}\n`), addedJsx: true }
  }

  // Pattern B: single self-closing component inside parens.
  const selfClosingRe = /(return \()\s*\n(\s*)(<[A-Za-z][^>]*\/>)\s*\n(\s*\))/
  if (selfClosingRe.test(source)) {
    return {
      source: source.replace(
        selfClosingRe,
        (_m, ret, indent, comp, close) =>
          `${ret}\n${indent}<>\n${insertion}\n${indent}  ${comp}\n${indent}</>\n${close}`
      ),
      addedJsx: true,
    }
  }

  // Pattern C: parenthesis-less single-line return.
  const inlineRe = /^(\s*)return (<[A-Za-z][^\n]*\/>)\s*;?\s*$/m
  if (inlineRe.test(source)) {
    return {
      source: source.replace(inlineRe, (_m, indent, comp) => {
        const inner = indent + '  '
        return (
          `${indent}return (\n` +
          `${inner}<>\n` +
          buildJsx(slug, inner + '  ') +
          `\n${inner}  ${comp}\n` +
          `${inner}</>\n` +
          `${indent})`
        )
      }),
      addedJsx: true,
    }
  }

  return { source, addedJsx: false }
}

function processFile(slug) {
  const filePath = path.join(APP_DIR, slug, 'page.tsx')
  if (!fs.existsSync(filePath)) {
    return { slug, status: 'missing' }
  }
  const original = fs.readFileSync(filePath, 'utf8')
  let working = original

  const { source: afterImport, addedImport } = injectImport(working)
  working = afterImport

  const { source: afterJsx, addedJsx } = injectJsx(working, slug)
  working = afterJsx

  if (working === original) {
    return { slug, status: 'skipped', addedImport, addedJsx }
  }
  if (!addedJsx) {
    return { slug, status: 'jsx-anchor-not-found' }
  }
  fs.writeFileSync(filePath, working)
  return { slug, status: 'updated' }
}

function main() {
  // Optional CLI arg: a path to a file containing the list of slugs to process,
  // one per line. Falls back to scanning APP_DIR with SLUG_RE.
  const slugListPath = process.argv[2]
  let slugs
  if (slugListPath && fs.existsSync(slugListPath)) {
    slugs = fs
      .readFileSync(slugListPath, 'utf8')
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)
  } else {
    slugs = fs.readdirSync(APP_DIR).filter((e) => SLUG_RE.test(e))
  }

  const results = slugs.map(processFile)
  const counts = results.reduce((acc, r) => {
    acc[r.status] = (acc[r.status] || 0) + 1
    return acc
  }, {})
  console.log(`Total: ${slugs.length}`)
  console.log(JSON.stringify(counts, null, 2))
  for (const r of results) {
    if (r.status !== 'updated' && r.status !== 'skipped') {
      console.log(`  ${r.status}: ${r.slug}`)
    }
  }
}

main()
