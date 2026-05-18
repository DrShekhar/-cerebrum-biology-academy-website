/**
 * /ib-biology-tutor-genesis-global-noida
 *
 * Per-school IB Biology landing page for Genesis Global School
 * (Noida–Greater Noida Expressway). The Noida-region residential IB
 * option — most other Noida IB schools (Pathways Noida, Shiv Nadar,
 * Step by Step) are day-only, so Genesis Global is structurally the
 * Noida-cluster equivalent of Pathways Aravali / GD Goenka World in
 * the Gurgaon cluster.
 *
 * Built from IBBiologySchoolTemplate + ibBiologySchools['genesis-global-noida'].
 * Schemas via IBBiologySchoolSchemas with en-IN inLanguage so Google + LLMs
 * route the page to the right regional audience.
 *
 * Primary keyword: "IB Biology tutor Genesis Global School" — a
 * school-name long-tail that no other page on the site targets.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'genesis-global-noida'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for Genesis Global School · Noida–Greater Noida · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for Genesis Global School students (residential + day, Noida–Greater Noida Expressway). IST-matched live sessions for boarders, IA + EE mentorship, 2025 syllabus. IB+NEET integrated track available.',
  keywords: [
    'IB Biology tutor Genesis Global School',
    'IB Biology tutor Genesis Global Noida',
    'IB Biology tutor Genesis Global Greater Noida',
    'IB Biology coaching Genesis Global School',
    'IB Biology HL tutor Genesis Global',
    'IB Biology SL tutor Genesis Global',
    'IB Biology IA help Genesis Global',
    'Genesis Global IB Biology tutoring',
    'IB Biology tutor for boarders Genesis Global',
    'IB Biology examiner Genesis Global Noida',
    'IB Biology tutor Noida-Greater Noida Expressway',
    'IB Biology tutor near Genesis Global School',
    'residential IB Biology tutor Noida',
    'online IB Biology tutor Noida',
    'IST IB Biology tutor for India boarding schools',
    'IB+NEET coaching Genesis Global',
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
