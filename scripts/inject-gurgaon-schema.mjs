#!/usr/bin/env node
/* Inject <GurgaonGurugramAreaSchema /> into all gurgaon/gurugram landing pages.
 * Idempotent — skips pages already wired up.
 *
 * Strategy:
 *   1. Add the import after the last existing `import` line.
 *   2. Insert the JSX as the first child of the outer return element.
 *      We anchor on the first `return (\n    <...>` — schema slots in immediately after.
 *
 * Usage: node scripts/inject-gurgaon-schema.mjs
 */
import fs from 'node:fs'
import path from 'node:path'

const APP_DIR = path.resolve('src/app')
const IMPORT_LINE =
  "import { GurgaonGurugramAreaSchema } from '@/components/seo/GurgaonGurugramAreaSchema'"

// Sub-area mapping — derived from slug.
// `null` means citywide / topical page (no sub-area).
const SUB_AREA = {
  // ---- gurgaon ----
  'neet-coaching-amity-gurgaon-students': 'Amity School Gurgaon',
  'neet-coaching-bhondsi-gurgaon': 'Bhondsi',
  'neet-coaching-dlf-gurgaon': 'DLF',
  'neet-coaching-dps-gurgaon-students': 'DPS Gurgaon',
  'neet-coaching-gurgaon-sector-57': 'Sector 57',
  'neet-coaching-gurgaon-sector-62': 'Sector 62',
  'neet-coaching-gurgaon-sector-67': 'Sector 67',
  'neet-coaching-gurgaon-sector-69': 'Sector 69',
  'neet-coaching-gurgaon-sector-70': 'Sector 70',
  'neet-coaching-imt-manesar-gurgaon': 'IMT Manesar',

  // ---- gurugram landmark / locality pages ----
  'neet-coaching-cyber-city-gurugram': 'Cyber City',
  'neet-coaching-dlf-phase-1-gurugram': 'DLF Phase 1',
  'neet-coaching-huda-city-centre-gurugram': 'HUDA City Centre',
  'neet-coaching-iffco-chowk-gurugram': 'Iffco Chowk',
  'neet-coaching-mg-road-gurugram': 'MG Road',
  'neet-coaching-nirvana-country-gurugram': 'Nirvana Country',
  'neet-coaching-pataudi-road-gurugram': 'Pataudi Road',
  'neet-coaching-south-city-gurugram': 'South City',
  'neet-coaching-sushant-lok-gurugram': 'Sushant Lok',

  // ---- gurugram school pages ----
  'neet-coaching-apeejay-school-gurugram': 'Apeejay School Gurugram',
  'neet-coaching-bal-bharati-school-gurugram': 'Bal Bharati School Gurugram',
  'neet-coaching-dps-international-gurugram': 'DPS International Gurugram',
  'neet-coaching-hillwoods-academy-gurugram': 'Hillwoods Academy Gurugram',
  'neet-coaching-kr-mangalam-world-school-gurugram': 'KR Mangalam World School Gurugram',
  'neet-coaching-paras-world-school-gurugram': 'Paras World School Gurugram',
  'neet-coaching-pathways-world-school-gurugram': 'Pathways World School Gurugram',
  'neet-coaching-presidium-school-gurugram': 'Presidium School Gurugram',
  'neet-coaching-vega-school-gurugram': 'Vega School Gurugram',
}

function detectSpelling(slug) {
  if (slug.includes('gurgaon')) return 'gurgaon'
  if (slug.includes('gurugram')) return 'gurugram'
  return null
}

function buildSchemaJsx(slug, indent = '      ') {
  const spelling = detectSpelling(slug)
  const subArea = SUB_AREA[slug]
  const lines = [
    `${indent}<GurgaonGurugramAreaSchema`,
    `${indent}  spelling="${spelling}"`,
    `${indent}  pageSlug="${slug}"`,
  ]
  if (subArea) {
    lines.push(`${indent}  subArea="${subArea.replace(/"/g, '\\"')}"`)
  }
  lines.push(`${indent}/>`)
  return lines.join('\n')
}

function injectImport(source) {
  if (source.includes("from '@/components/seo/GurgaonGurugramAreaSchema'")) {
    return { source, addedImport: false }
  }
  const lines = source.split('\n')
  let lastImportEnd = -1 // index of the LAST line that belongs to any import
  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    if (/^import\s/.test(line)) {
      // Single-line import?
      if (
        line.includes(' from ') &&
        (line.endsWith("'") || line.endsWith('"') || line.endsWith(';'))
      ) {
        lastImportEnd = i
        i++
        continue
      }
      // Multi-line import { ... } — scan until we hit the closing brace + from clause.
      let j = i
      while (j < lines.length && !/from\s+['"][^'"]+['"];?\s*$/.test(lines[j])) {
        j++
      }
      lastImportEnd = j
      i = j + 1
      continue
    }
    // Skip blank lines / pragma directives between imports.
    if (line.trim() === '' || /^['"]use [a-z ]+['"];?$/.test(line.trim())) {
      i++
      continue
    }
    // Hit non-import code — stop.
    if (lastImportEnd >= 0) break
    i++
  }
  if (lastImportEnd === -1) return { source, addedImport: false }
  lines.splice(lastImportEnd + 1, 0, IMPORT_LINE)
  return { source: lines.join('\n'), addedImport: true }
}

function injectJsx(source, slug) {
  if (source.includes('<GurgaonGurugramAreaSchema')) {
    return { source, addedJsx: false }
  }
  const insertion = buildSchemaJsx(slug)

  // Pattern A: opening element or fragment that is NOT self-closing.
  //   return (\n    <div>\n   →   insert schema as first child
  //   return (\n    <>\n        →   insert schema as first child
  const openTagRe = /(return \(\s*\n\s*<[^/>]*>\s*\n)/
  if (openTagRe.test(source)) {
    return { source: source.replace(openTagRe, `$1${insertion}\n`), addedJsx: true }
  }

  // Pattern B: single self-closing component inside parens.
  //   return (\n    <Foo />\n  )   →   wrap with a fragment and prepend schema
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
  //   return <Foo ... />            (with or without trailing semicolon)
  //   →   return (\n    <>\n      <Schema/>\n      <Foo/>\n    </>\n  )
  const inlineRe = /^(\s*)return (<[A-Za-z][^\n]*\/>)\s*;?\s*$/m
  if (inlineRe.test(source)) {
    return {
      source: source.replace(inlineRe, (_m, indent, comp) => {
        const inner = indent + '  '
        return (
          `${indent}return (\n` +
          `${inner}<>\n` +
          buildSchemaJsx(slug, inner + '  ') +
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
    // Avoid writing import without JSX — that would dangle.
    return { slug, status: 'jsx-anchor-not-found' }
  }
  fs.writeFileSync(filePath, working)
  return { slug, status: 'updated', addedImport, addedJsx }
}

function main() {
  const entries = fs.readdirSync(APP_DIR)
  const slugs = entries.filter((e) => /gurgaon|gurugram/i.test(e))
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
