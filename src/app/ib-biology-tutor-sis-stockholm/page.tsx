import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'sis-stockholm'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for SIS · Stockholm · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for Stockholm International School students. AIIMS-trained faculty, IA + EE mentorship, 2025 syllabus.',
  keywords: [
    'IB Biology tutor SIS Stockholm',
    'IB Biology coaching Stockholm International School',
    'IB Biology HL tutor SIS',
    'IB Biology SL tutor SIS Stockholm',
    'IB Biology IA help SIS',
    'SIS IB Biology tutoring',
    'online IB Biology tutor Stockholm',
    'IB Biology tutor Stockholm International School Djurgården',
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
