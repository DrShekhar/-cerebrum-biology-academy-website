import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'isd-duesseldorf'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for ISD · Düsseldorf · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for International School of Düsseldorf students. AIIMS-trained faculty, IA + EE mentorship, 2025 syllabus.',
  keywords: [
    'IB Biology tutor ISD',
    'IB Biology coaching International School Düsseldorf',
    'IB Biology HL tutor ISD Düsseldorf',
    'IB Biology SL tutor ISD',
    'IB Biology IA help ISD',
    'ISD IB Biology tutoring',
    'online IB Biology tutor Düsseldorf',
    'IB Biology tutor International School of Düsseldorf',
  ],
  canonical: `/ib-biology-tutor-${SLUG}`,
  inLanguage: 'en-DE',
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
