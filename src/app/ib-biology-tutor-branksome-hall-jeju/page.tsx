import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'branksome-hall-jeju'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for Branksome Hall Asia · Jeju · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for Branksome Hall Asia students on Jeju Island. AIIMS-trained faculty, IA + EE mentorship, 2025 syllabus.',
  keywords: [
    'IB Biology tutor Branksome Hall Asia',
    'IB Biology coaching Branksome Hall Jeju',
    'IB Biology HL tutor Branksome Jeju',
    'IB Biology SL tutor Branksome Hall Asia',
    'IB Biology IA help Branksome Jeju',
    'Branksome Hall Asia IB Biology tutoring',
    'online IB Biology tutor Jeju',
    'IB Biology tutor Branksome Hall Asia Jeju Island',
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
