/**
 * /ap-biology-tutor-seattle
 *
 * AP Biology US metro page targeting Seattle + Eastside + Mercer Island.
 * Built from APBiologyCityTemplate + apBiologyMetros[seattle].
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildAPBiologyMetroMetadata } from '@/lib/seo/metadata'
import APBiologyCityTemplate from '@/components/ap-biology/APBiologyCityTemplate'
import { APBiologyMetroSchemas } from '@/components/ap-biology/APBiologyMetroSchemas'
import { getMetroBySlug } from '@/data/ap-biology/metros'

const SLUG = 'seattle'
const metro = getMetroBySlug(SLUG)

export const metadata: Metadata = buildAPBiologyMetroMetadata({
  title: 'AP Biology Tutor Seattle · Lakeside · Bellevue · Cerebrum',
  description:
    'AP Biology tutoring for Seattle students — Lakeside, Seattle Prep, Bellevue, Mercer Island, International School. AIIMS-trained faculty, FRQ mastery, PT live. From $2,500/yr (1:1 from $40/hr).',
  keywords: [
    'AP Biology tutor Seattle',
    'AP Biology tutor Bellevue',
    'AP Biology tutor Mercer Island',
    'AP Biology tutor Eastside',
    'AP Bio tutor Lakeside School',
    'AP Bio tutor Seattle Prep',
    'AP Bio tutor International School Bellevue',
    'AP Bio tutor Newport High',
    'AP Bio tutor Garfield High',
    'AP Biology score 5 Seattle',
    'AP Biology FRQ tutor Washington',
    'USABO tutor Seattle',
    'private AP Biology tutor Seattle',
    'online AP Biology tutor Washington state',
    'AP Biology biotech research Fred Hutch ISB',
  ],
  canonical: `/ap-biology-tutor-${SLUG}`,
})

export default function APBiologyTutorSeattlePage() {
  if (!metro) notFound()
  return (
    <>
      <APBiologyMetroSchemas metro={metro} />
      <APBiologyCityTemplate metro={metro} />
    </>
  )
}
