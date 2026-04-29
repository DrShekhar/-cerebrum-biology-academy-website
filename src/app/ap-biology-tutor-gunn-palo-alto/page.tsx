/**
 * /ap-biology-tutor-gunn-palo-alto
 *
 * Per-school feeder page for Henry M. Gunn High School students
 * (Palo Alto, CA). Built from APBiologySchoolTemplate +
 * apBiologySchools[gunn-palo-alto].
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildAPBiologySchoolMetadata } from '@/lib/seo/metadata'
import APBiologySchoolTemplate from '@/components/ap-biology/APBiologySchoolTemplate'
import { APBiologySchoolSchemas } from '@/components/ap-biology/APBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ap-biology/schools'

const SLUG = 'gunn-palo-alto'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildAPBiologySchoolMetadata({
  title: 'AP Biology Tutor for Gunn Students · Palo Alto · Cerebrum',
  description:
    'AP Biology tutoring for Henry M. Gunn HS students (Palo Alto) — fits Stanford-research schedules. PhD faculty, FRQ mastery, USABO track. PT live. From $1,800.',
  keywords: [
    'AP Biology tutor Gunn',
    'AP Biology tutor Henry M. Gunn High School',
    'AP Bio tutor Gunn Palo Alto',
    'Gunn USABO tutor',
    'Gunn biology olympiad coach',
    'AP Biology Score 5 Gunn',
    'Gunn private biology tutor',
    'online AP Biology tutor Gunn',
    'Gunn pre-med biology coaching',
    'Stanford pre-med prep Gunn',
    'Gunn Stanford research integration',
    'Palo Alto AP Bio tutor',
  ],
  canonical: `/ap-biology-tutor-${SLUG}`,
})

export default function APBiologyTutorGunnPaloAltoPage() {
  if (!school) notFound()
  return (
    <>
      <APBiologySchoolSchemas school={school} />
      <APBiologySchoolTemplate school={school} />
    </>
  )
}
