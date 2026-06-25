/**
 * /ap-biology-tutor-ann-arbor
 *
 * AP Biology US metro page targeting Ann Arbor + Washtenaw County —
 * Pioneer, Huron, Skyline, Greenhills, Community High School, near the
 * University of Michigan research campus. Built from APBiologyCityTemplate
 * + apBiologyMetros[ann-arbor]. Schemas emitted via APBiologyMetroSchemas.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildAPBiologyMetroMetadata } from '@/lib/seo/metadata'
import APBiologyCityTemplate from '@/components/ap-biology/APBiologyCityTemplate'
import { APBiologyMetroSchemas } from '@/components/ap-biology/APBiologyMetroSchemas'
import { getMetroBySlug } from '@/data/ap-biology/metros'

const SLUG = 'ann-arbor'
const metro = getMetroBySlug(SLUG)

export const metadata: Metadata = buildAPBiologyMetroMetadata({
  title: 'AP Biology Tutor Ann Arbor · Washtenaw County · Cerebrum',
  description:
    'AP Biology tutoring for Ann Arbor students — Pioneer, Huron, Skyline, Greenhills, Community High School. AIIMS-trained faculty, FRQ rubric mastery, ET live classes. From $2,500/yr (1:1 from $40/hr).',
  keywords: [
    'AP Biology tutor Ann Arbor',
    'AP Biology tutor Pioneer High School',
    'AP Biology tutor Huron High School',
    'AP Biology tutor Skyline',
    'AP Bio tutor Greenhills',
    'AP Bio tutor Community High School',
    'AP Biology score 5 Ann Arbor',
    'AP Biology FRQ tutor Michigan',
    'USABO tutor Ann Arbor',
    'University of Michigan pre-med AP Biology',
    'science research tutor Ann Arbor',
    'private AP Biology tutor Ann Arbor',
    'online AP Biology tutor Michigan',
    'AP Biology tutor Saline',
    'AP Biology tutor Dexter',
  ],
  canonical: `/ap-biology-tutor-${SLUG}`,
})

export default function APBiologyTutorAnnArborPage() {
  if (!metro) notFound()
  return (
    <>
      <APBiologyMetroSchemas metro={metro} />
      <APBiologyCityTemplate metro={metro} />
    </>
  )
}
