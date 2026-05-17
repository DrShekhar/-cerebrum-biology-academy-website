/**
 * /ib-biology-tutor-scottish-high-gurgaon
 *
 * Per-school IB Biology landing page for Scottish High International
 * School (Sector 57 / G Block, Sushant Lok II, Gurugram). Co-ed day
 * school founded by Shomie Das (former Doon School + Mayo College
 * principal) with a multi-curriculum senior school: CBSE + Cambridge
 * IGCSE/A-Levels + IB DP run in parallel.
 *
 * Built from IBBiologySchoolTemplate + ibBiologySchools['scottish-high-gurgaon'].
 * Schemas via IBBiologySchoolSchemas with en-IN inLanguage so Google + LLMs
 * route the page to the right regional audience.
 *
 * Primary keyword: "IB Biology tutor Scottish High" — a school-name
 * long-tail that no other page on the site targets.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'scottish-high-gurgaon'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for Scottish High International · Gurgaon · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for Scottish High International School students, Sector 57 Gurgaon. Examiner-led faculty, IA + EE mentorship, 2025 syllabus. IB+NEET integrated track available.',
  keywords: [
    'IB Biology tutor Scottish High',
    'IB Biology tutor Scottish High International',
    'IB Biology coaching Scottish High Gurgaon',
    'IB Biology HL tutor Scottish High',
    'IB Biology SL tutor Scottish High',
    'IB Biology IA help Scottish High',
    'Scottish High IB Biology tutoring',
    'IB Biology examiner Scottish High Gurgaon',
    'IB Biology tutor Sector 57 Gurgaon',
    'IB Biology tutor Sushant Lok II',
    'IB Biology tutor near Scottish High Gurgaon',
    'IB vs A-Level Biology Scottish High',
    'online IB Biology tutor Gurgaon',
    'IB+NEET coaching Scottish High',
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
