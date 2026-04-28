#!/usr/bin/env node
/**
 * Sweep shared client components and replace static `<Link href="https://wa.me/918826444334?text=…">…</Link>`
 * (or `<a href="https://wa.me/…">…</a>`) with `<ContextualWhatsAppLink>…</ContextualWhatsAppLink>` so the
 * prefilled message reflects the page the user is on at runtime via `usePathname()`.
 *
 * Targets only files we listed — we don't want to touch bespoke client components that already
 * compose context-specific messages (CityHubPage etc.).
 */

import { readFileSync, writeFileSync } from 'fs'

const FILES = [
  'src/components/city/CostComparisonSection.tsx',
  'src/components/city/PricingSection.tsx',
  'src/components/layout/HeroInteractiveWrapper.tsx',
  'src/components/layout/Header.tsx',
  'src/components/layout/UrgencySection.tsx',
  'src/components/layout/ValuePropositionSection.tsx',
  'src/components/layout/StickyNavigationHeader.tsx',
  'src/components/student/MyEnrollments.tsx',
  'src/components/navigation/MobileNavigation.tsx',
  'src/components/blog/BlogListingPage.tsx',
  'src/components/nri/NRICountryPageTemplate.tsx',
  'src/components/mobile/MobileFullscreenMenu.tsx',
  'src/components/ai/AIEducationDashboard.tsx',
  'src/components/pricing/PricingComparisonTable.tsx',
]

// Two URL variants to swap (demo + enroll, US + UK spellings)
const STATIC_HREFS = [
  '"https://wa.me/918826444334?text=Hi!%20I%20want%20to%20book%20a%20FREE%20demo%20class%20for%20NEET%20Biology.%20Please%20share%20available%20timings."',
  '"https://wa.me/918826444334?text=Hi!%20I%20want%20to%20enroll%20in%20NEET%20Biology%20coaching.%20Please%20share%20fee%20structure%20and%20enrollment%20details."',
  '"https://wa.me/918826444334?text=Hi!%20I%20want%20to%20enroll%20in%20NEET%20Biology%20coaching.%20Please%20share%20fee%20structure%20and%20enrolment%20details."',
  '"https://wa.me/918826444334?text=Hi!%20I%20want%20to%20enroll%20in%20NEET%20Biology%20coaching.%20Please%20share%20details."',
]

const IMPORT_LINE = `import { ContextualWhatsAppLink } from '@/components/common/ContextualWhatsAppLink'`

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

let totalChanges = 0

for (const file of FILES) {
  const original = readFileSync(file, 'utf8')
  let content = original
  let fileChanges = 0

  for (const staticHref of STATIC_HREFS) {
    // Pattern 1:  <Link href=STATIC ... >children</Link>
    // We replace the opening tag's `<Link href=STATIC` with `<ContextualWhatsAppLink`
    // and any following `</Link>` accumulator (handled in pass 2 below).
    const linkOpen = new RegExp(`<Link\\s+href=${escapeRe(staticHref)}([^>]*)>`, 'g')
    let matched = false
    content = content.replace(linkOpen, (_m, rest) => {
      matched = true
      fileChanges++
      return `<ContextualWhatsAppLink${rest}>`
    })

    // Pattern 2:  <a href=STATIC ... >children</a>
    const anchorOpen = new RegExp(`<a\\s+href=${escapeRe(staticHref)}([^>]*)>`, 'g')
    content = content.replace(anchorOpen, (_m, rest) => {
      matched = true
      fileChanges++
      return `<ContextualWhatsAppLink${rest}>`
    })
  }

  if (fileChanges === 0) continue

  // Now sub closing tags. Since we don't know which `</Link>` or `</a>` paired with
  // each replaced opener, we rely on a manual pass: count net <Link openers we removed
  // and sub the equivalent number of </Link> closers nearby. Heuristic — verified
  // visually after run by tsc + lint.
  // Simpler: do a regex replace of `</Link>` and `</a>` for occurrences immediately
  // after our `<ContextualWhatsAppLink` openers. We use a non-regex walk:
  let updated = ''
  let i = 0
  let openContextual = 0
  while (i < content.length) {
    if (content.startsWith('<ContextualWhatsAppLink', i)) {
      openContextual++
      const end = content.indexOf('>', i) + 1
      updated += content.slice(i, end)
      i = end
      continue
    }
    if (openContextual > 0 && content.startsWith('</Link>', i)) {
      updated += '</ContextualWhatsAppLink>'
      i += '</Link>'.length
      openContextual--
      continue
    }
    if (openContextual > 0 && content.startsWith('</a>', i)) {
      updated += '</ContextualWhatsAppLink>'
      i += '</a>'.length
      openContextual--
      continue
    }
    updated += content[i]
    i++
  }
  content = updated

  // Add import if missing
  if (!content.includes("from '@/components/common/ContextualWhatsAppLink'")) {
    // Insert after the last import statement
    const lines = content.split('\n')
    let lastImportIdx = -1
    for (let j = 0; j < lines.length; j++) {
      if (lines[j].startsWith('import ')) lastImportIdx = j
    }
    if (lastImportIdx >= 0) {
      lines.splice(lastImportIdx + 1, 0, IMPORT_LINE)
    } else {
      lines.unshift(IMPORT_LINE)
    }
    content = lines.join('\n')
  }

  if (content !== original) {
    writeFileSync(file, content, 'utf8')
    totalChanges += fileChanges
    console.log(`✓ ${file} — ${fileChanges} replacement(s)`)
  }
}

console.log(`\n=== Summary ===`)
console.log(`Total replacements: ${totalChanges}`)
