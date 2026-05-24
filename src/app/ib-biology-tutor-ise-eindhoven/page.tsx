import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'ise-eindhoven'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for ISE · Eindhoven · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for International School Eindhoven students in Brainport region. AIIMS-trained faculty, IA mentorship, 2025 syllabus.',
  keywords: [
    'IB Biology tutor ISE',
    'IB Biology coaching International School Eindhoven',
    'IB Biology HL tutor ISE Eindhoven',
    'IB Biology SL tutor ISE',
    'IB Biology IA help ISE',
    'ISE IB Biology tutoring',
    'online IB Biology tutor Eindhoven',
    'IB Biology tutor International School Eindhoven ASML',
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
