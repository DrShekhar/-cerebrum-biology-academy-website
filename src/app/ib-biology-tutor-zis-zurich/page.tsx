import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'zis-zurich'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for ZIS · Zurich · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for Zurich International School students. AIIMS-trained faculty, IA + EE mentorship, 2025 syllabus.',
  keywords: [
    'IB Biology tutor ZIS',
    'IB Biology coaching Zurich International School',
    'IB Biology HL tutor ZIS',
    'IB Biology SL tutor ZIS Zurich',
    'IB Biology IA help ZIS',
    'ZIS IB Biology tutoring',
    'online IB Biology tutor Zurich',
    'IB Biology tutor Zurich International School',
  ],
  canonical: `/ib-biology-tutor-${SLUG}`,
  inLanguage: 'en-CH',
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
