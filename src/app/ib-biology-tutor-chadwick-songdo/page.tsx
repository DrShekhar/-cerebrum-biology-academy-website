import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'chadwick-songdo'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for Chadwick Songdo · Korea · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for Chadwick International Songdo students. AIIMS-trained faculty, IA + EE mentorship, 2025 syllabus.',
  keywords: [
    'IB Biology tutor Chadwick Songdo',
    'IB Biology coaching Chadwick International',
    'IB Biology HL tutor Chadwick Songdo',
    'IB Biology SL tutor Chadwick',
    'IB Biology IA help Chadwick International',
    'Chadwick IB Biology tutoring',
    'online IB Biology tutor Incheon',
    'IB Biology tutor Chadwick International Songdo Korea',
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
