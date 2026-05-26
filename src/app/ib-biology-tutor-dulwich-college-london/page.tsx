import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'dulwich-college-london'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for Dulwich College · London · Cerebrum',
  description: 'IB Biology HL & SL tutoring for Dulwich College students in south London. AIIMS-trained faculty, IA + EE mentorship.',
  keywords: [
    'IB Biology tutor Dulwich College',
    'IB Biology coaching Dulwich London',
    'Dulwich College IB Biology tutoring',
    'online IB Biology tutor south London',
  ],
  canonical: `/ib-biology-tutor-${SLUG}`,
  inLanguage: 'en-GB',
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
