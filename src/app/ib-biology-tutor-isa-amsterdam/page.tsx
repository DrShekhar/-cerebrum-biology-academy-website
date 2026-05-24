import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'isa-amsterdam'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for ISA · Amsterdam · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for International School of Amsterdam students. AIIMS-trained faculty, IA + EE mentorship, 2025 syllabus.',
  keywords: [
    'IB Biology tutor ISA',
    'IB Biology coaching International School Amsterdam',
    'IB Biology HL tutor ISA Amsterdam',
    'IB Biology SL tutor ISA',
    'IB Biology IA help ISA',
    'ISA IB Biology tutoring',
    'online IB Biology tutor Amsterdam',
    'IB Biology tutor International School of Amsterdam Amstelveen',
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
