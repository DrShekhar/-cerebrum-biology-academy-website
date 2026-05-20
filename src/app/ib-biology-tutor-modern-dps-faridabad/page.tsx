/**
 * /ib-biology-tutor-modern-dps-faridabad
 *
 * Per-school IB Biology landing page for Modern Delhi Public School
 * Faridabad. Independently-managed institution distinct from Delhi
 * Public School Faridabad (entry #30 — DPS national network campus).
 * CBSE primary + IB DP senior school.
 *
 * Sister-page distinction:
 *   - /ib-biology-tutor-dps-faridabad (entry #30) — DPS national
 *     network campus (DPS Society-affiliated)
 *   - /ib-biology-tutor-modern-dps-faridabad (this page) —
 *     independently-managed school using the 'Delhi Public School'
 *     naming
 *
 * Built from IBBiologySchoolTemplate + ibBiologySchools['modern-dps-faridabad'].
 * Schemas via IBBiologySchoolSchemas with en-IN inLanguage so Google + LLMs
 * route the page to the right regional audience.
 *
 * Primary keyword: "IB Biology tutor Modern DPS Faridabad" — a
 * school-name long-tail that no other page on the site targets.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'modern-dps-faridabad'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for Modern DPS Faridabad · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for Modern Delhi Public School Faridabad students. CBSE-to-IB bridge, IA + EE mentorship, 2025 syllabus. IB+NEET integrated track available.',
  keywords: [
    'IB Biology tutor Modern DPS Faridabad',
    'IB Biology tutor Modern Delhi Public School Faridabad',
    'IB Biology coaching Modern DPS Faridabad',
    'IB Biology HL tutor Modern DPS',
    'IB Biology SL tutor Modern DPS Faridabad',
    'IB Biology IA help Modern DPS',
    'Modern DPS Faridabad IB Biology tutoring',
    'IB Biology examiner Modern DPS Faridabad',
    'IB Biology tutor near Modern DPS Faridabad',
    'Modern DPS vs DPS Faridabad IB',
    'CBSE to IB Biology Modern DPS',
    'online IB Biology tutor Faridabad',
    'IB+NEET coaching Modern DPS',
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
