import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildAPBiologyMetroMetadata } from '@/lib/seo/metadata'
import APBiologyCityTemplate from '@/components/ap-biology/APBiologyCityTemplate'
import { APBiologyMetroSchemas } from '@/components/ap-biology/APBiologyMetroSchemas'
import { getMetroBySlug } from '@/data/ap-biology/metros'

const SLUG = 'miami'
const metro = getMetroBySlug(SLUG)

export const metadata: Metadata = buildAPBiologyMetroMetadata({
  title: 'AP Biology Tutor Miami · South Florida · Cerebrum',
  description:
    "AP Biology tutoring for Miami students — Ransom Everglades, Gulliver, Palmer Trinity, Palmetto, MAST Academy. PhD faculty, FRQ rubric mastery, ET live classes. From $1,800.",
  keywords: [
    'AP Biology tutor Miami',
    'AP Biology tutor South Florida',
    'AP Biology tutor Weston',
    'AP Biology tutor Coral Springs',
    'AP Bio tutor Ransom Everglades',
    'AP Bio tutor Gulliver Prep',
    'AP Biology tutor Broward',
    'online AP Biology coaching Miami',
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
