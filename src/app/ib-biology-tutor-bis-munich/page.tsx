import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'bis-munich'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for BIS · Munich · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for Bavarian International School students. AIIMS-trained faculty, IA + EE mentorship, 2025 syllabus.',
  keywords: [
    'IB Biology tutor BIS',
    'IB Biology coaching Bavarian International School',
    'IB Biology HL tutor BIS Munich',
    'IB Biology SL tutor BIS',
    'IB Biology IA help BIS',
    'BIS IB Biology tutoring',
    'online IB Biology tutor Munich',
    'IB Biology tutor Bavarian International School Haimhausen',
  ],
  canonical: `/ib-biology-tutor-${SLUG}`,
  inLanguage: 'en-DE',
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
