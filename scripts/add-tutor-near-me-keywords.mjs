#!/usr/bin/env node
/**
 * Add "tutor near me" / "USABO tutor [city]" / "IBO tutor [city]" / "biology
 * olympiad tutor near me [city]" keywords to all USABO city pages.
 *
 * Idempotent — safe to re-run.
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs'
import path from 'path'

const APP_DIR = path.join(process.cwd(), 'src', 'app')

// All directories matching usabo-coaching-* (excluding the hub itself)
const dirs = readdirSync(APP_DIR).filter(
  (d) => d.startsWith('usabo-coaching-') && d !== 'usabo-coaching'
)

let count = 0

for (const dir of dirs) {
  const filePath = path.join(APP_DIR, dir, 'page.tsx')
  const original = readFileSync(filePath, 'utf8')
  if (original.includes('tutor near me')) {
    console.log(`⊘ Already has near-me: ${dir}`)
    continue
  }

  // Find the keywords array and inject near-me variants. Pattern:
  //   keywords: [...keywords from cityName...]
  // The generator uses: \`USABO coaching \${city.cityName.toLowerCase()}\` etc.
  // We append city-specific near-me terms after the existing array's school items.
  // The keywords block ends at a `],` that closes the array — we replace that.

  // Inject near-me terms before the closing `],` of the keywords array.
  // The array starts with `keywords: ${JSON.stringify([...], ...)}` rendered
  // as a JS array literal. We find the first `]` after `keywords:` and insert.
  const keywordsRe = /(keywords:\s*\[[\s\S]*?)(\n\s*\],)/m
  const m = original.match(keywordsRe)
  if (!m) {
    console.log(`✗ Could not find keywords array in ${dir}`)
    continue
  }

  // Pull the cityName from a const cityName = "..." declaration if present
  const cityNameMatch = original.match(/const cityName = (?:"|')([^"']+)(?:"|')/)
  const cityName = cityNameMatch
    ? cityNameMatch[1]
    : dir.replace('usabo-coaching-', '').replace(/-/g, ' ')
  const cityLower = cityName.toLowerCase()

  const nearMeLines = [
    `    "USABO tutor near me",`,
    `    "USABO tutor near me ${cityLower}",`,
    `    "biology olympiad tutor near me ${cityLower}",`,
    `    "IBO tutor near me ${cityLower}",`,
    `    "USABO online tutor ${cityLower}",`,
    `    "private biology olympiad tutor ${cityLower}",`,
  ].join('\n')

  const updated = original.replace(keywordsRe, (full, head, tail) => {
    return `${head},\n${nearMeLines}${tail}`
  })

  if (updated === original) {
    console.log(`⊘ No change: ${dir}`)
    continue
  }

  writeFileSync(filePath, updated, 'utf8')
  count++
  console.log(`✓ Patched ${dir}`)
}

console.log(`\nPatched ${count} files`)
