import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'rangitoto-college-auckland'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for Rangitoto College \u00b7 Auckland \u00b7 Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for Rangitoto College students in Auckland. Examiner-led faculty, IA + EE mentorship, 2025 syllabus, NZST live classes.',
  keywords: [
    'IB Biology tutor Rangitoto College',
    'IB Biology tutor Auckland',
    'IB Biology HL tutor Auckland',
    'IB Biology SL tutor Auckland',
    'IB Biology IA help Rangitoto',
    'Rangitoto College IB Biology tutoring',
    'online IB Biology tutor New Zealand',
    'IB Biology examiner Auckland',
  ],
  canonical: `/ib-biology-tutor-${SLUG}`,
  inLanguage: 'en-NZ',
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
