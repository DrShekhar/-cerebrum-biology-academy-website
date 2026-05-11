/**
 * /ib-biology-tutor-tanglin-trust
 *
 * Per-school IB Biology landing page for Tanglin Trust School
 * (Singapore). Built from IBBiologySchoolTemplate +
 * ibBiologySchools['tanglin-trust']. Schemas via IBBiologySchoolSchemas
 * with en-SG inLanguage so Google + LLMs route the
 * page to the right regional audience.
 *
 * Primary keyword: "IB Biology tutor Tanglin Trust" — a
 * school-name long-tail that no other page on the site targets.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'tanglin-trust'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for Tanglin Trust · Singapore · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for Tanglin Trust School students in Singapore. Examiner-led faculty, IA + EE mentorship, 2025 syllabus.',
  keywords: [
    'IB Biology tutor Tanglin Trust',
    'IB Biology coaching Tanglin Trust',
    'IB Biology HL tutor Tanglin Trust',
    'IB Biology SL tutor Tanglin Trust',
    'IB Biology IA help Tanglin Trust',
    'Tanglin Trust IB Biology tutoring',
    'IB Biology examiner Tanglin Trust',
    'online IB Biology tutor Singapore',
    'IB Biology tutor Tanglin Trust School',
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
