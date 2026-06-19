import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'redlands-sydney'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: "IB Biology Tutor for Redlands \u00b7 Sydney \u00b7 Cerebrum",
  description: "IB Biology HL & SL 1:1 tutoring for Redlands students in Sydney. Examiner-led faculty, IA + EE mentorship, 2025 syllabus, AEST live classes.",
  keywords: ["IB Biology tutor Redlands", "IB Biology tutor SCECGS Redlands", "IB Biology HL tutor Sydney", "IB Biology SL tutor Sydney", "IB Biology IA help Redlands", "Redlands IB Biology tutoring", "online IB Biology tutor Sydney", "IB Biology examiner Sydney"],
  canonical: `/ib-biology-tutor-${SLUG}`,
  inLanguage: 'en-AU',
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
