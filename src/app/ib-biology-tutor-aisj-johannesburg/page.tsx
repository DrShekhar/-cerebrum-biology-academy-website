import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'aisj-johannesburg'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for AISJ \u00b7 Johannesburg \u00b7 Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for AISJ students in Johannesburg. Examiner-led faculty, IA + EE mentorship, 2025 syllabus, SAST live classes.',
  keywords: [
    'IB Biology tutor AISJ',
    'IB Biology tutor American International School Johannesburg',
    'IB Biology HL tutor Johannesburg',
    'IB Biology SL tutor Johannesburg',
    'IB Biology IA help Johannesburg',
    'AISJ IB Biology tutoring',
    'online IB Biology tutor South Africa',
    'IB Biology examiner Johannesburg',
  ],
  canonical: `/ib-biology-tutor-${SLUG}`,
  inLanguage: 'en-ZA',
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
