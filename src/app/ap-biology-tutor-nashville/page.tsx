/**
 * /ap-biology-tutor-nashville
 *
 * AP Biology US metro page targeting Nashville + Williamson County —
 * the magnets (Hume-Fogg, MLK), University School of Nashville, and the
 * southern suburbs (Ravenwood, Brentwood, Franklin), near Vanderbilt's
 * medical campus. Built from APBiologyCityTemplate +
 * apBiologyMetros[nashville]. Schemas emitted via APBiologyMetroSchemas.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildAPBiologyMetroMetadata } from '@/lib/seo/metadata'
import APBiologyCityTemplate from '@/components/ap-biology/APBiologyCityTemplate'
import { APBiologyMetroSchemas } from '@/components/ap-biology/APBiologyMetroSchemas'
import { getMetroBySlug } from '@/data/ap-biology/metros'

const SLUG = 'nashville'
const metro = getMetroBySlug(SLUG)

export const metadata: Metadata = buildAPBiologyMetroMetadata({
  title: 'AP Biology Tutor Nashville · Williamson County · Cerebrum',
  description:
    'AP Biology tutoring for Nashville students — Hume-Fogg, MLK Magnet, University School of Nashville, Ravenwood. AIIMS-trained faculty, FRQ rubric mastery, CT live classes. From $2,500/yr (1:1 from $40/hr).',
  keywords: [
    'AP Biology tutor Nashville',
    'AP Biology tutor Hume-Fogg',
    'AP Biology tutor MLK Magnet',
    'AP Biology tutor Ravenwood',
    'AP Bio tutor University School of Nashville',
    'AP Bio tutor Brentwood',
    'AP Bio tutor Franklin TN',
    'AP Biology score 5 Nashville',
    'AP Biology FRQ tutor Tennessee',
    'USABO tutor Nashville',
    'Vanderbilt pre-med AP Biology',
    'private AP Biology tutor Nashville',
    'online AP Biology tutor Tennessee',
    'AP Biology tutor Williamson County',
    'AP Biology tutor Montgomery Bell Academy',
  ],
  canonical: `/ap-biology-tutor-${SLUG}`,
})

export default function APBiologyTutorNashvillePage() {
  if (!metro) notFound()
  return (
    <>
      <APBiologyMetroSchemas metro={metro} />
      <APBiologyCityTemplate metro={metro} />
    </>
  )
}
