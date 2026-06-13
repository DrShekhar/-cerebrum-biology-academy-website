import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'kings-wimbledon'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for KCS Wimbledon · London · Cerebrum',
  description:
    "IB Biology HL & SL tutoring for King's College School Wimbledon students. AIIMS-trained faculty, IA + EE mentorship.",
  keywords: [
    'IB Biology tutor KCS Wimbledon',
    'IB Biology coaching Kings Wimbledon',
    'Kings College School IB Biology tutoring',
    'online IB Biology tutor Wimbledon',
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
