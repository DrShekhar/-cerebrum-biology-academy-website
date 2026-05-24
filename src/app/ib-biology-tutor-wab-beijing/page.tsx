/**
 * /ib-biology-tutor-wab-beijing
 *
 * Per-school IB Biology landing page for Western Academy of Beijing (WAB).
 * WAB is an IB Continuum School (PYP + MYP + DP) in Shunyi, north-east
 * Beijing, with ~1,400 students from 50+ nationalities. Recent IB averages
 * ~35–37 points.
 *
 * Built from IBBiologySchoolTemplate + ibBiologySchools['wab-beijing'].
 * Schemas via IBBiologySchoolSchemas with en-CN inLanguage.
 *
 * Primary keyword: "IB Biology tutor WAB Beijing" — school-name long-tail.
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

const SLUG = 'wab-beijing'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for WAB Beijing · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for Western Academy of Beijing (WAB) students in Shunyi. AIIMS-trained faculty, IA + EE mentorship, 2025 syllabus, CST evening live classes.',
  keywords: [
    'IB Biology tutor WAB Beijing',
    'IB Biology coaching Western Academy of Beijing',
    'IB Biology HL tutor WAB',
    'IB Biology SL tutor WAB',
    'IB Biology IA help WAB Beijing',
    'WAB Beijing IB Biology tutoring',
    'IB Biology examiner WAB',
    'online IB Biology tutor Beijing Shunyi',
    'IB Biology tutor Western Academy of Beijing',
    'best IB Biology tutor Beijing',
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
