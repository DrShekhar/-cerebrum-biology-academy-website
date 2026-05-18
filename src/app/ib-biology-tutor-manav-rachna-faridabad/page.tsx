/**
 * /ib-biology-tutor-manav-rachna-faridabad
 *
 * Per-school IB Biology landing page for Manav Rachna International
 * School (Faridabad). Flagship international school of the Manav Rachna
 * education group (which also runs MRIIRS university, Manav Rachna
 * Dental College, and engineering programmes). Multi-curriculum senior
 * school: IB DP + Cambridge IGCSE/A-Levels + CBSE.
 *
 * Built from IBBiologySchoolTemplate + ibBiologySchools['manav-rachna-faridabad'].
 * Schemas via IBBiologySchoolSchemas with en-IN inLanguage so Google + LLMs
 * route the page to the right regional audience.
 *
 * Primary keyword: "IB Biology tutor Manav Rachna" — a school-name
 * long-tail that no other page on the site targets.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'

const SLUG = 'manav-rachna-faridabad'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for Manav Rachna International · Faridabad · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for Manav Rachna International School students (Faridabad). Multi-curriculum coaching context, IA + EE mentorship, 2025 syllabus. IB+NEET integrated track available.',
  keywords: [
    'IB Biology tutor Manav Rachna',
    'IB Biology tutor Manav Rachna International School',
    'IB Biology tutor MRIS Faridabad',
    'IB Biology coaching Manav Rachna Faridabad',
    'IB Biology HL tutor Manav Rachna',
    'IB Biology SL tutor Manav Rachna',
    'IB Biology IA help Manav Rachna',
    'Manav Rachna IB Biology tutoring',
    'IB Biology examiner Manav Rachna Faridabad',
    'IB Biology tutor near Manav Rachna Faridabad',
    'IB vs Cambridge A-Level Biology Manav Rachna',
    'online IB Biology tutor Faridabad',
    'IB+NEET coaching Manav Rachna',
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
