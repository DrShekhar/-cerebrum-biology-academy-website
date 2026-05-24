import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'college-du-leman-geneva'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for Collège du Léman · Geneva · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for Collège du Léman students in Versoix, Geneva. AIIMS-trained faculty, IA mentorship, 2025 syllabus.',
  keywords: [
    'IB Biology tutor Collège du Léman',
    'IB Biology coaching CDL Geneva',
    'IB Biology HL tutor CDL',
    'IB Biology SL tutor Collège du Léman',
    'IB Biology IA help CDL',
    'CDL IB Biology tutoring',
    'online IB Biology tutor Geneva',
    'IB Biology tutor CDL Versoix',
  ],
  canonical: `/ib-biology-tutor-${SLUG}`,
  inLanguage: 'en-CH',
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
