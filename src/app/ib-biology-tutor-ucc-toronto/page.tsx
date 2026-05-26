import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'ucc-toronto'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for UCC · Toronto · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for Upper Canada College (UCC) students in Toronto. AIIMS-trained faculty, IA + EE mentorship, 2025 syllabus.',
  keywords: [
    'IB Biology tutor UCC',
    'IB Biology coaching Upper Canada College',
    'IB Biology HL tutor UCC Toronto',
    'IB Biology tutor Upper Canada College Toronto',
    'UCC IB Biology tutoring',
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
