import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'ridley-college'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for Ridley College · St. Catharines · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for Ridley College boarding students. AIIMS-trained faculty, IA + EE mentorship, 2025 syllabus.',
  keywords: [
    'IB Biology tutor Ridley College',
    'IB Biology coaching Ridley',
    'IB Biology HL tutor Ridley College',
    'Ridley College IB Biology tutoring',
    'online IB Biology tutor St Catharines',
  ],
  canonical: `/ib-biology-tutor-${SLUG}`,
  inLanguage: 'en-CA',
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
