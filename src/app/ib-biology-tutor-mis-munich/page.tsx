import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'mis-munich'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for MIS · Munich · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for Munich International School students. AIIMS-trained faculty, IA + EE mentorship, 2025 syllabus.',
  keywords: [
    'IB Biology tutor MIS',
    'IB Biology coaching Munich International School',
    'IB Biology HL tutor MIS Munich',
    'IB Biology SL tutor MIS',
    'IB Biology IA help MIS',
    'MIS IB Biology tutoring',
    'online IB Biology tutor Munich',
    'IB Biology tutor Munich International School Starnberg',
  ],
  canonical: `/ib-biology-tutor-${SLUG}`,
  inLanguage: 'en-DE',
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
