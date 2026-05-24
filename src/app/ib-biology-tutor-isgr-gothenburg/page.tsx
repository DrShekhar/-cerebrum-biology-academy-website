import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'isgr-gothenburg'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for ISGR · Gothenburg · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for International School of the Gothenburg Region students. AIIMS-trained faculty, IA + EE mentorship, 2025 syllabus.',
  keywords: [
    'IB Biology tutor ISGR',
    'IB Biology coaching ISGR Gothenburg',
    'IB Biology HL tutor ISGR',
    'IB Biology SL tutor ISGR',
    'IB Biology IA help ISGR',
    'ISGR IB Biology tutoring',
    'online IB Biology tutor Gothenburg',
    'IB Biology tutor International School Gothenburg Region',
  ],
  canonical: `/ib-biology-tutor-${SLUG}`,
  inLanguage: 'en-SE',
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
