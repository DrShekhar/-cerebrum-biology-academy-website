/**
 * /ap-biology-tutor-boston
 *
 * AP Biology US metro page targeting Greater Boston + Cambridge +
 * Western Suburbs (also covers the Phillips Exeter / Andover boarding
 * cluster within reach). Built from APBiologyCityTemplate +
 * apBiologyMetros[boston]. Schemas emitted via APBiologyMetroSchemas.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildAPBiologyMetroMetadata } from '@/lib/seo/metadata'
import APBiologyCityTemplate from '@/components/ap-biology/APBiologyCityTemplate'
import { APBiologyMetroSchemas } from '@/components/ap-biology/APBiologyMetroSchemas'
import { getMetroBySlug } from '@/data/ap-biology/metros'

const SLUG = 'boston'
const metro = getMetroBySlug(SLUG)

export const metadata: Metadata = buildAPBiologyMetroMetadata({
  title: 'AP Biology Tutor Boston · Cambridge + Suburbs · Cerebrum',
  description:
    'AP Biology tutoring for Boston students — Boston Latin, Lexington, Newton, Phillips Exeter, Andover. PhD faculty, FRQ rubric mastery, ET live classes. From $1,800.',
  keywords: [
    'AP Biology tutor Boston',
    'AP Biology tutor Cambridge',
    'AP Biology tutor Newton',
    'AP Biology tutor Brookline',
    'AP Biology tutor Lexington',
    'AP Bio tutor Boston Latin',
    'AP Bio tutor Phillips Exeter',
    'AP Bio tutor Andover',
    'AP Bio tutor Roxbury Latin',
    'AP Biology score 5 Boston',
    'AP Biology FRQ tutor Massachusetts',
    'USABO tutor Boston',
    'BS/MD prep Boston Brown PLME',
    'private AP Biology tutor Boston',
    'online AP Biology tutor New England',
    'AP Biology tutor Wellesley',
    'AP Biology tutor Concord',
  ],
  canonical: `/ap-biology-tutor-${SLUG}`,
})

export default function APBiologyTutorBostonPage() {
  if (!metro) notFound()
  return (
    <>
      <APBiologyMetroSchemas metro={metro} />
      <APBiologyCityTemplate metro={metro} />
    </>
  )
}
