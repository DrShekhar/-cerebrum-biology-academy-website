/**
 * /ib-biology-tutor-nist-bangkok
 *
 * Per-school IB Biology landing page for NIST International School Bangkok
 * (Bangkok). Built from IBBiologySchoolTemplate +
 * ibBiologySchools['nist-bangkok']. Schemas via IBBiologySchoolSchemas
 * with en-TH inLanguage so Google + LLMs route the
 * page to the right regional audience.
 *
 * Primary keyword: "IB Biology tutor NIST" — a
 * school-name long-tail that no other page on the site targets.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'nist-bangkok'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for NIST · Bangkok · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for NIST International School Bangkok students in Bangkok. Examiner-led faculty, IA + EE mentorship, 2025 syllabus.',
  keywords: [
    'IB Biology tutor NIST',
    'IB Biology coaching NIST',
    'IB Biology HL tutor NIST',
    'IB Biology SL tutor NIST',
    'IB Biology IA help NIST',
    'NIST IB Biology tutoring',
    'IB Biology examiner NIST',
    'online IB Biology tutor Bangkok',
    'IB Biology tutor NIST International School Bangkok',
  ],
  canonical: `/ib-biology-tutor-${SLUG}`,
  inLanguage: 'en-TH',
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
