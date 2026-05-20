/**
 * /ib-biology-tutor-jaipuria-vasundhara-ghaziabad
 *
 * Per-school IB Biology landing page for Seth Anandram Jaipuria School
 * Vasundhara (Ghaziabad). Part of the broader Jaipuria Schools network
 * (campuses in Lucknow, Kanpur, and other cities). CBSE primary + IB DP
 * senior school.
 *
 * Built from IBBiologySchoolTemplate +
 * ibBiologySchools['jaipuria-vasundhara-ghaziabad'].
 * Schemas via IBBiologySchoolSchemas with en-IN inLanguage so Google + LLMs
 * route the page to the right regional audience.
 *
 * Primary keyword: "IB Biology tutor Jaipuria Vasundhara" — a
 * school-name long-tail that no other page on the site targets.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'jaipuria-vasundhara-ghaziabad'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for Jaipuria Vasundhara · Ghaziabad · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for Seth Anandram Jaipuria School Vasundhara (Ghaziabad) students. CBSE-to-IB bridge, IA + EE mentorship, 2025 syllabus. IB+NEET integrated track available.',
  keywords: [
    'IB Biology tutor Jaipuria Vasundhara',
    'IB Biology tutor Seth Anandram Jaipuria',
    'IB Biology tutor Jaipuria Ghaziabad',
    'IB Biology coaching Jaipuria Vasundhara',
    'IB Biology HL tutor Jaipuria Vasundhara',
    'IB Biology SL tutor Jaipuria Vasundhara',
    'IB Biology IA help Jaipuria Vasundhara',
    'Jaipuria Vasundhara IB Biology tutoring',
    'IB Biology examiner Jaipuria Ghaziabad',
    'IB Biology tutor Vasundhara Ghaziabad',
    'IB Biology tutor near Jaipuria School Vasundhara',
    'CBSE to IB Biology Jaipuria',
    'online IB Biology tutor Ghaziabad',
    'IB+NEET coaching Jaipuria Vasundhara',
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
