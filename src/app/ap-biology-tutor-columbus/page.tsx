/**
 * /ap-biology-tutor-columbus
 *
 * AP Biology US metro page targeting Central Ohio — the northern
 * Columbus suburbs (Upper Arlington, Dublin, Olentangy, Worthington,
 * New Albany). Built from APBiologyCityTemplate +
 * apBiologyMetros[columbus]. Schemas emitted via APBiologyMetroSchemas.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildAPBiologyMetroMetadata } from '@/lib/seo/metadata'
import APBiologyCityTemplate from '@/components/ap-biology/APBiologyCityTemplate'
import { APBiologyMetroSchemas } from '@/components/ap-biology/APBiologyMetroSchemas'
import { getMetroBySlug } from '@/data/ap-biology/metros'

const SLUG = 'columbus'
const metro = getMetroBySlug(SLUG)

export const metadata: Metadata = buildAPBiologyMetroMetadata({
  title: 'AP Biology Tutor Columbus · Central Ohio Suburbs · Cerebrum',
  description:
    'AP Biology tutoring for Columbus students — Upper Arlington, Dublin, Olentangy Liberty, Thomas Worthington, New Albany. AIIMS-trained faculty, FRQ rubric mastery, ET live classes. From $2,500/yr (1:1 from $40/hr).',
  keywords: [
    'AP Biology tutor Columbus',
    'AP Biology tutor Columbus Ohio',
    'AP Biology tutor Upper Arlington',
    'AP Biology tutor Dublin Ohio',
    'AP Bio tutor Olentangy',
    'AP Bio tutor Worthington',
    'AP Bio tutor New Albany',
    'AP Biology score 5 Columbus',
    'AP Biology FRQ tutor Ohio',
    'USABO tutor Columbus',
    'Ohio State pre-med AP Biology',
    'private AP Biology tutor Columbus',
    'online AP Biology tutor Ohio',
    'AP Biology tutor Hilliard',
    'AP Biology tutor Bexley',
  ],
  canonical: `/ap-biology-tutor-${SLUG}`,
})

export default function APBiologyTutorColumbusPage() {
  if (!metro) notFound()
  return (
    <>
      <APBiologyMetroSchemas metro={metro} />
      <APBiologyCityTemplate metro={metro} />
    </>
  )
}
