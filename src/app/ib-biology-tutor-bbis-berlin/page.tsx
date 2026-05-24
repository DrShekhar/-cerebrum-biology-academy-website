import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'bbis-berlin'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for BBIS · Berlin · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for Berlin Brandenburg International School students. AIIMS-trained faculty, IA + EE mentorship, 2025 syllabus.',
  keywords: [
    'IB Biology tutor BBIS',
    'IB Biology coaching Berlin Brandenburg International School',
    'IB Biology HL tutor BBIS Berlin',
    'IB Biology SL tutor BBIS',
    'IB Biology IA help BBIS',
    'BBIS IB Biology tutoring',
    'online IB Biology tutor Berlin',
    'IB Biology tutor Berlin Brandenburg International School',
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
