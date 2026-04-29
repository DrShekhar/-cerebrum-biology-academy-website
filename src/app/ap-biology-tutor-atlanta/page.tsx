/**
 * /ap-biology-tutor-atlanta
 *
 * AP Biology US metro page targeting Atlanta Metro + North Suburbs.
 * Built from APBiologyCityTemplate + apBiologyMetros[atlanta].
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildAPBiologyMetroMetadata } from '@/lib/seo/metadata'
import APBiologyCityTemplate from '@/components/ap-biology/APBiologyCityTemplate'
import { APBiologyMetroSchemas } from '@/components/ap-biology/APBiologyMetroSchemas'
import { getMetroBySlug } from '@/data/ap-biology/metros'

const SLUG = 'atlanta'
const metro = getMetroBySlug(SLUG)

export const metadata: Metadata = buildAPBiologyMetroMetadata({
  title: 'AP Biology Tutor Atlanta · North Fulton · Cerebrum',
  description:
    'AP Biology tutoring for Atlanta students — Walton, Lambert, Northview, Pace Academy, Westminster, Gwinnett STEM. PhD faculty, FRQ mastery, ET live. From $1,800.',
  keywords: [
    'AP Biology tutor Atlanta',
    'AP Biology tutor North Fulton',
    'AP Biology tutor Sandy Springs',
    'AP Biology tutor Roswell',
    'AP Biology tutor Alpharetta',
    'AP Bio tutor Walton High',
    'AP Bio tutor Lambert High',
    'AP Bio tutor Northview',
    'AP Bio tutor Pace Academy',
    'AP Bio tutor Westminster Schools Atlanta',
    'AP Bio tutor Lovett School',
    'AP Bio tutor Gwinnett School Math Science Tech',
    'AP Biology score 5 Atlanta',
    'AP Biology FRQ tutor Georgia',
    'USABO tutor Atlanta',
    'BS/MD prep Atlanta Emory Georgia Tech',
    'private AP Biology tutor Atlanta',
    'online AP Biology tutor Georgia',
  ],
  canonical: `/ap-biology-tutor-${SLUG}`,
})

export default function APBiologyTutorAtlantaPage() {
  if (!metro) notFound()
  return (
    <>
      <APBiologyMetroSchemas metro={metro} />
      <APBiologyCityTemplate metro={metro} />
    </>
  )
}
