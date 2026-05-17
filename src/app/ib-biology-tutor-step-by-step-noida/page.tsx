/**
 * /ib-biology-tutor-step-by-step-noida
 *
 * Per-school IB Biology landing page for Step by Step School (Sector
 * 132, Noida–Greater Noida Expressway). One of the longer-established
 * schools in the Noida IB cluster — founded mid-1990s, with the
 * senior-school IB DP authorisation in place for years. Dual-track
 * senior school: IB DP + CBSE in parallel at Classes 11–12.
 *
 * Built from IBBiologySchoolTemplate + ibBiologySchools['step-by-step-noida'].
 * Schemas via IBBiologySchoolSchemas with en-IN inLanguage so Google + LLMs
 * route the page to the right regional audience.
 *
 * Primary keyword: "IB Biology tutor Step by Step School" — a
 * school-name long-tail that no other page on the site targets.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'step-by-step-noida'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for Step by Step School · Noida · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for Step by Step School Noida students (Sector 132, Noida–Greater Noida Expressway). Examiner-led faculty, IA + EE mentorship, 2025 syllabus. IB+NEET integrated track available.',
  keywords: [
    'IB Biology tutor Step by Step School',
    'IB Biology tutor Step by Step Noida',
    'IB Biology coaching Step by Step Sector 132',
    'IB Biology HL tutor Step by Step',
    'IB Biology SL tutor Step by Step',
    'IB Biology IA help Step by Step Noida',
    'Step by Step IB Biology tutoring',
    'IB Biology examiner Step by Step Noida',
    'IB Biology tutor Sector 132 Noida',
    'IB Biology tutor near Step by Step School',
    'Step by Step vs Pathways Noida IB',
    'online IB Biology tutor Noida',
    'IB+NEET coaching Step by Step',
    'CBSE to IB Biology Step by Step',
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
