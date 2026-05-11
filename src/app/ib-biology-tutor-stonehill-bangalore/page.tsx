/**
 * /ib-biology-tutor-stonehill-bangalore
 *
 * Per-school IB Biology landing page for Stonehill International School
 * (Bangalore). Built from IBBiologySchoolTemplate +
 * ibBiologySchools['stonehill-bangalore']. Schemas via IBBiologySchoolSchemas
 * with en-IN inLanguage so Google + LLMs route the
 * page to the right regional audience.
 *
 * Primary keyword: "IB Biology tutor Stonehill" — a
 * school-name long-tail that no other page on the site targets.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'stonehill-bangalore'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for Stonehill · Bangalore · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for Stonehill International School students in Bangalore. Examiner-led faculty, IA + EE mentorship, 2025 syllabus.',
  keywords: [
    'IB Biology tutor Stonehill',
    'IB Biology coaching Stonehill',
    'IB Biology HL tutor Stonehill',
    'IB Biology SL tutor Stonehill',
    'IB Biology IA help Stonehill',
    'Stonehill IB Biology tutoring',
    'IB Biology examiner Stonehill',
    'online IB Biology tutor Bangalore',
    'IB Biology tutor Stonehill International School',
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
