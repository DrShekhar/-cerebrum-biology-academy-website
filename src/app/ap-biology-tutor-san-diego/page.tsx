import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildAPBiologyMetroMetadata } from '@/lib/seo/metadata'
import APBiologyCityTemplate from '@/components/ap-biology/APBiologyCityTemplate'
import { APBiologyMetroSchemas } from '@/components/ap-biology/APBiologyMetroSchemas'
import { getMetroBySlug } from '@/data/ap-biology/metros'

const SLUG = 'san-diego'
const metro = getMetroBySlug(SLUG)

export const metadata: Metadata = buildAPBiologyMetroMetadata({
  title: 'AP Biology Tutor San Diego · Torrey Pines · Cerebrum',
  description:
    "AP Biology tutoring for San Diego students — Torrey Pines, Canyon Crest, La Jolla, Bishop's, Francis Parker. PhD faculty, FRQ rubric mastery, PT live classes. From $1,800.",
  keywords: [
    'AP Biology tutor San Diego',
    'AP Biology tutor Torrey Pines',
    'AP Biology tutor La Jolla',
    'AP Bio tutor Canyon Crest',
    'AP Bio tutor Bishops School',
    'AP Biology tutor North County',
    'online AP Biology coaching San Diego',
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
