import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'aoba-japan-tokyo'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for Aoba-Japan · Tokyo · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for Aoba-Japan International School students in Tokyo. AIIMS-trained faculty, IA + EE mentorship, 2025 syllabus.',
  keywords: [
    'IB Biology tutor Aoba-Japan',
    'IB Biology coaching Aoba-Japan International School',
    'IB Biology HL tutor Aoba-Japan Tokyo',
    'IB Biology SL tutor Aoba-Japan',
    'IB Biology IA help Aoba-Japan',
    'Aoba-Japan IB Biology tutoring',
    'online IB Biology tutor Tokyo',
    'IB Biology tutor Aoba-Japan International School Tokyo',
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
