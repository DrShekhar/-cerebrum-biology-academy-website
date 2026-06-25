import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildAPBiologyMetroMetadata } from '@/lib/seo/metadata'
import APBiologyCityTemplate from '@/components/ap-biology/APBiologyCityTemplate'
import { APBiologyMetroSchemas } from '@/components/ap-biology/APBiologyMetroSchemas'
import { getMetroBySlug } from '@/data/ap-biology/metros'

const SLUG = 'phoenix'
const metro = getMetroBySlug(SLUG)

export const metadata: Metadata = buildAPBiologyMetroMetadata({
  title: 'AP Biology Tutor Phoenix · Scottsdale · Cerebrum',
  description:
    'AP Biology tutoring for Phoenix students — Basis Schools, Hamilton, Desert Mountain, Brophy, Xavier. AIIMS-trained faculty, FRQ rubric mastery, MST live classes. From $2,500/yr (1:1 from $40/hr).',
  keywords: [
    'AP Biology tutor Phoenix',
    'AP Biology tutor Scottsdale',
    'AP Biology tutor Chandler',
    'AP Biology tutor Gilbert',
    'AP Bio tutor Basis Schools',
    'AP Bio tutor Hamilton High',
    'AP Biology tutor Arizona',
    'online AP Biology coaching Phoenix',
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
