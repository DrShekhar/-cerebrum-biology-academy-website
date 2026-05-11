/**
 * /ib-biology-tutor-oberoi-mumbai
 *
 * Per-school IB Biology landing page for Oberoi International School
 * (Mumbai). Built from IBBiologySchoolTemplate +
 * ibBiologySchools['oberoi-mumbai']. Schemas via IBBiologySchoolSchemas
 * with en-IN inLanguage so Google + LLMs route the
 * page to the right regional audience.
 *
 * Primary keyword: "IB Biology tutor Oberoi International" — a
 * school-name long-tail that no other page on the site targets.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'oberoi-mumbai'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for Oberoi International · Mumbai · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for Oberoi International School students in Mumbai. Examiner-led faculty, IA + EE mentorship, 2025 syllabus.',
  keywords: [
    'IB Biology tutor Oberoi International',
    'IB Biology coaching Oberoi International',
    'IB Biology HL tutor Oberoi International',
    'IB Biology SL tutor Oberoi International',
    'IB Biology IA help Oberoi International',
    'Oberoi International IB Biology tutoring',
    'IB Biology examiner Oberoi International',
    'online IB Biology tutor Mumbai',
    'IB Biology tutor Oberoi International School',
  ],
  canonical: `/ib-biology-tutor-${SLUG}`,
  inLanguage: 'en-IN',
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
