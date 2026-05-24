import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'fis-frankfurt'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for FIS · Frankfurt · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for Frankfurt International School students. AIIMS-trained faculty, IA + EE mentorship, 2025 syllabus.',
  keywords: [
    'IB Biology tutor FIS',
    'IB Biology coaching Frankfurt International School',
    'IB Biology HL tutor FIS Frankfurt',
    'IB Biology SL tutor FIS',
    'IB Biology IA help FIS',
    'FIS IB Biology tutoring',
    'online IB Biology tutor Frankfurt',
    'IB Biology tutor Frankfurt International School',
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
