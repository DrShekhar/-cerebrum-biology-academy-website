/**
 * /ap-biology-tutor-new-york
 *
 * AP Biology US metro page targeting NYC + Long Island + Westchester.
 * Built from APBiologyCityTemplate + apBiologyMetros[new-york] data.
 * Schemas (Course / FAQ / Breadcrumb / Speakable) emitted via the
 * shared APBiologyMetroSchemas component.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildAPBiologyMetroMetadata } from '@/lib/seo/metadata'
import APBiologyCityTemplate from '@/components/ap-biology/APBiologyCityTemplate'
import { APBiologyMetroSchemas } from '@/components/ap-biology/APBiologyMetroSchemas'
import { getMetroBySlug } from '@/data/ap-biology/metros'

const SLUG = 'new-york'
const metro = getMetroBySlug(SLUG)

export const metadata: Metadata = buildAPBiologyMetroMetadata({
  title: 'AP Biology Tutor New York · NYC + LI · Cerebrum',
  description:
    'AP Biology tutoring for NYC students — Stuyvesant, Bronx Science, Hunter, Trinity, Horace Mann. AIIMS-trained faculty, FRQ rubric mastery, ET live classes. From $2,500/yr (1:1 from $40/hr).',
  keywords: [
    'AP Biology tutor New York',
    'AP Biology tutor NYC',
    'AP Biology tutor Manhattan',
    'AP Biology tutor Long Island',
    'AP Biology tutor Westchester',
    'AP Bio tutor Stuyvesant',
    'AP Bio tutor Bronx Science',
    'AP Bio tutor Hunter College High School',
    'AP Biology tutoring Trinity School',
    'AP Biology tutor Horace Mann',
    'AP Biology score 5 NYC',
    'AP Biology FRQ tutor New York',
    'USABO tutor New York',
    'BS/MD prep New York',
    'private AP Biology tutor New York',
    'online AP Biology tutor NYC',
  ],
  canonical: `/ap-biology-tutor-${SLUG}`,
})

export default function APBiologyTutorNewYorkPage() {
  if (!metro) notFound()
  return (
    <>
      <APBiologyMetroSchemas metro={metro} />
      <APBiologyCityTemplate metro={metro} />
    </>
  )
}
