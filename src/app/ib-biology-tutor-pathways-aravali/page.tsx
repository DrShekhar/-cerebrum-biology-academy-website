/**
 * /ib-biology-tutor-pathways-aravali
 *
 * Per-school IB Biology landing page for Pathways World School Aravali
 * (Gurgaon). Built from IBBiologySchoolTemplate +
 * ibBiologySchools['pathways-aravali']. Schemas via IBBiologySchoolSchemas
 * with en-IN inLanguage so Google + LLMs route the
 * page to the right regional audience.
 *
 * Primary keyword: "IB Biology tutor Pathways Aravali" — a
 * school-name long-tail that no other page on the site targets.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'pathways-aravali'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for Pathways Aravali · Gurgaon · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for Pathways World School Aravali students in Gurgaon. Examiner-led faculty, IA + EE mentorship, 2025 syllabus.',
  keywords: [
    'IB Biology tutor Pathways Aravali',
    'IB Biology coaching Pathways Aravali',
    'IB Biology HL tutor Pathways Aravali',
    'IB Biology SL tutor Pathways Aravali',
    'IB Biology IA help Pathways Aravali',
    'Pathways Aravali IB Biology tutoring',
    'IB Biology examiner Pathways Aravali',
    'online IB Biology tutor Gurgaon',
    'IB Biology tutor Pathways World School Aravali',
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
