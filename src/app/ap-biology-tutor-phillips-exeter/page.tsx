/**
 * /ap-biology-tutor-phillips-exeter
 *
 * Per-school feeder page for Phillips Exeter Academy students (NH).
 * Built from APBiologySchoolTemplate + apBiologySchools[phillips-exeter].
 *
 * Note — Exeter does not run College Board AP Biology in the standard
 * format; students self-register for the May exam. Page positions
 * tutoring as the AP-rubric-application layer to translate Exeter's
 * Harkness-discussion-based biology into AP-5 outcomes.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildAPBiologySchoolMetadata } from '@/lib/seo/metadata'
import APBiologySchoolTemplate from '@/components/ap-biology/APBiologySchoolTemplate'
import { APBiologySchoolSchemas } from '@/components/ap-biology/APBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ap-biology/schools'

const SLUG = 'phillips-exeter'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildAPBiologySchoolMetadata({
  title: 'AP Biology Tutor for Phillips Exeter Students | Exeter NH Boarding | Cerebrum Academy',
  description:
    "AP Biology tutoring for Phillips Exeter Academy students — translates Exeter's Harkness-discussion biology into College Board AP rubric mastery. PhD biology faculty, USABO Semifinal track. Eastern Time. Coordinates with Exeter dorm rules. From $1,800.",
  keywords: [
    'AP Biology tutor Phillips Exeter',
    'AP Biology tutor Exeter Academy',
    'AP Bio tutor Phillips Exeter NH',
    'Phillips Exeter USABO tutor',
    'Exeter biology Harkness method tutor',
    'AP Biology Score 5 Phillips Exeter',
    'Exeter boarding school biology tutor',
    'online AP Biology tutor Phillips Exeter',
    'Phillips Exeter pre-med biology coaching',
    'Brown PLME prep Phillips Exeter',
    'AP Bio self-registration Exeter',
    'Phillips Exeter Sunday tutor sessions',
  ],
  canonical: `/ap-biology-tutor-${SLUG}`,
})

export default function APBiologyTutorPhillipsExeterPage() {
  if (!school) notFound()
  return (
    <>
      <APBiologySchoolSchemas school={school} />
      <APBiologySchoolTemplate school={school} />
    </>
  )
}
