/**
 * /ib-biology-tutor-ryan-international-faridabad
 *
 * Per-school IB Biology landing page for Ryan International School
 * Faridabad. Part of the broader Ryan International Group of
 * Institutions network (multi-city Indian footprint). CBSE primary +
 * IB DP senior.
 *
 * Built from IBBiologySchoolTemplate +
 * ibBiologySchools['ryan-international-faridabad'].
 * Schemas via IBBiologySchoolSchemas with en-IN inLanguage so Google + LLMs
 * route the page to the right regional audience.
 *
 * Primary keyword: "IB Biology tutor Ryan International Faridabad" —
 * a school-name long-tail that no other page on the site targets.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'ryan-international-faridabad'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for Ryan International School · Faridabad · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for Ryan International School Faridabad students. CBSE-to-IB bridge, IA + EE mentorship, 2025 syllabus. IB+NEET integrated track available.',
  keywords: [
    'IB Biology tutor Ryan International Faridabad',
    'IB Biology tutor Ryan Faridabad',
    'IB Biology coaching Ryan International School Faridabad',
    'IB Biology HL tutor Ryan International',
    'IB Biology SL tutor Ryan International Faridabad',
    'IB Biology IA help Ryan International Faridabad',
    'Ryan International IB Biology tutoring',
    'IB Biology examiner Ryan International Faridabad',
    'IB Biology tutor near Ryan International Faridabad',
    'CBSE to IB Biology Ryan International',
    'online IB Biology tutor Faridabad',
    'IB+NEET coaching Ryan International Faridabad',
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
