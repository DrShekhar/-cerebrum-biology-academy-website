import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'international-school-of-milan'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for International School of Milan \u00b7 Milan \u00b7 Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for International School of Milan students in Milan. Examiner-led faculty, IA + EE mentorship, 2025 syllabus, CET live classes.',
  keywords: [
    'IB Biology tutor International School of Milan',
    'IB Biology tutor Milan',
    'IB Biology HL tutor Milan',
    'IB Biology SL tutor Milan',
    'IB Biology IA help Milan',
    'ISM Milan IB Biology tutoring',
    'online IB Biology tutor Italy',
    'IB Biology examiner Milan',
  ],
  canonical: `/ib-biology-tutor-${SLUG}`,
  inLanguage: 'en-IT',
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
