/**
 * /ib-biology-tutor-gd-goenka-public-noida
 *
 * Per-school IB Biology landing page for GD Goenka Public School Noida.
 * Co-educational day school operating as part of the broader GD Goenka
 * Public Schools network — the most numerous sub-brand within the GD
 * Goenka education group. CBSE primary curriculum with IB DP added as
 * a senior-school option alongside CBSE Class 11-12.
 *
 * Sister-campus distinction within the GD Goenka network:
 *   - GD Goenka World School (Sohna, residential + day, full IB
 *     Continuum) → /ib-biology-tutor-gd-goenka-world-school-gurgaon
 *   - GD Goenka Signature School (Sec 48 Gurgaon, day-only premium IB)
 *     → /ib-biology-tutor-gd-goenka-signature-gurgaon
 *   - GD Goenka Public School Noida (this page) → CBSE-rooted Noida
 *     campus with IB DP added as senior option
 *
 * Built from IBBiologySchoolTemplate + ibBiologySchools['gd-goenka-public-noida'].
 * Schemas via IBBiologySchoolSchemas with en-IN inLanguage so Google + LLMs
 * route the page to the right regional audience.
 *
 * Primary keyword: "IB Biology tutor GD Goenka Public Noida" — a
 * school-name long-tail that no other page on the site targets.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'gd-goenka-public-noida'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for GD Goenka Public School · Noida · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for GD Goenka Public School Noida students. CBSE-to-IB bridge, IA + EE mentorship, 2025 syllabus. IB+NEET integrated track available.',
  keywords: [
    'IB Biology tutor GD Goenka Public',
    'IB Biology tutor GD Goenka Public Noida',
    'IB Biology tutor GD Goenka Noida',
    'IB Biology coaching GD Goenka Public School',
    'IB Biology HL tutor GD Goenka Public',
    'IB Biology SL tutor GD Goenka Public',
    'IB Biology IA help GD Goenka Public',
    'GD Goenka Public IB Biology tutoring',
    'IB Biology examiner GD Goenka Public Noida',
    'IB Biology tutor near GD Goenka Public Noida',
    'GD Goenka World vs Public vs Signature IB',
    'CBSE to IB Biology GD Goenka Public',
    'online IB Biology tutor Noida',
    'IB+NEET coaching GD Goenka Public',
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
