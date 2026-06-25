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
  title: 'AP Biology Tutor for Andover Students · MA · Cerebrum',
  description:
    "AP Biology for Phillips Academy Andover students — translates Andover's Biology series into AP rubric mastery. AIIMS-trained faculty, USABO track, ET live. From $2,500/yr (1:1 from $40/hr).",
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
