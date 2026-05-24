/**
 * /ap-biology-tutor-hong-kong
 *
 * AP Biology APAC metro page targeting Hong Kong — anchored on Hong
 * Kong International School (HKIS) and CDNIS, with feeder demand from
 * CIS, ESF, RCHK, ISF Academy, German Swiss, Hong Kong Academy, and
 * the local-school AP cohort (DBS, PLK CKY). Built from
 * APBiologyCityTemplate + apBiologyMetros[hong-kong]. Schemas emitted
 * via APBiologyMetroSchemas with en-HK locale + HK country.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildAPBiologyMetroMetadata } from '@/lib/seo/metadata'
import APBiologyCityTemplate from '@/components/ap-biology/APBiologyCityTemplate'
import { APBiologyMetroSchemas } from '@/components/ap-biology/APBiologyMetroSchemas'
import { getMetroBySlug } from '@/data/ap-biology/metros'
import { hideFromCountries } from '@/lib/geo/hideFromCountries'

/**
 * Force runtime rendering so the India geo-gate fires on every request.
 * Middleware also gates this path as a second-line defence (see
 * HIDE_FROM_INDIA_PATHS in middleware.ts).
 */
export const dynamic = 'force-dynamic'

const SLUG = 'hong-kong'
const metro = getMetroBySlug(SLUG)

export const metadata: Metadata = buildAPBiologyMetroMetadata({
  title: 'AP Biology Tutor Hong Kong · HKIS + CDNIS + CIS · Cerebrum',
  description:
    'AP Biology tutoring for Hong Kong — HKIS, CDNIS, CIS, ESF, RCHK, ISF Academy, German Swiss. PhD faculty, FRQ mastery, HKT live classes. From $1,800.',
  keywords: [
    'ap biology tutor hong kong',
    'ap biology coaching hong kong',
    'ap biology hkis',
    'ap biology hong kong international school',
    'ap biology cdnis',
    'ap biology canadian international school hong kong',
    'ap biology cis hong kong',
    'ap biology chinese international school',
    'ap biology esf',
    'ap biology rchk',
    'ap biology isf academy',
    'ap biology german swiss international school',
    'ap biology hong kong academy',
    'ap biology online hong kong',
    'ap biology frq tutor hong kong',
    'best ap biology tutor hong kong',
    'ap biology tutor kowloon',
    'ap biology tutor sai kung',
  ],
  canonical: `/ap-biology-tutor-${SLUG}`,
  inLanguage: 'en-HK',
})

export default async function APBiologyTutorHongKongPage() {
  await hideFromCountries(['IN'])

  if (!metro) notFound()
  return (
    <>
      <APBiologyMetroSchemas metro={metro} inLanguage="en-HK" addressCountry="HK" />
      <APBiologyCityTemplate metro={metro} />
    </>
  )
}
