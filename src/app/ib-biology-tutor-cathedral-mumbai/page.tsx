/**
 * /ib-biology-tutor-cathedral-mumbai
 *
 * Per-school IB Biology landing page for The Cathedral and John Connon School
 * (Mumbai). Built from IBBiologySchoolTemplate +
 * ibBiologySchools['cathedral-mumbai']. Schemas via IBBiologySchoolSchemas
 * with en-IN inLanguage so Google + LLMs route the
 * page to the right regional audience.
 *
 * Primary keyword: "IB Biology tutor Cathedral School" — a
 * school-name long-tail that no other page on the site targets.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'cathedral-mumbai'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for Cathedral School · Mumbai · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for The Cathedral and John Connon School students in Mumbai. Examiner-led faculty, IA + EE mentorship, 2025 syllabus.',
  keywords: [
    'IB Biology tutor Cathedral School',
    'IB Biology coaching Cathedral School',
    'IB Biology HL tutor Cathedral School',
    'IB Biology SL tutor Cathedral School',
    'IB Biology IA help Cathedral School',
    'Cathedral School IB Biology tutoring',
    'IB Biology examiner Cathedral School',
    'online IB Biology tutor Mumbai',
    'IB Biology tutor The Cathedral and John Connon School',
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
