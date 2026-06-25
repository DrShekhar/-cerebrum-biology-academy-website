/**
 * /ap-biology-tutor-shanghai
 *
 * AP Biology mainland-China metro page targeting Shanghai — anchored on
 * SAS Pudong/Puxi (first AP Capstone school in Asia), SHSID (Shanghai
 * High School International Division), and WLSA Shanghai. Feeder demand
 * from Dulwich Shanghai, Concordia, YCIS, Wellington, WISS, SCIS, and
 * BISS Pudong/Puxi.
 *
 * Built from APBiologyCityTemplate + apBiologyMetros[shanghai]. Schemas
 * emitted via APBiologyMetroSchemas with en-CN locale + CN country.
 *
 * Geo-gate: hidden from India IPs via hideFromCountries(['IN']) +
 * middleware HIDE_FROM_INDIA_PATHS. Indian traffic to this page is
 * almost never qualified.
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
 * Middleware also gates this path as a second-line defence.
 */
export const dynamic = 'force-dynamic'

const SLUG = 'shanghai'
const metro = getMetroBySlug(SLUG)

export const metadata: Metadata = buildAPBiologyMetroMetadata({
  title: 'AP Biology Tutor Shanghai · SAS + SHSID + WLSA + Dulwich · Cerebrum',
  description:
    'AP Biology tutoring for Shanghai — SAS Pudong/Puxi, SHSID, WLSA, Dulwich, Concordia, YCIS, Wellington, WISS, SCIS. AIIMS-trained faculty, FRQ mastery, CST live classes. From $2,500/yr (1:1 from $40/hr).',
  keywords: [
    'ap biology tutor shanghai',
    'ap biology coaching shanghai',
    'ap biology sas pudong',
    'ap biology sas puxi',
    'ap biology shanghai american school',
    'ap biology shsid',
    'ap biology shanghai high school international',
    'ap biology wlsa shanghai',
    'ap biology dulwich shanghai',
    'ap biology concordia shanghai',
    'ap biology ycis shanghai',
    'ap biology wellington shanghai',
    'ap biology wiss shanghai',
    'ap biology scis shanghai',
    'ap biology online shanghai',
    'ap biology frq tutor shanghai',
    'best ap biology tutor shanghai',
    'ap biology tutor pudong',
    'ap biology tutor puxi',
    'ap capstone tutor shanghai',
  ],
  canonical: `/ap-biology-tutor-${SLUG}`,
  inLanguage: 'en-CN',
})

export default async function APBiologyTutorShanghaiPage() {
  await hideFromCountries(['IN'])

  if (!metro) notFound()
  return (
    <>
      <APBiologyMetroSchemas metro={metro} inLanguage="en-CN" addressCountry="CN" />
      <APBiologyCityTemplate metro={metro} />
    </>
  )
}
