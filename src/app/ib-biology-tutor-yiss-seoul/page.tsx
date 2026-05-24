import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'yiss-seoul'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for YISS · Seoul · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for Yongsan International School of Seoul students. AIIMS-trained faculty, IA + EE mentorship, 2025 syllabus.',
  keywords: [
    'IB Biology tutor YISS',
    'IB Biology coaching Yongsan International School Seoul',
    'IB Biology HL tutor YISS Seoul',
    'IB Biology SL tutor YISS',
    'IB Biology IA help YISS',
    'YISS IB Biology tutoring',
    'online IB Biology tutor Seoul',
    'IB Biology tutor Yongsan International School of Seoul',
  ],
  canonical: `/ib-biology-tutor-${SLUG}`,
  inLanguage: 'en-KR',
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
