import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'st-pauls-school-sao-paulo'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: "IB Biology Tutor for St Paul's School \u00b7 S\u00e3o Paulo \u00b7 Cerebrum",
  description:
    "IB Biology HL & SL 1:1 tutoring for St Paul's School students in S\u00e3o Paulo. Examiner-led faculty, IA + EE mentorship, 2025 syllabus, BRT live classes.",
  keywords: [
    "IB Biology tutor St Paul's School",
    'IB Biology tutor Sao Paulo',
    'IB Biology HL tutor Sao Paulo',
    'IB Biology SL tutor Sao Paulo',
    'IB Biology IA help Sao Paulo',
    "St Paul's School IB Biology tutoring",
    'online IB Biology tutor Brazil',
    'IB Biology examiner Sao Paulo',
  ],
  canonical: `/ib-biology-tutor-${SLUG}`,
  inLanguage: 'en-BR',
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
