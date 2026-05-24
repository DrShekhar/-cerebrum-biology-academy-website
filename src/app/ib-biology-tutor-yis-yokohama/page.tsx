import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'yis-yokohama'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for YIS · Yokohama · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for Yokohama International School students. AIIMS-trained faculty, IA + EE mentorship, 2025 syllabus.',
  keywords: [
    'IB Biology tutor YIS',
    'IB Biology coaching Yokohama International School',
    'IB Biology HL tutor YIS Yokohama',
    'IB Biology SL tutor YIS',
    'IB Biology IA help YIS',
    'YIS IB Biology tutoring',
    'online IB Biology tutor Yokohama',
    'IB Biology tutor Yokohama International School',
  ],
  canonical: `/ib-biology-tutor-${SLUG}`,
  inLanguage: 'en-JP',
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
