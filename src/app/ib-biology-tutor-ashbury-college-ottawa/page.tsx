import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'ashbury-college-ottawa'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for Ashbury College · Ottawa · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for Ashbury College students in Ottawa. AIIMS-trained faculty, IA + EE mentorship, 2025 syllabus.',
  keywords: [
    'IB Biology tutor Ashbury College',
    'IB Biology coaching Ashbury Ottawa',
    'IB Biology HL tutor Ashbury',
    'Ashbury College IB Biology tutoring',
    'online IB Biology tutor Ottawa',
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
