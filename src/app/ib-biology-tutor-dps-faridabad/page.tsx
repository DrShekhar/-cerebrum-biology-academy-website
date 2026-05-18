/**
 * /ib-biology-tutor-dps-faridabad
 *
 * Per-school IB Biology landing page for Delhi Public School Faridabad.
 * Part of the broader Delhi Public School (DPS) national network — one
 * of India's largest established education networks. CBSE-primary
 * curriculum with IB DP added as a senior-school option alongside the
 * larger CBSE Class 11-12 track.
 *
 * Sister-campus distinction within the DPS network:
 *   - DPS International Gurgaon (#19) → /ib-biology-tutor-dps-international-gurgaon
 *     (explicitly-international Cambridge IGCSE → IB DP campus)
 *   - DPS Faridabad (this page) → CBSE-primary with IB DP senior option
 *
 * Built from IBBiologySchoolTemplate + ibBiologySchools['dps-faridabad'].
 * Schemas via IBBiologySchoolSchemas with en-IN inLanguage so Google + LLMs
 * route the page to the right regional audience.
 *
 * Primary keyword: "IB Biology tutor DPS Faridabad" — a school-name
 * long-tail that no other page on the site targets.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'dps-faridabad'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for DPS Faridabad · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for Delhi Public School Faridabad students. CBSE-to-IB bridge, IA + EE mentorship, 2025 syllabus. IB+NEET integrated track available.',
  keywords: [
    'IB Biology tutor DPS Faridabad',
    'IB Biology tutor Delhi Public School Faridabad',
    'IB Biology coaching DPS Faridabad',
    'IB Biology HL tutor DPS Faridabad',
    'IB Biology SL tutor DPS Faridabad',
    'IB Biology IA help DPS Faridabad',
    'DPS Faridabad IB Biology tutoring',
    'IB Biology examiner DPS Faridabad',
    'IB Biology tutor near DPS Faridabad',
    'DPS International vs DPS Faridabad IB',
    'CBSE to IB Biology DPS Faridabad',
    'online IB Biology tutor Faridabad',
    'IB+NEET coaching DPS Faridabad',
  ],
  canonical: `/ib-biology-tutor-${SLUG}`,
  inLanguage: 'en-IN',
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
