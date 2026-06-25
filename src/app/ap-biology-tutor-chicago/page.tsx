/**
 * /ap-biology-tutor-chicago
 *
 * AP Biology US metro page targeting Chicago + North Shore + Western
 * Suburbs. Built from APBiologyCityTemplate + apBiologyMetros[chicago].
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildAPBiologyMetroMetadata } from '@/lib/seo/metadata'
import APBiologyCityTemplate from '@/components/ap-biology/APBiologyCityTemplate'
import { APBiologyMetroSchemas } from '@/components/ap-biology/APBiologyMetroSchemas'
import { getMetroBySlug } from '@/data/ap-biology/metros'

const SLUG = 'chicago'
const metro = getMetroBySlug(SLUG)

export const metadata: Metadata = buildAPBiologyMetroMetadata({
  title: 'AP Biology Tutor Chicago · IMSA · Whitney Young · Cerebrum',
  description:
    'AP Biology tutoring for Chicago students — Whitney Young, Walter Payton, Northside, IMSA, New Trier. AIIMS-trained faculty, FRQ mastery, CT live classes. From $2,500/yr (1:1 from $40/hr).',
  keywords: [
    'AP Biology tutor Chicago',
    'AP Biology tutor Naperville',
    'AP Biology tutor North Shore',
    'AP Biology tutor Lake Forest',
    'AP Bio tutor Whitney Young',
    'AP Bio tutor Walter Payton',
    'AP Bio tutor Northside College Prep',
    'AP Bio tutor Jones College Prep',
    'AP Bio tutor IMSA',
    'AP Bio tutor New Trier',
    'AP Bio tutor Stevenson',
    'AP Bio tutor Hinsdale Central',
    'AP Biology score 5 Chicago',
    'AP Biology FRQ tutor Illinois',
    'USABO tutor Chicago',
    'BS/MD prep Chicago Northwestern HPME',
    'private AP Biology tutor Chicago',
    'online AP Biology tutor Illinois',
  ],
  canonical: `/ap-biology-tutor-${SLUG}`,
})

export default function APBiologyTutorChicagoPage() {
  if (!metro) notFound()
  return (
    <>
      <APBiologyMetroSchemas metro={metro} />
      <APBiologyCityTemplate metro={metro} />
    </>
  )
}
