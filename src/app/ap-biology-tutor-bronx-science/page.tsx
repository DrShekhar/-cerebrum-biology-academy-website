/**
 * /ap-biology-tutor-bronx-science
 *
 * Per-school feeder page for The Bronx High School of Science students.
 * Built from APBiologySchoolTemplate + apBiologySchools[bronx-science].
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildAPBiologySchoolMetadata } from '@/lib/seo/metadata'
import APBiologySchoolTemplate from '@/components/ap-biology/APBiologySchoolTemplate'
import { APBiologySchoolSchemas } from '@/components/ap-biology/APBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ap-biology/schools'

const SLUG = 'bronx-science'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildAPBiologySchoolMetadata({
  title: 'AP Biology Tutor for Bronx Science Students | Bronx HS of Science NYC | Cerebrum Academy',
  description:
    'AP Biology tutoring for Bronx High School of Science students — PhD biology faculty, FRQ rubric mastery, USABO Semifinal track. Eastern Time live classes. From $1,800.',
  keywords: [
    'AP Biology tutor Bronx Science',
    'AP Biology tutor Bronx High School of Science',
    'AP Bio tutor Bronx NYC',
    'Bronx Science USABO tutor',
    'Bronx Science biology olympiad coach',
    'AP Biology Score 5 Bronx Science',
    'Bronx Science private biology tutor',
    'online AP Biology tutor Bronx Science',
    'Bronx Science pre-med biology coaching',
    'Brown PLME prep Bronx Science',
    'Cornell BS/MD prep Bronx Science',
    'Bronx Science Nobel Laureate alma mater',
  ],
  canonical: `/ap-biology-tutor-${SLUG}`,
})

export default function APBiologyTutorBronxSciencePage() {
  if (!school) notFound()
  return (
    <>
      <APBiologySchoolSchemas school={school} />
      <APBiologySchoolTemplate school={school} />
    </>
  )
}
