/**
 * /ib-biology-tutor-inventure-bangalore
 *
 * Per-school IB Biology landing page for Inventure Academy
 * (Bangalore). Built from IBBiologySchoolTemplate +
 * ibBiologySchools['inventure-bangalore']. Schemas via IBBiologySchoolSchemas
 * with en-IN inLanguage so Google + LLMs route the
 * page to the right regional audience.
 *
 * Primary keyword: "IB Biology tutor Inventure" — a
 * school-name long-tail that no other page on the site targets.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'inventure-bangalore'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for Inventure · Bangalore · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for Inventure Academy students in Bangalore. Examiner-led faculty, IA + EE mentorship, 2025 syllabus.',
  keywords: [
    'IB Biology tutor Inventure',
    'IB Biology coaching Inventure',
    'IB Biology HL tutor Inventure',
    'IB Biology SL tutor Inventure',
    'IB Biology IA help Inventure',
    'Inventure IB Biology tutoring',
    'IB Biology examiner Inventure',
    'online IB Biology tutor Bangalore',
    'IB Biology tutor Inventure Academy',
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
