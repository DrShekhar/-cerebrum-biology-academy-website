import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildAPBiologyMetroMetadata } from '@/lib/seo/metadata'
import APBiologyCityTemplate from '@/components/ap-biology/APBiologyCityTemplate'
import { APBiologyMetroSchemas } from '@/components/ap-biology/APBiologyMetroSchemas'
import { getMetroBySlug } from '@/data/ap-biology/metros'

const SLUG = 'denver'
const metro = getMetroBySlug(SLUG)

export const metadata: Metadata = buildAPBiologyMetroMetadata({
  title: 'AP Biology Tutor Denver · Boulder · Cerebrum',
  description:
    'AP Biology tutoring for Denver students — Cherry Creek, ThunderRidge, Fairview Boulder, Kent Denver. PhD faculty, FRQ rubric mastery, MT live classes. From $1,800.',
  keywords: [
    'AP Biology tutor Denver',
    'AP Biology tutor Boulder',
    'AP Biology tutor Centennial',
    'AP Biology tutor Lone Tree',
    'AP Bio tutor Cherry Creek',
    'AP Bio tutor Fairview',
    'AP Biology tutor Colorado',
    'online AP Biology coaching Denver',
  ],
  canonical: `/ap-biology-tutor-${SLUG}`,
})

export default function Page() {
  if (!metro) notFound()
  return (
    <>
      <APBiologyMetroSchemas metro={metro} />
      <APBiologyCityTemplate metro={metro} />
    </>
  )
}
