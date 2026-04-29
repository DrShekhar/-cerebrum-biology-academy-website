/**
 * /ap-biology-tutor-hunter-college-hs
 *
 * Per-school feeder page for Hunter College High School students
 * (Manhattan, NYC). Built from APBiologySchoolTemplate +
 * apBiologySchools[hunter-college-hs].
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildAPBiologySchoolMetadata } from '@/lib/seo/metadata'
import APBiologySchoolTemplate from '@/components/ap-biology/APBiologySchoolTemplate'
import { APBiologySchoolSchemas } from '@/components/ap-biology/APBiologySchoolSchemas'
import { getSchoolBySlug } from '@/data/ap-biology/schools'

const SLUG = 'hunter-college-hs'
const school = getSchoolBySlug(SLUG)

export const metadata: Metadata = buildAPBiologySchoolMetadata({
  title: 'AP Biology Tutor for Hunter College HS Students · NYC · Cerebrum',
  description:
    'AP Biology tutoring for Hunter College HS students (NYC). PhD faculty, FRQ rubric mastery, USABO Semifinal track. ET live classes. From $1,800.',
  keywords: [
    'AP Biology tutor Hunter',
    'AP Biology tutor Hunter College High School',
    'AP Bio tutor Hunter NYC',
    'Hunter College HS USABO tutor',
    'Hunter biology olympiad coach',
    'AP Biology Score 5 Hunter College HS',
    'Hunter private biology tutor',
    'online AP Biology tutor Hunter',
    'Hunter pre-med biology coaching',
    'Brown PLME prep Hunter',
    'Hunter Yale Harvard MIT prep',
    'Hunter College HS small class biology tutor',
  ],
  canonical: `/ap-biology-tutor-${SLUG}`,
})

export default function APBiologyTutorHunterCollegeHSPage() {
  if (!school) notFound()
  return (
    <>
      <APBiologySchoolSchemas school={school} />
      <APBiologySchoolTemplate school={school} />
    </>
  )
}
