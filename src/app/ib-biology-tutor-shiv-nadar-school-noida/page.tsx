/**
 * /ib-biology-tutor-shiv-nadar-school-noida
 *
 * Per-school IB Biology landing page for Shiv Nadar School Noida
 * (Sector 168). Co-educational day school founded under the Shiv
 * Nadar Foundation — the philanthropic arm of HCL Technologies
 * founder Shiv Nadar. CBSE primary curriculum + IB DP senior school.
 * STEM-and-leadership-strong educational philosophy.
 *
 * Distinct from Shiv Nadar University (Greater Noida) — separate
 * institution, both founded by the same foundation.
 *
 * Built from IBBiologySchoolTemplate + ibBiologySchools['shiv-nadar-school-noida'].
 * Schemas via IBBiologySchoolSchemas with en-IN inLanguage so Google + LLMs
 * route the page to the right regional audience.
 *
 * Primary keyword: "IB Biology tutor Shiv Nadar School" — a school-name
 * long-tail that no other page on the site targets.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'shiv-nadar-school-noida'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for Shiv Nadar School · Noida · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for Shiv Nadar School Noida students (Sector 168). STEM-aligned coaching, IA + EE mentorship, 2025 syllabus. IB+NEET integrated track available.',
  keywords: [
    'IB Biology tutor Shiv Nadar School',
    'IB Biology tutor Shiv Nadar Noida',
    'IB Biology coaching Shiv Nadar School Sector 168',
    'IB Biology HL tutor Shiv Nadar School',
    'IB Biology SL tutor Shiv Nadar School',
    'IB Biology IA help Shiv Nadar Noida',
    'Shiv Nadar School IB Biology tutoring',
    'IB Biology examiner Shiv Nadar Noida',
    'IB Biology tutor Sector 168 Noida',
    'IB Biology tutor near Shiv Nadar School',
    'Shiv Nadar School vs Pathways Noida IB',
    'online IB Biology tutor Noida',
    'IB+NEET coaching Shiv Nadar School',
    'STEM IB Biology tutor Noida',
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
