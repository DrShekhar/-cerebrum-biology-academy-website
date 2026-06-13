import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildAPBiologyMetroMetadata } from '@/lib/seo/metadata'
import APBiologyCityTemplate from '@/components/ap-biology/APBiologyCityTemplate'
import { APBiologyMetroSchemas } from '@/components/ap-biology/APBiologyMetroSchemas'
import { getMetroBySlug } from '@/data/ap-biology/metros'

const SLUG = 'portland'
const metro = getMetroBySlug(SLUG)

export const metadata: Metadata = buildAPBiologyMetroMetadata({
  title: 'AP Biology Tutor Portland · Lake Oswego · Cerebrum',
  description:
    'AP Biology tutoring for Portland students — Lincoln, Catlin Gabel, Oregon Episcopal, Lake Oswego, Sunset. PhD faculty, FRQ rubric mastery, PT live classes. From $1,800.',
  keywords: [
    'AP Biology tutor Portland',
    'AP Biology tutor Lake Oswego',
    'AP Biology tutor Beaverton',
    'AP Bio tutor Catlin Gabel',
    'AP Bio tutor Oregon Episcopal',
    'AP Biology tutor Oregon',
    'online AP Biology coaching Portland',
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
