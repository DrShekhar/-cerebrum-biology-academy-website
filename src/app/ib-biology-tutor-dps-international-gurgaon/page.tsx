/**
 * /ib-biology-tutor-dps-international-gurgaon
 *
 * Per-school IB Biology landing page for DPS International School
 * (Sector 45, Gurugram) — the IB-and-Cambridge international arm of
 * the DPS network in Gurgaon, co-located with the larger CBSE DPS
 * Sector 45 flagship. IGCSE through Class 10 → IB DP at Classes 11–12.
 *
 * Built from IBBiologySchoolTemplate + ibBiologySchools['dps-international-gurgaon'].
 * Schemas via IBBiologySchoolSchemas with en-IN inLanguage so Google + LLMs
 * route the page to the right regional audience.
 *
 * Primary keyword: "IB Biology tutor DPS International Gurgaon" — a
 * school-name long-tail that no other page on the site targets.
 * Complementary to /neet-coaching-dps-international-gurugram (NEET).
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'dps-international-gurgaon'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for DPS International School · Gurgaon · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for DPS International School students, Sector 45 Gurgaon. IGCSE-to-DP bridge, IA + EE mentorship, 2025 syllabus. IB+NEET integrated track available.',
  keywords: [
    'IB Biology tutor DPS International',
    'IB Biology tutor DPS International Gurgaon',
    'IB Biology coaching DPS International Sector 45',
    'IB Biology HL tutor DPS International',
    'IB Biology SL tutor DPS International',
    'IB Biology IA help DPS International',
    'DPS International IB Biology tutoring',
    'IB Biology examiner DPS International Gurgaon',
    'IB Biology tutor Sector 45 Gurgaon',
    'IB Biology tutor near DPS International Gurgaon',
    'IGCSE to IB Biology DPS International',
    'online IB Biology tutor Gurgaon',
    'IB+NEET coaching DPS International',
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
