import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'international-college-spain-madrid'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for International College Spain \u00b7 Madrid \u00b7 Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for International College Spain students in Madrid. Examiner-led faculty, IA + EE mentorship, 2025 syllabus, CET live classes.',
  keywords: [
    'IB Biology tutor International College Spain',
    'IB Biology tutor Madrid',
    'IB Biology HL tutor Madrid',
    'IB Biology SL tutor Madrid',
    'IB Biology IA help Madrid',
    'ICS Madrid IB Biology tutoring',
    'online IB Biology tutor Spain',
    'IB Biology examiner Madrid',
  ],
  canonical: `/ib-biology-tutor-${SLUG}`,
  inLanguage: 'en-ES',
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
