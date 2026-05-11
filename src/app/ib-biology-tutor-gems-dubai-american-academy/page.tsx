/**
 * /ib-biology-tutor-gems-dubai-american-academy
 *
 * Per-school IB Biology landing page for GEMS Dubai American Academy
 * (Dubai, UAE). Built from IBBiologySchoolTemplate +
 * ibBiologySchools['gems-dubai-american-academy']. Schemas via IBBiologySchoolSchemas
 * with en-AE inLanguage so Google + LLMs route the
 * page to the right regional audience.
 *
 * Primary keyword: "IB Biology tutor GEMS DAA" — a
 * school-name long-tail that no other page on the site targets.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'gems-dubai-american-academy'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for GEMS DAA · Dubai, UAE · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for GEMS Dubai American Academy students in Dubai, UAE. Examiner-led faculty, IA + EE mentorship, 2025 syllabus.',
  keywords: [
    'IB Biology tutor GEMS DAA',
    'IB Biology coaching GEMS DAA',
    'IB Biology HL tutor GEMS DAA',
    'IB Biology SL tutor GEMS DAA',
    'IB Biology IA help GEMS DAA',
    'GEMS DAA IB Biology tutoring',
    'IB Biology examiner GEMS DAA',
    'online IB Biology tutor Dubai, UAE',
    'IB Biology tutor GEMS Dubai American Academy',
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
