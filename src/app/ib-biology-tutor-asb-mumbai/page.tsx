/**
 * /ib-biology-tutor-asb-mumbai
 *
 * Per-school IB Biology landing page for American School of Bombay
 * (Mumbai). Built from IBBiologySchoolTemplate +
 * ibBiologySchools['asb-mumbai']. Schemas via IBBiologySchoolSchemas
 * with en-IN inLanguage so Google + LLMs route the
 * page to the right regional audience.
 *
 * Primary keyword: "IB Biology tutor ASB Mumbai" — a
 * school-name long-tail that no other page on the site targets.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'asb-mumbai'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for ASB Mumbai · Mumbai · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for American School of Bombay students in Mumbai. Examiner-led faculty, IA + EE mentorship, 2025 syllabus.',
  keywords: [
    'IB Biology tutor ASB Mumbai',
    'IB Biology coaching ASB Mumbai',
    'IB Biology HL tutor ASB Mumbai',
    'IB Biology SL tutor ASB Mumbai',
    'IB Biology IA help ASB Mumbai',
    'ASB Mumbai IB Biology tutoring',
    'IB Biology examiner ASB Mumbai',
    'online IB Biology tutor Mumbai',
    'IB Biology tutor American School of Bombay',
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
