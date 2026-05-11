/**
 * /ap-biology-tutor-vancouver
 *
 * AP Biology Canada metro page targeting Vancouver + Burnaby +
 * Richmond + Surrey + West Van (Sir Winston Churchill, Lord Byng,
 * Eric Hamber, University Hill, York House, Crofton House, St.
 * George's, West Point Grey Academy, Mulgrave). Built from
 * APBiologyCityTemplate + apBiologyMetros[vancouver]. Schemas
 * emitted via APBiologyMetroSchemas with en-CA locale + CA country.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildAPBiologyMetroMetadata } from '@/lib/seo/metadata'
import APBiologyCityTemplate from '@/components/ap-biology/APBiologyCityTemplate'
import { APBiologyMetroSchemas } from '@/components/ap-biology/APBiologyMetroSchemas'
import { getMetroBySlug } from '@/data/ap-biology/metros'

const SLUG = 'vancouver'
const metro = getMetroBySlug(SLUG)

export const metadata: Metadata = buildAPBiologyMetroMetadata({
  title: 'AP Biology Tutor Vancouver · Lord Byng + UHill · Cerebrum',
  description:
    'AP Biology tutoring for Vancouver — Lord Byng, Churchill, York House, Crofton House, St. George’s. PhD faculty, FRQ mastery, PT classes. From $1,800.',
  keywords: [
    'ap biology tutor vancouver',
    'ap biology coaching british columbia',
    'ap biology tutor burnaby',
    'ap biology tutor richmond bc',
    'ap biology tutor surrey bc',
    'ap biology lord byng',
    'ap biology sir winston churchill',
    'ap biology eric hamber',
    'ap biology university hill secondary',
    'ap biology york house school',
    'ap biology crofton house',
    'ap biology st georges school vancouver',
    'ap biology west point grey academy',
    'ap biology mulgrave school',
    'ap biology online canada',
    'ap biology frq tutor vancouver',
    'usabo tutor vancouver',
    'best ap biology tutor canada',
  ],
  canonical: `/ap-biology-tutor-${SLUG}`,
})

export default function APBiologyTutorVancouverPage() {
  if (!metro) notFound()
  return (
    <>
      <APBiologyMetroSchemas metro={metro} inLanguage="en-CA" addressCountry="CA" />
      <APBiologyCityTemplate metro={metro} />
    </>
  )
}
