/**
 * /ap-biology-tutor-philadelphia
 *
 * AP Biology US metro page targeting Philadelphia + the Main Line +
 * the city magnet high schools (Masterman, Central, GAMP). Built from
 * APBiologyCityTemplate + apBiologyMetros[philadelphia]. Schemas emitted
 * via APBiologyMetroSchemas.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildAPBiologyMetroMetadata } from '@/lib/seo/metadata'
import APBiologyCityTemplate from '@/components/ap-biology/APBiologyCityTemplate'
import { APBiologyMetroSchemas } from '@/components/ap-biology/APBiologyMetroSchemas'
import { getMetroBySlug } from '@/data/ap-biology/metros'

const SLUG = 'philadelphia'
const metro = getMetroBySlug(SLUG)

export const metadata: Metadata = buildAPBiologyMetroMetadata({
  title: 'AP Biology Tutor Philadelphia · Main Line + Magnets · Cerebrum',
  description:
    'AP Biology tutoring for Philadelphia students — Lower Merion, Harriton, Radnor, Conestoga, Masterman, Central, GAMP. AIIMS-trained faculty, FRQ rubric mastery, ET live classes. From $2,500/yr (1:1 from $40/hr).',
  keywords: [
    'AP Biology tutor Philadelphia',
    'AP Biology tutor Main Line',
    'AP Biology tutor Lower Merion',
    'AP Biology tutor Conestoga',
    'AP Bio tutor Masterman',
    'AP Bio tutor Central High School',
    'AP Bio tutor Radnor',
    'AP Biology score 5 Philadelphia',
    'AP Biology FRQ tutor Pennsylvania',
    'USABO tutor Philadelphia',
    'BS/MD prep Philadelphia',
    'private AP Biology tutor Philadelphia',
    'online AP Biology tutor Pennsylvania',
    'AP Biology tutor Bryn Mawr',
    'AP Biology tutor Wayne PA',
  ],
  canonical: `/ap-biology-tutor-${SLUG}`,
})

export default function APBiologyTutorPhiladelphiaPage() {
  if (!metro) notFound()
  return (
    <>
      <APBiologyMetroSchemas metro={metro} />
      <APBiologyCityTemplate metro={metro} />
    </>
  )
}
