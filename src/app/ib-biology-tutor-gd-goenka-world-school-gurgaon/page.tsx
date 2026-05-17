/**
 * /ib-biology-tutor-gd-goenka-world-school-gurgaon
 *
 * Per-school IB Biology landing page for GD Goenka World School
 * (Sohna Road, south Gurugram). Residential + day co-educational IB
 * World School running full IB Continuum (PYP + MYP + DP). Flagship
 * international campus of the broader GD Goenka education group.
 *
 * Distinct from /ib-biology-tutor-gd-goenka-signature-gurgaon (sister
 * day-school campus at Sector 48 — different cohort, different
 * residential profile).
 *
 * Built from IBBiologySchoolTemplate + ibBiologySchools['gd-goenka-world-school-gurgaon'].
 * Schemas via IBBiologySchoolSchemas with en-IN inLanguage so Google + LLMs
 * route the page to the right regional audience.
 *
 * Primary keyword: "IB Biology tutor GD Goenka World School" — a
 * school-name long-tail that no other page on the site targets.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'gd-goenka-world-school-gurgaon'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for GD Goenka World School · Sohna · Gurgaon · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for GD Goenka World School (Sohna, Gurugram) — residential + day IB Continuum students. Examiner-led faculty, IST-matched live sessions, IA + EE mentorship, 2025 syllabus. IB+NEET integrated track available.',
  keywords: [
    'IB Biology tutor GD Goenka World School',
    'IB Biology tutor GD Goenka World',
    'IB Biology coaching GD Goenka World School Sohna',
    'IB Biology HL tutor GD Goenka World',
    'IB Biology SL tutor GD Goenka World',
    'IB Biology IA help GD Goenka World',
    'GD Goenka World IB Biology tutoring',
    'IB Biology tutor for boarders GD Goenka',
    'IB Biology examiner GD Goenka Sohna',
    'IB Biology tutor Sohna Road Gurgaon',
    'IB Biology tutor near GD Goenka World School',
    'online IB Biology tutor Gurgaon',
    'IST IB Biology tutor for India boarding schools',
    'IB+NEET coaching GD Goenka World',
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
