/**
 * /ib-biology-tutor-gd-goenka-signature-gurgaon
 *
 * Per-school IB Biology landing page for GD Goenka Signature School
 * (Sector 48, Gurugram). Co-educational day school in the broader GD
 * Goenka education group; IB DP + CBSE dual-track senior school.
 *
 * Sister-campus distinction: GD Goenka World School (Sohna Road,
 * residential + day, full PYP+MYP+DP continuum) is covered at
 * /ib-biology-tutor-gd-goenka-world-school-gurgaon. Signature is the
 * day-only Sector 48 campus targeting central-Gurgaon working-
 * professional families who want the GD Goenka brand without boarding.
 *
 * Built from IBBiologySchoolTemplate + ibBiologySchools['gd-goenka-signature-gurgaon'].
 * Schemas via IBBiologySchoolSchemas with en-IN inLanguage so Google + LLMs
 * route the page to the right regional audience.
 *
 * Primary keyword: "IB Biology tutor GD Goenka Signature" — a
 * school-name long-tail that no other page on the site targets.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'gd-goenka-signature-gurgaon'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for GD Goenka Signature · Sector 48 · Gurgaon · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for GD Goenka Signature School (Sector 48 Gurgaon) — day-school IB DP + CBSE senior students. Examiner-led faculty, IA + EE mentorship, 2025 syllabus. IB+NEET integrated track available.',
  keywords: [
    'IB Biology tutor GD Goenka Signature',
    'IB Biology tutor GD Goenka Sector 48',
    'IB Biology coaching GD Goenka Signature Gurgaon',
    'IB Biology HL tutor GD Goenka Signature',
    'IB Biology SL tutor GD Goenka Signature',
    'IB Biology IA help GD Goenka Signature',
    'GD Goenka Signature IB Biology tutoring',
    'IB Biology examiner GD Goenka Signature Gurgaon',
    'IB Biology tutor Sector 48 Gurgaon',
    'IB Biology tutor near GD Goenka Signature',
    'GD Goenka World vs Signature IB Biology',
    'online IB Biology tutor Gurgaon',
    'IB+NEET coaching GD Goenka Signature',
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
