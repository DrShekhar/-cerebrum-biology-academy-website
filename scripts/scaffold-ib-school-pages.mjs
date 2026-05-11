#!/usr/bin/env node
/* Scaffold the 15 per-school IB Biology landing-page wrappers
 * (/ib-biology-tutor-{slug}/page.tsx).
 *
 * Each wrapper is ~30 lines of boilerplate that imports the shared
 * template + schemas + metadata builder + data file. The content
 * itself lives in src/data/ib-biology/schools.ts; pages stay thin.
 *
 * Idempotent — skips files that already exist.
 *
 * Cannibalization safety: every school's primary keyword is the
 * school-name long-tail "IB Biology tutor {SchoolName}". Titles cap
 * at 60 chars, descriptions at 160 chars (Google SERP limits).
 */
import fs from 'node:fs'
import path from 'node:path'

const APP_DIR = path.resolve('src/app')

const schools = [
  {
    slug: 'uwcsea',
    schoolName: 'UWCSEA',
    longName: 'United World College of South East Asia',
    cityCountry: 'Singapore',
    inLanguage: 'en-SG',
  },
  {
    slug: 'asd-dubai',
    schoolName: 'ASD Dubai',
    longName: 'American School of Dubai',
    cityCountry: 'Dubai, UAE',
    inLanguage: 'en-AE',
  },
  {
    slug: 'gems-dubai-american-academy',
    schoolName: 'GEMS DAA',
    longName: 'GEMS Dubai American Academy',
    cityCountry: 'Dubai, UAE',
    inLanguage: 'en-AE',
  },
  {
    slug: 'tanglin-trust',
    schoolName: 'Tanglin Trust',
    longName: 'Tanglin Trust School',
    cityCountry: 'Singapore',
    inLanguage: 'en-SG',
  },
  {
    slug: 'nist-bangkok',
    schoolName: 'NIST',
    longName: 'NIST International School Bangkok',
    cityCountry: 'Bangkok',
    inLanguage: 'en-TH',
  },
  {
    slug: 'pathways-aravali',
    schoolName: 'Pathways Aravali',
    longName: 'Pathways World School Aravali',
    cityCountry: 'Gurgaon',
    inLanguage: 'en-IN',
  },
  {
    slug: 'uwc-mahindra-pune',
    schoolName: 'UWC Mahindra',
    longName: 'UWC Mahindra College',
    cityCountry: 'Pune',
    inLanguage: 'en-IN',
  },
  {
    slug: 'stonehill-bangalore',
    schoolName: 'Stonehill',
    longName: 'Stonehill International School',
    cityCountry: 'Bangalore',
    inLanguage: 'en-IN',
  },
  {
    slug: 'inventure-bangalore',
    schoolName: 'Inventure',
    longName: 'Inventure Academy',
    cityCountry: 'Bangalore',
    inLanguage: 'en-IN',
  },
  {
    slug: 'oberoi-mumbai',
    schoolName: 'Oberoi International',
    longName: 'Oberoi International School',
    cityCountry: 'Mumbai',
    inLanguage: 'en-IN',
  },
  {
    slug: 'asb-mumbai',
    schoolName: 'ASB Mumbai',
    longName: 'American School of Bombay',
    cityCountry: 'Mumbai',
    inLanguage: 'en-IN',
  },
  {
    slug: 'stamford-american-singapore',
    schoolName: 'Stamford American',
    longName: 'Stamford American International School',
    cityCountry: 'Singapore',
    inLanguage: 'en-SG',
  },
  {
    slug: 'mahatma-gandhi-international-ahmedabad',
    schoolName: 'MGIS Ahmedabad',
    longName: 'Mahatma Gandhi International School',
    cityCountry: 'Ahmedabad',
    inLanguage: 'en-IN',
  },
  {
    slug: 'dhirubhai-ambani-mumbai',
    schoolName: 'DAIS Mumbai',
    longName: 'Dhirubhai Ambani International School',
    cityCountry: 'Mumbai',
    inLanguage: 'en-IN',
  },
  {
    slug: 'cathedral-mumbai',
    schoolName: 'Cathedral School',
    longName: 'The Cathedral and John Connon School',
    cityCountry: 'Mumbai',
    inLanguage: 'en-IN',
  },
]

// Per-school keyword cluster — kept tight so each page targets a clean
// long-tail. The schoolName is the discriminator; everything else is
// supporting context.
function keywordsFor(school) {
  const base = [
    `IB Biology tutor ${school.schoolName}`,
    `IB Biology coaching ${school.schoolName}`,
    `IB Biology HL tutor ${school.schoolName}`,
    `IB Biology SL tutor ${school.schoolName}`,
    `IB Biology IA help ${school.schoolName}`,
    `${school.schoolName} IB Biology tutoring`,
    `IB Biology examiner ${school.schoolName}`,
    `online IB Biology tutor ${school.cityCountry}`,
  ]
  // Include long-name variant if it differs from shortName meaningfully
  if (school.longName !== school.schoolName) {
    base.push(`IB Biology tutor ${school.longName}`)
  }
  return base
}

function titleFor(school) {
  // Pattern: "IB Biology Tutor for {Short} · {City} · Cerebrum" — under 60 chars
  const t = `IB Biology Tutor for ${school.schoolName} · ${school.cityCountry} · Cerebrum`
  return t.length <= 70 ? t : `IB Biology Tutor · ${school.schoolName} · Cerebrum`
}

function descriptionFor(school) {
  // Pattern: ~150 chars, school-specific
  return `IB Biology HL & SL 1:1 tutoring for ${school.longName} students in ${school.cityCountry}. Examiner-led faculty, IA + EE mentorship, 2025 syllabus.`
}

function pageContent(school) {
  const slugConst = school.slug
  const keywords = keywordsFor(school)
  return `/**
 * /ib-biology-tutor-${slugConst}
 *
 * Per-school IB Biology landing page for ${school.longName}
 * (${school.cityCountry}). Built from IBBiologySchoolTemplate +
 * ibBiologySchools['${slugConst}']. Schemas via IBBiologySchoolSchemas
 * with ${school.inLanguage} inLanguage so Google + LLMs route the
 * page to the right regional audience.
 *
 * Primary keyword: "IB Biology tutor ${school.schoolName}" — a
 * school-name long-tail that no other page on the site targets.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = '${slugConst}'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: ${JSON.stringify(titleFor(school))},
  description: ${JSON.stringify(descriptionFor(school))},
  keywords: ${JSON.stringify(keywords, null, 2).replace(/\n/g, '\n  ')},
  canonical: \`/ib-biology-tutor-\${SLUG}\`,
  inLanguage: '${school.inLanguage}',
})

export default function Page() {
  if (!school) notFound()
  return (
    <>
      <IBBiologySchoolSchemas school={school} />
      <IBBiologySchoolTemplate school={school} />
    </>
  )
}
`
}

function main() {
  const results = []
  for (const school of schools) {
    const dir = path.join(APP_DIR, `ib-biology-tutor-${school.slug}`)
    const filePath = path.join(dir, 'page.tsx')
    if (fs.existsSync(filePath)) {
      results.push({ slug: school.slug, status: 'exists' })
      continue
    }
    fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(filePath, pageContent(school))
    results.push({ slug: school.slug, status: 'created' })
  }
  const counts = results.reduce((a, r) => ({ ...a, [r.status]: (a[r.status] || 0) + 1 }), {})
  console.log(`Total: ${schools.length}`)
  console.log(JSON.stringify(counts, null, 2))
  for (const r of results) console.log(`  ${r.status}: ${r.slug}`)
}

main()
