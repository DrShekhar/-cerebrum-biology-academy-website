#!/usr/bin/env node
/* Inject <NEETNRIPricingTiers /> into every NEET NRI / international
 * page so visitors see local-currency pricing instead of having to
 * WhatsApp for a quote.
 *
 * The component is an async server component (reads headers()), so
 * the host Page function must also be async. This script:
 *   1. Adds the import at the top
 *   2. Converts `export default function Page()` → `export default async function Page()`
 *   3. Inserts <NEETNRIPricingTiers /> at the end of the return JSX
 *      (immediately before the closing `</>` for fragment returns;
 *       wraps single-line `return <PageContent />` into a fragment).
 *
 * Idempotent — skips pages already wired up.
 */
import fs from 'node:fs'
import path from 'node:path'

const APP_DIR = path.resolve('src/app')
const IMPORT_LINE =
  "import { NEETNRIPricingTiers } from '@/components/neet-nri/NEETNRIPricingTiers'"
const TIERS_JSX = '      <NEETNRIPricingTiers />\n'

// Slug allowlist — every NEET NRI / city-international page.
const NRI_PATTERN =
  /^(neet-coaching-nri-|neet-coaching-.*-(usa|canada|uk|uae|saudi-arabia|qatar|kuwait|bahrain|oman|singapore|malaysia|nepal|australia)$)/

function processFile(slug) {
  const filePath = path.join(APP_DIR, slug, 'page.tsx')
  if (!fs.existsSync(filePath)) return { slug, status: 'missing' }
  const original = fs.readFileSync(filePath, 'utf8')
  let src = original

  if (src.includes('NEETNRIPricingTiers')) {
    return { slug, status: 'already' }
  }

  // 1. Add import after the last top-of-file import.
  const lines = src.split('\n')
  let lastImportIdx = -1
  for (let i = 0; i < lines.length; i++) {
    if (/^import\s/.test(lines[i])) {
      // single-line OR multi-line {…}-import — find the from-quote line
      if (/from\s+['"][^'"]+['"];?\s*$/.test(lines[i])) {
        lastImportIdx = i
        continue
      }
      let j = i
      while (j < lines.length && !/from\s+['"][^'"]+['"];?\s*$/.test(lines[j])) j++
      lastImportIdx = j
      i = j
    } else if (lastImportIdx !== -1 && lines[i].trim() && !lines[i].startsWith("'")) {
      break
    }
  }
  if (lastImportIdx === -1) return { slug, status: 'no-imports' }
  lines.splice(lastImportIdx + 1, 0, IMPORT_LINE)
  src = lines.join('\n')

  // 2. Make Page function async.
  //    Patterns we accept:
  //      export default function Page()  →  export default async function Page()
  //      export default function NameThatIncludesPage()  → same
  src = src.replace(
    /export default function ([A-Za-z0-9_]*Page[A-Za-z0-9_]*)\s*\(/,
    'export default async function $1('
  )
  // also handle plain "Page" name
  if (!src.includes('export default async function')) {
    src = src.replace(/export default function Page\s*\(/, 'export default async function Page(')
  }

  // 3. Insert <NEETNRIPricingTiers /> into the return.
  //    Case A: fragment return with closing </>  →  insert before </>
  //    Accept optional trailing semicolon: `);` or `)`.
  const fragMatch = src.match(/(\n\s*)<\/>\s*\n(\s*)\);?\s*\n}/)
  if (fragMatch) {
    src = src.replace(
      /(\n\s*)<\/>\s*\n(\s*)\);?\s*\n}/,
      `${fragMatch[1]}${TIERS_JSX.replace(/\n$/, '')}${fragMatch[1]}</>\n${fragMatch[2]});\n}`
    )
  } else {
    //  Case B: single-line `return <X />` (no fragment).
    //         Convert to fragment + insert.
    const inlineMatch = src.match(/^(\s*)return (<[A-Za-z][^\n]*\/>)\s*;?\s*$/m)
    if (inlineMatch) {
      const indent = inlineMatch[1]
      const inner = indent + '  '
      src = src.replace(
        /^(\s*)return (<[A-Za-z][^\n]*\/>)\s*;?\s*$/m,
        `${indent}return (\n${inner}<>\n${inner}  ${inlineMatch[2]}\n${inner}  <NEETNRIPricingTiers />\n${inner}</>\n${indent})`
      )
    } else {
      // Case C: multi-line return without fragment closer — search for
      //         the last `)` before the page function's closing brace.
      //         Bail with a flag so we can hand-fix the rare case.
      return { slug, status: 'no-return-anchor' }
    }
  }

  if (src === original) return { slug, status: 'no-change' }
  fs.writeFileSync(filePath, src)
  return { slug, status: 'updated' }
}

function main() {
  const all = fs.readdirSync(APP_DIR)
  // Allow either nri-* hubs or city-international pages.
  const slugs = all.filter(
    (s) =>
      s.startsWith('neet-coaching-nri-') ||
      /neet-coaching-.*-(usa|canada|uk|uae|saudi-arabia|qatar|kuwait|bahrain|oman|singapore|malaysia|nepal|australia)$/.test(
        s
      )
  )
  const results = slugs.map(processFile)
  const counts = results.reduce((acc, r) => {
    acc[r.status] = (acc[r.status] || 0) + 1
    return acc
  }, {})
  console.log(`Total candidate slugs: ${slugs.length}`)
  console.log(JSON.stringify(counts, null, 2))
  for (const r of results) {
    if (r.status !== 'updated' && r.status !== 'already') {
      console.log(`  ${r.status}: ${r.slug}`)
    }
  }
}

main()
