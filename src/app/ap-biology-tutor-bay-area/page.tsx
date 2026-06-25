/**
 * /ap-biology-tutor-bay-area
 *
 * AP Biology US metro page targeting San Francisco + Silicon Valley +
 * East Bay. Built from APBiologyCityTemplate + apBiologyMetros[bay-area]
 * data. Schemas emitted via the shared APBiologyMetroSchemas component.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildAPBiologyMetroMetadata } from '@/lib/seo/metadata'
import APBiologyCityTemplate from '@/components/ap-biology/APBiologyCityTemplate'
import { APBiologyMetroSchemas } from '@/components/ap-biology/APBiologyMetroSchemas'
import { getMetroBySlug } from '@/data/ap-biology/metros'

const SLUG = 'bay-area'
const metro = getMetroBySlug(SLUG)

export const metadata: Metadata = buildAPBiologyMetroMetadata({
  title: 'AP Biology Tutor Bay Area · SF + Silicon Valley · Cerebrum',
  description:
    'AP Biology tutoring for Bay Area students — Harker, Mission SJ, Lynbrook, Gunn, Palo Alto. AIIMS-trained faculty, FRQ rubric mastery, PT live classes. From $2,500/yr (1:1 from $40/hr).',
  keywords: [
    'AP Biology tutor Bay Area',
    'AP Biology tutor San Francisco',
    'AP Biology tutor Silicon Valley',
    'AP Biology tutor Palo Alto',
    'AP Biology tutor San Jose',
    'AP Bio tutor Harker',
    'AP Bio tutor Mission San Jose',
    'AP Bio tutor Lynbrook',
    'AP Bio tutor Henry M. Gunn',
    'AP Bio tutor Palo Alto High School',
    'AP Biology score 5 Bay Area',
    'AP Biology FRQ tutor California',
    'USABO tutor Bay Area',
    'private AP Biology tutor San Francisco',
    'online AP Biology tutor California',
    'AP Biology tutor Cupertino',
    'AP Biology tutor Fremont',
  ],
  canonical: `/ap-biology-tutor-${SLUG}`,
})

export default function APBiologyTutorBayAreaPage() {
  if (!metro) notFound()
  return (
    <>
      <APBiologyMetroSchemas metro={metro} />
      <APBiologyCityTemplate metro={metro} />
    </>
  )
}
