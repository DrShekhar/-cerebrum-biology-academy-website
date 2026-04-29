#!/usr/bin/env node
/**
 * Inject <USABOPathwayCallout> into the 10 existing NEET-USA city pages
 * + the NRI-USA hub. Adds the import and renders the callout right before
 * the Related Cities section.
 */

import { readFileSync, writeFileSync, existsSync } from 'fs'

const PAGES = [
  {
    file: 'src/app/neet-coaching-houston-usa/PageContent.tsx',
    city: 'Houston',
    schools: ['Clements HS', 'Memorial HS', 'BASIS Houston', 'Cinco Ranch HS'],
  },
  {
    file: 'src/app/neet-coaching-boston-usa/PageContent.tsx',
    city: 'Greater Boston',
    schools: ['Lexington HS', 'Acton-Boxborough', 'Newton South', 'Belmont HS'],
  },
  {
    file: 'src/app/neet-coaching-chicago-usa/PageContent.tsx',
    city: 'Chicago suburbs',
    schools: ['Naperville Central', 'Hinsdale Central', 'Northbrook', 'New Trier'],
  },
  {
    file: 'src/app/neet-coaching-dallas-usa/PageContent.tsx',
    city: 'Dallas–Plano',
    schools: ['Plano West Senior HS', 'TAG Magnet', 'Highland Park HS'],
  },
  {
    file: 'src/app/neet-coaching-edison-nj-usa/PageContent.tsx',
    city: 'Central New Jersey',
    schools: [
      'West Windsor-Plainsboro HS',
      'Princeton HS',
      'Montgomery HS',
      'Edison Academy / JP Stevens',
      'Livingston HS',
    ],
  },
  {
    file: 'src/app/neet-coaching-new-york-usa/PageContent.tsx',
    city: 'New York City + Long Island',
    schools: [
      'Stuyvesant HS',
      'Bronx Science',
      'Hunter College HS',
      'Jericho HS',
      'Great Neck North',
    ],
  },
  {
    file: 'src/app/neet-coaching-san-jose-usa/PageContent.tsx',
    city: 'the SF Bay Area',
    schools: [
      'Monta Vista HS',
      'Lynbrook HS',
      'Mission San Jose',
      'Saratoga HS',
      'Cupertino HS',
      'Fremont (Irvington/Mission)',
    ],
  },
  {
    file: 'src/app/neet-coaching-washington-dc-usa/PageContent.tsx',
    city: 'DC / Northern Virginia',
    schools: [
      'TJHSST',
      'McLean HS',
      'Langley HS',
      'Walt Whitman HS',
      'Winston Churchill HS',
      'Bethesda-Chevy Chase',
    ],
  },
  {
    file: 'src/app/neet-coaching-atlanta-usa/PageContent.tsx',
    city: 'Atlanta + suburbs',
    schools: ['Walton HS', 'Roswell HS', 'Alpharetta HS', 'Northview HS'],
  },
  {
    file: 'src/app/neet-coaching-nri-usa/PageContent.tsx',
    city: 'the United States',
    schools: undefined, // Use the default school list (TJHSST/Stuyvesant/etc.)
  },
]

const IMPORT_LINE = `import { USABOPathwayCallout } from '@/components/seo/USABOPathwayCallout'`

const RELATED_MARKERS = [
  '{/* Related Cities */}',
  '{/* Related Locations */}',
  '{/* Related */}',
  '{/* Related Pages */}',
  '{/* Related City Links */}',
  '<RelatedCityLinks',
]

let totalChanged = 0

for (const entry of PAGES) {
  if (!existsSync(entry.file)) {
    console.log(`✗ Skipping ${entry.file} — does not exist`)
    continue
  }
  const original = readFileSync(entry.file, 'utf8')
  if (original.includes('USABOPathwayCallout')) {
    console.log(`⊘ Skipping ${entry.file} — already injected`)
    continue
  }

  // Add import right after the last existing import line
  const lines = original.split('\n')
  let lastImportIdx = -1
  for (let i = 0; i < lines.length; i++) {
    if (/^import\s/.test(lines[i])) lastImportIdx = i
  }
  if (lastImportIdx >= 0) {
    lines.splice(lastImportIdx + 1, 0, IMPORT_LINE)
  } else {
    lines.unshift(IMPORT_LINE)
  }
  let modified = lines.join('\n')

  const schoolsArg =
    entry.schools && entry.schools.length > 0
      ? `schools={${JSON.stringify(entry.schools)}}`
      : ''
  const calloutJsx = `      <USABOPathwayCallout cityName="${entry.city}" ${schoolsArg} />\n\n      `

  // Try comment markers first (preserves them)
  let injected = false
  for (const m of ['{/* Related Cities */}', '{/* Related Locations */}', '{/* Related */}', '{/* Related Pages */}', '{/* Related City Links */}']) {
    if (modified.includes(m)) {
      modified = modified.replace(m, calloutJsx + m)
      injected = true
      break
    }
  }

  // Fall back: inject right before the bare <RelatedCityLinks ... /> tag
  if (!injected) {
    const rcRe = /(\s*)<RelatedCityLinks\b/
    if (rcRe.test(modified)) {
      modified = modified.replace(rcRe, (full, ws) => `${ws}${calloutJsx.trimEnd()}\n${ws}<RelatedCityLinks`)
      injected = true
    }
  }

  if (!injected) {
    console.log(`✗ ${entry.file} — could not locate injection point, skipping`)
    continue
  }

  writeFileSync(entry.file, modified, 'utf8')
  totalChanged++
  console.log(`✓ ${entry.file} — injected for ${entry.city}`)
}

console.log(`\n=== Summary ===`)
console.log(`Files changed: ${totalChanged}`)
