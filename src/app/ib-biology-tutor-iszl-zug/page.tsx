import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'iszl-zug'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for ISZL · Zug · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for International School of Zug and Luzern students. AIIMS-trained faculty, IA + EE mentorship, 2025 syllabus.',
  keywords: [
    'IB Biology tutor ISZL',
    'IB Biology coaching ISZL Zug',
    'IB Biology HL tutor ISZL',
    'IB Biology SL tutor ISZL',
    'IB Biology IA help International School Zug Luzern',
    'ISZL IB Biology tutoring',
    'online IB Biology tutor Zug',
    'IB Biology tutor International School of Zug and Luzern',
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
