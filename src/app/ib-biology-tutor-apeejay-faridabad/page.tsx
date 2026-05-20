/**
 * /ib-biology-tutor-apeejay-faridabad
 *
 * Per-school IB Biology landing page for Apeejay School Faridabad.
 * Part of the broader Apeejay Education Society network (also runs
 * Apeejay School Noida, Apeejay Pitampura/Sheikh Sarai/Saket, and
 * Apeejay Stya University in Gurgaon). CBSE primary + IB DP senior.
 *
 * Built from IBBiologySchoolTemplate + ibBiologySchools['apeejay-faridabad'].
 * Schemas via IBBiologySchoolSchemas with en-IN inLanguage so Google + LLMs
 * route the page to the right regional audience.
 *
 * Primary keyword: "IB Biology tutor Apeejay Faridabad" — a school-name
 * long-tail that no other page on the site targets.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'apeejay-faridabad'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for Apeejay School Faridabad · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for Apeejay School Faridabad students. CBSE-to-IB bridge, IA + EE mentorship, 2025 syllabus. IB+NEET integrated track available.',
  keywords: [
    'IB Biology tutor Apeejay Faridabad',
    'IB Biology tutor Apeejay School Faridabad',
    'IB Biology coaching Apeejay Faridabad',
    'IB Biology HL tutor Apeejay Faridabad',
    'IB Biology SL tutor Apeejay Faridabad',
    'IB Biology IA help Apeejay Faridabad',
    'Apeejay Faridabad IB Biology tutoring',
    'IB Biology examiner Apeejay Faridabad',
    'IB Biology tutor near Apeejay School Faridabad',
    'CBSE to IB Biology Apeejay Faridabad',
    'online IB Biology tutor Faridabad',
    'IB+NEET coaching Apeejay Faridabad',
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
