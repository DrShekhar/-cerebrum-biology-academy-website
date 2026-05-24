import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'kis-seoul'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for KIS · Seoul · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for Korea International School (KIS) students in Seoul. AIIMS-trained faculty, IA + EE mentorship, 2025 syllabus.',
  keywords: [
    'IB Biology tutor KIS',
    'IB Biology coaching Korea International School',
    'IB Biology HL tutor KIS Seoul',
    'IB Biology SL tutor KIS',
    'IB Biology IA help KIS',
    'KIS IB Biology tutoring',
    'online IB Biology tutor Seoul',
    'IB Biology tutor Korea International School Pangyo',
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
