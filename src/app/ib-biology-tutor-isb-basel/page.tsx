import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'isb-basel'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for ISB Basel · Switzerland · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for International School Basel students in Switzerland pharma capital. AIIMS-trained faculty, IA mentorship, 2025 syllabus.',
  keywords: [
    'IB Biology tutor ISB Basel',
    'IB Biology coaching International School Basel',
    'IB Biology HL tutor ISB',
    'IB Biology SL tutor ISB Basel',
    'IB Biology IA help ISB Basel',
    'ISB IB Biology tutoring',
    'online IB Biology tutor Basel',
    'IB Biology tutor International School Basel',
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
