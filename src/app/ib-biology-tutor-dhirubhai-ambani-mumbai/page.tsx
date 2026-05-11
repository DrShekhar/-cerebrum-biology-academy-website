/**
 * /ib-biology-tutor-dhirubhai-ambani-mumbai
 *
 * Per-school IB Biology landing page for Dhirubhai Ambani International School
 * (Mumbai). Built from IBBiologySchoolTemplate +
 * ibBiologySchools['dhirubhai-ambani-mumbai']. Schemas via IBBiologySchoolSchemas
 * with en-IN inLanguage so Google + LLMs route the
 * page to the right regional audience.
 *
 * Primary keyword: "IB Biology tutor DAIS Mumbai" — a
 * school-name long-tail that no other page on the site targets.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'dhirubhai-ambani-mumbai'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for DAIS Mumbai · Mumbai · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for Dhirubhai Ambani International School students in Mumbai. Examiner-led faculty, IA + EE mentorship, 2025 syllabus.',
  keywords: [
    'IB Biology tutor DAIS Mumbai',
    'IB Biology coaching DAIS Mumbai',
    'IB Biology HL tutor DAIS Mumbai',
    'IB Biology SL tutor DAIS Mumbai',
    'IB Biology IA help DAIS Mumbai',
    'DAIS Mumbai IB Biology tutoring',
    'IB Biology examiner DAIS Mumbai',
    'online IB Biology tutor Mumbai',
    'IB Biology tutor Dhirubhai Ambani International School',
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
