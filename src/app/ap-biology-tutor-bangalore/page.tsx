/**
 * /ap-biology-tutor-bangalore
 *
 * AP Biology India metro page targeting Bangalore + Whitefield +
 * Sarjapur + Electronic City (Inventure, Trio, Stonehill, Indus,
 * Canadian International, Greenwood, Mallya Aditi, Oakridge, TISB,
 * NPS International, Sarala Birla, Treamis). Built from
 * APBiologyCityTemplate + apBiologyMetros[bangalore]. Schemas
 * emitted via APBiologyMetroSchemas with en-IN + IN country.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildAPBiologyMetroMetadata } from '@/lib/seo/metadata'
import APBiologyCityTemplate from '@/components/ap-biology/APBiologyCityTemplate'
import { APBiologyMetroSchemas } from '@/components/ap-biology/APBiologyMetroSchemas'
import { getMetroBySlug } from '@/data/ap-biology/metros'

const SLUG = 'bangalore'
const metro = getMetroBySlug(SLUG)

export const metadata: Metadata = buildAPBiologyMetroMetadata({
  title: 'AP Biology Tutor Bangalore · Inventure + TISB · Cerebrum',
  description:
    'AP Biology tutoring for Bangalore — Inventure, Trio, Stonehill, Indus, Greenwood, Oakridge, TISB. AIIMS-trained PhD faculty, FRQ mastery, IST live. From $1,800.',
  keywords: [
    'ap biology tutor bangalore',
    'ap biology coaching bangalore',
    'ap biology inventure academy',
    'ap biology trio world academy',
    'ap biology stonehill international',
    'ap biology indus international',
    'ap biology canadian international school bangalore',
    'ap biology greenwood high',
    'ap biology mallya aditi',
    'ap biology oakridge bangalore',
    'ap biology tisb',
    'ap biology nps international',
    'ap biology bangalore international school',
    'ap biology tutor whitefield',
    'ap biology tutor sarjapur',
    'ap biology tutor electronic city',
    'ap biology coaching indian students us colleges',
    'ap biology online india',
    'best ap biology tutor india',
  ],
  canonical: `/ap-biology-tutor-${SLUG}`,
  inLanguage: 'en-IN',
})

export default function APBiologyTutorBangalorePage() {
  if (!metro) notFound()
  return (
    <>
      <APBiologyMetroSchemas
        metro={metro}
        inLanguage="en-IN"
        addressCountry="IN"
        availableLanguage={['English', 'Hindi']}
      />
      <APBiologyCityTemplate metro={metro} />
    </>
  )
}
