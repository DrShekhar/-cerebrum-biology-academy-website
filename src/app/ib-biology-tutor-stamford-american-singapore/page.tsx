/**
 * /ib-biology-tutor-stamford-american-singapore
 *
 * Per-school IB Biology landing page for Stamford American International School
 * (Singapore). Built from IBBiologySchoolTemplate +
 * ibBiologySchools['stamford-american-singapore']. Schemas via IBBiologySchoolSchemas
 * with en-SG inLanguage so Google + LLMs route the
 * page to the right regional audience.
 *
 * Primary keyword: "IB Biology tutor Stamford American" — a
 * school-name long-tail that no other page on the site targets.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'stamford-american-singapore'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for Stamford American · Singapore · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for Stamford American International School students in Singapore. Examiner-led faculty, IA + EE mentorship, 2025 syllabus.',
  keywords: [
    'IB Biology tutor Stamford American',
    'IB Biology coaching Stamford American',
    'IB Biology HL tutor Stamford American',
    'IB Biology SL tutor Stamford American',
    'IB Biology IA help Stamford American',
    'Stamford American IB Biology tutoring',
    'IB Biology examiner Stamford American',
    'online IB Biology tutor Singapore',
    'IB Biology tutor Stamford American International School',
  ],
  canonical: `/ib-biology-tutor-${SLUG}`,
  inLanguage: 'en-SG',
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
