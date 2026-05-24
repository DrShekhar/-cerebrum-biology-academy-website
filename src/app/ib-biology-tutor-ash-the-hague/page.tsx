import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'ash-the-hague'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for ASH · The Hague · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for American School of The Hague students. AIIMS-trained faculty, IA + EE mentorship, 2025 syllabus.',
  keywords: [
    'IB Biology tutor ASH',
    'IB Biology coaching American School The Hague',
    'IB Biology HL tutor ASH The Hague',
    'IB Biology SL tutor ASH',
    'IB Biology IA help ASH',
    'ASH IB Biology tutoring',
    'online IB Biology tutor The Hague',
    'IB Biology tutor American School of The Hague Wassenaar',
  ],
  canonical: `/ib-biology-tutor-${SLUG}`,
  inLanguage: 'en-NL',
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
