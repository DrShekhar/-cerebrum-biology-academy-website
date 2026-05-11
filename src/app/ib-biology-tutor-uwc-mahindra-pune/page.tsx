/**
 * /ib-biology-tutor-uwc-mahindra-pune
 *
 * Per-school IB Biology landing page for UWC Mahindra College
 * (Pune). Built from IBBiologySchoolTemplate +
 * ibBiologySchools['uwc-mahindra-pune']. Schemas via IBBiologySchoolSchemas
 * with en-IN inLanguage so Google + LLMs route the
 * page to the right regional audience.
 *
 * Primary keyword: "IB Biology tutor UWC Mahindra" — a
 * school-name long-tail that no other page on the site targets.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'uwc-mahindra-pune'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for UWC Mahindra · Pune · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for UWC Mahindra College students in Pune. Examiner-led faculty, IA + EE mentorship, 2025 syllabus.',
  keywords: [
    'IB Biology tutor UWC Mahindra',
    'IB Biology coaching UWC Mahindra',
    'IB Biology HL tutor UWC Mahindra',
    'IB Biology SL tutor UWC Mahindra',
    'IB Biology IA help UWC Mahindra',
    'UWC Mahindra IB Biology tutoring',
    'IB Biology examiner UWC Mahindra',
    'online IB Biology tutor Pune',
    'IB Biology tutor UWC Mahindra College',
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
