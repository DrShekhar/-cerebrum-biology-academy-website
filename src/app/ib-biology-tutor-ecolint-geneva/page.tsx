import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'ecolint-geneva'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for Ecolint · Geneva · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for International School of Geneva (Ecolint) students. AIIMS-trained faculty, IA + EE mentorship, 2025 syllabus.',
  keywords: [
    'IB Biology tutor Ecolint',
    'IB Biology coaching Ecolint Geneva',
    'IB Biology HL tutor International School of Geneva',
    'IB Biology SL tutor Ecolint',
    'IB Biology IA help Ecolint',
    'Ecolint IB Biology tutoring',
    'online IB Biology tutor Geneva',
    'IB Biology tutor International School of Geneva',
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
