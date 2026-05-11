/**
 * /ib-biology-tutor-uwcsea
 *
 * Per-school IB Biology landing page for United World College of South East Asia
 * (Singapore). Built from IBBiologySchoolTemplate +
 * ibBiologySchools['uwcsea']. Schemas via IBBiologySchoolSchemas
 * with en-SG inLanguage so Google + LLMs route the
 * page to the right regional audience.
 *
 * Primary keyword: "IB Biology tutor UWCSEA" — a
 * school-name long-tail that no other page on the site targets.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'uwcsea'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for UWCSEA · Singapore · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for United World College of South East Asia students in Singapore. Examiner-led faculty, IA + EE mentorship, 2025 syllabus.',
  keywords: [
    'IB Biology tutor UWCSEA',
    'IB Biology coaching UWCSEA',
    'IB Biology HL tutor UWCSEA',
    'IB Biology SL tutor UWCSEA',
    'IB Biology IA help UWCSEA',
    'UWCSEA IB Biology tutoring',
    'IB Biology examiner UWCSEA',
    'online IB Biology tutor Singapore',
    'IB Biology tutor United World College of South East Asia',
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
