/**
 * /ap-biology-tutor-new-jersey
 *
 * AP Biology US metro page targeting Bergen + Princeton + Edison +
 * Monmouth corridor. Built from APBiologyCityTemplate +
 * apBiologyMetros[new-jersey].
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildAPBiologyMetroMetadata } from '@/lib/seo/metadata'
import APBiologyCityTemplate from '@/components/ap-biology/APBiologyCityTemplate'
import { APBiologyMetroSchemas } from '@/components/ap-biology/APBiologyMetroSchemas'
import { getMetroBySlug } from '@/data/ap-biology/metros'

const SLUG = 'new-jersey'
const metro = getMetroBySlug(SLUG)

export const metadata: Metadata = buildAPBiologyMetroMetadata({
  title:
    'AP Biology Tutor New Jersey | Bergen Academies · High Tech HS · Lawrenceville · Princeton | Cerebrum Academy',
  description:
    'AP Biology tutoring for New Jersey students — Bergen County Academies, High Tech HS Lincroft, Edison Academy Magnet, Lawrenceville, Princeton High School, West Windsor-Plainsboro, Millburn, Pingry, Newark Academy, Peddie and more. PhD biology faculty, FRQ rubric mastery, Eastern Time. From $1,800.',
  keywords: [
    'AP Biology tutor New Jersey',
    'AP Biology tutor Bergen County',
    'AP Biology tutor Princeton',
    'AP Biology tutor Monmouth',
    'AP Biology tutor Edison',
    'AP Bio tutor Bergen County Academies',
    'AP Bio tutor High Tech HS Lincroft',
    'AP Bio tutor Edison Academy Magnet',
    'AP Bio tutor Lawrenceville School',
    'AP Bio tutor Princeton High',
    'AP Bio tutor West Windsor-Plainsboro',
    'AP Bio tutor Millburn',
    'AP Bio tutor Pingry',
    'AP Bio tutor Newark Academy',
    'AP Bio tutor Peddie',
    'AP Biology score 5 New Jersey',
    'USABO tutor New Jersey',
    'BS/MD prep New Jersey Rutgers RWJ NJMS',
    'private AP Biology tutor NJ',
    'online AP Biology tutor New Jersey',
  ],
  canonical: `/ap-biology-tutor-${SLUG}`,
})

export default function APBiologyTutorNewJerseyPage() {
  if (!metro) notFound()
  return (
    <>
      <APBiologyMetroSchemas metro={metro} />
      <APBiologyCityTemplate metro={metro} />
    </>
  )
}
