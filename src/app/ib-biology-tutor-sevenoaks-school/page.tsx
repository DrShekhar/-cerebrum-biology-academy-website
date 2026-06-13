import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'sevenoaks-school'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for Sevenoaks School · Kent · Cerebrum',
  description:
    "IB Biology HL & SL tutoring for Sevenoaks School students — UK's first IB school. AIIMS-trained faculty, IA + EE mentorship.",
  keywords: [
    'IB Biology tutor Sevenoaks',
    'IB Biology coaching Sevenoaks School',
    'Sevenoaks IB Biology tutoring',
    'online IB Biology tutor Kent',
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
