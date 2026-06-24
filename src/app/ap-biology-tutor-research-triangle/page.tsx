import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildAPBiologyMetroMetadata } from '@/lib/seo/metadata'
import APBiologyCityTemplate from '@/components/ap-biology/APBiologyCityTemplate'
import { APBiologyMetroSchemas } from '@/components/ap-biology/APBiologyMetroSchemas'
import { getMetroBySlug } from '@/data/ap-biology/metros'

const SLUG = 'research-triangle'
const metro = getMetroBySlug(SLUG)

export const metadata: Metadata = buildAPBiologyMetroMetadata({
  title: 'AP Biology Tutor Research Triangle (Raleigh–Durham) · Cerebrum',
  description:
    'AP Biology tutoring for Research Triangle students — NCSSM, Enloe, Green Hope, Panther Creek, Cary. FRQ rubric mastery, score-5 targeting, ET live classes. Open to any student.',
  keywords: [
    'AP Biology tutor Raleigh',
    'AP Biology tutor Durham',
    'AP Biology tutor Research Triangle',
    'AP Bio tutor Cary',
    'AP Bio tutor NCSSM',
    'AP Biology tutor North Carolina',
    'online AP Biology coaching Raleigh',
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
