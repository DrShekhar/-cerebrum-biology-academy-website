import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'saint-maur-yokohama'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for Saint Maur · Yokohama · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for Saint Maur International School students in Yokohama. AIIMS-trained faculty, IA + EE mentorship, 2025 syllabus.',
  keywords: [
    'IB Biology tutor Saint Maur',
    'IB Biology coaching Saint Maur Yokohama',
    'IB Biology HL tutor Saint Maur',
    'IB Biology SL tutor Saint Maur Yokohama',
    'IB Biology IA help Saint Maur',
    'Saint Maur IB Biology tutoring',
    'online IB Biology tutor Yokohama',
    'IB Biology tutor Saint Maur International School',
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
