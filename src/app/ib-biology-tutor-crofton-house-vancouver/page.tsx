import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'crofton-house-vancouver'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for Crofton House · Vancouver · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for Crofton House School students in Vancouver. AIIMS-trained faculty, IA + EE mentorship, 2025 syllabus.',
  keywords: [
    'IB Biology tutor Crofton House',
    'IB Biology coaching Crofton House Vancouver',
    'IB Biology HL tutor Crofton House',
    'Crofton House IB Biology tutoring',
    'online IB Biology tutor Vancouver',
  ],
  canonical: `/ib-biology-tutor-${SLUG}`,
  inLanguage: 'en-CA',
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
