/**
 * /ib-biology-tutor-isb-beijing
 *
 * Per-school IB Biology landing page for International School of Beijing
 * (ISB). One of the longest-established international schools in mainland
 * China (founded 1980), ~1,800 students from 50+ nationalities, dual IB DP
 * + AP senior school.
 *
 * Built from IBBiologySchoolTemplate + ibBiologySchools['isb-beijing'].
 * Schemas via IBBiologySchoolSchemas with en-CN inLanguage.
 *
 * Primary keyword: "IB Biology tutor ISB Beijing" — school-name long-tail.
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

const SLUG = 'isb-beijing'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for ISB Beijing · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for International School of Beijing (ISB) students in Shunyi. AIIMS-trained faculty, IA + EE mentorship, 2025 syllabus, CST live classes. AP Biology also covered.',
  keywords: [
    'IB Biology tutor ISB Beijing',
    'IB Biology coaching International School of Beijing',
    'IB Biology HL tutor ISB',
    'IB Biology SL tutor ISB',
    'AP Biology tutor ISB Beijing',
    'IB Biology IA help ISB Beijing',
    'ISB Beijing IB Biology tutoring',
    'IB Biology examiner ISB',
    'online IB Biology tutor Beijing',
    'best IB Biology tutor Beijing Shunyi',
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
