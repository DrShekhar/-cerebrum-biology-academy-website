import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildAPBiologyMetroMetadata } from '@/lib/seo/metadata'
import APBiologyCityTemplate from '@/components/ap-biology/APBiologyCityTemplate'
import { APBiologyMetroSchemas } from '@/components/ap-biology/APBiologyMetroSchemas'
import { getMetroBySlug } from '@/data/ap-biology/metros'

const SLUG = 'twin-cities'
const metro = getMetroBySlug(SLUG)

export const metadata: Metadata = buildAPBiologyMetroMetadata({
  title: 'AP Biology Tutor Minneapolis–St. Paul (Twin Cities) · Cerebrum',
  description:
    'AP Biology tutoring for Twin Cities students — Wayzata, Edina, Eden Prairie, Minnetonka, Mounds View. FRQ rubric mastery, score-5 targeting, CT live classes. Open to any student.',
  keywords: [
    'AP Biology tutor Minneapolis',
    'AP Biology tutor Twin Cities',
    'AP Biology tutor St Paul',
    'AP Bio tutor Wayzata',
    'AP Bio tutor Edina',
    'AP Biology tutor Minnesota',
    'online AP Biology coaching Minneapolis',
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
