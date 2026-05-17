/**
 * /ib-biology-tutor-pathways-noida
 *
 * Per-school IB Biology landing page for Pathways School Noida
 * (Sector 100). Full IB Continuum day school — sister to Pathways
 * World School Aravali (Gurgaon, residential + day) and Pathways
 * School Gurgaon (Sector 70, day-only).
 *
 * Sister-campus pages:
 *   /ib-biology-tutor-pathways-aravali (entry #6)
 *
 * Built from IBBiologySchoolTemplate + ibBiologySchools['pathways-noida'].
 * Schemas via IBBiologySchoolSchemas with en-IN inLanguage so Google + LLMs
 * route the page to the right regional audience.
 *
 * Primary keyword: "IB Biology tutor Pathways Noida" — a school-name
 * long-tail that no other page on the site targets.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'pathways-noida'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for Pathways School Noida · Sector 100 · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for Pathways School Noida students (Sector 100). Examiner-led faculty, IA + EE mentorship, 2025 syllabus. IB+NEET integrated track available.',
  keywords: [
    'IB Biology tutor Pathways Noida',
    'IB Biology tutor Pathways School Noida',
    'IB Biology coaching Pathways Noida',
    'IB Biology HL tutor Pathways Noida',
    'IB Biology SL tutor Pathways Noida',
    'IB Biology IA help Pathways Noida',
    'Pathways Noida IB Biology tutoring',
    'IB Biology examiner Pathways Noida',
    'IB Biology tutor Sector 100 Noida',
    'IB Biology tutor near Pathways School Noida',
    'Pathways Aravali vs Pathways Noida IB',
    'online IB Biology tutor Noida',
    'IB+NEET coaching Pathways Noida',
    'IB Biology tutor MYP5 Pathways Noida',
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
