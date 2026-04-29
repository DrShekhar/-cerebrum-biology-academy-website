/**
 * /ap-biology-tutor-andover
 *
 * Per-school feeder page for Phillips Academy Andover students (MA).
 * Built from APBiologySchoolTemplate + apBiologySchools[andover].
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildAPBiologySchoolMetadata } from '@/lib/seo/metadata'
import APBiologySchoolTemplate from '@/components/ap-biology/APBiologySchoolTemplate'
import { APBiologySchoolSchemas } from '@/components/ap-biology/APBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ap-biology/schools'

const SLUG = 'andover'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildAPBiologySchoolMetadata({
  title: 'AP Biology Tutor for Phillips Academy Andover Students | Andover MA | Cerebrum Academy',
  description:
    "AP Biology tutoring for Phillips Academy Andover students — translates Andover's Biology 100/200 series into College Board AP rubric mastery. PhD biology faculty, USABO Semifinal track. Eastern Time. From $1,800.",
  keywords: [
    'AP Biology tutor Andover',
    'AP Biology tutor Phillips Academy Andover',
    'AP Bio tutor Phillips Andover',
    'Andover USABO tutor',
    'Andover biology lab tutor',
    'AP Biology Score 5 Andover',
    'Andover boarding school biology tutor',
    'online AP Biology tutor Andover',
    'Andover pre-med biology coaching',
    'Andover Harvard Yale Princeton prep',
    'AP Bio self-registration Andover',
    'Andover Broad Institute research',
  ],
  canonical: `/ap-biology-tutor-${SLUG}`,
})

export default function APBiologyTutorAndoverPage() {
  if (!school) notFound()
  return (
    <>
      <APBiologySchoolSchemas school={school} />
      <APBiologySchoolTemplate school={school} />
    </>
  )
}
