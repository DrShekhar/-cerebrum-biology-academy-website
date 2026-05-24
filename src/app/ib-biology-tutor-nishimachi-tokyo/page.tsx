import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'nishimachi-tokyo'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for Nishimachi · Tokyo · Cerebrum',
  description:
    'IB Biology MYP-to-DP bridge tutoring for Nishimachi International School students in Tokyo. AIIMS-trained faculty, summer bridge programme.',
  keywords: [
    'IB Biology tutor Nishimachi',
    'IB Biology coaching Nishimachi Tokyo',
    'IB Biology MYP bridge Nishimachi',
    'Nishimachi IB Biology tutoring',
    'online IB Biology tutor Tokyo',
    'IB Biology tutor Nishimachi International School',
    'MYP to DP Biology bridge Tokyo',
    'Nishimachi science tutoring',
  ],
  canonical: `/ib-biology-tutor-${SLUG}`,
  inLanguage: 'en-JP',
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
