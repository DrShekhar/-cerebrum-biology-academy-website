import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'branksome-hall-toronto'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for Branksome Hall · Toronto · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for Branksome Hall students in Toronto. AIIMS-trained faculty, IA + EE mentorship, 2025 syllabus.',
  keywords: [
    'IB Biology tutor Branksome Hall',
    'IB Biology coaching Branksome Hall Toronto',
    'IB Biology HL tutor Branksome Hall',
    'Branksome Hall IB Biology tutoring',
    'online IB Biology tutor Toronto',
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
