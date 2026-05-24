import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'bsn-the-hague'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for BSN · The Hague · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for British School in the Netherlands students. AIIMS-trained faculty, IA + EE mentorship, 2025 syllabus.',
  keywords: [
    'IB Biology tutor BSN',
    'IB Biology coaching British School Netherlands',
    'IB Biology HL tutor BSN The Hague',
    'IB Biology SL tutor BSN',
    'IB Biology IA help BSN',
    'BSN IB Biology tutoring',
    'online IB Biology tutor The Hague',
    'IB Biology tutor British School in the Netherlands',
  ],
  canonical: `/ib-biology-tutor-${SLUG}`,
  inLanguage: 'en-NL',
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
