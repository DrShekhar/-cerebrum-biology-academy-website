/**
 * /ap-biology-tutor-connecticut
 *
 * AP Biology US metro page targeting Fairfield County / the Connecticut
 * Gold Coast — Greenwich, Staples (Westport), Darien, New Canaan,
 * Wilton, Ridgefield. Built from APBiologyCityTemplate +
 * apBiologyMetros[connecticut]. Schemas emitted via APBiologyMetroSchemas.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildAPBiologyMetroMetadata } from '@/lib/seo/metadata'
import APBiologyCityTemplate from '@/components/ap-biology/APBiologyCityTemplate'
import { APBiologyMetroSchemas } from '@/components/ap-biology/APBiologyMetroSchemas'
import { getMetroBySlug } from '@/data/ap-biology/metros'

const SLUG = 'connecticut'
const metro = getMetroBySlug(SLUG)

export const metadata: Metadata = buildAPBiologyMetroMetadata({
  title: 'AP Biology Tutor Connecticut · Fairfield County · Cerebrum',
  description:
    'AP Biology tutoring for Fairfield County students — Greenwich, Staples Westport, Darien, New Canaan, Wilton, Ridgefield. AIIMS-trained faculty, FRQ rubric mastery, ET live classes. From $2,500/yr (1:1 from $40/hr).',
  keywords: [
    'AP Biology tutor Connecticut',
    'AP Biology tutor Fairfield County',
    'AP Biology tutor Greenwich',
    'AP Biology tutor Westport',
    'AP Bio tutor Darien',
    'AP Bio tutor New Canaan',
    'AP Bio tutor Wilton',
    'AP Biology score 5 Connecticut',
    'AP Biology FRQ tutor Connecticut',
    'USABO tutor Connecticut',
    'BS/MD prep Connecticut',
    'private AP Biology tutor Greenwich',
    'online AP Biology tutor Fairfield County',
    'AP Biology tutor Ridgefield',
    'AP Biology tutor Staples',
  ],
  canonical: `/ap-biology-tutor-${SLUG}`,
})

export default function APBiologyTutorConnecticutPage() {
  if (!metro) notFound()
  return (
    <>
      <APBiologyMetroSchemas metro={metro} />
      <APBiologyCityTemplate metro={metro} />
    </>
  )
}
