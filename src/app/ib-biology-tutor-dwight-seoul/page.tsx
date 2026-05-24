import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'dwight-seoul'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for Dwight Seoul · Korea · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for Dwight School Seoul students. AIIMS-trained faculty, IA + EE mentorship, 2025 syllabus.',
  keywords: [
    'IB Biology tutor Dwight Seoul',
    'IB Biology coaching Dwight School Seoul',
    'IB Biology HL tutor Dwight Seoul',
    'IB Biology SL tutor Dwight Seoul',
    'IB Biology IA help Dwight Seoul',
    'Dwight Seoul IB Biology tutoring',
    'online IB Biology tutor Seoul',
    'IB Biology tutor Dwight School Seoul Korea',
  ],
  canonical: `/ib-biology-tutor-${SLUG}`,
  inLanguage: 'en-KR',
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
