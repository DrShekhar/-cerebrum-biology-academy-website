import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'asij-tokyo'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for ASIJ · Tokyo · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for American School in Japan (ASIJ) students in Tokyo. AIIMS-trained faculty, IA + EE mentorship, 2025 syllabus.',
  keywords: [
    'IB Biology tutor ASIJ',
    'IB Biology coaching ASIJ Tokyo',
    'IB Biology HL tutor American School in Japan',
    'IB Biology SL tutor ASIJ',
    'IB Biology IA help ASIJ',
    'ASIJ IB Biology tutoring',
    'online IB Biology tutor Tokyo',
    'IB Biology tutor American School in Japan Tokyo',
  ],
  canonical: `/ib-biology-tutor-${SLUG}`,
  inLanguage: 'en-JP',
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
