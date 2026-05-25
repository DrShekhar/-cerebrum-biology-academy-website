import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildAPBiologyMetroMetadata } from '@/lib/seo/metadata'
import APBiologyCityTemplate from '@/components/ap-biology/APBiologyCityTemplate'
import { APBiologyMetroSchemas } from '@/components/ap-biology/APBiologyMetroSchemas'
import { getMetroBySlug } from '@/data/ap-biology/metros'

const SLUG = 'austin'
const metro = getMetroBySlug(SLUG)

export const metadata: Metadata = buildAPBiologyMetroMetadata({
  title: 'AP Biology Tutor Austin · Round Rock · Cerebrum',
  description:
    "AP Biology tutoring for Austin students — LASA, Westlake, Westwood, McNeil, St. Stephen's. PhD faculty, FRQ rubric mastery, CT live classes. From $1,800.",
  keywords: [
    'AP Biology tutor Austin',
    'AP Biology tutor Round Rock',
    'AP Biology tutor Cedar Park',
    'AP Bio tutor LASA',
    'AP Bio tutor Westlake',
    'AP Biology tutor Texas',
    'online AP Biology coaching Austin',
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
