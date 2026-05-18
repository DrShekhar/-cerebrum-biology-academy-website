/**
 * /ib-biology-tutor-shri-ram-faridabad
 *
 * Per-school IB Biology landing page for The Shri Ram School Faridabad
 * (TSRS Faridabad). Junior + middle-school campus in the broader TSRS
 * network; students typically transition to TSRS Aravali (Gurgaon) for
 * the senior IB Diploma Programme.
 *
 * Sister-campus pages within the TSRS network:
 *   - /ib-biology-tutor-shri-ram-aravali (entry #16) — Gurgaon senior IB DP
 *
 * Built from IBBiologySchoolTemplate + ibBiologySchools['shri-ram-faridabad'].
 * Schemas via IBBiologySchoolSchemas with en-IN inLanguage so Google + LLMs
 * route the page to the right regional audience.
 *
 * Primary keyword: "IB Biology tutor TSRS Faridabad" — a school-name
 * long-tail that no other page on the site targets.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'shri-ram-faridabad'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for TSRS Faridabad · Shri Ram School · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for The Shri Ram School Faridabad students. MYP-to-DP bridge coaching for the typical TSRS Aravali (Gurgaon) senior IB DP transition. IB+NEET integrated track available.',
  keywords: [
    'IB Biology tutor Shri Ram Faridabad',
    'IB Biology tutor TSRS Faridabad',
    'IB Biology tutor The Shri Ram School Faridabad',
    'IB Biology coaching Shri Ram Faridabad',
    'IB Biology MYP to DP transition TSRS',
    'IB Biology HL tutor TSRS Faridabad',
    'IB Biology SL tutor TSRS Faridabad',
    'TSRS Faridabad IB Biology tutoring',
    'IB Biology examiner TSRS Faridabad',
    'IB Biology tutor near TSRS Faridabad',
    'TSRS Faridabad to TSRS Aravali transition',
    'MYP5 to DP1 Biology coaching TSRS',
    'online IB Biology tutor Faridabad',
    'IB+NEET coaching TSRS Faridabad',
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
