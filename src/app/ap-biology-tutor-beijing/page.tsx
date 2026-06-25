/**
 * /ap-biology-tutor-beijing
 *
 * AP Biology mainland-China metro page targeting Beijing — anchored on
 * ISB (International School of Beijing) + WAB (Western Academy of Beijing)
 * in Shunyi district. Feeder demand from Dulwich Beijing, YCIS, Keystone,
 * BCIS, Harrow Beijing, Daystar, and Chinese-passport private bilingual
 * schools in Haidian / Chaoyang (Tsinghua HS International Dept, Beijing
 * No.4 HS International Campus, BIBA).
 *
 * Built from APBiologyCityTemplate + apBiologyMetros[beijing]. Schemas
 * via APBiologyMetroSchemas with en-CN inLanguage + CN country.
 *
 * Geo-gate: hidden from India IPs via hideFromCountries(['IN']) + middleware.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildAPBiologyMetroMetadata } from '@/lib/seo/metadata'
import APBiologyCityTemplate from '@/components/ap-biology/APBiologyCityTemplate'
import { APBiologyMetroSchemas } from '@/components/ap-biology/APBiologyMetroSchemas'
import { getMetroBySlug } from '@/data/ap-biology/metros'
import { hideFromCountries } from '@/lib/geo/hideFromCountries'

export const dynamic = 'force-dynamic'

const SLUG = 'beijing'
const metro = getMetroBySlug(SLUG)

export const metadata: Metadata = buildAPBiologyMetroMetadata({
  title: 'AP Biology Tutor Beijing · ISB + WAB + Dulwich + Keystone · Cerebrum',
  description:
    'AP Biology tutoring for Beijing — ISB Shunyi, WAB Shunyi, Dulwich Beijing, YCIS, Keystone, BCIS, Harrow Beijing. AIIMS-trained faculty, FRQ mastery, CST live classes. From $2,500/yr (1:1 from $40/hr).',
  keywords: [
    'ap biology tutor beijing',
    'ap biology coaching beijing',
    'ap biology isb beijing',
    'ap biology international school of beijing',
    'ap biology wab',
    'ap biology western academy of beijing',
    'ap biology dulwich beijing',
    'ap biology ycis beijing',
    'ap biology keystone academy',
    'ap biology bcis beijing',
    'ap biology harrow beijing',
    'ap biology online beijing',
    'ap biology frq tutor beijing',
    'best ap biology tutor beijing',
    'ap biology tutor shunyi',
    'ap biology tutor chaoyang',
    'ap biology tutor haidian',
  ],
  canonical: `/ap-biology-tutor-${SLUG}`,
  inLanguage: 'en-CN',
})

export default async function APBiologyTutorBeijingPage() {
  await hideFromCountries(['IN'])

  if (!metro) notFound()
  return (
    <>
      <APBiologyMetroSchemas metro={metro} inLanguage="en-CN" addressCountry="CN" />
      <APBiologyCityTemplate metro={metro} />
    </>
  )
}
