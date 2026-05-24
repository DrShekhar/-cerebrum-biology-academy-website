import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'nord-anglia-dublin'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for NAIS Dublin · Ireland · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for Nord Anglia International School Dublin students. AIIMS-trained faculty, IA + EE mentorship, 2025 syllabus.',
  keywords: [
    'IB Biology tutor NAIS Dublin',
    'IB Biology coaching Nord Anglia Dublin',
    'IB Biology HL tutor NAIS Dublin',
    'IB Biology SL tutor NAIS Dublin',
    'IB Biology IA help NAIS Dublin',
    'NAIS Dublin IB Biology tutoring',
    'online IB Biology tutor Dublin',
    'IB Biology tutor Nord Anglia International School Dublin',
  ],
  canonical: `/ib-biology-tutor-${SLUG}`,
  inLanguage: 'en-IE',
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
