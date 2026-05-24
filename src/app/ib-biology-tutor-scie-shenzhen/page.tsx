/**
 * /ib-biology-tutor-scie-shenzhen
 *
 * Per-school IB Biology landing page for Shenzhen College of International
 * Education (SCIE). SCIE is publicly ranked #1 international school in China
 * per the 2025 HSBC Hurun Global High Schools ranking (46th globally).
 * Dual A-Level + IB DP senior school.
 *
 * Built from IBBiologySchoolTemplate + ibBiologySchools['scie-shenzhen'].
 * Schemas via IBBiologySchoolSchemas with en-CN inLanguage.
 *
 * Primary keyword: "IB Biology tutor SCIE Shenzhen" — school-name long-tail.
 * Geo-gate: hidden from India IPs via hideFromCountries(['IN']) + middleware.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildIBBiologySchoolMetadata } from '@/lib/seo/metadata'
import IBBiologySchoolTemplate from '@/components/ib-biology/IBBiologySchoolTemplate'
import { IBBiologySchoolSchemas } from '@/components/ib-biology/IBBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ib-biology/schools'
import { hideFromCountries } from '@/lib/geo/hideFromCountries'

export const dynamic = 'force-dynamic'

const SLUG = 'scie-shenzhen'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for SCIE Shenzhen · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for Shenzhen College of International Education (SCIE) students. AIIMS-trained faculty, IA + EE mentorship, 2025 syllabus, CST evening live classes. A-Level Biology also covered.',
  keywords: [
    'IB Biology tutor SCIE Shenzhen',
    'IB Biology coaching SCIE',
    'IB Biology HL tutor SCIE Shenzhen',
    'A-Level Biology tutor SCIE Shenzhen',
    'IB Biology IA help SCIE',
    'SCIE Shenzhen IB Biology tutoring',
    'IB Biology examiner SCIE',
    'online IB Biology tutor Shenzhen',
    'IB Biology tutor Shenzhen College of International Education',
    'best IB Biology tutor Shenzhen',
  ],
  canonical: `/ib-biology-tutor-${SLUG}`,
  inLanguage: 'en-CN',
})

export default async function Page() {
  await hideFromCountries(['IN'])

  if (!school) notFound()
  return (
    <>
      <IBBiologySchoolSchemas school={school} />
      <IBBiologySchoolTemplate school={school} />
    </>
  )
}
