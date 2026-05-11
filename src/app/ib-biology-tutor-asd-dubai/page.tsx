/**
 * /ib-biology-tutor-asd-dubai
 *
 * Per-school IB Biology landing page for American School of Dubai
 * (Dubai, UAE). Built from IBBiologySchoolTemplate +
 * ibBiologySchools['asd-dubai']. Schemas via IBBiologySchoolSchemas
 * with en-AE inLanguage so Google + LLMs route the
 * page to the right regional audience.
 *
 * Primary keyword: "IB Biology tutor ASD Dubai" — a
 * school-name long-tail that no other page on the site targets.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'asd-dubai'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for ASD Dubai · Dubai, UAE · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for American School of Dubai students in Dubai, UAE. Examiner-led faculty, IA + EE mentorship, 2025 syllabus.',
  keywords: [
    'IB Biology tutor ASD Dubai',
    'IB Biology coaching ASD Dubai',
    'IB Biology HL tutor ASD Dubai',
    'IB Biology SL tutor ASD Dubai',
    'IB Biology IA help ASD Dubai',
    'ASD Dubai IB Biology tutoring',
    'IB Biology examiner ASD Dubai',
    'online IB Biology tutor Dubai, UAE',
    'IB Biology tutor American School of Dubai',
  ],
  canonical: `/ib-biology-tutor-${SLUG}`,
  inLanguage: 'en-AE',
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
