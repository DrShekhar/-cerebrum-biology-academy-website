/**
 * /ib-biology-tutor-li-po-chun-uwc
 *
 * Per-school IB Biology landing page for Li Po Chun United World College of
 * Hong Kong (LPCUWC). One of 18 UWCs globally, only UWC in Hong Kong, ~250
 * residential students from 80+ countries. Publicly recognised among global
 * top 10 IB schools in 2025.
 *
 * Built from IBBiologySchoolTemplate + ibBiologySchools['li-po-chun-uwc'].
 * Schemas via IBBiologySchoolSchemas with en-HK inLanguage.
 *
 * Primary keyword: "IB Biology tutor Li Po Chun UWC" — school-name long-tail.
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

const SLUG = 'li-po-chun-uwc'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for Li Po Chun UWC Hong Kong · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for Li Po Chun United World College (LPCUWC) Hong Kong students. AIIMS-trained faculty, Level 7 ceiling focus, IA + EE mentorship, HKT evening live classes.',
  keywords: [
    'IB Biology tutor Li Po Chun UWC',
    'IB Biology coaching LPCUWC Hong Kong',
    'IB Biology HL tutor Li Po Chun',
    'IB Biology SL tutor LPCUWC',
    'IB Biology IA help Li Po Chun UWC',
    'Li Po Chun UWC IB Biology tutoring',
    'IB Biology examiner LPCUWC',
    'online IB Biology tutor Hong Kong Sai Kung',
    'IB Biology tutor Li Po Chun United World College',
    'UWC biology tutor Hong Kong',
  ],
  canonical: `/ib-biology-tutor-${SLUG}`,
  inLanguage: 'en-HK',
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
