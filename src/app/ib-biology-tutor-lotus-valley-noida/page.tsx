/**
 * /ib-biology-tutor-lotus-valley-noida
 *
 * Per-school IB Biology landing page for Lotus Valley International
 * School Noida (Sector 126). Newer-generation co-educational day
 * school — CBSE primary curriculum through Class 10, with IB DP as a
 * senior-school international option at Classes 11-12 alongside the
 * continuing CBSE track.
 *
 * Built from IBBiologySchoolTemplate + ibBiologySchools['lotus-valley-noida'].
 * Schemas via IBBiologySchoolSchemas with en-IN inLanguage so Google + LLMs
 * route the page to the right regional audience.
 *
 * Primary keyword: "IB Biology tutor Lotus Valley Noida" — a school-name
 * long-tail that no other page on the site targets.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'lotus-valley-noida'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for Lotus Valley International · Sector 126 Noida · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for Lotus Valley International School Noida students (Sector 126). CBSE-to-IB bridge, IA + EE mentorship, 2025 syllabus. IB+NEET integrated track available.',
  keywords: [
    'IB Biology tutor Lotus Valley',
    'IB Biology tutor Lotus Valley Noida',
    'IB Biology tutor Lotus Valley International School',
    'IB Biology coaching Lotus Valley Sector 126',
    'IB Biology HL tutor Lotus Valley',
    'IB Biology SL tutor Lotus Valley',
    'IB Biology IA help Lotus Valley',
    'Lotus Valley IB Biology tutoring',
    'IB Biology examiner Lotus Valley Noida',
    'IB Biology tutor Sector 126 Noida',
    'IB Biology tutor near Lotus Valley Noida',
    'CBSE to IB Biology Lotus Valley',
    'online IB Biology tutor Noida',
    'IB+NEET coaching Lotus Valley',
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
