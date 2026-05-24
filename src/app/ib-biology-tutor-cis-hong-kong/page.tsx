/**
 * /ib-biology-tutor-cis-hong-kong
 *
 * Per-school IB Biology landing page for Chinese International School (CIS).
 * CIS is one of Hong Kong's top 3–4 IB Continuum Schools, with cohort
 * averages exceeding 38–40 points (vs global IB mean ~30). Located in
 * Braemar Hill, HK Island.
 *
 * Built from IBBiologySchoolTemplate + ibBiologySchools['cis-hong-kong'].
 * Schemas via IBBiologySchoolSchemas with en-HK inLanguage.
 *
 * Primary keyword: "IB Biology tutor CIS Hong Kong" — school-name long-tail.
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

const SLUG = 'cis-hong-kong'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildIBBiologySchoolMetadata({
  title: 'IB Biology Tutor for CIS Hong Kong (Chinese International School) · Cerebrum',
  description:
    'IB Biology HL & SL 1:1 tutoring for Chinese International School (CIS) Hong Kong students. AIIMS-trained faculty, IA + EE mentorship, Level 7 ceiling focus. HKT evening live classes.',
  keywords: [
    'IB Biology tutor CIS Hong Kong',
    'IB Biology coaching Chinese International School',
    'IB Biology HL tutor CIS',
    'IB Biology SL tutor CIS',
    'IB Biology IA help CIS Hong Kong',
    'CIS Hong Kong IB Biology tutoring',
    'IB Biology examiner CIS',
    'online IB Biology tutor Hong Kong Braemar Hill',
    'IB Biology tutor Chinese International School',
    'best IB Biology tutor Hong Kong Island',
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
